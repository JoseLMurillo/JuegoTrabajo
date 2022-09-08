//Colicion entre enemigos
//coliciones proyectiles enemigos
//limites de mapa
//generacion procedural del mapa
//arreglar lado izquierdo proyectil

window.addEventListener("load", main);

function main() {
  let miCanvas = document.getElementById("miCanvas");
  let body = document.getElementById("body");
  let boton = document.getElementById("enviar");

  let ctx = miCanvas.getContext("2d");
  let w = miCanvas.clientWidth;
  let h = miCanvas.clientHeight;
  let jugar = false;
  let contador = 0;

  let jugador = new Jugador(w / 2, h / 2, 20, 20, undefined, "red");

  let enemigo = new Enemigo(w / 2 - 50, h / 2 - 50, 20, 20, undefined, "blue");

  bala = new Proyectil((w / 2) + 20, h - 40, 20, 20, undefined, "black");
  let enemigos = new Array();

  enemigo.dibujar(ctx);
  jugador.dibujar(ctx);
  bala.dibujar(ctx);

  body.addEventListener("keydown", moverJugador);
  miCanvas.addEventListener("mousedown", activador);
  boton.addEventListener("click", iniciarJuego);

  //GENERADOR DE ENEMIGOS
  for (let i = 0; i < 5; i++) {
    enemigos.push(new Enemigo(generateRandom(800), 0, 20, 20, undefined, "rgb(" + generateRandom(250) + "," + generateRandom(250) + "," + generateRandom(250) + ")"));
  }

  function reposicionar(){
    enemigos = [];

    for (let i = 0; i < 5; i++) {
      enemigos.push(new Enemigo(generateRandom(800), 0, 20, 20, undefined, "rgb(" + generateRandom(250) + "," + generateRandom(250) + "," + generateRandom(250) + ")"));
    }
  }

  function iniciarJuego() {
    jugar = true;
    window.requestAnimationFrame(moverEnemigos);
    document.getElementById("gameover").hidden = true;

    reposicionar();

    setInterval(function(){
      enemigos.push(new Enemigo(generateRandom(800), 0, 20, 20, undefined, "rgb(" + generateRandom(250) + "," + generateRandom(250) + "," + generateRandom(250) + ")"));
    }, 10000)

    contador = 0;
  }
  //NUMERO RANDOM
  function generateRandom(max) {
    let aleatorio = Math.floor(Math.random() * max);
    return aleatorio;
  }

  //MOVER JUGADOR
  let map = {};

  function moverJugador(e) {
    onkeydown = onkeyup = function (e) {
      e = e || event;

      map[e.key] = e.type == 'keydown';

      if ((map["a"] && map["w"]) || (map["w"] && map["a"])) {
        jugador.moverArriba();
        jugador.moverIzquierda();
      }

      if ((map["a"] && map["s"]) || (map["s"] && map["a"])) {
        jugador.moverAbajo();
        jugador.moverIzquierda();
      }

      if ((map["d"] && map["w"]) || (map["w"] && map["d"])) {
        jugador.moverArriba();
        jugador.moverDerecha();
      }

      if ((map["d"] && map["s"]) || (map["s"] && map["d"])) {
        jugador.moverAbajo();
        jugador.moverDerecha();
      }
    }

    switch (e.key) {
      case "w":
        jugador.moverArriba();
        break;

      case "s":
        jugador.moverAbajo();
        break;

      case "a":
        jugador.moverIzquierda();
        break;

      case "d":
        jugador.moverDerecha();
        break;
    }

    ctx.clearRect(0, 0, w, h);
    jugador.dibujar(ctx);
  }


  let activo = true;

  function activador(e) {
    if (activo == true) {
      bala.xSupIzq = jugador.limiteDer;
      bala.ySupIzq = jugador.limiteArriba - 20;
      let parar = setInterval(function () {
          activo = false;
          ctx.clearRect(0, 0, w, h);

          //console.log("bala " + (e.clientY - 18) + " " + bala.ySupIzq);

          for (let i = 0; i < enemigos.length; i++) {

            //SOLO DERECHA
            if ((e.clientX - 26) > bala.xSupIzq
              /* &&
                           e.clientY == bala.ySupIzq */
            ) {
              bala.moverDerecha();
            }

            //SOLO IZQUIERDA
            if ((e.clientX - 26) < bala.xSupIzq
              /* &&
                           (e.clientY - 18) == bala.ySupIzq */
            ) {
              bala.moverIzquierda();
            }

            //SOLO ARRIBA
            if ((e.clientY - 18) < bala.ySupIzq) {
              bala.moverArriba();
            }

            //SOLO ABAJO
            if ( /* (e.clientX - 26) == bala.xSupIzq && */
              (e.clientY - 18) > bala.ySupIzq
            ) {
              bala.moverAbajo();
            }

            //ARRIBA DERECHA
            if ((e.clientX - 26) > bala.xSupIzq && (e.clientY - 18) < bala.ySupIzq) {
              bala.moverDerecha();
              bala.moverArriba();
            }

            //ABAJO DERECHA
            if ((e.clientX - 26) > bala.xSupIzq &&
              (e.clientY - 18) > bala.ySupIzq
            ) {
              bala.moverDerecha();
              bala.moverAbajo();
            }

            //ABAJO IZQUIERDA
            if ((e.clientX - 26) < bala.xSupIzq &&
              (e.clientY - 18) > bala.ySupIzq
            ) {
              bala.moverIzquierda();
              bala.moverAbajo();
            }

            //ARRIBA IZQUIERDA
            if ((e.clientX - 26) < bala.xSupIzq &&
              (e.clientY - 18) < bala.ySupIzq
            ) {
              bala.moverArriba();
              bala.moverIzquierda();
            }

            //FINALIZAR ANIMACION
            if ((e.clientY - 18) == bala.ySupIzq && (e.clientX - 26) == bala.xSupIzq) {

              clearInterval(parar);

              /* bala.xSupIzq = jugador.limiteDer;
              bala.ySupIzq = jugador.limiteArriba - 20; */

              activo = true;
            }

            //COLICION CON ENEMIGO  
            if (enemigos[i].colisionarCon(bala)) {
              enemigos[i].ySupIzq = 0;
              enemigos[i].xSupIzq = generateRandom(800);
              enemigos[i].colorRelleno = "rgb(" + generateRandom(250) + "," + generateRandom(250) + "," + generateRandom(250) + ")";

              contador += 1;

              document.getElementById("contador").textContent = contador;

            }
          }

          setTimeout(function () {
            clearInterval(parar);
            activo = true;
          }, 4000);

        },
        10);
    }
  }


  function moverEnemigos(e) {

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < enemigos.length; i++) {

      //SOLO BAJANDO
      if (enemigos[i].limiteAbajo < jugador.limiteAbajo && enemigos[i].limiteIzq == jugador.limiteIzq && enemigos[i].limiteDer == jugador.limiteDer) {
        enemigos[i].moverAbajo();
      }

      //SOLO ARRIBA
      else if (enemigos[i].limiteArriba > jugador.limiteArriba && enemigos[i].limiteIzq == jugador.limiteIzq && enemigos[i].limiteDer == jugador.limiteDer) {
        enemigos[i].moverArriba();
      }

      //SOLO IZQUIERDA
      else if (enemigos[i].limiteIzq > jugador.limiteIzq && enemigos[i].limiteAbajo == jugador.limiteAbajo && enemigos[i].limiteArriba == jugador.limiteArriba) {
        enemigos[i].moverIzquierda();
      }

      //SOLO DERECHO
      else if (enemigos[i].limiteDer < jugador.limiteDer && enemigos[i].limiteAbajo == jugador.limiteAbajo && enemigos[i].limiteArriba == jugador.limiteArriba) {
        enemigos[i].moverDerecha();
      }

      //BAJANDO A LA IZQUIERDA
      else if (enemigos[i].limiteAbajo < jugador.limiteAbajo && enemigos[i].limiteIzq > jugador.limiteIzq) {
        enemigos[i].moverAbajo();
        enemigos[i].moverIzquierda();
      }

      //BAJANDO A LA DERECHA
      if (enemigos[i].limiteAbajo < jugador.limiteAbajo && enemigos[i].limiteDer < jugador.limiteDer) {
        enemigos[i].moverAbajo();
        enemigos[i].moverDerecha();
      }

      //ARRIBA IZQUIERDA
      else if (enemigos[i].limiteArriba > jugador.limiteArriba && enemigos[i].limiteIzq > jugador.limiteIzq) {
        enemigos[i].moverArriba();
        enemigos[i].moverIzquierda();
      }

      //ARRIBA DERECHA
      else if (enemigos[i].limiteArriba > jugador.limiteArriba && enemigos[i].limiteDer < jugador.limiteDer) {
        enemigos[i].moverArriba();
        enemigos[i].moverDerecha();
      }

      //COLICION CON JUGADOR    
      else if (enemigos[i].colisionarCon(jugador)) {
        switch (generateRandom(4)) {
          case 1:
            enemigos[i].ySupIzq = 0;
            enemigos[i].xSupIzq = generateRandom(800);
            enemigos[i].colorRelleno = "rgb(" + generateRandom(250) + "," + generateRandom(250) + "," + generateRandom(250) + ")";
            break;

          case 2:
            enemigos[i].ySupIzq = generateRandom(600);
            enemigos[i].xSupIzq = 800;
            enemigos[i].colorRelleno = "rgb(" + generateRandom(250) + "," + generateRandom(250) + "," + generateRandom(250) + ")";
            break;

          case 3:
            enemigos[i].ySupIzq = 600;
            enemigos[i].xSupIzq = generateRandom(800);
            enemigos[i].colorRelleno = "rgb(" + generateRandom(250) + "," + generateRandom(250) + "," + generateRandom(250) + ")";
            break;

          case 4:
            enemigos[i].ySupIzq = generateRandom(600);
            enemigos[i].xSupIzq = 0;
            enemigos[i].colorRelleno = "rgb(" + generateRandom(250) + "," + generateRandom(250) + "," + generateRandom(250) + ")";
            break;
        }



        jugar = false;

        document.getElementById("gameover").hidden = false;
      }
    }

    for (let i = 0; i < enemigos.length; i++) {
      enemigos[i].dibujar(ctx);
      jugador.dibujar(ctx);
      bala.dibujar(ctx);
    }

    if (jugar) {
      window.requestAnimationFrame(moverEnemigos);
    }
  }
}