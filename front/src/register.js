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
        if(!response.data){
          window.location.href = "login.html"
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }

    const sendConfirmationEmail = (user, token) => {
      const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "your-email@example.com",
                "Name": "Your Name"
              },
              "To": [
                {
                  "Email": user.email,
                  "Name": user.name
                }
              ],
              "Subject": "Confirma tu correo electrónico",
              "HTMLPart": `<p>Hola ${user.name},</p>
                           <p>Gracias por registrarte. Por favor, confirma tu correo haciendo clic en el siguiente enlace:</p>
                           <a href="http://your-domain.com/confirm?token=${token}">Confirmar Correo</a>`
            }
          ]
        });
    
      request
        .then((result) => {
          console.log(result.body);
        })
        .catch((err) => {
          console.error('Error al enviar el correo de confirmación:', err);
        });
    };
    
    


  });
  