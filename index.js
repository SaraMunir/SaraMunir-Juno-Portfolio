window.onscroll = function() {scrollingEffect()};
const mediaQuery = window.matchMedia('(min-width: 851px)')
const mediaQuery2 = window.matchMedia('(max-width: 850px)')
const mediaQueryMobile = window.matchMedia('(max-width: 650px)')
let isDetailWindowOn = false
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
function handleTabletChange(e) {
    // Check if the media query is true
    if (e.matches) {
        $(`#sideBar`).css('left', '-100%');
    }else{
        $(`#sideBar`).css('left', '0');
    }
}
mediaQueryMobile.addListener(handleTabletChange)
handleTabletChange(mediaQueryMobile)

const scrollingEffect=()=> {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        $('#sideBar').addClass( "sideWidthSmll" )
        $('#sideBar').removeClass( "sideWidthBig" )
        $('#testProImg').removeClass( "biggerHeight" )
        $('#testProImg').addClass( "smallerHeight" )
        $('.sidebarFooter').addClass( "biggerFooter" )
        $('.sidebarFooter').removeClass( "smallerFooter" )
        setInterval(() => {
            $(".menus").fadeIn(1000)
        }, 1000);


    } else {
    }
    if (document.body.scrollTop > 1800 || document.documentElement.scrollTop > 1800) {
        $('#profileImgC').attr("src", "./assets/myImg4.png");
        // $('#profileImgC').css("height", "50vh");
    }else {
        $('#profileImgC').attr("src", "./assets/myImg1.png");
    }
}
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
let menu = false
let sideMenuMobile 
const showMenu=(id)=>{
    sideMenuMobile=id
    if(menu === false){
        $('#hamBrgr').addClass('open');
        $(`#hamBrgr`).removeClass('hamBrgr');
        $(`#sideBar`).css('left', '0');
        menu = true
    }else {
        $(`#hamBrgr`).addClass('hamBrgr');
        $(`#hamBrgr`).removeClass('open');
        $(`#sideBar`).css('left', '-100%');
        menu = false
    }
}

