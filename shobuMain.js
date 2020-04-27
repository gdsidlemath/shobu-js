function playAs(color){
    if (color == "white") {
        var b;
        for (b = 0; b < 4; b++) {
            var i;
            for (i = 0; i < 4; i ++) {
                let w_id_str = b.toString() + "3" + i.toString();
                document.getElementById(w_id_str).innerHTML = "<div class='piece' style='background-color: #CCC'></div>";
                let b_id_str = b.toString() + "0" + i.toString();
                document.getElementById(b_id_str).innerHTML = "<div class='piece' style='background-color: #111'></div>";
            }
        }
    }
    if (color == "black") {
        var b;
        for (b = 0; b < 4; b++) {
            var i;
            for (i = 0; i < 4; i ++) {
                let w_id_str = b.toString() + "0" + i.toString();
                document.getElementById(w_id_str).innerHTML = "<div class='piece' style='background-color: #CCC'></div>";
                let b_id_str = b.toString() + "3" + i.toString();
                document.getElementById(b_id_str).innerHTML = "<div class='piece' style='background-color: #111'></div>";
            }
        }
    }
}
