#Flight Back
This game was created by John Kilmister for js13kGames. In 2019 this game runs on only the latest chrome and firefox desktop browsers and chrome mobile.

### Objective
Watch the outbound route of the plane then complete the route back but tapping on the correct cells in order. Be warned if you go off course you plane will explode.

### Controls 
After Tap/click on the hex grid to move the plane around.

### Tech 
This entry uses non transpiled ES6, Native dialogs, CSS3 animations and flexbox so will only work on the latest Chrome (desktop or mobile), Firefox or Edge browsers.

### Features
* Random maze generation at 3 sizes chosen by the player
* Glitch tiles that mix up the maze
* Scrollable maze for small screens
* Timed runs
* Top scores stored and shown per maze size
* Share score on twitter
* Sound effects  
* Mute sounds
* Quit back to level screen
   
## How can I get started?

The first thing you need to do is make sure you have [node.js](https://nodejs.org/en/download/current/) installed. Then clone the project and in the root directory run the following command:

```
npm install
```

This should install all the required dependencies for developing the project. After the installation finishes you will be able to run the included npm scripts.

After going through the installation just run the following command:

```
npm start
```

This will setup a server listening at `http://localhost:8080/` and you can play the game.

## How can i generate the files as they were submitted?

This project provides a npm script for building the application. Just run:
```
npm run build
```

This will generate two files `index.html` and `build.zip` both located in the `dist/` folder. The zip file contains only the generated `index.html`. The output from the command also tells you how large is the generated zip file.

### With Thanks
I would like to extend my thanks to...

* Andrzej Mazur for running JS13K Games
* JFSXR and as3sfxr for the sounds - https://github.com/mneubrand/jsfxr
* https://www.redblobgames.com/grids/hexagons/
* Blink JS - https://gist.github.com/paulirish/12fb951a8b893a454b32

