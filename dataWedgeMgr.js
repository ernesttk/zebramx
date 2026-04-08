// doc: https://techdocs.zebra.com/mx/dataWedgeMgr

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'DataWedgeMgr';
const unchecked = "0";
const checked = "1";
const enable = "1";
const disable = "2";
var debug = false; // set to true to get debug info in the log

exports.setExtraLog = function (value) {
    mx.setExtraLog (value);
    debug = value;
}

exports.loadConfiguration = function (profileName) {
    mx.simpleMXMessage (mgr, "ConfigurationFile", profileName); 
}

exports.allowControlAPIs = function () {
    // all apps can control DataWedge using intents
    mx.simpleMXMessage (mgr, "ControllingAPIs", unchecked);
}

exports.disableControlAPIs = function () {
    // only whitelisted apps (see accessmgr)can control DataWedge using intents
    mx.simpleMXMessage (mgr, "ControllingAPIs", checked);
}

exports.enableManualDataWedge = function () {mx.simpleMXMessage (mgr, "ManualConfiguration", enable);}
exports.disableManualDataWedge = function () {mx.simpleMXMessage (mgr, "ManualConfiguration", disable);}


exports.enableAutoImporting = function () {mx.simpleMXMessage (mgr, "AutoImporting", "1");}
exports.disableAutoImporting = function () {mx.simpleMXMessage (mgr, "AutoImporting", "0");}

