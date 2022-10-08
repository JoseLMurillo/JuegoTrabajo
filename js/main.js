function main() {
  const miCanvas = document.getElementById('miCanvas');
  const body = document.getElementById('body');
  const boton = document.getElementById('enviar');

  mostrarElementos(false);

  //CANVAS
  const ctx = miCanvas.getContext('2d');
  const w = miCanvas.clientWidth;
  const h = miCanvas.clientHeight;
  let jugar = false;
  let contador = 0;

  const jugador = new Jugador(w / 2, h / 2, 20, 20, undefined, 'red');

  const bala = new Proyectil((w / 2) + 20, h - 40, 20, 20);

  let enemigos = new Array([]);

  // MOVER JUGADOR
  const map = {};
  function moverJugador(e) {
    onkeydown = onkeyup = function (e) {
      map[e.key] = e.type === 'keydown';

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

  // NUMERO RANDOM
  function generateRandom(max) {
    const aleatorio = Math.floor(Math.random() * max);
    return aleatorio;
  }

  //MOVIMIENTO BALA
  let activo = true;
  
  function activador(e) {
    if (activo === true) {
      bala.xSupIzq = jugador.limiteDer;
      bala.ySupIzq = jugador.limiteArriba - 20;

      const parar = setInterval(() => {
        activo = false;
       
        for (let i = 0; i < enemigos.length; i++) {
          bala.colorRelleno = 'black';
          if(bala.xSupIzq < (e.clientX - 20)) {
            bala.moverDerecha();
          }

          if(bala.ySupIzq > (e.clientY - 20)) {
            bala.moverArriba();
          }

          if(bala.ySupIzq < (e.clientY - 20)) {
            bala.moverAbajo();
          }

          if(bala.xSupIzq > (e.clientX - 20)) {
            bala.moverAbajoIzquierda();
          }

          if((e.clientX - 20) > bala.xSupIzq && (e.clientY - 20) < bala.ySupIzq) {
            bala.moverArribaDerecha();
          }

          if((e.clientX - 20) > bala.xSupIzq && (e.clientY - 20) > bala.ySupIzq) {
            bala.moverAbajoDerecha();
          }

          if((e.clientX - 20) < bala.xSupIzq && (e.clientY - 20) > bala.ySupIzq) {
            bala.moverAbajoIzquierda();
          }

          if((e.clientX - 20) < bala.xSupIzq && (e.clientY - 20) < bala.ySupIzq) {
            bala.moverArribaIzquierda();
          }

          // FINALIZAR ANIMACION
          if ((e.clientY - 20) == bala.ySupIzq && (e.clientX - 20) == bala.xSupIzq) {
            clearInterval(parar);
            activo = true;
            bala.colorRelleno = 'rgba(255, 255, 255, 0)';
          }

          // COLICION CON ENEMIGO
          if (enemigos[i].colisionarCon(bala)) {
            enemigos[i].ySupIzq = 0;
            enemigos[i].xSupIzq = generateRandom(800);

            enemigos[i].colorRelleno = `rgb(${generateRandom(250)},${generateRandom(250)},${generateRandom(250)})`;

            contador += 1;

            document.getElementById('contador').textContent = contador;
          }
        }

        setTimeout(() => {
          clearInterval(parar);
          activo = true;
          bala.colorRelleno = 'rgba(255, 255, 255, 0)';
        }, 3500);
      }, 10);
    }
  }

  function reposicionar() {
    enemigos = [];
    jugador.xSupIzq = w / 2;
    jugador.ySupIzq = h / 2;

    for (let i = 0; i < 5; i++) {
      enemigos.push(new Enemigo(generateRandom(800), 0, 20, 20, undefined, `rgb(${generateRandom(250)},${generateRandom(250)},${generateRandom(250)})`));
    }
  }

  function moverEnemigos(e) {
    mostrarElementos(true);

    for (let i = 0; i < enemigos.length; i++) {
      // SOLO BAJANDO
      if (enemigos[i].limiteAbajo < jugador.limiteAbajo && enemigos[i].limiteIzq === jugador.limiteIzq && enemigos[i].limiteDer === jugador.limiteDer) {
        enemigos[i].moverAbajo();
      }

      // SOLO ARRIBA
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
      else if (enemigos[i].colisionarCon(jugador) || jugador.xSupIzq <= 0 || (jugador.xSupIzq+20) >= 800 || jugador.ySupIzq <= 0 || jugador.ySupIzq+20 >= 600) {

        jugador.setVidas = jugador.getVidas - 1;

        jugador.xSupIzq = generateRandom(798) + 1;
        jugador.ySupIzq = generateRandom(598) + 1;

        document.getElementById('contadorVidas').textContent = jugador.getVidas;

        if (jugador.getVidas <= 0) {
          jugar = false;
          mostrarElementos(false);
        }
      }

      // COLICION CON BALA
      else if (enemigos[i].colisionarCon(bala)) {
        switch (generateRandom(4)) {
          case 1:
            enemigos[i].ySupIzq = 0;
            enemigos[i].xSupIzq = generateRandom(800);
            enemigos[i].colorRelleno = `rgb(${generateRandom(250)},${generateRandom(250)},${generateRandom(250)})`;
            break;

          case 2:
            enemigos[i].ySupIzq = generateRandom(600);
            enemigos[i].xSupIzq = 800;
            enemigos[i].colorRelleno = `rgb(${generateRandom(250)},${generateRandom(250)},${generateRandom(250)})`;
            break;

          case 3:
            enemigos[i].ySupIzq = 600;
            enemigos[i].xSupIzq = generateRandom(800);
            enemigos[i].colorRelleno = `rgb(${generateRandom(250)},${generateRandom(250)},${generateRandom(250)})`;
            break;

          case 4:
            enemigos[i].ySupIzq = generateRandom(600);
            enemigos[i].xSupIzq = 0;
            enemigos[i].colorRelleno = `rgb(${generateRandom(250)},${generateRandom(250)},${generateRandom(250)})`;
            break;

          default:
            break;
        }
      }
    }
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < enemigos.length; i++) {
      enemigos[i].dibujar(ctx);
      jugador.dibujar(ctx);
      bala.dibujar(ctx);
    }

    if (jugar) {
      window.requestAnimationFrame(moverEnemigos);
    }
  }

  function iniciarJuego() {
    jugar = true;
    window.requestAnimationFrame(moverEnemigos);
    document.getElementById('gameover').hidden = true;

    jugador.setVidas = 3;

    reposicionar();

    setInterval(() => {
      // eslint-disable-next-line no-undef
      enemigos.push(new Enemigo(generateRandom(800), 0, 20, 20, undefined, `rgb(${generateRandom(250)},${generateRandom(250)},${generateRandom(250)})`));
    }, 10000);

    contador = 0;
    document.getElementById('contador').textContent = contador;
    document.getElementById('contadorVidas').textContent = jugador.getVidas;

    boton.hidden = true;
  }

  body.addEventListener('keydown', moverJugador);
  miCanvas.addEventListener('mousedown', activador);
  boton.addEventListener('click', iniciarJuego);

  // GENERADOR DE ENEMIGOS
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; i++) {
    // eslint-disable-next-line no-undef
    enemigos.push(new Enemigo(generateRandom(800), 0, 20, 20, undefined, `rgb(${generateRandom(250)},${generateRandom(250)},${generateRandom(250)})`));
  }

  function mostrarElementos (value) {
    document.getElementById('titleEnemigos').hidden =! value;
    document.getElementById('contador').hidden =! value;
    boton.hidden = value;
    document.getElementById('gameover').hidden = value;
    document.getElementById('titleVidas').hidden =! value;
    document.getElementById('contadorVidas').hidden =! value;

  }
}

window.addEventListener('load', main);
