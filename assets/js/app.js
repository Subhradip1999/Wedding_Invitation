/* ==========================================================
   Wedding Invitation
   app.js
   Global Application Controller
========================================================== */

"use strict";

/* ==========================================================
   Global State
========================================================== */

window.App = {

    initialized: false,

    invitationOpened: false,

    scratchCompleted: false,

    petalsStarted: false,

    galleryInitialized: false

};


/* ==========================================================
   DOM Ready
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApplication();

});


/* ==========================================================
   Initialize Everything
========================================================== */

function initializeApplication() {

    if (App.initialized) return;

    App.initialized = true;

    hideLoader();

    initializeScrollProgress();

    initializeSmoothScrolling();

    initializeSectionReveal();

    initializeBackgroundMusic();
	
	Petals.init();

    console.log("Wedding Invitation Initialized");

}
/* ==========================================================
   Loading Screen
========================================================== */

function hideLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hide");

        setTimeout(() => {

            loader.remove();

        }, 800);

    }, 1200);

}
/* ==========================================================
   Scroll Progress
========================================================== */

function initializeScrollProgress() {

    const progress = document.getElementById("scrollProgress");

    if (!progress) return;

    window.addEventListener("scroll", () => {

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            (window.scrollY / totalHeight) * 100;

        progress.style.width = percentage + "%";

    });

}
/* ==========================================================
   Smooth Scroll
========================================================== */

function initializeSmoothScrolling() {

    document.querySelectorAll("a[href^='#']").forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target =
                document.querySelector(this.getAttribute("href"));

            if (!target) return;

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

}
/* ==========================================================
   Reveal Animation
========================================================== */

function initializeSectionReveal() {

    const sections =
        document.querySelectorAll(".section");

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    sections.forEach(section => {

        observer.observe(section);

    });

}
/* ==========================================================
   Background Music
========================================================== */

function initializeBackgroundMusic() {

    const music =
        document.getElementById("bgMusic");

    if (!music) return;

    const startMusic = () => {

        music.volume = 0.35;

        music.play().catch(() => {});

        document.removeEventListener(
            "click",
            startMusic
        );

    };

    document.addEventListener(
        "click",
        startMusic,
        {
            once: true
        }
    );

}
/* ==========================================================
   Utilities
========================================================== */

function scrollToSection(id) {

    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({

        behavior: "smooth"

    });

}


function random(min, max) {

    return Math.random() * (max - min) + min;

}


function randomInt(min, max) {

    return Math.floor(

        Math.random() * (max - min + 1)

    ) + min;

}

const images = document.querySelectorAll(".journey-img");
const journey = document.getElementById("journey");

window.addEventListener("scroll", () => {

    const rect = journey.getBoundingClientRect();

    const total = journey.offsetHeight - window.innerHeight;

    let progress = -rect.top / total;

    progress = Math.max(0, Math.min(1, progress));

    const index = Math.min(
        images.length - 1,
        Math.floor(progress * images.length)
    );

    images.forEach(img =>
        img.classList.remove("active")
    );

    images[index].classList.add("active");

});

/*===================================================
countdown
====================================================*/
document.addEventListener("DOMContentLoaded", function () {
    // 1. Set your wedding date and time here (YYYY-MM-DDTHH:MM:SS format)
    const weddingDate = new Date("2026-11-25T18:00:00").getTime();

    // 2. Update the countdown every 1 second
    const countdownInterval = setInterval(function () {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        // 3. Time calculations for days, hours, minutes, and seconds
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // 4. Helper function to pad single digits with a leading zero (e.g., 5 -> 05)
        const formatTime = (time) => (time < 10 ? "0" + time : time);

        // 5. Inject the calculated time into your existing HTML structure
        if (timeLeft >= 0) {
            document.getElementById("days").innerText = formatTime(days);
            document.getElementById("hours").innerText = formatTime(hours);
            document.getElementById("minutes").innerText = formatTime(minutes);
            document.getElementById("seconds").innerText = formatTime(seconds);
        } else {
            // 6. What happens when the countdown hits zero
            clearInterval(countdownInterval);
            const countdownContainer = document.getElementById("countdown");
            if (countdownContainer) {
                countdownContainer.innerHTML = "<div class='time-box celebration-text' style='width: 100%; font-family: \"Cinzel\", serif; font-size: 1.5rem; color: var(--burgundy);'>The Big Day is Here! 🎉</div>";
            }
        }
    }, 1000);
});
