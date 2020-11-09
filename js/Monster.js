var monsterX = 52;
var monsterY = 152;
var monsterShakingX= 700;
var monsterShakingY= 100;
var monsterSpeed = 4;
var monsterShaking = 5;

var monsterChasingIntoTheCloset = true;

var monsterAng = 0;

var minimum = 0;
var winnerIsRight;
var winnerIsUp;

function activateTheMonster()
{
	monsterSpawned = true;
	bgMusicON = false;
	bgMusicON = true;
	whichBgMusic = 2;
}

function monsterFollow(targetX, targetY)
{
	//jesli cel jest u gory to idz do gory
	if(monsterY > targetY)
	{
		monsterY -= monsterSpeed;
	}
	//jesli cel jest u dołu to idz w dół
	if(monsterY < targetY)
	{
		monsterY += monsterSpeed;
	}
	//jesli cel jest po lewej to idz w lewo
	if(monsterX > targetX)
	{
		monsterX -= monsterSpeed;
	}
	//jesli cel jest po prawej to idz w prawo
	if(monsterX < targetX)
	{
		monsterX += monsterSpeed;
	}
}

function calculateDistance (obj1x, obj1y, obj2x, obj2y)
{
	var distX = obj1x - obj2x;
	var distY = obj1y - obj2y;
	var dist = Math.abs( Math.sqrt( Math.pow(distX, 2) + Math.pow(distY, 2) ) );
	return dist;
}

//(no zigzags)
var wallWalkingTimer = 90;
function monsterMoveTo(targetX, targetY)
{
	if(cutsceneIsOn != true){
		var deltaX = targetX - monsterX;
		var deltaY = targetY - monsterY;
		var distToGo = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
		var moveX = monsterSpeed * deltaX/distToGo;
		var moveY = monsterSpeed * deltaY/distToGo;
		
		if(wallWalkingTimer > 0){
			if(getTileTypeAtPixelCoord(monsterX + moveX ,monsterY) != WORLD_ROAD){
				if(getTileTypeAtPixelCoord(monsterX ,monsterY + moveY) == WORLD_ROAD)
				{
					monsterY += moveY;
					wallWalkingTimer--;
				}
				return;
			}
			if(getTileTypeAtPixelCoord(monsterX ,monsterY + moveY) != WORLD_ROAD){
				if(getTileTypeAtPixelCoord(monsterX + moveX ,monsterY) == WORLD_ROAD)
				{
						monsterX += moveX;
						wallWalkingTimer--;
				}
				return;
			}
		}
		if(distToGo > monsterSpeed*2 ){
				monsterX += moveX;
				monsterY += moveY;
			} else {
				//console.log("DEAD");
				mainHero.isDead = true;
				mainHeroDies();
			}
	}
	
	/* var distRight = calculateDistance(monsterX +1, monsterY, targetX, targetY);
	var distLeft = calculateDistance (monsterX -1, monsterY, targetX, targetY);
	var distUp = calculateDistance (monsterX, monsterY -1, targetX, targetY);
	var distDown = calculateDistance (monsterX, monsterY +1, targetX, targetY);
	
	//jesli cel jest po prawej to idz w prawo
	if(monsterX < targetX)
	{
			//jesli cel jest u gory to idz do gory
		if(monsterY >= targetY)
		{
			//if (Math.random() > 0.5) { monsterX += monsterSpeed; } else monsterY -= monsterSpeed;
			//console.log( "Dist difference " + (distRight - distUp) );
			if (distRight <= distUp && getTileTypeAtPixelCoord(monsterX+30 , monsterY) == WORLD_ROAD ) {
				monsterX += monsterSpeed; 
				} else monsterY -= monsterSpeed;
		}
		//jesli cel jest u dołu to idz w dół
		if(monsterY < targetY)
		{
			if (distRight <= distDown && getTileTypeAtPixelCoord(monsterX+30 , monsterY) == WORLD_ROAD )  { monsterX += monsterSpeed; } else monsterY += monsterSpeed;
		}
	} else if(monsterX > targetX)
	{
		//jesli cel jest u gory to idz do gory
		if(monsterY >= targetY)
		{
			if (distLeft <= distUp && getTileTypeAtPixelCoord(monsterX-30 , monsterY) == WORLD_ROAD )  { monsterX -= monsterSpeed; } else monsterY -= monsterSpeed;
		}
		//jesli cel jest u dołu to idz w dół
		if(monsterY < targetY)
		{
			if (distLeft <= distDown && getTileTypeAtPixelCoord(monsterX-30 , monsterY) == WORLD_ROAD )  { monsterX -= monsterSpeed; } else monsterY += monsterSpeed;
		}
	} else {
		//jesli cel jest u gory to idz do gory
		if(monsterY > targetY)
		{
			monsterY -= monsterSpeed;
		}
		//jesli cel jest u dołu to idz w dół
		if(monsterY < targetY)
		{
			monsterY += monsterSpeed;
		}
	} */
	
}

