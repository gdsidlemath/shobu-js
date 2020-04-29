function checkLegal(diff_x, diff_y) {
    if ( diff_x == diff_y && diff_x < 3 ) {
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

function checkPassive(piece, space, ag0, ag1) {
    console.log(space.x, space.y)
    let p_num = piece.player_num;
    let aggBoard0Elem = document.getElementById("board" + ag0.toString());
    let aggBoard1Elem = document.getElementById("board" + ag1.toString());
    let legal_array = [];
    let agB0Children = aggBoard0Elem.children;
    let agB1Children = aggBoard1Elem.children;
    console.log("ag0 children", agB0Children);
    var i;
    for (i = 0; i < agB0Children.length; i ++) {
        let child = agB0Children[i].children;
        console.log("ag0B child", i, child.length, child);
        if ( child.length > 0 && child[0].player_num == p_num ) {
            let c_legal = checkMove(child[0].x, child[0].y, space.x, space.y, 0, 0);
            legal_array.push(c_legal);
        }
    }
    var j;
    for (j = 0; j < agB1Children.length; j ++) {
        let child = agB1Children[j].children;
        if ( child.length > 0 && child[0].player_num == p_num ) {
            let c_legal = checkMove(child[0].x, child[0].y, space.x, space.y, 0, 0);
            legal_array.push(c_legal);
        }
    }
    console.log(legal_array);
    const bcheck = (elem) => elem === true;
    return legal_array.some(bcheck) && checkMove(piece.x, piece.y, space.x, space.y, 0, 0);
}

function movePiece(piece, space) {
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
        let home_board_condition = ( piece.board_number == homeBoard0 || piece.board_number == homeBoard1 );
        let agg_board_condition = ( piece.board_number == aggBoard0 || piece.board_number == aggBoard1 );
        let board_condition = ( space.board_number == piece.board_number );
        let empty_condition = ( space.className === "space" );
        let opponent_condition = false;
        if ( !empty_condition ) {
            opponent_condition = space.player_num - piece.player_num != 0;
        }
        let move_condition = false;
        let check_boards = false;
        if ( passiveMove ) {
            let aggB = ( piece.board_number + 1 ) % 2;
            aggBoard0 = aggB;
            aggBoard1 = aggB + 2;
            check_boards = ( board_condition && home_board_condition )
            move_condition = checkPassive(piece, space, aggBoard0, aggBoard1);
            //move_condition = checkMove(piece.x, piece.y, space.x, space.y, 0, 0);
        }
        if ( aggressiveMove ) {
            check_boards = ( board_condition && agg_board_condition )
            move_condition = checkMove(piece.x, piece.y, space.x, space.y, prior_x, prior_y);
        }
        let legal_move = check_boards && ( empty_condition || opponent_condition ) && move_condition;
        console.log("legal?", legal_move);
        if ( legal_move ) {
            if ( space.className === "space" ){
                space.appendChild(piece);
            }
            else {
                let actual_space = space.parentNode;
                actual_space.removeChild(space);
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
            console.log(moveCount);
            piece.x = space.x;
            piece.y = space.y;
            space.stone = piece;
        }
    }
    moveDone = true;
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
showButtons();
setUpBoards();
moveDone = true;

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

