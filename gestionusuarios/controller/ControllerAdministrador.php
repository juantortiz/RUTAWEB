<?php
/**
     * @author Daniel Leon
     * @category Class ControllerColumnas
     * @version 01.
     * Clase para la obtencion de las columnas de una tabla (en forma generica)
*/
namespace Softing\Controller;
include_once("BASE/PHP/Base.php");
include_once("BASE/PHP/ControllerBaseQuery.php"); 

class ControllerAdministrador {
     private $objcontrollerdatabase = null;
     private $infoGET = null;

     function __construct($thesedata)
     {
          $this->infoGET = json_decode($thesedata);
          $this->objcontrollerdatabase = new \Softing\Controller\ControllerBaseQuery($this->infoGET);
     }
 
     public function resolveFunc()
     {
          $resultadoJson = $this->objcontrollerdatabase->getterListUpdDel();
          echo $resultadoJson;
          return $resultadoJson;//Valores que devuelve al Front en formato JSON
     }
}
   
     $dataFront = $_GET['data'];
     $obj = new \Softing\Controller\ControllerAdministrador($dataFront);
     $obj->resolveFunc();
          
/* ESTAS LINEAS DE CODIGO SON PARA REALIZAR LAS PRUEBAS DE FUNCIONAMIENTO
//$dataFront = '{"tabla":"entidades_x_acciones_view"}'; //LISTAR 
//$dataFront = '{"tabla":"roles_asociaciones","data":{"roles_id":1}}'; //LISTAR CON PARAMETROS
//$dataFront = '{"tabla":"entidades_x_acciones_abm","data":{"modo":"UPD","entxact_id":3,"entidad_id":3,"acciones_id":3,"descripcion":"UpdateDelete"}}'; //UPDATE Y DELETE
*/
?>

