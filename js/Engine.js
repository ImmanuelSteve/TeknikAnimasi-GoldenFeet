function Engine() {
    //penebangnya
        var image = new Image();
        image.src = "images/penebang/m_body.png";
        //left hand
        var image2 = new Image();
        image2.src = "images/penebang/m_up_lhand.png";
        var image3 = new Image();
        image3.src = "images/penebang/m_lo_lhand.png";
        var image4 = new Image();
        image4.src = "images/penebang/m_arm_lhand.png";
        //rightHand
        var image5 = new Image();
        image5.src = "images/penebang/m_up_rhand.png";
        var image6 = new Image();
        image6.src = "images/penebang/m_lo_rhand.png";
        var image7 = new Image();
        image7.src = "images/penebang/m_arm_rhand.png";
        var image8 = new Image();
        image8.src = "images/penebang/m_leg.png";

         var image9 = new Image();
        image9.src = "images/penebang/m_chainsaw.png";
        var image10 = new Image();
        image10.src = "images/penebang/m_head.png";

            var body = new Body(image,200,370,-31/2,-34);
            var upper_left = new Segment(image2,body.getLeftHandPin().x,body.getLeftHandPin().y,-4,-3);
            var lower_left = new Segment(image3,0,0,-4,-3);
            var arm_left = new Segment(image4,0,0,-6,-2);
            var hand_left = new HandLeft(upper_left,lower_left,arm_left);

            var upper_left_1 = new Segment(image5,body.getLeftHandPin().x,body.getLeftHandPin().y,-3,-3 );
            var lower_left_1 = new Segment(image6,0,0,-3,-2);
            var arm_left_1 = new Segment(image7,0,0,-4,-1);
            var hand_right = new HandRight(upper_left_1,lower_left_1,arm_left_1);

            var leg_left = new Segment(image8,0,0,-(12/2+3),0);

            var leg_right = new Segment(image8,0,0,-(12/2+3),0);

            var head = new Segment(image10,0,0,-28/2,-28);

    this.graji = new Segment(image9,0,0,-69,-22/2);

    this.penebang = new Man(head,body,hand_left,hand_right,leg_left,leg_right);
    this.penebangHp = new PenebangBar(710,10,200);
    this.penebangHpImage = new Penebang(910,10,"images/penebang/m_head.png");

    this.tupai = new Tupai(45,150,1);
    this.tupai.setSprite("images/tupai2.png");   
    this.bar_shoot = new BarShoot(this.tupai);
    this.bar_jump = new BarJump(this.tupai);
    this.apple = new Apple(this.tupai.x,this.tupai.y,this.tupai);
    this.apple.setSprite("images/apple.png");
    this.pohon = [];
    this.pohonbawah = [];
    this.jumlah_pohon = 5;
    this.daunArray = [];
    this.jumlahDaun = 10;
    this.serpihanArray = [];
    this.jumlahSerpihan = 10;
    this.debu =  new Asap("images/dust.png",20,20);
    this.mouse = utils.captureMouse(canvas);
    this.shootInterval;//untuk menampung interval update power tembakan
    this.debuInterval;
    this.angryInterval;
    this.penebangTargetPohonLama = this.penebang.target_pohon;
    this.mati = false;
}


Engine.prototype.init = function () 
{
    this.penebang.body.x = -100;
    this.penebang.flip = -1;
    this.penebang.gerakan_penebang = 0;

    var penebang = this.penebang;
    var apple = this.apple;
    var tupai = this.tupai;
    var bar_jump = this.bar_jump;
    var bar_shoot =  this.bar_shoot;
    canvas.addEventListener('mousedown',function(){
        apple.canShoot = true;
        if (tupai.getball){
            this.shootInterval=setInterval(function(){bar_shoot.w = apple.updatePowerShoot(bar_shoot.w);},30);
        }
    },false);
    canvas.addEventListener('mouseup',function(){
         if (tupai.getball){
            bar_shoot.w = 0;
            clearInterval(this.shootInterval);

            apple.shoot();
            tupai.getball = false;
        }
    },false);
    window.addEventListener('keydown',function(event){
        //add key to process here
        //console.log(tupai.isJump);
        if(event.keyCode===32 && tupai.isJump==true){
            bar_jump.w= tupai.updatePowerJump(bar_jump.w);    
        }else if(event.keyCode===65 && tupai.isJump==true){
            tupai.arah = -1;
            tupai.setSprite("images/tupai.png");
        }else if(event.keyCode===68 && tupai.isJump==true){
            tupai.arah = 1;
            tupai.setSprite("images/tupai2.png");
        }
        else if(event.keyCode===69){
            penebang.gerakan_penebang = 1;
        }
    },false);
    window.addEventListener('keyup',function(event){
        //add key to process here
        if(event.keyCode===32 && tupai.isJump==true){
            console.log(tupai.isJump);
            tupai.isJump = false;
            console.log(tupai.isJump);
            tupai.jump();
            bar_jump.w = 0;
            
        }
    },false);

    
}
                 
