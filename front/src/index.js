// function initMap() {
//     const canada = {
//         lat: 43.662155,
//         lng: -79.397823
//     };
//     const opcionesMapa = {
//         zoom: 18, 
//         center: canada 
//     };
//     map = new google.maps.Map(document.getElementById("map"), opcionesMapa);

//         const drawingManager = new google.maps.drawing.DrawingManager({
//         drawingMode: google.maps.drawing.OverlayType.POLYLINE,
//         drawingControl: true,
//         drawingControlOptions: {
//             position: google.maps.ControlPosition.TOP_CENTER,
//             drawingModes: [google.maps.drawing.OverlayType.POLYLINE]
//         },
//         polylineOptions: {
//             editable: true, // Permitir que la línea sea editable
//             strokeColor: '#FF0000', // Color de la línea en formato hexadecimal
//             strokeWeight: 3 // Grosor de la línea en píxeles
//         }
//     });
//     drawingManager.setMap(map);
//     // Escuchar el evento 'overlaycomplete' para capturar la línea dibujada
//     google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
//         if (event.type === google.maps.drawing.OverlayType.POLYLINE) {
//             const nuevaLinea = event.overlay; // Obtener el objeto que representa la línea dibujada
//             const coordenadas = nuevaLinea.getPath().getArray(); // Obtener las coordenadas de la línea

//             const linea = {
//                 coordenadas: coordenadas.map(function(coord) {
//                     return { lat: coord.lat(), lng: coord.lng() };
//                 }),
//                 estilo: {
//                     color: nuevaLinea.strokeColor, // Color de la línea
//                     grosor: nuevaLinea.strokeWeight // Grosor de la línea
//                 },
//                 // usuario: 'nombreUsuario' // Nombre de usuario que dibujó la línea (puedes obtenerlo de tu sistema de login)
//             };

//             // Guardar la línea llamando a la función guardarLinea
//             guardarLinea(linea);
//         }
//     });

//     // Función para guardar la línea en tu aplicación
// async function guardarLinea(linea) {
//     try {
//         // Enviar la línea al backend usando Axios y esperar la respuesta
//         const response = await axios.post('http://127.0.0.1:3002/api/lineas', linea);
//         // console.log(response.data)
//         console.log('Línea guardada en el backend:', response.data);
//     } catch (error) {
//         console.error('Error al guardar la línea:', error);
//     }
// }
// }

// // Función para obtener y dibujar polilíneas guardadas desde el backend

// async function drawSavedPolylines() {
//     try {
//         const response = await axios.get('http://localhost:3002/api/lineas/get'); // Cambia la URL por la correcta

//         // Suponiendo que el backend devuelve un array de objetos con coordenadas y estilos
//         const savedPolylines = response.data;

//         // Inicializar el mapa
//         const canada = { lat: 43.662155, lng: -79.397823 };
//         const map = new google.maps.Map(document.getElementById("map"), {
//             zoom: 18,
//             center: canada,
//         });

//         // Iterar sobre las polilíneas guardadas y dibujarlas en el mapa
//         savedPolylines.forEach((line) => {
//             const polyline = new google.maps.Polyline({
//                 path: line.coordenadas,
//                 strokeColor: line.color,
//                 strokeOpacity: 1.0,
//                 strokeWeight: line.grosor,
//                 editable: false, // No editable si solo se están mostrando
//                 map: map,
//             });
//         });

//     } catch (error) {
//         console.error('Error al obtener las polilíneas guardadas:', error);
//         // Manejar errores si es necesario
//     }
// }

// // Llamar a la función para dibujar las polilíneas cuando se cargue la página
// document.addEventListener('DOMContentLoaded', drawSavedPolylines);


function initMap() {
    const canada = { lat: 43.662155, lng: -79.397823 };
    const opcionesMapa = { zoom: 18, center: canada };
    const map = new google.maps.Map(document.getElementById("map"), opcionesMapa);

    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYLINE,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYLINE]
        },
        polylineOptions: {
            editable: true,
            strokeColor: '#FF0000',
            strokeWeight: 3
        }
    });
    drawingManager.setMap(map);

    // Escuchar el evento 'overlaycomplete' para capturar la línea dibujada
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
        if (event.type === google.maps.drawing.OverlayType.POLYLINE) {
            const nuevaLinea = event.overlay;
            const coordenadas = nuevaLinea.getPath().getArray();

            const linea = {
                coordenadas: coordenadas.map(function(coord) {
                    return { lat: coord.lat(), lng: coord.lng() };
                }),
                estilo: {
                    color: nuevaLinea.strokeColor,
                    grosor: nuevaLinea.strokeWeight
                }
            };

            // Guardar la línea llamando a la función guardarLinea
            guardarLinea(linea);
        }
    });

    // Función para guardar la línea en tu aplicación
    async function guardarLinea(linea) {
        try {
            const response = await axios.post('http://127.0.0.1:3002/api/lineas', linea);
            console.log('Línea guardada en el backend:', response.data);
        } catch (error) {
            console.error('Error al guardar la línea:', error);
        }
    }

    // Función para obtener y dibujar polilíneas guardadas desde el backend
    async function drawSavedPolylines() {
        try {
            const response = await axios.get('http://localhost:3002/api/lineas/get');
            const savedPolylines = response.data;

            // Iterar sobre las polilíneas guardadas y dibujarlas en el mapa
            savedPolylines.forEach((line) => {
                const polyline = new google.maps.Polyline({
                    path: line.coordenadas,
                    strokeColor: line.color,
                    strokeOpacity: 1.0,
                    strokeWeight: line.grosor,
                    editable: false,                // No editable si solo se están mostrando
                    map: map,
                });
            });

        } catch (error) {
            console.error('Error al obtener las polilíneas guardadas:', error);
        }
    }

    // Llamar a la función para dibujar las polilíneas cuando se cargue el mapa
    drawSavedPolylines();
}

// Llamar a la función para inicializar el mapa cuando se cargue la página
// document.addEventListener('DOMContentLoaded', initMap);
