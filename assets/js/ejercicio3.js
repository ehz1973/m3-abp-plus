const formularioBulto = document.getElementById("formulario-bulto");
const pesoFisicoInput = document.getElementById("pesoFisico");
const anchoInput = document.getElementById("ancho");
const largoInput = document.getElementById("largo");
const altoInput = document.getElementById("alto");
const botonCalcular = document.getElementById("boton-calcular");
const botonLimpiar = document.getElementById("boton-limpiar");
const contenedorTablaBultos = document.getElementById("contenedor-tabla-bultos");
const contenedorTablaValores = document.getElementById("contenedor-tabla-valores");
const mensajeResumen = document.getElementById("mensaje-resumen");

const factorVolumetrico = 4000;
const valoresEncomiendaBase = [
    { origen: "Santiago", destino: "Santiago", tarifa: 1000 },
    { origen: "Santiago", destino: "Rancagua", tarifa: 1500 },
    { origen: "Santiago", destino: "Valparaíso", tarifa: 1500 },
    { origen: "Santiago", destino: "Coquimbo", tarifa: 2000 }
];

const encomienda = {
    bultos: [],
    pesoEncomienda: 0
};

formularioBulto.addEventListener("submit", function (event) {
    event.preventDefault();
    agregarBulto();
});

botonCalcular.addEventListener("click", function () {
    calcularEnvio();
});

botonLimpiar.addEventListener("click", function () {
    limpiarBultos();
});

function agregarBulto() {
    const pesoFisico = Number(pesoFisicoInput.value);
    const ancho = Number(anchoInput.value);
    const largo = Number(largoInput.value);
    const alto = Number(altoInput.value);

    // Verifica que cada campo tenga un valor numérico válido mayor que cero
    if (!validarEntrada(pesoFisico) || !validarEntrada(ancho) || !validarEntrada(largo) || !validarEntrada(alto)) {
        alert("Complete todos los campos con valores numéricos mayores que cero.");
        return;
    }

    const pesoVolumetrico = calculaPesoVolumetrico(ancho, largo, alto, factorVolumetrico);
    // El peso del bulto es el mayor entre el peso físico y el volumétrico
    const pesoMayor = Math.max(pesoFisico, pesoVolumetrico);

    encomienda.bultos.push({
        pesoFisico,
        ancho,
        largo,
        alto,
        pesoVolumetrico: Number(pesoVolumetrico.toFixed(2)),
        pesoMayor: Number(pesoMayor.toFixed(2))
    });

    limpiarFormulario();
    renderizarTablaBultos();
    mensajeResumen.textContent = "Bulto agregado correctamente. Presione 'Calcular encomienda' para ver el resultado, o agregue otro bulto.";
}

function calcularEnvio() {
    if (encomienda.bultos.length === 0) {
        alert("Agregue al menos un bulto antes de calcular la encomienda.");
        return;
    }

    // Suma los pesos mayores de cada bulto para obtener el peso total de la encomienda
    encomienda.pesoEncomienda = encomienda.bultos.reduce((acum, bulto) => acum + bulto.pesoMayor, 0);

    const valoresEncomienda = valoresEncomiendaBase.map(valor => ({
        origen: valor.origen,
        destino: valor.destino,
        tarifa: valor.tarifa,
        // Calcula el valor de envío usando la tarifa y el peso total de la encomienda
        valorEnvio: Math.trunc(encomienda.pesoEncomienda * valor.tarifa)
    }));

    renderizarTablaValores(valoresEncomienda);
    mensajeResumen.textContent = `Peso total de la encomienda: ${encomienda.pesoEncomienda.toFixed(2)} kg.`;
}

function limpiarBultos() {
    // Restablece el estado y borra las tablas mostradas
    encomienda.bultos.length = 0;
    encomienda.pesoEncomienda = 0;
    contenedorTablaBultos.innerHTML = "";
    contenedorTablaValores.innerHTML = "";
    mensajeResumen.textContent = "Lista de bultos vacía.";
    limpiarFormulario();
}

function renderizarTablaBultos() {
    contenedorTablaBultos.innerHTML = "";

    if (encomienda.bultos.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay bultos agregados.";
        contenedorTablaBultos.appendChild(mensaje);
        return;
    }

    // Construye la tabla de bultos en un fragmento para evitar múltiples reflows al insertar filas
    const fragment = document.createDocumentFragment();
    const tabla = document.createElement("table");
    tabla.className = "table table-bordered table-striped";

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>#</th>
            <th>Peso físico (kg)</th>
            <th>Ancho (cm)</th>
            <th>Largo (cm)</th>
            <th>Alto (cm)</th>
            <th>Peso volumétrico (kg)</th>
            <th>Peso mayor (kg)</th>
        </tr>
    `;

    const tbody = document.createElement("tbody");
    encomienda.bultos.forEach((bulto, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${bulto.pesoFisico}</td>
            <td>${bulto.ancho}</td>
            <td>${bulto.largo}</td>
            <td>${bulto.alto}</td>
            <td>${bulto.pesoVolumetrico}</td>
            <td>${bulto.pesoMayor}</td>
        `;
        tbody.appendChild(fila);
    });

    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    fragment.appendChild(tabla);
    contenedorTablaBultos.appendChild(fragment);
}

function renderizarTablaValores(valores) {
    contenedorTablaValores.innerHTML = "";

    if (valores.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay valores de envío calculados.";
        contenedorTablaValores.appendChild(mensaje);
        return;
    }

    // Construye la tabla de valores de envío en un fragmento para evitar múltiples reflows al insertar filas
    const fragment = document.createDocumentFragment();
    const tabla = document.createElement("table");
    tabla.className = "table table-bordered table-striped";

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Origen</th>
            <th>Destino</th>
            <th>Tarifa</th>
            <th>Valor envío</th>
        </tr>
    `;

    const tbody = document.createElement("tbody");
    valores.forEach(valor => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${valor.origen}</td>
            <td>${valor.destino}</td>
            <td>${valor.tarifa}</td>
            <td>${valor.valorEnvio}</td>
        `;
        tbody.appendChild(fila);
    });

    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    fragment.appendChild(tabla);
    contenedorTablaValores.appendChild(fragment);
}

function validarEntrada(valor) {
    // Comprueba que el valor sea un número finito y estrictamente positivo
    return Number.isFinite(valor) && valor > 0;
}

function calculaPesoVolumetrico(ancho, largo, alto, factor) {
    // Fórmula estándar de peso volumétrico usada en envíos
    return (ancho * largo * alto) / factor;
}

function limpiarFormulario() {
    formularioBulto.reset();
    pesoFisicoInput.focus();
}

limpiarBultos();
