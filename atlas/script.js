const worldMap = document.getElementById("world-map");
const mapContainer = document.getElementById("map-container");

const selectedCountry = document.getElementById("selected-country");
const countryName = document.getElementById("country-name");
const countryMessage = document.getElementById("country-message");

const countryMemory = document.getElementById("country-memory");
const memoryCountryName = document.getElementById("memory-country-name");
const memoryCountryDescription = document.getElementById("memory-country-description");

const countryMemories = document.getElementById("country-memories");

const addMemoryBtn = document.getElementById("add-memory-btn");

const memoryFormContainer = document.getElementById("memory-form-container");
const memoryForm = document.getElementById("memory-form");

const closeMemory = document.getElementById("close-memory");
const closeMemoryForm = document.getElementById("close-memory-form");

let selectedCountryCode = null;
let selectedCountryElement = null;
let editingMemoryId = null;

let isDragging = false;
let hasMoved = false;

let startPointerX = 0;
let startPointerY = 0;

let startMapX = 0;
let startMapY = 0;

let mapX = 0;
let mapY = 0;
let scale = 1;

function updateMapTransform() {

    if (!mapContainer) return;

    mapContainer.style.transform =
        `translate3d(${mapX}px, ${mapY}px, 0) scale(${scale})`;
}

const backHome = document.querySelector(".back-home");

if (backHome) {

    backHome.addEventListener("click", () => {

        window.location.href = "../index.html";

    });

}

if (addMemoryBtn) {

    addMemoryBtn.addEventListener("click", () => {

        editingMemoryId = null;

        if (memoryForm) {
            memoryForm.reset();
        }

        if (memoryFormContainer) {
            memoryFormContainer.classList.add("active");
        }

    });

}

if (closeMemory) {

    closeMemory.addEventListener("click", () => {

        if (countryMemory) {
            countryMemory.classList.remove("active");
        }

    });

}

if (closeMemoryForm) {

    closeMemoryForm.addEventListener("click", () => {

        if (memoryFormContainer) {
            memoryFormContainer.classList.remove("active");
        }

    });

}

if (memoryFormContainer) {

    memoryFormContainer.addEventListener("click", (event) => {

        if (event.target === memoryFormContainer) {

            memoryFormContainer.classList.remove("active");

        }

    });

}

if (countryMemory) {

    countryMemory.addEventListener("click", (event) => {

        if (event.target === countryMemory) {

            countryMemory.classList.remove("active");

        }

    });

}

if (mapContainer) {

    mapContainer.addEventListener(
        "pointerdown",
        (event) => {

            isDragging = true;
            hasMoved = false;

            startPointerX = event.clientX;
            startPointerY = event.clientY;

            startMapX = mapX;
            startMapY = mapY;

            try {

                mapContainer.setPointerCapture(event.pointerId);

            } catch (error) {}

        }
    );

    mapContainer.addEventListener(
        "pointermove",
        (event) => {

            if (!isDragging) return;

            const deltaX =
                event.clientX - startPointerX;

            const deltaY =
                event.clientY - startPointerY;

            if (
                Math.abs(deltaX) > 4 ||
                Math.abs(deltaY) > 4
            ) {

                hasMoved = true;

            }

            mapX = startMapX + deltaX;
            mapY = startMapY + deltaY;

            updateMapTransform();

        }
    );

    mapContainer.addEventListener(
        "pointerup",
        (event) => {

            if (!isDragging) return;

            isDragging = false;

            try {

                mapContainer.releasePointerCapture(
                    event.pointerId
                );

            } catch (error) {}

        }
    );

    mapContainer.addEventListener(
        "pointercancel",
        () => {

            isDragging = false;

        }
    );

    mapContainer.addEventListener(
        "wheel",
        (event) => {

            event.preventDefault();

            const oldScale = scale;

            const zoomAmount =
                event.deltaY > 0
                    ? 0.90
                    : 1.10;

            scale *= zoomAmount;

            scale =
                Math.max(
                    0.65,
                    Math.min(scale, 4)
                );

            const rect =
                mapContainer.getBoundingClientRect();

            const mouseX =
                event.clientX - rect.left;

            const mouseY =
                event.clientY - rect.top;

            const scaleChange =
                scale / oldScale;

            mapX =
                mouseX -
                (mouseX - mapX) *
                scaleChange;

            mapY =
                mouseY -
                (mouseY - mapY) *
                scaleChange;

            updateMapTransform();

        },
        {
            passive: false
        }
    );

    mapContainer.addEventListener(
        "dblclick",
        () => {

            mapX = 0;
            mapY = 0;
            scale = 1;

            updateMapTransform();

        }
    );

}

