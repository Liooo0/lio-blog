#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""lio-blog 私有内容门（repository-local content gate）

与 scripts/public_repo_guard.py 分工：
  · public_repo_guard = 通用防泄露（PII / 密钥 / 路径 / 身份 / 历史）
  · 本脚本 = 本博客特有的「对外口径」闸门：涉及保密事项的词一律不得进入本公开仓库

设计要点（别改坏）：
  · 词表放在**仓库外**（~/.hermes/blog-private-denylist.txt，chmod 600），
    这样脚本本身可以公开，而词不公开——把词写进脚本等于换个地方泄露一次。
  · 默认扫「已暂存内容」（pre-commit 场景）；也可 --path <文件/目录> 扫工作区。
  · 词表缺失时不静默放行：打印警告并以 2 退出（REVIEW），避免"闸门悄悄消失"。

用法：
  python3 scripts/private_content_gate.py              # 扫已暂存（staged）
  python3 scripts/private_content_gate.py --worktree   # 扫工作区已跟踪文件
  python3 scripts/private_content_gate.py --path x.mdx

退出码：0 = 通过；1 = 命中（禁止提交）；2 = 词表缺失/无法判定
"""

import argparse
import os
import subprocess
import sys

WORDLIST = os.path.expanduser("~/.hermes/blog-private-denylist.txt")
SKIP_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".woff", ".woff2", ".ttf"}
SKIP_DIRS = {".git", "node_modules", "dist", ".astro"}


def load_words():
    if not os.path.exists(WORDLIST):
        return None
    words = []
    with open(WORDLIST, encoding="utf-8") as f:
        for line in f:
            w = line.strip()
            if w and not w.startswith("#"):
                words.append(w)
    return words


def staged_files():
    out = subprocess.run(["git", "diff", "--cached", "--name-only", "--diff-filter=ACMR"],
                         capture_output=True, text=True)
    return [p for p in out.stdout.splitlines() if p.strip()]


def worktree_files():
    out = subprocess.run(["git", "ls-files"], capture_output=True, text=True)
    return [p for p in out.stdout.splitlines() if p.strip()]


def walk(path):
    if os.path.isfile(path):
        return [path]
    found = []
    for dirpath, dirs, files in os.walk(path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            found.append(os.path.join(dirpath, f))
    return found


def read_text(path):
    if os.path.splitext(path)[1].lower() in SKIP_EXT:
        return None
    try:
        with open(path, encoding="utf-8") as f:
            return f.read()
    except (OSError, UnicodeDecodeError):
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--worktree", action="store_true", help="扫工作区已跟踪文件")
    ap.add_argument("--path", help="扫指定文件或目录")
    args = ap.parse_args()

    words = load_words()
    if words is None:
        print(f"⚠️  私有内容门：词表不存在（{WORDLIST}）——无法判定，按 REVIEW 处理")
        return 2

    if args.path:
        files = walk(args.path)
    elif args.worktree:
        files = worktree_files()
    else:
        files = staged_files()

    hits = []
    for path in files:
        if not os.path.exists(path):
            continue
        text = read_text(path)
        if text is None:
            continue
        for i, line in enumerate(text.splitlines(), 1):
            for w in words:
                if w in line:
                    hits.append((path, i, w, line.strip()[:90]))

    if hits:
        print("=" * 68)
        print(f"❌ 私有内容门：拦下 {len(hits)} 处（涉及对外口径/保密事项）")
        print("=" * 68)
        for path, ln, w, snippet in hits[:40]:
            print(f"  ⛔ {path}:{ln}  命中「{w}」")
            print(f"     {snippet}")
        if len(hits) > 40:
            print(f"  …另有 {len(hits) - 40} 处")
        print("\n处理：改成对外口径的说法；确需保留原文的，别放进本仓库。")
        return 1

    print(f"✅ 私有内容门：通过（{len(words)} 个词，扫了 {len(files)} 个文件）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
