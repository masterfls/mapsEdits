import axios from "axios";

let map;

function initMap() {
    let canada = {
        lat: 43.662155,
        lng: -79.397823
    };

    map = new google.maps.Map(document.getElementById("map"), { center: canada, zoom: 18 });

    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYLINE,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYLINE]
        },
        polylineOptions: {
            editable: true, // Permitir que la línea sea editable
            strokeColor: '#FF0000', // Color de la línea en formato hexadecimal
            strokeWeight: 3 // Grosor de la línea en píxeles
        }
    });
    drawingManager.setMap(map);

    // Escuchar el evento 'overlaycomplete' para capturar la línea dibujada
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
        if (event.type === google.maps.drawing.OverlayType.POLYLINE) {
            const nuevaLinea = event.overlay; // Obtener el objeto que representa la línea dibujada
            const coordenadas = nuevaLinea.getPath().getArray(); // Obtener las coordenadas de la línea

            const linea = {
                coordenadas: coordenadas.map(function(coord) {
                    return { lat: coord.lat(), lng: coord.lng() };
                }),
                estilo: {
                    color: nuevaLinea.strokeColor, // Color de la línea
                    grosor: nuevaLinea.strokeWeight // Grosor de la línea
                },
                // usuario: 'nombreUsuario' // Nombre de usuario que dibujó la línea (puedes obtenerlo de tu sistema de login)
            };

            // Guardar la línea llamando a la función guardarLinea
            guardarLinea(linea);
        }
    });
}

// Función para guardar la línea en tu aplicación
function guardarLinea(linea) {
    // Enviar la línea al backend usando Axios
    axios.post('/api/lineas', linea)
        .then(response => console.log('Línea guardada en el backend:', response.data))
        .catch(error => console.error('Error al guardar la línea:', error));
}
