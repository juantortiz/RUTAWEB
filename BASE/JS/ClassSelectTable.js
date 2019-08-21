/** 
    * @author Juan Ortiz
    * @category Class ClassSelectTable
    * @version 0.1
    * @link: none
    * 
    * Permite acceder en forma dinamica a las tablas del sistema. 
*/

ClassSelectTable = {
    find:function(tablename,jsonobject)
    {
        console.info('tablename: '+tablename);
        for (i=0; i<=jsonobject.length-1; i++){
            console.info(jsonobject[i].nameTable == tablename);
            if (jsonobject[i].nameTable == tablename)
            {
                console.info(jsonobject[i].objTable);
                return jsonobject[i].objTable;
                
            }
        }
    }
}