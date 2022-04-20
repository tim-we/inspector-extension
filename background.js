browser.pageAction.onClicked.addListener((tab) => {
    const url = new URL(tab.url);

    let inspectURL;

    if (url.host === "addons.mozilla.org") {
        inspectURL = getAMOInspectionURL(url);
    } else if (url.host === "chrome.google.com") {
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
    const parts = url.pathname.split("/");
    const n = parts.length;
    const i = parts.findIndex(
        (v, i) => v === "firefox" && i + 1 < n && parts[i + 1] === "addon"
    );
    const extension = parts[i + 2];

    return `https://tim-we.github.io/web-ext-inspector/inspect/firefox/${extension}`;
}

/**
 * @param {URL} url 
 * @returns {string}
 */
 function getCWSInspectionURL(url) {
    const parts = url.pathname.split("/");
    const n = parts.length;
    const i = parts.findIndex(
        (v, i) => v === "webstore" && i + 1 < n && parts[i + 1] === "detail"
    );
    const extensionName = parts[i + 2];
    const extensionId = parts[i + 3];

    return `https://tim-we.github.io/web-ext-inspector/inspect/chrome/${extensionId}`;
}
