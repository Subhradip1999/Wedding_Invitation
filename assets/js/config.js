/* ==========================================================
   config.js
   Load invitation configuration
========================================================== */

"use strict";

let Invitation = {};

document.addEventListener("DOMContentLoaded", () => {

    loadInvitation();

});
async function loadInvitation() {

    try {

        const response = await fetch("assets/data/invitation.json");

        Invitation = await response.json();

        applyInvitationData();

    }

    catch (error) {

        console.error("Unable to load invitation.json");

        console.error(error);

    }

}
function applyInvitationData() {

    setCoupleNames();

    setDates();

    setVenue();

    setTexts();

    setGallery();

    setMusic();

    applyTheme();

}
function setCoupleNames() {

    const title = document.getElementById("coupleName");

    if (!title) return;

    title.innerHTML =
        `${Invitation.brideName} <span>❤</span> ${Invitation.groomName}`;

}
function setDates() {

    const wedding =
        document.getElementById("weddingDate");

    const ceremony =
        document.getElementById("ceremonyDate");

    const reception =
        document.getElementById("receptionDate");
		
	const ceremonyTime = document.getElementById("ceremonyTime");
	const receptionTime = document.getElementById("receptionTime");

	if (ceremonyTime)
		ceremonyTime.textContent = Invitation.weddingTime;

	if (receptionTime)
		receptionTime.textContent = Invitation.receptionTime;

    if (wedding)
        wedding.textContent =
            Invitation.weddingDate;

    if (ceremony)
        ceremony.textContent =
            Invitation.weddingDate;

    if (reception)
        reception.textContent =
            Invitation.receptionDate;

}
function setVenue() {

    const venueName =
        document.getElementById("venueName");

    const venueAddress =
        document.getElementById("venueAddress");

    const button =
        document.getElementById("directionButton");

    if (venueName)
        venueName.textContent =
            Invitation.venue.name;

    if (venueAddress)
        venueAddress.textContent =
            Invitation.venue.address;

    if (button)
        button.href =
            Invitation.venue.googleMapUrl;

}
function setTexts() {

    const invitation =
        document.getElementById("invitationText");

    const thankyou =
        document.getElementById("thankYouText");

    if (invitation)
        invitation.innerHTML =
            Invitation.invitationText;

    if (thankyou)
        thankyou.innerHTML =
            Invitation.thankYouText;

}
function setGallery() {

    const gallery =
        document.querySelector(".gallery-stack");

    if (!gallery) return;

    gallery.innerHTML = "";

    Invitation.galleryImages.forEach(image => {

        const img =
            document.createElement("img");

        img.src = image;

        img.className =
            "gallery-photo reveal-photo";

        gallery.appendChild(img);

    });

}
function setMusic() {

    const music =
        document.getElementById("bgMusic");

    if (!music) return;

    music.src =
        Invitation.music.background;

}
function applyTheme() {

    document.documentElement.style.setProperty(

        "--primary-color",

        Invitation.theme.primary

    );

    document.documentElement.style.setProperty(

        "--secondary-color",

        Invitation.theme.secondary

    );

}
function getInvitationConfig() {

    return Invitation;

}
