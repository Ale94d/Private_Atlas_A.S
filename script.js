// ========================================
// Private Atlas A.S - JavaScript
// ========================================

// ========================================
// Sistema de Traducción
// ========================================
const translations = {
    es: {
        nav_home: "Inicio",
        nav_planner: "Planificador",
        nav_journal: "Diario",
        nav_library: "Biblioteca",
        nav_mood: "Música",
        welcome_title: "Bienvenido a tu espacio personal",
        welcome_subtitle: "Selecciona una opción del menú lateral para comenzar",
        home_greeting: "¡Hola! Bienvenido de nuevo",
        home_hint: "Explora las diferentes secciones para organizar tu día",
        planner_placeholder: "Escribe una nueva tarea...",
        planner_add: "Agregar",
        planner_total: "Total:",
        planner_done: "Completadas:",
        journal_last_save: "Último guardado: Nunca",
        journal_placeholder: "Escribe tus pensamientos, reflexiones o lo que desees recordar...",
        journal_save: "Guardar",
        library_title: "Mi Biblioteca",
        library_note: "Haz clic en un libro para abrir el PDF",
        mood_title: "Tu Espacio Musical",
        mood_description: "Pega el enlace de una canción o playlist de Spotify para escucharla aquí",
        mood_placeholder: "https://open.spotify.com/track/...",
        mood_convert: "Convertir",
        mood_placeholder_text: "Pegar enlace arriba"
    },
    en: {
        nav_home: "Home",
        nav_planner: "Planner",
        nav_journal: "Journal",
        nav_library: "Library",
        nav_mood: "Music",
        welcome_title: "Welcome to your personal space",
        welcome_subtitle: "Select an option from the sidebar menu to start",
        home_greeting: "Hello! Welcome back",
        home_hint: "Explore the different sections to organize your day",
        planner_placeholder: "Write a new task...",
        planner_add: "Add",
        planner_total: "Total:",
        planner_done: "Completed:",
        journal_last_save: "Last saved: Never",
        journal_placeholder: "Write your thoughts, reflections or anything you want to remember...",
        journal_save: "Save",
        library_title: "My Library",
        library_note: "Click on a book to open the PDF",
        mood_title: "Your Music Space",
        mood_description: "Paste a Spotify song or playlist link to listen here",
        mood_placeholder: "https://open.spotify.com/track/...",
        mood_convert: "Convert",
        mood_placeholder_text: "Paste link above"
    }
};

// Frases motivacionales
const phrases = {
    es: [
        "Cada día es una nueva oportunidad para crecer.",
        "La simplicidad es la máxima sofisticación.",
        "Tu espacio, tu paz, tu控制了。",
        "Pequeños pasos conducen a grandes cambios.",
        "El orden en tu entorno refleja el orden en tu mente.",
        "Hoy es el día perfecto para comenzar.",
        "Cada tarea completada es un paso hacia tu meta.",
        "La música calma el alma.",
        "Los libros son ventanas a otros mundos.",
        "Tu diario, tu espejo interior.",
        "La organización es libertad.",
        "Un día a la vez, un paso a la vez."
    ],
    en: [
        "Every day is a new opportunity to grow.",
        "Simplicity is the ultimate sophistication.",
        "Your space, your peace, your control.",
        "Small steps lead to big changes.",
        "Order in your environment reflects order in your mind.",
        "Today is the perfect day to begin.",
        "Each completed task is a step toward your goal.",
        "Music soothes the soul.",
        "Books are windows to other worlds.",
        "Your journal, your inner mirror.",
        "Organization is freedom.",
        "One day at a time, one step at a time."
    ]
};

// Títulos de ventanas
const windowTitles = {
    es: { home: "Inicio", planner: "Planificador", journal: "Diario", library: "Biblioteca", mood: "Música" },
    en: { home: "Home", planner: "Planner", journal: "Journal", library: "Library", mood: "Music" }
};

// ========================================
// Estado Global
// ========================================
const state = {
    currentLang: localStorage.getItem('privateAtlasLang') || 'es',
    windows: {},
    zIndexCounter: 100,
    tasks: JSON.parse(localStorage.getItem('privateAtlasTasks')) || []
};

// ========================================
// Funciones de Traducción
// ========================================
function setLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem('privateAtlasLang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    
    // Actualizar todos los elementos con data-lang
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.dataset.lang;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Actualizar placeholders
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.dataset.langPlaceholder;
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    
    // Actualizar botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.langSelect === lang);
    });
    
    // Actualizar títulos de ventanas abiertas
    document.querySelectorAll('.window').forEach(win => {
        const section = win.dataset.section;
        const titleEl = win.querySelector('.window-title');
        if (titleEl && windowTitles[lang][section]) {
            titleEl.textContent = windowTitles[lang][section];
        }
    });
    
    // Actualizar fecha en Home
    updateHomeDate();
    
    // Actualizar frase aleatoria
    updateRandomPhrase();
}

