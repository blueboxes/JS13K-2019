import { setTargetCells } from './pathBuilder';
import { show, hide } from './dialog';
import { buildGrid } from './gridBuilder';
import { applyTemplate } from './template';
import { playSound,sounds } from './sounds';
import { getLevelMessage, getStatusMessage } from './messages';
import { timeout } from 'q';

export function createGame(thePlayer,canvas){

   let grid = buildGrid(canvas);
   thePlayer.x = grid.centreCell.x;
   thePlayer.y = grid.centreCell.y;

   let g = {
        mode:'story',
        state:'new',
        level:1,
        lifes:1,
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
        showPlan:function(){
          applyTemplate({
            level:this.level,
            message: getLevelMessage(this.level,this.flights,this.mode),
            speed:this.player.speed * 150,
            distance: Math.floor(this.level/5) + 5},
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
                    if(this.mode!='free')
                      this.level++;
                    this.showPlan()
                  };

                }
                return;
              }
          
              //Not hit the correct cell so after finish moving
              //tell user
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

            if(cell.status === 'active'){

              let oldFill = cell.fill
              cell.fill = "#97d2da";  
              //todo:bug if you click before animation ends then
              //cells still show highlighted
              /*setTimeout((cell,oldFill)=>{
                cell.fill = oldFill;
                setTimeout((cell)=>{cell.fill = "#5fbac6";},500,cell,oldFill);  
              },1500,cell,oldFill);*/
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
        }
    }
    setupEvents(g);
    return g;
}

function setupEvents(game)
{
  $(".reset").forEach(e => {
    e.on('click',()=>{
      hide("#options-dialog");
      hide("#over-dialog");
      show("#new-dialog");
    });
  });

  $(".new-game")[0].on('click',()=>{
    game.resetGame();
    hide("#new-dialog");
    game.showPlan();
});

$(".options")[0].on('click',()=>{
  hide("#new-dialog");
  show("#options-dialog");
});

$(".free-game")[0].on('click',()=>{
  hide("#options-dialog");
  game.resetGame();
  game.level = parseInt($("#opt-level")[0].value);
  game.lifes = parseInt($("#opt-lifes")[0].value);
  game.mode = 'free';
  game.showPlan();
});
 
$("#lvl-dialog>button")[0].on('click',()=> {
  game.resetLevel();
  hide("#lvl-dialog")
});

}
 