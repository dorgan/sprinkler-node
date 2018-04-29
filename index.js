var gpio = require('rpi-gpio');
var relaysOn = [];

gpio.setup(
  3,
  gpio.DIR_LOW,
  function() {
    turnOn(3);
    setTimeout(function() {
      turnOff(3);
    }, 3000);
  }
);

gpio.setup(5, gpio.DIR_LOW, function() {
  turnOn(5);
  setTimeout(function() {
    turnOff(5);
  }, 3000);
});


gpio.setup(7, gpio.DIR_LOW, function() {
  turnOn(7);
  setTimeout(function() {
    turnOff(7);
  }, 3000);
});

gpio.setup(11, gpio.DIR_LOW, function() {
  turnOn(11);
  setTimeout(function() {
    turnOff(11);
  }, 3000);
});

function turnOn(pin) {
  gpio.write(pin, false);
  console.log('Pin ' + pin + ' turned on');
  relaysOn.push(pin);
}


function turnOff(pin) {
  gpio.write(pin, true);
  console.log('Pin ' + pin + ' turned off');
  var item = relaysOn.indexOf(pin);
  relaysOn.splice(item, 1);
}
