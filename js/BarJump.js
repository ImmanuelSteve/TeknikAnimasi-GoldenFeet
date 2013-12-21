function BarJump(owner) {
    this.owner = owner;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.color = "rgb(255,255,0)";
}

BarJump.prototype = {
    constructor : BarJump,//perhatikan koma
    draw : function(context,owner)
    {
        var x1 = this.owner.x+this.owner.sprite.width/2,x2 = this.owner.x+this.owner.sprite.width/2;
        var height = this.owner.y;
        context.beginPath();
        var from = this.owner.y+this.owner.sprite.height-15;
        context.moveTo(x1, from);
	if (owner.arah == -1) {
	    x2 -=this.w*3.6 - 3.6;
	}else{
	    x2 +=this.w*3.6 - 3.6;
	}
        height=from-this.w*2;

        // quadratic curve
        context.quadraticCurveTo((x1+x2)/2, height, x2, from);

        context.lineWidth = 5;
        context.strokeStyle = 'gray';
        context.stroke();
    }
    
    
}