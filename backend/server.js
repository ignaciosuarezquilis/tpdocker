const express = require('express');
const nano = require('nano')('http://admin:password@localhost:5984');

let marcas = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Tesla", "Subaru"]; 
let colores = ['rojo', 'verde', 'blanco', 'negro', 'gris'];
let anios = [];
for (let anio = 1990; anio <= 2024; anio++) {
    anios.push(anio);
}




const app = express();
const db = nano.db.use('autos');

app.get('/insertar', (req, res) => {
    console.log("Entre")
    const data = {
        marca: marcas[Math.floor(Math.random() * marcas.length)], 
        color: colores[Math.floor(Math.random() * colores.length)],
        anio: anios[Math.floor(Math.random() * anios.length)],
    };
    console.log(data);

    db.insert(data, (err, body) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            return res.status(500).send('Error al insertar datos');
        }
        console.log('Datos insertados:', body);
        res.send('Datos insertados correctamente');
    });
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
