
// doc: https://techdocs.zebra.com/mx/SettingsMgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'SettingsMgr';

var debug = false; 

// set to true to get debug info in the log
exports.setExtraLog = function (value) {
	mx.setExtraLog (value);
    debug = value;
}

/*
 * Disable tethering control. Actually make the choice appear or disappear in the settings.
 */
exports.disableTetheringControl = function () {
   setTetheringControl("2")
}

/*
 * Enable tethering control. In effect make the selection visible in the settings.
 * In mobicontrol the agent can still prevent selecting it. 
 */
exports.enableTetheringControl = function () {
   setTetheringControl("1")
}

function setTetheringControl(value) {
    const useMX = "8.1";
	
    var command = mx.buildCharacteristic(mgr, mx.buildParam("TetheringandPortableHotspot", value), useMX);
    var response = mx.sendCommand(command);

    if (debug)
		mobicontrol.log.info("Response : " + response.toString());
}

exports.disableFlightMode = function () {
   setFlightMode("2")
}

exports.enableFlightMode = function () {
   setFlightMode("1")
}

function setFlightMode(value) {
    const useMX = "4.3";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("AirplaneMode", value), useMX);

    var response = mx.sendCommand(command);
	if (debug)
		mobicontrol.log.info("Response : " + response.toString());
}
