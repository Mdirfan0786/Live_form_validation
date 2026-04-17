const form = document.getElementById("signup-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const confirmPassInput = document.getElementById("confirm-password");

const submitBtn = document.getElementById("submit-btn");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passError = document.getElementById("password-error");
const confirmPassError = document.getElementById("confirm-password-error");

const strengthText = document.getElementById("password-strength");
const summaryBox = document.getElementById("summary-box");

// ================= Validation =================

function validateName() {
  if (nameInput.value.trim().length < 3) {
    showError(nameInput, nameError, "Name must be at least 3 characters");
    return false;
  }
  showSuccess(nameInput, nameError);
  return true;
}

function validateEmail() {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!pattern.test(emailInput.value.trim())) {
    showError(emailInput, emailError, "Enter a valid email");
    return false;
  }
  showSuccess(emailInput, emailError);
  return true;
}

function validatePassword() {
  if (passInput.value.length < 6) {
    showError(passInput, passError, "Password must be at least 6 characters");
    return false;
  }
  showSuccess(passInput, passError);
  return true;
}

function validateConfirmPassword() {
  if (confirmPassInput.value !== passInput.value) {
    showError(confirmPassInput, confirmPassError, "Passwords do not match");
    return false;
  }
  showSuccess(confirmPassInput, confirmPassError);
  return true;
}

// ================= Password Strength =================

function checkPasswordStrength() {
  const value = passInput.value;

  if (value.length < 6) {
    strengthText.textContent = "Weak";
    strengthText.style.color = "red";
  } else if (value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)) {
    strengthText.textContent = "Strong";
    strengthText.style.color = "green";
  } else {
    strengthText.textContent = "Medium";
    strengthText.style.color = "orange";
  }
}

// ================= Helper =================

function showError(input, errorEl, msg) {
  input.classList.remove("valid");
  input.classList.add("invalid");
  errorEl.textContent = msg;
}

function showSuccess(input, errorEl) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  errorEl.textContent = "";
}

// ================= Button Disable =================

function checkFormValidity() {
  if (
    validateName() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword()
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

// ================= Summary Box =================

function showSummary() {
  let errors = [];

  if (!validateName()) {
    errors.push("Name must be at least 3 characters");
  }

  if (!validateEmail()) {
    errors.push("Enter a valid email");
  }

  if (!validatePassword()) {
    errors.push("Password must be at least 6 characters");
  }

  if (!validateConfirmPassword()) {
    errors.push("Passwords do not match");
  }

  if (errors.length === 0) {
    summaryBox.style.display = "none";
  } else {
    summaryBox.style.display = "block";
    summaryBox.innerHTML = errors.join("<br>");
  }
}

// ================= Local Storage =================

function saveData() {
  localStorage.setItem("name", nameInput.value);
  localStorage.setItem("email", emailInput.value);
}

window.addEventListener("DOMContentLoaded", () => {
  nameInput.value = localStorage.getItem("name") || "";
  emailInput.value = localStorage.getItem("email") || "";
});

// ================= Events =================

nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
passInput.addEventListener("blur", validatePassword);
confirmPassInput.addEventListener("blur", validateConfirmPassword);

// // show summary
// nameInput.addEventListener("input", showSummary);
// emailInput.addEventListener("input", showSummary);
// passInput.addEventListener("input", showSummary);
// confirmPassInput.addEventListener("input", showSummary);

// // button enable/disable
// nameInput.addEventListener("input", checkFormValidity);
// emailInput.addEventListener("input", checkFormValidity);
// passInput.addEventListener("input", checkFormValidity);
// confirmPassInput.addEventListener("input", checkFormValidity);

let inputs = [nameInput, emailInput, passInput, confirmPassInput];

// Show summary and nutton enable/disable
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    showSummary();
    checkFormValidity();
  });
});

// save data
nameInput.addEventListener("input", saveData);
emailInput.addEventListener("input", saveData);

// check Password Strength event
passInput.addEventListener("input", checkPasswordStrength);

// ================= Submit =================

form.addEventListener("submit", (e) => {
  if (
    !(
      validateName() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword()
    )
  ) {
    e.preventDefault();
  } else {
    alert("Registration successful!");
  }
});
