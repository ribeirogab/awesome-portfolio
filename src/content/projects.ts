import type { Portfolio, Project } from "../schema/portfolio.ts";

export function findFeaturedProjects(
	portfolio: Portfolio,
	ids: string[],
): Project[] {
	return ids.flatMap((id) => {
		const project = portfolio.projects.find((candidate) => candidate.id === id);
		return project ? [project] : [];
	});
}

export function missingProjectIds(
	portfolio: Portfolio,
	ids: string[],
): string[] {
	return ids.filter(
		(id) => !portfolio.projects.some((project) => project.id === id),
	);
}
