//options for the menu
let checkbox_titles = document.querySelector('input[name=checkbox_titles]');
let checkbox_timestamps = document.querySelector('input[name=checkbox_timestamps]');
let checkbox_percentages = document.querySelector('input[name=checkbox_percentages]');
let checkbox_preview = document.querySelector('input[name=checkbox_preview]');
let settings = [checkbox_titles, checkbox_timestamps, checkbox_percentages, checkbox_preview];

//change the icon if any checkboxes are unchecked
function checkIcon() {
  browser.storage.local
    .get(['checkbox_titles', 'checkbox_timestamps', 'checkbox_percentages', 'checkbox_preview'])
    .then(result => {
      if (
        result.checkbox_titles === true ||
        result.checkbox_timestamps === true ||
        result.checkbox_percentages === true ||
        result.checkbox_preview === true
      ) {
        browser.browserAction.setIcon({
          path: {
            16: '../icons/ez-32.png',
            32: '../icons/ez-32.png',
            48: '../icons/ez-32.png',
            64: '../icons/ez-32.png',
            128: '../icons/ez-32.png',
          },
        });
      } else {
        browser.browserAction.setIcon({
          path: {
            16: '../icons/hard-32.png',
            32: '../icons/hard-32.png',
            48: '../icons/hard-32.png',
            64: '../icons/hard-32.png',
            128: '../icons/hard-32.png',
          },
        });
      }
    });
} //add an event listener to all of the elements in the settings array
settings.forEach(setting => {
  setting.addEventListener('change', event => {
    console.log(event.target.name, event.target.checked, 'event.target.name, event.target.checked');
    browser.storage.local.set({ [event.target.name]: event.target.checked });
    checkIcon();
  });
});

//get the current settings from storage and set the checkboxes accordingly
browser.storage.local
  .get(['checkbox_titles', 'checkbox_timestamps', 'checkbox_percentages', 'checkbox_preview'])
  .then(result => {
    checkbox_titles.checked = result.checkbox_titles;
    checkbox_timestamps.checked = result.checkbox_timestamps;
    checkbox_percentages.checked = result.checkbox_percentages;
    checkbox_preview.checked = result.checkbox_preview;
  });
