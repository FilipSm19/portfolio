function getRecommendations(userHistory, pages) {
    return pages.map(page => ({
        page: page.name,
        similarity: cosineSimilarity(userHistory, page.vector)
    })).sort((a, b) => b.similarity - a.similarity);
}
function displayRecommendations(recommendations) {
    const list = document.getElementById('recommendations-list');
    list.innerHTML = "";
    recommendations.forEach(rec => {
        let listItem = document.createElement("li");
        listItem.textContent = rec.page;
        list.appendChild(listItem);
    });
}