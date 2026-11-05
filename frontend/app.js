// ==========================================
// CONFIGURATION
// ==========================================

const API = "http://127.0.0.1:8000";

const MAX_FILE_SIZE = 10 * 1024 * 1024;


// ==========================================
// APPLICATION STATE
// ==========================================

let hist = [];
let busy = false;
let jdOpen = false;
let jdPanelCollapsed = false;

const $ = id => document.getElementById(id);


// ==========================================
// NEW CHAT
// ==========================================

function newChat() {

    if (busy) return;

    hist = [];

    $("msgs").innerHTML = "";

    $("welcome").style.display = "flex";

    $("inp").value = "";
    $("inp").style.height = "auto";

    $("jdinp").value = "";
    $("jdinp").style.height = "140px";
    $("jdinp").style.overflowY = "hidden";

    removeJDFile();

    if (jdOpen) {
        closeJD();
    }

    $("inp").focus();
}


// ==========================================
// MODE / NAVIGATION
// ==========================================

function switchMode(mode) {

    if (busy) return;

    if (mode === "chat") {

        closeJD();

    } else {

        if (!jdOpen) {

            openJD();

        } else if (jdPanelCollapsed) {

            expandJDPanel();

        }

    }

}


// ==========================================
// JD MATCH TOGGLE
// ==========================================

function toggleJD() {

    if (busy) return;

    if (!jdOpen) {

        openJD();

    } else if (jdPanelCollapsed) {

        expandJDPanel();

    } else {

        closeJD();

    }

}


function openJD() {

    jdOpen = true;
    jdPanelCollapsed = false;

    $("jdarea").style.display = "block";

    $("jdpill").classList.add("on");

    $("inp").placeholder =
        "Ask follow-up questions about the match...";

    $("ni-jd").classList.add("on");
    $("ni-chat").classList.remove("on");

}


function closeJD() {

    jdOpen = false;
    jdPanelCollapsed = false;

    $("jdarea").style.display = "none";

    $("jdpill").classList.remove("on");

    $("inp").placeholder = "Ask about Nadeem...";

    $("ni-jd").classList.remove("on");
    $("ni-chat").classList.add("on");

}


function collapseJDPanel() {

    if (!jdOpen) return;

    jdPanelCollapsed = true;

    // Hide the large JD input area.
    $("jdarea").style.display = "none";

    // Keep JD Match selected.
    $("jdpill").classList.add("on");

    $("inp").placeholder =
        "Ask follow-up questions about the match...";

}


function expandJDPanel() {

    if (!jdOpen) return;

    jdPanelCollapsed = false;

    $("jdarea").style.display = "block";

    $("jdpill").classList.add("on");

    scrollDown();

    $("jdinp").focus();

}


// ==========================================
// INPUT HELPERS
// ==========================================

function grow(el) {

    el.style.height = "auto";

    el.style.height =
        Math.min(el.scrollHeight, 180) + "px";

}


function growJD(el) {

    el.style.height = "auto";

    const maxHeight = Math.floor(
        window.innerHeight * 0.35
    );

    const newHeight = Math.max(
        140,
        Math.min(el.scrollHeight, maxHeight)
    );

    el.style.height = newHeight + "px";

    el.style.overflowY =
        el.scrollHeight > maxHeight ? "auto" : "hidden";

}


// Ctrl + Enter submits JD.
// Regular Enter creates a new line.

function onJDKey(event) {

    if (
        event.key === "Enter" &&
        (event.ctrlKey || event.metaKey)
    ) {

        event.preventDefault();

        analyzeJD();

    }

}


// Chat input: Enter sends, Shift + Enter creates a new line.

function onKey(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.isComposing
    ) {

        event.preventDefault();

        sendChat();

    }

}


function quickMsg(button) {

    if (busy) return;

    $("inp").value = button.textContent.trim();

    grow($("inp"));

    sendChat();

}


// ==========================================
// FILE UPLOAD HANDLING
// ==========================================

$("jdfile").addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const extension = file.name
        .split(".")
        .pop()
        .toLowerCase();


    // Validate extension.
    if (!["pdf", "docx"].includes(extension)) {

        alert("Please upload only PDF or DOCX files.");

        removeJDFile();

        return;

    }


    // Validate size.
    if (file.size > MAX_FILE_SIZE) {

        alert("File size exceeds 10 MB. Please upload a smaller file.");

        removeJDFile();

        return;

    }


    if (file.size === 0) {

        alert("The selected file is empty.");

        removeJDFile();

        return;

    }


    // Display filename.
    $("jdFileName").textContent = file.name;

    $("removeJDFile").hidden = false;

});


