document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

  var agendadoresAutorizados = {
    'Agendador1': 'Contraseña1',
    'Agendador2': 'Contraseña2',
    'Agendador3': 'Contraseña3'
  };

  var nombreIngresado = document.getElementById('nombre').value;
  var contrasenaIngresada = document.getElementById('contrasena').value;

  if (agendadoresAutorizados[nombreIngresado] === contrasenaIngresada) {
    var cancha = document.getElementById('cancha').value;
    var fecha = document.getElementById('fecha').value;
    var hora = document.getElementById('hora').value;
    var reservas = JSON.parse(localStorage.getItem('reservas')) || {};

    if (reservas[cancha] && reservas[cancha][fecha] && reservas[cancha][fecha][hora]) {
      swal("Hora no disponible", "Ya existe una reserva para esta cancha y hora."); // Muestra una alerta de error
    } else {
      var datosFormulario = {
        agendador: nombreIngresado,
        cancha: cancha,
        fecha: fecha,
        hora: hora,
        comentarios: document.getElementById('comentarios').value
      };

      if (!reservas[cancha]) {
        reservas[cancha] = {};
      }
      if (!reservas[cancha][fecha]) {
        reservas[cancha][fecha] = {};
      }
      reservas[cancha][fecha][hora] = datosFormulario;
      localStorage.setItem('reservas', JSON.stringify(reservas));

      swal("Agendamiento completado", JSON.stringify(datosFormulario, null, 2)); // Muestra los datos en una alerta personalizada
    }
  } else {
    swal("Usuario no autorizado", "No tienes permiso para realizar esta acción."); // Muestra una alerta de error
  }
});