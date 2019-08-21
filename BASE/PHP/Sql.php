<?php
    /**
         * @author Juan Ortiz jortiz@softing.com.ar
         * @category Class Sql
         * @version 1.0
         * @link: none
    */
    namespace Softing\Base;
    
    class Sql {//Constantes para ejecutar las funciones
         private $arregloArgumentos = null;
         const SQL_SP_GENERAL= "SELECT * from";
         const SQL_VALIDA_USER = "SELECT * from usuarios_validacion(:usuariologin,:usuariopassword);";
         const SQL_BLOQUEADO_USER = "SELECT * from usuario_bloqueado(:usuariologin);";
         const SQL_SP_USUARIO= "SELECT menu,solapa from"; 
                     
     function __construct()
     {
          $this->arregloArgumentos = array(
          "usuarios_cambio_clave_olvido" => "usuarios_cambio_clave_olvido(:login,:pseguridadcodigo,:respuestaseguridad)",
          "usuarios_validarpass" => "usuarios_validarpass(:login,:passactual)",
          "usuarios_cambio_clave_nuevo" => "usuarios_cambio_clave_nuevo(:login,:passactual,:passnueva,:passnuevarep,:pseguridadcodigo,:respuestaseguridad,:usuarioestado)", 
          "mnu_abrir" => "mnu_abrir(:usuario_id)",
          "entidades_x_acciones_abm" => "entidades_x_acciones_abm(:modo,:id,:id_entidad,:descraccion,:descripcion)",
          "entidades_x_acciones_view" => "entidades_x_acciones_view",
          "entidades_x_roles_abm" => "entidades_x_roles_abm(:modo,:id,:id_rol,:id_entidad)",
          "roles_x_asociaciones_view" => "roles_x_asociaciones_view",
          "roles_asociaciones" => "roles_asociaciones(:id)",
          "roles_asociaciones_abm" => "roles_asociaciones_abm(:modo,:id,:id_entidades,:rol_id)",
          "roles_view" => "roles_view",
          "roles_abm" => "roles_abm(:modo,:id,:descripcion)",
          "usuarios_view"=> "usuarios_view",
          "grupos_view" => "grupos_view",
          "grupos_x_roles" => "grupos_x_roles(:id)",
          "grupos_x_roles_abm" => "grupos_x_roles_abm(:modo,:id,:id_grupo,:id_rol,:descripcion)",
          "grupos_abm" => "grupos_abm(:modo,:id,:descripcion)",
          "asociaciones_view" => "asociaciones_view",
          "usuarios_abm" => "usuarios_abm(:modo,:id,:mail,:nombre,:apellido,:cuil,:grupo_id,:user)",
          "mnu_view" => "mnu_view",
          "mnu_abm" => "mnu_abm(:modo,:id,:tituloMenu,:id_entidades)",
          "entidades_view"=> "entidades_view",
          "mnu_url_view" => "mnu_url_view"
          );
     }
     public function getterArguments($namestoredprocedure)
     {
          return $this->arregloArgumentos[$namestoredprocedure];
     }


}
?>