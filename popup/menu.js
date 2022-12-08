//js for the popup that tells the content scrips what to run
// Path: popup/menu.js

function listenerTimestamp() {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { command: 'timestamp' })
  })
}

function listenerPercentages() {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { command: 'percentages' })
  })
}

function reset() {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { command: 'reset' })
  })
}

function listenerTitles() {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { command: 'titles' })
  })
}
function listenerTimestampJS() {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { command: 'timestampjs' })
  })
}

function listenerAll() {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { command: 'all' })
  })
}

function switchIcon() {
  console.log('switching icon')
  browser.browserAction.setIcon({
    path: {
      32: 'ez-noglasses-32.webp',
    },
  })
}

//the browser.setIcon should check if there is a style tag with an id of vodremover or percentageremover and if there is, change the icon to the active icon
//if there is not, change the icon to the inactive icon
// browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
//   browser.tabs.sendMessage(tabs[0].id, { command: 'check' })
// })

document
  .getElementById('timestamp')
  .addEventListener('click', listenerTimestamp)
document.getElementById('reset').addEventListener('click', reset)
document
  .getElementById('percentages')
  .addEventListener('click', listenerPercentages)
document.getElementById('titles').addEventListener('click', listenerTitles)
document
  .getElementById('timestampjs')
  .addEventListener('click', listenerTimestampJS)
document.getElementById('all').addEventListener('click', listenerAll)
document.getElementById('icon').addEventListener('click', switchIcon)
