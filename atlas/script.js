const worldMap = document.getElementById("world-map");
const mapContainer = document.getElementById("map-container");

const selectedCountry = document.getElementById("selected-country");
const countryName = document.getElementById("country-name");
const countryMessage = document.getElementById("country-message");

const countryMemory = document.getElementById("country-memory");
const memoryCountryName = document.getElementById("memory-country-name");
const memoryCountryDescription =
    document.getElementById("memory-country-description");

const countryMemories = document.getElementById("country-memories");

const addMemoryBtn = document.getElementById("add-memory-btn");

const memoryFormContainer =
    document.getElementById("memory-form-container");

const memoryForm =
    document.getElementById("memory-form");

const closeMemory =
    document.getElementById("close-memory");

const closeMemoryForm =
    document.getElementById("close-memory-form");


// =========================================
// CONTROLES DE LAS VENTANAS
// =========================================

if (addMemoryBtn) {

    addMemoryBtn.addEventListener(
        "click",
        () => {

            editingMemoryId = null;

            memoryForm.reset();

            memoryFormContainer
                .classList
                .add("active");

            if (
                typeof lucide !== "undefined"
            ) {
                lucide.createIcons();
            }

        }
    );

}


if (closeMemory) {

    closeMemory.addEventListener(
        "click",
        () => {

            countryMemory
                .classList
                .remove("active");

        }
    );

}


if (closeMemoryForm) {

    closeMemoryForm.addEventListener(
        "click",
        () => {

            memoryFormContainer
                .classList
                .remove("active");

        }
    );

}
let selectedCountryCode = null;
let selectedCountryElement = null;


const backHome = document.querySelector(".back-home");

if (backHome) {
    backHome.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
}


let isDragging = false;

let startX = 0;
let startY = 0;

let mapX = 0;
let mapY = 0;

let scale = 1;

function updateMapTransform() {

    mapContainer.style.transform =
        `translate(${mapX}px, ${mapY}px) scale(${scale})`;
}


mapContainer.addEventListener("pointerdown", (event) => {

    isDragging = true;

    startX = event.clientX - mapX;
    startY = event.clientY - mapY;

    mapContainer.setPointerCapture(event.pointerId);
});


mapContainer.addEventListener("pointermove", (event) => {

    if (!isDragging) return;

    mapX = event.clientX - startX;
    mapY = event.clientY - startY;

    updateMapTransform();
});


mapContainer.addEventListener("pointerup", () => {

    isDragging = false;
});


mapContainer.addEventListener("pointercancel", () => {

    isDragging = false;
});


mapContainer.addEventListener("wheel", (event) => {

    event.preventDefault();

    const zoomSpeed = 0.1;

    if (event.deltaY < 0) {
        scale += zoomSpeed;
    } else {
        scale -= zoomSpeed;
    }

    scale = Math.max(0.6, Math.min(scale, 4));

    updateMapTransform();

}, { passive: false });



mapContainer.addEventListener("dblclick", () => {

    mapX = 0;
    mapY = 0;
    scale = 1;

    updateMapTransform();
});



worldMap.addEventListener("load", () => {

    const svgDocument =
        worldMap.contentDocument;

    if (!svgDocument) {
        console.error("No se pudo acceder al mapa SVG.");
        return;
    }

    const countries =
        svgDocument.querySelectorAll("[id]");

    countries.forEach((country) => {

        country.style.cursor = "pointer";

        country.addEventListener("click", (event) => {

            event.stopPropagation();

            selectCountry(country);
        });

    });

    console.log(
        `Países encontrados: ${countries.length}`
    );
});



function selectCountry(country) {

    selectedCountryCode = country.id;
    selectedCountryElement = country;

    const name =
        getCountryName(country.id);

    console.log(
        "País seleccionado:",
        country.id,
        name
    );

    openCountryMemory(
        country.id,
        name
    );
}

// =========================================
// CARGAR RECUERDOS DEL PAÍS
// =========================================

