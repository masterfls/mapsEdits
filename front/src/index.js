document.addEventListener('DOMContentLoaded', function () {
    const configuracionToggle = document.getElementById('configuracion-toggle');
    const lineToggle = document.getElementById('line-toggle');
    const grosorToggle = document.getElementById('grosor-toggle');
    const colorToggle = document.getElementById('color-toggle');

    if (configuracionToggle) {
        configuracionToggle.addEventListener('click', function (event) {
            event.preventDefault();
            const configMenu = document.getElementById('configuracion-menu');
            configMenu.style.display = configMenu.style.display === 'none' ? 'block' : 'none';
            configMenu.classList.toggle('active');
        });
    }

    if (lineToggle) {
        lineToggle.addEventListener('click', function (event) {
            event.preventDefault();
            const lineMenu = document.getElementById('line-menu');
            lineMenu.style.display = lineMenu.style.display === 'none' ? 'block' : 'none';
            lineMenu.classList.toggle('active');
        });
    }

    if (grosorToggle) {
        grosorToggle.addEventListener('click', function (event) {
            event.preventDefault();
            const grosorMenu = document.getElementById('grosor-menu');
            grosorMenu.style.display = grosorMenu.style.display === 'none' ? 'block' : 'none';
            grosorMenu.classList.toggle('active');
        });
    }

    if (colorToggle) {
        colorToggle.addEventListener('click', function (event) {
            event.preventDefault();
            const colorMenu = document.getElementById('color-menu');
            colorMenu.style.display = colorMenu.style.display === 'none' ? 'block' : 'none';
            colorMenu.classList.toggle('active');
        });
    }
});


