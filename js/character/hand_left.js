function HandLeft (upperSegment,lowerSegment,armSegment) { 
	this.base = Hand;
	this.base(upperSegment,lowerSegment,armSegment);
	this.upToLowRadX = 0;//0
    this.upToLowRadY = 60;//60
    this.lowToArmRadX = 0;//0
    this.lowToArmRadY = 45;//45
} 

HandLeft.prototype = new Hand;