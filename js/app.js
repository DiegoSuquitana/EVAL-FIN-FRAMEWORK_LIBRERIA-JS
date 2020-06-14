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
//var i=0;

$(function(){
    color1();
    
    $(".btn-reinicio").click(function(){
        
        llenar();
        
    })

//////////////////

var columnas = $(".panel-tablero div");
//Cantidad de dulces del tablero
  const cantidaddulces = 7;

function llenar() {     
      for (var i = 0; i < columnas.length; i++) {
          var cantidad = $(columnas[i]).children().length;
          for (var j = 0; j < cantidaddulces - cantidad; j++) {
              var img = Math.floor(Math.random() * 4) + 1;
              var imagen="image/"+img+".png";
              //$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
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
              //var puntofinal = parseInt($(".panel-tablero").position().bottom) + parseInt($(".panel-tablero").css("padding-bottom")) + parseInt($(".panel-tablero").css("margin-bottom"))
              //alert("cantidad dulces" + cantidaddulces);
              //alert("cantidad" + cantidad);
              //alert("j" + j);
              //alert(((cantidaddulces - cantidad - j - 1) * 100) + puntoinicio);
              //Esta es la animacion
              dulce.css({
                      //width: width,
                      //height: height,
                      display: 'none',
                      top: puntoinicio + 'px',
                      //bottom: '800px',
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
                              "top": "unset"
                          });
                          siguienteDulce = true;
                          j++;
                      }
                  })
                  //Esta linea es la que elimina cuando se les hace click encima
                  .click(function() {
                      $(this).remove();
                  });
                  

          }
        
      }
      draganddrop();

  }

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
  $('#rellenar').click(() => {
      llenar();
  });

  columnas.css("height", cantidaddulces * 100 + "px");


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

});




//////////////////////