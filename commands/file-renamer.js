/**
 * Created by ZC on 2016/1/30.
 */
var xlsx = require('node-xlsx');
var progress = require('progress');
var shell = require('shelljs');

function rename(excelFilePath, dirPath)
{
    var sourceData = xlsx.parse(excelFilePath)[0]['data'];
    var progressBar = new progress('Renaming: [:bar] :percent', {
        incomplete: ' ',
        total: sourceData.length});

    shell.cd(dirPath);

    var noPhotoArray = [];
    //在表格中获取的，需要重命名文件的原来的文件名（或是有唯一性的部分文件名）
    var currentSourceData = "";

    for(i = 1; i < sourceData.length; i++)
    {
        currentSourceData = sourceData[i][4];

        //这里的假定没有学生图片重名（文件名本来就不能重名）
        if(shell.ls(currentSourceData+"*").length >0)
        {
            extension = shell.ls(currentSourceData+"*")[0].split('.')[1];


            shell.mv('-f', currentSourceData + "." + extension, sourceData[i][0] + "." + extension );
        }
        else
        {
            //console.log("缺少照片！\t" + sourceData[i][4]);
            noPhotoArray.push(currentSourceData);
        }

        progressBar.tick();
    }
    progressBar.tick(progressBar.total - progressBar.curr);

    noPhotoArray.forEach(function(data){
        console.log("缺少照片！\t" + data);
    });
}

module.exports.rename = rename;