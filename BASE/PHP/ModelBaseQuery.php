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
        
        public function resolveArrayToJsonComplex($resultadoarreglo)
        {
               foreach($resultadoarreglo as $array) 
               {                  
               $flag=0;
               $arregloToJson = [];
               $arrayInterno2 = [];
               $arrayInterno3 = [];
               $arrayInternoPestanias = [];
               $arrayInternoPestanias2 = [];
               foreach ($array as $clave => $valor) 
               {
                    if($flag==0) 
                    {
                         // Para el Menu
                         $arregloToJson[$clave] = $valor;
                         $flag++;
                    } 
                    elseif($flag==2) 
                    {
                         // Para el Nombre
                         $arrayInternoPestanias[$clave] = $valor;
                         $flag++;
                    } 
                    elseif ($flag==4)
                    {
                         // Para las acciones
                         $opciones = explode(",", $valor);
                         $arrayInterno2 = [];
                         foreach ($opciones as $clave => $valor)
                         {
                              $arrayInterno2[$valor] = "true";
                         }
                         //Crear el arreglo dentro de otro arreglo
                         $arrayInterno3[] = $arrayInterno2;
                         $arrayInternoPestanias["acciones"] = $arrayInterno3;
                         $flag++;
                    } 
                    elseif ($flag==6) 
                    {
                         // Para el Icon
                         $arregloToJson['icon'] = $valor;
                    } 
                    else 
                    {
                       $flag++;                    
                    }
               } 
                    //Crear el arreglo dentro de otro arreglo
                    $arrayInternoPestanias2[] = $arrayInternoPestanias;
                    $arregloToJson["pestanas"] = $arrayInternoPestanias2;
                    $arregloToJsonFinal[] = $arregloToJson;
               }                 
               return $arregloToJsonFinal;              
       }

}

?>