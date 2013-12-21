function Apple(x,y,owner) { 
    this.sprite = new Image();
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.owner = owner;
    this.arah = owner.arah;
    this.radius =60;
    this.canShoot = false;
    this.shootPower = 0;
    this.gravitasi = 0.08;
    this.barShootCheck = 0;
    //this.radius = 50;

    //digunakan saat apel sudah digunakan
    this.isUsed = false;
}

Apple.prototype = {
    constructor : Apple,//perhatikan koma
    setSprite : function(urlGambar)//pembuatan fungsi
    {
        this.sprite.src = urlGambar;//return
    },
    updatePowerShoot : function(barShootW){
	if (this.canShoot == true) {
	    if(barShootW == 0) {
		this.barShootCheck = 0;
	    }else if(barShootW == 100){
		this.barShootCheck = 1;
	    }
	    if(this.barShootCheck == 0){
		    this.shootPower+=2;
		    barShootW+=2;
	    }else if(this.barShootCheck == 1){
		    this.shootPower-=2;
		    barShootW-=2;
	    }
	    console.log("PowerShoot : " + this.shootPower);
	}
	return barShootW;
    },
    shoot : function(){
	this.canShoot = false;
	this.vx = 0.15 * this.shootPower;
	this.ay = this.gravitasi * 4;//angka tiga harusnya
    this.shootPower = 0;
    },
    resetValue : function(){
	
	    this.ay=0;
	    this.vy=0;
	    this.vx=0;
	    this.y = 250;
	    this.isUsed=false;
    },
    draw : function(canvasContext,owner)
    {
	this.owner = owner;
	this.arah = owner.arah;
        canvasContext.save();
        if (this.vx==0 && this.vy==0) {
            if (this.owner.getball==true && this.arah == 1) {
                //console.log("position tree");
                this.x = this.owner.x;
                this.y = this.owner.y;
            }else if (this.owner.getball==true && this.arah == -1) {
		this.x = this.owner.x + 50;
        
                this.y = this.owner.y;
            }
        }
        this.x+=this.arah*this.vx;
        this.vy +=this.ay;
        this.y+= this.vy;
        
        canvasContext.drawImage(this.sprite,this.x,this.y);
        
        canvasContext.restore();
    }
}

//untuk membuat batasan kotak di lingkaran
Apple.prototype.getBounds = function () {
	return {
		x: this.x,
		y: this.y,
		width: this.radius-35,
		height: this.radius-25
	};
}