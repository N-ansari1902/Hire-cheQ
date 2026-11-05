// ==========================================
// HIRE-CHEQ ASSISTANT VISUAL EFFECTS
// Presentation-only JavaScript
// Does not modify app.js or backend logic.
// ==========================================

(() => {

    // ======================================
    // ELEMENTS
    // ======================================

    const main = document.querySelector(".main");

    const messages = document.getElementById("msgs");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // ======================================
    // ACTIVATE VISUAL THEME
    // ======================================

    document.body.classList.add("hirecheq-effects");


    // ======================================
    // POINTER AMBIENT LIGHTING
    // ======================================

    if (
        main &&
        !reducedMotion &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {

        let animationFrame = null;

        main.addEventListener("pointermove", event => {

            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
            }

            animationFrame = requestAnimationFrame(() => {

                const rect = main.getBoundingClientRect();

                const x = event.clientX - rect.left;

                const y = event.clientY - rect.top;


                main.style.setProperty(
                    "--spot-x",
                    `${x}px`
                );

                main.style.setProperty(
                    "--spot-y",
                    `${y}px`
                );


                animationFrame = null;

            });

        }, { passive: true });


        main.addEventListener("pointerleave", () => {

            main.style.setProperty("--spot-x", "50%");

            main.style.setProperty("--spot-y", "35%");

        });

    }


    // ======================================
    // MESSAGE ENTRANCE ANIMATION
    // ======================================

    if (messages && !reducedMotion) {


        function animateMessage(element) {

            if (
                !(element instanceof HTMLElement) ||
                !element.classList.contains("msg")
            ) {
                return;
            }


            element.classList.remove("fx-enter");


            // Restart the entrance animation.
            void element.offsetWidth;


            element.classList.add("fx-enter");


            // Remove the animation class after completion.
            element.addEventListener(
                "animationend",
                () => {

                    element.classList.remove("fx-enter");

                },
                { once: true }
            );

        }


        // Observe new messages added by the existing app.js.
        const messageObserver = new MutationObserver(records => {

            records.forEach(record => {

                record.addedNodes.forEach(node => {

                    if (node.nodeType !== Node.ELEMENT_NODE) {
                        return;
                    }


                    if (node.matches(".msg")) {

                        animateMessage(node);

                    }


                    // Also support messages added inside containers.
                    node.querySelectorAll(".msg").forEach(
                        animateMessage
                    );

                });

            });

        });


        messageObserver.observe(messages, {

            childList: true,

            subtree: true

        });

    }


    // ======================================
    // WELCOME SCREEN ENTRANCE
    // ======================================

    const welcome = document.getElementById("welcome");


    if (welcome && !reducedMotion) {

        welcome.classList.add("hirecheq-welcome-ready");

    }


    // ======================================
    // JD PANEL VISUAL SUPPORT
    // ======================================

    const jdArea = document.getElementById("jdarea");


    if (jdArea) {

        const jdObserver = new MutationObserver(() => {

            const isVisible =
                window.getComputedStyle(jdArea).display !== "none";

            jdArea.classList.toggle(
                "hirecheq-jd-visible",
                isVisible
            );

        });


        jdObserver.observe(jdArea, {

            attributes: true,

            attributeFilter: ["style", "class"]

        });

    }


    // ======================================
    // INITIALIZATION MESSAGE
    // ======================================

    console.log(
        "✦ Hire-cheQ visual effects loaded successfully."
    );

})();