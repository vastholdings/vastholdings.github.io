'use strict'

document.addEventListener('DOMContentLoaded', function () {
  var elements = document.getElementsByClassName('rainbowText')
  for (var i = 0; i < elements.length; i++) {
    generateRainbowText(elements[i])
  }
})

function generateRainbowText(element) {
  var text = element.innerText
  element.innerHTML = ''
  for (var i = 0; i < text.length; i++) {
    var charElem = document.createElement('span')
    charElem.style.color = 'hsl(' + (360 * i) / text.length + ',80%,50%)'
    charElem.innerHTML = text[i]
    element.appendChild(charElem)
  }
}

window.addEventListener(
  'keydown',
  function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
  },
  false,
)
