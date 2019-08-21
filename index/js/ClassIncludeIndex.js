/** 
    * @author Juan Ortiz
    * @category Index JSscript Include Index Class
    * @version 0.1
    * @link: none
*/
/** 
    * Integracion de todos los archivos de javascript sin ingresarlos 
    * uno por uno, en la pagina de index.
    * Verificar siempre en orden de ingreso para los archivos dependientes
*/
document.write("<script type='text/javascript' src='../../BASE/JS/ClassErroresSistema.js'></script>");
document.write('<script type="text/javascript" src="/BASE/JS/XHR.js"></script>');
document.write("<script type='text/javascript' src='/BASE/JS/Base.js'></script>");
document.write('<script src="../../BASE/ERRORES/js/ControllerError.js"></script>');
document.write('<script src="/index/js/ControllerLogin.js"></script>');
document.write('<script src="/index/js/index.js"></script>');