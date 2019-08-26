   /**
         * @author Juan Ortiz jortiz@softing.com.ar
         * @category Class ClassErroresSistema
         * @version 1.0
         * @link: none
         * @summary: Clase para el envio de errores del sistema (se utiliza en todas las views)
         * necesita tener integrado jquery.
    */

   ClassErroresSistema = 
   {
       cuerpo_mensaje:null,
       boton_enviar:null,
       boton_cerrar:null,
       init:function(str_elemento1, str_elemento2, str_elemento3)
       {
           this.cuerpo_mensaje = $(str_elemento1).value();
           this.boton_enviar = $(str_elemento2);
           this.boton_cerrar = $(str_elemento3);
       }
   
   }