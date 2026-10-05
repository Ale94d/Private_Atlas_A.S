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

const searchButton = document.querySelector(".search-btn");
const favoriteButton = document.querySelector(".favorite-btn");
const memoryButton = document.querySelector(".memory-btn");
const backHome = document.querySelector(".back-home");

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

let svgDocument = null;
let svgRoot = null;

const MIN_SCALE = 0.65;
const MAX_SCALE = 4;

function updateMapTransform() {
    if (!mapContainer) return;

    mapContainer.style.transform =
        `translate3d(${mapX}px, ${mapY}px, 0) scale(${scale})`;
}

function resetMap() {
    mapX = 0;
    mapY = 0;
    scale = 1;
    updateMapTransform();
}

if (backHome) {
    backHome.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
}

function getMemories() {
    try {
        return JSON.parse(
            localStorage.getItem("privateAtlasAtlas")
        ) || [];
    } catch (error) {
        return [];
    }
}

function saveMemories(memories) {
    localStorage.setItem(
        "privateAtlasAtlas",
        JSON.stringify(memories)
    );
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function startMapDrag(event) {
    if (!event.isPrimary) return;

    isDragging = true;
    hasMoved = false;

    startPointerX = event.clientX;
    startPointerY = event.clientY;

    startMapX = mapX;
    startMapY = mapY;

    if (svgRoot) {
        svgRoot.style.cursor = "grabbing";
    }
}

function moveMapDrag(event) {
    if (!isDragging || !event.isPrimary) return;

    const deltaX = event.clientX - startPointerX;
    const deltaY = event.clientY - startPointerY;

    if (
        Math.abs(deltaX) > 5 ||
        Math.abs(deltaY) > 5
    ) {
        hasMoved = true;
    }

    mapX = startMapX + deltaX;
    mapY = startMapY + deltaY;

    updateMapTransform();

    if (hasMoved) {
        event.preventDefault();
    }
}

function endMapDrag() {
    if (!isDragging) return;

    isDragging = false;

    if (svgRoot) {
        svgRoot.style.cursor = "grab";
    }

    setTimeout(() => {
        hasMoved = false;
    }, 80);
}

function zoomMap(event) {
    event.preventDefault();

    if (!mapContainer) return;

    const rect = mapContainer.getBoundingClientRect();

    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;

    const worldX =
        (cursorX - mapX) / scale;

    const worldY =
        (cursorY - mapY) / scale;

    const zoomFactor =
        event.deltaY < 0
            ? 1.12
            : 0.89;

    const newScale =
        clamp(
            scale * zoomFactor,
            MIN_SCALE,
            MAX_SCALE
        );

    mapX =
        cursorX -
        worldX * newScale;

    mapY =
        cursorY -
        worldY * newScale;

    scale = newScale;

    updateMapTransform();
}

function initializeMapControls() {
    if (!worldMap) return;

    svgDocument = worldMap.contentDocument;

    if (!svgDocument) {
        setTimeout(initializeMapControls, 250);
        return;
    }

    svgRoot = svgDocument.documentElement;

    if (!svgRoot) return;

    svgRoot.style.cursor = "grab";
    svgRoot.style.touchAction = "none";
    svgRoot.style.userSelect = "none";

    applyAtlasMapTheme();

    svgRoot.addEventListener(
        "pointerdown",
        startMapDrag
    );

    svgRoot.addEventListener(
        "pointermove",
        moveMapDrag
    );

    svgRoot.addEventListener(
        "pointerup",
        endMapDrag
    );

    svgRoot.addEventListener(
        "pointercancel",
        endMapDrag
    );

    svgRoot.addEventListener(
        "wheel",
        zoomMap,
        {
            passive: false
        }
    );

    svgRoot.addEventListener(
        "dblclick",
        (event) => {
            event.preventDefault();
            resetMap();
        }
    );

    initializeCountries();
}

if (worldMap) {
    worldMap.addEventListener(
        "load",
        initializeMapControls
    );

    setTimeout(
        initializeMapControls,
        300
    );
}

fuction applyAtlasMapTheme(){
    if(!svgDocument || !svgRoot)
        retrun;

    let styleTag =
    svgDocument.getElementById
    ("private-atlas-map-style");

    if(!styleTag) {
        styleTag = svgDocument.createElement(
            "http://www.w3.org/2000/svg","style"
        );

        styleTag.id =
        "private-atlas-map-style";

        svgRoot.appendChild(styleTag);
    }

    styleTag.textContent = `
        path{
            fill: #C7A875 !important;
            stroke: #765238 !inportant;
            stroke-width: .7;
            vector-effect: non-scaling-stroke;
            transition:
                fill .2s ease,
                filter .2s ease,
                opacity .2ws ease;
            }

        path:hover {
            fill: #D9BC89 !inportant;
            filter: 
                drop-shadow(0 0 4px rgba(91,55,28,.45)
                );
            }
                `;
}
function initializeCountries() {
    if (!svgDocument) return;

    const countries =
        svgDocument.querySelectorAll(
            "path[id], path[class]"
        );

    countries.forEach((country) => {
        if (country.dataset.atlasReady === "true") {
            return;
        }

        country.dataset.atlasReady = "true";

        country.style.cursor = "pointer";
        country.style.transition =
            "filter 0.2s ease, opacity 0.2s ease";

        country.addEventListener(
            "mouseenter",
            () => {
                country.style.filter =
                    "brightness(1.18) saturate(1.08) 
                    drop-shadow(0 0 5ox rgba(116,76,42,.45))";
            }
        );

        country.addEventListener(
            "mouseleave",
            () => {
                if (
                    country !==
                    selectedCountryElement
                ) {
                    country.style.filter = "";
                }
            }
        );

        country.addEventListener(
            "click",
            (event) => {
                event.stopPropagation();

                if (hasMoved) {
                    return;
                }

                selectCountry(country);
            }
        );
    });
}

function selectCountry(country) {
    if (!country) return;

    if (
        selectedCountryElement &&
        selectedCountryElement !== country
    ) {
        selectedCountryElement.style.filter = "";
    }

    selectedCountryElement = country;

    selectedCountryCode =
        country.getAttribute("id");

    country.style.filter =
        "brightness(1.2) saturate(1.1)";

    function getCountryKey(country){
        if(!country) return "";

        return (
            country.getAttribute("id")||
            country.getAttribute("name")||
            country.getAttribute("class")||
            ""
        ).trim();
    }

    function normalizeCountryLabel(value){
        return String(value || "")
        .trim()
        .replace(/\s+/g,"");
    }
    
    const name =
        getCountryName(
            selectedCountryCode
        );

    if (selectedCountry) {
        selectedCountry.classList.remove(
            "active"
        );
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
            normalizeCountryLabel(
                selectedCountryElement.getAttribute("name")
            )
        );
    }

    if (countryNames[code]) {
        return countryNames[code];
    }

    const className =
        selectedCountryElement
            ? selectedCountryElement.getAttribute("class")
            : "";

    const normalizedClass =
        normalizeCountryLabel(className);

    return (
        countryNames[normalizedClass] ||
        translateCountryName(normalizedClass) ||
        className ||
        code
    );
}

