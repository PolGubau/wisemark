"use client";
import type { Locale } from "@/types/base";
import { Highlight, useFuzzy } from "@polgubau/fuzzy/react";
import { useParams } from "next/navigation";
import type { FuzzyResponse, Result } from "@polgubau/fuzzy";
import React from "react";

type Fruit = {
	color: string;
	emoji: string;
	labels: Record<Locale, string>;
};

const fruits: Fruit[] = [
	{
		color: "red",
		emoji: "🍎",
		labels: { en: "Apple", es: "Manzana", se: "Poma", de: "Apfel" },
	},
	{
		color: "yellow",
		emoji: "🍌",
		labels: { en: "Banana", es: "Plátano", se: "Plàtan", de: "Banane" },
	},
	{
		color: "orange",
		emoji: "🍊",
		labels: { en: "Orange", es: "Naranja", se: "Taronja", de: "Orange" },
	},
	{
		color: "green",
		emoji: "🍐",
		labels: { en: "Pear", es: "Pera", se: "Perera", de: "Birne" },
	},
	{
		color: "purple",
		emoji: "🍇",
		labels: { en: "Grapes", es: "Uvas", se: "Raïm", de: "Trauben" },
	},
	{
		color: "brown",
		emoji: "🥥",
		labels: { en: "Coconut", es: "Coco", se: "Coco", de: "Kokosnuss" },
	},
	{
		color: "red",
		emoji: "🍒",
		labels: { en: "Cherries", es: "Cerezas", se: "Cireres", de: "Kirschen" },
	},
	{
		color: "red",
		emoji: "🍓",
		labels: { en: "Strawberry", es: "Fresa", se: "Maduixa", de: "Erdbeere" },
	},
	{
		color: "yellow",
		emoji: "🍍",
		labels: { en: "Pineapple", es: "Piña", se: "Pinya", de: "Ananas" },
	},
	{
		color: "green",
		emoji: "🥝",
		labels: { en: "Kiwi", es: "Kiwi", se: "Kiwi", de: "Kiwi" },
	},
	{
		color: "blue",
		emoji: "🫐",
		labels: { en: "Blueberry", es: "Arándano", se: "Nabiu", de: "Heidelbeere" },
	},
	{
		color: "orange",
		emoji: "🥭",
		labels: { en: "Mango", es: "Mango", se: "Mango", de: "Mango" },
	},
	{
		color: "brown",
		emoji: "🌰",
		labels: { en: "Chestnut", es: "Castaña", se: "Castanya", de: "Kastanie" },
	},
	{
		color: "yellow",
		emoji: "🍋",
		labels: { en: "Lemon", es: "Limón", se: "Llimona", de: "Zitrone" },
	},
	{
		color: "green",
		emoji: "🍏",
		labels: {
			en: "Green Apple",
			es: "Manzana verde",
			se: "Poma verda",
			de: "Grüner Apfel",
		},
	},
	{
		color: "red",
		emoji: "🍅",
		labels: { en: "Tomato", es: "Tomate", se: "Tomàquet", de: "Tomate" },
	},
	{
		color: "brown",
		emoji: "🥑",
		labels: { en: "Avocado", es: "Aguacate", se: "Alvocat", de: "Avocado" },
	},
	{
		color: "purple",
		emoji: "🍆",
		labels: {
			en: "Eggplant",
			es: "Berenjena",
			se: "Albergínia",
			de: "Aubergine",
		},
	},
	{
		color: "green",
		emoji: "🥒",
		labels: { en: "Cucumber", es: "Pepino", se: "Cogombre", de: "Gurke" },
	},
	{
		color: "orange",
		emoji: "🥕",
		labels: { en: "Carrot", es: "Zanahoria", se: "Pastanaga", de: "Karotte" },
	},
	{
		color: "white",
		emoji: "🌽",
		labels: { en: "Corn", es: "Maíz", se: "Blat de moro", de: "Mais" },
	},
	{
		color: "green",
		emoji: "🥬",
		labels: { en: "Lettuce", es: "Lechuga", se: "Enciam", de: "Kopfsalat" },
	},
	{
		color: "white",
		emoji: "🥔",
		labels: { en: "Potato", es: "Patata", se: "Patata", de: "Kartoffel" },
	},
	{
		color: "orange",
		emoji: "🍠",
		labels: {
			en: "Sweet Potato",
			es: "Boniato",
			se: "Moniato",
			de: "Süßkartoffel",
		},
	},
	{
		color: "white",
		emoji: "🧄",
		labels: { en: "Garlic", es: "Ajo", se: "All", de: "Knoblauch" },
	},
	{
		color: "white",
		emoji: "🧅",
		labels: { en: "Onion", es: "Cebolla", se: "Ceba", de: "Zwiebel" },
	},
	{
		color: "red",
		emoji: "🍉",
		labels: {
			en: "Watermelon",
			es: "Sandía",
			se: "Síndria",
			de: "Wassermelone",
		},
	},
	{
		color: "yellow",
		emoji: "🍈",
		labels: { en: "Melon", es: "Melón", se: "Meló", de: "Melone" },
	},
	{
		color: "brown",
		emoji: "🥜",
		labels: { en: "Peanut", es: "Cacahuete", se: "Cacauet", de: "Erdnuss" },
	},
	{
		color: "brown",
		emoji: "🌰",
		labels: { en: "Hazelnut", es: "Avellana", se: "Avellana", de: "Haselnuss" },
	},
	{
		color: "green",
		emoji: "🫛",
		labels: { en: "Peas", es: "Guisantes", se: "Pèsols", de: "Erbsen" },
	},
	{
		color: "green",
		emoji: "🫒",
		labels: { en: "Olive", es: "Aceituna", se: "Oliva", de: "Olive" },
	},
	{
		color: "red",
		emoji: "🍓",
		labels: {
			en: "Wild Strawberry",
			es: "Fresa silvestre",
			se: "Maduixeta",
			de: "Wald-Erdbeere",
		},
	},
	{
		color: "green",
		emoji: "🍃",
		labels: { en: "Herbs", es: "Hierbas", se: "Herbes", de: "Kräuter" },
	},
	{
		color: "green",
		emoji: "🍀",
		labels: { en: "Clover", es: "Trébol", se: "Trèvol", de: "Klee" },
	},
	{
		color: "purple",
		emoji: "🫐",
		labels: { en: "Blackberry", es: "Mora", se: "Móra", de: "Brombeere" },
	},
	{
		color: "red",
		emoji: "🍅",
		labels: {
			en: "Cherry Tomato",
			es: "Tomatito",
			se: "Tomàquet cherry",
			de: "Cherrytomate",
		},
	},
	{
		color: "orange",
		emoji: "🟠",
		labels: {
			en: "Tangerine",
			es: "Mandarina",
			se: "Mandarina",
			de: "Mandarine",
		},
	},
	{
		color: "yellow",
		emoji: "🍋",
		labels: { en: "Citron", es: "Cidra", se: "Cidra", de: "Zedrat-Zitrone" },
	},
	{
		color: "green",
		emoji: "🥒",
		labels: { en: "Zucchini", es: "Calabacín", se: "Carbassó", de: "Zucchini" },
	},
	{
		color: "white",
		emoji: "🥥",
		labels: {
			en: "White Coconut",
			es: "Coco blanco",
			se: "Coco blanc",
			de: "Weiße Kokosnuss",
		},
	},
	{
		color: "red",
		emoji: "🍓",
		labels: { en: "Raspberry", es: "Frambuesa", se: "Gerd", de: "Himbeere" },
	},
	{
		color: "red",
		emoji: "🫒",
		labels: {
			en: "Red Olive",
			es: "Aceituna roja",
			se: "Oliva roja",
			de: "Rote Olive",
		},
	},
	{
		color: "purple",
		emoji: "🍆",
		labels: {
			en: "Purple Yam",
			es: "Ñame morado",
			se: "Nyam morat",
			de: "Lila Yamswurzel",
		},
	},
	{
		color: "brown",
		emoji: "🌰",
		labels: {
			en: "Brazil Nut",
			es: "Nuez de Brasil",
			se: "Nou del Brasil",
			de: "Paranuss",
		},
	},
	{
		color: "brown",
		emoji: "🥜",
		labels: { en: "Almond", es: "Almendra", se: "Ametlla", de: "Mandel" },
	},
	{
		color: "brown",
		emoji: "🥜",
		labels: { en: "Walnut", es: "Nuez", se: "Nou", de: "Walnuss" },
	},
	{
		color: "green",
		emoji: "🍈",
		labels: {
			en: "Honeydew",
			es: "Melón verde",
			se: "Meló verd",
			de: "Honigmelone",
		},
	},
	{
		color: "green",
		emoji: "🥬",
		labels: { en: "Spinach", es: "Espinaca", se: "Espinac", de: "Spinat" },
	},
];
export const UsageExample = () => {
	const { lang } = useParams();
	const locale = lang as Locale;
	const [query, setQuery] = React.useState<string>("");
	const [render, setRender] = React.useState<"ui" | "json">("ui");

	const [vanillaFiltered, setVanillaFiltered] = React.useState<Fruit[]>([]);

	const response = useFuzzy<Fruit>({
		list: fruits,
		query,
		getKey(item) {
			return [item.labels.en, item.labels.es, item.labels.se, item.labels.de];
		},
	});

	React.useEffect(() => {
		const coreSearchFn = (query: string, items: Fruit[]): Fruit[] => {
			return items.filter((item) => {
				const labels = Object.values(item.labels);
				const searchString = labels.join(" ");
				const searchWords = query.split(" ");
				const searchRegex = new RegExp(searchWords.join("|"), "i");
				return searchRegex.test(searchString);
			});
		};
		setVanillaFiltered(coreSearchFn(query, fruits));
	}, [query]);

	const dictionary: Record<
		Locale,
		{
			heading: string;
			headingOptions: Array<{ name: string; value: string }>;
			placeholder: string;
			title: string;
			titles: {
				vanilla: string;
				fuzzy: string;
			};
		}
	> = {
		en: {
			heading: "Try searching: ",
			headingOptions: [
				{ name: "Apple", value: "apple" },
				{ name: "Banaa", value: "banaa" },
				{ name: "Oange", value: "oange" },
				{ name: "Graps", value: "graps" },
			],
			placeholder: "Search for a fruit even with errors...",
			title: "Fruit Searcher",
			titles: {
				vanilla: "Vanilla Filter",
				fuzzy: "Fuzzy finder",
			},
		},
		es: {
			heading: "Prueba a buscar: ",
			headingOptions: [
				{ name: "Manzana", value: "manzana" },
				{ name: "Platano", value: "platano" },
				{ name: "Naraja", value: "naraja" },
				{ name: "Uvs", value: "uvs" },
			],
			placeholder: "Busca una fruta incluso con errores...",
			title: "Buscador de frutas",
			titles: {
				vanilla: "Filtro por defecto",
				fuzzy: "Buscador Fuzzy",
			},
		},
		se: {
			heading: "Prova a buscar: ",
			headingOptions: [
				{ name: "Poma", value: "poma" },
				{ name: "Platan", value: "platan" },
				{ name: "Tarnja", value: "tarnja" },
				{ name: "Coo", value: "coo" },
			],
			placeholder: "Cerca una fruita fins i tot amb errors... ",
			title: "Cercador de fruites",
			titles: {
				vanilla: "Filtre per defecte",
				fuzzy: "Cercador Fuzzy",
			},
		},
		de: {
			heading: "Versuchen Sie zu suchen: ",
			headingOptions: [
				{ name: "Apfel", value: "apfel" },
				{ name: "Baana", value: "baana" },
				{ name: "Orage", value: "orage" },
				{ name: "Traen", value: "traen" },
			],
			placeholder: "Suchen Sie eine Frucht sogar mit Fehlern...",
			title: "Fuzzy-Sucher",
			titles: {
				vanilla: "Standardfilter",
				fuzzy: "Vager Finder",
			},
		},
	};

	const currentDictionary = dictionary[locale];

	return (
		<section>
			<header className="flex gap-2 items-center flex-wrap mb-4">
				<h2 className="text-lg mt-0">{currentDictionary.heading}</h2>
				<nav className="flex gap-2 flex-wrap mb-4">
					{currentDictionary.headingOptions.map((option) => (
						<button
							key={option.value}
							type="button"
							className="border border-primary/20 px-2 py-1 rounded-xl hover:bg-primary/10 transition-colors"
							onClick={() => setQuery(option.value)}
						>
							{option.name}
						</button>
					))}
				</nav>
			</header>
			<table>
				<thead>
					<tr>
						<th colSpan={2}>
							<header className="flex gap-2 items-center justify-between flex-wrap">
								<h2 className="text-lg mt-0">{currentDictionary.title}</h2>
								<nav className="flex gap-1">
									<button
										type="button"
										className={`border border-primary/20 px-2 py-1 rounded-xl hover:bg-primary/10 transition-colors ${render === "ui" ? "bg-primary/20" : ""}`}
										onClick={() => setRender("ui")}
										disabled={render === "ui"}
									>
										UI
									</button>
									<button
										type="button"
										className={`border border-primary/20 px-2 py-1 rounded-xl hover:bg-primary/10 transition-colors ${render === "json" ? "bg-primary/20" : ""}`}
										onClick={() => setRender("json")}
										disabled={render === "json"}
									>
										JSON
									</button>
								</nav>
							</header>
							<input
								type="search"
								value={query}
								className="border-b border-primary/20 p-2 w-full"
								onChange={(e) => setQuery(e.target.value)}
								placeholder={currentDictionary.placeholder}
								aria-label={currentDictionary.title}
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="grid grid-cols-2">
						<td>
							<h3 className="mt-0">{currentDictionary.titles.vanilla}</h3>
							<FruitList list={vanillaFiltered} render={render} />
						</td>
						<td>
							<h3 className="mt-0">{currentDictionary.titles.fuzzy}</h3>
							<FuzzyFruitList list={response} render={render} />
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export const FruitUI = ({ fruit }: { fruit: Fruit }) => {
	const { lang } = useParams();
	const locale = lang as Locale;
	const label = fruit.labels[locale] || fruit.labels.en;
	return (
		<div className="flex gap-2 items-center p-0.5">
			<div
				className="w-2 h-2 rounded-full"
				style={{ backgroundColor: fruit.color }}
			/>
			<span>{label}</span>
			<span>{fruit.emoji}</span>
		</div>
	);
};
export const FuzzyFruitUI = ({ fruit }: { fruit: Result<Fruit> }) => {
	const { lang } = useParams();
	const locale = lang as Locale;
	const { item } = fruit;
	const label = item.labels[locale] || item.labels.en;
	const ordenLocales = ["en", "es", "cn", "de"];
	const getLocaleIndex = (locale: Locale) => {
		const index = ordenLocales.indexOf(locale);
		return index !== -1 ? index : ordenLocales.length;
	};
	return (
		<div className="flex gap-2 items-center p-0.5">
			<div
				className="w-2 h-2 rounded-full"
				style={{ backgroundColor: item.color }}
			/>
			<span>
				<Highlight
					text={label}
					ranges={fruit.matches[getLocaleIndex(locale)]}
				/>
			</span>

			<span>{item.emoji}</span>
		</div>
	);
};

export const FruitList = ({
	list,
	render,
}: { list: Fruit[]; render: "ui" | "json" }) => {
	return (
		<div className=" h-[400px] overflow-y-auto">
			{render === "json" && <pre>{JSON.stringify(list, null, 2)}</pre>}
			{render === "ui" && (
				<ul className="flex flex-col gap-2 h-[400px] overflow-y-auto">
					{list.map((fruit) => (
						<FruitUI fruit={fruit} key={fruit.labels.en} />
					))}
				</ul>
			)}
		</div>
	);
};
export const FuzzyFruitList = ({
	list,
	render,
}: { list: FuzzyResponse<Fruit>; render: "ui" | "json" }) => {
	return (
		<div className=" h-[400px] overflow-y-auto">
			{render === "json" && <pre>{JSON.stringify(list, null, 2)}</pre>}
			{render === "ui" && (
				<ul className="flex flex-col gap-2">
					{list.results.map((fruit) => (
						<FuzzyFruitUI fruit={fruit} key={fruit.item.labels.en} />
					))}
				</ul>
			)}
		</div>
	);
};
