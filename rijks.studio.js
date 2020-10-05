"use strict"

const url = "https://www.rijksmuseum.nl/api/en/collection?key=zU95b6TN";
const authorsContainer = document.querySelector("[data-authors-container]");

const getDataFromApi = (function() {
    fetch(url)
    .then(response => response.json())
    .then(data => getTheAuthors(data))
})();

function getTheAuthors(data) {
    const authorsList = document.createElement("ul");
    authorsList.classList.add("p-0");

    data.facets[0].facets.forEach((author => {
        const authorLink = document.createElement("li");
        authorLink.classList.add("author-link", "text-center", "p-1");
        authorLink.innerText = author.key;
        authorsList.append(authorLink);

        authorLink.addEventListener("click", () => getAuthorDetails(author.key));
    }))

    authorsContainer.append(authorsList);
}

function getAuthorDetails(author) {
    fetch(`${url}&involvedMaker=${author}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.artObjects);
        getTheArtObjects(data.artObjects, author);
    })
}

function getTheArtObjects(data, author) {
    const madeBy = document.createElement("h2");
    madeBy.innerText = `Art object of ${author}: `;

    const artContainer = document.createElement("div");
    artContainer.append(madeBy);

    for(const item of data) {
        if(item.webImage) {
            const artItem = document.createElement("article");
            artItem.setAttribute("id", item.id);
            artItem.classList.add("art-object", "text-center", "mt-5", "p-5");
        
            const artTitle = document.createElement("h5");
            artTitle.innerText = item.title;
        
            const artImg = document.createElement("img");
            artImg.classList.add("art-image");
            artImg.src = item.webImage.url;
        
            artItem.append(artTitle, artImg);
            artContainer.append(artItem);
            }
        }
    drawArtContainer(artContainer);
}

function drawArtContainer(artContainer) {
    const authorWork = document.querySelector("[data-author-items]");

    authorWork.innerHTML = "";
    authorWork.append(artContainer);
}
