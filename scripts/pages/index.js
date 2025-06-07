/* eslint-disable no-undef */

// ==============================================
// FONCTION POUR RÉCUPÉRER LES DONNÉES DES PHOTOGRAPHES
// ==============================================

async function getPhotographers() {
  // Récupère les données depuis le fichier JSON local
  const response = await fetch("./data/photographers.json");
  const data = await response.json();

  // Retourne uniquement le tableau des photographes
  return data.photographers;
}

// ==============================================
// FONCTION POUR AFFICHER TOUS LES PHOTOGRAPHES SUR LA PAGE D’ACCUEIL
// ==============================================

async function displayPhotographers(photographers) {
  // Sélection de la section qui va contenir les cartes des photographes
  const section = document.querySelector(".photographer_section");

  // Pour chaque photographe, on génère sa carte HTML et on l’ajoute à la page
  photographers.forEach((photographer) => {
    const template = photographerTemplate(photographer); // Utilise un template pour créer la structure HTML
    const userCardDOM = template.getUserCardDOM(); // Récupère l’élément DOM à insérer
    section.appendChild(userCardDOM); // Ajoute la carte dans la section
  });
}

// ==============================================
// FONCTION INITIALE : CHARGEMENT DES DONNÉES ET AFFICHAGE
// ==============================================

async function init() {
  const photographers = await getPhotographers(); // On récupère la liste des photographes
  displayPhotographers(photographers); // Et on les affiche
}

// Appel immédiat de l’initialisation au chargement de la page
init();
