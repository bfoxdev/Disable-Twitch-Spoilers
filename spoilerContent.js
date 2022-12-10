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
              node.style.display = 'none'
            }
          })
        }
        if (result.checkbox_percentages === true) {
          document.querySelector('.seekbar-bar').style.display = 'none'
          document.querySelector('.seekbar-interaction-area').style.display =
            'none'
          document.querySelector(
            '[data-a-target="player-seekbar"]'
          ).style.display = 'none'
        }
        if (result.checkbox_preview === true) {
          document
            .querySelectorAll(
              '[data-test-selector="preview-card-thumbnail__image-selector"]'
            )
            .forEach((node) => {
              node.style.display = 'none'
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
  if (message.checkbox_titles === true) {
    console.log('checkbox_titles is true')
    removeTitle()
  }
  if (message.checkbox_titles === false) {
    document.querySelectorAll('.tw-link > h3').forEach((node) => {
      node.style.display = 'block'
    })
    document.querySelector('[data-a-target="stream-title"]').style.display =
      'block'
  }

  if (message.checkbox_timestamps === true) {
    console.log('checkbox_timestamps is true')
    document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
      if (node.textContent.includes(':')) {
        node.style.display = 'none'
      }
    })
  }
  if (message.checkbox_timestamps === false) {
    document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
      if (node.textContent.includes(':')) {
        node.style.display = 'block'
      }
    })
  }
  if (message.checkbox_percentages === true) {
    console.log('checkbox_percentages is true')
    document.querySelector('.seekbar-bar').style.display = 'none'
    document.querySelector('.seekbar-interaction-area').style.display = 'none'
    document.querySelector('[data-a-target="player-seekbar"]').style.display =
      'none'
  }
  if (message.checkbox_percentages === false) {
    document.querySelectorAll('.seekbar-bar').forEach((node) => {
      node.style.display = 'block'
    })
  }
  if (message.checkbox_preview === true) {
    console.log('checkbox_preview is true')
    document
      .querySelectorAll(
        '[data-test-selector="preview-card-thumbnail__image-selector"]'
      )
      .forEach((node) => {
        node.style.display = 'none'
      })
  }
  if (message.checkbox_preview === false) {
    document
      .querySelectorAll(
        '[data-test-selector="preview-card-thumbnail__image-selector"]'
      )
      .forEach((node) => {
        node.style.display = 'block'
      })
  }

  if (message.loaded === true) {
    console.log('loaded is true')
    //check the dom for using the checkTitle function
    checkTitle()
  }
})

function removeTitle() {
  console.log('removeTitle function called')
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

function removePreview() {
  console.log('removePreview function called')
  document
    .querySelectorAll(
      '[data-test-selector="preview-card-thumbnail__image-selector"]'
    )
    .forEach((node) => {
      node.style.display = 'none'
    })
}
