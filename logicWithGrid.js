var pressed = false;
var moves = 3;
var health = 100;
var attack = 0;
var blockPower = 0;
var currentX;
var currentY;
var currentTile;
var currentPiece;

var token;
var heal = 10;
var shortAttack = 10;
var longAttack = 15;
var block = 5



window.onload = function() {
    document.getElementById("moves-text").innerHTML = moves;
    var tiles = document.getElementsByClassName("tile");
    for(let i = 0; i < tiles.length; i++) {
        let child = tiles[i].firstElementChild;
        child.addEventListener("mousedown", function() {
            if(moves > 0 && child.parentElement.getAttribute("data-matched") == "false") {
                pressed = true;
                currentTile = child.parentElement;
                currentPiece = child;

                token = child.firstElementChild.classList[1];
            }
        });
    }
};

document.addEventListener("mousemove", function(e) {
    if(pressed) {
        if (currentTile.id[0] == "0") {
            if ((e.clientY - 510 - (58 * parseInt(currentTile.id[0]))) >= 18 && (e.clientY - 510 - (58 * parseInt(currentTile.id[0]))) <= 106) {
                document.getElementById(currentTile.id).firstElementChild.style.top = (e.clientY - 510 - (58 * parseInt(currentTile.id[0]))) + "px";
            }
        }
        else if (currentTile.id[0] == "4") {
            if ((e.clientY - 510 - (58 * parseInt(currentTile.id[0]))) >= -40 && (e.clientY - 510 - (58 * parseInt(currentTile.id[0]))) <= 48) {
                document.getElementById(currentTile.id).firstElementChild.style.top = (e.clientY - 510 - (58 * parseInt(currentTile.id[0]))) + "px";
            }
        }
        else {
            if ((e.clientY - 510 - (58 * parseInt(currentTile.id[0]))) >= -40 && (e.clientY - 510 - (58 * parseInt(currentTile.id[0]))) <= 106) {
                document.getElementById(currentTile.id).firstElementChild.style.top = (e.clientY - 510 - (58 * parseInt(currentTile.id[0]))) + "px";
            }
        }

        if (currentTile.id[1] == "0") {
            if ((e.clientX - 490 - (58 * parseInt(currentTile.id[1]))) >= 20 && (e.clientX - 490 - (58 * parseInt(currentTile.id[1]))) <= 108) {
                document.getElementById(currentTile.id).firstElementChild.style.left = (e.clientX - 490 - (58 * parseInt(currentTile.id[1]))) + "px";
            }
        }
        else if (currentTile.id[1] == "6") {
            if ((e.clientX - 490 - (58 * parseInt(currentTile.id[1]))) >= -38 && (e.clientX - 490 - (58 * parseInt(currentTile.id[1]))) <= 50) {
                document.getElementById(currentTile.id).firstElementChild.style.left = (e.clientX - 490 - (58 * parseInt(currentTile.id[1]))) + "px";
            }
        }
        else {
            if ((e.clientX - 490 - (58 * parseInt(currentTile.id[1]))) >= -38 && (e.clientX - 490 - (58 * parseInt(currentTile.id[1]))) <= 108) {
                document.getElementById(currentTile.id).firstElementChild.style.left = (e.clientX - 490 - (58 * parseInt(currentTile.id[1]))) + "px";
            }
        }
    }
});

document.addEventListener("mouseup", function() {
    if (pressed) {
        pressed = false;

        let left = document.getElementById(currentTile.id).firstElementChild.style.left;
        let top = document.getElementById(currentTile.id).firstElementChild.style.top;
        let leftVal = parseInt(left.substring(0, left.length - 2));
        let topVal = parseInt(top.substring(0, top.length - 2));
        var newTile = currentTile.id;

        if (leftVal >= 64) {
            newTile = newTile[0] + (parseInt(newTile[1]) + 1);
        }
        else if (leftVal <= 6) {
            newTile = newTile[0] + (parseInt(newTile[1]) - 1)
        }
        else {
            document.getElementById(currentTile.id).firstElementChild.style.left = 35 + "px";
        }

        if (topVal >= 57) {
            newTile = (parseInt(newTile[0]) + 1) + newTile[1];
        }
        else if (topVal <= 9) {
            newTile = (parseInt(newTile[0]) - 1) + newTile[1];
        }
        else {
            document.getElementById(currentTile.id).firstElementChild.style.top = 33 + "px";
        }

        let otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
        if (otherToken != token) {
            currentPiece.firstElementChild.classList.remove(token);
            document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);

            currentPiece.firstElementChild.classList.add(otherToken);
            document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);

            moves--;
            document.getElementById("moves-text").innerHTML = moves;
            matchFinder(newTile);
            matchFinder(currentTile.id);

            if (moves == 0) {
                performMoves();
                moves = 3;
                document.getElementById("moves-text").innerHTML = moves;
                resetTiles();
            }
        }

        document.getElementById(currentTile.id).firstElementChild.style.left = 35 + "px";
        document.getElementById(currentTile.id).firstElementChild.style.top = 33 + "px";
    }
});



