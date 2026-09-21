/* ==========================================================================
   PRIVATE ATLAS A.S • VISIONOS INTERACTION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    updateFinanceUI();
});

// 1. NAVEGACIÓN Y CAMBIO DE VISTAS (SPA)
function switchView(viewName) {
    // Ocultar todas las tarjetas principales
    const views = ['home', 'finance', 'tasks', 'settings'];
    views.forEach(v => {
        const el = document.getElementById(`view-${v}`);
        if (el) el.classList.add('hidden-view');
        
        const dockEl = document.getElementById(`dock-${v}`);
        if (dockEl) dockEl.classList.remove('active');
    });

    // Mostrar la vista seleccionada
    const activeView = document.getElementById(`view-${viewName}`);
    if (activeView) activeView.classList.remove('hidden-view');

    const activeDock = document.getElementById(`dock-${viewName}`);
    if (activeDock) activeDock.classList.add('active');
}

// 2. RELOJ EN TIEMPO REAL Y FECHA
function initClock() {
    const clockEl = document.getElementById('realtimeClock');
    const dateEl = document.getElementById('realtimeDate');

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        if (clockEl) clockEl.textContent = `${hours}:${minutes}:${seconds}`;

        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        if (dateEl) dateEl.textContent = now.toLocaleDateString('es-ES', options);
    }

    updateTime();
    setInterval(updateTime, 1000);
}

// 3. LÓGICA DE PRESUPUESTO 50 / 30 / 20 CON MONEDA DINÁMICA
let totalIncome = 0; 
let currentCategoryKey = 'needs';
let currentCategoryPercent = 50;
let selectedCurrency = '$ USD'; // Moneda por defecto

let categoriesData = {
    needs: { name: 'Necesidades', percent: 50, items: [] },
    wants: { name: 'Deseos', percent: 30, items: [] },
    savings: { name: 'Ahorro', percent: 20, items: [] }
};

function changeCurrency() {
    const select = document.getElementById('currencySelect');
    const customInput = document.getElementById('customCurrencyInput');

    if (select.value === 'custom') {
        customInput.style.display = 'inline-block';
        selectedCurrency = customInput.value.trim() || '¤';
    } else {
        customInput.style.display = 'none';
        selectedCurrency = select.value;
    }

    updateFinanceUI();
}

function setCategory(key, percent, element) {
    document.querySelectorAll('.fin-cat-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    currentCategoryKey = key;
    currentCategoryPercent = percent;

    document.getElementById('currentCategoryTitle').textContent = `Control Presupuestario: ${categoriesData[key].name} (${percent}%)`;
    document.getElementById('currentCategoryDesc').textContent = `Límite recomendado: ${percent}% de tus ingresos totales.`;
    
    updateFinanceUI();
}

function addFinanceItem() {
    const incomeInput = document.getElementById('financeIncomeInput');
    const amountInput = document.getElementById('financeAmountInput');
    const descInput = document.getElementById('financeDescInput');

    const newIncome = parseFloat(incomeInput.value);
    if (!isNaN(newIncome) && newIncome > 0) {
        totalIncome = newIncome;
        incomeInput.value = '';
    }

    const amount = parseFloat(amountInput.value);
    const desc = descInput.value.trim();

    if (!isNaN(amount) && amount > 0 && desc) {
        categoriesData[currentCategoryKey].items.push({ desc, amount });
        amountInput.value = '';
        descInput.value = '';
    }

    updateFinanceUI();
}

function removeFinanceItem(index) {
    categoriesData[currentCategoryKey].items.splice(index, 1);
    updateFinanceUI();
}

function updateFinanceUI() {
    // Formatear montos usando la moneda seleccionada
    document.getElementById('summaryTotalIncome').textContent = `${selectedCurrency} ${totalIncome.toFixed(2)}`;
    
    const categoryLimit = totalIncome * (currentCategoryPercent / 100);
    document.getElementById('summaryCategoryLimit').textContent = `${selectedCurrency} ${categoryLimit.toFixed(2)}`;

    let categorySpent = 0;
    categoriesData[currentCategoryKey].items.forEach(item => {
        categorySpent += item.amount;
    });

    const spentEl = document.getElementById('summaryCategorySpent');
    spentEl.textContent = `${selectedCurrency} ${categorySpent.toFixed(2)}`;

    if (categorySpent > categoryLimit && categoryLimit > 0) {
        spentEl.style.color = '#f43f5e';
    } else {
        spentEl.style.color = '#38bdf8';
    }

    const container = document.getElementById('financeListContainer');
    container.innerHTML = '';

    categoriesData[currentCategoryKey].items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'expense-item-row';
        row.innerHTML = `
            <div class="expense-info-main">
                <b>${item.desc}</b>
                <small style="display:block; font-size:11px; color:rgba(255,255,255,0.5);">${categoriesData[currentCategoryKey].name}</small>
            </div>
            <div class="expense-item-right">
                <span>-${selectedCurrency} ${item.amount.toFixed(2)}</span>
                <button class="delete-expense-btn" onclick="removeFinanceItem(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        container.appendChild(row);
    });
}

// 4. GESTIÓN DE TAREAS / BITÁCORA
let tasks = [];

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (text !== '') {
        tasks.push({ text, completed: false });
        input.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function renderTasks() {
    const container = document.getElementById('taskListContainer');
    container.innerHTML = '';

    tasks.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = 'task-card-item';
        card.innerHTML = `
            <span style="${task.completed ? 'text-decoration: line-through; color: rgba(255,255,255,0.4);' : ''}">${task.text}</span>
            <div style="display: flex; gap: 8px;">
                <button class="holo-btn secondary-btn" style="padding: 5px 10px;" onclick="toggleTask(${index})">
                    <i class="fa-solid ${task.completed ? 'fa-rotate-left' : 'fa-check'}"></i>
                </button>
                <button class="delete-expense-btn" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 5. ACCIONES RÁPIDAS DE HOME
function quickLaunchExpedition() {
    const dest = document.getElementById('inputDestination').value;
    if (dest) {
        alert(`¡Expedición a "${dest}" registrada en la bitácora!`);
        tasks.push({ text: `Expedición a ${dest}`, completed: false });
        document.getElementById('inputDestination').value = '';
        switchView('tasks');
    } else {
        alert('Por favor escribe un destino.');
    }
}
