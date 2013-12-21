function Tupai(x,y,arah) { 
    this.sprite = new Image();
    this.arah = arah;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.radius = 20;
    this.gravitasi = 0.08;
    this.angel = Math.PI/3;
    this.powerJump = 0;
    this.barJumpCheck = 0;
    //this.radius = 21;
    ////tambahan untuk menandai posisi tupai pada pohon ke x
    this.atpohon = 0;
    this.getball = false;
    this.isJump = true; 
}

Tupai.prototype = {
    constructor : Tupai,//perhatikan koma
    setSprite : function(urlGambar)//pembuatan fungsi
    {
        this.sprite.src = urlGambar;//return
    },
    updatePowerJump : function(barJumpW){
	if(barJumpW == 0) {
	    this.barJumpCheck = 0;
	}else if(barJumpW == 100){
	    this.barJumpCheck = 1;
        }
	if(this.barJumpCheck == 0){
	    this.powerJump += 0.5;
	    barJumpW+=2;
	}else if(this.barJumpCheck == 1){
	    this.powerJump -= 0.5;
	    barJumpW-=2;
	}
	//console.log("PowerJump : " + this.powerJump);
	return barJumpW;
    },
    resetValue : function(){
	this.power = 0;
	this.ay = 0;
	this.vx = 0;
	this.vy = 0;
    },
    jump : function(){
	this.vx = 2 * Math.cos(this.angel) + this.powerJump *0.2;
	this.vy = -2 * Math.sin(this.angel) - this.powerJump *0.2; 
	this.ay = this.gravitasi *2.5;
	this.powerJump = 0;
    },
    draw : function(canvasContext)
    {
        canvasContext.save();
        this.vy +=this.ay;
        this.x+= this.arah * this.vx;
        this.y+= this.vy; 
        
        canvasContext.drawImage(this.sprite,this.x,this.y);
        canvasContext.restore();
    }    
}

////untuk membuat batasan kotak di lingkaran
Tupai.prototype.getBounds = function () {
	return {
		x: this.x + this.radius*1.2,
		y: this.y + this.radius*1.2,
		width: this.radius * 1.4,
		height: this.radius * 2
	};
}