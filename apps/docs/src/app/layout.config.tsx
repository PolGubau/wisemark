import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "@/lib/i18n";
import type { Locale } from "@/types/base";

export function baseOptions(locale: Locale): BaseLayoutProps {
	const docsLabels = {
		es: "Documentación",
		en: "Documentation",
		se: "Documentació",
		de: "Dokumentation",
	};
	return {
		i18n,
		nav: {
			title: <>Fuzzy</>,
		},
		links: [
			{
				text: docsLabels[locale],
				url: "/docs",
				active: "nested-url",
			},
		],
	};
}
