/**
 * Created by zc1415926 on 2016/1/19.
 * TODO:keep the orginal extension of the named file not to specify
 */
var shell = require("shelljs");
var xlsx = require('node-xlsx');
var images = require('images');

var xlsxFileName = process.argv[2];
var dirPath = process.argv[3];
var extension;

var sourceData = xlsx.parse(xlsxFileName)[0]['data'];


shell.cd(dirPath);

for(i = 1; i < sourceData.length; i++)
{
    if(shell.ls(sourceData[i][4]+"*").length >0)
    {
        extension = shell.ls(sourceData[i][4]+"*")[0].split('.')[1];

        //先缩放图片再移动图片效率高些
        images(sourceData[i][4] + "." + extension).size(120);
        shell.mv('-f', sourceData[i][4] + "." + extension, sourceData[i][0] + "." + extension );
    }
    else
    {
        console.log("缺少照片！\t" + sourceData[i][4]);
    }
}