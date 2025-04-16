import type { JSX } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import { GithubInfo } from "fumadocs-ui/components/github-info";
import type { Locale } from "@/types/base";
import { i18n } from "@/lib/i18n";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

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
type Text = "MadeBy" | "Proudly" | "version";
const allLinksTranslations: Record<Text, Record<Locale, string>> = {
	MadeBy: {
		en: "Made by",
		es: "Hecho por",
		se: "Fet per",
		de: "Gemacht von",
	},
	Proudly: {
		en: "Proudly",
		es: "Totalmente",
		se: "Totalment",
		de: "Stolz",
	},
	version: {
		en: "Version",
		es: "Versión",
		se: "Versió",
		de: "Version",
	},
};
const getText = (key: Text, locale: Locale) => {
	return allLinksTranslations[key][locale];
};

const docsOptions = (lang: Locale): DocsLayoutProps => {
	return {
		...baseOptions(lang),
		tree: source.pageTree[lang],
		githubUrl: "https://github.com/PolGubau/fuzzy",
		sidebar: {
			footer: (
				<div className="flex flex-col gap-2 text-sm">
					<p>
						{getText("MadeBy", lang)}{" "}
						<Link
							className="underline underline-offset-2 decoration-primary"
							href="https://polgubau.com"
							target="_blank"
							rel="noreferrer"
						>
							Pol Gubau Amores
						</Link>
					</p>
					<p className="opacity-70">
						{getText("Proudly", lang)}{" "}
						<Link
							className="underline underline-offset-2"
							href="https://github.com/PolGubau/fuzzy"
							target="_blank"
							rel="noreferrer"
						>
							Open Source
						</Link>
					</p>
				</div>
			),
		},
		i18n,
		links: [
			{
				type: "custom",
				children: (
					<GithubInfo owner="PolGubau" repo="fuzzy" className="lg:-mx-2" />
				),
			},
			{
				type: "menu",
				text: getText("version", lang),
				items: [{ text: "Latest", url: "/docs/" }],
			},
		],
	};
};
export default async function Layout({
	params,
	children,
}: {
	params: Promise<{ lang: Locale }>;
	children: JSX.Element;
}) {
	const { lang } = await params;
	return <DocsLayout {...docsOptions(lang)}>{children}</DocsLayout>;
}