updateMapTransform();

function initializeCountries() {

    if (!worldMap) {
        return;
    }

    const svgDocument = worldMap.contentDocument;

    if (!svgDocument) {
        setTimeout(initializeCountries, 200);
        return;
    }

    const countries = svgDocument.querySelectorAll("path[id]");

    countries.forEach((country) => {

        country.style.cursor = "pointer";
        country.style.transition = "filter 0.2s ease";

        country.addEventListener("mouseenter", () => {

            country.style.filter = "brightness(1.15)";

        });

        country.addEventListener("mouseleave", () => {

            if (country !== selectedCountryElement) {
                country.style.filter = "";
            }

        });

        country.addEventListener("click", (event) => {

            event.stopPropagation();

            if (hasMoved) {
                return;
            }

            selectCountry(country);

        });

    });

}

if (worldMap) {

    worldMap.addEventListener("load", initializeCountries);

    setTimeout(initializeCountries, 300);

}

function selectCountry(country) {

    if (!country) return;

    selectedCountryElement = country;

    selectedCountryCode =
        country.getAttribute("id");

    const name =
        getCountryName(
            selectedCountryCode
        );

    if (selectedCountry) {
        selectedCountry.classList.remove("active");
    }

    openCountryMemory(
        selectedCountryCode,
        name
    );

}

