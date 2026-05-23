/**
 * Slugs available for static export. Imported by the server-component
 * `page.tsx` to drive `generateStaticParams`. Lives in its own file so the
 * server module can read it without crossing the "use client" boundary.
 *
 * Keep in sync with the blog index page.
 */
export const exportableSlugs = [
  "lyncs-vs-competitors",
  "lyncs-vs-simplify",
  "lyncs-vs-jobright",
  "lyncs-vs-sorce-jobs",
  "lyncs-vs-aiapply",
  "lyncs-vs-massive",
  "lyncs-vs-lazyapply",
  "lyncs-vs-teal",
  "lyncs-vs-scale-jobs",
  "lyncs-vs-huntr",
] as const;

export type BlogSlug = (typeof exportableSlugs)[number];
