var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.style.background = "#000033";
var width = 500,
	height = 900;

canvas.width = width;
canvas.height = height;

var imgcucumber = new Image();   
imgcucumber.src = 'img/cucumber.png'; 
var sky = new Image();   
sky.src = 'img/sky.png';
var imgbullet = new Image();   
imgbullet.src = 'img/bullet.png'; 
var imgananas = new Image();
imgananas.src = 'img/ananas.png';
var imgapricot = new Image();
imgapricot.src = 'img/apricot.png';
var imgeggplant = new Image();
imgeggplant.src = 'img/eggplant.png';
var imgJIOX_win = new Image();   
imgJIOX_win.src = 'img/JIOX_win.jpg';
var imgJIOX_lose = new Image();   
imgJIOX_lose.src = 'img/JIOX_lose.jpg';

ctx.fillStyle = "#ffff00"

console.log('12.08.2019')

var fullwidth = 0;
if(screen.width > width){
	fullwidth = (screen.width-width)/2;
}
if(screen.width < 800){
	height - 100
}


var mouse = {
	y : 2,

	speedY : 0,

	oldY : 0,

	update : function(){
		if(this.oldY === 9999) this.oldY = this.y;
		this.speedY = Math.abs(this.y - this.oldY);
		this.oldY = this.y;
		if(screen.width >= 800){
			powerCucumber+=this.speedY/1.5;
		}
		if(screen.width < 800){
			powerCucumber+=(this.speedY/1.5)*2;
		}
		
	}
};
var powerCucumber = -700;
var xCucumber = 0,
	yCucumber = height-250;
	mouseDown = false;
window.onmousedown = function(e){

	fullScreen(canvas);
	mouseDown = true;
}
window.onmouseup = function(){
	mouseDown = false;
	mouse.oldY = 9999;
	canvas.style.cursor="auto";
}
window.onmousemove = function(e){
	if(mouseDown && e.offsetY > 550){
		canvas.style.cursor="grabbing";
		mouse.y = e.offsetY;
		xCucumber = e.offsetX-36;
		mouse.update();
	} else{
		canvas.style.cursor="auto";
	}
}
window.ontouchmove = function(e){
	if(e.changedTouches[0].clientY > 250){
	mouse.y = e.changedTouches[0].clientY;
	xCucumber = e.changedTouches[0].clientX-36;
	mouse.update();
	}
}

window.ontouchstart = function(){
	mouseDown = true;
}
window.ontouchend = function(){
	mouseDown = false;
	mouse.oldY = 9999;
}
var drawCucumber = function(){
	ctx.drawImage(imgcucumber,xCucumber-fullwidth,yCucumber,74,250);
}
var drawPowerSpeed = function(){
	ctx.fillStyle = "yellow";
	ctx.fillRect(canvas.width-60, 350-powerCucumber/200, 50, powerCucumber/200);
}
var arrBulletX = [undefined],
	arrBulletY = [undefined];
var strenght = 0;
var drawBullet = function(){
	for (var i = 0; i < arrBulletX.length; i++) {
		ctx.drawImage(imgbullet, arrBulletX[i], arrBulletY[i], 8, 32);
		arrBulletY[i] -= 20;
	}
}
var deleteOldBullet = function(){
		for(var i = 0; i < arrBulletY.length; i++){
			if(arrBulletY[i] < -200){
				arrBulletY[i] = undefined;
			}
		}
}
var newBullet = function(){
	if(strenght > 0){
		setTimeout(function(){
			deleteOldBullet();
			newBullet();			
			for(var i = 0; i < arrBulletY.length; i++){

				if(!arrBulletY[i]){
					arrBulletX[i] = xCucumber+24-fullwidth;
					arrBulletY[i] = 600;
					break;
				}else if(i === arrBulletY.length-1){
					arrBulletX.push(xCucumber+24-fullwidth);
					arrBulletY.push(600);
					break;
				}
			}
			
		},2000/strenght)
	}else{
		setTimeout(function(){
			newBullet();
		},2000)
	}
}
newBullet();



var ananasX = [undefined],
	ananasY = [undefined],
	apricotX = [undefined],
	apricotY = [undefined],
	eggplantX = [undefined],
	eggplantY = [undefined];
function isInteger(num) {
  return (num ^ 0) === num;
}

