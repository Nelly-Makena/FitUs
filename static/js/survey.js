const steps = document.querySelectorAll('.step');
const dots = document.querySelectorAll('.dot');
const nextBtns = document.querySelectorAll('.next');
const backBtns = document.querySelectorAll('.back');
let currentStep = 0;

// Store user input
const userResponses = {};

function showStep(index) {
    steps.forEach((step, i) => {
        step.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
}

function validateStep(stepIndex) {
    const input = steps[stepIndex].querySelector('.input-field');
    if (!input) return true;

    const value = input.value.trim();
    if (value === "") return false;

    if (stepIndex === 2) {
        const num = parseInt(value, 10);
        if (isNaN(num) || num < 1 || num > 7) return false;
    }

    return true;
}

nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = steps[currentStep].querySelector('.input-field');
        if (validateStep(currentStep) && currentStep < steps.length - 1) {
            if (input) {
                userResponses[`step${currentStep}`] = input.value.trim();
            }
            currentStep++;
            showStep(currentStep);
        } else {
            alert("Please enter a valid value before continuing.");
        }

        // If it's the last step, store data
        if (currentStep === steps.length - 1) {
            localStorage.setItem('surveyData', JSON.stringify(userResponses));
        }
    });
});

backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });
});
