//moje
var canvas, canvasContext;
var scaledCanvas, scaledContext;

var creditsImg = document.getElementById("creditsImg");

var gameProgress = 0;
const AFTER_WAKING_UP = 1;
const AFTER_TAKING_A_PISS = 2;
const AFTER_CHECKING_THE_ELECTRICITY_BOX = 3;
const AFTER_MEETING_THE_NEIGHBOUR = 4;
const AFTER_MONSTER_ACTIVATION = 5;
const HIDING_IN_CLOSET = 6;
const AFTER_GRABBING_SCREWDRIVER = 7;
const AFTER_OPENING_THE_ELECTRICITY_BOX = 8;
const AFTER_MONSTER_FALL = 9;
const AFTER_BARRICADING_BASEMENT = 10;

var game;
var winningWarrior;
var i = 0;
var mainHero = new warriorClass();
var framesPerSecond = 30;

var message = "";
var message2 = "";
var message3 = "";
var messageIsDisplayed = false;
var framesLeftForMessage = 0;
const FRAMES_TO_SHOW_MESSAGE = 90;
var framesLeftForPlayerSleep = 0;
var cutsceneIsOn = false;
var interactionIsOn = true;
var monsterHeroTimerFramesLeft=0;
var waitedOneSecond = 0;
var oneSecondTimerEnded = false;

var previousRoom = 0;
var nextRoom = 0;
var pastRoom = 0;

var framesLeftForMonster = 0;
var lastHeroRoomTimer= 0;

var lastHeroRoom=0;
var goingToTheBathroom = true;
var gameIsPaused = false;
var showingControls = false;
var showingInventory = false;
var showingWinningScreen = false;
var noLight = false; //lights on/off
var heroIsInCloset = false;
var monsterSpawned = false;
var monsterOutplayed = true; // for hiding in the closet fast enough
var hidingInClosetMaxTime = 450; // 15sec

var afterTalkingToTheNeighbour = false;

var hasSeenTheBody = false;
var bgMusicON = false;
var whichBgMusic = 0;
var bgMusicVolume = 0.4;
var hearbeatVolume = 0.5;

//window.onload = function()
function PLAY()
{
	playSound(buttonClick, 0.5);
	introDiv.style.display ="none";
	gameDiv.style.display ="inline-block";
	
	canvas = document.getElementById('gameCanvas');
	canvasContext=canvas.getContext('2d');
	
	colorRect(0,0, canvas.width, canvas.height, "black");
	colorText("LOADING...", canvas.width/2, canvas.height/2, "white");
	
  	loadImages();
	
	/* backgroundMusic = document.getElementById('backgroundMusic');
	bgMusicSlider = document.getElementById('bgMusicSlider');
	changeVolume(); */
}
function imageLoadingDoneSoStartGame() // INTRO
{
	
	colorRect(0,0, canvas.width, canvas.height, "black");
	setTimeout(function(){playBgRain(); playLightning();}, 4000);
	setTimeout(function(){deathAnimation(false);}, 10600);
	setTimeout(wakingUpImage, 12000);
	setTimeout(function(){drawSupportBar(); postMessage("AAAH!"); drawSupportBar();}, 12000);
	setTimeout(function(){drawSupportBar(); postMessage("..."); drawSupportBar();}, 13000);
	setTimeout(function(){drawSupportBar(); postMessage("It was just a dream..."); drawSupportBar();}, 16000);
	setTimeout(startTheGame, 19000);
	//startTheGame();

}
function startTheGame()
{
	
	showingControls = true;
	setGameInterval();
	setupInput();
	loadNextLevel();
	
	gameProgress = AFTER_WAKING_UP;
}
function setGameInterval()
{
	game = setInterval(updateAll, 1000/framesPerSecond);
}

function loadLevel(whichLevel, fromWhichLevel, atX, atY)
{
	roomGrid = whichLevel.slice();
	pastRoom = returnRoomId(fromWhichLevel);
	//console.log("prevRoom: " + previousRoom + " nextRoom: " + nextRoom);
	mainHero.resetToNewPosition(atX , atY);
	previousRoom = returnRoomId(whichLevel);
	//console.log("Room Id: " + previousRoom);
	//console.log("LastRoom: " + lastHeroRoom);
}

/*function sleep(miliseconds) 
{
	var currentTime = new Date().getTime();
	
	while (currentTime + miliseconds >= new Date().getTime()) {
		
	}
}*/