function removeJDFile() {

    $("jdfile").value = "";

    $("jdFileName").textContent =
        "PDF or DOCX · Max 10 MB";

    $("removeJDFile").hidden = true;

}


// ==========================================
// BUSY STATE
// ==========================================

function setBusy(value) {

    busy = value;

    $("inp").disabled = value;
    $("jdinp").disabled = value;

    $("jdfile").disabled = value;

    $("sendbtn").disabled = value;
    $("analyzebtn").disabled = value;
    $("jdpill").disabled = value;

    $("ni-chat").style.pointerEvents =
        value ? "none" : "auto";

    $("ni-jd").style.pointerEvents =
        value ? "none" : "auto";

}


// ==========================================
// SEND CHAT
// ==========================================

async function sendChat() {

    if (busy) return;

    const inp = $("inp");

    const text = inp.value.trim();

    if (!text) return;


    inp.value = "";
    inp.style.height = "auto";

    hideWelcome();


    // Save user message.
    hist.push({
        role: "user",
        content: text
    });


    // Display user message.
    pushUserMsg(text);

    setBusy(true);


    try {

        await doStream();

    } finally {

        setBusy(false);

        inp.focus();

        scrollDown();

    }

}


// ==========================================
// STREAM AI RESPONSE
// ==========================================

async function doStream() {

    const thinkingDiv = pushThinking();

    let bodyEl = null;

    let full = "";


    try {

        // Send request to FastAPI.
        const response = await fetch(`${API}/chat`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                messages: hist
            })

        });


        if (!response.ok) {

            throw new Error(
                `Server error: ${response.status}`
            );

        }


        if (!response.body) {

            throw new Error(
                "Streaming response is not supported."
            );

        }


        // Replace thinking animation.
        bodyEl = swapThinking(thinkingDiv, "");


        const reader = response.body.getReader();

        const decoder = new TextDecoder();

        let buffer = "";

        let finished = false;


        // Process an individual SSE event.
        function processEvent(block) {

            const dataLines = block
                .split(/\r?\n/)
                .filter(line => line.startsWith("data:"));


            if (!dataLines.length) {
                return false;
            }


            /*
             * Remove only the SSE separator space.
             * Never trim the AI's actual response.
             */

            const data = dataLines
                .map(line => {

                    let value = line.slice(5);

                    if (value.startsWith(" ")) {
                        value = value.slice(1);
                    }

                    return value;

                })
                .join("\n");


            let payload;

            try {

                payload = JSON.parse(data);

            } catch {

                payload = data;

            }


            if (payload === "[DONE]") {
                return true;
            }


            if (typeof payload === "string") {

                full += payload;

                bodyEl.innerHTML = renderMD(full);

                scrollDown();

            }

            return false;

        }


        // Read streaming data.
        while (!finished) {

            const { done, value } = await reader.read();


            if (done) {

                buffer += decoder.decode();

                break;

            }


            buffer += decoder.decode(value, {
                stream: true
            });


            // Process complete SSE events.
            while (true) {

                const separator =
                    /\r?\n\r?\n/.exec(buffer);


                if (!separator) break;


                const block = buffer.slice(
                    0,
                    separator.index
                );


                buffer = buffer.slice(
                    separator.index + separator[0].length
                );


                if (processEvent(block)) {

                    finished = true;

                    break;

                }

            }

        }


        // Process remaining event.
        if (!finished && buffer.trim()) {

            processEvent(buffer);

        }


        if (full) {

            hist.push({
                role: "assistant",
                content: full
            });

        } else {

            bodyEl.textContent =
                "No response received. Please try again.";

        }


    } catch (error) {

        console.error("Hire-cheQ chat error:", error);


        const errorHTML = `
            <span class="errtxt">
                Connection error. Make sure Hire-cheQ's backend
                is running on port 8000.
            </span>
        `;


        if (bodyEl) {

            bodyEl.innerHTML = errorHTML;

        } else {

            swapThinking(thinkingDiv, errorHTML);

        }

    }

}


// ==========================================
// JOB DESCRIPTION MATCH
// ==========================================

