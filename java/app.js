// Selección de elementos del DOM
const form = document.getElementById('transaction-form');
const tableBody = document.getElementById('transaction-table');

// Array para almacenar transacciones en memoria
let transactions = [];

// Función para agregar una transacción
function addTransaction(description, amount, type) {
  const transaction = { description, amount: parseFloat(amount), type };
  transactions.push(transaction);
  renderTable();
}

// Función para renderizar la tabla de transacciones
function renderTable() {
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizar

  transactions.forEach((transaction, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${transaction.description}</td>
      <td>${transaction.amount.toFixed(2)}</td>
      <td>${transaction.type}</td>
      <td>
        <button onclick="deleteTransaction(${index})">Eliminar</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Función para eliminar una transacción por índice
function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTable();
}

// Evento de envío del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevenir recarga de la página

  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;

  addTransaction(description, amount, type);

  form.reset(); // Limpiar el formulario
});
