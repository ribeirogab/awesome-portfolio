import { FiArrowUpRight } from "react-icons/fi";
import { Dock } from "@/components/dock";
import { ExpandableEntry } from "@/components/expandable-entry";
import { Portrait } from "@/components/portrait";
import { StackIcon } from "@/components/stack-icon";
import {
	achievement,
	contact,
	contributionNotice,
	experiences,
	githubUrl,
	learningNote,
	owner,
	projects,
	stackGroups,
	statement,
} from "@/data/portfolio";

export default function Home() {
	return (
		<>
			<div className="page">
				<header className="hero" id="top">
					<Portrait />
					<h1>{owner.name}</h1>
					<p className="role">{owner.role}</p>
					<p className="intro">
						{owner.introLead} <strong>{owner.introAvailability}</strong>
					</p>
				</header>

				<section
					className="section-gap"
					id="experience"
					aria-labelledby="experience-label"
				>
					<div className="section-head">
						<h2 className="label" id="experience-label">
							Experience
						</h2>
					</div>
					{experiences.map((experience) => (
						<ExpandableEntry
							key={experience.id}
							descriptionId={experience.id}
							title={experience.title}
							organization={experience.organization}
							logo={experience.logo}
							period={experience.period}
							description={experience.description}
							links={experience.links}
						/>
					))}
					<aside className="aside-note">{learningNote}</aside>
				</section>

				<section
					className="section-gap"
					id="projects"
					aria-labelledby="projects-label"
				>
					<div className="section-head">
						<h2 className="label" id="projects-label">
							Selected Projects
						</h2>
					</div>
					{projects.map((project) => (
						<ExpandableEntry
							key={project.id}
							descriptionId={project.id}
							title={project.title}
							technology={project.technology}
							description={project.description}
							links={project.links}
						/>
					))}
				</section>

				<section className="section-gap" aria-labelledby="contrib-label">
					<div className="section-head">
						<h2 className="label" id="contrib-label">
							Contributions
						</h2>
					</div>
					<div className="wip-block">
						<p>{contributionNotice}</p>
					</div>
				</section>

				<section
					className="section-gap"
					id="stack"
					aria-labelledby="stack-label"
				>
					<div className="section-head">
						<h2 className="label" id="stack-label">
							Stack
						</h2>
					</div>
					<div className="stack-grid">
						{stackGroups.map((group) => (
							<div className="stack-group" key={group.title}>
								<h3>{group.title}</h3>
								<ul>
									{group.items.map((item) => (
										<li key={item.name}>
											<StackIcon name={item.icon} />
											{item.name}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>

				<section className="section-gap" aria-labelledby="achievement-label">
					<div className="section-head">
						<h2 className="label" id="achievement-label">
							Achievement
						</h2>
					</div>
					<div className="achievement">
						<p className="year">{achievement.year}</p>
						<h3>{achievement.title}</h3>
						<p>{achievement.description}</p>
					</div>
				</section>

				<section className="section-gap" aria-label="Personal statement">
					<p className="statement">
						{statement.before}
						<em>{statement.emphasis}</em>
						{statement.after}
					</p>
				</section>

				<section
					className="section-gap"
					id="contact"
					aria-labelledby="contact-label"
				>
					<div className="contact">
						<div className="copy">
							<h2 id="contact-label">{contact.heading}</h2>
							<p>{contact.invitation}</p>
						</div>
						<a
							className="contact-btn"
							href={githubUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{contact.action}
							<FiArrowUpRight aria-hidden="true" />
						</a>
					</div>
				</section>
			</div>
			<Dock />
		</>
	);
}
