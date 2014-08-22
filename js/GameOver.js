function GameOver(x,y,urlGambar){
        this.sprite = new Image();
        this.sprite.src = urlGambar;
	this.x=x;
	this.y=y;
	this.radius=80;
};

GameOver.prototype = {
	constructor : GameOver,
	setSprite : function(urlGambar)//pembuatan fungsi
	{
	    this.sprite.src = urlGambar;//return
	},
	draw: function(context){
		context.save();
		context.drawImage(this.sprite,this.x,this.y);
		context.restore();
	}
};

//untuk membuat batasan kotak di lingkaran
GameOver.prototype.getBounds = function () {
	return {
		x: this.x+10,
		y: this.y+10,
		width: this.radius-45,
		height: this.radius-20
	};
}