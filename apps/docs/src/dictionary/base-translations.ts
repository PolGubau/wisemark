import type { Locale } from "@/types/base";
import type { Translations } from "fumadocs-ui/i18n";

export const baseTranslations: Record<Locale, Translations> = {
	se: {
		search: "Cercar",
		searchNoResult: "Sense resultats",
		toc: "Taula de continguts",
		tocNoHeadings: "Sense encapçalaments",
		lastUpdate: "Última actualització",
		chooseLanguage: "Tria idioma",
		nextPage: "Pàgina següent",
		previousPage: "Pàgina anterior",
		chooseTheme: "Tria tema",
		editOnGithub: "Editar a GitHub",
	},
	es: {
		search: "Buscar",
		searchNoResult: "Sin resultados",
		toc: "Tabla de contenido",
		tocNoHeadings: "Sin encabezados",
		lastUpdate: "Última actualización",
		chooseLanguage: "Elegir idioma",
		nextPage: "Página siguiente",
		previousPage: "Página anterior",
		chooseTheme: "Elegir tema",
		editOnGithub: "Editar en GitHub",
	},
	de: {
		search: "Suchen",
		searchNoResult: "Keine Ergebnisse",
		toc: "Inhaltsverzeichnis",
		tocNoHeadings: "Keine Überschriften",
		lastUpdate: "Letzte Aktualisierung",
		chooseLanguage: "Sprache wählen",
		nextPage: "Nächste Seite",
		previousPage: "Vorherige Seite",
		chooseTheme: "Thema wählen",
		editOnGithub: "Auf GitHub bearbeiten",
	},
	en: {
		search: "Search",
		searchNoResult: "No results",
		toc: "Table of contents",
		tocNoHeadings: "No headings",
		lastUpdate: "Last update",
		chooseLanguage: "Choose language",
		nextPage: "Next page",
		previousPage: "Previous page",
		chooseTheme: "Choose theme",
		editOnGithub: "Edit on GitHub",
	},
};
