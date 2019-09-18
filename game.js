var gameport = document.getElementById( "gameport" );
var renderer = PIXI.autoDetectRenderer( 640, 640, {backgroundColor: 0x999999} );
gameport.appendChild( renderer.view );

var stage = new PIXI.Container();
var spider = new PIXI.Sprite( PIXI.Texture.fromImage( "Spider sprite.png" ) );
var maze_bkg = new PIXI.Sprite( PIXI.Texture.fromImage( "Maze.png" ) );

// Create the maze and add it to the stage
var maze = new PIXI.Container();
maze.position.x = 0;
maze.position.y = 0;
stage.addChild(maze);

// Add maze background
maze.addChild(maze_bkg);
maze_bkg.position.x = 0;
maze_bkg.position.y = 0;

// Add the spider to the stage
spider.position.x = 16;
spider.position.y = 16;
stage.addChild(spider);
spider.interactive = true;
spider.on( 'mousedown', mouseHandler );

scoreCounter = 0;
let scoreText = new PIXI.Text('Score: ' + scoreCounter, 
      {fontFamily : 'Calibri', fontSize: 25, fill : 0x525252, align : 'center'});
stage.addChild(scoreText);
// hi

// Animate the sprite and spawn the nanas!
animate();
var bananaSpawner = setInterval( spawnBanana, Math.floor( Math.random() * 3000 ) );


// Animates the stage
function animate() 
{  
   renderer.render( stage );
   requestAnimationFrame( animate );
   scoreText.setText( 'Score: ' + scoreCounter );
   
   //document.addEventListener( 'keydown', keyPressEventHandler );
}

function mouseHandler( click )
{
   scoreCounter++;
   //document.getElementById('coord').innerHTML = ("Click X: " + click.x + " Click Y: " + click.y);
}

function spawnBanana()
{
   var moving_spider = new PIXI.Sprite( PIXI.Texture.fromImage( "Spider sprite.png" ) );
   stage.addChild(moving_spider);
   moving_spider.interactive = true;
   moving_spider.on( 'mousedown', mouseHandler );
   moving_spider.x = Math.floor( Math.random() * 600 );
   moving_spider.y = Math.floor( Math.random() * 600 );
}






/*
var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0xcfcfcf});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var hero = new PIXI.Sprite(PIXI.Texture.fromImage("Spider sprite.png"));

hero.position.x = 100;
hero.position.y = 100;
stage.addChild(hero);

function mouseHandler(e) {
   var new_x = Math.floor( Math.random() * 300 ) + 50;
   var new_y = Math.floor( Math.random() * 300 ) + 50;
   createjs.Tween.get( hero.position ).to( { x: new_x, y: new_y }, 1000 );
}

hero.interactive = true;
hero.on('mousedown', mouseHandler);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();
*/