#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/displaymgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'DisplayMgr';

const enable = "1";
const disable = "2";
const debug = false;

exports.setDisplayTimeout = function setDisplayTimeout(timeoutSeconds) {
    const useMX = "4.3";
    // common values is 300 -> 5 minutes
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("TimeoutInterval", timeoutSeconds));

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.setBrightnessLevel = function setBrightnessLevel(level) {
    const useMX = "10.2";
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("BrightnessLevel", level), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.enableAutoBrightness = function enableAutoBrightness() {
    const useMX = "10.2";
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("AdaptiveBrightness", "1"), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.enableAutorotate = function enableAutorotate() {
    setAutorotate("Turn On");
}
exports.disableAutorotate = function disableAutorotate() {
    setAutorotate("Turn Off");
}

function setAutorotate(value) {
    const useMX = "10.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParamXML("AutoRotate", value), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.stayAwakeOnPower = function stayAwakeOnPower() {
    stayAwake(enable);
}
exports.notStayAwake = function notStayAwake() {
    stayAwake(disable);
}
function stayAwake(value) {
    const useMX = "7.2";
    var command = mx.buildCharacteristic(mgr, mx.buildParamXML("StayAwake", value), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}