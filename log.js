const fs = require('fs')
const logSetting = require('./config.json').logging;
function makeLog(data) {
if (logSetting == 0) {
    return;
} else if (logSetting == 1) {
    fs.appendFile('log.txt', `[${new Date().toLocaleString()}] ${data}\n`, (err) => {});    
} else if (logSetting == 2) {
    console.log(`[${new Date().toLocaleString()}] ${data}\n`);
} else {
    fs.appendFile('log.txt', `[${new Date().toLocaleString()}] ${data}\n`, (err) => {});    
    console.log(`[${new Date().toLocaleString()}] ${data}\n`);
};
/*
+ 0 - no logging
+ 1 - logging to a .txt file
+ 2 - logging into the console
+ 3 - logging into the console and into the .txt file 
*/
}

module.exports =  { 
    makeLog
 };