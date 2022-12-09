//options for the menu
let hideTitles = document.querySelector('input[name=checkbox_titles]')
let hideTimestamps = document.querySelector('input[name=checkbox_timestamps]')
let hidePercentages = document.querySelector('input[name=checkbox_percentages]')

//add event listeners to the checkboxes that will interact with local storage
hideTitles.addEventListener('change', (event) => {
  browser.storage.local.set({ hideTitles: event.target.checked })
})
hideTimestamps.addEventListener('change', (event) => {
  browser.storage.local.set({ hideTimestamps: event.target.checked })
})
hidePercentages.addEventListener('change', (event) => {
  browser.storage.local.set({ hidePercentages: event.target.checked })
})

//get the current state of the checkboxes from local storage
browser.storage.local
  .get(['hideTitles', 'hideTimestamps', 'hidePercentages'])
  .then((result) => {
    hideTitles.checked = result.hideTitles
    hideTimestamps.checked = result.hideTimestamps
    hidePercentages.checked = result.hidePercentages
  })

//check if any of the checkboxes are checked and if so, run a brower action
//add a listener to the checkboxes that will checks to see if anything is checked and if so, run the browser action
console.log(browser)
console.log(browser.browserAction)
browser.browserAction
  .setIcon({
    path: 'ez-32.png',
  })
  .then(onFinished, onReject)
  .then(console.log('donedonedone'))

function onFinished(done) {
  console.log('finished', done)
}

function onReject(error) {
  console.log('error', error)
}
