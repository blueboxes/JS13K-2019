import { init,initPointer,onPointerDown,track, GameLoop } from 'kontra';
import { Player } from './player';
import { createHexTile } from './hexTile';
import { createGame } from './game';
import { Message } from './message';
import { show } from './dialog';

let { canvas } = init();

var r = canvas.getBoundingClientRect();
canvas.width = r.width;
canvas.height = r.height;

initPointer();
  
let player = Player();
let game = createGame(player);
let message = Message();
function rows(rowCount,colCount) {
    let vSpace = 37.5;
    let width = 43;
  
    for (let col = 0; col < colCount; col++) {
        for (let row = 0; row < rowCount; row++) {
            let y = row * width;
            y += (col%2) ? width/2 : 0;//Off set the odd columns so they tile
            let tile = createHexTile(col * vSpace,y,col,row);
            track(tile);
            game.hexMap.push(tile);
        }
    }
}

rows(100,100);

//highlight centre
game.centreCell = game.hexMap.find((e)=>e.collidesWith(player));
player.x = game.centreCell.x;
player.y = game.centreCell.y;
game.centreCell.status = 'home';

show("#new-dialog");

onPointerDown(function(e, sprite) {
  game.onPointerDown(sprite);
})

let loop = GameLoop({  
  update: function() { 
    player.update();
    game.hexMap.map(sprite => sprite.update(player));
    //message.update();
    game.update();
  },
  render: function() { 
    game.hexMap.map(sprite => sprite.render());
    player.render();
    game.render();
    //message.render();
  }
});

loop.start();