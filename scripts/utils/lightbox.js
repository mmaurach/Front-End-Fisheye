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

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".lightbox-close");
  const nextBtn = document.querySelector(".lightbox-next");
  const prevBtn = document.querySelector(".lightbox-prev");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (nextBtn) nextBtn.addEventListener("click", nextMedia);
  if (prevBtn) prevBtn.addEventListener("click", prevMedia);
});
