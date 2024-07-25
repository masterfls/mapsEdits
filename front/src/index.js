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
                },
                // id: 0
            };
            console.log("linea dibujada: ", linea)
            // Guardar la línea llamando a la función guardarLinea
            guardarLinea(linea);
        }
    });
    // const id = fetchProtectedData();
        //funcion de prueba token

    async function fetchProtectedData(){
        try{
            const token = localStorage.getItem('token'); //obtengo y guardo el token
            const envio = await axios.get('http://127.0.0.1:3002/users/validate/token', {
                headers: {
                    'Authorization': `Bearer ${token}`  // Envía el token en el encabezado Authorization
                }
            })
            return envio.data

        }catch (error){
            console.error("error fetching protected data: ", error)
        }
    }

    // Función para guardar la línea en tu aplicación
    async function guardarLinea(linea) {
        try {
            const id = await fetchProtectedData();
            console.log("linea: ", linea)
            // linea.id = id
            const response = await axios.post('http://127.0.0.1:3002/api/lineas', linea) ;
        } catch (error) {
            console.error('Error al guardar la línea:', error);
        }
    }

    // Función para obtener y dibujar polilíneas guardadas desde el backend
    async function drawSavedPolylines() {
        try {
            const id = await fetchProtectedData();
            const response = await axios.get('http://localhost:3002/api/lineas/get', { params: { id: id } });
            const savedPolylines = response.data;
            console.log("response.data: ", response.data)
            savedPolylines.forEach((line) => {
                const coordenadas = line.coordenadas;
    
                // Dibuja la línea en el mapa
                new google.maps.Polyline({
                    path: coordenadas,
                    strokeColor: line.estilos?.color || '#FF0000', // Default color
                    strokeOpacity: 1.0,
                    strokeWeight: line.estilos?.grosor || 2, // Default weight
                    editable: false, // No editable si solo se están mostrando
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




