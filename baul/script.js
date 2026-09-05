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
    content.style.display = "flex";

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
        document.querySelector(".content-window.active");

    if (activeWindow) {
        activeWindow.classList.remove("active");

        setTimeout(() => {
            activeWindow.style.display = "none";
        }, 300);
    }

    setTimeout(() => {
        overlay.classList.remove("active");
    }, 300);
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

const coverInput =
    document.getElementById("bookCover");

const fileName =
    document.getElementById("fileName");

if (openAddBook) {
    openAddBook.addEventListener("click", () => {
        if (bookForm) {
            bookForm.reset();
            delete bookForm.dataset.editingId;
            delete bookForm.dataset.currentCover;
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

if (coverInput) {
    coverInput.addEventListener("change", () => {
        if (
            coverInput.files &&
            coverInput.files.length > 0
        ) {
            if (fileName) {
                fileName.textContent =
                    coverInput.files[0].name;
            }
        } else {
            if (fileName) {
                fileName.textContent =
                    "Conservar portada actual";
            }
        }
    });
}

const genericCovers = {
    "Aventura": [
        "assets/portadas/Aventura/P1.png",
        "assets/portadas/Aventura/P2.png",
        "assets/portadas/Aventura/P3.png",
        "assets/portadas/Aventura/P4.png",
        "assets/portadas/Aventura/P5.png",
        "assets/portadas/Aventura/P6.png"
    ],

    "Ciencia ficción": [
        "assets/portadas/Ciencia-Ficcion/P1.png",
        "assets/portadas/Ciencia-Ficcion/P2.png",
        "assets/portadas/Ciencia-Ficcion/P3.png",
        "assets/portadas/Ciencia-Ficcion/P4.png",
        "assets/portadas/Ciencia-Ficcion/P5.png",
        "assets/portadas/Ciencia-Ficcion/P6.png"
    ],

    "Dark Romance": [
        "assets/portadas/Dark-Romance/P1.png",
        "assets/portadas/Dark-Romance/P2.png",
        "assets/portadas/Dark-Romance/P3.png",
        "assets/portadas/Dark-Romance/P4.png",
        "assets/portadas/Dark-Romance/P5.png",
        "assets/portadas/Dark-Romance/P6.png"
    ],

    "Distopía": [
        "assets/portadas/Distopía/P1.png",
        "assets/portadas/Distopía/P2.png",
        "assets/portadas/Distopía/P3.png",
        "assets/portadas/Distopía/P4.png",
        "assets/portadas/Distopía/P5.png",
        "assets/portadas/Distopía/P6.png"
    ],

    "Fantasía": [
        "assets/portadas/Fantasia/P1.png",
        "assets/portadas/Fantasia/P2.png",
        "assets/portadas/Fantasia/P3.png",
        "assets/portadas/Fantasia/P4.png",
        "assets/portadas/Fantasia/P5.png",
        "assets/portadas/Fantasia/P6.png"
    ],

    "Histórico": [
        "assets/portadas/Historico/P1.png",
        "assets/portadas/Historico/P2.png",
        "assets/portadas/Historico/P3.png",
        "assets/portadas/Historico/P4.png",
        "assets/portadas/Historico/P5.png",
        "assets/portadas/Historico/P6.png"
    ],

    "Misterio": [
        "assets/portadas/Misterio/P1.png",
        "assets/portadas/Misterio/P2.png",
        "assets/portadas/Misterio/P3.png",
        "assets/portadas/Misterio/P4.png",
        "assets/portadas/Misterio/P5.png",
        "assets/portadas/Misterio/P6.png"
    ],

    "Romance": [
        "assets/portadas/Romance/P1.png",
        "assets/portadas/Romance/P2.png",
        "assets/portadas/Romance/P3.png",
        "assets/portadas/Romance/P4.png",
        "assets/portadas/Romance/P5.png",
        "assets/portadas/Romance/P6.png"
    ],

    "Policial": [
        "assets/portadas/Policial/P1.png",
        "assets/portadas/Policial/P2.png",
        "assets/portadas/Policial/P3.png",
        "assets/portadas/Policial/P4.png",
        "assets/portadas/Policial/P5.png",
        "assets/portadas/Policial/P6.png"
    ],

    "Suspenso": [
        "assets/portadas/Suspenso/P1.png",
        "assets/portadas/Suspenso/P2.png",
        "assets/portadas/Suspenso/P3.png",
        "assets/portadas/Suspenso/P4.png",
        "assets/portadas/Suspenso/P5.png",
        "assets/portadas/Suspenso/P6.png"
    ],

    "Terror": [
        "assets/portadas/Terror/P1.png",
        "assets/portadas/Terror/P2.png",
        "assets/portadas/Terror/P3.png",
        "assets/portadas/Terror/P4.png",
        "assets/portadas/Terror/P5.png",
        "assets/portadas/Terror/P6.png"
    ],

    "Thriller": [
        "assets/portadas/Thriller/P1.png",
        "assets/portadas/Thriller/P2.png",
        "assets/portadas/Thriller/P3.png",
        "assets/portadas/Thriller/P4.png",
        "assets/portadas/Thriller/P5.png",
        "assets/portadas/Thriller/P6.png"
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

const genericCover =
    "assets/portadas/Comodines/P1.png";

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

function isGenericCover(book) {
    if (!book || !book.cover) {
        return false;
    }

    if (book.customCover === true) {
        return false;
    }

    return book.cover.startsWith(
        "assets/portadas/"
    );
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

    const generic =
        isGenericCover(book);

    if (!generic) {
        card.classList.add("custom-cover");
    }

    card.innerHTML = `
        <div class="book-cover-wrapper">

            <img
                src="${escapeHTML(book.cover)}"
                alt="Portada de ${escapeHTML(book.title)}">

            ${
                generic
                    ? `
                        <div class="book-card-info">

                            <h3>
                                ${escapeHTML(book.title)}
                            </h3>

                            <p class="book-author">
                                Por ${escapeHTML(book.author)}
                            </p>

                        </div>
                    `
                    : ""
            }

        </div>

        <div class="book-card-bottom">

            <div class="book-card-meta">

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

            </div>

            <div class="book-card-buttons">

                <button
                    class="view-book-btn"
                    type="button">

                    <i data-lucide="eye"></i>

                    Ver libro

                </button>

                <button
                    class="edit-book-btn"
                    type="button">

                    <i data-lucide="pencil"></i>

                    Editar

                </button>

                <button
                    class="delete-book-btn"
                    type="button">

                    <i data-lucide="trash-2"></i>

                    Eliminar

                </button>

            </div>

        </div>
    `;

    booksGrid.appendChild(card);

    const viewButton =
        card.querySelector(".view-book-btn");

    const editButton =
        card.querySelector(".edit-book-btn");

    const deleteButton =
        card.querySelector(".delete-book-btn");

    if (viewButton) {
        viewButton.addEventListener("click", () => {
            showBookDetails(book);
        });
    }

    if (editButton) {
        editButton.addEventListener("click", () => {
            editBook(book);
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener("click", () => {
            deleteBook(book.id);
        });
    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

function showBookDetails(book) {
    const detailsOverlay =
        document.getElementById(
            "bookDetailsOverlay"
        );

    const detailsWindow =
        document.querySelector(
            ".book-details-window"
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

    const generic =
        isGenericCover(book);

    if (detailsWindow) {
        detailsWindow.classList.remove(
            "custom-cover",
            "generic-cover"
        );

        if (generic) {
            detailsWindow.classList.add(
                "generic-cover"
            );
        } else {
            detailsWindow.classList.add(
                "custom-cover"
            );
        }
    }

    if (detailsCover) {
        detailsCover.src =
            book.cover;

        detailsCover.alt =
            `Portada de ${book.title || "libro"}`;
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

    const titleInput =
        document.getElementById("bookTitle");

    const authorInput =
        document.getElementById("bookAuthor");

    const genreInput =
        document.getElementById("bookGenre");

    const expectationsInput =
        document.getElementById("bookExpectations");

    const reviewInput =
        document.getElementById("bookReview");

    const favoriteInput =
        document.getElementById("bookFavorite");

    if (titleInput) {
        titleInput.value =
            book.title || "";
    }

    if (authorInput) {
        authorInput.value =
            book.author || "";
    }

    if (genreInput) {
        genreInput.value =
            book.genre || "";
    }

    if (expectationsInput) {
        expectationsInput.value =
            book.expectations || "";
    }

    if (reviewInput) {
        reviewInput.value =
            book.review || "";
    }

    if (favoriteInput) {
        favoriteInput.checked =
            !!book.favorite;
    }

    bookForm.dataset.editingId =
        book.id;

    bookForm.dataset.currentCover =
        book.cover || "";

    bookFormOverlay.classList.add(
        "active"
    );

    if (fileName) {
        fileName.textContent =
            "Conservar portada actual";
    }

    if (coverInput) {
        coverInput.value = "";
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
                String(book.id) !==
                String(bookId)
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

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader =
            new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsDataURL(file);
    });
}

if (bookForm) {
    bookForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const titleInput =
                document.getElementById(
                    "bookTitle"
                );

            const authorInput =
                document.getElementById(
                    "bookAuthor"
                );

            const genreInput =
                document.getElementById(
                    "bookGenre"
                );

            const expectationsInput =
                document.getElementById(
                    "bookExpectations"
                );

            const reviewInput =
                document.getElementById(
                    "bookReview"
                );

            const favoriteInput =
                document.getElementById(
                    "bookFavorite"
                );

            const title =
                titleInput
                    ? titleInput.value.trim()
                    : "";

            const author =
                authorInput
                    ? authorInput.value.trim()
                    : "";

            const genre =
                genreInput
                    ? genreInput.value
                    : "";

            const expectations =
                expectationsInput
                    ? expectationsInput.value.trim()
                    : "";

            const review =
                reviewInput
                    ? reviewInput.value.trim()
                    : "";

            const favorite =
                favoriteInput
                    ? favoriteInput.checked
                    : false;

            const editingId =
                bookForm.dataset.editingId;

            const books =
                JSON.parse(
                    localStorage.getItem(
                        "privateAtlasBooks"
                    )
                ) || [];

            let selectedCover = null;

            if (
                coverInput &&
                coverInput.files &&
                coverInput.files.length > 0
            ) {
                selectedCover =
                    await readFileAsDataURL(
                        coverInput.files[0]
                    );
            }

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

                    let customCover =
                        oldBook.customCover === true;

                    if (selectedCover) {
                        cover =
                            selectedCover;

                        customCover =
                            true;
                    }

                    books[bookIndex] = {
                        ...oldBook,
                        title,
                        author,
                        genre,
                        cover,
                        customCover,
                        expectations,
                        review,
                        favorite
                    };
                }

            } else {

                let cover;
                let customCover =
                    false;

                if (selectedCover) {

                    cover =
                        selectedCover;

                    customCover =
                        true;

                } else {

                    cover =
                        getRandomCover(
                            genre
                        );
                }

                const newBook = {
                    id:
                        Date.now(),
                    title,
                    author,
                    genre,
                    cover,
                    customCover,
                    expectations,
                    review,
                    favorite,
                    dateAdded:
                        new Date().toISOString()
                };

                books.push(
                    newBook
                );
            }

            try {

                localStorage.setItem(
                    "privateAtlasBooks",
                    JSON.stringify(books)
                );

            } catch (error) {

                alert(
                    "La imagen es demasiado grande para guardarla. Prueba con una imagen más pequeña."
                );

                return;
            }

            bookForm.reset();

            delete bookForm.dataset.editingId;
            delete bookForm.dataset.currentCover;

            if (fileName) {
                fileName.textContent =
                    "Seleccionar portada";
            }

            loadBooks();

            closeBookFormWindow();
        }
    );
}

function createAmbientParticles() {
    const ash =
        document.querySelector(".ash-particles");

    const embers =
        document.querySelector(".embers");

    const flames =
        document.querySelector(".flames");

    if (ash && ash.children.length === 0) {
        for (let i = 0; i < 10; i++) {
            const particle =
                document.createElement("span");

            ash.appendChild(
                particle
            );
        }
    }

    if (embers && embers.children.length === 0) {
        for (let i = 0; i < 6; i++) {
            const ember =
                document.createElement("span");

            embers.appendChild(
                ember
            );
        }
    }

    if (flames && flames.children.length === 0) {
        for (let i = 0; i < 3; i++) {
            const flame =
                document.createElement("span");

            flames.appendChild(
                flame
            );
        }
    }
}

function restartLavaAnimation() {
    const lavaTransition =
        document.querySelector(
            ".lava-transition"
        );

    const lavaBody =
        document.querySelector(
            ".lava-body"
        );

    if (!lavaTransition || !lavaBody) {
        return;
    }

    lavaTransition.style.animation =
        "none";

    lavaBody.style.animation =
        "none";

    void lavaTransition.offsetWidth;

    lavaTransition.style.animation =
        "";

    lavaBody.style.animation =
        "";
}

createAmbientParticles();

loadBooks();

restartLavaAnimation();

if (typeof lucide !== "undefined") {
    lucide.createIcons();
}

const openAddRecipe =
    document.getElementById("openAddRecipe");

const closeRecipeForm =
    document.getElementById("closeRecipeClose");

const cancelRecipe =
    document.getElementById("cancelRecipe");

const recipeFormOverlay =
    document.getElementById("recipeFormOverlay");

const recipeForm =
    document.getElementById("recipeForm");

const recipesGrid =
    document.getElementById("recipesGrid");

const emptyRecipes =
    document.getElementById("emptyRecipes");

const ingredientsList =
    document.getElementById("ingredientsList");

const addIngredient =
    document.getElementById("addIngredient");

const recipeDetailsOverlay =
    document.getElementById("recipeDetailsOverlay");

const closeRecipeDetails =
    document.getElementById("closeRecipeDetailsClose");

function addIngredientRow(value = "") {

    if (!ingredientsList) {
        return;
    }

    const row =
        document.createElement("div");

    row.className =
        "ingredient-row";

    row.innerHTML = `
        <input
            type="text"
            class="recipe-ingredient"
            placeholder="Ejemplo: 2 huevos"
            value="${escapeHTML(value)}"
            required>

        <button
            type="button"
            class="remove-ingredient-btn"
            aria-label="Eliminar ingrediente">

            <i data-lucide="trash-2"></i>

        </button>
    `;

    ingredientsList.appendChild(row);

    const removeButton =
        row.querySelector(
            ".remove-ingredient-btn"
        );

    if (removeButton) {
        removeButton.addEventListener(
            "click",
            () => {

                if (
                    ingredientsList.children.length > 1
                ) {
                    row.remove();
                }

            }
        );
    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

if (ingredientsList) {

    ingredientsList.addEventListener(
        "click",
        event => {

            const removeButton =
                event.target.closest(
                    ".remove-ingredient-btn"
                );

            if (removeButton) {

                const row =
                    removeButton.closest(
                        ".ingredient-row"
                    );

                if (
                    row &&
                    ingredientsList.children.length > 1
                ) {
                    row.remove();
                }
            }
        }
    );
}

if (addIngredient) {

    addIngredient.addEventListener(
        "click",
        () => {
            addIngredientRow();
        }
    );
}

if (openAddRecipe) {

    openAddRecipe.addEventListener(
        "click",
        () => {

            if (recipeForm) {
                recipeForm.reset();
                delete recipeForm.dataset.editingId;
            }

            if (ingredientsList) {
                ingredientsList.innerHTML = "";
                addIngredientRow();
            }

            if (recipeFormOverlay) {
                recipeFormOverlay.classList.add(
                    "active"
                );
            }

        }
    );
}

function closeRecipeFormWindow() {

    if (recipeFormOverlay) {
        recipeFormOverlay.classList.remove(
            "active"
        );
    }
}

if (closeRecipeForm) {

    closeRecipeForm.addEventListener(
        "click",
        closeRecipeFormWindow
    );
}

if (cancelRecipe) {

    cancelRecipe.addEventListener(
        "click",
        closeRecipeFormWindow
    );
}

if (recipeFormOverlay) {

    recipeFormOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                recipeFormOverlay
            ) {
                closeRecipeFormWindow();
            }

        }
    );
}

function loadRecipes() {

    if (!recipesGrid) {
        return;
    }

    recipesGrid.innerHTML = "";

    const recipes =
        JSON.parse(
            localStorage.getItem(
                "privateAtlasRecipes"
            )
        ) || [];

    if (recipes.length === 0) {

        if (emptyRecipes) {
            emptyRecipes.style.display =
                "flex";
        }

        return;
    }

    if (emptyRecipes) {
        emptyRecipes.style.display =
            "none";
    }

    recipes.forEach(recipe => {
        createRecipeCard(recipe);
    });

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

function createRecipeCard(recipe) {

    const card =
        document.createElement("article");

    card.className =
        "recipe-card";

    card.innerHTML = `

        <div class="recipe-card-icon">

            <i data-lucide="chef-hat"></i>

        </div>

        <div class="recipe-card-info">

            <h3>
                ${escapeHTML(recipe.name)}
            </h3>

            <span class="recipe-category">
                ${escapeHTML(recipe.category)}
            </span>

        </div>

        <div class="recipe-card-meta">

            <span>

                <i data-lucide="clock"></i>

                ${escapeHTML(recipe.time)}

            </span>

            <span>

                <i data-lucide="users"></i>

                ${recipe.servings} porciones

            </span>

        </div>

        ${
            recipe.favorite
                ? `
                    <div class="recipe-card-favorite">

                        <i data-lucide="star"></i>

                        Favorita

                    </div>
                `
                : ""
        }

        <div class="recipe-card-buttons">

            <button
                type="button"
                class="view-recipe-btn">

                <i data-lucide="eye"></i>

                Ver receta

            </button>

            <button
                type="button"
                class="edit-recipe-btn">

                <i data-lucide="pencil"></i>

                Editar

            </button>

            <button
                type="button"
                class="delete-recipe-btn">

                <i data-lucide="trash-2"></i>

                Eliminar

            </button>

        </div>
    `;

    recipesGrid.appendChild(card);

    const viewButton =
        card.querySelector(
            ".view-recipe-btn"
        );

    const editButton =
        card.querySelector(
            ".edit-recipe-btn"
        );

    const deleteButton =
        card.querySelector(
            ".delete-recipe-btn"
        );

    if (viewButton) {
        viewButton.addEventListener(
            "click",
            () => {
                showRecipeDetails(recipe);
            }
        );
    }

    if (editButton) {
        editButton.addEventListener(
            "click",
            () => {
                editRecipe(recipe);
            }
        );
    }

    if (deleteButton) {
        deleteButton.addEventListener(
            "click",
            () => {
                deleteRecipe(recipe.id);
            }
        );
    }
}

if (recipeForm) {

    recipeForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                document
                    .getElementById(
                        "recipeName"
                    )
                    .value
                    .trim();

            const category =
                document
                    .getElementById(
                        "recipeCategory"
                    )
                    .value;

            const preparation =
                document
                    .getElementById(
                        "recipePreparation"
                    )
                    .value
                    .trim();

            const time =
                document
                    .getElementById(
                        "recipeTime"
                    )
                    .value
                    .trim();

            const servings =
                Number(
                    document
                        .getElementById(
                            "recipeServings"
                        )
                        .value
                );

            const favorite =
                document
                    .getElementById(
                        "recipeFavorite"
                    )
                    .checked;

            const ingredients =
                Array.from(
                    document.querySelectorAll(
                        ".recipe-ingredient"
                    )
                )
                .map(
                    input =>
                        input.value.trim()
                )
                .filter(
                    ingredient =>
                        ingredient !== ""
                );

            if (ingredients.length === 0) {
                return;
            }

            const recipes =
                JSON.parse(
                    localStorage.getItem(
                        "privateAtlasRecipes"
                    )
                ) || [];

            const editingId =
                recipeForm.dataset.editingId;

            if (editingId) {

                const index =
                    recipes.findIndex(
                        recipe =>
                            recipe.id ==
                            editingId
                    );

                if (index !== -1) {

                    recipes[index] = {
                        ...recipes[index],
                        name,
                        category,
                        ingredients,
                        preparation,
                        time,
                        servings,
                        favorite
                    };
                }

            } else {

                recipes.push({
                    id:
                        Date.now(),
                    name,
                    category,
                    ingredients,
                    preparation,
                    time,
                    servings,
                    favorite
                });
            }

            localStorage.setItem(
                "privateAtlasRecipes",
                JSON.stringify(recipes)
            );

            loadRecipes();

            closeRecipeFormWindow();
        }
    );
}

function editRecipe(recipe) {

    if (
        !recipeForm ||
        !recipeFormOverlay
    ) {
        return;
    }

    document.getElementById(
        "recipeName"
    ).value =
        recipe.name || "";

    document.getElementById(
        "recipeCategory"
    ).value =
        recipe.category || "";

    document.getElementById(
        "recipePreparation"
    ).value =
        recipe.preparation || "";

    document.getElementById(
        "recipeTime"
    ).value =
        recipe.time || "";

    document.getElementById(
        "recipeServings"
    ).value =
        recipe.servings || "";

    document.getElementById(
        "recipeFavorite"
    ).checked =
        !!recipe.favorite;

    recipeForm.dataset.editingId =
        recipe.id;

    ingredientsList.innerHTML = "";

    const recipeIngredients =
        Array.isArray(recipe.ingredients)
            ? recipe.ingredients
            : [""];

    recipeIngredients.forEach(
        ingredient => {
            addIngredientRow(
                ingredient
            );
        }
    );

    recipeFormOverlay.classList.add(
        "active"
    );
}

function deleteRecipe(recipeId) {

    const recipes =
        JSON.parse(
            localStorage.getItem(
                "privateAtlasRecipes"
            )
        ) || [];

    const updatedRecipes =
        recipes.filter(
            recipe =>
                recipe.id != recipeId
        );

    localStorage.setItem(
        "privateAtlasRecipes",
        JSON.stringify(updatedRecipes)
    );

    loadRecipes();
}

function showRecipeDetails(recipe) {

    const name =
        document.getElementById(
            "detailsRecipeName"
        );

    const category =
        document.getElementById(
            "detailsRecipeCategory"
        );

    const time =
        document.getElementById(
            "detailsRecipeTime"
        );

    const servings =
        document.getElementById(
            "detailsRecipeServings"
        );

    const ingredients =
        document.getElementById(
            "detailsRecipeIngredients"
        );

    const preparation =
        document.getElementById(
            "detailsRecipePreparation"
        );

    const favorite =
        document.getElementById(
            "detailsRecipeFavorite"
        );

    if (!recipeDetailsOverlay) {
        return;
    }

    name.textContent =
        recipe.name || "";

    category.textContent =
        recipe.category || "";

    time.textContent =
        recipe.time || "";

    servings.textContent =
        `${recipe.servings} porciones`;

    ingredients.innerHTML = "";

    const recipeIngredients =
        Array.isArray(recipe.ingredients)
            ? recipe.ingredients
            : [];

    recipeIngredients.forEach(
        ingredient => {

            const li =
                document.createElement("li");

            li.textContent =
                ingredient;

            ingredients.appendChild(li);
        }
    );

    preparation.textContent =
        recipe.preparation || "";

    favorite.style.display =
        recipe.favorite
            ? "flex"
            : "none";

    recipeDetailsOverlay.classList.add(
        "active"
    );

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

if (closeRecipeDetails) {

    closeRecipeDetails.addEventListener(
        "click",
        () => {

            if (recipeDetailsOverlay) {
                recipeDetailsOverlay.classList.remove(
                    "active"
                );
            }

        }
    );
}

if (recipeDetailsOverlay) {

    recipeDetailsOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                recipeDetailsOverlay
            ) {

                recipeDetailsOverlay.classList.remove(
                    "active"
                );
            }

        }
    );
}
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
    content.style.display = "flex";

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
        document.querySelector(".content-window.active");

    if (activeWindow) {
        activeWindow.classList.remove("active");

        setTimeout(() => {
            activeWindow.style.display = "none";
        }, 300);
    }

    setTimeout(() => {
        overlay.classList.remove("active");
    }, 300);
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

const coverInput =
    document.getElementById("bookCover");

const fileName =
    document.getElementById("fileName");

if (openAddBook) {
    openAddBook.addEventListener("click", () => {
        if (bookForm) {
            bookForm.reset();
            delete bookForm.dataset.editingId;
            delete bookForm.dataset.currentCover;
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

if (coverInput) {
    coverInput.addEventListener("change", () => {
        if (
            coverInput.files &&
            coverInput.files.length > 0
        ) {
            if (fileName) {
                fileName.textContent =
                    coverInput.files[0].name;
            }
        } else {
            if (fileName) {
                fileName.textContent =
                    "Conservar portada actual";
            }
        }
    });
}

const genericCovers = {
    "Aventura": [
        "assets/portadas/Aventura/P1.png",
        "assets/portadas/Aventura/P2.png",
        "assets/portadas/Aventura/P3.png",
        "assets/portadas/Aventura/P4.png",
        "assets/portadas/Aventura/P5.png",
        "assets/portadas/Aventura/P6.png"
    ],

    "Ciencia ficción": [
        "assets/portadas/Ciencia-Ficcion/P1.png",
        "assets/portadas/Ciencia-Ficcion/P2.png",
        "assets/portadas/Ciencia-Ficcion/P3.png",
        "assets/portadas/Ciencia-Ficcion/P4.png",
        "assets/portadas/Ciencia-Ficcion/P5.png",
        "assets/portadas/Ciencia-Ficcion/P6.png"
    ],

    "Dark Romance": [
        "assets/portadas/Dark-Romance/P1.png",
        "assets/portadas/Dark-Romance/P2.png",
        "assets/portadas/Dark-Romance/P3.png",
        "assets/portadas/Dark-Romance/P4.png",
        "assets/portadas/Dark-Romance/P5.png",
        "assets/portadas/Dark-Romance/P6.png"
    ],

    "Distopía": [
        "assets/portadas/Distopía/P1.png",
        "assets/portadas/Distopía/P2.png",
        "assets/portadas/Distopía/P3.png",
        "assets/portadas/Distopía/P4.png",
        "assets/portadas/Distopía/P5.png",
        "assets/portadas/Distopía/P6.png"
    ],

    "Fantasía": [
        "assets/portadas/Fantasia/P1.png",
        "assets/portadas/Fantasia/P2.png",
        "assets/portadas/Fantasia/P3.png",
        "assets/portadas/Fantasia/P4.png",
        "assets/portadas/Fantasia/P5.png",
        "assets/portadas/Fantasia/P6.png"
    ],

    "Histórico": [
        "assets/portadas/Historico/P1.png",
        "assets/portadas/Historico/P2.png",
        "assets/portadas/Historico/P3.png",
        "assets/portadas/Historico/P4.png",
        "assets/portadas/Historico/P5.png",
        "assets/portadas/Historico/P6.png"
    ],

    "Misterio": [
        "assets/portadas/Misterio/P1.png",
        "assets/portadas/Misterio/P2.png",
        "assets/portadas/Misterio/P3.png",
        "assets/portadas/Misterio/P4.png",
        "assets/portadas/Misterio/P5.png",
        "assets/portadas/Misterio/P6.png"
    ],

    "Romance": [
        "assets/portadas/Romance/P1.png",
        "assets/portadas/Romance/P2.png",
        "assets/portadas/Romance/P3.png",
        "assets/portadas/Romance/P4.png",
        "assets/portadas/Romance/P5.png",
        "assets/portadas/Romance/P6.png"
    ],

    "Policial": [
        "assets/portadas/Policial/P1.png",
        "assets/portadas/Policial/P2.png",
        "assets/portadas/Policial/P3.png",
        "assets/portadas/Policial/P4.png",
        "assets/portadas/Policial/P5.png",
        "assets/portadas/Policial/P6.png"
    ],

    "Suspenso": [
        "assets/portadas/Suspenso/P1.png",
        "assets/portadas/Suspenso/P2.png",
        "assets/portadas/Suspenso/P3.png",
        "assets/portadas/Suspenso/P4.png",
        "assets/portadas/Suspenso/P5.png",
        "assets/portadas/Suspenso/P6.png"
    ],

    "Terror": [
        "assets/portadas/Terror/P1.png",
        "assets/portadas/Terror/P2.png",
        "assets/portadas/Terror/P3.png",
        "assets/portadas/Terror/P4.png",
        "assets/portadas/Terror/P5.png",
        "assets/portadas/Terror/P6.png"
    ],

    "Thriller": [
        "assets/portadas/Thriller/P1.png",
        "assets/portadas/Thriller/P2.png",
        "assets/portadas/Thriller/P3.png",
        "assets/portadas/Thriller/P4.png",
        "assets/portadas/Thriller/P5.png",
        "assets/portadas/Thriller/P6.png"
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

const genericCover =
    "assets/portadas/Comodines/P1.png";

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

function isGenericCover(book) {
    if (!book || !book.cover) {
        return false;
    }

    if (book.customCover === true) {
        return false;
    }

    return book.cover.startsWith(
        "assets/portadas/"
    );
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

    const generic =
        isGenericCover(book);

    if (!generic) {
        card.classList.add("custom-cover");
    }

    card.innerHTML = `
        <div class="book-cover-wrapper">

            <img
                src="${escapeHTML(book.cover)}"
                alt="Portada de ${escapeHTML(book.title)}">

            ${
                generic
                    ? `
                        <div class="book-card-info">

                            <h3>
                                ${escapeHTML(book.title)}
                            </h3>

                            <p class="book-author">
                                Por ${escapeHTML(book.author)}
                            </p>

                        </div>
                    `
                    : ""
            }

        </div>

        <div class="book-card-bottom">

            <div class="book-card-meta">

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

            </div>

            <div class="book-card-buttons">

                <button
                    class="view-book-btn"
                    type="button">

                    <i data-lucide="eye"></i>

                    Ver libro

                </button>

                <button
                    class="edit-book-btn"
                    type="button">

                    <i data-lucide="pencil"></i>

                    Editar

                </button>

                <button
                    class="delete-book-btn"
                    type="button">

                    <i data-lucide="trash-2"></i>

                    Eliminar

                </button>

            </div>

        </div>
    `;

    booksGrid.appendChild(card);

    const viewButton =
        card.querySelector(".view-book-btn");

    const editButton =
        card.querySelector(".edit-book-btn");

    const deleteButton =
        card.querySelector(".delete-book-btn");

    if (viewButton) {
        viewButton.addEventListener("click", () => {
            showBookDetails(book);
        });
    }

    if (editButton) {
        editButton.addEventListener("click", () => {
            editBook(book);
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener("click", () => {
            deleteBook(book.id);
        });
    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

function showBookDetails(book) {
    const detailsOverlay =
        document.getElementById(
            "bookDetailsOverlay"
        );

    const detailsWindow =
        document.querySelector(
            ".book-details-window"
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

    const generic =
        isGenericCover(book);

    if (detailsWindow) {
        detailsWindow.classList.remove(
            "custom-cover",
            "generic-cover"
        );

        if (generic) {
            detailsWindow.classList.add(
                "generic-cover"
            );
        } else {
            detailsWindow.classList.add(
                "custom-cover"
            );
        }
    }

    if (detailsCover) {
        detailsCover.src =
            book.cover;

        detailsCover.alt =
            `Portada de ${book.title || "libro"}`;
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

    const titleInput =
        document.getElementById("bookTitle");

    const authorInput =
        document.getElementById("bookAuthor");

    const genreInput =
        document.getElementById("bookGenre");

    const expectationsInput =
        document.getElementById("bookExpectations");

    const reviewInput =
        document.getElementById("bookReview");

    const favoriteInput =
        document.getElementById("bookFavorite");

    if (titleInput) {
        titleInput.value =
            book.title || "";
    }

    if (authorInput) {
        authorInput.value =
            book.author || "";
    }

    if (genreInput) {
        genreInput.value =
            book.genre || "";
    }

    if (expectationsInput) {
        expectationsInput.value =
            book.expectations || "";
    }

    if (reviewInput) {
        reviewInput.value =
            book.review || "";
    }

    if (favoriteInput) {
        favoriteInput.checked =
            !!book.favorite;
    }

    bookForm.dataset.editingId =
        book.id;

    bookForm.dataset.currentCover =
        book.cover || "";

    bookFormOverlay.classList.add(
        "active"
    );

    if (fileName) {
        fileName.textContent =
            "Conservar portada actual";
    }

    if (coverInput) {
        coverInput.value = "";
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
                String(book.id) !==
                String(bookId)
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

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader =
            new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsDataURL(file);
    });
}

if (bookForm) {
    bookForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const titleInput =
                document.getElementById(
                    "bookTitle"
                );

            const authorInput =
                document.getElementById(
                    "bookAuthor"
                );

            const genreInput =
                document.getElementById(
                    "bookGenre"
                );

            const expectationsInput =
                document.getElementById(
                    "bookExpectations"
                );

            const reviewInput =
                document.getElementById(
                    "bookReview"
                );

            const favoriteInput =
                document.getElementById(
                    "bookFavorite"
                );

            const title =
                titleInput
                    ? titleInput.value.trim()
                    : "";

            const author =
                authorInput
                    ? authorInput.value.trim()
                    : "";

            const genre =
                genreInput
                    ? genreInput.value
                    : "";

            const expectations =
                expectationsInput
                    ? expectationsInput.value.trim()
                    : "";

            const review =
                reviewInput
                    ? reviewInput.value.trim()
                    : "";

            const favorite =
                favoriteInput
                    ? favoriteInput.checked
                    : false;

            const editingId =
                bookForm.dataset.editingId;

            const books =
                JSON.parse(
                    localStorage.getItem(
                        "privateAtlasBooks"
                    )
                ) || [];

            let selectedCover = null;

            if (
                coverInput &&
                coverInput.files &&
                coverInput.files.length > 0
            ) {
                selectedCover =
                    await readFileAsDataURL(
                        coverInput.files[0]
                    );
            }

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

                    let customCover =
                        oldBook.customCover === true;

                    if (selectedCover) {
                        cover =
                            selectedCover;

                        customCover =
                            true;
                    }

                    books[bookIndex] = {
                        ...oldBook,
                        title,
                        author,
                        genre,
                        cover,
                        customCover,
                        expectations,
                        review,
                        favorite
                    };
                }

            } else {

                let cover;
                let customCover =
                    false;

                if (selectedCover) {

                    cover =
                        selectedCover;

                    customCover =
                        true;

                } else {

                    cover =
                        getRandomCover(
                            genre
                        );
                }

                const newBook = {
                    id:
                        Date.now(),
                    title,
                    author,
                    genre,
                    cover,
                    customCover,
                    expectations,
                    review,
                    favorite,
                    dateAdded:
                        new Date().toISOString()
                };

                books.push(
                    newBook
                );
            }

            try {

                localStorage.setItem(
                    "privateAtlasBooks",
                    JSON.stringify(books)
                );

            } catch (error) {

                alert(
                    "La imagen es demasiado grande para guardarla. Prueba con una imagen más pequeña."
                );

                return;
            }

            bookForm.reset();

            delete bookForm.dataset.editingId;
            delete bookForm.dataset.currentCover;

            if (fileName) {
                fileName.textContent =
                    "Seleccionar portada";
            }

            loadBooks();

            closeBookFormWindow();
        }
    );
}

function createAmbientParticles() {
    const ash =
        document.querySelector(".ash-particles");

    const embers =
        document.querySelector(".embers");

    const flames =
        document.querySelector(".flames");

    if (ash && ash.children.length === 0) {
        for (let i = 0; i < 10; i++) {
            const particle =
                document.createElement("span");

            ash.appendChild(
                particle
            );
        }
    }

    if (embers && embers.children.length === 0) {
        for (let i = 0; i < 6; i++) {
            const ember =
                document.createElement("span");

            embers.appendChild(
                ember
            );
        }
    }

    if (flames && flames.children.length === 0) {
        for (let i = 0; i < 3; i++) {
            const flame =
                document.createElement("span");

            flames.appendChild(
                flame
            );
        }
    }
}

function restartLavaAnimation() {
    const lavaTransition =
        document.querySelector(
            ".lava-transition"
        );

    const lavaBody =
        document.querySelector(
            ".lava-body"
        );

    if (!lavaTransition || !lavaBody) {
        return;
    }

    lavaTransition.style.animation =
        "none";

    lavaBody.style.animation =
        "none";

    void lavaTransition.offsetWidth;

    lavaTransition.style.animation =
        "";

    lavaBody.style.animation =
        "";
}

createAmbientParticles();

loadBooks();

restartLavaAnimation();

if (typeof lucide !== "undefined") {
    lucide.createIcons();
}

const openAddRecipe =
    document.getElementById("openAddRecipe");

const closeRecipeForm =
    document.getElementById("recipeFormClose");

const cancelRecipe =
    document.getElementById("cancelRecipe");

const recipeFormOverlay =
    document.getElementById("recipeFormOverlay");

const recipeForm =
    document.getElementById("recipeForm");

const recipesGrid =
    document.getElementById("recipesGrid");

const emptyRecipes =
    document.getElementById("emptyRecipes");

const ingredientsList =
    document.getElementById("ingredientsList");

const addIngredient =
    document.getElementById("addIngredient");

const recipeDetailsOverlay =
    document.getElementById("recipeDetailsOverlay");

const closeRecipeDetails =
    document.getElementById("recipeDetailsClose");

function addIngredientRow(value = "") {

    if (!ingredientsList) {
        return;
    }

    const row =
        document.createElement("div");

    row.className =
        "ingredient-row";

    row.innerHTML = `
        <input
            type="text"
            class="recipe-ingredient"
            placeholder="Ejemplo: 2 huevos"
            value="${escapeHTML(value)}"
            required>

        <button
            type="button"
            class="remove-ingredient-btn"
            aria-label="Eliminar ingrediente">

            <i data-lucide="trash-2"></i>

        </button>
    `;

    ingredientsList.appendChild(row);

    const removeButton =
        row.querySelector(
            ".remove-ingredient-btn"
        );

    if (removeButton) {
        removeButton.addEventListener(
            "click",
            () => {

                if (
                    ingredientsList.children.length > 1
                ) {
                    row.remove();
                }

            }
        );
    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

if (ingredientsList) {

    ingredientsList.addEventListener(
        "click",
        event => {

            const removeButton =
                event.target.closest(
                    ".remove-ingredient-btn"
                );

            if (removeButton) {

                const row =
                    removeButton.closest(
                        ".ingredient-row"
                    );

                if (
                    row &&
                    ingredientsList.children.length > 1
                ) {
                    row.remove();
                }
            }
        }
    );
}

if (addIngredient) {

    addIngredient.addEventListener(
        "click",
        () => {
            addIngredientRow();
        }
    );
}

if (openAddRecipe) {

    openAddRecipe.addEventListener(
        "click",
        () => {

            if (recipeForm) {
                recipeForm.reset();
                delete recipeForm.dataset.editingId;
            }

            if (ingredientsList) {
                ingredientsList.innerHTML = "";
                addIngredientRow();
            }

            if (recipeFormOverlay) {
                recipeFormOverlay.classList.add(
                    "active"
                );
            }

        }
    );
}

function closeRecipeFormWindow() {

    if (recipeFormOverlay) {
        recipeFormOverlay.classList.remove(
            "active"
        );
    }
}

if (closeRecipeForm) {

    closeRecipeForm.addEventListener(
        "click",
        closeRecipeFormWindow
    );
}

if (cancelRecipe) {

    cancelRecipe.addEventListener(
        "click",
        closeRecipeFormWindow
    );
}

if (recipeFormOverlay) {

    recipeFormOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                recipeFormOverlay
            ) {
                closeRecipeFormWindow();
            }

        }
    );
}

function loadRecipes() {

    if (!recipesGrid) {
        return;
    }

    recipesGrid.innerHTML = "";

    const recipes =
        JSON.parse(
            localStorage.getItem(
                "privateAtlasRecipes"
            )
        ) || [];

    if (recipes.length === 0) {

        if (emptyRecipes) {
            emptyRecipes.style.display =
                "flex";
        }

        return;
    }

    if (emptyRecipes) {
        emptyRecipes.style.display =
            "none";
    }

    recipes.forEach(recipe => {
        createRecipeCard(recipe);
    });

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

function createRecipeCard(recipe) {

    const card =
        document.createElement("article");

    card.className =
        "recipe-card";

    card.innerHTML = `

        <div class="recipe-card-icon">

            <i data-lucide="chef-hat"></i>

        </div>

        <div class="recipe-card-info">

            <h3>
                ${escapeHTML(recipe.name)}
            </h3>

            <span class="recipe-category">
                ${escapeHTML(recipe.category)}
            </span>

        </div>

        <div class="recipe-card-meta">

            <span>

                <i data-lucide="clock"></i>

                ${escapeHTML(recipe.time)}

            </span>

            <span>

                <i data-lucide="users"></i>

                ${recipe.servings} porciones

            </span>

        </div>

        ${
            recipe.favorite
                ? `
                    <div class="recipe-card-favorite">

                        <i data-lucide="star"></i>

                        Favorita

                    </div>
                `
                : ""
        }

        <div class="recipe-card-buttons">

            <button
                type="button"
                class="view-recipe-btn">

                <i data-lucide="eye"></i>

                Ver receta

            </button>

            <button
                type="button"
                class="edit-recipe-btn">

                <i data-lucide="pencil"></i>

                Editar

            </button>

            <button
                type="button"
                class="delete-recipe-btn">

                <i data-lucide="trash-2"></i>

                Eliminar

            </button>

        </div>
    `;

    recipesGrid.appendChild(card);

    const viewButton =
        card.querySelector(
            ".view-recipe-btn"
        );

    const editButton =
        card.querySelector(
            ".edit-recipe-btn"
        );

    const deleteButton =
        card.querySelector(
            ".delete-recipe-btn"
        );

    if (viewButton) {
        viewButton.addEventListener(
            "click",
            () => {
                showRecipeDetails(recipe);
            }
        );
    }

    if (editButton) {
        editButton.addEventListener(
            "click",
            () => {
                editRecipe(recipe);
            }
        );
    }

    if (deleteButton) {
        deleteButton.addEventListener(
            "click",
            () => {
                deleteRecipe(recipe.id);
            }
        );
    }
}

if (recipeForm) {

    recipeForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                document
                    .getElementById(
                        "recipeName"
                    )
                    .value
                    .trim();

            const category =
                document
                    .getElementById(
                        "recipeCategory"
                    )
                    .value;

            const preparation =
                document
                    .getElementById(
                        "recipePreparation"
                    )
                    .value
                    .trim();

            const time =
                document
                    .getElementById(
                        "recipeTime"
                    )
                    .value
                    .trim();

            const servings =
                Number(
                    document
                        .getElementById(
                            "recipeServings"
                        )
                        .value
                );

            const favorite =
                document
                    .getElementById(
                        "recipeFavorite"
                    )
                    .checked;

            const ingredients =
                Array.from(
                    document.querySelectorAll(
                        ".recipe-ingredient"
                    )
                )
                .map(
                    input =>
                        input.value.trim()
                )
                .filter(
                    ingredient =>
                        ingredient !== ""
                );

            if (ingredients.length === 0) {
                return;
            }

            const recipes =
                JSON.parse(
                    localStorage.getItem(
                        "privateAtlasRecipes"
                    )
                ) || [];

            const editingId =
                recipeForm.dataset.editingId;

            if (editingId) {

                const index =
                    recipes.findIndex(
                        recipe =>
                            recipe.id ==
                            editingId
                    );

                if (index !== -1) {

                    recipes[index] = {
                        ...recipes[index],
                        name,
                        category,
                        ingredients,
                        preparation,
                        time,
                        servings,
                        favorite
                    };
                }

            } else {

                recipes.push({
                    id:
                        Date.now(),
                    name,
                    category,
                    ingredients,
                    preparation,
                    time,
                    servings,
                    favorite
                });
            }

            localStorage.setItem(
                "privateAtlasRecipes",
                JSON.stringify(recipes)
            );

            loadRecipes();

            closeRecipeFormWindow();
        }
    );
}

function editRecipe(recipe) {

    if (
        !recipeForm ||
        !recipeFormOverlay
    ) {
        return;
    }

    document.getElementById(
        "recipeName"
    ).value =
        recipe.name || "";

    document.getElementById(
        "recipeCategory"
    ).value =
        recipe.category || "";

    document.getElementById(
        "recipePreparation"
    ).value =
        recipe.preparation || "";

    document.getElementById(
        "recipeTime"
    ).value =
        recipe.time || "";

    document.getElementById(
        "recipeServings"
    ).value =
        recipe.servings || "";

    document.getElementById(
        "recipeFavorite"
    ).checked =
        !!recipe.favorite;

    recipeForm.dataset.editingId =
        recipe.id;

    ingredientsList.innerHTML = "";

    const recipeIngredients =
        Array.isArray(recipe.ingredients)
            ? recipe.ingredients
            : [""];

    recipeIngredients.forEach(
        ingredient => {
            addIngredientRow(
                ingredient
            );
        }
    );

    recipeFormOverlay.classList.add(
        "active"
    );
}

function deleteRecipe(recipeId) {

    const recipes =
        JSON.parse(
            localStorage.getItem(
                "privateAtlasRecipes"
            )
        ) || [];

    const updatedRecipes =
        recipes.filter(
            recipe =>
                recipe.id != recipeId
        );

    localStorage.setItem(
        "privateAtlasRecipes",
        JSON.stringify(updatedRecipes)
    );

    loadRecipes();
}

function showRecipeDetails(recipe) {

    const name =
        document.getElementById(
            "detailsRecipeName"
        );

    const category =
        document.getElementById(
            "detailsRecipeCategory"
        );

    const time =
        document.getElementById(
            "detailsRecipeTime"
        );

    const servings =
        document.getElementById(
            "detailsRecipeServings"
        );

    const ingredients =
        document.getElementById(
            "detailsRecipeIngredients"
        );

    const preparation =
        document.getElementById(
            "detailsRecipePreparation"
        );

    const favorite =
        document.getElementById(
            "detailsRecipeFavorite"
        );

    if (!recipeDetailsOverlay) {
        return;
    }

    name.textContent =
        recipe.name || "";

    category.textContent =
        recipe.category || "";

    time.textContent =
        recipe.time || "";

    servings.textContent =
        `${recipe.servings} porciones`;

    ingredients.innerHTML = "";

    const recipeIngredients =
        Array.isArray(recipe.ingredients)
            ? recipe.ingredients
            : [];

    recipeIngredients.forEach(
        ingredient => {

            const li =
                document.createElement("li");

            li.textContent =
                ingredient;

            ingredients.appendChild(li);
        }
    );

    preparation.textContent =
        recipe.preparation || "";

    favorite.style.display =
        recipe.favorite
            ? "flex"
            : "none";

    recipeDetailsOverlay.classList.add(
        "active"
    );

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

if (closeRecipeDetails) {

    closeRecipeDetails.addEventListener(
        "click",
        () => {

            if (recipeDetailsOverlay) {
                recipeDetailsOverlay.classList.remove(
                    "active"
                );
            }

        }
    );
}

if (recipeDetailsOverlay) {

    recipeDetailsOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                recipeDetailsOverlay
            ) {

                recipeDetailsOverlay.classList.remove(
                    "active"
                );
            }

        }
    );
}

loadRecipes();
loadRecipes();