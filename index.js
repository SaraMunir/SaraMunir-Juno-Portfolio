window.onscroll = function() {scrollingEffect()};

const scrollingEffect=()=> {
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
const openModal = (idx, imgIdx)=>{
    $('#modal').show( "slow" )
    renderModalImg(idx, imgIdx)
}
const focusThisImg = (idx, imgIdx)=>{
    // $('#modal').show( "slow" )
    console.log('is it working?')
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
    console.log(imgIdx)
    console.log(projects[idx].images.length)
    if(imgIdx < projects[idx].images.length-1){
        renderModalImg(idx , (Number(imgIdx)+1) )
    }else {
        console.log('no more image availalbe')
        renderModalImg(idx , 0 )
        return
    }
}
function showTop(cat){
    console.log(cat)
    $(`#${cat}`).removeClass( "opacity" )
}
function hideTop(cat){
    console.log(cat)
    $(`#${cat}`).addClass( "opacity" )
}
const prevImg =(idx, imgIdx)=>{
    if(imgIdx > 0){
        renderModalImg(idx , (Number(imgIdx)-1) )
    }else {
        console.log('no more image availalbe')
        renderModalImg(idx , projects[idx].images.length-1  )
        return
    }

}
const closeModal = ()=>{
    $('#modal').hide( "slow" )
}
const showDetail=async(id)=>{
    console.log('show detail')
    $('#portfolio').hide( "slow" )
    $('#portfolioDetail').show( "slow" )
    console.log(projects[id].name)
    $('#projectName').html('')
    // $('#projectName').html(`
    //     <a class="projectLink" id="projectName" href="${projects[id].website}">${projects[id].name}</a>
    // `)
    $('#projectName').attr("href", `${projects[id].website}`)
    $('#projectName').text(projects[id].name)
    $('#projectDescription').text(projects[id].description)
    $('#projectImgs').html('')
    $('#projectCollabs').html('')
    // $('.imageArray').html('')
    $('.stackArray').html('')
    projects[id].images.forEach((image, idx)=>{
        console.log(image)
        $('#projectImgs').append(`
        <img onclick="openModal('${id}','${idx}')" src='${image}' alt='image of ${projects[id].name}'>
        `)
    })
    // ['REACT', 'firebase', 'css', 'html', 'javascript']
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
            // console.log(collaborator)
            // console.log(collaborator.website)
            await fetch(`https://api.github.com/users/${collaborator.github}`)
                .then(res => res.json())
                .then(data => {
                console.log(data)
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
    $('#portfolio').show( "slow" )
    $('#portfolioDetail').hide( "slow" )
    $('#projectName').text('')
    $('#projectDescription').text('')
    $('#projectImgs').html('')
    // $('.imageArray').html('')
    $('.stackArray').html('')

}
const projects=[
    {
        id: 0,
        name: 'Sun Run',
        description: 'Sun Run is a fitness app that allows users to schedule their runs based on sunlight. User can select if they want to hit sunrise or sunset and plan their runs accordingly. Based on the users selection the app suggests when they should start their run to hit sunrise or sunset.',
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
        description: "A multipage website for Sophie's blog. Where she blogs about her daily life. The website is fully responsive on all screen sizes and has a collapsing navigation menu",
        goal: 'To convert a static design into a multi-page, functional, responsive website.',
        requirements: [
            "Bring the designer’s vision to life with a fully-functional website using HTML and CSS techniques",
            "Provide a good experience for the site's users across multiple devices and screen sizes"
        ],
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
        description: "A social media application based off facebook/twitter that allows a user to share their thoughts. Users can follow other users, comment on posts and like thoughts they or others have posted. /",
        goal: 'To showcase an understanding of core React concepts (ie. state, props, components), working with external or third-party data sources (ie. APIs / Firebase), error handling and UI design..',
        requirements: [
            "It is clear to the user what the app does and results are displayed legibly",
            "App is dynamic based on user interaction (e.g. drop down menu, search field)", 
            "App and interactions are accessible"
        ],
        collaborators: [],
        createdOn: '',
        website: 'https://thought-scape.herokuapp.com/',
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
        description: "An eccomerce website that allows users to shop clotthing of their choices. / users can select clothing and add to cart. They can only select upto 5 of each size as maximum number. The quantity is based on stock available. if there are any clothing with zero amount, users are not able to select. / Users cart are saved in local storage when they come back. Once they select, they are then prompted to provide payment and shipping information. Upon completion they are provided with the order confirmation",
        goal: 'To showcase the usage of local storage, backend integration with MongoDb along with successfully incorporating react components such as react routing, useState and useEffect',
        requirements: [],
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
        description: "This is a quiz app that users can take part in. User is give a random quote from API of the famous Game of Thrones tv show and they have to guess which character quoted this. / Each answers are recorded when selected and are given if it is correct or not. at the end of the quize users are give the total score",
        goal: '',
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
