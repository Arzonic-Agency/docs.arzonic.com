import { NextResponse } from "next/server";

function toKebabCase(input: string) {
  return input
    .replace(/\.[^/.]+$/, "") // fjerner .tsx/.ts
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // GetStarted -> Get-Started
    .replace(/[_\s]+/g, "-") // underscores/spaces -> -
    .toLowerCase();
}

export async function GET() {
  const baseUrl = "https://arzonic.com";
  const today = new Date().toISOString().split("T")[0];

  // Brug dine "docs pages" her (filnavne eller slugs - begge virker)
  const docPages = [
    "GetStarted.tsx",
    "NewsPosts.tsx",
    "SupportContact.tsx",
    "UserManagement.tsx",
  ];

  const urls = docPages.map((fileOrSlug) => {
    const slug = toKebabCase(fileOrSlug); // -> get-started
    return `
    <url>
      <loc>${baseUrl}/${slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
      <lastmod>${today}</lastmod>
    </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
