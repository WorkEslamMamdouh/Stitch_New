function GetData(Name_txt) {
    debugger
    var Str = "/SavePath/Dropbox/";
    var jsonData = "";
    try {
        jsonData = require('fs').readFileSync(Str + Name_txt + ".txt", 'utf8');
    } catch (error) {
        return "Error";
    }
    var base64Encoded = jsonData;
    var base64Decoded;
    var data = Buffer.from(base64Encoded, 'base64');
    base64Decoded = data.toString('utf8');
    return base64Decoded;
}


function SetData(Name_txt, Model) {
    var originalString = Model;
    var bytes = new TextEncoder().encode(originalString);
    var base64EncodedString = btoa(String.fromCharCode.apply(null, bytes));
    var Str = "/SavePath/Dropbox/";
    var path = encodeURIComponent(Str + Name_txt + ".txt");
    var url = "data:text/plain;charset=utf-8," + base64EncodedString;
    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", path);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function Get_Data(Name_txt) {
    debugger
    var jsonData = GetData(Name_txt);
    return JSON.stringify(jsonData);
}
