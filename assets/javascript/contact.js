/* Focus Out Validation */
// Function to clear error messages
function clearErrorMessages() {
    const spans = document.querySelectorAll("form span");
    spans.forEach((span) => {
        span.remove();
    });
}

// Function to display error messages
function displayError(fieldId, errorMessage) {
    const errorDisplay = document.createElement("span");
    errorDisplay.classList.add("error");
    errorDisplay.innerHTML = errorMessage;
    document.querySelector(fieldId).after(errorDisplay);
}

// Function to perform field validation
function validateField(fieldId, dataKey, regex, emptyErrorMessage, invalidErrorMessage) {
    const fieldValue = document.querySelector(fieldId).value;
    const validationErrors = {};

    if (!fieldValue) {
        validationErrors[dataKey] = emptyErrorMessage;
    } else {
        if (!regex.test(fieldValue)) {
            validationErrors[dataKey] = invalidErrorMessage;
        } else {
            console.info(dataKey + ": ", fieldValue);
        }
    }

    return validationErrors;
}

// Function to handle form field focusout events
function handleFocusOut(event, fieldId, dataKey, regex, emptyErrorMessage, invalidErrorMessage) {
    event.preventDefault();
    clearErrorMessages();

    const validationErrors = validateField(fieldId, dataKey, regex, emptyErrorMessage, invalidErrorMessage);

    if (Object.keys(validationErrors).length > 0) {
        displayError(fieldId, validationErrors[dataKey]);
    } else {
        console.log("Data sent to backend");
    }
}

// Event listeners for each field
document.querySelector("#full-name").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#full-name", "fullName", /\b[a-zA-Z]{2,}\s[a-zA-Z]{2,}\b/, "Please enter your full name", "Please enter a valid name (first and last name");
});

document.querySelector("#email").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#email", "email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter your email", "Please enter a valid email address");
});

document.querySelector("#subject").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#subject", "subject", null, "Please enter your subject", "Please enter a valid subject");
});

document.querySelector("#message").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#message", "message", null, "Please enter a message", "Your message is too short (min. 10 characters)");
});


/* Submit Validation */
// add eventListener to the submit button
document.querySelector("#submit").addEventListener("click", validateForm);
// validateForm function
function validateForm(event) {
    event.preventDefault();

     // delete error messages to refill the fields
    const spans = document.querySelectorAll("form span");
    spans.forEach((span) => {
        span.remove();
    });

     // store input in data object
     let data = {};
     // store errors in object
     let validationErrors = {};

     // properties for data object
     data.fullName = document.querySelector("#full-name").value;
     data.email = document.querySelector("#email").value;
     data.subject = document.querySelector('#subject').value;
     data.message = document.querySelector("#message").value;

     // Form validation first name
     if (!data.fullName) {
        validationErrors.fullName = "Please enter your full name";
     } else {
        // variable for name Regex
        const nameRegex = /\b[a-zA-Z]{2,}\s[a-zA-Z]{2,}\b/;
// Chance regex (mind. 2 wörter)
        // check if name is valid
        if (!nameRegex.test(data.fullName)) {
            validationErrors.fullName = "Please enter a valid name (first and last name)";
        } else {
            console.info("Full name: ", data.fullName);
        }
     };

     // Form validation email
     if (!data.email) {
        validationErrors.email = "Please enter your email";
     } else {
        // variable for email Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // check if email address is valid
        if (!emailRegex.test(data.email)) {
            validationErrors.email = "Please enter a valid email address";
        } else {
            console.info("Email: ", data.email);
        }
     }

    // Form validation for subject
    if (!data.subject) {
        validationErrors.subject = "Please enter your subject";
     } else {
        // variable for subject Regex
        const subjectRegex = /^[A-Za-z\s]+$/;
        // check if subject name is valid
        if (!subjectRegex.test(data.subject)) {
            validationErrors.subject = "Please enter a valid subject";
        } else {
            console.info("Subject: ", data.subject);
        }
     };

     // Form validation for message
    if (!data.message) {
        validationErrors.message = "Please enter a message"
    } else {
        // check if message is longer than 10 characters 
        if (data.message.length < 11) {
            validationErrors.message = "Your message is too short (min. 10 characters)";
        } else {
            console.info("Message: ", data.message);
        }
    }


    // display error messages in the validationErrors object
    function displayError(validationErrors) {
        if (validationErrors.fullName) {
            // create span Element
            const errorDisplay = document.createElement("span");
            // add class to span
            errorDisplay.classList.add("error");
            // add error to span
            errorDisplay.innerHTML = validationErrors.fullName;
            // add error message
            document.querySelector("#full-name").after(errorDisplay);
        }

        if (validationErrors.email) {
            const errorDisplay = document.createElement("span");
            errorDisplay.classList.add("error");
            errorDisplay.innerHTML = validationErrors.email;
            document.querySelector("#email").after(errorDisplay);
        }

        if (validationErrors.subject) {
            const errorDisplay = document.createElement("span");
            errorDisplay.classList.add("error");
            errorDisplay.innerHTML = validationErrors.subject;
            document.querySelector("#subject").after(errorDisplay);
        }

        if (validationErrors.message) {
            const errorDisplay = document.createElement("span");
            errorDisplay.classList.add("error");
            errorDisplay.innerHTML = validationErrors.message;
            document.querySelector("#message").after(errorDisplay);
        }
    };

    // send data to backend when no errors or displey if there are
    if (Object.keys(validationErrors). length > 0) {
        displayError(validationErrors);
    } else {
        // console.log("Thank you for your message!");
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "block";
        console.log(successMessage);
    }
};