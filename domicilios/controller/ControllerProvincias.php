<?php
/** 
   * @author Syloper
   * @category Class ControllerProvincias
   * @version 0.1
   * @link: http://<host>:<port>/domicilios-provincias
*/
    namespace Softing\ControllerProvincias;

    include_once("BASE/PHP/Base.php");
    include_once("BASE/PHP/ControllerBaseQuery.php"); 
    
    include_once("domicilios/model/ModelClassValidateProvincia.php"); 

    class ControllerProvincias
    {
        private $objclassvalidateprov = null;
        private $error_class = null;
        
        function __construct ()
        {
            try 
            {
                $this->objclassvalidateprov = new \Softing\Model\ModelClassValidateProvincia();
                
            }
            catch (\Exception $e)
            {
                $this->error_class = $e;
            }            
        }
        /*
        public function validacion_usuario()
        {
           return $this->objclassvalidateprov->validar($this->user, $this->pass);
        }
        */
    }

    $controller_validacion = new ControllerProvincias();
    //echo $controller_validacion->validacion_usuario();

?>