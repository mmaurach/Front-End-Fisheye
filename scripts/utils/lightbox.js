/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// =========================
// GESTION DE LA LIGHTBOX
// =========================

let currentIndex = 0;
let mediaItems = [];
let currentPhotographer = null;

function openLightbox(index, mediaList, photographer) {
  currentIndex = index;
  mediaItems = mediaList;
  currentPhotographer = photographer;

  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");

  displayLightboxMedia(index);

  // === FOCUS TRAP SIMPLE ===
  const focusableSelectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusableEls = Array.from(
    lightbox.querySelectorAll(focusableSelectors)
  );
  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  function trapFocus(e) {
    if (e.key !== "Tab") return;

    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  }

  document.addEventListener("keydown", trapFocus);
  lightbox._trapFocusHandler = trapFocus;

  // Focus initial sur la croix
  firstEl?.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");

  // === ENLÈVE FOCUS TRAP
  if (lightbox._trapFocusHandler) {
    document.removeEventListener("keydown", lightbox._trapFocusHandler);
    delete lightbox._trapFocusHandler;
  }
}

function displayLightboxMedia(index) {
  const container = document.querySelector(".lightbox-content");
  container.innerHTML = "";

  const media = mediaItems[index];
  const mediaDOM = mediaTemplate(media, currentPhotographer).getLightboxDOM();
  container.appendChild(mediaDOM);
}

function nextMedia() {
  currentIndex = (currentIndex + 1) % mediaItems.length;
  displayLightboxMedia(currentIndex);
}

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

  // Fermeture via clic ou clavier
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
    closeBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeLightbox();
      }
    });
  }

  // Suivant
  if (nextBtn) {
    nextBtn.addEventListener("click", nextMedia);
    nextBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        nextMedia();
      }
    });
  }

  // Précédent
  if (prevBtn) {
    prevBtn.addEventListener("click", prevMedia);
    prevBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        prevMedia();
      }
    });
  }

  // Navigation clavier globale
  document.addEventListener("keydown", (e) => {
    const lightbox = document.querySelector(".lightbox");
    if (!lightbox || !lightbox.classList.contains("show")) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowRight":
        nextMedia();
        break;
      case "ArrowLeft":
        prevMedia();
        break;
    }
  });
});
