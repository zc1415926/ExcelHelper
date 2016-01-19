##学籍网数据表转LearnSite学生表，再将以学生名命名图片重命名为LearnSite学号的小工具

名子好长。。。

###第一步，学籍网数据表转LearnSite学生表

`node hello.js SourceExcelFile`

**学籍网数据表示例**

|学籍号	                |姓名	|身份证件号	        |班级名称	|性别	|民族	|出生年月	|学生状态|
| --------------------- |:-----:| -----------------:|----------:|------:|------:|----------:|------:|
|G500112200401260424	|张爱雪	|500112200401260424	|(1)班	    |女	    |汉族	|20040126	|正常    |
|G500108200310080810	|杨真	|500108200310080810	|(1)班	    |男	    |汉族	|20031008	|正常    |


**Example:**

`node hello.js 2010-1.xls`


###第二步，重命名学生图片

`node getImagesFromDir.js ExportExcelFile StudentImageDirectory`

**Example:**

`node getImagesFromDir.js export_2010-1.xlsx F:\ZhangChuan\Desktop\20160118LearnsiteStudentsImport\data`