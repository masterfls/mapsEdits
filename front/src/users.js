document.addEventListener('DOMContentLoaded', function() {
    async function fetchProtectedData(){
        try{
            const token = sessionStorage.getItem('token'); //obtengo y guardo el token
            const envio = await axios.get('https://ievg.online/users/validate/token', {
                headers: {
                    'Authorization': `Bearer ${token}`  // Envía el token en el encabezado Authorization
                }
            })
            return envio.data

        }catch (error){
            console.error("error fetching protected data: ", error)
        }
    }
    
    const response = async () => {
        const container = document.getElementById('user-container');
        const id = await fetchProtectedData()
        const usuario = await axios.get("https://ievg.online/users/id", {params: {id: id.id}})
        const rol = usuario.data.user.rol

        if(rol !== 'admin') return window.location.href = 'home.html'
        const data = await axios.get("https://ievg.online/users/get")
        const users = data.data

        users.forEach((user, index) => {
            const row = document.createElement("div");
            row.classList.add("user-row");

            const nameCell = document.createElement("div");
            nameCell.classList.add("user-cell");
            nameCell.setAttribute('data-label', 'Name');
            nameCell.innerText = user.name;

            const emailCell = document.createElement("div");
            emailCell.classList.add("user-cell");
            emailCell.setAttribute('data-label', 'Email');
            emailCell.innerText = user.email;

            const birthdateCell = document.createElement("div");
            birthdateCell.classList.add("user-cell");
            birthdateCell.setAttribute('data-label', 'Birthdate');
            const birthdate = new Date(user.birthdate);
            birthdateCell.innerText = birthdate.toLocaleDateString();

            const dniCell = document.createElement("div");
            dniCell.classList.add("user-cell");
            dniCell.setAttribute('data-label', 'DNI');
            dniCell.innerText = user.nDni;

            const statusCell = document.createElement("div");
            statusCell.classList.add("user-cell", user.status === 'active' ? 'active' : 'disabled');
            statusCell.setAttribute('data-label', 'Status');
            statusCell.innerText = user.status;

            const roleCell = document.createElement("div");
            roleCell.classList.add("user-cell", user.rol === 'admin' ? 'admin' : 'user');
            roleCell.setAttribute('data-label', 'Role');
            roleCell.innerText = user.rol;

            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(birthdateCell);
            row.appendChild(dniCell);
            row.appendChild(statusCell);
            row.appendChild(roleCell);

            container.appendChild(row);

        });
    };
            
    response()
});
