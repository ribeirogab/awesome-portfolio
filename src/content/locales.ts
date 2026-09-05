import { join } from "node:path";
import { type LocaleConfig, localesSchema } from "../schema/locales.ts";
import { readJson } from "./json.ts";

const contentDirectory = "content";
export const localesFile = join(contentDirectory, "i18n.json");

const cache = new Map<string, LocaleConfig>();

export function loadLocaleConfig(root = process.cwd()): LocaleConfig {
	const cached = cache.get(root);
	if (cached) {
		return cached;
	}
	const config = readJson(join(root, localesFile), localesFile, localesSchema);
	cache.set(root, config);
	return config;
}

export function defaultLocale(root = process.cwd()): string {
	return loadLocaleConfig(root).default;
}

export function allLocales(root = process.cwd()): string[] {
	return loadLocaleConfig(root).locales;
}

export function secondaryLocales(root = process.cwd()): string[] {
	const config = loadLocaleConfig(root);
	return config.locales.filter((locale) => locale !== config.default);
}

export function localePrefix(locale: string, root = process.cwd()): string {
	return locale === defaultLocale(root) ? "" : `/${locale}`;
}

export function localizePath(
	locale: string,
	path: string,
	root = process.cwd(),
): string {
	const prefix = localePrefix(locale, root);
	if (path === "/") {
		return prefix || "/";
	}
	return `${prefix}${path}`;
}

export function localeDirectory(locale: string): string {
	return join(contentDirectory, locale);
}
