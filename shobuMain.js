function checkIfPieceCanMoveHere(piece, space, tempAggCheck) {
    if ( !tempAggCheck ) { console.log("*** BEGIN MOVE CHECK ***"); }
    let home_board_condition = ( piece.board_number == homeBoard0 || piece.board_number == homeBoard1 );
    let agg_board_condition = ( piece.board_number == aggBoard0 || piece.board_number == aggBoard1 );
    let board_condition = ( space.board_number == piece.board_number );
    let opponent_condition = false;
    let clear_next_space_condition = false;
    let move_direction_x = space.x - piece.x;
    let move_direction_y = space.y - piece.y;
    let diff_x = Math.abs(move_direction_x);
    let diff_y = Math.abs(move_direction_y);
    let empty_condition = ( space.className === "space" );
    if ( diff_x > 1 && diff_y > 1 ) {
        let int_space_id = "space" + space.board_number.toString() + (piece.x + Math.sign(move_direction_x) * Math.floor(diff_x/2)).toString() + (piece.y + Math.sign(move_direction_y) * Math.floor(diff_y/2)).toString();
        int_space = document.getElementById(int_space_id);
        int_space_cond = int_space.children.length > 0;
        if ( aggressiveMove) { console.log(int_space.id); }
    }
    let move_condition = false;
    let check_boards = false;
    if ( passiveMove && !tempAggCheck ) {
        let aggB = ( piece.board_number + 1 ) % 2;
        aggBoard0 = aggB;
        aggBoard1 = aggB + 2;
        check_boards = ( board_condition && home_board_condition )
        move_condition = checkPassive(piece, space, aggBoard0, aggBoard1);
        int_next_space = null;
        //move_condition = checkMove(piece.x, piece.y, space.x, space.y, 0, 0);
    }
    if ( aggressiveMove || tempAggCheck ) {
        check_boards = ( board_condition && agg_board_condition )
        move_condition = checkMove(piece.x, piece.y, space.x, space.y, prior_x, prior_y);
        if ( aggressiveMove ) { console.log("agg move check", move_condition); }
    }
    if ( ( !empty_condition || int_space_cond ) && ( aggressiveMove || tempAggCheck ) ) {
        opponent_condition = space.player_num - piece.player_num != 0;
        if ( diff_x < 2 && diff_y < 2 ) {
            let next_space_id = "space" + space.board_number.toString() + (space.x + move_direction_x).toString() + (space.y + move_direction_y).toString();
            //console.log("next space id", next_space_id);
            next_space = document.getElementById(next_space_id);
            //console.log("found next space", next_space);
            if ( next_space === null ) {
                push_off = true;
                clear_next_space_condition = true;
            } else {
                if ( next_space.children.length < 1 ) {
                    clear_next_space_condition = true;
                }
            }
        } else {
            if ( int_space_cond ) {
                if ( !empty_condition ) {
                    clear_next_space_condition = false;
                } else {
                    //let next_space_id = "space" + space.board_number.toString() + (space.x + move_direction_x).toString() + (space.y + move_direction_y).toString();
                    console.log(space.id, diff_x, diff_x);
                    let int_next_id = "space" + space.board_number.toString() + (space.x + Math.sign(move_direction_x) * Math.floor(diff_x/2)).toString() + (space.y + Math.sign(move_direction_y) * Math.floor(diff_y/2)).toString();
                    // console.log("next space id", int_next_id);
                    //console.log("int space id", int_space_id);
                    int_next_space = document.getElementById(int_next_id);
                    //int_space = document.getElementById(int_space_id);
                    // console.log("found next space", int_next_space);
                    //console.log("found int space", int_space);
                    if ( int_next_space === null ) { //&& int_space === null ) {
                        push_off = true;
                        clear_next_space_condition = true;
                    } else {
                        if ( int_next_space.children.length < 1 ) //&& int_space.children.length < 1 ) {
                            clear_next_space_condition = true;
                    }
                }
            } else {
                if ( !empty_condition ) {
                    let next_space_id = "space" + space.board_number.toString() + (space.x + Math.sign(move_direction_x) * Math.floor(diff_x/2)).toString() + (space.y + Math.sign(move_direction_y) * Math.floor(diff_y/2)).toString();
                    // console.log("next space id", next_space_id);
                    next_space = document.getElementById(next_space_id);
                    // console.log("found next space", next_space);
                    if ( next_space === null ) {
                        push_off = true;
                        clear_next_space_condition = true;
                    } else {
                        if ( next_space.children.length < 1 ) {
                            clear_next_space_condition = true;
                        }
                    }
                } else {
                    clear_next_space_condition = true;
                }
            }
        }
        // NEED SOMETHING TO COVER MOVING 2X WITH A STONE IN BETWEEN
    }
    let legal_move = check_boards && ( empty_condition || ( opponent_condition && clear_next_space_condition ) ) && move_condition;
    if ( !tempAggCheck ) {
        console.log("check board", check_boards);
        console.log("empty?", empty_condition);
        console.log("oppo", opponent_condition);
        console.log("next space?", clear_next_space_condition);
        console.log("int space cond", int_space_cond);
        console.log("ok move?", move_condition);
        console.log("pushing off?", push_off);
        if ( clear_next_space_condition && !push_off ) {
            console.log("next space id", next_space.id);
        }
        console.log("legal?", legal_move);
        console.log("**** END MOVE CHECK ****", piece.id, space.id);
    }
    return legal_move;
}

