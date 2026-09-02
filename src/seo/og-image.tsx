import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const paper = "#faf8f3";
const ink = "#211e19";
const muted = "#7d776b";
const faint = "#a29b8d";
const line = "#d8d2c2";

type OgCardInput = {
	label: string;
	title: string;
	description?: string;
	footer?: string;
};

export function ogImage({ label, title, description, footer }: OgCardInput) {
	const { owner, site } = portfolio;
	const host = new URL(site.url).host;
	const long = title.length > 48;

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "72px 80px",
				background: paper,
				color: ink,
				fontFamily: "sans-serif",
			}}
		>
			<div
				style={{
					display: "flex",
					fontSize: 22,
					letterSpacing: "0.14em",
					textTransform: "uppercase",
					color: faint,
				}}
			>
				{label}
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 24,
					maxWidth: 1000,
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: long ? 56 : 72,
						lineHeight: 1.1,
						fontWeight: 700,
					}}
				>
					{title}
				</div>
				{description ? (
					<div
						style={{
							display: "flex",
							fontSize: 28,
							lineHeight: 1.45,
							color: muted,
						}}
					>
						{description}
					</div>
				) : null}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					borderTop: `2px solid ${line}`,
					paddingTop: 28,
					fontSize: 24,
					color: muted,
				}}
			>
				<div style={{ display: "flex", color: ink }}>
					{footer ?? owner.name}
				</div>
				<div style={{ display: "flex" }}>{host}</div>
			</div>
		</div>,
		ogSize,
	);
}
