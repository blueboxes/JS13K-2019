const jsfxr = require('jsfxr');

export const sounds = {
    "gameOver" : [0,,0.0249,0.3547,0.3999,0.5186,,,,,,,,,,,,,1,,,,,0.5],
    "crash" : [3,,0.3862,0.4342,0.2399,0.1505,,-0.2944,,,,0.34,0.8579,,,0.7022,,,1,,,,,0.5],
    "start" : [1,,0.1031,,0.1284,0.5261,,,,,,,,,,,,,1,,,0.1,,0.5],
    "nextCell" : [0,,0.0711,0.3423,0.4561,0.4235,,,,,,,,,,,,,1,,,,,0.5],
    "levelup" : [0,,0.2254,,0.4779,0.2773,,0.3754,,,,,,0.0559,,0.5794,,,1,,,,,0.5]
   }

export function playSound(data){   
    var soundURL = jsfxr(data); 
    var player = new Audio();
    player.src = soundURL;
    player.play()
}