function buildTile(base) {
  return {
    accelMeasX: base + 0,
    accelMeasY: base + 2,
    accelMeasZ: base + 4,
    reserved0: base + 6,
    userX: base + 8 + 0.000123,
    userY: base + 12 + 0.000123,
    width: (base + 16) & 0xff,
    height: (base + 17) & 0xff,
    reserved1: (base + 18) & 0xff,
    deviceVersionVendor: base + 19,
    deviceVersionProduct: base + 23,
    deviceVersionVersion: base + 27,
    firmwareBuild: {
      low: base + 31,
      high: base + 35
    },
    reserved2: {
      low: base + 39,
      high: base + 43
    },
    firmwareVersionMinor: base + 47,
    firmwareVersionMajor: base + 49,
    reserved3: base + 51
  };
}

module.exports = buildTile;
