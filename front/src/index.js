function initMap() {
    async function fetchProtectedData(){
        try{
            const token = sessionStorage.getItem('token'); //obtengo y guardo el token
            if (!token) {
                throw new Error("token not found")
            }
            const envio = await axios.get('http://127.0.0.1:3002/users/validate/token', {
                headers: {
                    'Authorization': `Bearer ${token}`  // Envía el token en el encabezado Authorization
                }
            });
            // console.log("esto es token.envio", token)
            // console.log("este es el envio", envio)
            return envio.data.id
        }catch (error){
            console.error("error fetching protected data: ", error)
        }
    }
    
    
    const getuser = async() => {
        const token = sessionStorage.getItem('token')
        if(!token){
            console.log("No token found. please log in.")
            return;
        }
        const id = await fetchProtectedData();

        console.log("el token del usuario es: ", id)
        const data = await axios.get("http://localhost:3002/users/id", {params: {id: id}});
        if(data.data.user.rol === "user" | data.data.user.rol === "admin"){
                
        //config menu hamburguesa
        const nav = document.querySelector("#nav");
        const menu = document.querySelector("#btn-hamburguesa");
        const cerar = document.querySelector("#btn-cerar");
        const seccion = document.getElementById("sing-in")
        const mycheck = document.getElementById("mycheck");
        const barra = document.getElementById("barra")
        const list = document.getElementById("enlace")

        menu.addEventListener("click", () => {
            if (mycheck.checked && menu){
                nav.classList.remove("darkinvisible")
                nav.classList.add("dark")
            }else{
                nav.classList.remove('dark')
                nav.classList.add("visible")
            }
        })
        
        cerar.addEventListener("click", () =>{            
            if (mycheck.checked){
                nav.classList.remove("dark")
                nav.classList.add("darkinvisible")
            }else{
                nav.classList.remove("visible")
            }
        })

        seccion.addEventListener("click", (event) => {
            sessionStorage.removeItem("token");
            window.location.href = "login.html";
        })

        mycheck.addEventListener("change", () => {
            if (mycheck.checked) {
                const ischecked = mycheck.checked;
                sessionStorage.setItem("darkMode", ischecked)
                barra.classList.add("visible")
                nav.classList.remove("visible")
                nav.classList.add("dark")
                list.classList.add("dark")
            }else {
                const ischecked = mycheck.checked;
                sessionStorage.setItem("darkMode", ischecked)
                barra.classList.remove("visible")
                nav.classList.remove("dark")
                nav.classList.add("visible")
                enlace.classList.remove("dark")
            }
        })
        
        const isDarkMode = sessionStorage.getItem('darkMode') === 'true';
        
        if (isDarkMode){
            barra.classList.add("visible")
            nav.classList.remove("visible")
            nav.classList.add("darkinvisible")
            list.classList.add("dark")
            mycheck.checked = true
        }else{
            nav.classList.remove("dark")
            enlace.classList.remove("dark")
            mycheck.checked = false;
        }

        // const canada = { lat: 43.662155, lng: -79.397823 };
        const opcionesMapa = { zoom: 18, mapTypeId: 'roadmap' };

        //uso de geolocation para abrir el mapa en la posicion actual del dispositivo
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
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
            }, function() {
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




        const map = new google.maps.Map(document.getElementById("map"), opcionesMapa);
        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            // drawingMode: google.maps.drawing.OverlayType.POLYLINE
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYLINE]
            },
            polylineOptions: {
                editable: true,
                clickable: true,
                strokeColor: '#FF0000',
                strokeWeight: 3
            }
        });
        drawingManager.setMap(map);

        // Escuchar el evento 'overlaycomplete' para capturar la línea dibujada
        google.maps.event.addListener(drawingManager, 'overlaycomplete', async function(event) {
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
                    userId: await fetchProtectedData()
                };
                console.log("linea dibujada: ", linea)
                // Guardar la línea llamando a la función guardarLinea
               await guardarLinea(linea);

                google.maps.event.addListener(nuevaLinea, 'click', function(){
                    nuevaLinea.setMap(null)   //esto eliminara la linea del mapa (no renderiza esa linea pero seguira almacenada el la DB)
                    //ACA DEBE LLAMAR AL ENDPOINT QUE SE ENCARGARA DE ELIMINAR LA LINEA DE LA DB
                })
            }

        });


        // Función para guardar la línea en tu aplicación
        async function guardarLinea(linea) {
            try {
                const token = sessionStorage.getItem('token');    // me aseguro de obtener el token aqui
                if(!token){
                    throw new Error("Token not found")
                }

                const id = await fetchProtectedData();
                console.log("linea: ", linea)
                linea.userId = id;
                console.log(`el usuario actual tiene id ${id}`)

                const response = await axios.post('http://127.0.0.1:3002/api/lineas', linea,{
                    headers: {
                        'Authorization': `Bearer ${token}`  // Envía el token en el encabezado Authorization
                    }
                });
            } catch (error) {
                console.error('Error al guardar la línea:', error);
            }
        }

        async function deleteLinea(id){
            try {
                await axios.delete('http://localhost:3002/api/linea/delete', {params: {id: id}})
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
                const response = await axios.get('http://localhost:3002/api/lineas/get', { params: { id: id } });
                const savedPolylines = response.data;
                savedPolylines.forEach((line) => {
                    const coordenadas = line.coordenadas;
        
                    // Dibuja la línea en el mapa
                    const nuevaLinea = new google.maps.Polyline({
                        path: coordenadas,
                        strokeColor: line.estilos?.color || '#FF0000', // Default color
                        strokeOpacity: 1.0,
                        strokeWeight: line.estilos?.grosor || 2, // Default weight
                        editable: true, // No editable si solo se están mostrando
                        clickable: true,
                        map: map,
                    });                
                    nuevaLinea.id = response.data[index].id;
                    index += 1;
                    google.maps.event.addListener(nuevaLinea, 'click', function() {
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
    }else{
            alert("welcome to mapsedits, soon have access ⛷️")
        }
    }
    getuser()
    
}





