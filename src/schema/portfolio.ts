import { z } from "zod";

const stackIconNames = [
	"react",
	"nextjs",
	"tailwind",
	"nodejs",
	"postgresql",
	"fastify",
	"typescript",
	"python",
	"sql",
	"git",
	"docker",
	"vitest",
	"vercel",
	"cloudflare",
	"github-actions",
	"figma",
	"motion",
	"typography",
] as const;

const stackIconSchema = z.enum(stackIconNames);

const linkSchema = z.object({
	label: z.string().min(1),
	url: z.url(),
});

const logoSchema = z.union([z.string().startsWith("/"), z.url()]);

const entrySchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	subtitle: z.string().min(1).optional(),
	logo: logoSchema.optional(),
	period: z.string().min(1).optional(),
	tag: z.string().min(1).optional(),
	description: z.string().min(1).optional(),
	links: z.array(linkSchema).min(1).optional(),
});

const sectionBase = {
	id: z.string().min(1),
	navLabel: z.string().min(1).optional(),
};

const entriesSectionSchema = z.object({
	...sectionBase,
	type: z.literal("entries"),
	title: z.string().min(1),
	entries: z.array(entrySchema).min(1),
	footnote: z.string().min(1).optional(),
});

const stackSectionSchema = z.object({
	...sectionBase,
	type: z.literal("stack"),
	title: z.string().min(1),
	groups: z
		.array(
			z.object({
				title: z.string().min(1),
				items: z
					.array(
						z.object({
							name: z.string().min(1),
							icon: stackIconSchema,
						}),
					)
					.min(1),
			}),
		)
		.min(1),
});

const githubContributionsSectionSchema = z.object({
	...sectionBase,
	type: z.literal("github-contributions"),
	title: z.string().min(1),
	username: z.string().min(1),
	errorNotice: z.string().min(1),
});

const statementSectionSchema = z.object({
	...sectionBase,
	type: z.literal("statement"),
	text: z.string().min(1),
});

const contactSectionSchema = z.object({
	...sectionBase,
	type: z.literal("contact"),
	heading: z.string().min(1),
	invitation: z.string().min(1),
	action: z.string().min(1),
	url: z.url(),
});

const sectionSchema = z.discriminatedUnion("type", [
	entriesSectionSchema,
	stackSectionSchema,
	githubContributionsSectionSchema,
	statementSectionSchema,
	contactSectionSchema,
]);

export const portfolioSchema = z.object({
	site: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
	}),
	owner: z.object({
		greeting: z.string().min(1),
		name: z.string().min(1),
		role: z.string().min(1),
		availability: z.string().min(1),
		intro: z.string().min(1),
	}),
	socialLinks: z.array(linkSchema).min(1),
	sections: z.array(sectionSchema).min(1),
});

export type Portfolio = z.infer<typeof portfolioSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type EntryLink = z.infer<typeof linkSchema>;
export type StackIconName = z.infer<typeof stackIconSchema>;
