'use strict';

const {validate} = require('../../lifx');
const HSBK = require('./hsbk');

const Packet = {
  size: 5 + (HSBK.size * 64),
  HSBK
};

/**
 * @typedef {Object} StateTileState64
 * @property {Number} tileIndex an 8bit value
 * @property {Number} reserved an 8bit value
 * @property {Number} x an 8bit value
 * @property {Number} y an 8bit value
 * @property {Number} width an 8bit value
 * @property {HSBK[]} colors an array of HSBK values
 */

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {StateTileState64}     Information contained in packet
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
  obj.colors = Array(64).fill(undefined).map(() => {
    const ret = Packet.HSBK.toObject(buf, offset);
    offset = ret.offset;
    return ret.hsbk;
  });
  return obj;
};

/**
 * Converts the given packet specific object into a packet
 * @param  {StateTileState64} obj object with configuration data
 * @return {Buffer} packet
 */
Packet.toBuffer = function(obj) {
  obj.reserved = obj.reserved || 0;
  ['tileIndex', 'reserved', 'x', 'y', 'width'].forEach((field) => {
    validate.isUInt8(obj[field], `setTileState64:${field}`);
  });

  const buf = Buffer.alloc(Packet.size);
  buf.fill(0);
  let offset = 0;

  buf.writeUInt8(obj.tileIndex, offset);
  offset += 1;
  buf.writeUInt8(obj.reserved || 0, offset);
  offset += 1;
  buf.writeUInt8(obj.x, offset);
  offset += 1;
  buf.writeUInt8(obj.y, offset);
  offset += 1;
  buf.writeUInt8(obj.width, offset);
  offset += 1;
  obj.colors.forEach((color) => {
    offset = Packet.HSBK.toBuffer(buf, offset, color).offset;
  });
  return buf;
};

module.exports = Packet;

