//moje
var warriorPic = document.createElement("img");
var greenWarriorPic = document.createElement("img");

var creditsImg = document.createElement("img");
var wellDonePic = document.createElement("img");

var heroPicUp = document.createElement("img");
var heroPicRight = document.createElement("img");
var heroPicLeft = document.createElement("img");
var heroPicDown = document.createElement("img");

//monster
var monsterPic = document.createElement("img");
var extraPic = document.createElement("img");
//death animation
var da0 = document.createElement("img");
var da1 = document.createElement("img");
var da2 = document.createElement("img");
var da3 = document.createElement("img");
var da4 = document.createElement("img");
var da5 = document.createElement("img");
var da6 = document.createElement("img");
var da7 = document.createElement("img");
var da8 = document.createElement("img");
var da9 = document.createElement("img");
var da10 = document.createElement("img");
var da11 = document.createElement("img");
var da12 = document.createElement("img");
var da13 = document.createElement("img");
var da14 = document.createElement("img");
var da15 = document.createElement("img");
var da16 = document.createElement("img");
var da17 = document.createElement("img");
var da18 = document.createElement("img");
var da19 = document.createElement("img");
var da20 = document.createElement("img");
var da21 = document.createElement("img");
var da22 = document.createElement("img");
var da23 = document.createElement("img");
var da24 = document.createElement("img");
var da25 = document.createElement("img");
var da26 = document.createElement("img");
var da27 = document.createElement("img");
var da28 = document.createElement("img");
var da29 = document.createElement("img");

//walking animation
var heroPicLeftMoveOne = document.createElement("img");
var heroPicLeftMoveTwo = document.createElement("img");
var heroPicRightMoveOne = document.createElement("img");
var heroPicRightMoveTwo = document.createElement("img");
var heroPicUpMove = document.createElement("img");
//var heroPicUpMoveTwo = document.createElement("img");
var heroPicDownMove = document.createElement("img");
//var heroPicDownMoveTwo = document.createElement("img");

var neighbourPic = document.createElement("img");

var controlsPic = document.createElement("img");
var backgroundPic = document.createElement("img");
var inventoryPic = document.createElement("img");
var darknessPic = document.createElement("img");

var wakingUpPic = document.createElement("img");
var wokenUpPic = document.createElement("img");
var apartmentPic = document.createElement("img");
var bathroomPic = document.createElement("img");
var staircasePic = document.createElement("img");
var staircaseBloodyPic = document.createElement("img");
var nearBasementPic = document.createElement("img");
var basementPic = document.createElement("img");
var basementClosedPic = document.createElement("img");

var barrelPic = document.createElement("img");
var barrelTopPic = document.createElement("img");

var closetPic = document.createElement("img");

var moveLeftPics = [heroPicLeftMoveOne, heroPicLeftMoveTwo, heroPicLeft, heroPicLeftMoveTwo];
var moveRightPics = [heroPicRightMoveOne, heroPicRightMoveTwo, heroPicRight, heroPicRightMoveTwo];
var moveUpPics = [heroPicUpMove, heroPicUp, heroPicUpMove, heroPicUp];
var moveDownPics = [heroPicDownMove, heroPicDown, heroPicDownMove, heroPicDown];

var worldPics = [];
var picsToLoad = 0; //set automatically

function countLoadedImagesAndLaunchIfReady()
{
	picsToLoad--;
	//console.log(picsToLoad);
	if(picsToLoad == 0)
	{
		imageLoadingDoneSoStartGame();
	}
	
}

function beginLoadingImage(imgVar, fileName)
{
	imgVar.onload = countLoadedImagesAndLaunchIfReady();
	imgVar.src = fileName;
}

