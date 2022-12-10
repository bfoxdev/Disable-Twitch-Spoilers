// background should monitor for changes in storage and send messages to content script
console.log('background script running')

browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.set({ hideTitles: true })
  browser.storage.local.set({ hideTimestamps: true })
  browser.storage.local.set({ hidePercentages: true })
})

//when local storage is changed, send a message to the content script
browser.storage.onChanged.addListener((changes, areaName) => {
  console.log('changes: ', changes)
  console.log('areaName: ', areaName)
  if (areaName === 'local') {
    if (changes.hideTitles) {
      console.log('hideTitles changed')
      browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
        console.log('tabs: ', tabs)
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id, {
            hideTitles: changes.hideTitles.newValue,
          })
        })
      })
    }
    if (changes.hideTimestamps) {
      console.log('hideTimestamps changed')
      browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
        console.log('tabs: ', tabs)
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id, {
            hideTimestamps: changes.hideTimestamps.newValue,
          })
        })
      })
    }
    if (changes.hidePercentages) {
      console.log('hidePercentages changed')
      browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
        console.log('tabs: ', tabs)
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id, {
            hidePercentages: changes.hidePercentages.newValue,
          })
        })
      })
    }
  }
})
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(
    'tabId: ',
    tabId,
    'changeInfo: ',
    changeInfo,
    'tab: ',
    tab,
    'listener for tabs.onUpdated'
  )

  browser.storage.local.get(['hideTitles', 'hideTimestamps', 'hidePercentages'])
})
