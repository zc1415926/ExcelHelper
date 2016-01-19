/**
 * Created by zc1415926 on 2016/1/18.
 */
//var shell = require("shelljs");
var xlsx = require('node-xlsx');
var fs = require('fs');

var filename = process.argv[2];

var obj = xlsx.parse(filename);

var getClassRegExp = new RegExp(/[0-9]*/); //获取文件名中班级号码的正则表达式
var fileNameArray = filename.split("-"); //获取文件名使用”-“分割的的数组

var sourceData = obj[0]['data'];
var exportData = [["学号", "入学年度", "年级", "班级", "姓名", "密码", "性别", "家庭住址", "学籍号", "家长姓名", "班主任"]];

var classNum = fileNameArray[1].match(getClassRegExp)[0];
//console.log(classNum);//输出获取的班级号码
var stuId = "";
var stuOrderNumMax = sourceData.length;//最后一行的行号

for (var stuOrderNum = 1; stuOrderNum < stuOrderNumMax; stuOrderNum++) {
    stuId = fileNameArray[0]
        + (classNum.length < 2 ? "0" + classNum.length : classNum.length)
        + (stuOrderNum < 10 ? "0" + stuOrderNum : stuOrderNum);

    exportData.push([
        stuId,                                      //学号
        fileNameArray[0],                           //入学年入学
        (2016 - fileNameArray[0] - 1).toString(),   //年级
        classNum,                                   //班级
        sourceData[stuOrderNum][1],                 //姓名
        "123456",                                   //密码
        sourceData[stuOrderNum][4],                 //性别
        "地球",
        sourceData[stuOrderNum][0],                 //学籍号
        "家长",
        "班主任"
    ]);
}

//console.log(exportData);
//TODO:如果文件名中有"./“这种则就适应文件名
var exportObj = xlsx.build([{name: "worksheet", data: exportData}], {bookType: 'xlsx'});
fs.writeFileSync('export_' + filename + "x" , exportObj, 'binary');