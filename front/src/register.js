document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const birthdate = document.getElementById('birthdate').value;
      const nDni = document.getElementById('nDni').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const user = {
        name,
        email,
        birthdate,
        nDni,
        username,
        password
      };

      console.log('datos del usuario',user)

      userSave(user);

    });

    async function userSave(user) {
      try {
        const response = await axios.post('https://www.ievg.online/users/register', user);
        if(!response.data){
          window.location.href = "/index.html"
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  });

