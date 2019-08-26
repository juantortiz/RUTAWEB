<?php
/** 
    * @author Juan Ortiz
    * @category Class Base a Static Class
    * @version 0.1
    * @link: none
*/
namespace Softing\Base;
class Base {
     const DB_NAME = "ruta";
     const DB_IP_LOCAL = "200.200.1.33";
     const DB_IP_PRIVATE = "200.200.1.33";
     //const DB_IP_PUBLIC = "186.137.157.233";
     const PORT_DB_PRIVATE = "5432";
     const PORT_DB_PUBLIC = "";
     const USER_DB_PUBLIC = "postgres";
     const USER_DB_PRIVATE = "postgres";
     const PASS_DB_PUBLIC = "admin";
     const PASS_DB_PRIVATE = "admin";
     const WEB_IP_PRIVATE = "http://200.200.1.33";
     const WEB_IP_PUBLIC = "http://186.137.157.233";
     const WEB_IP_LOCAL="http://127.0.0.1";
}
?>