function matchFinder(tile) {
    let x = parseInt(tile[0]);
    let y = parseInt(tile[1]);
    let firstTile = document.getElementById(tile).firstElementChild.firstElementChild.classList[1];
    let tiles = [];

    tiles.push(tile);
    let top = x - 1;
    while (top >= 0) {
        let topTile = document.getElementById(top.toString() + y.toString()).firstElementChild.firstElementChild.classList[1];
        if (topTile == firstTile) {
            tiles.push(top.toString() + y.toString());
            top--;
        }
        else {
            break;
        }
    }

    let bottom = x + 1;
    while (bottom <= 4) {
        let bottomTile = document.getElementById(bottom.toString() + y.toString()).firstElementChild.firstElementChild.classList[1];
        if (bottomTile == firstTile) {
            tiles.push(bottom.toString() + y.toString());
            bottom++;
        }
        else {
            break;
        }
    }

    if (tiles.length >= 3) {
        let color = "";
        switch(firstTile) {
            case "heal":
                color = "matched-heal";
                break;
            
            case "short-attack":
                color = "matched-short-attack";
                break;

            case "long-attack":
                color = "matched-long-attack";
                break;

            case "block":
                color = "matched-block";
                break;
        }

        for (let i = 0; i < tiles.length; i++) {
            document.getElementById(tiles[i]).setAttribute("data-matched", "true");
            document.getElementById(tiles[i]).classList.add(color);
        }
    }



    tiles = [];

    tiles.push(tile);
    let left = y - 1;
    while (left >= 0) {
        let leftTile = document.getElementById(x.toString() + left.toString()).firstElementChild.firstElementChild.classList[1];
        if (leftTile == firstTile) {
            tiles.push(x.toString() + left.toString());
            left--;
        }
        else {
            break;
        }
    }

    let right = y + 1;
    while (right <= 6) {
        let rightTile = document.getElementById(x.toString() + right.toString()).firstElementChild.firstElementChild.classList[1];
        if (rightTile == firstTile) {
            tiles.push(x.toString() + right.toString());
            right++;
        }
        else {
            break;
        }
    }

    if (tiles.length >= 3) {
        let color = "";
        switch(firstTile) {
            case "heal":
                color = "matched-heal";
                break;
            
            case "short-attack":
                color = "matched-short-attack";
                break;

            case "long-attack":
                color = "matched-long-attack";
                break;

            case "block":
                color = "matched-block";
                break;
        }

        for (let i = 0; i < tiles.length; i++) {
            document.getElementById(tiles[i]).setAttribute("data-matched", "true");
            document.getElementById(tiles[i]).classList.add(color);
        }
    }
}

function performMoves() {
    var tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].getAttribute("data-matched") == "true") {
            // console.log("+10 " + tiles[i].firstElementChild.firstElementChild.classList[1]);
            switch(tiles[i].firstElementChild.firstElementChild.classList[1]) {
                case "heal":
                    if (health < 91) {
                        health += heal;
                    }
                    else if (health < 100) {
                        health = 100;
                    }
                    break;

                case "short-attack":
                    attack += shortAttack;
                    break;

                case "long-attack":
                    attack += longAttack;
                    break;

                case "block":
                    blockPower += block;
                    break;
            }
        }
    }

    console.log(health + " " + attack + " " + blockPower);
}

function resetTiles() {
    var tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].getAttribute("data-matched") == "true") {
            tiles[i].setAttribute("data-matched", "false");
            tiles[i].classList.remove("matched-" + tiles[i].firstElementChild.firstElementChild.classList[1]);
        }
    }
}
 