"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUp, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { githubUrl } from "@/data/portfolio";

const sections = [
	{ href: "#experience", label: "Experience", index: "01" },
	{ href: "#projects", label: "Projects", index: "02" },
	{ href: "#stack", label: "Stack", index: "03" },
	{ href: "#contact", label: "Contact", index: "04" },
];

export function Dock() {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!menuOpen) {
			return;
		}
		const focusFrame = requestAnimationFrame(() => {
			menuRef.current?.querySelector("a")?.focus();
		});
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMenuOpen(false);
				menuButtonRef.current?.focus();
			}
		};
		const onClick = (event: MouseEvent) => {
			const target = event.target as Node;
			if (
				!menuRef.current?.contains(target) &&
				!menuButtonRef.current?.contains(target)
			) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("click", onClick);
		return () => {
			cancelAnimationFrame(focusFrame);
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("click", onClick);
		};
	}, [menuOpen]);

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
					ref={menuButtonRef}
					aria-label={menuOpen ? "Close section menu" : "Open section menu"}
					aria-expanded={menuOpen}
					aria-controls="dock-menu"
					onClick={() => setMenuOpen((value) => !value)}
				>
					<FiMenu strokeWidth={1.8} aria-hidden="true" />
				</button>
				<span className="dock-sep" aria-hidden="true" />
				<a
					className="dock-btn"
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub profile"
				>
					<SiGithub aria-hidden="true" />
				</a>
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
				className={menuOpen ? "dock-menu open" : "dock-menu"}
				id="dock-menu"
				ref={menuRef}
				role="menu"
				aria-label="Sections"
			>
				{sections.map((section) => (
					<a
						key={section.href}
						href={section.href}
						role="menuitem"
						onClick={() => setMenuOpen(false)}
					>
						{section.label} <span className="idx">{section.index}</span>
					</a>
				))}
			</div>
		</>
	);
}
