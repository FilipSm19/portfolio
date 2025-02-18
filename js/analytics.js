const PROPERTY_ID = '438876512';

async function fetchAnalyticsData() {
    const response = await gapi.client.analyticsdata.properties.runReport(
    {property: `properties/${PROPERTY_ID}`},
    {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [
        { name: "country" },
        { name: "deviceCategory" },
        { name: "pagePath" }
      ],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "averageSessionDuration" }]
    });
  
    renderChart(response.result);
    console.log(response.result);
   }