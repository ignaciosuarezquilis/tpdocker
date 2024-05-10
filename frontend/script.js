document.addEventListener('DOMContentLoaded', function() {
    const carForm = document.getElementById('carForm');
  
    carForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const brand = document.getElementById('brand').value;
      const model = document.getElementById('model').value;
      const year = parseInt(document.getElementById('year').value);
  
      // Crear objeto de automóvil
      const car = {
        brand: brand,
        model: model,
        year: year
      };
  
      // Insertar en la base de datos
      insertCar(car);
    });
  
    async function insertCar(car) {
      console.log("El auto es", car);
      try {
        const response = await fetch('http://localhost:5984/autos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('admin:password') // Aquí se envían las credenciales
          },
          body: JSON.stringify(car)
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
  