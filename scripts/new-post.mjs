#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.resolve(__dirname, '../src/content/blog');

const now = new Date();
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, '0');
const dd = String(now.getDate()).padStart(2, '0');
const dateStr = `${yyyy}-${mm}-${dd}`;

const customTitle = process.argv.slice(2).join(' ').trim();
const title = customTitle || `${now.getMonth() + 1}月${now.getDate()}日 | `;

let filename = `diary-${dateStr}.mdx`;
let targetPath = path.join(blogDir, filename);

if (fs.existsSync(targetPath)) {
  let counter = 2;
  while (fs.existsSync(path.join(blogDir, `diary-${dateStr}-${counter}.mdx`))) {
    counter++;
  }
  filename = `diary-${dateStr}-${counter}.mdx`;
  targetPath = path.join(blogDir, filename);
}

const template = `---
title: "${title}"
description: ""
date: ${dateStr}
tags: ["日记"]
draft: false
---

`;

fs.writeFileSync(targetPath, template, 'utf8');
console.log(`\x1b[32m✔ 新建日记草稿成功:\x1b[0m ${path.relative(process.cwd(), targetPath)}`);
