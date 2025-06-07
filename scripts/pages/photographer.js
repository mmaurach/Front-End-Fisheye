/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// Récupère l'ID du photographe depuis l'URL (ex: photographer.html?id=243)
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Charge les données JSON et retourne l'objet photographe correspondant à l'ID
async function getPhotographerById(id) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers.find((photographer) => photographer.id == id);
}

// Récupère tous les médias liés à un photographe spécifique
async function getMediaByPhotographerId(id) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.media.filter((media) => media.photographerId == id);
}

function displayPhotographer(photographer) {
  const header = document.querySelector(".photograph-header");
  const template = photographerTemplate(photographer);

  // Partie gauche : nom, ville, slogan
  const userDetail = template.getUserDetail();
  const button = document.querySelector(".contact_button");
  header.insertBefore(userDetail, button);

  // Partie droite : photo de profil
  const photoEl = template.getUserPhoto();
  header.appendChild(photoEl);
}

function displayMedia(mediaList, photographer) {
  const mediaSection = document.querySelector(".media-section");
  mediaSection.innerHTML = ""; // Vide la section avant de réinsérer

  let totalLikes = 0;

  mediaList.forEach((media, index) => {
    const template = mediaTemplate(media, photographer);
    const mediaCard = template.getMediaCardDOM();
    totalLikes += template.likes;

    // Lightbox ouverture (clic ou touche Entrée)
    const mediaEl = mediaCard.querySelector(".media-clickable");
    mediaEl.addEventListener("click", () =>
      openLightbox(index, mediaList, photographer)
    );
    mediaEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openLightbox(index, mediaList, photographer);
    });

    mediaSection.appendChild(mediaCard);
  });

  updateTotaux(totalLikes, photographer.price); // Maj likes et tarif
}

function updateTotaux(totalLikes, price) {
  document.querySelector(".total-likes").textContent = `${totalLikes}`;
  document.querySelector(".price").textContent = `${price}€/jour`;
}

// Mise à jour dynamique du total des likes (après clic sur cœur)
function updateTotalLikes(sens) {
  const totalLikesEl = document.querySelector(".total-likes");
  let totalLikes = parseInt(totalLikesEl.textContent);

  if (sens == 1) totalLikesEl.textContent = totalLikes + 1;
  if (sens == -1) totalLikesEl.textContent = totalLikes - 1;
}

function setupSortDropdown(mediaList, photographer) {
  const select = document.querySelector("#sort-select");

  // Lorsque l’utilisateur sélectionne un critère de tri
  select.addEventListener("change", (e) => {
    const selected = e.target.value;
    const sorted = sortMedia(mediaList, selected);
    displayMedia(sorted, photographer); // Réaffiche les médias triés
  });
}

// Trie les médias selon le critère choisi
function sortMedia(mediaList, criterion) {
  const sorted = [...mediaList]; // Copie pour éviter de modifier l'original

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
  const photographerId = getPhotographerIdFromUrl(); // ID via URL
  const photographer = await getPhotographerById(photographerId);

  if (!photographer) {
    console.error("Photographe non trouvé !");
    return;
  }

  const mediaList = await getMediaByPhotographerId(photographerId);

  displayPhotographer(photographer); // Affiche l’en-tête
  setupSortDropdown(mediaList, photographer); // Initialise le tri
  displayMedia(mediaList, photographer); // Affiche les médias
}

init(); // Lancement automatique au chargement de la page
