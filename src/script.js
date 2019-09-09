var powerBar = document.getElementById('power');
var percent = document.getElementById('percent');
var box = document.getElementById('box');
var nextBtn = document.getElementById('btnNext');
var againBtn = document.getElementById('btnAgain');
var startBtn = document.getElementById('btnStart');
var stopBtn = document.getElementById('btnStop');
var retryBtn = document.getElementById('btnRetry');
var circ1 = document.getElementById('circ1');
var circ2 = document.getElementById('circ2');
var circ3 = document.getElementById('circ3');
var value = 0;
var change = 0;
var levelUp = 0;
var rand = 0;
var lvl = 1;
var speed = 10;
var w = 30;
var miss = document.getElementById('miss');
var misses = 3;

window.onLoad = function () {
    rand = Math.floor(Math.random() * 69);
    box.style.left = rand + '%';
    clearInterval(goPower);
};

//determines if meter is inside or outside of the goal lines
function powerControl() {
    btnChange();
    if (change === 0) {
        powerBar.value = powerBar.value + 1;
        value = value + 1;
        if (value >= 101) {
            change = 1
        }
        percent.innerHTML = value + "%";
    }
    if (change === 1) {
        powerBar.value = powerBar.value - 1;
        value = value - 1;
        if (value === 0) {
            change = 0
        }
        percent.innerHTML = value + "%";
    }
}

//determines the success or failure when meter is stopped. Adds progress if success or starts level over when failure
function stopPower() {
    clearInterval(goPower);

    stopBtn.style.visibility = 'hidden';

    if (powerBar.value >= rand && powerBar.value <= rand + w) {
        nextBtn.style.visibility = 'visible';
        againBtn.style.visibility = 'hidden';
        levelUp += 1;
        document.getElementById('check').style.visibility = 'visible';

        $(document).ready(function () {
            $("#check").fadeIn("3000");
            $("#check").fadeOut("3000");
        });

        if (levelUp == 1) {
            circ1.style.fill = 'red';
        }

        if (levelUp == 2) {
            circ2.style.fill = 'red';
        }

        if (levelUp == 3) {
            circ3.style.fill = 'red';
            document.getElementById('winner').style.color = 'white';

            $(document).ready(function () {
                $("#winner").fadeIn("1000");
                $("#winner").animate({left: '1500px'}, 2000);
                $("#winner").fadeOut("5");
            });

            circ1.style.fill = 'white';
            circ2.style.fill = 'white';
            circ3.style.fill = 'white';
            nextLevel();
        }
        document.getElementById('winner').style.left = '0px';
    }

    else if (powerBar.value < rand || powerBar.value > rand + w) {
        nextBtn.style.visibility = 'hidden';
        againBtn.style.visibility = 'visible';
        misses = misses - 1;
        miss.innerHTML = "Misses: " + misses + " left";
        levelUp = 0;
        circ1.style.fill = 'white';
        circ2.style.fill = 'white';
        circ3.style.fill = 'white';

        document.getElementById('redX').style.visibility = 'visible';

        $(document).ready(function () {
            $("#redX").fadeIn("3000")
                .fadeOut("3000");
        });

        if (misses == 0) {
            document.getElementById('loser').style.color = 'white';
            miss.innerHTML = "Misses: " + "0 left";
            bounce = setInterval(function () {
                lose()
            }, 5);

            retryBtn.style.visibility = 'visible';
            againBtn.style.visibility = 'hidden';
        }
    }
}

function gameLost() {
    value = 0;
    change = 0;
    levelUp = 0;
    rand = 0;
    lvl = 1;
    document.getElementById('level').innerHTML = 'level ' + lvl;
    speed = 10;
    w = 30;
    document.getElementById('box').style.width = w + '%';
    misses = 3;
    miss.innerHTML = "Misses: " + misses + "left";
    document.getElementById('loser').style.color = 'transparent';
    retryBtn.style.visibility = 'hidden';
    stopBtn.style.visibility = 'visible';
    next();
}

function startPower() {
    rand = Math.floor(Math.random() * 69);
    box.style.left = rand + '%';
    goPower = setInterval(function () {
        powerControl();
    }, speed);
}

function btnChange() {
    startBtn.style.visibility = 'hidden';
    stopBtn.style.visibility = 'visible';
}

function next() {
    rand = Math.floor(Math.random() * 69);
    box.style.left = rand + '%';
    startPower();
    stopBtn.style.visibility = 'visible';
    nextBtn.style.visibility = 'hidden';
    againBtn.style.visibility = 'hidden';
    powerBar.value = Math.floor(Math.random() * 100);
}

function nextLevel() {
    lvl += 1;
    speed = speed - 1;
    levelUp = 0;
    w = w - 3;
    document.getElementById('box').style.width = w + '%';
    document.getElementById('level').innerHTML = 'level ' + lvl;
}

function lose() {
    $("#loser").fadeIn("1000")
        .fadeOut("1000");
}
