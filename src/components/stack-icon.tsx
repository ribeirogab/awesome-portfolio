import type { ReactNode } from "react";
import type { StackIconName } from "@/data/portfolio";

const paths: Record<StackIconName, ReactNode> = {
	react: (
		<>
			<circle cx="12" cy="12" r="2.2" />
			<ellipse cx="12" cy="12" rx="10" ry="4.2" />
			<ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
			<ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
		</>
	),
	nextjs: (
		<>
			<circle cx="12" cy="12" r="9" />
			<path d="M8 16V8l8 8V8" />
		</>
	),
	tailwind: (
		<path
			d="M4 12c1.5-4 4-6 7-6 4.5 0 4 4.5 8 4.5M4 17.5C5.5 13.5 8 11.5 11 11.5c4.5 0 4 4.5 8 4.5"
			strokeLinecap="round"
		/>
	),
	nodejs: (
		<>
			<path d="M12 3l8 4.6v9L12 21l-8-4.4v-9L12 3Z" />
			<path d="M12 12v9M12 12L4 7.6M12 12l8-4.4" />
		</>
	),
	postgresql: (
		<>
			<ellipse cx="12" cy="6" rx="7.5" ry="3" />
			<path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
		</>
	),
	fastify: (
		<>
			<rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
			<path
				d="M7.5 9.5l3 2.5-3 2.5M12.5 15h4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	typescript: (
		<>
			<rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
			<path
				d="M8 10h5M10.5 10v7M14.5 17c0-1.2 3-1 3-3 0-1.4-2.6-1.4-2.6-3 0-.8.8-1.3 1.8-1"
				strokeLinecap="round"
			/>
		</>
	),
	python: (
		<>
			<path
				d="M12 3c4 0 4.5 2 4.5 4v2h-9c-2 0-4 1-4 4s2 4 4 4H9"
				strokeLinecap="round"
			/>
			<path
				d="M12 21c-4 0-4.5-2-4.5-4v-2h9c2 0 4-1 4-4s-2-4-4-4H15"
				strokeLinecap="round"
			/>
			<circle cx="9.6" cy="6" r="0.4" />
			<circle cx="14.4" cy="18" r="0.4" />
		</>
	),
	sql: (
		<>
			<path d="M6 4h9l4 4v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
			<path d="M9 13l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
		</>
	),
	git: (
		<>
			<circle cx="6" cy="6" r="2.2" />
			<circle cx="6" cy="18" r="2.2" />
			<circle cx="18" cy="10" r="2.2" />
			<path
				d="M6 8.2v7.6M8 7l7.8 2M6 15.8c6 0 5-4 9.8-3.9"
				strokeLinecap="round"
			/>
		</>
	),
	docker: (
		<>
			<path
				d="M4 13h13c2 0 3.5-1.2 3.5-3S19 7 17.5 7c-.3-2-2-3.5-4-3.5-1.7 0-3.2 1-3.8 2.6A4.5 4.5 0 0 0 4 10.5"
				strokeLinecap="round"
			/>
			<path
				d="M6 13.5v3M9.5 13.5v5M13 13.5v3M16.5 13.5v5"
				strokeLinecap="round"
			/>
		</>
	),
	vitest: (
		<path
			d="M4 5.5 10.5 12 4 18.5M12 18.5h8"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	),
	vercel: <path d="M12 4l9 16H3l9-16Z" strokeLinejoin="round" />,
	cloudflare: (
		<>
			<path
				d="M18 15.5H7a3.5 3.5 0 1 1 .6-6.9A5 5 0 0 1 17.4 10a3 3 0 0 1 .6 5.5Z"
				strokeLinejoin="round"
			/>
			<path d="M8 19h8" strokeLinecap="round" />
		</>
	),
	"github-actions": (
		<>
			<rect x="3.5" y="5" width="17" height="11" rx="2" />
			<path d="M8 19.5h8M12 16v3.5" strokeLinecap="round" />
		</>
	),
	figma: (
		<>
			<circle cx="14.5" cy="9.5" r="2.8" />
			<path
				d="M9 4h3v5.6H9a2.8 2.8 0 1 1 0-5.6ZM9 9.6h3v5.6H9a2.8 2.8 0 1 1 0-5.6ZM9 15.2h3v2.8a2.8 2.8 0 1 1-3-2.8Z"
				strokeLinejoin="round"
			/>
		</>
	),
	motion: (
		<path
			d="M5 19.5 15.5 4.5c.8-1.1 2.5-.9 3.2.3.6 1 .3 2.3-.6 3L5 19.5ZM5 19.5h6"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	),
	typography: (
		<path d="M6 4h9v5h-9zM6 9h12v5H6zM6 14h7v5H6z" strokeLinejoin="round" />
	),
};

export function StackIcon({ name }: { name: StackIconName }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			aria-hidden="true"
		>
			{paths[name]}
		</svg>
	);
}