function checkLegal(diff_x, diff_y) {
    if ( diff_x == diff_y && diff_x < 3 && diff_x > 0 ) {
        return true;
    }
    else if ( diff_x < 3 && diff_y == 0 ) {
        return true;
    }
    else if ( diff_x == 0 && diff_y < 3 ) {
        return true;
    }
    else {
        return false;
    }
}

function checkMove(px, py, sx, sy, rx, ry) {
    let move_x = sx - px;
    let move_y = sy - py;
    let new_px = px + move_x;
    let new_py = py + move_y;
    if ( new_px < 0 || new_px > 3 || new_py < 0 || new_py > 3 ) {
        return false;
    }
    let diff_x = Math.abs(move_x);
    let diff_y = Math.abs(move_y);
    if ( rx > 0 || ry > 0 ){
        if ( move_x == rx && move_y == ry ) {
            return checkLegal(diff_x, diff_y);
        }
        else {
            return false;
        }
    }
    else {
        return checkLegal(diff_x, diff_y);
    }
}

function getAllBoardSpaces(board_num) {
    let space_list = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            let space_id = "space" + board_num.toString() + i.toString() + j.toString();
            let space = document.getElementById(space_id);
            space_list.push(space);
        }
    }
    //console.log(space_list);
    return space_list;
}

function checkPassive(piece, space, ag0, ag1) {
    console.log("!!! BEGIN PASSIVE MOVE CHECK !!!", piece.id, space.id);
    let p_num = piece.player_num;
    let aggBoard0Elem = document.getElementById("board" + ag0.toString());
    let aggBoard1Elem = document.getElementById("board" + ag1.toString());
    let legal_array = [];
    let agB0Children = aggBoard0Elem.children;
    let ag0spaces = getAllBoardSpaces(ag0);
    let agB1Children = aggBoard1Elem.children;
    let ag1spaces = getAllBoardSpaces(ag1);
    //console.log(agB0Children);
    //console.log(agB1Children);
    const bcheck = (elem) => elem === true;
    var c0;
    for (c0 = 0; c0 < agB0Children.length; c0 ++) {
        let child = agB0Children[c0].children;
        if ( child.length > 0 && child[0].player_num == p_num ) {
            //console.log(child[0].id);
            for (var a0 = 0; a0 < ag0spaces.length; a0++) {
                let diff_x = Math.abs(child[0].x - ag0spaces[a0].x);
                let diff_y = Math.abs(child[0].y - ag0spaces[a0].y);
                if ( checkLegal(diff_x, diff_y) ) {
                    let c_legal = checkIfPieceCanMoveHere(child[0], ag0spaces[a0], true);
                    //console.log(child[0].id, c_legal);
                    legal_array.push(c_legal);
                }
            }
        }
    }
    var c1;
    for (c1 = 0; c1 < agB1Children.length; c1 ++) {
        let child = agB1Children[c1].children;
        if ( child.length > 0 && child[0].player_num == p_num ) {
            for (var a1 = 0; a1 < ag0spaces.length; a1++) {
                let diff_x = Math.abs(child[0].x - ag1spaces[a1].x);
                let diff_y = Math.abs(child[0].y - ag1spaces[a1].y);
                if ( checkLegal(diff_x, diff_y) ) {
                    let c_legal = checkIfPieceCanMoveHere(child[0], ag0spaces[a1], true);
                    legal_array.push(c_legal);
                    legal_check = legal_array.some(bcheck);
                }
            }
        }
    }
    console.log("array of agg boards", legal_array);
    let passive_check =  legal_array.some(bcheck) && checkMove(piece.x, piece.y, space.x, space.y, 0, 0);
    console.log("passive check", passive_check);
    return passive_check;
}

