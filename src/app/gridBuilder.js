import { createHexTile } from './hexTile';
import { track } from 'kontra';

export function buildGrid(canvas) {
    let vSpace = 37.5;
    let width = 43;
    let colCount = Math.ceil(canvas.width/vSpace);
    let rowCount = (canvas.height/43.30127) + 1;
    const canvasOffSet = 12.5;
    let hexMap = [];

    const centre = {x:Math.floor(colCount/2),y:Math.floor(rowCount/2)};
    let centreCell;

    for (let col = 0; col < colCount; col++) {
        for (let row = 0; row < rowCount; row++) {
            let y = row * width;
            y += (col%2) ? width/2 : 0;//Off set the odd columns so they tile
            let tile = createHexTile(canvasOffSet + col * vSpace,y,col,row);
            track(tile);

            if(col==centre.x && row==centre.y){
                tile.status = 'home';
                centreCell = tile;
            }

            hexMap.push(tile);
        }
    }
 
    return {hexMap,centreCell};
}
