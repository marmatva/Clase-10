const $start=document.getElementById('start');

$start.addEventListener('click', comenzarJuego);

let secuenciaMaquina=[];
let secuenciaUsuario=[];

let ronda='-';

function comenzarJuego(){
    resetearJuego();
    bloquearInputUsuario();
    ronda=0;
    manejarRonda();
}

function manejarRonda(){
    let $colores=document.querySelectorAll('.colors');
    let seleccion=Math.floor(Math.random()*($colores.length));
    secuenciaMaquina.push($colores[seleccion]);

    secuenciaMaquina.forEach((color,index) => {
        setTimeout( ()=>{
            resaltar(color)
        }, 1000*(index+1));    
    });
   // let RETRASO_MAQUINA_MS = 0;
    let RETRASO_USER_MS = secuenciaMaquina.length*1000;

    setTimeout(()=>{
        desbloquearInputUsuario();
    },RETRASO_USER_MS);
    
    secuenciaUsuario=[];
    ronda++;
}

function manejarInputUsuario(e){
    resaltar(e.target);
    secuenciaUsuario.push(e.target);
    index=secuenciaUsuario.length-1;
    if(e.target.id!=secuenciaMaquina[index].id){
        perder();
        return;
    }
    if(secuenciaUsuario.length==secuenciaMaquina.length){
        bloquearInputUsuario();
        setTimeout(()=>{manejarRonda()},1000);
    }
}

function resetearJuego(){
    ronda='-';
    secuenciaMaquina=[];
    secuenciaUsuario=[];
}

function bloquearInputUsuario(){
    let $colores=document.querySelectorAll('.colors');
    $colores.forEach(color => color.onclick = () =>{});
}

function desbloquearInputUsuario(){
    let $colores=document.querySelectorAll('.colors');
    $colores.forEach(color => {
        color.onclick = (e) =>{
            manejarInputUsuario(e);
        }})
}

function resaltar(elemento){
    elemento.style.opacity = 0.5
    setTimeout(elemento => elemento.style.opacity=1,500, elemento);
}

function perder(){
    alert('Perdiste! Prueba de nuevo');
    resetearJuego();
}