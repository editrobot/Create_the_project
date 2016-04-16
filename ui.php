<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<title>EditRobot</title>
		<link rel="stylesheet" href="css/main.css" type="text/css" media="screen" />
	</head>
<body>
<div id="head"></div>
<div id="container">
	<a href="update_include.php" target="_blank" style="color:#ffffff;">点击更新模块列表</a>
	<p>
		欢迎下载这个粗糙的附加工具。该项目目前只是一个雏形。QQ群：318648545<br/>
		您可以编辑 run.php 里面的内容，接着运行它就可以，运行后生成的项目在 project 文件夹中,总共有两个版本，一个是zip压缩包，一个是未经打包的。代码的内容都是一样的。
	</p>
</div>
<div id="foot">
	Copy&nbsp;Right&nbsp;2015.&nbsp;&nbsp;EDITROBOT
</div>
<script type="text/javascript" src="js/Append.js"></script>
<script type="text/javascript">
ui_word.language = "chinese";
ui_word.set_ui_word_value("foot","english","Copy&nbsp;Right&nbsp;2015.&nbsp;&nbsp;EDITROBOT");
ui_word.set_ui_word_value("foot","chinese","版权所有&nbsp;2015.&nbsp;&nbsp;EDITROBOT");
ui_word.set_ui_word_value("head","english","EditRobot");
ui_word.set_ui_word_value("head","chinese","EditRobot项目自动部署系统");
ui_word.Refresh();

var ResourcesFile = append.use("ResourcesFile");
ResourcesFile.AddScript("js/page_run.js", "run", function () {
    run_code();
});
</script>
</body>
</html>
