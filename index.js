const button = document.getElementById('button');
const browserWidth = window.innerWidth || document.documentElement.clientWidth;
const browserHeight = window.innerHeight || document.documentElement.clientHeight;
const buttonWidth = button.offsetWidth;
const buttonHeight = button.offsetHeight;
let notset = 0;
const lolz = ['Haha nope! Can\'t catch me', 'You are like tiny turtle, too slow', 'You will never find our treasures!!', 'HAHAHAHAHAAAAA'];


function move() {
    button.style.left = `${Math.floor(Math.random() * (browserWidth - buttonWidth))}px`;
    button.style.top = `${Math.floor(Math.random() * (browserHeight - buttonHeight))}px`;
    button.innerHTML = lolz[notset % lolz.length];
    if (notset == 0) {
        setTimeout(() => {
	    button.removeEventListener('mouseover', move);
        }, 14000);
    }
    notset++;
}

if (typeof addEventListener !== 'undefined') {
    button.addEventListener('mouseover', move, false);
    button.addEventListener('click', () => {
        alert('6420 E Forest Ave 48207\n\n\n\nbe there or be scared');
    });
} else if (typeof attachEvent !== 'undefined') {
    button.attachEvent('onmouseover', move);
    button.attachEvent('onclick', () => {
        alert('6420 E Forest Ave 48207 be there or be scared');
    });
} else {
    button.onmousover = move;
}


window.addEventListener("load", function() {
  var elements = document.getElementsByClassName("rainbowText");
  for (let i = 0; i < elements.length; i++) {
    generateRainbowText(elements[i]);
  }
});

function generateRainbowText(element) {
  var text = element.innerText;
  element.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    let charElem = document.createElement("span");
    charElem.style.color = "hsl(" + (360 * i / text.length) + ",80%,50%)";
    charElem.innerHTML = text[i];
    element.appendChild(charElem);
  }
}
