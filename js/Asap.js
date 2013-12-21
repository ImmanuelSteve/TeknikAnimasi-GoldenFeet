function Asap(urlGambar, width, height) { 
    this.sprite = new Image();
    this.sprite.src = urlGambar;
    this.x = 0;
    this.y = 0;
    this.width=width;
    this.height=height;
    this.aopacity=0;
    this.tanda=true;
}

Asap.prototype = {
    constructor : Asap,//perhatikan koma
    setSprite : function(urlGambar)//pembuatan fungsi
    {
        this.sprite.src = urlGambar;//return
    },
	setOpacity : function(opc, tanda)//pembuatan fungsi
    {
            if(tanda == true)
            {
                if(this.aopacity<=1)
                {
                    this.aopacity+=opc*7;
                }   
                else
                {
                    this.tanda=false;
                } 
            }
            
           if(tanda ==false)
            {
                if(this.aopacity>0)
                {
                    this.aopacity-=opc;
                }
                else
                {
                    this.aopacity=0;    
                } 
            }  
    },

    draw : function(context)
    {
        context.save();
        context.globalAlpha=this.aopacity;
	context.drawImage(this.sprite,this.x,this.y);
	context.restore();
	
    }
}