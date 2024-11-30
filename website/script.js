// script.js

// Data storage for expenses and budget
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let budget = localStorage.getItem('budget') || 0;

// Event Listeners for category dropdown
document.getElementById('category').addEventListener('change', function() {
    const customCategoryInput = document.getElementById('customCategory');
    if (this.value === 'Custom') {
        customCategoryInput.style.display = 'block';
    } else {
        customCategoryInput.style.display = 'none';
    }
});


function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    let category = document.getElementById('category').value;

    if (category === 'Custom') {
        category = document.getElementById('customCategory').value;
    }

    const expense = { name: expenseName, amount, date, category };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    updateCharts();
}

// Function to set budget
function setBudget() {
    budget = parseFloat(document.getElementById('budget').value);
    localStorage.setItem('budget', budget);
    updateBudgetStatus();
}

// Function to update budget status
function updateBudgetStatus() {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const budgetStatus = document.getElementById('budgetStatus');
    
    budgetStatus.innerHTML = `You have spent $${totalExpenses} of your $${budget} budget.`;
    if (totalExpenses > budget) {
        budgetStatus.style.color = 'red';
        budgetStatus.innerHTML += ' You have exceeded your budget!';
    } else {
        budgetStatus.style.color = 'green';
    }
}

// Function to clear data
function clearData() {
    localStorage.clear();
    expenses = [];
    budget = 0;
    updateCharts();
    updateBudgetStatus();
}

// Function to generate and update charts
function updateCharts() {
    const categories = {};
    expenses.forEach(expense => {
        categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });

    const categoryLabels = Object.keys(categories);
    const categoryValues = Object.values(categories);

    const pieChart = new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: {
            labels: categoryLabels,
            datasets: [{
                label: 'Expense Distribution',
                data: categoryValues,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }]
        }
    });

    const expenseDates = expenses.map(expense => expense.date);
    const expenseAmounts = expenses.map(expense => expense.amount);

    const barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: expenseDates,
            datasets: [{
                label: 'Expenses Over Time',
                data: expenseAmounts,
                backgroundColor: '#36A2EB',
            }]
        }
    });

    updateBudgetStatus();
}

// Initialize charts on page load
updateCharts();
