'use strict';

var assert = require('assert');
var StepSequencer = require('../index');

describe('.play()', function () {

  var tempo = 10000;
  var division = 4;
  var sequence = [0, 1, 2, 3];

  it('should emit all of the steps', function (done) {
    var stepSequencer = new StepSequencer(tempo, division, sequence);

    var zero = false;
    var one = false;
    var two = false;
    var three = false;

    stepSequencer.on('0', function (data) {
      zero = true;
    })
    .on('1', function (data) {
      one = true;
    })
    .on('2', function (data) {
      two = true;
    })
    .on('3', function (data) {
      three = true;

      assert(zero && one && two && three);

      stepSequencer.stop();
      done();
    });

    stepSequencer.play();
  });

  it('should emit the steps in order', function (done) {
    var stepSequencer = new StepSequencer(tempo, division, sequence);

    var seq = '';

    stepSequencer.on('0', function (data) {
      seq += data;
    })
    .on('1', function (data) {
      seq += data;
    })
    .on('2', function (data) {
      seq += data;
    })
    .on('3', function (data) {
      seq += data;

      assert(seq === '0123');

      stepSequencer.stop();
      done();
    });

    stepSequencer.play();
  });

  it('should emit the correct data at each step', function (done) {
    var stepSequencer = new StepSequencer(tempo, division, sequence);

    stepSequencer.on('0', function (data) {
      assert(data === sequence[0]);
    })
    .on('1', function (data) {
      assert(data === sequence[1]);
    })
    .on('2', function (data) {
      assert(data === sequence[2]);
    })
    .on('3', function (data) {
      assert(data === sequence[3]);

      stepSequencer.stop();
      done();
    });

    stepSequencer.play();
  });

  it('should make ._playing true after .play() is called', function (done) {
    var stepSequencer = new StepSequencer(tempo, division, sequence);

    stepSequencer.play();

    assert(stepSequencer._playing);

    stepSequencer.play();

    assert(stepSequencer._playing);

    stepSequencer.stop();
    done();
  });

});