function loadCountryMemories(countryCode) {

    const memories =
        JSON.parse(
            localStorage.getItem("privateAtlasAtlas")
        ) || [];

    const countryList =
        memories.filter(
            memory => memory.country === countryCode
        );

    countryMemories.innerHTML = "";

    const emptyMessage =
        document.querySelector(".memory-empty-message");


    if (countryList.length === 0) {

        if (emptyMessage) {
            emptyMessage.style.display = "block";
        }

        return;
    }


    if (emptyMessage) {
        emptyMessage.style.display = "none";
    }


    countryList.forEach(memory => {

        countryMemories.appendChild(
            createMemoryCard(memory)
        );

    });


    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

const countryNames = {

    CO: "Colombia",
    VE: "Venezuela",
    EC: "Ecuador",
    PE: "Perú",
    BR: "Brasil",
    AR: "Argentina",
    CL: "Chile",
    BO: "Bolivia",
    PY: "Paraguay",
    UY: "Uruguay",
    PA: "Panamá",
    CR: "Costa Rica",
    MX: "México",
    US: "Estados Unidos",
    CA: "Canadá",
    ES: "España",
    FR: "Francia",
    IT: "Italia",
    DE: "Alemania",
    PT: "Portugal",
    GB: "Reino Unido",
    JP: "Japón",
    CN: "China",
    KR: "Corea del Sur",
    AU: "Australia"

};


function getCountryName(code) {

    return countryNames[code] || code;
}


function openCountryMemory(code, name) {

    selectedCountryCode = code;

    console.log(
        "Abriendo ventana:",
        name
    );

    memoryCountryName.textContent =
        name;

    memoryCountryDescription.textContent =
        `Aquí podrás guardar tus recuerdos de ${name}.`;

    loadCountryMemories(code);

    countryMemory.classList.add("active");

    console.log(
        "Ventana activa:",
        countryMemory.classList.contains("active")
    );
}



// =========================================
// GUARDAR / EDITAR RECUERDO
// =========================================

let editingMemoryId = null;

memoryForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!selectedCountryCode) return;

    const city =
        document
            .getElementById("memory-city")
            .value
            .trim();

    const title =
        document
            .getElementById("memory-title")
            .value
            .trim();

    let description =
        document
            .getElementById("memory-description")
            .value
            .trim();

    const date =
        document
            .getElementById("memory-date")
            .value;

    const imageInput =
        document.getElementById("memory-image");

    const file =
        imageInput.files[0];


    // Máximo 35 palabras
    description =
        description
            .split(/\s+/)
            .slice(0, 35)
            .join(" ");


    const memories =
        JSON.parse(
            localStorage.getItem("privateAtlasAtlas")
        ) || [];


    const saveMemory = (image = null) => {

        if (editingMemoryId) {

            const index =
                memories.findIndex(
                    memory =>
                        memory.id === editingMemoryId
                );

            if (index !== -1) {

                memories[index].city =
                    city;

                memories[index].title =
                    title;

                memories[index].description =
                    description;

                memories[index].date =
                    date;

                if (image !== null) {
                    memories[index].image =
                        image;
                }

            }

        } else {

            memories.push({

                id: Date.now(),

                country:
                    selectedCountryCode,

                city,

                title,

                description,

                date,

                image:
                    image || "",

                favorite: false

            });

        }


        localStorage.setItem(
            "privateAtlasAtlas",
            JSON.stringify(memories)
        );


        editingMemoryId = null;

        memoryForm.reset();

        memoryFormContainer
            .classList
            .remove("active");

        loadCountryMemories(
            selectedCountryCode
        );
    };


    if (file) {

        const reader =
            new FileReader();

        reader.onload = () => {

            saveMemory(
                reader.result
            );

        };

        reader.readAsDataURL(file);

    } else {

        if (editingMemoryId) {

            const oldMemory =
                memories.find(
                    memory =>
                        memory.id === editingMemoryId
                );

            saveMemory(
                oldMemory
                    ? oldMemory.image
                    : ""
            );

        } else {

            saveMemory("");

        }

    }

});

// =========================================
// CREAR TARJETA POLAROID
// =========================================

function createMemoryCard(memory) {

    const card =
        document.createElement("article");


    card.className =
        `memory-card ${
            memory.favorite
                ? "favorite"
                : ""
        }`;


    card.dataset.id =
        memory.id;


    card.innerHTML = `

        <div class="memory-card-inner">

            <!-- FRENTE -->

            <div class="memory-card-front">

                <div class="memory-photo">

                    ${
                        memory.image

                            ? `
                                <img
                                    src="${memory.image}"
                                    alt="${escapeHTML(memory.title)}"
                                >
                              `

                            : `
                                <div class="no-photo">
                                    Sin fotografía
                                </div>
                              `
                    }

                </div>


                <div class="polaroid-caption">

                    ${escapeHTML(
                        memory.title
                    )}

                </div>

            </div>


            <!-- REVERSO -->

            <div class="memory-card-back">

                <div class="memory-back-content">

                    <span class="memory-back-city">

                        ${escapeHTML(
                            memory.city ||
                            "Sin ciudad"
                        )}

                    </span>


                    <h3>

                        ${escapeHTML(
                            memory.title
                        )}

                    </h3>


                    <p class="memory-description">

                        ${escapeHTML(
                            memory.description
                        )}

                    </p>


                    <p class="memory-date">

                        ${memory.date
                            || "Sin fecha"}

                    </p>

                </div>


                <div class="memory-actions">

                    <button
                        type="button"
                        class="favorite-memory"
                        title="Favorito"
                    >
                        <i
                            data-lucide="star">
                        </i>
                    </button>


                    <button
                        type="button"
                        class="edit-memory"
                        title="Editar"
                    >
                        <i
                            data-lucide="pencil">
                        </i>
                    </button>


                    <button
                        type="button"
                        class="delete-memory"
                        title="Eliminar"
                    >
                        <i
                            data-lucide="trash-2">
                        </i>
                    </button>

                </div>

            </div>

        </div>

    `;


    // =========================================
    // GIRAR POLAROID
    // =========================================

    card.addEventListener(
        "click",
        (event) => {

            if (
                event.target.closest(
                    ".memory-actions"
                )
            ) {
                return;
            }

            card.classList.toggle(
                "flipped"
            );

        }
    );


    // =========================================
    // FAVORITO
    // =========================================

    card
        .querySelector(
            ".favorite-memory"
        )
        .addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleFavorite(
                    memory.id
                );

            }
        );


    // =========================================
    // EDITAR
    // =========================================

    card
        .querySelector(
            ".edit-memory"
        )
        .addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                editMemory(
                    memory.id
                );

            }
        );


    // =========================================
    // ELIMINAR
    // =========================================

    card
        .querySelector(
            ".delete-memory"
        )
        .addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                deleteMemory(
                    memory.id
                );

            }
        );


    return card;
}

