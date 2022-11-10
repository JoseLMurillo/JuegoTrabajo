// eslint-disable-next-line no-unused-vars
class Jugador {
  #xSupIzq;

  #ySupIzq;

  #ancho;

  #alto;

  #vidas;

  #sprite = new Image();

  constructor(xInicial, yInicial, anchoInicial, altoInicial) {
    this.#xSupIzq = xInicial || 100;
    this.#ySupIzq = yInicial || 50;
    this.#ancho = anchoInicial || 50;
    this.#alto = altoInicial || 40;
    this.#vidas = 3;
    this.#sprite.src = "./assets/maincharacter.png";
  }

  dibujar(ctx) {
    ctx.beginPath();
    ctx.fillRect(this.#xSupIzq, this.#ySupIzq, this.#ancho, this.#alto);
    ctx.drawImage(this.#sprite, 0, 0, 40, 40, this.#xSupIzq,this.#ySupIzq, 40, 40);
    ctx.strokeRect(this.#xSupIzq, this.#ySupIzq, this.#ancho, this.#alto);
    ctx.closePath();
  }

  colisionarCon(otroRectangulo) {
    let respuesta;
    if ((this.limiteIzq < otroRectangulo.limiteDer) &&
            (this.limiteDer > otroRectangulo.limiteIzq) &&
            (this.limiteArriba < otroRectangulo.limiteAbajo) &&  
            (this.limiteAbajo > otroRectangulo.limiteArriba)) {
      respuesta = true;
    } else {
      respuesta = false;
    }
    return respuesta;
  }

  colisionarConX(otroRectangulo) {
    let respuesta;

      if(this.#xSupIzq < Math.round(otroRectangulo.xSupIzq)+10 && 
      (this.#xSupIzq+40) > Math.round(otroRectangulo.xSupIzq)+10 && 
      this.#ySupIzq < Math.round(otroRectangulo.ySupIzq)+10 && 
      (this.#ySupIzq+40) > Math.round(otroRectangulo.ySupIzq)+10) {
      respuesta = true;
     }else {
      respuesta = false;
    }
    
    return respuesta;
  }

  get limiteIzq() { return this.#xSupIzq; }

  get limiteDer() { return this.#xSupIzq + this.#ancho; }

  get limiteArriba() { return this.#ySupIzq;}

  get limiteAbajo() { return this.#ySupIzq + this.#alto;}

  get xSupIzq() {
    return this.#xSupIzq;
  }

  set xSupIzq(value) {
    this.#xSupIzq = value;
  }

  get ySupIzq() {
    return this.#ySupIzq;
  }

  set ySupIzq(value) {
    this.#ySupIzq = value;
  }

  get ancho() {
    return this.#ancho;
  }

  get alto() {
    return this.#alto;
  }

  set setVidas(value) {
    this.#vidas = value;
  }

  get getVidas() {
    return this.#vidas;
  }

  moverArriba() {
    this.#ySupIzq += -10;
  }

  moverAbajo() {
    this.#ySupIzq += 10;
  }

  moverIzquierda() {
    this.#xSupIzq += -10;
  }

  moverDerecha() {
    this.#xSupIzq += 10;
  }
}