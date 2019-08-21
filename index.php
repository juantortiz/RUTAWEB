<?php
	/** 
    * @author Juan Ortiz
    * @category Index Router 
    * @version 0.1
    * @link: none
*/

	 $request = $_SERVER['REQUEST_URI'];

	switch ($request) {
		case '/' :
			require __DIR__ . '/index/views/index.html';
			break;	
		case (preg_match('/login/',$request) ? true : false):
			require __DIR__ . '/index/controller/ControllerLogin.php';
			break;
		case '/usuarios':
			require __DIR__ . '/gestionusuarios/views/gestionusuarios.html';
			break;
		case (preg_match('/querySystem/',$request) ? true : false):
			require __DIR__ . '/gestionusuarios/controller/ControllerMenu.php';
			break;
	    case (preg_match('/Nuevos/',$request) ? true : false):
			require __DIR__ . '/index/views/UsuarioNuevo.html';
			break; 
		/** 
		 *  Estructura de las tablas (vistas)
		*/
		case '/columnsperfiles':
			require __DIR__ . '/gestionusuarios/json/columnsperfiles.json';
			break;
		case '/columnsperfilesroles':
			require __DIR__ . '/gestionusuarios/json/columnsperfilesroles.json';
			break;
		case '/columnsroles':
			require __DIR__ . '/gestionusuarios/json/columnsroles.json';
			break;
		case '/columnsrolesentidades':
			require __DIR__ . '/gestionusuarios/json/columnsrolesentidades.json';
			break;
		case '/columnsusuarios':
			require __DIR__ . '/gestionusuarios/json/columnsusuarios.json';
			break;
		case '/columnsasociaciones':
			require __DIR__ . '/gestionusuarios/json/columnsasociaciones.json';
			break;
		case '/columnsmenu':
			require __DIR__ . '/gestionusuarios/json/columnsmenu.json';
			break;
		case (preg_match('/putWS/',$request) ? true : false):
			require __DIR__ . '/gestionusuarios/json/menusuarios.json';
			break;
		
		/** Path para las consultas con Ajax */
		case (preg_match('/pruebaJSON/',$request) ? true : false):
			require __DIR__ . '/gestionusuarios/controller/ControllerAdministrador.php';
			break;
		case (preg_match('/indexNuevo/',$request) ? true : false):
			require __DIR__ . '/index/views/index.html';
			break;
		case (preg_match('/pruebaDaniel/',$request) ? true : false):
			require __DIR__ . '/index/controller/ControllerLogin.php';
			break;		
		case (preg_match('/llamadoAjax/',$request) ? true : false):
			require __DIR__ . '/index/controller/LlamadoAjax.php';
			break;
		/** Pagina por defecto*/
		default:
			require __DIR__ . '/index/views/index.html';
			break; 
	}




?>




