if (typeof lucide !== "undefined") {
    lucide.createIcons();
}


const homeButton = document.querySelector(".back-home");

if (homeButton) {

    homeButton.addEventListener("click", () => {

        window.location.href = "../index.html";

    });

}


const overlay = document.querySelector(".content-overlay");

const booksButton = document.querySelector(".books-window");
const recipesButton = document.querySelector(".recipes-window");
const travelButton = document.querySelector(".travel-window");

const booksContent = document.querySelector(".books-content");
const recipesContent = document.querySelector(".recipes-content");
const travelContent = document.querySelector(".travel-content");

const closeButtons = document.querySelectorAll(".close-window");


function openWindow(content) {

    if (!overlay || !content) return;

    overlay.classList.add("active");

    content.style.display = "block";

    requestAnimationFrame(() => {
        content.classList.add("active");
    });

}


function closeWindow() {

    if (!overlay) return;

    const activeWindow =
        document.querySelector(".content-window.active");

    if (activeWindow) {

        activeWindow.classList.remove("active");

        setTimeout(() => {
            activeWindow.style.display = "none";
        }, 400);

    }

    setTimeout(() => {
        overlay.classList.remove("active");
    }, 400);

}


if (booksButton) {

    booksButton.addEventListener("click", () => {
        openWindow(booksContent);
    });

}


if (recipesButton) {

    recipesButton.addEventListener("click", () => {
        openWindow(recipesContent);
    });

}


if (travelButton) {

    travelButton.addEventListener("click", () => {
        openWindow(travelContent);
    });

}


closeButtons.forEach(button => {

    button.addEventListener("click", () => {
        closeWindow();
    });

});


if (overlay) {

    overlay.addEventListener("click", (event) => {

        if (event.target === overlay) {
            closeWindow();
        }

    });

}


// =====================================
// LIBROS
// =====================================

const openAddBook = document.getElementById("openAddBook");
const closeBookForm = document.getElementById("closeBookForm");
const bookFormOverlay = document.getElementById("bookFormOverlay");
const bookForm = document.getElementById("bookForm");
const booksGrid = document.getElementById("booksGrid");

openAddBook.addEventListener("click", () => {
    bookFormOverlay.classList.add("active");
});

closeBookForm.addEventListener("click", () => {
    bookFormOverlay.classList.remove("active");
});

bookFormOverlay.addEventListener("click", (event) => {
    if (event.target === bookFormOverlay) {
        bookFormOverlay.classList.remove("active");
    }
});

bookForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const genre = document.getElementById("bookGenre").value;
    const expectations = document.getElementById("bookExpectations").value;
    const review = document.getElementById("bookReview").value;
    const favorite = document.getElementById("bookFavorite").checked;

    const coverInput = document.getElementById("bookCover");

    let cover = "assets/portadas/genericas/generica-libros.jpg";

    if (coverInput.files.length > 0) {
        cover = URL.createObjectURL(coverInput.files[0]);
    }

    const bookCard = document.createElement("div");

    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
        <img src="${cover}" alt="Portada de ${title}">

        <h3>${title}</h3>

        <p>${author}</p>

        <p>${genre}</p>

        ${
            favorite
                ? "<p>★ Favorito</p>"
                : ""
        }
    `;

    booksGrid.appendChild(bookCard);

    bookForm.reset();

    bookFormOverlay.classList.remove("active");
});