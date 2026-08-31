// =========================================
// ICONOS
// =========================================

if (typeof lucide !== "undefined") {
    lucide.createIcons();
}


// =========================================
// BOTÓN HOME
// =========================================

const homeButton = document.querySelector(".back-home");

if (homeButton) {

    homeButton.addEventListener("click", () => {

        window.location.href = "../index.html";

    });

}


// =========================================
// VENTANAS DEL BAÚL
// =========================================

const overlay = document.querySelector(".content-overlay");

const booksButton = document.querySelector(".books-window");
const recipesButton = document.querySelector(".recipes-window");
const travelButton = document.querySelector(".travel-window");

const booksContent = document.querySelector(".books-content");
const recipesContent = document.querySelector(".recipes-content");
const travelContent = document.querySelector(".travel-content");

const closeButtons =
    document.querySelectorAll(".close-window");


// =========================================
// ABRIR VENTANA
// =========================================

function openWindow(content) {

    if (!overlay || !content) {
        return;
    }


    // Ocultar todas las ventanas

    document
        .querySelectorAll(".content-window")
        .forEach(window => {

            window.classList.remove("active");

            window.style.display = "none";

        });


    // Mostrar la ventana seleccionada

    overlay.classList.add("active");

    content.style.display = "block";


    requestAnimationFrame(() => {

        content.classList.add("active");

    });


    // Actualizar iconos

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

}


// =========================================
// CERRAR VENTANA
// =========================================

function closeWindow() {

    if (!overlay) {
        return;
    }


    const activeWindow =
        document.querySelector(
            ".content-window.active"
        );


    if (activeWindow) {

        activeWindow.classList.remove("active");


        setTimeout(() => {

            activeWindow.style.display = "none";

        }, 250);

    }


    setTimeout(() => {

        overlay.classList.remove("active");

    }, 250);

}


// =========================================
// BOTÓN LIBROS
// =========================================

if (booksButton) {

    booksButton.addEventListener("click", () => {

        openWindow(booksContent);

    });

}


// =========================================
// BOTÓN RECETAS
// =========================================

if (recipesButton) {

    recipesButton.addEventListener("click", () => {

        openWindow(recipesContent);

    });

}


// =========================================
// BOTÓN VIAJES
// =========================================

if (travelButton) {

    travelButton.addEventListener("click", () => {

        openWindow(travelContent);

    });

}


// =========================================
// BOTONES CERRAR
// =========================================

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        closeWindow();

    });

});


// =========================================
// CERRAR AL HACER CLIC AFUERA
// =========================================

if (overlay) {

    overlay.addEventListener("click", event => {

        if (event.target === overlay) {

            closeWindow();

        }

    });

}


// =========================================
// LIBROS
// =========================================

const openAddBook =
    document.getElementById("openAddBook");

const closeBookForm =
    document.getElementById("closeBookForm");

const cancelBook =
    document.getElementById("cancelBook");

const bookFormOverlay =
    document.getElementById("bookFormOverlay");

const bookForm =
    document.getElementById("bookForm");

const booksGrid =
    document.getElementById("booksGrid");

const emptyBooks =
    document.getElementById("emptyBooks");


// =========================================
// ABRIR FORMULARIO
// =========================================

if (openAddBook) {

    openAddBook.addEventListener("click", () => {

        bookFormOverlay.classList.add("active");

    });

}


// =========================================
// CERRAR FORMULARIO
// =========================================

function closeBookFormWindow() {

    if (bookFormOverlay) {

        bookFormOverlay.classList.remove("active");

    }

}


if (closeBookForm) {

    closeBookForm.addEventListener(
        "click",
        closeBookFormWindow
    );

}


if (cancelBook) {

    cancelBook.addEventListener(
        "click",
        closeBookFormWindow
    );

}


if (bookFormOverlay) {

    bookFormOverlay.addEventListener(
        "click",
        event => {

            if (event.target === bookFormOverlay) {

                closeBookFormWindow();

            }

        }
    );

}


