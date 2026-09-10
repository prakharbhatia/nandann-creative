const TITLE_MAX_LENGTH = 60;
const DESCRIPTION_MIN_LENGTH = 70;
const DESCRIPTION_MAX_LENGTH = 160;
const SHORT_DESCRIPTION_SUFFIX =
  ' Explore practical guidance and examples from Nandann Creative.';

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function truncateAtWord(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;

  const candidate = value.slice(0, maxLength - 1);
  const lastSpace = candidate.lastIndexOf(' ');
  const trimmed = (lastSpace >= Math.floor(maxLength * 0.7)
    ? candidate.slice(0, lastSpace)
    : candidate
  ).replace(/[\s,;:!?.\-–—]+$/u, '');

  return `${trimmed}…`;
}

export function normalizeSeoTitle(value: string): string {
  const title = collapseWhitespace(value);
  if (title.length <= TITLE_MAX_LENGTH) return title;

  const withoutLongBrand = title.replace(
    /\s(?:[-|–—])\sNandann Creative(?: Agency)?$/iu,
    '',
  );
  const suffix = ' | Nandann';
  const base = truncateAtWord(
    withoutLongBrand,
    TITLE_MAX_LENGTH - suffix.length,
  ).replace(/…$/, '');

  return `${base}${suffix}`;
}

export function normalizeMetaDescription(value: string): string {
  let description = collapseWhitespace(value);

  if (description.length < DESCRIPTION_MIN_LENGTH) {
    description = `${description.replace(/[.!?]?$/u, '.')} ${SHORT_DESCRIPTION_SUFFIX.trim()}`;
  }

  return truncateAtWord(description, DESCRIPTION_MAX_LENGTH);
}

/**
 * Blog post bodies come from generated HTML and occasionally contain another
 * H1 or skip from H2 directly to H4. Keep the page title as the only H1 and
 * constrain body headings to descend by at most one level.
 */
export function normalizeArticleHeadingLevels(html: string): string {
  let previousLevel = 1;

  return html.replace(
    /<h([1-6])(\b[^>]*)>([\s\S]*?)<\/h\1>/giu,
    (_match, rawLevel: string, attributes: string, contents: string) => {
      const requestedLevel = Math.max(2, Number(rawLevel));
      const level = Math.min(requestedLevel, previousLevel + 1);
      previousLevel = level;
      return `<h${level}${attributes}>${contents}</h${level}>`;
    },
  );
}

export const SEO_LIMITS = {
  titleMaxLength: TITLE_MAX_LENGTH,
  descriptionMinLength: DESCRIPTION_MIN_LENGTH,
  descriptionMaxLength: DESCRIPTION_MAX_LENGTH,
} as const;
