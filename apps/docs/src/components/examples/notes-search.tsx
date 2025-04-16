"use client";
import { useState } from "react";
import { Highlight, useFuzzy } from "@polgubau/fuzzy/react";

export const notes = [
	{
		id: 1,
		title: "Practice Nuxt.js",
		content: "Learn how to use Nuxt.js for server-side rendering.",
	},
	{
		id: 2,
		title: "Build a Todo App",
		content: "Create a simple todo app using React and TypeScript.",
	},
	{
		id: 3,
		title: "Learn TypeScript",
		content: "Understand the basics of TypeScript and its features.",
	},
	{
		id: 4,
		title: "Explore React Router",
		content: "Learn how to use React Router for navigation in React apps.",
	},
	{
		id: 5,
		title: "Study Redux",
		content: "Understand how to manage state with Redux.",
	},
];

const Search: React.FC = () => {
	const [query, setQuery] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
	};

	const { results } = useFuzzy({
		list: notes,
		query,
		getKey: (item) => [item.title, item.content],
	});

	return (
		<div>
			<input
				className="border-2 border-fd-foreground dark:bg-fd-accent rounded-lg w-full p-2 mb-4"
				type="search"
				value={query}
				title="Search notes"
				name="search"
				id="search"
				onChange={handleChange}
				placeholder="Search notes..."
			/>
			<ul>
				{results.map(({ item, matches: [titleRanges, contentRanges] }) => (
					<li key={item.id}>
						<h3>
							<Highlight text={item.title} ranges={titleRanges} />
						</h3>
						<p>
							<Highlight text={item.content} ranges={contentRanges} />
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export const ExampleNotesSearchDisplay = () => {
	return (
		<div className="border-2 border-fd-foreground dark:bg-fd-accent rounded-2xl w-full max-w-3xl shadow-lg max-h-[600px] md:aspect-video overflow-auto grid grid-rows-[auto_1fr] ">
			{/* Header of the "browser" */}
			<header className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-3 rounded-t-2xl">
				<div className="flex space-x-2">
					<div className="w-3 h-3 bg-red-500 rounded-full" />
					<div className="w-3 h-3 bg-yellow-500 rounded-full" />
					<div className="w-3 h-3 bg-green-500 rounded-full" />
				</div>
				<small className="text-xs text-gray-600 dark:text-gray-300">
					Notes Finder
				</small>
				<div className="w-12" /> {/* Space to center the title */}
			</header>

			{/* Content of the "browser" */}
			<section className="p-4 overflow-auto">
				<Search />
			</section>
		</div>
	);
};
