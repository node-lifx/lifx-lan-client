'use strict';

/**
 * Searches for new lights, if one is found it sends a setMultiZoneEffect packet
 */

const LifxClient = require('../lib/lifx').Client;
const packet = require('../lib/lifx').packet;
const constants = require('../lib/lifx').constants;
const client = new LifxClient();

// Create our packet with for move effect - runs infinite
const packetObj = packet.create('setMultiZoneEffect', {
  effect_type: constants.MULTIZONE_EFFECTS.indexOf('MOVE'), // MOVE or OFF
  speed: 1000, // 1s - speed of one full animation cycle
  parameter2: constants.MULTIZONE_EFFECTS_MOVE_DIRECTION.indexOf(args.direction) // TOWARDS or AWAY from controller
}, client.source);

// Function running when packet was received by light
const onPacketReceived = () => {
  console.log('Packet sent\n');
};

client.on('light-new', (light) => {
  console.log('New light found.');
  console.log('ID: ' + light.id);

  // Set the light id
  packetObj.target = light.id; // set target id to new light
  client.send(packetObj, onPacketReceived);
});

// Give feedback when running
client.on('listening', () => {
  const address = client.address();
  console.log(
    'Started LIFX listening on ' +
    address.address + ':' + address.port + '\n'
  );
});

client.init();
