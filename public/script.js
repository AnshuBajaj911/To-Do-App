var temp = "";
var http = "";
var xhttp = new XMLHttpRequest();
function f() {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            temp = this.responseText;
            temp = JSON.parse(temp);
            display(temp, http);
        }
    };
    xhttp.open("GET", "/gettasks", true);
    xhttp.send();


}
//a
function display(temp, http) {
    for (var i = 0; i < temp.length; i++) {
        http += `<li id="${i}" >${temp[i][0]} 
                <form style="display: inline; float:right;" action="/deltask" method="GET" >
                    <input type="text" style="display:none;" name="id" value="${i}" /><button class="btn" type="submit">
                        <i class="fa fa-trash" aria-hidden="true"></i></button></form>
                <form action="/changestatus" method="GET" style="display: inline;float:right;">
                    <input type="text" style="display:none;" name="status" value="${temp[i][1]}"/>
                    <input type="text" style="display:none;" name="cid" value="${i}"/>
                    <button  id="${i}b" class="btn" type="submit" style="align:right;">${ffcheck(temp[i][1])}</button></form>
                </li>`;
    }
    document.getElementById("tt").innerHTML = http;
}

function ffcheck(t) {
    console.log("clicked" + t);
    if (t == 1 || t == true) return `<i class="fa fa-check" aria-hidden="true"></i>`;
    else return `<i class="fa fa-times" aria-hidden="true"></i>`;
}
