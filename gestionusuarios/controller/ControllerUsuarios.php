<?php
/** 
    * @author Daniel Leon
    * @category Class ClassValidateUserNuevos
    * @version 0.1
*/
namespace Softing\Base;
include("ConnectToDataBase.php");
include("../../BASE/PHP/Sql.php");

class ModelClassUserNuevo {     
        private $base_sql = null;    
        private $error_str = "";
        private $response = false;   
        private $connection = null;
        
    function __construct()
    {
        $this->connection = new \Softing\Base\ConnectToDataBase();
        $this->base_sql = new \Softing\Base\Sql();
    }
    private function agregarUsuarioNuevo($sql,$sql2,$conn,$param,$param2)
    {       
        try 
            {   
                $recurso2 = $conn->prepare($sql2);
                $recurso2->execute($param2);
                $resultado2 = $recurso2->fetchColumn(0);
                if($resultado2)
                { 
                    $recurso = $conn->prepare($sql);
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
                            alert ('Error las contraseñas nuevas no son iguales');
                            let url = 'http://201.216.197.213';
                            window.location=url;
                            </script>";
                        }  
                }
                else 
                { 
                    echo "<script language='javascript'>
                    alert ('La contraseña actual no es igual');
                    let url = 'http://201.216.197.213';
                    window.location=url;
                    </script>";
                }    
                $recurso->close();
                $recurso2->close();
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
            $password_hash = crypt($_POST["labelcontrasena"],'$5$rounds=');
            $password_hash_nue = crypt($_POST["labelpassword"],'$5$rounds=');
            $password_hash_nue2 = crypt($_POST["labelpassword2"],'$5$rounds=');
            $param = array ("login" => $_POST["login"], "passactual" => $password_hash, "passnueva" => $password_hash_nue, "passnuevarep" => $password_hash_nue2,
            "pseguridadcodigo" => $pregunta = $_POST["pregunta"], "respuestaseguridad" => $_POST["respuesta"], "usuarioestado" => "Nuevo");
            $param2 = array ("login" => $_POST["login"], "passactual" => $password_hash);
            $conn = $this->connection->getterPDO(); 
            $base = $this->base_sql;                 
            $sql = $base::SQL_SP_GENERAL." ".$base->getterArguments("usuarios_cambio_clave_nuevo");
            $sql2 = $base::SQL_SP_GENERAL." ".$base->getterArguments("usuarios_validarpass");
            $this->agregarUsuarioNuevo($sql,$sql2,$conn,$param,$param2);
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
    $controller_user_nuevo = new ModelClassUserNuevo();
    $controller_user_nuevo->validar();
?>