'use strict';

const Packet = {
  size: 882,
  Tile: {
    toObject: function(buf, offset) {
      const tile = {};
      tile.accelMeasX = buf.readUInt16LE(offset);
      offset += 2;
      tile.accelMeasY = buf.readUInt16LE(offset);
      offset += 2;
      tile.accelMeasZ = buf.readUInt16LE(offset);
      offset += 2;
      tile.reserved0 = buf.readUInt16LE(offset);
      offset += 2;
      tile.userX = buf.readUInt32LE(offset);
      offset += 4;
      tile.userY = buf.readUInt32LE(offset);
      offset += 4;
      tile.width = buf.readUInt8(offset);
      offset += 1;
      tile.height = buf.readUInt8(offset);
      offset += 1;
      tile.reserved1 = buf.readUInt8(offset);
      offset += 1;
      tile.deviceVersionVendor = buf.readUInt32LE(offset);
      offset += 4;
      tile.deviceVersionProduct = buf.readUInt32LE(offset);
      offset += 4;
      tile.deviceVersionVersion = buf.readUInt32LE(offset);
      offset += 4;
      tile.firmwareBuild = {
        low: buf.readUInt32LE(offset),
        high: buf.readUInt32LE(offset + 4)
      };
      offset += 8;
      tile.reserved2 = {
        low: buf.readUInt32LE(offset),
        high: buf.readUInt32LE(offset + 4)
      };
      offset += 8;
      tile.firmwareVersionMinor = buf.readUInt16LE(offset);
      offset += 2;
      tile.firmwareVersionMajor = buf.readUInt16LE(offset);
      offset += 2;
      tile.reserved3 = buf.readUInt32LE(offset);
      offset += 4;
      return {offset, tile};
    }
  }
};

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {Object}     Information contained in packet
 */
Packet.toObject = function(buf) {
  if (buf.length !== this.size) {
    throw new Error(`Invalid length given for stateDeviceChain LIFX packet:${buf.length}:${this.size}`);
  }
  let offset = 0;
  const obj = {};
  obj.startIndex = buf.readUInt8(offset);
  offset += 1;
  obj.tileDevices = new Array(16).fill(undefined).map(() => {
    const ret = Packet.Tile.toObject(buf, offset);
    offset = ret.offset;
    return ret.tile;
  });
  obj.totalCount = buf.readUInt8(offset);
  offset += 1;
  return obj;
};

module.exports = Packet;
