
//pomocnicze funkcje rysowania~~ ~~ 
function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng, sizeX, sizeY)
{
	if(sizeX == undefined) sizeX = useBitmap.width;
	if(sizeY == undefined) sizeY = useBitmap.height;
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2, sizeX, sizeY);
	canvasContext.restore();
}

function drawBitmapCenteredInYWithRotation(useBitmap, atX, atY, withAng)
{
	if(withAng == undefined) withAng = 0;
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height+10);
	canvasContext.restore();
}

function colorRect(TopLeftX,TopLeftY, Lenght,High,fillColor)
{
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(TopLeftX,TopLeftY , Lenght,High);
}
function colorCircle(CenterX,CenterY , Radius,fillColor)
{
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(CenterX,CenterY , Radius,0,Math.PI*2,true);
  canvasContext.fill();
}
function colorText(showWords, textBotX, textBotY, fillColor, size) 
{
	if(size == undefined || size < 0)
	{
		size = 11;
	}
  canvasContext.fillStyle = fillColor;
  canvasContext.font = size +"px Arial";
  canvasContext.fillText(showWords, textBotX, textBotY);
}
function colorBoldText(showWords, textBotX, textBotY, fillColor) 
{
  canvasContext.fillStyle = fillColor;
  canvasContext.font = "bold 16px Arial";
  canvasContext.fillText(showWords, textBotX, textBotY);
}

