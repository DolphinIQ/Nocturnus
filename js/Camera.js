//moje
var camPanX = 0;
var camPanY = 0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 100;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 50;
var sliderX = 0;
var sliderY = 0;

function sliderReset()
{
	//center slider on screen
	sliderX = canvas.width/2;
	sliderY = canvas.height/2;
}

function instantCamFollow()
{
	camPanX = sliderX - canvas.width/2;
	camPanY = sliderY - canvas.height/2;
}

function cameraFollow()
{
	var cameraFocusCenterX = camPanX + canvas.width/2;
	var cameraFocusCenterY = camPanY + canvas.height/2;
	
	var playerDistFromCameraFocusX = Math.abs(sliderX-cameraFocusCenterX);
	var playerDistFromCameraFocusY = Math.abs(sliderY-cameraFocusCenterY);
	
	if(playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X)
	{
		if(cameraFocusCenterX > sliderX)
		{
			camPanX += WARRIOR_SPEED;
		} else {
			camPanX -= WARRIOR_SPEED;
		}
	}
	
	if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y)
	{
		if(cameraFocusCenterY > sliderY)
		{
			camPanY += WARRIOR_SPEED;
		} else {
			camPanY -= WARRIOR_SPEED;
		}
	}
	
	//blocks camera from showing outside of the world boundries
	if(camPanX < 0)
	{
		camPanX = 0;
	}
	if(camPanY < 0)
	{
		camPanY = 0;
	}
	
	var maxPanRight = WORLD_COLS * WORLD_W - canvas.width;
	var maxPanLeft = WORLD_ROWS * WORLD_H - canvas.height;
	if(camPanX > maxPanRight)
	{
		camPanX = maxPanRight;
	}
	if(camPanY > maxPanLeft)
	{
		camPanY = maxPanLeft;
	}
}

function sliderMove() {
    var nextCamX = sliderX;
    var nextCamY = sliderY;

    if(mainHero.keyHeld_West) {
      nextCamX += -RUN_SPEED;
    }
    if(mainHero.keyHeld_East) {
      nextCamX += RUN_SPEED;
    }
    if(mainHero.keyHeld_North) {
      nextCamY += -RUN_SPEED;
    }
    if(mainHero.keyHeld_South) {
      nextCamY += RUN_SPEED;
    }

    if(isBrickAtPixelCoord(nextCamX,nextCamY) == false) {
      sliderX = nextCamX;
      sliderY = nextCamY;
    }
  }
  
function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
    var tileCol = hitPixelX / WORLD_W;
    var tileRow = hitPixelY / WORLD_H;
    
    // using Math.floor to round down to the nearest whole number
    tileCol = Math.floor( tileCol );
    tileRow = Math.floor( tileRow );

    // first check whether the slider is within any part of the brick wall
    if(tileCol < 0 || tileCol >= WORLD_COLS ||
       tileRow < 0 || tileRow >= WORLD_ROWS) {
       return false;
    }
    
    var worldIndex = worldTileToIndex(tileCol, tileRow);
    return (roomGrid[worldIndex] == 1);
  }
  
function worldTileToIndex(tileCol, tileRow) {
    return (tileCol + WORLD_COLS*tileRow);
  }


