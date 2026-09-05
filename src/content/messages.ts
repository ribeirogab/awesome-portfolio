import { join } from "node:path";
import { type Messages, messagesSchema } from "../schema/messages.ts";
import { readJson } from "./json.ts";
import { localeDirectory } from "./locales.ts";

const cache = new Map<string, Messages>();

export function messagesFile(locale: string): string {
	return join(localeDirectory(locale), "messages.json");
}

export function loadMessages(locale: string, root = process.cwd()): Messages {
	const key = `${root}:${locale}`;
	const cached = cache.get(key);
	if (cached) {
		return cached;
	}
	const file = messagesFile(locale);
	const messages = readJson(join(root, file), file, messagesSchema);
	cache.set(key, messages);
	return messages;
}
