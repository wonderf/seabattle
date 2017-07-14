var x=0;
var y=0;
var length=0;
var horizont=""
var pos = "";
function getFire(){
    table = document.getElementById("enemy");
    enemyField = table.getElementsByClassName('field');
    for(var i=0; i<enemyField.length;++i){
        enemyField[i].addEventListener("click",fire);
    }
    var label = document.querySelector('#status');
    label.innerText="FIRE";
    var btn = document.querySelector('#send');
    btn.style="visibility:hidden;";
}
function fire(){
    x=parseInt(this.dataset.i-1);
    y=parseInt(this.dataset.j-1);
    sendFire();
    this.removeEventListener('click',fire,false);
}
function getShoot(){
    var getting = new XMLHttpRequest();
    var label = document.querySelector('#status');
    label.innerText="WAIT";
    getting.open("GET",'/shooter',true);
    getting.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    getting.send();
    getting.onreadystatechange = function () {
        if(getting.readyState == 4){
            var responseText=getting.responseText;
            responseText=responseText.split(' ');
            fillMyField(responseText[0].split('=')[1],responseText[1].split('=')[1],responseText[2]);
        }
    }
}
function fillMyField(x,y,result) {
    var dataSetI = parseInt(x)+2;
    var dataSetJ = parseInt(y)+2;
    var a = document.querySelector('#my > tbody > tr:nth-child(' +dataSetI + ') > td:nth-child(' + dataSetJ + ')');
    switch (result) {
        case "miss":
            a.style = "background-color:blue";
            var label = document.querySelector('#status');
            label.innerText="FIRE";
            break;
        case "bit":
            a.style="background-color:yellow";
            getShoot();
            break;
        case "kill":
            getMyDie();
            break;
    }
}
function iAmWinner() {
    var getting = new XMLHttpRequest();
    getting.open("GET",'/winner',true);
    getting.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    getting.send();
    getting.onreadystatechange = function () {
        if(getting.readyState == 4){
            if(getting.responseText=="true") {
                var label = document.querySelector('#status');
                label.innerText = "U WIN";
            }
        }
    }
}
function iAmLoser() {
    var getting = new XMLHttpRequest();
    getting.open("GET",'/loser',true);
    getting.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    getting.send();
    getting.onreadystatechange = function () {
        if(getting.readyState == 4){
            if(getting.responseText=="true") {
                var label = document.querySelector('#status');
                label.innerText = "U LOSE";
                enemyField = table.getElementsByClassName('field');
                for (var i = 0; i < enemyField.length; ++i) {
                    enemyField[i].removeEventListener("click", fire);
                }
            }
        }
    }
}
function getMyDie() {
    var getting = new XMLHttpRequest();
    getting.open("GET",'/mydie',true);
    getting.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    getting.send();
    getting.onreadystatechange = function () {
        if(getting.readyState == 4){
            var params=getting.responseText;
            params=params.split(' ');
            fillKillSheep(params[0].split('=')[1],params[1].split('=')[1],params[2].split('=')[1],params[3].split('=')[1])
        }
    }
    iAmLoser();
}
function fillKillSheep(x,y,length,horizont){
    var dataSetI=parseInt(x)+2;
    var dataSetJ=parseInt(y)+2;
    if(horizont=="false"){
        for(var i=parseInt(y)+2;i<parseInt(y)+parseInt(length)+2;++i){
            var a = document.querySelector('#my > tbody > tr:nth-child('+ dataSetI + ') > td:nth-child('+i + ')')
            a.style="background-color:red";
        }
    }
    else{
        for(var i=parseInt(x)+2;i<parseInt(x)+parseInt(length)+2;++i){
            var a = document.querySelector('#my > tbody > tr:nth-child('+ i + ') > td:nth-child('+dataSetJ + ')')
            a.style="background-color:red";
        }
    }
    getShoot();
}
function changeEnemyColor(color,x,y) {
    var dataSetI=x+2;
    var dataSetJ=y+2;
    var a = document.querySelector('#enemy > tbody:nth-child(1) > tr:nth-child('+ dataSetI + ') > td:nth-child('+dataSetJ + ')');
    switch (color) {
        case "miss":
            a.style="background-color:blue;";
            getShoot();
            break;
        case "bit":
            a.style="background-color:yellow";
            break;
        case "kill":
            getKillingParams();
            break;
    }
}
function changeKillColor(x,y,length,horizont) {
    var dataSetI=parseInt(x)+2;
    var dataSetJ=parseInt(y)+2;
    if(horizont=="false"){
        for(var i=parseInt(y)+2;i<parseInt(y)+parseInt(length)+2;++i){
            var a = document.querySelector('#enemy > tbody:nth-child(1) > tr:nth-child('+ dataSetI + ') > td:nth-child('+i + ')')
            a.style="background-color:red";
        }
    }
    else{
        for(var i=parseInt(x)+2;i<parseInt(x)+parseInt(length)+2;++i){
            var a = document.querySelector('#enemy > tbody:nth-child(1) > tr:nth-child('+ i + ') > td:nth-child('+dataSetJ + ')')
            a.style="background-color:red";
        }
    }
    iAmWinner();
}
function getKillingParams() {
    var get = new XMLHttpRequest();
    get.open("POST",'/kill',true);
    get.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    get.send('x='+encodeURIComponent(x)+'&y='+encodeURIComponent(y));
    get.onreadystatechange = function () {
        if(get.readyState == 4){
            var params=get.responseText;
            params=params.split(' ');
            changeKillColor(params[0].split('=')[1],params[1].split('=')[1],params[2].split('=')[1],params[3].split('=')[1])

        }
    }
}

function sendFire(){
    var pos = new XMLHttpRequest();
    pos.open("POST",'/fire',true);
    pos.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    pos.send('x='+encodeURIComponent(x)+'&y='+encodeURIComponent(y));
    pos.onreadystatechange = function (){
        if(pos.readyState == 4)
            changeEnemyColor(pos.responseText,x,y)
        }
}