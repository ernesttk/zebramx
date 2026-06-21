var enterpriseKeyboard = require ('js/enterpriseKeyboardMgr/enterpriseKeyboardMgr.js');

enterpriseKeyboard.setExtraLog(true);

enterpriseKeyboard.showNumericTab();
enterpriseKeyboard.disableSuggestContactNames();

enterpriseKeyboard.showSymbolTab();

enterpriseKeyboard.disableAutoCapitalization();
enterpriseKeyboard.disableAutoCorrection();
enterpriseKeyboard.blockOffensiveWords();