const countryNames = {
    AF: "Afganistán",
    AL: "Albania",
    DZ: "Argelia",
    AD: "Andorra",
    AO: "Angola",
    AR: "Argentina",
    AM: "Armenia",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaiyán",
    BS: "Bahamas",
    BH: "Baréin",
    BD: "Bangladés",
    BB: "Barbados",
    BY: "Bielorrusia",
    BE: "Bélgica",
    BZ: "Belice",
    BJ: "Benín",
    BT: "Bután",
    BO: "Bolivia",
    BA: "Bosnia y Herzegovina",
    BW: "Botsuana",
    BR: "Brasil",
    BN: "Brunéi",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Camboya",
    CM: "Camerún",
    CA: "Canadá",
    CV: "Cabo Verde",
    CF: "República Centroafricana",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CO: "Colombia",
    CG: "Congo",
    CD: "República Democrática del Congo",
    CR: "Costa Rica",
    CI: "Costa de Marfil",
    HR: "Croacia",
    CU: "Cuba",
    CY: "Chipre",
    CZ: "Chequia",
    DK: "Dinamarca",
    DJ: "Yibuti",
    DM: "Dominica",
    DO: "República Dominicana",
    EC: "Ecuador",
    EG: "Egipto",
    SV: "El Salvador",
    GQ: "Guinea Ecuatorial",
    ER: "Eritrea",
    EE: "Estonia",
    SZ: "Esuatini",
    ET: "Etiopía",
    FJ: "Fiyi",
    FI: "Finlandia",
    FR: "Francia",
    GA: "Gabón",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Alemania",
    GH: "Ghana",
    GR: "Grecia",
    GD: "Granada",
    GT: "Guatemala",
    GN: "Guinea",
    GW: "Guinea-Bisáu",
    GY: "Guyana",
    HT: "Haití",
    HN: "Honduras",
    HU: "Hungría",
    IS: "Islandia",
    IN: "India",
    ID: "Indonesia",
    IR: "Irán",
    IQ: "Irak",
    IE: "Irlanda",
    IL: "Israel",
    IT: "Italia",
    JM: "Jamaica",
    JP: "Japón",
    JO: "Jordania",
    KZ: "Kazajistán",
    KE: "Kenia",
    KI: "Kiribati",
    KW: "Kuwait",
    KG: "Kirguistán",
    LA: "Laos",
    LV: "Letonia",
    LB: "Líbano",
    LS: "Lesoto",
    LR: "Liberia",
    LY: "Libia",
    LI: "Liechtenstein",
    LT: "Lituania",
    LU: "Luxemburgo",
    MG: "Madagascar",
    MW: "Malaui",
    MY: "Malasia",
    MV: "Maldivas",
    ML: "Malí",
    MT: "Malta",
    MH: "Islas Marshall",
    MR: "Mauritania",
    MU: "Mauricio",
    MX: "México",
    FM: "Micronesia",
    MD: "Moldavia",
    MC: "Mónaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MA: "Marruecos",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Países Bajos",
    NZ: "Nueva Zelanda",
    NI: "Nicaragua",
    NE: "Níger",
    NG: "Nigeria",
    KP: "Corea del Norte",
    MK: "Macedonia del Norte",
    NO: "Noruega",
    OM: "Omán",
    PK: "Pakistán",
    PW: "Palaos",
    PA: "Panamá",
    PG: "Papúa Nueva Guinea",
    PY: "Paraguay",
    PE: "Perú",
    PH: "Filipinas",
    PL: "Polonia",
    PT: "Portugal",
    QA: "Catar",
    RO: "Rumania",
    RU: "Rusia",
    RW: "Ruanda",
    KN: "San Cristóbal y Nieves",
    LC: "Santa Lucía",
    VC: "San Vicente y las Granadinas",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Santo Tomé y Príncipe",
    SA: "Arabia Saudita",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leona",
    SG: "Singapur",
    SK: "Eslovaquia",
    SI: "Eslovenia",
    SB: "Islas Salomón",
    SO: "Somalia",
    ZA: "Sudáfrica",
    KR: "Corea del Sur",
    SS: "Sudán del Sur",
    ES: "España",
    LK: "Sri Lanka",
    SD: "Sudán",
    SR: "Surinam",
    SE: "Suecia",
    CH: "Suiza",
    SY: "Siria",
    TW: "Taiwán",
    TJ: "Tayikistán",
    TZ: "Tanzania",
    TH: "Tailandia",
    TL: "Timor Oriental",
    TG: "Togo",
    TO: "Tonga",
    TT: "Trinidad y Tobago",
    TN: "Túnez",
    TR: "Turquía",
    TM: "Turkmenistán",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ucrania",
    AE: "Emiratos Árabes Unidos",
    GB: "Reino Unido",
    US: "Estados Unidos",
    UY: "Uruguay",
    UZ: "Uzbekistán",
    VU: "Vanuatu",
    VA: "Ciudad del Vaticano",
    VE: "Venezuela",
    VN: "Vietnam",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabue"
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
        CapeVerde: "Cabo Verde",
        Chad: "Chad",
        Chile: "Chile",
        China: "China",
        Colombia: "Colombia",
        Congo: "Congo",
        CostaRica: "Costa Rica",
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
        memoryCountryName.textContent = name;
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

if (addMemoryBtn) {
    addMemoryBtn.addEventListener(
        "click",
        () => {
            editingMemoryId = null;

            if (memoryForm) {
                memoryForm.reset();
            }

            if (memoryFormContainer) {
                memoryFormContainer.classList.add(
                    "active"
                );
            }
        }
    );
}

if (closeMemory) {
    closeMemory.addEventListener(
        "click",
        () => {
            if (countryMemory) {
                countryMemory.classList.remove(
                    "active"
                );
            }
        }
    );
}

if (closeMemoryForm) {
    closeMemoryForm.addEventListener(
        "click",
        () => {
            if (memoryFormContainer) {
                memoryFormContainer.classList.remove(
                    "active"
                );
            }
        }
    );
}

if (memoryFormContainer) {
    memoryFormContainer.addEventListener(
        "click",
        (event) => {
            if (
                event.target ===
                memoryFormContainer
            ) {
                memoryFormContainer.classList.remove(
                    "active"
                );
            }
        }
    );
}

if (countryMemory) {
    countryMemory.addEventListener(
        "click",
        (event) => {
            if (
                event.target ===
                countryMemory
            ) {
                countryMemory.classList.remove(
                    "active"
                );
            }
        }
    );
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

            const memories = getMemories();

            const saveMemory = (image) => {
                if (editingMemoryId) {
                    const index =
                        memories.findIndex(
                            memory =>
                                memory.id ===
                                editingMemoryId
                        );

                    if (index !== -1) {
                        memories[index].city = city;
                        memories[index].title = title;
                        memories[index].description =
                            description;
                        memories[index].date = date;
                        memories[index].image = image;
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
                        image: image || "",
                        favorite: false
                    });
                }

                saveMemories(memories);

                editingMemoryId = null;

                if (memoryForm) {
                    memoryForm.reset();
                }

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

                reader.onload = () => {
                    saveMemory(
                        reader.result
                    );
                };

                reader.readAsDataURL(file);
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
                            oldMemory.image || "";
                    }
                }

                saveMemory(oldImage);
            }
        }
    );
}

