import { setTargetCells } from './pathBuilder';
import { show, hide } from './dialog';
import { buildGrid } from './gridBuilder';
import { applyTemplate } from './template';

export function createGame(thePlayer,canvas){

   let grid = buildGrid(canvas);
   thePlayer.x = grid.centreCell.x;
   thePlayer.y = grid.centreCell.y;

   let g = {
        state:'new',
        level:1,
        lifes:3,
        targetCells: null,
        hexMap: grid.hexMap,
        centreCell: grid.centreCell,
        player:thePlayer,
        resetGame:function(){
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
            speed:this.player.speed * 150,
            distance:(Math.floor(this.level/5) + 5) * 10},
            "#lvl-tmp",
            "#lvl-dialog>main");

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
              if(sprite === nextCell){
                
                nextCell.onHit();
                this.player.moveToCell(sprite);

                if(reamining.length===1){
                  this.state = 'levelup'
                  this.level++;
                  this.player.afterMove = ()=>this.showPlan();
                }
                return;
              }
          
            this.lifes--;
            this.reaminingRoute();

            if(this.lifes===0) {
              this.state='over';
              this.player.afterMove = ()=>show("#over-dialog");
            }
          }
        },
        reaminingRoute:function()
        {
          this.state='show';
          this.targetCells.map((cell,i)=>{

            if(cell.status === 'active'){

              let oldFill = cell.fill
              cell.fill = "#5fbac6";  
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
            if($("#state")[0].innerText != this.state){
                $("#state")[0].innerText = this.state;
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
  $(".new-game").forEach(e => {
    e.on('click',()=>{
      game.resetGame();
      hide("#new-dialog");
      hide("#over-dialog");
      game.showPlan();
    });
  });
  
  $("#lvl-dialog>footer>button")[0].on('click',()=> {game.resetLevel();hide("#lvl-dialog")});
}
 