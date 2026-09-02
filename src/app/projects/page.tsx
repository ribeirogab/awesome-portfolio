import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageHead } from "@/components/page-head";
import { ProjectCase } from "@/components/project-case";
import { portfolio } from "@/data/portfolio";
import { JsonLd } from "@/seo/json-ld";
import { pageMetadata } from "@/seo/metadata";
import { projectsStructuredData } from "@/seo/structured-data";

const { owner, pages, projects } = portfolio;

export const metadata: Metadata = pageMetadata({
	path: "/projects",
	title: `${pages.projects.title} — ${owner.name}`,
	description: pages.projects.description,
});

export default function ProjectsPage() {
	return (
		<div className="page">
			<JsonLd data={projectsStructuredData(projects)} />
			<Breadcrumb
				items={[
					{ label: owner.name, href: "/" },
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
					/>
				))}
			</section>
		</div>
	);
}
