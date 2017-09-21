var button = document.getElementById('button');
var browserWidth = window.innerWidth || document.documentElement.clientWidth;
var browserHeight = window.innerHeight || document.documentElement.clientHeight;
var buttonWidth = button.offsetWidth;
var buttonHeight = button.offsetHeight;
var notset = 0;
var lolz = ['Haha nope! Can\'t catch me', 'You are like tiny turtle, too slow', 'You will never find our treasures!!', 'HAHAHAHAHAAAAA'];


function move() {
    button.style.left = Math.floor(Math.random() * (browserWidth - buttonWidth)) + 'px';
    button.style.top = Math.floor(Math.random() * (browserHeight - buttonHeight)) + 'px';
    button.innerHTML = lolz[notset % lolz.length];
    if (notset === 0) {
        setTimeout(() => {
            button.removeEventListener('mouseover', move);
        }, 14000);
    }
    notset++;
}

if (typeof addEventListener !== 'undefined') {
    button.addEventListener('mouseover', move, false);
    button.addEventListener('click', () => {
        document.write('<h1 style="font-size:400px;">6420 E Forest Ave 48207 be there or be scared</h1>');
    });
} else if (typeof attachEvent !== 'undefined') {
    button.attachEvent('onmouseover', move);
    button.attachEvent('onclick', () => {
        document.write('<h1 style="font-size:400px;">6420 E Forest Ave 48207 be there or be scared</h1>');
    });
} else {
    button.onmousover = move;
}


