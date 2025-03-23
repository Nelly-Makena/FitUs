document.addEventListener("DOMContentLoaded", function () {
    let faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        let question = item.querySelector(".faq-question");
        let answer = item.querySelector(".faq-answer");
        let toggle = item.querySelector(".faq-toggle");

        question.addEventListener("click", function () {
            let isActive = item.classList.contains("active");

            // Close all FAQs first
            faqItems.forEach(i => {
                i.classList.remove("active");
                i.querySelector(".faq-answer").style.display = "none";
                i.querySelector(".faq-toggle").textContent = "+";
            });

            // Toggle current FAQ
            if (!isActive) {
                item.classList.add("active");
                answer.style.display = "block";
                toggle.textContent = "-";
            }
        });
    });
});
