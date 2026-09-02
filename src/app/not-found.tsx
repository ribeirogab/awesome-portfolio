import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageHead } from "@/components/page-head";
import { portfolio } from "@/data/portfolio";

const { owner } = portfolio;
const title = "Page not found";

export const metadata: Metadata = {
	title: `${title} — ${owner.name}`,
	alternates: {},
};

export default function NotFound() {
	return (
		<div className="page">
			<Breadcrumb
				items={[{ label: owner.name, href: "/" }, { label: title }]}
			/>
			<PageHead
				title={title}
				description="The page you asked for does not exist or has moved."
				link={{ label: "Back home", url: "/" }}
			/>
		</div>
	);
}
