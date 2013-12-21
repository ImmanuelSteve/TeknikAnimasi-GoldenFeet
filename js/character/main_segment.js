//x,y merupakan tempat dimana segment harus digambar
//center_point_x merupakan koordinat x garis tengah segmen
//center_point_y merupakan koordinat y garis tengah segmen
//agar saat diflip mirroringnya berdasarkan garis tgh tersebut
function Segment (image,x,y,center_point_x,center_point_y) { 
	this.sprite = image;
	this.x = x; 
	this.y = y; 
	this.rotation = 0; 
	this.center_point_x = center_point_x;
	this.center_point_y = center_point_y;
	this.flip = 1;
	this.rotation = 0;
	this.OTO_pinx = 0;
	this.OTO_piny = 0;
	this.OTO_sign_piny = 1;
	this.own_rotation = 0;
} 


Segment.prototype.setOTOPin = function (x,y) { 
	this.OTO_pinx = x;
	this.OTO_piny = y;
	this.OTO_sign_piny = this.OTO_piny<0?-1:1;
};

Segment.prototype.getOTOPin = function () {
	var hypo = Math.sqrt(Math.pow(this.OTO_pinx,2)+Math.pow(this.OTO_piny,2));
	
	var angel = this.OTO_sign_piny*Math.PI/2 - Math.asin(this.OTO_sign_piny*this.OTO_pinx/hypo);

	return{
	//- atau + nya angel menentukan naik atau turunnya y dari center poin
	x: this.x+Math.cos((this.rotation + angel)*this.flip)*hypo*this.flip, 
	y: this.y+Math.sin((this.rotation + angel)*this.flip)*hypo*this.flip
	}; 
};

Segment.prototype.draw = function (context) { 
	context.save();
    context.translate(this.x,this.y);//translate ke koord dimana obj digambar
    context.scale(this.flip,1);//main part
    context.rotate(this.rotation+this.own_rotation);//rotasikan berdasarkan rotasi
    context.stroke();
    //gambar spritenya
    context.drawImage(this.sprite,this.center_point_x,this.center_point_y);
    context.beginPath(); 
    //context.arc(0, 0, 0.2, 0, (Math.PI * 2), true); 
    context.closePath();
    context.stroke();
    context.restore();
}; 

Segment.prototype.getBounds= function (context) {
	
	return {
		x: this.x-this.sprite.width/2,//+(this.flip*10),
		y: this.y + this.center_point_y-20,
		width: (this.sprite.width+5),//*-this.flip,
		height: this.sprite.height+20
	};
}; 