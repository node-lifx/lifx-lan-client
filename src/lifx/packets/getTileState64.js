'use strict';

const {validate} = require('../../lifx');

const Packet = {
  size: 6
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @param  {Number} obj.tileIndex an 8bit value
 * @param  {Number} obj.length an 8bit value
 * @param  {Number} obj.reserved an 8bit value
 * @param  {Number} obj.x an 8bit value
 * @param  {Number} obj.y an 8bit value
 * @param  {Number} obj.width an 8bit value
 * @return {Buffer} packet
 */
Packet.toBuffer = function(obj) {
  const buf = Buffer.alloc(this.size);
  buf.fill(0);
  let offset = 0;

  ['tileIndex', 'length', 'reserved', 'x', 'y', 'width'].forEach((field) => {
    validate.isUInt8(obj[field], `getTileState64:${field}`);
  });
  buf.writeUInt8(obj.tileIndex, offset);
  offset += 1;
  buf.writeUInt8(obj.length, offset);
  offset += 1;
  buf.writeUInt8(obj.reserved, offset);
  offset += 1;
  buf.writeUInt8(obj.x, offset);
  offset += 1;
  buf.writeUInt8(obj.y, offset);
  offset += 1;
  buf.writeUInt8(obj.width, offset);
  offset += 1;

  return buf;
};

module.exports = Packet;
