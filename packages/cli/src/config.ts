// futuro soporte para .wisemark.config.ts
export type wisemarkConfig = {
	include?: string[];
	exclude?: string[];
};

export function loadConfig(): wisemarkConfig {
	// de momento hardcoded, luego podemos hacer un dynamic import
	return {
		include: ["**/*.{ts,tsx,js,jsx}"],
		exclude: ["node_modules", "dist"],
	};
}
