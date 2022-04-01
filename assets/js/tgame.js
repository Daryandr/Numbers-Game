var field = document.getElementById('fieldex');
var order, sec, min, bestm = 60, bests = 60;
var items = document.getElementsByClassName('item');
var clock = document.getElementById('time');
var t;
var score = 0;
var p1 = document.getElementById('pop1');
var p2 = document.getElementById('pop2');

function startg() {
    for (let i = 0; i < 9; i++) { items[i].style.background = "var(--number-color)"; }
    p1.style.display = "none";
    p2.style.display = "none";
    clock.textContent = "00:00";
    sec = 0; min = 0; order = 1;
    time();
    Draw();
}

function randomInt(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}

function set(r) {
    if (r == order) {
        items[order - 1].style.background = "url(../assets/img/" + r + ".png) center";
        items[order - 1].style.backgroundSize = "13.3vmin";
        order++;
        if (order == 10) win();
    }
    else {
       sec += 5;
    }
}

function Draw() {
    var res = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var idx,a,b,sign;
    for (var i = 1; i < 10; i++) {
        var ex = document.createElement("div");
        ex.id = "example";
        const r = res[Math.floor(Math.random() * res.length)];
        idx = res.indexOf(r);
        a = randomInt(1, 10);
        if (idx !== -1) {
            res.splice(idx, 1);
        }
        if (a > r) sign = randomInt(2, 4)
        else sign = randomInt(1, 3);
        if (sign == 1) {
            b = r - a;
            ex.innerHTML = a + "+" + b + "=?";
        }
        else if (sign == 2) {
            b = r + a;
            ex.innerHTML = b + "-" + a + "=?";
        }
        else {
            b = a - r;
            ex.innerHTML = a + "-" + b + "=?";
        }
        ex.onclick = function () { set(r); };
        field.appendChild(ex);
    }
}

function win() {
    clearTimeout(t);
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
    localStorage.setItem('score3', score);
    
    p2.innerHTML = name + ", ты молодец! <br /> Время:" + min + " м. " + sec + " с." + "<br />Лучшее время:" + bestm + " м. " + bests + " с.<br /><button class=\"game\" id=\"startgame\" onclick=\"startg()\">Еще раз</button><br /><button class=\"game\" id=\"startgame\" onclick=\"final()\">Результаты</button>";
    p2.style.display = "inline-block";
}

function loose() {
    clearTimeout(t);
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

function final() {
    c = localStorage.getItem('score3');
    finalscore = Number(x) + Number(b) + Number(c);
    data = name + " " + "\nРезультат: " + finalscore + "\nУровень 1: " + x + "\nУровень 2: " + b + "\nУровень 3: " + c;
    filename = name + "_" + day + "." + mon + "_" + hours + "." + mins + ".txt";
    p2.innerHTML = "Игра пройдена!<br />Твой итоговый балл: " + finalscore +"<br /><button class=\"game\" id=\"startgame\" onclick=\"save()\">Сохранить</button><br /><a class=\"game\" id=\"startgame\" href=\"../index.html\">Меню</a>"
}

var x = localStorage.getItem('score1');
var b = localStorage.getItem('score2');
var c = localStorage.getItem('score3');
var name = localStorage.getItem('name');
var date = new Date();

var hours = date.getHours();
var mins = date.getMinutes();
var day = date.getDay();
var mon = date.getMonth();

var data = name + " " + "\nРезультат: " + finalscore + "\nУровень 1: " + x + "\nУровень 2: " + b + "\nУровень 3: " + c;
var filename = name + "_" + day + "." + mon + "_" + hours + "." + mins + ".txt";
var type = "txt";

function save() {
    download(data, filename, type);

    function download(data, filename, type) {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, filename);
        else {
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

}
