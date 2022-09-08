class Enemigo
{
    #xSupIzq;
    #ySupIzq;
    #ancho;
    #alto;
    #colorContorno;
    #colorRelleno;
    #vx;
    #vy;

    constructor(xInicial, yInicial, anchoInicial, altoInicial, colorContorno, colorRelleno)
    {
        this.#xSupIzq = xInicial || 100;
        this.#ySupIzq = yInicial || 50;
        this.#ancho = anchoInicial || 50;
        this.#alto = altoInicial || 30;
        this.#colorContorno = colorContorno || "blue";
        this.#colorRelleno = colorRelleno || "green";
        this.#vx = 3;
        this.#vy = 2;
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
        this.#ySupIzq += 1;
        this.#xSupIzq += - 1;
    }

    moverAbajoDercha(){
        moverAbajo();
        moverDerecha();
    }

    moverArribaIzquierda(){
        moverArriba();
        moverIzquierda();
    }

    moverArribaDerecha(){
        moverArriba();
        moverDerecha();
    }
}