import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { type Portfolio, portfolioSchema } from "../src/schema/portfolio.ts";

const root = join(import.meta.dirname, "..");
const portfolioPath = join(root, "portfolio.json");

function fail(message: string): never {
	console.error(`✗ portfolio.json: ${message}`);
	process.exit(1);
}

function parsePortfolio(): Portfolio {
	let raw: string;
	try {
		raw = readFileSync(portfolioPath, "utf8");
	} catch {
		fail("file not found at the repository root");
	}

	let data: unknown;
	try {
		data = JSON.parse(raw);
	} catch (error) {
		fail(`invalid JSON — ${(error as Error).message}`);
	}

	const result = portfolioSchema.safeParse(data);
	if (!result.success) {
		fail(`schema errors\n${z.prettifyError(result.error)}`);
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

const portfolio = parsePortfolio();
const problems = [...checkUniqueIds(portfolio), ...checkLocalLogos(portfolio)];

if (problems.length > 0) {
	fail(
		`invariant errors\n${problems.map((problem) => `  - ${problem}`).join("\n")}`,
	);
}

console.log(
	`✓ portfolio.json is valid — ${portfolio.sections.length} sections, owner "${portfolio.owner.name}"`,
);
