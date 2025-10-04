// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // Part 1 & 2: INTERACTIVE FEATURES
    // =========================================================================

    // --- Feature 1: Light/Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    // Function to apply the saved theme on load
    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    // Event listener for the theme toggle button
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save the user's preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Apply theme when the page loads
    applySavedTheme();


    // --- Feature 2: Collapsible FAQ Section ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        // Event listener for clicks on the question
        question.addEventListener('click', () => {
            // Toggle the 'active' class on the parent item
            item.classList.toggle('active');

            // If the item is active, set its max-height to its scroll height,
            // otherwise set it to 0 for the collapse animation.
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
        });
    });


    // =========================================================================
    // Part 3: CUSTOM FORM VALIDATION
    // =========================================================================
    const form = document.getElementById('profile-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    const successMessage = document.getElementById('form-success-message');

    // --- Helper Functions for showing errors/success ---
    const showError = (input, message) => {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const errorMessage = formControl.querySelector('.error-message');
        errorMessage.innerText = message;
        errorMessage.style.display = 'block';
    };

    const showSuccess = (input) => {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
        const errorMessage = formControl.querySelector('.error-message');
        errorMessage.style.display = 'none';
    };

    // --- Validation Logic Functions ---
    const validateEmail = (emailInput) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(emailInput.value).toLowerCase())) {
            showSuccess(emailInput);
            return true;
        } else if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            return false;
        } else {
            showError(emailInput, 'Email is not valid.');
            return false;
        }
    };

    const validateRequired = (input, minLength, fieldName) => {
        if (input.value.trim().length < minLength) {
            showError(input, `${fieldName} must be at least ${minLength} characters.`);
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    };

    const validatePasswordMatch = (pass1, pass2) => {
        if (pass1.value !== pass2.value || pass2.value === '') {
            showError(pass2, 'Passwords do not match.');
            return false;
        } else {
            showSuccess(pass2);
            return true;
        }
    };


    // --- Main Event Listener for Form Submission ---
    form.addEventListener('submit', (event) => {
        // Prevent the form from submitting by default
        event.preventDefault();

        // Hide previous success message
        successMessage.innerText = '';

        // Run all validations and track the overall validity
        const isUsernameValid = validateRequired(username, 3, 'Username');
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validateRequired(password, 8, 'Password');
        const isPasswordMatch = validatePasswordMatch(password, passwordConfirm);

        // If all fields are valid, show success message
        if (isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
            successMessage.innerText = '✅ Your profile has been updated successfully!';
            // Here you would typically send the data to a server
            form.reset();
            // Optional: remove success borders after a few seconds
            setTimeout(() => {
                document.querySelectorAll('.form-control.success').forEach(el => el.classList.remove('success'));
            }, 3000);
        }
    });
});