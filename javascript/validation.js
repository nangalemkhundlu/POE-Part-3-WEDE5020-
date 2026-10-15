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



/**
 * validation.js - Custom Client-Side Form Validation
 */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    // Grab form elements matching the enquiry form IDs
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const service = document.getElementById("service");
    const message = document.getElementById("message");
    const terms = document.getElementById("terms");
    const formStatus = document.getElementById("formStatus");

    formStatus.classList.remove("success");

    resetErrors([
      firstName,
      lastName,
      email,
      phone,
      service,
      message,
      terms
    ]);

    // Validate First Name
    if (firstName.value.trim().length < 3) {
      showError(firstName, "firstNameError");
      isValid = false;
    }

    // Validate Last Name
    if (lastName.value.trim().length < 3) {
      showError(lastName, "lastNameError");
      isValid = false;
    }

    // Validate Email
    if (!emailRegex.test(email.value.trim())) {
      showError(email, "emailError");
      isValid = false;
    }

    // Validate Phone
    if (phone.value.trim().length < 10) {
      showError(phone, "phoneError");
      isValid = false;
    }

    // Validate Service Dropdown
    if (service.value === "") {
      showError(service, "serviceError");
      isValid = false;
    }

    // Validate Message
    if (message.value.trim().length < 10) {
      showError(message, "messageError");
      isValid = false;
    }

    // Validate Terms Checkbox
    if (!terms.checked) {
      showError(terms, "termsError");
      isValid = false;
    }

    // Success Action
    if (isValid) {
      formStatus.classList.add("success");
      formStatus.textContent = "Enquiry submitted successfully!";
      form.reset();
    }
  });

  function showError(inputElement, errorSpanId) {
    inputElement.classList.add("error");
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) {
      errorSpan.classList.add("visible");
    }
  }

  function resetErrors(elements) {
    elements.forEach((element) => {
      if (element) element.classList.remove("error");
    });

    const errorSpans = document.querySelectorAll(".error-message");
    errorSpans.forEach((span) => {
      span.classList.remove("visible");
    });
  }

});




/**
 * validation.js - Universal Client-Side Form Validation
 * Handles both the Contact form and the Enquiry form automatically.
 */

document.commonRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const formStatus = document.getElementById("formStatus") || createFormStatus(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    formStatus.classList.remove("success");

    // Detect which page/form we are on based on field IDs
    const isEnquiryPage = document.getElementById("first-name") !== null;

    if (isEnquiryPage) {
      // ---------- ENQUIRY PAGE VALIDATION ----------
      const firstName = document.getElementById("first-name");
      const lastName = document.getElementById("last-name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const service = document.getElementById("service");
      const message = document.getElementById("message");
      const terms = document.getElementById("terms");

      resetErrors([firstName, lastName, email, phone, service, message, terms]);

      if (firstName.value.trim().length < 3) {
        showError(firstName, "firstNameError");
        isValid = false;
      }
      if (lastName.value.trim().length < 3) {
        showError(lastName, "lastNameError");
        isValid = false;
      }
      if (!emailRegex.test(email.value.trim())) {
        showError(email, "emailError");
        isValid = false;
      }
      if (phone.value.trim().length < 10) {
        showError(phone, "phoneError");
        isValid = false;
      }
      if (service.value === "") {
        showError(service, "serviceError");
        isValid = false;
      }
      if (message.value.trim().length < 10) {
        showError(message, "messageError");
        isValid = false;
      }
      if (terms && !terms.checked) {
        showError(terms, "termsError");
        isValid = false;
      }

    } else {
      // ---------- CONTACT PAGE VALIDATION ----------
      const fullName = document.getElementById("fullName");
      const email = document.getElementById("email");
      const service = document.getElementById("serviceSelect");
      const message = document.getElementById("message");

      resetErrors([fullName, email, service, message]);

      if (fullName.value.trim().length < 3) {
        showError(fullName, "nameError");
        isValid = false;
      }
      if (!emailRegex.test(email.value.trim())) {
        showError(email, "emailError");
        isValid = false;
      }
      if (service && service.value === "") {
        showError(service, "serviceError");
        isValid = false;
      }
      if (message.value.trim().length < 10) {
        showError(message, "messageError");
        isValid = false;
      }
    }

    // ---------- SUCCESS ----------
    if (isValid) {
      formStatus.classList.add("success");
      formStatus.textContent = "Form submitted successfully!";
      form.reset();
    }
  });

  function showError(inputElement, errorSpanId) {
    if (!inputElement) return;
    inputElement.classList.add("error");
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) {
      errorSpan.classList.add("visible");
    }
  }

  function resetErrors(elements) {
    elements.forEach((element) => {
      if (element) element.classList.remove("error");
    });

    const errorSpans = document.querySelectorAll(".error-message");
    errorSpans.forEach((span) => {
      span.classList.remove("visible");
    });
  }

  function createFormStatus(parentForm) {
    let statusDiv = document.createElement("div");
    statusDiv.id = "formStatus";
    parentForm.prepend(statusDiv);
    return statusDiv;
  }
});