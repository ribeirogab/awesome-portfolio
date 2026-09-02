import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { articlesDirectory, loadArticles } from "../src/content/articles.ts";
import { missingProjectIds } from "../src/content/projects.ts";
import { type Portfolio, portfolioSchema } from "../src/schema/portfolio.ts";

const root = join(import.meta.dirname, "..");
const portfolioPath = join(root, "portfolio.json");

function fail(message: string): never {
	console.error(`✗ ${message}`);
	process.exit(1);
}

function parsePortfolio(): Portfolio {
	let raw: string;
	try {
		raw = readFileSync(portfolioPath, "utf8");
	} catch {
		fail("portfolio.json: file not found at the repository root");
	}

	let data: unknown;
	try {
		data = JSON.parse(raw);
	} catch (error) {
		fail(`portfolio.json: invalid JSON — ${(error as Error).message}`);
	}

	const result = portfolioSchema.safeParse(data);
	if (!result.success) {
		fail(`portfolio.json: schema errors\n${z.prettifyError(result.error)}`);
	}
	return result.data;
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

function checkArticles(): number {
	if (!existsSync(join(root, articlesDirectory))) {
		fail(`${articlesDirectory}: directory not found`);
	}
	try {
		return loadArticles(root).length;
	} catch (error) {
		fail(`${articlesDirectory}/${(error as Error).message}`);
	}
}

const portfolio = parsePortfolio();
const problems = [
	...checkUniqueIds(portfolio),
	...checkLocalLogos(portfolio),
	...checkFeaturedProjects(portfolio),
];

if (problems.length > 0) {
	fail(
		`portfolio.json: invariant errors\n${problems.map((problem) => `  - ${problem}`).join("\n")}`,
	);
}

const articleCount = checkArticles();

console.log(
	`✓ content is valid — ${portfolio.sections.length} sections, ${portfolio.projects.length} projects, ${articleCount} articles, owner "${portfolio.owner.name}"`,
);
