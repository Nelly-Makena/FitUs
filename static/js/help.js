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

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".sea-search-box input");
    const searchBtn = document.querySelector(".sea-search-btn");
    const cards = document.querySelectorAll(".card-item");

    function filterCards(query) {
        let matchFound = false;
        cards.forEach(card => {
            const title = card.getAttribute("data-title").toLowerCase();
            if (title.includes(query)) {
                card.style.display = "flex";
                matchFound = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!matchFound && query !== "") {
            console.log("No matching help topic found.");
        }
    }

    // Live filtering as the user is typing
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            cards.forEach(card => {
                card.style.display = "flex";
            });
        } else {
            filterCards(query);
        }
    });

    // Enter key can be search button
    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const query = searchInput.value.trim().toLowerCase();
            filterCards(query);
        }
    });

    // but still accept search button
    searchBtn.addEventListener("click", function () {
        const query = searchInput.value.trim().toLowerCase();
        filterCards(query);
    });

    // Auto-hide messages after 10 seconds
    const messages = document.querySelectorAll('.alert, .message');

    messages.forEach(function(message) {
        // Auto-hide after 10 seconds
        setTimeout(function() {
            message.style.transition = 'opacity 0.5s ease-out';
            message.style.opacity = '0';

            // Remove from DOM after fade out
            setTimeout(function() {
                message.remove();
            }, 500);
        }, 10000); // 10 seconds

        // Optional: Allow manual close by clicking
        message.style.cursor = 'pointer';
        message.addEventListener('click', function() {
            message.style.transition = 'opacity 0.3s ease-out';
            message.style.opacity = '0';
            setTimeout(function() {
                message.remove();
            }, 300);
        });
    });
});