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
  mediaSection.innerHTML = "";

  let totalLikes = 0;

  mediaList.forEach((media) => {
    const template = mediaTemplate(media, photographer);
    const mediaCard = template.getMediaCardDOM();
    totalLikes += template.likes;
    mediaSection.appendChild(mediaCard);
  });

  //Mettre à jour le total likes et le prix
  updateTotaux(totalLikes, photographer.price);

}

function updateTotaux(totalLikes, price){

  const totalLikesEl = document.querySelector(".total-likes");
  const priceEl = document.querySelector(".price");
  
    totalLikesEl.textContent = `${totalLikes}`;
    priceEl.textContent = `${price}€/jour`;
}

function updateTotalLikes(sens){

  const totalLikesEl = document.querySelector(".total-likes");
  let totalLikes = parseInt(totalLikesEl.textContent)

  if(sens==1){
    totalLikesEl.textContent = totalLikes+1;
  }
  if(sens==-1){
    totalLikesEl.textContent = totalLikes-1;
  }
  
}

function addSortDropdown(mediaList, photographer) {
  const main = document.querySelector("main");

  const sortWrapper = document.createElement("div");
  sortWrapper.classList.add("sort-container");

  sortWrapper.innerHTML = `
    <label for="sort-select">Trier par :</label>
    <select id="sort-select" class="custom-sort-select">
      <option value="popularity">Popularité</option>
      <option value="title">Titre</option>
      <option value="date">Date</option>
    </select>
  `;

  // Insérer avant media-section
  const mediaSection = document.querySelector(".media-section");
  main.insertBefore(sortWrapper, mediaSection);

  const select = sortWrapper.querySelector("#sort-select");
  select.addEventListener("change", (e) => {
    const selected = e.target.value;
    const sorted = sortMedia(mediaList, selected);
    displayMedia(sorted, photographer); // On réaffiche les médias triés
  });
}

function sortMedia(mediaList, criterion) {
  const sorted = [...mediaList]; // Copie pour ne pas modifier l'original

  switch (criterion) {
    case "popularity":
      sorted.sort((a, b) => b.likes - a.likes);
      break;
    case "title":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "date":
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
  }

  return sorted;
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
  addSortDropdown(mediaList, photographer);
  displayMedia(mediaList, photographer);
}

init();
