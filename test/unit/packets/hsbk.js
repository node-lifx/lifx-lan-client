'use strict';

const hsbk = require('../../../lib/lifx/packets').hsbk;
const assert = require('chai').assert;

describe('hsbk', () => {
  it('toBuffer -> toObject', () => {
    // debugger;
    const ref = {
      hue: 0x0102,
      saturation: 0x0304,
      brightness: 0x0506,
      kelvin: 0x0708
    };
    const buf = Buffer.alloc(hsbk.size);
    const out = hsbk.toBuffer(buf, 0, ref);
    assert.equal(out.offset, 8);
    assert.equal(out.buffer, buf);
    const msg = hsbk.toObject(buf, 0);
    assert.equal(msg.offset, 8);
    assert.deepEqual(msg.hsbk, ref);
  });
});
