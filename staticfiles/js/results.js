document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('surveyData'));

    if (!data) return;

    const training = parseFloat(data.step0) || 0;
    const nutrition = parseFloat(data.step1) || 0;

    // Total = training + nutrition
    const total = training + nutrition;

    document.getElementById('monthlyTotal').textContent = `ksh.${total.toFixed(2)}`;
    document.getElementById('fitnessCost').textContent = `ksh.${training.toFixed(2)}`;
    document.getElementById('nutritionCost').textContent = `ksh.${nutrition.toFixed(2)}`;
});
