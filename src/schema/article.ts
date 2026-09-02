import { z } from "zod";

const isoDate = z.preprocess(
	(value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
	z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/)
		.refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`))),
);

export const articleFrontmatterSchema = z.object({
	title: z.string().min(1),
	date: isoDate,
	tag: z.string().min(1),
	excerpt: z.string().min(1),
});

type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export type Article = ArticleFrontmatter & {
	slug: string;
	html: string;
	readingTime: string;
};