Engine.prototype.draw = function (context) 
{
    //jika tupai ada dipohon yang tumbang
    if (this.pohon[this.tupai.atpohon].isFall ==  true && this.mati == false) {
        //this.tupai.powerJump += 0.5;
        if (this.tupai.isJump == true) {
                this.tupai.vy = this.tupai.gravitasi;
                this.tupai.jump();
        }
        this.mati = true;
    }
    //console.log(this.penebang.gerakan_penebang);
    this.penebangHp.draw(context);
    this.penebangHpImage.draw(context);
    //jika penebang utils apple maka update bar penebangHp,penebangHpImage
    if (utils.intersects(this.apple.getBounds(),this.penebang.body.getBounds()) && this.penebang.kenaTembak == false) {
        console.log("kena");
        this.penebang.kenaTembak = true;
        this.penebangHp.w -= 20;
        this.penebangHpImage.x -= 20;
        this.penebang.gerakan_penebang = -1;
        this.penebangTargetPohonLama =  this.penebang.target_pohon;
        this.penebang.target_pohon = this.tupai.atpohon;
    }
    
    //penebang pindah ketika nyawa habis
    if (this.pohon[this.penebang.target_pohon].nyawa == 0) {
        //this.pohon[this.penebang.target_pohon].isFall = true;
        this.penebangTargetPohonLama =  this.penebang.target_pohon; 
        do{
              this.penebang.target_pohon=Math.floor(Math.random()*5);  
        }while (this.pohon[this.penebang.target_pohon].isFall==true && this.jumlah_pohon > 1);
        this.jumlah_pohon--;
        this.penebang.gerakan_penebang = -1;
    }
    
    //arah pohon tumbang
    //console.log("penebang tujuan = " + this.penebang.target_pohon);
    //console.log("penebang tujuan lama = " + this.penebangTargetPohonLama);
    if(this.jumlah_pohon == 1){
        this.penebangTargetPohonLama = this.penebang.target_pohon;
        if (this.pohon[this.penebangTargetPohonLama].x > this.penebang.body.x) {
                this.pohon[this.penebangTargetPohonLama].arah = -1;
        }else{
                this.pohon[this.penebangTargetPohonLama].arah = 1;
        }
    }else if(this.penebang.target_pohon > this.penebangTargetPohonLama){
        this.pohon[this.penebangTargetPohonLama].arah = 1;
    }else if ( this.penebang.target_pohon < this.penebangTargetPohonLama) {
        this.pohon[this.penebangTargetPohonLama].arah = -1;
    }
    
    this.bar_shoot.draw(context);
    this.bar_jump.draw(context,this.tupai);
    this.tupai.draw(context);
    
    if(this.penebang.gerakan_penebang == 1){
        this.penebang.gergaji();
        //console.log("case1");
    }
    else if(this.penebang.gerakan_penebang == 0){
        if (this.angryInterval!=null) {
            clearInterval(this.angryInterval);
        }
        
        this.penebang.run();
        if(this.penebang.flip == -1){
            if(this.penebang.body.x >= (this.pohon[this.penebang.target_pohon].x+4)){
                this.penebang.reset();
                this.penebang.gerakan_penebang =1; 
            }
        }
        else{
            if(this.penebang.body.x <= (this.pohon[this.penebang.target_pohon].x+150)){
                this.penebang.reset();
                this.penebang.gerakan_penebang =1; 
            }
        }
        //console.log("case2");
    }
    else if (this.penebang.gerakan_penebang==2) {
                this.penebang.angry();
                //console.log("case3");
        }
    else {
        if (this.penebang.gerakan_penebang ==-1){
                this.penebang.reset();
                if (this.pohon[this.penebang.target_pohon].x<=this.penebang.body.x) {
                        this.penebang.flip = 1;
                }
                else this.penebang.flip = -1;
                var p = this.penebang;
                this.angryInterval = setInterval(function(){p.gerakan_penebang = 0;},1000);
                this.penebang.gerakan_penebang = 2;
        }
        //console.log("case4");
    }
    //kalah dan efek debu
    if (this.tupai.y > 330) {
        this.tupai.y = 330;
        this.tupai.resetValue();
        var debu = this.debu;
        debu.x = this.tupai.x;
        debu.y = this.tupai.y;
        this.debuInterval = setInterval(function(){debu.setOpacity(0.1, debu.tanda);},1000/8);
    }
    if (this.penebangHp.w <= 0) {
        alert("Anda menang !!");
        window.location="main.html";
    }else if(this.debu.aopacity == 0 && !this.debu.tanda
       || (this.jumlah_pohon == 0 && this.pohon[this.penebang.target_pohon].degree < -75 && this.pohon[this.penebang.target_pohon].isFall == true)){
        clearInterval(this.debuInterval);
        alert("Anda kalah !!");
        window.location="main.html";
    }
    this.debu.draw(context);
    //cek boundary
    this.graji.x = this.penebang.left_hand.lowerSegment.getOTOPin().x;
    this.graji.y = this.penebang.left_hand.lowerSegment.getOTOPin().y;
    this.graji.flip = this.penebang.flip;

    bounds = this.tupai.getBounds();
    //context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
}
