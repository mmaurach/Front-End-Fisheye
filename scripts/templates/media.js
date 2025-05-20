function mediaTemplate(media, photographer) {
  const { title, image, video, likes } = media;

  const folderName = photographer.name.split(" ")[0].replace("-", " ");

  function getMediaCardDOM() {
    const article = document.createElement("article");

    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute(
        "src",
        `./assets/images/${folderName}/${image}`
      );
      mediaElement.setAttribute("alt", title);
    } else {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute(
        "src",
        `./assets/images/${folderName}/${video}`
      );
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

  return { getMediaCardDOM, likes };
}
