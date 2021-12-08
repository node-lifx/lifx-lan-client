import {RemoteInfo} from 'dgram';
import {EventEmitter} from 'eventemitter3';
import {AddressInfo} from 'net';

export class ClientOptions {
  /** The IPv4 address to bind to  */
  address: string = '0.0.0.0';
  /** The port to bind to */
  port: number = 0;
  /** Show debug output */
  debug: boolean = false;
  /** If light hasn't answered for amount of discoveries it is set offline */
  lightOfflineTolerance: number = 3;
  /** Message handlers not called will be removed after this delay in ms */
  messageHandlerTimeout: number = 45000;
  /** The source to send to light, must be 8 chars lowercase or digit */
  source: string = '';
  /** Whether to start discovery after initialization or not */
  startDiscovery: boolean = true;
  /** Pre set list of ip addresses of known addressable lights */
  lights: string[] = [];
  stopAfterDiscovery: boolean = false;
  /** The broadcast address to use for light discovery */
  broadcast: string = '255.255.255.255';
  sendPort: number = constants.LIFX_DEFAULT_PORT;
  resendPacketDelay: number = 150;
  resendMaxTimes: number = 3;
  messageRateLimit: number = 50;
  discoveryInterval: number = 5000;
}

export interface Client extends EventEmitter {

  on(event: 'error', callback: (err: Error) => void): this;
  on(event: 'message', callback: (msg: any, info: RemoteInfo) => void): this;
  on(event: 'listening', callback: () => void): this;
  on(event: 'light-offline', callback: (info: Light) => void): this;
  on(event: 'light-online', callback: (info: Light) => void): this;
  on(event: 'light-new', callback: (info: Light) => void): this;
  on(event: 'discovery-completed', callback: () => void): this;

  /** Get network address data from connection */
  address(): AddressInfo;

  /** Close client */
  destroy(): void;

  /** Creates a new socket and starts discovery */
  init(options: ClientOptions, callback: () => void): void;

  /** Find a light
  * @param identifier label, id or ip to search for
  */
  light(identifier: string): Light | false;

  /** Get lights with status
  * @param status Status to filter for, empty string for all
  */
  lights(status: string): Light[];

  /** Send a LIFX message objects over the network
  * @param msg A message object or multiple with data to send
  * @param callback Function to handle error and success after send
  * @return The sequence number of the request
  */
  send(msg: any, callback: (err: Error, msg: any, rinfo: RemoteInfo) => void): number;

  /** enable or disable debug at runtime */
  setDebug(debug: boolean): void;

  /**
  * Start discovery of lights
  * This keeps the list of lights updated, finds new lights and sets lights offline if no longer found
  * @param lights Pre set list of ip addresses of known addressable lights to request directly
  */
  startDiscovery(lights: string[]): void;

  /**
  * This stops the discovery process
  * The client will be no longer updating the state of lights or find lights
  */
  stopDiscovery(): void;
}

export interface LightOptions {
  client: Client;
  id: string;
  address: string;
  port: number;
  seenOnDiscovery: number;
}

export interface LightColor {
  hue: number;
  saturation: number;
  brightness: number;
  kelvin: number;
}

/** A representation of a light bulb */
export interface Light {
  constructor(constr: LightOptions): Light;

  client: Client;
  id: string;
  address: string;
  port: number;
  label: string;
  status: string;
  seenOnDiscovery: number;

  /**
  * Changes the color to the given HSBK value
  * @param hue color hue from 0 - 360 (in °)
  * @param saturation color saturation from 0 - 100 (in %)
  * @param brightness color brightness from 0 - 100 (in %)
  * @param kelvin color kelvin between 2500 and 9000
  * @param duration transition time in milliseconds
  * @param callback called when light did receive message
  */
  color(hue: number, saturation: number, brightness: number, kelvin: number, duration: number, callback: (err: Error) => void): void;

  /**
  * Changes the color to the given rgb value
  * Note RGB poorly represents the color of light, prefer setting HSBK values with the color method
  * @example light.colorRgb(255, 0, 0)
  * @param red value between 0 and 255 representing amount of red in color
  * @param green value between 0 and 255 representing amount of green in color
  * @param blue value between 0 and 255 representing amount of blue in color
  * @param duration transition time in milliseconds
  * @param callback called when light did receive message
  */
  colorRgb(red: number, green: number, blue: number, duration: number, callback: (err: Error) => void): void;

