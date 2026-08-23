/* =====================================
   VOLVER AL HOME
===================================== */

const homeButton = document.querySelector(".back-home");

if (homeButton) {

    homeButton.addEventListener("click", () => {

        window.location.href = "../index.html";

    });

}