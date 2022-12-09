console.log('background.js loaded')

const removeTitlesScript = `(${removeTitles})()`
const removeTimestampsScript = `(${removeTimestamps})()`
const removePercentagesScript = `(${removePercentages})()`

const removeTitleScript2 = ` document.querySelectorAll('.tw-link > h3').forEach((node) => {  node.style.display = 'none'})document.querySelector('[data-a-target="stream-title"]').style.display ='none'`
const removeTimestampsScript2 = `document.querySelectorAll('.tw-media-card-stat').forEach((node) => {  if (node.textContent.includes(':')) {    node.style.display = 'none'  }})`
const removePercentagesScript2 = `document.querySelectorAll('.seekbar-bar').forEach((node) => {  node.style.display = 'none'})`

function onExecuted(result) {
  console.log(`We executed: ${result}`)
}

function onError(error) {
  console.log(`Error: ${error}`)
}

function removeTimestamps() {
  console.log('running removeTimestamps')
  document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
    if (node.textContent.includes(':')) {
      node.style.display = 'none'
    }
  })
}
function removePercentages() {
  console.log('running removePercentages')
  document.querySelectorAll('.seekbar-bar').forEach((node) => {
    node.style.display = 'none'
  })
}

function removeTitles() {
  console.log('running removeTitles')
  document.querySelectorAll('.tw-link > h3').forEach((node) => {
    node.style.display = 'none'
    console.log(node.style.display)
  })
  document.querySelector('[data-a-target="stream-title"]').style.display =
    'none'
}

const settings = browser.storage.local.get([
  'hideTitles',
  'hideTimestamps',
  'hidePercentages',
])
settings.then((result) => {
  console.log('result: ', result)
  browser.tabs.executeScript({
    code: `console.log('content script running from spoilercontent')`,
    runAt: 'document_end',
  })
  if (result.hideTimestamps) {
    browser.tabs.executeScript({
      code: removeTimestampsScript2,
      runAt: 'document_end',
    })
  }
  if (result.hidePercentages) {
    browser.tabs.executeScript({
      code: removePercentagesScript2,
      runAt: 'document_end',
    })
  }
  if (result.hideTitles) {
    browser.tabs.executeScript({
      code: removeTitleScript2,
      runAt: 'document_end',
    })
  }
})
