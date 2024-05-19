chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension successfully installed.');
  });
  
  chrome.tabs.onActivated.addListener(activeInfo => {
    console.log('Tab activated:', activeInfo);
  });