function loadCountryMemories(countryCode) {
    if (!countryMemories) return;

    const memories = getMemories();

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

    countryList.forEach(
        memory => {
            const city =
                memory.city &&
                memory.city.trim()
                    ? memory.city.trim()
                    : "Sin ciudad";

            if (!cities[city]) {
                cities[city] = [];
            }

            cities[city].push(memory);
        }
    );

    Object.keys(cities).forEach(
        city => {
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

    previous.type = "button";
    previous.className =
        "carousel-arrow carousel-prev";

    previous.innerHTML =
        `<i class="icon-chevron-left"></i>`;

    const next =
        document.createElement(
            "button"
        );

    next.type = "button";
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
        memory => {
            track.appendChild(
                createMemoryCard(memory)
            );
        }
    );

    viewport.appendChild(track);

    carousel.appendChild(previous);
    carousel.appendChild(viewport);
    carousel.appendChild(next);

    section.appendChild(title);
    section.appendChild(carousel);

    countryMemories.appendChild(section);

    let position = 0;

    function getStep() {
        const card =
            track.querySelector(
                ".memory-card"
            );

        if (!card) {
            return 250;
        }

        const style =
            window.getComputedStyle(
                track
            );

        const gap =
            parseFloat(
                style.columnGap ||
                style.gap ||
                "30"
            ) || 30;

        return (
            card.getBoundingClientRect()
                .width + gap
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
            clamp(
                position,
                0,
                maxPosition
            );

        track.style.transform =
            `translate3d(-${position}px, 0, 0)`;
    }

    previous.addEventListener(
        "click",
        event => {
            event.stopPropagation();

            position -= getStep();

            updateCarousel();
        }
    );

    next.addEventListener(
        "click",
        event => {
            event.stopPropagation();

            position += getStep();

            updateCarousel();
        }
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
        event => {
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

    const favoriteMemoryButton =
        card.querySelector(
            ".favorite-memory"
        );

    if (favoriteMemoryButton) {
        favoriteMemoryButton.addEventListener(
            "click",
            event => {
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
            event => {
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
            event => {
                event.stopPropagation();

                deleteMemory(
                    memory.id
                );
            }
        );
    }

    return card;
}

function toggleFavorite(memoryId) {
    const memories = getMemories();

    const memory =
        memories.find(
            item =>
                item.id ===
                memoryId
        );

    if (!memory) return;

    memory.favorite =
        !memory.favorite;

    saveMemories(memories);

    if (selectedCountryCode) {
        loadCountryMemories(
            selectedCountryCode
        );
    }
}

function editMemory(memoryId) {
    const memories = getMemories();

    const memory =
        memories.find(
            item =>
                item.id ===
                memoryId
        );

    if (!memory) return;

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
            memory.city || "";
    }

    if (titleInput) {
        titleInput.value =
            memory.title || "";
    }

    if (descriptionInput) {
        descriptionInput.value =
            memory.description || "";
    }

    if (dateInput) {
        dateInput.value =
            memory.date || "";
    }

    if (memoryFormContainer) {
        memoryFormContainer.classList.add(
            "active"
        );
    }
}

function deleteMemory(memoryId) {
    const memories = getMemories();

    const updatedMemories =
        memories.filter(
            memory =>
                memory.id !==
                memoryId
        );

    saveMemories(
        updatedMemories
    );

    if (selectedCountryCode) {
        loadCountryMemories(
            selectedCountryCode
        );
    }
}

function showFavoriteMemories() {
    const memories = getMemories();

    const favorites =
        memories.filter(
            memory =>
                memory.favorite
        );

    if (favorites.length === 0) {
        alert(
            "Todavía no tienes recuerdos favoritos."
        );
        return;
    }

    const grouped = {};

    favorites.forEach(
        memory => {
            if (!grouped[memory.country]) {
                grouped[memory.country] = [];
            }

            grouped[memory.country].push(
                memory
            );
        }
    );

    let message =
        "✦ TUS RECUERDOS FAVORITOS ✦\n\n";

    Object.keys(grouped).forEach(
        country => {
            const countryTitle =
                countryNames[country] ||
                country;

            message +=
                `${countryTitle}\n`;

            grouped[country].forEach(
                memory => {
                    message +=
                        `• ${
                            memory.city ||
                            "Sin ciudad"
                        } — ${
                            memory.title ||
                            "Sin título"
                        }\n`;
                }
            );

            message += "\n";
        }
    );

    alert(message);
}

if (searchButton) {
    searchButton.addEventListener(
        "click",
        () => {
            const country =
                prompt(
                    "Escribe el nombre del país que quieres buscar:"
                );

            if (!country) return;

            const search =
                country
                    .trim()
                    .toLowerCase();

            if (!worldMap) return;

            const documentMap =
                worldMap.contentDocument;

            if (!documentMap) return;

            const countries =
                documentMap.querySelectorAll(
                    "path[id]"
                );

            let foundCountry =
                null;

            countries.forEach(
                countryElement => {
                    if (foundCountry) return;

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
                            .toLowerCase() ===
                            search
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

if (favoriteButton) {
    favoriteButton.addEventListener(
        "click",
        event => {
            event.stopPropagation();

            showFavoriteMemories();
        }
    );
}

if (memoryButton) {
    memoryButton.addEventListener(
        "click",
        event => {
            event.stopPropagation();

            if (!selectedCountryCode) {
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

function escapeHTML(text) {
    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text || "";

    return div.innerHTML;
}

document.addEventListener(
    "keydown",
    event => {
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

            return;
        }
    }
);

updateMapTransform();