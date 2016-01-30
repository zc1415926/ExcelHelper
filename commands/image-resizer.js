/**
 * Created by ZC on 2016/1/29.
 */
var shell = require('shelljs');
var images = require('images');
var progress = require('progress');
var matchExt = require('match-extension');

//resize images contain in the path to the given width.(keep ratio)
//TODO:子目录中的文件-R一起缩放
function resize(path, width)
{
    shell.cd(path);

    var unsupportFilesArray = [];
    var filesArray = shell.ls("*");
    var progressBar = new progress('Resizing: [:bar] :percent', {
        incomplete: ' ',
        total: filesArray.length});


    filesArray.forEach(function(fileName){
        //如果文件扩展名为支持的扩散名
        if(matchExt(['JPG', 'jpg', 'jpeg', 'png', 'PNG'], fileName.split('.')[1]))
        {
            //先缩放图片再移动图片效率高些
            images(fileName).resize(parseInt(width)).save(fileName);
        }
        else
        {
            unsupportFilesArray.push(fileName);
        }

        progressBar.tick();
    });

    unsupportFilesArray.forEach(function(filename){
        console.log('不支持的文件： ' + filename);
    });
    progressBar.tick(progressBar.total - progressBar.curr);
}

module.exports.resize = resize;