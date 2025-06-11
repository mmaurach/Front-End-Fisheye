/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// ============================
// TEMPLATE POUR UN MÉDIA
// ============================

function mediaTemplate(media, photographer) {
  // Déstructuration des données du média
  const { title, image, video, likes } = media;
  let cardLike = likes; // compteur de likes spécifique à cette carte

  // Extraction du nom de dossier à partir du nom du photographe
  const folderName = photographer.name.split(" ")[0].replace("-", " ");

  // ==========================================
  // GÉNÉRATION DE LA CARTE MÉDIA POUR LA PAGE
  // ==========================================
  function getMediaCardDOM() {
    const article = document.createElement("article");

    let mediaElement;

    // Si le média est une image
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute(
        "src",
        `./assets/images/${folderName}/${image}`
      );
      mediaElement.setAttribute("alt", title);
    }
    // Si le média est une vidéo
    else {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute(
        "src",
        `./assets/images/${folderName}/${video}`
      );
      mediaElement.setAttribute("controls", true);
    }

    // Accessibilité : rendre l’élément focusable au clavier
    mediaElement.setAttribute("tabindex", "0");
    mediaElement.classList.add("media-clickable");
    mediaElement.style.cursor = "pointer";

    // Création du bloc info (titre + likes)
    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    // Titre du média
    const titleEl = document.createElement("h2");
    titleEl.textContent = title;

    // Bloc de likes
    const likesEl = document.createElement("p");
    likesEl.classList.add("media-likes");

    const span = document.createElement("span");
    span.classList.add("likes-count");
    span.textContent = `${likes}`;

    const iconHeart = document.createElement("span");
    iconHeart.setAttribute("class", "fa-regular fa-heart like-btn");
    iconHeart.setAttribute("role", "button"); // rôle explicite pour les lecteurs d’écran
    iconHeart.setAttribute("tabindex", "0"); // focusable avec Tab
    iconHeart.setAttribute("aria-label", "Ajouter un like"); // description précise pour accessibilité

    // Construction de la structure HTML
    likesEl.appendChild(span);
    likesEl.appendChild(iconHeart);
    mediaInfo.appendChild(titleEl);
    mediaInfo.appendChild(likesEl);
    article.appendChild(mediaElement);
    article.appendChild(mediaInfo);

    // Fonction de bascule like/unlike
    function toggleLike() {
      const isLiked = iconHeart.classList.contains("fa-solid");
      if (isLiked) {
        cardLike -= 1;
        iconHeart.classList.remove("fa-solid");
        iconHeart.classList.add("fa-regular");
        updateTotalLikes(-1);
        iconHeart.setAttribute("aria-label", "Ajouter un like");
      } else {
        cardLike += 1;
        iconHeart.classList.add("fa-solid");
        iconHeart.classList.remove("fa-regular");
        updateTotalLikes(1);
        iconHeart.setAttribute("aria-label", "Retirer le like");
      }
      span.textContent = cardLike;
    }

    // Click avec souris
    iconHeart.addEventListener("click", toggleLike);

    // Activation au clavier
    iconHeart.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleLike();
      }
    });

    return article;
  }

  // ==========================================
  // TEMPLATE POUR L’AFFICHAGE DANS LA LIGHTBOX
  // ==========================================
  function getLightboxDOM() {
    const container = document.createElement("div");
    container.classList.add("lightbox-wrapper");

    const titleEl = document.createElement("p");
    titleEl.textContent = title;
    titleEl.classList.add("lightbox-title");

    let mediaEl;

    if (image) {
      mediaEl = document.createElement("img");
      mediaEl.setAttribute("src", `./assets/images/${folderName}/${image}`);
      mediaEl.setAttribute("alt", title);
    } else {
      mediaEl = document.createElement("video");
      mediaEl.setAttribute("src", `./assets/images/${folderName}/${video}`);
      mediaEl.setAttribute("controls", true);
    }

    container.appendChild(mediaEl);
    container.appendChild(titleEl);
    return container;
  }

  // On retourne les deux méthodes utiles à l’extérieur
  return { getMediaCardDOM, getLightboxDOM, likes };
}
