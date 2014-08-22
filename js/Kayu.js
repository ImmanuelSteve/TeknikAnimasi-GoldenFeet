function Kayu(radius,color){
	if(radius==undefined){radius=40}
	if(color==undefined){color="rgb(213,127,103)";}
	this.x=0;
	this.y=0;
	this.color=utils.parseColor(color);
	this.lineWidth=1;
	this.scaleX=1;
	this.scaleY=1;
	this.vx=0;
	this.vy=0;
	this.ax=2;
	this.ay=1.5;
	this.arah = 1;
	this.gravity = 0.5;
};

Kayu.prototype={
	constructor : Kayu,
	resetValue : function(){
		this.ax=0;
		this.ay=0;
		this.vx=0;
		this.vy=0;
	},
	draw:function(context){
		context.save();
		context.translate(this.x,this.y);
		context.scale(this.scaleX,this.scaleY);
		context.lineWidth=this.lineWidth;
		context.fillStyle=this.color;
		context.strokeStyle=this.color;
		context.beginPath();
		context.moveTo(0,5);
		context.lineTo(10,10);
		context.lineTo(20,10);
		context.closePath();
		context.fill();
		if(this.lineWidth>0){
			context.stroke();
		}
		context.restore();
	}
};