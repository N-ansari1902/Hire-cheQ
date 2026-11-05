# About Me

Name: Md Nadeem Ashraf Ansari
GitHub Handle: N-ansari1902
Location: Bengaluru, Karnataka, India
Current Status: Fresher | Actively seeking first full-time role in the software/AI/data industry (2026)

Summary:
Results-driven Computer Science graduate specialising in Data Science, with hands-on experience
in SQL-based investigation, system troubleshooting, anomaly detection, root-cause analysis, and
stakeholder communication. Adept at translating complex technical findings into actionable
resolutions. Has worked in both defence (DRDO, Govt. of India) and private sector (Swizosoft)
environments. Strong focus on delivering reliable operational support, continuous
improvement, and clear written/verbal communication to both technical and non-technical audiences.
GitHub self-description: "Backend Developer | AI Engineer". Learning Applied-AI engineering now with RAG, LangChain, LangGraph, MCP.


# Education

- B.E. (Bachelor of Engineering) in Computer Science Engineering (Data Science Specialisation)
  Sai Vidya Institute Of Technology (SVIT), Bengaluru
  Duration: 2022 – 2026
  CGPA: 8.99 / 10.0
  Distinction: Salutatorian — Best Achiever of the Department, CSE(DS), throughout the
  4-year Engineering curriculum (2022–2026)


# Skills

## Programming Languages
- Python (primary — used across all projects and internships)
- SQL (MS SQL Server — querying, investigation, root-cause analysis, transaction log analysis)
- OOPs (Object-Oriented Programming concepts)

## AI 
- ReAct
- Prompt Chaining
- ReAct Chaining
- Streaming
- Structured Outputs (Pydantic + JSON)
- LLM Integration (Groq API, structured output pipelines, Pydantic v2 schema validation)
- Data Visualization
- System Monitoring & Health Dashboards

## Tools & Platforms
- MS SQL Server
- Jupyter Notebook
- Power BI (dashboard creation, DAX, data modeling, Power Query Editor)
- Streamlit (frontend dashboards for data apps and ML model interfaces)
- Git / GitHub (version control, public repos, documentation)
- VS Code

## Core Competencies
- Troubleshooting & Root Cause Analysis
- Technical Documentation (knowledge bases, resolution records, structured reports)
- Effective Communication — Written & Verbal (to both technical and non-technical stakeholders)
- Problem Solving & Analytical Thinking
- Continuous Learning Mindset
- Stakeholder Reporting & Structured Escalation


# Experience

## Swizosoft (OPC) Private Limited (Feb 2026 – May 2026)
- Role: Data Analyst Intern
- Domain: Data Operations, Business Intelligence
- What I did:
  - Investigated data anomalies by querying backend SQL databases; performed root-cause analysis
    and documented resolution steps as structured knowledge records for business stakeholders.
  - Troubleshot data pipeline irregularities using statistical analysis and hypothesis testing;
    communicated findings verbally and in writing to internal stakeholders across business functions.
  - Maintained a knowledge base of recurring data issues, root causes, and corrective action
    recommendations to support ongoing operational continuity.

## Defence Research and Development Organisation (DRDO), Govt. of India (Aug 2025 – Feb 2026)
- Role: Data Intern — Central Data Processing (CDP) Division
- Location: DRDO – Integrated Test Range (ITR), Chandipur
- Type: Stipend-based internship (competitive selection)
- Domain: Signal Processing, Mission-Critical Systems, Defence R&D
- What I did:
  - Investigated and analysed radar signal data within the Central Data Processing (CDP) division;
    performed root-cause analysis on system anomalies to support mission-critical operational accuracy.
  - Applied systematic troubleshooting techniques to document performance deviations in signal
    processing workflows.
  - Collaborated with senior engineers to prioritise and resolve technical issues in line with
    operational timelines.
  - Worked on an X-Band Radar Signal Reverse Simulation research project using Deep Learning
    (Autoencoder + cGAN/Pix2Pix frameworks); achieved 85%+ reconstruction accuracy and SSIM >0.85
    on generated synthetic radar signals. (See Projects section.)


# Projects

## 1. LLM-Based Resume Matcher & Profile Evaluator
- Period: (Recent — post-graduation project)
- Tech: Python, Groq API (openai/gpt-oss-120b), Pydantic v2, Streamlit, pypdf, python-docx, python-dotenv
- What it does:
  - Automated AI resume screening application: paste a job description, upload multiple candidate
    resumes (PDF/DOCX), and the system parses, evaluates, and ranks every profile by match
    percentage — with detailed breakdowns of matched skills, missing criteria, and an automated
    recruiter verdict.
  - Built a 3-stage LLM pipeline: (1) parse and structure the JD, (2) extract and structure each
    resume, (3) cross-evaluate JD vs resume to generate a MatchResult (score, skills, verdict).
  - Used Pydantic v2 strict schemas to validate raw LLM JSON outputs; handled batch processing
    with sequential rate-limit pacing.
  - Implemented a dark translucent Streamlit UI with custom CSS injection and animated score rings.
  - Key engineering lessons: stabilising structured LLM outputs via deterministic aggregation in code
    (not LLM scoring), rate-limit management for multi-document batches, Streamlit DOM isolation
    workarounds.
- Link: https://github.com/N-ansari1902/resume-matcher
- Live App: https://profile-eval-llm.streamlit.app/

