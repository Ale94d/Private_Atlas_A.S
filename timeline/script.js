document.addEventListener("DOMContentLoaded", () => {
  const entrance = document.querySelector("#entrance-screen");
  const enterButton = document.querySelector("#enter-button");
  const gallery = document.querySelector("#timeline-container");
  const homeButton = document.querySelector("#back-home");
  const grid = document.querySelector("#achievement-grid");

  const achievementModal = document.querySelector("#achievement-modal");
  const premiumModal = document.querySelector("#premium-modal");
  const puzzleModal = document.querySelector("#puzzle-modal");

  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const unlockedCount = document.querySelector("#unlocked-count");

  const modalNumber = document.querySelector("#modal-number");
  const modalTitle = document.querySelector("#modal-title");
  const modalDescription = document.querySelector("#modal-description");
  const modalHint = document.querySelector("#modal-hint");
  const modalReward = document.querySelector("#modal-reward");
  const modalProgressText = document.querySelector("#modal-progress-text");
  const modalProgressFill = document.querySelector("#modal-progress-fill");

  const puzzleTitle = document.querySelector("#puzzle-title");

  const freeAchievements = [
    ["Cambio Mental", "Explora cómo cambian tus emociones con el tiempo.", "A veces, volver a mirar un día anterior revela algo nuevo."],
    ["Código Emocional", "Descubre un código secreto.", "Las respuestas pueden estar escondidas en tus registros."],
    ["Más Allá", "Completa un lugar en Atlas.", "Un espacio puede guardar más de lo que parece."],
    ["Lugar Completo", "Reúne distintos contenidos en Atlas.", "Explora las opciones disponibles dentro de un mismo lugar."],
    ["Conexión Natural", "Conecta dos espacios de la plataforma.", "Dos caminos distintos pueden cruzarse."],
    ["Mirada Interna", "Vuelve a encontrar una emoción en Timeline.", "Algunas emociones dejan una huella que vale la pena visitar."],
    ["Baúl Variado", "Construye una colección diversa.", "Prueba reunir elementos de distintos tipos."],
    ["Ruta Insólita", "Explora lugares de categorías diferentes.", "No te quedes siempre en el mismo camino."],
    ["Regreso Temporal", "Regresa a un recuerdo después de un tiempo.", "El tiempo también forma parte de la pista."],
    ["Marca Personal", "Personaliza uno de tus espacios.", "Haz que un lugar se sienta más tuyo."],
    ["Ida y Vuelta", "Utiliza una experiencia en dos funciones diferentes.", "Una misma experiencia puede servir para más de una cosa."],
    ["Pieza Oculta", "Encuentra un fragmento escondido.", "Mira con atención los detalles de la plataforma."],
    ["Llave Perdida", "Descubre dónde utilizar una llave secreta.", "Encontrar la llave es solo la mitad del desafío."],
    ["Doble Jornada", "Registra dos emociones durante un mismo día.", "Dos momentos del mismo día pueden contar una historia."],
    ["Mente Curiosa", "Descubre una interacción especial.", "Prueba interactuar con elementos que normalmente pasas por alto."],
    ["Detalles Importan", "Completa los detalles adicionales de un registro.", "A veces, el último campo es el que cuenta."],
    ["Falsa Decoración", "Descubre una interacción oculta en un elemento visual.", "No todo lo que parece decoración está ahí solo para verse bonito."],
    ["Fragmentos Unidos", "Reúne las piezas de un rompecabezas gratuito.", "Cada pieza te acerca un poco más a la imagen completa."],
    ["Combinación Secreta", "Descubre una combinación oculta entre dos funciones.", "Prueba relacionar dos herramientas distintas."],
    ["Atlas Oculto", "Encuentra una función escondida dentro de Atlas.", "Explora con calma los espacios de Atlas."],
    ["Tres Coincidencias", "Descubre una combinación de tres elementos independientes.", "La pista está en conectar tres cosas que parecen separadas."],
    ["Huella Temporal", "Conecta registros relacionados de distintos momentos.", "Busca un hilo que atraviese más de un día."],
    ["Última Cerradura", "Encuentra una cerradura secreta y descubre cómo abrirla.", "La última cerradura puede depender de algo que ya encontraste."],
    ["Imagen Revelada", "Completa un rompecabezas y descubre su imagen.", "Sigue reuniendo piezas para ver el resultado."],
    ["Maestro Atlas", "Completa todos los logros gratuitos de Private Atlas.", "Este logro reúne todo lo que has descubierto."]
  ];

  const premiumNames = Array.from(
    { length: 25 },
    (_, index) => `Logro Premium ${String(index + 1).padStart(2, "0")}`
  );

  const storageKey = "privateAtlasTimelineProgress";
  let progressData = {};

  try {
    progressData = JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    progressData = {};
  }

  function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(progressData));
  }

  function addPremiumCards() {
    if (!grid) return;

    for (let number = 26; number <= 50; number += 1) {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "achievement-card premium-item";
      card.dataset.achievement = String(number);
      card.dataset.premium = "true";
      card.dataset.unlocked = "false";
      card.dataset.progress = "0";
      card.innerHTML = `
        <span class="card-number">${String(number).padStart(2, "0")}</span>
        <span class="card-name">${premiumNames[number - 26]}</span>
        <span class="card-progress-label">Contenido Premium</span>
        <span class="progress-track"><span class="progress-fill"></span></span>
      `;
      grid.appendChild(card);
    }
  }

  function getCards() {
    return [...document.querySelectorAll(".achievement-card")];
  }

  function updateCount() {
    const count = getCards().filter(
      card => card.dataset.unlocked === "true" && card.dataset.premium !== "true"
    ).length;

    if (unlockedCount) unlockedCount.textContent = count;
  }

  function applyFilter(filter = "all") {
    getCards().forEach(card => {
      const isPremium = card.dataset.premium === "true";
      const isUnlocked = card.dataset.unlocked === "true";

      let show = true;
      if (filter === "unlocked") show = isUnlocked && !isPremium;
      if (filter === "locked") show = !isUnlocked && !isPremium;
      if (filter === "premium") show = isPremium;

      card.hidden = !show;
    });

    filterButtons.forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function setModal(modal, open) {
    if (!modal) return;
    modal.classList.toggle("active", open);
    modal.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle(
      "modal-open",
      Boolean(document.querySelector(".modal.active"))
    );
  }

  function closeModals() {
    [achievementModal, premiumModal, puzzleModal].forEach(modal => {
      if (modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
      }
    });
    document.body.classList.remove("modal-open");
  }

  function openAchievement(card) {
    const number = Number(card.dataset.achievement);
    const achievement = freeAchievements[number - 1];
    const progress = Math.max(0, Math.min(100, Number(card.dataset.progress) || 0));

    if (!achievement) return;

    modalNumber.textContent = `LOGRO ${String(number).padStart(2, "0")}`;
    modalTitle.textContent = achievement[0];
    modalDescription.textContent = achievement[1];
    modalHint.textContent = achievement[2];
    modalReward.textContent = card.dataset.unlocked === "true"
      ? "Has descubierto esta recompensa."
      : "Hay una recompensa esperando cuando completes el desafío.";
    modalProgressText.textContent = `${progress}%`;
    modalProgressFill.style.width = `${progress}%`;

    setModal(achievementModal, true);
  }

  function restoreProgress() {
    getCards().forEach(card => {
      const saved = progressData[card.dataset.achievement];
      if (!saved) return;

      card.dataset.progress = String(saved.progress || 0);
      card.dataset.unlocked = String(Boolean(saved.unlocked));

      const fill = card.querySelector(".progress-fill");
      if (fill) fill.style.width = `${saved.progress || 0}%`;
    });

    updateCount();
  }

  function openEntrance() {
    closeModals();
    gallery.classList.add("is-hidden");
    gallery.setAttribute("aria-hidden", "true");
    entrance.classList.remove("is-hidden", "is-opening");
    enterButton.disabled = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (grid) addPremiumCards();
  restoreProgress();

  enterButton?.addEventListener("click", () => {
    if (!entrance || !gallery) return;

    enterButton.disabled = true;
    entrance.classList.add("is-opening");

    window.setTimeout(() => {
      entrance.classList.add("is-hidden");
      entrance.setAttribute("aria-hidden", "true");
      gallery.classList.remove("is-hidden");
      gallery.setAttribute("aria-hidden", "false");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  });

  homeButton?.addEventListener("click", openEntrance);

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter || "all");
    });
  });

  grid?.addEventListener("click", event => {
    const card = event.target.closest(".achievement-card");
    if (!card) return;

    if (card.dataset.premium === "true") {
      setModal(premiumModal, true);
    } else {
      openAchievement(card);
    }
  });

  document.querySelectorAll(".puzzle-card").forEach(card => {
    card.addEventListener("click", () => {
      if (card.dataset.premium === "true") {
        setModal(premiumModal, true);
        return;
      }

      const number = card.dataset.puzzle || "1";
      if (puzzleTitle) puzzleTitle.textContent = `Rompecabezas ${number}`;
      setModal(puzzleModal, true);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach(button => {
    button.addEventListener("click", closeModals);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModals();
  });

  applyFilter("all");
});