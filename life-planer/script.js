/* =====================================
   RESET & VARIABLES
===================================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --bg-deep: #16120e;
    --glass-bg: rgba(255, 255, 255, 0.12);
    --glass-border: rgba(255, 255, 255, 0.25);
    --glass-card: rgba(248, 243, 238, 0.82);
    --text-main: #2b1a12;
    --text-muted: #7d6a58;
    --accent-gold: #d9a441;
    --font-serif: "Cormorant Garamond", serif;
    --font-sans: "Plus Jakarta Sans", sans-serif;
}

html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: var(--font-sans);
    background: var(--bg-deep);
    color: var(--text-main);
}

/* =====================================
   LAYOUT PRINCIPAL (ESTILO MACRO-UI)
===================================== */
.planner-workspace {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("assets/textures/parchment.jpg"), linear-gradient(135deg, #2b1a12 0%, #4d321a 100%);
    background-size: cover;
    background-position: center;
    padding: 24px;
}

.macro-window {
    position: relative;
    width: 100%;
    max-width: 1320px;
    height: 85vh;
    max-height: 800px;
    background: rgba(240, 233, 221, 0.75);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--glass-border);
    border-radius: 36px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    display: grid;
    grid-template-columns: 88px 1fr;
    overflow: hidden;
    animation: windowReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes windowReveal {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

/* =====================================
   BARRA LATERAL DE NAVEGACIÓN
===================================== */
.macro-sidebar {
    background: rgba(43, 26, 18, 0.85);
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 28px 0;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    z-index: 10;
}

.sidebar-top, .sidebar-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.nav-icon-btn {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.06);
    color: #d8d0c0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
}

.nav-icon-btn:hover, .nav-icon-btn.active {
    background: var(--accent-gold);
    color: #2b1a12;
    transform: scale(1.08);
    box-shadow: 0 4px 15px rgba(217, 164, 65, 0.4);
}

.nav-icon-btn i {
    font-size: 20px;
}

.user-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid var(--accent-gold);
    object-fit: cover;
}

/* =====================================
   CONTENIDO CENTRAL / WORKSPACE
===================================== */
.macro-content {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 35px 45px;
}

.macro-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    background: rgba(255, 255, 255, 0.25);
    padding: 16px 28px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.4);
}

.header-brand span {
    font-size: 9px;
    letter-spacing: 3px;
    color: var(--text-muted);
    font-weight: 700;
}

.header-brand h2 {
    font-family: var(--font-serif);
    font-size: 26px;
    color: #5a4632;
}

.header-filters {
    display: flex;
    gap: 12px;
}

.filter-pill {
    padding: 10px 20px;
    border-radius: 30px;
    border: 1px solid rgba(125, 106, 88, 0.2);
    background: rgba(255, 255, 255, 0.6);
    color: var(--text-main);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
}

.filter-pill.active, .filter-pill:hover {
    background: #2b1a12;
    color: #f8f3ee;
    border-color: #2b1a12;
}

/* =====================================
   BANNER HERO INTERNO
===================================== */
.hero-banner {
    position: relative;
    width: 100%;
    height: 320px;
    border-radius: 28px;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 50px;
    margin-bottom: 30px;
    box-shadow: 0 20px 40px rgba(43, 26, 18, 0.15);
}

.hero-banner::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(43,26,18,0.85) 0%, rgba(43,26,18,0.4) 50%, transparent 100%), url("assets/background/fondo.png");
    background-size: cover;
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 2;
    max-width: 550px;
    color: #f8f3ee;
}

.hero-tag {
    font-size: 10px;
    letter-spacing: 3px;
    color: #d9a441;
    font-weight: 700;
}

.hero-content h1 {
    font-family: var(--font-serif);
    font-size: 46px;
    line-height: 1.05;
    margin-bottom: 14px;
    font-weight: 700;
}

.hero-content p {
    font-size: 14px;
    line-height: 1.6;
    color: #e2d2c3;
    margin-bottom: 20px;
}

.hero-action-btn {
    background: #d9a441;
    border: none;
    color: #2b1a12;
}

/* =====================================
   GRID DE TARJETAS INFERIORES
===================================== */
.cards-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 25px;
    padding-bottom: 20px;
}

.glass-card {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 10px 30px rgba(43, 26, 18, 0.08);
    position: relative;
    overflow: hidden;
}

.card-flex-between {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-title-sm {
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--text-muted);
    font-weight: 700;
    margin-bottom: 8px;
}

.card-main-title {
    font-family: var(--font-serif);
    font-size: 24px;
    color: #3f2818;
    margin-bottom: 12px;
}

.title-spaced {
    margin-bottom: 8px;
}

.card-desc {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
}

.stat-display {
    display: flex;
    align-items: baseline;
    gap: 15px;
    margin-top: 15px;
}

.stat-number {
    font-family: var(--font-serif);
    font-size: 38px;
    font-weight: 700;
    color: #2b1a12;
}

.stat-sub {
    font-size: 11px;
    color: var(--text-muted);
}

.action-circle-btn {
    position: absolute;
    bottom: 25px;
    right: 25px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #2b1a12;
    color: #f8f3ee;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
}

.action-circle-btn:hover {
    transform: scale(1.1);
    background: var(--accent-gold);
    color: #2b1a12;
}

.floating-info-card {
    background: rgba(255, 255, 255, 0.88);
    border-radius: 20px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: var(--text-muted);
    border-bottom: 1px solid rgba(125,106,88,0.1);
    padding-bottom: 8px;
}

.info-row strong {
    color: var(--text-main);
}

.macro-content::-webkit-scrollbar {
    width: 6px;
}
.macro-content::-webkit-scrollbar-track {
    background: transparent;
}
.macro-content::-webkit-scrollbar-thumb {
    background: rgba(125, 106, 88, 0.2);
    border-radius: 10px;
}
