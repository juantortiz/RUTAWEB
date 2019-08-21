<?php

    /**
         * @author Daniel Leon
         * @category Class ControllerDB con JSON
         * @version 0.1
         * @link: none
    */

namespace Softing\ControllerLogin;

include_once("index/model/ModelClassValidateUser.php"); 


class LlamadoAjax
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
    public function llamadoJsonAjax()
    {
       return $this->objclassvalidateuser->arrayJson($this->user);
    }
}

$controller_validacion = new LlamadoAjax();
$controller_validacion->llamadoJsonAjax();  

?>