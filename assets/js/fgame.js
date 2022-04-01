var field = document.getElementById('field');
var order,sec,min,bestm=60,bests=60;
var items = document.getElementsByClassName('item');
var timer;
var clock = document.getElementById('time');
var t;
var score=0;
var p1 = document.getElementById('pop1');
var p2 = document.getElementById('pop2');

function startg() {
    for (let i = 0; i < 9; i++) { items[i].style.background = "var(--number-color)";}
    p1.style.display = "none";
    p2.style.display = "none";
    clock.textContent = "00:00";
    sec = 0; min = 0; order = 1;
    time();
    timer = setInterval(() => Draw(), 400);
}

function randomInt(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}

function set(num, r) {
    if (r == order) {
        num.remove();
        items[order - 1].style.background = "url(../assets/img/"+r+".png) center";
        items[order - 1].style.backgroundSize = "13.3vmin";
        order++;
        if (order == 10) win();
    }
    else {
        sec += 5;
    }
}

function Draw() {
    var num = document.createElement("img");
    num.id = "num";
    var r = randomInt(1, 10);
    num.src = "../assets/img/" + r + ".png";
    num.onclick = function () { set(num,r); };
    field.appendChild(num);
    num.style.left =randomInt(1,94) + '%';
    num.style.top = randomInt(20, 73) + '%';
    setTimeout(() => { num.remove() }, 4000);
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
    localStorage.setItem('score1', score);
    p2.innerHTML = localStorage.getItem('name') + ", ты молодец! <br /> Время:" + min + " м. " + sec + " с." + "<br />Лучшее время:" + bestm + " м. " + bests + " с.<br /><a class=\"game\" id=\"startgame\" href=\"secondgame.html\">Дальше</a><br /><button class=\"game\" id=\"startgame\" onclick=\"startg()\">Еще раз</button>";
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