function getCountryName(code) {

    if (
        selectedCountryElement &&
        selectedCountryElement.getAttribute("name")
    ) {

        return translateCountryName(
            selectedCountryElement.getAttribute("name")
        );

    }

    return countryNames[code] || code;

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

function translateCountryName(name) {

    const translations = {

        Afghanistan: "Afganistán",
        Albania: "Albania",
        Algeria: "Argelia",
        Andorra: "Andorra",
        Angola: "Angola",
        Argentina: "Argentina",
        Armenia: "Armenia",
        Australia: "Australia",
        Austria: "Austria",
        Azerbaijan: "Azerbaiyán",
        Bahamas: "Bahamas",
        Bahrain: "Baréin",
        Bangladesh: "Bangladés",
        Barbados: "Barbados",
        Belarus: "Bielorrusia",
        Belgium: "Bélgica",
        Belize: "Belice",
        Benin: "Benín",
        Bhutan: "Bután",
        Bolivia: "Bolivia",
        Bosnia: "Bosnia y Herzegovina",
        Botswana: "Botsuana",
        Brazil: "Brasil",
        Brunei: "Brunéi",
        Bulgaria: "Bulgaria",
        Burkina: "Burkina Faso",
        Burundi: "Burundi",
        Cambodia: "Camboya",
        Cameroon: "Camerún",
        Canada: "Canadá",
        Chad: "Chad",
        Chile: "Chile",
        China: "China",
        Colombia: "Colombia",
        Congo: "Congo",
        Croatia: "Croacia",
        Cuba: "Cuba",
        Cyprus: "Chipre",
        Czechia: "Chequia",
        Denmark: "Dinamarca",
        Djibouti: "Yibuti",
        Dominica: "Dominica",
        Dominican: "República Dominicana",
        Ecuador: "Ecuador",
        Egypt: "Egipto",
        Eritrea: "Eritrea",
        Estonia: "Estonia",
        Ethiopia: "Etiopía",
        Fiji: "Fiyi",
        Finland: "Finlandia",
        France: "Francia",
        Gabon: "Gabón",
        Gambia: "Gambia",
        Georgia: "Georgia",
        Germany: "Alemania",
        Ghana: "Ghana",
        Greece: "Grecia",
        Guatemala: "Guatemala",
        Guinea: "Guinea",
        Guyana: "Guyana",
        Haiti: "Haití",
        Honduras: "Honduras",
        Hungary: "Hungría",
        Iceland: "Islandia",
        India: "India",
        Indonesia: "Indonesia",
        Iran: "Irán",
        Iraq: "Irak",
        Ireland: "Irlanda",
        Israel: "Israel",
        Italy: "Italia",
        Jamaica: "Jamaica",
        Japan: "Japón",
        Jordan: "Jordania",
        Kazakhstan: "Kazajistán",
        Kenya: "Kenia",
        Kuwait: "Kuwait",
        Kyrgyzstan: "Kirguistán",
        Laos: "Laos",
        Latvia: "Letonia",
        Lebanon: "Líbano",
        Liberia: "Liberia",
        Libya: "Libia",
        Lithuania: "Lituania",
        Luxembourg: "Luxemburgo",
        Madagascar: "Madagascar",
        Malawi: "Malaui",
        Malaysia: "Malasia",
        Maldives: "Maldivas",
        Mali: "Malí",
        Malta: "Malta",
        Mauritania: "Mauritania",
        Mauritius: "Mauricio",
        Mexico: "México",
        Moldova: "Moldavia",
        Monaco: "Mónaco",
        Mongolia: "Mongolia",
        Montenegro: "Montenegro",
        Morocco: "Marruecos",
        Mozambique: "Mozambique",
        Namibia: "Namibia",
        Nepal: "Nepal",
        Netherlands: "Países Bajos",
        NewZealand: "Nueva Zelanda",
        Nicaragua: "Nicaragua",
        Niger: "Níger",
        Nigeria: "Nigeria",
        Norway: "Noruega",
        Oman: "Omán",
        Pakistan: "Pakistán",
        Panama: "Panamá",
        Paraguay: "Paraguay",
        Peru: "Perú",
        Philippines: "Filipinas",
        Poland: "Polonia",
        Portugal: "Portugal",
        Qatar: "Catar",
        Romania: "Rumania",
        Russia: "Rusia",
        Rwanda: "Ruanda",
        SaudiArabia: "Arabia Saudita",
        Senegal: "Senegal",
        Serbia: "Serbia",
        Singapore: "Singapur",
        Slovakia: "Eslovaquia",
        Slovenia: "Eslovenia",
        Somalia: "Somalia",
        SouthAfrica: "Sudáfrica",
        SouthKorea: "Corea del Sur",
        Spain: "España",
        Sudan: "Sudán",
        Suriname: "Surinam",
        Sweden: "Suecia",
        Switzerland: "Suiza",
        Syria: "Siria",
        Taiwan: "Taiwán",
        Tajikistan: "Tayikistán",
        Tanzania: "Tanzania",
        Thailand: "Tailandia",
        Togo: "Togo",
        Tonga: "Tonga",
        Tunisia: "Túnez",
        Turkey: "Turquía",
        Turkmenistan: "Turkmenistán",
        Uganda: "Uganda",
        Ukraine: "Ucrania",
        UnitedArabEmirates: "Emiratos Árabes Unidos",
        UnitedKingdom: "Reino Unido",
        UnitedStates: "Estados Unidos",
        Uruguay: "Uruguay",
        Uzbekistan: "Uzbekistán",
        Vanuatu: "Vanuatu",
        Venezuela: "Venezuela",
        Vietnam: "Vietnam",
        Yemen: "Yemen",
        Zambia: "Zambia",
        Zimbabwe: "Zimbabue"

    };

    return translations[name] || name;

}

function openCountryMemory(code, name) {

    selectedCountryCode = code;

    if (memoryCountryName) {

        memoryCountryName.textContent =
            name;

    }

    if (memoryCountryDescription) {

        memoryCountryDescription.textContent =
            `Aquí podrás guardar tus recuerdos de ${name}.`;

    }

    loadCountryMemories(code);

    if (countryMemory) {

        countryMemory.classList.add("active");

    }

}

if (memoryForm) {

    memoryForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            if (!selectedCountryCode) {
                return;
            }

            const cityInput =
                document.getElementById(
                    "memory-city"
                );

            const titleInput =
                document.getElementById(
                    "memory-title"
                );

            const descriptionInput =
                document.getElementById(
                    "memory-description"
                );

            const dateInput =
                document.getElementById(
                    "memory-date"
                );

            const imageInput =
                document.getElementById(
                    "memory-image"
                );

            const city =
                cityInput
                    ? cityInput.value.trim()
                    : "";

            const title =
                titleInput
                    ? titleInput.value.trim()
                    : "";

            let description =
                descriptionInput
                    ? descriptionInput.value.trim()
                    : "";

            const date =
                dateInput
                    ? dateInput.value
                    : "";

            const file =
                imageInput &&
                imageInput.files
                    ? imageInput.files[0]
                    : null;

            description =
                description
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 35)
                    .join(" ");

            const memories =
                JSON.parse(
                    localStorage.getItem(
                        "privateAtlasAtlas"
                    )
                ) || [];

            const saveMemory =
                (image) => {

                    if (editingMemoryId) {

                        const index =
                            memories.findIndex(
                                memory =>
                                    memory.id ===
                                    editingMemoryId
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

                            memories[index].image =
                                image;

                        }

                    } else {

                        memories.push({

                            id:
                                Date.now(),

                            country:
                                selectedCountryCode,

                            city,

                            title,

                            description,

                            date,

                            image:
                                image || "",

                            favorite:
                                false

                        });

                    }

                    localStorage.setItem(
                        "privateAtlasAtlas",
                        JSON.stringify(memories)
                    );

                    editingMemoryId = null;

                    memoryForm.reset();

                    if (memoryFormContainer) {

                        memoryFormContainer.classList.remove(
                            "active"
                        );

                    }

                    loadCountryMemories(
                        selectedCountryCode
                    );

                };

            if (file) {

                const reader =
                    new FileReader();

                reader.onload =
                    () => {

                        saveMemory(
                            reader.result
                        );

                    };

                reader.readAsDataURL(
                    file
                );

            } else {

                let oldImage = "";

                if (editingMemoryId) {

                    const oldMemory =
                        memories.find(
                            memory =>
                                memory.id ===
                                editingMemoryId
                        );

                    if (oldMemory) {

                        oldImage =
                            oldMemory.image ||
                            "";

                    }

                }

                saveMemory(
                    oldImage
                );

            }

        }
    );

}

