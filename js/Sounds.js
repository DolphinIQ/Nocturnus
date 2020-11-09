//moje

var lightning = new Audio("sound/lightning.wav");
var doorHandleClick = new Audio("sound/door_handle_click.mp3");
var pushingObject = new Audio("sound/pushing.wav");
var knockingOnNeighbour = new Audio("sound/knock_knock_knock_wood.wav");
var monsterRoar = new Audio("sound/monster_roar.wav");
var neighbourScream = new Audio("sound/AAAGH1.mp3");
var headChop = new Audio("sound/hit-arg3.mp3");
var pigYell = new Audio("sound/pigYell.mp3");
var monsterScreech = new Audio("sound/monsterSchreech.wav");
var growl = new Audio("sound/silent_beast_growl.mp3");
var unexpected = new Audio("sound/unexpected.wav");
var flickeringLights = new Audio("sound/flickeringLights.wav");
var electrocute = new Audio("sound/electrocute.mp3");
var peeing = new Audio("sound/peeingShort.wav");
var heartbeat = new Audio("sound/heartbeat.wav");
var buttonClick = new Audio("sound/button.wav");

var unscrewing1 = new Audio("sound/unscrewing/uns1.wav");
var unscrewing2 = new Audio("sound/unscrewing/uns2.wav");
var unscrewing3 = new Audio("sound/unscrewing/uns3.wav");

var amnesiaChase = new Audio("sound/amnesia_chase.mp3");
var spookyViolin = new Audio("sound/newTheme1.mp3");
var emptySound = new Audio("sound/empty.mp3");
var bgRain = new Audio("sound/rain-03.mp3");

var bgMusic = [emptySound, spookyViolin, amnesiaChase];

function playSound(nameOfSoundFile, volumeOfFile)
{
	if(volumeOfFile == undefined) volumeOfFile = 1;
	nameOfSoundFile.volume = volumeOfFile;
	nameOfSoundFile.play();
}
function playLightning()
{
	playSound(lightning, 1);
}

function playBgMusic(i, vol)
{
	playSound(bgMusic[i], vol);
}
function playBgRain(){
	playSound(bgRain, 0.5);
}

function pauseBgMusic()
{
	bgMusicON = false;
}
