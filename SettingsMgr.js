#!/usr/bin/env js

var mx=importModule('zebraMX/zebraMX');
const mgr = 'SettingsMgr';

exports.disableTetheringControl = function disableTetheringControl() {
   setTetheringControl("2")
}

exports.enableTetheringControl = function enableTetheringControl() {
   setTetheringControl("1")
}

function setTetheringControl(value) {
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("TetheringandPortableHotspot", value));

    var response = mx.sendCommand(c);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.disableFlightMode = function disableFlightMode() {
   setFlightMode("2")
}

exports.enableFlightMode = function enableFlightMode() {
   setFlightMode("1")
}

function setFlightMode(value) {
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("AirplaneMode", value));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}