import {track} from 'kontra';
import {getRandomInt} from './random';

//todo on easy levels ensure always only have one nabour

export function setTargetCells(homeCell,hexmap,level){
    let evenOptions = [
      [0,-1],
      [-1,-1],
      [-1,0],
      [0,1],
      [1,0],
      [1,-1],  
    ];
    
    let oddOptions = [
      [0,-1],
      [-1,0],
      [-1,1],
      [0,1],
      [1,1],
      [1,0],  
    ];
  
    //reset map
    hexmap = hexmap.map((h)=>{if(h.status!='home')h.reset();return h})

    let targetCells = [];
    let currentCell=homeCell;
    
    //cells start at 4 and increase by 1 every 5 levels
    let cellCount = Math.floor(level/5) + 5;
    let skip = 0;
    targetCells.push(homeCell);

    while(targetCells.length <= cellCount && skip < 100){
      //todo: check not falled off page
      //todo:check number of nabours for given level
      let offset = (currentCell.col%2===0) ? evenOptions[getRandomInt(6)] : oddOptions[getRandomInt(6)]
      let cell = hexmap.find((e)=>e.col === (currentCell.col + offset[0]) && e.row === (currentCell.row + offset[1]));
      if(cell && !cell.status){
        
        if(targetCells.length===cellCount){
          cell.status = 'end';     
        }else{
          cell.status = 'active';      
          track(cell);
        }

        targetCells.push(cell);
        cell.text = targetCells.length + 1;
  
        //console.log("from " + currentCell.col  + ','+ currentCell.row + " offset " + offset + " new " + cell.col  + ','+ cell.row)
        currentCell = cell;
      }
      else{
        skip++;
        //console.log("skip " + currentCell.col  + ','+ currentCell.row + " offset " + offset)
      }
    }
 
    return targetCells;
  }