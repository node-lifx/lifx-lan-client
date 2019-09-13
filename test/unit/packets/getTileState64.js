'use strict';

const Packet = require('../../../lib/lifx').packet;
const assert = require('chai').assert;

describe('Packet getTileState64', () => {
  describe('create', () => {
    it('getTileState64', () => {
      const packet = Packet.create('getTileState64', {
        tileIndex: 1,
        length: 2,
        reserved: 3,
        x: 4,
        y: 5,
        width: 6
      });
      assert.equal(packet.size, 42);
      assert.equal(packet.type, 707);
      assert.equal(packet.tileIndex, 1);
      assert.equal(packet.length, 2);
      assert.equal(packet.reserved, 3);
      assert.equal(packet.x, 4);
      assert.equal(packet.y, 5);
      assert.equal(packet.width, 6);
    });
  });
});
