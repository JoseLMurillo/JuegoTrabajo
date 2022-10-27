// eslint-disable-next-line no-unused-vars
class Proyectil
{
    #xSupIzq;
    #ySupIzq;
    #ancho;
    #alto;
    #colorContorno;
    #colorRelleno;

    constructor(xInicial, yInicial, anchoInicial, altoInicial, colorContorno, colorRelleno)
    {
        this.#xSupIzq = xInicial || 100;
        this.#ySupIzq = yInicial || 50;
        this.#ancho = anchoInicial || 50;
        this.#alto = altoInicial || 30;
        this.#colorContorno = colorContorno || 'rgba(255, 255, 255, 0)';
        this.#colorRelleno = colorRelleno || 'gold';
    }

    dibujar (ctx)
    {
        ctx.beginPath();
        ctx.fillStyle = this.#colorRelleno;
        ctx.fillRect(this.#xSupIzq,this.#ySupIzq,this.#ancho,this.#alto);

        ctx.strokeStyle = this.#colorContorno;
        ctx.strokeRect(this.#xSupIzq,this.#ySupIzq,this.#ancho,this.#alto);
        ctx.closePath();
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
   
    get colorRelleno ( )
    {
        return this.#colorRelleno;
    }

    set colorRelleno (value)
    {
        this.#colorRelleno = value;
    }

    moverArriba ()
    {
        this.#ySupIzq += - 1;
    }

    moverAbajo ()
    {
        this.#ySupIzq += 1;
    }
    
    moverIzquierda ()
    {
        this.#xSupIzq += - 1;
    }

    moverDerecha ()
    {
        this.#xSupIzq += 1;
    }

    moverAbajoIzquierda(){
        this.moverAbajo();
        this.moverIzquierda();
    }

    moverAbajoDerecha(){
        this.moverAbajo();
        this.moverDerecha();
    }

    moverArribaIzquierda(){
        this.moverArriba();
        this.moverIzquierda();
    }

    moverArribaDerecha(){
        this.moverArriba();
        this.moverDerecha();
    }
}