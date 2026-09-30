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

    countryName.textContent = name;

    countryMessage.textContent =
        "País seleccionado. Aquí podrás guardar tus recuerdos.";

    selectedCountry.classList.add("active");

    openCountryMemory(
        country.id,
        name
    );
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

    memoryCountryName.textContent = name;

    memoryCountryDescription.textContent =
        `Aquí podrás guardar tus recuerdos de ${name}.`;

    loadCountryMemories(code);

    countryMemory.classList.add("active");
}

if (closeMemory) {

    closeMemory.addEventListener("click", () => {

        countryMemory.classList.remove("active");

    });

}

if (addMemoryBtn) {

    addMemoryBtn.addEventListener("click", () => {

        memoryForm.reset();

        memoryFormContainer.classList.add("active");

    });

}


if (closeMemoryForm) {

    closeMemoryForm.addEventListener("click", () => {

        memoryFormContainer.classList.remove("active");

    });

}

// =========================================
// GUARDAR / EDITAR RECUERDO
// =========================================

let editingMemoryId = null;

memoryForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!selectedCountryCode) return;

    const title =
        document.getElementById("memory-title").value.trim();

    let description =
        document.getElementById("memory-description").value.trim();

    const date =
        document.getElementById("memory-date").value;

    const imageInput =
        document.getElementById("memory-image");

    const file =
        imageInput.files[0];

    // Límite de 35 palabras
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
                    memory => memory.id === editingMemoryId
                );

            if (index !== -1) {

                memories[index].title = title;
                memories[index].description = description;
                memories[index].date = date;

                if (image !== null) {
                    memories[index].image = image;
                }

            }

        } else {

            memories.push({

                id: Date.now(),

                country: selectedCountryCode,

                title,

                description,

                date,

                image: image || "",

                favorite: false

            });

        }


        localStorage.setItem(
            "privateAtlasAtlas",
            JSON.stringify(memories)
        );


        editingMemoryId = null;

        memoryForm.reset();

        memoryFormContainer.classList.remove("active");

        loadCountryMemories(selectedCountryCode);
    };


    if (file) {

        const reader = new FileReader();

        reader.onload = () => {
            saveMemory(reader.result);
        };

        reader.readAsDataURL(file);

    } else {

        if (editingMemoryId) {

            const oldMemory =
                memories.find(
                    memory => memory.id === editingMemoryId
                );

            saveMemory(
                oldMemory ? oldMemory.image : ""
            );

        } else {

            saveMemory("");

        }

    }

});

// =========================================
// GUARDAR / EDITAR RECUERDO
// =========================================

let editingMemoryId = null;

memoryForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!selectedCountryCode) return;

    const title =
        document.getElementById("memory-title").value.trim();

    let description =
        document.getElementById("memory-description").value.trim();

    const date =
        document.getElementById("memory-date").value;

    const imageInput =
        document.getElementById("memory-image");

    const file =
        imageInput.files[0];

    // Límite de 35 palabras
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
                    memory => memory.id === editingMemoryId
                );

            if (index !== -1) {

                memories[index].title = title;
                memories[index].description = description;
                memories[index].date = date;

                if (image !== null) {
                    memories[index].image = image;
                }

            }

        } else {

            memories.push({

                id: Date.now(),

                country: selectedCountryCode,

                title,

                description,

                date,

                image: image || "",

                favorite: false

            });

        }


        localStorage.setItem(
            "privateAtlasAtlas",
            JSON.stringify(memories)
        );


        editingMemoryId = null;

        memoryForm.reset();

        memoryFormContainer.classList.remove("active");

        loadCountryMemories(selectedCountryCode);
    };


    if (file) {

        const reader = new FileReader();

        reader.onload = () => {
            saveMemory(reader.result);
        };

        reader.readAsDataURL(file);

    } else {

        if (editingMemoryId) {

            const oldMemory =
                memories.find(
                    memory => memory.id === editingMemoryId
                );

            saveMemory(
                oldMemory ? oldMemory.image : ""
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

    const card = document.createElement("article");

    card.className =
        `memory-card ${memory.favorite ? "favorite" : ""}`;

    card.dataset.id = memory.id;


    card.innerHTML = `

        <div class="memory-card-inner">

            <!-- FRENTE -->
            <div class="memory-card-front">

                <div class="memory-photo">

                    ${
                        memory.image
                            ? `<img src="${memory.image}" alt="${escapeHTML(memory.title)}">`
                            : `
                                <div class="no-photo">
                                    Sin fotografía
                                </div>
                            `
                    }

                </div>

                <div class="polaroid-caption">
                    ${escapeHTML(memory.title)}
                </div>

            </div>


            <!-- REVERSO -->
            <div class="memory-card-back">

                <h3>
                    ${escapeHTML(memory.title)}
                </h3>

                <p class="memory-description">
                    ${escapeHTML(memory.description)}
                </p>

                <p class="memory-date">
                    ${memory.date || "Sin fecha"}
                </p>

                <div class="memory-actions">

                    <button
                        type="button"
                        class="favorite-memory"
                        title="Favorito"
                    >
                        <i data-lucide="star"></i>
                    </button>

                    <button
                        type="button"
                        class="edit-memory"
                        title="Editar"
                    >
                        <i data-lucide="pencil"></i>
                    </button>

                    <button
                        type="button"
                        class="delete-memory"
                        title="Eliminar"
                    >
                        <i data-lucide="trash-2"></i>
                    </button>

                </div>

            </div>

        </div>
    `;


    // Girar tarjeta
    card.addEventListener("click", (event) => {

        if (
            event.target.closest(".memory-actions")
        ) {
            return;
        }

        card.classList.toggle("flipped");

    });


    // Favorito
    card
        .querySelector(".favorite-memory")
        .addEventListener("click", (event) => {

            event.stopPropagation();

            toggleFavorite(memory.id);

        });


    // Editar
    card
        .querySelector(".edit-memory")
        .addEventListener("click", (event) => {

            event.stopPropagation();

            editMemory(memory.id);

        });


    // Eliminar
    card
        .querySelector(".delete-memory")
        .addEventListener("click", (event) => {

            event.stopPropagation();

            deleteMemory(memory.id);

        });


    return card;
}

// =========================================
// FAVORITO
// =========================================

function toggleFavorite(memoryId) {

    const memories =
        JSON.parse(
            localStorage.getItem("privateAtlasAtlas")
        ) || [];


    const memory =
        memories.find(
            item => item.id === memoryId
        );


    if (!memory) return;


    memory.favorite =
        !memory.favorite;


    localStorage.setItem(
        "privateAtlasAtlas",
        JSON.stringify(memories)
    );


    loadCountryMemories(
        selectedCountryCode
    );
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