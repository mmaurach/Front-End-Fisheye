/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// =========================
// GESTION DE LA LIGHTBOX
// =========================

// Index de l’élément actuellement affiché dans la lightbox
let currentIndex = 0;

// Liste des médias du photographe courant
let mediaItems = [];

// Objet contenant les informations du photographe courant
let currentPhotographer = null;

// Affiche la lightbox avec le média correspondant à l’index donné
function openLightbox(index, mediaList, photographer) {
  currentIndex = index;
  mediaItems = mediaList;
  currentPhotographer = photographer;

  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");

  displayLightboxMedia(index); // Affiche le média dans la lightbox
}

// Ferme la lightbox en la masquant et en retirant les attributs d’accessibilité
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
}

// Affiche un média spécifique dans la lightbox
function displayLightboxMedia(index) {
  const container = document.querySelector(".lightbox-content");
  container.innerHTML = ""; // Nettoyage de l'ancien contenu

  const media = mediaItems[index];

  // Récupération de l'élément DOM du média via le template
  const mediaDOM = mediaTemplate(media, currentPhotographer).getLightboxDOM();

  container.appendChild(mediaDOM);
}

// Passe au média suivant (avec boucle en fin de liste)
function nextMedia() {
  currentIndex = (currentIndex + 1) % mediaItems.length;
  displayLightboxMedia(currentIndex);
}

// Passe au média précédent (avec boucle en début de liste)
function prevMedia() {
  currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
  displayLightboxMedia(currentIndex);
}

// ==============================================
// GESTION DES ÉVÉNEMENTS (clavier et souris)
// ==============================================

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".lightbox-close");
  const nextBtn = document.querySelector(".lightbox-next");
  const prevBtn = document.querySelector(".lightbox-prev");

  // Fermeture via clic ou clavier (Entrée ou Espace)
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
    closeBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeLightbox();
      }
    });
  }

  // Navigation suivante
  if (nextBtn) {
    nextBtn.addEventListener("click", nextMedia);
    nextBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        nextMedia();
      }
    });
  }

  // Navigation précédente
  if (prevBtn) {
    prevBtn.addEventListener("click", prevMedia);
    prevBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        prevMedia();
      }
    });
  }

  // Navigation clavier globale uniquement quand la lightbox est ouverte
  document.addEventListener("keydown", (e) => {
    const lightbox = document.querySelector(".lightbox");
    if (!lightbox || !lightbox.classList.contains("show")) return;

    switch (e.key) {
      case "Escape": // Fermer avec la touche Échap
        closeLightbox();
        break;
      case "ArrowRight": // Aller à l’image suivante
        nextMedia();
        break;
      case "ArrowLeft": // Aller à l’image précédente
        prevMedia();
        break;
    }
  });
});
