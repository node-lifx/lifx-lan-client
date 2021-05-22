'use strict';

/**
 * Searches for new lights, if one is found it sends a setMultiZoneEffect packet
 */

const LifxClient = require('../lib/lifx').Client;
const client = new LifxClient();

// Function running when packet was received by light
const onPacketReceived = () => {
  console.log('Packet sent\n');
};

client.on('light-new', (light) => {
  console.log('New light found.');
  console.log('ID: ' + light.id);

  light.setMultiZoneEffect('OFF', 1000, 'AWAY', onPacketReceived);
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
