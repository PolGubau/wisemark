import { Card } from "@/components/card";
import { CopySnipped } from "@/components/copy-snipped";
import { Header } from "@/components/header";
import { Links } from "@/components/links";
import type { Locale } from "@/types/base";

export default async function Page({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	return (
		<section className="flex gap-[40vh] flex-col items-center pt-[30vh] h-full">
			<Card>
				<Header />
				<CopySnipped lang={lang} />
				<Links lang={lang} />
			</Card>
		</section>
	);
}
