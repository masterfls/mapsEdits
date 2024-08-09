const renderizar = addEventListener("DOMContentLoaded", () => {
    async function fetchProtectedData(){
        try{
            const token = sessionStorage.getItem('token'); //obtengo y guardo el token
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
    
    let rol = '';
    sessionStorage.removeItem("user")
    sessionStorage.setItem("disabled", rol)

    const response = async () => {
        //obtengo el usuario que esta realizando esta peticion. si ese usuario tiene el rol admin, renderizo la informacion.
        const id = await fetchProtectedData()
        const user = await axios.get("http://localhost:3002/users/id", {params: {id: id.id}});
        const rol = user.data.user.rol
        console.log("este es el usuario: ", user.data.user)
        console.log("este es el rol del usuario: ", rol)

        if(rol === 'admin'){

            const data = await axios.get("http://localhost:3002/users/disabled")
            const users = data.data
            console.log("esto hay en users (data.data): ", users)
            const container = document.getElementById("solicitudes")
            container.innerHTML = ''; //vacio el contenedor por si las moscas
            let counter = 0;
            // if(){}
            try {
                users.forEach(user => {
                    counter ++;
    
                    const card = document.createElement("div")
                    card.classList.add("card")
    
                    const card1 = document.createElement("div")
                    card1.classList.add("section")
    
                    const titleUsername = document.createElement("h2")
                    titleUsername.classList.add("title")
                    titleUsername.innerText = user.name
    
                    const card2 = document.createElement("div")
                    card2.classList.add("section")
    
                    const btn1 = document.createElement("button")
                    btn1.classList.add("button")
                    btn1.id = `btn-user-${counter}`
    
                    const btn2 = document.createElement("button")
                    btn2.classList.add("button")
                    btn2.id = `btn-admin-${counter}`
                    // aca deberia agregar el icono de cada boton es decir ✖️ o ✔️
    
                    const card3 = document.createElement("div")
                    card3.classList.add("section")
    
                    const btn3 = document.createElement("button")
                    btn3.classList.add("button")
                    btn3.id = `btn-confirm-${counter}`
    
                    const btn4 = document.createElement("button")
                    btn4.classList.add("button")
                    btn4.id = `btn-delete-${counter}`
    
    
                    card1.appendChild(titleUsername)
                    
                    card2.appendChild(btn1)
                    card2.appendChild(btn2)
                    
                    card3.appendChild(btn3)
                    card3.appendChild(btn4)
                    
                    card.appendChild(card1)
                    card.appendChild(card2)
                    card.appendChild(card3)
    
                    container.appendChild(card)
                    
                    btn1.addEventListener('click', () => handleRoleSelection(user, 'user'));
                    btn2.addEventListener('click', () => handleRoleSelection(user, 'admin'));
                    btn3.addEventListener('click', () => confirmUser(user));
                    btn4.addEventListener('click', () => deleteUser(user));
                });
            } catch (error) {
                console.error(error)
            }
        }else{
            alert("permisos insuficientes. se necesita en rol de admin para acceder ")
            window.location.href = 'index.html'
        }
        }
    response()
});

const userRole = async(user, rol) =>{
    console.log(`el id del usaurio actual es: ${user.id} y el rol elejido es: ${rol}`)
    await axios.put("http://localhost:3002/users/update", {
        id: user.id,
        role: rol
    })

}

const userDelete = async(id) => {
    await axios.delete("http://localhost:3002/user/delete", {params: {id: id}})
}

const handleRoleSelection = (user, role) => {
    sessionStorage.removeItem("disabled")
    sessionStorage.setItem("user", role)
    rol = sessionStorage.getItem("user")

}

const confirmUser = (user) => {
    if (sessionStorage.user){
        console.log(`se agregara el usuario ${user.name} con el rol ${rol}`)
        userRole(user, rol)

    }else{
        alert("debes asignar un rol antes de agregarlo a la base de datos")
    }
}

const deleteUser = (user) => {
    console.log(`se eliminara al usuario ${user.name} de la base de datos`)
    userDelete(user.id)
}

