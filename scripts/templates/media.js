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

    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    const titleEl = document.createElement("h3");
    titleEl.textContent = title;

    const likesEl = document.createElement("p");
    likesEl.classList.add("media-likes");
    
    const span = document.createElement('span');
    span.classList.add("likes-count");
    span.textContent = `${likes}`;
    
    const iconHurt = document.createElement('i');
    iconHurt.setAttribute("class", "fa-solid fa-heart like-btn");
    iconHurt.setAttribute("tabindex","0");
    iconHurt.setAttribute("aria-label","likes");
    
    likesEl.appendChild(span);
    likesEl.appendChild(iconHurt);

    iconHurt.addEventListener("click", () => {
        
        const isLiked = iconHurt.classList.contains("fa-solid");
  
        if (isLiked) {
          cardLike = cardLike - 1;
          span.textContent = cardLike;
          iconHurt.classList.remove("fa-solid");
          iconHurt.classList.add("fa-regular");
          updateTotalLikes(-1);
        } else {
          cardLike = cardLike + 1;
          span.textContent = cardLike;
          iconHurt.classList.add("fa-solid");
          iconHurt.classList.remove("fa-regular");
          updateTotalLikes(1);
        }
  });


    mediaInfo.appendChild(titleEl);
    mediaInfo.appendChild(likesEl);

    article.appendChild(mediaElement);
    article.appendChild(mediaInfo);

    return article;
  }

  return { getMediaCardDOM, likes };
}
