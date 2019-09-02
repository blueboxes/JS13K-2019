//todo:
/*
move player to each cell 
highlight then fade cells
*/
import { Sprite } from 'kontra';
import svg from '../img/player.svg'

export function Message(){

return Sprite({
    x: window.innerWidth/2,        
    y: window.innerHeight,
    width: 200*0.92,
    height: 200,
    dx:0,
    dy:-3,
    render: function(){
        let ctx = this.context;
        const img = new Image();
        img.src = svg;
     
        const x = this.x-this.width/2;
        const y = this.y-this.height/2;
        ctx.drawImage(img,x,y,this.width,this.height);        
        ctx.font = '15pt Calibri';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText('Level 2', this.x, this.y + this.height - 130);
    },
    update: function() {
        if(this.y >= 200)
            this.advance();      
    }
  });

}