document.addEventListener('DOMContentLoaded', () => {
  const parrafo = document.getElementById('parrafo')
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/front/src/service-worker.js', { scope: '/front/src/' }).then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      }, function(error) {
        console.log('Service Worker registration failed:', error);
      });
    });
  }
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
        const response = await axios.post('https://www.ievg.online/users/login', userlogin);
        if(response.data.token){
          sessionStorage.setItem('token', response.data.token)
          window.location.href = "https://www.ievg.online/front/pages/home.html";

        }
      } catch (error) {
        parrafo.innerHTML = "Incorrect Username or Password"
        console.error('Error registering user:', error);
      }
    }
  });

