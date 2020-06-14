//animacion titulo//
function color1(){
    $("h1").animate({
        color:"white"
    },2000, function(){
        color2()

    })
}

function color2(){
    $("h1").animate({
        color:"#DCFF0E"
    },2000, function(){
        color1()
    })
}
//fin animacion titulo//
var cont = 0;
var mov = 0;
var espera = 0;
var min = 2;
var seg = 0;

$(function(){
    color1();
    
    $(".btn-reinicio").click(function(){
        
        llenar();
        setInterval(function(){timer()},1000);
        $(this).html("Reiniciar");
    })

// visualizar panel score //
function callback()
    {
        $( ".panel-score" ).animate({width:'100%'},4000);
    }
// fin visualizar panel score

// tiempo //
function timer()
{
  if(seg!=0)
  {
    seg=seg-1;
  }
  if(seg==0)
  {
    if(min==0)
    {
      $( ".panel-tablero" ).hide("drop","slow",callback);
      $( ".time" ).hide();
    }
    seg=59;
    min=min-1;
  }
  $("#timer").html("0"+min+":"+seg)
}

// fin tiempo //


// intercambiar los dulces //
jQuery.fn.swap = function(b)
{
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};
// fin intercambiar los dulces //

// eliminar 3 dulces //
function eliminarDulces(){
    matriz=0;
    rbh=horizontal() //funcion busqueda dulces horizontal
    rbv=vertical() //funcion buscar dulces vertical
    for(var j=1;j<8;j++)
    {
        matriz=matriz+$(".col-"+j).children().length;
        //alert("matriz: " + matriz);
    }
    if(rbh==0 && rbv==0 && matriz!=49) //condicion si no encuentra 3 dulces o mas llamar a funcion para volver a completar el juego
    {
        //alert("nuevos dulces no hay");
        //clearInterval(eliminar);
        bnewd=0;
        //newdulces=setInterval(function()
        //{
            llenar() //Funcion completar nuevos dulces
        //},600)
    }
    if(rbh==1 || rbv==1)
    {
        $(".elemento").draggable({ disabled: true });
        $("div[class^='col']").css("justify-content","flex-end")
        $(".activo").hide("pulsate",1000,function(){
        var scoretmp=$(".activo").length;
        $(".activo").remove("img")
        score=score+scoretmp;
        $("#score-text").html(score) //Cambiar puntuacion
        })
    }
    if(rbh==0 && rbv==0 && matriz==49)
    {
        //alert("permitir movimiento");
        $(".elemento").draggable({
            disabled: false,
            containment: ".panel-tablero",
            revert: true,
            revertDuration: 0,
            snap: ".elemento",
            snapMode: "inner",
            snapTolerance: 40,
            start: function(event, ui){
                mov=mov+1;
                $("#movimientos-text").html(mov)
            }
        });
    }

    $(".elemento").droppable({
        drop: function (event, ui) {
            var dropped = ui.draggable;
            var droppedOn = this;
            espera=0;
            do{
                espera=dropped.swap($(droppedOn));
            }while(espera==0)
            rbh=horizontal() //funcion busqueda dulces horizontal
            rbv=vertical() //funcion buscar dulces vertical
            if(rbh==0 && rbv==0)
            {
                dropped.swap($(droppedOn));
            }
            if(rbh==1 || rbv==1)
            {
                //clearInterval(newdulces);
                //clearInterval(eliminar); //desactivar funcion desplazamiento()
                //eliminar=setInterval(function(){eliminarhorver()},150) //activar funcion eliminarhorver
                setInterval(function(){eliminarDulces()},150)
            }
        },
    });
    }
    
// fin eliminar 3 dulces //
        

// busqueda horizontal //
function horizontal(){
    var bh=0;
    for(var j=1;j<8;j++)
    {
      for(var k=1;k<6;k++)
      {
        var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src")
        var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src")
        var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src")
        if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
        {
            $(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
            $(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
            $(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
            bh=1;
        }
      }
    }
    return bh;
}
// fin busqueda horizontal //

// busqueda vertical //
function vertical()
{
  var bv=0;
  for(var l=1;l<6;l++)
  {
    for(var k=1;k<8;k++)
    {
      var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src")
      var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src")
      var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src")
      if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
      {
          $(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo")
          $(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo")
          $(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo")
          bv=1;
      }
    }
  }
  return bv;

}
// fin busqueda vertical //



// llenar tablero //

var columnas = $(".panel-tablero div");
//Cantidad de dulces del tablero
const cantidaddulces = 7;
// llenar tablero //
function llenar() {     
      for (var i = 0; i < columnas.length; i++) {
          cont ++;
          //alert(cont);
          var cantidad = $(columnas[i]).children().length;
          for (var j = 0; j < cantidaddulces - cantidad; j++) {
              var img = Math.floor(Math.random() * 4) + 1;
              var imagen="image/"+img+".png";
              var dulce = $("<img src='" + imagen + "' class='elemento'/>").css("justify-content","flex-start")
              //se oculta para mostrarlo con la animacion
              dulce.css({
                      display: 'none'
                  })
                  .prependTo(columnas[i]);         
            //alto y ancho del dulce
              var width = dulce.width();
              var height = dulce.height();
            //Este es el punto de inicio de la animacion
              var puntoinicio = parseInt($(".panel-tablero").position().top) + parseInt($(".panel-tablero").css("padding-top")) + parseInt($(".panel-tablero").css("margin-top"))
              //Esta es la animacion
              dulce.css({
                      display: 'none',
                      top: puntoinicio + 'px',
                      position: 'absolute'
                  })
                  .delay(1000 * j)
                  .fadeIn()
                  .animate({
                      top: (((cantidaddulces - cantidad - j -1) * 100) + puntoinicio) + 'px',
                  }, {
                      duration: 500,
                      queue: true,
                      complete: function() {
                          $(this).addClass("displayed");;
                          $(this).css({
                             "position": "relative",
                              "top": "unset",
                              "bottom":"5px"
                          });
                          //siguienteDulce = true;
                          //j++;
                      }
                  })
          }
        
      }
      //draganddrop();
      //eliminarDulces();
      //alert(cont);
      if(cont == 7){
        
        setInterval(function(){eliminarDulces()},5000)
        
    }
  }

//fin llenar tablero//

function draganddrop() {
  var columnas = $(".panel-tablero div");
  for (var i = 0; i < columnas.length; i++) {
    elementos = $(columnas[i]).find("img");

    for (var j = 0; j < elementos.length; j++) {
      $(elementos[j]).draggable({
        disabled: false,
        revert: "invalid",
        containment: ".panel-tablero",
        scroll: false,
        grid: [100, 100],
      }, 2000);
      $(elementos[j]).droppable({
        disabled: false,
        classes: {
          "ui-droppable-hover": "ui-state-hover"
        },
        drop: function (event, ui) {

          $($(ui.draggable)).css({
            left: "auto",
            top: "auto"
          });
        }
      });
    }
  }
}

  //llenar();
 // $('#rellenar').click(() => {
   //   llenar();
 // });

 // columnas.css("height", cantidaddulces * 100 + "px");

/*
//llenar tablero//
function tablero(){
    //i++;
    var numero = 0;
    var imagen;

    var columnas = $(".panel-tablero div");
    const cantidaddulces = 7;

    $('.elemento').draggable({disabled: true});
    
    for(var i=1; i<8; i++){  
        for(var j=1; j<8; j++){
            if($('.col-'+j).children("img:nth-child("+i+")").html()==null){
                numero = Math.floor(Math.random()*4)+ 1;
                imagen="image/"+numero+".png";
                var dulce = $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
                var puntoinicio = parseInt($(".panel-tablero").position().top) + parseInt($(".panel-tablero").css("padding-top")) + parseInt($(".panel-tablero").css("margin-top"));

                dulce.css({
                    display: 'none',
                    top: puntoinicio + 'px',
                    position: 'absolute'
                })
                .delay(1000 * j)
                .fadeIn()
                .animate({
                      top: (((cantidaddulces - i - j - 1) * 100) + puntoinicio) + 'px'
                  }, {
                      duration: 500,
                      queue: true,
                      complete: function() {
                          $(this).addClass("displayed");;
                          $(this).css({
                             "position": "relative",
                              "top": "unset"
                          });
                          siguienteDulce = true;
                          j++;
                      }
                  })
                
            }
        }
    }

}

// fin - llenar tablero//
*/
});
