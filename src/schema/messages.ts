import { z } from "zod";

const text = z.string().min(1);

const template = (placeholder: string) =>
	text.refine((value) => value.includes(`{${placeholder}}`), {
		message: `must contain the {${placeholder}} placeholder`,
	});

export const messagesSchema = z.object({
	languageName: text,
	viewMore: text,
	viewLess: text,
	readingTime: template("minutes"),
	previous: text,
	next: text,
	adjacentArticles: text,
	rss: text,
	breadcrumb: text,
	personalStatement: text,
	entryLinks: template("title"),
	notFound: z.object({
		title: text,
		description: text,
		backHome: text,
	}),
	dock: z.object({
		quickActions: text,
		backToTop: text,
		openSections: text,
		closeSections: text,
		sections: text,
		openSocial: text,
		closeSocial: text,
		socialLinks: text,
		toggleTheme: text,
		openLanguages: text,
		closeLanguages: text,
		languages: text,
	}),
	contributions: z.object({
		loading: text,
		total: template("count"),
		graphLabel: template("count"),
		none: template("date"),
		one: template("date"),
		many: template("count"),
		less: text,
		more: text,
	}),
});

export type Messages = z.infer<typeof messagesSchema>;
export type DockMessages = Messages["dock"];
export type ContributionMessages = Messages["contributions"];

export function fill(
	template: string,
	values: Record<string, string | number>,
): string {
	return template.replace(/\{(\w+)\}/g, (match, name: string) =>
		name in values ? String(values[name]) : match,
	);
}
