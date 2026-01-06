#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/displaymgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'DisplayMgr';

const enable = "1";
const disable = "2";
var debug = false;

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
    var command = mx.buildCharacteristic(mgr, mx.buildParam("AdaptiveBrightness", "1"), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.enableAutorotate = function () {
    setAutorotate("Turn On");
}
exports.disableAutorotate = function () {
    setAutorotate("Turn Off");
}

function setAutorotate(value) {
    const useMX = "10.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("AutoRotate", value), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.stayAwakeOnPower = function () {
    stayAwake(enable);
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
