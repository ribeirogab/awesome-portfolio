"use client";

import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import {
	FiArrowUp,
	FiAtSign,
	FiGlobe,
	FiMenu,
	FiMoon,
	FiSun,
} from "react-icons/fi";
import type { DockMessages } from "@/schema/messages";
import type { EntryLink } from "@/schema/portfolio";

type NavItem = {
	href: string;
	label: string;
	index: string;
};

export type LanguageOption = {
	locale: string;
	name: string;
	prefix: string;
	articleSlugs: string[];
};

type MenuName = "sections" | "social" | "languages";

type DockProps = {
	navItems: NavItem[];
	socialLinks: EntryLink[];
	messages: DockMessages;
	currentLocale: string;
	languages: LanguageOption[];
};

function stripPrefix(pathname: string, prefix: string): string {
	if (!prefix) {
		return pathname;
	}
	if (pathname === prefix) {
		return "/";
	}
	return pathname.startsWith(`${prefix}/`)
		? pathname.slice(prefix.length)
		: pathname;
}

function languageHref(
	pathname: string,
	current: LanguageOption,
	target: LanguageOption,
): string {
	const path = stripPrefix(pathname, current.prefix);
	const articleMatch = path.match(/^\/articles\/([^/]+)$/);
	const targetPath =
		articleMatch && !target.articleSlugs.includes(articleMatch[1])
			? "/articles"
			: path;
	if (targetPath === "/") {
		return target.prefix || "/";
	}
	return `${target.prefix}${targetPath}`;
}

export function Dock({
	navItems,
	socialLinks,
	messages,
	currentLocale,
	languages,
}: DockProps) {
	const pathname = usePathname();
	const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
	const sectionsMenuRef = useRef<HTMLDivElement>(null);
	const socialMenuRef = useRef<HTMLDivElement>(null);
	const languagesMenuRef = useRef<HTMLDivElement>(null);
	const sectionsButtonRef = useRef<HTMLButtonElement>(null);
	const socialButtonRef = useRef<HTMLButtonElement>(null);
	const languagesButtonRef = useRef<HTMLButtonElement>(null);
	const current =
		languages.find((language) => language.locale === currentLocale) ??
		languages[0];

	useEffect(() => {
		if (!openMenu) {
			return;
		}
		const menuRef = {
			sections: sectionsMenuRef,
			social: socialMenuRef,
			languages: languagesMenuRef,
		}[openMenu];
		const buttonRef = {
			sections: sectionsButtonRef,
			social: socialButtonRef,
			languages: languagesButtonRef,
		}[openMenu];
		const focusFrame = requestAnimationFrame(() => {
			menuRef.current?.querySelector("a")?.focus();
		});
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpenMenu(null);
				buttonRef.current?.focus();
			}
		};
		const onClick = (event: Event) => {
			const target = event.target as Node;
			if (
				!menuRef.current?.contains(target) &&
				!buttonRef.current?.contains(target)
			) {
				setOpenMenu(null);
			}
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("click", onClick);
		return () => {
			cancelAnimationFrame(focusFrame);
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("click", onClick);
		};
	}, [openMenu]);

	const toggleMenu = (name: MenuName) => {
		setOpenMenu((value) => (value === name ? null : name));
	};

	const toggleTheme = () => {
		const root = document.documentElement;
		const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
		root.setAttribute("data-theme", next);
		try {
			localStorage.setItem("theme", next);
		} catch {}
	};

	const keepHash = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
		setOpenMenu(null);
		if (window.location.hash) {
			event.preventDefault();
			window.location.assign(`${href}${window.location.hash}`);
		}
	};

	const menuClass = (name: MenuName) =>
		openMenu === name ? "dock-menu open" : "dock-menu";

	return (
		<>
			<nav className="dock" aria-label={messages.quickActions}>
				<button
					className="dock-btn"
					type="button"
					aria-label={messages.backToTop}
					onClick={() => window.scrollTo({ top: 0 })}
				>
					<FiArrowUp strokeWidth={1.8} aria-hidden="true" />
				</button>
				<button
					className="dock-btn"
					type="button"
					ref={sectionsButtonRef}
					aria-label={
						openMenu === "sections"
							? messages.closeSections
							: messages.openSections
					}
					aria-expanded={openMenu === "sections"}
					aria-controls="dock-menu"
					onClick={() => toggleMenu("sections")}
				>
					<FiMenu strokeWidth={1.8} aria-hidden="true" />
				</button>
				<span className="dock-sep" aria-hidden="true" />
				<button
					className="dock-btn"
					type="button"
					ref={socialButtonRef}
					aria-label={
						openMenu === "social" ? messages.closeSocial : messages.openSocial
					}
					aria-expanded={openMenu === "social"}
					aria-controls="dock-social"
					onClick={() => toggleMenu("social")}
				>
					<FiAtSign strokeWidth={1.8} aria-hidden="true" />
				</button>
				<button
					className="dock-btn"
					type="button"
					aria-label={messages.toggleTheme}
					onClick={toggleTheme}
				>
					<FiMoon className="icon-moon" strokeWidth={1.8} aria-hidden="true" />
					<FiSun className="icon-sun" strokeWidth={1.8} aria-hidden="true" />
				</button>
				{languages.length > 1 ? (
					<button
						className="dock-btn"
						type="button"
						ref={languagesButtonRef}
						aria-label={
							openMenu === "languages"
								? messages.closeLanguages
								: messages.openLanguages
						}
						aria-expanded={openMenu === "languages"}
						aria-controls="dock-languages"
						onClick={() => toggleMenu("languages")}
					>
						<FiGlobe strokeWidth={1.8} aria-hidden="true" />
					</button>
				) : null}
			</nav>
			<div
				className={menuClass("sections")}
				id="dock-menu"
				ref={sectionsMenuRef}
				role="menu"
				aria-label={messages.sections}
			>
				{navItems.map((item) => (
					<a
						key={item.href}
						href={item.href}
						role="menuitem"
						onClick={() => setOpenMenu(null)}
					>
						{item.label} <span className="idx">{item.index}</span>
					</a>
				))}
			</div>
			<div
				className={menuClass("social")}
				id="dock-social"
				ref={socialMenuRef}
				role="menu"
				aria-label={messages.socialLinks}
			>
				{socialLinks.map((link) => (
					<a
						key={link.label}
						href={link.url}
						role="menuitem"
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => setOpenMenu(null)}
					>
						{link.label} <span className="idx">↗</span>
					</a>
				))}
			</div>
			{languages.length > 1 ? (
				<div
					className={menuClass("languages")}
					id="dock-languages"
					ref={languagesMenuRef}
					role="menu"
					aria-label={messages.languages}
				>
					{languages.map((language) => {
						const href = languageHref(pathname, current, language);
						return (
							<a
								key={language.locale}
								href={href}
								role="menuitem"
								aria-current={
									language.locale === current.locale ? "true" : undefined
								}
								onClick={(event) => keepHash(event, href)}
							>
								{language.name}{" "}
								<span className="idx">{language.locale.toUpperCase()}</span>
							</a>
						);
					})}
				</div>
			) : null}
		</>
	);
}
