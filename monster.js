var Monster = function(x, y) {
  this.x = x;
  this.y = y;
  this.hp = 100;
  this.animationFrame = 0;
  this.collisionRect = { w: monsterWidth/5*4, h: monsterHeight/5*4 };
}
Monster.prototype.update = function () {
  if(this.hp <= 0) {
    monsters.splice(monsters.indexOf(this), 1);
    return true;
  }
};
Monster.prototype.draw = function() {
  drawFraction( this.x-player.x+(width-monsterWidth)/2, this.y-player.y+(height-monsterHeight)/2, monsterWidth, monsterHeight, spritesParams.monster[round(this.animationFrame)%3] )
  this.animationFrame += 0.2;
}
