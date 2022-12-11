//this is the content script that runs on the twitch page
//it listens for messages from the background script
//and executes the appropriate script

console.log('Twitch Spoiler Avoider loaded');

//function for checking if the title exists repeatedly
function checkTitle() {
  if (document.querySelector('[data-a-target="stream-title"]')) {
    browser.storage.local
      .get(['checkbox_titles', 'checkbox_percentages', 'checkbox_timestamps', 'checkbox_preview'])
      .then(result => {
        if (
          result.checkbox_titles ||
          result.checkbox_preview ||
          result.checkbox_percentages ||
          result.checkbox_timestamps === true
        ) {
          removeTitle('none');
        }
        results.checkbox_preview === true ? removePreview('none') : null;
        results.checkbox_timestamps === true ? removeTimestamps('none') : null;
        results.checkbox_titles === true ? removeTitle('none') : null;
        results.checkbox_percentages === true ? removePercentages('none') : null;
      });
  } else {
    setTimeout(checkTitle, 50);
  }
}

//add the event listener to the content script
browser.runtime.onMessage.addListener(message => {
  if (message.checkbox_percentages === true) {
    removePercentages('none');
  }
  if (message.checkbox_percentages === false) {
    removePercentages('block');
  }
  if (message.checkbox_timestamps === true) {
    removeTimestamps('none');
  }
  if (message.checkbox_timestamps === false) {
    removeTimestamps('block');
  }
  if (message.checkbox_titles === true) {
    removeTitle('none');
  }
  if (message.checkbox_titles === false) {
    removeTitle('block');
  }
  if (message.checkbox_preview === true) {
    removePreview('none');
  }
  if (message.checkbox_preview === false) {
    removePreview('block');
  }
  if (message.loaded === true) {
    checkTitle();
  }
});

function removeTitle(value) {
  document.querySelectorAll('.tw-link > h3').forEach(node => {
    node.style.display = value;
  });
  document.querySelectorAll('.tw-link > a > h3').forEach(node => {
    node.style.display = value;
  });
  document.querySelectorAll('a.tw-link > h3').forEach(node => {
    node.style.display = value;
  });
  document.querySelector('[data-a-target="stream-title"]').style.display = value;
  //change the document title to the streamer name
  if (value === 'block') {
    document.title = document.querySelector('[data-a-target="stream-title"]').textContent;
  }
  if (value === 'none') {
    document.title = 'EZ Spoiler Avoider';
  }
}

function removeTimestamps(value) {
  document.querySelectorAll('.tw-media-card-stat').forEach(node => {
    if (node.textContent.includes(':')) {
      node.style.display = value;
    }
  });
}

function removePercentages(value) {
  document.querySelectorAll('.seekbar-bar').forEach(node => {
    node.style.display = value;
  });
  document.querySelectorAll('.seekbar-interaction-area').forEach(node => {
    node.style.display = value;
  });
  document.querySelectorAll('[data-a-target="player-seekbar"]').forEach(node => {
    node.style.display = value;
  });
  document.querySelectorAll('.vod-seekbar-time-labels').forEach(node => {
    node.style.display = value;
  });
  document.querySelectorAll('[data-a-target="player-seekbar-duration"]').forEach(node => {
    node.style.display = value;
  });
}

function removePreview(value) {
  document.querySelectorAll('[data-test-selector="preview-card-thumbnail__image-selector"]').forEach(node => {
    node.style.display = value;
  });
}
