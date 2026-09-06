import { join } from "node:path";
import { type Portfolio, portfolioSchema } from "../schema/portfolio.ts";
import { readJson } from "./json.ts";
import { localeDirectory } from "./locales.ts";

const cache = new Map<string, Portfolio>();

export function portfolioFile(locale: string): string {
	return join(localeDirectory(locale), "portfolio.json");
}

export function loadPortfolio(locale: string, root = process.cwd()): Portfolio {
	const key = `${root}:${locale}`;
	const cached = cache.get(key);
	if (cached) {
		return cached;
	}
	const file = portfolioFile(locale);
	const portfolio = readJson(join(root, file), file, portfolioSchema);
	cache.set(key, portfolio);
	return portfolio;
}
