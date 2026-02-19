#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/enterprisekeyboardmgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'EnterpriseKeyboardMgr';

const enable = "1";
const disable = "2";
var debug = false;

// set to true to get debug info in the log
exports.setExtraLog = function (value = true) {
    mx.setExtraLog (value);
    debug = value;
}

const specifyHeight = "1"
const specifyWidth = "1"
const systemDefault = "2"

exports.setHeight = function (heightValue) {
    // heigthValue in percentage of default value of the keyboard (25 to 100)
    // default value is different from one device to another but depends mostly on screen size
    const useMX = "11.5";

    var setHeight = mx.buildParam("KeyboardCustomHeight", heightValue);
    var command = mx.buildCharacteristic(mgr, mx.buildParam("KeyboardHeight", specifyHeight) + setHeight, useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.setDefaultHeight = function () {
    const useMX = "11.5";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("KeyboardHeight", systemDefault), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.setWidth = function (widthValue) {
    // widthValue in percentage of default value of the keyboard (25 to 100)
    // default value is different from one device to another but depends mostly on screen size
    const useMX = "11.5";
    var setWidth = mx.buildParam("KeyboardCustomWidth", widthValue);
    var command = mx.buildCharacteristic(mgr, mx.buildParam("KeyboardWidth", specifyWidth) + setWidth, useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.setDefaultWidth = function () {
    const useMX = "11.5";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("KeyboardWidth", systemDefault), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.AutoCapitalization = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("AutoCapitalization", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.AutoCorrection = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("AutoCorrection", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.BlockOffensiveWords = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("BlockOffensiveWords", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.DoubleSpacePeriod = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("DoubleSpacePeriod", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.FlickInput = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("Flick", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.KeyLongPressDelay = function (value) {
    // value = int between 100 and 700 (in milliseconds)
    // set to 0 to disable long press
    const useMX = "6.0";

    var keypressDelay = mx.buildParam("KeyLongPressDelay", value)
    var command = mx.buildCharacteristic(mgr, mx.buildParam("KeyLongPressDelayMode", "1") + keypressDelay, useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.suggestContactNames = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "7.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("SuggestContactNames", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.VibrateOnKeypress = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("VibrateOnKeypress", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.SoundOnKeypress = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("SoundOnKeypress", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.ShowScanTab = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("ShowScanTab", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}


exports.ShowSymbolTab = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "7.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("ShowSymbolTab", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.ShowVoiceTab = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "7.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("ShowVoiceTab", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.ShowNumericTab = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "7.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("ShowNumericTab", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}
exports.ShowAlphaNumericTab = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "7.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("ShowAlphaNumericTab", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.SelectAlphaNumericTab = function () {
    SelectPreferTab("2");
}
exports.SelectNumericTab = function () {
    SelectPreferTab("1");
}
exports.SelectSymbolTab = function () {
    SelectPreferTab("3");
}
exports.SelectScanTab = function () {
    SelectPreferTab("4");
}
exports.SelectVoiceTab = function () {
    SelectPreferTab("5");
}

function SelectPreferTab (tabNameNo) {
    // tabName = "Numeric" = "1", "AlphaNumeric" = "2", "Symbol" = "3", "Scan" = "4", "Voice" = "5"
    // tabs must be enabled before choice
    const useMX = "7.1";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("SelectPreferTab", tabNameNo), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.enableEnterpriseKeyboard = function () {
    var uiMgr = require('js/zebraMx/uiMgr.js');
    uiMgr.setInputMethod('com.symbol.mxmf.csp.enterprisekeyboard');
}
