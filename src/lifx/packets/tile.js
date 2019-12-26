'use strict';

const {validate} = require('../../lifx');

const Packet = {
  size: 55
};

/**
 * @typedef {Object} Tile
 * @property {Number} - UInt16 accelMeasX
 * @property {Number} - UInt16 accelMeasY
 * @property {Number} - UInt16 accelMeasZ
 * @property {Number} - UInt16 reserved0
 * @property {Number} - Float userX
 * @property {Number} - Float userY
 * @property {Number} - UInt8 width
 * @property {Number} - UInt8 height
 * @property {Number} - UInt8 reserved1
 * @property {Number} - UInt32 deviceVersionVendor
 * @property {Number} - UInt32 deviceVersionProduct
 * @property {Number} - UInt32 deviceVersionVersion
 * @property {UInt64LowHigh} - firmwareBuild
 * @property {UInt64LowHigh} - reserved2
 * @property {Number} - UInt16 firmwareVersionMinor
 * @property {Number} - UInt16 firmwareVersionMajor
 * @property {Number} - UInt32 reserved3
 */

/**
 * @typedef {Object} OffsetBuffer
 * @property {Number} offset - offset after the buffer
 * @property {Buffer} buffer - buffer
 */

/**
 * Converts the given packet specific object into a packet
 * @param  {Buffer} buffer output buffer
 * @param  {Number} offset offset in the output buffer
 * @param  {Tile} tile offset in the output buffer
 * @return {OffsetBuffer} packet
 */
Packet.toBuffer = function(buffer, offset, tile) {
  tile = Object.assign({
    accelMeasX: 0,
    accelMeasY: 0,
    accelMeasZ: 0,
    reserved0: 0,
    userX: 0,
    userY: 0,
    width: 0,
    height: 0,
    reserved1: 0,
    deviceVersionVendor: 0,
    deviceVersionProduct: 0,
    deviceVersionVersion: 0,
    firmwareBuild: {low: 0, high: 0},
    reserved2: {low: 0, high: 0},
    firmwareVersionMinor: 0,
    firmwareVersionMajor: 0,
    reserved3: 0
  }, tile);
  validate.isUInt16(tile.accelMeasX, 'Tile:accelMeasX');
  validate.isUInt16(tile.accelMeasY, 'Tile:accelMeasY');
  validate.isUInt16(tile.accelMeasZ, 'Tile:accelMeasZ');
  validate.isUInt16(tile.reserved0, 'Tile:reserved0');
  validate.isFloat(tile.userX, 'Tile:userX');
  validate.isFloat(tile.userY, 'Tile:userY');
  validate.isUInt8(tile.width, 'Tile:width');
  validate.isUInt8(tile.height, 'Tile:height');
  validate.isUInt8(tile.reserved1, 'Tile:reserved1');
  validate.isUInt32(tile.deviceVersionVendor, 'Tile:deviceVersionVendor');
  validate.isUInt32(tile.deviceVersionProduct, 'Tile:deviceVersionProduct');
  validate.isUInt32(tile.deviceVersionVersion, 'Tile:deviceVersionVersion');
  validate.isUInt64LowHigh(tile.firmwareBuild, 'Tile:firmwareBuild');
  validate.isUInt64LowHigh(tile.reserved2, 'Tile:reserved2');
  validate.isUInt16(tile.firmwareVersionMinor, 'Tile:firmwareVersionMinor');
  validate.isUInt16(tile.firmwareVersionMajor, 'Tile:firmwareVersionMajor');
  validate.isUInt32(tile.reserved3, 'Tile:reserved3');

  buffer.writeUInt16LE(tile.accelMeasX, offset);
  offset += 2;
  buffer.writeUInt16LE(tile.accelMeasY, offset);
  offset += 2;
  buffer.writeUInt16LE(tile.accelMeasZ, offset);
  offset += 2;
  buffer.writeUInt16LE(tile.reserved0, offset);
  offset += 2;
  buffer.writeFloatLE(tile.userX, offset);
  offset += 4;
  buffer.writeFloatLE(tile.userY, offset);
  offset += 4;
  buffer.writeUInt8(tile.width, offset);
  offset += 1;
  buffer.writeUInt8(tile.height, offset);
  offset += 1;
  buffer.writeUInt8(tile.reserved1, offset);
  offset += 1;
  buffer.writeUInt32LE(tile.deviceVersionVendor, offset);
  offset += 4;
  buffer.writeUInt32LE(tile.deviceVersionProduct, offset);
  offset += 4;
  buffer.writeUInt32LE(tile.deviceVersionVersion, offset);
  offset += 4;
  buffer.writeUInt32LE(tile.firmwareBuild.low, offset);
  offset += 4;
  buffer.writeUInt32LE(tile.firmwareBuild.high, offset);
  offset += 4;
  buffer.writeUInt32LE(tile.reserved2.low, offset);
  offset += 4;
  buffer.writeUInt32LE(tile.reserved2.high, offset);
  offset += 4;
  buffer.writeUInt16LE(tile.firmwareVersionMinor, offset);
  offset += 2;
  buffer.writeUInt16LE(tile.firmwareVersionMajor, offset);
  offset += 2;
  buffer.writeUInt32LE(tile.reserved3, offset);
  offset += 4;
  return {offset, buffer};
};

/**
 * @typedef {Object} OffsetTile
 * @property {Number} offset - offset after the buffer
 * @property {Tile} tile - Tile value
 */

/**
 * Converts the given packet specific object into a packet
 * @param  {Buffer} buf tile as buffer
 * @param  {Number} offset offset to the buffer
 * @return {OffsetTile} packet
 */
Packet.toObject = function(buf, offset) {
  const tile = {};
  tile.accelMeasX = buf.readUInt16LE(offset);
  offset += 2;
  tile.accelMeasY = buf.readUInt16LE(offset);
  offset += 2;
  tile.accelMeasZ = buf.readUInt16LE(offset);
  offset += 2;
  tile.reserved0 = buf.readUInt16LE(offset);
  offset += 2;
  tile.userX = buf.readFloatLE(offset);
  offset += 4;
  tile.userY = buf.readFloatLE(offset);
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
};

module.exports = Packet;
