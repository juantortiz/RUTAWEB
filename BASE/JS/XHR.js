XHR = {
    NewXhrGET: function(url,funcCallBack)
    {   
        var returnData=null;
        var newUrl=null;
        try 
        {
            xhr = new XMLHttpRequest();
            xhr.open('GET',url,true);
            xhr.onreadystatechange =function()
            {
                if(xhr.readyState==4 && xhr.status==200)
                {
                    funcCallBack(xhr.responseText);
                }
            }
            xhr.send();
        }
        catch(e){
            console.error("Error: ",e);
        }
    },
    NewXhrPOST: function(values)
                        { 
                            dataJson = values;
                            var returnData=null;
                            try {
                            xhr = new XMLHttpRequest();
                            xhr.open('POST',this.url,true);
                            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
                            xhr.onreadystatechange = function () {
                                if(xhr.readyState==4 && xhr.status==200){
                                    this.newUrl = JSON.parse(xhr.responseText);
                                    window.location.href=this.newUrl.respuesta;
                            }

                                }
                            console.info(xhr.responseText);
                            xhr.send(dataJson);
                            return returnData;
                            }
                            catch(e){
                                console.error("Error: ",e);
                            }
                        }
}