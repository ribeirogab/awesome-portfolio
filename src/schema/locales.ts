import { z } from "zod";

const localeCode = z
	.string()
	.regex(/^[a-z]{2,3}$/, "must be a two or three letter lowercase code");

export const localesSchema = z
	.object({
		default: localeCode,
		locales: z.array(localeCode).min(1),
	})
	.refine((config) => config.locales.includes(config.default), {
		message: "default must be one of the locales",
		path: ["default"],
	})
	.refine((config) => new Set(config.locales).size === config.locales.length, {
		message: "locales must be unique",
		path: ["locales"],
	});

export type LocaleConfig = z.infer<typeof localesSchema>;
