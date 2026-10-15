
/* =========================================
   NAVEGACIÓN ENTRE SECCIONES
========================================= */

const sectionButtons = document.querySelectorAll(".section-button");
const journalSections = document.querySelectorAll(".journal-section");

sectionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const sectionName = button.dataset.section;

        sectionButtons.forEach(item => item.classList.remove("active"));
        journalSections.forEach(section => section.classList.remove("active-section"));

        button.classList.add("active");

        const selectedSection = document.getElementById(sectionName);

        if (selectedSection) {
            selectedSection.classList.add("active-section");
        }
    });
});


/* =========================================
   SELECCIÓN DE EMOCIONES
========================================= */

const emotionButtons = document.querySelectorAll(".emotion");
const selectedMood = document.getElementById("selectedMood");

let selectedEmotion = "";

emotionButtons.forEach(button => {
    button.addEventListener("click", () => {
        emotionButtons.forEach(item => item.classList.remove("selected"));

        button.classList.add("selected");

        selectedEmotion = button.dataset.mood || "";

        if (selectedMood) {
            selectedMood.textContent = selectedEmotion;
        }
    });
});


/* =========================================
   ELEMENTOS DEL DIARIO
========================================= */

const saveButton = document.getElementById("saveButton");
const journalText = document.getElementById("journalText");
const memoriesList = document.getElementById("memoriesList");

const STORAGE_KEY = "privateAtlasMemories";
const OLD_STORAGE_KEY = "privateAtlasJournal";


/* =========================================
   CARGAR RECUERDOS GUARDADOS
========================================= */

function loadMemories() {
    try {
        const storedMemories = localStorage.getItem(STORAGE_KEY);

        if (storedMemories !== null) {
            const parsed = JSON.parse(storedMemories);
            return Array.isArray(parsed) ? parsed : [];
        }

        // Intentar recuperar el recuerdo del sistema anterior.
        const oldSavedMemory = localStorage.getItem(OLD_STORAGE_KEY);

        if (oldSavedMemory) {
            const oldMemory = JSON.parse(oldSavedMemory);

            if (oldMemory && oldMemory.text) {
                const migratedMemory = [{
                    id: Date.now(),
                    text: oldMemory.text,
                    mood: oldMemory.mood || "Sin emoción",
                    date: oldMemory.date || ""
                }];

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(migratedMemory)
                );

                return migratedMemory;
            }
        }
    } catch (error) {
        console.error("Error al cargar los recuerdos:", error);
    }

    return [];
}

let memories = loadMemories();


/* =========================================
   MOSTRAR RECUERDOS GUARDADOS
========================================= */

function renderMemories() {
    if (!memoriesList) return;

    memoriesList.replaceChildren();

    if (memories.length === 0) {
        const message = document.createElement("p");

        message.className = "empty-memories";
        message.textContent =
            "Aquí aparecerán los recuerdos que guardes.";

        memoriesList.appendChild(message);
        return;
    }

    [...memories].reverse().forEach(memory => {
        const card = document.createElement("article");
        card.className = "memory-entry";

        const date = document.createElement("p");
        date.className = "memory-entry-date";
        date.textContent = memory.date || "Fecha no disponible";

        const mood = document.createElement("p");
        mood.className = "memory-entry-mood";
        mood.textContent = "Estado de ánimo: " +
            (memory.mood || "Sin emoción");

        const text = document.createElement("p");
        text.className = "memory-entry-text";
        text.textContent = memory.text;

        card.append(date, mood, text);
        memoriesList.appendChild(card);
    });
}


/* =========================================
   GUARDAR RECUERDO
========================================= */

if (saveButton && journalText) {
    saveButton.addEventListener("click", () => {
        const text = journalText.value.trim();

        if (!text) {
            alert("Escribe algo en tu diario antes de guardar el recuerdo.");
            journalText.focus();
            return;
        }

        const memory = {
            id: Date.now(),
            text: text,
            mood: selectedEmotion || "Sin emoción",
            date: new Date().toLocaleDateString("es-CO")
        };

        memories.push(memory);

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(memories)
            );

            // Actualizar la lista después de guardar.
            renderMemories();

            saveButton.innerHTML =
                "<span>✦</span> Recuerdo guardado";

            saveButton.classList.add("saved");

            // Preparar el diario para un nuevo recuerdo.
            journalText.value = "";
            selectedEmotion = "";

            if (selectedMood) {
                selectedMood.textContent = "Selecciona una emoción";
            }

            emotionButtons.forEach(button => {
                button.classList.remove("selected");
            });

            setTimeout(() => {
                saveButton.innerHTML =
                    "<span>✦</span> Guardar recuerdo";

                saveButton.classList.remove("saved");
            }, 2500);

        } catch (error) {
            memories.pop();

            console.error("No se pudo guardar el recuerdo:", error);

            alert(
                "No se pudo guardar el recuerdo. Comprueba el almacenamiento del navegador."
            );
        }
    });
}


/* =========================================
   INICIAR LA PÁGINA
========================================= */

renderMemories();
