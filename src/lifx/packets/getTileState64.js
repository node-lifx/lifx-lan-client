'use strict';

const {validate} = require('../../lifx');

const Packet = {
  size: 6
};

/**
 * @typedef {Object} GetTileState64
 * @property {Number} tileIndex an 8bit value
 * @property {Number} length an 8bit value
 * @property {Number} reserved an 8bit value
 * @property {Number} x an 8bit value
 * @property {Number} y an 8bit value
 * @property {Number} width an 8bit valu
 */

/**
 * Converts the given packet specific object into a packet
 * @param  {GetTileState64} obj object with configuration data
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

/**
 * Converts the given packet specific object into a packet
 * @param  {Buffer} buf object with configuration data
 * @return {GetTileState64} packet
 */
Packet.toObject = function(buf) {
  const obj = {};
  let offset = 0;

  obj.tileIndex = buf.readUInt8(offset);
  offset += 1;
  obj.length = buf.readUInt8(offset);
  offset += 1;
  obj.reserved = buf.readUInt8(offset);
  offset += 1;
  obj.x = buf.readUInt8(offset);
  offset += 1;
  obj.y = buf.readUInt8(offset);
  offset += 1;
  obj.width = buf.readUInt8(offset);
  offset += 1;

  return obj;
};

module.exports = Packet;
