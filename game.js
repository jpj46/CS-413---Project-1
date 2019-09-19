var gameport = document.getElementById( "gameport" );
var renderer = PIXI.autoDetectRenderer( 640, 640, {backgroundColor: 0x999999} );
gameport.appendChild( renderer.view );

// Add containers and sprites
var stage = new PIXI.Container();
var background = new PIXI.Container();
var sun = new PIXI.Sprite( PIXI.Texture.fromImage( "assets/Sun.png" ) );
var trees = new PIXI.Sprite( PIXI.Texture.fromImage( "assets/Trees.png" ) );
var ground = new PIXI.Sprite( PIXI.Texture.fromImage( "assets/ground.png" ) );
var cloud1 = new PIXI.Sprite( PIXI.Texture.fromImage( "assets/cloud1.png" ) );
var cloud2 = new PIXI.Sprite( PIXI.Texture.fromImage( "assets/cloud2.png" ) );
var backdrop = new PIXI.Sprite( PIXI.Texture.fromImage( "assets/Background.png" ) );

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
var scoreText = new PIXI.Text('Score: ' + scoreCounter, 
      {fontFamily : 'Calibri', fontSize: 25, fill : 0x000000, align : 'center'});
stage.addChild( scoreText );

// Make list for banana fall types
var fallList = [createjs.Ease.bounceOut,
                createjs.Ease.linear,
                createjs.Ease.backOut,
                createjs.Ease.sineInOut,
                createjs.Ease.cubicOut,
                createjs.Ease.bounceIn];

// Animate the sprite and spawn the nanas!
animate();
bananaRandomizer();
createjs.Tween.get( cloud1.position ).to( { x: 640 }, 100000);
createjs.Tween.get( cloud2.position ).to( { x: -640 }, 100000);


// Animates the stage
function animate() 
{  
   renderer.render( stage );
   requestAnimationFrame( animate );
   scoreText.setText( 'Score: ' + scoreCounter );
   sun.rotation += .01;
   
   //document.addEventListener( 'keydown', keyPressEventHandler );
}

// Randomizes spawn time of bananas
function bananaRandomizer()
{
   var randomSpawnTime = Math.random() * 3000;
   setTimeout( function() { spawnBanana(); bananaRandomizer() }, randomSpawnTime );
}

// Handles mouse events
function mouseHandler( moving_banana )
{
   scoreCounter++;
   background.removeChild( moving_banana );
   //document.getElementById('coord').innerHTML = ("Click X: " + click.x + " Click Y: " + click.y);
}

// Spawns bananas into game, despawns them after a certain time
function spawnBanana()
{
   var moving_banana = new PIXI.Sprite( PIXI.Texture.fromImage( "assets/Banana.png" ) );
   background.addChild( moving_banana );
   moving_banana.interactive = true;
   moving_banana.on( 'mousedown', function() { mouseHandler( moving_banana ) } );
   moving_banana.x = Math.floor( Math.random() * 600 );
   moving_banana.y = 25;
   
   // Make random new x value for banana to fall to, and pick a number 0 - 5 for array bounce type
   var rand_x = Math.floor( moving_banana.x + ( Math.random() * 300 ) - ( Math.random() * 300 ) );
   var randNumForFallList = Math.floor( Math.random() * 5 );
   var type = fallList[randNumForFallList];
   
   createjs.Tween.get( moving_banana.position ).to( { x: rand_x, y: 700 }, 5000, type );
   setInterval( function() { checkUnclickedBanana( moving_banana ) }, 10000);
}

// If banana is unclicked after moving off screen, remove from game
function checkUnclickedBanana( moving_banana )
{
   stage.removeChild( moving_banana );
}