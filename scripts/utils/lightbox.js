let currentIndex = 0;
let mediaItems = [];
let currentPhotographer = null;

function openLightbox(index, mediaList, photographer) {
  currentIndex = index;
  mediaItems = mediaList;
  currentPhotographer = photographer;

  document.getElementById("lightbox").classList.add("show");
  document.getElementById("lightbox").setAttribute("aria-hidden", "false");
  displayLightboxMedia(index);
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("show");
  document.getElementById("lightbox").setAttribute("aria-hidden", "true");
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

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".lightbox-close");
  const nextBtn = document.querySelector(".lightbox-next");
  const prevBtn = document.querySelector(".lightbox-prev");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
    closeBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeLightbox();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", nextMedia);
    nextBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        nextMedia();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevMedia);
    prevBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        prevMedia();
      }
    });
  }

  // Écoute globale des touches pour navigation clavier
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
