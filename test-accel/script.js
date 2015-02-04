var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

var led1 = tessel.led[0].output(1);
var led2 = tessel.led[1].output(0);

accel.on('ready', function() {
  accel.on('data', function(xyz) {
    console.log('x:', xyz[0].toFixed(2),
      'y:', xyz[1].toFixed(2),
      'z:', xyz[2].toFixed(2)
    );
  });
});

setInterval(function () {
  console.log("I'm blinking! (Press CTRL + C to stop)");
  led1.toggle();
  led2.toggle();
}, 100); 
