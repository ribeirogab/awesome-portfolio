import { readFileSync } from "node:fs";
import type { z } from "zod";
import { prettifyError } from "zod";

export function readJson<T>(
	path: string,
	label: string,
	schema: z.ZodType<T>,
): T {
	let raw: string;
	try {
		raw = readFileSync(path, "utf8");
	} catch {
		throw new Error(`${label}: file not found`);
	}
	let data: unknown;
	try {
		data = JSON.parse(raw);
	} catch (error) {
		throw new Error(`${label}: invalid JSON — ${(error as Error).message}`);
	}
	const result = schema.safeParse(data);
	if (!result.success) {
		throw new Error(`${label}: schema errors\n${prettifyError(result.error)}`);
	}
	return result.data;
}
