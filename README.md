# Flight Back Home
This game was created by John Kilmister for js13kGames build on kontra. In 2019 this game runs on only the latest chrome and firefox desktop browsers and chrome mobile.

![Game ScreenShot](/media/screen.png?raw=true "Game Screen Shot")

## Objective
Watch the outbound route of the plane then complete the route back home by tapping on the correct cells in order including the final landing. Be warned if you go off course your plane will crash.

## Controls 
When ready for the return trip tap/click on the hex grid to move the plane around. Tap on the flags at the top of the page to be reminded of the route. If you go off course and crash tap or click to try again.

## Tech 
This entry uses [kontra](https://straker.github.io/kontra/), [jk13K starter Pack](https://github.com/sz-piotr/js13k-webpack-starter),  non transpiled ES6, Native dialogs, CSS3 animations and flexbox so will only work on the latest Chrome (desktop or mobile) or Firefox browsers.

## Features
* Story Mode
    * 3 Lifes 
    * 3 Rewinds
    * Every 3rd level the route grows by one
    * Every 10th level you get an extra life
* Free Play Mode
    * Select number of sectors
    * Select number of lives
    * Select number of rewinds
* Share score on twitter
* Sound effects  
   
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

## With Thanks
I would like to extend my thanks to...

* Andrzej Mazur for running JS13K Games
* Kontra for a great game framework
* JFSXR and as3sfxr for the sounds - https://github.com/mneubrand/jsfxr
* @redblobgames for this great post on hexegons - https://www.redblobgames.com/grids/hexagons/
* Blink JS - https://gist.github.com/paulirish/12fb951a8b893a454b32

