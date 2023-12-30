// objects
let movies = [
    {
        name: '',
        des: '',
        image: 'images/slider 2.PNG'
    },
    {
        name: '',
        des: '',
        image: 'images/slider 1.PNG'
    },
    {
        name: '',
        des: '',
        image: 'images/slider 3.PNG'
    },
    {
        name: '',
        des: '',
        image: 'images/slider 4.PNG'
    },
    {
        name: '',
        des: '',
        image: 'images/slider 5.PNG'
    }
];




//data storage
let carousel = document.querySelector(".carousel");
let sliders = [];

let sliderIndex = 0;

const createSlide = () => {
    if(sliderIndex >= movies.length){
        sliderIndex = 0;
    }
    
//Creating Dom element

const slide = document.createElement('div');
const imgElement = document.createElement('img');
const content = document.createElement('div');
const h1 = document.createElement('h1');
const p = document.createElement('p');

//attaching all elments

imgElement.appendChild(document.createTextNode(''));
h1.appendChild(document.createTextNode(movies[sliderIndex].name));
p.appendChild(document.createTextNode(movies[sliderIndex].des));
content.appendChild(h1);
content.appendChild(p);
slide.appendChild(content);
slide.appendChild(imgElement);
carousel.appendChild(slide);

//setting up images which is in slider-data js file------

imgElement.src = movies[sliderIndex].image;
sliderIndex++;

//setting elements
slide.className = 'slider';
content.className = 'slider-content';
h1.className = 'movie-title';
p.className = 'movie-des';

sliders.push(slide);

//adding sliding effects

if(sliders.length){
    sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${30 * (sliders.length - 2)}px)`;
}

};
for(let i = 0; i < 6; i++){
    createSlide();
}
setInterval(() => {
    createSlide();
}, 3000);


//video carousel

const videoCards = [...document.querySelectorAll('.video-card')];

videoCards.forEach(item => {
    item.addEventListener('mouseover', () =>{
        let video = item.children[1];
        video.play();
    })
    item.addEventListener('mouseleave', () =>{
        let video = item.children[1];
        video.pause();
    })
})

// card slider

const cardContainers = [...document.querySelectorAll('.card-container')];
const preBtn =  [...document.querySelectorAll('.pre-btn')];
const nxtBtn =  [...document.querySelectorAll('.next-btn')];

cardContainers.forEach((item, i) =>{
    let containerDimension = item.getBoundingClientRect();
    let containerWidth = containerDimension.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth - 200;
    })
    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth + 200;
    })
})
