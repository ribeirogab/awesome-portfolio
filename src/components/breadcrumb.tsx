import Link from "next/link";

type Crumb = {
	label: string;
	href?: string;
};

type BreadcrumbProps = {
	items: Crumb[];
	label: string;
};

export function Breadcrumb({ items, label }: BreadcrumbProps) {
	return (
		<nav className="breadcrumb" aria-label={label}>
			<ol>
				{items.map((item, index) => (
					<li key={item.label}>
						{item.href ? (
							<Link href={item.href}>{item.label}</Link>
						) : (
							<span aria-current="page">{item.label}</span>
						)}
						{index < items.length - 1 ? (
							<span className="breadcrumb-sep" aria-hidden="true">
								/
							</span>
						) : null}
					</li>
				))}
			</ol>
		</nav>
	);
}
