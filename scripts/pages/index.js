async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

async function displayPhotographers(photographers) {
  const section = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const template = photographerTemplate(photographer);
    const userCardDOM = template.getUserCardDOM();
    section.appendChild(userCardDOM);
  });
}

async function init() {
  const photographers = await getPhotographers();
  displayPhotographers(photographers);
}

init();
