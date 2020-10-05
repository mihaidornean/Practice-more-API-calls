"use strict"

const animalForm = document.getElementById("animalForm");
const selectedAnimal = document.getElementById("animal");
const animalImage = document.querySelector("[data-image]");

animalForm.addEventListener("submit", e => getTheAnimalPicture(e));

function getTheAnimalPicture(e) {
    e.preventDefault();

    const animals = selectedAnimal.value;

    fetch(animals)
    .then(response => response.json())
    .then(data => {
        if(data.url) {
            if(!data.url.includes(".mp4")) {
                animalImage.src = data.url;
            }
        } else if(data.file) {
            animalImage.src = data.file;
        } else {
            animalImage.src = data.image;
        }
    })
}
