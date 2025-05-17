function mediaTemplate(media, photographerName) {
  const { title, image, video, likes } = media;
  const mediaSrc = image
    ? `./assets/images/${photographerName}/${image}`
    : `./assets/images/${photographerName}/${video}`;

  function getMediaCardDOM() {
    const article = document.createElement("article");

    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", mediaSrc);
      mediaElement.setAttribute("alt", title);
    } else {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("src", mediaSrc);
      mediaElement.setAttribute("controls", true);
    }

    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    const titleEl = document.createElement("h3");
    titleEl.textContent = title;

    const likesEl = document.createElement("p");
    likesEl.classList.add("media-likes");
    likesEl.innerHTML = `
        <span class="likes-count">${likes}</span>
        <i class="fa-solid fa-heart" aria-label="likes"></i>
      `;

    mediaInfo.appendChild(titleEl);
    mediaInfo.appendChild(likesEl);

    article.appendChild(mediaElement);
    article.appendChild(mediaInfo);

    return article;
  }

  return { getMediaCardDOM };
}
