// eslint-disable-next-line no-unused-vars
class Enemigo
{
    #xSupIzq;
    #ySupIzq;
    #ancho;
    #alto;
    #vx;
    #vy;
    #sprite = new Image();
    #colorTrasparente = "#0080FF00";
    
    constructor(xInicial, yInicial, anchoInicial, altoInicial, vx)
    {
        this.#xSupIzq = xInicial || 100;
        this.#ySupIzq = yInicial || 50;
        this.#ancho = anchoInicial || 50;
        this.#alto = altoInicial || 40;
        this.#vx = vx || 1;
        this.#vy = vx || 1;
        
        this.#sprite.src = "./assets/corona.png";
    }

    dibujar (ctx)
    {
        ctx.beginPath();
        ctx.fillStyle = this.#colorTrasparente;
        ctx.fillRect(this.#xSupIzq,this.#ySupIzq,this.#ancho,this.#alto);
        ctx.drawImage(this.#sprite, 0, 0, 40, 40, this.#xSupIzq,this.#ySupIzq, 40, 40);
        ctx.strokeStyle = this.#colorTrasparente;
        ctx.strokeRect(this.#xSupIzq,this.#ySupIzq,this.#ancho,this.#alto);
        ctx.closePath();
    }

    colisionarCon(otroRectangulo)
    {
        let respuesta;

        if ((this.limiteIzq    < otroRectangulo.limiteDer) &&
            (this.limiteDer    > otroRectangulo.limiteIzq) &&
            (this.limiteArriba < otroRectangulo.limiteAbajo) &&  
            (this.limiteAbajo  > otroRectangulo.limiteArriba))

        {
            respuesta = true;
        }
        else
        {
            respuesta = false;
        }
        return respuesta;
    }

    get limiteIzq ()
    {
        return this.#xSupIzq;
    }
    get limiteDer ()
    {
        return this.#xSupIzq + this.#ancho;
    }
    get limiteArriba()
    {
        return this.#ySupIzq;
    }
    get limiteAbajo()
    {
        return this.#ySupIzq + this.#alto;
    }

    get xSupIzq ( )
    {
        return this.#xSupIzq;
    }

    set xSupIzq (value)
    {
        this.#xSupIzq = value;
    }
    
    get ySupIzq ( )
    {
        return this.#ySupIzq;
    }

    set ySupIzq (value)
    {
        this.#ySupIzq = value;
    }
 
    get ancho ()
    {
        return this.#ancho;
    }

    get alto ()
    {
        return this.#alto;
    }

    get vx ( )
    {
        return this.#vx;
    }
    set vx (value)
    {
        this.#vx = value;
    }

    get vy ( )
    {
        return this.#vy;
    }
    set vy (value)
    {
        this.#vy = value;
    }

    moverArriba ()
    {
        this.#ySupIzq += - this.#vx;
    }

    moverAbajo ()
    {
        this.#ySupIzq += this.#vx;
    }
    
    moverIzquierda ()
    {
        this.#xSupIzq += - this.#vx;
    }

    moverDerecha ()
    {
        this.#xSupIzq += this.#vx;
    }

    moverAbajoIzquierda() {
        this.moverAbajo();
        this.moverAbajoIzquierda();
    }

    moverAbajoDercha() {
        this.moverAbajo();
        this.moverDerecha();
    }

    moverArribaIzquierda() {
        this.moverArriba();
        this.moverIzquierda();
    }

    moverArribaDerecha() {
        this.moverArriba();
        this.moverDerecha();
    }
}