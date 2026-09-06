import type { Metadata } from "next";
import { loadDefaultLocaleContent } from "@/content/locale-content";
import { ProjectsView, projectsMetadata } from "@/views/projects";

const content = loadDefaultLocaleContent();

export const metadata: Metadata = projectsMetadata(content);

export default function ProjectsPage() {
	return <ProjectsView content={content} />;
}
