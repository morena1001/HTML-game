var pressed = false;
var moves = 3;
var health = 100;
var attack = 0;
var damage = 0;
var blockPower = 0;
var currentX;
var currentY;
var currentTile;
var currentPiece;
var match = false;
var tiles;

var token;
var heal = 10;
var shortAttack = 10;
var longAttack = 15;
var block = 5;

var eHeal = 8;
var eShortAttack = 8;
var eLongAttack = 12;
var eBlock = 3;
var eHealth = 80;
var eAttack = 0;
var eBlockPower = 0;


window.onload = function() {
    document.getElementById("moves-text").innerHTML = moves;
    document.getElementById("health-text").innerHTML = "health : " + health;
    document.getElementById("damage-out-text").innerHTML = "damage out : " + attack;
    document.getElementById("damage-in-text").innerHTML = "damage in : " + damage;
    document.getElementById("block-text").innerHTML = "block : " + blockPower; 
    document.getElementById("moves-chat-text").innerHTML = "";
    tiles = document.getElementsByClassName("tile");
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
            document.getElementById(currentTile.id).firstElementChild.style.left = 34 + "px";
        }

        if (topVal >= 57) {
            newTile = (parseInt(newTile[0]) + 1) + newTile[1];
        }
        else if (topVal <= 9) {
            newTile = (parseInt(newTile[0]) - 1) + newTile[1];
        }
        else {
            document.getElementById(currentTile.id).firstElementChild.style.top = 32 + "px";
        }

        document.getElementById(currentTile.id).firstElementChild.style.left = 34 + "px";
        document.getElementById(currentTile.id).firstElementChild.style.top = 32 + "px";

        let otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
        if (otherToken != token) {
            currentPiece.firstElementChild.classList.remove(token);
            document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);

            currentPiece.firstElementChild.classList.add(otherToken);
            document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);

            moves--;
            document.getElementById("moves-text").innerHTML = moves;
            tiles = document.getElementsByClassName("tile");
            for (let i = 0; i < tiles.length; i++) {
                matchFinder(tiles[i].id)
            }

            if (moves == 0) {
                if (match) {
                    attack = 0;
                    blockPower = 0;
                    performMoves();
                    resetTiles();
    
                    match = false;
                    for (let i = 0; i < tiles.length; i++) {
                        matchFinder(tiles[i].id);
                        if (match) {
                            performMoves();
                            resetTiles();
                        }
                        if (i == tiles.length - 1 && match) {
                            i = -1;
                            match = false;
                        }
                    }
                }
                enemyTurn();

                moves = 3;
                document.getElementById("moves-text").innerHTML = moves;
            }
        }
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
        match = true;
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
        match = true;
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
    tiles = document.getElementsByClassName("tile");
    let oldHealth = health;
    let oldAttack = attack;
    let oldBlock = blockPower;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].getAttribute("data-matched") == "true") {
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
    document.getElementById("health-text").innerHTML = "health : " + health;
    document.getElementById("damage-out-text").innerHTML = "damage out : " + attack;
    document.getElementById("damage-in-text").innerHTML = "damage in : " + damage;
    document.getElementById("block-text").innerHTML = "block : " + blockPower; 
    if (health != oldHealth || attack != oldAttack || blockPower != oldBlock) {
        document.getElementById("moves-chat-text").innerHTML += "health : " + health + "  attack : " + attack + "  block : " + blockPower + "<br/>";
        console.log(health + " " + attack + " " + blockPower);
    }
    
    
}

function resetTiles() {
    tiles = document.getElementsByClassName("tile");
    let removed = []

    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].getAttribute("data-matched") == "true") {
            tiles[i].setAttribute("data-matched", "false");
            tiles[i].classList.remove("matched-" + tiles[i].firstElementChild.firstElementChild.classList[1]);
            tiles[i].firstElementChild.firstElementChild.classList.remove(tiles[i].firstElementChild.firstElementChild.classList[1]);
            removed.push(tiles[i].id);
        }
    }

    for (let i = 0; i < removed.length; i++) {
        let current = removed[i];
        while (current[0] != "0") {
            let temp =  (parseInt(current[0]) - 1) + current[1];
            if (document.getElementById(temp).firstElementChild.firstElementChild.classList.length == 1) {
                break;
            }

            let tempPiece = document.getElementById(temp).firstElementChild.firstElementChild.classList[1];
            document.getElementById(temp).firstElementChild.firstElementChild.classList.remove(tempPiece);
            document.getElementById(current).firstElementChild.firstElementChild.classList.add(tempPiece);
            current = temp;
        }

        let newTile = Math.floor(Math.random() * 4);
        switch(newTile) {
            case 0:
                document.getElementById(current).firstElementChild.firstElementChild.classList.add("heal");
                break;

            case 1:
                document.getElementById(current).firstElementChild.firstElementChild.classList.add("short-attack");
                break;

            case 2:
                document.getElementById(current).firstElementChild.firstElementChild.classList.add("long-attack");
                break;

            case 3:
                document.getElementById(current).firstElementChild.firstElementChild.classList.add("block");
                break;
        }
        
    }
}





