async function fetchAnalyticsData() {
    const response = await gapi.client.analyticsdata.properties.runReport({
        property: "properties/438876512",
        requestBody: {
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            dimensions: [{ name: "country" }, { name: "deviceCategory" }, {
                name: "pagePath"
            }],
            metrics: [{ name: "activeUsers" }, { name: "sessions" }, {
                name:
                    "averageSessionDuration"
            }]
        }
    });
    console.log(response.result);
}