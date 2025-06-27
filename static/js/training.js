

document.querySelectorAll(".vedio-item").forEach(item => {
    item.addEventListener("click", () => {
        const videoUrl = item.getAttribute("data-video");
        window.open(videoUrl, "_blank");
    });
});
