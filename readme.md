##学籍网数据表转LearnSite学生表，再将以学生名命名图片重命名为LearnSite学号，同时还能将学生图片缩放大小的小工具

名子好长。。。

###子命令 transform

`node excelhelper transform -s excelFilePath [-d destinationFolder]`

学籍网数据表转LearnSite学生表

**学籍网数据源表**

|学籍号	                |姓名	|身份证件号	        |班级名称	|性别	|民族	|出生年月	|学生状态|
| --------------------- |:-----:| -----------------:|----------:|------:|------:|----------:|------:|
|G012345678901230001	|张爱雪	|500123456789012301	|(1)班	    |女	    |汉族	|20040126	|正常    |
|G012345678901230002	|杨真	|500123456789012302	|(1)班	    |男	    |汉族	|20031008	|正常    |


**Example:**

`node hello.js 2010-1.xls`


###子命令 rename

**格式：**

`node excelhelper rename -e ExcelFilePath -p FilesDirectory [-w Width]`

**参数说明：**

e，传入Excel文件的完整路径。

p，为需要批量重命名的文件所在的目录。

w，当需要批量重命名的文件为jpg或png格式的图片时，可以传入一个预期的图片宽度值，程序会先对图片按传入的宽度值进行缩放操作（保持长宽比），
再对图片进行重命名操作。


**适用情况：**

一个存储批量重命名文件参照信息的Excel文件，和一个存放待批量重命名文件的目录
**Example:**

`node getImagesFromDir.js export_2010-1.xlsx F:\ZhangChuan\Desktop\20160118LearnsiteStudentsImport\data`