function updateRandomPhrase() {
    const phraseEls = document.querySelectorAll('.phrase-text');
    const langPhrases = phrases[state.currentLang];
    const randomIndex = Math.floor(Math.random() * langPhrases.length);
    
    phraseEls.forEach(el => {
        el.textContent = `"${langPhrases[randomIndex]}"`;
    });
}

function updateHomeDate() {
    const dateEls = document.querySelectorAll('.home-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString(state.currentLang === 'es' ? 'es-ES' : 'en-US', options);
    
    dateEls.forEach(el => {
        el.textContent = dateStr;
    });
}

// ========================================
// Sistema de Ventanas
// ========================================
function createWindow(section) {
    // Si la ventana ya existe, traerla al frente
    if (state.windows[section]) {
        bringToFront(state.windows[section]);
        return;
    }
    
    // Ocultar pantalla de bienvenida
    document.getElementById('desktop-welcome').classList.add('hidden');
    
    // Obtener plantilla de ventana
    const template = document.getElementById('window-template');
    const windowClone = template.content.cloneNode(true);
    
    // Configurar ventana
    const windowEl = windowClone.querySelector('.window');
    windowEl.dataset.section = section;
    
    // Título
    const titleEl = windowEl.querySelector('.window-title');
    titleEl.textContent = windowTitles[state.currentLang][section];
    
    // Posición inicial (centrada con offset para múltiples ventanas)
    const offset = Object.keys(state.windows).length * 30;
    windowEl.style.left = `${100 + offset}px`;
    windowEl.style.top = `${80 + offset}px`;
    windowEl.style.zIndex = ++state.zIndexCounter;
    
    // Cargar contenido específico
    loadSectionContent(windowEl, section);
    
    // Agregar al DOM
    document.getElementById('desktop').appendChild(windowEl);
    
    // Guardar referencia
    state.windows[section] = windowEl;
    
    // Configurar eventos
    setupWindowEvents(windowEl);
}

function loadSectionContent(windowEl, section) {
    const contentEl = windowEl.querySelector('.window-content');
    const templateId = `content-${section}`;
    const template = document.getElementById(templateId);
    
    if (template) {
        const content = template.content.cloneNode(true);
        contentEl.appendChild(content);
        
        // Inicializar contenido específico
        initSectionContent(section, windowEl);
    }
}

function initSectionContent(section, windowEl) {
    switch(section) {
        case 'home':
            updateHomeDate();
            updateRandomPhrase();
            break;
            
        case 'planner':
            initPlanner(windowEl);
            break;
            
        case 'journal':
            initJournal(windowEl);
            break;
            
        case 'library':
            initLibrary(windowEl);
            break;
            
        case 'mood':
            initMood(windowEl);
            break;
    }
}

// ========================================
// Planner
// ========================================
function initPlanner(windowEl) {
    const taskInput = windowEl.querySelector('#task-input');
    const addBtn = windowEl.querySelector('.add-task-btn');
    const taskList =windowEl.querySelector('#task-list');
    
    // Renderizar tareas existentes
    renderTasks(taskList);
    
    // Agregar tarea
    addBtn.addEventListener('click', () => addTask(taskInput, taskList));
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(taskInput, taskList);
    });
}

function addTask(input, listEl) {
    const text = input.value.trim();
    if (!text) return;
    
    state.tasks.push({ id: Date.now(), text, done: false });
    saveTasks();
    renderTasks(listEl);
    input.value = '';
}

function toggleTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
        task.done = !task.done;
        saveTasks();
        const listEl = document.querySelector('.window[data-section="planner"] #task-list');
        if (listEl) renderTasks(listEl);
    }
}

function deleteTask(id) {
    state.tasks = state.tasks.filter(t => t.id !== id);
    saveTasks();
    const listEl = document.querySelector('.window[data-section="planner"] #task-list');
    if (listEl) renderTasks(listEl);
}

function renderTasks(listEl) {
    listEl.innerHTML = state.tasks.map(task => `
        <li class="task-item ${task.done ? 'done' : ''}">
            <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </li>
    `).join('');
    
    // Actualizar contadores
    const total = state.tasks.length;
    const done = state.tasks.filter(t => t.done).length;
    
    listEl.parentElement.querySelector('.task-count').textContent = total;
    listEl.parentElement.querySelector('.done-count').textContent = done;
}

function saveTasks() {
    localStorage.setItem('privateAtlasTasks', JSON.stringify(state.tasks));
}

