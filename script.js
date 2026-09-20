// =========================
// MOBILE NAVIGATION
// =========================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close mobile menu after clicking a navigation link
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const message = document.getElementById("message")?.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all the fields.");
            return;
        }

        // Opens the user's email client with the message addressed to Navneet.
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        window.location.href =
            `mailto:vats.navneet454@gmail.com?subject=${subject}&body=${body}`;
    });
}


// =========================
// ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});
