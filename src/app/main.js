import { init,initPointer,onPointerDown, GameLoop } from 'kontra';
import { Player } from './player';
import { createGame } from './game';
import { show } from './dialog';
import { setupDialogEvents } from './dialogEvents';

let { canvas } = init();
 
function initGame()
{
  var r = canvas.getBoundingClientRect();
  canvas.width = r.width;
  canvas.height = r.height - r.top;
  
  player = Player();
  game = createGame(player,canvas);
  show("#new-dialog");
}

initPointer();
  
let player, game;
initGame();

onPointerDown(function(e, sprite) {
  game.onPointerDown(sprite);
})
 
window.addEventListener('resize', function(){
  initGame();
  game.domReady = true;
  setupDialogEvents(game);
}, true);


document.addEventListener("DOMContentLoaded", function(event) { 
  game.domReady = true;
  setupDialogEvents(game);

  //Add free play level options
  for (let i = 5; i < 20; i++) {
    var node = document.createElement("option");      
    node.value= Math.max(1,(i-5)*3);
    node.text= i + ' Sectors';
    $("#opt-level")[0].appendChild(node);
  }

  $("#rw")[0].on('click',()=>{
    game.rewind()
  });

});

let loop = GameLoop({  
  update: function() { 
    player.update();
    game.hexMap.map(sprite => sprite.update(player));
    game.update();
  },
  render: function() { 
    game.hexMap.map(sprite => sprite.render());
    player.render();
    game.render();
  }
});

loop.start();