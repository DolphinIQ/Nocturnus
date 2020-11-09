//moje
const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;

const WARRIOR_RADIUS = 10;

var barrelX = 250;
var barrelY = 200;
var indexOfTheBarrel = 0;
var indexOfTheBarrelTwo = 0;

var levelTemplate =[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]

// 0					 
var apartmentLevel=[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 22, 1 , 1 , 1 , 6 , 1 , 23, 1 , 1 , 1 , 13, 1 , 1 ,
					 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 4 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 21, 1 ,
					 1 , 1 , 24, 0 , 0 , 0 , 27, 27, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 1 , 24, 0 , 0 , 0 , 27, 27, 0 , 0 , 0 , 0 , 0 , 26, 26, 1 ,
					 1 , 1 , 25, 0 , 0 , 0 , 27, 27, 0 , 0 , 0 , 0 , 0 , 26, 26, 1 ,
					 1 , 1 , 25, 0 , 0 , 0 , 27, 27, 0 , 0 , 0 , 0 , 2 , 26, 26, 1 ,
					 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 26, 26, 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]


// 1					
var bathroomLevel =[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 29, 29, 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 28, 28, 30, 0 , 0 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 2 , 3 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 31, 31, 0 , 0 , 0 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 31, 31, 0 , 0 , 0 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 31, 31, 0 , 0 , 0 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 31, 31, 0 , 0 , 0 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
					 
//2						
var staircaseLevel=[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 36, 37, 1 , 1 , 34, 35, 1 , 1 , 32, 33, 1 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 38, 38, 0 , 0 , 0 , 0 , 1 , 1 ,
					 1 , 10, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 ,
					 1 , 10, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 ,
					 1 , 10, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 2 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 5 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
					 
// 3					 
var nearBasementLevel =[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
						 1 , 1 , 1 , 7 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
						 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
						 1 , 0 , 0 , 0 , 0 , 12, 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
						 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
						 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
						 1 , 12, 12, 12, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 11, 1 ,
						 1 , 12, 12, 0 , 0 , 0 , 12, 0 , 0 , 0 , 0 , 0 , 0 , 2 , 11, 1 ,
						 1 , 0 , 0 , 0 , 0 , 0 , 12, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 11, 1 ,
						 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
						 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
						 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]

// 4						 
var basementLevel =[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 1 , 40, 40, 40, 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 12, 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 12, 0 , 0 , 12, 0 , 0 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 12, 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 12, 0 , 0 , 0 , 0 , 0 , 1 ,
					 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 12, 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 2 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
					 1 , 1 , 1 , 1 , 1 , 1 , 1 , 8 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]						 
						 
const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYER_START = 2;
const WORLD_DOOR_TO_APARTMENT_FROM_B = 3;
const WORLD_DOOR_TO_BATHROOM = 4;
const DOOR_TO_APARTMENT_FROM_SC = 5;
const WORLD_DOOR_TO_STAIRCASE = 6;
const DOOR_TO_BASEMENT = 7;
const DOOR_TO_NEAR_BASEMENT = 8;

const STAIRS_TO_BASEMENT = 10;
const STAIRS_TO_STAIRCASE = 11;

const BARREL = 12;
const CLOSET = 13;
//APARTMENT
const BOX_OF_ITEMS = 21;
const PICTURE_OF_UNCLE = 22;
const PICTURE_OF_AUNT = 23;
const KITCHEN = 24;
const KITCHEN_SINK = 25;
const BED = 26;
const TABLE = 27;
//BATHROOM
const WASHING_MACHINE = 28;
const TOWEL = 29;
const TOILET_BOWL = 30;
const BATHTUB = 31;
//STAIRCASE
const DOOR_NR_ONE = 32;
const DOOR_NR_ONE_SIGN = 33;
const DOOR_NR_TWO= 34;
const DOOR_NR_TWO_SIGN = 35;
const DOOR_NR_THREE= 36;
const DOOR_NR_THREE_SIGN = 37;
const INFORMATION_BOX = 38;
const NEIGHBOUR = 39;
const DEAD_BODY = 50;
//BASEMENT
const ELECTRICITY_BOX = 40;
//                0                1               2                3                4
var maps = [apartmentLevel, bathroomLevel, staircaseLevel, nearBasementLevel, basementLevel];				 
var roomGrid = [];

function returnRoomId(levelName)
{
	for (var a=0; a < maps.length; a++)
	{
		if (maps[a]==levelName)
			return a;
	}
}

function returnTileTypeAtColRow(col,row)
{
  if(col >= 0 && col <WORLD_COLS &&
     row >= 0 && row < WORLD_ROWS)
	 {
	   var worldIndexUnderCoord = rowColToArrayIndex(col, row) 
	   
	   return roomGrid[worldIndexUnderCoord];
	   }else{
	     return WORLD_WALL;
	   }
	   
}

function getTileTypeAtPixelCoord(atX, atY) 
{
	var warriorWorldCol = Math.floor(atX / WORLD_W);
	var warriorWorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
		var tileHere = returnTileTypeAtColRow( warriorWorldCol,warriorWorldRow );

		return tileHere;
	} // end of valid col and row

	return WORLD_WALL; // treat outside the map boundary as solid area
}

function getTileIndexAtPixelCoord(atX, atY)
{
	var WorldCol = Math.floor(atX / WORLD_W);
	var WorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderWarrior = rowColToArrayIndex(WorldCol, WorldRow);
	return worldIndexUnderWarrior;
}

function rowColToArrayIndex(col, row)
{
  return col + WORLD_COLS * row;
}

function returnWorldArrayIndexUnderWarrior(warX, warY)
{
	var warriorWorldCol = Math.floor(warX / WORLD_W);
	var warriorWorldRow = Math.floor(warY / WORLD_H);
	var g = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);
	return g;
}

