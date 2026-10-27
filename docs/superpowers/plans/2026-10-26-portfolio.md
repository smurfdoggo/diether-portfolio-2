# Portfolio Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deliver a responsive, personalized Meridian-inspired portfolio with editable project placeholders.
**Architecture:** A Vite React SPA with one content module, a few presentational components, Tailwind utilities, and a small stylesheet. Native anchor links and an email-draft form keep interactions simple.
**Tech Stack:** React, Tailwind CSS 4, Vite, Node test runner.
**Spec:** ../specs/2026-10-26-portfolio-design.md

## Global Constraints
- Resume-backed facts, exact experience dates, seven projects, no invented project links.
- Local ReactJS and Tailwind source; project-image placeholders replaceable through src/data.js.
- Accessible controls, reduced motion, mobile layout, native form validation.

## Review Focus
- Small screens: readable navigation and no overflowing long email or skills.
- Contact data containing ampersands/newlines: correct mailto encoding.
- Broken configured project images: retain useful fallback.
- Keyboard: menu and expansion state stay accurate; focus remains visible.
- Content: no placeholder biography, fabricated achievements, or dead external buttons.

## Tasks
- [x] Write contact URL tests, observe failure, then implement helper.
- [x] Add package/config, content, React sections, responsive Tailwind styling, placeholders, and resume download.
- [x] Build, run tests, inspect browser, exercise controls, and perform independent review.
- [x] Document commands and replacing project images in README; deliver local preview.

## Verification record
Node contact tests pass; production build passes. Browser checked at default desktop, 390x844, and 1024x600 viewports: navigation, project expansion/collapse, mobile menu, Escape and focus return, empty/valid contact fields, and horizontal overflow. Independent review found sidebar clipping and small-text contrast; both corrected. Sidebar scrollability verified at 600px height. Email-client sending is intentionally outside the application and was not exercised. No public deployment requested or performed.
