const jsfxr = require('jsfxr');

export const sounds = {
    "gameOver" : [0,,0.0249,0.3547,0.3999,0.5186,,,,,,,,,,,,,1,,,,,0.5],
    "crash" : [3,,0.3862,0.4342,0.2399,0.1505,,-0.2944,,,,0.34,0.8579,,,0.7022,,,1,,,,,0.5],
    "start" : [1,,0.1031,,0.1284,0.5261,,,,,,,,,,,,,1,,,0.1,,0.5],
    "start2" : [1,,0.1031,,0.64,0.5261,,,,,,,,,,,,,1,,,0.1,,0.5],
    "engine" : [3,,0.78,0.9,0.2399,0.58,,,,,,-0.8,0.8579,,,0.74,,,1,,,,0.9199,0.11]
   }

export function playSound(data){   
    var soundURL = jsfxr(data); 
    var player = new Audio();
    player.src = soundURL;
    player.play()
}