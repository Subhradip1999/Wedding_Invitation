/* ==========================================================
   scratch.js
   Wedding Invitation Scratch Card
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

    function reveal() {

        if (revealed) return;

        revealed = true;

        canvas.style.transition = "opacity .8s ease";

        canvas.style.opacity = 0;
		FlowerBlast.start();

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
