'use strict';

const Packet = require('../../../src/lifx').packet;
const assert = require('chai').assert;

describe('Packet setUserPosition', () => {
  it('toBuffer -> toObject', () => {
    const ref = {
      tileIndex: 17,
      reserved: 19,
      userX: 4.0004,
      userY: 5.0005
    };
    const msg = Packet.create('setUserPosition', ref);
    const buf = Packet.toBuffer(msg);
    const parsedMsg = Packet.toObject(buf);
    assert.equal(parsedMsg.type, 703);
    assert.equal(parsedMsg.tileIndex, ref.tileIndex);
    assert.equal(parsedMsg.reserved, ref.reserved);
    assert.isTrue(Math.abs(parsedMsg.userX - ref.userX) < 0.0001);
    assert.isTrue(Math.abs(parsedMsg.userY - ref.userY) < 0.0001);
  });
});
