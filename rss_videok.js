
async function embedLatestYouTubeVideo(channelId, containerId) {
    const api = "https://api.rss2json.com/v1/api.json?rss_url=";
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const response = await fetch(api + encodeURIComponent(feedUrl));
    const data = await response.json();
    if (data.items && data.items.length > 0) {
        const videoId = data.items[0].link.split("v=")[1];
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.width = "100%";
        iframe.height = "300";
        iframe.allowFullscreen = true;
        iframe.style.borderRadius = "8px";
        document.getElementById(containerId).appendChild(iframe);
    }
}

// Partizán és ATV legfrissebb videók
embedLatestYouTubeVideo("UCEFpEvuosfPGlV1VyUF6QOA", "partizan-video");
embedLatestYouTubeVideo("UCmP1N3rX7TGV3pJvJsmqW2Q", "atv-video");
