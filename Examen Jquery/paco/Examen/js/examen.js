$(document).ready(function(){

    var check=$("input[name='casillaDescuento']");
    if(check.is(":checked")){
        check.parent().css('opacity', '1');
    }else {
        check.parent().css('opacity', '0.5');
    }

    $("#formulario").submit(function(e){
        e.preventDefault();
        var serial=$(this).serializeArray();
        /*for(i=0;i<serial.length;i++) {
            console.log(serial[i].value);
        }*/
        var name=serial[0].value;
        var price=serial[1].value;
        var quant=serial[2].value;
        if(name&&price&&quant){
            //console.log(name);
            //console.log(price);
            //console.log(quant);
            var article=$("<article class='lineaArticulo'></article>");
            article.append($("<span>"+name+"</span>"));
            var p=$("<span class='precio'>"+parseInt(price).toFixed(2)+" €</span>");
            article.append(p);
            var q=$("<input  type='number' min='1' max='100' class='cantidad' value='"+quant+"'></input>")
            q.on("change",function(){
                //alert(total.text().split(" ")[0]);
                //alert(p.text().split(" ")[0]);
                //console.log(parseInt($(this).val()));
                //console.log(parseInt(p.text().split(" ")[0]));
                //ALTERAR PRECIO TOTAL PRODUCTO
                var mult=parseInt(p.text().split(" ")[0])*parseInt($(this).val());
                total.text(mult.toFixed(2)+" €");

                //ALTERAR PRECIO FINAL
                cambiarPrecioFinal();
            });
            article.append($("<span>Cantidad:</span>").append(q));
            var total=$("<span class='total_producto'>"+parseInt(price*quant).toFixed(2)+" €</span>");
            article.append(total);
            
            var del=$("<button class='borrar'>Borrar</button>");
            del.on("click",function(){
                $(this).parent().remove();
            });
            //*** article.append(del) modifica el dom añadiendo al articulo el elemento html que hemos creado con jquery dentro de la variable del. Después este articulo se añade al final del elemento con id lista
            article.append(del);
            $("#lista").append(article);

            //ALTERAR PRECIO FINAL
            cambiarPrecioFinal();
        }
        
    });

    $("input[name='casillaDescuento']").change(function(){
        cambiarPrecioFinal()
        var check=$(this);
        if(check.is(":checked")){
            //*** parent() es una funcion de traversing
            check.parent().css('opacity', '1');
        }else {
            check.parent().css('opacity', '0.5');
        }
    });

    $("input[name='descuento']").change(function(){
        cambiarPrecioFinal()
    });

    function cambiarPrecioFinal(){
        var precios=$(".total_producto");
        var sum=0;
        for(i=0;i<precios.length;i++) {
            sum+=parseInt(precios[i].textContent.split(" ")[0]);
        }

        var check=$("input[name='casillaDescuento']");
        if(check.is(":checked")){
            //console.log($("input[name='descuento']").val());
            var descuento=1-($("input[name='descuento']").val()/100);
            $("#preciofinal").text((sum*descuento).toFixed(2)+" €");
        }else{
            $("#preciofinal").text(sum.toFixed(2)+" €");
        }
    }

    $("#dashboard p").hide();
    $("#dashboard p").slideDown(1000,"easeInCubic");
    $("#dashboard button").text("Ocultar");

    //*** Aqui utilizo delegacion de eventos seleccionando el button dentro de #dashboard como aparece a continuación
    $("#dashboard").on("click","button", function(){
        if($(this).next().is(":visible")){
            //*** tanto slideUp como slideDown son efectos de jquery UI
            $(this).next().slideUp(1000,"easeInCubic");
            $(this).text("Aviso sobre cookies");
        }else{
            $(this).next().slideDown(1000,"easeInCubic");
            $(this).text("Ocultar");
        }
        
        
    });

});