import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

// ── V5.6 强容错条款（2026-10-17）────────────────────────────
// Agent 代发内容时最容易炸的是 frontmatter：缺 description、日期写成字符串、
// repo/demo 是空串却撞 url() 校验。除 title 外全部可回退默认值 / 容错转换，
// 保证「一句话或者一张图也能正常发布」，不会把全站构建搞崩。
const emptyToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

const blog = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: 'src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string().default(''),
		date: z.coerce.date(),
		updated: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: 'src/content/projects' }),
	schema: z.object({
		title: z.string(),
		description: z.string().default(''),
		date: z.coerce.date(),
		updated: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
		tech: z.array(z.string()).default([]),
		repo: z.preprocess(emptyToUndefined, z.string().url().optional()),
		demo: z.preprocess(emptyToUndefined, z.string().url().optional()),
		status: z.enum(['completed', 'in-progress', 'planned']).default('completed'),
		image: z.preprocess(emptyToUndefined, z.string().optional()),
		// V5.6 展台扩展字段（可选）：媒体预览与画廊
		video: z.preprocess(emptyToUndefined, z.string().optional()),
		gallery: z.array(z.string()).optional(),
		mediaNote: z.preprocess(emptyToUndefined, z.string().optional()),
		showcase: z.any().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { blog, projects };
