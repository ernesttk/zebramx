#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/displaymgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'DisplayMgr';

const enable = "1";
const disable = "2";
var debug = false;

// set to true to get debug info in the log
exports.setExtraLog = function (value = true) {
    mx.setExtraLog (value);
    debug = value;
}

exports.setDisplayTimeout = function (timeoutSeconds) {
    const useMX = "4.3";
    // common values is 300 -> 5 minutes
    var command = mx.buildCharacteristic(mgr, mx.buildParam("TimeoutInterval", timeoutSeconds));

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.setBrightnessLevel = function (level) {
    const useMX = "10.2";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("BrightnessLevel", level), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.enableAutoBrightness = function () {
    const useMX = "10.2";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("Adaptivebrightness", "1"), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.enableAutorotate = function () {
    setAutorotate("1");
}
exports.disableAutorotate = function () {
    setAutorotate("2");
}

function setAutorotate(value) {
    const useMX = "10.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("Autorotate", value), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.forceToPortrait = function () {
    lockedOrientation("0");
}

exports.forceToLandscapeLeft = function () {
    lockedOrientation("1");
}

exports.forceToPortraitInverted = function () {
    lockedOrientation("2");
}

exports.forceToLandscapeRight = function () {
    lockedOrientation("3");
}


function lockedOrientation(orientation) {
    const useMX = "10.5";

    exports.disableAutorotate ();

    var command = mx.buildCharacteristic(mgr, mx.buildParam("LockedOrientation", orientation), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.allowSleepOnPower = function () {
    stayAwake(disable);
}

function stayAwake(value) {
    const useMX = "7.2";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("StayAwake", value), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}
