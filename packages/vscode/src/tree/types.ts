import type { Type } from "@wisemark/core";

export type TreeItemData = {
  label: string;
  filePath: string;
  line: number;
  type: Type;
  severity: string;
};