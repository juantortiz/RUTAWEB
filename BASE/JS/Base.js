/** 
    * @author Juan Ortiz
    * @category Class Base JSON Object
    * @version 0.1
    * @link: none
    * 
    * Base es el objeto que permite administrar las conexiones y relaciones a endpoints del sistema
*/
Base = 
{
    WEB_IP_PUBLICA:'201.216.197.213',
    WEB_IP_PRIVADA:'200.200.1.33',
    WEB_IP_LOCAL:'201.216.197.213',
    HTTP:'http://',
    HTTPS:'https://',
    URLS: 
    [
        {
            login:'/login',
            envioerrores:'/envioerrores',
            registrousuario:'/registro',
            admin:'/usuarios'
        }
    ]
}