/** 
    * @author Juan Ortiz
    * @category ControllerError Class
    * @version 0.1
    * @link: none
    * Controller general para el envio de errores por parte del usuario a soporte.
*/
ControllerError = {};
ControllerError.EnviaError = {
    url_error:'http://'+Base.WEB_IP_LOCAL+Base.URLS[0].envioerrores,
    btn_enviar:null,
    btn_cerrar:null,
    field_error_div:null,
    field_error_value:null,
    text_error:null,
    formulario:null,
    init:function()
    {
        this.btn_cerrar = $("#cerrar_enviar_error");
        this.btn_enviar = $("#enviar_enviar_error");
        this.field_error_value = $("#comentarios");
        this.field_error_div = $("#comentariosdiv");
        this.text_error = $("#textoalerta");
        this.formulario = $("#datosError");
    },
    enviar: function()
    {
        let url = this.url_error;
        let textoerror = this.field_error_value.val();
        let mensaje = 'mensaje=' + textoerror;
        thisurl = url+"?"+mensaje;
        XHR.NewXhrGET(thisurl,function(RText){
                let valor_respuesta = JSON.parse(RText);
                if (valor_respuesta['resultado'] == 'OK')
                {
                    this.field_error_value = $("#comentarios");
                    this.field_error_value.val('');
                    this.text_ok = $("#textook");
                    this.text_ok.css({'display':'block'});
                    setTimeout(function(){
                        this.text_ok.fadeOut("slow");
                        this.modal = $("#errorenvio");
                        this.modal.modal('toggle');
                        },2000);
                        
                }
        });
    },
    cerrar: function()
    {
        this.field_error_div.removeClass('has-error');
        this.text_error.css({'display':'none'});

    },
    validar: function()
    {
        let informacion = this.field_error_value.val();
        if(informacion == "")
        {
            this.field_error_div.addClass('has-error');
            this.text_error.css({'display':'block'});
        }
        else 
        {

            this.enviar();
        }

        this.field_error_value.focus(function()
        {
                this.field_error_div = $("#comentariosdiv");
                this.text_error = $("#textoalerta");
                this.field_error_div.removeClass('has-error');
                this.text_error.css({'display':'none'});
        });
        

    }
} 