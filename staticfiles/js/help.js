
function toggleFAQ(button) {
    const faqAnswer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');

    if (faqAnswer.style.display === 'block') {
        faqAnswer.style.display = 'none';
        icon.textContent = '+';
    } else {
        faqAnswer.style.display = 'block';
        icon.textContent = '-';
    }
}