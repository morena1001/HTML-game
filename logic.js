var leftInterval, rightInterval, upInterval, downInterval, moveInterval;
var variables = getComputedStyle(document.documentElement);

var left = false;
var right = false;
var up = false;
var down = false;
var pressed = false;

// var currentX = variables.getPropertyValue("--x");
// var currentY = variables.getPropertyValue("--y");
var currentX = parseInt(variables.getPropertyValue("--x").substring(0, variables.getPropertyValue("--x").length - 2)) - 2;
var currentY = parseInt(variables.getPropertyValue("--y").substring(0, variables.getPropertyValue("--y").length - 2)) - 2;

document.addEventListener("keydown", function(e) {
    if (!pressed) {
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

document.addEventListener("mousemove", function(e) {
    if (pressed) {
        if (e.clientX <= (currentX + 100) && e.clientX >= (currentX - 100)) {
            document.documentElement.style.setProperty("--x", (e.clientX + 10) + "px");
        }
        if (e.clientY <= currentY + 100 && e.clientY >= currentY - 100) {
            document.documentElement.style.setProperty("--y", (e.clientY + 5) + "px");
        }
    }
});

document.getElementById("model").addEventListener("mousedown", function() {
    pressed = true;
});

document.addEventListener("mouseup", function() {
    pressed = false;
    currentX = parseInt(variables.getPropertyValue("--x").substring(0, variables.getPropertyValue("--x").length - 2)) - 2;;
    currentY = parseInt(variables.getPropertyValue("--y").substring(0, variables.getPropertyValue("--y").length - 2)) - 2;
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
