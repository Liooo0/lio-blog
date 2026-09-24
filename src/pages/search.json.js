import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const projects = await getCollection('projects');

  const items = [
    ...posts.map((p) => ({
      type: '日记',
      title: p.data.title,
      description: p.data.description,
      date: p.data.date.toISOString().slice(0, 10),
      tags: p.data.tags || [],
      url: `${SITE.base}/blog/${p.id}`,
    })),
    ...projects.map((pr) => ({
      type: '项目',
      title: pr.data.title,
      description: pr.data.description,
      date: pr.data.date.toISOString().slice(0, 7),
      tags: pr.data.tech || [],
      url: `${SITE.base}/projects/${pr.id}`,
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