function tileTypeHasTransparency(checkTileKind)
{
	return (checkTileKind == WORLD_DOOR_TO_BATHROOM);
}

function drawWorlds()
{
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	
  for(var eachRow=0;eachRow<WORLD_ROWS; eachRow++)
  {
    for (var eachCol=0; eachCol<WORLD_COLS; eachCol++)
    {
		var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
		var tileKindHere = roomGrid[arrayIndex];
		var useImg = worldPics[tileKindHere]
		if(tileTypeHasTransparency(tileKindHere))
		{
			canvasContext.drawImage(worldPics[WORLD_ROAD],drawTileX ,drawTileY);
		}
			
		canvasContext.drawImage(useImg,drawTileX ,drawTileY);
		
		drawTileX += WORLD_W;
		arrayIndex++;
		
    }// #2 for
	drawTileY += WORLD_H;
	drawTileX = 0;
  }// #1 for
}//end of drawWorlds

function drawBarrels()
{
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	
  for(var eachRow=0;eachRow<WORLD_ROWS; eachRow++)
  {
    for (var eachCol=0; eachCol<WORLD_COLS; eachCol++)
    {
		var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
		var tileKindHere = roomGrid[arrayIndex];
			
		if(tileKindHere == BARREL)
		{
			canvasContext.drawImage(barrelPic, drawTileX ,drawTileY - WORLD_H);
			barrelY = drawTileY;
		}
		
		drawTileX += WORLD_W;
		arrayIndex++;
		
    }// #2 for
	drawTileY += WORLD_H;
	drawTileX = 0;
  }// #1 for
}

function drawBarrelTops()
{
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	
  for(var eachRow=0;eachRow<WORLD_ROWS; eachRow++)
  {
    for (var eachCol=0; eachCol<WORLD_COLS; eachCol++)
    {
		var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
		var tileKindHere = roomGrid[arrayIndex];
			
		if(tileKindHere == BARREL)
		{
			canvasContext.drawImage(barrelTopPic, drawTileX ,drawTileY - WORLD_H);
		}
		
		drawTileX += WORLD_W;
		arrayIndex++;
		
    }// #2 for
	drawTileY += WORLD_H;
	drawTileX = 0;
  }// #1 for
}

function findBarrelIndex()
{
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	
  for(var eachRow=0;eachRow<WORLD_ROWS; eachRow++)
  {
    for (var eachCol=0; eachCol<WORLD_COLS; eachCol++)
    {
		var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
		var tileKindHere = roomGrid[arrayIndex];
			
		if(tileKindHere == BARREL)
		{
			indexOfTheBarrel = arrayIndex;
			indexOfTheBarrelTwo = arrayIndex;
			return arrayIndex;
		}
		
		drawTileX += WORLD_W;
		arrayIndex++;
		
    }// #2 for
	drawTileY += WORLD_H;
	drawTileX = 0;
  }// #1 for
}

function pushTheTileIndex()
{
	findBarrelIndex();
	roomGrid[currentBarrelIndex] = WORLD_ROAD;
	// 1=left 2=right 3=up 4=down
	switch (mainHero.direction)
	{
		case 1:
			roomGrid[currentBarrelIndex - 1] = BARREL;
			break;
		case 2:
			roomGrid[currentBarrelIndex + 1] = BARREL;
			break;
		case 3:
			roomGrid[currentBarrelIndex - 16] = BARREL;
			break;
		case 4:
			roomGrid[currentBarrelIndex + 16] = BARREL;
			break;
	}
	
}

function drawClosetAndHide()
{
	heroIsInCloset = true;
	//canvasContext.drawImage(closetPic, 600, 0);
	mainHero.x = 675;
	mainHero.y = 30;
	mainHero.myWarriorPic = heroPicDown;
	if(gameProgress > 4){
		if(framesLeftForMonster > 0 && gameProgress < 9){
			monsterChasingIntoTheCloset = false;
		}
	}
}

function getOutOfCloset()
{
	heroIsInCloset = false;
	if(gameProgress > 4){
		monsterChasingIntoTheCloset = true;
	}
	mainHero.x = 675;
	mainHero.y = 125;
}

function wakingUpImage()
{
	canvasContext.drawImage(wakingUpPic, 0, 0);
}

