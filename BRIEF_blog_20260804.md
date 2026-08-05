# BRIEF：lio-blog 记录昨晚项目（2026-08-04）

项目：`~/lio-blog/`（Astro + MDX 个人博客，GitHub Pages: Liooo0/lio-blog）。自主执行，不问问题。

## 任务
把 2026-08-04 夜间完成的 6 个项目/成果写进博客。**先读现有内容的格式再写**：
- 项目记录格式参考：`src/content/projects/boss-zhipin-helper.mdx`、`hermes.mdx`（frontmatter: title/description/date/tech/repo/status/featured + 正文结构：为什么做/功能/技术架构/实际效果）
- 博客文章格式参考：`src/content/blog/hello-world.mdx`

## 要写的内容（用真实数据，不编造）

### projects/ 新增（每项目一篇 mdx）
1. **95分球鞋上新监控**（95fen-monitor）：API 签名逆向（HmacSHA256）→ 新鞋监控 → 筛选（品牌/款式/排除词/价格/24h窗口）→ LLM 看图识鞋（qwen3.8-max-preview）→ wxpusher 微信推送；79 项测试全绿；token 需人工登录刷新（风控边界）。tech: [Python, httpx, SQLite, wxpusher, HmacSHA256]
2. **房租专家**（rent-receipt-expert）：Python+ttkbootstrap 收据管理软件（A4 PDF 打印/月度统计/CSV导出/针式打印模式）；修复 5 个致命 bug；UI 优化（实时换肤/费用项定制/继承逻辑）；36 项测试。tech: [Python, ttkbootstrap, SQLite, reportlab]。status: active
3. **LLM 竞技场**（llm-arena）：20 题 × 2 模型对战（qwen3.8-max-preview vs deepseek-v4-flash），40/40 成功率，flash 快一倍质量持平 → 选型结论。tech: [Python, FastAPI, SQLite]
4. **摄影天气 Agent**（weather-api-backend）：机位库 50→92（新增佛山13/东莞14/珠海15，高德 POI+规则筛选，标注朝向），冒烟测试全绿。tech: [Python, Open-Meteo, 高德API, wxpusher]

### blog/ 新增一篇文章
**「一夜六项目」**：记录 2026-08-04 夜间无人值守自动化作战——Hermes 军师编排 + Claude Code 多窗口并行 + cron 夜班调度（22:00 执行/8:00 总结）+ 任务时间表机制；6 个任务 0 失败；两处翻车与解决（120 轮截断→resume 续跑；虚假完成→重派+会话内自证要求）；经验教训（flash 分层、任务书要点、自证要求）。这是技术博客的好题材，写得有细节有数字。

## 要求
- 中文写作，风格与现有文章一致（第一人称、讲为什么做/怎么做/效果）
- frontmatter 字段齐全（repo 字段：95fen/房租/llm-arena 没有公开 repo 就省略该字段或留空；featured 只给最重要的 1 篇）
- 写完 `npm run build` 或至少 `npx astro check` 验证不报错（若依赖缺失报错，说明原因即可，不强求）
- git 提交（liuwendi <liuwendi@local>）**只 commit 不 push**
- 完成后中文汇报：写了哪些文件、构建验证结果、用户怎么预览（npm run dev 地址）
