// Lowercase Latin letters that NFKD leaves intact, so accent stripping cannot reach them.
// Applied after lowercasing, so uppercase forms (including ẞ) are covered too.
const TRANSLITERATIONS: Record<string, string> = {
  ß: "ss",
  æ: "ae",
  ø: "o",
  ł: "l",
  đ: "d",
  œ: "oe",
  þ: "th",
};

/**
 * Turn arbitrary text into a URL-safe slug: lowercase ASCII letters and digits
 * separated by single hyphens, with no leading or trailing hyphen.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[ßæøłđœþ]/g, (ch) => TRANSLITERATIONS[ch] ?? ch)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
