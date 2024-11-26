// favicon.js
function setCustomSettings(faviconUrl, newTitle) {
    if (faviconUrl && newTitle) {
        // Ensure the favicon URL is correctly set
        document.querySelector('link[rel="icon"]').href = getRelativeUrl(faviconUrl);
        localStorage.setItem('selectedFavicon', getRelativeUrl(faviconUrl));
        document.title = newTitle;
        localStorage.setItem('customTitle', newTitle);
    } else {
        var customFaviconUrl = document.getElementById('faviconUrl').value;
        var customTitle = document.getElementById('websiteTitle').value;

        if (customFaviconUrl && customTitle) {
            // Ensure the favicon URL is correctly set
            document.querySelector('link[rel="icon"]').href = getRelativeUrl(customFaviconUrl);
            localStorage.setItem('selectedFavicon', getRelativeUrl(customFaviconUrl));
            document.title = customTitle;
            localStorage.setItem('customTitle', customTitle);
            document.getElementById('faviconUrl').value = '';
            document.getElementById('websiteTitle').value = '';
        }
    }
}

function loadSettings() {
    var selectedFavicon = localStorage.getItem('selectedFavicon');
    var customTitle = localStorage.getItem('customTitle');
    if (selectedFavicon) {
        document.querySelector('link[rel="icon"]').href = selectedFavicon;
    }
    if (customTitle) {
        document.title = customTitle;
    }
}

window.onload = loadSettings;

// Helper function to get the correct relative URL
function getRelativeUrl(url) {
    // Create an anchor element to resolve the relative path
    var a = document.createElement('a');
    a.href = url;
    return a.href;
}
