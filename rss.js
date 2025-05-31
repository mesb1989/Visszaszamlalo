
async function fetchRSS(feedUrl, maxItems = 2) {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
        const data = await response.json();
        return data.items.slice(0, maxItems).map(item => ({
            title: item.title,
            link: item.link,
            description: item.description
        }));
    } catch (error) {
        console.error("RSS fetch error:", error);
        return [];
    }
}

async function loadNews() {
    const feeds = [
        "https://444.hu/feed",
        "https://telex.hu/rss",
        "https://hvg.hu/rss",
        "https://24.hu/feed/"
    ];

    const container = document.getElementById("news-container");
    container.innerHTML = "";

    for (const feed of feeds) {
        const items = await fetchRSS(feed);
        items.forEach(item => {
            const div = document.createElement("div");
            div.className = "news-item";
            div.innerHTML = `
                <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                <p>${item.description.slice(0, 200)}...</p>
            `;
            container.appendChild(div);
        });
    }
}

loadNews();
