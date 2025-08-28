const steps = document.querySelectorAll('.step');
const dots = document.querySelectorAll('.dot');
const nextBtns = document.querySelectorAll('.next');
const backBtns = document.querySelectorAll('.back');
let currentStep = 0;

function showStep(index) {
    steps.forEach((step, i) => {
        step.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
}

// Validation before moving forward
function validateStep(stepIndex) {
    const input = steps[stepIndex].querySelector('.input-field');
    if (!input) return true;

    const value = input.value.trim();

    // must not be empty
    if (value === "") return false;

    // specific rule for step 3 (days per week)
    if (stepIndex === 2) {
        const num = parseInt(value, 10);
        if (isNaN(num) || num < 1 || num > 7) return false;
    }

    return true;
}

nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (validateStep(currentStep) && currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            alert("Please enter a valid value before continuing.");
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
