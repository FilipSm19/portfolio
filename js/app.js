function renderChart(data) {
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Broj korisnika po zemlji',
                data: data.values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    let userHistory = [1, 0, 1, 1]; // Simulirani podaci o korisniku
    let pages = [
        { name: "/home", vector: [1, 1, 0, 1] },
        { name: "/about", vector: [0, 1, 1, 0] },
        { name: "/products", vector: [1, 0, 1, 1] }
    ];
    let recommendations = getRecommendations(userHistory, pages);
    displayRecommendations(recommendations);
});