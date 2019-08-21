<?php
/** 
   * @author Juan Ortiz
   * @category Class ControllerEnvioErrires
   * @version 0.1
   * @link: http://<host>:<port>/envioerrores (login)
*/
    namespace Softing\ControllerEnvioErrores;

    include_once("index/model/ModelClassErrorUser.php"); 

    class ControllerEnvioErrores
    {
        private $return_transaction = false;
        private $obj_model = null;
        private $get_message = "";
        function __construct ()
        {
            try 
            {
                $this->get_message = $_GET['mensaje'];
                $this->obj_model = new \Softing\Model\ModelClassErrorUser($this->get_message);
                $this->return_transaction = $this->obj_model->getter_transaction();
            }
            catch (\Exception $e)
            {
                $this->error_class = $e;
                $this->return_transaction = false;
            }
            
        }

        public function respuesta()
        {
            return $this->return_transaction;
        }
    }
    $respuesta = new ControllerEnvioErrores();
    $res = $respuesta->respuesta();
    echo $res;
?>