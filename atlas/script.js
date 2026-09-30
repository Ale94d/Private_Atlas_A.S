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

memoryForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!selectedCountryCode) return;

    const title =
        document.getElementById("memory-title").value.trim();

    const description =
        document.getElementById("memory-description").value.trim();

    const date =
        document.getElementById("memory-date").value;

    const imageInput =
        document.getElementById("memory-image");

    const file =
        imageInput.files[0];


    const saveMemory = (image = "") => {

        const memories =
            JSON.parse(
                localStorage.getItem("privateAtlasAtlas")
            ) || [];


        const newMemory = {

            id: Date.now(),

            country: selectedCountryCode,

            title,

            description,

            date,

            image

        };


        memories.push(newMemory);


        localStorage.setItem(
            "privateAtlasAtlas",
            JSON.stringify(memories)
        );


        memoryFormContainer.classList.remove("active");

        loadCountryMemories(
            selectedCountryCode
        );

    };


    if (file) {

        const reader = new FileReader();

        reader.onload = () => {

            saveMemory(reader.result);

        };

        reader.readAsDataURL(file);

    } else {

        saveMemory();

    }

});