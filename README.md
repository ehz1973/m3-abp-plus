# Calculadora de valor de envío de una encomienda

Este proyecto es una pequeña aplicación web que permite calcular el valor de envío de una encomienda a partir de los bultos que la componen. La aplicación solicita datos de cada bulto mediante ventanas `prompt`, calcula el peso volumétrico y utiliza el mayor entre el peso físico y el peso volumétrico para determinar el peso facturable.

## Características

- Captura del peso físico y dimensiones de cada bulto (ancho, largo, alto).
- Cálculo del peso volumétrico con un factor volumétrico de `4000`.
- Selección automática del mayor peso entre físico y volumétrico para cada bulto.
- Suma del peso total de la encomienda.
- Cálculo del valor de envío para distintos destinos desde Santiago.
- Resultados mostrados en la consola del navegador.

## Estructura del proyecto

- `ejercicio1.html` - página principal con la interfaz y el botón para iniciar la calculadora.
- `assets/js/ejercicio1.js` - lógica de JavaScript para capturar datos, calcular pesos y mostrar resultados.

## Cómo usar

1. Abre `ejercicio1.html` en un navegador.
2. Haz clic en el botón "Iniciar Calculadora".
3. Ingresa el peso físico del bulto y sus dimensiones cuando aparezcan las ventanas de entrada.
4. Repite el proceso si tienes más bultos.
5. Revisa los resultados en la consola del navegador (herramientas de desarrollo).

## Notas

- El cálculo del peso volumétrico se realiza como `ancho * largo * alto / 4000`.
- Si el usuario cancela el ingreso de datos de un bulto, tiene la opcion de descartar esos datos o retomar el ingreso de ellos.
- La salida se muestra en la consola para facilitar la inspección de los datos y valores de envío.

## Tecnologías

- HTML
- JavaScript
- Bootstrap 5

## GitHub

- **Repositorio:** https://github.com/ehz1973/m3-abp
- **Desplegable:** https://ehz1973.github.io/m3-abp/ejercicio1.html

## Autor

Exequiel Hernandez
# m3-abp-plus