function loadCountryMemories(countryCode) {

    if (!countryMemories) {
        return;
    }

    const memories =
        JSON.parse(
            localStorage.getItem(
                "privateAtlasAtlas"
            )
        ) || [];

    const countryList =
        memories.filter(
            memory =>
                memory.country ===
                countryCode
        );

    countryMemories.innerHTML = "";

    const emptyMessage =
        document.querySelector(
            ".memory-empty-message"
        );

    if (
        countryList.length === 0
    ) {

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

    const cities = {};

    countryList.forEach(
        (memory) => {

            const city =
                memory.city &&
                memory.city.trim()
                    ? memory.city.trim()
                    : "Sin ciudad";

            if (!cities[city]) {

                cities[city] = [];

            }

            cities[city].push(
                memory
            );

        }
    );

    Object.keys(cities)
        .forEach(
            (city) => {

                createCityCarousel(
                    city,
                    cities[city]
                );

            }
        );

}

function createCityCarousel(
    city,
    memories
) {

    const section =
        document.createElement(
            "section"
        );

    section.className =
        "city-memory-section";

    const title =
        document.createElement(
            "h3"
        );

    title.className =
        "city-memory-title";

    title.innerHTML = `
        <span>✦</span>
        ${escapeHTML(city)}
        <span>✦</span>
    `;

    const carousel =
        document.createElement(
            "div"
        );

    carousel.className =
        "memory-carousel";

    const previous =
        document.createElement(
            "button"
        );

    previous.type =
        "button";

    previous.className =
        "carousel-arrow carousel-prev";

    previous.innerHTML =
        `<i class="icon-chevron-left"></i>`;

    const next =
        document.createElement(
            "button"
        );

    next.type =
        "button";

    next.className =
        "carousel-arrow carousel-next";

    next.innerHTML =
        `<i class="icon-chevron-right"></i>`;

    const viewport =
        document.createElement(
            "div"
        );

    viewport.className =
        "memory-carousel-viewport";

    const track =
        document.createElement(
            "div"
        );

    track.className =
        "memory-carousel-track";

    memories.forEach(
        (memory) => {

            track.appendChild(
                createMemoryCard(memory)
            );

        }
    );

    viewport.appendChild(
        track
    );

    carousel.appendChild(
        previous
    );

    carousel.appendChild(
        viewport
    );

    carousel.appendChild(
        next
    );

    section.appendChild(
        title
    );

    section.appendChild(
        carousel
    );

    countryMemories.appendChild(
        section
    );

    let position = 0;

    function getStep() {

        const card =
            track.querySelector(
                ".memory-card"
            );

        if (!card) {
            return 240;
        }

        const style =
            window.getComputedStyle(
                track
            );

        const gap =
            parseFloat(
                style.columnGap ||
                style.gap ||
                30
            ) || 30;

        return (
            card.getBoundingClientRect()
                .width +
            gap
        );

    }

    function updateCarousel() {

        const visibleWidth =
            viewport.clientWidth;

        const totalWidth =
            track.scrollWidth;

        const maxPosition =
            Math.max(
                0,
                totalWidth -
                visibleWidth
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

            position +=
                getStep();

            updateCarousel();

        }
    );

    previous.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            position -=
                getStep();

            updateCarousel();

        }
    );

    window.addEventListener(
        "resize",
        updateCarousel
    );

    requestAnimationFrame(
        updateCarousel
    );

}

