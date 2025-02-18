function renderChart(data) {
    const labels = data.rows.map(row => row.dimensionValues[0].value); 
    const values = data.rows.map(row => parseInt(row.metricValues[0].value));
  
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Active Users',
          data: values,
          backgroundColor: 'rgba(244, 244, 35, 0.2)',
          borderColor: 'rgb(243, 214, 27)',
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