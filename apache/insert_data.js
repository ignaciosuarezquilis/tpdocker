const axios = require('axios');

// URL de la base de datos CouchDB
const baseUrl = 'http://admin:password@localhost:5984'; // Reemplaza 'usuario' y 'contraseña' con tus credenciales
const dbName = 'autos'; // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
const dbUrl = `${baseUrl}/${dbName}`;

// Función para generar un número aleatorio dentro de un rango
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar un ID único
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Función para insertar un documento en la base de datos
async function insertDocument(document) {
  try {
    const response = await axios.post(dbUrl, document);
    console.log('Documento insertado con éxito:', response.data);
  } catch (error) {
    console.error('Error al insertar documento:', error.response.data);
  }
}

// Función para insertar documentos aleatorios en la base de datos
function insertRandomData() {
  const randomNumber = getRandomInt(1, 100); // Cantidad de documentos aleatorios a insertar
  for (let i = 0; i < randomNumber; i++) {
    const document = {
      _id: generateUniqueId(), // Genera un ID único para cada documento
      name: `Documento-${i}`,
      value: getRandomInt(1, 1000) // Valor aleatorio
    };
    insertDocument(document);
  }
}

// Llama a la función para insertar datos aleatorios
insertRandomData();
