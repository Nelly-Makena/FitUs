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
});
