import type { LocaleContent } from "@/content/locale-content";
import { localizePath } from "@/content/locales";
import type { Article } from "@/schema/article";
import type { Project } from "@/schema/portfolio";
import type { JsonLdData } from "@/seo/json-ld";

const context = "https://schema.org";

type Crumb = {
	name: string;
	path: string;
};

function ids(content: LocaleContent) {
	const { site } = content.portfolio;
	return {
		person: `${site.url}/#person`,
		website: `${site.url}/#website`,
	};
}

function absolute(content: LocaleContent, path: string): string {
	return `${content.portfolio.site.url}${localizePath(content.locale, path)}`;
}

function personRef(content: LocaleContent): JsonLdData {
	return { "@id": ids(content).person };
}

function person(content: LocaleContent): JsonLdData {
	const { site, owner, socialLinks } = content.portfolio;
	return {
		"@type": "Person",
		"@id": ids(content).person,
		name: owner.name,
		jobTitle: owner.role,
		description: owner.intro,
		url: site.url,
		sameAs: socialLinks.map((link) => link.url),
	};
}

function website(content: LocaleContent): JsonLdData {
	const { site } = content.portfolio;
	return {
		"@type": "WebSite",
		"@id": ids(content).website,
		url: site.url,
		name: site.title,
		description: site.description,
		inLanguage: site.locale,
		author: personRef(content),
		publisher: personRef(content),
	};
}

function breadcrumbList(content: LocaleContent, crumbs: Crumb[]): JsonLdData {
	return {
		"@type": "BreadcrumbList",
		itemListElement: crumbs.map((crumb, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: crumb.name,
			item: absolute(content, crumb.path),
		})),
	};
}

export function homeStructuredData(content: LocaleContent): JsonLdData {
	const { site } = content.portfolio;
	return {
		"@context": context,
		"@graph": [
			website(content),
			person(content),
			{
				"@type": "ProfilePage",
				"@id": `${absolute(content, "/")}#profile`,
				url: absolute(content, "/"),
				name: site.title,
				description: site.description,
				inLanguage: site.locale,
				isPartOf: { "@id": ids(content).website },
				mainEntity: personRef(content),
			},
		],
	};
}

export function articlesStructuredData(
	content: LocaleContent,
	articles: Article[],
): JsonLdData {
	const { owner, pages, site } = content.portfolio;
	const path = "/articles";
	return {
		"@context": context,
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${absolute(content, path)}/#page`,
				url: absolute(content, path),
				name: pages.articles.title,
				description: pages.articles.description,
				inLanguage: site.locale,
				isPartOf: { "@id": ids(content).website },
				author: personRef(content),
				mainEntity: {
					"@type": "ItemList",
					itemListElement: articles.map((article, index) => ({
						"@type": "ListItem",
						position: index + 1,
						url: `${site.url}${article.href}`,
						name: article.title,
					})),
				},
			},
			breadcrumbList(content, [
				{ name: owner.name, path: "/" },
				{ name: pages.articles.title, path },
			]),
		],
	};
}

export function projectsStructuredData(
	content: LocaleContent,
	projects: Project[],
): JsonLdData {
	const { owner, pages, site } = content.portfolio;
	const path = "/projects";
	return {
		"@context": context,
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${absolute(content, path)}/#page`,
				url: absolute(content, path),
				name: pages.projects.title,
				description: pages.projects.description,
				inLanguage: site.locale,
				isPartOf: { "@id": ids(content).website },
				author: personRef(content),
				mainEntity: {
					"@type": "ItemList",
					itemListElement: projects.map((project, index) => ({
						"@type": "ListItem",
						position: index + 1,
						item: {
							"@type": "CreativeWork",
							name: project.title,
							description: project.description,
							dateCreated: project.year,
							keywords: project.stack.map((item) => item.name).join(", "),
							author: personRef(content),
							...(project.links?.[0] ? { url: project.links[0].url } : {}),
						},
					})),
				},
			},
			breadcrumbList(content, [
				{ name: owner.name, path: "/" },
				{ name: pages.projects.title, path },
			]),
		],
	};
}

export function articleStructuredData(
	content: LocaleContent,
	article: Article,
	wordCount: number,
): JsonLdData {
	const { owner, pages, site } = content.portfolio;
	const path = `/articles/${article.slug}`;
	return {
		"@context": context,
		"@graph": [
			{
				"@type": "BlogPosting",
				"@id": `${absolute(content, path)}/#article`,
				headline: article.title,
				description: article.excerpt,
				url: absolute(content, path),
				mainEntityOfPage: absolute(content, path),
				datePublished: article.date,
				dateModified: article.date,
				inLanguage: site.locale,
				articleSection: article.tag,
				keywords: article.tag,
				wordCount,
				author: personRef(content),
				publisher: personRef(content),
				isPartOf: { "@id": ids(content).website },
			},
			breadcrumbList(content, [
				{ name: owner.name, path: "/" },
				{ name: pages.articles.title, path: "/articles" },
				{ name: article.title, path },
			]),
		],
	};
}
