'use strict';

const Packet = require('../../../lib/lifx').packet;
const assert = require('chai').assert;

function buildDevice(base) {
  return {
    accelMeasX: base + 0,
    accelMeasY: base + 2,
    accelMeasZ: base + 4,
    reserved0: base + 6,
    userX: base + 8,
    userY: base + 12,
    width: (base + 16) & 0xff,
    height: (base + 17) & 0xff,
    reserved1: (base + 18) & 0xff,
    deviceVersionVendor: base + 19,
    deviceVersionProduct: base + 23,
    deviceVersionVersion: base + 27,
    firmwareBuild: {
      low: base + 31,
      high: base + 35
    },
    reserved2: {
      low: base + 39,
      high: base + 43
    },
    firmwareVersionMinor: base + 47,
    firmwareVersionMajor: base + 49,
    reserved3: base + 51
  };
}

function buildDeviceMsg(msg, offset) {
  msg.writeUInt16LE(offset, offset);
  offset += 2;
  msg.writeUInt16LE(offset, offset);
  offset += 2;
  msg.writeUInt16LE(offset, offset);
  offset += 2;
  msg.writeUInt16LE(offset, offset);
  offset += 2;
  msg.writeUInt32LE(offset, offset);
  offset += 4;
  msg.writeUInt32LE(offset, offset);
  offset += 4;
  msg.writeUInt8(offset & 0xff, offset);
  offset += 1;
  msg.writeUInt8(offset & 0xff, offset);
  offset += 1;
  msg.writeUInt8(offset & 0xff, offset);
  offset += 1;
  msg.writeUInt32LE(offset, offset);
  offset += 4;
  msg.writeUInt32LE(offset, offset);
  offset += 4;
  msg.writeUInt32LE(offset, offset);
  offset += 4;
  msg.writeUInt32LE(offset, offset);
  offset += 4;
  msg.writeUInt32LE(offset, offset);
  offset += 4;
  msg.writeUInt32LE(offset, offset);
  offset += 4;
  msg.writeUInt32LE(offset, offset);
  offset += 4;
  msg.writeUInt16LE(offset, offset);
  offset += 2;
  msg.writeUInt16LE(offset, offset);
  offset += 2;
  msg.writeUInt32LE(offset, offset);
  offset += 4;
  return offset;
}

describe('Packet stateDeviceChain', () => {
  describe('toObject', () => {
    it('stateDeviceChain', () => {
      const msg = Buffer.alloc(882 + 36);
      msg.writeInt16LE(702, 32);
      msg.writeInt8(1, 36 + 0);
      msg.writeInt8(2, 36 + 881);
      for (let offset = 36 + 1; offset < 36 + 881; offset += 0) {
        offset = buildDeviceMsg(msg, offset);
      }
      const parsedMsg = Packet.toObject(msg);
      assert.equal(parsedMsg.startIndex, 1);
      assert.equal(parsedMsg.type, 702);
      assert.equal(parsedMsg.totalCount, 2);
      assert.deepEqual(parsedMsg.tileDevices, (new Array(16))
        .fill(undefined)
        .map((_, idx) => buildDevice(37 + (idx * 55))));
    });
  });
});
