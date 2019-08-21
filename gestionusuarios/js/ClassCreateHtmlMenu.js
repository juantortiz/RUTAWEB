ClassCreateHtmlMenu = {
        createTagLiSubMenu:function(ClassMenu,path,identificador,nombre,fa)
        {
            let strHTML= "<li><a href='"+path+"' id='"+identificador+"'><i class='"+fa+"' aria-hidden='true'></i>&#32;"+nombre+"</a></li>";
            ClassMenu.append(strHTML);
        }


}