## 2. X-Band Radar Signal Reverse Simulation (DRDO Internship Project)
- Period: Aug 2025 – Feb 2026 (DRDO Internship)
- Tech: Python, NumPy, Matplotlib, Jupyter Notebook, Deep Learning (Autoencoder, cGAN / Pix2Pix),
        radar signal processing (Radar Range Equation, Swerling models, Weibull clutter)
- What it does:
  - Addresses the scarcity of classified raw radar data needed for validating maritime and weather
    surveillance systems. Proposes an AI-driven "reverse-simulation" approach to reconstruct
    realistic raw I/Q radar echo signals from processed data (e.g., tactical maps).
  - Framework 1 — Autoencoder-Based: Classical signal processing + ML; models atmospheric
    attenuation, clutter/thermal noise; trains Autoencoder to reconstruct compressed raw signal
    features. Result: 85%+ reconstruction accuracy.
  - Framework 2 — cGAN-Based (Pix2Pix): Conditional GAN translates tactical map visuals into
    realistic raw I/Q radar signals. Guided by a hybrid physics kernel modelling Radar Range
    Equation, Swerling Case 1 & 3 target fluctuation models, and Weibull-distributed sea clutter.
    Result: SSIM > 0.85 vs ground truth.
  - Entire project report officially approved by DRDO.
- Link: https://github.com/N-ansari1902/DRDO-Internship-Project
- Full Project Drive: https://drive.google.com/drive/folders/18xsISNdBw3g1F5ztoDBWN4anm-n2pk2c

## 3. Intelligent Business Analytics & Funnel Optimization Platform
- Period: Mar 2026 – May 2026
- Tech: Python, SQL, Streamlit, data visualization libraries, rule-based engine
- What it does:
  - Backend analytics platform to investigate user behaviour anomalies, identify drop-off points
    across business workflows, and generate resolution-oriented insights for operational
    decision-making.
  - Built a rule-based Insight Engine to automatically detect, flag, and triage abnormal system
    metrics — enabling rapid root-cause identification and structured escalation to relevant
    stakeholders.
  - Authored SQL scripts to query transaction logs and relational database fields; pinpointed
    revenue leakage and produced structured resolution documentation aligned with business SLAs.
- Link: https://github.com/N-ansari1902 (see profile)

## 4. Explainable Anomaly Detection System for Small Businesses
- Period: Feb 2026 – Mar 2026
- Tech: Python, statistical anomaly detection methods, Streamlit, log analysis, feature extraction
- What it does:
  - Hybrid anomaly detection and triage system using statistical methods to classify operational
    issues by severity and urgency, supporting prioritised resolution workflows.
  - Performed log analysis and feature extraction to enable systematic root-cause investigation
    of detected anomalies.
  - Deployed a Streamlit-based monitoring dashboard surfacing human-readable root causes,
    recommended resolutions, and real-time system health insights to end users.
- Link: https://github.com/N-ansari1902 (see profile)

# Certifications

- Design Thinking for Innovation
  Issued by: University of Virginia
  Platform: Coursera


# Achievements & Awards

- Salutatorian — Best Achiever of the Department, CSE (Data Science), SVIT (2022–2026)
  Recognised for consistent academic excellence throughout the 4-year Engineering curriculum.

- Top 8 Finalist — Google Solution Challenge Hackathon 2025
  Organised by GDG CITNC. Qualified among the Top 8 finalist teams nationally.

- 2nd Place — IEEE TEMS SVIT Unlock 5 Technical Event
  IEEE technical competition; secured second place.

- 1st Place — SVIT TECHNOVA CHALLENGE 2024 Mini Project Expo
  Dept. of CSE (Data Science); won first place in the mini project exposition.

- Finalist — IEEE-SVIT Pitching Hackathon 2024
  Organised by the Dept. of CSE (AI & ML), SVIT.

- DRDO Stipend-Based Internship Selection
  Competitively selected for a stipend-based internship at DRDO – Integrated Test Range (ITR),
  Chandipur, under the Ministry of Defence, Govt. of India.


# Volunteering & Leadership

## Student Placement Coordinator (Feb 2024 – Nov 2025)
- Organisation: Sai Vidya Institute Of Technology, Bengaluru
- Role: Facilitated connections between final-year students and recruiters via the college
  placement cell; improved industry exposure for graduating students.

## Technical Director – II, Utkarsha Data Science Club (Mar 2024 – Jun 2025)
- Organisation: Dept. of CSE (Data Science), SVIT, Bengaluru
- Role: Organised tech and non-tech events, competitions, and workshops to promote a strong
  coding and data science culture within the department.


# GitHub Profile Overview

- Username: N-ansari1902
- Total Public Repositories: 19
- Bio: "Upskilling as a Backend Developer from scratch | Aspiring Applied-AI Engineer | Analyst Intern @Swizosoft | Ex-Intern @ITR-DRDO | B.E. CSE (Data Science) SVIT'26"
- Notable Pinned Repos: resume-matcher, DRDO-Internship-Project
- Profile: https://github.com/N-ansari1902


# Programming Platform

- LeetCode: https://leetcode.com/u/mdnansari-work/


# Target Roles (as of 2026 job search)

- Upskilling as a Backend Developer from scratch (Python / FastAPI)
- Applied-AI Engineer
- Support Engineer / Operations Analyst (data/SQL-focused)


# Contact

- Email: nansari.work@gmail.com
- LinkedIn: https://www.linkedin.com/in/nansari1902/
- GitHub: https://github.com/N-ansari1902
- LeetCode: https://leetcode.com/u/mdnansari-work/