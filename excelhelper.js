/**
 * Created by ZC on 2016/1/29.
 */
var shell = require('shelljs');
var resizer = require('./commands/image-resizer');
var renamer = require('./commands/file-renamer');
var transformer = require('./commands/excel-transformer');

var argv = require('yargs')
    .command('rename', 'rename files referencing the excel file', function(yargs){
        argv = yargs
            .option('e', {
                alias: 'excel',
                demand: true,
                type: 'string',
                describe: 'Full path of the reference Excel file.'
            })
            .option('d', {
                alias: 'dir',
                demand: true,
                type: 'string',
                describe: 'Directory path in which your photos contain.'
            })
            .option('w', {
                alias: 'width',
                type: 'string',
                describe: 'How width do you want to resize to.(Ratio keeping)'
            })
            .check(function(argvs, arr){
                if(argvs.excel == "" || argvs.dir == "")
                {
                    throw new Error('Error with your params, please check.\n' +
                        'Or you can get help by using "-h" param.\n');
                }
                else if(!shell.test('-f', argvs.excel))
                {
                    throw new Error('The path "' + argvs.excel + '" is not a file.');
                }
                else if(!shell.test('-d', argvs.dir))
                {
                    throw new Error('The path "' + argvs.dir + '" is not a directory.');
                }
                else if(argvs.width == "")
                {
                    throw new Error('There need a width follow the param "w"');
                }

                return true;
            })
            .usage('\nUsage: excelhelper rename -e [ExcelFilePath] -p [PhotoDirctory]')
            .example('params -e X:\\path\\myExcel.xls -p X:\\dirctory\\photos')
            .epilog('Made by zc1415926, \n' +
                'Find more at https://github.com/zc1415926/covert-xj-to-xkw')
            .help('h')
            .alias('h', 'help')
            .argv;

        if(argv.width)
        {
            resizer.resize(argv.dir, argv.width);
            renamer.rename(argv.excel, argv.dir);
        }
        else
        {
            renamer.rename(argv.excel, argv.dir);
        }

    })
    .command('transform', 'Building an Excel file from a source Excel file.', function(yargs){

        var defaultOutputPath = '';

        argv = yargs
            .option('s', {
                alias: 'source',
                demand: true,
                type: 'string',
                describe: 'Full path of the source Excel file.'
            })
            .option('d', {
                alias: 'dest',
                type: 'string',
                describe: 'Directory in which your output file put.'
            })
            .check(function(argvs, arr){
                if(argvs.source == "")
                {
                    throw new Error('Please giving an excel file following "-s" param.\n' +
                        'Or you can get help by using "-h".\n');
                }
                else if(!shell.test('-f', argvs.source))
                {
                    throw new Error('The path "' + argvs.source + '" is not a file.');
                }
                else if(argvs.dest != null && argvs.dest == "")
                {
                    throw new Error('If you want to specify a destination folder, A folder path should be behind the "-d"\n' +
                        'If you don\'t want remove "-d", please');
                }
                else if(argvs.dest != null && argvs.dest != "" && !shell.test('-d', argvs.dest))
                {
                    shell.mkdir(argvs.dest);
                    if(!shell.test('-d', argvs.dest))
                    {
                        throw new Error('The path "' + argvs.dest + '" is not a directory. And error to create it.');
                    }
                }
                else if(argvs.dest == null)
                {
                    //文件导出路径为源文件所在目录 = 文件完整路径中，不带路径的纯文件名替换为""，剩下的部分
                    defaultOutputPath = argvs.source.replace(argvs.source.split('\\')[argvs.source.split('\\').length -1], "")
                    + '\\transformed';

                    if(!shell.test('-d', defaultOutputPath))
                    {
                        shell.mkdir(defaultOutputPath);

                        if(!shell.test('-d', defaultOutputPath))
                        {
                            throw new Error('Error to create destination folder: ' + argvs.source + '\\transformed');
                        }
                    }
                }

                return true;
            })
            .help('h')
            .alias('h', 'help')
            .argv;

        if(argv.dest)
        {
            transformer.transform(argv.source, argv.dest);

        }
        else
        {
            transformer.transform(argv.source, defaultOutputPath);
        }


    })
    .example('\nTo get ditail by using: excelhelper [Commands] -h  ')
    .epilog('Made by zc1415926, \n' +
        'Find more at https://github.com/zc1415926/covert-xj-to-xkw')
    .help('h')
    .alias('h', 'help')
    .argv;