function PenebangBar(x,y,w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.color = "rgb(213,33,76)";
    //code
}

PenebangBar.prototype = {
    constructor : PenebangBar ,//perhatikan koma
    draw : function(canvasContext)
    {
        canvasContext.save();
        canvasContext.beginPath(); //harus ada saat menggambar
        
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.x,this.y,this.w,30);
        canvasContext.stroke();
       // canvasContext.closePath();
        canvasContext.restore();
    }
    
    
}