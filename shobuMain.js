function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function setUpBoards() {
    var b;
    let board_html = "";
    for (b = 0; b < 4; b ++){
        let bc = ""
        if (b == 0 || b == 2) {
            bc = "#B37700";
        }
        else {
            bc = "#664400";
        }
        let board_str = "<div class='board' style='background-color: " + bc + "' id='board" + b.toString() + "'>";
        board_html += board_str;
        var i;
        var j;
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                let id_str = b.toString() + i.toString() + j.toString();
                let space_str = "<div class='space' id='" + id_str + "' ondrop='drop(event)' ondragover='allowDrop(event)'></div>";
                board_html += space_str;
            }
        }
        board_html += "</div>";
    }
    document.getElementById("main").innerHTML = board_html;
}

function playAs(color){
    let wp1 = "<div class='piece' draggable='true' ondragstart='drag(event)' style='background-color: #DDD'";
    let wp2 = "></div>";
    let bp1 = "<div class='piece' draggable='true' ondragstart='drag(event)' style='background-color: #111'";
    let bp2 = "></div>";
    if (color == "white") {
        var b;
        for (b = 0; b < 4; b++) {
            var i;
            for (i = 0; i < 4; i ++) {
                let w_s_str = b.toString() + "3" + i.toString();
                let w_p_str = "id=wp_" + b.toString() + i.toString();
                document.getElementById(w_s_str).innerHTML = wp1 + w_p_str + wp2;
                let b_s_str = b.toString() + "0" + i.toString();
                let b_p_str = "id=bp_" + b.toString() + i.toString();
                document.getElementById(b_s_str).innerHTML = bp1 + b_p_str + bp2;
            }
        }
    }
    if (color == "black") {
        var b;
        for (b = 0; b < 4; b++) {
            var i;
            for (i = 0; i < 4; i ++) {
                let w_s_str = b.toString() + "0" + i.toString();
                let w_p_str = "id=wp_" + b.toString() + i.toString();
                document.getElementById(w_s_str).innerHTML = wp1 + w_p_str + wp2;
                let b_s_str = b.toString() + "3" + i.toString();
                let b_p_str = "id=bp_" + b.toString() + i.toString();
                document.getElementById(b_s_str).innerHTML = bp1 + b_p_str + bp2;
            }
        }
    }
}

setUpBoards();
