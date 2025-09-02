document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('surveyData'));

    if (!data) return;

    document.getElementById('monthlyTotal').textContent = data.step0 || '—';
    document.getElementById('fitnessCost').textContent = data.step1 || '—';
    document.getElementById('nutritionCost').textContent = data.step2 || '—';
    document.getElementById('workoutDays').textContent = data.step2 || '—';
    document.getElementById('commuteTime').textContent = data.step3 || '—';
});
