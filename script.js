
// ======================================
// 1. MATRIX RAIN ANIMATION
// ======================================

const hero = document.querySelector(".hero");

if (hero) {
    const canvas = document.createElement("canvas");
    canvas.id = "matrixCanvas";
    hero.prepend(canvas);

    const ctx = canvas.getContext("2d");

    const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>$#";
    let columns = [];
    let fontSize = 14;
    let animationId;

    function resizeMatrix() {
        canvas.width = hero.clientWidth;
        canvas.height = hero.clientHeight;

        const totalColumns = Math.floor(canvas.width / fontSize);

        columns = Array.from(
            { length: totalColumns },
            () => Math.random() * -50
        );
    }

    function drawMatrix() {
        ctx.fillStyle = "rgba(7, 17, 13, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff88";
        ctx.font = `${fontSize}px monospace`;

        columns.forEach((y, index) => {
            const character = characters[
                Math.floor(Math.random() * characters.length)
            ];

            const x = index * fontSize;

            ctx.fillText(character, x, y * fontSize);

            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                columns[index] = 0;
            } else {
                columns[index]++;
            }
        });

        animationId = requestAnimationFrame(drawMatrix);
    }

    resizeMatrix();
    drawMatrix();

    window.addEventListener("resize", resizeMatrix);

    // Pause when tab is hidden
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            cancelAnimationFrame(animationId);
            drawMatrix();
        }
    });
}


// ======================================
// 2. TYPING ANIMATION
// ======================================

const heroHeading = document.querySelector(".hero-content h2");

if (heroHeading) {

    heroHeading.innerHTML =
        'Cybersecurity Enthusiast <span id="typed-role"></span>';

    const typedRole = document.getElementById("typed-role");

    const roles = [
        "| Java Developer",
        "| Cybersecurity Enthusiast",
        "| Problem Solver",
        "| Software Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typedRole.textContent = currentRole.substring(0, charIndex);

        let speed = deleting ? 45 : 85;

        if (!deleting && charIndex === currentRole.length) {
            speed = 1500;
            deleting = true;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}


// ======================================
// 3. SCROLL REVEAL ANIMATION
// ======================================

const revealElements = document.querySelectorAll(
    ".section-title, .about-container, " +
    ".education-card, .skill-card, " +
    ".project-card, .experience-card, " +
    ".achievement-card, .cyber-content, " +
    ".contact-container"
);

revealElements.forEach((element, index) => {
    element.classList.add("reveal");

    // Small stagger between cards
    if (
        element.classList.contains("skill-card") ||
        element.classList.contains("project-card") ||
        element.classList.contains("education-card") ||
        element.classList.contains("achievement-card")
    ) {
        element.style.transitionDelay = `${(index % 4) * 100}ms`;
    }
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// ======================================
// 4. PROFILE IMAGE MOUSE MOVEMENT
// ======================================

const profileImage = document.querySelector(".profile-photo");

if (profileImage && window.matchMedia("(hover: hover)").matches) {

    const photoContainer = profileImage.parentElement;

    photoContainer.addEventListener("mousemove", (event) => {

        const rect = photoContainer.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const moveX = (x / rect.width - 0.5) * 8;
        const moveY = (y / rect.height - 0.5) * 8;

        profileImage.style.translate =
            `${moveX}px ${moveY}px`;

    });

    photoContainer.addEventListener("mouseleave", () => {
        profileImage.style.translate = "0 0";
    });
}

// ============================================
// NAV VATS - PREMIUM INTERACTION ENGINE
// ============================================

// 1. PRELOADER
window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 1900);
    }
});


// 2. SCROLL PROGRESS
const progressBar = document.getElementById("scroll-progress");

let scrollScheduled = false;

window.addEventListener("scroll", () => {
    if (scrollScheduled) return;

    scrollScheduled = true;

    requestAnimationFrame(() => {
        const scrollable =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollable > 0
            ? (window.scrollY / scrollable) * 100
            : 0;

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

        scrollScheduled = false;
    });
}, { passive: true });


// 3. CUSTOM CURSOR
const cursor = document.querySelector(".custom-cursor");
const follower = document.querySelector(".cursor-follower");

if (
    cursor &&
    follower &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        document.body.classList.add("cursor-ready");

        cursor.style.transform =
            `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        follower.style.transform =
            `translate(${followerX - 16}px, ${followerY - 16}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("mouseenter", () => {
            follower.style.width = "48px";
            follower.style.height = "48px";
        });

        el.addEventListener("mouseleave", () => {
            follower.style.width = "32px";
            follower.style.height = "32px";
        });
    });
}


