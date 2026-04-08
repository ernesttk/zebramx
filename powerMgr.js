// doc: https://techdocs.zebra.com/mx/powermgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'PowerMgr';

const enable = "1";
const disable = "2";
var debug = false;

exports.setExtraLog = function (value) {
    mx.setExtraLog(value)
	debug = value;
}

exports.sleep = function () {
	// sleep is like clicking once on the power button. Screen goes off, and device conserves power.
	resetAction("1");
}

exports.reboot = function () {
	resetAction("4");
	// After restart an error is reported that the system is currently busy... starting up.
}

exports.enterpriseReset = function () {
	resetAction("5");
}

exports.factoryReset = function () {
	resetAction("6");
}

exports.fullDeviceWipe = function () {
	resetAction("7");
}

exports.OSupgrade = function (OSfileName) {
	// file : full path to the update zip file in string format (ie not an mobicontrol file object).
	// Note zebra recommends placing file in '/data/tmp/public'. Following Android policy, this folder will remain accesible in the future.
	fileParams = mx.buildCharacteristic("file-details", mx.buildParam("ZipFile", OSfileName));

	resetAction("10", "8.1", fileParams);
}

exports.OSDowngrade = function (OSfileName) {
	// file : full path to the update zip file in string format (ie not an mobicontrol file object).
	fileParams = mx.buildCharacteristic("file-details", mx.buildParam("ZipFile", OSfileName));

	resetAction("11", "10.1", fileParams);
}

exports.cancelOSUpgradeIfPossible = function () {
	resetAction("14");
}

exports.powerOff = function () {
	resetAction("15", "13.1");
	// there is no answer unless DSD is lower than 13.1.
}

function resetAction(value, useMX = "8.1", extraParams = '') {
    var command = mx.buildCharacteristic(mgr, mx.buildParam("ResetAction", value) + extraParams, useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Raw response : " + response.toString());
}




