/**
 * Created by zc1415926 on 2016/1/19.
 * TODO:keep the orginal extension of the named file not to specify
 */
var shell = require("shelljs/global");
var xlsx = require('node-xlsx');

var xlsxFileName = process.argv[2];
var dirPath = process.argv[3];
var extension = 'jpg';
if(process.argv[4])
{
    var extension = process.argv[4];
}

var sourceData = xlsx.parse(xlsxFileName)[0]['data'];


cd(dirPath);
for(i = 1; i < sourceData.length; i++)
{
    mv('-f', sourceData[i][4] + "." + extension, sourceData[i][0] + "." + extension );
}