  /**
  * Changes the color to the given rgb value
  * Note RGB poorly represents the color of light, prefer setting HSBK values with the color method
  * @example light.colorRgb('#FF0000')
  * @param hexString rgb hex string starting with # char
  * @param duration transition time in milliseconds
  * @param callback called when light did receive message
  */
  colorRgbHex(hexString: string, duration: number, callback: (err: Error) => void): void;

  /**
   * Changes a color zone range to the given HSBK value
   * @param startIndex start zone index from 0 - 255
   * @param endIndex end zone index from 0 - 255
   * @param hue color hue from 0 - 360 (in °)
   * @param saturation color saturation from 0 - 100 (in %)
   * @param brightness color brightness from 0 - 100 (in %)
   * @param kelvin color kelvin between 2500 and 9000
   * @param duration transition time in milliseconds
   * @param apply apply changes immediately or leave pending for next apply
   * @param callback called when light did receive message
   */
  colorZones(startIndex: number, endIndex: number, hue: number, saturation: number, brightness: number, kelvin: number, duration: number, apply: boolean, callback: (err: Error, msg: any, rinfo: RemoteInfo) => void): void;

  /**
   * Requests ambient light value of the light
   * @param callback a function to accept the data
   */
  getAmbientLight(callback: (err: Error, flux: number) => void): void;

  /**
  * Requests the current color zone state of the light
  * @param startIndex start color zone index
  * @param endIndex end color zone index
  * @param callback a function to accept the data
  */
  getColorZones(startIndex: number, endIndex: number, callback: (err: Error, msg: { count: number, index: number, color: LightColor }, sequence: number) => void): void;

  /**
  * Requests used version from the microcontroller unit of the light
  * @param callback a function to accept the data
  */
  getFirmwareVersion(callback: (err: Error, msg: {majorVersion: number, minorVersion: number}) => void): void;

  /**
  * Requests hardware info from the light
  * @param callback a function to accept the data with error and message as parameters
  */
  getHardwareVersion(callback: (err: Error, msg: Product | false) => void): void;

  /**
  * Requests the label of the light
  * @param callback a function to accept the data
  * @param cache return cached result if exists
  */
  getLabel(callback: (err: Error, label: string) => void, cache: boolean): void;

  /**
  * Requests the current maximum setting for the infrared channel
  * @param callback a function to accept the data
  */
  getMaxIR(callback: (err: Error, brightness: number) => void): void;

  /**
  * Requests the power level of the light
  * @param callback a function to accept the data
  */
  getPower(callback: (err: Error, level: number) => void): void;

  /**
  * Requests the current state of the light
  * @param callback a function to accept the data
  */
  getState(callback: (err: Error, state: {color: LightColor, power: number, label: string}) => void): void;

  /**
  * Requests uptime from the light (in nanoseconds)
  * @param callback a function to accept the data with error and message as parameters
  */
  getUptime(callback: (err: Error, uptime: number) => void): void;

  /**
  * Requests wifi infos from for the light
  * @param callback a function to accept the data
  */
  getWifiInfo(callback: (err: Error, info: {signal: number, tx: number, rx: number}) => void): void;

  /**
  * Requests used version from the wifi controller unit of the light (wifi firmware version)
  * @param callback a function to accept the data
  */
  getWifiVersion(callback: (err: Error, version: { majorVersion: number, minorVersion: number}) => void): void;

  /**
  * Sets the Maximum Infrared brightness
  * @param brightness infrared brightness from 0 - 100 (in %)
  * @param callback called when light did receive message
  */
  maxIR(brightness: number, callback: (err: Error) => void): void;

  /**
   * Changes a color zone range to the given HSBK value
   * @param effectName sets the desired effect, currently available options are: MOVE, OFF
   * @param speed sets duration of one cycle of the effect, the higher the value the slower the effect animation
   * @param direction whether to animate from or towards the controller, available options are: TOWARDS, AWAY
   * @param callback called when light did receive message
   */
  setMultiZoneEffect(effectName: 'MOVE' | 'OFF', speed: number, direction: 'TOWARDS' | 'AWAY', callback: (err: Error) => void): void;

