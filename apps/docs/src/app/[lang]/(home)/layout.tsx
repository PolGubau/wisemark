import { Background } from "@/components/bg";
import type { Locale } from "@/types/base";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { Metadata, ResolvingMetadata } from "next";
import type { JSX } from "react";
import { baseOptions } from "../../layout.config";

type Props = {
	params: Promise<{ lang: Locale }>;
	children: React.ReactNode;
};

const metadataByLang: Record<Locale, Metadata> = {
	es: {
		title:
			"Fuzzy - Biblioteca de búsqueda difusa optimizada y fácil de usar - Pol Gubau Amores",
		description:
			"Una biblioteca optimizada para la búsqueda inexacta, diseñada para el rendimiento y la facilidad de uso.",
	},
	en: {
		title: "Fuzzy - Optimized and easy fuzzy finder library - Pol Gubau Amores",
		description:
			"A comprehensive library for fuzzy searching and matching, designed for performance and ease of use.",
	},
	se: {
		title:
			"Fuzzy - Biblioteca de fuzzy finder optimitzada i fàcil d'usar - Pol Gubau Amores",
		description:
			"Una biblioteca optimizada per a la cerca difusa, dissenyada per al rendiment i la facilitat d'ús.",
	},
	de: {
		title:
			"Fuzzy - Optimierte und einfach zu verwendende Fuzzy-Finder-Bibliothek - Pol Gubau Amores",
		description:
			"Eine umfassende Bibliothek für unscharfes Suchen und Abgleichen, die für Leistung und Benutzerfreundlichkeit entwickelt wurde.",
	},
};
export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const { lang } = await params;

	// optionally access and extend (rather than replace) parent metadata
	const prevMetadata = await parent;

	const metadata = metadataByLang[lang];

	const oldMetadata = prevMetadata as Metadata;

	return {
		...oldMetadata,
		title: metadata.title,
		description: metadata.description,
		openGraph: {
			...oldMetadata.openGraph,
			title: metadata.title ?? oldMetadata.title ?? undefined,
			description: metadata.description ?? oldMetadata.description ?? undefined,
			images: [
				{
					url: "https://polgubau.com/fuzzy/opengraph-image.png",
					alt: "Fuzzy Finder Library",
				},
			],
		},
	};
}
export default async function Layout({
	params,
	children,
}: {
	params: Promise<{ lang: Locale }>;
	children: JSX.Element;
}) {
	const { lang } = await params;

	return (
		<HomeLayout {...baseOptions(lang)}>
			<div className="min-h-screen w-screen relative overflow-x-hidden">
				<section className="h-screen fixed top-0 w-screen select-none pointer-events-none">
					<Background />
				</section>
				<main className="z-20 h-full w-screen mb-20 relative">{children}</main>
			</div>
		</HomeLayout>
	);
}
