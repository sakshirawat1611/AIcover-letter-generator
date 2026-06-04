📄 Project Prompts & Development Journey
AI Cover Letter Generator

🧭 About This Document
This document captures the real, honest journey of building this project — every question asked, every mistake made, every breakthrough achieved. It is not just a list of prompts; it is a record of genuine effort, persistence, and learning.

🤖 My AI Mentor — Strict, Patient, and Thorough
Throughout this project, I used Claude (by Anthropic) as my strict coding mentor. I explicitly asked Claude to:

"Be my strict mentor and guide me through the entire project — don't just give me the answer, make me understand why."

Claude held me to high standards. It did not let me copy-paste without understanding. It reviewed my code critically, pointed out every mistake, and pushed me to fix things myself before giving away the solution. This mentorship approach is what shaped the quality of this project.

📚 Learning Resources Used
In addition to AI mentorship, I followed:

🎥 CodeWithHarry — YouTube tutorials for React fundamentals, component structure, and JSX basics
🔗 YouTube links suggested by Claude during the project:

React Hooks (useState, useRef) explainer videos
JavaScript async/await and fetch API tutorials
CSS Flexbox and dark mode toggle tutorials
PDF.js integration walkthroughs
Environment variables in Vite (.env files, VITE_ prefix)




💬 Key Prompts Used During Development
1. Project Kickoff
"I want to build an AI-powered cover letter generator using React. Help me plan the structure — what files do I need, what libraries should I use, and how should I start?"
Claude outlined the folder structure, suggested using Vite, explained the role of App.jsx, main.jsx, and App.css, and told me exactly which libraries to install.

2. Understanding JSX — A Whole New World
"What is a JSX file? Why can't I just write HTML inside React? What is the difference between .js and .jsx?"
This was one of my earliest confusions. I didn't understand why React used JSX or what made it different from regular HTML. Claude patiently explained that JSX is JavaScript + XML syntax, and that components must return a single parent element using < /> (self-closing tags) for empty elements.

Key learning: JSX is not HTML. Attributes like class become className, and every tag must be properly closed using < /> syntax.


3. The camelCase Struggle — Real and Ongoing
"Why is my onChange not working? I wrote 'onchange' in lowercase."
"I keep forgetting — is it onClick or onclick? Why does JavaScript care so much about this?"
One of the most consistent challenges I faced throughout the project was camelCase naming. I repeatedly wrote:

onchange instead of onChange
onclick instead of onClick
setstate instead of setState
classname instead of className
fontsize instead of fontSize (in inline styles)

Claude was strict about this every single time — it never silently fixed it for me. It would say: "Look at line X. What's wrong with that event handler name?" and make me find and fix it myself.

Lesson learned: React and JavaScript are case-sensitive. JSX uses camelCase for all event handlers and style properties. This small habit took real repetition to build.


4. Self-Closing Tags — The < /> Confusion
"My code is throwing an error but I can't see why. It says 'JSX element has no closing tag'."
Another area where I struggled repeatedly was properly closing JSX elements. In HTML, you can write <input> and it works. In JSX, you must write <input />. I kept forgetting the slash before the closing angle bracket.
Claude caught this multiple times and explained:

"In JSX, every element must be explicitly closed. Use <input />, <br />, <img /> — always with the self-closing slash."


5. State Management with useState
"I have multiple input fields. Do I need a separate useState for each one? Can I combine them?"
Claude guided me to use individual useState hooks for each field for clarity, and explained why the inputs were not updating — I had forgotten to wire the value and onChange props together correctly.

6. Handling the API Call
"How do I call the Groq API from React? Where do I put the API key? Is it safe to put it directly in the code?"
Claude explained the fetch API, async/await, how to structure the request body, and — importantly — why API keys should never be hardcoded. It introduced me to .env files and the VITE_ prefix for environment variables in Vite projects.

7. PDF Upload and Text Extraction
"I want users to upload their resume as a PDF and extract the text from it. How do I do that in React?"
Claude suggested using pdfjs-dist, walked me through setting up the web worker (pdfWorker), and helped me write the handleResumeUpload function step by step. This was one of the more complex parts of the project and took multiple back-and-forth sessions.

8. Punctuation Bugs — A Constant Battle
"My component isn't rendering and I have no idea why. Can you help me debug?"
This happened more times than I can count. The culprit was almost always a small punctuation mistake:

A missing , between JSX props
A forgotten ; at the end of a statement
An extra } closing a block too early
A missing : inside an object
Quotes that didn't match — " vs '
A missing () around a return statement in an arrow function

Claude would not just tell me the line. It would ask: "Read your code out loud from line 30. What do you see?" This forced me to develop the habit of careful, slow code reading.

Big lesson: In coding, punctuation is not decoration — it is syntax. A single missing comma or brace can break the entire application with a cryptic error message.

9. Displaying the Output Correctly
"The generated cover letter is showing as one big block of text with no line breaks. How do I preserve the formatting?"
Claude helped me use .split("\n").map() to render each paragraph as a separate <p> tag, preserving the structure of the generated letter.

🧱 Problems I Faced — Honest Account
ProblemCauseHow I Fixed ItInputs not updatingForgot value and onChange on inputsClaude pointed me to controlled components docsAPI key exposedHardcoded in fileMoved to .env with VITE_ prefixPDF text not extractingMissing worker setupClaude walked me through pdfjs-dist worker configDark mode not applyingWrong CSS class namesDebugged class toggling logic with ClaudeFile input not resettingNeeded useRefClaude introduced useRef conceptBroken layout on mobileMissing @media queryAdded responsive CSS with Claude's guidanceJSX errors everywherecamelCase + self-closing tag mistakesRepeated correction and practiceAPI errors not handledNo response.ok checkClaude insisted on always checking HTTP statusCover letter as one blockNot splitting \nUsed .split("\n").map()Cryptic compile errorsMissing punctuation (, } ;)Slow, careful re-reading of code

💪 What This Project Taught Me

React fundamentals — components, props, state, hooks
JSX syntax — it looks like HTML but it isn't
camelCase discipline — event handlers, style keys, everything
Self-closing tags — < /> is not optional in JSX
Async JavaScript — fetch, async/await, error handling
API integration — headers, body, response parsing
Environment variables — keeping secrets out of code
PDF handling — pdfjs-dist and web workers
Debugging patience — most bugs are punctuation or naming mistakes


🙏 Final Note
This project represents hours of genuine effort, debugging, learning, and rebuilding. Every line of code in this project was written by me — with a strict mentor holding me accountable and pushing me to understand, not just copy.
The mistakes I made and fixed are not signs of weakness — they are proof that I actually learned. I did not stop when things broke. I kept asking, kept debugging, and kept building until it worked.

"The best way to learn to code is to break things and fix them yourself." — My experience with this project.

