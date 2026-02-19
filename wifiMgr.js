#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/wifi

var mx = require('js/zebraMx/zebraMx.js');

const mgr = 'Wi-Fi';

var debug = false;

// set to true to get debug info in the log
exports.setExtraLog = function setExtraLog(value = true) {
	mx.setExtraLog (value);
    debug = value;
}

exports.removeSSID = function (SSID) {
    const useMX = "4.2";
    
    var networkAction = mx.buildCharacteristic("network-profile", mx.buildParam("SSID", SSID));
    var command = mx.buildCharacteristic(mgr, mx.buildParam("NetworkAction", "remove") + networkAction, useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.removeAllSSID = function () {
    const useMX = "4.2";
    
    var command = mx.buildCharacteristic(mgr, mx.buildParam("NetworkAction", "removeAll"), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}


