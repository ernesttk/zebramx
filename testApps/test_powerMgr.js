

var powerMgr = require('js/powerMgr/powerMgr.js');

powerMgr.setExtraLog(true);

// powerMgr.powerOff();  // with extraLog there is only the confirmation of the command send. there is no answer

powerMgr.reboot();  // with extraLog there is only the confirmation of the command send. There is no answer

powerMgr.OSupgrade('/sdcard/KLM/firmware/HE_FULL_UPDATE_11-49-09.00-RG-U00-STD-HEL-04.zip');

