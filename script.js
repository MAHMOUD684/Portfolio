const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------------
   Typewriter role rotator
   --------------------------------------------------------------------- */
const roles = [
    "MEP Technical Office Engineer",
    "BIM Engineer",
    "Revit API Developer",
    "Dynamo Expert",
    "Python Automation Developer"
];

const typingEl = document.getElementById("typing");

function typewriter() {
    if (!typingEl) return;

    if (prefersReducedMotion) {
        typingEl.textContent = roles[0];
        return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 30;
    const HOLD_TIME = 1400;

    function step() {
        const current = roles[roleIndex];

        if (!deleting) {
            charIndex++;
            typingEl.textContent = current.slice(0, charIndex);

            if (charIndex === current.length) {
                deleting = true;
                setTimeout(step, HOLD_TIME);
                return;
            }
            setTimeout(step, TYPE_SPEED);
        } else {
            charIndex--;
            typingEl.textContent = current.slice(0, charIndex);

            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(step, 300);
                return;
            }
            setTimeout(step, DELETE_SPEED);
        }
    }

    step();
}

typewriter();

/* ---------------------------------------------------------------------
   Mobile nav toggle
   --------------------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

function closeNav() {
    if (!primaryNav || !navToggle) return;
    primaryNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    primaryNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeNav);
    });
}

/* ---------------------------------------------------------------------
   Scroll-spy active nav link
   --------------------------------------------------------------------- */
const navLinks = document.querySelectorAll('#primaryNav a[href^="#"]');
const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

function setActiveLink() {
    let currentId = "";
    const scrollY = window.scrollY + 140;

    sections.forEach(section => {
        if (section.offsetTop <= scrollY) {
            currentId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

/* ---------------------------------------------------------------------
   Nav frosted shadow on scroll
   --------------------------------------------------------------------- */
const navEl = document.querySelector("nav");

function setNavScrolled() {
    if (!navEl) return;
    navEl.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", setNavScrolled, { passive: true });
setNavScrolled();

/* ---------------------------------------------------------------------
   Reveal-on-scroll
   --------------------------------------------------------------------- */
const revealTargets = document.querySelectorAll(
    ".card, .project-card, .timeline-item, .feature-project, .section-heading, .stat-strip"
);

revealTargets.forEach(el => el.classList.add("reveal"));

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealTargets.forEach(el => observer.observe(el));
} else {
    revealTargets.forEach(el => el.classList.add("is-visible"));
}

/* ---------------------------------------------------------------------
   Back to top button
   --------------------------------------------------------------------- */
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 600);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
}

/* ---------------------------------------------------------------------
   Video modal (fullscreen video preview)
   --------------------------------------------------------------------- */
const videoModal = document.getElementById("videoModal");
const videoModalIframe = document.getElementById("videoModalIframe");
const videoModalClose = document.getElementById("videoModalClose");

function openVideoModal(src, title) {
    if (!videoModal || !videoModalIframe) return;
    videoModalIframe.src = src || "";
    if (title) videoModalIframe.title = title;
    videoModal.classList.add("active");
    videoModal.setAttribute("aria-hidden", "false");
}

function closeVideoModal() {
    if (!videoModal || !videoModalIframe) return;
    videoModal.classList.remove("active");
    videoModal.setAttribute("aria-hidden", "true");
    videoModalIframe.src = ""; // stop playback
}

document.querySelectorAll(".fullscreen-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        openVideoModal(btn.dataset.videoSrc, btn.dataset.videoTitle);
    });
});

if (videoModalClose) {
    videoModalClose.addEventListener("click", closeVideoModal);
}

if (videoModal) {
    videoModal.addEventListener("click", e => {
        if (e.target === videoModal) closeVideoModal();
    });
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeVideoModal();
});

window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;

/* ---------------------------------------------------------------------
   Footer year
   --------------------------------------------------------------------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();