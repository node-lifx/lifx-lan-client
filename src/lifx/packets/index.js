const packets = exports;

/*
 * Device related packages
 */
packets.getService = require('./getService');
packets.stateService = require('./stateService');

packets.getHostInfo = require('./getHostInfo');
packets.stateHostInfo = require('./stateHostInfo');

packets.getHostFirmware = require('./getHostFirmware');
packets.stateHostFirmware = require('./stateHostFirmware');

packets.getWifiInfo = require('./getWifiInfo');
packets.stateWifiInfo = require('./stateWifiInfo');

packets.getWifiFirmware = require('./getWifiFirmware');
packets.stateWifiFirmware = require('./stateWifiFirmware');

packets.getLabel = require('./getLabel');
packets.setLabel = require('./setLabel');
packets.stateLabel = require('./stateLabel');

packets.getPower = require('./getPower');
packets.setPower = require('./setPower');
packets.statePower = require('./statePower');

packets.getVersion = require('./getVersion');
packets.stateVersion = require('./stateVersion');

packets.getInfo = require('./getInfo');
packets.stateInfo = require('./stateInfo');

packets.rebootRequest = require('./rebootRequest');
packets.rebootResponse = require('./rebootResponse');

packets.acknowledgement = require('./acknowledgement');

packets.echoRequest = require('./echoRequest');
packets.echoResponse = require('./echoResponse');

packets.getLocation = require('./getLocation');
packets.stateLocation = require('./stateLocation');

packets.getOwner = require('./getOwner');
packets.stateOwner = require('./stateOwner');

packets.getGroup = require('./getGroup');
packets.stateGroup = require('./stateGroup');

/*
 * Light device related packages
 */
packets.getLight = require('./getLight');
packets.stateLight = require('./stateLight');

packets.setColor = require('./setColor');
packets.setWaveform = require('./setWaveform');
packets.setMultiZoneEffect = require('./setMultiZoneEffect');

packets.getTemperature = require('./getTemperature');
packets.stateTemperature = require('./stateTemperature');

packets.getInfrared = require('./getInfrared');
packets.setInfrared = require('./setInfrared');
packets.stateInfrared = require('./stateInfrared');

/*
 * Sensor related packages
 */
packets.getAmbientLight = require('./getAmbientLight');
packets.stateAmbientLight = require('./stateAmbientLight');

/*
 * MultiZone device related packages
 */
packets.getColorZones = require('./getColorZones');
packets.setColorZones = require('./setColorZones');

packets.stateZone = require('./stateZone');
packets.stateMultiZone = require('./stateMultiZone');

packets.tile = require('./tile');
packets.hsbk = require('./hsbk');
packets.getDeviceChain = require('./getDeviceChain');
packets.stateDeviceChain = require('./stateDeviceChain');

packets.setUserPosition = require('./setUserPosition');
packets.setTileState64 = require('./setTileState64');
packets.getTileState64 = require('./getTileState64');
packets.stateTileState64 = require('./stateTileState64');

/*
 * LIFX Switch device related packages
 */
packets.getRelayPower = require('./getRelayPower');
packets.setRelayPower = require('./setRelayPower');
packets.stateRelayPower = require('./stateRelayPower');

