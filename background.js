browser.pageAction.onClicked.addListener((tab) => {
    const url = new URL(tab.url);

    // parse URL (get extension slug)
    const parts = url.pathname.split("/");
    const n = parts.length;
    const i = parts.findIndex(
        (v, i) => v === "firefox" && i + 1 < n && parts[i + 1] === "addon"
    );
    const extension = parts[i + 2];

    browser.tabs.create({
        active: true,
        openerTabId: tab.id,
        url: `https://tim-we.github.io/web-ext-inspector/?extension=${extension}`,
    });
});
