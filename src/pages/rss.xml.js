import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => {
    const d = b.data.date.getTime() - a.data.date.getTime();
    if (d !== 0) return d;
    return b.id.localeCompare(a.id);
  });

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `${SITE.base}/blog/${post.id}`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
