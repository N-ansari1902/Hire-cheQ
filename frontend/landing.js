// ==========================================
// HIRE-CHEQ LANDING PAGE
// INTERACTIONS AND ANIMATIONS
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const progressBar = document.getElementById("scrollProgress");

const header = document.getElementById("siteHeader");

const mobileMenuBtn = document.getElementById("mobileMenuBtn");

const desktopNav = document.getElementById("desktopNav");

const orb = document.querySelector(".orbital-core");

const currentYear = document.getElementById("currentYear");


// ==========================================
// CURRENT YEAR
// ==========================================

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


// ==========================================
// SCROLL PROGRESS BAR
// ==========================================

let scrollTicking = false;

function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;


    progressBar.style.width = `${progress}%`;


    // Header background transition.
    if (scrollTop > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

    scrollTicking = false;

}


window.addEventListener("scroll", () => {

    if (!scrollTicking) {

        window.requestAnimationFrame(
            updateScrollProgress
        );

        scrollTicking = true;

    }

}, { passive: true });


// Initial update.
updateScrollProgress();


// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

const revealElements = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


// ==========================================
// MOBILE NAVIGATION
// ==========================================

if (mobileMenuBtn && desktopNav) {

    mobileMenuBtn.addEventListener("click", () => {

        const isOpen =
            desktopNav.classList.toggle("open");


        mobileMenuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        mobileMenuBtn.textContent =
            isOpen ? "×" : "☰";

    });


    // Close menu after clicking a navigation link.
    desktopNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            desktopNav.classList.remove("open");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuBtn.textContent = "☰";

        });

    });

}


// ==========================================
// ORB PARALLAX EFFECT
// ==========================================

if (
    orb &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    document.addEventListener("mousemove", event => {

        const rect = orb.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;

        const centerY = rect.top + rect.height / 2;


        const distanceX = event.clientX - centerX;

        const distanceY = event.clientY - centerY;


        const rotateY = Math.max(
            -12,
            Math.min(12, distanceX / 35)
        );

        const rotateX = Math.max(
            -12,
            Math.min(12, -distanceY / 35)
        );


        orb.style.setProperty(
            "--mouse-x",
            `${rotateY}deg`
        );

        orb.style.setProperty(
            "--mouse-y",
            `${rotateX}deg`
        );

    });

}


// ==========================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({

            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth",

            block: "start"

        });

    });

});


// ==========================================
// PARALLAX FLOATING EFFECT ON HERO VISUAL
// ==========================================

const heroVisual = document.querySelector(".hero-visual");


if (
    heroVisual &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    heroVisual.addEventListener("mousemove", event => {

        const rect = heroVisual.getBoundingClientRect();

        const x = (
            event.clientX - rect.left
        ) / rect.width - 0.5;

        const y = (
            event.clientY - rect.top
        ) / rect.height - 0.5;


        const cards = heroVisual.querySelectorAll(
            ".floating-card"
        );


        cards.forEach((card, index) => {

            const strength = index === 0 ? 10 : -12;

            card.style.translate =
                `${x * strength}px ${y * strength}px`;

        });

    });


    heroVisual.addEventListener("mouseleave", () => {

        heroVisual.querySelectorAll(
            ".floating-card"
        ).forEach(card => {

            card.style.translate = "";

        });

    });

}


// ==========================================
// HEADER ACTIVE SECTION HIGHLIGHT
// ==========================================

const sections = document.querySelectorAll(
    "main section[id]"
);

const navLinks = document.querySelectorAll(
    ".desktop-nav a"
);


const sectionObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {

                const isActive =
                    link.getAttribute("href") ===
                    `#${entry.target.id}`;

                link.classList.toggle(
                    "active",
                    isActive
                );

            });

        });

    },

    {
        threshold: 0.35,
        rootMargin: "-70px 0px -35% 0px"
    }

);


sections.forEach(section => {

    sectionObserver.observe(section);

});


// ==========================================
// INITIALIZATION
// ==========================================

console.log(
    "✦ Hire-cheQ : Nadeem's Portfolio AI - Landing page loaded."
);