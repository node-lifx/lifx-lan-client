'use strict';

const Packet = require('../../../src/lifx').packet;
const assert = require('chai').assert;

describe('Packet getTileState64', () => {
  it('toBuffer->toObject', () => {
    const ref = Packet.create('getTileState64', {
      tileIndex: 1,
      length: 2,
      reserved: 3,
      x: 4,
      y: 5,
      width: 6
    });

    const msg = Packet.create('getTileState64', ref);
    const buf = Packet.toBuffer(msg);
    const packet = Packet.toObject(buf);

    assert.equal(packet.size, 42);
    assert.equal(packet.type, 707);
    assert.equal(packet.tileIndex, ref.tileIndex);
    assert.equal(packet.length, ref.length);
    assert.equal(packet.reserved, ref.reserved);
    assert.equal(packet.x, ref.x);
    assert.equal(packet.y, ref.y);
    assert.equal(packet.width, ref.width);
  });
});
