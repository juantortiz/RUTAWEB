$(document).ready(function(){
ControllerReadMenuDynamic.createWS();
ControllerReadMenuDynamic.readWS();
ControllerGestionUsuarios.out();
ControllerError.EnviaError.init();
    ControllerError.EnviaError.btn_enviar.click(function(){
            ControllerError.EnviaError.validar();
            console.info(this);
    });
ControllerError.EnviaError.btn_cerrar.click(function(){
        ControllerError.EnviaError.cerrar();
    });
});