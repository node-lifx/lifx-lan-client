'use strict';

var Packet = {
  size: 1
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @param  {Number} obj.relayIndex start zone index, between 0 and 255
 * @return {Buffer} packet
 */
Packet.toBuffer = function (obj) {
  var buf = Buffer.alloc(this.size);
  buf.fill(0);
  var offset = 0;

  if (typeof obj.relayIndex !== 'number' && obj.relayIndex < 0 || obj.relayIndex > 3) {
    throw new RangeError('Invalid relayIndex value given for getRelayPower LIFX packet, must be a number between 0 and 3');
  }
  buf.writeUInt8(obj.relayIndex, offset);
  offset += 1;
  
  return buf;
};

module.exports = Packet;
