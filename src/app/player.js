//todo:
/*
move player to each cell 
highlight then fade cells
*/
import { Sprite } from 'kontra';
import svg from '../img/player.svg' 
import { sounds } from './sounds';

export function Player(){

//Load the image once ready for render later
const img = new Image();    
img.src = svg;

return Sprite({
    x: 0,        
    y: 0,
    width: 30*0.92,//* ratio of width to height of original svg
    height: 30,
    cw:true,
    rotation:0,//current in degrees
    dr:0,//desired rotation in degrees
    dx:0,//desired x
    dy:0,//desired y
    scale:1,
    pathCells:[],
    speed: 1,
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
      if(Math.abs(this.dr-this.rotation) > 10){
         
        if(this.cw)
          this.rotation+=4;
        else
          this.rotation-=4;

        if(this.rotation > 360)
          this.rotation = 0;

        if(this.rotation < 0)
          this.rotation = 360;
          

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
            
            let directionRad = Math.atan2(this.currentTarget.y-this.y, this.currentTarget.x-this.x);
            
            this.dr = (((directionRad * 180)/Math.PI + 90) + 360) % 360;

            let diff = this.dr - this.rotation;
            if(diff < 0)
                diff += 360;
            if(diff > 180)
                this.cw = false; 
            else
                this.cw = true;

            this.dx = Math.cos(directionRad) * this.speed;
            this.dy = Math.sin(directionRad) * this.speed;
          }

          if(this.currentTarget){  
            this.x += this.dx;
            this.y += this.dy;   
            this.scale = 1.1;
          }else{
            this.scale = 1;
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