import { init,initPointer,onPointerDown, GameLoop } from 'kontra';
import { Player } from './player';
import { createGame } from './game';
import { show } from './dialog';

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