function pauseTheGame()
{
		/* if(!gameIsPaused)
		{
			game = clearTimeout(game);
			gameIsPaused = true;
		} 
		if(gameIsPaused)
		{
			setGameInterval();
			gameIsPaused = false;
		} */
		
	if(gameIsPaused == true)
	{
		setGameInterval();
		gameIsPaused = false;
	} else if(gameIsPaused == false)
	{
		clearInterval(game);
		gameIsPaused = true;
	} 
}

function loadNextLevel()
{
	if(maps[i]!= undefined)
	{
		roomGrid = maps[i].slice();
		mainHero.reset("George", heroPicRight);
		previousRoom = returnRoomId(maps[i]);
		i++;
	} else {
		i=0;
		roomGrid = maps[i].slice();
		mainHero.reset("George", heroPicRight);
		previousRoom = returnRoomId(maps[i]);
		i++;
	}
}
var anglele = 0;
function testAnimation(){
	
	var finishAngle = anglele *Math.PI / 180;
	
	canvasContext.save();
	canvasContext.translate(canvas.width/2, canvas.height/2);
	canvasContext.rotate(finishAngle);
	canvasContext.drawImage(extraPic, -extraPic.width/2, -extraPic.height/2, extraPic.width, extraPic.height);
	canvasContext.restore();
	
	extraPic.width += 2;
	extraPic.height += 2;
	anglele += 4;
}

function updateAll()
{
  draw();
  
  if(showingControls)
	{
		canvasContext.drawImage(controlsPic, 150, 150);
		//colorRect(0,0, canvas.width, canvas.height, "black");
		//colorText("Press Space to continue...", canvas.width/2 - 60, canvas.height/2 + 142, "white");
		return;
	}
	
  moveAll();
  
  //testAnimation();
  
  if (framesLeftForMonster > 1)
    {
        framesLeftForMonster--;
			if (framesLeftForMonster == 1)
			{
				resetMonster();
			}
    }

	if (lastHeroRoomTimer >= 1)
    {
        lastHeroRoomTimer--;
    }
  if (monsterHeroTimerFramesLeft >= 1)
    {
        monsterHeroTimerFramesLeft--;
		if(lastHeroRoom == previousRoom) resetMonster();
    }
	if (waitedOneSecond > 0)
	{
		waitedOneSecond--;
	}
	
	if(bgMusicON){
		playBgMusic(whichBgMusic, bgMusicVolume);
	}
	playBgRain();
	if(hasSeenTheBody) playSound(heartbeat, hearbeatVolume);

  //console.log( "Distance: " + calculateDistance (monsterX, monsterY, mainHero.x, mainHero.y) );
  //console.log("framesLeftForPlayerSleep: " + framesLeftForPlayerSleep);
  //console.log("previousRoom: " + previousRoom);
  //console.log("pastRoom: " + pastRoom);
  //console.log("barrelY: " + barrelY);
  //console.log("findBarrelIndex: " + findBarrelIndex());
  //console.log("indexOfTheBarrel: " + indexOfTheBarrel);
  //console.log("roomGrid[findBarrelIndex()]: " + roomGrid[findBarrelIndex()]);
  //console.log("x: " + monsterX + " y: " + monsterY);
  //console.log("lastHeroRoomTimer: " + lastHeroRoomTimer);
  //console.log("framesMonster " + framesLeftForMonster);
  //console.log("Game Progress: " + gameProgress);
  //console.log("mainHero.y = " + mainHero.y);
  //console.log("mainHero.keyHeld_North = " + mainHero.keyHeld_North);
  //console.log(monsterSpawned);
}

