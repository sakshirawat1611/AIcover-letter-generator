import { FiSun, FiMoon, FiRefreshCw } from "react-icons/fi";
import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import './App.css';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function App(){
  const[name,setName]=useState("");
  const[role,setRole]=useState("");
  const[skills,setSkills]=useState("");
  const[company,setCompany]=useState("");
  const[output,setOutput]=useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const fileInputRef = useRef(null);
  const[resumeText,setResumeText]=useState("");
  const[resumeName,setResumeName]=useState("");
  const copyToClipboard=()=>{
    navigator.clipboard.writeText(output);
    alert("Cover letter copied to clipboard!");
  };

  const cleanText = (text) => {
    return text
      .replace(/\[[^\]]*\]/g, '')  // Remove [anything]
      .replace(/[\[\]]/g, '')       // Remove any standalone brackets
      .replace(/^\s*[,;:]\s*/g, '') // Remove leading punctuation
      .trim();
  };
  
  const resetForm = () => { setName(""); setRole(""); setSkills(""); setCompany(""); setOutput(""); setResumeText(""); setResumeName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }};

  const handleResumeUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  setResumeName(file.name);
  const fileReader = new FileReader();
  fileReader.onload = async function () {
    const typedArray = new Uint8Array(this.result);
    const pdf = await pdfjsLib.getDocument({
      data: typedArray,
    }).promise;
    let extractedText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map(item => item.str)
        .join(" ");
      extractedText += pageText + "\n";
    }
    setResumeText(extractedText);
    console.log(extractedText);
  };
  fileReader.readAsArrayBuffer(file);
};
  const generateCoverLetter = async () => {
    if (!name || !role || !company || !skills) {
      alert("Please fill all fields first.");
      return;
  }
  try {
    setLoading(true);
    setOutput("");
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `You are an expert resume and cover letter writer.Create a highly personalized cover letter.

Candidate Name: ${name}
Job Role: ${role}
Company: ${company}
Skills: ${skills}
Resume Content:
${resumeText}

Instructions:
- Use information from the resume.
- Mention relevant projects.
- Mention technical skills naturally.
- Mention education if relevant.
- Keep the tone professional.
- Structure into multiple paragraphs.
- Do not invent fake experience.
- Make the letter ATS-friendly.
- End with a strong professional closing.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setOutput(data.error?.message || "API error");
      return;
    }
    const text = data.choices[0].message.content;
    setOutput(text);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
    setOutput("Failed: " + error.message);
  }
};
return(
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              ✨ AI Cover Letter Generator
            </h1>
            <div className="flex gap-3">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                title="Toggle theme"
                className="p-2.5 bg-white/15 hover:bg-white/25 border border-white/25 rounded-lg text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              <button 
                onClick={resetForm}
                title="Reset form"
                className="p-2.5 bg-white/15 hover:bg-white/25 border border-white/25 rounded-lg text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
              >
                <FiRefreshCw size={20} />
              </button>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* LEFT PANEL - FORM */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl border border-slate-200 dark:border-slate-700 p-8 relative overflow-hidden">
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-cyan-500"></div>
                
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-2">
                  Your Details
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  Fill in your information to generate a personalized cover letter
                </p>

                {/* Form Fields */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-slate-50 mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e)=>setName(e.target.value)}
                      className="input-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-slate-50 mb-2">
                      Job Role
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Senior React Developer" 
                      value={role} 
                      onChange={(e)=>setRole(e.target.value)}
                      className="input-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-slate-50 mb-2">
                      Company Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Google, Microsoft" 
                      value={company} 
                      onChange={(e)=>setCompany(e.target.value)}
                      className="input-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-slate-50 mb-2">
                      Your Skills
                    </label>
                    <textarea 
                      placeholder="e.g. JavaScript, React, Node.js, TypeScript" 
                      value={skills} 
                      onChange={(e)=>setSkills(e.target.value)}
                      rows="4"
                      className="input-base resize-none"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 text-right font-medium">
                      {skills.trim().length} characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-slate-50 mb-2">
                      Upload Resume (PDF)
                    </label>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept=".pdf" 
                        ref={fileInputRef} 
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label 
                        htmlFor="resume-upload" 
                        className="block w-full p-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-center font-semibold text-purple-600 dark:text-purple-400 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all duration-200"
                      >
                        📎 Choose PDF File
                      </label>
                    </div>
                    {resumeName && (
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                        ✓ {resumeName}
                      </p>
                    )}
                  </div>
                </div>

                <button 
                  onClick={generateCoverLetter} 
                  disabled={loading}
                  className="btn-primary mt-6"
                >
                  {loading ? "⏳ Generating..." : "🚀 Generate Cover Letter"}
                </button>
              </div>
            </div>

            {/* RIGHT PANEL - OUTPUT */}
            <div className="lg:col-span-3">
              {output ? (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in flex flex-col h-full">
                  <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 flex justify-between items-center gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        📝 Cover Letter
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Professional & ATS-Optimized</p>
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className="btn-secondary flex-shrink-0"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-none text-slate-800 dark:text-slate-100 leading-7 font-normal text-base">
                      {/* Professional Letterhead */}
                      <div className="mb-4 pb-3 border-b-2 border-slate-300 dark:border-slate-600">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-0.5">
                          {name}
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          {role} | {company}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          {skills && <span>Skills: {skills}</span>}
                        </p>
                      </div>

                      {/* Cover Letter Content */}
                      <div className="space-y-2">
                        {output.split("\n").map((line, index) => {
                          const cleanedLine = cleanText(line).trim();
                          // Skip empty lines and lines with just punctuation
                          if (!cleanedLine || /^[,;:\-–—]*$/.test(cleanedLine)) return null;
                          
                          return (
                            <p key={index} className="text-slate-700 dark:text-slate-300 text-justify leading-6">
                              {cleanedLine}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl border border-slate-200 dark:border-slate-700 h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="text-6xl mb-4 opacity-60">📄</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                    No Cover Letter Yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed text-sm">
                    Fill in your details on the left and click "Generate Cover Letter" to create a professional, ATS-optimized cover letter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-auto border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-6 text-center text-slate-600 dark:text-slate-400 text-sm">
          ✨ Powered by Groq AI (LLaMA 3.1) • Built with React & Vite
        </footer>
      </div>
    </div>
  );
}
export default App;