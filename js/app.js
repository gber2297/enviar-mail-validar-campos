const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListener();
function eventListener(){
    //inicia app
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //campos form
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reset form
    btnReset.addEventListener('click', resetearFormulario);
    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}

// funciones

function iniciarApp(){
    btnEnviar.disabled = true; 
    btnEnviar.classList.add('cursor-not-allowed', 'opactity-50');    
}

//validando formulario
function validarFormulario(e) {
    //eliminar errores

    const error = document.querySelector('p.error');
    if (error){
        error.remove();
        }

    if (e.target.value.length > 0) {

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email'){
        
        
        if ( er.test( e.target.value )) {

            const error = document.querySelector('p.error');
            if (error){
            error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('El email no es válido');
        }
    }

    if (er.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false; 
        btnEnviar.classList.remove('cursor-not-allowed', 'opactity-50');    
    } else {

    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}   

function enviarEmail(e) {
    e.preventDefault();

    //spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //ocultar spinner
    setTimeout(() => {
        
        spinner.style.display = 'none';

        const mensajeEnviado = document.createElement('p');
        mensajeEnviado.textContent = 'Enviado con exito';
        mensajeEnviado.classList.add('bg-green-500', 'background-green-500', 'text-white-500', 'p-3', 'mt-5', 'text-center', 'text-white','success', 'mb-5', 'bold', 'uppercase');
        formulario.insertBefore(mensajeEnviado, spinner);
        
        setTimeout(() => {
            mensajeEnviado.remove();
            resetearFormulario();  
        }, 4000);
    }, 2000 );
}

//resetear formulario 
function resetearFormulario(){
    formulario.reset();
    iniciarApp();
}