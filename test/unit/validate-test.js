'use strict';

const validate = require('../../').validate;
const assert = require('chai').assert;

describe('Validation', () => {
  it('isUIntRange', () => {
    try {
      validate.isUIntRange('666', 'context');
      assert.fail();
    } catch (e) {
      assert.include(e.message, '666');
      assert.include(e.message, 'context');
    }
  });

  it('isUInt8', () => {
    assert.throw(() => validate.isUInt8(-1));
    assert.isTrue(validate.isUInt8(0));
    assert.isTrue(validate.isUInt8(129));
    assert.isTrue(validate.isUInt8(0xff));
    assert.throw(() => validate.isUInt8(0x100));
  });

  it('isUInt16', () => {
    assert.throw(() => validate.isUInt16(-1));
    assert.isTrue(validate.isUInt16(0));
    assert.isTrue(validate.isUInt16(32430));
    assert.isTrue(validate.isUInt16(0xffff));
    assert.throw(() => validate.isUInt16(0x10000));
  });

  it('isUInt32', () => {
    assert.throw(() => validate.isUInt32(-1));
    assert.isTrue(validate.isUInt32(0));
    assert.isTrue(validate.isUInt32(1234949493));
    assert.isTrue(validate.isUInt32(0xffffffff));
    assert.throw(() => validate.isUInt32(0x100000000));
  });
});
