
var BLOCK_SIZE=20;
var rows=40;//行数
var cols=40;//列数
var snakes=[];//蛇对象
var snakeLength=10;//初始长度
var direct=3;//前进方向
var foodX=0;//食物位置
var foodY=0;
var score=snakeLength-4;
var speed=100;//移动速度
var speedFont='Speed:Slow';
var beginMove;
window.onload=function(){
	c=document.getElementById('can');
 	can=c.getContext('2d');
 	start();
 	c.addEventListener('click',function(e){
 			if(e.layerX>873&&e.layerX<982&&e.layerY>215&&e.layerY<253){
 			changeSpeed();
 	}
 	},false);
 	document.onkeydown=function(e){
 		var e=e||window.e;
 		keydown(e.which);

 	}

 	
}

function addFood(){
	foodX=Math.floor(Math.random()*(cols-10))*BLOCK_SIZE;
	foodY=Math.floor(Math.random()*(rows-10))*BLOCK_SIZE;
}
function draw(){
    can.clearRect(0,0,c.width,c.height);
	//横线
	for(var i=1;i<=rows;i++){
		can.beginPath();
		can.moveTo(0,i*BLOCK_SIZE);
		can.lineTo(cols*BLOCK_SIZE,BLOCK_SIZE*i);
		can.strokeStyle="grey";
		can.stroke();
	}
	//竖线
	for(var i=1;i<=cols;i++){
		can.beginPath();
		can.moveTo(i*BLOCK_SIZE,0);
		can.lineTo(i*BLOCK_SIZE,BLOCK_SIZE*rows);
		can.stroke();
	}
	//蛇
	for(var i=0;i<snakeLength;i++){
		can.beginPath();
		can.fillStyle='green';
		can.fillRect(snakes[i].x,snakes[i].y,BLOCK_SIZE,BLOCK_SIZE);
	}
	//食物
        can.fillStyle='red';
        can.fillRect(foodX,foodY,BLOCK_SIZE,BLOCK_SIZE);
    //得分
        score=snakeLength-4;
        can.font="30px Arial";
        can.fillStyle="#000";
        can.fillText('score:'+score,850,100);
    //开始按钮
         can.fillStyle='#000';
         can.fillRect(850,130,110,40);
         can.font="20px Arial";
         can.fillStyle="#fff";
         can.fillText('Restart',870,160);
    //调整速度
         can.fillStyle='#000';
         can.fillRect(850,190,110,40);
         can.font="18px Arial";
         can.fillStyle="#fff";
         can.fillText(speedFont,855,215);


}
function isEatFood(){
	
	 if(snakes[snakeLength-1].x==foodX&&snakes[snakeLength-1].y==foodY){
	 	
	 	addSnakeLength();
	    addFood();
	 }

}
function addSnakeLength(){
		snakeLength++;
	 	snakes.push({x:foodX,y:foodY});
}
//移动
function move(){
	switch(direct){
		case 1://左
		snakes.push({x:snakes[snakeLength-1].x-BLOCK_SIZE,y:snakes[snakeLength-1].y});
 		break;
 		case 2://上
 		snakes.push({x:snakes[snakeLength-1].x,y:snakes[snakeLength-1].y-BLOCK_SIZE});
 		break;
 		case 3://右
 		snakes.push({x:snakes[snakeLength-1].x+BLOCK_SIZE,y:snakes[snakeLength-1].y});
 		break;
 		case 4://下
 		snakes.push({x:snakes[snakeLength-1].x,y:snakes[snakeLength-1].y+BLOCK_SIZE});
 		break;
 		default:;
	}
	snakes.shift();
	
	isEatFood();
	isBorder();
	
	draw();
	isOwn();	

}
//键盘移动
function keydown(keyCode){
	switch(keyCode){
		case 37:
			if(direct!=1&&direct!=3)
				direct=1;
			break;
		case 38:
			if(direct!=2&&direct!=4)
				 direct=2;
			break;
		case 39:
			if(direct!=1&&direct!=3)
				 direct=3;
			break;
		case 40:
			if(direct!=2&&direct!=4)
				 direct=4;
			break;
	}
}
	
//边界碰撞
function isBorder(){
	if(snakes[snakeLength-1].x>(cols-2)*BLOCK_SIZE){
			snakes.push({x:0,y:snakes[snakeLength-1].y});
			snakes.shift();
		}
		else if(snakes[snakeLength-1].x<0){
			snakes.push({x:(cols-1)*BLOCK_SIZE,y:snakes[snakeLength-1].y});
			snakes.shift();
		}
		else if(snakes[snakeLength-1].y<0){
			snakes.push({x:snakes[snakeLength-1].x,y:c.height});
			snakes.shift();
		}
		else if(snakes[snakeLength-1].y>(rows-10)*BLOCK_SIZE){
			snakes.push({x:snakes[snakeLength-1].x,y:0});
			snakes.shift();
		}
}
//自身碰撞
function isOwn(){
	  for(var i=0;i<snakeLength-2;i++){
      if(snakes[snakeLength-1].x==snakes[i].x&&snakes[snakeLength-1].y==snakes[i].y)
      	Over();
  	}	
}
//游戏结束
function Over(){
	    //背景
	 	// can.fillStyle='#000';
   		//      can.fillRect(0,0,BLOCK_SIZE*cols,BLOCK_SIZE*rows); 

   		can.globalAlpha=0.9;
        img=new Image();
        img.src='over.jpg';
        img.onload=function(){
        	 can.drawImage(img,0,0,800,633);
        }
        
        clearInterval(beginMove);
       
        can.fillStyle='#000';
        can.fillRect(850,130,110,40);
        can.font="20px Arial";
        can.fillStyle="red";
        can.fillText('Restart',870,160);
        c.addEventListener('click',function(e){
 			if(e.layerX>850&&e.layerX<960&&e.layerY>150&&e.layerY<200){
 			start();
 		}
 	},false);
}
//重新开始
function start(){
 		clearInterval(beginMove);
		snakeLength=10;
		direct=3;
		addFood();
		snakes=[];
		for(var i=0;i<snakeLength;i++){
     		snakes[i]={
     		x:i*BLOCK_SIZE,
     		y:0
     		}
 		}
	 beginMove=setInterval(move,speed);

 	}

//改变速度
function changeSpeed(){
	clearInterval(beginMove);
	if(speed==100){
		speed=10;
		speedFont='Speed:Fast';
     
	}
	else if(speed==0.1){
		speed=100;
		speedFont='Speed:Slow';
        
	}
	else if(speed==10){
		speed=0.1;
		speedFont='Speed:Sonic'
	}
	beginMove=setInterval(move,speed);
}