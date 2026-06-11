const BASE = '/lio-blog';

export const SITE = {
  title: 'lio',
  description: '代码与生活，记录我的项目与思考',
  url: 'https://liooo0.github.io',
  base: BASE,
  author: 'lio',
  locale: 'zh-CN',
  ogImage: `${BASE}/og-image.png`,
};

export const NAV = [
  { title: '首页', href: `${BASE}/` },
  { title: '博客', href: `${BASE}/blog` },
  { title: '项目', href: `${BASE}/projects` },
  { title: '关于', href: `${BASE}/about` },
] as const;

export const SOCIAL = {
  github: 'https://github.com/Liooo0',
};

export const HOME = {
  greeting: '嘿，我是 lio 👋',
  bio: '24岁，深圳。热爱技术、摄影、汽车和音乐。\n\n这里记录我的项目、想法和学习过程。',
  recentPostsCount: 5,
  featuredProjectsCount: 3,
};
