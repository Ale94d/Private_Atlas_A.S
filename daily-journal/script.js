/* =========================================
   NAVEGACIÓN ENTRE SECCIONES
========================================= */

const sectionButtons = document.querySelectorAll(".section-button");
const journalSections = document.querySelectorAll(".journal-section");

sectionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const sectionName = button.dataset.section;

        sectionButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        journalSections.forEach(section => {
            section.classList.remove("active-section");
        });

        const selectedSection = document.getElementById(sectionName);

        if (selectedSection) {
            selectedSection.classList.add("active-section");
        }
    });
});


/* =========================================
   ELEMENTOS DEL DIARIO
========================================= */

const emotionButtons = document.querySelectorAll(".emotion");
const selectedMood = document.getElementById("selectedMood");
const journalText = document.getElementById("journalText");
const saveButton = document.getElementById("saveButton");

const STORAGE_KEY = "privateAtlasJournalMemories";

let selectedEmotion = "Sin emoción";


/* =========================================
   SELECCIÓN DE EMOCIONES
========================================= */

emotionButtons.forEach(button => {
    button.addEventListener("click", () => {
        emotionButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedEmotion = button.dataset.mood;

        if (selectedMood) {
            selectedMood.textContent = selectedEmotion;
        }
    });
});


/* =========================================
   OBTENER LOS RECUERDOS GUARDADOS
========================================= */

function getMemories() {
    try {
        const memories = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        return Array.isArray(memories) ? memories : [];
    } catch (error) {
        console.error("Error al leer los recuerdos:", error);
        return [];
    }
}


/* =========================================
   GUARDAR UN NUEVO RECUERDO
========================================= */

if (saveButton && journalText) {
    saveButton.addEventListener("click", () => {
        const text = journalText.value.trim();

        if (!text) {
            alert("Escribe algo en tu diario antes de guardar.");
            journalText.focus();
            return;
        }

        const memory = {
            id: Date.now(),
            text: text,
            mood: selectedEmotion,
            date: new Date().toLocaleDateString("es-CO"),
            createdAt: new Date().toISOString()
        };

        try {
            const memories = getMemories();

            memories.push(memory);

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(memories)
            );

            saveButton.innerHTML =
                "<span>✦</span> Recuerdo guardado";

            saveButton.classList.add("saved");

            alert("¡Tu recuerdo se guardó correctamente!");

            console.log("Recuerdos guardados:", getMemories());

            setTimeout(() => {
                saveButton.innerHTML =
                    "<span>✦</span> Guardar recuerdo";

                saveButton.classList.remove("saved");
            }, 2500);

        } catch (error) {
            console.error("No se pudo guardar el recuerdo:", error);

            alert(
                "No se pudo guardar el recuerdo. Revisa el almacenamiento del navegador."
            );
        }
    });
}


/* =========================================
   RECUPERAR LOS RECUERDOS AL ABRIR LA PÁGINA
========================================= */

function loadLastMemory() {
    const memories = getMemories();

    if (memories.length === 0) {
        return;
    }

    const lastMemory = memories[memories.length - 1];

    if (journalText) {
        journalText.value = lastMemory.text;
    }

    selectedEmotion = lastMemory.mood || "Sin emoción";

    if (selectedMood) {
        selectedMood.textContent = selectedEmotion;
    }

    emotionButtons.forEach(button => {
        button.classList.toggle(
            "selected",
            button.dataset.mood === selectedEmotion
        );
    });
}

loadLastMemory();
