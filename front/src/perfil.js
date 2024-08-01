
document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", () => {
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
    const response = async() => {
        try{
            const token = await fetchProtectedData()
            const data = await axios.get('http://localhost:3002/users/id', {params: {id: token}})

            //completo los campos con la informacion obtenida desde el servidor
            name.innerHTML = data.data.user.name
            mail.innerHTML = data.data.user.email
            birthdate.innerHTML = data.data.user.birthdate
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