function draw()
{
  //drawWorlds();
  
  if(monsterSpawned == true) monsterShake();
  
  drawLevelDesign(previousRoom);
  if(previousRoom == 3 || previousRoom == 4) drawBarrels();
  if (monsterSpawned == true && framesLeftForMonster == 0) drawBitmapCenteredInYWithRotation(monsterPic, monsterX, monsterY, 0);
  mainHero.draw();
  if(previousRoom == 3 || previousRoom == 4) drawBarrelTops();
  if(previousRoom == 0 && heroIsInCloset == true ) canvasContext.drawImage(closetPic, 600, 0);
  if((gameProgress == 3 || gameProgress == 4) && previousRoom == 2 && mainHero.y < 170)drawBitmapCenteredInYWithRotation(neighbourPic, 625, 180);
  
  if (monsterSpawned == true && framesLeftForMonster == 0) if(monsterY +4 > mainHero.y)drawBitmapCenteredInYWithRotation(monsterPic, monsterX, monsterY, monsterAng);
  if (monsterSpawned == true && framesLeftForMonster == 0) drawBitmapCenteredInYWithRotation(monsterPic, monsterShakingX, monsterShakingY, monsterAng);
  
  if (noLight)
  {
	canvasContext.drawImage(darknessPic, mainHero.x - 800, mainHero.y - 630);
  }
  drawSupportBar();
}
var neighbourIsAlive = true;
var monsterChaseNotYet = true;
function moveAll()
{
  mainHero.move();
  //monsterFollow(mainHero.x, mainHero.y);
  if(monsterSpawned == true && framesLeftForMonster == 0){
		if(monsterChasingIntoTheCloset == true){
			monsterMoveTo(mainHero.x, mainHero.y);
		}else{ // hero hid in closet successfully
			if(monsterOutplayed)monsterBehaviourWhenHeroHidden();
		}
	}
  talkingToNeighbour();
  if(gameProgress == 4 && previousRoom == 0 && mainHero.x > 650 && mainHero.y < 300 && neighbourIsAlive) neighbourDies();
  
  if(gameProgress == 5 && monsterChaseNotYet && previousRoom == 2 && mainHero.x < 250 && mainHero.y < 350 && hasSeenTheBody == false) {
	  lookingAtDeadBody();
	  stopAllIntervals = false;
  }
  
  //if(gameProgress == 5 && monsterChaseNotYet && previousRoom == 2 && hasSeenTheBody && mainHero.x > 350 && mainHero.y < 300) monsterChase();
}

var startedTalkingToNeighbour = false;
var finishedTalkingToNeighbour = false;
function talkingToNeighbour()
{
	if(gameProgress == 3 && previousRoom == 2 && finishedTalkingToNeighbour == false)
	{
		if(mainHero.x > 450)
		{
			cutsceneIsOn = true;
			playSound(unexpected,1);
			if(oneSecondTimerEnded == false) 
			{
				waitedOneSecond = 30;
				oneSecondTimerEnded = true;
			}
			if(mainHero.x < 625 && waitedOneSecond == 0)
			{
				mainHero.keyHeld_East = true;
				if(mainHero.x >550) postMessage("Mr Johnson!");
			} else {
				mainHero.keyHeld_East = false;
			
				if(mainHero.y > 250 && waitedOneSecond == 0)
				{
					//mainHero.y -= WARRIOR_SPEED;
					mainHero.keyHeld_North = true;
					//console.log("mainHero.keyHeld_North = " + mainHero.keyHeld_North);
				}else {mainHero.keyHeld_North = false;}
			}
			//talking to the neighbour
			if(mainHero.y <= 250 && startedTalkingToNeighbour == false)
			{
				postMessage("You scared the shit out of me.");
				//talking
				//setTimeout(function(){postMessage("");} , );
				startedTalkingToNeighbour = true;
				finishedTalkingToNeighbour = true;
				gameProgress = AFTER_MEETING_THE_NEIGHBOUR; //(4)
				cutsceneIsOn = false;
			}
		}
	}
}

function neighbourDies()
{
	cutsceneIsOn = true;
	keys_heldAreDown();
	playSound(monsterRoar, 0.4);
	playSound(neighbourScream, 1);
	setTimeout(function(){mainHero.myWarriorPic = heroPicLeft;} , 1000);
	setTimeout(function(){postMessage("What the hell was that?!");} , 2500);
	setTimeout(function(){cutsceneIsOn = false; WARRIOR_SPEED = 3} , 3500);
	setTimeout(function(){bgMusicON = true; whichBgMusic = 1; bgMusicVolume *= 0.5} , 5000);
	setTimeout(function(){bgMusicVolume *= 2} , 7000);
	gameProgress = AFTER_MONSTER_ACTIVATION; // (5)
	neighbourIsAlive = false;
}

function monsterChase()
{
	monsterChaseNotYet = false;
	
	setTimeout(function(){activateTheMonster(); bgMusicVolume *= 2;}, 1000);
	setTimeout(function(){bgMusicVolume *= 1; WARRIOR_SPEED = 5;}, 2000);
	
}

