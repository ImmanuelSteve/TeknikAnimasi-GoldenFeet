function Daun(urlGambar) { 
    this.sprite = new Image();
    this.sprite.src = urlGambar;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.gravity = 0.5;
}

Daun.prototype = {
    constructor : Daun,//perhatikan koma
    setSprite : function(urlGambar)//pembuatan fungsi
    {
        this.sprite.src = urlGambar;//return
    },
    draw : function(canvasContext)
    {
        canvasContext.save();
        
        canvasContext.drawImage(this.sprite,this.x,this.y,5,20);
        
        canvasContext.restore();
    }
}