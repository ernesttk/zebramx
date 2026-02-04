#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/dataWedgeMgr

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'DataWedgeMgr';
const unchecked = "0";
const checked = "1";
const enable = "1";
const disable = "2";
const debug = false; // set to true to get debug info in the log

exports.setExtraLog = function (value = true) {
    mx.setExtraLog (value);
    debug = value;
}


exports.loadConfiguration= function loadConfiguration(profileName) {
    const useMX = 10.1;

    var command = mx.buildCharacteristic(mgr, mx.buildParam("ConfigurationFile", profileName), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.allowControlAPIs = function allowControlAPIs() {
    // all apps can control DataWedge using intents
    controllingAPIs(unchecked);
}

exports.disableControlAPIs = function disableControlAPIs() {
    // only whitelisted apps (see accessmgr)can control DataWedge using intents
    controllingAPIs(checked);
}

controllingAPIs = function controllingAPIs(value) {
    const useMX = 10.1;
    var command = mx.buildCharacteristic(mgr, mx.buildParam("ControllingAPIs", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.enableManualDataWedge = function enableManualDataWedge() {
    ManualConfiguration(enable);
}

exports.disableManualDataWedge = function disableManualDataWedge() {
    ManualConfiguration(disable);
}

ManualConfiguration = function ManualConfiguration(value) {
    const useMX = 9.2;
    var command = mx.buildCharacteristic(mgr, mx.buildParam("ManualConfiguration", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}
