/* eslint-disable block-spacing */
class Jugador {
  #xSupIzq;

  #ySupIzq;

  #ancho;

  #alto;

  #colorContorno;

  #colorRelleno;

  #vidas;

  constructor(xInicial, yInicial, anchoInicial, altoInicial, colorContorno, colorRelleno) {
    this.#xSupIzq = xInicial || 100;
    this.#ySupIzq = yInicial || 50;
    this.#ancho = anchoInicial || 50;
    this.#alto = altoInicial || 30;
    this.#colorContorno = colorContorno || 'blue';
    this.#colorRelleno = colorRelleno || 'green';
    this.#vidas = 3;
  }

  dibujar(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.#colorRelleno;
    ctx.fillRect(this.#xSupIzq, this.#ySupIzq, this.#ancho, this.#alto);
    ctx.strokeStyle = this.#colorContorno;
    ctx.strokeRect(this.#xSupIzq, this.#ySupIzq, this.#ancho, this.#alto);
    ctx.closePath();
  }

  get limiteIzq() { return this.#xSupIzq; }

  get limiteDer() { return this.#xSupIzq + this.#ancho; }

  get limiteArriba() { return this.#ySupIzq;}

  get limiteAbajo() { return this.#ySupIzq + this.#alto;}

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

  conectarCon(ctx, otroRectangulo, color) {
    ctx.beginPath();

    ctx.beginPath();
    ctx.moveTo(this.limiteDer, this.limiteArriba);
    ctx.lineTo(otroRectangulo.limiteIzq, otroRectangulo.limiteArriba);
    // ctx.strokeStyle = this.#colorContorno;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

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