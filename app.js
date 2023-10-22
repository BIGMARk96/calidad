document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

  var datosFormulario = {
    nombre: document.getElementById('nombre').value,
    contrasena: document.getElementById('contrasena').value,
    cancha: document.getElementById('cancha').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value,
    comentarios: document.getElementById('comentarios').value
  };

  alert(JSON.stringify(datosFormulario, null, 2)); // Muestra los datos en una alerta
});