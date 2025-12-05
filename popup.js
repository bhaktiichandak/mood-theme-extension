document.getElementById("applyBtn").addEventListener("click", () => {
    const mood = document.getElementById("moodSelector").value;

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: applyMoodTheme,
            args: [mood]
        });
    });
console.log("Popup JS is running");

    chrome.storage.sync.set({selectedMood: mood});
});

function applyMoodTheme(mood) {
    let bg, color, font;
    switch(mood) {
        case "happy":
            bg = "#FFF9C4"; color = "#333"; font = "Comic Sans MS";
            break;
        case "calm":
            bg = "#E0F7FA"; color = "#006064"; font = "Arial";
            break;
        case "focused":
            bg = "#F3E5F5"; color = "#4A148C"; font = "Times New Roman";
            break;
    }
    document.body.style.backgroundColor = bg;
    document.body.style.color = color;
    document.body.style.fontFamily = font;
}
