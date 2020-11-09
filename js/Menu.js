var gameDiv = document.getElementById('gameDiv');
var menuDiv = document.getElementById('menuDiv');
var warningDiv = document.getElementById('warningDiv');
var introDiv = document.getElementById('introDiv');
var gameoverDiv1 = document.getElementById('gameoverDiv1'); // by monster
var gameoverDiv2 = document.getElementById('gameoverDiv2'); // by prąd
var creditsDiv = document.getElementById('creditsDiv'); 

var videoDiv = document.getElementById('videoDiv');
var deathAnimatio = document.getElementById("video1");

function closeGameWindow(){
	window.close();
}

function Introduction(){
	playSound(buttonClick,0.5);
	warningDiv.style.display ="none";
	introDiv.style.display ="inline-block";
}

function Warning(){
	playSound(buttonClick,0.5);
	menuDiv.style.display ="none";
	warningDiv.style.display ="inline-block";
}

var stopAllIntervals = false;
function Respawn(){
	clearMessage();
	keys_heldAreDown();
	monsterX = 52;
	monsterY = 152;
	unscrewing = 0;
	monsterSpawned = false;
	loadLevel(apartmentLevel, staircaseLevel, 640, 200);
	gameoverDiv1.style.display = "none";
	gameoverDiv2.style.display = "none";
	gameDiv.style.display = "inline-block";
	hasSeenTheBody = false;
	cutsceneIsOn = false;
	if(gameIsPaused) pauseTheGame();
	neighbourDies();
	monsterChasingIntoTheCloset = false;
}

function gameFinished(){
	gameProgress = AFTER_BARRICADING_BASEMENT; // (10) GAME FINISHED
	stopAllIntervals = true;
	bgMusicON = false;
	bgRain.pause();
	for(var i=0; i<3; i++){
		bgMusic[i].pause();
	}
	cutsceneIsOn = true;
	setTimeout(function(){
		//clearInterval(welldone2);
		clearInterval(welldone1);
		colorRect(0,0,canvas.width, canvas.height, "#000000");
		Credits();
	}, 6000);
	var imgopacity = 0.05
	clearInterval(game);
	var cos = 60;
	//colorRect(0,0,canvas.width, canvas.height, "#000000");
	welldone1 = setInterval(function(){
		console.log("welldone1");
		drawBitmapTransparent(wellDonePic, 0, 0, imgopacity)
		if(imgopacity < 1) imgopacity += 0.05;
		if(cos > 0) cos--;
		if(cos == 0) clearInterval(welldone1);
	},1000/(framesPerSecond/3));
	/* setTimeout(function(){
		clearInterval(welldone1);
		colorRect(0,0,canvas.width, canvas.height, "#000000");
			var imgopacity2 = 1;
			welldone2 = setInterval(function(){
				colorRect(0,0,canvas.width, canvas.height, "#000000");
				drawBitmapTransparent(wellDonePic, 0, 0, imgopacity)
				if(imgopacity2 > 0) imgopacity2 -= 0.05;
			},1000/(framesPerSecond/3)); 
	}, 4500); */
	
	
}

