function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Création du lien
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `${name}`);
    link.classList.add("photographer-link");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");

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

  return { name, picture, getUserCardDOM };
}
