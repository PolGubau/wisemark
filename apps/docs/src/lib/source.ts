import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { i18n } from "@/lib/i18n";

// `loader()` also assign a URL to your pages
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
	baseUrl: "docs/",
	i18n,
	source: docs.toFumadocsSource(),
});
