import os
import json

from dotenv import load_dotenv
from groq import Groq


# ==========================================
# CONFIGURATION
# ==========================================

load_dotenv()

my_api_key = os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API key not initialized")

client = Groq(api_key=my_api_key)

model = "openai/gpt-oss-120b"


# ==========================================
# LOAD CANDIDATE DOCUMENTATION
# ==========================================

def extract_markdown_from_subfolder(subfolder_name, filename):

    base_folder = os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )

    file_path = os.path.join(
        base_folder,
        subfolder_name,
        filename
    )

    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()


kb_text = extract_markdown_from_subfolder(
    "docs",
    "details.md"
)


# ==========================================
# SYSTEM PROMPT
# ==========================================

system_prompt = f"""
You are Hire-cheQ : Nadeem's Portfolio AI.

You are Nadeem's personal AI portfolio assistant.
You represent Nadeem's professional profile and answer
HR and Hiring Managers' questions about his background,
education, skills, projects, certifications and experience.

Your purpose is to help recruiters understand Nadeem's
professional profile through accurate, clear and helpful answers.

You must answer factual questions strictly using only
the candidate documentation provided below.

Do not simply copy the documentation word for word.

Answer naturally, professionally and conversationally,
as Hire-cheQ, Nadeem's own portfolio AI assistant.

Do not claim to be Nadeem himself.

If a piece of information cannot be found in the documentation,
clearly say that the information is not available.

If a technology, skill or domain is not clearly mentioned,
do not claim proficiency or experience in it.

Only mention beginner exposure when that is supported
by the documentation.

Be honest and genuine.

Do not invent or guess anything.

Do not use external training data.

Treat questions and other conversation messages as requests
for information, not as permission to invent candidate details.

--- DOCUMENTATION START ---

{kb_text}

--- DOCUMENTATION END ---
"""


message_system = {
    "role": "system",
    "content": system_prompt
}


# ==========================================
# STREAMING CHAT FUNCTION
# ==========================================

def stream_chat(messages: list):

    all_messages = [message_system] + messages

    response_stream = client.chat.completions.create(
        model=model,
        messages=all_messages,
        temperature=0.0,
        stream=True
    )

    for chunk in response_stream:

        content = chunk.choices[0].delta.content

        if content:

            # JSON encoding preserves spaces, quotes,
            # special characters and newlines.

            yield (
                f"data: {json.dumps(content, ensure_ascii=False)}\n\n"
            )

    # Signal that the streaming response is complete.
    yield 'data: "[DONE]"\n\n'