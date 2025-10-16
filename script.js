let charactersList = document.querySelector(".characters");
let housesList = document.querySelector(".houses");
let filtresList = document.querySelector(".filtres");

const allData = await fetch(`https://hp-api.onrender.com/api/characters`)
  .then((response) => response.json())
  .catch((error) => alert("Erreur : " + error));

const data = allData.slice(0, 12);
const housesNamesList = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

const filterByHouse = (house) => {
  let filteredList = data.filter((character) => character.house === house);

  return filteredList;
};

const filterByAlphabeticalOrder = () => {
  let filteredList = data.sort((a, b) => a.name.localeCompare(b.name));
  return filteredList;
};

const filterByAlive = () => {
  let filteredList = data.filter((character) => character.alive === true);
  return filteredList;
};

const filterByDead= () => {
  let filteredList = data.filter((character) => character.alive === false);
  return filteredList;
};

const renderCharactersList = (data) => {
  if (filtresList.childElementCount === 0) {
    let alphabetButton = document.createElement("button");

    let aliveButton = document.createElement("button");
    let deadButton = document.createElement("button");

    alphabetButton.textContent = "Alphabetical";

    aliveButton.textContent = "Alive";
    deadButton.textContent = "Dead";

    filtresList.appendChild(alphabetButton);

    filtresList.appendChild(aliveButton);
    filtresList.appendChild(deadButton);

    alphabetButton.addEventListener("click", () => {
      renderCharactersList(filterByAlphabeticalOrder());
    });

    aliveButton.addEventListener("click", () => {
      renderCharactersList(filterByAlive());
    });

    deadButton.addEventListener("click", () => {
      renderCharactersList(filterByDead());
    });
  }

  if (housesList.childElementCount === 0) {
    housesNamesList.forEach((house) => {
      let houseButton = document.createElement("button");
      houseButton.innerHTML = `
      <div><img src="./images/logo/${house.toUpperCase()}.png" alt="" /></div>
      `;

      housesList.appendChild(houseButton);

      houseButton.addEventListener("click", () => {
        renderCharactersList(filterByHouse(house));
      });
    });
  }

  charactersList.innerHTML = "";

  data.forEach((character) => {
    let characterDiv = document.createElement("article");
    characterDiv.innerHTML = `
        <a href="./details.html?id=${
          character.id
        }" class=${character.house.toLowerCase()}>
            <img src="${character.image}" alt="${character.name}" />
            <p>${character.name}</p>
          </a>
        `;

    charactersList.appendChild(characterDiv);
  });
};

renderCharactersList(data);
