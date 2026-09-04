import { preconnect } from "react-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { ArticleList } from "@/components/article-list";
import { ContributionGraph } from "@/components/contribution-graph";
import { ExpandableEntry } from "@/components/expandable-entry";
import { HeroMosaic } from "@/components/hero-mosaic";
import { SectionHead } from "@/components/section-head";
import { StackIcon } from "@/components/stack-icon";
import { loadArticles } from "@/content/articles";
import { findFeaturedProjects } from "@/content/projects";
import { portfolio } from "@/data/portfolio";
import type { Article } from "@/schema/article";
import type { Section } from "@/schema/portfolio";
import { JsonLd } from "@/seo/json-ld";
import { homeStructuredData } from "@/seo/structured-data";

const contributionsApiOrigin = "https://github-contributions-api.jogruber.de";

function renderEmphasis(text: string) {
	return text
		.split("*")
		.map((part, index) =>
			index % 2 === 1 ? <em key={`em-${part}`}>{part}</em> : part,
		);
}

function PortfolioSection({
	section,
	articles,
}: {
	section: Section;
	articles: Article[];
}) {
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
		case "projects":
			return (
				<section
					className="section-gap"
					id={section.id}
					aria-labelledby={`${section.id}-label`}
				>
					<SectionHead
						sectionId={section.id}
						title={section.title}
						link={{ label: section.viewAll, url: "/projects" }}
					/>
					{findFeaturedProjects(portfolio, section.featured).map((project) => (
						<ExpandableEntry
							key={project.id}
							descriptionId={project.id}
							title={project.title}
							tag={project.tag}
							description={project.description}
							links={project.links}
						/>
					))}
				</section>
			);
		case "articles":
			return (
				<section
					className="section-gap"
					id={section.id}
					aria-labelledby={`${section.id}-label`}
				>
					<SectionHead
						sectionId={section.id}
						title={section.title}
						link={{ label: section.viewAll, url: "/articles" }}
					/>
					<ArticleList
						articles={articles.slice(0, section.limit)}
						layout="inline"
					/>
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
			preconnect(contributionsApiOrigin);
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
						<div className="contact-copy">
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
	const { owner, sections } = portfolio;
	const articles = loadArticles();

	return (
		<div className="page">
			<JsonLd data={homeStructuredData()} />
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
				{owner.photos ? <HeroMosaic photos={owner.photos} /> : null}
				<p className="intro">{owner.intro}</p>
			</header>
			{sections.map((section) => (
				<PortfolioSection
					key={section.id}
					section={section}
					articles={articles}
				/>
			))}
		</div>
	);
}
