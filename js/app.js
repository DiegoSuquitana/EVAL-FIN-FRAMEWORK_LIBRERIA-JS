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

});