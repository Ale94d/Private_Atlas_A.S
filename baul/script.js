if (typeof lucide !== "undefined") {
    lucide.createIcons();
}


const homeButton =
    document.querySelector(".back-home");

if (homeButton) {

    homeButton.addEventListener("click", () => {

        window.location.href = "../index.html";

    });

}


const overlay =
    document.querySelector(".content-overlay");

const booksButton =
    document.querySelector(".books-window");

const recipesButton =
    document.querySelector(".recipes-window");

const travelButton =
    document.querySelector(".travel-window");


const booksContent =
    document.querySelector(".books-content");

const recipesContent =
    document.querySelector(".recipes-content");

const travelContent =
    document.querySelector(".travel-content");


const closeButtons =
    document.querySelectorAll(".close-window");


function openWindow(content) {

    if (!overlay || !content) {
        return;
    }


    document
        .querySelectorAll(".content-window")
        .forEach(window => {

            window.classList.remove("active");

            window.style.display = "none";

        });


    overlay.classList.add("active");

    content.style.display = "block";


    requestAnimationFrame(() => {

        content.classList.add("active");

    });


    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


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

    overlay.addEventListener("click", event => {

        if (event.target === overlay) {

            closeWindow();

        }

    });

}


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


if (openAddBook) {

    openAddBook.addEventListener("click", () => {

        if (bookForm) {

            bookForm.reset();

            delete bookForm.dataset.editingId;

        }


        if (fileName) {

            fileName.textContent =
                "Seleccionar portada";

        }


        if (bookFormOverlay) {

            bookFormOverlay.classList.add("active");

        }

    });

}

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
    "assets/portadas/Aventura/P1.png";


const genericCovers = {

    "Aventura": [

        "assets/portadas/Aventura/P1.png",
        "assets/portadas/Aventura/P2.png",
        "assets/portadas/Aventura/P3.png",
        "assets/portadas/Aventura/P4.png",
        "assets/portadas/Aventura/P5.png",
        "assets/portadas/Aventura/P6.png"

    ],


    "Ciencia ficcion": [

        "assets/portadas/Ciencia Ficcion/P1.png",
        "assets/portadas/Ciencia Ficcion/P2.png",
        "assets/portadas/Ciencia Ficcion/P3.png",
        "assets/portadas/Ciencia Ficcion/P4.png",
        "assets/portadas/Ciencia Ficcion/P5.png",
        "assets/portadas/Ciencia Ficcion/P6.png"

    ],


    "Dark Romance": [

        "assets/portadas/Dark Romance/P1.png",
        "assets/portadas/Dark Romance/P2.png",
        "assets/portadas/Dark Romance/P3.png",
        "assets/portadas/Dark Romance/P4.png",
        "assets/portadas/Dark Romance/P5.png",
        "assets/portadas/Dark Romance/P6.png"

    ],


    "Distopía": [

        "assets/portadas/Distopía/P1.png",
        "assets/portadas/Distopía/P2.png",
        "assets/portadas/Distopía/P3.png",
        "assets/portadas/Distopía/P4.png",
        "assets/portadas/Distopía/P5.png",
        "assets/portadas/Distopía/P6.png"

    ],


    "Fantasia": [

        "assets/portadas/Fantasia/P1.png",
        "assets/portadas/Fantasia/P2.png",
        "assets/portadas/Fantasia/P3.png",
        "assets/portadas/Fantasia/P4.png",
        "assets/portadas/Fantasia/P5.png",
        "assets/portadas/Fantasia/P6.png"

    ],


    "Histórico": [

        "assets/portadas/Histórico/P1.png",
        "assets/portadas/Histórico/P2.png",
        "assets/portadas/Histórico/P3.png",
        "assets/portadas/Histórico/P4.png",
        "assets/portadas/Histórico/P5.png",
        "assets/portadas/Histórico/P6.png"

    ],


    "Misterio": [

        "assets/portadas/Misterio/P1.png",
        "assets/portadas/Misterio/P2.png",
        "assets/portadas/Misterio/P3.png",
        "assets/portadas/Misterio/P4.png",
        "assets/portadas/Misterio/P5.png",
        "assets/portadas/Misterio/P6.png"

    ],


    "Otro": [

        "assets/portadas/Comodines/P1.png",
        "assets/portadas/Comodines/P2.png",
        "assets/portadas/Comodines/P3.png",
        "assets/portadas/Comodines/P4.png",
        "assets/portadas/Comodines/P5.png",
        "assets/portadas/Comodines/P6.png"

    ]

};

