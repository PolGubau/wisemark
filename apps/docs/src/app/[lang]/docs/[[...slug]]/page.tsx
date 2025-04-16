import { ExampleNotesSearchDisplay } from "@/components/examples/notes-search";
import { source } from "@/lib/source";
import { getGithubLastEdit } from "fumadocs-core/server";
import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui";
import { createTypeTable } from "fumadocs-typescript/ui";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Callout } from "fumadocs-ui/components/callout";
import defaultMdxComponents, { createRelativeLink } from "fumadocs-ui/mdx";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { UsageExample } from "@/components/examples/usage";

export default async function Page({
	params,
}: {
	params: Promise<{ lang: string; slug?: string[] }>;
}) {
	const { slug, lang } = await params;
	const page = source.getPage(slug, lang);
	if (!page) notFound();

	const githubInfo = {
		owner: "PolGubau",
		repo: "fuzzy",
		token: `Bearer ${process.env.GIT_TOKEN}`,
		path: `apps/docs/content/docs/${page.file.path}`,
	};

	const lastModifiedTime = await getGithubLastEdit(githubInfo);

	const MDXContent = page.data.body;
	const { AutoTypeTable } = createTypeTable();

	return (
		<DocsPage
			lastUpdate={lastModifiedTime ?? undefined}
			editOnGithub={{
				...githubInfo,
				sha: "main",
			}}
			tableOfContent={{
				style: "clerk",
				single: false,
			}}
			toc={page.data.toc}
			full={page.data.full}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>

			<DocsBody>
				<MDXContent
					components={{
						...defaultMdxComponents,
						Popup,
						Callout,
						Accordion,
						Accordions,
						Tab,
						Tabs,
						Step,
						Steps,
						PopupContent,
						PopupTrigger,
						TypeTable,
						AutoTypeTable,
						File,
						Folder,
						Files,
						pre: ({ ...props }) => (
							<CodeBlock {...props}>
								<Pre>{props.children}</Pre>
							</CodeBlock>
						),
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),

						// examples
						ExampleNotesSearchDisplay,
						UsageExample,
					}}
				/>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	};
}