async function analyzeJD() {

    if (busy) return;


    const jd = $("jdinp").value.trim();

    const file = $("jdfile").files[0];


    // Require either pasted text or an uploaded file.
    if (!jd && !file) {

        alert(
            "Please paste a Job Description or upload a PDF/DOCX file."
        );

        $("jdinp").focus();

        return;

    }


    hideWelcome();


    // Collapse the JD panel immediately.
    collapseJDPanel();


    // Display submission message.
    if (file) {

        pushUserMsg(
            `📄 Analyze JD Match: ${file.name}`
        );

    } else {

        pushUserMsg(
            "📄 Analyze pasted Job Description"
        );

    }


    const thinkingDiv = pushThinking();

    scrollDown();

    setBusy(true);


    try {

        let response;


        if (file) {

            // ==================================
            // PDF / DOCX UPLOAD
            // ==================================

            const formData = new FormData();

            formData.append("file", file);


            response = await fetch(
                `${API}/jd-match/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );

        } else {

            // ==================================
            // PASTED JD TEXT
            // ==================================

            response = await fetch(
                `${API}/jd-match`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        jd_text: jd
                    })

                }
            );

        }


        // Handle backend errors.
        if (!response.ok) {

            let errorMessage =
                "Unable to analyze the job description.";

            try {

                const errorData = await response.json();

                errorMessage =
                    errorData.detail || errorMessage;

            } catch {
                // Retain default message.
            }

            throw new Error(errorMessage);

        }


        const data = await response.json();

        const result =
            data.result || "No matching result was generated.";


        // Display formatted matching report.
        swapThinking(
            thinkingDiv,
            renderMD(result)
        );


        // Clear JD input only after successful analysis.
        $("jdinp").value = "";

        $("jdinp").style.height = "140px";

        $("jdinp").style.overflowY = "hidden";


        if (file) {
            removeJDFile();
        }


    } catch (error) {

        console.error("Hire-cheQ JD Match error:", error);


        swapThinking(
            thinkingDiv,
            `<span class="errtxt">${esc(error.message)}</span>`
        );

    } finally {

        setBusy(false);

        // Scroll once the matching result is inserted.
        requestAnimationFrame(() => {
            scrollDown();
        });

    }

}


// ==========================================
// DOM HELPERS
// ==========================================

function hideWelcome() {

    $("welcome").style.display = "none";

}


function pushUserMsg(text) {

    const div = document.createElement("div");

    div.className = "msg user";


    const bubble = document.createElement("div");

    bubble.className = "bubble";

    bubble.textContent = text;


    div.appendChild(bubble);

    $("msgs").appendChild(div);

    scrollDown();

}


function pushThinking() {

    const div = document.createElement("div");

    div.className = "msg ai";


    div.innerHTML = `
        <div class="avatar">✦</div>

        <div class="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;


    $("msgs").appendChild(div);

    scrollDown();

    return div;

}


function swapThinking(div, html) {

    const dotsEl = div.querySelector(".dots");

    const bodyEl = document.createElement("div");

    bodyEl.className = "aibody";

    bodyEl.innerHTML = html;


    if (dotsEl) {

        div.replaceChild(bodyEl, dotsEl);

    } else {

        div.appendChild(bodyEl);

    }


    return bodyEl;

}


function scrollDown() {

    const scroller = $("scroller");

    scroller.scrollTo({

        top: scroller.scrollHeight,

        behavior: "smooth"

    });

}


// ==========================================
// HTML ESCAPING
// ==========================================

function esc(text) {

    return String(text).replace(/[&<>"']/g, char => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[char];

    });

}


// ==========================================
// MARKDOWN TABLE HELPERS
// ==========================================

function splitTableRow(line) {

    let row = line.trim();

    if (row.startsWith("|")) {
        row = row.slice(1);
    }

    if (row.endsWith("|")) {
        row = row.slice(0, -1);
    }

    return row.split("|").map(cell => cell.trim());

}


function isTableSeparator(line) {

    return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);

}


function getTableAlignment(separator) {

    return splitTableRow(separator).map(cell => {

        const left = cell.startsWith(":");

        const right = cell.endsWith(":");


        if (left && right) return "center";

        if (right) return "right";

        return "left";

    });

}


function createTableRow(cells, tag, alignment) {

    return "<tr>" + cells.map((cell, index) => {

        const align = alignment[index] || "left";

        return `
            <${tag} style="text-align:${align}">
                ${cell}
            </${tag}>
        `;

    }).join("") + "</tr>";

}


// ==========================================
// MARKDOWN RENDERER
// ==========================================

function renderMD(raw) {

    if (!raw) return "";


    // Escape HTML first.
    let text = esc(raw);


    const fencedBlocks = [];
    const inlineCodes = [];


    // Preserve fenced code blocks.
    text = text.replace(
        /```[^\r\n]*\r?\n([\s\S]*?)```/g,

        (match, code) => {

            const index = fencedBlocks.length;

            fencedBlocks.push(
                `<pre><code>${code}</code></pre>`
            );

            return `@@FENCED_CODE_${index}@@`;

        }
    );


    // Preserve inline code.
    text = text.replace(
        /`([^`\r\n]+)`/g,

        (match, code) => {

            const index = inlineCodes.length;

            inlineCodes.push(
                `<code>${code}</code>`
            );

            return `@@INLINE_CODE_${index}@@`;

        }
    );


    // Bold and italic.
    text = text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");


    const lines = text.split(/\r?\n/);

    const output = [];

    let paragraph = [];

    let listType = null;


    function flushParagraph() {

        if (paragraph.length > 0) {

            output.push(
                `<p>${paragraph.join("<br>")}</p>`
            );

            paragraph = [];

        }

    }


    function closeList() {

        if (listType) {

            output.push(`</${listType}>`);

            listType = null;

        }

    }


    // Process Markdown lines.
    for (let i = 0; i < lines.length; i++) {

        const line = lines[i];


        // Blank line.
        if (!line.trim()) {

            flushParagraph();

            closeList();

            continue;

        }


        // Fenced code blocks.
        const codeMatch = line.match(
            /^@@FENCED_CODE_(\d+)@@$/
        );


        if (codeMatch) {

            flushParagraph();

            closeList();

            output.push(
                fencedBlocks[Number(codeMatch[1])]
            );

            continue;

        }


        // Markdown tables.
        if (
            i + 1 < lines.length &&
            line.includes("|") &&
            isTableSeparator(lines[i + 1])
        ) {

            flushParagraph();

            closeList();


            const headers = splitTableRow(line);

            const alignment = getTableAlignment(
                lines[i + 1]
            );


            let tableHTML = `
                <div class="table-wrap">
                    <table>
                        <thead>
                            ${createTableRow(headers, "th", alignment)}
                        </thead>
                        <tbody>
            `;


            // Skip the header and separator rows.
            i += 2;


            // Read all body rows.
            while (
                i < lines.length &&
                lines[i].trim() &&
                lines[i].includes("|")
            ) {

                const cells = splitTableRow(lines[i]);

                tableHTML += createTableRow(
                    cells,
                    "td",
                    alignment
                );

                i++;

            }


            tableHTML += `
                        </tbody>
                    </table>
                </div>
            `;


            output.push(tableHTML);

            // Revisit the first non-table line.
            i--;

            continue;

        }


        // Horizontal rule.
        if (/^\s*---+\s*$/.test(line)) {

            flushParagraph();

            closeList();

            output.push("<hr>");

            continue;

        }


        // Headings.
        const heading = line.match(
            /^(#{1,3})\s+(.+)$/
        );


        if (heading) {

            flushParagraph();

            closeList();

            const level = heading[1].length;

            output.push(
                `<h${level}>${heading[2]}</h${level}>`
            );

            continue;

        }


        // Unordered lists.
        const unordered = line.match(
            /^\s*[-*•]\s+(.+)$/
        );


        // Ordered lists.
        const ordered = line.match(
            /^\s*\d+[.)]\s+(.+)$/
        );


        if (unordered || ordered) {

            flushParagraph();


            const newType = unordered ? "ul" : "ol";

            const item = unordered
                ? unordered[1]
                : ordered[1];


            if (listType !== newType) {

                closeList();

                output.push(`<${newType}>`);

                listType = newType;

            }


            output.push(`<li>${item}</li>`);

            continue;

        }


        // Normal paragraph.
        closeList();

        paragraph.push(line);

    }


    flushParagraph();

    closeList();


    let html = output.join("\n");


    // Restore fenced code blocks.
    html = html.replace(
        /@@FENCED_CODE_(\d+)@@/g,

        (match, index) => fencedBlocks[Number(index)]

    );


    // Restore inline code.
    html = html.replace(
        /@@INLINE_CODE_(\d+)@@/g,

        (match, index) => inlineCodes[Number(index)]

    );


    return html;

}


// ==========================================
// INITIALIZATION
// ==========================================

$("jdinp").value = "";

$("jdinp").style.height = "140px";

$("jdinp").style.overflowY = "hidden";