import { FiSun, FiMoon, FiRefreshCw } from "react-icons/fi";
import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
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
    <div className={darkMode ? "container dark" : "container light"}>
      <div className="navbar">
        <h2 className="logo">Cover Letter Generator</h2>
        <div className="nav-icons">
          <button onClick={() => setDarkMode(!darkMode)}> 
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button onClick={resetForm}>
            <FiRefreshCw />
          </button>
        </div>
      </div>
      <div className="card">
        <h1 className="title">AI Cover Letter Generator</h1>
        <p style={{ textAlign: "center", fontSize: "13px", color:"#94a3b8" }}>Generate professional cover letters instantly</p>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder="Enter your Job role(e.g.web developer)" value={role} onChange={(e)=>setRole(e.target.value)}/>
        <input type="text" placeholder="Enter the company name" value={company} onChange={(e)=>setCompany(e.target.value)}/>
        <textarea placeholder="Enter your skills(e.g.JavaScript,React,Node.js)" value={skills} onChange={(e)=>setSkills(e.target.value)}/>
          <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleResumeUpload}/>
          {resumeName && (
            <p style={{ 
              fontSize:"12px", color:"#10b981"
            }}>
              Resume Uploaded: {resumeName}</p>
            )}
            <p style={{ 
              fontSize: "12px", color: "#64748b", textAlign: "right"
            }}>{skills.trim().length} characters</p>
          <button onClick={generateCoverLetter} disabled={loading}>
            {loading ? "Generating..." : "Generate Cover Letter with AI"}
          </button>
          {output&&(
            <div className="output">
              <h2>Generated Cover Letter:</h2>
              <hr />
              <div className="letter-content">
                {output.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                  ))}
                  </div>
              <button onClick={copyToClipboard} disabled={!output}>Copy to Clipboard</button>
            </div>
          )}
        </div>
        <footer className="footer">Powered by AI • Built with React & Groq</footer>
        </div>
  );
}
export default App;