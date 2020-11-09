//moje

var WARRIOR_SPEED = 5; //should be 5

const TIME_ASLEEP_AFTER_MOVE = 20;
const HERO_PADDING = 15;
const HERO_REACH = 25;

var futureX = 0;
var futureY = 0;

var currentBarrelIndex = 0;
var n = 0;
const threeSeconds = 90;
const twoSeconds = 60;
const thirtyFrames = 30;
const fifteenFrames = 15;
const tenFrames = 10;
const fiveFrames = 5;
var threeFrames = 3;

var unscrewing = 0;

function warriorClass() 
{
	this.x = 0;
	this.y = 0;
	this.ang = 0;
	this.myWarriorPic; //which picture to use
	this.name = "Untitled Warrior";
	this.hp = 2;
	this.amountOfKeys = 0;
	this.direction = 1;
	// 1=left 2=right 3=up 4=down
	
	this.isDead = false;
	
	this.nextX = 0;
	this.nextY = 0;
	
	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.keyHeld_East = false;
	
	this.controlKeyUp; //w
	this.controlKeyRight; //d
	this.controlKeyDown; //s
	this.controlKeyLeft; //a
	
	this.setupInput = function(upKey, rightKey, downKey, leftKey)
	{
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	this.reset = function(warriorName, whichImage)
	{
	  /*this.keyHeld_North = false;
		this.keyHeld_South = false;
		this.keyHeld_West = false;
		this.keyHeld_East = false; */
		this.name = warriorName;
		if (this.myWarriorPic == undefined) this.myWarriorPic = heroPicLeft;
		//this.myWarriorPic = this.myWarriorPic;
	  for(var eachRow=0;eachRow<WORLD_ROWS; eachRow++)
	  {
		for (var eachCol=0; eachCol<WORLD_COLS; eachCol++)
		{
		  var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
		  
		  if (roomGrid[arrayIndex]==WORLD_PLAYER_START)
		  {
			roomGrid[arrayIndex] = WORLD_ROAD;
			
			this.x= eachCol * WORLD_W + WORLD_W/2;
			this.y= eachRow * WORLD_H + WORLD_H/2;
			
			this.futureX = eachCol * WORLD_W+WORLD_W/2;
			this.futureY = eachRow * WORLD_H+WORLD_H/2;
			return;
		  }
		}
	  }
	  console.log("NO PLAYER START FOUND");
	}
	
	this.resetToNewPosition = function(atX, atY)
	{
	  for(var eachRow=0;eachRow<WORLD_ROWS; eachRow++)
	  {
		for (var eachCol=0; eachCol<WORLD_COLS; eachCol++)
		{
		  var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
		  
		   if (roomGrid[arrayIndex]==WORLD_PLAYER_START)
		  {
			roomGrid[arrayIndex] = WORLD_ROAD; 
		  
			this.x= atX;
			this.y= atY;
			
			this.futureX = atX;
			this.futureY = atY;
			return;
		  }
		}
	  }
	  console.log("NO PLAYER START FOUND"); 
	}
	
	this.move = function()
	{
		futureX = this.x;
		futureY = this.y;
		var futureXforObj = this.x;
		var futureYforObj = this.y;
		
		//UP
		if(this.keyHeld_North && this.keyHeld_South != true && this.keyHeld_East != true && this.keyHeld_West != true && heroIsInCloset != true)
		{
			if(!showingInventory)
			{
				futureY -= WARRIOR_SPEED;
				futureYforObj -= WARRIOR_SPEED + HERO_PADDING;
				//this.myWarriorPic = heroPicUp;
				this.direction = 3;
				this.animationOfWalking(3);
			}
		}
		//DOWN
		if(this.keyHeld_South && this.keyHeld_North != true && this.keyHeld_East != true && this.keyHeld_West != true && heroIsInCloset != true)
		{
			if(!showingInventory)
			{
				futureY += WARRIOR_SPEED;
				futureYforObj += WARRIOR_SPEED + HERO_PADDING -10;
				//this.myWarriorPic = heroPicDown;
				this.direction = 4;
				this.animationOfWalking(4);
			}
		}
		//LEFT
		if(this.keyHeld_West && this.keyHeld_East != true && this.keyHeld_North != true && this.keyHeld_South != true && heroIsInCloset != true)
		{
			if(!showingInventory)
			{
				futureX -= WARRIOR_SPEED;
				futureXforObj -= WARRIOR_SPEED + HERO_PADDING;
				this.direction = 1;
				this.animationOfWalking(1);
			}
		}
		//RIGHT
		if(this.keyHeld_East && this.keyHeld_West != true && this.keyHeld_North != true && this.keyHeld_South != true && heroIsInCloset != true)
		{
			if(!showingInventory)
			{
				futureX += WARRIOR_SPEED;
				futureXforObj += WARRIOR_SPEED + HERO_PADDING;
				//this.myWarriorPic = heroPicRight;
				this.direction = 2;
				this.animationOfWalking(2);
			}
		}
		
		var walkIntoWorldIndex = getTileTypeAtPixelCoord(futureXforObj, futureYforObj);
		var walkIntoWorldKind = WORLD_WALL;
		
		if (walkIntoWorldIndex != undefined)
		{
			walkIntoWorldKind = walkIntoWorldIndex;
		}
		
 		/* console.log("walkIntoWorldIndex= " + walkIntoWorldIndex);
		console.log("walkwalkIntoWorldKind= " + walkIntoWorldKind);  */
		
		switch (walkIntoWorldKind)
		{
		case WORLD_ROAD:
			this.x = futureX;
			this.y = futureY;
			break;
		case DOOR_TO_APARTMENT_FROM_SC:
			
			break;
		case WORLD_DOOR_TO_BATHROOM:

			break;
		case WORLD_WALL:
		
			default:
			break;
		case WORLD_DOOR_TO_APARTMENT_FROM_B:
			
			break;
		case STAIRS_TO_BASEMENT:
			this.x = futureX;
			this.y = futureY;
			if(this.x < 70 && this.y > 340)
			{
				if(monsterSpawned) monsterSleepAfterChangingRooms();
				loadLevel(nearBasementLevel, staircaseLevel, 710, 375);
			}
			break;
		case STAIRS_TO_STAIRCASE:
			this.x = futureX;
			this.y = futureY;
			if(this.x > 720 && this.y > 350)
			{
				if(monsterSpawned){ monsterSleepAfterChangingRooms();}
				loadLevel(staircaseLevel, nearBasementLevel ,90, 375);
			}
			break;
		} 
		
	}
	
	this.animationOfWalking = function(whichWay)
	{
		// 1=left 2=right 3=up 4=down
		switch (whichWay)
		{
			case 1:
				this.myWarriorPic = moveLeftPics[n];
				this.decrementFramesLeft(whichWay);
				break;
			case 2:
				this.myWarriorPic = moveRightPics[n];
				this.decrementFramesLeft(whichWay);
				break;
			case 3:
				this.myWarriorPic = moveUpPics[n];
				this.decrementFramesLeft(whichWay);
				break;
			case 4:
				this.myWarriorPic = moveDownPics[n];
				this.decrementFramesLeft(whichWay);
				break;
		}
		
	}
	
	this.decrementFramesLeft = function(whichWay)
	{
		if(threeFrames > 0)
		{
			threeFrames--;
		} else {
			if (threeFrames == 0)
			{
				this.switchImages(whichWay);
				threeFrames = 3;
			}
		}
	}
	
	this.switchImages = function(whichWay)
	{
		switch (whichWay)
		{
			case 1:
				if(moveLeftPics[n+1] != undefined)
				{
					n++;
				} else {
					n = 0;
				}
				break;
			case 2:
				if(moveRightPics[n+1] != undefined)
				{
					n++;
				} else {
					n = 0;
				}
				break;
			case 3:
				if(moveUpPics[n+1] != undefined)
				{
					n++;
				} else {
					n = 0;
				}
				break;
			case 4:
				if(moveDownPics[n+1] != undefined)
				{
					n++;
				} else {
					n = 0;
				}
				break;
			
		}
	}
	
	this.checkTileTypeInFront = function(atX, atY)
	{
		this.nextX = this.x;
		this.nextY = this.y;
		switch (this.direction)
		{
			case 3:
				this.nextY -= HERO_REACH;
				return getTileTypeAtPixelCoord(atX , atY - HERO_REACH);
				//console.log("Tile type: " + getTileTypeAtPixelCoord(atX , atY - WORLD_W) );
				break;
			case 2:
				this.nextX += HERO_REACH;
				return getTileTypeAtPixelCoord(atX + HERO_REACH , atY);
				//console.log("Tile type: " + getTileTypeAtPixelCoord(atX + WORLD_W , atY) );
				break;
			case 1:
				this.nextX -= HERO_REACH;
				return getTileTypeAtPixelCoord(atX - HERO_REACH, atY);
				//console.log("Tile type: " + getTileTypeAtPixelCoord(atX - WORLD_W, atY) );
				break;
			case 4:
				this.nextY += HERO_REACH;
				return getTileTypeAtPixelCoord(atX , atY + HERO_REACH);
				//console.log("Tile type: " + getTileTypeAtPixelCoord(atX , atY + WORLD_W) );
				break;
			
		}
	}
	
	this.checkTileIndexInFront = function(atX, atY)
	{
		this.nextX = this.x;
		this.nextY = this.y;
		switch (this.direction)
		{
			case 3:
				this.nextY -= HERO_REACH;
				return getTileIndexAtPixelCoord(atX , atY - HERO_REACH);
				//console.log("Tile type: " + getTileTypeAtPixelCoord(atX , atY - WORLD_W) );
				break;
			case 2:
				this.nextX += HERO_REACH;
				return getTileIndexAtPixelCoord(atX + HERO_REACH , atY);
				//console.log("Tile type: " + getTileTypeAtPixelCoord(atX + WORLD_W , atY) );
				break;
			case 1:
				this.nextX -= HERO_REACH;
				return getTileIndexAtPixelCoord(atX - HERO_REACH, atY);
				//console.log("Tile type: " + getTileTypeAtPixelCoord(atX - WORLD_W, atY) );
				break;
			case 4:
				this.nextY += HERO_REACH;
				return getTileIndexAtPixelCoord(atX , atY + HERO_REACH);
				//console.log("Tile type: " + getTileTypeAtPixelCoord(atX , atY + WORLD_W) );
				break;
			
		}
	}
	
	this.checkInteractionOfTileType = function(typeOfTile, indexOfTile)
	{
		currentBarrelIndex = indexOfTile;
		
		//console.log("Tile interracted: " + typeOfTile );
		switch (typeOfTile)
		{
			case WORLD_WALL:
				keys_heldAreDown();
				break;
			case WORLD_DOOR_TO_BATHROOM:
				/* playSound(doorHandleClick, 1);
				this.amountOfKeys--;
				roomGrid[returnWorldArrayIndexUnderWarrior(this.nextX, this.nextY)] = WORLD_ROAD; 
				postMessage("The door is locked. You need a key to open it.");*/
				playSound(doorHandleClick, 1);
				if(monsterSpawned) monsterSleepAfterChangingRooms();
				loadLevel(bathroomLevel, apartmentLevel, 725, 175);
				break;
			case WORLD_DOOR_TO_APARTMENT_FROM_B:
				playSound(doorHandleClick, 1);
				if(monsterSpawned) monsterSleepAfterChangingRooms();
				loadLevel(apartmentLevel, bathroomLevel, 75, 175);
				break;
			case BARREL:
				if(this.checkTileIndexAfterPush() == WORLD_ROAD)
				{
					playSound(pushingObject, 1);
					pushTheTileIndex();
				}
				break;
				
			case DOOR_TO_APARTMENT_FROM_SC:
				playSound(doorHandleClick, 1);
				if(monsterSpawned) monsterSleepAfterChangingRooms();
				loadLevel(apartmentLevel, staircaseLevel, 375, 125);
				break;	
			case WORLD_DOOR_TO_STAIRCASE:
				if(gameProgress > 1)
				{
					playSound(doorHandleClick, 1)
					if(monsterSpawned) monsterSleepAfterChangingRooms();
					loadLevel(staircaseLevel, apartmentLevel, 625, 475);
				}else postMessage("I want to go to the bathroom, not outside.");
				
				break;
			case DOOR_TO_BASEMENT:
				playSound(doorHandleClick, 1)
				if(monsterSpawned) monsterSleepAfterChangingRooms();
				loadLevel(basementLevel, nearBasementLevel, 375, 525);
				break;
			case DOOR_TO_NEAR_BASEMENT:
				playSound(doorHandleClick, 1)
				if(monsterSpawned) monsterSleepAfterChangingRooms();
				loadLevel(nearBasementLevel, basementLevel, 175, 125);
				break;
			
			case PICTURE_OF_AUNT:
				postMessage("Picture of my aunt Julietta. Lovely person.");
				break;
			case PICTURE_OF_UNCLE:
				postMessage("Picture of my uncle Alfredo. Incredible guy!");
				break;
			case KITCHEN:
				postMessage("I don't feel like cooking right now.");
				break;
			case KITCHEN_SINK:
				postMessage("Later on, I should probably clean this sink up.");
				break;
			case BED:
				postMessage("I don't feel like sleeping right now.");
				break;
			case BOX_OF_ITEMS:
				if(gameProgress == HIDING_IN_CLOSET) // (6)
				{
					gameProgress = AFTER_GRABBING_SCREWDRIVER; // (7)
					postMessage("*picked up a screwdriver*");
					interactionIsOn = false;
					setTimeout(function(){interactionIsOn = true;} , 1000);
				}else if(gameProgress == 5 && hasSeenTheBody == false) {postMessage("I have to check on Mr Johnson!");} else postMessage("A box, full of various items.");
				break;
			case TABLE:
				postMessage("A polished table.");
				break;
			case TOWEL:
				postMessage("Fresh, clean towels.");
				break;
			case TOILET_BOWL:
				if(gameProgress < AFTER_TAKING_A_PISS)
				{
					takeApiss();
				}else postMessage("Nothing for me to do here.");
				break;
			case WASHING_MACHINE:
				postMessage("Functional washing machine.");
				break;
			case BATHTUB:
				postMessage("I don't feel like taking a bath now..");
				break;
			case DOOR_NR_ONE:
				playSound(knockingOnNeighbour, 1);
				postMessage("You knock, but there is no answer.");
				break;
			case DOOR_NR_ONE_SIGN:
				postMessage("'Mr Bruce apartment'");
				break;
			case DOOR_NR_TWO:
				playSound(knockingOnNeighbour, 1);
				postMessage("You knock, but there is no answer.");
				break;
			case DOOR_NR_TWO_SIGN:
				postMessage("'Mrs Violet's apartment'");
				break;
			case DOOR_NR_THREE:
				playSound(knockingOnNeighbour, 1);
				postMessage("You knock, but there is no answer.");
				break;
			case DOOR_NR_THREE_SIGN:
				postMessage("'Mr Johnson's apartment'");
				break;
			case INFORMATION_BOX:
				postMessage("Just some info for people who live here.");
				break;
			case NEIGHBOUR:
				postMessage('Mr Johnson: Did you know that "Nocturnus" from latin means "belonging to the night"?');
				break;
			case ELECTRICITY_BOX:
				if(gameProgress < 8)
				{
					if(gameProgress < 3)
					{
						cutsceneIsOn = true;
						keys_heldAreDown();
						postMessage("Very dangerous, high voltage electricity box. I have to be very careful.", 120);
						setTimeout(function(){postMessage("Without proper tools I might get hurt. God forbid i trip and fall into it", 120); }, 4000);
						setTimeout(function(){postMessage("I need a screwdriver to open it. It's in my apartment, in the box near my bed.", 150); }, 8000);
						setTimeout(function(){cutsceneIsOn=false; }, 11000);
						gameProgress = AFTER_CHECKING_THE_ELECTRICITY_BOX;
					}else if(gameProgress < 7){
						postMessage("It's closed. I need a screwdriver to open it. It's in the box near my bed.", 150);
					} else if(gameProgress == 7){
						switch(unscrewing){
							case 0:
								hearbeatVolume = 1;
								playSound(unscrewing1, 1);
								unscrewing++;
								interactionIsOn = false;
								setTimeout(function(){ if(unscrewing == 1)interactionIsOn = true;} , 1000);
								postMessage("Unscrewing...",30);
								break;
							case 1:
								playSound(unscrewing2, 1);
								unscrewing++;
								interactionIsOn = false;
								setTimeout(function(){ if(unscrewing == 2)interactionIsOn = true;} , 1000);
								postMessage("Unscrewing......",30);
								break;
							case 2:
								playSound(unscrewing3, 1);
								unscrewing++;
								interactionIsOn = false;
								setTimeout(function(){ if(unscrewing == 3) interactionIsOn = true;} , 1000);
								postMessage("Unscrewing.........",30);
								break;
							case 3:
								playSound(pushingObject, 1);
								postMessage(" *Electricity box opens* ");
								gameProgress = AFTER_OPENING_THE_ELECTRICITY_BOX; // (8)
								setTimeout(monsterFallsIntoTrap,500);
								break;
						}
					}
				} else {
					if(mainHero.hp == 2){
						postMessage("OUCH!!");
						playSound(electrocute,0.1);
						mainHero.hp--;
					} else if(mainHero.hp == 1){
						deathByElectrocute();
					}
				}
				//activateTheMonster();
				break;
			case CLOSET:
				drawClosetAndHide();
				if(gameProgress == 5) {
					gameProgress = HIDING_IN_CLOSET; // (6)
				}
				break;
			case DEAD_BODY:
				if(hasSeenTheBody == false){
					/* cutsceneIsOn = true;
					keys_heldAreDown();
					setTimeout(function(){postMessage("Mr Jo...");} , 500);
					setTimeout(function(){postMessage("... ");} , 1500);
					setTimeout(function(){postMessage("I... ");} , 2500);
					setTimeout(function(){
						mainHero.goBackwards();
					} , 2600);
					setTimeout(function(){
						postMessage("I should run...");
					} , 4000);
					setTimeout(function(){postMessage("I should hide...");} , 5500);
					setTimeout(function(){ cutsceneIsOn = false;}, 7500);
					setTimeout(function(){
						WARRIOR_SPEED = 5; 
						monsterChase();
					}, 10000);
					hasSeenTheBody = true; */
				}
				break;
		} // end of switch
	}
	this.goBackwards = function(){
		
		moonwalk = setInterval(function(){
			mainHero.keyHeld_East = true;
			//this.x += WARRIOR_SPEED;
			mainHero.direction = 1;
			mainHero.animationOfWalking(1);
			
			if(mainHero.x >=275){
				mainHero.keyHeld_East = false;
				clearInterval(moonwalk);
				setTimeout(function(){
					moonwalkTwo = setInterval(function(){
					mainHero.keyHeld_East = true;
					mainHero.direction = 1;
					mainHero.animationOfWalking(1);
					
					if(mainHero.x >=325){
						mainHero.keyHeld_East = false;
						clearInterval(moonwalkTwo);
					}
				},1000/framesPerSecond)
				},500);
			}
		},1000/framesPerSecond)
		
	}
	
	this.checkTileIndexAfterPush = function()
	{
		// 1=left 2=right 3=up 4=down
		switch (this.direction)
		{
			case 1:
				return this.checkTileTypeInFront(this.x - WORLD_W, this.y);
				break;
			case 2:
				return this.checkTileTypeInFront(this.x + WORLD_W, this.y);
				break;
			case 3:
				return this.checkTileTypeInFront(this.x , this.y - WORLD_H);
				break;
			case 4:
				return this.checkTileTypeInFront(this.x , this.y + WORLD_H);
				break;
		}
	}
	
	this.positionHero = function(fromLevel , toLevel)
	{
		switch (toLevel)
		{
			case 0:
				//this.futureX = 375;
				//this.futureY= 75;
				this.resetToNewPosition(375, 125);
				break;
			case 1: 
				mainHero.reset();
				break;
		}
	}
	
	this.draw = function()
	{
			drawBitmapCenteredInYWithRotation(this.myWarriorPic, this.x , this.y, 0);
	}
	
}//end of class of warrior

function takeApiss()
{
	gameProgress = AFTER_TAKING_A_PISS;
	keys_heldAreDown();
	cutsceneIsOn = true;
	interactionIsOn = false;
	playSound(peeing, 1);
	setTimeout(playLightning, 3200);
	setTimeout(function(){switchLight(); playSound(flickeringLights); playSound(unexpected);}, 2300);//off
	setTimeout(switchLight, 3700);//on
	setTimeout(switchLight, 4100);//off
	setTimeout(switchLight, 4200);//on
	setTimeout(switchLight, 4300);//off
	setTimeout(switchLight, 4600);//on
	setTimeout(switchLight, 4700);//off
	setTimeout(function(){postMessage("Jesus Christ", 120); mainHero.myWarriorPic = heroPicRight;} , 4300);
	setTimeout(switchCutscene, 7000);
	setTimeout(function(){interactionIsOn = true;} , 11000);
	setTimeout(function(){postMessage("I should go to the basement and check out the electricity.", 180);} , 7000);
}

function keys_heldAreDown()
{
	mainHero.keyHeld_East = false;
	mainHero.keyHeld_West = false;
	mainHero.keyHeld_North = false;
	mainHero.keyHeld_South = false;
}

function mainHeroDies(){
	pauseTheGame();
	deathAnimation(true);
	// 46 - 76
}

function deathAnimation(deathByMonster){ // false = electrocutuion
	var tmp = 0;
	var shakeup = 5;
	var shakeMultiplier = -10;
	playSound(monsterScreech,0.7);
	deathAnim = setInterval(function(){ // animation
		//console.log("deathanim1");
		colorRect(0,0,canvas.width,canvas.height,'#0A0A0A');
		drawBitmapCenteredWithRotation(deathAnimationArray[tmp], canvas.width/2, canvas.height/2, shakeup* Math.PI/180.0);
		tmp+=3;
		shakeup += shakeMultiplier;
		shakeMultiplier *= -1;
		if(tmp>=30) {
			clearInterval(deathAnim);
			tmp=0;
			var extraUp = 2;
			var extraRight = 2;
			var extr = 0;
			var pointX = 0;
			var pointY = 0;
			var increase = 100;
			deathAnimationArray[29].width = 800;
			deathAnimationArray[29].height = 600;
			
			deathAnim2 = setInterval(function(){ // closing up
				//console.log("deathanim2");
				//console.log(deathAnimationArray[29].width);
				colorRect(0,0,canvas.width,canvas.height,'#0A0A0A');
				//drawBitmapCenteredWithRotation(deathAnimationArray[29], canvas.width/2, canvas.height/2, 0);
				canvasContext.save();
				canvasContext.rotate(shakeup * Math.PI/180.0);
				canvasContext.drawImage(deathAnimationArray[29], pointX, pointY, deathAnimationArray[29].width, deathAnimationArray[29].height);
				canvasContext.restore();
				deathAnimationArray[29].width += increase; // *1.24
				deathAnimationArray[29].height += increase*1.3; // *1.18
				pointX -= increase/2;
				pointY -= increase/2;
				increase *= 1.5;
				//extraUp *= 0.895; // carefully selected
				//extr += 20;
				//extraRight *= (0.895 * 1.24);
				shakeup += shakeMultiplier;
				shakeMultiplier *= -1;
				tmp++;
				
				if(tmp==20) { // Game over
					clearInterval(deathAnim2);
					if(deathByMonster == true){
						gameOver(false);
					} else {
						colorRect(0,0,canvas.width,canvas.height,'#000000');
					}
				}
			},1000/30);
		}
	},1000/30);
}

function deathByElectrocute(){
	pauseTheGame();
	gameOver(true);
}

function gameOver(electrocuteOrNot){
	bgMusicON = false;
	amnesiaChase.pause();
	stopAllIntervals = true;
	if(electrocuteOrNot == true) {
		playSound(headChop, 0.5);
		playSound(electrocute, 0.8);
		gameDiv.style.display = "none";
		gameoverDiv2.style.display="inline-block";
	}else{
		playSound(headChop, 1);
		gameDiv.style.display = "none";
		gameoverDiv1.style.display="inline-block";
	}
}

/* function gameOver(electrocuteOrNot){
	if(electrocuteOrNot == true) {
		playSound(headChop, 0.5);
		playSound(electrocute, 0.8);
	}else{
		playSound(headChop, 1);
	}
	colorRect(0,0,canvas.width,canvas.height,'#000000');
	colorText("G A M E", canvas.width/2 -200, canvas.height/2-100, "#FFFFFF", 100);
	colorText("O V E R", canvas.width/2 -200, canvas.height/2+25, "#FFFFFF", 100);
	if(electrocuteOrNot == true) {
		colorText("You died by electrocution.", canvas.width/2 -190, canvas.height/2+125, "#FFFFFF", 30);
		colorText("(Why are you so careless?)", canvas.width/2 -150, canvas.height/2+175, "#FFFFFF", 20);
	}
	colorText("Continue...", canvas.width/2 -190, canvas.height/2+215, "#FFFFFF", 30);
} */

/* function mainHeroDies(){
	pauseTheGame();
	deathAnimatio.play();
	gameDiv.style.display ="none"; //inline-block=visible
	videoDiv.style.display ="inline-block";//none=invisible
	
} */
//mainHeroDies();

function lookingAtDeadBody(){
	cutsceneIsOn = true;
	keys_heldAreDown();
	setTimeout(function(){postMessage("Mr Jo...");} , 500);
	setTimeout(function(){postMessage("... ");} , 1500);
	setTimeout(function(){postMessage("I... ");} , 2500);
	setTimeout(function(){
		mainHero.goBackwards();
	} , 2600);
	setTimeout(function(){
		postMessage("I should run...");
	} , 4000);
	setTimeout(function(){postMessage("I should hide...");} , 5500);
	setTimeout(function(){ cutsceneIsOn = false;}, 7500);
	setTimeout(function(){ WARRIOR_SPEED = 4; }, 8000);
	setTimeout(function(){
		WARRIOR_SPEED = 5;
		monsterChase();
	}, 9000);
	hasSeenTheBody = true;
}



