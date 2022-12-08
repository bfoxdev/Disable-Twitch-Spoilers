//Layout-sc:first-child
//SCMediaCardStatWrapper
// tw-media-card-stat
// this div has #text or textcontent with a nodeValue element
//check to see if the nodeValue has 'ago', 'yesterday', or 'views' in it

// all divs that have a class of tw-media-card-stat and check if they have a ':' in the text
// if they do, hide them
//

export function checkForTimestamps() {
  console.log('checking for timestamps')
  document.querySelectorAll('.tw-media-card-stat').forEach((node) => {
    if (node.textContent.includes(':')) {
      node.style.display = 'none'
    }
  })
}
