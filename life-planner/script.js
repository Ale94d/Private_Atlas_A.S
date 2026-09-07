const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    const date = taskDate.value;
    if(!text) return;

    const li = document.createElement('li');
    li.innerHTML = `
        <div class="item-details">
            <span class="item-text">${text}</span>
            <span class="item-sub"><i class="fa-regular fa-calendar"></i> ${date || 'Sin fecha'}</span>
        </div>
        <div class="item-actions">
            <button class="check-btn" onclick="toggleTask(this)"><i class="fa-solid fa-check"></i></button>
            <button class="trash-btn" onclick="deleteItem(this)"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
    taskDate.value = '';
});

function toggleTask(btn) {
    btn.closest('li').classList.toggle('completed');
}

function deleteItem(btn) {
    btn.closest('li').remove();
}

const expenseDesc = document.getElementById('expenseDesc');
const expenseAmount = document.getElementById('expenseAmount');
const expenseCategory = document.getElementById('expenseCategory');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseList = document.getElementById('expenseList');

let categoryTotals = { necesidades: 0, deseos: 0, ahorro: 0 };

addExpenseBtn.addEventListener('click', () => {
    const desc = expenseDesc.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const cat = expenseCategory.value;

    if(!desc || isNaN(amount) || amount <= 0) return;

    const li = document.createElement('li');
    li.dataset.category = cat;
    li.dataset.amount = amount;
    li.innerHTML = `
        <div class="item-details">
            <span class="item-text"><strong>${desc}</strong></span>
            <span class="item-sub uppercase">${cat} - $${amount.toLocaleString()}</span>
        </div>
        <button class="trash-btn" onclick="removeExpense(this)"><i class="fa-solid fa-trash"></i></button>
    `;
    expenseList.appendChild(li);

    expenseDesc.value = '';
    expenseAmount.value = '';
    updateBudget();
});

function removeExpense(btn) {
    btn.closest('li').remove();
    updateBudget();
}

function updateBudget() {
    categoryTotals = { necesidades: 0, deseos: 0, ahorro: 0 };
    document.querySelectorAll('#expenseList li').forEach(item => {
        const cat = item.dataset.category;
        const amt = parseFloat(item.dataset.amount);
        categoryTotals[cat] += amt;
    });

    document.getElementById('totalNecesidades').innerText = `$${categoryTotals.necesidades.toLocaleString()}`;
    document.getElementById('totalDeseos').innerText = `$${categoryTotals.deseos.toLocaleString()}`;
    document.getElementById('totalAhorro').innerText = `$${categoryTotals.ahorro.toLocaleString()}`;
}
