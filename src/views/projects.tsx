import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageHead } from "@/components/page-head";
import { ProjectCase } from "@/components/project-case";
import type { LocaleContent } from "@/content/locale-content";
import { localizePath } from "@/content/locales";
import { fill } from "@/schema/messages";
import { JsonLd } from "@/seo/json-ld";
import { pageMetadata } from "@/seo/metadata";
import { projectsStructuredData } from "@/seo/structured-data";

export function projectsMetadata(content: LocaleContent): Metadata {
	const { owner, pages } = content.portfolio;
	return pageMetadata({
		content,
		path: "/projects",
		title: `${pages.projects.title} — ${owner.name}`,
		description: pages.projects.description,
	});
}

export function ProjectsView({ content }: { content: LocaleContent }) {
	const { owner, pages, projects } = content.portfolio;
	const { messages, locale } = content;

	return (
		<div className="page">
			<JsonLd data={projectsStructuredData(content, projects)} />
			<Breadcrumb
				label={messages.breadcrumb}
				items={[
					{ label: owner.name, href: localizePath(locale, "/") },
					{ label: pages.projects.title },
				]}
			/>
			<PageHead
				title={pages.projects.title}
				description={pages.projects.description}
			/>
			<section className="page-section" aria-label={pages.projects.title}>
				{projects.map((project, index) => (
					<ProjectCase
						key={project.id}
						index={String(index + 1).padStart(2, "0")}
						project={project}
						linksLabel={fill(messages.entryLinks, { title: project.title })}
					/>
				))}
			</section>
		</div>
	);
}
