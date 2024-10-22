import express  from "express";    //me traigo la libreria express que me servira para crear mi servidor
import path from 'path';
import cors from "cors";
import morgan from "morgan";
import router from "./router/index"
import fs from 'fs';
import https from 'https';
import http from 'http';

const app = express();          //creo mi servidor en la constante app


app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: ['https://www.ievg.online', 'https://ievg.online'], // Permitir solicitudes desde el dominio de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  if (req.path === '/service-worker.js') {
      return next(); // Permite el acceso sin autenticación
  }
  // Lógica de autenticación aquí
});

// Sirve archivos estáticos desde la carpeta "mapsEdits"
app.use(express.static(path.join(__dirname, '../mapsEdits')));

// Redirige la ruta raíz (/) al archivo HTML de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../mapsEdits', 'index.html'));
});


app.use(router)         //tengo el servidor, el enrutador, se hace la peticion y en esta linea lego hacia donde ira la solicitud, en este caso al anrutador

// Configuración de HTTPS
const privateKey = fs.readFileSync('/etc/letsencrypt/live/ievg.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ievg.online/fullchain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate
};

// Crear el servidor HTTPS
const httpsServer = https.createServer(credentials, app);

// Iniciar el servidor HTTPS
httpsServer.listen(3002, () => {
    console.log('HTTPS Server running on port 3002');
});


// Crear el servidor HTTP para redirigir tráfico a HTTPS
const httpApp = express();

httpApp.use((req, res, next) => {
  // Redirigir a HTTPS si no es una solicitud segura
  if (req.secure) {
    return next();
  }
  // Redirigir a HTTPS
  res.redirect(`https://${req.headers.host}${req.url}`);
});

// Iniciar el servidor HTTP en el puerto 80
const httpServer = http.createServer(httpApp);

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80 and redirecting to HTTPS');
});

export default app;
