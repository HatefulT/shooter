var w, h, spritemap, player, reloadingTime = 10, playerSpeed = 10,
    keys = { left: false, right: false, up: false, down: false, space: false },
    bullets = [], bulletSpeed = 20, gunDamage = 10,
    monsterWidth = 52, monsterHeight = 56, monsters = [],
    playerWidth = 32, playerHeight = 41,
    spawnTime = 100, spawnReload = 0;

var preload = function() {
  spritemap = loadImage("images/player.png");
}

var setup = function() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);
  noSmooth();
  player = new Player(10, 10);
}

var time = 0;

var draw = function() {
  background(color(20, 200, 20));

  player.update();
  player.draw();

  for(var i=0; i<bullets.length; i++) {
    if(bullets[i].update()) continue;
    bullets[i].draw();
  }
  for(var i=0; i<monsters.length; i++) {
    if(monsters[i].update()) continue;
    monsters[i].draw();
  }

  if(keys.space || mouseIsPressed) player.shoot();

  if(spawnReload%spawnTime === 0) {
    monsters.push(new Monster(player.x+random(500)-250, player.y+random(500)-250,))
  }
  spawnReload ++;

  moveIfNeed();

  time += 1;
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
