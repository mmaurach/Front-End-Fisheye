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

  // Ajout du conteneur total likes + prix
  const likesContainer = document.createElement("div");
  likesContainer.classList.add("photographer-likes-container");

  likesContainer.innerHTML = `
    <div class="likes-total">
      <span class="total-likes">${totalLikes}</span>
      <i class="fa-solid fa-heart"></i>
    </div>
    <div class="price">${photographer.price}€/jour</div>
  `;

  document.querySelector("main").appendChild(likesContainer);

  const totalLikesEl = document.querySelector(".total-likes");

  // Ajout des écouteurs de clics sur les cœurs
  document.querySelectorAll(".like-btn").forEach((heart) => {
    heart.addEventListener("click", () => {
      const countSpan = heart.previousElementSibling;
      let currentLikes = parseInt(countSpan.textContent, 10);
      const isLiked = heart.classList.contains("liked");

      if (isLiked) {
        countSpan.textContent = currentLikes - 1;
        totalLikesEl.textContent = parseInt(totalLikesEl.textContent, 10) - 1;
        heart.classList.remove("liked");
      } else {
        countSpan.textContent = currentLikes + 1;
        totalLikesEl.textContent = parseInt(totalLikesEl.textContent, 10) + 1;
        heart.classList.add("liked");
      }
    });
  });
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
