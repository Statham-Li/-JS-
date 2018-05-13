//点击开始游戏->startpage消失->游戏开始
//随机出现食物，出现三节蛇开始运动
//上下左右->改变运动方向
//判断吃到食物->食物消失蛇加一
//判断游戏结束，弹出框


var startP = document.getElementById('startP');
var lose = document.getElementById('lose');
var scoreBox = document.getElementById('score');
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var snakeMove;
var speed = 200;
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var startBtn = document.getElementById('startBtn');
var startGameBool = true;
var startPauseBool = true;

init();
function init(){
	//地图
		//取出地图的宽高
	this.mapW = parseInt(getComputedStyle(content).width);
	this.mapH = parseInt(getComputedStyle(content).height);
	this.mapDiv = content;
	//食物
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;
	//蛇
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];//设置蛇身体坐标
	//游戏属性,判断方向
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;

	this.score = 0;
	bindEvent();
	/*startGame();*/
}

function startGame(){
	startPage.style.display = 'none';
	startP.style.display = 'block';
	food();
	snake();
	
	// bindEvent();
}

function food(){
	var food = document.createElement('div');
	food.style.width = this.foodW+'px';
	food.style.height = this.foodH+'px';
	food.style.position = 'absolute';
	this.foodX = Math.floor(Math.random()*(this.mapW/20));
	this.foodY = Math.floor(Math.random()*(this.mapH/20));
	food.style.left = this.foodX*20+'px';
	food.style.top = this.foodY*20+'px';
	this.mapDiv.appendChild(food).setAttribute('class','food');
}

function snake(){
	for (var i = 0; i < this.snakeBody.length; i++) {
		var snake = document.createElement('div');
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0]*20 +'px';
		snake.style.top = this.snakeBody[i][1]*20 +'px';
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		/*根据方向判断蛇头转动*/
			switch(this.direct){
			case 'right':
				/*this.snakeBody[0][0] += 1;*/
				break;
			case 'up':
				snake.style.transform = 'rotate(270deg)';
				break;
			case 'left':
				snake.style.transform = 'rotate(180deg)';
				break;
			case 'down':
				snake.style.transform = 'rotate(90deg)';
				break;
			default:
				break;
		}
	}
}

function move(){
	for (var i = this.snakeBody.length-1; i > 0 ; i--) {
		this.snakeBody[i][0] = this.snakeBody[i-1][0];
		this.snakeBody[i][1] = this.snakeBody[i-1][1];
	}
	switch(this.direct){
		case 'right':
			this.snakeBody[0][0] += 1;
			break;
		case 'up':
			this.snakeBody[0][1] -= 1;
			break;
		case 'left':
			this.snakeBody[0][0] -= 1;
			break;
		case 'down':
			this.snakeBody[0][1] += 1;
			break;
		default:
			break;
	}


	/*每次移动删掉前一条蛇，后渲染一条蛇*/
	removeClass('snake');
	snake();

	if (this.snakeBody[0][0]==this.foodX && this.snakeBody[0][1]==this.foodY) {
		var snakeEndX = this.snakeBody[this.snakeBody.length-1][0];
		var snakeEndY = this.snakeBody[this.snakeBody.length-1][1];

		switch(this.direct){
		case 'right':
			this.snakeBody.push([snakeEndX+1,snakeEndY,'body']);
			break;
		case 'up':
			this.snakeBody.push([snakeEndX,snakeEndY-1,'body']);
			break;
		case 'left':
			this.snakeBody.push([snakeEndX-1,snakeEndY,'body']);
			break;
		case 'down':
			this.snakeBody.push([snakeEndX,snakeEndY+1,'body']);
			break;
		default:
			break;
	}
		this.score += 1;
		scoreBox.innerHTML = this.score;
		removeClass('food');
		food();
}

/*判断边界*/
	if(this.snakeBody[0][0]<0||this.snakeBody[0][0]>=this.mapW/20){
		reloadGame();

	}
	if(this.snakeBody[0][1]<0||this.snakeBody[0][1]>=this.mapH/20){
		reloadGame();
	}
	var snakeHX = this.snakeBody[0][0];
	var snakeHY = this.snakeBody[0][1];
	/*判断身体和头是否重合，不从0位从1位*/
	for (var i = 1; i < this.snakeBody.length; i++) {
		if(snakeHX == snakeBody[i][0]&&snakeHY == snakeBody[i][1]){
			reloadGame();
		}
	}
}






function removeClass(classname){
	var ele = document.getElementsByClassName(classname);
	while(ele.length>0){
		ele[0].parentNode.removeChild(ele[0]);/*删除自己，找到父级，删除父级的子级*/
	}
}





/*控制方向*/
function setDirect(code){
	switch(code){
		case 37:
		/*当按下左箭头控制只能上下不能左右*/
			if (this.left) {
				this.direct = 'left';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 38:
		/*当按下上箭头控制只能左右不能上下*/
			if (this.up) {
				this.direct = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 39:
			if (this.right) {
				this.direct = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 40:
			if (this.down) {
				this.direct = 'down';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
	}
}







/*绑定键盘事件*/
function bindEvent(){
	
	close.onclick = function(){
		lose.style.display = 'none';
	}

	startBtn.onclick = function(){
		startAndPause();
	}
	startP.onclick = function(){
		startAndPause();
	}
}




function reloadGame(){
	removeClass('snake');
	removeClass('food');
	clearInterval(snakeMove);
	this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
	/*this.snakeBody = [[4,3,'head'],[3,3,'body'],[2,3,'body']];*/
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	lose.style.display = 'block';
	loserScore.innerHTML = this.score;
	this.score = 0;
	scoreBox.innerHTML = this.score;
	startGameBool = true;
	startPauseBool = true;
	startP.setAttribute('src','./images/start.png');
}

function startAndPause(){
	if (startPauseBool) {
		if (startGameBool) {
			startGame();
			startGameBool = false;
		}
		startP.setAttribute('src','./images/pause.png');
		document.onkeydown = function(e){
			var code = e.keyCode;
			setDirect(code);
		}
		snakeMove = setInterval(function(){
			move();
		},speed);
		startPauseBool = false;
	}else{
		startP.setAttribute('src','./images/start.png');
		clearInterval(snakeMove);
		document.onkeydown = function(e){
			e.returnValue = false;
			return false;
		};
		startPauseBool = true;
	}
}