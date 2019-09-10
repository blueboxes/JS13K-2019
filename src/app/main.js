import { init,initPointer,onPointerDown, GameLoop } from 'kontra';
import { Player } from './player';
import { createGame } from './game';
import { show } from './dialog';
import { setupDialogEvents } from './dialogEvents';

let { canvas } = init();

var r = canvas.getBoundingClientRect();
canvas.width = r.width;
canvas.height = r.height - r.top;

initPointer();
  
let player = Player();
let game = createGame(player,canvas);

show("#new-dialog");

onPointerDown(function(e, sprite) {
  game.onPointerDown(sprite);
})

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