const coverInput =
    document.getElementById("bookCover");

const fileName =
    document.getElementById("fileName");


if (coverInput) {

    coverInput.addEventListener("change", () => {

        if (
            coverInput.files &&
            coverInput.files.length > 0
        ) {

            fileName.textContent =
                coverInput.files[0].name;

        } else {

            fileName.textContent =
                "Seleccionar portada";

        }

    });

}



const genericCover =
    "assets/portadas/genericas/generica-libros.jpg";

function loadBooks() {

    if (!booksGrid) {
        return;
    }


    booksGrid.innerHTML = "";


    const books =
        JSON.parse(
            localStorage.getItem("privateAtlasBooks")
        ) || [];


    if (books.length === 0) {

        if (emptyBooks) {

            emptyBooks.style.display = "flex";

        }

        return;

    }


    if (emptyBooks) {

        emptyBooks.style.display = "none";

    }


    books.forEach(book => {

        createBookCard(book);

    });


    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}

function createBookCard(book) {

    const card =
        document.createElement("article");


    card.classList.add("book-card");


    card.innerHTML = `

        <div class="book-cover-container">

            <img
                src="${book.cover}"
                alt="Portada de ${escapeHTML(book.title)}">

        </div>


        <div class="book-card-info">

            <h3>
                ${escapeHTML(book.title)}
            </h3>


            <p class="book-author">
                ${escapeHTML(book.author)}
            </p>


            <span class="book-genre">
                ${escapeHTML(book.genre)}
            </span>


            ${
                book.favorite
                    ? `
                        <span class="book-favorite">
                            <i data-lucide="star"></i>
                            Favorito
                        </span>
                    `
                    : ""
            }


            <button
                class="view-book-btn"
                type="button">

                Ver libro

            </button>

        </div>

    `;


    booksGrid.appendChild(card);


    const viewButton =
        card.querySelector(".view-book-btn");


    if (viewButton) {

        viewButton.addEventListener(
            "click",
            () => {

                showBookDetails(book);

            }
        );

    }

}

function showBookDetails(book) {

    const message = `

Título: ${book.title}

Autor: ${book.author}

Género: ${book.genre}

Antes de leerlo:
${book.expectations || "Sin información"}

Después de leerlo:
${book.review || "Sin reseña"}

${book.favorite ? "★ Libro favorito" : ""}

    `;


    alert(message);

}

if (bookForm) {

    bookForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const title =
                document
                    .getElementById("bookTitle")
                    .value
                    .trim();


            const author =
                document
                    .getElementById("bookAuthor")
                    .value
                    .trim();


            const genre =
                document
                    .getElementById("bookGenre")
                    .value;


            const expectations =
                document
                    .getElementById(
                        "bookExpectations"
                    )
                    .value
                    .trim();


            const review =
                document
                    .getElementById("bookReview")
                    .value
                    .trim();


            const favorite =
                document
                    .getElementById("bookFavorite")
                    .checked;


            let cover = genericCover;


            if (
                coverInput &&
                coverInput.files &&
                coverInput.files.length > 0
            ) {

                cover =
                    URL.createObjectURL(
                        coverInput.files[0]
                    );

            }

            const book = {

                id: Date.now(),

                title: title,

                author: author,

                genre: genre,

                cover: cover,

                expectations: expectations,

                review: review,

                favorite: favorite,

                dateAdded:
                    new Date().toISOString()

            };

            const books =
                JSON.parse(
                    localStorage.getItem(
                        "privateAtlasBooks"
                    )
                ) || [];

            books.push(book);


            localStorage.setItem(
                "privateAtlasBooks",
                JSON.stringify(books)
            );

            loadBooks();

            bookForm.reset();


            if (fileName) {

                fileName.textContent =
                    "Seleccionar portada";

            }


            closeBookFormWindow();


        }
    );

}

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

loadBooks();

if (typeof lucide !== "undefined") {

    lucide.createIcons();

}