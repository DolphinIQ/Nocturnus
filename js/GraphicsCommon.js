
//pomocnicze funkcje rysowania~~ ~~ 
function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng)
{
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	//canvasContext.globalAlpha = 0.5; // transparency
	canvasContext.drawImage(useBitmap, (-useBitmap.width/2), (-useBitmap.height/2));
	//canvasContext.globalAlpha = 1.0; // transparency
	canvasContext.restore();
}

function drawBitmapTransparent(useBitmap, atX, atY, opacity)
{
	canvasContext.globalAlpha = opacity; // transparency
	canvasContext.drawImage(useBitmap, atX, atY);
	canvasContext.globalAlpha = 1.0; // transparency
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

function colorRect(TopLeftX,TopLeftY, Length,High,fillColor)
{
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(TopLeftX,TopLeftY , Length,High);
}

function coloredOutlineRectCornerToCorner(corner1X, corner1Y, corner2X, corner2Y, lineColor){
	canvasContext.strokeStyle = lineColor;
	canvasContext.lineWidth = 2;
	canvasContext.beginPath();
	canvasContext.setLineDash([]);
	canvasContext.rect(corner1X, corner1Y, corner2X-corner1X, corner2Y-corner1Y);
	canvasContext.stroke();
}
function colorRectBorders(TopLeftX,TopLeftY, Length, Height, thickness, Color){
	canvasContext.strokeStyle = Color;
	canvasContext.lineWidth = thickness;
	canvasContext.beginPath();
	canvasContext.setLineDash([]);
	canvasContext.rect(TopLeftX,TopLeftY, Length, Height);
	canvasContext.stroke();
}

function coloredLine(p1x, p1y, p2x, p2y, thickness, lineColor){
	canvasContext.strokeStyle = lineColor;
	canvasContext.lineWidth = thickness;
	canvasContext.beginPath();
	canvasContext.setLineDash([]);
	canvasContext.moveTo(p1x, p1y);
	canvasContext.lineTo(p2x, p2y);
	canvasContext.stroke();
}

function colorCircle(CenterX,CenterY , Radius,fillColor)
{
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(CenterX,CenterY , Radius,0,Math.PI*2,true);
  canvasContext.fill();
}
function colorEmptyCircle(CenterX,CenterY , Radius,fillColor)
{
  canvasContext.strokeStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(CenterX,CenterY , Radius,0,Math.PI*2,true);
  canvasContext.stroke();
}
function colorEmptyDottedCircle(CenterX,CenterY , Radius,fillColor, length, spacing)
{
  canvasContext.strokeStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.setLineDash([length, spacing]);
  canvasContext.arc(CenterX,CenterY , Radius,0,Math.PI*2,true);
  canvasContext.stroke();
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

