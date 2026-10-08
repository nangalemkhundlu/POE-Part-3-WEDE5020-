/**
 * validation.js - Custom Client-Side Form Validation
 *
 * This file is used only on contact.html.
 *
 * It demonstrates:
 * 1. Variables
 * 2. Functions
 * 3. Conditions
 * 4. Regular expressions
 * 5. Events
 * 6. classList
 * 7. Form validation
 */

document.addEventListener("DOMContentLoaded", () => {

  // Find the contact form.
  const form = document.getElementById("contactForm");

  // Stop if this is not the contact page.
  if (!form) return;


  /* ---------- EMAIL PATTERN ---------- */

  // This pattern checks for a basic structure such as:
  // student@example.com
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  /* ---------- FORM SUBMISSION EVENT ---------- */

  form.addEventListener("submit", (event) => {

    // Stop the browser from refreshing/submitting the page.
    event.preventDefault();

    // Assume the form is valid until an error is found.
    let isValid = true;


    /* ---------- FIND FORM ELEMENTS ---------- */

    const fullName =
      document.getElementById("fullName");

    const email =
      document.getElementById("email");

    const service =
      document.getElementById("serviceSelect");

    const message =
      document.getElementById("message");

    const formStatus =
      document.getElementById("formStatus");


    /* ---------- RESET OLD ERRORS ---------- */

    formStatus.classList.remove("success");

    resetErrors([
      fullName,
      email,
      service,
      message
    ]);


    /* ---------- VALIDATE FULL NAME ---------- */

    if (fullName.value.trim().length < 3) {
      showError(fullName, "nameError");
      isValid = false;
    }


    /* ---------- VALIDATE EMAIL ---------- */

    if (!emailRegex.test(email.value.trim())) {
      showError(email, "emailError");
      isValid = false;
    }


    /* ---------- VALIDATE SERVICE ---------- */

    if (service.value === "") {
      showError(service, "serviceError");
      isValid = false;
    }


    /* ---------- VALIDATE MESSAGE ---------- */

    if (message.value.trim().length < 10) {
      showError(message, "messageError");
      isValid = false;
    }


    /* ---------- SUCCESS ---------- */

    if (isValid) {
      formStatus.classList.add("success");

      // Clear all entered values after successful validation.
      form.reset();
    }
  });


  /* ========================================================
     FUNCTION: showError
     Adds the error class to an input and displays its message.
     ======================================================== */

  function showError(inputElement, errorSpanId) {

    inputElement.classList.add("error");

    const errorSpan =
      document.getElementById(errorSpanId);

    if (errorSpan) {
      errorSpan.classList.add("visible");
    }
  }


  /* ========================================================
     FUNCTION: resetErrors
     Removes all old error styles/messages before validation.
     ======================================================== */

  function resetErrors(elements) {

    elements.forEach((element) => {
      element.classList.remove("error");
    });

    const errorSpans =
      document.querySelectorAll(".error-message");

    errorSpans.forEach((span) => {
      span.classList.remove("visible");
    });
  }

});