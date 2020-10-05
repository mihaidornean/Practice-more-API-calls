"use strict"

const url = "http://api.icndb.com/jokes/";
const formData = document.querySelector("[data-form]");
const selectTag = document.querySelector("[data-select]");
const jokeDisplay = document.querySelector("[data-joke]");

formData.addEventListener("submit", (e) => generateJoke(e));

getDataFromApi();

function getDataFromApi() {
    fetch("http://api.icndb.com/categories")
    .then(response => response.json())
    .then(data => drawCategories(data));
}


function drawCategories(data) {
    data.value.forEach(category => {
        const option = document.createElement("option");
        option.innerText = category;
        option.value = category;
        selectTag.append(option);
    })
}

function generateJoke(e) {
    e.preventDefault();

    selectTag.value ?
    generateSelectedCategory(selectTag.value) : 
    generateRandomJoke()
}

function generateRandomJoke() {
    fetch(url + "random")
    .then(response => response.json())
    .then(data => jokeDisplay.innerText = data.value.joke)
}

function generateSelectedCategory(category) {
    fetch(`${url}andom?limitTo=${category}`)
    .then(response => response.json())
    .then(data => {
        const random = Math.floor(Math.random() * data.value.length);
        jokeDisplay.innerText = data.value[random].joke;
    })
}
