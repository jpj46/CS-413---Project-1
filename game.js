var gameport = document.getElementById( "gameport" );
var renderer = PIXI.autoDetectRenderer( 640, 640, {backgroundColor: 0x999999} );
gameport.appendChild( renderer.view );

// Add containers and sprites
var stage = new PIXI.Container();
var background = new PIXI.Container();
var sun = new PIXI.Sprite( PIXI.Texture.fromImage( "Sun.png" ) );
var trees = new PIXI.Sprite( PIXI.Texture.fromImage( "Trees.png" ) );
var sun = new PIXI.Sprite( PIXI.Texture.fromImage( "Sun.png" ) );
var ground = new PIXI.Sprite( PIXI.Texture.fromImage( "ground.png" ) );
var cloud1 = new PIXI.Sprite( PIXI.Texture.fromImage( "cloud1.png" ) );
var cloud2 = new PIXI.Sprite( PIXI.Texture.fromImage( "cloud2.png" ) );
var backdrop = new PIXI.Sprite( PIXI.Texture.fromImage( "Background.png" ) );

// Add background to stage
stage.addChild(background);

// Add backdrop gradient to background
background.addChild(backdrop);
backdrop.position.x = 0;
backdrop.position.y = 0;

// Add sun to background
sun.anchor.x = .5;
sun.anchor.y = .49;
sun.position.x = 500;
sun.position.y = 100;
background.addChild(sun);

// Add trees, clouds, and ground to background
background.addChild(trees);
background.addChild(ground);
background.addChild(cloud1);
background.addChild(cloud2);

// Add score text and score counter
scoreCounter = 0;
let scoreText = new PIXI.Text('Score: ' + scoreCounter, 
      {fontFamily : 'Calibri', fontSize: 25, fill : 0x525252, align : 'center'});
stage.addChild( scoreText );

// Animate the sprite and spawn the nanas!
animate();
createjs.Tween.get( cloud1.position ).to( { x: 640 }, 100000);
createjs.Tween.get( cloud2.position ).to( { x: -640 }, 100000);
var bananaSpawner = setInterval( spawnBanana, Math.floor( Math.random() * 3000 ) );

// Animates the stage
function animate() 
{  
   renderer.render( stage );
   requestAnimationFrame( animate );
   scoreText.setText( 'Score: ' + scoreCounter );
   sun.rotation += .01;
   
   //document.addEventListener( 'keydown', keyPressEventHandler );
}

function mouseHandler( moving_banana )
{
   scoreCounter++;
   stage.removeChild( moving_banana );
   //document.getElementById('coord').innerHTML = ("Click X: " + click.x + " Click Y: " + click.y);
}

function spawnBanana()
{
   var moving_banana = new PIXI.Sprite( PIXI.Texture.fromImage( "Banana.png" ) );

   
   background.addChild( moving_banana );
   moving_banana.interactive = true;
   moving_banana.on( 'mousedown', function() { mouseHandler( moving_banana ) } );
   moving_banana.x = Math.floor( Math.random() * 600 );
   moving_banana.y = 25;
   var rand_x = Math.floor( moving_banana.x + ( Math.random() * 50 ) - ( Math.random() * 50 ) );
   createjs.Tween.get( moving_banana.position ).to( { y: 700 }, 5000);
   setInterval( function() { checkUnclickedBanana( moving_banana ) }, 8000);
}

function checkUnclickedBanana( moving_banana )
{
   stage.removeChild( moving_banana );
}