<?php   
/** 
    * @author Juan Ortiz
    * @category Class ConnectToDatabase
    * @version 0.1
    * @link: multiple
    * 
    *
*/    
    namespace Softing\Base;
    include_once("BASE/PHP/Base.php");
    class ConnectToDataBase {
         private $conn = null;
         private $result_of_query = "";
         private $error_result="";
         private $strconnect = "";
         function __construct ()
         {
            $base = new \Softing\Base\Base();
            $ip = $base::DB_IP_LOCAL;
            $port = $base::PORT_DB_PRIVATE;
            $dbname = $base::DB_NAME;
            $user = $base::USER_DB_PRIVATE;
            $pass = $base::PASS_DB_PRIVATE; 
            $this->strtoconnect = 'pgsql:host='.$ip.';port='.$port.';dbname='.$dbname.';
            user='.$user.';password='.$pass;
            try 
            {
                $this->conn = new \PDO($this->strtoconnect);
            }
            catch(PDOException $e)
            {
                return $e->getMessage();
            } 
         }
         
         public function getterPDO()
         {
             return $this->conn;
         }
    }
?>