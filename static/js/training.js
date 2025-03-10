document.addEventListener("DOMContentLoaded", function () {
    const textSections = document.querySelectorAll(".app-text");
    const phoneImage = document.getElementById("app-phone-image");

    function updatePhoneImage() {
        let current = null;
        textSections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                current = section;
            }
        });

        if (current) {
            const newImage = current.getAttribute("data-image");
            if (phoneImage.src !== newImage) {
                phoneImage.src = newImage;
            }
        }
    }

    window.addEventListener("scroll", updatePhoneImage);
    updatePhoneImage(); // first image
});


document.querySelectorAll(".vedio-item").forEach(item => {
    item.addEventListener("click", () => {
        const videoUrl = item.getAttribute("data-video");
        window.open(videoUrl, "_blank");
    });
});
