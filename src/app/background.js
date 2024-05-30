import DBHandler from "./modules/db-handler";

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension successfully installed.');
  });
  
  chrome.tabs.onActivated.addListener(activeInfo => {
    console.log('Tab activated:', activeInfo);
  });

  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchBlockedGames") {
        const dbHandler = new DBHandler();
        dbHandler.getBlockedGames().then(data => {
            sendResponse({data: data});
        }).catch(error => {
            console.error('Failed to fetch data:', error);
            sendResponse({data: null, error: error.message});
        });
        return true;
    }
});