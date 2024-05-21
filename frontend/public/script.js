

document.addEventListener('DOMContentLoaded', function() {
    const botonCampos = document.getElementById('botonCampos');
    const botonAleatorio = document.getElementById('botonAleatorio');


    function mostrarTabla(){
      fetch('http://localhost:3000/mostrar',{
        method: 'GET',
        headers: {'Content-Type':'application/json'}
      })
      .then(response => response.json())
        .then(data => {
            let tablaHTML = '<table><tr><th>Marca</th><th>Color</th><th>Año</th></tr>';
            data.forEach(function(fila) {
                tablaHTML += '<tr><td>' + fila.brand + '</td><td>' + fila.color + '</td><td>' + fila.year + '</td></tr>';
            });
            tablaHTML += '</table>';

            document.getElementById("tablaContainer").innerHTML = tablaHTML;
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
            alert('Error al obtener datos');
        });
    }

    document.getElementById("mostrarBoton").addEventListener("click", mostrarTabla);
  
    botonCampos.addEventListener('click', function(event) {
      event.preventDefault();

      const brand = document.getElementById('brand').value;
      const color = document.getElementById('color').value;
      const year = parseInt(document.getElementById('year').value);
  
      const car = {
        brand: brand,
        color: color,
        year: year
      };
  
      insertarCampos(car);
      mostrarTabla();
    });
  

    botonAleatorio.addEventListener('click', function(event) {
      event.preventDefault();
      insertarAleatorio();     
      mostrarTabla();
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
  