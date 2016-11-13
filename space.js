var renderer = PIXI.autoDetectRenderer(1920, 1080, { antialias: true });
renderer.view.style.width = "100%";
renderer.view.style.height = "100%";

document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

// Render a circle to a texture
var texture = new PIXI.RenderTexture(renderer, 16, 16);
var graphics = new PIXI.Graphics();
graphics.beginFill(0xFFFFFF);
graphics.drawCircle(8, 8, 1);
graphics.endFill();
texture.render(graphics);

var numStars = 1000;
var stars = [];
for(var i=0; i<numStars; i++) {
  var s = new PIXI.Sprite(texture);
  var scale = Math.random() * 2;
  s.position.x = Math.random() * renderer.width;
  s.position.y = Math.random() * renderer.height;
  s.alpha = Math.random();
  s.scale.x = scale;
  s.scale.y = scale;
  stars.push(s);
  stage.addChild(s);
}
renderer.render(stage);

requestAnimationFrame(animate);

function animate() {
  requestAnimationFrame( animate );
  var time = Date.now() / 1000;
  for (var i=0; i < numStars; ++i) {
    var s = stars[i];
    var freq = i/numStars;
    var ampl = i*numStars;
    s.alpha = freq * Math.sin(time + ampl);
  }
  renderer.render(stage);
}
