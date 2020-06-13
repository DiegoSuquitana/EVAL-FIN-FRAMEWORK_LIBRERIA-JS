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


$(function(){
    color1();
    
    $(".btn-reinicio").click(function(){
        tablero();
    })


//llenar tablero//
function tablero(){
    
    var numero = 0;
    var imagen;

    $('.elemento').draggable({disabled: true});
    
    for(var i=1; i<8; i++){
        for(var j=1; j<8; j++){
            if($('.col-'+j).children("img:nth-child("+i+")").html()==null){
                numero = Math.floor(Math.random()*4)+ 1;
                imagen="image/"+numero+".png";
                $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start");
                
            }
        }
    }


}

// fin - llenar tablero//

});