/* =========================================
   NAVEGACIÓN ENTRE SECCIONES
========================================= */

const sectionButtons = document.querySelectorAll(".section-button");
const journalSections = document.querySelectorAll(".journal-section");


sectionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const sectionName = button.dataset.section;


        /* Cambiar botón activo */

        sectionButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");


        /* Cambiar sección */

        journalSections.forEach(section => {
            section.classList.remove("active-section");
        });


        const selectedSection =
            document.getElementById(sectionName);


        if (selectedSection) {
            selectedSection.classList.add("active-section");
        }

    });

});


/* =========================================
   SELECCIÓN DE EMOCIONES
========================================= */

const emotionButtons =
    document.querySelectorAll(".emotion");

const selectedMood =
    document.getElementById("selectedMood");


emotionButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Quitar selección anterior */

        emotionButtons.forEach(item => {
            item.classList.remove("selected");
        });


        /* Seleccionar emoción */

        button.classList.add("selected");


        /* Obtener nombre */

        const mood =
            button.dataset.mood;


        /* Mostrar en el diario */

        if (selectedMood) {
            selectedMood.textContent = mood;
        }

    });

});


/* =========================================
   GUARDAR RECUERDO
========================================= */

const saveButton =
    document.getElementById("saveButton");

const journalText =
    document.getElementById("journalText");


if (saveButton) {

    saveButton.addEventListener("click", () => {

        const text =
            journalText.value.trim();


        if (text === "") {

            alert(
                "Escribe algo en tu diario antes de guardar el recuerdo."
            );

            journalText.focus();

            return;
        }


        const mood =
            selectedMood
                ? selectedMood.textContent
                : "Sin emoción";


        const memory = {

            text: text,

            mood: mood,

            date: new Date().toLocaleDateString("es-CO")

        };


        localStorage.setItem(
            "privateAtlasJournal",
            JSON.stringify(memory)
        );


        saveButton.innerHTML =
            "<span>✦</span> Recuerdo guardado";


        saveButton.classList.add("saved");


        setTimeout(() => {

            saveButton.innerHTML =
                "<span>✦</span> Guardar recuerdo";

            saveButton.classList.remove("saved");

        }, 2500);

    });

}


/* =========================================
   CARGAR RECUERDO ANTERIOR
========================================= */

const savedMemory =
    localStorage.getItem("privateAtlasJournal");


if (savedMemory) {

    try {

        const memory =
            JSON.parse(savedMemory);


        if (journalText && memory.text) {
            journalText.value = memory.text;
        }


        if (selectedMood && memory.mood) {
            selectedMood.textContent = memory.mood;
        }


    } catch (error) {

        console.log(
            "No se pudo cargar el recuerdo."
        );

    }

}
