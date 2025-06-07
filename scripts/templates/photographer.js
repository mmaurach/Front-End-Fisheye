/* eslint-disable no-unused-vars */

// ==============================================
// FONCTION FACTORY : photographerTemplate
// Crée des éléments DOM pour représenter un photographe
// ==============================================

function photographerTemplate(data) {
  // On extrait les données nécessaires depuis l'objet photographe
  const { name, portrait, city, country, tagline, price, id } = data;

  // Construction du chemin vers la photo du photographe
  const picture = `./assets/photographers/${portrait}`;

  // ==============================================
  // FONCTION : getUserCardDOM
  // Génère la carte HTML du photographe (affichée sur la page d'accueil)
  // ==============================================
  function getUserCardDOM() {
    const article = document.createElement("article");

    // Création du lien cliquable vers la page du photographe
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`); // On passe l'id dans l'URL
    link.setAttribute("aria-label", `${name}`); // Accessibilité
    link.classList.add("photographer-link");

    // Image du photographe
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `photo de ${name}`);

    // Nom du photographe
    const h2 = document.createElement("h2");
    h2.textContent = name;

    // Ajout de l'image et du nom dans le lien
    link.appendChild(img);
    link.appendChild(h2);

    // Localisation
    const location = document.createElement("p");
    location.className = "photographer-location";
    location.textContent = `${city}, ${country}`;

    // Tagline
    const tagLine = document.createElement("p");
    tagLine.className = "photographer-tagline";
    tagLine.textContent = tagline;

    // Prix par jour
    const priceEl = document.createElement("p");
    priceEl.className = "photographer-price";
    priceEl.textContent = `${price}€/jour`;

    // Ajout de tous les éléments dans la carte
    article.appendChild(link);
    article.appendChild(location);
    article.appendChild(tagLine);
    article.appendChild(priceEl);

    return article;
  }

  // ==============================================
  // FONCTION : getUserDetail
  // Utilisée pour afficher les infos du photographe dans l'entête de sa page
  // ==============================================
  function getUserDetail() {
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("photographer-info");

    // Nom du photographe
    const nameEl = document.createElement("h1");
    nameEl.textContent = name;
    infoContainer.appendChild(nameEl);

    // Localisation
    const location = document.createElement("p");
    location.className = "photographer-location";
    location.textContent = `${city}, ${country}`;
    infoContainer.appendChild(location);

    // Tagline
    const taglineEl = document.createElement("p");
    taglineEl.classList.add("photographer-tagline");
    taglineEl.textContent = tagline;
    infoContainer.appendChild(taglineEl);

    return infoContainer;
  }

  // ==============================================
  // FONCTION : getUserPhoto
  // Retourne l’image seule du photographe (utilisée dans le header)
  // ==============================================
  function getUserPhoto() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `photo de ${name}`);
    return img;
  }

  // On retourne les trois méthodes pour générer les différentes vues du photographe
  return { getUserCardDOM, getUserDetail, getUserPhoto };
}
