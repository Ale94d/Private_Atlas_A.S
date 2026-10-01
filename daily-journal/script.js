/* =========================================
   DAILY JOURNAL - PRIVATE ATLAS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTOS PRINCIPALES
    ========================================= */

    const journalText = document.getElementById("journalText");
    const saveButton = document.querySelector(".save-button");
    const moods = document.querySelectorAll(".mood");
    const addTagButton = document.querySelector(".add-tag");
    const tagsContainer = document.querySelector(".tags");
    const memoryButton = document.querySelector(".memory-box button");
    const searchInput = document.querySelector(".search-box input");
    const archiveList = document.querySelector(".archive-list");


    /* =========================================
       ESTADO ACTUAL
    ========================================= */

    let selectedMood = "";

    let tags = [
        "#hoy",
        "#recuerdo"
    ];


    /* =========================================
       SELECCIONAR ESTADO DE ÁNIMO
    ========================================= */

    moods.forEach((mood) => {

        mood.addEventListener("click", () => {

            moods.forEach((item) => {
                item.classList.remove("selected");
            });

            mood.classList.add("selected");

            selectedMood = mood.textContent.trim();

        });

    });


    /* =========================================
       AÑADIR ETIQUETA
    ========================================= */

    addTagButton.addEventListener("click", () => {

        const newTag = prompt("Escribe una nueva etiqueta:");

        if (!newTag) {
            return;
        }

        let formattedTag = newTag.trim();

        if (!formattedTag.startsWith("#")) {
            formattedTag = "#" + formattedTag;
        }

        tags.push(formattedTag);

        renderTags();

    });


    /* =========================================
       MOSTRAR ETIQUETAS
    ========================================= */

    function renderTags() {

        tagsContainer.innerHTML = "";

        tags.forEach((tag) => {

            const tagElement = document.createElement("span");

            tagElement.classList.add("tag");

            tagElement.textContent = tag;

            tagsContainer.appendChild(tagElement);

        });


        const button = document.createElement("button");

        button.classList.add("add-tag");

        button.type = "button";

        button.textContent = "+ añadir";

        button.addEventListener("click", () => {

            const newTag = prompt("Escribe una nueva etiqueta:");

            if (!newTag) {
                return;
            }

            let formattedTag = newTag.trim();

            if (!formattedTag.startsWith("#")) {
                formattedTag = "#" + formattedTag;
            }

            tags.push(formattedTag);

            renderTags();

        });

        tagsContainer.appendChild(button);

    }


    /* =========================================
       GUARDAR RECUERDO
    ========================================= */

    saveButton.addEventListener("click", () => {

        const text = journalText.value.trim();


        if (text === "") {

            alert("Escribe algo en tu diario antes de guardar tu recuerdo.");

            journalText.focus();

            return;

        }


        const today = new Date();


        const entry = {

            text: text,

            mood: selectedMood || "Sin emoción seleccionada",

            tags: [...tags],

            date: today.toLocaleDateString("es-CO"),

            timestamp: today.getTime()

        };


        /* Guardar en navegador */

        localStorage.setItem(
            "privateAtlasJournal",
            JSON.stringify(entry)
        );


        /* Cambiar apariencia del botón */

        saveButton.classList.add("saved");

        saveButton.innerHTML = "✦ Recuerdo guardado";


        /* Agregar al archivo */

        addArchiveEntry(entry);


        /* Volver al estado normal después de un momento */

        setTimeout(() => {

            saveButton.classList.remove("saved");

            saveButton.innerHTML = "<span>✦</span> Guardar recuerdo";

        }, 2500);

    });


    /* =========================================
       AGREGAR REGISTRO AL ARCHIVO
    ========================================= */

    function addArchiveEntry(entry) {

        const archiveItem = document.createElement("div");

        archiveItem.classList.add("archive-item");


        const date = document.createElement("span");

        date.classList.add("archive-date");

        date.textContent = "HOY";


        const content = document.createElement("div");


        const title = document.createElement("strong");

        title.textContent = "Nuevo recuerdo";


        const small = document.createElement("small");

        small.textContent = entry.mood;


        content.appendChild(title);

        content.appendChild(small);


        archiveItem.appendChild(date);

        archiveItem.appendChild(content);


        archiveList.prepend(archiveItem);

    }


    /* =========================================
       CARGAR RECUERDO GUARDADO
    ========================================= */

    const savedEntry = localStorage.getItem("privateAtlasJournal");


    if (savedEntry) {

        try {

            const entry = JSON.parse(savedEntry);

            journalText.value = entry.text;


            if (entry.mood) {

                moods.forEach((mood) => {

                    if (
                        mood.textContent.trim() === entry.mood
                    ) {

                        mood.classList.add("selected");

                        selectedMood = entry.mood;

                    }

                });

            }

        } catch (error) {

            console.log("No se pudo cargar el recuerdo.");

        }

    }


    /* =========================================
       BOTÓN "VER RECUERDOS"
    ========================================= */

    memoryButton.addEventListener("click", () => {

        const saved = localStorage.getItem(
            "privateAtlasJournal"
        );


        if (!saved) {

            alert("Todavía no tienes recuerdos guardados.");

            return;

        }


        const entry = JSON.parse(saved);


        alert(
            "Tu último recuerdo:\n\n" +
            entry.text +
            "\n\nEstado de ánimo: " +
            entry.mood
        );

    });


    /* =========================================
       BUSCADOR
    ========================================= */

    searchInput.addEventListener("input", () => {

        const search = searchInput.value
            .toLowerCase()
            .trim();


        const archiveItems =
            document.querySelectorAll(".archive-item");


        archiveItems.forEach((item) => {

            const text =
                item.textContent.toLowerCase();


            if (text.includes(search)) {

                item.style.display = "flex";

            } else {

                item.style.display = "none";

            }

        });

    });


    /* =========================================
       INICIALIZAR ETIQUETAS
    ========================================= */

    renderTags();

});
