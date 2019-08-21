<?php
/** 
    * @author Juan Ortiz
    * @category Class ModelClassErrorUser
    * @version 0.1
    * @link: http://<host>:<port>/login (login)
*/
namespace Softing\Model;
include_once("BASE/ConnectToDataBase.php");
include_once("BASE/Sql.php");

class ModelClassErrorUser {
        private $sql_query_insert = null;
        private $resultado ="";
        private $obj_result = null;
        private $error_str = "";

        function __construct($mensaje)
        {
                try 
                {
                        $sql_obj = new \Softing\Base\Sql();
                        $this->sql_query_insert = $sql_obj::SQL_ENVIA_ERRORES."('$mensaje')";
                        $this->obj_result = new \Softing\Base\ConnectToDataBase();
                        $this->resultado = $this->obj_result->query_PDO($this->sql_query_insert);
                        
                }
                catch (\Exception $e)
                {
                        $this->resultado = $e;
                        $this->error_str = $e;
                }
        }

        public function getter_transaction()
        {
                return $this->resultado;
        }
}
?>