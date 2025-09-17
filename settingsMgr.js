#!/usr/bin/env js

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'SettingsMgr';

/*
 * Disable tethering control. Actually make the choice disappear in the settings.
 */
exports.disableTetheringControl = function disableTetheringControl() {
   setTetheringControl("2")
}

/*
 * Enable tethering control. In effect make the selection visible in the settings.
 * In mobicontrol the agent can still prevent selecting it. 
 */
exports.enableTetheringControl = function enableTetheringControl() {
   setTetheringControl("1")
}

function setTetheringControl(value) {
    var command = mx.buildCharacteristic(mgr, mx.buildParam("TetheringandPortableHotspot", value));

    var response = mx.sendCommand(command);
    mobicontrol.log.debug("Response : " + response.toString());
}

exports.disableFlightMode = function disableFlightMode() {
   setFlightMode("2")
}

exports.enableFlightMode = function enableFlightMode() {
   setFlightMode("1")
}

function setFlightMode(value) {
    var command = mx.buildCharacteristic(mgr, mx.buildParam("AirplaneMode", value));

    var response = mx.sendCommand(command);
    mobicontrol.log.debug("Response : " + response.toString());
}