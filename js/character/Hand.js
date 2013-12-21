function Hand(upperSegment,lowerSegment,armSegment) { 
	this.upperSegment = upperSegment;
	this.lowerSegment = lowerSegment;
	this.armSegment = armSegment;
    this.upToLowRadX = 0;//0
    this.upToLowRadY = 0;//60
    this.lowToArmRadX = 0;//0
    this.lowToArmRadY = 0;//45

    this.upper_segment_rotation = 0;
    this.lower_segment_rotation = 0;
    this.arm_segment_rotation = 0 ;

    this.rotation = 0;
	this.pinx = 0;
	this.piny = 0;
	this.flip = 1;
} 
Hand.prototype.draw = function (context) { 
	context.save(); 

	this.upperSegment.flip = this.flip;
	this.lowerSegment.flip = this.flip;
	this.armSegment.flip = this.flip;
    this.upperSegment.rotation = this.rotation + this.upper_segment_rotation;

	this.upperSegment.x = this.pinx;
    this.upperSegment.y = this.piny;
    this.upperSegment.draw(context);

    this.upperSegment.setOTOPin(this.upToLowRadX,this.upToLowRadY);
    this.lowerSegment.x = this.upperSegment.getOTOPin().x;
    this.lowerSegment.y = this.upperSegment.getOTOPin().y;
    this.lowerSegment.rotation = this.upperSegment.rotation + this.lower_segment_rotation;

    this.lowerSegment.setOTOPin(this.lowToArmRadX,this.lowToArmRadY);
    this.lowerSegment.draw(context);

    this.armSegment.x = this.lowerSegment.getOTOPin().x;
    this.armSegment.y = this.lowerSegment.getOTOPin().y;
    this.armSegment.rotation = this.lowerSegment.rotation + this.arm_segment_rotation;
    this.armSegment.draw(context);

    context.restore();
}; 