function monsterBehaviourWhenHeroHidden(){
	monsterOutplayed = false;
	//if(getTileTypeAtPixelCoord(monsterX - monsterSpeed, monsterY) == WORLD_ROAD) monsterX -= monsterSpeed;
	var onesectimer = 10;
	var timer2 = 60;
	var monsterInBathroom = false;
	var monsterLeavingBathroom = false;
	var madeAturn = false;
	searching = setInterval(function(){
		if(monsterLeavingBathroom == true) return;
		if(monsterChasingIntoTheCloset == true){
			if(monsterInBathroom){
				monsterLeavingBathroom = true;
				setTimeout(function(){
					playSound(doorHandleClick,1);
					monsterX = 100;
					monsterY = 175;
					clearInterval(searching);
				},3000);
			}else{
				clearInterval(searching);
			}
		}
		if(onesectimer > 0) onesectimer--;
		if(hidingInClosetMaxTime > 0) hidingInClosetMaxTime--;
		if(hidingInClosetMaxTime == 0) monsterChasingIntoTheCloset = true;
		if(onesectimer > 0) return;
		if(timer2 > 0 && madeAturn) timer2--;
		
		if(monsterY < 175){
			monsterY += monsterSpeed;
		} else if(monsterX < 550 && madeAturn == false){
			monsterX += monsterSpeed;
		} else if(monsterX >= 550 && madeAturn == false){
			setTimeout(function(){playSound(pigYell, 1);},1000);
			madeAturn = true;
			onesectimer = 120;
		} else if(monsterX > 200 && monsterInBathroom == false){
				monsterX -= monsterSpeed;
				if(monsterX < 230) timer2 = 60;
		} else if(monsterX > 85 && monsterInBathroom == false && timer2 == 0){
				monsterX -= monsterSpeed;
		} else if(monsterX < 85 && monsterInBathroom == false){
			playSound(doorHandleClick,1);
			playSound(doorHandleClick,0.9);
			playSound(doorHandleClick,1);
			monsterInBathroom = true;
			monsterX = 2000;
		}
		
	},1000/framesPerSecond);
	
}

