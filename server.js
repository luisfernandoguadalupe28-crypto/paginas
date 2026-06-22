const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const archivo = "datos.json";

// RUTA PARA GUARDAR DATOS
app.post("/registrar", (req, res) => {
    let datos = [];
    try {
        const contenido = fs.readFileSync(archivo, "utf8");
        datos = contenido.trim() ? JSON.parse(contenido) : [];
    } catch (e) {
        datos = [];
    }

    datos.push(req.body);

    fs.writeFileSync(archivo, JSON.stringify(datos, null, 2));
    res.send("Guardado correctamente");
});

// RUTA PARA MOSTRAR DATOS
app.get("/motos", (req, res) => {
    let datos = [];
    try {
        const contenido = fs.readFileSync(archivo, "utf8");
        datos = contenido.trim() ? JSON.parse(contenido) : [];
    } catch (e) {
        datos = [];
    }
    res.json(datos);
});

// PUERTO DINÁMICO (Compatible con tu PC en puerto 3000 y con Render en internet)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});