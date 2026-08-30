"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUp, FiAtSign, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import type { EntryLink } from "@/schema/portfolio";

type NavItem = {
	href: string;
	label: string;
	index: string;
};

type MenuName = "sections" | "social";

type DockProps = {
	navItems: NavItem[];
	socialLinks: EntryLink[];
};

export function Dock({ navItems, socialLinks }: DockProps) {
	const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
	const sectionsMenuRef = useRef<HTMLDivElement>(null);
	const sectionsButtonRef = useRef<HTMLButtonElement>(null);
	const socialMenuRef = useRef<HTMLDivElement>(null);
	const socialButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!openMenu) {
			return;
		}
		const menuRef = openMenu === "sections" ? sectionsMenuRef : socialMenuRef;
		const buttonRef =
			openMenu === "sections" ? sectionsButtonRef : socialButtonRef;
		const focusFrame = requestAnimationFrame(() => {
			menuRef.current?.querySelector("a")?.focus();
		});
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpenMenu(null);
				buttonRef.current?.focus();
			}
		};
		const onClick = (event: MouseEvent) => {
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

	return (
		<>
			<nav className="dock" aria-label="Quick actions">
				<button
					className="dock-btn"
					type="button"
					aria-label="Back to top"
					onClick={() => window.scrollTo({ top: 0 })}
				>
					<FiArrowUp strokeWidth={1.8} aria-hidden="true" />
				</button>
				<button
					className="dock-btn"
					type="button"
					ref={sectionsButtonRef}
					aria-label={
						openMenu === "sections" ? "Close section menu" : "Open section menu"
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
						openMenu === "social"
							? "Close social links menu"
							: "Open social links menu"
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
					aria-label="Toggle theme"
					onClick={toggleTheme}
				>
					<FiMoon className="icon-moon" strokeWidth={1.8} aria-hidden="true" />
					<FiSun className="icon-sun" strokeWidth={1.8} aria-hidden="true" />
				</button>
			</nav>
			<div
				className={openMenu === "sections" ? "dock-menu open" : "dock-menu"}
				id="dock-menu"
				ref={sectionsMenuRef}
				role="menu"
				aria-label="Sections"
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
				className={openMenu === "social" ? "dock-menu open" : "dock-menu"}
				id="dock-social"
				ref={socialMenuRef}
				role="menu"
				aria-label="Social links"
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
		</>
	);
}