// ========================================
// Journal
// ========================================
function initJournal(windowEl) {
    const textarea = windowEl.querySelector('#journal-textarea');
    const saveBtn = windowEl.querySelector('.save-btn');
    const lastSaveEl = windowEl.querySelector('.journal-last-save');
    const charCountEl = windowEl.querySelector('.char-count');
    const dateEl = windowEl.querySelector('.journal-date');
    
    // Cargar contenido guardado
    const savedContent = localStorage.getItem('privateAtlasJournal');
    if (savedContent) {
        textarea.value = savedContent;
        updateCharCount(textarea, charCountEl);
    }
    
    // Actualizar fecha
    const now = new Date();
    const dateStr = now.toLocaleDateString(state.currentLang === 'es' ? 'es-ES' : 'en-US', 
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    dateEl.textContent = dateStr;
    
    // Auto-guardado
    textarea.addEventListener('input', () => {
        updateCharCount(textarea, charCountEl);
    });
    
    // Guardar manualmente
    saveBtn.addEventListener('click', () => {
        localStorage.setItem('privateAtlasJournal', textarea.value);
        const time = new Date().toLocaleTimeString(state.currentLang === 'es' ? 'es-ES' : 'en-US');
        const label = state.currentLang === 'es' ? 'Último guardado' : 'Last saved';
        lastSaveEl.textContent = `${label}: ${time}`;
    });
    
    // Contador de caracteres
    function updateCharCount(textarea, countEl) {
        countEl.textContent = `${textarea.value.length} caracteres`;
    }
}

// ========================================
// Library
// ========================================
function initLibrary(windowEl) {
    const books = windowEl.querySelectorAll('.book-card');
    
    books.forEach(book => {
        book.addEventListener('click', () => {
            const bookName = book.querySelector('h4').textContent;
            const bookNumber = book.dataset.book;
            // Abrir PDF placeholder
            const pdfUrl = `https://example.com/books/${bookNumber}.pdf`;
            window.open(pdfUrl, '_blank');
        });
    });
}

// ========================================
// Mood (Spotify)
// ========================================
function initMood(windowEl) {
    const input = windowEl.querySelector('#spotify-link');
    const convertBtn = windowEl.querySelector('.convert-btn');
    const playerEl = windowEl.querySelector('#spotify-player');
    
    // Cargar último link
    const lastLink = localStorage.getItem('privateAtlasSpotifyLink');
    if (lastLink) {
        input.value = lastLink;
        convertToEmbed(lastLink, playerEl);
    }
    
    convertBtn.addEventListener('click', () => {
        const url = input.value.trim();
        if (url) {
            localStorage.setItem('privateAtlasSpotifyLink', url);
            convertToEmbed(url, playerEl);
        }
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const url = input.value.trim();
            if (url) {
                localStorage.setItem('privateAtlasSpotifyLink', url);
                convertToEmbed(url, playerEl);
            }
        }
    });
}

function convertToEmbed(url, playerEl) {
    // Convertir link de Spotify a embed
    let embedUrl = '';
    
    if (url.includes('spotify.com')) {
        // Extraer el ID del track/playlist
        const match = url.match(/spotify\.com\/(track|playlist|album|episode|show)\/([a-zA-Z0-9]+)/);
        if (match) {
            const type = match[1];
            const id = match[2];
            embedUrl = `https://open.spotify.com/embed/${type}/${id}`;
        }
    }
    
    if (embedUrl) {
        playerEl.innerHTML = `<iframe src="${embedUrl}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    } else {
        playerEl.innerHTML = `<div class="player-placeholder">${translations[state.currentLang].mood_placeholder_text}</div>`;
    }
}

// ========================================
// Eventos de Ventana
// ========================================
function setupWindowEvents(windowEl) {
    const header = windowEl.querySelector('.window-header');
    const closeBtn = windowEl.querySelector('.window-close');
    const section = windowEl.dataset.section;
    
    // Cerrar ventana
    closeBtn.addEventListener('click', () => closeWindow(section));
    
    // Traer al frente al hacer clic
    windowEl.addEventListener('mousedown', () => bringToFront(windowEl));
    
    // Drag
    let isDragging = false;
    let startX, startY, initialX, initialY;
    
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = windowEl.offsetLeft;
        initialY = windowEl.offsetTop;
        
        bringToFront(windowEl);
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        windowEl.style.left = `${initialX + dx}px`;
        windowEl.style.top = `${initialY + dy}px`;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Prevenir drag en close button
    closeBtn.addEventListener('mousedown', (e) => e.stopPropagation());
}

function bringToFront(windowEl) {
    windowEl.style.zIndex = ++state.zIndexCounter;
}

function closeWindow(section) {
    if (state.windows[section]) {
        state.windows[section].remove();
        delete state.windows[section];
    }
    
    // Mostrar bienvenida si no hay ventanas
    if (Object.keys(state.windows).length === 0) {
        document.getElementById('desktop-welcome').classList.remove('hidden');
    }
}

// ========================================
// Inicialización
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Configurar idioma inicial
    setLanguage(state.currentLang);
    
    // Botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            createWindow(section);
        });
    });
    
    // Botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.langSelect);
        });
    });
    
    // Actualizar frase cada ciertos segundos
    setInterval(updateRandomPhrase, 30000);
});
