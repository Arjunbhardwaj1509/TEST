// Data storage and retrieval for budget and expenses
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let budget = localStorage.getItem('budget') || 0;

// Event listener to manage custom category visibility
document.getElementById('category').addEventListener('change', function() {
    const customCategoryInput = document.getElementById('customCategory');
    customCategoryInput.style.display = (this.value === 'Custom') ? 'block' : 'none';
});

// Function to add a new expense
function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    let category = document.getElementById('category').value;

    // If a custom category is chosen, update category with custom value
    if (category === 'Custom') {
        category = document.getElementById('customCategory').value;
    }

    const expense = { name: expenseName, amount, date, category };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    refreshCharts();
}

// Function to set the budget
function setBudget() {
    budget = parseFloat(document.getElementById('budget').value);
    localStorage.setItem('budget', budget);
    updateBudgetIndicator();
}

// Function to update and display the current budget status
function updateBudgetIndicator() {
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const budgetStatus = document.getElementById('budgetStatus');

    budgetStatus.textContent = `You have spent $${totalSpent} out of your $${budget} budget.`;

    if (totalSpent > budget) {
        budgetStatus.style.color = 'red';
        budgetStatus.textContent += ' You have exceeded the budget!';
    } else {
        budgetStatus.style.color = 'green';
    }
}

// Function to clear all stored data
function resetData() {
    localStorage.clear();
    expenses = [];
    budget = 0;
    refreshCharts();
    updateBudgetIndicator();
}

// Function to generate and refresh charts based on current data
function refreshCharts() {
    const categories = {};
    expenses.forEach(expense => {
        categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });

    const categoryLabels = Object.keys(categories);
    const categoryValues = Object.values(categories);

    // Pie chart for expense distribution across categories
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

    // Bar chart for expenses over time
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

    updateBudgetIndicator();
}

// Load charts and budget status on page load
refreshCharts();
