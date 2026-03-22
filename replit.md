# GOOD SPACE | 民泊運営代行

民泊運営代行サービス「GOOD SPACE」のランディングページ。

## Project Structure

- `index.html` — Main HTML page (single-page layout)
- `style.css` — All styles (pure CSS, no framework)
- `main.js` — Vanilla JS for navbar scroll, reveal animations, smooth scroll, contact form, number counters

## Sections

1. Hero (Aura design system - card fan collage)
2. Brand/About section
3. Numbers bar (stats)
4. Service (民泊運用代行)
5. Case Study (収益改善事例)
6. Feature (他社との違い - comparison)
7. Area (対応エリア)
8. Price (料金プラン)
9. Flow (サービス導入の流れ)
10. FAQ
11. Contact (お問い合わせフォーム)
12. Company (会社概要)
13. Footer

## Tech Stack

- Pure static HTML/CSS/JavaScript (no build system, no framework, no package manager)
- Served in dev via Python's built-in HTTP server on port 5000
- Google Fonts: Inter, Noto Sans JP, M PLUS 1p

## Design

- Hero section uses "Aura" design system (pink gradient, fan-spread card collage)
- Below hero: Airbnb-inspired minimal design with clean white/gray palette, subtle borders, and red (#FF385C) accents
- All sections below hero use `gs-` prefixed class names

## Running the App

Workflow: **Start application**
Command: `python3 -m http.server 5000`
Port: 5000 (webview)

## Deployment

Configured as a **static** deployment with `publicDir: "."`.