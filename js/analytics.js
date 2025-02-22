const PROPERTY_ID = '438876512';

async function fetchAnalyticsData() {
  const response = await gapi.client.analyticsdata.properties.runReport(
    { property: `properties/${PROPERTY_ID}` },
    {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [
        { name: "country" },
        { name: "city" },
        { name: "deviceCategory" },
      ],
      metrics: [
        { name: "activeUsers" },
        { name: "averageSessionDuration" },
        { name: "sessions" }]
    });

  renderChart(response.result);
  console.log(response.result);
}