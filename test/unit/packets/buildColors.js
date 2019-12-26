
function buildColors() {
  return Array(64).fill(undefined).map((_, i) => ({
    hue: (i << 8) | 1,
    saturation: (i << 8) | 2,
    brightness: (i << 8) | 3,
    kelvin: (i << 8) | 4
  }));
}

module.exports = buildColors;
