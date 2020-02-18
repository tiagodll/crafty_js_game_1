var Crafty = require('craftyjs');

Crafty.init(800,600);

Crafty.background('cyan');

Crafty.defineScene("loading", function() {
  Crafty.background("#000");
  Crafty.e("2D, DOM, Text")
        .attr({ w: 100, h: 20, x: 300, y: 300 })
        .text("Loading")
        .textColor("#FFFFFF");

    Crafty.enterScene("playing");
});

Crafty.defineScene("playing", function() {
  var player = Crafty.e('2D, Canvas, Color, Twoway, Gravity, Collision, Solid, Keyboard, player')
    .attr({x: 10, y: 10, w: 20, h: 30, direction: 'Right'})
    .color('red')
    .twoway(4)
    .gravity('floor')
    .checkHits('enemy')
    .bind("HitOn", (hitData) => { Crafty.enterScene("gameover"); })
    .bind('KeyDown',(e) => {
      // console.log(e)
      if(e.originalEvent.code == 'Space') {
        var shot = Crafty.e('2D, Canvas, Color, Collision')
        .attr({x: player.x, y: player.y + 10, w: 5, h: 5, direction: player.direction})
        .color('yellow')
        .bind("EnterFrame", () => {
          shot.move(shot.direction, 10)
          if(shot.x > Crafty.viewport.width || shot.x < 0) 
            shot.destroy();
        })
        .checkHits('enemy')
        .bind("HitOn", (hitData) => {
          shot.destroy();
          enemy.destroy();
        })
      }
      if(e.originalEvent.code == 'ArrowRight'){
        player.direction = 'e';
        if(player.x > Crafty.viewport.width)
          player.x = 10;
        console.log(player.direction)
      }
      if(e.originalEvent.code == 'ArrowLeft'){
        player.direction = 'w';
        if(player.x <= 0)
          player.x = Crafty.viewport.width - 50;
        console.log(player.direction)
      }
    })

    var floor = Crafty.e('2D, Canvas, Color, floor')
    .attr({x: 0, y:590, h: 50, w: 800 })
    .color('green')

    var floor2 = Crafty.e('2D, Canvas, Color, floor')
    .attr({x: 650, y:450, h: 20, w: 50 })
    .color('green')

  var enemy = Crafty.e('2D, Canvas, Color, Twoway, Gravity, Collision, floor, enemy')
    .attr({x: 90, y: 10, w: 20, h: 30})
    .color('purple')
    .gravity('floor')
    .bind("EnterFrame", () => {
      if(enemy.y > 500 && Math.random() > 0.5)
        enemy.x += player.x > enemy.x ? 3 : -3;
    })

  var exit = Crafty.e('2D, Canvas, Collision, Color')
  .attr({ w: 100, h: 20, x: 300, y: 300 })
  // .attr({x: 750, y:300, h: 20, w: 50 })
  .color('orange')
  .checkHits('player')
  .bind("HitOn", (hitData) => {
    console.log("VICTORY")
    Crafty.enterScene("victory");
  })
});

Crafty.defineScene("victory", () => {
  Crafty.background("#000");
  Crafty.e("2D, DOM, Text")
    .attr({ w: 100, h: 20, x: 300, y: 300 })
    .text("VICTORY!!!")
    .textColor("#FFFFFF");
});

Crafty.defineScene("gameover", () => {
  Crafty.background("#000");
  Crafty.e("2D, DOM, Text")
    .attr({ w: 100, h: 20, x: 300, y: 300 })
    .text("GAME OVER!!!")
    .textColor("#FFFFFF");
});

Crafty.enterScene("loading");