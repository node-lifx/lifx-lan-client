'use strict';

const Packet = require('../../../src/lifx').packet;
const assert = require('chai').assert;

describe('Packet getDeviceChain', () => {
  describe('create', () => {
    it('getDeviceChain', () => {
      const packet = Packet.create('getDeviceChain');
      assert.equal(packet.size, 36);
      assert.equal(packet.type, 701);
    });
  });
});
