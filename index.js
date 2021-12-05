window.onscroll = function() {myFunction()};

function myFunction() {
        console.log(document.body.scrollTop)
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        $('#sideBar').addClass( "sideWidthSmll" )
        $('#sideBar').removeClass( "sideWidthBig" )
        
    } else {
        $('#sideBar').addClass( "sideWidthBig" )
        $('#sideBar').removeClass( "sideWidthSmll" )

    }
}

$(document).ready(function(e){
    console.log('is it working') 
    // $('#sideBar').fadeIn(1500)
    // $("#sideBar").animate({left: '250px'});
    anime.timeline({loop: false})
    .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2550,
    delay: (el, i) => 150 * (i+1)
    })
})


var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

