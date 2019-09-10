import { setTargetCells } from './pathBuilder';
import { show } from './dialog';
import { buildGrid } from './gridBuilder';
import { applyTemplate } from './template';
import { playSound,sounds } from './sounds';
import { getLevelMessage, getStatusMessage } from './messages';

export function createGame(thePlayer,canvas){

   let grid = buildGrid(canvas);
   thePlayer.x = grid.centreCell.x;
   thePlayer.y = grid.centreCell.y;

   let g = {
        mode:'story',
        state:'new',
        level:1,
        lifes:0,
        flights:0,
        targetCells: null,
        hexMap: grid.hexMap,
        centreCell: grid.centreCell,
        player:thePlayer,
        resetGame:function(){
            this.mode = 'story';
            this.flights=0;
            this.level=1;
            this.lifes=3;
            this.rewinds=3;
        },
        resetLevel:function()
        {
          this.state='out';
          this.targetCells = setTargetCells(this.centreCell,this.hexMap,this.level);
          this.player.reset(this.centreCell.x,this.centreCell.y)
          this.drawRouteOut();
        },
        rewind:function(){
          if(this.state==='back' && this.rewinds > 0){
            this.rewinds--;
            this.player.reset(this.centreCell.x,this.centreCell.y);
            this.hexMap = this.hexMap.map((h)=>{h.status!='home' && h.status!='end'?h.reset():h.resetHome();return h})
            this.targetCells = this.targetCells.map((h)=>{if(h.status==='hit'){h.status='active'};return h});
            this.drawRouteOut();
          }
        },
        showPlan:function(){
          applyTemplate({
            level:this.level,
            message: getLevelMessage(this.level,this.flights,this.mode),
            speed:this.player.speed * 150,
            distance: Math.floor(this.level/3) + 5},
            "#lvl-tmp",
            "#lvl-dialog>span");

          show("#lvl-dialog");
        },
        onPointerDown(sprite)
        {
          if(this.state==='show' && this.lifes > 0){
            this.resetLevel();
          }

          if(this.state === 'back'){
            
              playSound(sounds.nextCell);

              var reamining = this.targetCells.filter((h)=>h.status!='hit'&&h.status!='end');
              var nextCell = reamining[reamining.length-1];

              sprite.onHit();
              this.player.moveToCell(sprite);

              if(sprite === nextCell){
               
                if(reamining.length===1){
                  this.state = 'pending'
                 
                  this.player.afterMove = ()=>{
                    this.state = 'levelup'
                    this.flights++;
                    playSound(sounds.levelup);
                    if(this.mode!='free'){
                      this.level++;
                      if(this.level%10==0)
                        this.lifes++;
                    }
                    this.showPlan()
                  };

                }
                return;
              }
          
              //Not hit the correct cell so after finish moving tell user
              this.state = 'pending';

              this.player.afterMove = ()=>{
                playSound(sounds.crash);
                this.lifes--;
                this.reaminingRoute();
            
                if(this.lifes===0) {
                  setTimeout(()=>{
                    this.state='over';
                    applyTemplate({flights:this.flights,level:this.level,url:window.location.href}, this.mode == 'story'?  "#story-over-tmp" : "#free-over-tmp", "#over-dialog>span");             
                    show("#over-dialog")                  
                  },3000);
                } 
              };
          }
        },
        reaminingRoute:function()
        {
          this.state='show';
          this.targetCells.map((cell,i)=>{

            if(i>0) cell.previous = this.targetCells[i-1]
            if(i!=this.targetCells.length) cell.next = this.targetCells[i+1]
            if(cell.status === 'active'){
              cell.fill = "#97d2da";  
            }

          });  

        },
        drawRouteOut:function(){
          for (let i = 0; i < this.targetCells.length; i++) {
              this.player.moveToCell(this.targetCells[i]); 
          }

          this.state='out'; 
        },
        update:function(){
          if(this.state=='out' && this.player.currentTarget==null)
            this.state = 'back';
        },
        render:function(){
 
          if(this.domReady){
            if($("#state")[0].innerText != getStatusMessage(this.state)){
                $("#state")[0].innerText = getStatusMessage(this.state);
            }
            if($("#lvl")[0].innerText != 'Level ' +  this.level){
              $("#lvl")[0].innerText = 'Level ' + this.level;
            }
            if($("#lf")[0].children.length != Math.max(this.lifes,0))
            {
              $("#lf")[0].innerHTML = '<li></li>'.repeat(this.lifes);
            }
            if($("#rw")[0].children.length != Math.max(this.rewinds,0))
            {
              $("#rw")[0].innerHTML = '<li></li>'.repeat(this.rewinds);
            }
          }

        }
    }
    return g;
}

 