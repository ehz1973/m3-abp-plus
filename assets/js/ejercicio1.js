const botonIniciar = document.getElementById("boton-iniciar");

function iniciar() {
    const entradaNumero = { texto: "", numero: 0 };
    const factorVolumetrico = 4000;
    const encomienda = { bultos: [], pesoEncomienda: 0 };
    const valoresEncomienda = [
        { origen: "Santiago", destino: "Santiago", tarifa: 1000, valorEnvio: 0 },
        { origen: "Santiago", destino: "Rancagua", tarifa: 1500, valorEnvio: 0 },
        { origen: "Santiago", destino: "Valparaíso", tarifa: 1500, valorEnvio: 0 },
        { origen: "Santiago", destino: "Coquimbo", tarifa: 2000, valorEnvio: 0 }];
    const cancelarEntrada = null;

    do {
        do {
            // Cada bulto nuevo se agrega con valores iniciales que luego se irán completando con los datos del usuario.
            encomienda.bultos.push({ pesoFisico: 0, ancho: 0, largo: 0, alto: 0, pesoVolumetrico: 0, pesoMayor: 0 });
            do {
                entradaNumero.texto = prompt("Ingrese el peso físico del bulto (kg):");
                if (entradaNumero.texto === cancelarEntrada) {
                    if (confirm("¿Está seguro que desea descartar los datos de este bulto?")) {
                        break;
                    } else {
                        continue;
                    }
                }
                if (esNumero(entradaNumero) && entradaNumero.numero > 0) {
                    encomienda.bultos[encomienda.bultos.length - 1].pesoFisico = entradaNumero.numero;
                    break;
                } else {
                    alert("Debe ingresar un número válido mayor que cero!");
                }
            } while (true);
            if (entradaNumero.texto === cancelarEntrada) {
                encomienda.bultos.pop();
                continue;
            }
            do {
                entradaNumero.texto = prompt("Ingrese el ancho del bulto (cm):");
                if (entradaNumero.texto === cancelarEntrada) {
                    if (confirm("¿Está seguro que desea descartar los datos de este bulto?")) {
                        break;
                    } else {
                        continue;
                    }
                }
                if (esNumero(entradaNumero) && entradaNumero.numero > 0) {
                    encomienda.bultos[encomienda.bultos.length - 1].ancho = entradaNumero.numero;
                    break;
                } else {
                    alert("Debe ingresar un número válido mayor que cero!");
                }
            } while (true);
            if (entradaNumero.texto === cancelarEntrada) {
                encomienda.bultos.pop();
                continue;
            }
            do {
                entradaNumero.texto = prompt("Ingrese el largo del bulto (cm):");
                if (entradaNumero.texto === cancelarEntrada) {
                    if (confirm("¿Está seguro que desea descartar los datos de este bulto?")) {
                        break;
                    } else {
                        continue;
                    }
                }
                if (esNumero(entradaNumero) && entradaNumero.numero > 0) {
                    encomienda.bultos[encomienda.bultos.length - 1].largo = entradaNumero.numero;
                    break;
                } else {
                    alert("Debe ingresar un número válido mayor que cero!");
                }
            } while (true);
            if (entradaNumero.texto === cancelarEntrada) {
                encomienda.bultos.pop();
                continue;
            }
            do {
                entradaNumero.texto = prompt("Ingrese el alto del bulto (cm):");
                if (entradaNumero.texto === cancelarEntrada) {
                    if (confirm("¿Está seguro que desea descartar los datos de este bulto?")) {
                        break;
                    } else {
                        continue;
                    }
                }
                if (esNumero(entradaNumero) && entradaNumero.numero > 0) {
                    encomienda.bultos[encomienda.bultos.length - 1].alto = entradaNumero.numero;
                    break;
                } else {
                    alert("Debe ingresar un número válido mayor que cero!");
                }
            } while (true);
            if (entradaNumero.texto === cancelarEntrada) {
                encomienda.bultos.pop();
                continue;
            }
            encomienda.bultos[encomienda.bultos.length - 1].pesoVolumetrico = calculaPesoVolumetrico(
                encomienda.bultos[encomienda.bultos.length - 1].ancho,
                encomienda.bultos[encomienda.bultos.length - 1].largo,
                encomienda.bultos[encomienda.bultos.length - 1].alto,
                factorVolumetrico
            );
            // Se compara el peso físico con el volumétrico para tomar el mayor como peso del bulto.
            encomienda.bultos[encomienda.bultos.length - 1].pesoMayor = Math.max(encomienda.bultos[encomienda.bultos.length - 1].pesoFisico, encomienda.bultos[encomienda.bultos.length - 1].pesoVolumetrico);
            // El peso del bulto se suma al total de la encomienda para calcular el valor de envío mas adelante.
            encomienda.pesoEncomienda += encomienda.bultos[encomienda.bultos.length - 1].pesoMayor;
        } while (confirm("Desea agregar otro bulto?"));
        // Se calculan los valores de envío para cada posible destino según el peso total acumulado.
        for (const valorEncomienda of valoresEncomienda) {
            valorEncomienda.valorEnvio = Math.trunc(encomienda.pesoEncomienda * valorEncomienda.tarifa);
        }
        if (encomienda.bultos.length > 0) {
            console.log("Datos de los bultos:");
            console.table(encomienda.bultos);
            console.log(`Peso de la encomienda: ${encomienda.pesoEncomienda}`);
            console.log("Valores de envío:");
            console.table(valoresEncomienda);
        } else {
            console.log("Encomienda sin información.");
        }
        // Se reinician los datos para preparar la siguiente encomienda sin conservar valores previos.
        encomienda.bultos.length = 0;
        encomienda.pesoEncomienda = 0;
        valoresEncomienda.forEach(valorEncomienda => valorEncomienda.valorEnvio = 0);
    } while (confirm("Desea procesar una nueva encomienda?"));
}

/**
 * Valida si una cadena de texto representa un número válido y finito.
 * @param {Object} objeto - Objeto que contiene las propiedades a validar
 * @param {string} objeto.texto - Cadena de texto a validar
 * @param {number} objeto.numero - Propiedad donde se asigna el número convertido
 * @returns {boolean} true si la cadena es un número válido y finito, false en caso contrario
 */
function esNumero(objeto) {
    return objeto.texto.trim() !== "" && Number.isFinite(objeto.numero = Number(objeto.texto));
}

/**
 * Calcula el peso volumétrico de un bulto a partir de sus dimensiones y un factor de conversión.
 * @param {number} ancho - Ancho del bulto en centímetros.
 * @param {number} largo - Largo del bulto en centímetros.
 * @param {number} alto - Alto del bulto en centímetros.
 * @param {number} factor - Factor de conversión utilizado para calcular el peso volumétrico.
 * @returns {number} El peso volumétrico calculado.
 */
function calculaPesoVolumetrico(ancho, largo, alto, factor) {
    return (ancho * largo * alto) / factor;
}

botonIniciar.addEventListener("click", iniciar);