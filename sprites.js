var spritesParams = {
  player: {
    down: [
      { sx: 1, sy: 1, sw: 32, sh: 41 },
      { sx: 1, sy: 43, sw: 32, sh: 41 },
      { sx: 1, sy: 85, sw: 32, sh: 41 },
      { sx: 1, sy: 127, sw: 32, sh: 41 }
    ],
    right: [
      { sx: 34, sy: 1, sw: 32, sh: 41 },
      { sx: 34, sy: 43, sw: 32, sh: 41 },
      { sx: 34, sy: 85, sw: 32, sh: 41 },
      { sx: 34, sy: 127, sw: 32, sh: 41 }
    ],
    left: [
      { sx: 67, sy: 1, sw: 32, sh: 41 },
      { sx: 67, sy: 43, sw: 32, sh: 41 },
      { sx: 67, sy: 85, sw: 32, sh: 41 },
      { sx: 67, sy: 127, sw: 32, sh: 41 }
    ],
    up: [
      { sx: 100, sy: 1, sw: 32, sh: 41 },
      { sx: 100, sy: 43, sw: 32, sh: 41 },
      { sx: 100, sy: 85, sw: 32, sh: 41 },
      { sx: 100, sy: 127, sw: 32, sh: 41 }
    ]
  },
  monster: [
    { sx: 133, sy: 1, sw: 26, sh: 28 },
    { sx: 133, sy: 30, sw: 26, sh: 28 },
    { sx: 133, sy: 59, sw: 26, sh: 28 }
  ]
};


var rawDrawFraction = function(x1, y1, w, h, imgx, imgy, imgw, imgh) {
  image(spritemap, x1, y1, w, h, imgx, imgy, imgw, imgh);
}
var drawFraction = function(x1, y1, w, h, params) {
  rawDrawFraction(x1, y1, w, h, params.sx, params.sy, params.sw, params.sh);
}
