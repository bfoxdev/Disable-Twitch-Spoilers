//on install, set the default values for the local storage
browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.set({
    checkbox_titles: false,
    checkbox_percentages: false,
    checkbox_timestamps: false,
    checkbox_preview: false,
  })
})

//when the twitch tab load status is complete, send a message to the content script
browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    //send a message to the tab that was just updated
    browser.tabs.sendMessage(tabId, {
      loaded: true,
    })
  }
})

//when the local storage is changed, send a message to the content script
browser.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
      tabs.forEach((tab) => {
        browser.tabs.sendMessage(tab.id, {
          [Object.keys(changes)[0]]: changes[Object.keys(changes)[0]].newValue,
        })
      })
    })
  }
})
