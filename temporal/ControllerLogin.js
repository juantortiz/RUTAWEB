/** 
    * @author Juan Ortiz
    * @category ControllerLogin Class
    * @version 0.1
    * @link: none
*/

ControllerLogin = {};
ControllerLogin.Login = {

    text_usuario:null,
    text_password:null,
    div_usuario:null,
    div_password:null,
    btn_aceptar:null,
    btn_registrarse:null,
    info_user:null,
    info_user2:null,
    init:function()
    {

        this.btn_aceptar = $("#aceptarusuario");
        this.btn_registrarse = $("#registrarusuario");
        this.info_user = $("#useralerta");
        this.info_user2 = $("#useralerta2");
        this.text_usuario = $("#textusuario");
        this.text_password = $("#textpassword");
        this.div_password = $("#divpassword");
        this.div_usuario = $("#divuser");
    },
    aceptar: function()
    {
        let url = "http://localhost:22000/login";
        let usuario = this.text_usuario.val();
        let pass = this.text_password.val();
        let mensaje = 'usuario=' + usuario + "&pass="+ pass;
        thisurl = url+"?"+mensaje;
        
       
        XHR.NewXhrGET(thisurl,function(RText){
           
                 let valor_respuesta = JSON.parse(RText);              
                 let urladmin = 'http://localhost:22000/usuarios';
                 let urlusuario = 'http://localhost:22000/Nuevos';        
                if (valor_respuesta['auth'] == 'OK')
                {
                      $.ajax({
                        type:"GET",
                        data:mensaje,
                        url:"/llamadoAjax"
                    }).done(function(datos){
                        alert('Los Datos son: ' + JSON.stringify(datos));
                        let json = JSON.stringify(datos);
                        // Almacena la información en sessionStorage
                        sessionStorage.setItem('data', json);
                        // Obtiene la información almacenada desde sessionStorage
                        let sesion = sessionStorage.getItem('data');   
                   });
                }
                if (valor_respuesta['auth'] == 'BAD')
                {
                    ControllerLogin.Login.div_usuario.addClass('has-error');
                    ControllerLogin.Login.div_password.addClass('has-error');
                    ControllerLogin.Login.info_user.css({'display':'block'});
                    ControllerLogin.Login.text_usuario.val('');
                    ControllerLogin.Login.text_password.val('');
                } 
                if (valor_respuesta['auth'] == 'BLOQ')
                {
                    ControllerLogin.Login.div_usuario.addClass('has-error');
                    ControllerLogin.Login.div_password.addClass('has-error');
                    ControllerLogin.Login.info_user2.css({'display':'block'});
                    ControllerLogin.Login.text_usuario.val('');
                    ControllerLogin.Login.text_password.val(''); 
                }
                if (valor_respuesta['auth'] == 'NUEVO')
                {            
                    window.location=urlusuario+"?tn2dnjbbWn4T8v0hEj9UfbMhmrxeEyXlKTLQZDqQSB="+usuario;
                }
        });
    },
    validar: function()
    {
        let esteusuario = this.text_usuario.val();
        let estepassword = this.text_password.val();

        if(esteusuario == "" || estepassword == "")
        {
            this.div_usuario.addClass('has-error');
            this.div_password.addClass('has-error');
            this.info_user.css({'display':'block'});
            this.text_usuario.val('');
            this.text_password.val('');
        }
        else 
        {
            this.aceptar();
        }

        this.text_usuario.focus(function(){
            this.div_password = $("#divpassword");
            this.div_usuario = $("#divuser");
            this.info_user = $("#useralerta");
            this.info_user2 = $("#useralerta2");
            this.div_usuario.removeClass('has-error');
            this.div_password.removeClass('has-error');
            this.info_user.css({'display':'none'});
            this.info_user2.css({'display':'none'});

        });
        this.text_password.focus(function(){
            this.div_password = $("#divpassword");
            this.div_usuario = $("#divuser");
            this.info_user = $("#useralerta");
            this.info_user2 = $("#useralerta2");
            this.div_usuario.removeClass('has-error');
            this.div_password.removeClass('has-error');
            this.info_user.css({'display':'none'});
            this.info_user2.css({'display':'none'});

        });
    }

} 