function enemyTurn() {
    for (let i = 0; i < 3; i++) {
        tiles = document.getElementsByClassName("tile");
        availableTiles = []
        availableMoves(availableTiles); 
        if (availableTiles.length == 0) {
            let x = Math.floor(Math.random() * 5);
            let y = Math.floor(Math.random() * 7);

            if (x == 0 && y == 0) {
                let direction = Math.floor(Math.random() * 2);
                if (direction == 0) {
                    enemyMakeMove(x.toString() + y.toString(), "down");
                }
                else {
                    enemyMakeMove(x.toString() + y.toString(), "right");
                }
            }
            else if (x == 0 && y == 6) {
                let direction = Math.floor(Math.random() * 2);
                if (direction == 0) {
                    enemyMakeMove(x.toString() + y.toString(), "down");
                }
                else {
                    enemyMakeMove(x.toString() + y.toString(), "left");
                }
            }
            else if (x == 4 && y == 6) {
                let direction = Math.floor(Math.random() * 2);
                if (direction == 0) {
                    enemyMakeMove(x.toString() + y.toString(), "up");
                }
                else {
                    enemyMakeMove(x.toString() + y.toString(), "left");
                }
            }
            else if (x == 4 && y == 6) {
                let direction = Math.floor(Math.random() * 2);
                if (direction == 0) {
                    enemyMakeMove(x.toString() + y.toString(), "up");
                }
                else {
                    enemyMakeMove(x.toString() + y.toString(), "right");
                }
            }
        
            else if (x == 0) {
                let direction = Math.floor(Math.random() * 3);
                switch(direction) {
                    case 0:
                        enemyMakeMove(x.toString() + y.toString(), "down");
                        break;

                    case 1:
                        enemyMakeMove(x.toString() + y.toString(), "left");
                        break;

                    case 2:
                        enemyMakeMove(x.toString() + y.toString(), "right");
                        break;
                }
            }
            else if (x == 4) {
                let direction = Math.floor(Math.random() * 3);
                switch(direction) {
                    case 0:
                        enemyMakeMove(x.toString() + y.toString(), "up");
                        break;

                    case 1:
                        enemyMakeMove(x.toString() + y.toString(), "left");
                        break;

                    case 2:
                        enemyMakeMove(x.toString() + y.toString(), "right");
                        break;
                }
            }

            else if (y == 0) {
                let direction = Math.floor(Math.random() * 3);
                switch(direction) {
                    case 0:
                        enemyMakeMove(x.toString() + y.toString(), "up");
                        break;

                    case 1:
                        enemyMakeMove(x.toString() + y.toString(), "down");
                        break;

                    case 2:
                        enemyMakeMove(x.toString() + y.toString(), "right");
                        break;
                }
            }
            else if (y == 6) {
                let direction = Math.floor(Math.random() * 3);
                switch(direction) {
                    case 0:
                        enemyMakeMove(x.toString() + y.toString(), "up");
                        break;

                    case 1:
                        enemyMakeMove(x.toString() + y.toString(), "down");
                        break;

                    case 2:
                        enemyMakeMove(x.toString() + y.toString(), "left");
                        break;
                }
            }

            else {
                let direction = Math.floor(Math.random() * 4);
                switch(direction) {
                    case 0:
                        enemyMakeMove(x.toString() + y.toString(), "up");
                        break;

                    case 1:
                        enemyMakeMove(x.toString() + y.toString(), "right");
                        break;

                    case 2:
                        enemyMakeMove(x.toString() + y.toString(), "down");
                        break;
                    
                    case 3:
                        enemyMakeMove(x.toString() + y.toString(), "left");
                        break;
                }
            }


            
        }
        else {
            let move = Math.floor(Math.random() * availableTiles.length);
            enemyMakeMove(availableTiles[move][1], availableTiles[move][0]);
        } 
    }

    enemyPerformMoves();
    enemyResetMove();
}

