//Recuperation de l'id depuis l'URL
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

//chercher depuis le fichier json l'element photographer qui correspond à l'id passé
async function getPhotographerById(id) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers.find((photographer) => photographer.id == id);
}

async function getMediaByPhotographerId(id) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.media.filter((media) => media.photographerId == id);
}

function displayPhotographer(photographer) {
  const header = document.querySelector(".photograph-header");
  const template = photographerTemplate(photographer);

  // Structure gauche (nom, localisation, tagline)
  const userDetail = template.getUserDetail();
  // Insertion avant et après le bouton
  const button = document.querySelector(".contact_button");
  header.insertBefore(userDetail, button);

  // Structure droite (photo)
  const photoEl = template.getUserPhoto();
  header.appendChild(photoEl);
}

function displayMedia(mediaList, photographer) {
  const mediaSection = document.querySelector(".media-section");
  mediaSection.innerHTML="";
  let totalLikes =0;
  mediaList.forEach((media) => {
    const template = mediaTemplate(media, photographer);
    const mediaCard = template.getMediaCardDOM();
    totalLikes=totalLikes+template.likes;
    mediaSection.appendChild(mediaCard);
  });

  console.log(totalLikes);
}

async function init() {
  const photographerId = getPhotographerIdFromUrl();
  const photographer = await getPhotographerById(photographerId);

  if (!photographer) {
    console.error("Photographe non trouvé !");
    return;
  }
  
  const mediaList = await getMediaByPhotographerId(photographerId);
  displayPhotographer(photographer);
  displayMedia(mediaList, photographer);
}

init();
