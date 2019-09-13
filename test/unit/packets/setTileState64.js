'use strict';

const packet = require('../../../lib/lifx').packet;
// const Client = require('../../../lib/lifx').Client;
// const Light = require('../../../lib/lifx').Light;
// const constants = require('../../../lib/lifx').constants;
const assert = require('chai').assert;

/*
function dummy() {
let client;
  const packetSendCallback = (msg) => {
    console.log('XXXXXXXXXX', msg);
    done();
  };
function getMsgQueueLength(queueAddress) {
  return client.getMessageQueue(queueAddress).length;
}
const lightProps = {
  client: client,
  id: 'f37a4311b857',
  address: '192.168.0.1',
  port: constants.LIFX_DEFAULT_PORT,
  seenOnDiscovery: 0
};
beforeEach(() => {
  client = new Client();
  client.devices.f37a4311b857 = new Light(lightProps);
});
console.log(Object.keys(packetObj));
  // const packetObj = packet.create('setPower', {level: 65535}, client.source);
  const queueAddress = client.broadcastAddress;

client.init({
  port: constants.LIFX_DEFAULT_PORT,
  startDiscovery: false
}, () => {
  client.socket.on('message', packetSendCallback);
  let currMsgQueCnt = getMsgQueueLength(queueAddress);
  client.send(packetObj);
  assert.equal(getMsgQueueLength(queueAddress), currMsgQueCnt + 1, 'sends a packet to the queue');
  currMsgQueCnt += 1;
  assert.isDefined(client.sendTimers[queueAddress]);
  client.stopSendingProcess(); // We don't want automatic calling of sending
  const sendingProcess = client.sendingProcess(queueAddress);
  sendingProcess(); // Call sending it manualy
  assert.equal(getMsgQueueLength(queueAddress), currMsgQueCnt - 1, 'removes the packet when send');
  currMsgQueCnt -= 1;
});
}
*/

describe('Packet setTileState64', () => {
  describe('toBuffer', () => {
    it('setTileState64', () => {
      const obj = {
        type: 'setTileState64',
        tileIndex: 1,
        length: 2,
        reserved: 3,
        x: 4,
        y: 5,
        width: 6,
        duration: 7,
        colors: [
          {
            saturation: 0x8000,
            brightness: 0x8001,
            kelvin: 3500,
            hue: 49
          },
          {
            saturation: 0x6000,
            brightness: 0x6001,
            kelvin: 4500,
            hue: 59
          }
        ]
      };
      const buf = packet.toBuffer(obj);
      assert.equal(buf.length, 62);
      assert.equal(buf.readUInt32LE(32), 715);
      assert.equal(buf.readUInt8(36), obj.tileIndex);
      assert.equal(buf.readUInt8(37), obj.length);
      assert.equal(buf.readUInt8(38), obj.reserved);
      assert.equal(buf.readUInt8(39), obj.x);
      assert.equal(buf.readUInt8(40), obj.y);
      assert.equal(buf.readUInt8(41), obj.width);
      assert.equal(buf.readUInt32LE(42), obj.duration);

      assert.equal(buf.readUInt16LE(46), obj.colors[0].hue);
      assert.equal(buf.readUInt16LE(48), obj.colors[0].saturation);
      assert.equal(buf.readUInt16LE(50), obj.colors[0].brightness);
      assert.equal(buf.readUInt16LE(52), obj.colors[0].kelvin);

      assert.equal(buf.readUInt16LE(54), obj.colors[1].hue);
      assert.equal(buf.readUInt16LE(56), obj.colors[1].saturation);
      assert.equal(buf.readUInt16LE(58), obj.colors[1].brightness);
      assert.equal(buf.readUInt16LE(60), obj.colors[1].kelvin);
    });
  });
});