// =========================================
// ELIMINAR RECUERDO
// =========================================

function deleteMemory(memoryId) {

    const memories =
        JSON.parse(
            localStorage.getItem("privateAtlasAtlas")
        ) || [];


    const updatedMemories =
        memories.filter(
            memory => memory.id !== memoryId
        );


    localStorage.setItem(
        "privateAtlasAtlas",
        JSON.stringify(updatedMemories)
    );


    loadCountryMemories(
        selectedCountryCode
    );
}

// =========================================
// SEGURIDAD DE TEXTO
// =========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;
}

// =========================================
// CARGAR RECUERDOS AGRUPADOS POR CIUDAD
// =========================================

function loadCountryMemories(countryCode) {

    const memories =
        JSON.parse(
            localStorage.getItem("privateAtlasAtlas")
        ) || [];


    const countryList =
        memories.filter(
            memory =>
                memory.country === countryCode
        );


    countryMemories.innerHTML = "";


    const emptyMessage =
        document.querySelector(
            ".memory-empty-message"
        );


    // =========================================
    // SIN RECUERDOS
    // =========================================

    if (countryList.length === 0) {

        if (emptyMessage) {
            emptyMessage.style.display =
                "block";
        }

        return;
    }


    if (emptyMessage) {
        emptyMessage.style.display =
            "none";
    }


    // =========================================
    // AGRUPAR POR CIUDAD
    // =========================================

    const cities = {};

    countryList.forEach(memory => {

        const city =
            memory.city ||
            "Sin ciudad";

        if (!cities[city]) {
            cities[city] = [];
        }

        cities[city].push(memory);

    });


    // =========================================
    // CREAR UN CARRUSEL POR CIUDAD
    // =========================================

    Object.keys(cities).forEach(city => {

        createCityCarousel(
            city,
            cities[city]
        );

    });


    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

}

// =========================================
// CREAR CARRUSEL DE UNA CIUDAD
// =========================================

function createCityCarousel(city, memories) {

    const section =
        document.createElement("section");

    section.className =
        "city-memory-section";


    const title =
        document.createElement("h3");

    title.className =
        "city-memory-title";

    title.innerHTML = `
        <span>✦</span>
        ${escapeHTML(city)}
        <span>✦</span>
    `;


    const carousel =
        document.createElement("div");

    carousel.className =
        "memory-carousel";


    const previous =
        document.createElement("button");

    previous.type = "button";

    previous.className =
        "carousel-arrow carousel-prev";

    previous.innerHTML = `
        <i data-lucide="chevron-left"></i>
    `;


    const next =
        document.createElement("button");

    next.type = "button";

    next.className =
        "carousel-arrow carousel-next";

    next.innerHTML = `
        <i data-lucide="chevron-right"></i>
    `;


    const viewport =
        document.createElement("div");

    viewport.className =
        "memory-carousel-viewport";


    const track =
        document.createElement("div");

    track.className =
        "memory-carousel-track";


    // Crear Polaroids
    memories.forEach(memory => {

        track.appendChild(
            createMemoryCard(memory)
        );

    });


    viewport.appendChild(track);

    carousel.appendChild(previous);

    carousel.appendChild(viewport);

    carousel.appendChild(next);


    section.appendChild(title);

    section.appendChild(carousel);


    countryMemories.appendChild(section);


    // =========================================
    // CONTROL DEL CARRUSEL
    // =========================================

    let position = 0;

    const cardWidth = 242;


    function updateCarousel() {

        const visibleWidth =
            viewport.clientWidth;

        const totalWidth =
            track.scrollWidth;

        const maxPosition =
            Math.max(
                0,
                totalWidth - visibleWidth
            );


        position =
            Math.max(
                0,
                Math.min(
                    position,
                    maxPosition
                )
            );


        track.style.transform =
            `translateX(-${position}px)`;

    }


    next.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            position += cardWidth;

            updateCarousel();

        }
    );


    previous.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            position -= cardWidth;

            updateCarousel();

        }
    );


    window.addEventListener(
        "resize",
        updateCarousel
    );


    updateCarousel();

}