/** 
    * @author Syloper
    * @category ControllerProvincias Class
    * @version 0.1
    * @link: none
*/

ControllerProvincias = {};
ControllerProvincias.Listar = {

    text_nombre:null,
    init:function()
    {

        //this.btn_aceptar = $("#aceptarusuario");
    },
    aceptar: function()
    {
        let url = "http://201.216.197.213/domicilios-provincias";
        //let usuario = this.text_usuario.val();
        //let pass = this.text_password.val();
        //let mensaje = 'usuario=' + usuario + "&pass="+ pass;
        let mensaje = '';
        thisurl = url+"?"+mensaje;
        
       
        XHR.NewXhrGET(thisurl,function(RText){
           
                 let valor_respuesta = JSON.parse(RText);              
                 let urladmin = 'http://201.216.197.213/domicilios-provincias';
                 //let urlusuario = 'http://201.216.197.213/Nuevos';        
                if (valor_respuesta['auth'] == 'OK')
                {
                      $.ajax({
                        type:"GET",
                        data:mensaje,
                        url:"/llamadoAjax"
                    }).done(function(datos){
                        alert('Los Datos son: ' + JSON.stringify(datos)); 
                        window.location=urladmin
                      });

                }
                if (valor_respuesta['auth'] == 'BAD')
                {
                    ControllerProvincias.Login.div_usuario.addClass('has-error');
                    ControllerProvincias.Login.div_password.addClass('has-error');
                    ControllerProvincias.Login.info_user.css({'display':'block'});
                    ControllerProvincias.Login.text_usuario.val('');
                    ControllerProvincias.Login.text_password.val('');
                } 
                if (valor_respuesta['auth'] == 'BLOQ')
                {
                    ControllerProvincias.Login.div_usuario.addClass('has-error');
                    ControllerProvincias.Login.div_password.addClass('has-error');
                    ControllerProvincias.Login.info_user2.css({'display':'block'});
                    ControllerProvincias.Login.text_usuario.val('');
                    ControllerProvincias.Login.text_password.val(''); 
                }
                if (valor_respuesta['auth'] == 'NUEVO')
                {            
                    //window.location=urlusuario+"?tn2dnjbbWn4T8v0hEj9UfbMhmrxeEyXlKTLQZDqQSB="+usuario;
                }
        });
    }/*
    ,
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
    */

} 
