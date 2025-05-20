function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValid =
      nameRegex.test(firstName) &&
      nameRegex.test(lastName) &&
      emailRegex.test(email);

    if (isValid) {
      console.log("Formulaire soumis :");
      console.log({ firstName, lastName, email, message });

      form.reset();
      closeModal(); // Assure-toi que cette fonction est définie
    } else {
      console.log("Champs invalides.");
    }
  });
});
