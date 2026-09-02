import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";

export const dynamic = "force-static";
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
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
				borderRadius: 22,
				fontSize: 60,
				fontWeight: 700,
				fontFamily: "sans-serif",
			}}
		>
			{initial}
		</div>,
		size,
	);
}
