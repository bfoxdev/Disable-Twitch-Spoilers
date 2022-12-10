//when local storage is changed, send a message to the content script
browser.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    if (changes.checkbox_titles) {
      browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id, {
            checkbox_titles: changes.checkbox_titles.newValue,
          })
        })
      })
    }
    if (changes.checkbox_timestamps) {
      console.log('checkbox_timestamps changed')
      browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id, {
            checkbox_timestamps: changes.checkbox_timestamps.newValue,
          })
        })
      })
    }
    if (changes.checkbox_percentages) {
      browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id, {
            checkbox_percentages: changes.checkbox_percentages.newValue,
          })
        })
      })
    }
    if (changes.checkbox_preview) {
      browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id, {
            checkbox_preview: changes.checkbox_preview.newValue,
          })
        })
      })
    }
  }
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
