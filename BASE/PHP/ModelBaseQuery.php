<?php
    /**
         * @author Daniel Leon
         * @category Class ModelDataBase
         * @version 0.1
         * 
         * 
    */
    namespace Softing\Model;
    include_once("BASE/PHP/ConnectToDataBase.php");
    header('Content-Type: application/json;charset=utf-8');

    class ModelBaseQuery {
         private $conn = null;
         private $objconnect = null;
         private $error = null;
         function __construct()
         {
               $this->objconnect = new \Softing\Base\ConnectToDataBase();
               $this->conn = $this->objconnect->getterPDO();
          }
         public function getterTableRows ($sqlObj)
         {
               try 
               {
                    $recurso = $this->conn->prepare($sqlObj);
                    $recurso->execute();
                    $resultadoarreglo = $recurso->fetchAll();
                    $devJsonArray = $this->resolveArrayToJson($resultadoarreglo);
                    return $devJsonArray;
                    $recurso->close();
               }                   
               catch (\Exception $e)
               {
                    $this->error = $e;
               }
         }

         public function setterTableRows($sqlObj,$arregloParams)
         {
               try 
               {
                    $recurso = $this->conn->prepare($sqlObj);
                    $recurso->execute($arregloParams);
                    $resultadoarreglo = $recurso->fetchAll();
                    $devJsonArray = $this->resolveArrayToJson($resultadoarreglo);
                    return $devJsonArray;
                    $recurso->close();
               }
               catch (\Exception $e)
               {
                    $this->error = $e;
               }
         }

         public function resolveArrayToJson($resultadoarreglo)
          {
               $arregloToJson = [];
               foreach($resultadoarreglo as $array)
               {
                    $flag=true;
                    foreach ($array as $clave => $valor)
                    {
                        if($flag)
                        {
                            $arrayInterno[$clave] = $valor;
                            $flag=false;
                        }  
                        else
                        {
                            $flag=true;                    
                        }
                    }            
                    array_push($arregloToJson,$arrayInterno);
                }
                 $jsonrespuesta = json_encode($arregloToJson, JSON_PRETTY_PRINT);
                 return $jsonrespuesta; 
               
         }
         public function resolveArrayPerfiles($data)
     {    

          $menu1 = array("menu1"=>[0]);$menu2 = array("menu2"=>[0]);$menu3 = array("menu3"=>[0]);                   
          $solapa1 = 0;$solapa2 = 0;$solapa3 = 0;$solapa4 = 0;$solapa5 = 0;

          foreach($data as $array)
          {
               $flag=true;
               foreach ($array as $clave => $valor)
               {
                    if($flag)
                    {                            
                    switch ($clave) { 
                         case "menu": 
                              switch ($valor) { 
                                   case "1":                                                     
                                        $menu1=array("menu1"=>[1]);  
                                        break;                                 
                                   case "2":                               
                                        $menu2=array("menu2"=>[1]); 
                                        break;
                                   case "3":                               
                                        $menu3=array("menu3"=>[1]);
                                        break;
                                             }
                         break;
                         case "solapa": 
                              switch ($valor) { 
                                   case "1":
                                        $solapa1=1;   
                                        break;                                 
                                   case "2":                               
                                        $solapa2=1; 
                                        break;
                                   case "3":                               
                                        $solapa3=1;
                                        break;
                                   case "4":                               
                                        $solapa4=1;
                                        break;
                                   case "5":                               
                                        $solapa5=1;
                                        break;
                                             }
                         break;
                                   }                                   
                    $flag=false;
                    }  
                    else
                    {
                         $flag=true;                    
                    }
               }            
          }
               $arraysolapa=array($solapa1,$solapa2,$solapa3,$solapa4,$solapa5);
               $arrayFinal = array("solapas" => $arraysolapa);
               $Json=array($menu1,$menu2,$menu3,$arrayFinal);               
               $jsonrespuesta = json_encode($Json);
               return $jsonrespuesta;   
     }
}

?>