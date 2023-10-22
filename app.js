document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  var agendadoresAutorizados = {
    'pedro': 'pedro.age.1',
    'juan': 'juan.age.2',
    'diego': 'diego.age.3'
  };

  var nombreIngresado = document.getElementById('nombre').value;
  var contrasenaIngresada = document.getElementById('contrasena').value;

  if (agendadoresAutorizados[nombreIngresado] === contrasenaIngresada) {
    var cancha = document.getElementById('cancha');
    var canchaValor = cancha.value;
    var canchaNombre = cancha.options[cancha.selectedIndex].text; // Obtén el nombre de la cancha desde el HTML
    var fecha = document.getElementById('fecha').value;
    var hora = document.getElementById('hora').value;
    var reservas = JSON.parse(localStorage.getItem('reservas')) || {};

    if (reservas[canchaValor] && reservas[canchaValor][fecha] && reservas[canchaValor][fecha][hora]) {
      swal("Hora no disponible", "Ya existe una reserva para " + canchaNombre + " y hora. Comentarios: " + reservas[canchaValor][fecha][hora].comentarios);
    } else {
      var datosFormulario = {
        agendador: nombreIngresado,
        cancha: canchaNombre,
        fecha: fecha,
        hora: hora,
        comentarios: document.getElementById('comentarios').value
      };

      if (!reservas[canchaValor]) {
        reservas[canchaValor] = {};
      }
      if (!reservas[canchaValor][fecha]) {
        reservas[canchaValor][fecha] = {};
      }
      reservas[canchaValor][fecha][hora] = datosFormulario;
      localStorage.setItem('reservas', JSON.stringify(reservas));

      swal("Agendamiento completado", JSON.stringify(datosFormulario, null, 2));
    }
  } else {
    swal("Usuario no autorizado", "No tienes permiso para realizar esta acción.");
  }
});