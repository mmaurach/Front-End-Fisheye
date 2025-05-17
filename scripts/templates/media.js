function mediaTemplate(media, photographerName) {
  const { title, image, video, likes } = media;
  const mediaSrc = image
    ? `./assets/images/${photographerName}/${image}`
    : `./assets/images/${photographerName}/${video}`;

  function getMediaCardDOM() {
    console.log("mediaSrc:", mediaSrc);
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

    const titleEl = document.createElement("h3");
    titleEl.textContent = title;

    const likesEl = document.createElement("p");
    likesEl.textContent = `${likes} ❤️`;

    article.appendChild(mediaElement);
    article.appendChild(titleEl);
    article.appendChild(likesEl);

    return article;
  }

  return { getMediaCardDOM };
}
