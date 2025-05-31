
async function embedLatestYouTubeVideo(channelId, containerId, label, fallbackPlaylist = null) {
    const api = "https://api.rss2json.com/v1/api.json?rss_url=";
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const container = document.getElementById(containerId);

    try {
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
            container.appendChild(iframe);
            if (containerId === "partizan-video" || containerId === "atv-video") {
                const bg = document.getElementById("bg-music");
                if (bg) bg.remove();
            }
        } else if (fallbackPlaylist) {
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/videoseries?list=${fallbackPlaylist}`;
            iframe.width = "100%";
            iframe.height = "300";
            iframe.allowFullscreen = true;
            iframe.style.borderRadius = "8px";
            container.appendChild(iframe);
            const bg = document.getElementById("bg-music");
            if (bg) bg.remove();
        } else {
            const fallback = document.createElement("div");
            fallback.textContent = `${label} videó nem elérhető.`;
            fallback.style.color = "#888";
            fallback.style.fontStyle = "italic";
            container.appendChild(fallback);
        }
    } catch (error) {
        if (fallbackPlaylist) {
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/videoseries?list=${fallbackPlaylist}`;
            iframe.width = "100%";
            iframe.height = "300";
            iframe.allowFullscreen = true;
            iframe.style.borderRadius = "8px";
            container.appendChild(iframe);
            const bg = document.getElementById("bg-music");
            if (bg) bg.remove();
        } else {
            const fallback = document.createElement("div");
            fallback.textContent = `${label} videó nem elérhető.`;
            fallback.style.color = "#888";
            fallback.style.fontStyle = "italic";
            container.appendChild(fallback);
        }
    }
}

// Embed videók: Partizán + ATV (playlist fallback)
embedLatestYouTubeVideo("UCEFpEvuosfPGlV1VyUF6QOA", "partizan-video", "Partizán");
embedLatestYouTubeVideo("UCmP1N3rX7TGV3pJvJsmqW2Q", "atv-video", "ATV", "PL_8U9U8dQkjl_C2dEcM44jZ3ntTbIDB3L");
