/* ============================================================
   VALIDACIÓN DEL FORMULARIO DE REGISTRO
   - Ningún campo vacío.
   - CI: mínimo 11 caracteres, solo números.
   - Contraseña: debe coincidir con la confirmación.
   - Mensajes de error SIN usar alert().
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("formulario");

  const nombre = document.getElementById("nombre");
  const ci = document.getElementById("ci");
  const password = document.getElementById("password");
  const confirmacion = document.getElementById("confirmacion");

  const errorNombre = document.getElementById("error-nombre");
  const errorCi = document.getElementById("error-ci");
  const errorPassword = document.getElementById("error-password");
  const errorConfirmacion = document.getElementById("error-confirmacion");
  const mensajeExito = document.getElementById("mensaje-exito");

  /* ---------- Funciones auxiliares ---------- */

  // Limpia todos los mensajes de error y el mensaje de éxito.
  function limpiarMensajes() {
    errorNombre.textContent = "";
    errorCi.textContent = "";
    errorPassword.textContent = "";
    errorConfirmacion.textContent = "";
    mensajeExito.textContent = "";
  }

  // Valida un campo individual.
  function validarNombre() {
    if (nombre.value.trim() === "") {
      errorNombre.textContent = "El nombre no puede estar vacío.";
      return false;
    }
    errorNombre.textContent = "";
    return true;
  }

  function validarCi() {
    const valor = ci.value.trim();

    if (valor === "") {
      errorCi.textContent = "El CI no puede estar vacío.";
      return false;
    }
    if (!/^[0-9]+$/.test(valor)) {
      errorCi.textContent = "El CI solo debe contener números.";
      return false;
    }
    if (valor.length < 11) {
      errorCi.textContent = "El CI debe tener al menos 11 caracteres.";
      return false;
    }
    errorCi.textContent = "";
    return true;
  }

  function validarPassword() {
    if (password.value === "") {
      errorPassword.textContent = "La contraseña no puede estar vacía.";
      return false;
    }
    errorPassword.textContent = "";
    return true;
  }

  function validarConfirmacion() {
    if (confirmacion.value === "") {
      errorConfirmacion.textContent = "La confirmación no puede estar vacía.";
      return false;
    }
    if (confirmacion.value !== password.value) {
      errorConfirmacion.textContent = "Las contraseñas no coinciden.";
      return false;
    }
    errorConfirmacion.textContent = "";
    return true;
  }

  /* ---------- Validaciones en tiempo real ---------- */
  // Así el usuario ve el feedback mientras escribe (mejor UX).

  nombre.addEventListener("blur", validarNombre);
  ci.addEventListener("blur", validarCi);
  password.addEventListener("blur", validarPassword);
  confirmacion.addEventListener("blur", validarConfirmacion);

  // Al escribir, limpiar el error del campo correspondiente.
  nombre.addEventListener("input", () => { errorNombre.textContent = ""; });
  ci.addEventListener("input", () => { errorCi.textContent = ""; });
  password.addEventListener("input", () => { errorPassword.textContent = ""; });
  confirmacion.addEventListener("input", () => { errorConfirmacion.textContent = ""; });

  /* ---------- Evento submit ---------- */
  form.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita que se envíe el formulario
    limpiarMensajes();

    // Validamos todos los campos. Importante: NO usar &&
    // porque así se muestran TODOS los errores a la vez.
    const okNombre = validarNombre();
    const okCi = validarCi();
    const okPassword = validarPassword();
    const okConfirmacion = validarConfirmacion();

    if (okNombre && okCi && okPassword && okConfirmacion) {
      mensajeExito.textContent = "¡Registro exitoso! Todos los datos son válidos.";
      form.reset();
    }
  });

  /* ---------- Botón limpiar ---------- */
  form.addEventListener("reset", function () {
    // Da tiempo a que el reset se aplique antes de limpiar los mensajes.
    setTimeout(limpiarMensajes, 0);
  });

});