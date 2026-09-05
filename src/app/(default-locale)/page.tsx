import type { Metadata } from "next";
import { loadDefaultLocaleContent } from "@/content/locale-content";
import { HomeView, homeMetadata } from "@/views/home";

const content = loadDefaultLocaleContent();

export const metadata: Metadata = homeMetadata(content);

export default function Home() {
	return <HomeView content={content} />;
}
