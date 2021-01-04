'use strict';

var Packet = {
  size: 3
};

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {Object}     Information contained in packet
 */
Packet.toObject = function (buf) {
  var obj = {};
  var offset = 0;

  if (buf.length !== this.size) {
    throw new Error('Invalid length given for stateRelayPower LIFX packet');
  }

  obj = {};
  obj.relayIndex = buf.readUInt8LE(offset);
  offset += 1;
  obj.relayLevel = buf.readUInt16LE(offset);
  offset += 2;

  return obj;
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @return {Buffer}     packet
 */
Packet.toBuffer = function (obj) {
  var buf = Buffer.alloc(this.size);
  buf.fill(0);
  var offset = 0;

  buf.readUInt8LE(obj.relayIndex, offset);
  offset += 1;
  buf.writeUInt16LE(obj.relayLevel, offset);
  offset += 2;

  return buf;
};

module.exports = Packet;
