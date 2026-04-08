// doc: https://techdocs.zebra.com/mx/enterprisekeyboardmgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'EnterpriseKeyboard';

const enable = "1";
const disable = "2";
var debug = false;

// set to true to get debug info in the log
exports.setExtraLog = function (value) {
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

exports.enableAutoCapitalization = function (){
    autoCapitalization(enable);
}
exports.disableAutoCapitalization = function () {
    autoCapitalization(disable);
}
function autoCapitalization (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    mx.simpleMXMessage(mgr, "AutoCapitalization", value, useMX);
}

exports.enableAutoCorrection = function () {
    enableDisableAutoCorrection (enable);
}
exports.disableAutoCorrection = function () {
    enableDisableAutoCorrection (disable);
}
function enableDisableAutoCorrection (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    mx.simpleMXMessage(mgr, "AutoCorrection", value, useMX);
}

exports.enableBlockOffensiveWords = function () {
    blockAllowOffensiveWords(enable);
}
exports.disableBlockOffensiveWords = function () {
    blockAllowOffensiveWords(disable);
}
function blockAllowOffensiveWords (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    mx.simpleMXMessage(mgr, "BlockOffensiveWords", value, useMX);
}

exports.enableDoubleSpacePeriod = function () {
    doubleSpacePeriod(enable);
}
exports.disableDoubleSpacePeriod = function () {
    doubleSpacePeriod(disable);
}

function doubleSpacePeriod (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("DoubleSpacePeriod", value), useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.enableFlickInput = function () {
    flickInput(enable);
}
exports.disableFlickInput = function () {
    flickInput(disable);
}
function flickInput (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.1";
    mx.simpleMXMessage(mgr, "Flick", value, useMX);
}

exports.keyLongPressDelay = function (value) {
    // value = int between 100 and 700 (in milliseconds)
    // set to 0 to disable long press
    const useMX = "6.0";

    var keypressDelay = mx.buildParam("KeyLongPressDelay", value)
    var command = mx.buildCharacteristic(mgr, mx.buildParam("KeyLongPressDelayMode", "1") + keypressDelay, useMX);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}

exports.enableSuggestContactNames = function () {
    suggestContactNames (enable);
}
exports.disableSuggestContactNames = function () {
    suggestContactNames (disable);
}

function suggestContactNames (value) {
    // value = enable "1" / disable "2"
    const useMX = "7.1";
    mx.simpleMXMessage(mgr, "SuggestContactNames", value, useMX);
}

exports.enableVibrateOnKeypress = function () {
    enableDisableVibrateOnKeypress (enable);
}
exports.disableVibrateOnKeypress = function () {
    enableDisableVibrateOnKeypress (disable);
}

function enableDisableVibrateOnKeypress (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    mx.simpleMXMessage(mgr, "VibrateOnKeypress", value, useMX);
}

exports.enableSoundOnKeypress = function () {
    enableDisableSoundOnKeypress(enable);
}
exports.disableSoundOnKeypress = function () {
    enableDisableSoundOnKeypress(disable);
}
function enableDisableSoundOnKeypress (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    mx.simpleMXMessage(mgr, "SoundOnKeypress", value, useMX);
}

exports.enableNextWordSuggestions = function () {
    nextWordSuggestions(enable);
}
exports.disableNextWordSuggestions = function () {
    nextWordSuggestions(disable);
}
function nextWordSuggestions (value) {
    // value = enable "1" / disable "2"
    const useMX = "7.1";
    mx.simpleMXMessage(mgr, "NextWordSuggestions", value, useMX);
}

exports.tabsNavigationMode = function () {
    navigationMode("1");
}
exports.keysNavigationMode = function () {
    navigationMode("2");
}
function navigationMode (value) {
    // value = tab navigation "1" / keys navigation "2"
    const useMX = "7.1";
    mx.simpleMXMessage(mgr, "NavigationMode", value, useMX);
}

exports.telephoneNumericLayoutMode = function () {
    numericLayoutMode("1");
}
exports.calculatorNumericLayoutMode = function () {
    numericLayoutMode("2");
}
function numericLayoutMode (value) {
    // value = telephone numeric "1" / alpha-numeric "2"
    const useMX = "7.1";
    mx.simpleMXMessage(mgr, "NumericLayoutMode", value, useMX);
}

exports.enableShowCorrectionSuggestions = function () {
    showCorrectionSuggestions(enable);
}
exports.disableShowCorrectionSuggestions = function () {
    showCorrectionSuggestions(disable);
}
function showCorrectionSuggestions (value) {
    // value = enable "1" / disable "2"
    const useMX = "10.1";
    mx.simpleMXMessage(mgr, "ShowCorrectionSuggestions", value, useMX);
}

exports.enablePopupOnKeypress = function () {
    enableDisablePopupOnKeypress(enable);
}
exports.disablePopupOnKeypress = function () {
    enableDisablePopupOnKeypress(disable);
}
function enableDisablePopupOnKeypress (value) {
    // value = enable "1" / disable "2"
    const useMX = "10.1";
    mx.simpleMXMessage(mgr, "PopupOnKeypress", value, useMX);
}

exports.enableVoiceInputKey = function () {
    enableDisableVoiceInputKey(enable);
}
exports.disableVoiceInputKey = function () {
    enableDisableVoiceInputKey(disable);
}
function enableDisableVoiceInputKey (value) {
    // value = enable "1" / disable "2"
    const useMX = "10.1";
    mx.simpleMXMessage(mgr, "VoiceInputKey", value, useMX);
}

exports.showScanTab = function () {
        showHideScanTab(enable);
}
exports.hideScanTab = function () {
        showHideScanTab(disable);
}

function showHideScanTab (value) {
    // value = enable "1" / disable "2"
    const useMX = "6.0";
    mx.simpleMXMessage(mgr, "ShowScanTab", value, useMX);
}

exports.showSymbolTab = function (value) {
    showHideSymbolTab (enable)
}
exports.hideSymbolTab = function (value) {
    showHideSymbolTab (disable)
}

function showHideSymbolTab (value) {
    // value = enable "1" / disable "2"
    const useMX = "7.1";
    mx.simpleMXMessage(mgr, "ShowSymbolTab", value, useMX);
}

exports.hideVoiceTab = function () {
    enableDisableVoiceTab(disable);
}

exports.showVoiceTab = function () {
    enableDisableVoiceTab(enable);
}

function enableDisableVoiceTab (value) {
    // value = enable "1" / disable "2"
    const useMX = "7.1";
    mx.simpleMXMessage(mgr, "ShowVoiceTab", value, useMX);
}


exports.showNumericTab = function () {
    showHideNumericTab(enable);
}
exports.hideNumericTab = function () {
    showHideNumericTab(disable);
}

function showHideNumericTab (value) {
    // value = enable "1" / disable "2"
    const useMX = "10.1";
    mx.simpleMXMessage(mgr, "ShowNumericTab", value, useMX);
}

exports.showAlphaNumericTab = function (value) {
    // value = enable "1" / disable "2"
    const useMX = "7.1";
    mx.simpleMXMessage(mgr, "ShowAlphaNumericTab", value, useMX);
}

exports.selectAlphaNumericTab = function () {
    selectPreferTab("2");
}
exports.selectNumericTab = function () {
    selectPreferTab("1");
}
exports.selectSymbolTab = function () {
    selectPreferTab("3");
}
exports.selectScanTab = function () {
    selectPreferTab("4");
}
exports.selectVoiceTab = function () {
    selectPreferTab("5");
}

function selectPreferTab (tabNameNo) {
    // tabName = "Numeric" = "1", "AlphaNumeric" = "2", "Symbol" = "3", "Scan" = "4", "Voice" = "5"
    // tabs must be enabled before choice
    const useMX = "10.1";
    mx.simpleMXMessage(mgr, "SelectPreferTab", tabNameNo);
}

exports.enableEnterpriseKeyboard = function () {
    var uiMgr = require('js/zebraMx/uiMgr.js');
    uiMgr.setInputMethod('com.symbol.mxmf.csp.enterprisekeyboard');
}
