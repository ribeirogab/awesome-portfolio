import { HeadLink } from "@/components/head-link";
import type { EntryLink } from "@/schema/portfolio";

type PageHeadProps = {
	title: string;
	description: string;
	link?: EntryLink;
};

export function PageHead({ title, description, link }: PageHeadProps) {
	return (
		<header className="page-head">
			<div>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			{link ? <HeadLink link={link} /> : null}
		</header>
	);
}
