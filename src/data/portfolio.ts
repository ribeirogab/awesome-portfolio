export type StackIconName =
	| "react"
	| "nextjs"
	| "tailwind"
	| "nodejs"
	| "postgresql"
	| "fastify"
	| "typescript"
	| "python"
	| "sql"
	| "git"
	| "docker"
	| "vitest"
	| "vercel"
	| "cloudflare"
	| "github-actions"
	| "figma"
	| "motion"
	| "typography";

export type EntryLink = {
	label: string;
	url: string;
};

export type Experience = {
	id: string;
	title: string;
	organization: string;
	logo: string;
	period: string;
	description: string;
	links?: EntryLink[];
};

export type Project = {
	id: string;
	title: string;
	technology: string;
	description: string;
	links?: EntryLink[];
};

export type StackGroup = {
	title: string;
	items: { name: string; icon: StackIconName }[];
};

export const owner = {
	name: "John Doe",
	greeting: "Hi, I'm",
	role: "creative developer",
	introLead:
		"I build expressive interfaces where typography, motion, and engineering meet. Over the last nine years I have shipped design systems, editorial sites, and interactive tools for small studios and independent teams.",
	availability: "available for work",
};

export const githubUsername = "ribeirogab";

export const githubUrl = `https://github.com/${githubUsername}`;

export const socialLinks: EntryLink[] = [
	{ label: "GitHub", url: githubUrl },
	{ label: "Instagram", url: "https://example.com" },
	{ label: "X", url: "https://example.com" },
	{ label: "LinkedIn", url: "https://example.com" },
	{ label: "YouTube", url: "https://example.com" },
];

export const experiences: Experience[] = [
	{
		id: "exp-1",
		title: "Lead Creative Developer",
		organization: "Northstar Studio",
		logo: "/logos/northstar-studio.svg",
		period: "2021 — Now",
		description:
			"I lead the interface practice for a four-person studio, pairing with designers from the first sketch to the last easing curve. I built the studio's shared component language, introduced visual regression checks for every client handoff, and shipped eleven editorial sites that hold a stable layout from the first paint. My favorite part of the job is translating a vague art-direction feeling into a system the whole team can build with.",
		links: [
			{ label: "Website", url: "https://example.com" },
			{ label: "Instagram", url: "https://example.com" },
		],
	},
	{
		id: "exp-2",
		title: "Frontend Engineer",
		organization: "Fieldwork Labs",
		logo: "/logos/fieldwork-labs.svg",
		period: "2018 — 2021",
		description:
			"At a product lab focused on mapping tools, I owned the rendering layer of a canvas-heavy annotation editor used by field researchers. I cut initial load time by more than half, wrote the accessibility pass that made every tool operable by keyboard, and mentored two junior engineers through their first production releases. The work taught me to treat performance as a design material rather than a chore.",
		links: [
			{ label: "Website", url: "https://example.com" },
			{ label: "LinkedIn", url: "https://example.com" },
		],
	},
	{
		id: "exp-3",
		title: "Interface Developer",
		organization: "Atelier Zero",
		logo: "/logos/atelier-zero.svg",
		period: "2016 — 2018",
		description:
			"My first studio role, split between client sites and internal experiments. I turned static art boards into living pages, built a small CSS toolkit the studio still uses, and learned the discipline of shipping on a deadline without letting craft slip. Two of the campaign pages I built were featured in independent design showcases during my time there.",
		links: [{ label: "Website", url: "https://example.com" }],
	},
];

export type Education = {
	id: string;
	degree: string;
	institution: string;
	logo: string;
	period: string;
};

export const education: Education[] = [
	{
		id: "edu-1",
		degree: "BA in Design & Technology",
		institution: "Aldergrove University",
		logo: "/logos/aldergrove-university.svg",
		period: "2012 — 2016",
	},
	{
		id: "edu-2",
		degree: "Certificate in Interactive Media",
		institution: "Harbor School of Arts",
		logo: "/logos/harbor-school.svg",
		period: "2011 — 2012",
	},
];

export const learningNote =
	"Lately I have been studying creative coding with shaders and slowly relearning type design fundamentals — the goal is to draw the letters, not only set them.";

export const projects: Project[] = [
	{
		id: "proj-1",
		title: "Signal Board",
		technology: "TypeScript",
		description:
			"A realtime status wall for small teams that treats uptime data as an editorial layout instead of a dashboard. Incidents render as a quiet typographic timeline, and the whole board stays readable on a wall display from across a room. Built with a tiny websocket core and no runtime dependencies beyond the framework.",
		links: [
			{ label: "GitHub", url: "https://github.com/ribeirogab" },
			{ label: "Live demo", url: "https://example.com" },
		],
	},
	{
		id: "proj-2",
		title: "Routewise",
		technology: "React",
		description:
			"A trip-planning notebook that mixes free-form notes with structured route segments. Drag a paragraph onto the map margin and it becomes a waypoint; drag it back and it is prose again. The interaction model went through nine prototypes before the drag felt honest, and the final version works fully offline.",
		links: [{ label: "GitHub", url: "https://github.com/ribeirogab" }],
	},
	{
		id: "proj-3",
		title: "Paper Trail",
		technology: "Node.js",
		description:
			"A command-line archiver that turns bookmark exports into a clean, searchable reading site. It strips trackers, normalizes typography, and generates a printable digest every Sunday. Started as a weekend script, now maintained as a small open tool with a patient issue queue and a handful of regular contributors.",
		links: [
			{ label: "GitHub", url: "https://github.com/ribeirogab" },
			{ label: "npm", url: "https://example.com" },
		],
	},
];

export const contributionNotice = "Contribution activity — WIP";

export const stackGroups: StackGroup[] = [
	{
		title: "Frontend",
		items: [
			{ name: "React", icon: "react" },
			{ name: "Next.js", icon: "nextjs" },
			{ name: "Tailwind CSS", icon: "tailwind" },
		],
	},
	{
		title: "Backend",
		items: [
			{ name: "Node.js", icon: "nodejs" },
			{ name: "PostgreSQL", icon: "postgresql" },
			{ name: "Fastify", icon: "fastify" },
		],
	},
	{
		title: "Language",
		items: [
			{ name: "TypeScript", icon: "typescript" },
			{ name: "Python", icon: "python" },
			{ name: "SQL", icon: "sql" },
		],
	},
	{
		title: "Tools",
		items: [
			{ name: "Git", icon: "git" },
			{ name: "Docker", icon: "docker" },
			{ name: "Vitest", icon: "vitest" },
		],
	},
	{
		title: "Deployment",
		items: [
			{ name: "Vercel", icon: "vercel" },
			{ name: "Cloudflare", icon: "cloudflare" },
			{ name: "GitHub Actions", icon: "github-actions" },
		],
	},
	{
		title: "Design",
		items: [
			{ name: "Figma", icon: "figma" },
			{ name: "Motion design", icon: "motion" },
			{ name: "Typography", icon: "typography" },
		],
	},
];

export const statement = {
	before: "I believe good software feels ",
	emphasis: "quiet",
	after:
		" — it respects attention, loads fast, reads well, and gets out of the way. I would rather remove a feature than ship one that shouts.",
};

export const contact = {
	heading: "Let's build something.",
	invitation:
		"Open to remote collaborations, studio partnerships, and odd ideas.",
	action: "Get in touch",
};