function initMap() {
    async function fetchProtectedData() {
        try {
            const token = sessionStorage.getItem('token'); // Obtengo y guardo el token
            if (!token) {
                throw new Error("token not found");
            }
            const envio = await axios.get('https://ievg.online/users/validate/token', {
                headers: {
                    'Authorization': `Bearer ${token}` // Envía el token en el encabezado Authorization
                }
            });
            return envio.data.id;
        } catch (error) {
            console.error("error fetching protected data: ", error);
        }
    }

    const miToken = sessionStorage.getItem('token');
    if (!miToken) return window.location.href = 'login.html';

    const getuser = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log("No token found. please log in.");
            return;
        }
        const id = await fetchProtectedData();

        console.log("el id del usuario es: ", id);
        const data = await axios.get("https://ievg.online/users/id", { params: { id: id } });
        if (data.data.user.rol === "user" || data.data.user.rol === "admin") {

            const grosorItems = document.querySelectorAll('#grosor-menu li a');
            const colorItems = document.querySelectorAll('#color-menu li a');
            const grosorMenu = document.getElementById('grosor-menu');
            const colorMenu = document.getElementById('color-menu');

            grosorItems.forEach(function (item) {
                item.addEventListener('click', function (event) {
                    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
                    const selectedGrosor = this.textContent; // Capturar el texto del elemento seleccionado
                    sessionStorage.setItem('tokenGrosor', selectedGrosor);
                    grosorMenu.style.display = 'none';
                });
            });

            colorItems.forEach(function (item) {
                item.addEventListener('click', function (event) {
                    event.preventDefault();
                    const selectedColor = this.textContent;
                    sessionStorage.setItem('tokenColor', selectedColor);
                    colorMenu.style.display = 'none';
                });
            });

            const opcionesMapa = { zoom: 18, mapTypeId: 'roadmap' };

            // Uso de geolocation para abrir el mapa en la posición actual del dispositivo
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    map.setCenter(pos);

                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: 'Ubicación actual'
                    });
                }, function () {
                    handleLocationError(true, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, map.getCenter());
            }

            function handleLocationError(browserHasGeolocation, pos) {
                alert(browserHasGeolocation ?
                    'Error: El servicio de Geolocalización falló.' :
                    'Error: Tu navegador no soporta geolocalización.');
            }

            const tokenGrosor = sessionStorage.getItem('tokenGrosor');
            const tokenColor = sessionStorage.getItem('tokenColor');

            console.log(`el valor del grosor elegido es de: ${tokenGrosor}`);
            console.log(`el valor del color elegido es de: ${tokenColor}`);
            const map = new google.maps.Map(document.getElementById("map"), opcionesMapa);
            const drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: null,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.POLYLINE]
                },
                polylineOptions: {
                    editable: true,
                    clickable: true,
                    strokeColor: tokenColor,
                    strokeWeight: tokenGrosor
                }
            });
            drawingManager.setMap(map);

            // Escuchar el evento 'overlaycomplete' para capturar la línea dibujada
            google.maps.event.addListener(drawingManager, 'overlaycomplete', async function (event) {
                if (event.type === google.maps.drawing.OverlayType.POLYLINE) {
                    const nuevaLinea = event.overlay;
                    const coordenadas = nuevaLinea.getPath().getArray();

                    const linea = {
                        coordenadas: coordenadas.map(function (coord) {
                            return { lat: coord.lat(), lng: coord.lng() };
                        }),
                        estilo: {
                            color: nuevaLinea.tokenColor,
                            grosor: nuevaLinea.tokenGrosor
                        },
                        userId: await fetchProtectedData()
                    };
                    console.log("linea dibujada: ", linea);
                    // Guardar la línea llamando a la función guardarLinea
                    await guardarLinea(linea);

                    google.maps.event.addListener(nuevaLinea, 'click', function () {
                        nuevaLinea.setMap(null); // Esto eliminará la línea del mapa
                        // Llamar al endpoint para eliminar la línea de la DB
                    });
                }
            });

            // Función para guardar la línea en tu aplicación
            async function guardarLinea(linea) {
                try {
                    const token = sessionStorage.getItem('token'); // Me aseguro de obtener el token aquí
                    if (!token) {
                        throw new Error("Token not found");
                    }

                    const id = await fetchProtectedData();
                    console.log("linea: ", linea);
                    linea.userId = id;
                    console.log(`el usuario actual tiene id ${id}`);

                    const response = await axios.post('https://ievg.online/api/lineas/post', linea, {
                        headers: {
                            'Authorization': `Bearer ${token}` // Envía el token en el encabezado Authorization
                        }
                    });
                } catch (error) {
                    console.error('Error al guardar la línea:', error);
                }
            }
            async function deleteLinea(id){
                try {
                    await axios.delete('https://ievg.online/api/lineas/delete', {params: {id: id}})
                    console.log(`se eliminara la linea que pertenezca al id: ${id}`)
                    return 
                } catch (error) {
                    console.error("Error al eliminar la linea seleccionada ", error)
                }
            }

            // Función para obtener y dibujar polilíneas guardadas desde el backend
            async function drawSavedPolylines() {
                let index = 0;
                try {
                    const id = await fetchProtectedData();
                    const response = await axios.get('https://ievg.online/api/lineas/get', { params: { id: id } });
                    const savedPolylines = response.data;
                    savedPolylines.forEach((line) => {
                        const coordenadas = line.coordenadas;

                        // Dibuja la línea en el mapa
                        const nuevaLinea = new google.maps.Polyline({
                            path: coordenadas,
                            strokeColor: tokenColor || "red", // Default color
                            strokeOpacity: 1.0,
                            strokeWeight: tokenGrosor || 2, // Default weight
                            editable: true, // No editable si solo se están mostrando
                            clickable: true,
                            map: map,
                        });

                        nuevaLinea.id = response.data[index].id;
                        index += 1;
                        google.maps.event.addListener(nuevaLinea, 'click', function () {
                            nuevaLinea.setMap(null); // Esto eliminará la línea del mapa
                            deleteLinea(nuevaLinea.id)
                            console.log("Línea borrada.");                        
                        });
                    });
                } catch (error) {
                    console.error('Error al obtener las polilíneas guardadas:', error);
                }
            }

            // Llamar a la función para dibujar las polilíneas cuando se cargue el mapa
            drawSavedPolylines();
        } else {
            alert("welcome to mapsedits, soon have access ⛷️");
        }
    }
    getuser();
}
