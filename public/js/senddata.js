var sheeps =[];
var horizont=false;
var procentBar=0;
sheeps[1]=4;
sheeps[2]=3;
sheeps[3]=2;
sheeps[4]=1;
var pX=0;
var pY=0;
var n = 10, m = 10;
var x=0,y=0;
var x1 =0;
var y1 =0;

function pushSheep(){
    x=parseInt(this.dataset.i-1)
    y=parseInt(this.dataset.j-1)
    mousemove=true;
}
function endSheep(){
    x1 =parseInt(this.dataset.i-1);
    y1 =parseInt(this.dataset.j-1);
    var lengthSheep = (x1-x) == 0 ? Math.abs(y1-y)+1 : Math.abs(x1-x)+1;
    startXYSheep();
    
    if(checkOrient() && checkFreeSheep(lengthSheep)){
		sendXY(lengthSheep);
	}
}
function checkOrient(){
    if(x1!=x && y1!=y)
        return false;
	if(x1==x)
		horizont=false;
	else
		horizont=true;
    return true;
}
function checkFreeSheep(lengthSheep){
    if(sheeps[lengthSheep]!=0 && lengthSheep<5){
        
        return true;
    }
    return false;
}
function startXYSheep(){
	if(x==x1)
		pX=x1;
	else{
		pX = (x1<x) ? x1 : x;
	}
	if(y-y1==0)
		pY=y1;
	else{
		pY = (y1<y) ? y1 : y;
	}
}


function changeColor(lengthSheep){
    dataSetI=pX+2;
	dataSetJ=pY+2;
	if(!horizont){
		for(i=dataSetJ;i<dataSetJ+lengthSheep;++i){
			a = document.querySelector('#my > tbody > tr:nth-child('+dataSetI+') > td:nth-child('+i+')');
            a.style = "background-color:green;";
		}
	}
    else{
        for(i=dataSetI;i<dataSetI+lengthSheep;++i){
            a = document.querySelector('#my > tbody > tr:nth-child('+i+') > td:nth-child('+dataSetJ+')');
            a.style="background-color:green;";
        }
    }
	
}

function progressBarUpdate(){
    var bar = document.querySelector('.bar');
    procentBar+=10;
    bar.style="width: "+procentBar+"%;";
    if(procentBar==100){
        var hBar= document.querySelector('.progress');
        hBar.style="visibility:hidden;";
        var button=document.querySelector('#send');
        button.style="visibility:visible;";
        
    }
}

function showMatrix(){
	for(var i=0;i<mymatr.legth;++i)
		console.log(mymatr[i][0] + " " + mymatr[i][1] + " " + mymatr[i][2] + " " + mymatr[i][3] + " " + mymatr[i][4] + " " + mymatr[i][5] + " " + mymatr[i][6] + " " + mymatr[i][7] + " " + mymatr[i][8] + " " + mymatr[i][9])
}
function sendXY(lengthSheep){
    var pos = new XMLHttpRequest();
    pos.open("POST",'/put_sheep',true);
    pos.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    pos.send('x='+encodeURIComponent(pX)+'&y='+encodeURIComponent(pY)+'&length='+encodeURIComponent(lengthSheep)+'&horizont='+encodeURIComponent(horizont));
    pos.onreadystatechange = function (){
    if(pos.readyState == 4){
    if(pos.responseText == "true"){
        changeColor(lengthSheep);
        sheeps[lengthSheep]-=1;
        progressBarUpdate();
    }

}
    }
}
