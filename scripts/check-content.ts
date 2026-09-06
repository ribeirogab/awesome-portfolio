import { existsSync } from "node:fs";
import { join } from "node:path";
import { articlesDirectory, loadArticles } from "../src/content/articles.ts";
import {
	allLocales,
	defaultLocale,
	loadLocaleConfig,
	localesFile,
} from "../src/content/locales.ts";
import { loadMessages, messagesFile } from "../src/content/messages.ts";
import { loadPortfolio, portfolioFile } from "../src/content/portfolio.ts";
import { missingProjectIds } from "../src/content/projects.ts";
import type { Article } from "../src/schema/article.ts";
import type { Portfolio } from "../src/schema/portfolio.ts";

const root = join(import.meta.dirname, "..");

function fail(message: string): never {
	console.error(`✗ ${message}`);
	process.exit(1);
}

function attempt<T>(load: () => T): T {
	try {
		return load();
	} catch (error) {
		fail((error as Error).message);
	}
}

function checkUniqueIds(portfolio: Portfolio): string[] {
	const seen = new Set<string>();
	const problems: string[] = [];
	const register = (id: string, where: string) => {
		if (seen.has(id)) {
			problems.push(`duplicate id "${id}" (${where})`);
		}
		seen.add(id);
	};
	for (const project of portfolio.projects) {
		register(project.id, "project");
	}
	for (const section of portfolio.sections) {
		register(section.id, `section "${section.type}"`);
		if (section.type === "entries") {
			for (const entry of section.entries) {
				register(entry.id, `entry in section "${section.id}"`);
			}
		}
	}
	return problems;
}

function checkLocalLogos(portfolio: Portfolio): string[] {
	const problems: string[] = [];
	for (const section of portfolio.sections) {
		if (section.type !== "entries") {
			continue;
		}
		for (const entry of section.entries) {
			if (
				entry.logo?.startsWith("/") &&
				!existsSync(join(root, "public", entry.logo))
			) {
				problems.push(
					`logo "${entry.logo}" (entry "${entry.id}") not found in public/`,
				);
			}
		}
	}
	return problems;
}

function checkLocalPhotos(portfolio: Portfolio): string[] {
	const problems: string[] = [];
	for (const photo of portfolio.owner.photos ?? []) {
		if (
			photo.src.startsWith("/") &&
			!existsSync(join(root, "public", photo.src))
		) {
			problems.push(`photo "${photo.src}" (owner.photos) not found in public/`);
		}
	}
	return problems;
}

function checkFeaturedProjects(portfolio: Portfolio): string[] {
	const problems: string[] = [];
	for (const section of portfolio.sections) {
		if (section.type !== "projects") {
			continue;
		}
		for (const id of missingProjectIds(portfolio, section.featured)) {
			problems.push(
				`featured project "${id}" (section "${section.id}") not found in projects`,
			);
		}
	}
	return problems;
}

function sameList(actual: string[], expected: string[]): boolean {
	return (
		actual.length === expected.length &&
		actual.every((value, index) => value === expected[index])
	);
}

function checkParity(portfolio: Portfolio, reference: Portfolio): string[] {
	const problems: string[] = [];
	if (portfolio.site.url !== reference.site.url) {
		problems.push(`site.url must be "${reference.site.url}"`);
	}
	const projectIds = (source: Portfolio) =>
		source.projects.map((project) => project.id);
	if (!sameList(projectIds(portfolio), projectIds(reference))) {
		problems.push(
			`projects must have the ids [${projectIds(reference).join(", ")}] in that order`,
		);
	}
	const sectionKeys = (source: Portfolio) =>
		source.sections.map((section) => `${section.type}:${section.id}`);
	if (!sameList(sectionKeys(portfolio), sectionKeys(reference))) {
		problems.push(
			`sections must be [${sectionKeys(reference).join(", ")}] in that order`,
		);
		return problems;
	}
	portfolio.sections.forEach((section, index) => {
		const expected = reference.sections[index];
		if (section.type === "entries" && expected.type === "entries") {
			const ids = section.entries.map((entry) => entry.id);
			const expectedIds = expected.entries.map((entry) => entry.id);
			if (!sameList(ids, expectedIds)) {
				problems.push(
					`section "${section.id}" must have the entries [${expectedIds.join(", ")}] in that order`,
				);
			}
		}
		if (section.type === "projects" && expected.type === "projects") {
			if (!sameList(section.featured, expected.featured)) {
				problems.push(
					`section "${section.id}" must feature [${expected.featured.join(", ")}] in that order`,
				);
			}
		}
		if (
			section.type === "github-contributions" &&
			expected.type === "github-contributions" &&
			section.username !== expected.username
		) {
			problems.push(
				`section "${section.id}" must use the username "${expected.username}"`,
			);
		}
	});
	const socialUrls = (source: Portfolio) =>
		source.socialLinks.map((link) => link.url);
	if (!sameList(socialUrls(portfolio), socialUrls(reference))) {
		problems.push("socialLinks must have the same urls in the same order");
	}
	const photoSources = (source: Portfolio) =>
		(source.owner.photos ?? []).map((photo) => photo.src);
	if (!sameList(photoSources(portfolio), photoSources(reference))) {
		problems.push("owner.photos must have the same src list in the same order");
	}
	return problems;
}

function reportProblems(file: string, problems: string[]) {
	if (problems.length > 0) {
		fail(
			`${file}: invariant errors\n${problems.map((problem) => `  - ${problem}`).join("\n")}`,
		);
	}
}

function checkArticles(locale: string): Article[] {
	const directory = articlesDirectory(locale);
	if (!existsSync(join(root, directory))) {
		fail(`${directory}: directory not found`);
	}
	try {
		return loadArticles(locale, root);
	} catch (error) {
		fail(`${directory}/${(error as Error).message}`);
	}
}

function checkLocaleFolders() {
	for (const locale of allLocales(root)) {
		for (const file of [portfolioFile(locale), messagesFile(locale)]) {
			if (!existsSync(join(root, file))) {
				fail(`${localesFile}: locale "${locale}" has no ${file}`);
			}
		}
	}
}

attempt(() => loadLocaleConfig(root));
checkLocaleFolders();

const reference = attempt(() => loadPortfolio(defaultLocale(root), root));
const summaries: string[] = [];

for (const locale of allLocales(root)) {
	const portfolio = attempt(() => loadPortfolio(locale, root));
	attempt(() => loadMessages(locale, root));
	reportProblems(portfolioFile(locale), [
		...checkUniqueIds(portfolio),
		...checkLocalLogos(portfolio),
		...checkLocalPhotos(portfolio),
		...checkFeaturedProjects(portfolio),
		...(locale === defaultLocale(root)
			? []
			: checkParity(portfolio, reference)),
	]);
	const articles = checkArticles(locale);
	const photoCount = portfolio.owner.photos?.length ?? 0;
	summaries.push(
		`${locale}: ${portfolio.sections.length} sections, ${portfolio.projects.length} projects, ${articles.length} articles, ${photoCount} photos`,
	);
}

console.log(
	`✓ content is valid — owner "${reference.owner.name}", default locale "${defaultLocale(root)}"\n${summaries.map((summary) => `  - ${summary}`).join("\n")}`,
);
