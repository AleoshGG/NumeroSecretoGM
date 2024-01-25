/* let titulo = document.querySelector('h1'); //Acceder a elementos HTML con el nombre de la etiqueta, se vulve un objeto.
titulo.innerHTML = 'Juego del numero secreto';

let parrafo = document.querySelector('.texto__parrafo');//Acceso a travez de su clase.
parrafo.innerHTML = 'Ingresa un numero del 1 al 10'; */

let numeroSecreto = 0;
let intentos = 0;
let rondasDisponibles = 5;
let listaNumeros = [];

function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function generarNumero(){
    //modificar el numero a una variable para hacer las comparaciones 
    let numeroAleatorio = Math.floor(Math.random()*10)+1;

    //Para que no se rompa el juego con la recursividad, agregamos la condicion de salida seran 5 rondas
    if(listaNumeros.length<5) {
        //validar si ya existe en nuestro array
        if(listaNumeros.includes(numeroAleatorio)){
            //aplicamos recursividad para generar otro numero
            return generarNumero();
        }else{
            //Si no esta en el arreglo lo agregamos y lo retornamos
            listaNumeros.push(numeroAleatorio);
            return numeroAleatorio;
        }        
    }else{
        asignarTextoElemento('p','Ya haz jugado mucho');
    }


}

function verificarIntento(){
    //obtener del input el valor que se ingresa y convertirlo para usarlo de manera adecuada
    let numeroUsusario = parseInt(document.getElementById('numeroUsuario').value); 

    if(numeroSecreto==numeroUsusario){
        asignarTextoElemento('.texto__parrafo',`Excelente: ${intentos} ${(intentos == 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if(numeroSecreto>numeroUsusario){
        asignarTextoElemento('.texto__parrafo','Es mayor');
    }else {
        asignarTextoElemento('.texto__parrafo','Es menor');
    }
    intentos++;
    limpraCaja();
    //console.log(numeroSecreto===numeroUsusario); validar si las variables son iguales en valor y tipo
}

function limpraCaja(){
    //Limpiar el input
    document.getElementById('numeroUsuario').value = '';
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del numero secreto');
    asignarTextoElemento('.texto__parrafo','Ingresa un numero del 1 al 10');
    numeroSecreto = generarNumero();
    intentos = 1;
}

function reiniciarJuego(){
    //Limpiar la caja 
    limpraCaja();
    //Mostrar mensajes iniciales 
    //Reiniciar variables
    condicionesIniciales();
    //deabilitar boton 
    document.getElementById('reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();