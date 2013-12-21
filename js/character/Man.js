function Man(head,body,left_hand,right_hand,left_leg,right_leg) { 
	this.head = head;
	this.body = body;
	this.left_hand = left_hand;
	this.right_hand = right_hand;
	this.left_leg = left_leg;
	this.right_leg = right_leg;
	this.flip = 1;
	this.rotation = 0;

	this.vx = 0;

	this.gerakan_penebang = 0;
	this.target_pohon = 4;//posisi tujuan

	this.head_rotation = 0;

	//walking property
	this.walking_upper_hand_rotation = 1.6;
	this.walking_lower_hand_rotation = 0;

	this.walking_leg_rotation = 0.4;

	this.isWalk = false;
	this.leg_rotate = true;

	this.isGergaji = false;
	this.hand_rotation = 2;
	this.hand_rotate = true;
	this.hand_left_y_neutral = 0;
	this.hand_right_y_neutral = 0;

	this.body_rotation = 0;
	this.body_y = 0;
	this.isRun = false;

	this.angry_hand_rotate = true;
	this.angry_hand_rotation = 0.4;

	this.isReset = true;
	
	this.kenaTembak = false;

	left_hand.upToLowRadX = 0;//0
    left_hand.upToLowRadY = 17;//60
    left_hand.lowToArmRadX = 0;//0
    left_hand.lowToArmRadY = 14;//45

    right_hand.upToLowRadX = 0;//0
    right_hand.upToLowRadY = 14;//60
    right_hand.lowToArmRadX = 0;//0
    right_hand.lowToArmRadY = 13;//45

    //dari body

    body.left_hand_center_pointx = 15;
	body.left_hand_center_pointy = -30;
	body.default_left_hand_y = -30;
	body.left_hand_signy = body.left_hand_center_pointy<0?-1:1;

	//variable right hand
	body.right_hand_center_pointx = -15;
	body.right_hand_center_pointy = -30;
	body.default_right_hand_y = -30;
	body.right_hand_signy = body.left_hand_center_pointy<0?-1:1;

	//variable rightleg
	body.right_leg_center_pointx = 8;
	body.right_leg_center_pointy = 0;
	body.right_leg_signy = body.right_leg_center_pointy<0?-1:1;

	//variable leftleg
	body.left_leg_center_pointx = -8;
	body.left_leg_center_pointy = 0;
	body.left_leg_signy = body.left_leg_center_pointy<0?-1:1;

	//variable head
	body.head_center_pointx = 0;
	body.head_center_pointy = -34;
	body.head_signy = body.head_center_pointy<0?-1:1;
} 

Man.prototype.draw = function(context) {

	this.body.flip = this.flip;

	this.body.rotation = this.rotation + this.body_rotation;


	this.left_hand.flip = this.flip;
	this.left_hand.rotation = this.rotation;
	this.left_hand.pinx = this.body.getLeftHandPin().x;
    this.left_hand.piny = this.body.getLeftHandPin().y;

    this.right_hand.flip = this.flip;
	this.right_hand.rotation = this.rotation;
	this.right_hand.pinx = this.body.getRightHandPin().x;
    this.right_hand.piny = this.body.getRightHandPin().y;

    this.left_leg.x = this.body.getLeftLegPin().x;
    this.left_leg.y = this.body.getLeftLegPin().y;
    this.left_leg.flip = this.flip;
    this.left_leg.rotation = this.rotation;

    this.right_leg.x = this.body.getRightLegPin().x;
    this.right_leg.y = this.body.getRightLegPin().y;
    this.right_leg.flip = this.flip;
    this.right_leg.rotation = this.rotation;

    this.head.x = this.body.getHeadPin().x;
    this.head.y = this.body.getHeadPin().y;
    this.head.flip = this.flip;
    this.head.rotation = this.rotation + this.head_rotation;

    this.right_hand.draw(context);
	this.body.draw(context);
	this.head.draw(context);
	

    this.left_leg.draw(context);
    this.right_leg.draw(context);
    this.left_hand.draw(context);
};

Man.prototype.gergaji = function()
{
	if(!this.isGergaji)
	{
		this.isReset = false;
		this.isGergaji = true;

		
		this.right_hand.upper_segment_rotation = 0.5;
		this.right_hand.lower_segment_rotation = 0.5;
		this.left_hand.upper_segment_rotation = 0;
		this.left_hand.lower_segment_rotation = 1;
		this.left_hand.arm_segment_rotation = 0.5;



		this.left_leg.own_rotation = 0.3;

		this.hand_left_y_neutral = this.body.getLeftHandPin().y*Math.sin;
		this.hand_right_y_neutral = this.body.getRightHandPin().y;
		this.body_y = this.body.y;
		
	}
	else {
		if(this.hand_rotate)
		{
			this.left_hand.upper_segment_rotation += 0.02;
			this.left_hand.lower_segment_rotation -= 0.01;
			this.right_hand.upper_segment_rotation += 0.03;
			this.body.y +=0.5;
			this.hand_rotation -=0.6;
			this.body.left_hand_center_pointy -= 1;
			this.body.right_hand_center_pointy -= 1;
			if(this.hand_rotation<0)
				this.hand_rotate = false;
		}
		else
		{
			this.left_hand.upper_segment_rotation -= 0.02;
			this.left_hand.lower_segment_rotation += 0.01;
			this.right_hand.upper_segment_rotation -= 0.03;
			this.body.y -=0.5;
			this.hand_rotation +=0.6;
			this.body.left_hand_center_pointy += 1;
			this.body.right_hand_center_pointy += 1;
			if(this.hand_rotation>=2)
				this.hand_rotate = true;
		}
	}
	
}