function createMemoryCard(memory) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        `memory-card ${
            memory.favorite
                ? "favorite"
                : ""
        }`;

    card.dataset.id =
        memory.id;

    const imageHTML =
        memory.image
            ? `
                <img
                    src="${memory.image}"
                    alt="${escapeHTML(
                        memory.title
                    )}"
                >
              `
            : `
                <div class="no-photo">
                    Sin fotografía
                </div>
              `;

    card.innerHTML = `

        <div class="memory-card-inner">

            <div class="memory-card-front">

                <div class="memory-photo">

                    ${imageHTML}

                </div>

                <div class="polaroid-caption">

                    ${escapeHTML(
                        memory.title ||
                        "Sin título"
                    )}

                </div>

            </div>

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
                            memory.title ||
                            "Sin título"
                        )}

                    </h3>

                    <p class="memory-description">

                        ${escapeHTML(
                            memory.description ||
                            "Sin descripción"
                        )}

                    </p>

                    <p class="memory-date">

                        ${
                            memory.date ||
                            "Sin fecha"
                        }

                    </p>

                </div>

                <div class="memory-actions">

                    <button
                        type="button"
                        class="favorite-memory"
                        title="Favorito"
                    >

                        <i class="icon-star"></i>

                    </button>

                    <button
                        type="button"
                        class="edit-memory"
                        title="Editar"
                    >

                        <i class="icon-pencil"></i>

                    </button>

                    <button
                        type="button"
                        class="delete-memory"
                        title="Eliminar"
                    >

                        <i class="icon-trash-2"></i>

                    </button>

                </div>

            </div>

        </div>

    `;

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

    const favoriteButton =
        card.querySelector(
            ".favorite-memory"
        );

    if (favoriteButton) {

        favoriteButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleFavorite(
                    memory.id
                );

            }
        );

    }

    const editButton =
        card.querySelector(
            ".edit-memory"
        );

    if (editButton) {

        editButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                editMemory(
                    memory.id
                );

            }
        );

    }

    const deleteButton =
        card.querySelector(
            ".delete-memory"
        );

    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                deleteMemory(
                    memory.id
                );

            }
        );

    }

    return card;

}

function toggleFavorite(
    memoryId
) {

    const memories =
        JSON.parse(
            localStorage.getItem(
                "privateAtlasAtlas"
            )
        ) || [];

    const memory =
        memories.find(
            item =>
                item.id ===
                memoryId
        );

    if (!memory) {
        return;
    }

    memory.favorite =
        !memory.favorite;

    localStorage.setItem(
        "privateAtlasAtlas",
        JSON.stringify(
            memories
        )
    );

    loadCountryMemories(
        selectedCountryCode
    );

}

function editMemory(
    memoryId
) {

    const memories =
        JSON.parse(
            localStorage.getItem(
                "privateAtlasAtlas"
            )
        ) || [];

    const memory =
        memories.find(
            item =>
                item.id ===
                memoryId
        );

    if (!memory) {
        return;
    }

    editingMemoryId =
        memoryId;

    const cityInput =
        document.getElementById(
            "memory-city"
        );

    const titleInput =
        document.getElementById(
            "memory-title"
        );

    const descriptionInput =
        document.getElementById(
            "memory-description"
        );

    const dateInput =
        document.getElementById(
            "memory-date"
        );

    if (cityInput) {

        cityInput.value =
            memory.city ||
            "";

    }

    if (titleInput) {

        titleInput.value =
            memory.title ||
            "";

    }

    if (descriptionInput) {

        descriptionInput.value =
            memory.description ||
            "";

    }

    if (dateInput) {

        dateInput.value =
            memory.date ||
            "";

    }

    if (memoryFormContainer) {

        memoryFormContainer.classList.add(
            "active"
        );

    }

}

