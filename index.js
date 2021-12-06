window.onscroll = function() {scrollingEffect()};

const scrollingEffect=()=> {
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
const showDetail=(id)=>{
    console.log('show detail')
    $('#portfolio').hide( "slow" )
    $('#portfolioDetail').show( "slow" )
    console.log(projects[id].name)
    $('#projectName').text(projects[id].name)
    $('#projectDescription').text(projects[id].description)
    $('#projectImgs').html('')
    projects[id].images.forEach(image=>{
        console.log(image)
        $('#projectImgs').append(`
        <img src=${image} alt="">
        `)
    })
}
const projects=[
    {
        id: 0,
        name: 'Sun Run',
        description: 'Sun Run is a fitness app that allows users to plan their runs based on sunlight. User can select if they want to hit sunrise or sunset and plan their runs accordingly. Based on the users selection the app suggests when they should start their run to hit sunrise or sunset.',
        goal: 'This agency-style application was built on REACT,in a group project assigned by Juno College as part of their curriculum.  / The main goal of the project was to mimick the agency environment working in small groups to build web applications for clients. ',
        requirements: [
            "Using the Sunrise/Sunset API - https://sunrise-sunset.org/api - suggest the time the user should leave for their run in order to hit sunrise or be back before sunset",
            " Users should be able to enter the date of their run and choose whether they want to start the run by sunrise or finish the run before the sun sets",
            ""
        ],
        collaborators: [
            {
                name: 'Adrienne Lee',
                github: 'adrienneklee',
                website: ''
            }, 
            {
                name:'Dallan Jones',
                github:'dallanj',
                website: ''
            }, 
            {
                name:'Kelvin Lee',
                github:'kleemeo',
                website: 'https://www.kelvinlee.dev/'
            },
            {
                name: 'Sara Munir',
                github:'SaraMunir',
                website: 'https://saramunir.com/'
            }
        ],
        createdOn: '',
        website: 'https://sunrun.netlify.app/',
        github: "https://github.com/Chimbuken/sun-run",
        images: [
            './assets/sunRunImg1.png',
            './assets/sunRunImg2.png',
            './assets/sunRunImg3.png',
        ]
    },
    {
        id: 1,
        name: 'Sophies Blog',
        description: "This is a website for Sophie's blog.",
        goal: 'To convert a static design into a multi-page, functional, responsive website.',
        requirements: [
            "Bring the designer’s vision to life with a fully-functional website using HTML and CSS techniques",
            "Provide a good experience for the site's users across multiple devices and screen sizes"
        ],
        collaborators: [
            {
                name: 'Sara Munir',
                github:'SaraMunir',
                website: 'https://saramunir.com/'
            }
        ],
        createdOn: '',
        website: 'https://saramunir.github.io/saraMunirJunoProjectOne/',
        github: "https://github.com/SaraMunir/saraMunirJunoProjectOne",
        images: [
            './assets/sophiesBlogImg1.png',
            './assets/sophiesBlogImg2.png',
            './assets/sophiesBlogImg3.png'
        ]
    }
]
$(document).ready(function(e){

    anime.timeline({loop: false})
    .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2550,
    delay: (el, i) => 150 * (i+1)
    })
})
