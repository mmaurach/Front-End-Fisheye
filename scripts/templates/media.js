function mediaTemplate(media, photographer) {
  const { title, image, video, likes } = media;
  let cardLike = likes;
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

    mediaElement.setAttribute("tabindex", "0"); // pour accessibilité
    mediaElement.classList.add("media-clickable");
    mediaElement.style.cursor = "pointer";

    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    const titleEl = document.createElement("h2");
    titleEl.textContent = title;

    const likesEl = document.createElement("p");
    likesEl.classList.add("media-likes");

    const span = document.createElement("span");
    span.classList.add("likes-count");
    span.textContent = `${likes}`;

    const iconHurt = document.createElement("i");
    iconHurt.setAttribute("class", "fa-solid fa-heart like-btn");
    iconHurt.setAttribute("tabindex", "0");
    iconHurt.setAttribute("aria", "likes");

    likesEl.appendChild(span);
    likesEl.appendChild(iconHurt);
    mediaInfo.appendChild(titleEl);
    mediaInfo.appendChild(likesEl);
    article.appendChild(mediaElement);
    article.appendChild(mediaInfo);

    iconHurt.addEventListener("click", () => {
      const isLiked = iconHurt.classList.contains("fa-solid");
      if (isLiked) {
        cardLike -= 1;
        iconHurt.classList.remove("fa-solid");
        iconHurt.classList.add("fa-regular");
        updateTotalLikes(-1);
      } else {
        cardLike += 1;
        iconHurt.classList.add("fa-solid");
        iconHurt.classList.remove("fa-regular");
        updateTotalLikes(1);
      }
      span.textContent = cardLike;
    });

    return article;
  }

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

  return { getMediaCardDOM, getLightboxDOM, likes };
}
