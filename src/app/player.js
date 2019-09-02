//todo:
/*
move player to each cell 
highlight then fade cells
*/
import { Sprite } from 'kontra';
import svg from '../img/player.svg'

export function Player(){

//Load the image once ready for render later
const img = new Image();    
img.src = svg;

return Sprite({
    x: window.innerWidth/2,        
    y: window.innerHeight/2,
    width: 30*0.92,
    height: 30,
    rotation:0,//current in degrees
    dr:0,//desired rotation in degrees
    dx:0,//desired x
    dy:0,//desired y
    scale:1,
    pathCells:[],
    speed: 0.8,
    currentTarget:null,
    afterMove:null,
    reset:function(x,y)
    {
      this.pathCells=[];
      this.rotation=0;
      this.dr=0;
      this.dx=0;
      this.dy=0;
      this.x = x;
      this.y = y;
    },
    moveToCell: function(sprite){
      this.pathCells.push(sprite);
    },
    update: function() {

      if(!this.currentTarget && this.afterMove){
        this.afterMove();
        this.afterMove = null;
      }

      //either rotate or move, do not do both
      if(Math.abs(this.dr-this.rotation) > 5){
         
        if(this.cw)
          this.rotation+=4;
        else
          this.rotation-=4;

      }else if(this.pathCells.length > 0){
            
          let setTarget = false;

          //Set new target if needed
          if(!this.currentTarget){ 
              setTarget = true;
          }else if(this.currentTarget.collidesWithCentre(this)){
            
            this.pathCells.splice(0, 1);

            if(this.pathCells.length>0){
              setTarget = true;
            }else{
              this.currentTarget = null;
            }          
          }
 
          if(setTarget){
            this.currentTarget = this.pathCells[0];
            const directionRad = Math.atan2(this.currentTarget.y-this.y, this.currentTarget.x-this.x);
            
            this.dr = directionRad * (180/Math.PI) + 90;
            this.cw = (this.dr - this.rotation) > 0

            this.dx = Math.cos(directionRad) * this.speed;
            this.dy = Math.sin(directionRad) * this.speed;
          }

          if(this.currentTarget){  
            this.x += this.dx;
            this.y += this.dy;   
          }
        }
    },
    render: function(){
      if(img){
        let ctx = this.context;
        ctx.setTransform(this.scale, 0, 0, this.scale, this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(img,-this.width/2,-this.height/2,this.width,this.height);  
        ctx.setTransform(1,0,0,1,0,0);
      }
    }
  });

}