/*var moveVector = function(){
	for(var i = 0; i < ananasX.length; i++){
	

		if(isInteger(ananasY[i]/200) && ananasX[i]!= 420 && ananasX[i]!= 16){
			ananasX[i] -= 2;
		}
		else if(isInteger(ananasY[i]/100) && ananasX[i]!= 420 && ananasX[i]!= 16){
			ananasX[i] += 2;
		}
		else{
			ananasY[i] += 2;
			if(isInteger(ananasY[i]/200)){ ananasX[i] -= 2;}
			else if(isInteger(ananasY[i]/100)){ ananasX[i] += 2;}

		}
			
	}
}*/
var randomInteger = function(min, max){
	var rand = min-0.5+Math.random()*(max-min+1);
	rand = Math.round(rand);
	return rand;
}


var ananasSpeed = 10000;
var createAnanas = function(){
	setTimeout(function(){
		if(ananasSpeed > 1500)	ananasSpeed -= (ananasSpeed/50 + strenght*100);
		else ananasSpeed = 1000;
		createAnanas();

		for(var i = 0; i < ananasX.length; i++){
			if(!ananasX[i]){
				ananasX[i] = randomInteger(20, 380);
				ananasY[i] = 0;
				break;
			}else if(i === ananasX.length-1){
				ananasX.push(randomInteger(20, 380));
				ananasY.push(0);
				break;
			}
		}
		
	}, randomInteger(500,ananasSpeed));
}
createAnanas();


var apricotSpeed = 10000;
var createApricot = function(){
	setTimeout(function(){

		if(apricotSpeed > 1500)	apricotSpeed -= (apricotSpeed/50 + strenght*100);
		else apricotSpeed = 1000;
		createApricot();
		for(var i = 0; i < apricotX.length; i++){
			if(!apricotX[i]){
				apricotX[i] = randomInteger(20, 380);
				apricotY[i] = 0;
				break;
			}else if(i === apricotX.length-1){
				apricotX.push(randomInteger(20, 380));
				apricotY.push(0);
				break;
			}
		}

	}, randomInteger(500,apricotSpeed));
}
createApricot();



var eggplantSpeed = 10000;
var createEggplant = function(){
	setTimeout(function(){		

		createEggplant();
		if(eggplantSpeed > 1500) eggplantSpeed -= (eggplantSpeed/50 + strenght*100);
		else eggplantSpeed = 1000;


		for(var i = 0; i < eggplantX.length; i++){
			if(!eggplantX[i]){
				eggplantX[i] = randomInteger(20, 380);
				eggplantY[i] = 0;
				break;
			}else if(i === eggplantX.length-1){
				eggplantX.push(randomInteger(20, 380));
				eggplantY.push(0);
				break;
			}
		}

	}, randomInteger(500,eggplantSpeed));
}
createEggplant();




var drawFruits = function(){
	for (var i = 0; i < ananasX.length; i++) {
		ctx.drawImage(imgananas, ananasX[i],ananasY[i], 64, 64);
	}
	for (var i = 0; i < apricotX.length; i++) {
		ctx.drawImage(imgapricot, apricotX[i],apricotY[i], 64, 64);
	}
	for (var i = 0; i < eggplantX.length; i++) {
		ctx.drawImage(imgeggplant, eggplantX[i],eggplantY[i], 64, 64);
	}
}

var moveFruits = function(){
	for (var i = 0; i < ananasX.length; i++) {
		ananasY[i] += 0.2;
		if(ananasX[i] < 10){
			ananasY[i]+=0.1;
			ananasX[i]+=10;
		}else if(ananasX[i] > 430){
			ananasY[i]-=0.1;
			ananasX[i]-=10;
		}
		if((ananasY[i]*10) & 1){ //нечетно - направо
			ananasX[i]+=5;
		}else{ // четно - налево
			ananasX[i] -= 5;
		}
	}
	for (var i = 0; i < apricotX.length; i++) {
		apricotY[i] += 0.4;
		if(apricotX[i] < 10){
			apricotY[i]+=0.1;
			apricotX[i]+=10;
		}else if(apricotX[i] > 430){
			apricotY[i]-=0.1;
			apricotX[i]-=10;
		}
		if((apricotY[i]*10) & 1){ //нечетно - направо
			apricotX[i]+=6;
		}else{ // четно - налево
			apricotX[i] -= 6;
		}
	}
	for (var i = 0; i < eggplantX.length; i++) {
		eggplantY[i] += 0.6;
		if(eggplantX[i] < 10){
			eggplantY[i]+=0.1;
			eggplantX[i]+=10;
		}else if(eggplantX[i] > 430){
			eggplantY[i]-=0.1;
			eggplantX[i]-=10;
		}
		if((eggplantY[i]*10) & 1){ //нечетно - направо
			eggplantX[i]+=3;
		}else{ // четно - налево
			eggplantX[i] -= 3;
		}
	}
}

