var field = document.getElementById('field');
var sec, min, bestm = 60, bests = 60;
var items;
var timer;
var clock = document.getElementById('time');
var t;
var score = 0;
var p1 = document.getElementById('pop1');
var p2 = document.getElementById('pop2');

function startg() {
    dragzone.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        var it = document.createElement('div');
        it.className = "item";
        dragzone.appendChild(it);
    }
    items = document.querySelectorAll(".item");
    p1.style.display = "none";
    p2.style.display = "none";
    clock.textContent = "00:00";
    sec = 0; min = 0;
    time();
    timer = setInterval(() => Draw(), 900);
}

function randomInt(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}

var dragzone = document.getElementById('numbers');

dragzone.addEventListener(`dragenter`, (evt) => {
    evt.preventDefault();
    const activeElement = field.querySelector(`.selected`);
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement && currentElement.classList.contains(`item`);
    if (!isMoveable || activeElement==null) {
        return;
    }
    const nextElement = (currentElement === activeElement.nextElementSibling) ? currentElement.nextElementSibling : currentElement;
    for (let i = 0; i < 9; i++) {
        if (items[i] == nextElement) {
            if (activeElement.src.substr(-5, 1) == i + 1) {
                dragzone.insertBefore(activeElement, nextElement);
                activeElement.id = "select";
                nextElement.remove();
                if (document.getElementsByClassName('item').length == 0) win();
            }
            else {
                sec += 5;
                break;
            }
        }
    }
});

field.addEventListener(`dragstart`, (evt) => {
    event.dataTransfer.effectAllowed = "move";
    evt.target.classList.add(`selected`);
})

dragzone.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);

});

field.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
});


function Draw() {
    var num = document.createElement("img");
    num.id = "num2";
    num.draggable = "true";
    var r = randomInt(1, 10);
    num.src = "../assets/img/" + r + ".png";
    field.appendChild(num);
    num.style.top = randomInt(20, 73) + '%';
    setTimeout(() => {
        if (num.id != "select")
            num.remove();
    }, 9000);
}

function win() {
    clearTimeout(t);
    clearInterval(timer);
    field.innerHTML = "";
    if (min < bestm) { bestm = min; bests = sec; }
    else if (min == bestm) {
        if (sec < bests) { bestm = min; bests = sec; }
    }
    if (bestm == 0 && bests <= 30) score = 50;
    else if (bestm == 0 && bests < 60) score = 40;
    else if (bestm == 1 && bests <= 30) score = 30;
    else if (bestm == 1 && bests < 60) score = 20;
    else if (bestm == 2 && bests <= 30) score = 10;
    else if (bestm == 2 && bests < 60) score = 5;
    localStorage.setItem('score2', score);
    p2.innerHTML = localStorage.getItem('name') + ", ты молодец! <br /> Время:" + min + " м. " + sec + " с." + "<br />Лучшее время:" + bestm + " м. " + bests + " с.<br /><a class=\"game\" id=\"startgame\" href=\"thirdgame.html\">Дальше</a><br /><button class=\"game\" id=\"startgame\" onclick=\"startg()\">Еще раз</button>";
    p2.style.display = "inline-block";
}

function loose() {
    clearTimeout(t);
    clearInterval(timer);
    field.innerHTML = "";
    p2.innerHTML = localStorage.getItem('name') + ", время вышло <br /> Попробуй еще раз!<br /><br /><br /><button class=\"game\" id=\"startgame\" onclick=\"startg()\">Еще раз</button>";
    p2.style.display = "inline-block";
}

function tick() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
}
function add() {
    tick();
    clock.textContent = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
    time();
}
function time() {
    if (min == 3) loose(); else
        t = setTimeout(add, 1000);
}
