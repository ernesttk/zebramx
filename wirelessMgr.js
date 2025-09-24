#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/WirelessMgr

const debug = true;
const enable = "1";
const disable = "2";

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'WirelessMgr';

exports.disableBluetooth = function disableBluetooth() {
    modifyBluetooth(disable);
}

exports.enableBluetooth = function enableBluetooth() {
    modifyBluetooth(enable);
}

function modifyBluetooth(value) {
    const useMX = "4.2";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("Bluetooth", value), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.disableBluetoothState = function disableBluetoothState() {
    modifyBluetoothState(disable);
}

exports.enableBluetoothState = function enableBluetoothState() {
    dataBluetoothState(enable);
}

function modifyBluetoothState(value) {
    const useMX = "4.2";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("BluetoothState", value));

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}