var checkCollision = function(){
	for(var i = 0; i < arrBulletX.length; i++){ // основной цикл
		for(var x = 0; x < ananasX.length; x++){//цикл ананаса
			if(arrBulletX[i]+8 > ananasX[x] && arrBulletX[i]+8 < ananasX[x]+64 && arrBulletY[i]+64 > ananasY[x] && arrBulletY[i] < ananasY[x]){
				arrBulletY[i] = undefined;;
				arrBulletX[i] = undefined;;
				ananasX[x] = undefined;
				ananasY[x] = undefined;
			}
		}
		for(var x = 0; x < apricotX.length; x++){//цикл абрикоса
			if(arrBulletX[i]+8 > apricotX[x] && arrBulletX[i]+8 < apricotX[x]+64 && arrBulletY[i]+64 >apricotY[x] && arrBulletY[i] < apricotY[x]){
				arrBulletY[i] = undefined;;
				arrBulletX[i] = undefined;;
				apricotX[x] = undefined;
				apricotY[x] = undefined;
			}
		}
		for(var x = 0; x < eggplantX.length; x++){//цикл баклажана
			if(arrBulletX[i]+8 > eggplantX[x] && arrBulletX[i]+8 < eggplantX[x]+64 && arrBulletY[i]+64 > eggplantY[x] && arrBulletY[i] < eggplantY[x]){
				arrBulletY[i] = undefined;;
				arrBulletX[i] = undefined;;
				eggplantX[x] = undefined;
				eggplantY[x] = undefined;
			}
		}
	}
}
var checkPower = function(){
	if(powerCucumber < 1000) {strenght = 0;}
	else if(powerCucumber > 1000 && powerCucumber < 5000) {strenght = 1;}
	else if(powerCucumber > 5000 && powerCucumber < 10000) {strenght = 2;}
	else if(powerCucumber > 10000 && powerCucumber < 15000) {strenght = 3;}
	else if(powerCucumber > 15000 && powerCucumber < 20000) {strenght = 4;}
	else if(powerCucumber > 20000 && powerCucumber < 25000) {strenght = 5;}
	else if(powerCucumber > 25000 && powerCucumber < 30000) {strenght = 6;}
	else if(powerCucumber > 30000 && powerCucumber < 35000) {strenght = 7;}
	else if(powerCucumber > 35000 && powerCucumber < 40000) {strenght = 8;}
	else if(powerCucumber > 40000 && powerCucumber < 45000) {strenght = 9;}
	else if(powerCucumber > 45000 && powerCucumber < 50000) {strenght = 10;}
	else if(powerCucumber > 50000) strenght = 11;
}
var checkLose = function(){
	for(var i = 0; i < ananasX.length; i++){
		if(ananasY[i] > 836){
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,width,height);
			ctx.drawImage(imgJIOX_lose, 0, 200, 500, 375);
		}
	}
	for(var i = 0; i < apricotX.length; i++){
		if(apricotY[i] > 836){
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,width,height);
			ctx.drawImage(imgJIOX_lose, 0, 200, 500, 375);
		}
	}
	for(var i = 0; i < eggplantX.length; i++){
		if(eggplantY[i] > 836){
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,width,height);
			ctx.drawImage(imgJIOX_lose, 0, 200, 500, 375);
		}
	}
}
function gameLoop(){
	ctx.clearRect(0,0,width,height);

	drawPowerSpeed();
	moveFruits();
	drawFruits();
	drawCucumber();
	drawBullet();
	checkPower();
	checkCollision();
	checkLose();
	if(powerCucumber > 100 && (!mouseDown || mouse.speedY < 2) && screen.width >= 800){
		powerCucumber -= 50;
	}
	if(powerCucumber > 100 && !mouseDown && screen.width < 800){
		powerCucumber -= 25;
	}
	requestAnimationFrame(gameLoop);
}
gameLoop();



function fullScreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.webkitrequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.mozRequestFullscreen) {
    element.mozRequestFullScreen();
  }
}

