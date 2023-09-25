debugger
import { readFileSync } from 'fs';

function get_Data(nameTxt: string): string {
    debugger
    const str = '/SavePath/Dropbox/';
    let jsonData = '';
    try {
        jsonData = readFileSync(str + nameTxt + '.txt', 'utf-8');
    } catch (error) {
        return 'Error';
    }
    const base64Encoded = jsonData;
    let base64Decoded;
    const data = Buffer.from(base64Encoded, 'base64');
    base64Decoded = data.toString('utf-8');
    return base64Decoded;
}


get_Data("Settings/Settings_Users")