function monsterFallsIntoTrap(){
	if(mainHero.isDead == true) return;
	cutsceneIsOn = true;
	var onesectimer = 30;
	var onesectimer2 = 40;
	var monsterFellForIt = false;
	var electroshock = 5;
	mainHero.myWarriorPic = heroPicDown;
	keys_heldAreDown();
	jumping = setInterval(function(){
		if(stopAllIntervals == true) clearInterval(jumping);
		if(gameIsPaused) return;
		//console.log(monsterY); 170.65
		if(monsterY > 300){ // run up to the box
			monsterY -= monsterSpeed;
		}else {
			if(onesectimer > 0) onesectimer--;
			//if(onesectimer2 > 0) onesectimer2--;
			//if(onesectimer > 0 && onesectimer < 20 && mainHero.x > 300) {mainHero.x -= WARRIOR_SPEED;}
			if(onesectimer < 1 && monsterY > 175) monsterY -= monsterSpeed*2;
			if(onesectimer < 1 && monsterX < 425) monsterX += monsterSpeed*2;
			if(onesectimer < 1 && monsterX > 425) monsterX -= monsterSpeed*2;
			if( onesectimer == 0 && monsterY > 175){
				gameProgress = AFTER_MONSTER_FALL; // (9)
				clearInterval(jumping);
				var dodged = false;
				mainHero.myWarriorPic = heroPicDown;
				keys_heldAreDown()
				var basementRoom = previousRoom;
				var threeSeconds = 60; // switched a littel
				var monsterElectrocutedMaxTime = 300;
				electrocuted = setInterval(function(){
					if(stopAllIntervals == true) clearInterval(electrocuted);
					if(gameIsPaused) return;
					if(dodged == false && mainHero.x > 300) {mainHero.x -= WARRIOR_SPEED;}
					else {dodged = true;}
					if( monsterY > 175) monsterY -= monsterSpeed*2;
					if(monsterX < 420) monsterX += monsterSpeed*2;
					if(monsterX > 430) monsterX -= monsterSpeed*2;
					monsterX += electroshock;
					electroshock *= -1;
					playSound(electrocute, 1);
					//console.log("bobrze");
					if(threeSeconds > 0) threeSeconds--;
					if(threeSeconds == 0) cutsceneIsOn = false;
					if(previousRoom != basementRoom){ // leaves basement
						var monsterBoxWait = 150; // 5 seconds to barricade the door
						electrocute.pause();
						var currRoom = previousRoom; // = nearBasementLevel
						gettingOut = setInterval(function(){
							//console.log("currRoom: "+currRoom);
							//console.log("prevRoom: "+previousRoom);
							monsterSpawned = false;
							if(stopAllIntervals == true) clearInterval(gettingOut);
							if(monsterBoxWait > 0) monsterBoxWait--;
							if(monsterBoxWait == 0 && previousRoom == currRoom) { // time runs out, monster gets out
								if(roomGrid[35] != BARREL){ //if not barricaded
									monsterSpawned = true;
									playSound(pigYell, 1);
									transportMonster(175, 125);
									monsterSpeed *= 2;
									monsterChasingIntoTheCloset = true;
									clearInterval(gettingOut);
								} else { // else game is finished
									clearInterval(electrocuted);
									clearInterval(gettingOut);
									gameFinished();
								}
							}
							if(currRoom != previousRoom && previousRoom == 4){ // if re-enters basement
								console.log("reenters basement");
								monsterSpawned = true;
								transportMonster(410, 200);
								playSound(pigYell, 1);
								monsterSpeed *= 2;
								clearInterval(gettingOut);
							}
							
						},1000/framesPerSecond);
						clearInterval(electrocuted);
					} else {
						if(monsterElectrocutedMaxTime > 0) monsterElectrocutedMaxTime--;
						if(monsterElectrocutedMaxTime == 0){
							clearInterval(electrocuted);
							transportMonster(420, 220);
							monsterSpeed *= 2;
						}
					}
					
				},1000/framesPerSecond);
				
			}
		}
	},1000/framesPerSecond);
}

function monsterSleepAfterChangingRooms(duration)
{
	//duration in frames
	//if(duration == undefined) duration = twoSeconds;
	//framesLeftForMonster = duration;
	framesLeftForMonster = Math.round((calculateDistance (monsterX, monsterY, mainHero.x, mainHero.y))/4) + 20;
	if(lastHeroRoomTimer ==0) lastHeroRoom = previousRoom;
	if(lastHeroRoomTimer ==0) lastHeroRoomTimer = 60;
	monsterHeroTimerFramesLeft = 60;
}
function resetMonster()
{
	monsterSpawned = true;
	framesLeftForMonster = 0;
	monsterHeroTimerFramesLeft = 0; 
	switch (previousRoom)
	{
		case 0:
			if(pastRoom== 1)//from bathroom
			{
				transportMonster(75, 175)
			} else { //from staricase
				transportMonster(375, 125)
			}
			break;
		case 1:
			transportMonster(725, 175)
			break;
		case 2:
			if(pastRoom== 0)//from apartment
			{
				transportMonster(625, 475)
			} else { //from nearBasementLevel
				transportMonster(110, 375)
			}
			break;
		case 3:
			if(pastRoom== 4)//from basement
			{
				transportMonster(175, 125)
			} else { //from staricase
				transportMonster(690, 375)
				setTimeout(function(){playSound(pigYell, 1);}, 3000);
			}
			break;
		case 4:
			transportMonster(375, 525)
			break;
		
	}
}
function monsterShake()
{
	monsterAng=0;
	monsterShakingX = monsterX;
	monsterShakingY = monsterY;
	if(monsterX < mainHero.x) monsterAng += monsterShaking * Math.PI/180.0; else monsterAng -= monsterShaking * Math.PI/180.0;
	monsterShakingX += monsterShaking;
	monsterShakingY += monsterShaking;
	monsterShaking *= -1;
}

function transportMonster(atX, atY)
{
	monsterX = atX;
	monsterY = atY;
}


