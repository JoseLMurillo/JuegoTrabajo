window.addEventListener("load", main);

function main ()
{
    let rojo,verde,azul;
    let miCanvas = document.getElementById("miCanvas2");
    let ctx = miCanvas.getContext("2d");
    let w = miCanvas.clientWidth;
    let h = miCanvas.clientHeight;

    let elementoEliminar;

    let body = document.getElementById("body");

    let circulos = new Array();
    let colorRelleno = "black";

    miCanvas.addEventListener("mousedown", cambiarTamaño);

    window.requestAnimationFrame (mover);         
    
    let observador = true;


    function mover()
    {
        if(observador == true){
            console.log("colores");
            observador = false;
        }

        ctx.clearRect(0,0,w,h);
        for (let i = 0; i < circulos.length; i++) 
        {
            
            if(i%2==0){
                circulos[i].moverContrario();  
            }
            else {
                circulos[i].mover();  
            }  
            
            if ((circulos[i].xCentro > w) || (circulos[i].xCentro < 0))
            {
                circulos[i].vx = circulos[i].vx * - 1;
            }                
            if ((circulos[i].yCentro > h) || (circulos[i].yCentro < 0))
            {
                circulos[i].vy = circulos[i].vy * - 1;
            }                
        }      

        for (let i = 0; i < circulos.length - 1; i++) 
        {
            for (let j = i + 1; j < circulos.length; j++) 
            {
                if (circulos[i].colisionarCon(circulos[j]))
                {
                    circulos[i].vx = circulos[i].vx * - 1;
                    circulos[i].vy = circulos[i].vy * - 1;

                    circulos[j].vx = circulos[j].vx * - 1;
                    circulos[j].vy = circulos[j].vy * - 1;

                    circulos[i].colorRelleno = colorAleatorio();
                    circulos[j].colorRelleno = colorAleatorio();
                    
                    if ( circulos[j].radio > 10)
                    {
                        circulos[j].reducir();
                    }

                    else if(circulos[j].radio <= 10 && circulos[i].radio > 10)
                    {
                        circulos[i].reducir();
                        circulos[j].agrandar();

                    }
                }
            }
        }  
        for (let i = 0; i < circulos.length; i++) 
        {
            circulos[i].dibujar(ctx);                   
        }  

        for (let i = 0; i < circulos.length - 1; i++) 
        {
            for (let j = i + 1; j < circulos.length; j++) 
           {
                circulos[i].conectarCentroCon(ctx, circulos[j]);                   
          }
        } 
        window.requestAnimationFrame (mover);         
    }

    function colorAleatorio(){
        rojo = generarRandom(0,255);
        verde = generarRandom(0,255);
        azul = generarRandom(0,255);
        colorRelleno = "rgb("+rojo+","+verde+","+azul+")";

        return colorRelleno;
    }

    function cambiarTamaño(e)
    {    
        ctx.clearRect(0,0,w,h);
        switch(e.button)
        {
            case 0 : 
                circulos.push (new Proyectil(50, e.clientX, e.clientY,undefined,colorAleatorio()));
            
            case 2 :
                for (let i = 0; i < circulos.length; i++) 
                {
                    if ( circulos[i].radio > 10)
                    {
                        circulos[i].reducir();
                    }
                }           
                break;

            case 1 : 
                /*for (let i = 0; i < circulos.length; i++) 
                {
                    circulos[i].agrandar();                   
                }           
                ctx.fillText(" El mouse está en la x: " + e.clientX, 50,200);*/
        }
        for (let i = 0; i < circulos.length; i++) 
        {
            circulos[i].dibujar(ctx);                   
        }           
    }

    function generarRandom(min,max)
    {
        let numeroGenerado;
        let numeroEsperado;
        numeroGenerado = Math.random();
        numeroEsperado = Math.floor((numeroGenerado * (max - min) + min));
        return numeroEsperado;
    }
}