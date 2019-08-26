ControllerReadMenuDynamic = {
             createWS:function()
             {
                $.ajax({
                    type:"GET",
                    url:"/putWS"
                }).done(function(respuesta){
                        sessionStorage.setItem('data',respuesta);
                });
             },
             readWS:function()
             {
                 let valores = JSON.parse(sessionStorage.getItem('data'));
                 let menu = $('#menuprincipal');
                 let desplegable = valores.desplegable;
                 desplegable.forEach(function(elemento){
                    ClassCreateHtmlMenu.createTagLiSubMenu(menu,elemento.url,elemento.menu,elemento.menu,elemento.icon);
                        let arregloPestanas = elemento.pestanas;
                        arregloPestanas.forEach(function(ePes)
                        {
                                let id = ePes.nombre.toLowerCase();
                                let tagElement = $("#"+id);
                                let tabElement = $("#tab"+id);
                                tagElement.show(); 
                                ControllerReadMenuDynamic.switchReadTable(id,ePes.acciones);
                        });
                    
                 });

                ControllerReadMenuDynamic.reDrawTabs();

                 desplegable.forEach(function(elemento)
                 {
                        let arregloPestanas = elemento.pestanas;
                        let lastElement = arregloPestanas[arregloPestanas.length-1];
                        let lastId = lastElement.nombre.toLowerCase();
                        let tabLastElement = $("#tab"+lastId);
                        let tagLastElement = $("#"+lastId);
                        tagLastElement.addClass("active");
                        tabLastElement.addClass("fade in active");
                 });
                 
             },
             switchReadTable:function(idTable,arregloAcciones)
             {
                let alta = arregloAcciones[0].Alta;
                let baja = arregloAcciones[0].Baja;
                let modificaciones = arregloAcciones[0].Modificaciones;
                switch(idTable)
                {
                    case "usuarios":
                        {
                            ControllerGestionUsuarios.init('#tablausuarios',"/columnsusuarios","/pruebaJSON","#modalFormGeneral","usuarios",false,modificaciones,baja,alta,true);
                            break;
                        }
                    case "asociaciones":
                        {
                            ControllerGestionUsuarios.init('#tablaasociaciones',"/columnsasociaciones","/pruebaJSON","#modalFormGeneral","asociaciones",false,true,true,true,true);
                            break;
                        }
                    case "perfiles":
                        {
                            ControllerGestionUsuarios.init('#tablaperfiles',"/columnsperfiles","/pruebaJSON","#modalFormGeneral","perfiles",true,true,true,true,true);
                            break;
                        }
                    case "roles":
                        {
                            ControllerGestionUsuarios.init('#tablaroles',"/columnsroles","/pruebaJSON","#modalFormGeneral","roles",true,true,true,true,true);
                            break;
                        }
                    case "menu":
                        {
                            ControllerGestionUsuarios.init('#tablamenu','/columnsmenu','/pruebaJSON','#modalFormGeneral','menu',false,true,true,true,true);
                            break;
                        }
                }
             },

             reDrawTabs:function()
             {
                $(document).click(function(ev)
                {
                    ev.preventDefault();
                    let objetivo = $(ev.target).context.id;
                    let valores = JSON.parse(sessionStorage.getItem('data'));
                    let desplegable = valores.desplegable;
                    desplegable.forEach(function(elemento)
                    {
                        
                        let menu = elemento.menu;
                        if(menu == objetivo)
                        {
                            ControllerReadMenuDynamic.clearTabs();
                            let arregloPestanas = elemento.pestanas;
                            arregloPestanas.forEach(function(ePes)
                            {
                                    let id = ePes.nombre.toLowerCase();
                                    let tagElement = $("#"+id);
                                    let table = $("#table"+id);
                                    console.info(table.footable);
                                    tagElement.show();
                                    ControllerReadMenuDynamic.switchReadTable(id,ePes.acciones);
                            }); 
                        }
                    });
                });
             },
             clearTabs:function()
             {
                let valores = JSON.parse(sessionStorage.getItem('data'));
                let desplegable = valores.desplegable;
                desplegable.forEach(function(elemento)
                {
                    let arregloPestanas = elemento.pestanas;
                    arregloPestanas.forEach(function(ePes)
                        {
                                let id = ePes.nombre.toLowerCase();
                                let tagElement = $("#"+id);
                                let table = $("#table"+id);
                                tagElement.hide();
                                table.hide();
                        });
                });
             }
}