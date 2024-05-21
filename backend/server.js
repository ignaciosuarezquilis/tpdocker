const cors = require ('cors');
const express = require('express');
const nano = require('nano')('http://admin:password@couchdb:5984/');

let marcas = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Tesla", "Subaru"]; 
let colores = ['rojo', 'verde', 'blanco', 'negro', 'gris'];
let anios = [];
for (let anio = 1990; anio <= 2024; anio++) {
    anios.push(anio);
}

const app = express();
const db = nano.db.use('autos');

app.use(express.json())
app.use(cors())

app.post('/insertarCampos', (req, res) => {
    const {brand,color,year}= req.body;
    const data ={
        brand,
        color,
        year
    };
    console.log(data);

    db.insert(data, (err, body) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            return res.status(500).send('Error al insertar datos');
        }
        console.log('Datos insertados:', body);
        res.json(data);
        //res.send('Datos insertados correctamente');
    });
    
});


app.get('/insertarAleatorio', (req, res) => {
    const data = {
        brand: marcas[Math.floor(Math.random() * marcas.length)], 
        color: colores[Math.floor(Math.random() * colores.length)],
        year: anios[Math.floor(Math.random() * anios.length)]       
    };
    console.log('datos aleatorios')
    console.log(data);
    db.insert(data, (err, body) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            return res.status(500).send('Error al insertar datos');
        }
        console.log('Datos insertados:', body);
        res.json(data);
        //res.send('Datos insertados correctamente');
    });

});

app.get('/mostrar', async(req, res) => {

    try {
        const response = await db.list({ include_docs: true });
        //const documentos = response.rows.map(row => row.doc);

        const documentos = response.rows.map(row => {
            const { ["_id"]: _,["_rev"]: __, ...resto } = row.doc;
            return resto;
        });

        res.json(documentos);

      } catch (err) {
        console.error('Error al obtener los datos', err);
      }

});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