function availableMoves(availableTiles) {
    match = false;
    tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++) {
        let x = tiles[i].id[0];
        let y = tiles[i].id[1];
        
        if (tiles[i].getAttribute("data-matched") == "false") {
            if (x == "0") {
                let newTile = (parseInt(x) + 1) + y;
                let otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
                let token = document.getElementById(x + y).firstElementChild.firstElementChild.classList[1];
                if (otherToken != token) {
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);
    
                    for (let j = 0; j < tiles.length; j++) {
                        EnemyMatchFinder(tiles[i].id);
                        if (match) {
                            let move = ["down", x + y];
                            availableTiles.push(move);
                            match = false;
                            break;
                        }
                    }
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(token);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(otherToken);
                }
            }
    
            else if (x == "4") {
                let newTile = (parseInt(x) - 1) + y;
                let otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
                let token = document.getElementById(x + y).firstElementChild.firstElementChild.classList[1];
                if (otherToken != token) {
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);
    
                    for (let j = 0; j < tiles.length; j++) {
                        EnemyMatchFinder(tiles[i].id);
                        if (match) {
                            let move = ["up", x + y];
                            availableTiles.push(move);
                            match = false;
                            break;
                        }
                    }
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(token);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(otherToken);
                }
            }
    
            else {
                let newTile = (parseInt(x) + 1) + y;
                let otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
                let token = document.getElementById(x + y).firstElementChild.firstElementChild.classList[1];
                if (otherToken != token) {
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);
    
                    for (let j = 0; j < tiles.length; j++) {
                        EnemyMatchFinder(tiles[i].id);
                        if (match) {
                            let move = ["down", x + y];
                            availableTiles.push(move);
                            match = false;
                            break;
                        }
                    }
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(token);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(otherToken);
                }
    
                newTile = (parseInt(x) - 1) + y;
                otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
                token = document.getElementById(x + y).firstElementChild.firstElementChild.classList[1];
                if (otherToken != token) {
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);
    
                    for (let j = 0; j < tiles.length; j++) {
                        EnemyMatchFinder(tiles[i].id);
                        if (match) {
                            let move = ["up", x + y];
                            availableTiles.push(move);
                            match = false;
                            break;
                        }
                    }
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(token);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(otherToken);
                }
            }
    
    
    
            if (y == "0") {
                let newTile = x + (parseInt(y) + 1);
                let otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
                let token = document.getElementById(x + y).firstElementChild.firstElementChild.classList[1];
                if (otherToken != token) {
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);
    
                    for (let j = 0; j < tiles.length; j++) {
                        EnemyMatchFinder(tiles[i].id);
                        if (match) {
                            let move = ["right", x + y];
                            availableTiles.push(move);
                            match = false;
                            break;
                        }
                    }
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(token);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(otherToken);
                }
            }
    
            else if (y == "6") {
                let newTile = x + (parseInt(y) - 1);
                let otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
                let token = document.getElementById(x + y).firstElementChild.firstElementChild.classList[1];
                if (otherToken != token) {
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);
    
                    for (let j = 0; j < tiles.length; j++) {
                        EnemyMatchFinder(tiles[i].id);
                        if (match) {
                            let move = ["left", x + y];
                            availableTiles.push(move);
                            match = false;
                            break;
                        }
                    }
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(token);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(otherToken);
                }
            }
    
            else {
                let newTile = x + (parseInt(y) + 1);
                let otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
                let token = document.getElementById(x + y).firstElementChild.firstElementChild.classList[1];
                if (otherToken != token) {
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);
    
                    for (let j = 0; j < tiles.length; j++) {
                        EnemyMatchFinder(tiles[i].id);
                        if (match) {
                            let move = ["right", x + y];
                            availableTiles.push(move);
                            match = false;
                            break;
                        }
                    }
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(token);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(otherToken);
                }
    
                newTile = x + (parseInt(y) - 1);
                otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
                token = document.getElementById(x + y).firstElementChild.firstElementChild.classList[1];
                if (otherToken != token) {
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);
    
                    for (let j = 0; j < tiles.length; j++) {
                        EnemyMatchFinder(tiles[i].id);
                        if (match) {
                            let move = ["left", x + y];
                            availableTiles.push(move);
                            match = false;
                            break;
                        }
                    }
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.remove(otherToken);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(token);
    
                    document.getElementById(x + y).firstElementChild.firstElementChild.classList.add(token);
                    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(otherToken);
                }
            }
        }
    }
}

