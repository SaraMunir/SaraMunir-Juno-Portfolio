window.onscroll = function() {myFunction()};

function myFunction() {
        console.log(document.body.scrollTop)
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        $('#sideBar').addClass( "sideWidthSmll" )
        $('#sideBar').removeClass( "sideWidthBig" )
        
    } else {
        $('#sideBar').addClass( "sideWidthBig" )
        $('#sideBar').removeClass( "sideWidthSmll" )
    }
    if (document.body.scrollTop > 1800 || document.documentElement.scrollTop > 1800) {
        $('#profileImgC').attr("src", "./assets/myImg4.png");
        // $('#sideBar').removeClass( "sideWidthBig" )
    }else {
        $('#profileImgC').attr("src", "./assets/myImg1.png");

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


function myScroll(type){
    if(type === 'aboutSumm'){
        $('html, body').animate({
            scrollTop: $("#aboutSumm").offset().top
        }, 1000);
    }
}
const showContent=(type)=>{
    if(type=== 'aboutMe'){
        $('html, body').animate({
            scrollTop: $("#about").offset().top
        }, 1000);
    }

}