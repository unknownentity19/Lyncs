import BlogPostContent, { exportableSlugs } from "./BlogPostContent";

// Lock the dynamic segment to the slugs we know about so `next build` can
// render every blog post into the static export.
export const dynamicParams = false;

export function generateStaticParams() {
  return exportableSlugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostContent slug={slug} />;
}
