<?php
    /**
         * @author Daniel Leon
         * @category Class ControllerBaseQuery
         * @version 0.1
         * @link: none
         * @param 
         * 
         * 
         * 
    */
    namespace Softing\Controller;
    include_once("BASE/PHP/ModelBaseQuery.php");
    include_once("BASE/PHP/Sql.php");
    header('Content-Type: application/json;charset=utf-8');
    
    class ControllerBaseQuery {
         private $objmodeldatabase = null;
         private $objdataFront = null;
         private $sqlObj = null;
      
         function __construct($dataFront)
         {                  
               $this->objdataFront = $dataFront;                 
               $this->objmodeldatabase = new \Softing\Model\ModelBaseQuery();
               $this->sqlObj = new \Softing\Base\Sql();
          }
         public function getterListUpdDel()
         {     
            $sql = $this->sqlObj::SQL_SP_GENERAL." ".$this->sqlObj->getterArguments($this->objdataFront->tabla);
            if(isset($this->objdataFront->data))
            { 
                  $arreglo = json_decode(json_encode($this->objdataFront->data),true);
                  $params = $arreglo;
                  return $this->objmodeldatabase->setterTableRows($sql,$params);             
            }
            else
            {
                  return $this->objmodeldatabase->getterTableRows($sql);                                       
            }         

         }
    }

?>