function movePiece(piece, space) {
    console.log(" ")
    console.log("^^^^ BEGIN MOVE PIECE ^^^^", piece.id, space.id);
    if ( blackTop ) {
        if ( blackMove ) {
            homeBoard0 = 0;
            homeBoard1 = 1;
        }
        if ( whiteMove ) {
            homeBoard0 = 2;
            homeBoard1 = 3;
        }
    }
    else {
        if ( blackMove ) {
            homeBoard0 = 2;
            homeBoard1 = 3;
        }
        if ( whiteMove ) {
            homeBoard0 = 0;
            homeBoard1 = 1;
        }
    }
    if ( ( whiteMove && piece.player_num == 1 ) || ( blackMove && piece.player_num == 0 ) ) {
        let legal_move = checkIfPieceCanMoveHere(piece, space);
        if ( legal_move ) {
            if ( space.className === "space" && !int_space_cond ){
                space.appendChild(piece);
            } else if ( space.className == "space" && int_space_cond ) {
                if ( aggressiveMove ) {
                    int_piece = int_space.children[0];
                    int_space.removeChild(int_piece);
                    if ( !push_off ) {
                        int_next_space.appendChild(int_piece);
                        int_next_space = null;
                    } else {
                        push_off = false;
                    }
                }
                space.appendChild(piece);
            } else {
                let actual_space = space.parentNode;
                if ( !push_off ) {
                    next_space.appendChild(space);
                    next_space = null;
                } else {
                    actual_space.removeChild(space);
                    push_off = false;
                }
                actual_space.appendChild(piece);
            }
            if ( passiveMove ) {
                moveCount = 1;
                prior_x = space.x - piece.x;
                prior_y = space.y - piece.y;
            }
            if ( aggressiveMove ) {
                moveCount = 0;
                changePlayer();
                prior_x = 0;
                prior_y = 0;
            }
            changeMoves();
            //console.log(moveCount);
            piece.x = space.x;
            piece.y = space.y;
            space.stone = piece;
        }
    }
    checkBoards();
}

function changeMoves() {
    if ( passiveMove ) {
        passiveMove = false;
        aggressiveMove = true;
    }
    else {
        aggressiveMove = false;
        passiveMove = true;
    }
}
function setUpBoards() {
    let main = document.getElementById("main");
    if ( main.childNodes.length > 1 ) {
        var b;
        for (b = 0; b < 4; b++) {
           let board = document.getElementById("board" + b.toString());
           main.removeChild(board);
        }
    }
    var b;
    for (b = 0; b < 4; b ++){
        let board = document.createElement("div");
        board.board_number = b;
        board.id = "board" + b.toString();
        board.className = "board";
        if (b == 0 || b == 2) {
            board.style.cssText = "background-color:#B37700";
        }
        else {
            board.style.cssText = "background-color:#664400";
        }
        var i;
        var j;
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                let space = document.createElement("div");
                space.board_number = b;
                space.x = i;
                space.y = j;
                space.className = "space";
                space.id = "space" + b.toString() + i.toString() + j.toString();
                space.stone = null;
                board.appendChild(space);
            }
        }
    document.getElementById("main").appendChild(board);
    }
}

function initPiece(player_num, color, b, px, py) {
    let piece = document.createElement("div");
    piece.className = "piece";
    piece.id = "piece" + player_num.toString() + py.toString() + "board" + b.toString();
    piece.style.cssText = "background-color:#" + color;
    piece.board_number = b;
    piece.x = px;
    piece.y = py;
    piece.draggable = true;
    piece.player_num = player_num;
    let space_id = "space" + b.toString() + px.toString() + py.toString();
    let space = document.getElementById(space_id);
    space.appendChild(piece);
    space.stone = piece;
}