const showContent=(type)=>{
    if(isDetailWindowOn===true) {
        $('#portfolioDetail').hide( "slow" )
        $('#portfolio').show( "slow" )
        $('#projectName').text('')
        $('#projectDescription').html('')
        $('#projectImgs').html('')
        $('#projectCollabs').html('')
        $('.stackArray').html('')
    }
    if(type=== 'aboutMe'){
        $('html, body').animate({
            scrollTop: $("#about").offset().top
        }, 1000);
        $('#aboutNavItm').addClass("active")
        $('#aboutNavItm2').addClass("active")
        $('#aboutPortItm').removeClass("active")
        $('#aboutPortItm2').removeClass("active")
        $('#contactsItm').removeClass("active")
        $('#contactsItm2').removeClass("active")
    }
    if(type=== 'portfolios'){
        $('html, body').animate({
            scrollTop: $("#portfolio").offset().top
        }, 1000);
        $('#aboutNavItm').removeClass("active")
        $('#aboutNavItm2').removeClass("active")
        $('#aboutPortItm').addClass("active")
        $('#aboutPortItm2').addClass("active")
        $('#contactsItm').removeClass("active")
        $('#contactsItm2').removeClass("active")
    }
    if(type=== 'contacts'){
        $('html, body').animate({
            scrollTop: $("#contactSect").offset().top
        }, 1000);
        $('#aboutNavItm').removeClass("active")
        $('#aboutNavItm2').removeClass("active")
        $('#aboutPortItm').removeClass("active")
        $('#aboutPortItm2').removeClass("active")
        $('#contactsItm').addClass("active")
        $('#contactsItm2').addClass("active")
    }
    if(menu===true){
        $(`#hamBrgr`).addClass('hamBrgr');
        $(`#hamBrgr`).removeClass('open');
        $(`#sideBar`).css('left', '-100%');
        menu = false
    }
    isDetailWindowOn = false
}
const openModal = (idx, imgIdx)=>{
    $('#modal').show( "slow" )
    renderModalImg(idx, imgIdx)
}
const focusThisImg = (idx, imgIdx)=>{
    renderModalImg(idx, imgIdx)
}
const renderModalImg =(idx, imgIdx)=>{
    $('#focusedImgs').html('')
    $('#focusedImgs').html(`
        <i class="fas fa-chevron-left" onclick="prevImg('${idx}','${imgIdx}')"></i>
        <div class='fixedImgwidth'>
            <img id="imgInFocus" src="${projects[idx].images[imgIdx]}" alt="image ${imgIdx} of the ${projects[idx].name}">
        </div>
        <i class="fas fa-chevron-right" onclick="nextImg('${idx}','${imgIdx}')"></i>
    `)
    $('.allImages').html('')
    projects[idx].images.forEach((image, idxs)=>{
        if(imgIdx == idxs){
            $('.allImages').append(`
            <img class="spcl" src='${image}' alt='image of ${projects[idx].name}'>
            `)
        }else {
            $('.allImages').append(`
            <img src='${image}' alt='image of ${projects[idx].name}' onclick="focusThisImg('${idx}','${idxs}')">
            `)
        }
    })
}
const nextImg =(idx, imgIdx)=>{
    if(imgIdx < projects[idx].images.length-1){
        renderModalImg(idx , (Number(imgIdx)+1) )
    }else {
        renderModalImg(idx , 0 )
        return
    }
}
function showTop(cat){
    $(`#${cat}`).removeClass( "opacity" )
}
function hideTop(cat){
    $(`#${cat}`).addClass( "opacity" )
}
const prevImg =(idx, imgIdx)=>{
    if(imgIdx > 0){
        renderModalImg(idx , (Number(imgIdx)-1) )
    }else {
        renderModalImg(idx , projects[idx].images.length-1  )
        return
    }
}
const closeModal = ()=>{
    $('#modal').hide( "slow" )
}
const showDetail=async(id)=>{
    isDetailWindowOn = true

    $('#portfolio').hide( "slow" )
    $('#portfolioDetail').show( "slow" )
    $('#projectName').text('')
    $('#projectName').attr("href", `${projects[id].website}`)
    $('#projectName').text(projects[id].name)
    const projectParagraphs = projects[id].description.split(' / ')
    $('#projectDescription').html('')
    projectParagraphs.forEach(para=>{
        $('#projectDescription').append(`
        <p>${para}</p>
        `)
    })
    $('#projectImgs').html('')
    $('#projectCollabs').html('')
    $('.stackArray').html('')
    projects[id].images.slice(0, 3).forEach((image, idx)=>{
        $('#projectImgs').append(`
        <a href="#" onclick="openModal('${id}','${idx}')">
        <img src='${image}' alt='image of ${projects[id].name}'>
        </a>
        `)
    })

    $('#detailLinks').html(`
        <a href="${projects[id].website}">Live <i class="fas fa-wifi"></i></a href="#">
        <a href="${projects[id].github}">Git <i class="fab fa-github"></i></a href="#">
    `);
    projects[id].stacks.forEach(stack=>{
        if(stack === 'REACT'){
            $('.stackArray').append(`
            <i class="fab fa-react"></i>
            `)
        }
        if(stack === 'css'){
            $('.stackArray').append(`
            <i class="fab fa-css3-alt"></i>
            `)
        }
        if(stack === 'sass'){
            $('.stackArray').append(`
            <i class="fab fa-sass"></i>
            `)
        }
        if(stack === 'html'){
            $('.stackArray').append(`
            <i class="fab fa-html5"></i>
            `)
        }
        if(stack === 'javascript'){
            $('.stackArray').append(`
            <i class="fab fa-js"></i>
            `)
        }
        if(stack === 'firebase'){
            $('.stackArray').append(`
            <img src="./assets/fireBasePink.png" alt="firebase db icon">
            `)
        }
        if(stack === 'mongodb'){
            $('.stackArray').append(`
            <img src="./assets/mongoLogoPink.png" alt="mongo db icon">
            `)
        }
        if(stack === 'nodejs'){
            $('.stackArray').append(`
            <i class="fab fa-node"></i>
            `)
        }
    })
    if(projects[id].collaborators.length>0){
        $('#projectCollabs').append('<p>Collaborators</p>')
        projects[id].collaborators.forEach(async collaborator=>{
            await fetch(`https://api.github.com/users/${collaborator.github}`)
                .then(res => res.json())
                .then(data => {
                $('#projectCollabs').append(
                `
                    <button class="collabCntr" href="${collaborator.website}">
                        <img title='${data.name}' src='${data.avatar_url}' alt='image of ${data.name}'>
                        <a class="collabWindwo" href="${collaborator.website}">${data.name}</a>
                    </button>
                `)
                })
        })
    }
}
const goBackToPortfolio=()=>{
    isDetailWindowOn = false
    $('#portfolioDetail').hide( "slow" )
    $('#portfolio').show( "slow" )
    $('html, body').animate({
        scrollTop: $("#portfolio").offset().top
    }, 100);
    setTimeout(() => {
        $('#projectName').text('')
        $('#projectDescription').html('')
        $('#projectImgs').html('')
        $('#projectCollabs').html('')
        $('.stackArray').html('')
    }, 500);
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
const abt = document.getElementById('abt');
const prt = document.getElementById('ports');
const contactSect = document.querySelector('.contactShow');
const header = document.querySelector('header');

document.addEventListener('scroll', function () {
    const isAboutVisible = isInViewport(abt)
    const isPortsVisible = isInViewport(prt)
    const isHeaderVisible = isInViewport(header)
    const isContactsVisible = isInViewport(contactSect)
        if(isHeaderVisible){
            $('#aboutPortItm').removeClass("active")
            $('#aboutPortItm2').removeClass("active")
            $('#aboutNavItm').removeClass("active")
            $('#aboutNavItm2').removeClass("active")
            $('#contactsItm').removeClass("active")
            $('#contactsItm2').removeClass("active")
        }
        if(isAboutVisible){
            
            $('#aboutNavItm').addClass("active")
            $('#aboutNavItm2').addClass("active")
            $('#aboutPortItm').removeClass("active")
            $('#aboutPortItm2').removeClass("active")
            $('#contactsItm').removeClass("active")
            $('#contactsItm2').removeClass("active")
        } 
        if(isPortsVisible){
            $('#aboutPortItm').addClass("active")
            $('#aboutPortItm2').addClass("active")
            $('#aboutNavItm').removeClass("active")
            $('#aboutNavItm2').removeClass("active")
            $('#contactsItm').removeClass("active")
            $('#contactsItm2').removeClass("active")
        }
        if(isContactsVisible){
            $('#contactsItm').addClass("active")
            $('#contactsItm2').addClass("active")
            $('#aboutPortItm').removeClass("active")
            $('#aboutPortItm2').removeClass("active")
            $('#aboutNavItm').removeClass("active")
            $('#aboutNavItm2').removeClass("active")
        }
}, {
    passive: true
});

const projects=[
    {
        id: 0,
        name: 'Sun Run',
        description: 'Sun Run is a fitness app that allows users to schedule their runs based on sunlight. User can select if they want to hit sunrise or sunset and plan their runs accordingly. Based on the users selection the app suggests when they should start their run to hit sunrise or sunset. / This agency-style application was built on REACT, in a group project assigned by Juno College as part of their curriculum. The main goal of the project was to mimick the agency environment working in small groups to build web applications for clients. ',
        collaborators: [
            {
                name: 'Adrienne Lee',
                github: 'adrienneklee',
                website: 'https://adriennelee.dev/',
                linkedIn: 'https://www.linkedin.com/in/adrienneklee/'
                
            }, 
            {
                name:'Dallan Jones',
                github:'dallanj',
                website: 'https://dallan.ca/',
                linkedIn: 'https://www.linkedin.com/in/dallanj/'
            }, 
            {
                name:'Kelvin Lee',
                github:'kleemeo',
                website: 'https://www.kelvinlee.dev/',
                linkedIn: 'https://www.linkedin.com/in/kleeio/'
            }
        ],
        createdOn: '',
        website: 'https://sunrun.netlify.app/',
        github: "https://github.com/Chimbuken/sun-run",
        images: [
            './assets/sunRunImg1.png',
            './assets/sunRunImg2.png',
            './assets/sunRunImg3.png',
        ], 
        stacks: ['REACT', 'firebase', 'css', 'html', 'javascript']
    },
    {
        id: 1,
        name: 'Sophies Blog',
        description: "A multipage website for Sophie's blog. Where she blogs about her daily life. The website is fully responsive on all screen sizes and has a collapsing navigation menu completed with HTML and CSS. / The main goal of this project was to convert a static design into a multi-page, functional, responsive website. In order to bring the designer’s vision to life with a fully-functional website using HTML and CSS techniques as well as provide a positive experience for the users across multiple devices and screen sizes",
        collaborators: [],
        createdOn: '',
        website: 'https://saramunir.github.io/saraMunirJunoProjectOne/',
        github: "https://github.com/SaraMunir/saraMunirJunoProjectOne",
        images: [
            './assets/sophiesBlogImg1.png',
            './assets/sophiesBlogImg2.png',
            './assets/sophiesBlogImg3.png',
            './assets/sophiesBlogImg4.png',
            './assets/sophiesBlogImg5.png',
        ],
        stacks: ['css', 'html', 'sass']
    },
    {
        id: 2,
        name: 'Thought Escape',
        description: "A social media application based off facebook/twitter that allows a user to share their thoughts. Features include searching for other users on the platform, follow them, comment on their posts and like thoughts they or others have shared. / Goal of the project was to showcase an understanding of core React concepts (ie. state, props, components), working with external or third-party data sources (ie. APIs/Firebase), error handling and UI design. Some of the requirements included to successfully convey what the app does as well as being dynamic based on user interaction",
        requirements: [],
        collaborators: [],
        createdOn: '',
        website: 'https://objective-heisenberg-ab7d8c.netlify.app/',
        github: "https://github.com/SaraMunir/sara-munir-juno-project3",
        images: [
            './assets/thoughtEscapeImgs1.png',
            './assets/thoughtEscapeImgs2.png',
            './assets/thoughtEscapeImgs3.png'
        ],
        stacks: ['REACT', 'firebase', 'css', 'html', 'javascript']
    },
    {
        id: 3,
        name: 'Ecommerce Website',
        description: "An eccomerce website that allows users to shop clotthing of their choices. Users can view variety of clothes based on categories, such as gender, type etc. Users can select clothing and add to cart. They can only select upto 5 of each size as maximum number. The quantity is based on stock available. if there are any clothing with zero amount, users are not able to select. Users cart are saved in local storage when they come back to the site to continue shopping. Once they select, they are then prompted to provide payment and shipping information. Upon completion they are provided with the order confirmation. / To showcase the usage of local storage, backend integration with MongoDb along with successfully incorporating react components such as react routing, useState and useEffect",
        collaborators: [],
        createdOn: '',
        website: 'https://my-ecommerce-web.herokuapp.com/',
        github: "https://github.com/SaraMunir/myEcommerce",
        images: [
            './assets/eccomerseStitchesImgs1.png',
            './assets/eccomerseStitchesImgs2.png',
            './assets/eccomerseStitchesImgs3.png',
            './assets/eccomerseStitchesImgs4.png',
            './assets/eccomerseStitchesImgs5.png',
            './assets/eccomerseStitchesImgs6.png',
        ],
        stacks: ['REACT', 'css', 'html', 'javascript', 'mongodb', 'nodejs', ]
    },
    {
        id: 4,
        name: 'Movie Maniax',
        description: "Movie Maniax is a user-friendly movie search application built on MERN stack. Users are offered a range of search options such as Popular, Top-Rated, Upcoming, and Genre. Once a member of Movie Maniax, users unlock a variety of rich features such as add to watchlist/favourites, build custom tags to make accessibility of movies easier, and read/write reviews/comments. Furthermore, to include a socializing aspect to our application, we allow users to make new friends with other Movie Maniax members. Once the user has made a Movie Maniax buddy, they can check out their friends and follower profile pages and get a glimpse of their favourite movies, watch lists, and reviews.",
        goal: '',
        requirements: [],
        collaborators: [
            {
                name: 'Joanna Santhosh',
                github:'jsanthos01',
                website: 'https://www.linkedin.com/in/joannasanthosh/',
                linkedIn: 'https://www.linkedin.com/in/joannasanthosh/'
            }, 
            {
                name: 'Norma Moras',
                github:'nmoras',
                website: 'https://nmoras.github.io/front-end-projects.html',
                linkedIn: 'https://www.linkedin.com/in/normamoras/'
            }
        ],
        createdOn: '',
        website: 'https://movie-maniax.herokuapp.com/',
        github: "https://github.com/jsanthos01/MovieManiax",
        images: [
            './assets/movieManiaxImg1.png',
            './assets/movieManiaxImg2.png',
            './assets/movieManiaxImg3.png',
            './assets/movieManiaxImg4.png',
            './assets/movieManiaxImg5.png',
        ],
        stacks: ['REACT', 'css', 'html', 'javascript', 'mongodb', 'nodejs' ]
    },
    {
        id: 5,
        name: 'Game Of Thrones Quote Trivia',
        description: "This is a quiz app that users can take part in. User is given a random quote from which is generated based on API of the famous Game of Thrones tv show and they have to guess which character quoted this. Each answers are recorded when selected and are given if it is correct or not. at the end of the quize users are give the total score. / Main Goal of the project was to showcase the understanding of usage of API integration as well general understanding of progamming.",
        requirements: [],
        collaborators: [
            {
                name: 'Sean Sipus',
                github:'SeanSip',
                website: 'https://seansipus.com/',
                linkedIn: 'https://www.linkedin.com/in/sean-sipus/'
            }
        ],
        createdOn: '',
        website: 'https://house-juno.github.io/SaraSeanProject2/',
        github: "https://github.com/House-Juno/SaraSeanProject2",
        images: [
            './assets/gameOfThronesQuizImg1.png',
            './assets/gameOfThronesQuizImg2.png',
            './assets/gameOfThronesQuizImg3.png',
            './assets/gameOfThronesQuizImg4.png',
        ],
        stacks: ['javascript', 'sass','css', 'html']
    }
]