function loadImageForWorldCode(worldCode, fileName)
{
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages()
{
	var imageList = [
	{varName: warriorPic, theFile: "img/shibe.png"},
	{varName: creditsImg, theFile: "img/menu/credits.jpg"},
	{varName: wellDonePic, theFile: "img/menu/welldone.png"},
	
	{varName: heroPicUp, theFile: "img/player/player_up.png"},
	{varName: heroPicRight, theFile: "img/player/player_right.png"},
	{varName: heroPicLeft, theFile: "img/player/player_left.png"},
	{varName: heroPicDown, theFile: "img/player/player_down.png"},
	{varName: monsterPic, theFile: "img/monster/front.png"},
	
	{varName: heroPicLeftMoveOne, theFile: "img/player/player_left_move_one.png"},
	{varName: heroPicLeftMoveTwo, theFile: "img/player/player_left_move_two.png"},
	{varName: heroPicRightMoveOne, theFile: "img/player/player_right_move_one.png"},
	{varName: heroPicRightMoveTwo, theFile: "img/player/player_right_move_two.png"},
	{varName: heroPicUpMove, theFile: "img/player/player_up_move.png"},
	
	{varName: heroPicDownMove, theFile: "img/player/player_down_move.png"},
	
	{varName: extraPic, theFile: "img/pic1.png"},
	
	{varName: controlsPic, theFile: "img/controls.png"},
	{varName: backgroundPic, theFile: "img/background.png"},
	{varName: inventoryPic, theFile: "img/inventory.png"},
	{varName: darknessPic, theFile: "img/darkness.png"},
	
	{varName: neighbourPic, theFile: "img/neighbour.png"},
	
	{varName: barrelPic, theFile: "img/barrel.png"},
	{varName: barrelTopPic, theFile: "img/barrel_top.png"},
	{varName: closetPic, theFile: "img/closet.png"},
	
	{varName: wakingUpPic, theFile: "img/levels/wakingUp.png"},
	{varName: wokenUpPic, theFile: "img/levels/wokenUp.png"},
	{varName: apartmentPic, theFile: "img/levels/apartment.png"},
	{varName: bathroomPic, theFile: "img/levels/bathroom.jpg"},
	{varName: staircasePic, theFile: "img/levels/staircase.jpg"},
	{varName: staircaseBloodyPic, theFile: "img/levels/staircaseBloody.jpg"},
	{varName: nearBasementPic, theFile: "img/levels/nearBasement.jpg"},
	{varName: basementPic, theFile: "img/levels/basement.jpg"},
	{varName: basementClosedPic, theFile: "img/levels/basementClosed.jpg"},
	
	{worldType: WORLD_ROAD, theFile: "img/world_road.png"},
	{worldType: WORLD_WALL, theFile: "img/world_wall.png"},
	{worldType: WORLD_DOOR_TO_APARTMENT_FROM_B, theFile: "img/world_road.png"},
	{worldType: WORLD_DOOR_TO_BATHROOM, theFile: "img/world_door.png"},
	{worldType: WORLD_DOOR_TO_STAIRCASE, theFile: "img/world_door.png"},
	{worldType: DOOR_TO_APARTMENT_FROM_SC, theFile: "img/world_road.png"},
	{worldType: STAIRS_TO_STAIRCASE, theFile: "img/world_road.png"},
	{worldType: STAIRS_TO_BASEMENT, theFile: "img/world_road.png"},
	{worldType: DOOR_TO_BASEMENT, theFile: "img/world_road.png"},
	{worldType: DOOR_TO_NEAR_BASEMENT, theFile: "img/world_road.png"},
	
	{worldType: BOX_OF_ITEMS, theFile: "img/world_key.png"},
	{worldType: PICTURE_OF_UNCLE, theFile: "img/world_flag.png"},
	{worldType: PICTURE_OF_AUNT, theFile: "img/world_trees.png"},
	{worldType: KITCHEN, theFile: "img/world_road.png"},
	{worldType: KITCHEN_SINK, theFile: "img/world_road.png"},
	
	{varName: da0, theFile: "img/monster/potwor/Comp 1_00001.png"},
	{varName: da1, theFile: "img/monster/potwor/Comp 1_00002.png"},
	{varName: da2, theFile: "img/monster/potwor/Comp 1_00003.png"},
	{varName: da3, theFile: "img/monster/potwor/Comp 1_00004.png"},
	{varName: da4, theFile: "img/monster/potwor/Comp 1_00005.png"},
	{varName: da5, theFile: "img/monster/potwor/Comp 1_00006.png"},
	{varName: da6, theFile: "img/monster/potwor/Comp 1_00007.png"},
	{varName: da7, theFile: "img/monster/potwor/Comp 1_00008.png"},
	{varName: da8, theFile: "img/monster/potwor/Comp 1_00009.png"},
	{varName: da9, theFile: "img/monster/potwor/Comp 1_00010.png"},
	{varName: da10, theFile: "img/monster/potwor/Comp 1_00011.png"},
	{varName: da11, theFile: "img/monster/potwor/Comp 1_00011.png"},
	{varName: da12, theFile: "img/monster/potwor/Comp 1_00012.png"},
	{varName: da13, theFile: "img/monster/potwor/Comp 1_00013.png"},
	{varName: da14, theFile: "img/monster/potwor/Comp 1_00014.png"},
	{varName: da15, theFile: "img/monster/potwor/Comp 1_00015.png"},
	{varName: da16, theFile: "img/monster/potwor/Comp 1_00016.png"},
	{varName: da17, theFile: "img/monster/potwor/Comp 1_00017.png"},
	{varName: da18, theFile: "img/monster/potwor/Comp 1_00018.png"},
	{varName: da19, theFile: "img/monster/potwor/Comp 1_00019.png"},
	{varName: da20, theFile: "img/monster/potwor/Comp 1_00020.png"},
	{varName: da21, theFile: "img/monster/potwor/Comp 1_00021.png"},
	{varName: da22, theFile: "img/monster/potwor/Comp 1_00022.png"},
	{varName: da23, theFile: "img/monster/potwor/Comp 1_00023.png"},
	{varName: da24, theFile: "img/monster/potwor/Comp 1_00024.png"},
	{varName: da25, theFile: "img/monster/potwor/Comp 1_00025.png"},
	{varName: da26, theFile: "img/monster/potwor/Comp 1_00026.png"},
	{varName: da27, theFile: "img/monster/potwor/Comp 1_00027.png"},
	{varName: da28, theFile: "img/monster/potwor/Comp 1_00028.png"},
	{varName: da29, theFile: "img/monster/potwor/Comp 1_00029.png"},
	]
	
	picsToLoad = imageList.length;
	
	for(var i=0; i<imageList.length; i++)
	{
		if(imageList[i].varName != undefined){
		beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode( imageList[i].worldType, imageList[i].theFile);
		}
	}
}

deathAnimationArray = [da0, da1, da2, da3, da4, da5, da6, da7, da8, da9, da10, da11, da12, da13, da14, da15, da16, da17, da18, da19, da20, da21, da22, da23, da24, da25, da26, da27, da28, da29];


