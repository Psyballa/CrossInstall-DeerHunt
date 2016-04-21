//This class will allow you to easly create tweens, particle effects and animations

//HOW TO USE THE SHOW FUNCTION
// TWEENING:
// teaser.Show('image_id',fromX,fromY,toX,toY,tweenType,speed,loop,delay,scaleX,scaleY);
// e.g teaser.Show('paw',0,0,200,200,'Linear',5000,true,200,1,-1);

//HOW TO USE THE STOP FUNCTION
//THIS FUNCTION ONLY REMOVES STATIC OBJECTS (paw,paw_gold)
// teaser.Stop('paw',true);
//             id    fade out

//HOW TO USE THE PARTICLE SYSTEM
//THIS FUNCTION CREATES A TOP TO BOTTOM SQUARE PARTICLE EMITTER
// teaser.ShowParticles('confetti',400,500,1200,800,500,500,2,2,0,0,-200,1000,0);
// key,x,y,height,width,minSpeed,maxSpeed,scaleX,scaleY,rotationX,rotationY,gravity,particleAmmount,ms



//HOW TO REMOVE PARTICLE SYSTEMS,
//teaser.StopParticles();


//HOW TO PLAY NON STATIC OBJECTS (cat, case01,case02,man_walk)
//teaser.playAnimatedTeaser(name,x,y,fps,loop)
//teaser.playAnimatedTeaser('cat',200,200,10,true);

//HOW TO REMOVE NON STATIC OBJECTS 
//teaser.stopAnimatedTeaser(name,fade);
//teaser.stopAnimatedTeaser('cat',true);



 Teaser = function() {
  this.game = null;

 
    
 
};

var paw;
var paw_gold;
var emitter;
 var case01;
 var case02;
var man_walk;
var cat;
//                                 string,int,int,int,int,string,int,int
Teaser.prototype.Show = function(name,fromX,fromY,scaleX,scaleY,angle) {
   
    var teasers = ['paw','paw_gold'];
    var teaser = teasers.indexOf(name);
    

    
    
    
    switch(teaser){
        case 0:
           paw=  game.add.sprite(fromX,fromY,name);
              
                                                
               paw.scale.x = scaleX;
               paw.scale.y = scaleY;  
            paw.angle = angle;
            paw.anchor.setTo(0.5,0.5);
//            pawtween.to({x:toX,y:toY},speed,tweenType,false,delay,20000000,true).loop(loop);
//                pawtween.start();
//      

//    pawtween.onComplete.add(function(){
//        game.time.events.add(1000,function(){
//     
//         
//             game.time.events.add(10000,function(){
//                    paw.kill();
//       
//             },this);
//        },this);
//    },this);
//    
                // delay decides how long the sprite stays before moving back to original position
  break;
        case 1:
    

    
            paw_gold=  game.add.sprite(fromX,fromY,name);
                var goldpawtween = game.add.tween( paw_gold);
                                                
                goldpawtween.to({x:toX,y:toY},speed,tweenType,false,delay,20000000,true).loop(loop);
                goldpawtween.start();
                // delay decides how long the sprite stays before moving back to original position
            break;
        default:
            console.warn('UNKNOWN ID (Show)');
            
    }

    
    

    
}

Teaser.prototype.Stop = function(name,fade){
    
    switch(name){
        case "paw":
            if(fade){
         var tween = game.add.tween(paw);
        tween.to({alpha:0},300,'Linear',true,0);
            // change 300 if you want a longer/shorter fade animation. 300 will be left as default
            }else{
            paw.visible = false;
           
            }
            
                break;
        case "paw_gold":
                if(fade){   
            var tween = game.add.tween( paw_gold);
        tween.to({alpha:0},300,'Linear',true,0);
            // change 300 if you want a longer/shorter fade animation. 300 will be left as default
            }else{
            paw_gold.visible = false;
             
            }
            
            console.log('hide paw_gold');
    }
       
}


Teaser.prototype.ShowParticles = function(name,x,y,height,width,minSpeed,maxSpeed,scaleX,scaleY,rotationX,rotationY,gravity,particleAmmount,ms){
    
    

           // here i use a cheaper trick to make variants of particles, I do this because as the particle
           // ammount is costum, we need to use the cheapest way of animating
           // instead of animating each particle, it chooses a random sprite from the atlas
            
            var particules = 11;
            var _pArray = Array.apply(null, {length: particules}).map(Number.call, Number);
    
             emitter = game.add.emitter(x,y,particleAmmount);
           
            emitter.width = width;
            emitter.height = height;
            emitter.makeParticles('confetti', _pArray );
            emitter.minParticleSpeed.set(0,minSpeed);
            emitter.maxParticleSpeed.set(0,maxSpeed);
            
            emitter.setRotation(rotationX,rotationY);
           
            emitter.setScale(scaleX,scaleY);
            emitter.gravity = gravity;
          
           emitter.start(false,2000,ms);

}

Teaser.prototype.StopParticles=function(){
    emitter.on =false;
}

