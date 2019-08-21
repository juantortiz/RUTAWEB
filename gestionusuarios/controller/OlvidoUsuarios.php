<?php
/** 
    * @author Daniel Leon
    * @category Class ClassValidateUserOlvido
    * @version 0.1
*/
namespace Softing\Base;
include_once("../../BASE/PHP/Base.php");
include_once("../../BASE/PHP/ConnectToDataBase.php");
include_once("../../BASE/PHP/Sql.php");

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
    private function UsuarioOlvido($sql,$conn,$param,$login)
    {       
        try 
            {                  
            $recurso = $conn->prepare($sql);
            $recurso->execute($param);
            $destino = $recurso->fetchColumn(1); 

            $recurso2 = $conn->prepare($sql);
            $recurso2->execute($param);
            $asunto = $recurso2->fetchColumn(3);

            $recurso3 = $conn->prepare($sql);
            $recurso3->execute($param);
            $desde = $recurso3->fetchColumn(9);

            $recurso4 = $conn->prepare($sql);
            $recurso4->execute($param);
            $nombre = $recurso4->fetchColumn(2);
            $mensaje = "Hola ".$nombre.", Por medio de la presente informamos el usuario y contraseña de ingreso al sistema RUTA. 
            Usuario: ".$login."
            Contraseña: ".$login."
            Desde ya muchas gracias.";
        
            $from = "From: " .$desde;
            $email = mail($destino,$asunto,$mensaje,$from);

                    if($email)
                    {
                        echo "<script language='javascript'>
                        alert ('Email enviado exitosamente! ');
                        let url = 'http://201.216.197.213';
                        window.location=url;
                        </script>";                  
                    }
                    else
                    {
                        echo "<script language='javascript'>
                        alert ('Error. Los datos ingresados son incorrectos! ');
                        let url = 'http://201.216.197.213';
                        window.location=url;
                        </script>";
                    }
                    $recurso->close();
                    $recurso2->close();
                    $recurso3->close();
                    $recurso4->close();
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
            $login = $_POST["labelusuario"];
            $param = array ("pseguridadcodigo" => $pregunta = $_POST["pregunta"], "respuestaseguridad" => $_POST["respuesta"],
            "login" => $login,"logincrypt" => crypt($login,'$5$rounds='));
            $conn = $this->connection->getterPDO(); 
            $base = $this->base_sql; 
            $sql = $base::SQL_SP_GENERAL." ".$base->getterArguments("usuarios_olvido_clave");
            $this->UsuarioOlvido($sql,$conn,$param,$login);
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