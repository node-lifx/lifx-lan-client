'use strict';

const utils = require('../../').utils;
const assert = require('chai').assert;

describe('Utils', () => {
  it('create a random hex string', () => {
    const test1 = utils.getRandomHexString();
    assert.isString(test1);
    assert.equal(test1, test1.match(/^[0-9A-F]{8}$/)[0]);

    const test2 = utils.getRandomHexString(16);
    assert.isString(test2);
    assert.equal(test2, test2.match(/^[0-9A-F]{16}$/)[0]);
  });

  it('getting host ips', () => {
    const hostIPs = utils.getHostIPs();
    assert.isArray(hostIPs);
    hostIPs.forEach((ip) => {
      assert.isString(ip, 'IPs are given as');
      assert.isTrue(ip.indexOf('.') >= 0 || ip.indexOf(':') >= 0, 'IP format');
    });
  });

  it('validation of IPv4 ips', () => {
    assert.isTrue(utils.isIpv4Format('255.255.255.255'));
    assert.isTrue(utils.isIpv4Format('98.139.180.149'));
    assert.isTrue(utils.isIpv4Format('0.0.0.0'));
    assert.isTrue(utils.isIpv4Format('127.0.0.1'));
    assert.isTrue(utils.isIpv4Format('192.168.2.101'));

    // IPv6
    assert.isFalse(utils.isIpv4Format('FE80:0000:0000:0000:0202:B3FF:FE1E:8329'));
    assert.isFalse(utils.isIpv4Format('::1'));
    assert.isFalse(utils.isIpv4Format('FE80::0202:B3FF:FE1E:8329'));

    // IPv4 but with port
    assert.isFalse(utils.isIpv4Format('127.0.0.1:3000'));
    assert.isFalse(utils.isIpv4Format('98.139.180.149:61500'));
  });

  it('rgb hex string to object with decimal rgb values', () => {
    assert.throw(() => {
      // No string as argument
      utils.rgbHexStringToObject(111);
    }, TypeError);

    assert.throw(() => {
      // No leading # char
      utils.rgbHexStringToObject('FFF');
    }, RangeError);

    assert.throw(() => {
      // Invalid hex string
      utils.rgbHexStringToObject('#FFDF');
    });

    assert.throw(() => {
      // Invalid hex string
      utils.rgbHexStringToObject('#FFFFFFD');
    });

    assert.deepEqual(utils.rgbHexStringToObject('#FFF'), {r: 255, g: 255, b: 255});
    assert.deepEqual(utils.rgbHexStringToObject('#fff'), {r: 255, g: 255, b: 255});
    assert.deepEqual(utils.rgbHexStringToObject('#000'), {r: 0, g: 0, b: 0});
    assert.deepEqual(utils.rgbHexStringToObject('#F00'), {r: 255, g: 0, b: 0});
    assert.deepEqual(utils.rgbHexStringToObject('#f00'), {r: 255, g: 0, b: 0});
    assert.deepEqual(utils.rgbHexStringToObject('#30d'), {r: 51, g: 0, b: 221});
    assert.deepEqual(utils.rgbHexStringToObject('#FFFFFF'), {r: 255, g: 255, b: 255});
    assert.deepEqual(utils.rgbHexStringToObject('#000000'), {r: 0, g: 0, b: 0});
    assert.deepEqual(utils.rgbHexStringToObject('#747147'), {r: 116, g: 113, b: 71});
    assert.deepEqual(utils.rgbHexStringToObject('#d52664'), {r: 213, g: 38, b: 100});
  });

  it('maximum number in array', () => {
    let values = [24, 1, 18, 254, 255, 21, 0];
    assert.equal(utils.maxNumberInArray(values), 255);
    assert.equal(values[0], 24); // Keep original order

    values = [0.25, 0.325, 0.125, 0.333, 0.75, 0.999];
    assert.equal(utils.maxNumberInArray(values), 0.999);
    assert.equal(values[0], 0.25); // Keep original order
  });

  it('minimum number in array', () => {
    let values = [24, 1, 18, 254, 255, 21, 0];
    assert.equal(utils.minNumberInArray(values), 0);
    assert.equal(values[0], 24); // Keep original order

    values = [0.25, 0.325, 0.125, 0.333, 0.75, 0.999];
    assert.equal(utils.minNumberInArray(values), 0.125);
    assert.equal(values[0], 0.25); // Keep original order
  });

  it('rgb to hsb conversion', () => {
    let rgbObj = {r: 255, g: 255, b: 255};
    assert.deepEqual(utils.rgbToHsb(rgbObj), {h: 0, s: 0, b: 100});

    rgbObj = {r: 0, g: 0, b: 0};
    assert.deepEqual(utils.rgbToHsb(rgbObj), {h: 0, s: 0, b: 0});

    rgbObj = {r: 255, g: 0, b: 0};
    assert.deepEqual(utils.rgbToHsb(rgbObj), {h: 0, s: 100, b: 100});

    rgbObj = {r: 0, g: 255, b: 0};
    assert.deepEqual(utils.rgbToHsb(rgbObj), {h: 120, s: 100, b: 100});

    rgbObj = {r: 0, g: 0, b: 255};
    assert.deepEqual(utils.rgbToHsb(rgbObj), {h: 240, s: 100, b: 100});

    rgbObj = {r: 128, g: 128, b: 0};
    assert.deepEqual(utils.rgbToHsb(rgbObj), {h: 60, s: 100, b: 50});

    rgbObj = {r: 128, g: 128, b: 128};
    assert.deepEqual(utils.rgbToHsb(rgbObj), {h: 0, s: 0, b: 50});

    rgbObj = {r: 218, g: 21, b: 211};
    assert.deepEqual(utils.rgbToHsb(rgbObj), {h: 302, s: 90, b: 85});

    rgbObj = {r: 83, g: 146, b: 141};
    assert.deepEqual(utils.rgbToHsb(rgbObj), {h: 175, s: 43, b: 57});

    rgbObj = {r: 146, g: 108, b: 83};
    assert.deepEqual(utils.rgbToHsb(rgbObj), {h: 24, s: 43, b: 57});
  });

  it('get hardware info', () => {
    const vendorId = 1;
    let hardwareId;

    hardwareId = 1;
    assert.deepEqual(utils.getHardwareDetails(vendorId, hardwareId), {
      vendorName: 'LIFX',
      productName: 'LIFX Original 1000',
      productFeatures: {
        chain: false,
        color: true,
        infrared: false,
        matrix: false,
        multizone: false,
        ['temperature_range']: [2500, 9000]
      }
    });

    hardwareId = 10;
    assert.deepEqual(utils.getHardwareDetails(vendorId, hardwareId), {
      vendorName: 'LIFX',
      productName: 'LIFX White 800 (Low Voltage)',
      productFeatures: {
        chain: false,
        color: false,
        infrared: false,
        matrix: false,
        multizone: false,
        ['temperature_range']: [2700, 6500]
      }
    });

    // Product and Vendor IDs start with 1
    assert.equal(utils.getHardwareDetails(0, 1), false);
    assert.equal(utils.getHardwareDetails(1, 0), false);
  });

  it('to16Bitnumber without default', () => {
    assert.equal(utils.to16Bitnumber(6), 6);
    assert.equal(utils.to16Bitnumber(-6), 6);
    assert.equal(utils.to16Bitnumber('6'), 0);
  });

  it('to16Bitnumber with default not number', () => {
    assert.equal(utils.to16Bitnumber(6, 'xx'), 6);
    assert.equal(utils.to16Bitnumber(-6, 'xx'), 6);
    assert.equal(utils.to16Bitnumber('6', 'xx'), 0);
  });

  it('to16Bitnumber with default number', () => {
    assert.equal(utils.to16Bitnumber(6, 9), 6);
    assert.equal(utils.to16Bitnumber(-6, 9), 6);
    assert.equal(utils.to16Bitnumber('6', 9), 9);
  });

  it('to16Bitnumber with default number wrap', () => {
    assert.equal(utils.to16Bitnumber(6, 9 + 0xffff), 6);
    assert.equal(utils.to16Bitnumber(-6, 9 + 0xffff), 6);
    assert.equal(utils.to16Bitnumber('6', 9 + 0xffff), 8);
  });

  it('toColorHsbk undefined', () => {
    assert.throw(() => utils.toColorHsbk(undefined));
  });

  it('toColorHsbk empty to defaults', () => {
    assert.deepEqual(utils.toColorHsbk({}), {
      hue: 32768,
      saturation: 32768,
      brightness: 32768,
      kelvin: 3500
    });
  });

  it('toColorHsbk set and passed', () => {
    assert.deepEqual(utils.toColorHsbk({
      hue: 4711,
      saturation: 4712,
      brightness: 4713,
      kelvin: 4714
    }), {
      hue: 4711,
      saturation: 4712,
      brightness: 4713,
      kelvin: 4714
    });
  });

  it('buildColorsHsbk undefined', () => {
    assert.throw(() => utils.buildColorsHsbk());
  });

  it('buildColorsHsbk empty', () => {
    assert.deepEqual(utils.buildColorsHsbk([1, 2]), []);
  });

  it('buildColorsHsbk def and size', () => {
    assert.deepEqual(utils.buildColorsHsbk([{
      hue: 5674
    }], 2), [
      {
        brightness: 32768,
        hue: 5674,
        kelvin: 3500,
        saturation: 32768
      },
      {
        brightness: 32768,
        hue: 32768,
        kelvin: 3500,
        saturation: 32768
      }
    ]);
  });
});
