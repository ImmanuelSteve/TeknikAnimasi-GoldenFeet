function BarShoot(owner) {
    this.owner = owner;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.color = "rgb(255,0,0)";
}

BarShoot.prototype = {
    constructor : BarShoot,//perhatikan koma
    draw : function(canvasContext)
    {
        canvasContext.save();
        canvasContext.beginPath(); //harus ada saat menggambar
        
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.owner.x-10,this.owner.y-30,this.w,30);
        canvasContext.stroke();
	
        canvasContext.restore();
    }
    
    
}