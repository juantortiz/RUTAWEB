<?php
/**
     * @author Juan Tomas Ortiz
     * @category Class ControllerColumnas
     * @version 01.
     * Clase para la obtencion de las columnas de una tabla (en forma generica)
*/
namespace Softing\Controller;
include_once("BASE/PHP/Base.php");
include_once("BASE/PHP/ControllerBaseQuery.php");
class ControllerMenu {
     private $objcontrollerdatabase = null;
     private $storedProcedure = null;
     private $infoGET = null;
     function __construct($thesedata){
          $this->infoGET = json_decode($thesedata);
          $this->objcontrollerdatabase = 
          new \Softing\Controller\ControllerBaseQuery($this->infoGET);
     }
     public function getterRows()
     {

          $json = json_encode($this->objcontrollerdatabase->getterList());
          return $json;
     }

     public function setterRows()
     {
          $json = json_encode($this->objcontrollerdatabase->setterRecord());
          return $json;
     }

    

     public function resolveFunc()
     {
          if ($this->infoGET->operacion == "LIST")
          {
               print_r($this->getterRows());
          }
          else {
               if($this->infoGET->operacion == "INS" || $this->infoGET->operacion == "UPD")
               {
                    foreach($this->infoGET->data->id_entidades as $item)
                    {
                        $this->infoGET->data->id_entidades = $item;
                        $var = $this->setterRows();
                        
                    }
                    $objPhp = json_decode($var);
                    if(count($objPhp)==0)
                    {
                        print_r('1');
                    }
                    else 
                    {
                         print_r($var);
                    }
                    
               }
               else 
               {
                    if($this->infoGET->operacion == "DEL")
                    {
                         $var = $this->setterRows();
                         print_r($var);
                    }
               }
               
          }
     }
}
     $data = $_GET['data'];
     $objController = new \Softing\Controller\ControllerMenu($data);
     $objController->resolveFunc();
?>