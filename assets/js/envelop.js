const Envelope = (() => {

    const envelope = document.getElementById("envelope");
    const seal = document.getElementById("waxSeal");

    function openEnvelope() {

        if (envelope.classList.contains("open"))
            return;

        envelope.classList.add("open");

        setTimeout(() => {

            FlowerBlast.start();

        }, 1200);

        setTimeout(() => {

            document.getElementById("letterSection")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 2200);

    }

    function init() {

        seal.addEventListener("click", openEnvelope);

    }

    return {

        init

    };

})();