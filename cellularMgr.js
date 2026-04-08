
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

exports.disableDataRoaming = function () {dataRoamingState(disable);}
exports.enableDataRoaming = function () {dataRoamingState(enable);}

function dataRoamingState(value) {
    const useMX = 6.3;
    var command = mx.buildCharacteristic(mgr, mx.buildParam("DataRoamingState", value), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.lockCellularDataUsage = function () {lockUnlockCellularData(disable);}
exports.unlockCellularDataUsage = function () {lockUnlockCellularData(enable);}

function lockUnlockCellularData(value) {
    const useMX = 4.3;
    var command = mx.buildCharacteristic(mgr, mx.buildParam("CellularDataUsage", value), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.enableCellularData = function () {flipCellularData(TurnOn);}
exports.disableCellularData = function () {flipCellularData(TurnOff);}

function flipCellularData(value) {
    const useMX = 6.3;
    var command = mx.buildCharacteristic(mgr, mx.buildParam("CellularDataState", value), useMX);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

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
