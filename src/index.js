const imagesUrl = "https://dog.ceo/api/breeds/image/random/5";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const imageContainer = document.getElementById('dog-image-container');
const breedContainer = document.getElementById('dog-breeds');
let imageArray=[];
let breeds = {};

function fetchImages() {
    fetch(imagesUrl)
    .then((resp) => resp.json())
    .then((json) => {
      renderImages(json.message);
    });
  }
function renderImages(images) {
    const imageContainer = document.getElementById('dog-image-container');
    for(let i=0;i<images.length;i++){
        const imgElements = document.createElement('img');
        imgElements.style.position = "static";
        imgElements.style.width = "300px";
        imgElements.style.height = "300px";
        imgElements.src = images[i];
        imgElements.alt = 'dog images'
        imageContainer.appendChild(imgElements); 
    }
}

function fetchBreeds() {
    console.log('test');
    fetch(breedUrl)
    .then((resp) => resp.json())
    .then((json) => {
      renderBreeds(json.message);
    });
}

function renderBreeds(breeds) {
    const breedContainer = document.getElementById('dog-breeds');
    objKeys = Object.keys(breeds);
    const ulData = document.createElement('ul');
    for(let e=0;e<objKeys.length;e++){
        //loop through each breed key and create list element
        const liData = document.createElement('li');
        liData.textContent = objKeys[e];
        //change font color on list click
        liData.addEventListener("click", function(a) {
            a.target.style.color = 'cyan';
        });
    ulData.appendChild(liData);
    }
    breedContainer.appendChild(ulData);
}

async function filterBreeds(params) {
    
}

/*
filter breeds that start 
with a particular letter using a dropdownLinks to an external site..
ex if user selects 'a' in dropdown, only show breeds with 
names that start letter a. onlylettersa-d.
*/
document.addEventListener('DOMContentLoaded', () => {
    fetchImages();
    fetchBreeds();
    filterBreeds();


});
