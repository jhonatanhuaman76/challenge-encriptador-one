const btnEncriptar = document.querySelector('.btnEncriptar');
const btnDesencriptar = document.querySelector('.btnDesencriptar');
const btnCopiar = document.querySelector('.btnCopiar');
const btnEliminar = document.querySelector('.btnEliminar');
const textAreaIngresar = document.querySelector('.ingresarTexto');
const cajaTextoDefecto = document.querySelector('.mostrarTexto__defecto');
const cajaTextEncriptado = document.querySelector('.mostrarTexto__encriptado');
const textAreaEncriptado = document.querySelector('.mostrarTexto__Text');

btnEncriptar.addEventListener('click', () => {
  procesarTexto(textAreaIngresar.value, encriptar, 'Texto encriptado');
});

btnDesencriptar.addEventListener('click', () => {
  procesarTexto(textAreaIngresar.value, desencriptar, 'Texto desencriptado');
});

btnCopiar.addEventListener('click', copiar);

btnEliminar.addEventListener('click', eliminar);

textAreaIngresar.addEventListener('input', validarTexto);

function procesarTexto(texto, operacion, msg) {
  if (texto.trim() === '') {
    cajaTextEncriptado.classList.add('ocultar');
    cajaTextoDefecto.classList.remove('ocultar');
    alerta('error', 'Ingrese un texto');
  } else if (texto.match(/[^a-z ]/g)) {
    alerta('error', 'Solo letras minusculas y sin acentos');
  } else {
    cajaTextEncriptado.classList.remove('ocultar');
    cajaTextoDefecto.classList.add('ocultar');
    textAreaEncriptado.value = operacion(texto);
    alerta('success', msg);
  }
}

function encriptar(texto) {
  //Encriptando texto
  let resultado = texto
    .replace(/e/g, 'enter')
    .replace(/i/g, 'imes')
    .replace(/a/g, 'ai')
    .replace(/o/g, 'ober')
    .replace(/u/g, 'ufat');

  return resultado;
}

function desencriptar(texto) {
  //Desencriptando texto
  let resultado = texto
    .replace(/ufat/g, 'u')
    .replace(/ober/g, 'o')
    .replace(/imes/g, 'i')
    .replace(/enter/g, 'e')
    .replace(/ai/g, 'a');

  return resultado;
}

async function copiar() {
  const texto = textAreaEncriptado.value;
  try {
    await navigator.clipboard.writeText(texto);
    alerta('success', 'Texto copiado');
  } catch (error) {
    console.error('Error al copiar: ', error);
  }
}

function eliminar() {
  textAreaIngresar.value = '';
  textAreaIngresar.focus();
  alerta('success', 'Texto limpiado');
}

function alerta(icon, title) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
}

function validarTexto() {
  let texto = textAreaIngresar.value;

  //Convertir texto a minusculas y sin acento
  texto = texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  //Permitir solo letras y espacios
  const textoFiltrado = texto.replace(/[^a-z ]/g, '');

  //Actualizar el contenido del textArea
  textAreaIngresar.value = textoFiltrado;
}
