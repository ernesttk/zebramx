#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/uimgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'UiMgr';

const enable = "1";
const disable = "2";
var debug = false;

exports.setExtraLog = function setExtraLog (value) {
    mx.setExtraLog (value)
    debug = value;
}

exports.setInputMethod = function (imePackage) {
// The only usage of this function I can think of is when enabling the Enterprise Keyboard from Zebra.
// It might be obvious, but this should only be called after the app is installed.
    const useMX = "10.1";

    var inputMethodDetails = mx.buildCharacteristic("InputMethodDetails", 
        mx.buildParam("InputMethodOption", "4") + 
        mx.buildParam("InputMethodPackageName", imePackage) +
        mx.buildParam("InputMethodClassName", "com.android.inputmethod.latin.LatinIME")
    );
    var command = mx.buildCharacteristic(mgr, mx.buildParam("InputMethodAction", "1") + inputMethodDetails, useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.enableNetworkMonitorNotification = function () {
    mx.simpleMXMessage(mgr, "NetworkMonitorNotification", "10.1", "1");
//    setNetworkMonitorNotification("1");
}

exports.disableNetworkMonitorNotification = function () {
    mx.simpleMXMessage(mgr, "NetworkMonitorNotification", "10.1", "2");
}

function setNetworkMonitorNotification (value) {
    const useMX = "10.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("NetworkMonitorNotification", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.enableAutoCorrectUsage = function () {
    setAutoCorrectUsage(enable);
}

exports.disableAutoCorrectUsage = function () {
    setAutoCorrectUsage(disable);
}

function setAutoCorrectUsage(value) {
    const useMX = "10.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("AutoCorrectUsage", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.queryAllSettings = function () {
    // With android 11 and above this call will return a Null pointer exception.
    if (mobicontrol.os.apiLevel >= 30) {
        mobicontrol.log.error("UiMgr.queryAllSettings is not supported on Android 11 and above.");
        return;
    }
    var command = '<characteristic-query type="UiMgr"/>';
    var response = mx.sendQuery(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}
