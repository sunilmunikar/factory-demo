import { describe, expect, it } from "vitest";
import { slugify } from "../src/slugify.js";

// Letters with no Unicode decomposition survive NFKD unchanged, so the accent-stripping
// step cannot reach them. They must be transliterated explicitly (issue #2).
describe("slugify transliteration", () => {
  it("expands ß to ss", () => {
    expect(slugify("Straße")).toBe("strasse");
  });

  it("expands Æ to ae", () => {
    expect(slugify("Æsir saga")).toBe("aesir-saga");
  });

  it("maps Ł to l", () => {
    expect(slugify("Łódź")).toBe("lodz");
  });

  it("covers the other undecomposable Latin letters", () => {
    expect(slugify("Ørsted Đorđe Œuvre Þór")).toBe("orsted-dorde-oeuvre-thor");
  });
});
