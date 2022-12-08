;(async () => {
  console.log('running vodremoverjs')
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  // console.error('running vod-time-remover.js')
  if (window.hasRun) {
    return
  }
  window.hasRun = true

  // The CSS to hide the timestamps on the page. Check to see if there is a colon in the text to confirm it is a timestamp
  const hideStamps = `
    .tw-media-card-stat {
      display: none;
    }
    .vod-seekbar-time-labels {
      display: none !important;
    }
    [data-a-target="player-seekbar-current-time"] {
      display: none;
    }
    .tw-balloon {
      display: none;
    }`

  const hidePercentages = `
    .seekbar-bar {
      display: none;
    }
    [data-a-target="player-seekbar"] {
      display: none;
    }`

  const hideTitles = `
    .tw-link > h3 {
      display: none;
    }
    [data-a-target="stream-title"] {
      display: none;
    }`

  function removeTitles() {
    try {
      document
        .querySelector('head')
        .insertAdjacentHTML(
          'beforeend',
          `<style id="titleRemover">${hideTitles}</style>`
        )
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  function removeTimestamps() {
    try {
      document
        .querySelector('head')
        .insertAdjacentHTML(
          'beforeend',
          `<style id="vodremover">${hideStamps}</style>`
        )
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  function removePercentages() {
    try {
      document
        .querySelector('head')
        .insertAdjacentHTML(
          'beforeend',
          `<style id="percentageremover">${hidePercentages}</style>`
        )
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  function resetCSS() {
    try {
      document.querySelectorAll('#vodremover') != null
        ? document.querySelectorAll('#vodremover').forEach((el) => el.remove())
        : null

      document.querySelectorAll('#percentageremover') != null
        ? document
            .querySelectorAll('#percentageremover')
            .forEach((el) => el.remove())
        : null

      // check to see if a style with an id of titleRemover exists, if it does, remove it
      document.querySelectorAll('#titleRemover') != null
        ? document
            .querySelectorAll('#titleRemover')
            .forEach((el) => el.remove())
        : null

      console.log
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  function removeTimestamps() {
    console.log('checking for timestamps')
    document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
      if (node.textContent.includes(':')) {
        node.style.display = 'none'
      }
    })
  }

  function resetTimestamps() {
    document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
      node.style.display = 'block'
    })
  }

  browser.runtime.onMessage.addListener((onMessage) => {
    console.log('onMessage: ', onMessage)
    if (onMessage.command === 'timestamp') {
      removeTimestamps()
    }
    if (onMessage.command === 'reset') {
      resetCSS()
      resetTimestamps()
    }
    if (onMessage.command === 'percentages') {
      removePercentages()
    }
    if (onMessage.command === 'titles') {
      removeTitles()
    }

    if (onMessage.command === 'all') {
      removeTimestamps()
      removePercentages()
      removeTitles()
    }
  })
})()
