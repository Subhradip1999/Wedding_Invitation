/* ==========================================================
   scratch.js
   Wedding Invitation Scratch Card - Firework Flower Blast
   ========================================================== */

const ScratchCard = (() => {

    let canvas;
    let ctx;

    let isDrawing = false;
    let revealed = false;

    function init() {

        canvas = document.getElementById("scratchCanvas");

        if (!canvas) return;

        ctx = canvas.getContext("2d");

        resizeCanvas();

        drawCover();

        registerEvents();

        window.addEventListener("resize", resizeCanvas);
    }

    function resizeCanvas() {

        const parent = document.querySelector(".scratch-wrapper");
        if (!parent) return;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        if (!revealed)
            drawCover();
    }

    function drawCover() {

        ctx.globalCompositeOperation = "source-over";

        ctx.fillStyle = "#d4c3a3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Decorative message
        ctx.fillStyle = "#6d1833";
        ctx.font = "bold 28px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            "Scratch to Open",
            canvas.width / 2,
            canvas.height / 2
        );
    }

    function registerEvents() {

        canvas.addEventListener("mousedown", startScratch);
        canvas.addEventListener("mousemove", scratch);
        canvas.addEventListener("mouseup", stopScratch);
        canvas.addEventListener("mouseleave", stopScratch);

        canvas.addEventListener("touchstart", startScratch, { passive: false });
        canvas.addEventListener("touchmove", scratch, { passive: false });
        canvas.addEventListener("touchend", stopScratch);
    }

    function startScratch(e) {

        isDrawing = true;

        scratch(e);
    }

    function stopScratch() {

        isDrawing = false;

        checkReveal();
    }

    function scratch(e) {

        if (!isDrawing) return;

        e.preventDefault();

        const rect = canvas.getBoundingClientRect();

        let x, y;

        if (e.touches) {

            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;

        } else {

            x = e.clientX - rect.left;
            y = e.clientY - rect.top;

        }

        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
    }

    function checkReveal() {

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

        let transparent = 0;

        const pixels = imageData.data;

        for (let i = 3; i < pixels.length; i += 4) {

            if (pixels[i] === 0)
                transparent++;

        }

        const percent =
            transparent / (canvas.width * canvas.height);

        if (percent > 0.55)
            reveal();
    }

    function triggerFireworkFlowerBlast() {

        if (typeof confetti === 'function') {

            const scratchElem = canvas || document.getElementById('scratchSection');
            const rect = scratchElem.getBoundingClientRect();
            
            // Launch origin (from the scratch card location)
            const originX = (rect.left + rect.width / 2) / window.innerWidth;
            const originY = (rect.top + rect.height / 2) / window.innerHeight;

            const flowerColors = ['#6b001a', '#800020', '#d4af37', '#ffb7c5', '#ffffff'];

            // STAGE 1: Rising Rocket Trail (Fires straight up like a sky launch)
            confetti({
                particleCount: 25,
                angle: 90,
                spread: 15,
                startVelocity: 65,
                origin: { x: originX, y: originY },
                colors: ['#d4af37', '#ffffff'],
                gravity: 1.2,
                scalar: 0.8,
                ticks: 60
            });

            // STAGE 2: High Sky Explosion (Shell detonation at peak height)
            setTimeout(() => {
                // High velocity 360-degree radial blast
                confetti({
                    particleCount: 160,
                    spread: 360,
                    startVelocity: 55,
                    origin: { x: originX, y: Math.max(0.2, originY - 0.4) }, // Explodes higher up in the sky
                    colors: flowerColors,
                    gravity: 0.6,
                    ticks: 300,
                    scalar: 1.55, // Large bloom size
                    shapes: ['circle']
                });

                // Secondary sparkle pop right in the middle of the main blast
                confetti({
                    particleCount: 50,
                    spread: 100,
                    startVelocity: 35,
                    origin: { x: originX, y: Math.max(0.2, originY - 0.4) },
                    colors: ['#d4af37', '#ffffff'],
                    gravity: 0.4,
                    ticks: 200,
                    scalar: 1.0
                });
            }, 320); // Delay matches the time it takes the rocket to travel up

            // STAGE 3: Glitter & Floating Petal Drift (Falls gently after detonation)
            setTimeout(() => {
                confetti({
                    particleCount: 80,
                    angle: 90,
                    spread: 160,
                    startVelocity: 20,
                    origin: { x: originX, y: Math.max(0.18, originY - 0.42) },
                    colors: flowerColors,
                    gravity: 0.25, // Soft floating drift
                    ticks: 450,
                    scalar: 1.25
                });
            }, 550);

        } else if (typeof FlowerBlast !== 'undefined' && typeof FlowerBlast.start === 'function') {
            FlowerBlast.start();
            setTimeout(() => FlowerBlast.start(), 350);
        }
    }

    function reveal() {

        if (revealed) return;

        revealed = true;

        canvas.style.transition = "opacity .8s ease";
        canvas.style.opacity = 0;

        // Firework-style sky launch trigger
        triggerFireworkFlowerBlast();

        setTimeout(() => {

            canvas.style.display = "none";

        }, 800);
    }

    return {

        init

    };

})();

document.addEventListener("DOMContentLoaded", () => {

    ScratchCard.init();

});
