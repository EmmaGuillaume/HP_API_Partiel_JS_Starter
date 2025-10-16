const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const main = document.querySelector("main");
const characterRequest = await fetch(
  `https://hp-api.onrender.com/api/character/${id}`
)
  .then((response) => response.json())
  .catch((error) => alert("Erreur : " + error));

const character = characterRequest[0];


const renderCharactersList = (character) => {
  let section = document.createElement("section");
  let sectionHouse = document.createElement("section");

  const capitalizedHouse =
  character.house.charAt(0).toUpperCase()
  + character.house.slice(1);
  
  section.innerHTML = `
        <h3>${character.name}</h3>
        <div class="perso">
          <figure class="perso__left">
            <img src="${character.image}" alt="" srcset="" />
            <figcaption>${character.actor}</figcaption>
          </figure>
          <div class="perso__right">
            <div>
              <p class="attr">Gender</p>
              <p class="data">${character.gender}</p>
            </div>

            <div>
              <p class="attr">Eyes</p>
              <p class="data">${character.eyeColour}</p>
            </div>

            <div>
              <p class="attr">Hair</p>
              <p class="data">${character.hairColour}</p>
            </div>

            <div>
              <p class="attr">Date of birth</p>
              <p class="data">${character.dateOfBirth}</p>
            </div>

            <div>
              <p class="attr">Patronus</p>
              <p class="data">${character.patronus}</p>
            </div>
        </div>
        `;
  section.classList.add("house__person");
  sectionHouse.innerHTML = `
        <img src="./images/logo/${capitalizedHouse}.png" alt="" srcset="" />`;

  main.appendChild(section);
  main.appendChild(sectionHouse);
};

renderCharactersList(character);
