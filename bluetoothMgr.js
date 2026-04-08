
// doc: https://techdocs.zebra.com/mx/bluetoothmgr

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'BluetoothMgr';
var debug = false;


exports.setExtraLog = function setExtraLog(value) {
    debug = value;
    mx.setExtraLog (value);
}

exports.silentPairingProfile = function (deviceName, deviceAddress) {
    // const useMX = "10.3";
    
    var SilentPairingDeviceDetails = mx.buildCharacteristic("SilentPairingDeviceDetails",
        mx.buildParam("SilentPairingName", deviceName) +
        mx.buildParam("SilentPairingUAP", deviceAddress)
    );

    var pairing = mx.buildParam("SinglePairing", "0") +
        mx.buildParam("SilentPairingAction", "1") +
        mx.buildParam("MandatoryIdentifier", "1") +
        SilentPairingDeviceDetails +
        mx.buildParam("IsTrustedDeviceRule", "1") +
        mx.buildParam("IsSilentPairingRule", "1");
        
    // var command = mx.buildCharacteristic(mgr, pairing, useMX);
    var command = mx.buildCharacteristic(mgr, pairing);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.clearSilentPairingList = function () {
    mx.simpleMXMessage (mgr, "SilentPairingAction", "3");
}

exports.allowPairing = function () {
    allowDisallowPairing("1");
}

exports.disallowPairing = function () {
    allowDisallowPairing("2");
}

exports.allowTrustedOnlyPairing = function () {
    allowDisallowPairing("3");
}

function allowDisallowPairing (value) {
    mx.simpleMXMessage (mgr, "AllowPairing", value);
}

exports.allowSilentPairing = function () {
    allowDisallowSilentPairing("1");
}

exports.disallowSilentPairing = function () {
    allowDisallowSilentPairing("2");
}

function allowDisallowSilentPairing (value) {
    mx.simpleMXMessage (mgr, "AllowSilentPairing", value);
}

exports.clearAllDevicePairings = function () {
    mx.simpleMXMessage (mgr, "PairedDeviceAction", "1");
}

exports.singlePairingOnly = function () {
    singlePairing("1");
}

exports.allowMultiplePairings = function () {
    singlePairing("2");
}

function singlePairing (value) {
    mx.simpleMXMessage (mgr, "SinglePairing", value);
}