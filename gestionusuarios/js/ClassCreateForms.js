/** 
    * @author Juan Ortiz
    * @category Class ControllerGestionUsuarios
    * @version 0.1
    * 
    * Clase para la creacion de los formularios de presentacion en forma dinamica.
    * 
    * 
*/
ClassCreateForms = 
{
    layout:
    {
        users:
        {
            modal:'#modalUsuarios',
		    title:'#titleModalUsuarios',
		    envelop:'#divFormEnvelopUsuarios',
		    form:'#formDatosDinamicosUsuarios',
		    footer:'#footerIdUsuarios',
            table:'#idTable',
            buttonSave:'#guardar',
            buttonClose:'#cerrar_enviar_error_usuarios',
            divForForm:"#claseDivUsuarios"
        },
        roles:
        {

        }
    },
    jqueryObjects:
    {
        users:
        {
            modal: null,
            form: null,
            footer: null,
            title: null,
            options:null
        }
    },
    membersObj:
    {
        formObj:null,
        footerObj:null,
    },

    //arrays
    opcionesAcciones:
    {
        texto:["Alta","Baja","Modificaciones","Exportar","Imprimir","Visualizar"],
        valores:["Alta","Baja","Modificaciones","Exportar","Imprimir","Visualizar"]
    },

    opcionesRoles:
    {
        textos:["Administracion de usuarios","Administracion de roles","Administracion de perfiles","Administracion de entidades"],
        valores:["0","1","2","3"]
    },

    selectPerfiles:
    {
        perfiles:["Administrador","Camara","CRI","SSTA"],
        valores:["Administrador","Camara","CRI","SSTA"]
    },

    // fin arrays


    /**
     * 
     * @param {String} initFormID (ejemplo: "#identificador") 
     * @param {String} initDivID (ejemplo: "#identificador")
     * @param {String} initFooterID (ejemplo: "#identificador")
     */
    init:function(initFormID,initDivID,initFooterID)
    {

        this.membersObj.formObj = $(initFormID);
        this.membersObj.footerObj = $(initFooterID);
        this.membersObj.divObj = $(initDivID);
        this.membersObj.buttonObj = $("#cerrar_enviar_error");
        this.membersObj.titleObj = $("#titleModal");
        this.membersObj.titlePerfiles = $("#titleModalPerfiles");
        this.membersObj.titleRoles = $("#titleModalRoles");
        this.membersObj.modalObj = $("#modalFormGeneral");

        this.jqueryObjects.users.modal = $(ClassCreateForms.layout.users.modal);
        this.jqueryObjects.users.form =  $(this.layout.users.form);
        this.jqueryObjects.users.footer =  $(this.layout.users.footer);
        this.jqueryObjects.users.title = $(this.layout.users.title);
        this.jqueryObjects.users.options = $("#perfiles option");
        
    },
    /**
     * Formulario de Asociaciones
     * @param {*} mode 
     * @param {*} valores 
     * @param {*} ft 
     * @param {*} ROW 
     */
    createFormAsociaciones:function(mode,valores,ft,ROW)
    {
            let formObjJquery = this.membersObj.formObj;
            let divObjJquery = this.membersObj.divObj;
            this.membersObj.rowObj = ROW;
            this.init("#formDatosDinamicos","#divFormularioDinamico","#footerId");
            this.insertModalFormControlAsociaciones(mode,valores);
        /* Fin definicion estatica */
            let descr = this.membersObj.formObj.find("#descripcion");
            let entidad = this.membersObj.formObj.find("#entidad");
            let select = this.membersObj.formObj.find("#accionesSel");
            let check = this.membersObj.formObj.find("#checkTodos");

            if(mode != "add") 
                {
                    let opciones=$("option");
                    descr.val(valores.descripcion);
                    entidad.val(valores.entidad);
                    if(valores.acciones=="todas")
                        {
                            opciones.each(function(i)
                            {
                                opciones.prop('selected',true);
                            });
                            check.prop('checked',true);
                        }
                    else 
                        {
                            let arreglo = valores.acciones.split(",");
                            check.prop('checked',false);
                            for(j=0;j<opciones.length;j++)
                                {
                                    for(i=0;i<=arreglo.length-1;i++)
                                        {
                                            if(opciones[j].value==arreglo[i])
                                                {
                                                    opciones[j].selected=true;
                                                }
                                        }
                            
                                }
                        }
                }
            else 
                {
                }
            switch (mode)
                    {
                        case "view":
                            {
                                descr.val(valores.descripcion);
                                entidad.val(valores.entidad);
                                descr.prop('disabled',true);
                                entidad.prop('disabled',true);
                                select.prop('disabled',true);
                                check.prop('disabled',true); 
                                this.membersObj.titleObj.text("Ver registro de: "+valores.descripcion);
                                break;
                            }
                        case "edit":
                            {
                                descr.val(valores.descripcion);
                                entidad.val(valores.entidad);
                                this.membersObj.titleObj.text("Editar asociacion: "+valores.descripcion);
                                $("#guardar").click(function()
                                {   
                                    
                                    let these = ClassCreateForms;
                                    let dataInfo = {};
                                    dataInfo.tabla = "entidades_x_acciones_abm";
                                    dataInfo.operacion = "UPD";
                                    let valoresoption = these.membersObj.formObj.find("#accionesSel").val().toString();
                                    values =
                                    {   modo:"UPD",
                                        id: valores.id,
                                        id_entidad: valores.id_entidad,
                                        descraccion: valoresoption,
                                        descripcion: these.membersObj.formObj.find("#descripcion").val()
                                    }
                                    dataInfo.data = values;
                                    $.ajax({
                                        type:"GET",
                                        dataType:"json",
                                        data:{data: JSON.stringify(dataInfo)},
                                        url:"/pruebaJSON"
                                    }).done(function(rowsRec){
                                        ft.rows.load(rowsRec);
                                    });
                                });
                                break;
                            }
                        case "add":
                            {
                                descr.val("");
                                entidad.val("");
                                this.membersObj.titleObj.text("Agregar registro nuevo");  
                                $("#guardar").click(function()
                                {   
                                    
                                    let these = ClassCreateForms;
                                    let dataInfo = {};
                                    dataInfo.tabla = "entidades_x_acciones_abm";
                                    dataInfo.operacion = "INS";
                                    let valoresoption = these.membersObj.formObj.find("#accionesSel").val().toString();
                                    values = 
                                    {  
                                        modo:"INS",
                                        id:0,
                                        id_entidad: these.membersObj.formObj.find("#entidad").val(),
                                        descraccion: valoresoption,
                                        descripcion: these.membersObj.formObj.find("#descripcion").val()
                                    }
                                    dataInfo.data = values;
                                    $.ajax({
                                        type:"GET",
                                        dataType:"json",
                                        data:{data: JSON.stringify(dataInfo)},
                                        url:"/pruebaJSON"
                                    }).done(function(rowsRec){
                                        ft.rows.load(rowsRec);
                                    });
                                });
                                break;
                            }
                    }
        this.membersObj.modalObj.modal({backdrop:'static',keyboard:false});
        this.membersObj.modalObj.modal("show");
    },

    insertModalFormControlAsociaciones:function(mode,valores)
    {
        let divObj = $("#claseDiv");
        let buttonCerrar = $("#cerrar_enviar_error");
        let buttonSave = $("#guardar");
        let id_entidad = valores.id_entidad;
        divObj.remove();
        buttonCerrar.remove();
        buttonSave.remove();
        let formElementObj = $("#formDatosDinamicos");
        let divElementAdd = ClassFormInputs.createElementDom("div","claseDiv","form-control");
        if(mode == "edit")
        {
            formElementObj.append(divElementAdd).promise().done(function()
            {
                let divObj = $("#claseDiv");
                let obj = ClassCreateForms;
                let arregloOpciones = obj.opcionesAcciones.texto;
                let arregloValoresOpciones = obj.opcionesAcciones.valores;
                let footer = obj.membersObj.footerObj;
                ClassFormInputs.inputFormHTML("Descripcion","text-info","descripcion",divObj);
                ClassFormInputs.inputFormHTMLOptionOneRecord("Entidad","text-info","entidad", divObj,"entidades_view",id_entidad);
                ClassFormInputs.inputFormHTMLMultiselect("Acciones","text-info","accionesSel",divObj,arregloOpciones,arregloValoresOpciones); 
                ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error','fa fa-window-close','Cerrar', footer);
                ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
            });    
        }
        if(mode =="add") {

            formElementObj.append(divElementAdd).promise().done(function()
                {
                    let divObj = $("#claseDiv");
                    let obj = ClassCreateForms;
                    let arregloOpciones = obj.opcionesAcciones.texto;
                    let arregloValoresOpciones = obj.opcionesAcciones.valores;
                    let footer = obj.membersObj.footerObj;
                    ClassFormInputs.inputFormHTML("Descripcion","text-info","descripcion",divObj);
                    ClassFormInputs.inputFormHTMLOption("Entidad","text-info","entidad", divObj,"entidades_view");
                    ClassFormInputs.inputFormHTMLMultiselect("Acciones","text-info","accionesSel",divObj,arregloOpciones,arregloValoresOpciones); 
                    ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error','fa fa-window-close','Cerrar', footer);
                    ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                });
        }
        
    },

    /**
     * Formulario de Roles
     * @param {*} mode 
     * @param {*} valores 
     * @param {*} ft 
     * @param {*} ROW 
     */
    createFormRoles:function(mode,valores,ft,ROW)
    {
        this.init("#formDatosDinamicosRoles","#divFormularioDinamicoRoles","#footerIdRoles");
        this.insertModalFormControlRoles(mode,valores);
        let descr = this.membersObj.formObj.find("#descripcion");
        this.membersObj.rowObj = ROW;
        
        switch(mode)
        {
            case "add": 
            {
                this.membersObj.titleRoles.text("Agregar registro nuevo");
                $("#guardar").click(function()
                {   
                                    let these = ClassCreateForms;
                                    dataInfo = {}
                                    dataInfo.tabla = "roles_abm";
                                    dataInfo.operacion = "INS";
                                    values =
                                    {   modo:"INS",
                                        id:0,
                                        descripcion: these.membersObj.formObj.find("#descripcion").val()
                                    }
                                    dataInfo.data = values;
                                    $.ajax({
                                        type:"GET",
                                        dataType:"json",
                                        data:{data: JSON.stringify(dataInfo)},
                                        url:"/pruebaJSON"
                                    }).done(function(rowsRec){
                                        ft.rows.load(rowsRec);
                                    });
                                });
                break;
            }
            case "edit":
                {
                    this.membersObj.titleRoles.text("Entidades para el rol: "+valores.descripcion);
                    break;
                }
            case "view":
                {
                    this.membersObj.titleRoles.text("Modificar rol");
                    descr.val(valores.descripcion);
                    $("#guardar").click(function()
                                {   
                                    let these = ClassCreateForms;
                                    dataInfo = {}
                                    dataInfo.tabla = "roles_abm";
                                    dataInfo.operacion = "UPD";
                                    values =
                                    {   modo:"UPD",
                                        id: valores.id,
                                        descripcion: these.membersObj.formObj.find("#descripcion").val()
                                    }
                                    dataInfo.data = values;
                                    $.ajax({
                                        type:"GET",
                                        dataType:"json",
                                        data:{data: JSON.stringify(dataInfo)},
                                        url:"/pruebaJSON"
                                    }).done(function(rowsRec){
                                        ft.rows.load(rowsRec);
                                    });
                                });
                    break;
                }
        }
        $('#modalRoles').modal({backdrop:'static',keyboard:false});
        $('#modalRoles').modal("show");
    },

    insertModalFormControlRoles:function(mode,valores)
    {
        let divObj = $("#claseDivRoles");
        let buttonCerrar = $("#cerrar_enviar_error_roles");
        let buttonSave = $("#guardar");
        divObj.remove();
        buttonCerrar.remove();
        buttonSave.remove();
        let formElementObj = $("#formDatosDinamicosRoles");
        let divElementAdd = ClassFormInputs.createElementDom("div","claseDivRoles","form-control");
        let obj = ClassCreateForms;
        let footer = obj.membersObj.footerObj;
        switch(mode)
        {
            case "add":
                {
                    
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $("#claseDivRoles");
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_roles','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                        ClassFormInputs.inputFormHTML("Descripcion","text-info","descripcion",divObj);
                    });
                    break;
                }
            case "edit":
                {
                    let footerIdRoles = $("#footerIdRoles");
                    let divElementTable = ClassFormInputs.createElementDom("table","subtableRoles","");
                    divElementTable.className = "table table-striped";
                    divElementAdd.appendChild(divElementTable);
                    formElementObj.append(divElementAdd);
                    ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_roles','fa fa-window-close','Cerrar', footerIdRoles);
                    ControllerGestionUsuarios.init('#subtableRoles',"/columnsrolesentidades","/pruebaJSON","#modalRoles","roles_asociaciones",false,false,true,true,false,valores);
                    break;
                }
            case "view":
                {
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $("#claseDivRoles");
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_roles','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                        ClassFormInputs.inputFormHTML("Descripcion","text-info","descripcion",divObj);
                    });
                    break;
                }
        }
    },


    
    createFormPerfiles:function(mode,valores,ft,ROW)
    {
        this.init("#formDatosDinamicosPerfiles","#divFormularioDinamicoPerfiles","#footerIdPerfiles");
        this.insertModalFormControlPerfiles(mode,valores);
        let descr = this.membersObj.formObj.find("#descripcion");
        this.membersObj.rowObj = ROW;
        switch(mode)
        {
            case "add": 
            {
                this.membersObj.titlePerfiles.text("Agregar registro nuevo");
                $("#guardar").click(function()
                                {   
                                    
                                    let these = ClassCreateForms;
                                    dataInfo = {}
                                    dataInfo.tabla = "grupos_abm";
                                    dataInfo.operacion = "INS";
                                    values =
                                    {   modo:"INS",
                                        id:0,
                                        descripcion: these.membersObj.formObj.find("#descripcion").val()
                                    }
                                    dataInfo.data = values;
                                    $.ajax({
                                        type:"GET",
                                        dataType:"json",
                                        data:{data: JSON.stringify(dataInfo)},
                                        url:"/pruebaJSON"
                                    }).done(function(rowsRec){
                                        ft.rows.load(rowsRec);
                                    });
                                });
                                break;
            }
            case "edit":{
                this.membersObj.titlePerfiles.text("Roles para el perfil: "+valores.descripcion);
                break;
            }
            case "view":
                {
                    
                    this.membersObj.titleRoles.text("Modificar perfil");
                    descr.val(valores.descripcion);
                    $("#guardar").click(function()
                                {   
                                    let these = ClassCreateForms;
                                    dataInfo = {}
                                    dataInfo.tabla = "grupos_abm";
                                    dataInfo.operacion = "UPD";
                                    values =
                                    {   modo:"UPD",
                                        id: valores.id,
                                        descripcion: these.membersObj.formObj.find("#descripcion").val()
                                    }
                                    dataInfo.data = values;
                                    $.ajax({
                                        type:"GET",
                                        dataType:"json",
                                        data:{data: JSON.stringify(dataInfo)},
                                        url:"/pruebaJSON"
                                    }).done(function(rowsRec){
                                        ft.rows.load(rowsRec);
                                    });
                                });
                    break;
                }
        }
        $('#modalPerfiles').modal({backdrop:'static',keyboard:false});
        $('#modalPerfiles').modal("show");
    },

    insertModalFormControlPerfiles:function(mode,valores)
    {
        let divObj = $("#claseDivPerfiles");
        let buttonCerrar = $("#cerrar_enviar_error_perfiles");
        let buttonSave = $("#guardar");
        divObj.remove();
        buttonCerrar.remove();
        buttonSave.remove();
        let formElementObj = $("#formDatosDinamicosPerfiles");
        let divElementAdd = ClassFormInputs.createElementDom("div","claseDivPerfiles","form-control");
        let obj = ClassCreateForms;
        let footer = obj.membersObj.footerObj;
        switch(mode)
        {
            case "add":
                {
                    
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $("#claseDivPerfiles");
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_perfiles','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                        ClassFormInputs.inputFormHTML("Descripcion","text-info","descripcion",divObj);
                    });
                    break;
                }
            case "edit":
                {
                    let footerIdPerfiles = $("#footerIdPerfiles");
                    let divElementTable = ClassFormInputs.createElementDom("table","subtablePerfiles","");
                    divElementTable.className = "table table-striped";
                    divElementAdd.appendChild(divElementTable);
                    formElementObj.append(divElementAdd);
                    ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_perfiles','fa fa-window-close','Cerrar', footerIdPerfiles);
                    ControllerGestionUsuarios.init('#subtablePerfiles',"/columnsperfilesroles","/pruebaJSON","#modalPerfiles","grupos_x_roles",false,false,true,true,false,valores);
                    break;
                }
            case "view":
                    {
                        formElementObj.append(divElementAdd).promise().done(function()
                        {
                            let divObj = $("#claseDivPerfiles");
                            ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_perfiles','fa fa-window-close','Cerrar', footer);
                            ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                            ClassFormInputs.inputFormHTML("Descripcion","text-info","descripcion",divObj);
                        });
                        break;
                    }
        }
    },

    createFormUsuarios:function(mode,valores,ft,ROW)
    {   
        this.init("#formDatosDinamicosUsuarios","#divFormularioDinamicoUsuarios","#footerIdUsuarios");
        this.insertModalFormControlUsuarios(mode);
        let nombre = this.jqueryObjects.users.form.find("#nombres");
        let apellido = this.jqueryObjects.users.form.find("#apellido");
        let mail  = this.jqueryObjects.users.form.find("#email");
        let cuit = this.jqueryObjects.users.form.find("#cuit");
        let login = this.jqueryObjects.users.form.find("#login");
        let perfil = this.jqueryObjects.users.form.find("#perfiles"); 
        let opcionesUser = this.jqueryObjects.users.options;
        this.membersObj.rowObj = ROW;
        switch (mode)
                {
                    case "edit":
                        {
                            opcionesUser.each(function(i)
                                {
                                    console.info(opcionesUser.attr('value'));
                                    if(valores.perfil == opcionesUser.attr('value'))
                                        {
                                            opcionesUser.prop("selected",true);
                                        }
                                });
                            nombre.val(valores.nombre);                            
                            apellido.val(valores.apellido);
                            mail.val(valores.mail);
                            cuit.val(valores.cuil);
                            login.val(valores.login);
                            this.jqueryObjects.users.title.text("Editar registro de: "+valores.nombre);
                            $("#guardar").click(function()
                                {   
                                        let these = ClassCreateForms;
                                    dataInfo = {}
                                    dataInfo.tabla = "usuarios_abm";
                                    dataInfo.operacion = "UPD";
                                    values =
                                    {   modo:"UPD",
                                        id:valores.id,
                                        mail:these.membersObj.formObj.find("#email").val(),
                                        nombre:these.membersObj.formObj.find("#nombres").val(),
                                        apellido:these.membersObj.formObj.find("#apellido").val(),
                                        cuil:parseInt(these.membersObj.formObj.find("#cuit").val()),
                                        grupo_id:parseInt(these.membersObj.formObj.find("#perfil").val()),
                                        user:these.membersObj.formObj.find("#login").val()
                                    }
                                    dataInfo.data = values;
                                    $.ajax({
                                        type:"GET",
                                        dataType:"json",
                                        data:{data: JSON.stringify(dataInfo)},
                                        url:"/pruebaJSON"
                                    }).done(function(rowsRec){
                                        ft.rows.load(rowsRec);
                                    });
                                });
                                break;
                        }
                    case "add":
                        {

                            this.jqueryObjects.users.title.text("Agregar nuevo registro usuario");
                            boton = document.getElementById('guardar');
                            boton.disabled=true;
                            $("#guardar").click(function(event)
                            {   
                                console.info(event);
                                
                                let these = ClassCreateForms;
                                let divObj = these.layout.users.divForForm;
                                //these.validateFormUsuario(divObj);
                                dataInfo = {}
                                dataInfo.tabla = "usuarios_abm";
                                dataInfo.operacion = "INS";
                                values =
                                {   modo:"INS",
                                    id:0,
                                    mail:these.membersObj.formObj.find("#email").val(),
                                    nombre:these.membersObj.formObj.find("#nombres").val(),
                                    apellido:these.membersObj.formObj.find("#apellido").val(),
                                    cuil:parseInt(these.membersObj.formObj.find("#cuit").val()),
                                    grupo_id:parseInt(these.membersObj.formObj.find("#perfil").val()),
                                    user:these.membersObj.formObj.find("#login").val()
                                }
                                dataInfo.data = values;
                                $.ajax({
                                    type:"GET",
                                    dataType:"json",
                                    data:{data: JSON.stringify(dataInfo)},
                                    url:"/pruebaJSON"
                                }).done(function(rowsRec){
                                    ft.rows.load(rowsRec);
                                });
                            });
                            break;
                        }
                }

    this.jqueryObjects.users.modal.modal({backdrop:'static',keyboard:false});
    this.jqueryObjects.users.modal.modal("show");
    },
    insertModalFormControlUsuarios:function(mode)
    {
        let obj = ClassCreateForms;
        let divObj = $(obj.layout.users.divForForm);
        let buttonSave = $(obj.layout.users.buttonSave);
        let buttonClose = $(obj.layout.users.buttonClose);
        divObj.remove();
        buttonClose.remove();
        buttonSave.remove();
        let formElementObj = $(obj.layout.users.form);
        let divElementAdd = ClassFormInputs.createElementDom("div","claseDivUsuarios","form-control");
        
        let footer = $(obj.layout.users.footer);
        switch(mode)
        {
            case "add":
                {
                    
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $(obj.layout.users.divForForm);
                        
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_usuarios','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                        ClassFormInputs.inputFormHTMLRequired("Nombres","text-info","nombres",divObj);
                        ClassFormInputs.inputFormHTMLRequired("Apellido","text-info","apellido",divObj);
                        ClassFormInputs.inputFormHTMLRequired("Usuario","text-info","login",divObj);
                        ClassFormInputs.inputFormHTMLmail("Email","text-info","email",divObj);
                        ClassFormInputs.inputFormHTMLCUIT("CUIT","text-info","cuit",divObj);
                        ClassFormInputs.inputFormHTMLOption("Perfiles","text-info","perfil", divObj,"grupos_view");
                        ClassCreateForms.validateFormUsuario(divObj);
                    });
                    break;
                }
            case "edit":
                {
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $(obj.layout.users.divForForm);
                        
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_usuarios','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                        ClassFormInputs.inputFormHTMLRequired("Nombres","text-info","nombres",divObj);
                        ClassFormInputs.inputFormHTMLRequired("Apellido","text-info","apellido",divObj);
                        ClassFormInputs.inputFormHTMLRequired("Usuario","text-info","login",divObj);
                        ClassFormInputs.inputFormHTMLmail("Email","text-info","email",divObj);
                        ClassFormInputs.inputFormHTMLCUIT("CUIT","text-info","cuit",divObj);
                        ClassFormInputs.inputFormHTMLOption("Perfiles","text-info","perfil", divObj,"grupos_view");
                        ClassCreateForms.validateFormUsuario(divObj);
                    });
                    break;
                }
        }
    },

    createFormPerfilesRoles:function(mode,valores,ft,ROW)
    {
         if(ft.rows.all[0])
        {
            let datos = ft.rows.all[0].value;
        }
        this.init("#formDatosDinamicosPerfilesRoles","#divFormularioDinamicoPerfilesRoles","#footerIdPerfilesRoles");
        this.insertModalFormControlPerfilesRoles(mode,valores);
        let descr = this.membersObj.formObj.find("#descripcion");
        this.membersObj.rowObj = ROW;
        switch(mode)
        {
            case "add": 
            {
                $("#titleModalPerfilesRoles").text("Agregar registro nuevo");
                $("#guardar").click(function()
                {   
                                    dataInfo = {}
                                    dataInfo.tabla = "grupos_x_roles_abm";
                                    dataInfo.operacion = "INS";
                                    let these = ClassCreateForms;
                                    values =
                                    {   modo:"INS",
                                        id:0,
                                        id_grupo:ROW.id,
                                        id_rol: parseInt(these.membersObj.formObj.find("#roles").val()),
                                        descripcion: "Nuevo registro"
                                    }
                                    dataInfo.data = values;
                                    $.ajax({
                                        type:"GET",
                                        dataType:"json",
                                        data:{data: JSON.stringify(dataInfo)},
                                        url:"/pruebaJSON"
                                    }).done(function(rowsRec){
                                        ft.rows.load(rowsRec);
                                    });
                                });
                break;
            }
            case "edit":
                {
                    $("#titleModalPerfilesRoles").text("Editar rol para: "+valores.descripcion);
                    $("#guardar").click(function()
                    {   console.info(valores);
                        let these = ClassCreateForms;
                        dataInfo = {}
                        dataInfo.tabla = "grupos_x_roles_abm";
                        dataInfo.operacion = "UPD";
                        values =
                        {   modo:"UPD",
                            id:valores.id,
                            id_grupo:valores.id_grupo,
                            id_rol: parseInt(these.membersObj.formObj.find("#roles").val()),
                            descripcion:"Registro Modificado"
                        }
                        dataInfo.data = values;
                        $.ajax({
                            type:"GET",
                            dataType:"json",
                            data:{data: JSON.stringify(dataInfo)},
                            url:"/pruebaJSON"
                        }).done(function(rowsRec){
                            ft.rows.load(rowsRec);
                        });
                    });
                    break;
                }
            case "view":
                {
                    $("#titleModalPerfilesRoles").text("Modificar rol");
                    descr.val(valores.descripcion);
                    $("#guardar").click(function()
                                {   
                                    let these = ClassCreateForms;
                                    dataInfo = {}
                                    dataInfo.tabla = "grupos_x_roles_abm";
                                    dataInfo.operacion = "UPD";
                                    values =
                                    {   modo:"UPD",
                                        id: valores.id,
                                        descripcion: these.membersObj.formObj.find("#descripcion").val()
                                    }
                                    dataInfo.data = values;
                                    $.ajax({
                                        type:"GET",
                                        dataType:"json",
                                        data:{data: JSON.stringify(dataInfo)},
                                        url:"/pruebaJSON"
                                    }).done(function(rowsRec){
                                        ft.rows.load(rowsRec);
                                    });
                                });
                    break;
                }
        }
        $('#modalPerfilesRoles').modal({backdrop:'static',keyboard:false});
        $('#modalPerfilesRoles').modal("show");
    },

    insertModalFormControlPerfilesRoles:function(mode,valores)
    {
        let divObj = $("#claseDivPerfilesRoles");
        let buttonCerrar = $("#cerrar_enviar_error_roles");
        let buttonSave = $("#guardar");
        divObj.remove();
        buttonCerrar.remove();
        buttonSave.remove();
        let formElementObj = $("#formDatosDinamicosPerfilesRoles");
        let divElementAdd = ClassFormInputs.createElementDom("div","claseDivPerfilesRoles","form-control");
        let obj = ClassCreateForms;
        let footer = obj.membersObj.footerObj;
        switch(mode)
        {
            case "add":
                {
                    
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $("#claseDivPerfilesRoles");
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_roles','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                        ClassFormInputs.inputFormHTMLOption("Descripcion Roles","text-info","roles",divObj,"roles_view");
                    });
                    break;
                }
            case "edit":
                {
                    
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $("#claseDivPerfilesRoles");
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_roles','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                        ClassFormInputs.elementInvisible("perfil",divObj);
                        $('#perfil').val(valores.id);
                        $('#descripcion').val(valores.descripcion);
                        ClassFormInputs.inputFormHTMLOption("Descripcion Roles","text-info","roles",divObj,"roles_view");
                    });
                    break;
                }
            case "view":
                {
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $("#claseDivPerfilesRoles");
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_roles','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                        ClassFormInputs.inputFormHTML("Descripcion","text-info","descripcion",divObj);
                    });
                    break;
                }
        }
    }, 
   
    createFormRolesAsociaciones:function(mode,valores,ft,ROW)
    {
        this.init("#formDatosDinamicosRolesAsociaciones","#divFormularioDinamicoRolesAsociaciones","#footerIdRolesAsociaciones");
        this.insertModalFormControlRolesAsociaciones(mode,valores);
        let descr = this.membersObj.formObj.find("#descripcion");
        this.membersObj.rowObj = ROW;
        switch(mode)
        {
            case "add": 
            {
                $("#titleModalRolesAsociaciones").text("Agregar registro nuevo");
                $("#guardar").click(function()
                {   
                                    dataInfo = {}
                                    dataInfo.tabla = "roles_asociaciones_abm";
                                    dataInfo.operacion = "INS";
                                    let these = ClassCreateForms;
                                    values =
                                    {   modo:"INS",
                                        id:0,
                                        id_entidades: parseInt(these.membersObj.formObj.find("#entidad").val()),
                                        rol_id:ROW.id
                                    }
                                    dataInfo.data = values;
                                    $.ajax({
                                        type:"GET",
                                        dataType:"json",
                                        data:{data: JSON.stringify(dataInfo)},
                                        url:"/pruebaJSON"
                                    }).done(function(rowsRec){
                                        ft.rows.load(rowsRec);
                                    });
                                });
                break;
            }
        }
        $('#modalRolesAsociaciones').modal({backdrop:'static',keyboard:false});
        $('#modalRolesAsociaciones').modal("show");
    },
    insertModalFormControlRolesAsociaciones:function(mode,valores)
    {
        let divObj = $("#claseDivRolesAsociaciones");
        let buttonCerrar = $("#cerrar_enviar_error_roles_asociaciones");
        let buttonSave = $("#guardar");
        divObj.remove();
        buttonCerrar.remove();
        buttonSave.remove();
        let formElementObj = $("#formDatosDinamicosRolesAsociaciones");
        let divElementAdd = ClassFormInputs.createElementDom("div","claseDivRolesAsociaciones","form-control");
        let obj = ClassCreateForms;
        let footer = obj.membersObj.footerObj;
        switch(mode)
        {
            case "add":
                {
                    
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $("#claseDivRolesAsociaciones");
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_enviar_error_roles_asociaciones','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                        ClassFormInputs.inputFormHTMLOption("Entidades para el Rol","text-info","entidad",divObj,"asociaciones_view");
                    });
                    break;
                }
        }
    },
    validateFormUsuario:function(form)
    {   

        let elementos = [];
        let textos = new RegExp('^[A-Z ]+$','i');
        let mail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        let cuit = new RegExp('^[0-9]{11}');
        let numeros = /[09]/;
        elementos.push(form.find('#nombres'));
        elementos.push(form.find('#apellido'));
        elementos.push(form.find('#login'));
        let email = form.find('#email');
        let cuitnumber = form.find('#cuit');
        boton = document.getElementById('guardar');
        elementos.forEach(function(e)
        {
            e.focusout(function()
            {
                if(!e.val())
                {
                    e.addClass('has-error');
                    boton.disabled = true;

                }
                else 
                {
                    if(textos.test(e.val()))
                    {
                        e.removeClass('has-error');
                        boton.disabled = false;
                    }
                    else 
                    {
                            e.addClass('has-error');
                            boton.disabled = true;
                    }
                }
            });
            e.focusin(function()
            {
                elementos.forEach(function(e)
                {
                    if(!e.val())
                    {
                        e.addClass('has-error');
                        boton.disabled = true;
                    }
                });
                e.keypress(function(elemento)
                {
                    if(!e.val())
                    {
                        e.addClass('has-error');
                        boton.disabled = true;
                    }
                    else 
                    {
                        e.removeClass('has-error');
                        boton.disabled = false;
                    }
                });
            });
        });

        email.focusin().keypress(function(elemento){
            if(email.val()=='')
            {
                email.addClass('has-error');
                boton.disabled = true;
            }
        });
        email.focusout(function(){
            if(email.val()!='' && mail.test(email.val()))
            {
                email.removeClass('has-error');
                boton.disabled = false;
            }
            else {
                email.addClass('has-error');
                boton.disabled = true;
            }
        });

        cuitnumber.focusin().keypress(function()
        {
            if(cuitnumber.val()==''){
                cuitnumber.addClass('has-error');
                boton.disabled = true;
                console.info(cuitnumber.val());
            }
            else {

            }
        });
        
        cuitnumber.focusout(function(){
            if(cuitnumber.val()!='' && cuit.test(cuitnumber.val()))
            {
                cuitnumber.removeClass('has-error');
                boton.disabled = false;
            }
            else {
                cuitnumber.addClass('has-error');
                boton.disabled = true;
            }
        })
    },

    createFormMenu:function(mode,valores,ft,ROW)
    {
        this.init("#formDatosDinamicosMenu","#divFormularioDinamicoMenu","#footerIdMenu");
        this.insertModalFormControlMenu(mode,valores);
        let descr = this.membersObj.formObj.find("#descripcion");
        this.membersObj.rowObj = ROW;
        switch(mode)
        {
            case "add": 
            {
                $("#titleModalMenu").text("Agregar menu nuevo");
                $("#guardar").click(function()
                {   
                                    let these = ClassCreateForms;
                                    let arregloInt = [];
                                    let arreglo = these.membersObj.formObj.find("#solapas").val();
                                    arreglo.forEach(function(elemento)
                                    {
                                        dataInfo = {}
                                        dataInfo.tabla = "mnu_abm";
                                        dataInfo.operacion = "INS";
                                        let these = ClassCreateForms;
                                        values =
                                        {   modo:"INS",
                                            id:0,
                                            tituloMenu:these.membersObj.formObj.find("#menu").val(),
                                            id_entidades:parseInt(elemento)
                                        }
                                        dataInfo.data = values;
                                        $.ajax({
                                            type:"GET",
                                            dataType:"json",
                                            data:{data: JSON.stringify(dataInfo)},
                                            traditional:true,
                                            url:"/pruebaJSON"
                                        }).done(function(rowsRec){
                                            ft.rows.load(rowsRec);
                                        });
                                    });
                                });
                break;
            }
            case "edit": 
            {
                $("#titleModalMenu").text("Editar registro");
                $("#guardar").click(function()
                {   
                    let these = ClassCreateForms;
                    let arregloInt = [];
                    let arreglo = these.membersObj.formObj.find("#solapas").val();
                        arreglo.forEach(function(elemento)
                        {
                            dataInfo = {}
                            dataInfo.tabla = "mnu_abm";
                            dataInfo.operacion = "UPD";
                            let these = ClassCreateForms;
                            values =
                            {   modo:"UPD",
                                id:valores.id_tablapadre,
                                tituloMenu:these.membersObj.formObj.find("#menu").val(),
                                id_entidades:parseInt(elemento)
                            }
                            dataInfo.data = values;
                            $.ajax({
                                type:"GET",
                                dataType:"json",
                                data:{data: JSON.stringify(dataInfo)},
                                url:"/pruebaJSON"
                            }).done(function(rowsRec){
                                ft.rows.load(rowsRec);
                            });
                        });

                                    
                    });
                break;
            }
        }
        $('#modalMenu').modal({backdrop:'static',keyboard:false});
        $('#modalMenu').modal("show");
    },
    insertModalFormControlMenu:function(mode,valores)
    {
        let divObj = $("#claseDivMenu");
        let buttonCerrar = $("#cerrar_menu");
        let buttonSave = $("#guardar");
        divObj.remove();
        buttonCerrar.remove();
        buttonSave.remove();
        let formElementObj = $("#formDatosDinamicosMenu");
        let divElementAdd = ClassFormInputs.createElementDom("div","claseDivMenu","form-control");
        let obj = ClassCreateForms;
        let footer = $("#footerIdMenu");
        switch(mode)
        {
            case "add":
                {
                    
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $("#claseDivMenu");
                        ClassFormInputs.inputFormHTML("Menu","text-info","menu",divObj,'fa fa-bars');
                        ClassFormInputs.inputFormHTML("Icon","text-info","icon",divObj,'fa fa-ice-cream');
                        ClassFormInputs.inputFormCheckBox("Default","text-info","default",divObj,'fa fas-check');
                        ClassFormInputs.inputFormHTMLMultiselectDynamic("Solapas","text-info","solapas",divObj,"entidades_view",'fa fa-folder');
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_menu','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                    });
                    break;
                }
            case "edit":
                {
                    
                    formElementObj.append(divElementAdd).promise().done(function()
                    {
                        let divObj = $("#claseDivMenu");
                        ClassFormInputs.inputFormHTML("Menu","text-info","menu",divObj,'fa fa-bars');
                        ClassFormInputs.inputFormHTML("Icon","text-info","icon",divObj,'fa fa-ice-cream');
                        ClassFormInputs.inputFormHTMLMultiselectDynamic("Solapas","text-info","solapas",divObj,"entidades_view",'fa fa-folder');
                        ClassFormInputs.buttonAdd('btn btn-primary','cerrar_menu','fa fa-window-close','Cerrar', footer);
                        ClassFormInputs.buttonAdd('btn btn-primary','guardar','fa fa-save','Guardar', footer);
                        obj.membersObj.formObj.find("#menu").val(valores.desc_tablapadre);
                    });
                    break;
                }
        }
    }
} 