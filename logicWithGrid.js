var pressed = false;
var currentX;
var currentY;
var currentTile;
var currentPiece;

var token;



window.onload = function() {
    var tiles = document.getElementsByClassName("tile");
    for(let i = 0; i < tiles.length; i++) {
        let child = tiles[i].firstElementChild;
        child.addEventListener("mousedown", function() {
            pressed = true;
            currentTile = child.parentElement;
            currentPiece = child;

            token = child.firstElementChild.classList[1];
            // child.firstElementChild.classList.remove(token)
        });
        child.addEventListener("mouseup", function() {
            pressed = false;
            // child.firstElementChild.classList.add(token)
        });
    }
};

document.addEventListener("mousemove", function(e) {
    if(pressed) {
        // console.log(e.clientX + " " + e.clientY + "\t" + (e.clientX - 500) + " " + " " + (e.clientY - 518));
        console.log(currentTile.id[0]);
        document.getElementById(currentTile.id).firstElementChild.style.left = (e.clientX - 490 - (58 * parseInt(currentTile.id[1]))) + "px";
        document.getElementById(currentTile.id).firstElementChild.style.top = (e.clientY - 510 - (58 * parseInt(currentTile.id[0]))) + "px";
        
    }
    else {
        // console.log("HOP");
    }
});

// document.getElementById("piece").addEventListener("mousedown", function() {
//     pressed = true;
//     currentX = parseInt(document.getElementById("piece").offsetLeft) + 8;
//     // currentX = parseInt(variables.getPropertyValue("--x").substring(0, variables.getPropertyValue("--x").length - 2)) - 2;
//     // currentY = parseInt(variables.getPropertyValue("--y").substring(0, variables.getPropertyValue("--y").length - 2)) - 2;
//     // currentX = parseInt(document.getElementById("piece").getAttribute)
//     // console.log(document.getElementById("piece").offsetLeft + " " + document.getElementById("piece").offsetTop);
//     console.log((parseInt(document.getElementById("piece").offsetLeft) + 8) + " " + (parseInt(document.getElementById("piece").offsetTop) + 8));
// });

// document.getElementById("item").addEventListener("mousedown", function() {
//     pressed = true;
//     currentX = parseInt(variables.getPropertyValue("--x").substring(0, variables.getPropertyValue("--x").length - 2)) - 2;
//     currentY = parseInt(variables.getPropertyValue("--y").substring(0, variables.getPropertyValue("--y").length - 2)) - 2;
// });

// document.addEventListener("mousemove", function(e) {
//     if (pressed) {
//         if (currentSquare[0] == "0" && e.clientY >= (currentY - 15) && e.clientY <= (currentY + 73)) {
//             document.documentElement.style.setProperty("--y", (e.clientY + 2) + "px");
            
//         }
//         else if (currentSquare[0] == "4" && e.clientY >= (currentY - 73) && e.clientY <= (currentY + 15)) {
//             document.documentElement.style.setProperty("--y", (e.clientY + 2) + "px");
//         }
//         else if (e.clientY >= (currentY - 73) && e.clientY <= (currentY + 73)) {
//             document.documentElement.style.setProperty("--y", (e.clientY + 2) + "px");
//         }

//         if (currentSquare[1] == "0" && e.clientX >= (currentX - 15) && e.clientX <= (currentX + 73)) {
//             document.documentElement.style.setProperty("--x", (e.clientX + 2) + "px");
//         }
//         else if (currentSquare[1] == "6" && e.clientX >= (currentX - 73) && e.clientX <= (currentX + 15)) {
//             document.documentElement.style.setProperty("--x", (e.clientX + 2) + "px");
//         }
//         else if (e.clientX >= (currentX - 73) && e.clientX <= (currentX + 73)) {
//             document.documentElement.style.setProperty("--x", (e.clientX + 2) + "px");
//         }
//     }
// });

// document.getElementById("color").addEventListener("mousedown", function() {
//     pressed = true;
//     currentX = parseInt(variables.getPropertyValue("--x").substring(0, variables.getPropertyValue("--x").length - 2)) - 2;
//     currentY = parseInt(variables.getPropertyValue("--y").substring(0, variables.getPropertyValue("--y").length - 2)) - 2;
// });

// document.getElementById("piece").addEventListener("mousedown", function() {
//     pressed = true;
//     currentX = parseInt(variables.getPropertyValue("--x").substring(0, variables.getPropertyValue("--x").length - 2)) - 2;
//     currentY = parseInt(variables.getPropertyValue("--y").substring(0, variables.getPropertyValue("--y").length - 2)) - 2;
// });

// document.addEventListener("mouseup", function(e) {
//     pressed = false;
//     console.log(currentX);
//     if (e.clientX <= (currentX - 39) && currentX >= 534) {
//         document.documentElement.style.setProperty("--x", (currentX - 58 + 2) + "px");
//         currentSquare = currentSquare[0] + (parseInt(currentSquare[1]) - 1);
//     }
//     else if (e.clientX >= (currentX + 39) && currentX <= 880) {
//         document.documentElement.style.setProperty("--x", (currentX + 58 + 2) + "px");
//         currentSquare = currentSquare[0] + (parseInt(currentSquare[1]) + 1);
//     }
//     else {
//         document.documentElement.style.setProperty("--x", (currentX + 2) + "px");
//     }

//     if (e.clientY <= (currentY - 39) && currentY >= 551) {
//         document.documentElement.style.setProperty("--y", (currentY - 58 + 2) + "px");
//         currentSquare = (parseInt(currentSquare[0]) - 1) + currentSquare[1];
//     }
//     else if (e.clientY >= (currentY + 39) && currentY <= 723) {
//         document.documentElement.style.setProperty("--y", (currentY + 58 + 2) + "px");
//         currentSquare = (parseInt(currentSquare[0]) + 1) + currentSquare[1];
//     }
//     else {
//         document.documentElement.style.setProperty("--y", (currentY + 2) + "px");
//     }

//     currentX = parseInt(variables.getPropertyValue("--x").substring(0, variables.getPropertyValue("--x").length - 2)) - 2;
//     currentY = parseInt(variables.getPropertyValue("--y").substring(0, variables.getPropertyValue("--y").length - 2)) - 2;
// });
