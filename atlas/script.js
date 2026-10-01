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



if (addMemoryBtn) {

    addMemoryBtn.addEventListener("click", () => {

        editingMemoryId = null;

        memoryForm.reset();

        memoryFormContainer.classList.add("active");

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    });

}


if (closeMemory) {

    closeMemory.addEventListener("click", () => {

        countryMemory.classList.remove("active");

    });

}


if (closeMemoryForm) {

    closeMemoryForm.addEventListener("click", () => {

        memoryFormContainer.classList.remove("active");

    });

}

const backHome = document.querySelector(".back-home");

if (backHome) {
    backHome.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
}



let isDragging = false;
let hasMoved = false;

let startPointerX = 0;
let startPointerY = 0;

let startMapX = 0;
let startMapY = 0;


function updateMapTransform() {

    mapContainer.style.transform =
        `translate3d(${mapX}px, ${mapY}px, 0)
         scale(${scale})`;

}


mapContainer.addEventListener(
    "pointerdown",
    (event) => {

        isDragging = true;
        hasMoved = false;

        startPointerX =
            event.clientX;

        startPointerY =
            event.clientY;

        startMapX = mapX;
        startMapY = mapY;

        mapContainer.setPointerCapture(
            event.pointerId
        );

    }
);



mapContainer.addEventListener(
    "pointermove",
    (event) => {

        if (!isDragging) return;


        const deltaX =
            event.clientX -
            startPointerX;

        const deltaY =
            event.clientY -
            startPointerY;


        if (
            Math.abs(deltaX) > 4 ||
            Math.abs(deltaY) > 4
        ) {

            hasMoved = true;

        }


        mapX =
            startMapX + deltaX;

        mapY =
            startMapY + deltaY;


        updateMapTransform();

    }
);


function stopDragging(event) {

    if (!isDragging) return;

    isDragging = false;

    try {

        mapContainer.releasePointerCapture(
            event.pointerId
        );

    } catch (error) {}

}


mapContainer.addEventListener(
    "pointerup",
    stopDragging
);

mapContainer.addEventListener(
    "pointercancel",
    stopDragging
);



mapContainer.addEventListener(
    "wheel",
    (event) => {

        event.preventDefault();


        const zoomIntensity = 0.0015;


        const oldScale = scale;


        scale -=
            event.deltaY *
            zoomIntensity;


        scale =
            Math.max(
                0.65,
                Math.min(
                    scale,
                    4
                )
            );


        const rect =
            mapContainer.getBoundingClientRect();


        const mouseX =
            event.clientX -
            rect.left;

        const mouseY =
            event.clientY -
            rect.top;


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

        console.error(
            "No se pudo acceder al mapa SVG."
        );

        return;
    }

    const countries =
        svgDocument.querySelectorAll(
            "path[id][name]"
        );


    countries.forEach((country) => {

        country.style.cursor = "pointer";

        country.style.transition =
            "filter 0.2s ease";


        country.addEventListener(
            "mouseenter",
            () => {

                country.style.filter =
                    "brightness(1.15)";

            }
        );


        country.addEventListener(
            "mouseleave",
            () => {

                if (
                    country !==
                    selectedCountryElement
                ) {

                    country.style.filter =
                        "";

                }

            }
        );


        country.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                selectCountry(country);

            }
        );

    });


    console.log(
        `Países habilitados: ${countries.length}`
    );

});


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
        UnitedArabEmirates:"Emiratos Árabes Unidos",
        UnitedKingdom:"Reino Unido",
        UnitedStates:"Estados Unidos",
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


function editMemory(memoryId) {

    const memories =
        JSON.parse(
            localStorage.getItem("privateAtlasAtlas")
        ) || [];


    const memory =
        memories.find(
            item => item.id === memoryId
        );


    if (!memory) return;


    editingMemoryId =
        memoryId;


    document
        .getElementById("memory-city")
        .value =
            memory.city || "";


    document
        .getElementById("memory-title")
        .value =
            memory.title || "";


    document
        .getElementById("memory-description")
        .value =
            memory.description || "";


    document
        .getElementById("memory-date")
        .value =
            memory.date || "";


    memoryFormContainer
        .classList
        .add("active");

}


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

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;
}

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