'use strict';

const Packet = require('../../../lib/lifx').packet;
const assert = require('chai').assert;

function buildTileMsg(msg, offset) {
  msg.writeUInt16LE(offset, offset);
  offset += 2;
  msg.writeUInt16LE(offset, offset);
  offset += 2;
  msg.writeUInt16LE(offset, offset);
  offset += 2;
  msg.writeUInt16LE(offset, offset);
  offset += 2;
  return offset;
}

function buildTile(base) {
  return {
    hue: base,
    saturation: base + 2,
    brightness: base + 4,
    kelvin: base + 6
  };
}

describe('Packet stateTileState64', () => {
  describe('toBuffer', () => {
    it('stateTileState64', () => {
      const msg = Buffer.alloc(517 + 36);
      msg.writeInt16LE(711, 32);
      msg.writeInt8(1, 36 + 0);
      msg.writeInt8(2, 36 + 1);
      msg.writeInt8(3, 36 + 2);
      msg.writeInt8(4, 36 + 3);
      msg.writeInt8(5, 36 + 4);
      for (let offset = 36 + 5; offset < 36 + 517; offset += 0) {
        offset = buildTileMsg(msg, offset);
      }
      const parsedMsg = Packet.toObject(msg);
      assert.equal(parsedMsg.type, 711);
      assert.deepEqual(parsedMsg.tileIndex, 1);
      assert.deepEqual(parsedMsg.reserved, 2);
      assert.deepEqual(parsedMsg.x, 3);
      assert.deepEqual(parsedMsg.y, 4);
      assert.deepEqual(parsedMsg.width, 5);
      assert.deepEqual(parsedMsg.colors, (new Array(64))
        .fill(undefined)
        .map((_, idx) => buildTile(36 + 5 + (idx * 8))));
    });
  });
});
