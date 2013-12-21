function Penebang(x,y,urlGambar){
        this.sprite = new Image();
        this.sprite.src = urlGambar;
	this.x=x;
	this.y=y;
	this.radius=80;
	this.posX = 0;
	this.arah = 1;
	this.vx = 0;
};

Penebang.prototype = {
	constructor : Penebang,
	setPosX : function(posX)//pembuatan fungsi
	{
	    this.posX = posX;//return
	},
	setSprite : function(urlGambar)//pembuatan fungsi
	{
	    this.sprite.src = urlGambar;//return
	},
	draw: function(context){
		context.save();
		this.x += this.vx;
		//context.translate(this.x,this.y);
		context.drawImage(this.sprite,this.x,this.y);
		context.restore();
	}
};

//untuk membuat batasan kotak di lingkaran
Penebang.prototype.getBounds = function () {
	return {
		x: this.x+10,
		y: this.y+10,
		width: this.radius-45,
		height: this.radius-20
	};
}