function EnemyMatchFinder(tile) {
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
        match = true;
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
        match = true;
    }
}

function enemyMakeMove(tile, direction) {
    tiles = document.getElementsByClassName("tile");
    var newTile;
    switch(direction) {
        case "up":
            newTile = (parseInt(tile[0]) - 1) + tile[1];
            break;

        case "down":
            newTile = (parseInt(tile[0]) + 1) + tile[1];
            break;

        case "left":
            newTile = tile[0] + (parseInt(tile[1]) - 1);
            break;

        case "right":
            newTile = tile[0] + (parseInt(tile[1]) + 1);
            break;
    }

    let otherToken = document.getElementById(newTile).firstElementChild.firstElementChild.classList[1];
    let token = document.getElementById(tile).firstElementChild.firstElementChild.classList[1];
    
    document.getElementById(tile).firstElementChild.firstElementChild.classList.remove(token);
    document.getElementById(newTile).firstElementChild.firstElementChild.classList.remove(otherToken);

    document.getElementById(tile).firstElementChild.firstElementChild.classList.add(otherToken);
    document.getElementById(newTile).firstElementChild.firstElementChild.classList.add(token);

    for (let i = 0; i < tiles.length; i++) {
        matchFinder(tiles[i].id);
    }
}

function enemyPerformMoves() {
    tiles = document.getElementsByClassName("tile");
    let oldHealth = eHealth;
    let oldAttack = eAttack;
    let oldBlock = eBlockPower;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].getAttribute("data-matched") == "true") {
            switch(tiles[i].firstElementChild.firstElementChild.classList[1]) {
                case "heal":
                    if (eHealth < 71) {
                        eHealth += eHeal;
                    }
                    else if (eHealth < 80) {
                        eHealth = 80;
                    }
                    break;

                case "short-attack":
                    eAttack += eShortAttack;
                    break;
                
                case "long-attack":
                    eAttack += eLongAttack;
                    break;

                case "block": 
                    eBlockPower += eBlock;
                    break;
            }
        }
    }

    if (eHealth != oldHealth || eAttack != oldAttack || eBlockPower != oldBlock) {
        document.getElementById("moves-chat-text").innerHTML += "eHealth : " + eHealth + " eAttack : " + eAttack + " eBlock : " + eBlockPower + "<br/>";
        console.log("ENEMY" + " " + eHealth + " " + eAttack + " " + eBlockPower); 
    }
}

function enemyResetMove() {
    tiles = document.getElementsByClassName("tile");
    let removed = [];

    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].getAttribute("data-matched") == "true") {
            tiles[i].setAttribute("data-matched", "false");
            tiles[i].classList.remove("matched-" + tiles[i].firstElementChild.firstElementChild.classList[1]);
            tiles[i].firstElementChild.firstElementChild.classList.remove(tiles[i].firstElementChild.firstElementChild.classList[1]);
            removed.push(tiles[i].id);
        }
    }

    for (let i = 0; i < removed.length; i++) {
        let current = removed[i];
        while (current[0] != "0") {
            let temp = (parseInt(current[0]) - 1) + current[1];
            if (document.getElementById(temp).firstElementChild.firstElementChild.classList.length == 1) {
                break;
            }
            
            let tempPiece = document.getElementById(temp).firstElementChild.firstElementChild.classList[1];
            document.getElementById(temp).firstElementChild.firstElementChild.classList.remove(tempPiece);
            document.getElementById(current).firstElementChild.firstElementChild.classList.add(tempPiece);
            current = temp;
        }

        let newTile = Math.floor(Math.random() * 4);
        switch(newTile) {
            case 0:
                document.getElementById(current).firstElementChild.firstElementChild.classList.add("heal");
                break;

            case 1:
                document.getElementById(current).firstElementChild.firstElementChild.classList.add("short-attack");
                break;

            case 2:
                document.getElementById(current).firstElementChild.firstElementChild.classList.add("long-attack");
                break;
            
            case 3:
                document.getElementById(current).firstElementChild.firstElementChild.classList.add("block");
                break;
        }
    }
}
 