function playAs(color){
    var b;
    for (b = 0; b < 4; b++) {
        var j;
        for (j = 0; j < 4; j ++) {
            if (color == "white") {
                initPiece(1, "DDD", b, 3, j);
                initPiece(0, "111", b, 0, j);
                blackTop = true;
            }
            else {
                initPiece(1, "DDD", b, 0, j);
                initPiece(0, "111", b, 3, j);
                whiteTop = true;
            }
        }
    }
    document.getElementById("buttons").innerHTML = "<h3> Black goes first! </h3>";
    blackMove = true;
    passiveMove = true;
    aggressiveMove = false;
}

function showButtons() {
    button_html = "<button onclick=\"playAs('white')\">Play As White</button> <button onclick=\"playAs('black')\">Play As Black</button>";
    document.getElementById("buttons").innerHTML = button_html;
}

function reset() {
    setUpBoards();
    showButtons();
}

function playGame() {
    console.log("playing game");
}

function changePlayer() {
    if ( whiteMove ) {
        whiteMove = false;
        blackMove = true;
        document.getElementById("buttons").innerHTML = "<h3> Black's turn! </h3>";
    }
    else {
        blackMove = false;
        whiteMove = true;
        document.getElementById("buttons").innerHTML = "<h3> White's turn! </h3>";
    }
}

function checkBoards() {
    const bcheck = (elem) => elem === 0;
    let p0_arr = [];
    let p1_arr = [];
    for (var b=0; b < 4; b++) {
        let board = document.getElementById("board" + b.toString());
        let p0_sum = 0;
        let p1_sum = 0;
        for (var i=0; i < 4; i++) {
            for (var j=0; j < 4; j++) {
                let space = document.getElementById("space" + b.toString() + i.toString() + j.toString());
                if ( space.children.length > 0 ) {
                    if ( space.children[0].player_num == 0 ) {
                        p0_sum += 1;
                    } else {
                        p1_sum += 1;
                    }
                }
            }
        }
        p0_arr.push(p0_sum);
        p1_arr.push(p1_sum);
    }
    p0_check = p0_arr.some(bcheck);
    p1_check = p1_arr.some(bcheck);
    if ( p0_check ) {
        document.getElementById("buttons").innerHTML = "<h2> White Wins! </h2>";
        whiteMove = false;
        blackMove = false;
    }
    if ( p1_check ) {
        document.getElementById("buttons").innerHTML = "<h2> Black Wins! </h2>";
        whiteMove = false;
        blackMove = false;
    }
}

let whiteMove = false;
let blackMove = false;
let whiteTop = false;
let blackTop = false;
let passiveMove = false;
let aggressiveMove = false;
let homeBoard0 = null;
let homeBoard1 = null;
let aggBoard0 = null;
let aggBoard1 = null;
let moveCount = 0;
let turnCount = 0;
let prior_x = 0;
let prior_y = 0;
let push_off = false;
let next_space = null;
let int_space = null;
let int_space_cond = false;
showButtons();
setUpBoards();

document.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text", event.target.id);
});

document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

document.addEventListener("drop", function(event) {
    event.preventDefault();
    var piece = document.getElementById(event.dataTransfer.getData("text"));
    var space = document.getElementById(event.target.id);
    movePiece(piece, space);
});

function showRules() {
    let content = "How to Play Shobu: \n \n" +
        "Shobu is played alternating turns between white and black players. \n \n" +
        "Each turn consists of two moves, in which a stone may move up to two spaces " +
        "in any direction, up, down, left, right, or diagnally. The two moves in " +
        "each turn are the PASSIVE and AGGRESSIVE moves. \n \n" +
        "The passive move occurs on one of the players two home boards (the closest " +
        "boards to the player). The aggressive move occurs on one of the two boards " +
        "of the opposite color of the passive move. During a passive " +
        "move, the stone that is being moved may not push a stone of the opposing " +
        "player, but during an aggressive move an opponents stone may be pushed into " +
        "an open space, or off the board. \n \n" +
        "The game ends when ONE board is cleared of a players stones. The player with " +
        "stones remaining on the board is the winner.";
    alert(content);
}
