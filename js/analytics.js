const PROPERTY_ID = '474784597';

async function fetchAnalyticsData() {
    const response = await gapi.client.analyticsdata.properties.runReport(
        { property: `properties/${PROPERTY_ID}` },
        {
            dateRanges: [{ startDate: "yesterday", endDate: "today" }],
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