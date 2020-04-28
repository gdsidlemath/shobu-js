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

function checkMove(px, py, sx, sy) {
    let diff_x = Math.abs(sx - px);
    let diff_y = Math.abs(sy - py);
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

function movePiece(piece, space) {
    if ( ( whiteMove && piece.player_num == 1 ) || ( blackMove && piece.player_num == 0 ) ) {
        let board_condition = ( space.board_number == piece.board_number );
        let empty_condition = ( space.className === "space" );
        let opponent_condition = false;
        if ( !empty_condition ) {
            opponent_condition = space.player_num - piece.player_num != 0;
        }
        let move_condition = checkMove(piece.x, piece.y, space.x, space.y);
        if ( board_condition && ( empty_condition || opponent_condition ) && move_condition ) {
            piece.x = space.x;
            piece.y = space.y;
            space.stone = piece;
            if ( space.className === "space" ){
                space.appendChild(piece);
            }
            else {
                let actual_space = space.parentNode;
                actual_space.removeChild(space);
                actual_space.appendChild(piece);
            }
        }
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
    setUpBoards();
    var b;
    for (b = 0; b < 4; b++) {
        var j;
        for (j = 0; j < 4; j ++) {
            if (color == "white") {
                initPiece(1, "DDD", b, 3, j);
                initPiece(0, "111", b, 0, j);
            }
            else {
                initPiece(1, "DDD", b, 0, j);
                initPiece(0, "111", b, 3, j);
            }
        }
    }
}

let whiteMove = false;
let blackMove = false;
setUpBoards();
