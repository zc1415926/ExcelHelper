/**
 * Created by zc1415926 on 2016/1/19.
 * TODO:keep the orginal extension of the named file not to specify
 */
var shell = require("shelljs");
var xlsx = require('node-xlsx');
var images = require('images');
var progress = require('progress');

var xlsxFileName = process.argv[2];
var dirPath = process.argv[3];
var extension;

var sourceData = xlsx.parse(xlsxFileName)[0]['data'];
var progressBar = new progress('Converting: [:bar] :percent', {
    incomplete: ' ',
    total: sourceData.length});

shell.cd(dirPath);
var noPhotoArray = [];
for(i = 1; i < sourceData.length; i++)
{
    if(shell.ls(sourceData[i][4]+"*").length >0)
    {
        extension = shell.ls(sourceData[i][4]+"*")[0].split('.')[1];

        //先缩放图片再移动图片效率高些
        images(sourceData[i][4] + "." + extension).resize(120).save(sourceData[i][4] + "." + extension);
        shell.mv('-f', sourceData[i][4] + "." + extension, sourceData[i][0] + "." + extension );
    }
    else
    {
        //console.log("缺少照片！\t" + sourceData[i][4]);
        noPhotoArray.push(sourceData[i][4]);
    }

    progressBar.tick();
}
progressBar.tick(progressBar.total - progressBar.curr);
console.log('\n');
noPhotoArray.forEach(function(data){
    console.log("缺少照片！\t" + data);
});