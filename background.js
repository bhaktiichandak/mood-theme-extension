chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && tab.url.startsWith("http")) {
        const hour = new Date().getHours();
        let mood;
        if (hour >= 6 && hour < 12) mood = "happy";
        else if (hour >= 12 && hour < 18) mood = "focused";
        else mood = "calm";

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: (mood) => {
                let bg, color, font;
                switch(mood) {
                    case "happy": bg = "#FFF9C4"; color = "#333"; font = "Comic Sans MS"; break;
                    case "calm": bg = "#E0F7FA"; color = "#006064"; font = "Arial"; break;
                    case "focused": bg = "#F3E5F5"; color = "#4A148C"; font = "Times New Roman"; break;
                }
                document.body.style.backgroundColor = bg;
                document.body.style.color = color;
                document.body.style.fontFamily = font;
            },
            args: [mood]
        });
    }
});
