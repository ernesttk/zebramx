var uiMgr = require('js/uiMgr/uiMgr.js');

uiMgr.setExtraLog(true);

//// only works on Android 10 and below
//// result can be found in the logs.
//uiMgr.queryAllSettings();

uiMgr.enableNetworkMonitorNotification();
uiMgr.disableNetworkMonitorNotification();

