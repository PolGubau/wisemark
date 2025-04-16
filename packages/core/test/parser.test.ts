import { describe, it, expect } from "vitest";
import { parseComments } from "../src/parser";

describe("parseComments", () => {
	it("detects easy comments", () => {
		const input = `
// @note test -- id:foo severity:high tags:bug,refactor
// esto es un comentario normal
// @fixme Fix the button color 
`;

		const result = parseComments(input, "example.ts");

		expect(result).toHaveLength(2);
		expect(result[0]).toMatchObject({
			id: "foo",
			severity: "high",
			tags: ["bug", "refactor"],
			message: "test",
			type: "note",
			filePath: "example.ts",
			line: 2,
		});

		expect(result[1]).toMatchObject({
			id: "line-4",
			severity: undefined,
			tags: [],
			message: "Fix the button color",
			type: "fixme",
			filePath: "example.ts",
			line: 4,
		});
		expect(result[0].type).toBe("note");
		expect(result[1].type).toBe("fixme");
	});

	it("detects multiline comments", () => {
		const input = `/* 
    @todo test -- id:foo severity:high tags:bug,refactor
    */`;

		const result = parseComments(input, "example.ts");

		expect(result).toHaveLength(1);
		expect(result[0]).toMatchObject({
			id: "foo",
			severity: "high",
			tags: ["bug", "refactor"],
			message: "test",
			type: "todo",
			filePath: "example.ts",
			line: 2,
		});
	});
});
