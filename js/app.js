function renderChart(data) {
  for (let i = 0; i < 3; i++) {
    const metricNames = data.metricHeaders.map(header => header.name);
    const labels = data.rows.map(row => row.dimensionValues[i].value);
    const values = data.rows.map(row => parseInt(row.metricValues[i].value));
    const ctx = document.getElementById(`chart${i + 1}`).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: metricNames[i],
          data: values,
          backgroundColor: 'rgb(173, 255, 152)',
          borderColor: 'rgba(0, 156, 0, 0.5);',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}