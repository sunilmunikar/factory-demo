import { describe, expect, it } from "vitest";
import { slugify } from "../src/slugify.js";

describe("slugify", () => {
  it("lowercases and joins words with hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("collapses runs of punctuation and whitespace", () => {
    expect(slugify("  a -- b !! c  ")).toBe("a-b-c");
  });

  it("strips accents", () => {
    expect(slugify("Crème Brûlée")).toBe("creme-brulee");
  });

  it("returns an empty string when nothing is slug-safe", () => {
    expect(slugify("!!!")).toBe("");
  });
});
