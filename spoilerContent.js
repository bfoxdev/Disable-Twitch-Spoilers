//this is the content script that runs on the twitch page
//it listens for messages from the background script
//and executes the appropriate script

console.log('spoilerconetent.js loaded')

//function for checking if the title exists repeatedly
function checkTitle() {
  console.log('checkTitle function called')
  if (document.querySelector('[data-a-target="stream-title"]')) {
    console.log('title exists')
    browser.storage.local
      .get(['checkbox_titles', 'checkbox_percentages', 'checkbox_timestamps'])
      .then((result) => {
        console.log('result INSIDE CHECKTITLE: ', result)
        if (
          result.checkbox_titles ||
          result.checkbox_preview ||
          result.checkbox_percentages ||
          result.checkbox_timestamps === true
        ) {
          removeTitle()
        }
        if (result.checkbox_timestamps === true) {
          document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
            if (node.textContent.includes(':')) {
              node.style.display = value
            }
          })
        }
        if (result.checkbox_percentages === true) {
          document.querySelector('.seekbar-bar').style.display = value
          document.querySelector('.seekbar-interaction-area').style.display =
            value
          document.querySelector(
            '[data-a-target="player-seekbar"]'
          ).style.display = value
        }
        if (result.checkbox_preview === true) {
          document
            .querySelectorAll(
              '[data-test-selector="preview-card-thumbnail__image-selector"]'
            )
            .forEach((node) => {
              node.style.display = value
            })
        }
      })
  } else {
    console.log('title does not exist')
    setTimeout(checkTitle, 50)
  }
}

//add the event listener to the content script
browser.runtime.onMessage.addListener((message) => {
  console.log('message: ', message)
  message.checkbox_titles ? removeTitle('none') : removeTitle('block')
  message.checkbox_percentages
    ? removePercentages('none')
    : removePercentages('block')
  message.checkbox_timestamps
    ? removeTimestamps('none')
    : removeTimestamps('block')
  message.checkbox_preview ? removePreview('none') : removePreview('block')

  if (message.loaded === true) {
    console.log('loaded is true')
    //check the dom for using the checkTitle function
    checkTitle()
  }
})

function removeTitle(value) {
  console.log('value: ', value)
  console.log('removeTitle function called')
  document.querySelectorAll('.tw-link > h3').forEach((node) => {
    node.style.display = value
  })
  document.querySelectorAll('.tw-link > a > h3').forEach((node) => {
    node.style.display = value
  })
  document.querySelectorAll('a.tw-link > h3').forEach((node) => {
    node.style.display = value
  })
  document.querySelector('[data-a-target="stream-title"]').style.display = value
}

function removeTimestamps(value) {
  console.log('removeTimestamps function called')
  document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
    if (node.textContent.includes(':')) {
      node.style.display = value
    }
  })
}

function removePercentages(value) {
  console.log('removePercentages function called')
  document.querySelectorAll('.seekbar-bar').forEach((node) => {
    node.style.display = value
  })
  document.querySelectorAll('.seekbar-interaction-area').forEach((node) => {
    node.style.display = value
  })
  document
    .querySelectorAll('[data-a-target="player-seekbar"]')
    .forEach((node) => {
      console.log('node: ', node), (node.style.display = value)
    })
  document.querySelectorAll('.vod-seekbar-time-labels').forEach((node) => {
    node.style.display = value
  })
  document
    .querySelectorAll('[data-a-target="player-seekbar-duration"]')
    .forEach((node) => {
      node.style.display = value
    })
}

function removePreview(value) {
  console.log('removePreview function called')
  document
    .querySelectorAll(
      '[data-test-selector="preview-card-thumbnail__image-selector"]'
    )
    .forEach((node) => {
      node.style.display = value
    })
}
