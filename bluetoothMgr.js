#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/bluetoothmgr

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'BluetoothMgr';
var debug = false;


exports.setExtraLog = function setExtraLog(value = true) {
    debug
    mx.setExtraLog (value);
}

exports.silentPairingProfile = function (deviceName, deviceAddress) {
    const useMX = "10.3";
    
    var SilentPairingDeviceDetails = mx.buildParam("SilentPairingDeviceDetails",
        mx.buildParam("SilentPairingName", deviceName) +
        mx.buildParam("SilentPairingUAP", deviceAddress)
    );

    var pairing = mx.buildParam("SinglePairing", "0") +
        mx.buildParam("SilentPairingAction", "1") +
        mx.buildParam("MandatoryIdentifier", "1") +
        SilentPairingDeviceDetails +
        mx.buildParam("IsTrustedDeviceRule", "1") +
        mx.buildParam("IsSilentPairingRule", "1");
        
    var command = mx.buildCharacteristic(mgr, mx.buildParam("SinglePairingProfile", pairing), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.clearSilentPairingList = function () {
    const useMX = "7.0";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("SilentPairingAction", "3"), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.allowPairing = function () {
    allowDisallowPairing("1");
}

exports.disallowPairing = function () {
    allowDisallowPairing("2");
}

exports.allowTrustedOnlyPairing = function () {
    allowDisallowPairing("3", "10.2");
}

function allowDisallowPairing (value, useMX = "5.1") {
    var command = mx.buildCharacteristic(mgr, mx.buildParam("AllowPairing", value), useMX);
    var response = mx.sendCommand(command); 
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.allowSilentPairing = function () {
    allowDisallowSilentPairing("1");
}

exports.disallowSilentPairing = function () {
    allowDisallowSilentPairing("2");
}

function allowDisallowSilentPairing (value) {
    const useMX = "7.0"
    var command = mx.buildCharacteristic(mgr, mx.buildParam("AllowSilentPairing", value), useMX);
    var response = mx.sendCommand(command); 
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}
