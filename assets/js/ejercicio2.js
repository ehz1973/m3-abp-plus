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

    if (!validarEntrada(pesoFisico) || !validarEntrada(ancho) || !validarEntrada(largo) || !validarEntrada(alto)) {
        alert("Complete todos los campos con valores numéricos mayores que cero.");
        return;
    }

    const pesoVolumetrico = calculaPesoVolumetrico(ancho, largo, alto, factorVolumetrico);
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
    mensajeResumen.textContent = "Bulto agregado correctamente. Presione 'Calcular envío' para ver el resultado.";
}

function calcularEnvio() {
    if (encomienda.bultos.length === 0) {
        alert("Agregue al menos un bulto antes de calcular el envío.");
        return;
    }

    encomienda.pesoEncomienda = encomienda.bultos.reduce((acum, bulto) => acum + bulto.pesoMayor, 0);

    const valoresEncomienda = valoresEncomiendaBase.map(valor => ({
        origen: valor.origen,
        destino: valor.destino,
        tarifa: valor.tarifa,
        valorEnvio: Math.trunc(encomienda.pesoEncomienda * valor.tarifa)
    }));

    renderizarTablaValores(valoresEncomienda);
    mensajeResumen.textContent = `Peso total de la encomienda: ${encomienda.pesoEncomienda.toFixed(2)} kg.`;
}

function limpiarBultos() {
    encomienda.bultos.length = 0;
    encomienda.pesoEncomienda = 0;
    contenedorTablaBultos.innerHTML = "";
    contenedorTablaValores.innerHTML = "";
    mensajeResumen.textContent = "Lista de bultos vacía.";
    limpiarFormulario();
}

function renderizarTablaBultos() {
    if (encomienda.bultos.length === 0) {
        contenedorTablaBultos.innerHTML = "<p>No hay bultos agregados.</p>";
        return;
    }

    const tabla = document.createElement("table");
    tabla.className = "table table-bordered table-striped";
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>#</th>
                <th>Peso físico (kg)</th>
                <th>Ancho (cm)</th>
                <th>Largo (cm)</th>
                <th>Alto (cm)</th>
                <th>Peso volumétrico (kg)</th>
                <th>Peso mayor (kg)</th>
            </tr>
        </thead>
        <tbody>
            ${encomienda.bultos.map((bulto, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${bulto.pesoFisico}</td>
                    <td>${bulto.ancho}</td>
                    <td>${bulto.largo}</td>
                    <td>${bulto.alto}</td>
                    <td>${bulto.pesoVolumetrico}</td>
                    <td>${bulto.pesoMayor}</td>
                </tr>
            `).join("")}
        </tbody>
    `;

    contenedorTablaBultos.innerHTML = "";
    contenedorTablaBultos.appendChild(tabla);
}

function renderizarTablaValores(valores) {
    if (valores.length === 0) {
        contenedorTablaValores.innerHTML = "<p>No hay valores calculados.</p>";
        return;
    }

    const tabla = document.createElement("table");
    tabla.className = "table table-bordered table-striped";
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Origen</th>
                <th>Destino</th>
                <th>Tarifa</th>
                <th>Valor envío</th>
            </tr>
        </thead>
        <tbody>
            ${valores.map(valor => `
                <tr>
                    <td>${valor.origen}</td>
                    <td>${valor.destino}</td>
                    <td>${valor.tarifa}</td>
                    <td>${valor.valorEnvio}</td>
                </tr>
            `).join("")}
        </tbody>
    `;

    contenedorTablaValores.innerHTML = "";
    contenedorTablaValores.appendChild(tabla);
}

function validarEntrada(valor) {
    return Number.isFinite(valor) && valor > 0;
}

function calculaPesoVolumetrico(ancho, largo, alto, factor) {
    return (ancho * largo * alto) / factor;
}

function limpiarFormulario() {
    formularioBulto.reset();
    pesoFisicoInput.focus();
}

limpiarBultos();
