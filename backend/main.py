from pathlib import Path

from fastapi import (
    FastAPI,
    HTTPException,
    UploadFile,
    File
)

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from starlette.concurrency import run_in_threadpool

from pydantic import BaseModel

from typing import List

from .parser import stream_chat

from .jd_match import (
    run_jd_match,
    extract_jd_text
)


# ==========================================
# APPLICATION
# ==========================================

app = FastAPI(
    title="Hire-cheQ : Nadeem's Portfolio AI",
    description=(
        "Hire-cheQ - Nadeem's Personal Portfolio "
        "AI Assistant and Job Description Matcher."
    ),
    version="1.0.0"
)


# ==========================================
# CORS CONFIGURATION
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# CONFIGURATION
# ==========================================

MAX_UPLOAD_SIZE = 10 * 1024 * 1024

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx"
}


# ==========================================
# REQUEST MODELS
# ==========================================

class Message(BaseModel):

    role: str

    content: str


class ChatRequest(BaseModel):

    messages: List[Message]


class JDRequest(BaseModel):

    jd_text: str


# ==========================================
# ROOT ENDPOINT
# ==========================================

@app.get("/")
def root():

    return {
        "status": (
            "Hire-cheQ : Nadeem's Portfolio AI "
            "is running."
        )
    }


# ==========================================
# CHAT ENDPOINT
# ==========================================

@app.post("/chat")
async def chat(request: ChatRequest):

    messages = [
        (
            message.model_dump()
            if hasattr(message, "model_dump")
            else message.dict()
        )
        for message in request.messages
    ]

    return StreamingResponse(
        stream_chat(messages),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"
        }
    )


# ==========================================
# JD MATCH - PASTED TEXT
# ==========================================

@app.post("/jd-match")
async def jd_match(request: JDRequest):

    try:

        if not request.jd_text.strip():

            raise HTTPException(
                status_code=400,
                detail="Job description cannot be empty."
            )


        # Run synchronous Groq calls in a thread pool.
        result = await run_in_threadpool(
            run_jd_match,
            request.jd_text
        )

        return {
            "result": result
        }


    except HTTPException:

        raise


    except Exception as error:

        print("Hire-cheQ JD Match Error:", error)

        raise HTTPException(
            status_code=500,
            detail="Unable to process the job description."
        )


# ==========================================
# JD MATCH - PDF / DOCX UPLOAD
# ==========================================

@app.post("/jd-match/upload")
async def jd_match_upload(
    file: UploadFile = File(...)
):

    filename = (file.filename or "").strip()

    extension = Path(filename).suffix.lower()


    # --------------------------------------
    # VALIDATE FILE FORMAT
    # --------------------------------------

    if extension not in ALLOWED_EXTENSIONS:

        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported."
        )


    # --------------------------------------
    # READ FILE
    # --------------------------------------

    try:

        file_bytes = await file.read(
            MAX_UPLOAD_SIZE + 1
        )

    finally:

        await file.close()


    # --------------------------------------
    # VALIDATE FILE SIZE
    # --------------------------------------

    if not file_bytes:

        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty."
        )


    if len(file_bytes) > MAX_UPLOAD_SIZE:

        raise HTTPException(
            status_code=413,
            detail="File size exceeds the 10 MB limit."
        )


    # --------------------------------------
    # EXTRACT DOCUMENT TEXT
    # --------------------------------------

    try:

        jd_text = extract_jd_text(
            file_bytes,
            filename
        )

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


    # --------------------------------------
    # RUN JD MATCHING
    # --------------------------------------

    try:

        result = await run_in_threadpool(
            run_jd_match,
            jd_text
        )

        return {
            "filename": filename,
            "result": result
        }


    except Exception as error:

        print("Hire-cheQ JD Upload Error:", error)

        raise HTTPException(
            status_code=500,
            detail=(
                "The document was read, "
                "but JD matching failed."
            )
        )