var leftInterval, rightInterval, upInterval, downInterval, moveInterval;

var left = false;
var right = false;
var up = false;
var down = false;
var click = false;

var xCoor = 0;
var yCoor = 0;
var i = [];
var j = [xCoor, yCoor];
var m = 0;
var b = 0;
var d = 0;
var count = 0;
var pressed = false;

var variables = getComputedStyle(document.documentElement);

document.addEventListener("keydown", function(e) {
    if (!click) {
        if (e.key == "ArrowLeft" && !left) {
            left = true;
            leftInterval = setInterval(moveLeft, 1);
        }
    
        if (e.key == "ArrowRight" && !right) {
            right = true;
            rightInterval = setInterval(moveRight, 1);
        }
    
        if (e.key == "ArrowUp" && !up) {
            up = true;
            upInterval = setInterval(moveUp, 1);
        }
    
        if (e.key == "ArrowDown" && !down) {
            down = true;
            downInterval = setInterval(moveDown, 1);
        }
    }
});

document.addEventListener("keyup", function(e) {
    if (e.key == "ArrowLeft") {
        left = false;
        clearInterval(leftInterval);
    }

    if (e.key == "ArrowRight") {
        right = false;
        clearInterval(rightInterval);
    }

    if (e.key == "ArrowUp") {
        up = false;
        clearInterval(upInterval);
    }

    if (e.key == "ArrowDown") {
        down = false;
        clearInterval(downInterval);
    }
});

document.addEventListener("mousedown", function(e) {
    if (e.button == 0 && !pressed) {
        xCoor = e.pageX;
        yCoor = e.pageY;
        click = true;
        pressed = true;
        line();
        clearInterval(moveInterval);
        moveInterval = setInterval(moveToPoint, 1);
    }

    if (e.button == 2) {
        window.oncontextmenu = function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        click = false;
        pressed = false;
        count = 0;
        clearInterval(moveInterval);
    }
});

function moveLeft() {
    let xVar = variables.getPropertyValue("--x");
    let x = parseInt(xVar.substring(0, xVar.length - 2)) - 2;
    if (x >= 20)  document.documentElement.style.setProperty("--x", x + "px");
}

function moveRight() {
    let xVar = variables.getPropertyValue("--x");
    let x = parseInt(xVar.substring(0, xVar.length - 2)) + 2;
    if (x <= document.documentElement.scrollWidth)   document.documentElement.style.setProperty("--x", x + "px");
}

function moveUp() {
    let yVar = variables.getPropertyValue("--y");
    let y = parseInt(yVar.substring(0, yVar.length - 2)) - 2;
    if (y >= 20)  document.documentElement.style.setProperty("--y", y + "px");
}

function moveDown() {
    let yVar = variables.getPropertyValue("--y");
    let y = parseInt(yVar.substring(0, yVar.length - 2)) + 2;
    if (y <= document.documentElement.scrollHeight - 7) document.documentElement.style.setProperty("--y", y + "px");
}

function line() {
    let xVar= variables.getPropertyValue("--x");
    let yVar = variables.getPropertyValue("--y");

    let x = parseInt(xVar.substring(0, xVar.length - 2));
    let y = parseInt(yVar.substring(0, yVar.length - 2));

    i = [x, y];
    j = [xCoor, yCoor];

    m = (j[1] - i[1]) / (j[0] - i[0]);
    b = j[1] - (m * j[0]);
    d = Math.sqrt(Math.pow(j[0] - i[0], 2) + Math.pow(j[1] -i[1], 2));

    count = 0.25;
    return;
}

function moveToPoint() {
    let xVar= variables.getPropertyValue("--x");
    let yVar = variables.getPropertyValue("--y");

    let x = parseInt(xVar.substring(0, xVar.length - 2));
    let y = parseInt(yVar.substring(0, yVar.length - 2));
    
    i = [x, y];

    let newX = i[0] - ((count * (0.5 * (i[0] - j[0]))) / d);
    let newY = i[1] - ((count * (0.5 * (i[1] - j[1]))) / d);

    if (Math.abs(xCoor - x) <= 5 && Math.abs(yCoor - y) <= 5) {
        click = false;
        pressed = false;
        count = 0;
        clearInterval(moveInterval);
    }
    else {
        count += 0.25;
        document.documentElement.style.setProperty("--x", newX + "px");
        document.documentElement.style.setProperty("--y", newY + "px");
    }
}
