require('jsfxr');
import {jsfxr} from 'jsfxr';

export function PlaySound(){
    var soundURL = jsfxr([0,,0.1812,,0.1349,0.4524,,0.2365,,,,,,0.0819,,,,,1,,,,,0.5]); 
    var player = new Audio();
    player.src = soundURL;
    player.play();
}