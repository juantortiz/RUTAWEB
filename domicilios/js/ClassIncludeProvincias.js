/** 
    * @author Syloper
    * @category Provincias JSscript Include Index Class
    * @version 0.1
    * @link: none
*/
/** 
    * Integracion de todos los archivos de javascript sin ingresarlos 
    * uno por uno, en la pagina de provincias.
    * Verificar siempre en orden de ingreso para los archivos dependientes
*/
document.write("<script type='text/javascript' src='../../BASE/JS/ClassErroresSistema.js'></script>");
document.write('<script type="text/javascript" src="/BASE/JS/XHR.js"></script>');
document.write("<script type='text/javascript' src='/BASE/JS/Base.js'></script>");
document.write('<script src="../../BASE/ERRORES/js/ControllerError.js"></script>');
document.write('<script src="/domicilios/js/ControllerProvincias.js"></script>');
document.write('<script src="/domicilios/js/provincias.js"></script>');