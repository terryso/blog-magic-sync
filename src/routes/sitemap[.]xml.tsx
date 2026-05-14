import { createFileRoute } from "@tanstack/react-router";
import { getAllPosts, getAllTags } from "@/lib/posts";

const BASE_URL = "https://blog.suchuanyi.dev";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getAllPosts();
        const tags = getAllTags();

        const entries: Array<{ path: string; lastmod?: string; changefreq?: string; priority?: string }> = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/tags", changefreq: "weekly", priority: "0.7" },
          ...posts.map((p) => ({
            path: `/posts/${p.slug}`,
            lastmod: new Date(p.date).toISOString(),
            changefreq: "monthly",
            priority: "0.8",
          })),
          ...tags.map(({ tag }) => ({
            path: `/tags/${encodeURIComponent(tag)}`,
            changefreq: "weekly",
            priority: "0.5",
          })),
        ];

        const urls = entries
          .map((e) =>
            [
              "  <url>",
              `    <loc>${BASE_URL}${e.path}</loc>`,
              e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              "  </url>",
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
