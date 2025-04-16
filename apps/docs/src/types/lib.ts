import type { CSSProperties } from "react";

/**
 * Range of indices in a string, [index of first character, index of last character]
 */
export type Range = [number, number];

/**
 * List of character ranges in a string that should be highlighted
 */
export type HighlightRanges = Range[];

/**
 * List of fuzzy search matches (ranges of matching characters) for an item. This usually has one item, but can have more if `getKey`
 * was used to return multiple strings for an item.
 */
export type Matches = Array<HighlightRanges | null>;

/**
 * Result of fuzzy against an item.
 *
 * `item` - the item that was matched
 * `score` - Difference between the query and the item. The lower the score, the better the match.
 * `matches` - list of matches for the item. Each match is a list of ranges of characters that should be highlighted in the item.
 */
export type Result<T> = {
	/**
	 * The item that was matched
	 * @default null
	 * @example "foo"
	 */
	item: T;
	/**
	 * The score of the match. The lower the score, the better the match.
	 * @default 0
	 * @example 0.5
	 */
	score: number;
	/**
	 * The ranges of text that should be highlighted in the item.
	 * @default null
	 * @example [[0, 4], [7, 11]]
	 * @example null
	 */
	matches: Matches;
};

export type MapResult<T, U = T> = (
	value: T,
	index: number,
	array: Result<T>[],
) => U;

export type FuzzyOptions<T, U = T> = {
	/**
	 * key to search for in the item. This is useful if the item is an object and you want to search for a specific property.
	 * @default undefined
	 * @example "name"
	 */
	key?: keyof T;
	/**
	 * Function that returns the string to search for in the item. This is useful if the item is an object and you want to search for a specific property.
	 * @default undefined
	 * @example (item) => [item.name]
	 * @example (item) => [item.name, item.surname]
	 */
	getKey?: (item: T) => Array<string | null>;
	/**
	 * If true, will log debug information to the console
	 * @default false
	 */
	debug?: boolean;

	/**
	 * The maximum number of results to return. If not specified, all results will be returned.
	 * @description The lower the number, the more results will be filtered out.
	 * @default Number.MAX_SAFE_INTEGER
	 * @example 10
	 */
	limit?: number;

	/**
	 * The max score to return. If not specified, all results will be returned.
	 * @default 100
	 * @example 2.5
	 * @description The lower the score, the better the match.
	 */
	maxScore?: number;

	/**
	 * Function that maps the result item to a new item. Mostly used to transform the result item to a different type.
	 * @default (result) => result.item
	 * @example (result) => ({ ...result.item, score: result.score })
	 */
	mapResult?: MapResult<T, U>;
};

export type FuzzyResponse<T> = {
	/**
	 * The original query that was used to search
	 * @default ""
	 * @example "foo"
	 */
	results: Result<T>[];
	/**
	 * The number of results found
	 * @default 0
	 * @example 0
	 * @example 10
	 */
	length: number;
	/**
	 * The time it took to run the search in milliseconds
	 * @default 0
	 * @description The time it took to run the search in milliseconds
	 * @example 0.8
	 */
	time: number;

	/**
	 * The query that was used to search
	 * @default ""
	 */
	normalizedQuery: string;

	/**
	 * True if the query was an exact match to the item
	 * @default false
	 * @example true
	 */
	hasExactMatch: boolean;

	/**
	 * The best match found
	 * @default null
	 * @example { item: "foo", score: 0, matches: [] }
	 * @example null
	 */
	bestMatch: Result<T> | null;

	/**
	 * True if there were any results found
	 * @default false
	 * @example true
	 **/
	hasResults: boolean;
};

export type Fuzzy<T> = (query: string) => FuzzyResponse<T>;

// REACT
export type Style = CSSProperties;

export type HighlightProps = {
	/**
	 * The text to be highlighted.
	 * @default ""
	 * @example "Hello, World!"
	 */
	text: string;

	/**
	 * The ranges of text to be highlighted.
	 * @default null
	 * @example [[0, 4], [7, 11]]
	 */
	ranges: HighlightRanges | null;
	/**
	 * The style to be applied to the highlighted text.
	 * @default { backgroundColor: "rgba(245,220,0,.25)" }
	 */
	style?: Style;
	/**
	 * The class name to be applied to the highlighted text.
	 * @default ""
	 */
	className?: string;
};