function deleteMemory(
    memoryId
) {

    const memories =
        JSON.parse(
            localStorage.getItem(
                "privateAtlasAtlas"
            )
        ) || [];

    const updatedMemories =
        memories.filter(
            memory =>
                memory.id !==
                memoryId
        );

    localStorage.setItem(
        "privateAtlasAtlas",
        JSON.stringify(
            updatedMemories
        )
    );

    loadCountryMemories(
        selectedCountryCode
    );

}

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text || "";

    return div.innerHTML;

}

const searchButton =
    document.querySelector(
        ".search-btn"
    );

if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            const country =
                prompt(
                    "Escribe el nombre del país que quieres buscar:"
                );

            if (!country) {
                return;
            }

            const search =
                country
                    .trim()
                    .toLowerCase();

            if (!worldMap) {
                return;
            }

            const svgDocument =
                worldMap.contentDocument;

            if (!svgDocument) {
                return;
            }

            const countries =
                svgDocument.querySelectorAll(
                    "path[id]"
                );

            let foundCountry =
                null;

            countries.forEach(
                (countryElement) => {

                    if (foundCountry) {
                        return;
                    }

                    const originalName =
                        countryElement.getAttribute(
                            "name"
                        ) || "";

                    const translatedName =
                        translateCountryName(
                            originalName
                        );

                    const id =
                        countryElement.getAttribute(
                            "id"
                        ) || "";

                    if (
                        originalName
                            .toLowerCase()
                            .includes(search) ||
                        translatedName
                            .toLowerCase()
                            .includes(search) ||
                        id
                            .toLowerCase()
                            === search
                    ) {

                        foundCountry =
                            countryElement;

                    }

                }
            );

            if (foundCountry) {

                selectCountry(
                    foundCountry
                );

            } else {

                alert(
                    "No encontramos ese país en el mapa."
                );

            }

        }
    );

}

const favoriteButton =
    document.querySelector(
        ".favorite-btn"
    );

if (favoriteButton) {

    favoriteButton.addEventListener(
        "click",
        () => {

            const memories =
                JSON.parse(
                    localStorage.getItem(
                        "privateAtlasAtlas"
                    )
                ) || [];

            const favorites =
                memories.filter(
                    memory =>
                        memory.favorite
                );

            if (
                favorites.length === 0
            ) {

                alert(
                    "Todavía no tienes recuerdos favoritos."
                );

                return;

            }

            if (
                !selectedCountryCode
            ) {

                alert(
                    `Tienes ${favorites.length} recuerdo${
                        favorites.length === 1
                            ? ""
                            : "s"
                    } favorito${
                        favorites.length === 1
                            ? ""
                            : "s"
                    }.`
                );

                return;

            }

            const countryFavorites =
                favorites.filter(
                    memory =>
                        memory.country ===
                        selectedCountryCode
                );

            if (
                countryFavorites.length === 0
            ) {

                alert(
                    "No tienes recuerdos favoritos en este país."
                );

                return;

            }

            loadCountryMemories(
                selectedCountryCode
            );

        }
    );

}

const memoryButton =
    document.querySelector(
        ".memory-btn"
    );

if (memoryButton) {

    memoryButton.addEventListener(
        "click",
        () => {

            if (
                !selectedCountryCode
            ) {

                alert(
                    "Primero selecciona un país en el mapa."
                );

                return;

            }

            if (countryMemory) {

                countryMemory.classList.add(
                    "active"
                );

            }

        }
    );

}

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }

        if (
            memoryFormContainer &&
            memoryFormContainer.classList.contains(
                "active"
            )
        ) {

            memoryFormContainer.classList.remove(
                "active"
            );

            return;

        }

        if (
            countryMemory &&
            countryMemory.classList.contains(
                "active"
            )
        ) {

            countryMemory.classList.remove(
                "active"
            );

        }

    }
);

updateMapTransform();