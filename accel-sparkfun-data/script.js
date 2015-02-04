var http = require('http');
var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

var led = tessel.led[0].output(0);
var sending = false;

accel.on('ready', function() {
  accel.on('data', function(xyz) {
    led.output(1);

    console.log('x:', xyz[0].toFixed(2),
      'y:', xyz[1].toFixed(2),
      'z:', xyz[2].toFixed(2)
    );

    if(sending) {
      return;
    }

    sending = true;
    console.log('send data');

    var url = "https://data.sparkfun.com/input/wpKbqz0nGzClraD5jNbx";
    url += "?private_key=wzdNWRp9VRIRzXmKJEdj";
    url += "&x=" + xyz[0] + "&y=" + xyz[1] + "&z=" + xyz[2];

    http.get(url, function(res) {
      console.log(res.statusCode);
      sending = false;
    });

    led.output(0);
  });
});
 
