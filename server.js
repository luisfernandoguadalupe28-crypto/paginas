const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const archivo = "datos.json";

// GUARDAR
app.post("/registrar", (req, res) => {

    const datos = JSON.parse(fs.readFileSync(archivo));

    datos.push(req.body);

    fs.writeFileSync(archivo, JSON.stringify(datos, null, 2));

    res.send("Guardado correctamente");
});

// MOSTRAR
app.get("/motos", (req, res) => {

    const datos = JSON.parse(fs.readFileSync(archivo));

    res.json(datos);

});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor http://localhost:3000");
});