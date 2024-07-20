document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('loginForm');
  
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      const userlogin = {
        username,
        password
      };
  
      userSave(userlogin);
    });
  
    async function userSave(userlogin) {
      try {
        const response = await axios.post('http://127.0.0.1:3002/users/login', userlogin);
        console.log('User:', response.data);
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  });
  