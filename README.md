# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# 🤖 AI Cover Letter Generator

A fully responsive, AI-powered cover letter generator built with **React + Vite**, integrated with the **Groq API** and **PDF.js**. Users can fill in their details, upload their resume as a PDF, and get a personalized, ATS-friendly cover letter generated instantly.

---
_

---

## ✨ Features

- 🧠 AI-generated cover letters using Groq's LLaMA model
- 📄 PDF resume upload with automatic text extraction
- 🌙 Dark / Light mode toggle
- 📋 One-click copy to clipboard
- 🔄 Full form reset button
- 📱 Fully mobile responsive

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework & build tool |
| Groq API (LLaMA 3.1) | AI text generation |
| PDF.js (`pdfjs-dist`) | PDF upload & text extraction |
| CSS (custom) | Styling, dark mode, responsiveness |
| React Icons | UI icons (sun, moon, refresh) |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/cover-letter-generator.git
cd cover-letter-generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your environment variables

Create a `.env` file in the root of your project:
```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

> ⚠️ Never hardcode your API key directly in the source code. Always use `.env` and add it to `.gitignore`.

### 4. Run the development server
```bash
npm run dev
```

---

## 📁 Project Structure

```
cover-letter-generator/
├── public/
├── src/
│   ├── App.jsx        # Main component
│   ├── App.css        # All styles
│   └── main.jsx       # Entry point
├── .env               # API key (not committed)
├── .gitignore
├── package.json
└── README.md
```

---

## 🧠 How It Works

1. User fills in their **name**, **job role**, **company**, and **skills**
2. (Optional) User uploads their **resume as a PDF** — text is extracted automatically using PDF.js
3. On clicking **Generate**, the app sends a structured prompt to the **Groq API**
4. The AI returns a personalized, multi-paragraph cover letter
5. User can **copy it to clipboard** or **reset** the form

---

## 🤖 Built With the Help of a Strict AI Mentor

This project was not just built — it was **learned through**. I used **Claude (by Anthropic)** as my strict coding mentor throughout the entire development process. I explicitly asked Claude to guide me without just handing me answers, to review my code critically, and to make me understand every mistake before fixing it.

I also followed **CodeWithHarry's** React tutorials on YouTube for foundational concepts, alongside other YouTube resources suggested by Claude covering:
- React Hooks (`useState`, `useRef`)
- `async/await` and the `fetch` API
- PDF.js web worker setup
- CSS dark mode and Flexbox layouts
- Vite environment variables

---

## 😤 Honest Struggles — What Was Actually Hard

### 🔴 The API Connection — 14 to 15 Failed Attempts

The single most frustrating part of this entire project was **getting the Groq API to work correctly**. I tried connecting it **14 to 15 times** before it finally worked. The issues I ran into included:

- Wrong `Authorization` header format (`Bearer` keyword missing or misplaced)
- API key not loading because I hadn't set up the `.env` file correctly with the `VITE_` prefix
- The `model` name being slightly wrong
- Not properly `await`-ing the `response.json()` call
- Forgetting to `JSON.stringify()` the request body
- Not checking `response.ok` before reading the data, causing silent failures
- Misunderstanding the response structure — accessing `data.choices[0].message.content` took several tries to get right

Every single one of those 14–15 attempts taught me something. By the time it finally worked, I understood the entire request-response cycle deeply — not just that it worked, but **why** it worked.

---

### 🟡 camelCase — A Battle That Never Ended

React and JSX are completely case-sensitive, and this caused errors throughout the project. I repeatedly wrote:
- `onchange` instead of `onChange`
- `onclick` instead of `onClick`
- `classname` instead of `className`
- `fontsize` instead of `fontSize` in inline styles

My mentor (Claude) refused to silently fix these — it would point me to the line and ask me to find the mistake myself. Over time, camelCase became muscle memory.

---

### 🟡 Self-Closing Tags — `< />` Syntax

Coming from an HTML background, I kept writing `<input>` and `<br>` without the closing slash. In JSX, this breaks everything. The correct syntax is `<input />`, `<br />`, `<img />`. This took several crashes and corrections to fully absorb.

---

### 🟡 Punctuation — Small Characters, Big Consequences

The most humbling lesson: **punctuation is syntax**. Bugs I fixed over and over again:
- Missing `,` between props or object keys
- Extra or missing `}` closing a block at the wrong place
- Mismatched `"` and `'` quotes
- Missing `;` ending a statement
- Forgetting `()` around a return value in an arrow function

One missing comma could break the entire app with a completely unrelated-looking error. Learning to read code slowly and carefully was as important as learning React itself.

---

### 🟡 Understanding JSX Files

I started this project not knowing what a `.jsx` file even was or how it differed from `.js` or `.html`. Claude explained that JSX is a syntax extension — it looks like HTML but compiles to JavaScript. Understanding this distinction changed how I thought about the entire project structure.

---

### 🟡 PDF.js Worker Setup

Integrating `pdfjs-dist` for PDF text extraction was unexpectedly complex. Setting up the web worker correctly (`pdfWorker` import + `GlobalWorkerOptions.workerSrc`) took significant troubleshooting and multiple YouTube references before the text extraction worked reliably.

---

## 📊 Problems & Fixes Summary

| Problem | Root Cause | Fix |
|---|---|---|
| API not connecting (14–15 times) | Wrong headers, missing `VITE_` prefix, bad model name, wrong response path | Systematic debugging with Claude, fixed one issue at a time |
| Inputs not responding | Missing `value` + `onChange` on controlled inputs | Added proper controlled component wiring |
| API key not loading | Missing `VITE_` prefix in `.env` | Renamed variable and restarted dev server |
| PDF text not extracting | Worker not configured | Set up `GlobalWorkerOptions.workerSrc` correctly |
| Dark mode not applying | Wrong CSS class name in toggle | Fixed conditional className logic |
| File input not clearing on reset | Needed `useRef` for direct DOM access | Added `fileInputRef` and cleared it manually |
| Layout broken on mobile | No `@media` queries | Added responsive breakpoints |
| JSX errors throughout | camelCase + missing `< />` self-closing tags | Careful re-reading and mentor correction |
| Output showing as one block | Newlines not rendered | Used `.split("\n").map()` to render `<p>` tags |
| Cryptic compile errors | Missing `,` `}` `;` punctuation | Slow line-by-line debugging |

---

## 💪 What I Learned

- Building a real React app from scratch using Vite
- How JSX differs from HTML and why it matters
- Controlled components and React state management
- Making real API calls with `fetch` and `async/await`
- Keeping API keys secure with environment variables
- Extracting text from PDFs using `pdfjs-dist`
- CSS dark mode with conditional class names
- Mobile-first responsive design with `@media` queries
- Using `useRef` for direct DOM manipulation
- Debugging systematically — not guessing, but reading

---

## 🙏 Acknowledgements

- **Claude by Anthropic** — strict AI mentor throughout the project
- **CodeWithHarry** — React YouTube tutorials that built my foundation
- **Groq** — for providing fast LLaMA API access
- **PDF.js (Mozilla)** — for the PDF parsing library

---

## 📜 License

MIT License — feel free to use, modify, and build on this project.

---

*Built with React, Vite, Groq API, and PDF.js — and a lot of patience.*
