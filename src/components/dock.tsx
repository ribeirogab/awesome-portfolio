"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUp, FiAtSign, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { socialLinks } from "@/data/portfolio";

const sections = [
	{ href: "#experience", label: "Experience", index: "01" },
	{ href: "#projects", label: "Projects", index: "02" },
	{ href: "#stack", label: "Stack", index: "03" },
	{ href: "#contact", label: "Contact", index: "04" },
];

type MenuName = "sections" | "social";

export function Dock() {
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
				{sections.map((section) => (
					<a
						key={section.href}
						href={section.href}
						role="menuitem"
						onClick={() => setOpenMenu(null)}
					>
						{section.label} <span className="idx">{section.index}</span>
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
