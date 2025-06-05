function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  resetErrors();
  form.reset();
  modal.style.display = "none";
}

const form = document.getElementById("contactForm");
const firstName = form.firstName;
const lastName = form.lastName;
const email = form.email;
const message = form.message;

// ===== Gestion des erreurs =====

function showError(input, message) {
  const formData = input.parentElement;
  formData.setAttribute("data-error", message);
  formData.setAttribute("data-error-visible", "true");
  input.classList.add("invalid");
}

function clearError(input) {
  const formData = input.parentElement;
  formData.removeAttribute("data-error");
  formData.setAttribute("data-error-visible", "false");
  input.classList.remove("invalid");
}

function resetErrors() {
  [firstName, lastName, email, message].forEach((input) => {
    clearError(input);
  });
}

// ===== Validations individuelles =====

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

function validateMessage(input) {
  const value = input.value.trim();

  if (value.length < 10) {
    showError(input, "Le message doit contenir au moins 10 caractères.");
    return false;
  }

  clearError(input);
  return true;
}

// ===== Validation globale =====

function validateForm() {
  const validFirstName = validateName(firstName, "Prénom");
  const validLastName = validateName(lastName, "Nom");
  const validEmail = validateEmail(email);
  const validMessage = validateMessage(message);

  return validFirstName && validLastName && validEmail && validMessage;
}

// ===== Événements de validation en temps réel =====

firstName.addEventListener("input", () => validateName(firstName, "Prénom"));
lastName.addEventListener("input", () => validateName(lastName, "Nom"));
email.addEventListener("input", () => validateEmail(email));
message.addEventListener("input", () => validateMessage(message));

// ===== Gestion de la soumission =====

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
