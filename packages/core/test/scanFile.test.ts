import { describe, it, expect } from "vitest";
import { scanFile } from "../src/scanner/scanFile";
 
describe("scanFile", () => {
	it("detects easy comments", () => {
		const input = `
// @note test -- id:foo severity:high tags:bug,refactor
// esto es un comentario normal
// @fixme Fix the button color 
`;

		const result = scanFile(input, "example.ts");

		expect(result).toHaveLength(2);
		expect(result[0]).toMatchObject({
			id: "foo",
			severity: "high",
			tags: ["bug", "refactor"],
			message: "test",
			type: "note",
			path: "example.ts",
			line: 2,
		});

		expect(result[1]).toMatchObject({
			id: "line-4",
			severity: undefined,
			tags: [],
			message: "Fix the button color",
			type: "fixme",
			path: "example.ts",
			line: 4,
		});
		expect(result[0].type).toBe("note");
		expect(result[1].type).toBe("fixme");
	});

	it("detects multiline comments", () => {
		const input = `/* 
    @todo test -- id:foo severity:high tags:bug,refactor
    */`;

		const result = scanFile(input, "example.ts");

		expect(result).toHaveLength(1);
		expect(result[0]).toMatchObject({
			id: "foo",
			severity: "high",
			tags: ["bug", "refactor"],
			message: "test",
			type: "todo",
			path: "example.ts",
			line: 2,
		});
	});
});
