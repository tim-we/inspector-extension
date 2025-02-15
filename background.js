browser.pageAction.onClicked.addListener((tab) => {
    const url = new URL(tab.url);

    let inspectURL;

    if (url.host === "addons.mozilla.org") {
        inspectURL = getAMOInspectionURL(url);
    } else if (url.host === "chrome.google.com" || url.host === "chromewebstore.google.com") {
        inspectURL = getCWSInspectionURL(url);
    } else {
        console.error("Unknown host", url.host);
        return;
    }

    browser.tabs.create({
        active: true,
        openerTabId: tab.id,
        url: inspectURL,
    });
});

/**
 * @param {URL} url 
 * @returns {string}
 */
function getAMOInspectionURL(url) {
    // https://addons.mozilla.org/{lang}/firefox/addon/{id}
    const [extensionId] = url.pathname.match(/^\/.+?\/firefox\/addon\/(.+?)\/?$/).slice(1);
    return `https://tim-we.github.io/web-ext-inspector/inspect/firefox/${extensionId}`;
}

/**
 * @param {URL} url 
 * @returns {string}
 */
 function getCWSInspectionURL(url) {
    if (url.host === "chromewebstore.google.com") {
        // https://chromewebstore.google.com/detail/{name}/{id}
        const [extensionName, extensionId] = url.pathname.match(/^\/detail\/(.+?)\/(.+?)\/?$/).slice(1);
        return `https://tim-we.github.io/web-ext-inspector/inspect/chrome/${extensionId}`;
    }
    
    if (url.host === "chrome.google.com") {
        // https://chrome.google.com/webstore/detail/{name}/{id}
        const [extensionName, extensionId] = url.pathname.match(/^\/webstore\/detail\/(.+?)\/(.+?)\/?$/.slice(1));
        return `https://tim-we.github.io/web-ext-inspector/inspect/chrome/${extensionId}`;
    }

    console.error("Unexpected URL: " + url);
}
