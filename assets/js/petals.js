/* ==========================================================
   petals.js
   ========================================================== */

const Petals = (() => {

    const PETAL_COUNT = 25;

    function init() {

        createPetals();

        window.addEventListener("resize", resetPetals);

    }

    function createPetals() {

        for (let i = 0; i < PETAL_COUNT; i++) {

            const petal = document.createElement("div");

            petal.className = "petal";

            randomizePetal(petal);

            document.body.appendChild(petal);

        }

    }

    function resetPetals() {

        document.querySelectorAll(".petal").forEach(randomizePetal);

    }

    function randomizePetal(petal) {

        const size = random(12, 28);
        const duration = random(8, 18);
        const delay = random(0, 10);
        const left = random(0, window.innerWidth);
        const rotate = random(0, 360);

        petal.style.left = `${left}px`;

        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;

        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `-${delay}s`;

        petal.style.transform = `rotate(${rotate}deg)`;

        // Random petal colors
        const colors = [
            "#F8D7DA",
            "#F4C2C2",
            "#FADADD",
            "#FFE4E1",
            "#FFF0F5"
        ];

        petal.style.background = colors[
            Math.floor(Math.random() * colors.length)
        ];

    }

    function random(min, max) {

        return Math.random() * (max - min) + min;

    }

    return {

        init

    };

})();