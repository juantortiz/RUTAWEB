/** 
    * @author Juan Ortiz
    * @category Class ControllerGestionUsuarios
    * @version 0.1
    * 
    * Clase que crea en forma dinamica los componentes de los formularios.
    * 
    * 
*/
ClassFormInputs = 
{
    /**
     * 
     * @param {String} textLabel 
     * @param {String} classText 
     * @param {String} idInput 
     * @param {String} superClassId 
     */
    inputFormHTML: function(textLabel,classText,idInput,superClassId,faicon)
    {
        let strHTML = "<label><span class='"+classText+"'>"+textLabel+"</span></label><div class='input-group'><span class='input-group-addon text-info'><i class='"+faicon+"'></i></span><input id='"+idInput+"' class='form-control' type='text' maxlength='30' minlength='10'></div>";
        superClassId.append(strHTML);
    },
    inputFormHTMLRequired: function(textLabel,classText,idInput,superClassId,faicon)
    {
        let strHTML = "<label><span class='"+classText+"'>"+textLabel+"</span></label><div class='input-group'><span class='input-group-addon'><i class='"+faicon+"'></i></span><input id='"+idInput+"' data-toggle='tooltip' title='no puede estar en blanco' class='form-control' required='' type='text' maxlength='30' minlength='10'></div>";
        superClassId.append(strHTML);
    },

    inputFormHTMLCUIT: function(textLabel,classText,idInput,superClassId)
    {
        let strHTML = "<label><span class='"+classText+"'>"+textLabel+"</span></label><input id='"+idInput+"' required='' data-type='cuit' class='form-control' type='text' maxlength='11' minlength='11' placeholder='ingrese su CUIT/CUIL con el siguiente formato 88888888888'>";
        superClassId.append(strHTML);
    },

    inputFormHTMLmail: function(textLabel,classText,idInput,superClassId)
    {
        let strHTML = "<label><span class='"+classText+"'>"+textLabel+"</span></label><input type='email' id='"+idInput+"' required='' data-type='mail' class='form-control' type='text' maxlength='60' minlength='25' placeholder='formato de correo electronico: usuario@dominio.com'>";
        superClassId.append(strHTML);
    },
    inputPasswordFormHTML: function(textLabel,classText,idInput,superClassId)
    {
        let strHTML = "<label><span class='"+classText+"'>"+textLabel+"</span></label><input type='password' id='"+idInput+"' class='form-control' type='text' maxlength='30' minlength='10'>";
        superClassId.append(strHTML);
    },
    inputFormHTMLMultiselect:function(textLabel,classText,idSelect,superClassId,arrayOptions,arrayValues)
    {   
        let optStr ="";
        for(i=0;i<arrayOptions.length;i++)
        {
            optStr += "<option value='"+arrayValues[i]+"'>"+arrayOptions[i]+"</option>";
        }
        let strHTML="<label for='"+idSelect+"'><span class='"+classText+"'>"+textLabel+"</span></label><select multiple class='form-control' id='"+idSelect+"'>"+optStr+"</select>";
        superClassId.append(strHTML);
    },

    inputFormHTMLMultiselectDynamic:function(textLabel,classText,idSelect,superClassId,viewTable,faicon)
    {   
        let dataInfo={};
        dataInfo.tabla = viewTable;
        dataInfo.operacion="LIST";
        dataInfo.data={};
        $.ajax({
            type:"GET",
            dataType:"json",
            data:{data: JSON.stringify(dataInfo)},
            url:"/pruebaJSON"
        }).done(function(rowsRec){
            let optStr = ""
            rowsRec.forEach(function(elementTable)
            { 
                  optStr += "<option value='"+elementTable.entidad_id+"'>"+elementTable.entidaddescripcion+"</option>";
            });
          
            let strHTML="<label for='"+idSelect+"'><span class='"+classText+"'>"+textLabel+"</span></label><div class='input-group text-info'><span class='input-group-addon text-info'><i class='"+faicon+"'></i></span><select multiple class='form-control' id='"+idSelect+"'>"+optStr+"</select></div>";
            superClassId.append(strHTML);
            
          });
    },
    /**
     * 
     * @param {String} classButton 
     * @param {String} buttonID 
     * @param {String} classFaFa 
     * @param {String} textButton 
     * @param {String} superClassID 
     */
    buttonAdd:function(classButton,buttonID,classFaFa,textButton,superClassID)  
    {
        let strButton = "<button type='button' class='"+classButton+"' data-dismiss='modal' id='"+buttonID+"'><i class='"+classFaFa+"' aria-hidden='true'></i>&nbsp; &nbsp;"+textButton+"</button>";
        superClassID.append(strButton);
        
    },

    elementInvisible:function(idInput,superClassId)
    {
        let strHTML = "</label><input type=hidden id='"+idInput+"' class='form-control' type='text' maxlength='30' minlength='10'>";
        superClassId.append(strHTML);
    },
    inputFormHTMLOption:function(textLabel,classText,idSelect,superClassId,viewTable,faicon)
    {   
        let dataInfo={};
        dataInfo.tabla = viewTable;
        dataInfo.operacion="LIST";
        dataInfo.data={};
        $.ajax({
            type:"GET",
            dataType:"json",
            data:{data: JSON.stringify(dataInfo)},
            url:"/pruebaJSON"
        }).done(function(rowsRec){
          let optStr = ""
          rowsRec.forEach(function(elementTable)
          { 
            if(elementTable.entidad_id)
            {
                console.info(elementTable.estado);
                optStr += "<option value='"+elementTable.entidad_id+"'>"+elementTable.entidaddescripcion+"</option>";
            }
            else 
            {
                if (elementTable.estado==true)
                {
                    optStr += "<option value='"+elementTable.id+"'>"+elementTable.descripcion+"</option>";
                }
            }
            
          });
        
          let strHTML="<label for='"+idSelect+"'><span class='"+classText+"'>"+textLabel+"</span></label><div class='input-group'><span class='input-group-addon'><i class='"+faicon+"'></i></span><select class='form-control' id='"+idSelect+"'>"+optStr+"</select></div>";
          superClassId.append(strHTML);
          
        });
    },

    inputFormHTMLOptionOneRecord:function(textLabel,classText,idSelect,superClassId,viewTable,record){
        let dataInfo={};
        dataInfo.tabla = viewTable;
        dataInfo.operacion="LIST";
        dataInfo.data={};
        $.ajax({
            type:"GET",
            dataType:"json",
            data:{data: JSON.stringify(dataInfo)},
            url:"/pruebaJSON"
        }).done(function(rowsRec){
          let optStr = ""
          rowsRec.forEach(function(elementTable)
          { 
            if(elementTable.entidad_id)
            {
                if(elementTable.entidad_id ==  record)
                {
                    optStr += "<option value='"+elementTable.entidad_id+"' disabled selected>"+elementTable.entidaddescripcion+"</option>";
                }
                else {
                    optStr += "<option value='"+elementTable.entidad_id+"' disabled>"+elementTable.entidaddescripcion+"</option>";
                }
            }
            else 
            {
                optStr += "<option value='"+elementTable.id+"'>"+elementTable.descripcion+"</option>";
            }
            
          });
        
          let strHTML="<label for='"+idSelect+"'><span class='"+classText+"'>"+textLabel+"</span></label><select class='form-control' id='"+idSelect+"'>"+optStr+"</select>";
          superClassId.append(strHTML);
          
        });
    },
    createElementDom:function(elemento,id,clase)
    {
        let esteElemento = document.createElement(elemento)
        esteElemento.setAttribute('id',id);
        esteElemento.setAttribute('class',clase);
        return esteElemento;
    },
    inputFormHTMLWCheckbox: function(textLabel,classText,idInput,superClassId,faicon)
    {
        let strHTML = "<label><span class='"+classText+"'>"+textLabel+"</span></label><div class='input-group'><span class='input-group-addon text-info'><i class='"+faicon+"'></i></span><span class='input-group-addon'><input type='checkbox' id='check' check></span><input id='"+idInput+"' class='form-control' type='text' maxlength='30' minlength='10'></div>";
        superClassId.append(strHTML);
    }

}