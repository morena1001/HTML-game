var variables = getComputedStyle(document.documentElement);
var pressed = false;

var currentX = parseInt(variables.getPropertyValue("--x").substring(0, variables.getPropertyValue("--x").length - 2)) - 2;
var currentY = parseInt(variables.getPropertyValue("--y").substring(0, variables.getPropertyValue("--y").length - 2)) - 2;
var currentSquare = document.getElementById("player").parentElement.getElementsByTagName("span")[0].innerHTML;

document.addEventListener("mousemove", function(e) {
    if (pressed) {
        if (currentSquare[0] == "0" && e.clientY >= (currentY - 15) && e.clientY <= (currentY + 73)) {
            document.documentElement.style.setProperty("--y", (e.clientY + 2) + "px");
            
        }
        else if (currentSquare[0] == "1" && e.clientY >= (currentY - 73) && e.clientY <= (currentY + 73)) {
            document.documentElement.style.setProperty("--y", (e.clientY + 2) + "px");
        }
        else if (currentSquare[0] == "2" && e.clientY >= (currentY - 73) && e.clientY <= (currentY + 15)) {
            document.documentElement.style.setProperty("--y", (e.clientY + 2) + "px");
        }

        if (currentSquare[1] == "0" && e.clientX >= (currentX - 15) && e.clientX <= (currentX + 73)) {
            document.documentElement.style.setProperty("--x", (e.clientX + 2) + "px");
        }
        if (currentSquare[1] == "1" && e.clientX >= (currentX - 73) && e.clientX <= (currentX + 73)) {
            document.documentElement.style.setProperty("--x", (e.clientX + 2) + "px");
        }
        else if (currentSquare[1] == "2" && e.clientX >= (currentX - 73) && e.clientX <= (currentX + 15)) {
            document.documentElement.style.setProperty("--x", (e.clientX + 2) + "px");
        }
    }
});

document.getElementById("model").addEventListener("mousedown", function() {
    pressed = true;
});

document.getElementById("player").addEventListener("mousedown", function() {
    pressed = true;
});

document.addEventListener("mouseup", function(e) {
    pressed = false;

    if (e.clientX <= (currentX - 39)) {
        document.documentElement.style.setProperty("--x", (currentX - 58 + 2) + "px");
        currentSquare = currentSquare[0] + (parseInt(currentSquare[1]) - 1);
    }
    else if (e.clientX >= (currentX + 39)) {
        document.documentElement.style.setProperty("--x", (currentX + 58 + 2) + "px");
        currentSquare = currentSquare[0] + (parseInt(currentSquare[1]) + 1);
    }
    else {
        document.documentElement.style.setProperty("--x", (currentX + 2) + "px");
    }

    if (e.clientY <= (currentY - 39)) {
        document.documentElement.style.setProperty("--y", (currentY - 58 + 2) + "px");
        currentSquare = (parseInt(currentSquare[0]) - 1) + currentSquare[1];
    }
    else if (e.clientY >= (currentY + 39)) {
        document.documentElement.style.setProperty("--y", (currentY + 58 + 2) + "px");
        currentSquare = (parseInt(currentSquare[0]) + 1) + currentSquare[1];
    }
    else {
        document.documentElement.style.setProperty("--y", (currentY + 2) + "px");
    }

    currentX = parseInt(variables.getPropertyValue("--x").substring(0, variables.getPropertyValue("--x").length - 2)) - 2;
    currentY = parseInt(variables.getPropertyValue("--y").substring(0, variables.getPropertyValue("--y").length - 2)) - 2;
});