function drawSupportBar()
{
	colorRect(canvas.width/2, 515, canvas.width/2 - 14, 76, "black");//tło
	colorRect(canvas.width/2, 515, canvas.width/2 - 14, 2, "white");//obramowanie top
	colorRect(canvas.width/2, 515+76, canvas.width/2 - 14, 2, "white");//obramowanie bot
	colorRect(canvas.width/2, 515, 2, 76, "white");//obramowanie left
	colorRect(canvas.width - 14, 515, 2, 76, "white");//obramowanie right
	
	//colorText ("Keys: " + mainHero.amountOfKeys , canvas.width/2 + 7,515 +13, "white"); //ilosc kluczy
	if (framesLeftForMessage > 0)
    {
        colorText(message, canvas.width/2+10 , 515+31 , "white", 15);
		colorText(message2, canvas.width/2+10 , 515+47 , "white", 15);
		colorText(message3, canvas.width/2+10 , 515+63 , "white", 15);
        framesLeftForMessage--;
    }
}

function postMessage(str, durationOfMessage)
{
	clearMessage();
	var numberOfCharacters = str.split("");
	var numberOfWords = str.split(" ");
	var words = numberOfWords.length/2;
	var mediumNumberOfLettersInWord = Math.round(numberOfCharacters.length / numberOfWords.length);
	
	var sentence = "";
	var sentence2 = "";
	var sentence3 = "";
	
	for(var j = 0; j < (48/mediumNumberOfLettersInWord); j++)
	{
		if(numberOfWords[j] != undefined)
		sentence += numberOfWords[j] + " " ;	
	}
	
	for(var k = j; k < (96/mediumNumberOfLettersInWord); k++)
	{
		if(numberOfWords[k] != undefined)
		sentence2 += numberOfWords[k] + " " ;	
	}
	
	for(var l = k; l < numberOfWords.length; l++)
	{
		if(numberOfWords[l] != undefined)
		sentence3 += numberOfWords[l] + " " ;	
	}
	
	//console.log("Ilosc znakow = " + numberOfCharacters.length);
	if(numberOfCharacters.length < 55 )
	{
		message = str;
		//console.log("pierwszy if");
	}
	if (numberOfCharacters.length >= 55 && numberOfCharacters.length < 95 )
	{
		message = sentence;
		message2 = sentence2;
		//console.log("drugi if");
	} 
	if (numberOfCharacters.length >= 95 && numberOfCharacters.length < 135 )
	{
		message = sentence;
		message2 = sentence2;
		message3 = sentence3;
		//console.log("trzeci if");
	}
	
	if(durationOfMessage == undefined || durationOfMessage < 0)
	{
		durationOfMessage = FRAMES_TO_SHOW_MESSAGE;
	}
	framesLeftForMessage = durationOfMessage;
} 

function clearMessage()
{
    framesLeftForMessage = 0;
	message = "";
	message2 = "";
	message3 = "";
}

function drawLevelDesign(whichLevel)
{
	switch ( previousRoom )
	{
		case 0:
			canvasContext.drawImage(apartmentPic, 0, 0);
			break;
		case 1:
			canvasContext.drawImage(bathroomPic, 0, 0);
			break;
		case 2:
			if(gameProgress < 5)
			{
				canvasContext.drawImage(staircasePic, 0, 0);
				if(gameProgress == 3 || gameProgress == 4)
				{
					drawBitmapCenteredInYWithRotation(neighbourPic, 625, 180);
					roomGrid[60] = NEIGHBOUR;
				}
				
			} else {
				canvasContext.drawImage(staircaseBloodyPic, 0, 0);
				if(hasSeenTheBody == false){
					roomGrid[34] = DEAD_BODY;
				} else {
					roomGrid[34] = WORLD_ROAD;
				}
			}
			break;
		case 3:
			canvasContext.drawImage(nearBasementPic, 0, 0);
			drawBarrels();
			break;
		case 4:
		if(gameProgress < 8)
		{
			canvasContext.drawImage(basementClosedPic, 0, 0);
		}else{
			canvasContext.drawImage(basementPic, 0, 0);
		}
			drawBarrels();
	}
}

function switchLight()
{
	if(noLight == true)
	{
		noLight = false;
	}else noLight = true;
}

function switchCutscene()
{
	if(cutsceneIsOn == true)
	{
		cutsceneIsOn = false;
	}else cutsceneIsOn = true;
}

var positio = 599;
function Credits(){
	colorRect(0,0,canvas.width,canvas.height, "#000000")
	creditso = setInterval(function(){
		//console.log(positio);
		positio-= 2; 
		if(positio < -1800){
			//colorText("Thank you for playing", canvas.width/2 - 300 , canvas.height/2 , 50);
			clearInterval(creditso);
		} else {
			canvasContext.drawImage(creditsImg, 0,positio);
		}
	},1000/framesPerSecond);
}

/* function changeVolume()
{
    backgroundMusic.volume = bgMusicSlider.value;
} */
	
