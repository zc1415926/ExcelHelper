/**
 * Created by ZC on 2016/1/30.
 */
var shell = require("shelljs");
var xlsx = require('node-xlsx');
//node内置库
var fs = require('fs');
var progress = require('progress');

function transform(filePath, destDir)
{


    //解析Excel文件
    var xlsxObject = xlsx.parse(filePath);
    //获取源数据
    var sourceData = xlsxObject[0]['data'];


    var progressBar = new progress('Transforming: [:bar] :percent', {
        incomplete: ' ',
        total: sourceData.length});



    //获取不带路径的纯文件名
    var pureFileName = filePath.split('\\')[filePath.split('\\').length -1];
    //构建导出文件的文件名，目前只能导出xlsx文件
    var outputFileName = 't_' + pureFileName + 'x';

    //构建目标数据表头
    var exportData = [["年级", "班级", "课程", "教师", "星期", "节次"]];

    var stuOrderNumMax = sourceData.length;

    for (var stuOrderNum = 2; stuOrderNum < stuOrderNumMax; stuOrderNum++) {

        //console.log(sourceData[stuOrderNum][0]);



        for(var j = 1; j < sourceData[stuOrderNum].length; j++){
            if(sourceData[stuOrderNum][j]){
                var subjectGradeClassArray = sourceData[stuOrderNum][j].split('\n');
              //  .

                var gradeClassArray = subjectGradeClassArray[1].split('.');

                var gradeData = '';
                switch (gradeClassArray[0]){
                    case '1':
                        gradeData = '一年级';
                        break;
                    case '2':
                        gradeData = '二年级';
                        break;
                    case '3':
                        gradeData = '三年级';
                        break;
                    case '4':
                        gradeData = '四年级';
                        break;
                    case '5':
                        gradeData = '五年级';
                        break;
                    case '6':
                        gradeData = '六年级';
                        break;
                    default:

                }

                var classData = gradeClassArray[1].replace('(', '').replace(')', '');

                //星期
                //console.log(sourceData[0][j]);

                exportData.push([
                    gradeData,
                    classData,
                    subjectGradeClassArray[0],
                    sourceData[stuOrderNum][0],
                    sourceData[0][j],
                    sourceData[1][j],]);
            }
        }


        //progressBar.tick();
    }


    //TODO:如果文件名中有"./“这种则就适应文件名，不过有可能在Linux下用吗？？？
    //导出目标数据到文件
    var exportObj = xlsx.build([{name: "worksheet", data: exportData}], {bookType: 'xlsx'});
    fs.writeFileSync(outputFileName , exportObj, 'binary');
    //将导出文件移动到导出路径
    shell.mv('-f', outputFileName, destDir);

    progressBar.tick(progressBar.total - progressBar.curr);
}

module.exports.transform = transform;