Teaser.prototype.playAnimatedTeaser = function(name,x,y,scaleX,scaleY,angle,fps,loop){

    var teasers = ['case01','case02','man_walk','cat'];
    var teaser = teasers.indexOf(name);
    
    


    switch(teaser){
        case 0:
    
   case01 = game.add.sprite(x,y,name);
            case01.scale.setTo(scaleX,scaleY);
            case01.angle = angle;
            case01.animations.add('open',[0,1,2,3,4],fps,loop);
            case01.animations.play('open');
            case01.animations.currentAnim.onComplete.add(function(){
                case01.visible = false;
            },this);
    
            break;
        case 1:
               case02 = game.add.sprite(x,y,name);
            case02.scale.setTo(scaleX,scaleY);
            case02.angle.setTo(rotX,rotY);
    case02.animations.add('open1',[0,1,2,3,4],fps,loop);
    case02.animations.play('open1');
            break;
        case 2:
                man_walk = game.add.sprite(x,y,name);
            man_walk.scale.setTo(scaleX,scaleY);
            man_walk.angle = angle;
    man_walk.animations.add('man_walk',[0,1,2,3,4,5,6,7,8],fps,loop);
    man_walk.animations.play('man_walk');
            game.add.tween(man_walk).to({x:4000},17000,Phaser.Easing.Linear.None,true,0,1000,false);
            break;
        case 3:
            cat = game.add.sprite(x,y,name);
            cat.scale.setTo(scaleX,scaleY);
          cat.angle=angle;
            
            cat.animations.add('cat',[0,1,2,3],fps,loop);
            cat.animations.play('cat');
            break;
        default:
            console.warn('UNKNOWN ID (playAnimatedTeaser)');
            
    }
}
    
    
Teaser.prototype.stopAnimatedTeaser = function(name,fade){
    switch(name){
        case 'case01':
         if(fade){
         var tween = game.add.tween(case01);
        tween.to({alpha:0},300,'Linear',true,0);
            // change 300 if you want a longer/shorter fade animation. 300 will be left as default
            }else{
            case01.visible = false;
              
            }
            break;
        case 'case02':
                   if(fade){
         var tween = game.add.tween(case02);
        tween.to({alpha:0},300,'Linear',true,0);
            // change 300 if you want a longer/shorter fade animation. 300 will be left as default
            }else{
            case02.visible = false;
              
            }
            break;
        case 'man_walk':
                   if(fade){
         var tween = game.add.tween(man_walk);
        tween.to({alpha:0},300,'Linear',true,0);
            // change 300 if you want a longer/shorter fade animation. 300 will be left as default
            }else{
            man_walk.visible = false;
               
            }
            break;
        case 'cat':
        if(fade){
         var tween = game.add.tween(cat);
        tween.to({alpha:0},300,'Linear',true,0);
            // change 300 if you want a longer/shorter fade animation. 300 will be left as default
            }else{
            cat.visible = false;
        
            }
            break;
            
    }
}

Teaser.prototype.initCat = function(){


      teaser.playAnimatedTeaser('cat',1010,220,-1,1,-90,2,true);
    
  var tween1 = game.add.tween(cat).to({x:800},2000,"Quart.easeOut");
    tween1.start();

    tween1.onComplete.add(function(){
        game.time.events.add(1000,function(){
             var tween2 = game.add.tween(cat).to({x:1010},2000,"Quart.easeOut");
          tween2.start();
         
             game.time.events.add(20000,function(){
//                    cat.kill();
                 teaser.secondcat();
             },this);
        },this);
    },this);
    
 
    
      
            teaser.Show('paw',1200,450,1,1,75);    
    var tweenpaw = game.add.tween(paw).to({x:1010-50,y:500+50},2000,"Quart.easeOut");
    tweenpaw.start();
   
   tweenpaw.onComplete.add(function(){
       game.time.events.add(100,function(){
           var tweenpaw2 = game.add.tween(paw).to({x:1010+100,y:500},2000,"Quart.easeOut");
           tweenpaw2.start()
           
           game.time.events.add(20000,function(){
//               paw.kill();
           },this);
       },this);
     },this); 
    }


Teaser.prototype.secondcat = function(){
            
  
             teaser.playAnimatedTeaser('cat',-250,500,-1,1,90,2,true);
    var tween1 = game.add.tween(cat).to({x:100},2000,"Quart.easeOut");
    tween1.start();
        tween1.onComplete.add(function(){
        game.time.events.add(1000,function(){
             var tween2 = game.add.tween(cat).to({x:-200},2000,"Quart.easeOut");
          tween2.start();
         
             game.time.events.add(20000,function(){
            teaser.initCat();
             },this);
        },this);
    },this);

    
    
          
            teaser.Show('paw',-500,520,1,1,-90);    
    var tweenpaw = game.add.tween(paw).to({x:-250+160,y:550+10},2000,"Quart.easeOut");
    tweenpaw.start();
   
   tweenpaw.onComplete.add(function(){
       game.time.events.add(100,function(){
           var tweenpaw2 = game.add.tween(paw).to({x:200-420,y:550-25},2000,"Quart.easeOut");
           tweenpaw2.start();
           
           game.time.events.add(20000,function(){
//               paw.kill();
           },this);
       },this);
     },this); 
    
    }

Teaser.prototype.initMan_Walk=function(){
    teaser.playAnimatedTeaser('man_walk',-600,300,1,1,0,4,true);
}


var interacted = false;
var idlemode = false;



var teaser = new Teaser();