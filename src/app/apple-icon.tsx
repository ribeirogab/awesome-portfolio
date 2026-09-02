import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
	const initial = portfolio.owner.name.trim().charAt(0).toUpperCase();
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#211e19",
				color: "#faf8f3",
				fontSize: 112,
				fontWeight: 700,
				fontFamily: "sans-serif",
			}}
		>
			{initial}
		</div>,
		size,
	);
}
