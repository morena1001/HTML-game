var pressed = false;
var moves = 3;
var currentX;
var currentY;
var currentTile;
var currentPiece;

var token;



window.onload = function() {
    document.getElementById("moves-text").innerHTML = moves;
    // console.log(document.getElementById("00").getAttribute("data-matched"));
    var tiles = document.getElementsByClassName("tile");
    for(let i = 0; i < tiles.length; i++) {
        let child = tiles[i].firstElementChild;
        child.addEventListener("mousedown", function() {
            if(moves > 0) {
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

            // document.getElementById("00").setAttribute("data-matched", "yeah");
            // console.log(document.getElementById("00").getAttribute("data-matched"));
        }

        document.getElementById(currentTile.id).firstElementChild.style.left = 35 + "px";
        document.getElementById(currentTile.id).firstElementChild.style.top = 33 + "px";
    }
});

function matchFinder(tile) {
    let x = parseInt(tile[0]);
    let y = parseInt(tile[1]);

    // Check tiles on top
    if (x > 1) {
        let tile1 = document.getElementById(x.toString() + y.toString()).firstElementChild.firstElementChild.classList[1];
        let tile2 = document.getElementById((x - 1).toString() + y.toString()).firstElementChild.firstElementChild.classList[1];
        let tile3 = document.getElementById((x - 2).toString() + y.toString()).firstElementChild.firstElementChild.classList[1];

        if (tile1 == tile2 && tile2 == tile3) {
            document.getElementById(x.toString() + y.toString()).setAttribute("data-matched", "true");
            document.getElementById((x - 1).toString() + y.toString()).setAttribute("data-matched", "true");
            document.getElementById((x - 2).toString() + y.toString()).setAttribute("data-matched", "true");

            switch(tile1) {
                case "heal":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-heal");
                    document.getElementById((x - 1).toString() + y.toString()).classList.add("matched-heal");
                    document.getElementById((x - 2).toString() + y.toString()).classList.add("matched-heal");
                    break;
                
                case "short-attack":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-short-attack");
                    document.getElementById((x - 1).toString() + y.toString()).classList.add("matched-short-attack");
                    document.getElementById((x - 2).toString() + y.toString()).classList.add("matched-short-attack");
                    break;

                case "long-attack":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-long-attack");
                    document.getElementById((x - 1).toString() + y.toString()).classList.add("matched-long-attack");
                    document.getElementById((x - 2).toString() + y.toString()).classList.add("matched-long-attack");
                    break;

                case "block":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-block");
                    document.getElementById((x - 1).toString() + y.toString()).classList.add("matched-block");
                    document.getElementById((x - 2).toString() + y.toString()).classList.add("matched-block");
                    break;
            }

            matchFinder((x - 1).toString() + y.toString());
        }
    }

    // Check tiles on bottom
    if (x < 3) {
        let tile1 = document.getElementById(x.toString() + y.toString()).firstElementChild.firstElementChild.classList[1];
        let tile2 = document.getElementById((x + 1).toString() + y.toString()).firstElementChild.firstElementChild.classList[1];
        let tile3 = document.getElementById((x + 2).toString() + y.toString()).firstElementChild.firstElementChild.classList[1];

        if (tile1 == tile2 && tile2 == tile3) {
            document.getElementById(x.toString() + y.toString()).setAttribute("data-matched", "true");
            document.getElementById((x + 1).toString() + y.toString()).setAttribute("data-matched", "true");
            document.getElementById((x + 2).toString() + y.toString()).setAttribute("data-matched", "true");

            switch(tile1) {
                case "heal":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-heal");
                    document.getElementById((x + 1).toString() + y.toString()).classList.add("matched-heal");
                    document.getElementById((x + 2).toString() + y.toString()).classList.add("matched-heal");
                    break;
                
                case "short-attack":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-short-attack");
                    document.getElementById((x + 1).toString() + y.toString()).classList.add("matched-short-attack");
                    document.getElementById((x + 2).toString() + y.toString()).classList.add("matched-short-attack");
                    break;

                case "long-attack":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-long-attack");
                    document.getElementById((x + 1).toString() + y.toString()).classList.add("matched-long-attack");
                    document.getElementById((x + 2).toString() + y.toString()).classList.add("matched-long-attack");
                    break;

                case "block":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-block");
                    document.getElementById((x + 1).toString() + y.toString()).classList.add("matched-block");
                    document.getElementById((x + 2).toString() + y.toString()).classList.add("matched-block");
                    break;
            }

            matchFinder((x + 1).toString() + y.toString());
        }
    }

    // Check tiles on right
    if (y < 5) {
        let tile1 = document.getElementById(x.toString() + y.toString()).firstElementChild.firstElementChild.classList[1];
        let tile2 = document.getElementById(x.toString() + (y + 1).toString()).firstElementChild.firstElementChild.classList[1];
        let tile3 = document.getElementById(x.toString() + (y + 2).toString()).firstElementChild.firstElementChild.classList[1];

        if (tile1 == tile2 && tile2 == tile3) {
            document.getElementById(x.toString() + y.toString()).setAttribute("data-matched", "true");
            document.getElementById(x.toString() + (y + 1).toString()).setAttribute("data-matched", "true");
            document.getElementById(x.toString() + (y + 2).toString()).setAttribute("data-matched", "true");

            switch(tile1) {
                case "heal":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-heal");
                    document.getElementById(x.toString() + (y + 1).toString()).classList.add("matched-heal");
                    document.getElementById(x.toString() + (y + 2).toString()).classList.add("matched-heal");
                    break;
                
                case "short-attack":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-short-attack");
                    document.getElementById(x.toString() + (y + 1).toString()).classList.add("matched-short-attack");
                    document.getElementById(x.toString() + (y + 2).toString()).classList.add("matched-short-attack");
                    break;

                case "long-attack":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-long-attack");
                    document.getElementById(x.toString() + (y + 1).toString()).classList.add("matched-long-attack");
                    document.getElementById(x.toString() + (y + 2).toString()).classList.add("matched-long-attack");
                    break;

                case "block":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-block");
                    document.getElementById(x.toString() + (y + 1).toString()).classList.add("matched-block");
                    document.getElementById(x.toString() + (y + 2).toString()).classList.add("matched-block");
                    break;
            }

            matchFinder(x.toString() + (y + 1).toString());
        }
    }

    // Check tiles on left
    if (y > 1) {
        let tile1 = document.getElementById(x.toString() + y.toString()).firstElementChild.firstElementChild.classList[1];
        let tile2 = document.getElementById(x.toString() + (y - 1).toString()).firstElementChild.firstElementChild.classList[1];
        let tile3 = document.getElementById(x.toString() + (y - 2).toString()).firstElementChild.firstElementChild.classList[1];

        if (tile1 == tile2 && tile2 == tile3) {
            document.getElementById(x.toString() + y.toString()).setAttribute("data-matched", "true");
            document.getElementById(x.toString() + (y - 1).toString()).setAttribute("data-matched", "true");
            document.getElementById(x.toString() + (y - 2).toString()).setAttribute("data-matched", "true");

            switch(tile1) {
                case "heal":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-heal");
                    document.getElementById(x.toString() + (y - 1).toString()).classList.add("matched-heal");
                    document.getElementById(x.toString() + (y - 2).toString()).classList.add("matched-heal");
                    break;
                
                case "short-attack":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-short-attack");
                    document.getElementById(x.toString() + (y - 1).toString()).classList.add("matched-short-attack");
                    document.getElementById(x.toString() + (y - 2).toString()).classList.add("matched-short-attack");
                    break;

                case "long-attack":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-long-attack");
                    document.getElementById(x.toString() + (y - 1).toString()).classList.add("matched-long-attack");
                    document.getElementById(x.toString() + (y - 2).toString()).classList.add("matched-long-attack");
                    break;

                case "block":
                    document.getElementById(x.toString() + y.toString()).classList.add("matched-block");
                    document.getElementById(x.toString() + (y - 1).toString()).classList.add("matched-block");
                    document.getElementById(x.toString() + (y - 2).toString()).classList.add("matched-block");
                    break;
            }

            matchFinder(x.toString() + (y - 1).toString());
        }
    }
}
