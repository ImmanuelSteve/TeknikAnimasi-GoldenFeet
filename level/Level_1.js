function Level_1(engine,context) {
    this.engine = engine;
    this.treeFruit = 1;
    this.daunInterval;
    this.context = context;
    this.counterDaun = 0;
    this.counterKayu = 0;
    this.kurangiNyawaPohonInterval=0;
    this.ready = false;
    this.opacityPohonInterval;
}

Level_1.prototype.init = function() {
    for (var i = 0; i < this.engine.jumlah_pohon; i++) {
        this.engine.pohon[i] = new Tree(i*200,200,"images/pohon_atas.png");
        this.engine.pohonbawah[i] = new Tree(i*200,358,"images/pohon_bawah.png");
    };
    for (var daun, i = 0; i < this.engine.jumlahDaun; i++) {
        daun = new Daun("images/daun.png");
        daun.x = canvas.width + 100;
        daun.y = canvas.height + 100;
        daun.vy = Math.random() * 10;
        this.engine.daunArray.push(daun);
    }
    for (var kayu, i = 0; i < this.engine.jumlahSerpihan; i++) {
        kayu = new Kayu(1);
        kayu.x = canvas.width + 100;
        kayu.y = canvas.height + 100;
        kayu.vx =(Math.random() * 10+1)*kayu.ax;
        kayu.vy = (Math.random() * 10)*kayu.ay;
        this.engine.serpihanArray.push(kayu);
    }
    this.treeFruit=Math.floor(Math.random()*5);
    this.engine.apple.x = this.engine.pohon[this.treeFruit].getBounds().x+10;
    this.engine.apple.y = this.engine.pohon[this.treeFruit].getBounds().y+10;
    this.ready = true;
};


Level_1.prototype.draw = function(context) {
    this.engine.draw(context);
    for (var i = 0; i < 5; i++) {
        this.engine.pohon[i].draw(context);
        this.engine.pohonbawah[i].draw(context);
        var bounds = this.engine.pohon[i].getBounds();
        //context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
        bounds = this.engine.pohon[i].getBoundsPenebang();
        //context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
        if (utils.intersects(this.engine.pohon[i].getBounds(), this.engine.tupai.getBounds())) {
            
            this.counterDaun = 280;
            this.engine.tupai.y=this.engine.pohon[i].y-40;
            this.engine.tupai.resetValue();
            this.engine.tupai.atpohon = i;
            this.engine.tupai.isJump = true;
            if(this.engine.tupai.atpohon == this.treeFruit)
            {
                this.engine.tupai.getball = true;
                this.engine.apple.isUsed = true;
            }
        }
        //if (utils.intersects(this.engine.pohon[this.engine.penebang.target_pohon].getBoundsPenebang(),this.engine.graji.getBounds())&&i==this.engine.penebang.target_pohon) {
        if (this.engine.penebang.body.x - 4 == this.engine.pohon[this.engine.penebang.target_pohon].x
            || this.engine.penebang.body.x - 5 == this.engine.pohon[this.engine.penebang.target_pohon].x
            || this.engine.penebang.body.x - 6 == this.engine.pohon[this.engine.penebang.target_pohon].x
            || this.engine.penebang.body.x - 148 == this.engine.pohon[this.engine.penebang.target_pohon].x
            || this.engine.penebang.body.x - 149 == this.engine.pohon[this.engine.penebang.target_pohon].x
            || this.engine.penebang.body.x - 150 == this.engine.pohon[this.engine.penebang.target_pohon].x) {
            //console.log(this.engine.penebang.body.x);
            //console.log(this.engine.pohon[this.engine.penebang.target_pohon].x);
            //console.log("masuk ini");
            this.counterKayu = 1;
            var pohon = this.engine.pohon[this.engine.penebang.target_pohon];
            if (this.kurangiNyawaPohonInterval==0) {
                this.kurangiNyawaPohonInterval = setInterval(function(){pohon.kurangiNyawa();},300);
            }
        }else{
            //console.log(this.engine.penebang.body.x);
            //console.log(this.engine.pohonbawah[this.engine.penebang.target_pohon].x);
            clearInterval(this.kurangiNyawaPohonInterval);    
            this.kurangiNyawaPohonInterval = 0;
        }
    };
    this.engine.penebang.draw(context);
    this.engine.graji.draw(context);
    //bounds = this.engine.graji.getBounds();
    //context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);         
    bounds = this.engine.penebang.body.getBounds();
    //context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
//    if(this.engine.pohon[this.engine.penebang.target_pohon].isFall == true){
//        if (this.engine.pohon[this.engine.penebang.target_pohon].opacity > 0 && this.engine.pohon[this.engine.penebang.target_pohon].degree < -75) {
//            console.log(this.opacityPohonInterval);
//            var pohon = this.engine.pohon[this.engine.penebang.target_pohon];
//            this.opacityPohonInterval = setInterval(function(){pohon.setOpacity();},1000);
//        }
//        else if(this.engine.pohon[this.engine.penebang.target_pohon].opacity <= 0) {
//            console.log("test2");
//            this.opacityPohonInterval = 0;
//	    clearInterval(this.opacityPohonInterval);
//	}
//    }
    if (this.counterDaun > 0){
        //console.log("Counter Daun berguguran : "+this.counterDaun);
        this.engine.pohon[this.engine.tupai.atpohon].drawDaunArray(this.engine.daunArray,context);
        this.counterDaun--;
    }
    if (this.counterKayu > 0) {
        //console.log("Counter Serpihan kayu : "+this.counterKayu);
        this.engine.pohon[this.engine.penebang.target_pohon].drawSerpihanArray(this.engine.serpihanArray,this.engine.penebang.flip,context);
        this.counterKayu--;
    }
    //jika apple melebihi canvas.height maka 
    if (this.engine.apple.x>=canvas.width||this.engine.apple.x<=0||this.engine.apple.y>=canvas.height||this.engine.apple.y<=0)//atau sudah hit penebang
    {
        //console.log("Sebelum Posisi apple di pohon ke - "+this.treeFruit);
        this.engine.tupai.getball=false;
        this.engine.apple.resetValue();
        do{
            this.treeFruit=Math.floor(Math.random()*5);
            
        }while(this.engine.pohon[this.treeFruit].isFall==true  && this.engine.jumlah_pohon > 1);
        //console.log("Sesudah Posisi apple di pohon ke - "+this.treeFruit);
    }
    if(!this.engine.tupai.getball && !this.engine.apple.isUsed){
        this.engine.penebang.kenaTembak = false;
        this.engine.apple.x = this.engine.pohon[this.treeFruit].getBounds().x+10;
        this.engine.apple.y = this.engine.pohon[this.treeFruit].getBounds().y+10;
    }
    
    this.engine.apple.draw(context,this.engine.tupai);
    bounds = this.engine.apple.getBounds();
    //context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);

};