function getRandomCover(genre) {

    const covers =
        genericCovers[genre];


    if (
        !covers ||
        covers.length === 0
    ) {

        return genericCover;

    }


    const randomIndex =
        Math.floor(
            Math.random() * covers.length
        );


    return covers[randomIndex];

}

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text || "";


    return div.innerHTML;

}

function loadBooks() {

    if (!booksGrid) {
        return;
    }


    booksGrid.innerHTML = "";


    const books =
        JSON.parse(
            localStorage.getItem(
                "privateAtlasBooks"
            )
        ) || [];


    if (books.length === 0) {

        if (emptyBooks) {

            emptyBooks.style.display =
                "flex";

        }

        return;

    }


    if (emptyBooks) {

        emptyBooks.style.display =
            "none";

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

        <div class="book-cover-wrapper">

            <img
                src="${book.cover}"
                alt="Portada de ${escapeHTML(book.title)}"
            >

            <div class="book-card-info">

                <h3>
                    ${escapeHTML(book.title)}
                </h3>

                <p class="book-author">
                    ${escapeHTML(book.author)}
                </p>

            </div>

        </div>


        <div class="book-card-bottom">

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


            <div class="book-card-buttons">

                <button
                    class="view-book-btn"
                    type="button"
                >

                    <i data-lucide="eye"></i>

                    Ver libro

                </button>


                <button
                    class="edit-book-btn"
                    type="button"
                >

                    <i data-lucide="pencil"></i>

                    Editar

                </button>


                <button
                    class="delete-book-btn"
                    type="button"
                >

                    <i data-lucide="trash-2"></i>

                    Eliminar

                </button>

            </div>

        </div>

    `;


    booksGrid.appendChild(card);


    const viewButton =
        card.querySelector(
            ".view-book-btn"
        );


    const editButton =
        card.querySelector(
            ".edit-book-btn"
        );


    const deleteButton =
        card.querySelector(
            ".delete-book-btn"
        );


    if (viewButton) {

        viewButton.addEventListener(
            "click",
            () => {

                showBookDetails(book);

            }
        );

    }


    if (editButton) {

        editButton.addEventListener(
            "click",
            () => {

                editBook(book);

            }
        );

    }


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            () => {

                deleteBook(book.id);

            }
        );

    }

}

function showBookDetails(book) {

    const detailsOverlay =
        document.getElementById(
            "bookDetailsOverlay"
        );


    const detailsCover =
        document.getElementById(
            "detailsCover"
        );


    const detailsTitle =
        document.getElementById(
            "detailsTitle"
        );


    const detailsAuthor =
        document.getElementById(
            "detailsAuthor"
        );


    const detailsGenre =
        document.getElementById(
            "detailsGenre"
        );


    const detailsExpectations =
        document.getElementById(
            "detailsExpectations"
        );


    const detailsReview =
        document.getElementById(
            "detailsReview"
        );


    const detailsFavorite =
        document.getElementById(
            "detailsFavorite"
        );


    if (!detailsOverlay) {
        return;
    }

    if (detailsCover) {

        detailsCover.src =
            book.cover;


        detailsCover.alt =
            `Portada de ${escapeHTML(book.title)}`;

    }


    if (detailsTitle) {

        detailsTitle.textContent =
            book.title || "";

    }

    if (detailsAuthor) {

        detailsAuthor.textContent =
            `Por ${book.author || ""}`;

    }


    if (detailsGenre) {

        detailsGenre.textContent =
            book.genre || "";

    }


    if (detailsExpectations) {

        detailsExpectations.textContent =
            book.expectations ||
            "Todavía no has escrito qué esperabas encontrar.";

    }

    if (detailsReview) {

        detailsReview.textContent =
            book.review ||
            "Todavía no has escrito tu opinión sobre el libro.";

    }


    if (detailsFavorite) {

        detailsFavorite.style.display =
            book.favorite
                ? "flex"
                : "none";

    }


    detailsOverlay.classList.add("active");


    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}

function editBook(book) {

    if (
        !bookFormOverlay ||
        !bookForm
    ) {

        return;

    }


    document.getElementById(
        "bookTitle"
    ).value =
        book.title || "";


    document.getElementById(
        "bookAuthor"
    ).value =
        book.author || "";


    document.getElementById(
        "bookGenre"
    ).value =
        book.genre || "";


    document.getElementById(
        "bookExpectations"
    ).value =
        book.expectations || "";


    document.getElementById(
        "bookReview"
    ).value =
        book.review || "";


    document.getElementById(
        "bookFavorite"
    ).checked =
        !!book.favorite;


    bookForm.dataset.editingId =
        book.id;


    bookFormOverlay.classList.add(
        "active"
    );


    if (fileName) {

        fileName.textContent =
            "Conservar portada actual";

    }

}

function deleteBook(bookId) {

    const books =
        JSON.parse(
            localStorage.getItem(
                "privateAtlasBooks"
            )
        ) || [];


    const updatedBooks =
        books.filter(
            book =>
                book.id != bookId
        );


    localStorage.setItem(
        "privateAtlasBooks",
        JSON.stringify(updatedBooks)
    );


    loadBooks();

}

const closeBookDetails =
    document.getElementById(
        "closeBookDetails"
    );


const bookDetailsOverlay =
    document.getElementById(
        "bookDetailsOverlay"
    );


if (closeBookDetails) {

    closeBookDetails.addEventListener(
        "click",
        () => {

            if (bookDetailsOverlay) {

                bookDetailsOverlay.classList.remove(
                    "active"
                );

            }

        }
    );

}

if (bookDetailsOverlay) {

    bookDetailsOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                bookDetailsOverlay
            ) {

                bookDetailsOverlay.classList.remove(
                    "active"
                );

            }

        }
    );

}

if (bookForm) {

    bookForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const title =
                document
                    .getElementById(
                        "bookTitle"
                    )
                    .value
                    .trim();


            const author =
                document
                    .getElementById(
                        "bookAuthor"
                    )
                    .value
                    .trim();


            const genre =
                document
                    .getElementById(
                        "bookGenre"
                    )
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
                    .getElementById(
                        "bookReview"
                    )
                    .value
                    .trim();


            const favorite =
                document
                    .getElementById(
                        "bookFavorite"
                    )
                    .checked;


            const editingId =
                bookForm.dataset.editingId;


            const books =
                JSON.parse(
                    localStorage.getItem(
                        "privateAtlasBooks"
                    )
                ) || [];

            if (editingId) {

                const bookIndex =
                    books.findIndex(
                        book =>
                            String(book.id) ===
                            String(editingId)
                    );


                if (bookIndex !== -1) {

                    const oldBook =
                        books[bookIndex];


                    let cover =
                        oldBook.cover;


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


                    books[bookIndex] = {

                        ...oldBook,

                        title:
                            title,

                        author:
                            author,

                        genre:
                            genre,

                        cover:
                            cover,

                        expectations:
                            expectations,

                        review:
                            review,

                        favorite:
                            favorite

                    };

                }

            }

            else {

                let cover;


                if (
                    coverInput &&
                    coverInput.files &&
                    coverInput.files.length > 0
                ) {

                    cover =
                        URL.createObjectURL(
                            coverInput.files[0]
                        );

                } else {

                    cover =
                        getRandomCover(
                            genre
                        );

                }


                const newBook = {

                    id:
                        Date.now(),

                    title:
                        title,

                    author:
                        author,

                    genre:
                        genre,

                    cover:
                        cover,

                    expectations:
                        expectations,

                    review:
                        review,

                    favorite:
                        favorite,

                    dateAdded:
                        new Date().toISOString()

                };


                books.push(
                    newBook
                );

            }

            localStorage.setItem(
                "privateAtlasBooks",
                JSON.stringify(books)
            );

            bookForm.reset();


            delete bookForm.dataset.editingId;


            if (fileName) {

                fileName.textContent =
                    "Seleccionar portada";

            }

            loadBooks();


            closeBookFormWindow();

        }
    );

}


loadBooks();


if (typeof lucide !== "undefined") {

    lucide.createIcons();

}