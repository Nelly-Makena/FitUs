function isValidEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function setupRegistrationValidation(formSelector) {
  const form = document.querySelector(formSelector);
  const errorDiv = document.getElementById("regErrors");

  form.addEventListener("submit", function (e) {
    let errors = [];
    const email = form.querySelector('input[name="email"]').value.trim();
    const p1 = form.querySelector('input[name="password1"]').value;
    const p2 = form.querySelector('input[name="password2"]').value;

    if (!isValidEmail(email)) errors.push("Enter a valid email.");
    if (p1.length < 8) errors.push("Password must be at least 8 characters.");
    if (p1 !== p2) errors.push("Passwords do not match.");

    if (errors.length > 0) {
      e.preventDefault();
      errorDiv.innerHTML = errors.join("<br>");
    }
  });
}

function setupLoginValidation(formSelector) {
  const form = document.querySelector(formSelector);
  const errorDiv = document.getElementById("loginErrors");

  form.addEventListener("submit", function (e) {
    let errors = [];
    const email = form.querySelector('input[name="email"]').value.trim();
    const pwd = form.querySelector('input[name="password"]').value;

    if (!isValidEmail(email)) errors.push("Enter a valid email.");
    if (!pwd) errors.push("Password required.");

    if (errors.length > 0) {
      e.preventDefault();
      errorDiv.innerHTML = errors.join("<br>");
    }
  });
}
