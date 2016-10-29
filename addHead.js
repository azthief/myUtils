/*
Add Header
*/

var fs = require('fs');
var config = {
	header: "'use strict'",
	ext: 'js'
};

var targetFileNm = process.argv[2];

fs.readdir(__dirname, function(err, files) {
	if(err) throw err;
	files.forEach(function(fileNm) {
		fs.stat(__dirname  + '/' + fileNm, function(err, stats){
			if(err) throw err;
			var fileExt = fileNm.substring(fileNm.length - 2, fileNm.length);
			if(stats.isFile()) {
				var file = fs.readFileSync(__dirname  + '/' + fileNm, 'utf-8');

				var re = new RegExp(config.header);
				if(file.search(re) === -1 && fileExt === config.ext) {
					// fs.writeFileSync(fileNm, '\'use strict\'\n\r' + file);
					console.log(fileNm + ' added header : ' + config.header);
				} else {
					console.log(fileNm + ' already has header.');
				}
			}
		});

	});

});

