"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //me traigo la libreria express que me servira para crear mi servidor
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./router/index"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)(); //creo mi servidor en la constante app
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
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
app.use(express_1.default.static(path_1.default.join(__dirname, '../mapsEdits')));
// Redirige la ruta raíz (/) al archivo HTML de inicio
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../mapsEdits', 'index.html'));
});
app.use(index_1.default); //tengo el servidor, el enrutador, se hace la peticion y en esta linea lego hacia donde ira la solicitud, en este caso al anrutador
// Configuración de HTTPS
const privateKey = fs_1.default.readFileSync('/etc/letsencrypt/live/ievg.online/privkey.pem', 'utf8');
const certificate = fs_1.default.readFileSync('/etc/letsencrypt/live/ievg.online/fullchain.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate
};
// Crear el servidor HTTPS
const httpsServer = https_1.default.createServer(credentials, app);
// Iniciar el servidor HTTPS
httpsServer.listen(3002, () => {
    console.log('HTTPS Server running on port 3002');
});
// Crear el servidor HTTP para redirigir tráfico a HTTPS
const httpApp = (0, express_1.default)();
httpApp.use((req, res, next) => {
    // Redirigir a HTTPS si no es una solicitud segura
    if (req.secure) {
        return next();
    }
    // Redirigir a HTTPS
    res.redirect(`https://${req.headers.host}${req.url}`);
});
// Iniciar el servidor HTTP en el puerto 80
const httpServer = http_1.default.createServer(httpApp);
httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80 and redirecting to HTTPS');
});
exports.default = app;
