
// doc: https://techdocs.zebra.com/mx/WirelessMgr

var mx = require('js/zebraMx/zebraMx.js');

const enable = "1";
const disable = "2";

const mgr = 'WirelessMgr';

var debug = false;

// set to true to get debug info in the log
exports.setExtraLog = function (value) {
	mx.setExtraLog (value);
    debug = value;
}

/*
 * Bluetooth
 */
exports.disableBluetoothSwitch = function () {modifyBluetooth(disable);}
exports.enableBluetoothSwitch = function () {modifyBluetooth(enable);}

function modifyBluetooth(value) {
    mx.simpleMXMessage (mgr, "Bluetooth", value); 
}

exports.disableBluetoothState = function () {modifyBluetoothState(disable);}
exports.enableBluetoothState = function () {modifyBluetoothState(enable);}

function modifyBluetoothState(value) {
    mx.simpleMXMessage (mgr, "BluetoothState", value); 
}

exports.enableBTScanningState = function () {BTScanningState(enable);}
exports.disableBTScanningState = function () {BTScanningState(disable);}

function BTScanningState(value) {
    mx.simpleMXMessage (mgr, "BTScanningState", value); 
}

/*
 * GPS functions
 */
// enable/disable GPS on device
exports.enableGPSState = function () {GPSState(enable);}
exports.disableGPSState = function () {GPSState(disable);}

function GPSState(value) {
    mx.simpleMXMessage (mgr, "GPSState", value); 
}


// allow apps to access location
exports.allowLocationState = function () {LocationState(enable);}
exports.disallowLocationState = function () {LocationState(disable);}

function LocationState(value) {
    mx.simpleMXMessage (mgr, "LocationState", value); 
}


exports.highAccuracyGPSLocationMode = function () {GPSLocationMode("1");}
exports.batterySavingGPSLocationMode = function () {GPSLocationMode("2");}
exports.deviceOnlyGPSLocationMode = function () {GPSLocationMode("3");}

function GPSLocationMode(value) {
    mx.simpleMXMessage (mgr, "GPSLocationMode", value); 
}


/*
 * NFC function
 */

// enable/disable NFC on device
exports.enableNFCState = function () {NFCState(enable);}
exports.disableNFCState = function () {NFCState(disable);}

function NFCState(value) {
    mx.simpleMXMessage (mgr, "NFCState", value); 
}

/*
 * WiFi functions
 */

// enable/disable WiFi scanning. This is mostly good for in-bulding location determination
exports.enableWiFiScanningState = function () {WiFiScanningState(enable);}
exports.disableWiFiScanningState = function () {WiFiScanningState(disable);}

function WiFiScanningState(value) {
    mx.simpleMXMessage (mgr, "WiFiScanningState", value); 
}
