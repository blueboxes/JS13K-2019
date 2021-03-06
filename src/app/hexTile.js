import {Sprite } from 'kontra';
import {getRandomInt} from './random';

export function createHexTile(x,y,col,row) {

    var colours = ["#a9be63","#91b247","#85a037"];
    var clr = colours[getRandomInt(colours.length)];

    let s = Sprite({
          x: x,        
          y: y,
          color: '#eaeaea',
          fill: clr,
          width: 50,
          height: 43.30127,
          row: row,
          col:col,
          resetHome: function()
          {
            this.previous = null;
            this.next = null;
          },
          reset: function(){
            this.status = null;
            this.fill = clr;
            this.previous = null;
            this.next = null;
            clearTimeout(this.fade);
          },
          onHit: function(){
            if(this.status!='home'){
              this.status='hit';
              this.fill = '#9eb4db';
            }
          },
          collidesWithPointer: function(pointer) {
            //perform a circle v circle collision test
            //this is a lot simpler that hex collision
            //could merge wih below to save space
            let dx = pointer.x - this.x;
            let dy = pointer.y - this.y;
            return Math.sqrt(dx * dx + dy * dy) < this.width/2;
          },
          collidesWithCentre: function(vector) {
            let dx = this.x - vector.x;
            let dy = this.y - vector.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
          
            return distance < 4;
          },
          update:function(player)
          {
            //highlight cell while the plane is in contact for half a second the back to normal.
            if(player && this.collidesWithPointer(player) && this.status === 'active' && this.fill != "#9eb4db")
            {
              let oldFill = this.fill;
              this.fill = "#9eb4db";
              this.fade = setTimeout((cell,oldFill)=>{cell.fill = oldFill;},500,this,oldFill);
            }

            if(this.status=='end' || this.status=='home'){
              this.fill = "#b2acab"; 
            }

          },
          render: function() {
              var ctx = this.context;
                
              var x = this.x + Math.cos(Math.PI * 2 / 6) * this.width/2;
              var y = this.y + Math.sin(Math.PI * 2 / 6) * (this.height/2 * 1.1547005);
              
              ctx.setLineDash([]);
              ctx.beginPath();
              ctx.moveTo(x, y);

              if(this.fill){
                ctx.fillStyle = this.fill;
              }

              ctx.strokeStyle = this.color;
              ctx.lineWidth = 0.5;
          
              for (var i = 1; i < 7; i++) {
                  x = this.x + Math.cos(Math.PI * 2 / 6 * i) * this.width/2;
                  y = this.y + Math.sin(Math.PI * 2 / 6 * i) * (this.height/2 * 1.1547005);
                  ctx.lineTo(x, y);
              }
          
              ctx.closePath();
              ctx.fill();
              ctx.stroke();

              //Draw line to show route
              ctx.strokeStyle = '#576c99';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.setLineDash([5, 5]);
              if(this.previous)
              {
                ctx.moveTo(this.previous.x, this.previous.y)
                ctx.lineTo(this.x, this.y);
              } 
              
              if(this.next){
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.next.x, this.next.y);
              }
              ctx.closePath();
              ctx.stroke();
           
          }
        });

        return s;
  }