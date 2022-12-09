//this is the background script in the firefox extension
//the script will react to the popup.html and menu.js files to see what the user wants to hide

//this is the content script that will run on the twitch.tv page
//this script will hide the timestamps, percentages, and titles

console.log('background script running')

browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.set({ hideTitles: true })
  browser.storage.local.set({ hideTimestamps: true })
  browser.storage.local.set({ hidePercentages: true })
})

//the listener for the storage changes, breaks on browser.tabs can't send the messages
browser.storage.onChanged.addListener((changes, areaName) => {
  console.log('changes: ', changes)
  console.log('areaName: ', areaName)
  if (areaName === 'local') {
    //check if the changes are for the hideTitles, hideTimestamps, or hidePercentages
    //if so, send a message to the content script to hide the element

    if (changes.hideTitles) {
      changes.hideTitles.newValue === true ? removeTitles() : resetTitles()
      console.log('hideTitles changed')
      browser.tabs.sendMessage(tab.id, {
        hideTitles: changes.hideTitles.newValue,
      })

      browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
        console.log('tabs: ', tabs)
        // tabs.forEach((tab) => {
        //   browser.tabs.sendMessage(tab.id, {
        //     hideTitles: changes.hideTitles.newValue,
        //   })
        // })
      })
    }
    if (changes.hideTimestamps) {
      console.log('hideTimestamps changed')
      browser.tabs.sendMessage(tab.id, {
        hideTimestamps: changes.hideTimestamps.newValue,
      })

      browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
        console.log('tabs: ', tabs)
        // tabs.forEach((tab) => {
        //   browser.tabs.sendMessage(tab.id, {
        //     hideTimestamps: changes.hideTimestamps.newValue,
        //   })
        // })
      })
    }
    if (changes.hidePercentages) {
      console.log('hidePercentages changed')
      browser.tabs.sendMessage(tab.id, {
        hidePercentages: changes.hidePercentages.newValue,
      })

      browser.tabs.query({ url: 'https://www.twitch.tv/*' }).then((tabs) => {
        console.log('tabs: ', tabs)

        // tabs.forEach((tab) => {
        //   browser.tabs.sendMessage(tab.id, {
        //     hidePercentages: changes.hidePercentages.newValue,
        //   })
        // })
      })
    }
  }
})

const removeTitleScript2 = ` document.querySelectorAll('.tw-link > h3').forEach((node) => {  node.style.display = 'none'})document.querySelector('[data-a-target="stream-title"]').style.display ='none'`
const removeTimestampsScript2 = `document.querySelectorAll('.tw-media-card-stat').forEach((node) => {  if (node.textContent.includes(':')) {    node.style.display = 'none'  }})`
const removePercentagesScript2 = `document.querySelectorAll('.seekbar-bar').forEach((node) => {  node.style.display = 'none'})`

// Listen for messages from the background script.
// Call "removeTimestamps()" or "resetTimestamps()" as appropriate.

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

  browser.storage.local
    .get(['hideTitles', 'hideTimestamps', 'hidePercentages'])
    .then((result) => {
      browser.tabs.executeScript({
        code: `console.log('content script running from backgroundjs with')`,
        runAt: 'document_end',
      })
      if (result.hideTimestamps) {
        browser.tabs[tabId].executeScript({
          code: `console.log('inthe hidetimestamp') \n document.querySelectorAll('.tw-media-card-stat').forEach((node) => {  if (node.textContent.includes(':')) {    node.style.display = 'none'  }})`,
          runAt: 'document_end',
        })
      }
      if (result.hidePercentages) {
        browser.tabs.executeScript({
          code: removePercentagesScript2,
          runAt: 'document_end',
        })
        browser.tabs.insertCSS({
          code: `.seekbar-bar {display: none;}`,
        })
      }
      if (result.hideTitles) {
        browser.tabs.executeScript({
          code: removeTitleScript2,
          runAt: 'document_end',
        })
        browser.tabs.insertCSS({
          code: `.tw-link > h3 {display: none;}`,
        })
      }
    })
})

// send a message to the spoilerContent.js script when the user clicks the popup toggles
// the message will be received by the content script and the appropriate function will be called
// to hide or show the timestamps, percentages, and titles

//use tabs.sendMessage to send the message to the content script

function removeTitles() {
  console.log('running removeTitles')
  document.querySelectorAll('.tw-link > h3').forEach((node) => {
    node.style.display = 'none'
    console.log(node.style.display)
  })
  document.querySelector('[data-a-target="stream-title"]').style.display =
    'none'
}
