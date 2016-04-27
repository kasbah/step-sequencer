'use strict';

var assert = require('assert');
var StepSequencer = require('../index');

describe('.stop()', function () {

  var tempo = 10000;
  var division = 4;
  var sequence = [0, 1, 2, 3];

  it('should stop correctly', function (done) {
    var stepSequencer = new StepSequencer(tempo, division, sequence);

    var stopped;

    stepSequencer.on('0', function (data) {
      stepSequencer.stop();
      stopped = true;

      setTimeout(function () {
        assert(stopped);

        done();
      }, 1);
    })
    .on('1', function (data) {
      stopped = false;
    });

    stepSequencer.play();
  });

  it('should make ._playing false after .stop() is called', function (done) {
    var stepSequencer = new StepSequencer(tempo, division, sequence);

    stepSequencer.play();
    stepSequencer.stop();

    assert(!stepSequencer._playing);

    done();
  });
});
