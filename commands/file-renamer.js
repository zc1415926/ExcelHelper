/**
 * Created by ZC on 2016/1/30.
 */
var xlsx = require('node-xlsx');
var progress = require('progress');
var shell = require('shelljs');

function rename(excelFilePath, dirPath)
{
    //Excel文件中，原文件名（或原文件名局部）所在列的列号
    var COL_NUM_LOOKING_FOR = 4;
    //Excel文件中，目标文件名所在列的列号
    var COL_NUM_RENAME_TO = 0;

    //从Excel文件中提取出源数据
    var sourceData = xlsx.parse(excelFilePath)[0]['data'];

    //初始化进度条
    var progressBar = new progress('Renaming: [:bar] :percent', {
        incomplete: ' ',
        total: sourceData.length});

    //进入工作目录
    shell.cd(dirPath);

    //文件的原文件名（或是有唯一性的部分文件名）、目标文件名
    var originFileName = "";
    var renameToFileName = "";

    //使用原文件名ls命令列出的文件列表
    var filesListArray = [];
    //使用原文件名没有找到任何文件时，把原文件名存入数组，统一输出信息
    var filesNotFindArray = [];

    for(i = 1; i < sourceData.length; i++)
    {
        //获取原文件名、目标文件名
        originFileName = sourceData[i][COL_NUM_LOOKING_FOR];
        renameToFileName = sourceData[i][COL_NUM_RENAME_TO];

        //使用原文件名ls命令列出文件列表
        filesListArray = shell.ls("*"+originFileName+"*");

        //如果当前文件夹中存在某个文件，包含当前原文件名，则对该文件进行重命名操作
        //TODO:处理有重复的情况，比如两个文件“张川（大）.jpg”和“张川（小）.jpg”在原文件名为“张川”时就会出现这个情况，这里的假定没有学生图片重名
        if(filesListArray.length == 1)
        {
            extension = filesListArray[0].split('.')[1];

            shell.mv('-f', filesListArray[0], renameToFileName + "." + extension );
        }
        else
        {
            filesNotFindArray.push(originFileName);
        }

        progressBar.tick();
    }

    //让进度条走到100%
    progressBar.tick(progressBar.total - progressBar.curr);

    filesNotFindArray.forEach(function(data){
        console.log("缺少照片！\t" + data);
    });
}

module.exports.rename = rename;