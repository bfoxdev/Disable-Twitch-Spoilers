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
