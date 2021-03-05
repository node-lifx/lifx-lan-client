'use strict';

const {validate} = require('../../lifx');

const Packet = {
  size: 8
};

/**
 * @typedef {Object} HSBK
 * @property {Number} hsbk.hue - hue value
 * @property {Number} hsbk.saturation - saturation value
 * @property {Number} hsbk.brightness - brightness value
 * @property {Number} hsbk.kelvin - kelvin value
 */

/**
 * @typedef {Object} OffsetHSBK
 * @property {Number} offset - offset after the buffer
 * @property {HSBK} hsbk - HSBK value
 *
 */

/**
 * Converts the given packet specific object into a packet
 * @param  {Buffer} buf hsbk as buffer
 * @param  {Number} offset offset to the buffer
 * @return {OffsetHSBK} packet
 */
Packet.toObject = function(buf, offset) {
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
};

/**
 * @typedef {Object} OffsetBuffer
 * @property {number} offset - offset after the buffer
 * @property {Buffer} buffer - buffer
 */
/**
 * Converts the given packet specific object into a packet
 * @param  {Buffer} buffer output buffer
 * @param  {Number} offset offset in the output buffer
 * @param  {HSBK} hsbk offset in the output buffer
 * @return {OffsetBuffer} packet
 */
Packet.toBuffer = function(buffer, offset, hsbk) {
  validate.isUInt16(hsbk.hue);
  validate.isUInt16(hsbk.saturation);
  validate.isUInt16(hsbk.brightness);
  validate.isUInt16(hsbk.kelvin);
  buffer.writeUInt16LE(hsbk.hue, offset);
  offset += 2;
  buffer.writeUInt16LE(hsbk.saturation, offset);
  offset += 2;
  buffer.writeUInt16LE(hsbk.brightness, offset);
  offset += 2;
  buffer.writeUInt16LE(hsbk.kelvin, offset);
  offset += 2;
  return {offset, buffer};
};

module.exports = Packet;
