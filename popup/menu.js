//options for the menu
let checkbox_titles = document.querySelector('input[name=checkbox_titles]')
let checkbox_timestamps = document.querySelector(
  'input[name=checkbox_timestamps]'
)
let checkbox_percentages = document.querySelector(
  'input[name=checkbox_percentages]'
)
let checkbox_preview = document.querySelector('input[name=checkbox_preview]')
let settings = [
  checkbox_titles,
  checkbox_timestamps,
  checkbox_percentages,
  checkbox_preview,
]

//change the icon if any checkboxes are unchecked
function checkIcon() {
  browser.storage.local
    .get([
      'checkbox_titles',
      'checkbox_timestamps',
      'checkbox_percentages',
      'checkbox_preview',
    ])
    .then((result) => {
      if (
        result.checkbox_titles === false ||
        result.checkbox_timestamps === false ||
        result.checkbox_percentages === false ||
        result.checkbox_preview === false
      ) {
        browser.browserAction.setIcon({
          path: {
            16: '../icons/ez-noglasses-32v2.png',
            32: '../icons/ez-noglasses-32v2.png',
            48: '../icons/ez-noglasses-32v2.png',
            64: '../icons/ez-noglasses-32v2.png',
            128: '../icons/ez-noglasses-32v2.png',
          },
        })
      } else {
        browser.browserAction.setIcon({
          path: {
            16: '../icons/ez-32.png',
            32: '../icons/ez-32.png',
            48: '../icons/ez-32.png',
            64: '../icons/ez-32.png',
            128: '../icons/ez-32.png',
          },
        })
      }
    })
}
//add an event listener to all of the elements in the settings array

//add an event listener to all of the elements in the settings array
settings.forEach((setting) => {
  setting.addEventListener('change', (event) => {
    //set the current state of the checkboxes from local storage
    console.log([event.target.name], event.target.checked, 'event.target.name')
    browser.storage.local.set({ [event.target.name]: event.target.checked })
    checkIcon()
  })
})

//add event listeners to the checkboxes that will interact with local storage
// checkbox_titles.addEventListener('change', (event) => {
//   browser.storage.local.set({ checkbox_titles: event.target.checked })
// })
// checkbox_timestamps.addEventListener('change', (event) => {
//   browser.storage.local.set({ checkbox_timestamps: event.target.checked })
// })
// checkbox_percentages.addEventListener('change', (event) => {
//   browser.storage.local.set({ checkbox_percentages: event.target.checked })
// })

// checkbox_preview.addEventListener('change', (event) => {
//   browser.storage.local.set({ checkbox_preview: event.target.checked })
// })

//get the current state of the checkboxes from local storage
//check if any of the checkboxes are checked and if so, run a brower action
//add a listener to the checkboxes that will checks to see if anything is checked and if so, run the browser action
