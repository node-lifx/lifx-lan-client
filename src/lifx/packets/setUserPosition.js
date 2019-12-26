'use strict';

const {validate} = require('../../lifx');

const Packet = {
  size: 11
};

/**
 * @typedef {Object} SetUserPosition
 * @property {Number} - UInt8 tileIndex
 * @property {Number} - UInt16 reserved
 * @property {Number} - Float userX
 * @property {Number} - Float userY
 */

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {SetUserPosition}  Information contained in packet
 */
Packet.toObject = function(buf) {
  if (buf.length !== this.size) {
    throw new Error(`Invalid length given for stateTileState64 LIFX packet:${buf.length}:${this.size}`);
  }
  let offset = 0;
  const obj = {};
  obj.tileIndex = buf.readUInt8(offset);
  offset += 1;
  obj.reserved = buf.readUInt16LE(offset);
  offset += 2;
  obj.userX = buf.readFloatLE(offset);
  offset += 4;
  obj.userY = buf.readFloatLE(offset);
  offset += 4;
  return obj;
};

/**
 * Converts the given packet specific object into a packet
 * @param  {SetUserPosition} obj object with configuration data
 * @return {Buffer} packet
 */
Packet.toBuffer = function(obj) {
  validate.isUInt8(obj.tileIndex);
  validate.isUInt16(obj.reserved);
  validate.isFloat(obj.userX);
  validate.isFloat(obj.userY);
  const buf = Buffer.alloc(Packet.size);
  buf.fill(0);
  let offset = 0;
  buf.writeUInt8(obj.tileIndex, offset);
  offset += 1;
  buf.writeUInt16LE(obj.reserved, offset);
  offset += 2;
  buf.writeFloatLE(obj.userX, offset);
  offset += 4;
  buf.writeFloatLE(obj.userY, offset);
  offset += 4;
  return buf;
};

module.exports = Packet;
