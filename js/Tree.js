function Tree(x,y,urlGambar){
        this.sprite = new Image();
        this.sprite.src = urlGambar;
	this.x=x;
	this.y=y;
	this.radius=100;
	this.posX = this.x + this.radius;
	this.nyawa = 40;
	this.degree = 0;
	this.isFall=false;
	this.arah = 1;
	this.opacity = 1;
};

Tree.prototype = {
	constructor : Tree,
	setPosX : function(posX)
	{
		this.posX = posX;
	},
	drawDaun : function(daun,context){
	    
	    daun.vy += daun.gravity;
	    daun.x -= daun.vx/4;
	    daun.y += daun.vy/80;
	    if (daun.x > this.getBounds().x+140 ||
		daun.x < this.getBounds().x-60 ||
		daun.y > 380 ||
		daun.y < 0) {
		    daun.x = this.getBounds().x+40;
		    daun.y = this.getBounds().y+5;
		    daun.vx = Math.random() * 3 - 1;
		    daun.vy = Math.random() * 10;
	    }
	    daun.draw(context);
	    
	},
	
	drawSerpihan : function(kayu,penebangArah,context){
	    kayu.arah = -penebangArah;
	    kayu.vy += kayu.gravity;
	    kayu.x += kayu.arah * kayu.vx/8;
	    kayu.y += kayu.vy/10;
	    if (kayu.x > this.getBounds().x+100 ||
		kayu.x < this.getBounds().x-60 ||
		kayu.y > 380 ||
		kayu.y < 0) {
		    kayu.x = this.getBounds().x+20;
		    kayu.y = this.getBounds().y+110;
		    kayu.vx =(Math.random() * 10+1)*kayu.ax;
		    kayu.vy = (Math.random() * 10)*kayu.ay;
	    }
	    kayu.draw(context);
	},
	
	drawSerpihanArray : function(serpihanArray,penebangArah,context){
	    for (var i = 0;i < serpihanArray.length;i++) {
		this.drawSerpihan(serpihanArray[i],penebangArah,context);    
	    }
	},
	
	drawDaunArray : function(daunArray,context){
	    for (var i = 0;i < daunArray.length;i++) {
		this.drawDaun(daunArray[i],context);    
	    }
	},
	//setOpacity: function(){
	//	console.log(this.opacity);
	//	this.opacity -= 0.1;
	//},
	draw: function(ctx,degree){
		if (this.isFall==true && this.degree >= -75) {
			this.posX += 950;
			this.degree -=0.00007*Math.pow(10-this.degree,2.5);
		}/*else if (this.isFall==true && this.degree < -75) {
			this.opacity = 0;
		}*/
		ctx.save();
		//ctx.globalAlpha = this.opacity;
		ctx.beginPath();
		// merubah titik pusat canvas ke x+width/2,y+height
		ctx.translate( this.x+this.sprite.width/2, this.y+this.sprite.height );
		// merotasi canvas
		ctx.rotate(this.arah*this.degree*Math.PI/180);
	
		// menggambar kotak yang sudah di rotasi
		// Note: setelah di translate [0,0] is visually x+width/2,y+height
		//       maka  penggambaran titik awal kotak harus disesuaikan - width/2, - height
		//ctx.rect( -width/2, -height, width,height);
		ctx.drawImage(this.sprite,-this.sprite.width/2,-this.sprite.height);
	    
		// mengembalikan canvas ke default
		ctx.restore();
	}
};

Tree.prototype.kurangiNyawa = function(){
	if(this.nyawa > 0){
		this.nyawa -= 1;
		if (this.nyawa == 0) {
			this.isFall = true;
		}
	}
	//console.log("Nyawa Pohon :" + this.nyawa + this.isFall);
}
//untuk membuat batasan kotak di lingkaran
Tree.prototype.getBounds = function () {
	return {
		x: this.posX-60,
		y: this.y+this.radius/2.5,
		width: this.radius/1.6,
		height: this.radius/2
	};
}

//untuk membuat batasan kotak di lingkaran
Tree.prototype.getBoundsPenebang = function () {
	return {
		x: this.posX-40,
		y: this.y+this.radius*1.2,
		width: this.radius/3.5,
		height: this.radius/2
	};
}