  /**
  * Turns the light off
  * @example light('192.168.2.130').off()
  * @param duration transition time in milliseconds
  * @param callback called when light did receive message
  */
  off(duration: number, callback: (err: Error) => void): void;

  /**
  * Turns the light on
  * @example light('192.168.2.130').on()
  * @param duration transition time in milliseconds
  * @param callback called when light did receive message
  */
  on(duration: number, callback: (err: Error) => void): void;

  /**
  * Sets the label of light
  * @example light.setLabel('Kitchen')
  * @param label new label to be set, maximum 32 bytes
  * @param callback called when light did receive message
  */
  setLabel(label: string, callback: (err: Error) => void): void;

  /**
  * Reboots the light
  * @param callback called when light did receive message
  */
  reboot(callback: (err: Error) => void): void;
}

export interface Product {
  vendorName: string;
  productName: string;
  productFeatures: ProductFeatures;
  productUpgrades: ProductUpgrade[];
}

export interface ProductFeatures {
  hev: boolean;
  color: boolean;
  chain: boolean;
  matrix: boolean;
  relays: boolean;
  buttons: boolean;
  infrared: boolean;
  multizone: boolean;
  temperature_range: [number, number];
  extended_multizone?: boolean;
  min_ext_mz_firmware?: number;
  min_ext_mz_firmware_components?: number[];
}

export interface ProductUpgrade {
  major: number;
  minor: number;
  features: ProductFeatures;
}

export interface ColorValues {
  hue: number;
  saturation: number;
}

export class constants {
  ACK_REQUIRED_BIT: number;
  ADDRESSABLE_BIT: number;
  APPLICATION_REQUEST_VALUES: {
    NO_APPLY: number;
    APPLY: number;
    APPLY_ONLY: number;
  };
  COLOR_NAME_HS_VALUES: {
    white: ColorValues;
    red: ColorValues;
    orange: ColorValues;
    yellow: ColorValues;
    cyan: ColorValues;
    green: ColorValues;
    blue: ColorValues;
    purple: ColorValues;
    pink: ColorValues;
  };
  HSBK_DEFAULT_KELVIN: number;
  HSBK_MAXIMUM_BRIGHTNESS: number;
  HSBK_MAXIMUM_HUE: number;
  HSBK_MAXIMUM_KELVIN: number;
  HSBK_MAXIMUM_SATURATION: number;
  HSBK_MINIMUM_BRIGHTNESS: number;
  HSBK_MINIMUM_HUE: number;
  HSBK_MINIMUM_KELVIN: number;
  HSBK_MINIMUM_SATURATION: number;
  IR_MAXIMUM_BRIGHTNESS: number;
  IR_MINIMUM_BRIGHTNESS: number;
  LIFX_ANY_PORT: number;
  LIFX_DEFAULT_PORT: number;
  LIGHT_WAVEFORMS: string[];
  MULTIZONE_EFFECTS_MOVE_DIRECTION: string[];
  MULTIZONE_EFFECTS: string[];
  ORIGIN_BITS: number;
  PACKET_HEADER_SEQUENCE_MAX: number;
  PACKET_HEADER_SIZE: number;
  PACKET_TRANSACTION_TYPES: {
    ONE_WAY: number;
    REQUEST_RESPONSE: number;
  };
  PROTOCOL_VERSION_1: number;
  PROTOCOL_VERSION_BITS: number;
  PROTOCOL_VERSION_CURRENT: number;
  RESPONSE_REQUIRED_BIT: number;
  RGB_MAXIMUM_VALUE: number;
  RGB_MINIMUM_VALUE: number;
  TAGGED_BIT: number;
  ZONE_INDEX_MAXIMUM_VALUE: number;
  ZONE_INDEX_MINIMUM_VALUE: number;
}

export interface utils {
  /**
  * Get's product and vendor details for the given id's
  * hsb integer object
  * @param vendorId id of the vendor
  * @param productId id of the product
  * @return product and details vendor details or false if not found
  */
  getHardwareDetails(vendorId: number, productId: number): Product | false;
}
