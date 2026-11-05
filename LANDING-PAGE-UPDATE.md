# Hire-cheQ landing page: portrait + About update

This is a minimal update to the existing landing page. It does not replace your current landing design or modify the assistant/backend logic.

## 1. Copy the portrait asset

Copy `frontend/assets/nadeem-portrait.png` into the same path in your project.

## 2. Add the stylesheet

In `frontend/index.html`, inside `<head>`, add this line immediately after the existing `landing.css` link:

```html
<link rel="stylesheet" href="landing-portrait-additions.css">
```

Keep the existing `landing.css` link.

## 3. Add the tagline to the hero

In the existing `.hero-content`, immediately after the `<h1>...</h1>` element, add:

```html
<p class="hero-role">Backend developer | Applied-AI Engineer</p>
```

## 4. Replace the orb inside the hero visual

In the existing `.hero-visual`, find and remove the complete `.orbital-core` element (including its `.orb-shine` and `.orb-inner` children). Put this in the same position, leaving the three `.visual-orbit` elements and the floating cards/particles in place:

```html
<div class="portrait-stage">
    <div class="portrait-halo"></div>
    <img
        class="hero-portrait"
        src="assets/nadeem-portrait.png"
        alt="Illustrated portrait of Md Nadeem Ashraf Ansari"
    >
</div>
```

The portrait is a transparent PNG so the existing orbit rings and glow can remain behind it.

## 5. Replace the existing About section

Replace the complete `<section class="about-section" id="about"> ... </section>` with:

```html
<section class="about-section" id="about">
    <div class="section-container">
        <div class="section-kicker reveal">
            <span>01</span>
            ABOUT ME
        </div>

        <div class="about-grid">
            <div class="about-heading reveal">
                <h2>
                    The person behind
                    <span>the projects.</span>
                </h2>
            </div>

            <div class="about-description reveal">
                <p>
                    I'm Md Nadeem Ashraf Ansari, a B.E. Computer Science
                    graduate specialising in Data Science at SVIT,
                    Bengaluru, with a CGPA of 8.99.
                </p>

                <p>
                    I'm interested in backend development and Applied AI,
                    and enjoy turning technical ideas into useful,
                    practical solutions. My documented experience includes
                    internships with DRDO and Swizosoft, with exposure to
                    data analysis, SQL-based investigation, system
                    troubleshooting and anomaly detection.
                </p>

                <a href="assistant.html" class="text-link">
                    Meet my AI assistant
                    <span>↗</span>
                </a>
            </div>
        </div>

        <div class="about-strip reveal">
            <div class="strip-item">
                <span class="strip-number">8.99</span>
                <span class="strip-text">CGPA · SVIT Bengaluru</span>
            </div>

            <div class="strip-item">
                <span class="strip-number">2</span>
                <span class="strip-text">Internship experiences</span>
            </div>

            <div class="strip-item">
                <span class="strip-number">4+</span>
                <span class="strip-text">Documented projects</span>
            </div>
        </div>
    </div>
</section>
```

## 6. Add the CSS

Copy `frontend/landing-portrait-additions.css` into your project's `frontend` folder. No other CSS needs to be changed.

## 7. No JavaScript or backend changes

Keep `landing.js`, `assistant.html`, `assistant-effects.js`, `app.js`, all backend files, and your API configuration unchanged.

## 8. Refresh

Save the files and hard-refresh the landing page with Ctrl+Shift+R.
