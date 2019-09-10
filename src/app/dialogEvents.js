import { show, hide } from './dialog';

export function setupDialogEvents(game)
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

  $("#lvl-dialog>.next")[0].on('click',()=> {
    game.resetLevel();
    hide("#lvl-dialog")
  });

}