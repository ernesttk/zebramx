
// doc: https://techdocs.zebra.com/mx/CellularMgr

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'CellularMgr';

// these are just helpers. Unfortunatly, and this is probably from before Zebra, these values are not really
// consistent and should be checked for each specific xml call.
const enable = "1";
const disable = "2";
const TurnOn = enable;
const TurnOff = disable;

var debug = false; // set to true to get debug info in the log
exports.setExtraLog = function (value) {
    debug = value;
    mx.setExtraLog (value);
}

exports.disableDataRoaming = function () { mx.simpleMXMessage(mgr, "DataRoamingState", disable); }
exports.enableDataRoaming = function () { mx.simpleMXMessage(mgr, "DataRoamingState", enable); }

exports.lockCellularDataUsage = function () { mx.simpleMXMessage(mgr, "CellularDataUsage", disable); }
exports.unlockCellularDataUsage = function () { mx.simpleMXMessage(mgr, "CellularDataUsage", enable); }

exports.enableCellularData = function () { mx.simpleMXMessage(mgr, "CellularDataState", TurnOn); }
exports.disableCellularData = function () { mx.simpleMXMessage(mgr, "CellularDataState", TurnOff); }

exports.lockBackgroundDataUsage = function () { mx.simpleMXMessage(mgr, "BackgroundDataUsage", enable); }
exports.unlockBackgroundDataUsage = function () { mx.simpleMXMessage(mgr, "BackgroundDataUsage", disable); }

exports.enableBackgroundDataState = function () { mx.simpleMXMessage(mgr, "BackgroundDataState", enable); }
exports.disableBackgroundDataState = function () { mx.simpleMXMessage(mgr, "BackgroundDataState", disable); }

exports.delESimProfile = function delESimProfile (profileName) {
    const useMX = 10.3;
    var command = mx.buildParam("eSIMFeatures", "true") + 
        mx.buildCharacteristic("esim-feature", mx.buildParam("eSimProfile", "3") + mx.buildParam("ProfileNickname", profileName), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.addESimProfile = function addESimProfile (profileName, activationcode) {
    const useMX = 10.3;
    var command = mx.buildParam("eSIMFeatures", "true") + 
        mx.buildCharacteristic("esim-feature", mx.buildParam("eSimProfile", "3") + mx.buildParam("ProfileNickname", profileName), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}
