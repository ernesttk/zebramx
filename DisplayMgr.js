#!/usr/bin/env js

var mx=importModule('zebraMX/zebraMX');
const mgr = 'DisplayMgr';

exports.setDisplayTimeout = function setDisplayTimeout(timeoutSeconds) {
// MX 4.3
// common values is 300 -> 5 minutes
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("TimeoutInterval", timeoutSeconds));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.setBrightnessLevel = function setBrightnessLevel(level) {
// MX 10.2
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("BrightnessLevel", level));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.enableAutoBrightness = function enableAutoBrightness() {
// MX 10.2

    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("AdaptiveBrightness", "1"));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.enableAutorotate = function enableAutorotate() {
    setAutorotate("1");
}
exports.disableAutorotate = function disableAutorotate() {
    setAutorotate("2");
}

function setAutorotate(value) {
// MX 10.1
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("AutoRotate", value));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.stayAwakeOnPower = function stayAwakeOnPower() {
    stayAwake("1");
}
exports.notStayAwake = function notStayAwake() {
    stayAwake("2");
}
function stayAwake(value) {
// MX 7.2
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("StayAwake", value));


    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}