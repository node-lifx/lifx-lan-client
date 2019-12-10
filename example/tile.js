'use strict';

const LifxClient = require('../lib/lifx').Client;

const client = new LifxClient();

const LOOPTIME = 10000;
const TILE_LABEL = '*';

/*
 * This example should show on all tiles of
 * your chain a random pattern. After all bits
 * of the tiles are set with the random pattern,
 * the example reads back all set values
 * from the tiles just to test the read back function.
 * I could not compare the set values out of the reason
 * that the setvalues are usally a bit modified.
 */

function getBits(light, idx, chain) {
  if (idx >= chain.total_count) {
    console.log('All Bits get');
    setTimeout(() => setBits(light, 0, chain), LOOPTIME);
    return;
  }
  light.getTileState64(idx, (err) => {
    if (err) {
      console.error('getTileState64:', err);
      return;
    }
    getBits(light, idx + 1, chain);
  });
}

function setBits(light, idx, chain) {
  if (idx >= chain.total_count) {
    setTimeout(() => getBits(light, 0, chain), LOOPTIME);
    return;
  }
  const ofs = ~~(Math.random() * (65536 - (65536 / 64)));
  light.setTileState64(idx, {duration: 100},
    (new Array(64)).fill(undefined).map((_, idx) => ({
      hue: (ofs + (idx * (65536 / 64))) & 0xffff,
      saturation: 50000,
      brightness: 16384,
      kelvin: 4096
    })), () => setBits(light, idx + 1, chain));
}

client.on('light-new', (light) => {
  if (!(TILE_LABEL === '*' || TILE_LABEL === light.id)) {
    return;
  }
  console.log('New light found.');
  console.log('ID: ' + light.id);

  light.getDeviceChain(function(err, chain) {
    if (err) {
      console.log(err);
    }
    setBits(light, 0, chain);
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
