var fs = require('fs');
// var _ = require('lodash');

var fileList = [];
var MAX = 1000;
var DEST_FOLDER = './pics';
var cnt = 0;

var isExistCreDir = fs.existsSync(DEST_FOLDER);
console.log(isExistCreDir);
if (!isExistCreDir) {
    fs.mkdirSync(DEST_FOLDER);
    console.log('====Created directory pics');
}

function getDirList(currDir) {
    // console.log('Call getDirList : ' + currDir);
    var list = fs.readdirSync(currDir);
    // console.log(list);
    for (var i in list) {
        if (cnt >= MAX) {
            break;
        }
        // console.log(list[i]);
        // break;
        // console.log('////////');
        // console.log('currDIr : ' + currDir);
        // console.log(currDir + '/' + list[i]);
        var nextDir = currDir + '/' + list[i];
        var stats = fs.statSync(nextDir);
        cnt++;
        if (stats && stats.isDirectory()) {
            // console.log('>>>DIR : '+i+"/" + cnt + ":" + list[i]);
            if (list[i]) {
                // console.log('into the ' + list[i]);
                getDirList(nextDir);
            }
        } else {
            // console.log(">>FILE : " + cnt + ":" + nextDir);
            // currDir + list[i];
            fileList.push(nextDir);
        }
    }
    return fileList;
}

console.log('=====Start');
var movList = getDirList('.');
var fileCnt = 0;
for (var i in movList) {
    if (movList[i].indexOf('.jpg') || movList[i].indexOf('.png')) {
    	var orgFile = movList[i];
    	var destFileNm = DEST_FOLDER + '/' + movList[i].split('/').pop();
		fs.createReadStream(orgFile).pipe(fs.createWriteStream(destFileNm));
		fileCnt++;
    	// console.log(DEST_FOLDER + '/' + movList[i].split('/').pop());
        // fs.copyFile(moveList[i], DEST_FOLDER + '/' + movList[i].split('/').pop(), (err) => {
        //     if (err) throw err;
        // });
    }
}
console.log('Copied file count = ' + fileCnt);
console.log('=====End');