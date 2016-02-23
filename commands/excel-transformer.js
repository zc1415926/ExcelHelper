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
    var exportData = [["学号", "入学年度", "年级", "班级", "姓名", "密码", "性别", "家庭住址", "学籍号", "家长姓名", "班主任"]];

    /**
     * 以下是构建表内数据部分
     * */
    //获取纯文件名使用”-“分割的的数组，如从2010-12.xls中分出“2010”和“12.xls”
    var fileNameArray = pureFileName.split("-");
    //获取文件名中班级号码，如从“12.xls”中取得数字部分
    var getClassRegExp = new RegExp(/[0-9]*/);
    var classNum = fileNameArray[1].match(getClassRegExp)[0];

    //通过计算得到学号
    var stuId = "";
    //最后一行的行号
    var stuOrderNumMax = sourceData.length;

    for (var stuOrderNum = 1; stuOrderNum < stuOrderNumMax; stuOrderNum++) {
        //学生的学号=入学年份+班级号码（如是个位数，则前边补“0”）+学生序号（如是个位数，则前边补“0”）
        stuId = fileNameArray[0]
            + (classNum.length < 2 ? "0" + classNum : classNum)
            + (stuOrderNum < 10 ? "0" + stuOrderNum : stuOrderNum);

        exportData.push([
            stuId,                                      //学号
            fileNameArray[0],                           //入学年入学
            (2016 - fileNameArray[0]).toString(),   //年级
            classNum,                                   //班级
            sourceData[stuOrderNum][1],                 //姓名
            "123456",                                   //密码
            sourceData[stuOrderNum][4],                 //性别
            "地球",                                     //家庭住址
            sourceData[stuOrderNum][0],                 //学籍号
            "家长",                                     //家长姓名
            "班主任"                                    //班主任
        ]);

        progressBar.tick();
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