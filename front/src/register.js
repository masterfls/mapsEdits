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
  
      userSave(user);
    });
  
    async function userSave(user) {
      try {
        const response = await axios.post('http://127.0.0.1:3002/users/register', user);
        console.log('User:', response.data);
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  });
  