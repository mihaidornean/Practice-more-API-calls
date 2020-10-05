"use strict"

const url = "https://official-joke-api.appspot.com/jokes";
const jokeDisplay = document.querySelector("[data-joke-display]");
const selectJokeType = document.querySelector("[data-joke-type]");
const optionSelected = document.querySelector("#joke-type");

selectJokeType.addEventListener("submit", (e) => getDataFromApi(e));

function getDataFromApi(e) {
    e.preventDefault();

    const selected = optionSelected.value;
    fetch(url + selected + "/random")
    .then(response => response.json())
    .then(data => {

        jokeDisplay.innerHTML = "";

        selected ? 
        generateRandomJoke(data[0]) :
        generateRandomJoke(data)
    })
}

function generateRandomJoke(data) {
    const setup = document.createElement("h2");
    setup.innerText = data.setup;
    const punchline = document.createElement("h3");
    punchline.classList.add("mt-5");
    punchline.innerText = data.punchline;

    jokeDisplay.append(setup, punchline);
}

    