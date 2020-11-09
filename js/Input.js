//moje
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_S = 83;
const KEY_D = 68;
const KEY_A = 65;
const KEY_F = 70;
const KEY_I = 73;
const KEY_P = 80;
const KEY_C = 67;

const KEY_ESC = 27;

const KEY_ENTER = 13;
const KEY_SPACE = 32;

var mouseX = 0;
var mouseY = 0;

var testingMode = false;

function setupInput()
{
	canvas.addEventListener('mousemove', updateMousePos);
	
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	
	mainHero.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

//ruchy myszki~~~~~~~~~~~~~~~~~~~~~~
function updateMousePos(evt)
{
  var rect = canvas.getBoundingClientRect()
  var root = document.documentElement;
  
  mouseX = evt.clientX - rect.left - root.scrollLeft
  mouseY = evt.clientY - rect.top - root.scrollTop
  
}

//~~~~~~~~~~~KIEROWANIE!~~~~~~~~~~~~~~
function keySet(keyEvent, whichWarrior, trueOrFalse)
{
	if(keyEvent.keyCode == whichWarrior.controlKeyLeft && cutsceneIsOn == false)
	{
		whichWarrior.keyHeld_West = trueOrFalse;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyUp && cutsceneIsOn == false)
	{
		whichWarrior.keyHeld_North = trueOrFalse;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyRight && cutsceneIsOn == false)
	{
		whichWarrior.keyHeld_East = trueOrFalse;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyDown && cutsceneIsOn == false)
	{
		whichWarrior.keyHeld_South = trueOrFalse;
	}

}

function keyPressed(evt) 
{
	if(cutsceneIsOn != true) {keySet(evt, mainHero, true);}
	//check key pressed
	//console.log("Key pressed: " + evt.keyCode);
	/* if(evt.keyCode == KEY_I)
	{
		if (showingInventory == false)
		{
			showingInventory = true;
		}else{
			showingInventory = false;
		}
	} */
	if(evt.keyCode == KEY_F)
	{
		if(cutsceneIsOn != true && interactionIsOn == true)
		{
			if(heroIsInCloset == false)
			{
				if(showingControls) {
					stopPause(evt);
					postMessage("I wanna go to the bathroom and take a piss.", 150);
					if(gameProgress < 3) interactionIsOn = false;
					setTimeout(function(){interactionIsOn = true;} , 5000);
				}
				mainHero.checkInteractionOfTileType( mainHero.checkTileTypeInFront(mainHero.x , mainHero.y), 
				mainHero.checkTileIndexInFront(mainHero.x , mainHero.y) );
			}
			else getOutOfCloset();
		}
	}
	
	if(evt.keyCode == KEY_D && testingMode){
		mainHeroDies();
	}
	
	if(evt.keyCode == KEY_A && testingMode)
	{
		gameFinished();
	}

	//keySet(evt, true);
	
	//aby strzalki nie przewijaly strony
	evt.preventDefault();
	
	/* if(evt.keyCode == KEY_P)
	{
		pauseTheGame();
	} */
	
	/* if(evt.keyCode == KEY_S)
	{
		amnesiaChase.pause();
	} */
	
	if(evt.keyCode == KEY_C && testingMode)
	{
		if(previousRoom != 4)
		{
			noLight = true;
 			WARRIOR_SPEED = 5;
			bgMusicON = true; 
			whichBgMusic = 2;
			gameProgress = 7;
			
			loadLevel(nearBasementLevel, apartmentLevel, 200, 150);
			monsterSpawned = true;
			monsterX = 700;
			monsterY = 400;
		}
	}
	
	
}
function stopPause(evt)
{
	showingWinningScreen = false;
	showingControls = false;
}

function keyReleased(evt)
{
	if(cutsceneIsOn != true) {keySet(evt, mainHero, false);}
}
