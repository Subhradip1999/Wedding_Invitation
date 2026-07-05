/* ==========================================================
   flowerBlast.js
   Celebration Flower Burst Effect
   ========================================================== */

const FlowerBlast = (() => {

    const FLOWER_COUNT = 40;

    function start() {

        for (let i = 0; i < FLOWER_COUNT; i++) {

            createFlower();

        }

    }

    function createFlower() {

        const flower = document.createElement("div");

        flower.className = "flower-blast";

        // Random size
        const size = random(10, 28);

        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;

        // Random colors
        const colors = [
            "#F8D7DA",
            "#F4C2C2",
            "#FFD1DC",
            "#FFE4E1",
            "#FFF0F5",
            "#FADADD",
            "#FFE5B4",
            "#FFF8DC"
        ];

        flower.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        // Random direction
        const angle = Math.random() * Math.PI * 2;

        const distance = random(120, 320);

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        flower.style.setProperty("--x", `${x}px`);
        flower.style.setProperty("--y", `${y}px`);

        // Random rotation
        flower.style.transform = `translate(-50%, -50%) rotate(${random(0,360)}deg)`;

        document.body.appendChild(flower);

        flower.animate(
            [
                {
                    transform:
                        `translate(-50%, -50%) translate(0,0) scale(0) rotate(0deg)`,
                    opacity: 1
                },
                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                         scale(2)
                         rotate(${random(360,1080)}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: random(800,1200),
                easing: "ease-out",
                fill: "forwards"
            }
        );

        setTimeout(() => {

            flower.remove();

        }, 1300);

    }

    function random(min, max) {

        return Math.random() * (max - min) + min;

    }

    return {

        start

    };

})();