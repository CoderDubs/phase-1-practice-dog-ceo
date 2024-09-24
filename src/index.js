//Dog Website!
//Fetch and render dog images and breeds dynamically
//Dropdown menu to filter by first letter of breed
const imagesUrl = "https://dog.ceo/api/breeds/image/random/21";
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
        imgElements.style.width = "160px";
        imgElements.style.height = "160px";
        imgElements.src = images[i];
        imgElements.alt = 'dog images'
        imageContainer.appendChild(imgElements); 
    }
}

// Filter breeds that start with the selected letter
async function filterBreeds(breeds) {
    const dropDown = document.getElementById('breed-dropdown');
    dropDown.addEventListener('change', function () {
        const selectedLetter = dropDown.value;
        const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter));
        renderBreeds(filteredBreeds);
    });
}

function renderBreeds(breeds) {
    const breedContainer = document.getElementById('dog-breeds');
    if (breeds.length === 0) {
        breedContainer.textContent = 'Needs more breed data.';
        return;
     }     
    // Clear any previously rendered breeds
    breedContainer.innerHTML = '';
    const ulData = document.createElement('ul');
    breeds.forEach(breed => {
        const liData = document.createElement('li');
        liData.textContent = breed;

        // Change font color on list click
        liData.addEventListener("click", function (e) {
            e.target.style.color = 'cyan';
        });
        ulData.appendChild(liData);
    });
    breedContainer.appendChild(ulData);
}

async function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';  // Assuming this is the correct URL
    const response = await fetch(breedUrl);
    const data = await response.json();
    // Convert object keys into an array of breed names
    const breeds = Object.keys(data.message);
    // Initially render all breeds
    renderBreeds(breeds);
    return breeds;
}

document.addEventListener('DOMContentLoaded', async () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const dropDown = document.getElementById('breed-dropdown');
  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Pick A Letter';
  defaultOption.value = '';
  dropDown.appendChild(defaultOption);

  // Generate alphabet options dynamically
  alphabet.forEach(letter => {
    const option = document.createElement('option');
    option.value = letter.toLowerCase();
    option.textContent = letter;
    dropDown.appendChild(option);
  });
    
    fetchImages();
    const breeds = await fetchBreeds();
    filterBreeds(breeds); 
    breedContainer.scrollIntoView({ behavior: 'smooth' });
});