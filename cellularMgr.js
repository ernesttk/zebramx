#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/CellularMgr

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'CellularMgr';

exports.disableDataRoaming = function disableDataRoaming() {
    dataRoamingState("Disable");
}

exports.enableDataRoaming = function enableDataRoaming() {
    dataRoamingState("Enable");
}

function dataRoamingState(value) {
// MX 6.3
    var command = mx.buildCharacteristic(mgr, mx.buildParam("DataRoamingState", value));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}


exports.lockCellularDataUsage = function lockCellularDataUsage() {
    lockUnlockCellularData("2");
}

exports.unlockCellularDataUsage = function unlockCellularDataUsage() {
    lockUnlockCellularData("1");
}

function lockUnlockCellularData(value) {
// MX 6.3
    var command = mx.buildCharacteristic(mgr, mx.buildParam("CellularDataUsage", value));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.enableCellularData = function enableCellularData() {
    flipCellularData("Turn On");
}

exports.disableCellularData = function disableCellularData() {
    flipCellularData("Turn Off");
}

function flipCellularData(value) {
// MX 6.3
    var command = mx.buildCharacteristic(mgr, mx.buildParam("CellularDataState", value));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.delESimProfile = function delESimProfile (profileName) {
// mx 10.3
    var command = mx.buildParam("eSIMFeatures", "true") + 
        mx.buildCharacteristic("esim-feature", mx.buildParam("eSimProfile", "3") + mx.buildParam("ProfileNickname", profileName);

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.addESimProfile = function addESimProfile (profileName, activationcode) {
// mx 10.3
    var command = mx.buildParam("eSIMFeatures", "true") + 
        mx.buildCharacteristic("esim-feature", mx.buildParam("eSimProfile", "3") + mx.buildParam("ProfileNickname", profileName);

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}
