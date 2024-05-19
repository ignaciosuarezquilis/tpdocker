

document.addEventListener('DOMContentLoaded', function() {
    const botonCampos = document.getElementById('botonCampos');
    const botonAleatorio = document.getElementById('botonAleatorio');
  
    botonCampos.addEventListener('click', function(event) {
      event.preventDefault();

      const brand = document.getElementById('brand').value;
      const color = document.getElementById('color').value;
      const year = parseInt(document.getElementById('year').value);
  
      // Crear objeto de automóvil
      const car = {
        brand: brand,
        color: color,
        year: year
      };
  
      // enviar datos al servidor
      insertarCampos(car);
    });
  

    botonAleatorio.addEventListener('click', function(event) {
      event.preventDefault();
      insertarAleatorio();      // enviar datos al servidor
    });

    async function insertarCampos(car) {
      console.log("El auto es", car);
      try {

        const response = await fetch('http://localhost:3000/insertarCampos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(car),
        });

        const data = await response.json();
        console.log('Automóvil insertado con éxito:', data);
        alert('Automóvil insertado con éxito');
      } catch (error) {
        console.error('Error al insertar automóvil:', error);
        alert('Error al insertar automóvil');
      }
    }

    async function insertarAleatorio() {
      console.log("Ingresar aleatorio");
      try {
        const response = await fetch('http://localhost:3000/insertarAleatorio', {
          method: 'GET',  
        });

        const data = await response.json();
        console.log('Automóvil insertado con éxito:', data);
        alert('Automóvil insertado con éxito');
      } catch (error) {
        console.error('Error al insertar automóvil:', error);
        alert('Error al insertar automóvil');
      }
    }

  });
  