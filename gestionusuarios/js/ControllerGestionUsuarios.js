/** 
    * @author Juan Ortiz
    * @category Class ControllerGestionUsuarios
    * @version 0.1
    * @link: none
*/
ControllerGestionUsuarios =     
{
    footAble:null,
    /**
     * @function init
     * @param {String} tablahtml 
     * @param {String} $urlColums 
     * @param {String} $urlRows 
     * @param {String} modalModify 
     * @param {String} nombreTabla 
     * @param {Boolean} enableView 
     * @param {Boolean} enableEdit 
     * @param {Boolean} enableDelete 
     * @param {Boolean} enableAdd 
     * @param {Boolean} enableFilter 
     */
    init:function(tablahtml,$urlColums,$urlRows,modalModify,nombreTabla,enableView,enableEdit,enableDelete,enableAdd,enableFilter,ROW){
        jQuery(function($)
        {
            var $urlregistro = Base.HTTP + Base.WEB_IP_LOCAL + Base.URLS[0].registrousuario;
            let modal = $(modalModify);
            let modalDanger = $(dangerModal);
            let accionAceptarDelete = $('#aceptar_eliminacion');
            let accionCancelarDelete =$('#cancelar_eliminacion');
            let titulo = $('#titleModal');
            if(ROW)
            {
                row=ROW;
            }
            else 
            {
                row = {};
            }
            let dataInfo =  ControllerGestionUsuarios.jsonDataFunc(row,"LIST",nombreTabla);
            var ft = FooTable.init(tablahtml,{
                "columns":$.ajax(
                    {
                        type:"GET",
                        dataType:"json",
                        url:$urlColums
                    }
                ),
                "rows":$.ajax(
                    {
                        type:"GET",
                        dataType:"json",
                        data:{data: JSON.stringify(dataInfo)},
                        url:$urlRows
                    }
                ),
                "filtering":
                {
                    "enabled":enableFilter,
                    "delay":100,
                    "dropdownTitle":"Buscar en...",
                    "placeholder":"Buscar..."
                },
                paging:
                {
                    enabled:true,
                    size:5
                },
                sorting: 
                {
                    enabled:true
                },
                editing:
                {
                    enabled:true,
                    allowView:enableView,
                    allowAdd:enableAdd,
                    allowEdit:enableEdit,
                    allowDelete:enableDelete,
                    alwaysShow:true,
                    addText:"<i class='fa fa-plus-circle' aria-hidden='true'></i> Agregar",
                    editText:"<i class='fa fa-arrow-up'></i>",
                    deleteText:"<i class='fa fa-thumbs-down'></i>",
                    viewText:"<i class='fa fa-edit'></i>",
                    addRow:function()
                    {
                        let values = "";
                        ControllerGestionUsuarios.mostrarModalForTable(nombreTabla,"add",values,ft,row);
                    },
                    editRow:function(row)
                    {
                        let values = row.val();
                        ControllerGestionUsuarios.mostrarModalForTable(nombreTabla,"edit",values,ft,row);
                    },
                    deleteRow:function(row)
                    {
                        let values = row.val(); 
                        delete values["editing"];
                        let dataInfo = ControllerGestionUsuarios.jsonDataFunc(values,"DEL",nombreTabla);
                        $.ajax({
                            type:"GET",
                            dataType:"json",
                            data:{data: JSON.stringify(dataInfo)},
                            url:"/pruebaJSON"
                        }).done(function(rowsRec){
                            let thisrows = [];
                            ft.rows.load(rowsRec);
                            ControllerGestionUsuarios.changeButton(row);
                        });
                        
                    },
                    viewRow:function(row)
                    {
                        let values = row.val();
                        ControllerGestionUsuarios.mostrarModalForTable(nombreTabla,"view",values,ft,row);
                    }
        
                },
                'on':
                {
                    'postinit.ft.table':function(e,ft)
                    {
                         let data = ft;
                       $.each(ft.rows.all,function(id)
                       {
                            let allRows = ft.rows.all;
                            let values = allRows[id].value; 
                            let arrayButton = allRows[id].cells;
                            let tamano = arrayButton.length-1;
                            let objTag = arrayButton[tamano];
                            let tamanoChild = objTag.value[0].childNodes.length-1;
                            let button = objTag.value[0].childNodes[tamanoChild];
                            tagElement = $(button);
                            if(values.estado == "false")
                            {
                                  
                                allRows[id].classes.push("bg-white");
                                tagElement.removeClass('btn btn-danger footable-delete');
                                tagElement.addClass('btn btn-info footable-delete');
                                tagElement.children().removeClass('fa fa-thumbs-down');
                                tagElement.children().addClass('fa fa-thumbs-up');      
                            }
                            
                          
                       });
                       
                    },

                    'predraw.ft.table':function(e,ft)
                    {
                        $.each(ft.rows.all,function(id)
                       {
                            let allRows = ft.rows.all;
                            let values = allRows[id].value; 
                            let arrayButton = allRows[id].cells;
                            let tamano = arrayButton.length-1;
                            let objTag = arrayButton[tamano];
                            let tamanoChild = objTag.value[0].childNodes.length-1;
                            let button = objTag.value[0].childNodes[tamanoChild];
                            tagElement = $(button);
                            if(values.estado == "false")
                            {
                                
                                allRows[id].classes.push("bg-white");
                                tagElement.removeClass('btn btn-danger footable-delete');
                                tagElement.addClass('btn btn-info footable-delete');
                                tagElement.children().removeClass('fa fa-thumbs-down');
                                tagElement.children().addClass('fa fa-thumbs-up');
                            }
                        });


                    }
                }
            });
            
        });
    },

    /**
     * 
     * @param {Int8Array} modalview 
     * @param {*} formulario 
     * @param {*} tiposeleccion 
     * @param {*} tituloForm 
     * @param {*} valores 
     */
    mostrarModalForTable:function(tabla,tipoVista,valoresFilas,FT,ROW)
    {

        switch(tabla)
        {
            case "asociaciones": 
            {
                ClassCreateForms.createFormAsociaciones(tipoVista,valoresFilas,FT,ROW);
                break;
            }
            case "roles":
            {
                ClassCreateForms.createFormRoles(tipoVista,valoresFilas,FT,ROW);
                break;
            }
            case "perfiles":
            {
                ClassCreateForms.createFormPerfiles(tipoVista,valoresFilas,FT,ROW);
                break;
            }
            case "usuarios":
            {
                ClassCreateForms.createFormUsuarios(tipoVista,valoresFilas,FT,ROW);
                break;
            }
            case "grupos_x_roles":
                {
                    ClassCreateForms.createFormPerfilesRoles(tipoVista,valoresFilas,FT,ROW);
                    break;
                }
            case "roles_asociaciones":
                {
                    ClassCreateForms.createFormRolesAsociaciones(tipoVista,valoresFilas,FT,ROW);
                    console.info("roles_x_asociaciones");
                    break;
                }
            case "menu":
                {
                    ClassCreateForms.createFormMenu(tipoVista,valoresFilas,FT,ROW);
                    break;
                }

        }
        
    },
    out:function(){
        var $urllocal = Base.HTTP + Base.WEB_IP_LOCAL;
        let salir = $("#salir");
        salir.click(function(){
            $(location).attr('href', $urllocal);
        });
    },
    jsonDataFunc: function(thisrow,operacion,tableName)
    {
        let acciones = {
            "LIST":"",
            "UPD":"",
            "DEL":"",
            "ADD":""
        };

        switch(tableName)
        {
            case "asociaciones":
                {
                    acciones["LIST"] = "entidades_x_acciones_view";
                    resultrow = {};
                    resultrow.modo = operacion;
                    resultrow.id = thisrow.id;
                    resultrow.id_entidad = thisrow.id_entidad;
                    resultrow.descraccion = thisrow.id_acciones;
                    resultrow.descripcion = thisrow.descripcion;
                    acciones["UPD"] = "entidades_x_acciones_abm";
                    acciones["DEL"] = "entidades_x_acciones_abm";
                    acciones["ADD"] = "entidades_x_acciones_abm";
                    break;
                }
            case "roles":
                {
                    acciones["LIST"] = "roles_view";
                    resultrow = {};
                    resultrow.modo = operacion;
                    resultrow.id = thisrow.id;
                    resultrow.descripcion = thisrow.descripcion;
                    acciones["UPD"] = "roles_abm";
                    acciones["DEL"] = "roles_abm";
                    acciones["ADD"] = "roles_abm";
                    break;
                }
            case "roles_asociaciones": 
                {
                    rolid = thisrow.id
                    acciones["LIST"] = "roles_asociaciones";
                    resultrow = {};
                    resultrow.modo = operacion;
                    resultrow.id = thisrow.id;
                    resultrow.id_entidades =  thisrow.entxacciones_id;
                    resultrow.rol_id = thisrow.rol_id;
                    console.info(resultrow);    
                    acciones["UPD"] = "roles_asociaciones_abm";
                    acciones["ADD"] = "roles_asociaciones_abm";
                    acciones["DEL"] = "roles_asociaciones_abm"; 
                    break;
                }
            case "grupos_x_roles": 
                {
                    rolid = thisrow.id
                    acciones["LIST"] = "grupos_x_roles";
                    resultrow = {};
                    resultrow.modo = operacion;
                    resultrow.id = thisrow.id;
                    resultrow.id_grupo = thisrow.id_grupo;
                    resultrow.id_rol = thisrow.id_rol;
                    resultrow.descripcion = thisrow.descripcion;
                    acciones["UPD"] = "grupos_x_roles_abm";
                    acciones["DEL"] = "grupos_x_roles_abm";
                    acciones["ADD"] = "grupos_x_roles_abm";
                    break;
                }
            case "perfiles":
                {
                    rolid = thisrow.id
                    acciones["LIST"] = "grupos_view";
                    resultrow = {};
                    resultrow.modo = operacion;
                    resultrow.id = thisrow.id;
                    resultrow.descripcion = thisrow.descripcion;
                    acciones["DEL"] = "grupos_abm";
                    break;
                }
            case "usuarios":
                {
                    rolid = thisrow.id
                    acciones["LIST"] = "usuarios_view";
                    resultrow = {};
                    resultrow.modo = operacion;
                    resultrow.id = thisrow.id;
                    resultrow.mail = thisrow.mail;
                    resultrow.nombre = thisrow.nombre;
                    resultrow.apellido = thisrow.apellido;
                    resultrow.cuil = thisrow.cuil;
                    resultrow.grupo_id = thisrow.grupo_id;
                    resultrow.user = thisrow.login;
                    acciones["UPD"] = "usuarios_abm";
                    acciones["DEL"] = "usuarios_abm";
                    acciones["ADD"] = "usuarios_abm";
                    break;
                }
                case "menu":
                {
                    rolid = thisrow.id
                    acciones["LIST"] = "mnu_view";
                    resultrow = {};
                    resultrow.modo = operacion;
                    resultrow.id = thisrow.id_tablapadre;
                    resultrow.id_entidades = thisrow.id_tablahijo;
                    resultrow.tituloMenu = thisrow.desc_tablapadre;
                    acciones["DEL"] = "mnu_abm";
                    break;
                }
        }
        let datos = {};
        datos.tabla = acciones[operacion];
        datos.operacion = operacion;
        datos.data = {};
        
        switch(operacion)
        {
            case "DEL":
                {
                    datos.data = resultrow;
                    break;
                }
            case "LIST": 
                {
                    if(thisrow.id)
                    {
                        datos.data.id = thisrow.id;
                    }
                    break;
                }
            case "UPD":
                {
                    datos.data.modo = operacion;
                    datos.data = thisrow;
                    break;
                }
        }
        return datos;
    },
    changeButton:function(row)
    {
        let posRow = row.cells.length-1
        let infor = $(row.cells[posRow].$el[0].childNodes[0].childNodes[2]);
        if (infor.hasClass('btn btn-danger footable-delete'))
        {
            infor.removeClass('btn btn-danger footable-delete');
            infor.addClass('btn btn-info footable-delete');
            row.$el.addClass('bg-white');
            infor.children().removeClass('fa fa-thumbs-down');
            infor.children().addClass('fa fa-thumbs-up');
        }
        else 
        {
            infor.removeClass('btn btn-info footable-delete');
            infor.addClass('btn btn-danger footable-delete');
            row.$el.removeClass('bg-white');
            infor.children().removeClass('fa fa-thumbs-up');
            infor.children().addClass('fa fa-thumbs-down');
        }
    }
    
}