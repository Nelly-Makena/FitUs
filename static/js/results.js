document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ results.js loaded");

    const fitness = parseFloat(localStorage.getItem("fitnessCost")) || 0;
    const nutrition = parseFloat(localStorage.getItem("nutritionCost")) || 0;
    const workoutDays = parseInt(localStorage.getItem("workoutDays")) || 0;
    const commuteTime = parseInt(localStorage.getItem("commuteTime")) || 0;

    const monthlyTotal = fitness + nutrition;

    // Debugging
    console.log("Loaded values:", { fitness, nutrition, workoutDays, commuteTime });

    // Update DOM
    document.getElementById("fitnessCost").textContent = `€${fitness.toFixed(2)}`;
    document.getElementById("nutritionCost").textContent = `€${nutrition.toFixed(2)}`;
    document.getElementById("workoutDays").textContent = workoutDays;
    document.getElementById("commuteTime").textContent = commuteTime + " mins";
    document.getElementById("monthlyTotal").textContent = `€${monthlyTotal.toFixed(2)}`;
});
