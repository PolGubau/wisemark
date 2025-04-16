import type { locales } from "@/constants/locales";

export type Locale = (typeof locales)[number]["locale"];
