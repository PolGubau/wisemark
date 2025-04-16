import Link from "next/link";
import { DynamicLink } from "fumadocs-core/dynamic-link";
import type { Locale } from "@/types/base";

type Props = {
	lang: Locale;
};

const dictionary: Record<Locale, string> = {
	en: "Go to Docs",
	es: "Ir a la docu",
	se: "Veure docs",
	de: "Zu den Docs",
};

export const Links = ({ lang = "en" }: Props) => {
	return (
		<div className="flex justify-center text-sm gap-4 opacity-80">
			<DynamicLink
				href="/[lang]/docs"
				className="hover:underline text-center bg-neutral-500/20 w-fit py-2 px-4 rounded-xl flex items-center gap-2"
			>
				<span>{dictionary[lang]}</span>
				<span>&#8599;</span>
			</DynamicLink>
			<Link
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/PolGubau/fuzzy"
				className="hover:underline text-center w-fit py-2 px-4 rounded-xl"
			>
				Github
			</Link>
		</div>
	);
};
