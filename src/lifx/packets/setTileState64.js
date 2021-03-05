'use strict';

const {validate} = require('../../lifx');
const HSBK = require('./hsbk');

const Packet = {
  size: 10 + (64 * HSBK.size),
  HSBK
};

/**
 * @typedef {Object} SetTileState64
 * @property {Number} tileIndex an 8bit value
 * @property {Number} length an 8bit value
 * @property {Number} reserved an 8bit value
 * @property {Number} x an 8bit value
 * @property {Number} y an 8bit value
 * @property {Number} width an 8bit value
 * @property {HSBK[]} colors an array of HSBK values
 */

/**
 * Converts the given packet specific object into a packet
 * @param  {Buffer} buf Buffer of the data
 * @return {SetTileState64} packet
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
  obj.duration = buf.readUInt32LE(offset);
  offset += 4;
  obj.colors = Array(64).fill(undefined).map(() => {
    const ret = Packet.HSBK.toObject(buf, offset);
    offset = ret.offset;
    return ret.hsbk;
  });
  return obj;
};

/**
 * Converts the given packet specific object into a packet
 * @param  {SetTileState64} obj object with configuration data
 * @return {Buffer} packet
 */
Packet.toBuffer = function(obj) {
  obj.reserved = obj.reserved || 0;
  obj.duration = obj.duration || 0;
  ['tileIndex', 'length', 'reserved', 'x', 'y', 'width'].forEach((field) => {
    validate.isUInt8(obj[field], `setTileState64:${field}`);
  });
  validate.isUInt32(obj.duration, 'setTileState64:duration');

  const buf = Buffer.alloc(Packet.size);
  buf.fill(0);
  let offset = 0;

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
  buf.writeUInt32LE(obj.duration, offset);
  offset += 4;
  obj.colors.forEach((color) => {
    offset = Packet.HSBK.toBuffer(buf, offset, color).offset;
  });
  return buf;
};

module.exports = Packet;
