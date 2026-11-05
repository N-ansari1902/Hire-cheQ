# ✦ Hire-cheQ — Nadeem's Portfolio AI

### A portfolio you can talk to.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Website-00C7B7?style=for-the-badge)](https://hc-nadeem.netlify.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-6C47FF?style=for-the-badge)](https://hire-cheq-backend.onrender.com/)
[![Frontend](https://img.shields.io/badge/Frontend-Netlify-00C7B7?style=for-the-badge)](https://hc-nadeem.netlify.app/)

**Hire-cheQ** is an AI-powered personal portfolio assistant designed to make exploring my professional profile more interactive and engaging.

Instead of navigating through a traditional static portfolio, recruiters, hiring managers, and visitors can interact with an AI assistant to learn about my technical skills, education, projects, internships, and professional experience.

The platform also includes a **Job Description (JD) Matching** feature that compares job requirements against my documented profile and provides insights into matching skills and potential gaps.

🌐 **Live Website:** https://hc-nadeem.netlify.app/

---

## 🎯 Project Objective

The objective of Hire-cheQ is to explore how Applied AI and backend development can improve the traditional portfolio experience.

It combines conversational AI, document processing, API development, and job-profile matching into one practical application.

The project also demonstrates hands-on implementation of:

- LLM-powered applications.
- REST API development using FastAPI.
- Streaming AI responses.
- Document extraction and processing.
- Frontend-backend integration.
- Cloud deployment and environment configuration.

---

## 🚀 Key Features

### 1. AI-Powered Portfolio Chat
- Interact with an AI assistant through natural language.
- Ask questions about my technical skills, projects, education, and experience.
- Get responses based on my documented professional profile.
- Explore my background through a conversational interface.

### 2. Job Description Matching
- Paste a job description directly into the application.
- Analyze compatibility between job requirements and my profile.
- Identify relevant matching skills and potential skill gaps.
- Receive an AI-generated assessment of role suitability.

### 3. PDF and DOCX Job Description Upload
- Upload job descriptions in PDF or DOCX format.
- Extract relevant text from uploaded documents.
- Analyze extracted requirements against my profile.

### 4. Interactive Portfolio Website
- Modern, responsive portfolio interface.
- Dedicated sections for About, Experience, and project exploration.
- Direct navigation to the AI assistant and JD matching functionality.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python, FastAPI |
| AI / LLM | Groq API |
| Language Model | `openai/gpt-oss-120b` |
| API Communication | REST API, JSON, Server-Sent Events (SSE) |
| Document Processing | PyPDF, python-docx |
| Deployment | Netlify, Render |
| Version Control | Git, GitHub |

---

## 🏗️ Project Architecture

The application follows a frontend-backend architecture.

```text
                 USER
                   |
                   v
        +----------------------+
        |   Netlify Frontend   |
        |                      |
        |  HTML, CSS, JavaScript|
        +----------------------+
                   |
                   | HTTP Requests
                   v
        +----------------------+
        |    FastAPI Backend   |
        |       (Render)       |
        +----------------------+
                   |
          +--------+---------+
          |                  |
          v                  v
   +-------------+    +----------------+
   | Portfolio   |    | JD Matching    |
   | AI Chat     |    | & Document     |
   |             |    | Processing     |
   +-------------+    +----------------+
          |                  |
          +--------+---------+
                   |
                   v
             +-----------+
             | Groq API  |
             |    LLM    |
             +-----------+
                   |
                   v
             AI Response
                   |
                   v
                USER
```

---

## 🔌 Backend API Endpoints

The FastAPI backend exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend health check |
| POST | `/chat` | AI-powered portfolio conversation |
| POST | `/jd-match` | Analyze a pasted job description |
| POST | `/jd-match/upload` | Analyze an uploaded PDF or DOCX job description |

Interactive API documentation is available at:

https://hire-cheq-backend.onrender.com/docs

---

## 📁 Project Structure

```text
Hire-cheQ/
│
├── backend/
│   ├── main.py
│   ├── parser.py
│   ├── jd_match.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── landing.css
│   ├── landing.js
│   ├── assistant.html
│   ├── style.css
│   ├── app.js
│   ├── assistant-effects.css
│   ├── assistant-effects.js
│   ├── landing-portrait-additions.css
│   │
│   └── assets/
│
├── docs/
│   ├── details.md
│   └── resume.md
│
├── .gitignore
├── README.md
└── ...
```

*Note: The `docs/` directory contains the profile and resume context used by the backend. Keep personal information and API credentials private.*

---

## ⚙️ Run Locally

Want to explore or run the project locally? Follow these steps.

### 1. Clone the repository

```bash
git clone https://github.com/N-ansari1902/Hire-cheQ.git
cd Hire-cheQ
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
```

Get your API key from [Groq Console](https://console.groq.com/).

**Important:** Never commit your `.env` file or expose your API key in frontend JavaScript.

### 5. Configure profile context

Provide the backend with the required profile and resume context files:

```text
docs/
├── details.md
└── resume.md
```

Use your own profile information and resume content in these files.

### 6. Start the backend

From the project root, run:

```bash
uvicorn backend.main:app --reload --port 8000
```

Backend URL:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

### 7. Launch the frontend

Open `frontend/index.html` in your browser using VS Code Live Server or another local static web server.

For local development, configure the frontend API base URL in `frontend/app.js` to:

```javascript
const API = "http://127.0.0.1:8000";
```

For the deployed application, use the Render backend URL.

---

## ☁️ Deployment

The application is deployed using two separate services.

| Component | Platform | URL |
|---|---|---|
| Frontend | Netlify | https://hc-nadeem.netlify.app/ |
| Backend | Render | https://hire-cheq-backend.onrender.com |

- The frontend is hosted as a static website on Netlify.
- The FastAPI backend is hosted on Render.
- The Groq API key is configured as a backend environment variable.

---

## 👨‍💻 About Me

**Md Nadeem Ashraf Ansari**

Backend Developer | Applied-AI Engineer

Computer Science graduate specialising in Data Science, interested in backend engineering, Applied AI, and building practical AI-powered applications.

I'm continuously exploring technologies such as RAG, LangChain, LangGraph, and MCP while developing projects that combine software engineering with AI.

📍 Bengaluru, Karnataka, India

📧 Email: nansari.work@gmail.com

🌐 **Portfolio:** [Hire-cheQ](https://hc-nadeem.netlify.app/)

---

⭐ If you find this project interesting, feel free to explore the live application!

**Built with curiosity, code, and AI.** ✦
