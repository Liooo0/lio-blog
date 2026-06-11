export const SITE = {
  title: 'lio',
  description: '代码与生活，记录我的项目与思考',
  url: 'https://lio846.github.io',
  base: '/lio-blog',
  author: 'lio',
  locale: 'zh-CN',
  ogImage: '/og-image.png',
};

export const NAV = [
  { title: '首页', href: '/' },
  { title: '博客', href: '/blog' },
  { title: '项目', href: '/projects' },
  { title: '关于', href: '/about' },
] as const;

export const SOCIAL = {
  github: 'https://github.com/lio846',
};

export const HOME = {
  greeting: '嘿，我是 lio 👋',
  bio: '24岁，深圳。热爱技术、摄影、汽车和音乐。\n\n这里记录我的项目、想法和学习过程。',
  recentPostsCount: 5,
  featuredProjectsCount: 3,
};
