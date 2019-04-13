var w, h, spritemap, player, reloadingTime = 10, playerSpeed = 10,
    keys = { left: false, right: false, up: false, down: false, space: false },
    bullets = [], bulletSpeed = 20, gunDamage = 10,
    monsterWidth = 52, monsterHeight = 56, monsters = [],
    playerWidth = 32, playerHeight = 41,
    spawnTime = 100, spawnReload = 0,
    mapWidth = 1024, mapHeight = 1012, wallSizeW = 32, wallSizeH = 46, wallSizeHC = 28;

var preload = function() {
  spritemap = loadImage("player.png");
}

var setup = function() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);
  noSmooth();
  player = new Player(mapWidth/2, mapHeight/2);
}

var time = 0;

var draw = function() {
  if(player.y < 0 || player.y >= mapHeight || player.x < 0 || player.x >= mapWidth) console.log('O');
  background(color(20, 200, 20));
  drawWalls();

  if(spawnReload%spawnTime === 0) {
    spawnEnemy();
  }
  spawnReload ++;

  player.update();
  player.draw();
  if(keys.space || mouseIsPressed) player.shoot();

  for(var i=0; i<bullets.length; i++) {
    if(bullets[i].update()) continue;
    bullets[i].draw();
  }
  for(var i=0; i<monsters.length; i++) {
    if(monsters[i].update()) continue;
    monsters[i].draw();
  }

  var healthBarW = player.hp / 100 * w * 0.8;
  // var healthBarW =10;
  fill(color(200, 20, 20));
  stroke(0);
  rect(w/2 - 0.4*w, h - 20, healthBarW, 16, 5);

  moveIfNeed();

  time += 1;
}

var drawWalls = function() {
  for(var x=0; x<=mapWidth; x+=wallSizeW) {
    drawFraction(x-player.x+(width-wallSizeW)/2, -player.y+(height-wallSizeH)/2, wallSizeW, wallSizeH, spritesParams.wall);
  }
  for(var y=0; y<=mapHeight; y+=wallSizeHC) {
    drawFraction(-player.x+(width-wallSizeW)/2, y-player.y+(height-wallSizeH)/2, wallSizeW, wallSizeH, spritesParams.wall);
  }
  for(var y=0; y<=mapHeight; y+=wallSizeHC) {
    drawFraction(mapWidth-player.x+(width-wallSizeW)/2, y-player.y+(height-wallSizeH)/2, wallSizeW, wallSizeH, spritesParams.wall);
  }
  for(var x=0; x<=mapWidth; x+=wallSizeW) {
    drawFraction(x-player.x+(width-wallSizeW)/2, mapHeight-player.y+(height-wallSizeH)/2, wallSizeW, wallSizeH, spritesParams.wall);
  }
}

var keyPressed = function() {
  if(keyCode === LEFT_ARROW || key.toLowerCase() === 'a' || key.toLowerCase() === 'ф') keys.left = true;
  else if(keyCode === RIGHT_ARROW || key.toLowerCase() === 'd' || key.toLowerCase() === 'в') keys.right = true;
  else if(keyCode === UP_ARROW || key.toLowerCase() === 'w' || key.toLowerCase() === 'ц') keys.up = true;
  else if(keyCode === DOWN_ARROW || key.toLowerCase() === 's' || key.toLowerCase() === 'ы') keys.down = true;
  else if(key === ' ') keys.space = true;
}

var keyReleased = function() {
  if(keyCode === LEFT_ARROW || key.toLowerCase() === 'a' || key.toLowerCase() === 'ф') keys.left = false;
  else if(keyCode === RIGHT_ARROW || key.toLowerCase() === 'd' || key.toLowerCase() === 'в') keys.right = false;
  else if(keyCode === UP_ARROW || key.toLowerCase() === 'w' || key.toLowerCase() === 'ц') keys.up = false;
  else if(keyCode === DOWN_ARROW || key.toLowerCase() === 's' || key.toLowerCase() === 'ы') keys.down = false;
  else if(key === ' ') keys.space = false;
}

var spawnEnemy = function() {
  for(var attempt=0; attempt<30; attempt++) {
    var x = random(wallSizeW, mapWidth-wallSizeW),
        y = random(wallSizeH, mapHeight-wallSizeHC-monsterHeight/2),
        mon = new Monster(x, y),
        collide = false;
    for(var i=0; i<monsters.length; i++) {
      if(myIntersect(mon, monsters[i])) {
        collide = true;
        break;
      }
    }
    if(collide) {
      continue;
    }
    monsters.push(mon);
    break;
  }
}

var moveIfNeed = function() {
  var vx = 0,
      vy = 0;
  if(keys.up) vy = -1;
  if(keys.down) vy += 1;
  if(keys.left) vx = -1;
  if(keys.right) vx += 1;

  var vec = createVector(vx, vy);
  vec.normalize();
  vec.mult(playerSpeed);

  if( player.x + vec.x-wallSizeW+2 < 0 || player.x + vec.x-2+wallSizeW >= mapWidth ) vec.x = 0;
  if( player.y + vec.y-4 < 0 || player.y + vec.y+wallSizeH-10 >= mapHeight ) vec.y = 0;

  player.x += vec.x;
  player.y += vec.y;
}

var intersect = function(a,b){
  return(
    (
      (
        ( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
      ) && (
        ( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
      )
    )||(
      (
        ( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
      ) && (
        ( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
      )
    )
  )||(
    (
      (
        ( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
      ) && (
        ( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
      )
    )||(
      (
        ( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
      ) && (
        ( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
      )
    )
  );
}
var myIntersect = function(o1, o2) {
  return intersect(
    { x: o1.x-o1.collisionRect.w/2, y: o1.y-o1.collisionRect.h/2, x1: o1.x+o1.collisionRect.w/2, y1: o1.y+o1.collisionRect.h/2 },
    { x: o2.x-o2.collisionRect.w/2, y: o2.y-o2.collisionRect.h/2, x1: o2.x+o2.collisionRect.w/2, y1: o2.y+o2.collisionRect.h/2 });
}
