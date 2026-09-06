import type { Metadata } from "next";
import { loadLocaleContent } from "@/content/locale-content";
import { ProjectsView, projectsMetadata } from "@/views/projects";
import { localeParams } from "@/views/static-params";

type ProjectsPageProps = {
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return localeParams();
}

export async function generateMetadata({
	params,
}: ProjectsPageProps): Promise<Metadata> {
	const { locale } = await params;
	return projectsMetadata(loadLocaleContent(locale));
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
	const { locale } = await params;
	return <ProjectsView content={loadLocaleContent(locale)} />;
}
