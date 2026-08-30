import { FiArrowUpRight } from "react-icons/fi";
import { ContributionGraph } from "@/components/contribution-graph";
import { Dock } from "@/components/dock";
import { ExpandableEntry } from "@/components/expandable-entry";
import { StackIcon } from "@/components/stack-icon";
import { portfolio } from "@/data/portfolio";
import type { Section } from "@/schema/portfolio";

function renderEmphasis(text: string) {
	return text
		.split("*")
		.map((part, index) =>
			index % 2 === 1 ? <em key={`em-${part}`}>{part}</em> : part,
		);
}

function SectionHead({
	sectionId,
	title,
	link,
}: {
	sectionId: string;
	title: string;
	link?: { label: string; url: string };
}) {
	return (
		<div className="section-head">
			<h2 className="label" id={`${sectionId}-label`}>
				{title}
			</h2>
			{link ? (
				<a
					className="head-link"
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{link.label} ↗
				</a>
			) : null}
		</div>
	);
}

function PortfolioSection({ section }: { section: Section }) {
	switch (section.type) {
		case "entries":
			return (
				<section
					className="section-gap"
					id={section.id}
					aria-labelledby={`${section.id}-label`}
				>
					<SectionHead sectionId={section.id} title={section.title} />
					{section.entries.map((entry) => (
						<ExpandableEntry
							key={entry.id}
							descriptionId={entry.id}
							title={entry.title}
							subtitle={entry.subtitle}
							logo={entry.logo}
							period={entry.period}
							tag={entry.tag}
							description={entry.description}
							links={entry.links}
						/>
					))}
					{section.footnote ? (
						<aside className="aside-note">{section.footnote}</aside>
					) : null}
				</section>
			);
		case "stack":
			return (
				<section
					className="section-gap"
					id={section.id}
					aria-labelledby={`${section.id}-label`}
				>
					<SectionHead sectionId={section.id} title={section.title} />
					<div className="stack-grid">
						{section.groups.map((group) => (
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
			);
		case "github-contributions":
			return (
				<section
					className="section-gap"
					id={section.id}
					aria-labelledby={`${section.id}-label`}
				>
					<SectionHead
						sectionId={section.id}
						title={section.title}
						link={{
							label: `@${section.username}`,
							url: `https://github.com/${section.username}`,
						}}
					/>
					<ContributionGraph
						username={section.username}
						errorNotice={section.errorNotice}
					/>
				</section>
			);
		case "statement":
			return (
				<section
					className="section-gap"
					id={section.id}
					aria-label="Personal statement"
				>
					<p className="statement">{renderEmphasis(section.text)}</p>
				</section>
			);
		case "contact":
			return (
				<section
					className="section-gap"
					id={section.id}
					aria-labelledby={`${section.id}-label`}
				>
					<div className="contact">
						<div className="copy">
							<h2 id={`${section.id}-label`}>{section.heading}</h2>
							<p>{section.invitation}</p>
						</div>
						<a
							className="contact-btn"
							href={section.url}
							target={section.url.startsWith("mailto:") ? undefined : "_blank"}
							rel={
								section.url.startsWith("mailto:")
									? undefined
									: "noopener noreferrer"
							}
						>
							{section.action}
							<FiArrowUpRight aria-hidden="true" />
						</a>
					</div>
				</section>
			);
	}
}

export default function Home() {
	const { owner, sections, socialLinks } = portfolio;
	const navItems = sections
		.filter((section) => section.navLabel)
		.map((section, index) => ({
			href: `#${section.id}`,
			label: section.navLabel as string,
			index: String(index + 1).padStart(2, "0"),
		}));

	return (
		<>
			<div className="page">
				<header className="hero" id="top">
					<p className="greeting">{owner.greeting}</p>
					<h1>{owner.name}</h1>
					<p className="definition">
						{owner.role}{" "}
						<span className="sep" aria-hidden="true">
							•
						</span>{" "}
						{owner.availability}
					</p>
					<p className="intro">{owner.intro}</p>
				</header>
				{sections.map((section) => (
					<PortfolioSection key={section.id} section={section} />
				))}
			</div>
			<Dock navItems={navItems} socialLinks={socialLinks} />
		</>
	);
}
