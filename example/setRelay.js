'use strict';

/**
 * Searches for new switches, if one is found it toggles the first relay on and off
 */

const LifxClient = require('../src/lifx').Client;
const client = new LifxClient();

// Function running when packet was received by light
const callback = function() {
  console.log('Packet send\n');
};

client.on('light-new', function(light) {
  console.log('New light found.');
  console.log('ID: ' + light.id);

  light.hasRelays(function(result) {
    if (result) {
      for (let i = 0; i < 3; i++) {
        light.getRelayPower(i, function(error, level) {
          if (level === 0) {
            light.relayOn(i, callback);
            console.log('Relay on: ' + i);
          } else {
            light.relayOff(i, callback);
            console.log('Relay off: ' + i);
          }
        });
      }
    } else {
      console.log('Not a switch.');
    }
  });
});

// Give feedback when running
client.on('listening', function() {
  const address = client.address();
  console.log(
    'Started LIFX listening on ' +
    address.address + ':' + address.port + '\n'
  );
});

client.init();
