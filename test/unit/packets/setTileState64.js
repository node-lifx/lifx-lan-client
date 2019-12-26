'use strict';

const Packet = require('../../../').packet;
const assert = require('chai').assert;

describe('Packet setTileState64', () => {
  it('toBuffer->toObject', () => {
    const ref = {
      tileIndex: 1,
      length: 2,
      reserved: 3,
      x: 4,
      y: 5,
      width: 6,
      duration: 7,
      colors: [
        {
          saturation: 0x8000,
          brightness: 0x8001,
          kelvin: 3500,
          hue: 49
        },
        {
          saturation: 0x6000,
          brightness: 0x6001,
          kelvin: 4500,
          hue: 59
        }
      ]
    };

    const msg = Packet.create('setTileState64', ref);
    const buf = Packet.toBuffer(msg);
    const parsedMsg = Packet.toObject(buf);

    assert.equal(parsedMsg.type, 715);
    assert.equal(parsedMsg.tileIndex, ref.tileIndex);
    assert.equal(parsedMsg.length, ref.length);
    assert.equal(parsedMsg.reserved, ref.reserved);
    assert.equal(parsedMsg.x, ref.x);
    assert.equal(parsedMsg.y, ref.y);
    assert.equal(parsedMsg.width, ref.width);
    assert.equal(parsedMsg.duration, ref.duration);
    assert.deepEqual(parsedMsg.colors,
      ref.colors.concat(Array(64 - ref.colors.length).fill({
        hue: 0, saturation: 0, brightness: 0, kelvin: 0
      }))
    );
  });
});
