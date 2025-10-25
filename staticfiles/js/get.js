document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("checkoutModal");
  const closeBtn = document.querySelector(".extra-close");
  const successMsg = document.getElementById("extra-success");
  const processingMsg = document.getElementById("extra-processing");
  const planTitle = document.getElementById("selected-plan-title");
  const planDesc = document.getElementById("selected-plan-desc");

  // Open modal and show selected plan
  document.querySelectorAll(".extra-card-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".extra-card");
      const planName = card.querySelector("h2").innerText;
      const planPrice = card.querySelector(".extra-price").innerText;

      planTitle.innerText = planName + " Demo Checkout";
      planDesc.innerText = `You’re getting the ${planName} for ${planPrice}. (No real payment required.)`;

      modal.style.display = "flex";
      successMsg.style.display = "none";
      processingMsg.style.display = "none";
    });
  });

  // Close modal (X or background)
  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

  // Simulate 10-second payment delay
  document.getElementById("demoCheckoutForm").addEventListener("submit", e => {
    e.preventDefault();
    processingMsg.style.display = "block";
    successMsg.style.display = "none";

    setTimeout(() => {
      processingMsg.style.display = "none";
      successMsg.style.display = "block";
      e.target.reset();
    }, 10000); // 10 seconds delay
  });
});
