'use strict';

const Tile = require('./tile');
const {validate} = require('../../lifx');

const Packet = {
  size: 2 + (Tile.size * 16),
  Tile
};

/**
 * @typedef {Object} StateDeviceChain
 * @property {Number} startIndex - UInt8 startIndex
 * @property {Number} totalCount - UInt8 totalCount
 * @property {Tile[]} tileDevices- Array of Tiles
 */

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {StateDeviceChain}     Information contained in packet
 */
Packet.toObject = function(buf) {
  if (buf.length !== this.size) {
    throw new Error(`Invalid length given for stateDeviceChain LIFX packet:${buf.length}:${this.size}`);
  }
  let offset = 0;
  const obj = {};
  obj.startIndex = buf.readUInt8(offset);
  obj.totalCount = Math.min(buf.readUInt8(buf.length - 1), 16);
  offset += 1;
  obj.tileDevices = Array(obj.totalCount).fill(undefined).map(() => {
    const ret = Packet.Tile.toObject(buf, offset);
    offset = ret.offset;
    return ret.tile;
  });
  offset += 1;
  return obj;
};

/**
 * Converts packet specific data from a buffer to an object
 * @param  {StateDeviceChain} obj - as Object
 * @return {Buffer} - Buffer of the packet
 */
Packet.toBuffer = function(obj) {
  const buf = Buffer.alloc(this.size);
  buf.fill(0);

  validate.isUInt8(obj.startIndex, 'stateDeviceChain:start_index');

  buf.writeUInt8(obj.startIndex, 0);
  const len = Math.min(obj.tileDevices.length, obj.totalCount || 16);
  buf.writeUInt8(len, Packet.size - 1);
  obj.tileDevices.slice(0, len).reduce((ofs, tile) => {
    return Packet.Tile.toBuffer(buf, ofs, tile).offset;
  }, 1);
  return buf;
};

module.exports = Packet;
