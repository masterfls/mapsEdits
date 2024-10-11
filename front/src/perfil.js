
document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = "home.html"
});

document.addEventListener("DOMContentLoaded", () => {
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
    const miToken = sessionStorage.getItem('token')
    if(!miToken) return window.location.href = '/index.html'
    const response = async() => {
        try{
            const token = sessionStorage.getItem('token'); //obtengo y guardo el token
            const id = await fetchProtectedData();
            const data = await axios.get('https://ievg.online/users/id', {params: {id: id.id}})

            //completo los campos con la informacion obtenida desde el servidor
            const date = new Date(data.data.user.birthdate)
            name.innerHTML = data.data.user.name
            mail.innerHTML = data.data.user.email
            birthdate.innerHTML = date.toLocaleDateString()
            dni.innerHTML = data.data.user.nDni
            username.innerHTML = data.data.username
            h2.innerHTML = "Hello! " + data.data.username
        }
        catch{
            console.log("Get Users error")
        }
    }
    const data = response()

    const name = document.getElementById("full-name");
    const mail = document.getElementById("email")
    const birthdate = document.getElementById("birthdate");
    const username = document.getElementById("username")
    const dni = document.getElementById("nDni")
    const h2 = document.getElementById("title")
})
