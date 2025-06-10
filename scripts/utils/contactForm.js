/* eslint-disable no-unused-vars */

const form = document.getElementById("contactForm");
const firstName = form.firstName;
const lastName = form.lastName;
const email = form.email;
const message = form.message;
const submitBtn = document.getElementById("contact-submit"); // Bouton envoyer

// Affiche la modale de contact
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";

  // Focus sur le champ "Prénom" à l'ouverture
  firstName.focus();

  // Ajout d'un écouteur pour la touche Échap
  document.addEventListener("keydown", handleEscapeKey);
}

// Ferme la modale de contact et réinitialise les erreurs et le formulaire
function closeModal() {
  const modal = document.getElementById("contact_modal");
  resetErrors();
  form.reset();
  modal.style.display = "none";

  // Supprimer l'écouteur Échap
  document.removeEventListener("keydown", handleEscapeKey);
}

// Gère la fermeture avec la touche Échap
function handleEscapeKey(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

// Affiche un message d’erreur sur un champ spécifique
function showError(input, message) {
  const formData = input.parentElement;
  formData.setAttribute("data-error", message);
  formData.setAttribute("data-error-visible", "true");
  input.classList.add("invalid");
}

// Supprime le message d’erreur d’un champ
function clearError(input) {
  const formData = input.parentElement;
  formData.removeAttribute("data-error");
  formData.setAttribute("data-error-visible", "false");
  input.classList.remove("invalid");
}

// Supprime les erreurs de tous les champs
function resetErrors() {
  [firstName, lastName, email, message].forEach((input) => {
    clearError(input);
  });
}

// Vérifie la validité d’un prénom ou nom (minimum 2 lettres)
function validateName(input, fieldName) {
  const value = input.value.trim();
  const nameRegex =
    /^(?=(?:.*[A-Za-zÀ-ÖØ-öø-ÿ]){2,})[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

  if (!value) {
    showError(input, `Le champ ${fieldName} est requis.`);
    return false;
  }

  if (!nameRegex.test(value)) {
    showError(input, `${fieldName} invalide. Minimum 2 lettres.`);
    return false;
  }

  clearError(input);
  return true;
}

// Vérifie la validité du champ email via une expression régulière
function validateEmail(input) {
  const value = input.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(value)) {
    showError(input, "Veuillez entrer une adresse email valide.");
    return false;
  }

  clearError(input);
  return true;
}

// Vérifie que le message contient au moins 10 caractères
function validateMessage(input) {
  const value = input.value.trim();

  if (value.length < 10) {
    showError(input, "Le message doit contenir au moins 10 caractères.");
    return false;
  }

  clearError(input);
  return true;
}

// Regroupe toutes les validations pour retourner un booléen global
function validateForm() {
  const validFirstName = validateName(firstName, "Prénom");
  const validLastName = validateName(lastName, "Nom");
  const validEmail = validateEmail(email);
  const validMessage = validateMessage(message);

  return validFirstName && validLastName && validEmail && validMessage;
}

// Validation en direct sur chaque champ
firstName.addEventListener("input", () => validateName(firstName, "Prénom"));
lastName.addEventListener("input", () => validateName(lastName, "Nom"));
email.addEventListener("input", () => validateEmail(email));
message.addEventListener("input", () => validateMessage(message));

// À la soumission, empêche le comportement par défaut et vérifie le formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    console.log("Formulaire valide !");
    console.log({
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
    });

    form.reset();
    closeModal();
  } else {
    console.log("Formulaire invalide");
  }
});

// Déclenche le submit en appuyant sur Entrée ou Espace sur le bouton
submitBtn.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    submitBtn.click();
  }
});
