/** 
    * @author Juan Ortiz
    * @category Index JScript Classes 
    * @version 0.1
    * @link: none
*/
$(document).ready(function(){

    ControllerLogin.Login.init();
    ControllerLogin.Login.btn_aceptar.click(function(){
        ControllerLogin.Login.validar();
    });

    ControllerLogin.Login.btn_registrarse.click(function(){
        ControllerLogin.Login.registrarse();
    });

    ControllerError.EnviaError.init();
    ControllerError.EnviaError.btn_enviar.click(function(){
            ControllerError.EnviaError.validar();
    });
    ControllerError.EnviaError.btn_cerrar.click(function(){
        ControllerError.EnviaError.cerrar();
    });

    

});

