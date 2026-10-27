/**
 * validation.js - Universal Client-Side Form Validation + EmailJS
 * Handles both the Contact form and the Enquiry form automatically.
 */

// 1. Initialize EmailJS with your Public Key right at the top
(function() {
    emailjs.init({
        publicKey: "rpKyatguyaWgSfCrj", // <-- EmailJS Public Key
    });
})();

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

    // ---------- reCAPTCHA CHECK ----------
    if (typeof grecaptcha !== "undefined") {
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert("Please complete the reCAPTCHA verification before submitting.");
        isValid = false;
      }
    }

    // ---------- SUCCESS & EMAILJS SENDING ----------
    if (isValid) {
      const submitBtn = document.getElementById("submit-btn");
      if (submitBtn) submitBtn.textContent = "Sending...";

      // Your active EmailJS IDs
      const serviceID = "service_knxnq3q";
      const templateID = "template_5i05smt";

      // Send form data through EmailJS using "form"
      emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
          if (submitBtn) submitBtn.textContent = "Send Message";
          
          formStatus.classList.add("success");
          formStatus.textContent = "Message sent successfully!";
          form.reset();

          // Reset the reCAPTCHA widget after successful submission
          if (typeof grecaptcha !== "undefined") {
            grecaptcha.reset();
          }
        }, (err) => {
          if (submitBtn) submitBtn.textContent = "Send Message";
          alert("Failed to send email. Error: " + JSON.stringify(err));
        });
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