import { EntryLinks } from "@/components/entry-links";
import { StackIcon } from "@/components/stack-icon";
import type { Project } from "@/schema/portfolio";

type ProjectCaseProps = {
	index: string;
	project: Project;
};

export function ProjectCase({ index, project }: ProjectCaseProps) {
	return (
		<article className="case">
			<div className="meta-row">
				<span>{index}</span>
				<span className="dot" aria-hidden="true">
					·
				</span>
				<span>{project.year}</span>
			</div>
			<h2 className="case-title">{project.title}</h2>
			<p className="case-desc">{project.description}</p>
			<ul className="stack-list">
				{project.stack.map((item) => (
					<li key={item.name}>
						<StackIcon name={item.icon} />
						{item.name}
					</li>
				))}
			</ul>
			{project.links?.length ? (
				<EntryLinks links={project.links} label={`${project.title} links`} />
			) : null}
		</article>
	);
}
