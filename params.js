/**
 * Created by ZC on 2016/1/20.
 */
var shell = require('shelljs');
var argv = require('yargs')
    .option('e', {
        alias: 'excel',
        demand: true,
        describe: 'File path to your source Excel file.',
        type: 'string'
    })
    .option('p', {
        alias: 'photo',
        demand: true,
        type: 'string',
        describe: 'Directory path in which your photos contain.'
    })
    .help('h')
    .alias('h', 'help')
    .alias('v', 'version')
    .usage('\nUsage: params -e [ExcelFilePath] -p [PhotoDirctory]')
    .version(function(){return require('./package').version})
    .example('params -e /path/myExcel.xls -p /dirctory/photos/')
    .epilog('Made by zc1415926, \n' +
        'Find more at https://github.com/zc1415926/covert-xj-to-xkw')
    .check(function(argvs, arr){
        if(argvs.excel == "" || argvs.photo == "")
        {
            throw new Error('Error with your params, please check.\n' +
                'Or you can get help by using "-h" param.\n');
        }
        else if(!shell.test('-f', argvs.excel))
        {
            throw new Error('The path "' + argvs.excel + '" is not a file.');
        }
        else if(!shell.test('-d', argvs.photo))
        {
            throw new Error('The path "' + argvs.photo + '" is not a directory.');
        }

        return true;
    })
    .argv;

console.log(shell.ls(argv.excel));
console.log(shell.ls(argv.photo).length + " files contain in " + argv.photo);