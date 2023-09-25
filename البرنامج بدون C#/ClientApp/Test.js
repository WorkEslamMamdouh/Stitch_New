"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
debugger;
var fs_1 = require("fs");
function get_Data(nameTxt) {
    debugger;
    var str = '/SavePath/Dropbox/';
    var jsonData = '';
    try {
        jsonData = fs_1.readFileSync(str + nameTxt + '.txt', 'utf-8');
    }
    catch (error) {
        return 'Error';
    }
    var base64Encoded = jsonData;
    var base64Decoded;
    var data = Buffer.from(base64Encoded, 'base64');
    base64Decoded = data.toString('utf-8');
    return base64Decoded;
}
get_Data("Settings/Settings_Users");
//# sourceMappingURL=Test.js.map