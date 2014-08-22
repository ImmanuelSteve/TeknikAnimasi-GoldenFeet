function BarShoot(owner) {
    this.owner = owner;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.color = "rgb(162,207,69)";
}

BarShoot.prototype = {
    constructor : BarShoot,//perhatikan koma
    draw : function(canvasContext)
    {
        canvasContext.save();
	if (this.w > 0) {
	    canvasContext.beginPath(); //harus ada saat menggambar
	    
	    canvasContext.fillStyle = "rgb(63,68,70)";
	    canvasContext.fillRect(this.owner.x-10,this.owner.y-30,100,30);
	    canvasContext.stroke();
	}
	
        canvasContext.beginPath(); //harus ada saat menggambar
        
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.owner.x-10,this.owner.y-30,this.w,30);
        canvasContext.stroke();
	
        canvasContext.restore();
    }
    
    
}