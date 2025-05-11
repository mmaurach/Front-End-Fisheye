//recuperer l'id du photographer depuis le lien
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}
//chercher depuis le fichier json l'element photographer qui correspond à l'id passé
async function getPhotographerById(id) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers.find((photographer) => photographer.id === id);
}

function displayPhotographer(photographer) {
  const header = document.querySelector(".photograph-header");
  const template = photographerTemplate(photographer);

  // Structure gauche (nom, localisation, tagline)
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("photographer-info");

  const nameEl = document.createElement("h1");
  nameEl.textContent = photographer.name;

  const locationEl = template.getUserDetail();

  const taglineEl = document.createElement("p");
  taglineEl.classList.add("photographer-tagline");
  taglineEl.textContent = photographer.tagline;

  infoContainer.appendChild(nameEl);
  infoContainer.appendChild(locationEl);
  infoContainer.appendChild(taglineEl);

  // Structure droite (photo)
  const photoEl = template.getUserPhoto();

  // Insertion avant et après le bouton
  const button = document.querySelector(".contact_button");

  header.insertBefore(infoContainer, button);
  header.appendChild(photoEl);
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const photographerId = parseInt(params.get("id"));

  const photographer = await getPhotographerById(photographerId);

  if (photographer) {
    displayPhotographer(photographer);
  } else {
    console.error("Photographe non trouvé !");
  }
}

init();