Man.prototype.walk= function()
{
	this.body_rotation = 0;
	if(this.leg_rotate)
		{
			this.isReset = false;
			this.left_leg.own_rotation += 0.1;
			this.right_leg.own_rotation -= 0.1;
			this.walking_leg_rotation-=0.05;
			if(this.walking_leg_rotation<0)
				this.leg_rotate = false;
		}
		else
		{
			this.left_leg.own_rotation -= 0.1;
			this.right_leg.own_rotation += 0.1;
			this.walking_leg_rotation+=0.05;
			if(this.walking_leg_rotation>=0.8)
				this.leg_rotate = true;
		}
}

Man.prototype.run= function()
{		

	this.body.x -=this.flip*this.vx;;
	if(!this.isRun)
	{	
		this.vx = 3;
		this.isReset = false;
		this.right_hand.upper_segment_rotation = 0.75;
		this.right_hand.lower_segment_rotation = 0.75;
		this.left_hand.upper_segment_rotation = 0;
		this.left_hand.lower_segment_rotation = 1;
		this.body_rotation = -0.3;
		this.body_y = this.body.y;
		//this.head_rotation = -0.3;
		this.isRun = true;
	}
	else{	
		if(this.leg_rotate)
		{
			this.left_leg.own_rotation += 0.2;
			this.right_leg.own_rotation -= 0.2;
			this.walking_leg_rotation-=0.05;
			if(this.walking_leg_rotation<0)
				this.leg_rotate = false;
		}
		else
		{
			this.left_leg.own_rotation -= 0.2;
			this.right_leg.own_rotation += 0.2;
			this.walking_leg_rotation+=0.05;
			if(this.walking_leg_rotation>=0.8)
				this.leg_rotate = true;
		}
	}
}


Man.prototype.reset= function()
{		
	if(!this.isReset){
		this.left_leg.own_rotation = 0;
		this.right_leg.own_rotation = 0;
		this.walking_upper_hand_rotation = 1.6;
		this.walking_lower_hand_rotation = 0;

		this.walking_leg_rotation = 0.4;
		
		//hand
		this.body_rotation = 0;
		this.right_hand.upper_segment_rotation = 0;
		this.right_hand.lower_segment_rotation = 0;
		this.left_hand.upper_segment_rotation = 0;
		this.left_hand.lower_segment_rotation = 0;
		this.left_hand.arm_segment_rotation = 0;
		this.head_rotation = 0;
		this.body.y = this.body_y;
		this.isWalk = false;
		this.leg_rotate = true;
		this.hand_rotate = true;
		this.isGergaji = false;
		this.isRun = false;
		this.angry_hand_rotate =true;
		this.head_rotation = 0;
		this.angry_hand_rotation = 0.4;
		this.isAngry = false;

	//walking property
		this.vx = 0;
		this.body.right_hand_center_pointy = this.body.default_right_hand_y;
		this.body.left_hand_center_pointy = this.body.default_left_hand_y;
		this.isReset = true;
	}

}

Man.prototype.angry= function()
{		
	if(!this.isAngry)
	{
		this.isReset = false;
		this.right_hand.upper_segment_rotation = 2;
		this.right_hand.lower_segment_rotation = 0.5;
		this.left_hand.upper_segment_rotation = 0;
		this.left_hand.lower_segment_rotation = 1;
		this.left_hand.arm_segment_rotation = 0.5;
		this.body_rotation = 0.2;
		this.head_rotation = 0.4;
		this.left_leg.own_rotation = 0.5;
		this.isAngry = true;
		this.body_y = this.body.y;
	}
	else
	{
		if(this.angry_hand_rotate)
		{
			this.right_hand.lower_segment_rotation += 0.1;
			this.angry_hand_rotation-=0.06;
			this.body.y +=0.5;
			if(this.angry_hand_rotation<0)
				this.angry_hand_rotate = false;
		}
		else
		{
			this.right_hand.lower_segment_rotation -= 0.1;
			this.angry_hand_rotation+=0.06;
			this.body.y -=0.5;
			if(this.angry_hand_rotation>=0.4)
				this.angry_hand_rotate = true;
		}
	}
}