// 4. 3D CARD TILT + SPOTLIGHT
const interactiveCards = document.querySelectorAll(
    ".skill-card, .project-card, .achievement-card"
);

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

    interactiveCards.forEach(card => {

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 18;
            const rotateY = (x - centerX) / 18;

            card.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(900px) rotateX(0) rotateY(0)";
        });

    });
}


// 5. MAGNETIC BUTTONS
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

    document.querySelectorAll(".hero-buttons .btn").forEach(button => {

        button.addEventListener("mousemove", (e) => {

            const rect = button.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "translate(0, 0)";
        });

    });
}


// 6. SCROLL REVEAL
const revealItems = document.querySelectorAll(
    ".section-title, .about-container, .education-card, " +
    ".skill-card, .project-card, .experience-card, " +
    ".achievement-card, .cyber-content, .contact-container"
);

const observer = new IntersectionObserver((entries, obs) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.12
});

revealItems.forEach((item, index) => {
    item.classList.add("reveal");

    item.style.transitionDelay =
        `${(index % 3) * 100}ms`;

    observer.observe(item);
});


// 7. ACTIVE NAVIGATION
const sections = document.querySelectorAll(
    "section[id]"
);

const navLinks = document.querySelectorAll(
    ".navbar nav a[href^='#']"
);

const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") ===
                    "#" + entry.target.id
                );
            });

        }

    });

}, {
    rootMargin: "-30% 0px -60% 0px"
});

sections.forEach(section => {
    sectionObserver.observe(section);
});


// 8. ANIMATED COUNTERS
const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const element = entry.target;
        const target = Number(element.dataset.count);
        const duration = 1600;
        const start = performance.now();

        function updateCounter(now) {

            const progress = Math.min(
                (now - start) / duration,
                1
            );

            const eased = 1 - Math.pow(1 - progress, 3);

            element.textContent = Math.round(target * eased);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(element);

    });

}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

document.addEventListener("DOMContentLoaded", () => {

    const socialIcons = document.querySelectorAll(".social-links a");

    // Disable magnetic effect on touch devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    // Disable when reduced motion is preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    socialIcons.forEach(icon => {

        icon.addEventListener("mousemove", (event) => {

            const rect = icon.getBoundingClientRect();

            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.15;
            const moveY = y * 0.15;

            icon.style.setProperty("--mag-x", `${moveX}px`);
            icon.style.setProperty("--mag-y", `${moveY}px`);

        });

        icon.addEventListener("mouseleave", () => {

            icon.style.setProperty("--mag-x", "0px");
            icon.style.setProperty("--mag-y", "0px");

        });

    });

});


document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    /* 1. Cursor-following holographic light */
    if (finePointer && !reducedMotion) {

        const light = document.createElement("div");
        light.id = "holo-light";
        document.body.appendChild(light);

        document.addEventListener("mousemove", event => {
            light.style.left = `${event.clientX}px`;
            light.style.top = `${event.clientY}px`;
        });
    }

    /* 2. Interactive holographic cards */
    const cards = document.querySelectorAll(`
        .about-card,
        .education-card,
        .skill-card,
        .project-card,
        .experience-card,
        .achievement-card,
        .cyber-card,
        .contact-card
    `);

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty(
                "--mouse-x",
                `${(x / rect.width) * 100}%`
            );

            card.style.setProperty(
                "--mouse-y",
                `${(y / rect.height) * 100}%`
            );

            if (!finePointer || reducedMotion) return;

            const rotateY = ((x / rect.width) - 0.5) * 5;
            const rotateX = ((0.5 - y / rect.height)) * 5;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    /* 3. Reveal sections while scrolling */
    const revealItems = document.querySelectorAll(`
        .section-title,
        .about-text,
        .about-card,
        .education-card,
        .skill-card,
        .project-card,
        .experience-card,
        .achievement-card,
        .cyber-card,
        .contact-card
    `);

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach(item => item.classList.add("visible"));
    } else {

        revealItems.forEach(item => item.classList.add("reveal"));

        const revealObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealItems.forEach(item => revealObserver.observe(item));
    }

    /* 4. Active navigation link */
    const navLinks = document.querySelectorAll(
        '.navbar nav a[href^="#"]'
    );

    const sections = document.querySelectorAll(
        "section[id]"
    );

    if ("IntersectionObserver" in window) {

        const navObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {

                    const isActive =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    link.classList.toggle("active", isActive);

                });

            });

        }, {
            rootMargin: "-35% 0px -55% 0px"
        });

        sections.forEach(section => navObserver.observe(section));
    }

});
