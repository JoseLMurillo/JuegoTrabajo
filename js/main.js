/*Parte visual, Sprites, background, mandar a las clases lo que se pueda enviar a las clases*/

//COMO PUEDO MEJORAR LA RESPUESTA DE LOS CONTROLES
//MANDAR A LOS METODOS LO QUE SE PUEDA COLOCAR EN LOS METODOS
//AGREGAR SPRITES
  //EMENIGOS, JUGADOR, PROYECTIL
//AGREGAR FONDOS

function main() {

  const body = document.getElementById('body');

  //CANVAS
  const miCanvas = document.getElementById('miCanvas');
  const ctx = miCanvas.getContext('2d');
  const w = miCanvas.clientWidth;
  const h = miCanvas.clientHeight;
  const img = document.getElementById("scream");

  let activo = true;
  let jugar = false;
  let contador = 0;

  let enemigos = new Array([]);

  const boton = document.getElementById('enviar');
  const tituloOver = document.getElementById('gameover');

  // eslint-disable-next-line no-undef
  const jugador = new Jugador(w / 2, h / 2, 20, 20, undefined, 'blue');
  // eslint-disable-next-line no-undef
  const bala = new Proyectil((w / 2) + 20, (h / 2) - 20, 20, 20);

  //EVENTOS
  body.addEventListener('keydown', moverJugador);
  miCanvas.addEventListener('mousedown', activador);

  mostrarElementos(false);

  //ESTO PODRIA SER UN METODO Y LO LLAMO
  function generateRandomNumber(condition, max){
    let aleatorio;
    if(condition == 0) {
      aleatorio = Math.floor(Math.random() * max);
    }
    else {
      aleatorio = Math.random() * (1.5 - 0.5) + 0.5;
    }
    return aleatorio;
  }

  //REINCIA EL JUEGO
  function reiniciar() {
    enemigos = [];
    jugador.xSupIzq = w / 2;
    jugador.ySupIzq = h / 2;

    for (let i = 0; i < 5; i++) {
      // eslint-disable-next-line no-undef
      enemigos.push(new Enemigo(generateRandomNumber(0,800), 0, 20, 20, undefined, 'red', generateRandomNumber(1,0)));
    }
  }

  //REPOSICIONA ENEMIGOS AL REDEDOR
  function reposicionarEnemigo(enemigo) {
    enemigo.vx = generateRandomNumber(1,0);

    switch (generateRandomNumber(0,4)) {
      case 1:
        enemigo.ySupIzq = 0;
        enemigo.xSupIzq = generateRandomNumber(0,800);
        break;

      case 2:
        enemigo.ySupIzq = generateRandomNumber(0,600);
        enemigo.xSupIzq = 800;
        break;

      case 3:
        enemigo.ySupIzq = 600;
        enemigo.xSupIzq = generateRandomNumber(0,800);
        break;

      case 4:
        enemigo.ySupIzq = generateRandomNumber(0,600);
        enemigo.xSupIzq = 0;
        break;

      default:
        break;
    }
  }

  //QUIERO MEJORAR EL MOVIMIENTO DEL JUGADOR
  // MOVER JUGADOR
  const map = {};

  function moverJugador(e) {
    if (activo) {
      onkeydown = onkeyup = function (e) {
        map[e.key] = e.type == 'keydown';

        if ((map["a"] && map["w"]) || (map["w"] && map["a"])) {
          jugador.moverArriba();
          jugador.moverIzquierda();
        }

        if ((map['a'] && map['s']) || (map['s'] && map['a'])) {
          jugador.moverAbajo();
          jugador.moverIzquierda();
        }

        if ((map['d'] && map['w']) || (map['w'] && map['d'])) {
          jugador.moverArriba();
          jugador.moverDerecha();
        }

        if ((map['d'] && map['s']) || (map['s'] && map['d'])) {
          jugador.moverAbajo();
          jugador.moverDerecha();
        }
      };

      switch (e.key) {
        case 'w':
          jugador.moverArriba();
          break;

        case 's':
          jugador.moverAbajo();
          break;

        case 'a':
          jugador.moverIzquierda();
          break;

        case 'd':
          jugador.moverDerecha();
          break;

        default:
          break;
      }
    }
    if (activo == true) {
      bala.xSupIzq = jugador.xSupIzq + 20;
      bala.ySupIzq = jugador.ySupIzq - 20;
    }
  }

  //MOVIMIENTO BALA
  function activador(e) {
    if (activo === true) {

      const parar = setInterval(() => {
        activo = false;

        for (let i = 0; i < enemigos.length; i++) {
          if (bala.xSupIzq < (e.clientX - 20)) {
            bala.moverDerecha();
          }

          if (bala.ySupIzq > (e.clientY - 20)) {
            bala.moverArriba();
          }

          if (bala.ySupIzq < (e.clientY - 20)) {
            bala.moverAbajo();
          }

          if (bala.xSupIzq > (e.clientX - 20)) {
            bala.moverAbajoIzquierda();
          }

          if ((e.clientX - 20) > bala.xSupIzq && (e.clientY - 20) < bala.ySupIzq) {
            bala.moverArribaDerecha();
          }

          if ((e.clientX - 20) > bala.xSupIzq && (e.clientY - 20) > bala.ySupIzq) {
            bala.moverAbajoDerecha();
          }

          if ((e.clientX - 20) < bala.xSupIzq && (e.clientY - 20) > bala.ySupIzq) {
            bala.moverAbajoIzquierda();
          }

          if ((e.clientX - 20) < bala.xSupIzq && (e.clientY - 20) < bala.ySupIzq) {
            bala.moverArribaIzquierda();
          }

          // FINALIZAR ANIMACION
          if ((e.clientY - 20) == bala.ySupIzq && (e.clientX - 20) == bala.xSupIzq) {
            clearInterval(parar);
            activo = true;
          }

          // COLICION CON ENEMIGO
          if (enemigos[i].colisionarCon(bala)) {
            reposicionarEnemigo(enemigos[i]);
            contador += 1;
            document.getElementById('contador').textContent = contador;
          }
        }

        setTimeout(() => {
          clearInterval(parar);
          activo = true;
        }, 2500);
      }, 10);
    }
  }

  //MOVER ENEMIGOS
  function moverEnemigos() {
    mostrarElementos(true);
    for (let i = 0; i < enemigos.length; i++) {
      //ENEMIGO SOLO BAJANDO
      if (enemigos[i].limiteAbajo < jugador.limiteAbajo && enemigos[i].limiteIzq === jugador.limiteIzq && enemigos[i].limiteDer === jugador.limiteDer) {
        enemigos[i].moverAbajo();
      }

      //ENEMIGO SOLO ARRIBA
      else if (enemigos[i].limiteArriba > jugador.limiteArriba && enemigos[i].limiteIzq === jugador.limiteIzq && enemigos[i].limiteDer === jugador.limiteDer) {
        enemigos[i].moverArriba();
      }

      // SOLO IZQUIERDA
      else if (enemigos[i].limiteIzq > jugador.limiteIzq && enemigos[i].limiteAbajo === jugador.limiteAbajo && enemigos[i].limiteArriba === jugador.limiteArriba) {
        enemigos[i].moverIzquierda();
      }

      // SOLO DERECHO
      else if (enemigos[i].limiteDer < jugador.limiteDer && enemigos[i].limiteAbajo === jugador.limiteAbajo && enemigos[i].limiteArriba === jugador.limiteArriba) {
        enemigos[i].moverDerecha();
      }

      // BAJANDO A LA IZQUIERDA
      else if (enemigos[i].limiteAbajo < jugador.limiteAbajo && enemigos[i].limiteIzq > jugador.limiteIzq) {
        enemigos[i].moverAbajo();
        enemigos[i].moverIzquierda();
      }

      // BAJANDO A LA DERECHA
      if (enemigos[i].limiteAbajo < jugador.limiteAbajo && enemigos[i].limiteDer < jugador.limiteDer) {
        enemigos[i].moverAbajo();
        enemigos[i].moverDerecha();
      }

      // ARRIBA IZQUIERDA
      else if (enemigos[i].limiteArriba > jugador.limiteArriba && enemigos[i].limiteIzq > jugador.limiteIzq) {
        enemigos[i].moverArriba();
        enemigos[i].moverIzquierda();
      }

      // ARRIBA DERECHA
      else if (enemigos[i].limiteArriba > jugador.limiteArriba && enemigos[i].limiteDer < jugador.limiteDer) {
        enemigos[i].moverArriba();
        enemigos[i].moverDerecha();
      }

      // COLICION CON JUGADOR
      if (jugador.colisionarConX(enemigos[i]) || jugador.xSupIzq <= 0 || (jugador.xSupIzq + 20) >= 800 || jugador.ySupIzq <= 0 || jugador.ySupIzq + 20 >= 600) {

        jugador.setVidas = jugador.getVidas - 1;

        jugador.xSupIzq = generateRandomNumber(0,798) + 1;
        jugador.ySupIzq = generateRandomNumber(0,598) + 1;

        document.getElementById('contadorVidas').textContent = jugador.getVidas;

        switch (jugador.getVidas) {
          case 0:
            document.getElementById('contadorVidas').style.backgroundColor = 'red';
            break;

          case 1:
            document.getElementById('contadorVidas').style.backgroundColor = '#F57328';
            break;

          case 2:
            document.getElementById('contadorVidas').style.backgroundColor = '#FF9F29';
            break;

          default:
            document.getElementById('contadorVidas').style.backgroundColor = 'green';
            break;
        }

        if (jugador.getVidas < 0) {
          jugar = false;
          mostrarElementos(false);
          document.getElementById('miCanvas').style.backgroundImage = 'url("D:/JuegoTrabajo/assets/giphy2.gif")';
        }
      }

      // COLICION CON BALA
      else if (enemigos[i].colisionarCon(bala) && activo == false) {
        reposicionarEnemigo(enemigos[i]);
      }
    }
  }

  function jugando(){
    moverEnemigos();
    ctx.clearRect(0, 0, w, h);
    
     for (let i = 0; i < enemigos.length; i++) {
      enemigos[i].dibujar(ctx);
      jugador.dibujar(ctx);
      bala.dibujar(ctx);
    }

    if (jugar) {
      window.requestAnimationFrame(jugando);
    }    
  }

  function iniciarJuego() {
    jugar = true;
    tituloOver.hidden = true;
    contador = 0;
    jugador.setVidas = 3;

    reiniciar();
    window.requestAnimationFrame(jugando);

    //AÑADE UN ENEMIGO MAS CADA 9s
    setInterval(() => {
      // eslint-disable-next-line no-undef
      enemigos.push(new Enemigo(generateRandomNumber(800), 0, 20, 20, undefined, 'red'));
    }, 9000);

    document.getElementById('contador').textContent = contador;
    document.getElementById('contadorVidas').textContent = jugador.getVidas;
  }

  //MUESTRA ELEMENTOS
  function mostrarElementos(value) {
    boton.hidden = value;
    document.getElementById('gameover').hidden = value;
    document.getElementById('titleVidas').hidden = !value;
    document.getElementById('contadorVidas').hidden = !value;
  }

  boton.addEventListener('click', iniciarJuego);

}

window.addEventListener('load', main);