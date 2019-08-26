<?php
/** 
    * @author Syloper
    * @category Class ClassValidateProvincia
    * @version 0.1
*/
namespace Softing\Model;
include_once("BASE/PHP/ModelBaseQuery.php");
include_once("BASE/PHP/ConnectToDataBase.php");
include_once("BASE/PHP/Sql.php");

class ModelClassValidateProvincia {
    private $base_sql = null;    
    private $error_str = "";
    private $response = false; 
    private $responses = false;  
    private $connection = null;
    private $objmodeldatabase = null;

    //TODO - Rearmar esta clase...
    

    function __construct()
    {
        $this->objmodeldatabase = new \Softing\Model\ModelBaseQuery();
        $this->connection = new \Softing\Base\ConnectToDataBase();
        $this->base_sql = new \Softing\Base\Sql();  
    }
    
    private function queryPDO($sql,$sql2,$sql3,$conn,$param,$arregloParams,$USER){       
    
        try{
            $consulta = $conn->prepare($sql);
            $consulta->execute($param);
            $resultadobloq = $consulta->fetchColumn(0); 
            
            if($resultadobloq)
            {    
                $resultadobloq = '{"auth":"BLOQ"}';       
                return $resultadobloq;                     
            }
            else
            {                                              
                $recurso = $conn->prepare($sql2);
                $recurso->execute($arregloParams);
                $resultadologin = $recurso->fetchColumn(0); 

                if($resultadologin){     
                    $recurso1 = $conn->prepare($sql);
                    $recurso1->execute($param);
                    $usuario_estado = $recurso1->fetchColumn(2);
                    
                        if($usuario_estado=='Nuevo     '){

                            $resultado = '{"auth":"NUEVO"}'; 
                            return $resultado; 
                        }
                        $resultado = '{"auth":"OK"}';                          
                        return $resultado;
                    }else{
                        $resultado2 = '{"auth":"BAD"}';                             
                        return $resultado2;  
                    }                    
            } 
            $consulta->close();
            $recurso->close();
            $recurso1->close();
        }catch (\Exception $e){
            return $this->error_str = $e;
        }   
    }            
   
    public function arrayJson($USER)
    {  
        try{    
            $conn = $this->connection->getterPDO();                   
            $base = $this->base_sql;
            $sql = $base::SQL_BLOQUEADO_USER;
            $sql2 = $base::SQL_SP_GENERAL." ".$base->getterArguments("mnu_abrir"); 
            $param=array("usuariologin"=> $USER);                    

            $recurso = $conn->prepare($sql);
            $recurso->execute($param);
            $id_usuario = $recurso->fetchColumn(1);
            $param2=array("usuario_id"=> $id_usuario); 

            $recurso2 = $conn->prepare($sql2);
            $recurso2->execute($param2);
            $data = $recurso2->fetchAll();
            $devArrayComplex = $this->objmodeldatabase->resolveArrayToJsonComplex($data);         

            $Json = array ("usuario" => $USER,"desplegable" => $devArrayComplex);
            print_r (json_encode($Json, JSON_PRETTY_PRINT));
            $recurso->close();
            $recurso2->close();
            return $Json;
                    
        }catch (\Exception $e){
           return $this->error_str = $e;
        }finally{
            return $this->response;
        }
    }
}
?>