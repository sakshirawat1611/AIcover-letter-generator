# AIcover-letter-generator
AI Cover Letter Generator is a React-based web application that creates personalized, ATS-friendly cover letters using AI. Users can enter job details, upload a PDF resume for text extraction, and generate professional cover letters. Built with React, JSX, Hooks, camelCase naming conventions, API integration, and responsive UI design.
🤖 AI Cover Letter Generator
A fully responsive, AI-powered cover letter generator built with React + Vite, integrated with the Groq API and PDF.js. Users can fill in their details, upload their resume as a PDF, and get a personalized, ATS-friendly cover letter generated instantly.

🌐 Live Demo

Deploy link here (e.g. Vercel / Netlify)


✨ Features

🧠 AI-generated cover letters using Groq's LLaMA model
📄 PDF resume upload with automatic text extraction
🌙 Dark / Light mode toggle
📋 One-click copy to clipboard
🔄 Full form reset button
📱 Fully mobile responsive


🛠️ Tech Stack
TechnologyPurposeReact + ViteFrontend framework & build toolGroq API (LLaMA 3.1)AI text generationPDF.js (pdfjs-dist)PDF upload & text extractionCSS (custom)Styling, dark mode, responsivenessReact IconsUI icons (sun, moon, refresh)

🚀 Getting Started
1. Clone the repository
bashgit clone https://github.com/your-username/cover-letter-generator.git
cd cover-letter-generator
2. Install dependencies
bashnpm install
3. Set up your environment variables
Create a .env file in the root of your project:
VITE_GROQ_API_KEY=your_groq_api_key_here

⚠️ Never hardcode your API key directly in the source code. Always use .env and add it to .gitignore.

4. Run the development server
bashnpm run dev

📁 Project Structure
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

🧠 How It Works

User fills in their name, job role, company, and skills
(Optional) User uploads their resume as a PDF — text is extracted automatically using PDF.js
On clicking Generate, the app sends a structured prompt to the Groq API
The AI returns a personalized, multi-paragraph cover letter
User can copy it to clipboard or reset the form


🤖 Built With the Help of a Strict AI Mentor
This project was not just built — it was learned through. I used Claude (by Anthropic) as my strict coding mentor throughout the entire development process. I explicitly asked Claude to guide me without just handing me answers, to review my code critically, and to make me understand every mistake before fixing it.
I also followed CodeWithHarry's React tutorials on YouTube for foundational concepts, alongside other YouTube resources suggested by Claude covering:

React Hooks (useState, useRef)
async/await and the fetch API
PDF.js web worker setup
CSS dark mode and Flexbox layouts
Vite environment variables


😤 Honest Struggles — What Was Actually Hard
🔴 The API Connection — 14 to 15 Failed Attempts
The single most frustrating part of this entire project was getting the Groq API to work correctly. I tried connecting it 14 to 15 times before it finally worked. The issues I ran into included:

Wrong Authorization header format (Bearer keyword missing or misplaced)
API key not loading because I hadn't set up the .env file correctly with the VITE_ prefix
The model name being slightly wrong
Not properly await-ing the response.json() call
Forgetting to JSON.stringify() the request body
Not checking response.ok before reading the data, causing silent failures
Misunderstanding the response structure — accessing data.choices[0].message.content took several tries to get right

Every single one of those 14–15 attempts taught me something. By the time it finally worked, I understood the entire request-response cycle deeply — not just that it worked, but why it worked.

🟡 camelCase — A Battle That Never Ended
React and JSX are completely case-sensitive, and this caused errors throughout the project. I repeatedly wrote:

onchange instead of onChange
onclick instead of onClick
classname instead of className
fontsize instead of fontSize in inline styles

My mentor (Claude) refused to silently fix these — it would point me to the line and ask me to find the mistake myself. Over time, camelCase became muscle memory.

🟡 Self-Closing Tags — < /> Syntax
Coming from an HTML background, I kept writing <input> and <br> without the closing slash. In JSX, this breaks everything. The correct syntax is <input />, <br />, <img />. This took several crashes and corrections to fully absorb.

🟡 Punctuation — Small Characters, Big Consequences
The most humbling lesson: punctuation is syntax. Bugs I fixed over and over again:

Missing , between props or object keys
Extra or missing } closing a block at the wrong place
Mismatched " and ' quotes
Missing ; ending a statement
Forgetting () around a return value in an arrow function

One missing comma could break the entire app with a completely unrelated-looking error. Learning to read code slowly and carefully was as important as learning React itself.

🟡 Understanding JSX Files
I started this project not knowing what a .jsx file even was or how it differed from .js or .html. Claude explained that JSX is a syntax extension — it looks like HTML but compiles to JavaScript. Understanding this distinction changed how I thought about the entire project structure.

🟡 PDF.js Worker Setup
Integrating pdfjs-dist for PDF text extraction was unexpectedly complex. Setting up the web worker correctly (pdfWorker import + GlobalWorkerOptions.workerSrc) took significant troubleshooting and multiple YouTube references before the text extraction worked reliably.

📊 Problems & Fixes Summary
ProblemRoot CauseFixAPI not connecting (14–15 times)Wrong headers, missing VITE_ prefix, bad model name, wrong response pathSystematic debugging with Claude, fixed one issue at a timeInputs not respondingMissing value + onChange on controlled inputsAdded proper controlled component wiringAPI key not loadingMissing VITE_ prefix in .envRenamed variable and restarted dev serverPDF text not extractingWorker not configuredSet up GlobalWorkerOptions.workerSrc correctlyDark mode not applyingWrong CSS class name in toggleFixed conditional className logicFile input not clearing on resetNeeded useRef for direct DOM accessAdded fileInputRef and cleared it manuallyLayout broken on mobileNo @media queriesAdded responsive breakpointsJSX errors throughoutcamelCase + missing < /> self-closing tagsCareful re-reading and mentor correctionOutput showing as one blockNewlines not renderedUsed .split("\n").map() to render <p> tagsCryptic compile errorsMissing , } ; punctuationSlow line-by-line debugging

💪 What I Learned

Building a real React app from scratch using Vite
How JSX differs from HTML and why it matters
Controlled components and React state management
Making real API calls with fetch and async/await
Keeping API keys secure with environment variables
Extracting text from PDFs using pdfjs-dist
CSS dark mode with conditional class names
Mobile-first responsive design with @media queries
Using useRef for direct DOM manipulation
Debugging systematically — not guessing, but reading


🙏 Acknowledgements

Claude by Anthropic — strict AI mentor throughout the project
CodeWithHarry — React YouTube tutorials that built my foundation
Groq — for providing fast LLaMA API access
PDF.js (Mozilla) — for the PDF parsing library


📜 License
MIT License — feel free to use, modify, and build on this project.
