'use strict';

const Packet = require('../../../').packet;
const assert = require('chai').assert;
const buildTile = require('./buildTile');

describe('Packet stateDeviceChain', () => {
  it('toObject->toBuffer', () => {
    const ref = {
      startIndex: 1,
      tileDevices: Array(13).fill(0)
        .map((_, i) => i * 103)
        .map((i) => buildTile(i))
    };
    const msg = Packet.create('stateDeviceChain', ref);
    const buf = Packet.toBuffer(msg);
    const parsedMsg = Packet.toObject(buf);

    assert.equal(parsedMsg.startIndex, 1);
    assert.equal(parsedMsg.type, 702);
    assert.equal(parsedMsg.totalCount, ref.tileDevices.length);
    parsedMsg.tileDevices.forEach((tile, idx) => {
      assert.isTrue(Math.abs(tile.userX - ref.tileDevices[idx].userX) < 0.0001);
      assert.isTrue(Math.abs(tile.userY - ref.tileDevices[idx].userY) < 0.0001);
      tile.userX = ref.tileDevices[idx].userX;
      tile.userY = ref.tileDevices[idx].userY;
    });
    assert.deepEqual(parsedMsg.tileDevices, ref.tileDevices);
  });
});
