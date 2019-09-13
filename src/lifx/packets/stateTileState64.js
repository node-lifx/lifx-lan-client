'use strict';

const Packet = {
  size: 517,
  HSBK: {
    toObject: function(buf, offset) {
      const hsbk = {};
      hsbk.hue = buf.readUInt16LE(offset);
      offset += 2;
      hsbk.saturation = buf.readUInt16LE(offset);
      offset += 2;
      hsbk.brightness = buf.readUInt16LE(offset);
      offset += 2;
      hsbk.kelvin = buf.readUInt16LE(offset);
      offset += 2;
      return {offset, hsbk};
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
    throw new Error(`Invalid length given for stateTileState64 LIFX packet:${buf.length}:${this.size}`);
  }
  let offset = 0;
  const obj = {};
  obj.tileIndex = buf.readUInt8(offset);
  offset += 1;
  obj.reserved = buf.readUInt8(offset);
  offset += 1;
  obj.x = buf.readUInt8(offset);
  offset += 1;
  obj.y = buf.readUInt8(offset);
  offset += 1;
  obj.width = buf.readUInt8(offset);
  offset += 1;
  obj.colors = new Array(64).fill(undefined).map(() => {
    const ret = Packet.HSBK.toObject(buf, offset);
    offset = ret.offset;
    return ret.hsbk;
  });
  return obj;
};

module.exports = Packet;

