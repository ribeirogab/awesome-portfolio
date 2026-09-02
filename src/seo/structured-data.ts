import { portfolio } from "@/data/portfolio";
import type { Article } from "@/schema/article";
import type { Project } from "@/schema/portfolio";
import type { JsonLdData } from "@/seo/json-ld";

const { site, owner, socialLinks, pages } = portfolio;

const context = "https://schema.org";
const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

function absolute(path: string): string {
	return `${site.url}${path}`;
}

function personRef(): JsonLdData {
	return { "@id": personId };
}

function person(): JsonLdData {
	return {
		"@type": "Person",
		"@id": personId,
		name: owner.name,
		jobTitle: owner.role,
		description: owner.intro,
		url: site.url,
		sameAs: socialLinks.map((link) => link.url),
	};
}

function website(): JsonLdData {
	return {
		"@type": "WebSite",
		"@id": websiteId,
		url: site.url,
		name: site.title,
		description: site.description,
		inLanguage: "en",
		author: personRef(),
		publisher: personRef(),
	};
}

type Crumb = {
	name: string;
	path: string;
};

function breadcrumbList(crumbs: Crumb[]): JsonLdData {
	return {
		"@type": "BreadcrumbList",
		itemListElement: crumbs.map((crumb, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: crumb.name,
			item: absolute(crumb.path),
		})),
	};
}

export function homeStructuredData(): JsonLdData {
	return {
		"@context": context,
		"@graph": [
			website(),
			person(),
			{
				"@type": "ProfilePage",
				"@id": `${site.url}/#profile`,
				url: site.url,
				name: site.title,
				description: site.description,
				isPartOf: { "@id": websiteId },
				mainEntity: personRef(),
			},
		],
	};
}

export function articlesStructuredData(articles: Article[]): JsonLdData {
	const path = "/articles";
	return {
		"@context": context,
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${absolute(path)}/#page`,
				url: absolute(path),
				name: pages.articles.title,
				description: pages.articles.description,
				isPartOf: { "@id": websiteId },
				author: personRef(),
				mainEntity: {
					"@type": "ItemList",
					itemListElement: articles.map((article, index) => ({
						"@type": "ListItem",
						position: index + 1,
						url: absolute(`/articles/${article.slug}`),
						name: article.title,
					})),
				},
			},
			breadcrumbList([
				{ name: owner.name, path: "/" },
				{ name: pages.articles.title, path },
			]),
		],
	};
}

export function projectsStructuredData(projects: Project[]): JsonLdData {
	const path = "/projects";
	return {
		"@context": context,
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${absolute(path)}/#page`,
				url: absolute(path),
				name: pages.projects.title,
				description: pages.projects.description,
				isPartOf: { "@id": websiteId },
				author: personRef(),
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
							author: personRef(),
							...(project.links?.[0] ? { url: project.links[0].url } : {}),
						},
					})),
				},
			},
			breadcrumbList([
				{ name: owner.name, path: "/" },
				{ name: pages.projects.title, path },
			]),
		],
	};
}

export function articleStructuredData(
	article: Article,
	wordCount: number,
): JsonLdData {
	const path = `/articles/${article.slug}`;
	return {
		"@context": context,
		"@graph": [
			{
				"@type": "BlogPosting",
				"@id": `${absolute(path)}/#article`,
				headline: article.title,
				description: article.excerpt,
				url: absolute(path),
				mainEntityOfPage: absolute(path),
				datePublished: article.date,
				dateModified: article.date,
				inLanguage: "en",
				articleSection: article.tag,
				keywords: article.tag,
				wordCount,
				author: personRef(),
				publisher: personRef(),
				isPartOf: { "@id": websiteId },
			},
			breadcrumbList([
				{ name: owner.name, path: "/" },
				{ name: pages.articles.title, path: "/articles" },
				{ name: article.title, path },
			]),
		],
	};
}
