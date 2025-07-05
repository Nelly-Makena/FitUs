const phoneImage = document.getElementById('phoneImage');
const textBlocks = document.querySelectorAll('.text-block');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const newImage = entry.target.dataset.image;
      phoneImage.src = newImage;
    }
  });
}, { threshold: 0.5 });

textBlocks.forEach(block => observer.observe(block));


document.querySelectorAll(".vedio-item").forEach(item => {
    item.addEventListener("click", () => {
        const videoUrl = item.getAttribute("data-video");
        window.open(videoUrl, "_blank");
    });
});


