'use strict';

const Packet = require('../../../').packet;
const assert = require('chai').assert;

describe('Packet getService', () => {
  describe('create', () => {
    it('general', () => {
      const packet = Packet.create('getService', {}, 'ff2c4807');
      assert.equal(packet.size, 36);
      assert.equal(packet.type, 2);
      assert.equal(packet.source, 'ff2c4807');
      assert.isUndefined(packet.target);
    });
  });
});
