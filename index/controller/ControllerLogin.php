<?php
/** 
   * @author Daniel Leon
   * @category Class ControllerLogin
   * @version 0.1
   * @link: http://<host>:<port>/login (login)
*/
    namespace Softing\ControllerLogin;

    include_once("index/model/ModelClassValidateUser.php"); 

    class ControllerLogin
    {
        private $objclassvalidateuser = null;
        private $error_class = null;
        private $user = "";
        private $pass = "";
        function __construct ()
        {
            try 
            {
                $this->objclassvalidateuser = new \Softing\Model\ModelClassValidateUser();
                $this->user = $_GET["usuario"];
                $this->pass = $_GET["pass"];
            }
            catch (\Exception $e)
            {
                $this->error_class = $e;
            }            
        }
        public function validacion_usuario()
        {
           return $this->objclassvalidateuser->validar($this->user, $this->pass);
        }
    }

    $controller_validacion = new ControllerLogin();
    echo $controller_validacion->validacion_usuario();
?>