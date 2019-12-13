'use strict';

var _require = require('../../lifx'),
    constants = _require.constants,
    utils = _require.utils;

var Packet = {
  size: 59
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
    throw new Error('Invalid length given for setMultiZoneEffect LIFX packet');
  }

  obj.instanceid = buf.readUInt32LE(offset);
  offset += 4;

  obj.effect_type = buf.readUInt8(offset);
  offset += 1;

  // skip reserved field UInt16LE
  offset += 2;

  obj.speed = buf.readUInt32LE(offset);
  offset += 4;

  // Int64 is not supported. Not giving the value makes the effect infinite
  //obj.duration = utils.readUInt64LE(buf, offset);
  //obj.duration = new Int64(buf.readUInt32LE(offset), buf.readUInt32LE(offset + 4));
  offset += 8;

  // skip reserved field UInt32LE
  offset += 4;

  // skip reserved field UInt32LE
  offset += 4;

  // Parameters Block 8*32Bit
  // reserved for internal use
  offset += 4;

  if (obj.type == constants.MULTIZONE_EFFECTS.indexOf('MOVE')) {
    obj.parameter2 = buf.readUInt32LE(offset);
    offset += 4;
    // skip parameter3
    offset += 4;
    // skip parameter4
    offset += 4;
    // skip parameter5
    offset += 4;
    // skip parameter6
    offset += 4;
    // skip parameter7
    offset += 4;
    // skip parameter8
    offset += 4;
  } else if (obj.type == constants.MULTIZONE_EFFECTS.indexOf('OFF')) {
    // skip parameter2
    offset += 4;
    // skip parameter3
    offset += 4;
    // skip parameter4
    offset += 4;
    // skip parameter5
    offset += 4;
    // skip parameter6
    offset += 4;
    // skip parameter7
    offset += 4;
    // skip parameter8
    offset += 4;
  }

  return obj;
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object}  obj object with configuration data
 * @param  {Number}  obj.instanceid client identifier (set randomly)
 * @param  {Number}  obj.effect_type a constants.MULTIZONE_EFFECTS
 * @param  {Number}  obj.speed speed in milliseconds for completing one animation if cyclic or for one animation frame if acyclic
 * @param  {Number}  obj.duration duration in nanosecond for how long the effect should last
 * @param  {Number}  obj.parameter2 a constants.MULTIZONE_EFFECTS_MOVE_DIRECTION if effect 'MOVE' is set
 * @return {Buffer}  packet
 */
Packet.toBuffer = function (obj) {
  const buf = Buffer.alloc(this.size);
  buf.fill(0);
  let offset = 0;

  // instanceid is random. Could be used to identify the event later on
  buf.writeUInt32LE(Math.floor(Math.random() * 1000), offset);
  offset += 4;

  if (obj.effect_type === undefined) {
    throw new TypeError('obj.effect_type value must be given for setMultiZoneEffect LIFX packet');
  }
  if (typeof obj.effect_type !== 'number' && obj.effect_type < 0 || obj.effect_type > constants.MULTIZONE_EFFECTS.length - 1) {
    throw new RangeError('Invalid type value given for setMultiZoneEffect LIFX packet, must be a number between 0 and ' + (constants.MULTIZONE_EFFECTS.length - 1));
  }
  buf.writeUInt8(obj.effect_type, offset);
  offset += 1;

  // skip reserved field UInt16LE
  offset += 2;

  if (obj.speed === undefined) {
    throw new TypeError('obj.speed value must be given for setMultiZoneEffect LIFX packet');
  }
  if (typeof obj.speed !== 'number') {
    throw new TypeError('Invalid speed type given for setMultiZoneEffect LIFX packet, must be a number');
  }
  buf.writeUInt32LE(obj.speed, offset);
  offset += 4;

  /*if (obj.duration === undefined) {
    throw new TypeError('obj.duration value must be given for setMultiZoneEffect LIFX packet');
  }
  if (typeof obj.duration !== 'number') {
    throw new TypeError('Invalid duration type given for setMultiZoneEffect LIFX packet, must be a number');
  }*/
  //utils.writeUInt64LE(buf, offset, obj.duration);
  //obj.duration.toBuffer().copy(buf, offset);
  offset += 8;

  // skip reserved field UInt32LE
  offset += 4;

  // skip reserved field UInt32LE
  offset += 4;

  // Parameters Block 8*32Bit
  // reserved for internal use
  offset += 4;

  // The following parameters vary depending on the effect
  if (obj.effect_type == constants.MULTIZONE_EFFECTS.indexOf('MOVE')) {
    if (obj.parameter2 === undefined) {
      throw new TypeError('obj.parameter2 value must be given for setMultiZoneEffect (effect MOVE) LIFX packet');
    }
    if (typeof obj.parameter2 !== 'number' && obj.parameter2 < 0 || obj.parameter2 > constants.MULTIZONE_EFFECTS_MOVE_DIRECTION.length - 1) {
      throw new RangeError('Invalid parameter2 value given for setMultiZoneEffect (effect MOVE) LIFX packet, must be a number between 0 and ' + (constants.MULTIZONE_EFFECTS_MOVE_DIRECTION.length - 1));
    }
    buf.writeUInt32LE(obj.parameter2, offset);
    offset += 4;
    // skip parameter3
    offset += 4;
    // skip parameter4
    offset += 4;
    // skip parameter5
    offset += 4;
    // skip parameter6
    offset += 4;
    // skip parameter7
    offset += 4;
    // skip parameter8
    offset += 4;
  }

  return buf;
};

module.exports = Packet;
