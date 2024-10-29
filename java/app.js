const form = document.getElementById('moneyForm');
const tipoSelect = document.getElementById('tipo');
const categoriaSelect = document.getElementById('categoria');
const montoInput = document.getElementById('monto');
const operationsList = document.getElementById('operationsList');
const totalSummary = document.getElementById('totalSummary');
const ctx = document.getElementById('moneyChart').getContext('2d');

// Variables para guardar totales
let totalIngreso = 0;
let totalGasto = 0;
let totalPrestamo = 0;
let operaciones = [];

// Configuración de la gráfica
const moneyChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Ingresos', 'Gastos', 'Préstamos'],
    datasets: [{
      label: 'Monto',
      data: [0, 0, 0], // Datos iniciales
      backgroundColor: ['green', 'red', 'blue'],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  },
});

// Cambiar las opciones dinámicamente según el tipo seleccionado
tipoSelect.addEventListener('change', (e) => {
  const tipo = e.target.value;
  categoriaSelect.innerHTML = ''; // Limpiar opciones previas

  let opciones = [];
  if (tipo === 'ingreso') {
    opciones = ['Papá', 'Mamá', 'Transferencia', 'Pago Préstamo'];
  } else if (tipo === 'gasto') {
    opciones = ['Comida', 'Ropa', 'Gasolina'];
  } else if (tipo === 'prestamo') {
    opciones = ['Amigo', 'Banco', 'Familiar'];
  }

  opciones.forEach(opcion => {
    const optionElement = document.createElement('option');
    optionElement.value = opcion.toLowerCase();
    optionElement.textContent = opcion;
    categoriaSelect.appendChild(optionElement);
  });
});

// Función para mostrar las operaciones en la lista
function mostrarOperaciones(ops) {
  operationsList.innerHTML = ''; // Limpiar la lista
  ops.forEach((op) => {
    const li = document.createElement('li');
    li.textContent = `${op.tipo.toUpperCase()} - ${op.categoria}: $${op.monto}`;
    operationsList.appendChild(li);
  });
}

// Registrar operación
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar recarga

  const tipo = tipoSelect.value;
  const categoria = categoriaSelect.value;
  const monto = parseFloat(montoInput.value);

  if (tipo && categoria && monto) {
    // Agregar operación al arreglo
    operaciones.push({ tipo, categoria, monto });

    // Actualizar totales
    if (tipo === 'ingreso') totalIngreso += monto;
    if (tipo === 'gasto') totalGasto += monto;
    if (tipo === 'prestamo') totalPrestamo += monto;

    // Actualizar la lista y la gráfica
    mostrarOperaciones(operaciones);
    moneyChart.data.datasets[0].data = [totalIngreso, totalGasto, totalPrestamo];
    moneyChart.update();

    // Actualizar el resumen
    totalSummary.textContent = `Total Ingresos: $${totalIngreso} | Total Gastos: $${totalGasto} | Total Préstamos: $${totalPrestamo}`;

    // Limpiar formulario
    form.reset();
  }
});
