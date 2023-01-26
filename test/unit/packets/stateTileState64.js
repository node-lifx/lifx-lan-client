'use strict';

const Packet = require('../../../src/lifx').packet;
const assert = require('chai').assert;
const buildColors = require('./buildColors');

describe('Packet stateTileState64', () => {
  it('toObject->toBuffer', () => {
    const ref = {
      tileIndex: 1,
      reserved: 2,
      x: 3,
      y: 4,
      width: 5,
      colors: buildColors()
    };
    const msg = Packet.create('stateTileState64', ref);
    const buf = Packet.toBuffer(msg);
    const parsedMsg = Packet.toObject(buf);

    assert.equal(parsedMsg.type, 711);
    assert.deepEqual(parsedMsg.tileIndex, ref.tileIndex);
    assert.deepEqual(parsedMsg.reserved, ref.reserved);
    assert.deepEqual(parsedMsg.x, ref.x);
    assert.deepEqual(parsedMsg.y, ref.y);
    assert.deepEqual(parsedMsg.width, ref.width);
    assert.deepEqual(parsedMsg.colors, ref.colors);
  });
});
