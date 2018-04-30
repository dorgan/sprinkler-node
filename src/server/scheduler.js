var fs = require('fs'),
    path = require('path'),
    gpio = require('rpi-gpio'),
    simpleTimer = require('node-timers/simple'),
    countdown = require('node-timers/countdown'),
    Promise = require('promise');

const LOW = gpio.DIR_HIGH;
const OFF = 1;
const ON = 0;
const RELAY_SPACER = 3000;

var pump = false,
    isRunning = false,
    sysConfig = require(path.resolve(__dirname, '../../config/config.json')),
    zones = require(path.resolve(__dirname, '../../config/zones.json'));
    schedules = require(path.resolve( __dirname, '../../config/schedule.json'));

setup();

var timer = simpleTimer({
    pollInterval: 5000
})

timer.on('poll', function() {
    var schedule = checkTime();
    if (schedule) {
        timer.stop();
        startSchedule(schedule);
    }
});

timer.start();

function checkTime() {
    var d = new Date();
    var curDay = d.toLocaleDateString('en-US', {
        weekday: 'long'
    });
    var shouldRun = false;
    schedule = schedules[curDay];

    console.log('Today is: ' + curDay);
    if (schedule) {
        console.log('Found Schedule for Today:');
        schedule.times.forEach(time => {
            if (!shouldRun) {
                var parts = time.start.split(':'),
                    min = d.getMinutes(),
                    hr = d.getHours();

                if (min === parseInt(parts[1], 10) && hr === parseInt(parts[0], 10)) {
                    console.log('It is time to run the schedule');
                    shouldRun = true;
                }
            }
        });
        if (!shouldRun) {
            console.log('Not time to run');
        }
    }
    return shouldRun ? schedule : false;
}

function startSchedule(schedule) {
    var z = new zoneRunner(1);
}

function zoneRunner(zoneNumber) {
    var idx = parseInt(zoneNumber, 10) - 1,
        zone = zones[idx],
        name = zone.name,
        duration = zone.duration * 1000 * 60,
        pin = zone.pin,
        nextZone = zones[(idx + 1)];

    var runTimer = countdown({
        startTime: duration,
        pollInterval: 10000
    });

    runTimer.on('done', function(t) {
        if (nextZone) {
            var z = new zoneRunner(zoneNumber + 1);
            setTimeout(function() {
                disableZone(zone);
            }, RELAY_SPACER);
        } else {
            stopPump();
            setTimeout(function() {
                disableZone(zone);
                timer.start();
            }, RELAY_SPACER);
        }
    });
    runTimer.on('poll', function(t) {
        console.log('Time Left:' + t);
    });
    enableZone(zone);
    if (pump) {
        isOpenValves(startPump);
    };
    console.log('Running Zone ' + zoneNumber + ' (' + zone.name + ') for ' + duration + ' milliseconds');
    runTimer.start();

}

function startPump() {
    if (pump) {
        var pin = pump.pin;
        isOpenValves(function() {
            gpio.write(pin, ON);
        });
    } else {
        console.log('No Pump Defined');
    }
}

function isOpenValves(callback) {
    var openValves = 0;
        promises = [],
        allPins = new Promise(function(success, err) {
            setTimeout(function() {
                success();
            }, 400);
        });
        gpioPromise = gpio.promise;

    zones.forEach(zone => {
        var p = gpioPromise.read(zone.pin);
        p.then(v => {
            if (!v) {
                openValves++;
            }
        }, e => {
            console.log(e);
        });
        promises.push(p);
    });

    allPins.then(function() {
        if (openValves > 0) {
            callback();
        }
    });

    Promise.all(promises).then(function() {
        allPins.resolve(openValves);
    }, function() {
        console.log('No Open Vales');
    });
}

function stopPump() {
    if (pump) {
        gpio.write(pump.pin, OFF);
        gpio.read(pump.pin, function(err, status) {
            if (status) {
                setTimeout(function() {
                    zones.forEach(zone => {
                        disableZone(zone);
                    });
                }, RELAY_SPACER);
            }
        });
    } else {
        console.log('No Pump Defined');
    }
}

function setup() {
    process.env.TZ = sysConfig.timeZone

    if (fs.existsSync(path.resolve(__dirname, '../../config/pump.json'))) {
        pump = require(path.resolve(__dirname, '../../config/pump.json'));
    }

    zones.forEach(zone => {
        gpio.setup(zone.pin, LOW);
    });

    if (pump) {
        gpio.setup(pump.pin, LOW);
    }
}

function enableZone(zone) {
    gpio.write(zone.pin, ON);
}

function disableZone(zone) {
    gpio.write(zone.pin, OFF);
}

function isPumpRunning(callback) {
    var isRunning = false;
    if (pump) {
        gpio.read(pump.pin, function(err, val) {
            isRunning = val === ON;
        });
    }
    return isRunning;
}
