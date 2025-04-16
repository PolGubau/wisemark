import type { CSSProperties } from "react";
import type { Result } from "./lib";

export type FuzzyOptions<T, U = T> = {
	key?: keyof T;
	getKey?: (item: T) => Array<string | null>;
	debug?: boolean;
	limit?: number;
	maxScore?: number;
	mapResult?: (
		value: T,
		index: number,
		array: Array<{
			item: T;
			score: number;
			matches: Array<Array<[number, number]> | null>;
		}>,
	) => U;
};

export type Fuzzy<T> = (query: string) => {
	results: Result<T>[];
	length: number;
	time: number;
	normalizedQuery: string;
	hasExactMatch: boolean;
	bestMatch: Result<T> | null;
	hasResults: boolean;
};

// REACT
export type HighlightProps = {
	text: string;
	ranges: Array<[number, number]> | null;
	style?: CSSProperties;
	className?: string;
};

/*

type FuzzyOptions<T, U = T> = {
	key?: keyof T;
	getKey?: (item: T) => Array<string | null>;
	debug?: boolean;
	limit?: number;
	maxScore?: number;
	mapResult?: (
		value: T,
		index: number,
		array: Array<{
			item: T;
			score: number;
			matches: Array<Array<[number, number]> | null>;
		}>,
	) => U;
};

type Fuzzy<T> = (query: string) => {
	results: Array<{
		item: T;
		score: number;
		matches: Array<Array<[number, number]> | null>;
	}>;
	length: number;
	time: number;
	normalizedQuery: string;
	hasExactMatch: boolean;
	bestMatch: {
		item: T;
		score: number;
		matches: Array<Array<[number, number]> | null>;
	} | null;
	hasResults: boolean;
};
function fuzzy<T, U>(collection: T[], options: FuzzyOptions<T, U>): Fuzzy<U>;

*/
