'use strict';

const {validate} = require('../../lifx');

const Packet = {
  size: (obj) => 10 + (obj.colors.length * (8)),
  HSBK: {
    toBuffer: (obj, buf, offset) => {
      validate.isUInt16(obj.hue, 'setTileState64:HSBK:hue');
      buf.writeUInt16LE(obj.hue, offset);
      offset += 2;

      validate.isUInt16(obj.saturation, 'setTileState64:HSBK:saturation');
      buf.writeUInt16LE(obj.saturation, offset);
      offset += 2;

      validate.isUInt16(obj.brightness, 'setTileState64:HSBK:brightness');
      buf.writeUInt16LE(obj.brightness, offset);
      offset += 2;

      validate.isUInt16(obj.kelvin, 'setTileState64:HSBK:kelvin');
      buf.writeUInt16LE(obj.kelvin, offset);
      offset += 2;

      return offset;
    }
  }
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @param  {Number} obj.tileIndex 8bit value
 * @param  {Number} obj.length 8bit value
 * @param  {Number} obj.reserved 8bit value
 * @param  {Number} obj.x 8bit value
 * @param  {Number} obj.y 8bit value
 * @param  {Number} obj.width 8bit value
 * @param  {Number} obj.duration 8bit value
 * @param  {Number} [obj.duration] transition time in milliseconds
 * @param  {Array} obj.colors an array of HSBK values
 * @return {Buffer} packet
 */
Packet.toBuffer = function(obj) {
  const buf = Buffer.alloc(Packet.size(obj));
  buf.fill(0);
  let offset = 0;

  ['tileIndex', 'length', 'reserved', 'x', 'y', 'width'].forEach((field) => {
    validate.isUInt8(obj[field], `setTileState64:${field}`);
  });
  // obj.stream field has unknown function so leave it as 0
  buf.writeUInt8(obj.tileIndex, offset);
  offset += 1;
  buf.writeUInt8(obj.length, offset);
  offset += 1;
  buf.writeUInt8(obj.reserved || 0, offset);
  offset += 1;
  buf.writeUInt8(obj.x, offset);
  offset += 1;
  buf.writeUInt8(obj.y, offset);
  offset += 1;
  buf.writeUInt8(obj.width, offset);
  offset += 1;
  validate.isUInt32(obj.duration, 'setTileState64:duration');
  buf.writeUInt32LE(obj.duration, offset);
  offset += 4;
  obj.colors.forEach((color) => {
    offset = Packet.HSBK.toBuffer(color, buf, offset);
  });
  return buf;
};

module.exports = Packet;
