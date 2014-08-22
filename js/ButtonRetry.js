function ButtonRetry(x,y,urlGambar){
        this.sprite = new Image();
        this.sprite.src = urlGambar;
	this.x=x;
	this.y=y;
	this.radius=115;
};

ButtonRetry.prototype = {
	constructor : ButtonRetry,
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
ButtonRetry.prototype.getBounds = function () {
	return {
		x: this.x,
		y: this.y,
		width: this.radius,
		height: this.radius-70
	};
}