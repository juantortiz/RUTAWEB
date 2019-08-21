<?php
/** 
    * @author Daniel Leon
    * @category Class ClassValidateUserOlvido
    * @version 0.1
*/
namespace Softing\Base;
include("ConnectToDataBase.php");
include("../../BASE/PHP/Sql.php");

class ModelClassUserOlvido {     
        private $base_sql = null;    
        private $error_str = "";
        private $response = false;   
        private $connection = null;
        
    function __construct()
    {
        $this->connection = new \Softing\Base\ConnectToDataBase();
        $this->base_sql = new \Softing\Base\Sql();
    }
    private function UsuarioOlvido($sql,$conn,$param)
    {       
        try 
            {   

                print_r($param); echo $sql;
              /*  $recurso = $conn->prepare($sql);
                $recurso->execute($param);
                $resultado = $recurso->fetchColumn(0);         
                    if($resultado)
                    { 
                        echo "<script language='javascript'>
                        alert ('Se cambio la clave satisfactoriamente');
                        let url = 'http://201.216.197.213';
                        window.location=url;
                        </script>";
                    }
                    else 
                    { 
                        echo "<script language='javascript'>
                        alert ('Error las contraseñas no son iguales');
                        let url = 'http://201.216.197.213';
                        window.location=url;
                        </script>";
                    }
                $recurso->close();*/
            }
            catch (\Exception $e)
            {
                return $this->error_str = $e;
            }   
        }  
        public function validar()
        {  
        try 
        {   
            $param = array ("login" => $_POST["labelusuario"], "pseguridadcodigo" => $pregunta = $_POST["pregunta"], "respuestaseguridad" => $_POST["respuesta"]);
            $conn = $this->connection->getterPDO(); 
            $base = $this->base_sql;                 
            $sql = $base::SQL_SP_GENERAL." ".$base->getterArguments("usuarios_cambio_clave_olvido");
            $this->UsuarioOlvido($sql,$conn,$param);
        }
        catch (\Exception $e)
        {
            return $this->error_str = $e;
        }
        finally 
        {
            return $this->response;
        }
                
        }
    }
    $controller_user_olvido = new ModelClassUserOlvido();
    $controller_user_olvido->validar();
?>