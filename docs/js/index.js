const $cuadros = document.querySelectorAll('.cuadro')
let maquina = [];
let usuario = [];
let ronda = 0;
$boton = document.querySelector("#empieza");
desbloquearBoton();

function bloquearInput (){
  $cuadros.forEach(function(cuadro){
    cuadro.onclick = function (){      
    }
  })
}

function desbloquearInput (){
  $cuadros.forEach(function(cuadro){
    cuadro.onclick = turnoUsuario;
  })
}

function cambiaRonda (){
  document.querySelector('#nroRonda').textContent = ronda
}

function actualizarEstado(estado,error = false){
  document.querySelector("#estado").textContent = estado;
  if(error){
    document.querySelector("#estado").classList.remove("alert-primary");
    document.querySelector("#estado").classList.add("alert-danger");
  }else{
    document.querySelector("#estado").classList.remove("alert-danger");
    document.querySelector("#estado").classList.add("alert-primary");
  }
}

function reiniciarJuego (){
  maquina = [];
  usuario = [];
}
function reiniciarUsuario(){
  usuario = [];
}

function bloquarBoton (){
  $boton.onclick = function (){};
}

function desbloquearBoton (){
  $boton.onclick = manejaRonda;
}

function obtenerCuadroAleatorio (){
  const cuadro = "cuadro" + Math.floor(Math.random()*$cuadros.length+1)
  return cuadro
}

function manejaRonda(){
  actualizarEstado("Turno de la máquina");
  ronda++;
  cambiaRonda();
  bloquarBoton();
  maquina.push(obtenerCuadroAleatorio());

  const RETRASO_JUGADOR = (maquina.length + 1 ) * 1000;

  maquina.forEach(function(item, index){
    const RETRASO_MAQUINA = (index + 1) * 1000;
    setTimeout(function(){
      resaltaCuadros(item);
    },RETRASO_MAQUINA)
    
  })
  setTimeout(function(){
    actualizarEstado("Turno del jugador");
    desbloquearInput();
  },RETRASO_JUGADOR)
}

function resaltaCuadros(cuadro){
  const $cuadro = document.querySelector("#" + cuadro);
  $cuadro.style.opacity = 1;
  setTimeout(function(){
    $cuadro.style.opacity = 0.5
  },500)
}

function turnoUsuario (event){
  const respuesta = event.target['id'];
  usuario.push(respuesta);
  resaltaCuadros(respuesta)

  for (let index = 0; index < usuario.length; index++) {
    if(usuario[index] !== maquina[index]){
      actualizarEstado("Perdiste, tocá \"Empezar\" para jugar de nuevo",true);
      reiniciarJuego();
      bloquearInput();
      desbloquearBoton();
      ronda = 0;
      cambiaRonda();
      return;
    }
    
  }
  if (usuario.length === maquina.length){
    bloquearInput();
    actualizarEstado("Turno de la máquina");
    reiniciarUsuario();
    setTimeout(manejaRonda,1000)
  }

}