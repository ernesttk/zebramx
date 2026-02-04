#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/WirelessMgr

var mx = require('js/zebraMx/zebraMx.js');

const enable = "1";
const disable = "2";

const mgr = 'WirelessMgr';

var debug = false;

// set to true to get debug info in the log
exports.setExtraLog = function setExtraLog(value = true) {
	mx.setExtraLog (value);
    debug = value;
}

exports.disableBluetooth = function () {
    modifyBluetooth(disable);
}

exports.enableBluetooth = function () {
    modifyBluetooth(enable);
}

function modifyBluetooth(value) {
    const useMX = "4.2";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("Bluetooth", value), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.disableBluetoothState = function () {
    modifyBluetoothState(disable);
}

exports.enableBluetoothState = function () {
    modifyBluetoothState(enable);
}

function modifyBluetoothState(value) {
    const useMX = "4.2";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("BluetoothState", value));

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}
