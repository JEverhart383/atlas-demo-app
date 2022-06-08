import { handleSitemapRequests } from '@faustjs/next';
import { NextRequest, NextResponse } from 'next/server';

export default async function _middleware(req: NextRequest) {
  console.log(req)
  const url = new URL(req.url)
  console.log(url)
  const sitemapRequest = await handleSitemapRequests(req, {
    wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    sitemapIndexPath: `/sitemap_index.xml`,
    sitemapPathsToIgnore: ['/author-sitemap.xml'],
    async robotsTxt(sitemapUrl) {
      return `
        User-agent: *
        Allow: /

        Sitemap: ${sitemapUrl}
      `;
    },
  });

  if (sitemapRequest) {
    return sitemapRequest;
  }

  return NextResponse.next();
}