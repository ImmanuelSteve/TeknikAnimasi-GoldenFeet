function Body(image,x,y,center_point_x,center_point_y) 
{ 
	this.base = Segment;
	this.base(image,x,y,center_point_x,center_point_y);

	//variable left hand
	this.left_hand_center_pointx = 50;
	this.left_hand_center_pointy = -100;
	this.default_left_hand_y = -100;
	this.left_hand_signy = this.left_hand_center_pointy<0?-1:1;

	//variable right hand
	this.right_hand_center_pointx = -30;
	this.right_hand_center_pointy = -100;
	this.default_right_hand_y = -100;
	this.right_hand_signy = this.left_hand_center_pointy<0?-1:1;

	//variable rightleg
	this.right_leg_center_pointx = 20;
	this.right_leg_center_pointy = 0;
	this.right_leg_signy = this.right_leg_center_pointy<0?-1:1;

	//variable leftleg
	this.left_leg_center_pointx = -20;
	this.left_leg_center_pointy = 0;
	this.left_leg_signy = this.left_leg_center_pointy<0?-1:1;

	//variable head
	this.head_center_pointx = 0;
	this.head_center_pointy = -120;
	this.head_signy = this.head_center_pointy<0?-1:1;

}
Body.prototype = new Segment;
Body.prototype.getLeftHandPin = function () {
	var hypo = Math.sqrt(Math.pow(this.left_hand_center_pointx,2)+Math.pow(this.left_hand_center_pointy,2));
	
		angel = this.left_hand_signy*Math.PI/2 - Math.asin(this.left_hand_signy*this.left_hand_center_pointx/hypo);
	
	return{
	//- atau + nya angel menentukan naik atau turunnya y dari center poin
	x: this.x+Math.cos((this.rotation + angel)*this.flip)*hypo*this.flip, 
	y: this.y+Math.sin((this.rotation + angel)*this.flip)*hypo*this.flip
	}; 
};

Body.prototype.getRightHandPin = function () {
	var hypo = Math.sqrt(Math.pow(this.right_hand_center_pointx,2)+Math.pow(this.right_hand_center_pointy,2));
	
		angel = this.right_hand_signy*Math.PI/2 - Math.asin(this.right_hand_signy*this.right_hand_center_pointx/hypo);
	
	return{
	//- atau + nya angel menentukan naik atau turunnya y dari center poin
	x: this.x+Math.cos((this.rotation + angel)*this.flip)*hypo*this.flip, 
	y: this.y+Math.sin((this.rotation + angel)*this.flip)*hypo*this.flip
	}; 
};

Body.prototype.getRightLegPin = function () {
	var hypo = Math.sqrt(Math.pow(this.right_leg_center_pointx,2)+Math.pow(this.right_leg_center_pointy,2));
	
		angel = this.right_leg_signy*Math.PI/2 - Math.asin(this.right_leg_signy*this.right_leg_center_pointx/hypo);
	
	return{
	//- atau + nya angel menentukan naik atau turunnya y dari center poin
	x: this.x+Math.cos((this.rotation + angel)*this.flip)*hypo*this.flip, 
	y: this.y+Math.sin((this.rotation + angel)*this.flip)*hypo*this.flip
	}; 
};

Body.prototype.getLeftLegPin = function () {
	var hypo = Math.sqrt(Math.pow(this.left_leg_center_pointx,2)+Math.pow(this.left_leg_center_pointy,2));
	
		angel = this.left_leg_signy*Math.PI/2 - Math.asin(this.left_leg_signy*this.left_leg_center_pointx/hypo);
	
	return{
	//- atau + nya angel menentukan naik atau turunnya y dari center poin
	x: this.x+Math.cos((this.rotation + angel)*this.flip)*hypo*this.flip, 
	y: this.y+Math.sin((this.rotation + angel)*this.flip)*hypo*this.flip
	}; 
};

Body.prototype.getHeadPin = function () {
	var hypo = Math.sqrt(Math.pow(this.head_center_pointx,2)+Math.pow(this.head_center_pointy,2));
	
		angel = this.head_signy*Math.PI/2 - Math.asin(this.head_signy*this.head_center_pointx/hypo);
	
	return{
	//- atau + nya angel menentukan naik atau turunnya y dari center poin
	x: this.x+Math.cos((this.rotation + angel)*this.flip)*hypo*this.flip, 
	y: this.y+Math.sin((this.rotation + angel)*this.flip)*hypo*this.flip
	}; 
};