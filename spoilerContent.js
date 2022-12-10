//this is the content script that runs on the twitch page
//it listens for messages from the background script
//and executes the appropriate script

console.log('spoilerconetent.js loaded')

const removeTitleScript2 = ` document.querySelectorAll('.tw-link > h3').forEach((node) => {  node.style.display = 'none'})document.querySelector('[data-a-target="stream-title"]').style.display ='none'`
const removeTimestampsScript2 = `document.querySelectorAll('.tw-media-card-stat').forEach((node) => {  if (node.textContent.includes(':')) {    node.style.display = 'none'  }})`
const removePercentagesScript2 = `document.querySelectorAll('.seekbar-bar').forEach((node) => {  node.style.display = 'none'})`

function onExecuted(result) {
  console.log(`We executed: ${result}`)
}

function onError(error) {
  console.log(`Error: ${error}`)
}

//add the event listener to the content script
browser.runtime.onMessage.addListener((message) => {
  console.log('message: ', message)
  if (message.hideTitles === true) {
    console.log('hideTitles is true')
    document.querySelectorAll('.tw-link > h3').forEach((node) => {
      node.style.display = 'none'
    })
    document.querySelector('[data-a-target="stream-title"]').style.display =
      'none'
  }
  if (message.hideTitles === false) {
    document.querySelectorAll('.tw-link > h3').forEach((node) => {
      node.style.display = 'block'
    })
    document.querySelector('[data-a-target="stream-title"]').style.display =
      'block'
  }

  if (message.hideTimestamps === true) {
    console.log('hideTimestamps is true')
    document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
      if (node.textContent.includes(':')) {
        node.style.display = 'none'
      }
    })
  }
  if (message.hideTimestamps === false) {
    document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
      if (node.textContent.includes(':')) {
        node.style.display = 'block'
      }
    })
  }
  if (message.hidePercentages === true) {
    console.log('hidePercentages is true')
    document.querySelector('.seekbar-bar').style.display = 'none'
    document.querySelector('[data-a-target="player-seekbar"]').style.display =
      'none'
  }
  if (message.hidePercentages === false) {
    document.querySelectorAll('.seekbar-bar').forEach((node) => {
      node.style.display = 'block'
    })
  }
})

function removeTitle() {
  console.log('removeTitle function called')
  console.log(document)
  document.querySelectorAll('.tw-link > h3').forEach((node) => {
    node.style.display = 'none'
  })
  document.querySelector('[data-a-target="stream-title"]').style.display =
    'none'
}

function removeTimestamps() {
  console.log('removeTimestamps function called')
  document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
    if (node.textContent.includes(':')) {
      node.style.display = 'none'
    }
  })
}

function removePercentages() {
  console.log('removePercentages function called')
  document.querySelectorAll('.seekbar-bar').forEach((node) => {
    node.style.display = 'none'
  })
}
