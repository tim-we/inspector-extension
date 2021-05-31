browser.pageAction.onClicked.addListener((tab) => {
    const url = new URL(tab.url);
    const extension = url.pathname.replace(/\/+$/, "").split("/").pop();
    browser.tabs.create({
        active: true,
        openerTabId: tab.id,
        url: `https://tim-we.github.io/web-ext-inspector/?extension=${extension}`
    });
});
