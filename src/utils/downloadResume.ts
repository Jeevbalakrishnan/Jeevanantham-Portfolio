const resumeMarkup = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jeevanantham B - Resume</title>
    <style>
      :root {
        color-scheme: light;
        --text: #172033;
        --muted: #50607f;
        --accent: #315eff;
        --border: #dbe4ff;
        --surface: #f7faff;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 40px;
        font-family: Inter, Arial, sans-serif;
        color: var(--text);
        background: linear-gradient(180deg, #ffffff 0%, #f5f8ff 100%);
      }
      .resume {
        max-width: 860px;
        margin: 0 auto;
        border: 1px solid var(--border);
        border-radius: 24px;
        background: white;
        overflow: hidden;
        box-shadow: 0 18px 50px rgba(48, 79, 180, 0.12);
      }
      .hero {
        padding: 32px 36px 28px;
        background: radial-gradient(circle at top right, rgba(49, 94, 255, 0.16), transparent 38%), linear-gradient(135deg, #eff5ff 0%, #ffffff 100%);
      }
      h1 {
        margin: 0 0 10px;
        font-size: 34px;
      }
      h2 {
        margin: 0 0 10px;
        font-size: 18px;
        color: var(--accent);
      }
      h3 {
        margin: 0 0 10px;
        font-size: 17px;
      }
      p, li {
        color: var(--muted);
        line-height: 1.7;
        font-size: 14px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 0;
      }
      .col {
        padding: 28px 36px 34px;
      }
      .col + .col {
        border-left: 1px solid var(--border);
        background: var(--surface);
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 16px;
        margin-top: 14px;
      }
      .meta span {
        display: inline-flex;
        padding: 8px 12px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(49, 94, 255, 0.04);
        color: var(--text);
        font-size: 13px;
      }
      ul {
        margin: 12px 0 0;
        padding-left: 18px;
      }
      .section + .section {
        margin-top: 26px;
      }
      @media (max-width: 720px) {
        body {
          padding: 18px;
        }
        .grid {
          grid-template-columns: 1fr;
        }
        .col + .col {
          border-left: 0;
          border-top: 1px solid var(--border);
        }
      }
    </style>
  </head>
  <body>
    <article class="resume">
      <section class="hero">
        <h1>Jeevanantham B</h1>
        <h2>Aspiring Software Engineer | AI & Data Science Enthusiast | Python Developer</h2>
        <p>
          Passionate student developer with a growing foundation in Python, data science, AI, and modern web development.
          Interested in building clean digital experiences and intelligent software solutions.
        </p>
        <div class="meta">
          <span>CARE College of Engineering</span>
          <span>3rd Year</span>
          <span>jeevbalakrishnan19@gmail.com</span>
        </div>
      </section>
      <section class="grid">
        <div class="col">
          <div class="section">
            <h3>Profile</h3>
            <p>
              Motivated learner with strong interest in software engineering, AI, and data-driven problem solving.
              Enjoys creating polished front-end interfaces and working on practical Python projects that improve real-world workflows.
            </p>
          </div>
          <div class="section">
            <h3>Projects</h3>
            <ul>
              <li>Personal AI Vault — privacy-focused project for storing structured personal data and knowledge.</li>
              <li>Face Detection Attendance System — automated attendance solution using computer vision workflows.</li>
              <li>Movie Recommendation System — recommendation engine built with data analysis and similarity models.</li>
              <li>Portfolio Website — modern responsive portfolio crafted with React, TypeScript, and Tailwind CSS.</li>
            </ul>
          </div>
        </div>
        <div class="col">
          <div class="section">
            <h3>Technical Skills</h3>
            <ul>
              <li>Python, JavaScript, TypeScript</li>
              <li>React, Tailwind CSS, Vite</li>
              <li>SQL, Git, HTML, CSS</li>
              <li>Pandas, NumPy, Scikit-learn</li>
            </ul>
          </div>
          <div class="section">
            <h3>Education</h3>
            <p>
              CARE College of Engineering — currently in 3rd Year, sharpening software engineering, AI, and data science fundamentals through coursework and project-based learning.
            </p>
          </div>
        </div>
      </section>
    </article>
  </body>
</html>
`;

export function downloadResume() {
  const blob = new Blob([resumeMarkup], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "Jeevanantham-B-Resume.html";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
