function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  
  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Création du lien
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `${name}`);
    link.classList.add("photographer-link");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt",`photo de ${name}`);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    link.appendChild(img);
    link.appendChild(h2);

    const location = document.createElement("p");
    location.className = "photographer-location";
    location.textContent = `${city}, ${country}`;

    const tagLine = document.createElement("p");
    tagLine.className = "photographer-tagline";
    tagLine.textContent = tagline;

    const priceEl = document.createElement("p");
    priceEl.className = "photographer-price";
    priceEl.textContent = `${price}€/jour`;

    article.appendChild(link);
    article.appendChild(location);
    article.appendChild(tagLine);
    article.appendChild(priceEl);

    return article;
  }
  function getUserDetail() {
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("photographer-info");
  
    const nameEl = document.createElement("h1");
    nameEl.textContent = name;
    infoContainer.appendChild(nameEl);

    const location = document.createElement("p");
    location.className = "photographer-location";
    location.textContent = `${city}, ${country}`;
    infoContainer.appendChild(location);

    const taglineEl = document.createElement("p");
    taglineEl.classList.add("photographer-tagline");
    taglineEl.textContent = tagline;
    
 
    infoContainer.appendChild(taglineEl);
     return infoContainer;
  }
  function getUserPhoto() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt",`photo de ${name}`);

    return img;
  }
  return { getUserCardDOM, getUserDetail, getUserPhoto };
}
