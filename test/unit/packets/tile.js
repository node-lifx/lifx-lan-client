'use strict';

const tile = require('../../../src/lifx/packets').tile;
const assert = require('chai').assert;
const buildTile = require('./buildTile');

describe('tile', () => {
  it('toBuffer -> toObject', () => {
    // debugger;
    const ref = buildTile(213);
    const buf = Buffer.alloc(tile.size);
    const out = tile.toBuffer(buf, 0, ref);
    assert.equal(out.offset, 55);
    assert.equal(out.buffer, buf);
    const msg = tile.toObject(buf, 0);
    assert.equal(msg.offset, 55);
    assert.isTrue(Math.abs(ref.userX - msg.tile.userX) < 0.00001);
    assert.isTrue(Math.abs(ref.userY - msg.tile.userY) < 0.00001);
    ref.userX = msg.tile.userX;
    ref.userY = msg.tile.userY;
    assert.deepEqual(msg.tile, ref);
  });
});
