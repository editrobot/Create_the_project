//键盘锁
var keylock = 0;

// window.onmousewheel=function(){return false}

append.define("make_db_list_ctrl", [], function(){
	function this_oop(){
		if (typeof this_oop._initialized == "undefined") {
			this_oop._initialized = true;
		}
		this.resource_list_handle_name = "";
		this.db_handle = "";
		this.stack_temp_id = new Array();
		this.num_db_table_count = 0;
		this.num_db_table_key_count = 0;
		this.db_table_id = "";
		this.db_name_input_id = "";
		this.primary_key_input_id = "";
		this.db_key_num_input_value_id = "";
		this.db_key_num_input_button_id = "";
		
		this.data_details = {
			"db_table_name" : "",
			"primary_key" : "",
			"AUTO_INCREMENT_INIT" : "0",
			"db_key_list" : new Array()
		};
	}
	this_oop.prototype.update_primary_key_select_list = function(){
		theNodeTag.SetTextInNode(this.primary_key_input_id,"");
		var option_id = G_id._method.get_id();
		var the_tag = document.createElement("option");
		the_tag.setAttribute('id', option_id);
		the_tag.setAttribute('value', "none");
		document.getElementById(this.primary_key_input_id).appendChild(the_tag);
		theNodeTag.SetTextInNode(option_id,"无");
		
		for(var i = 0; i < this.data_details["db_key_list"].length; ++i){
			option_id = G_id._method.get_id();
			the_tag = document.createElement("option");
			the_tag.setAttribute('id', option_id);
			the_tag.setAttribute('value', this.data_details["db_key_list"][i]["key"]);
			document.getElementById(this.primary_key_input_id).appendChild(the_tag);
			theNodeTag.SetTextInNode(option_id,this.data_details["db_key_list"][i]["key"]);
		}
	}
	
	this_oop.prototype.put_db_table_init = function(where_in_id,resource_list,input_num_db_table_count){
		this.resource_list_handle_name = resource_list;
		this.num_db_table_count = input_num_db_table_count;
		
		this.db_handle = G_id._method.get_id();
		theNodeTag.AddNodeTag(where_in_id, "div", this.db_handle, this.db_handle);
		this.stack_temp_id[0] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.db_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		theNodeTag.SetTextInNode(this.stack_temp_id[0],"数据表编号:&nbsp;" + this.num_db_table_count);
		
		this.stack_temp_id[0] = G_id._method.get_id();
		this.db_name_input_id = G_id._method.get_id();
		this.data_details["db_table_name"] = "db_name"+G_id._method.get_id();
		theNodeTag.AddNodeTag(this.db_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		theNodeTag.SetTextInNode(this.stack_temp_id[0],"数据表名称:&nbsp;<input id=\"" + this.db_name_input_id + "\" value=\""+this.data_details["db_table_name"]+"\" onchange=\""+this.resource_list_handle_name+"['"+this.num_db_table_count+"'].data_details['db_table_name'] = this.value;\" />");
		
		this.stack_temp_id[0] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.db_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		this.db_key_num_input_value_id = G_id._method.get_id();
		this.db_key_num_input_button_id = G_id._method.get_id();
		theNodeTag.SetTextInNode(this.stack_temp_id[0],"键的总数量:&nbsp;<input id=\"" + this.db_key_num_input_value_id + "\" value=\"1\"/>&nbsp;"+
		"<button id=\""+this.db_key_num_input_button_id+"\" onclick='if(!isNaN(document.getElementById(\""+this.db_key_num_input_value_id+"\").value)){"+this.resource_list_handle_name+"[\""+this.num_db_table_count+"\"].put_db_table_set(document.getElementById(\""+this.db_key_num_input_value_id+"\").value);}'>设置</button>");
		
		this.stack_temp_id[0] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.db_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		this.primary_key_input_id = G_id._method.get_id();
		theNodeTag.SetTextInNode(this.stack_temp_id[0],"主键:&nbsp;<select name=\"primary_key\" id=\"" + this.primary_key_input_id + "\">"+
		"<option value=\"none\">无</option>"+
		"</select>&nbsp;"+
		"<button id=\""+this.db_key_num_input_button_id+"\" onclick='"+this.resource_list_handle_name+"["+this.num_db_table_count+"].update_primary_key_select_list();'>更新</button>");
		
		this.stack_temp_id[0] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.db_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		this.stack_temp_id[1] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[0], "table", this.stack_temp_id[1], this.stack_temp_id[1]);
		this.db_table_id = this.stack_temp_id[1];
	}
	this_oop.prototype.put_db_table_set = function(how_many){
		var temp = {
			"key" : "",
			"var_format" : "",
			"NULL" : "",
			"AUTO_INCREMENT" : "",
			"annotation" : ""
		};
		this.data_details["db_key_list"] = null;
		this.data_details["db_key_list"] = new Array();
		
		theNodeTag.SetTextInNode(this.db_table_id, "");
		this.stack_temp_id[2] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.db_table_id, "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"序号");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"键名");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"格式");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"是否允许为空");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"是否允许自增长");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"对键名注释");
		for(this.num_db_table_key_count = 1; this.num_db_table_key_count <= how_many; ++ this.num_db_table_key_count){
			this.stack_temp_id[2] = G_id._method.get_id();
			theNodeTag.AddNodeTag(this.db_table_id, "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
			this.stack_temp_id[3] = G_id._method.get_id();
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],this.num_db_table_key_count);
			this.stack_temp_id[3] = G_id._method.get_id();
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			temp["key"] = "db_key_name" + G_id._method.get_id();
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input value=\""+ temp["key"] +"\" onchange=\""+this.resource_list_handle_name+"["+this.num_db_table_count+"].data_details['db_key_list']["+(this.num_db_table_key_count-1)+"]['key']=this.value;\"/>");
			
			this.stack_temp_id[3] = G_id._method.get_id();
			temp["var_format"] = "INTEGER UNSIGNED";
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<select value=\""+temp["var_format"]+"\" name=\"var_format\" onchange=\""+this.resource_list_handle_name+"["+this.num_db_table_count+"].data_details['db_key_list']["+(this.num_db_table_key_count-1)+"]['var_format']=this.value;\"><option value=\"INTEGER UNSIGNED\">INTEGER UNSIGNED</option><option value=\"VARCHAR(20)\">VARCHAR(20)</option><option value=\"CHAR(40)\">CHAR(40)</option><option value=\"VARCHAR(100)\">VARCHAR(100)</option><option value=\"TINYINT(1)\">TINYINT(1)</option></select>");
			
			this.stack_temp_id[3] = G_id._method.get_id();
			temp["NULL"] = "0";
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input type=\"checkbox\" value=\""+temp["NULL"]+"\" onchange=\"this.value = this.value*-1;"+this.resource_list_handle_name+"["+this.num_db_table_count+"].data_details['db_key_list']["+(this.num_db_table_key_count-1)+"]['NULL']=this.value;\"/>");
			
			this.stack_temp_id[3] = G_id._method.get_id();
			temp["AUTO_INCREMENT"] = "0";
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input type=\"checkbox\" value=\""+temp["AUTO_INCREMENT"]+"\" onchange=\"this.value = this.value*-1;"+this.resource_list_handle_name+"["+this.num_db_table_count+"].data_details['db_key_list']["+(this.num_db_table_key_count-1)+"]['AUTO_INCREMENT']=this.value;\"/>");
			
			this.stack_temp_id[3] = G_id._method.get_id();
			temp["annotation"] = "";
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input value=\""+temp["annotation"]+"\" onchange=\""+this.resource_list_handle_name+"["+this.num_db_table_count+"].data_details['db_key_list']["+(this.num_db_table_key_count-1)+"]['annotation']=this.value;\"/>");
			
			this.data_details["db_key_list"].push(temp);
			temp = {
				"key" : "",
				"var_format" : "",
				"NULL" : "",
				"AUTO_INCREMENT" : "",
				"annotation" : ""
			};
		}
		this.update_primary_key_select_list();
	}
	return this_oop;
});

append.define("make_module_list_ctrl", [], function() {
	function this_oop(){
		if (typeof this_oop._initialized == "undefined") {
			this_oop._initialized = true;
		}
		this.resource_list_handle_name = "";
		this.module_handle = "";
		this.module_name_input_id = "";
		this.module_name = "";
		this.stack_temp_id = new Array();
		this.num_module_count = 0;
		this.num_attribute_count = 0;
		this.num_method_count = 0;
		this.module_attribute_table_id;
		this.module_methods_table_id;
		this.attribute_num_input_id = "";
		this.attribute_num_button_id = "";
		this.methods_num_input_id = "";
		this.methods_num_button_id = "";
		this.data_details = {
			"class_name" : "",
			"format" : "php",
			"attribute_array" : new Array(),
			"methods_array" : new Array()
		};
	}
	
	this_oop.prototype.put_module_init = function(where_in_id,resource_list,input_num_module_count){
		this.resource_list_handle_name = resource_list;
		this.num_module_count = input_num_module_count;
		this.module_handle = G_id._method.get_id();
		theNodeTag.AddNodeTag(where_in_id, "div", this.module_handle, this.module_handle);
		this.stack_temp_id[0] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.module_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		theNodeTag.SetTextInNode(this.stack_temp_id[0],"模块编号:&nbsp;"+this.num_module_count);
		this.stack_temp_id[0] = G_id._method.get_id();
		this.module_name_input_id = G_id._method.get_id();
		this.module_name = "module_name"+G_id._method.get_id();
		this.data_details["class_name"] = this.module_name;
		theNodeTag.AddNodeTag(this.module_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		theNodeTag.SetTextInNode(this.stack_temp_id[0],"模块名称:&nbsp;<input id=\"" + this.module_name_input_id + "\" value=\""+ this.module_name +"\" onchange=\""+this.resource_list_handle_name+"['"+this.num_module_count+"'].data_details['class_name'] = this.value;\"/>");
		
		this.stack_temp_id[0] = G_id._method.get_id();
		this.attribute_num_input_id = G_id._method.get_id();
		this.attribute_num_button_id = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.module_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		theNodeTag.SetTextInNode(this.stack_temp_id[0],"属性数量:&nbsp;<input id=\""+this.attribute_num_input_id+"\" value=\"1\"/>&nbsp;"+
		"<button id=\""+this.attribute_num_button_id+"\" onclick='if(!isNaN(document.getElementById(\""+this.attribute_num_input_id+"\").value)){"+this.resource_list_handle_name+"[\""+this.num_module_count+"\"].put_module_attribute(document.getElementById(\""+this.attribute_num_input_id+"\").value);}'>更新</button>");
		
		this.stack_temp_id[0] = G_id._method.get_id();
		this.methods_num_input_id = G_id._method.get_id();
		this.methods_num_button_id = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.module_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		theNodeTag.SetTextInNode(this.stack_temp_id[0],"方法数量:&nbsp;<input id=\""+this.methods_num_input_id+"\" value=\"1\"/>&nbsp;"+
		"<button id=\""+this.methods_num_button_id+"\" onclick='if(!isNaN(document.getElementById(\""+this.methods_num_input_id+"\").value)){"+this.resource_list_handle_name+"[\""+this.num_module_count+"\"].put_module_methods(document.getElementById(\""+this.methods_num_input_id+"\").value);}'>更新</button>");
		
		this.stack_temp_id[0] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.module_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		this.stack_temp_id[1] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[0], "table", this.stack_temp_id[1], this.stack_temp_id[1]);
		this.module_attribute_table_id = this.stack_temp_id[1];
		
		this.stack_temp_id[0] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.module_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		this.stack_temp_id[1] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[0], "table", this.stack_temp_id[1], this.stack_temp_id[1]);
		this.module_methods_table_id = this.stack_temp_id[1];
		
	}
	
	this_oop.prototype.put_module_attribute = function(how_many){
		var temp = {
			"variable_name" : "",
			"type" : "string",
			"init" : "0",
			"visibility" : "public"
		};
		this.data_details["attribute_array"] = null;
		this.data_details["attribute_array"]= new Array();
		
		theNodeTag.SetTextInNode(this.module_attribute_table_id, "");
		this.stack_temp_id[2] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.module_attribute_table_id, "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"序号");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"属性名");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"格式");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"初始值");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"能见度");
		for(this.num_attribute_count = 1;this.num_attribute_count <= how_many;++this.num_attribute_count){
			this.stack_temp_id[2] = G_id._method.get_id();
			theNodeTag.AddNodeTag(this.module_attribute_table_id, "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
			this.stack_temp_id[3] = G_id._method.get_id();
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],""+this.num_attribute_count+"");
			
			this.stack_temp_id[3] = G_id._method.get_id();
			temp["variable_name"] = "attribute_name"+G_id._method.get_id();
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input type=\"text\" value=\""+temp["variable_name"]+"\" onchange=\""+this.resource_list_handle_name+"["+this.num_module_count+"].data_details['attribute_array']["+(this.num_attribute_count-1)+"]['variable_name']=this.value;\"/>");
			
			this.stack_temp_id[3] = G_id._method.get_id();
			temp["type"] = "string";
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<select name=\"type\" value=\""+temp["type"]+"\" onchange=\""+this.resource_list_handle_name+"["+this.num_module_count+"].data_details['attribute_array']["+(this.num_attribute_count-1)+"]['type']=this.value;\"><option value=\"string\">字符串</option><option value=\"number\">数字</option></select>");
			
			this.stack_temp_id[3] = G_id._method.get_id();
			temp["init"] = "0";
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input type=\"text\" value=\""+temp["init"]+"\" onchange=\""+this.resource_list_handle_name+"["+this.num_module_count+"].data_details['attribute_array']["+(this.num_attribute_count-1)+"]['init']=this.value;\"/>");
			
			this.stack_temp_id[3] = G_id._method.get_id();
			temp["visibility"] ="public";
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<select name=\"visibility\" value=\""+temp["visibility"]+"\" onchange=\""+this.resource_list_handle_name+"["+this.num_module_count+"].data_details['attribute_array']["+(this.num_attribute_count-1)+"]['visibility']=this.value;\"><option value=\"public\">public</option><option value=\"protected\">protected</option><option value=\"private\">private</option></select>");
			
			this.data_details["attribute_array"].push(temp);
			temp = {
				"variable_name" : "",
				"type" : "string",
				"init" : "0",
				"visibility" : "public"
			};
		}
		
	}

	this_oop.prototype.put_module_methods = function(how_many){
		var temp = {
			"function_name" : "",
			"visibility" : "public",
			"input_variable" : new Array()
		};
		this.data_details["methods_array"] = null;
		this.data_details["methods_array"] = new Array();
		
		theNodeTag.SetTextInNode(this.module_methods_table_id, "");
		this.stack_temp_id[2] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.module_methods_table_id, "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"序号");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"方法名");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"能见度");
		for(this.num_method_count = 1; this.num_method_count <= how_many ;++ this.num_method_count){
			this.stack_temp_id[2] = G_id._method.get_id();
			theNodeTag.AddNodeTag(this.module_methods_table_id, "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
			this.stack_temp_id[3] = G_id._method.get_id();
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"" + this.num_method_count);
			
			this.stack_temp_id[3] = G_id._method.get_id();
			temp["function_name"] = "method_name"+G_id._method.get_id();
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input type=\"text\" value=\""+temp["function_name"]+"\" onchange=\""+this.resource_list_handle_name+"["+this.num_module_count+"].data_details['methods_array']["+(this.num_method_count-1)+"]['function_name']=this.value;\"/>");
			
			this.stack_temp_id[3] = G_id._method.get_id();
			temp["visibility"] = "public";
			theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
			theNodeTag.SetTextInNode(this.stack_temp_id[3],"<select name=\"visibility\" onchange=\""+this.resource_list_handle_name+"["+this.num_module_count+"].data_details['methods_array']["+(this.num_method_count-1)+"]['visibility']=this.value;\"><option value=\"public\">public</option><option value=\"protected\">protected</option><option value=\"private\">private</option></select>");
			
			this.data_details["methods_array"].push(temp);
			temp = {
				"function_name" : "",
				"visibility" : "public",
				"input_variable" : new Array()
			};
		}
	}
	
	return this_oop;
});

append.define("make_page_list_ctrl", [], function() {
	function this_oop(){
		if (typeof this_oop._initialized == "undefined") {
			this_oop._initialized = true;
		}
		this.resource_list_handle_name = "";
		this.page_handle = "";
		this.stack_temp_id = new Array();
		this.num_page_count = 0;
		this.page_table_id = "";
		
		this.data_details = {
			"name" : "",
			"title" : "",
			"format" : "",
			"content" : ""
		};
	}
	
	this_oop.prototype.put_page_init = function(where_in_id, resource_list, input_num_page_count){
		this.resource_list_handle_name = resource_list;
		this.num_page_count = input_num_page_count;
		this.page_handle = G_id._method.get_id();
		theNodeTag.AddNodeTag(where_in_id, "div", this.page_handle, this.page_handle);
		this.stack_temp_id[0] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.page_handle, "p", this.stack_temp_id[0], this.stack_temp_id[0]);
		theNodeTag.SetTextInNode(this.stack_temp_id[0],"页面编号:&nbsp;"+this.num_page_count);
		this.stack_temp_id[1] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[0], "table", this.stack_temp_id[1], this.stack_temp_id[1]);
		this.page_table_id = this.stack_temp_id[1];
	}
	
	this_oop.prototype.put_page_attribute = function(){
		this.stack_temp_id[2] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.page_table_id, "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"区域");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "th", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"内容");
		
		this.stack_temp_id[2] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.page_table_id, "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"页面文件名称");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input type=\"text\" value=\"\" onchange=\""+this.resource_list_handle_name+"['"+this.num_page_count+"'].data_details['name'] = this.value;\"/>");
		this.stack_temp_id[2] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[1], "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"标题");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input type=\"text\" value=\"\" onchange=\""+this.resource_list_handle_name+"['"+this.num_page_count+"'].data_details['title'] = this.value;\"/>");
		this.stack_temp_id[2] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[1], "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"关键词");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input type=\"text\" value=\"\"/>");
		this.stack_temp_id[2] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[1], "tr", this.stack_temp_id[2], this.stack_temp_id[2]);
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"页面主体");
		this.stack_temp_id[3] = G_id._method.get_id();
		theNodeTag.AddNodeTag(this.stack_temp_id[2], "td", this.stack_temp_id[3], this.stack_temp_id[3]);
		theNodeTag.SetTextInNode(this.stack_temp_id[3],"<input type=\"text\" value=\"\" onchange=\""+this.resource_list_handle_name+"['"+this.num_page_count+"'].data_details['content'] = this.value;\"/>");
	}
	
	return this_oop;
});


var project_name = "";
var db_list = new Array();
var module_list = new Array();
var page_list = new Array();

append.define("define_project", [], function() {
	function this_oop(){
		if (typeof this_oop._initialized == "undefined") {
			this_oop._initialized = true;
		}
		this.resource_list_handle_name = "";
		this.language_id = "";
		this.project_name_input_frame_id = "";
		this.project_db_num_input_frame_id = "";
		this.project_module_num_input_frame_id = "";
		this.project_page_num_input_frame_id = "";
		
		this.put_db_area_id = "";
		this.put_module_area_id = "";
		this.put_page_area_id = "";
		
		this.project_name_input_value_id = ""
		this.project_db_num_input_value_id = "";
		this.project_db_num_input_frame_button_id = "";
		this.project_module_num_input_value_id = "";
		this.project_module_num_input_frame_button_id = "";
		this.project_page_num_input_value_id = "";
		this.project_page_num_input_frame_button_id = "";
		
		this.create_button_id = "";
	}
	
	this_oop.prototype.put_project_input_frame_init = function(resource_list){
		
		this.language_id = G_id._method.get_id();
		theNodeTag.AddNodeTag("container","p", this.language_id, this.language_id);
		theNodeTag.SetTextInNode(this.language_id,"<b>language:</b>&nbsp;<select name=\"language\"><option value=\"english\">english</option><option value=\"chinese\">chinese</option><option value=\"japanese\">japanese</option></select>");
		
		//设置项目名称
		this.resource_list_handle_name = resource_list;
		this.project_name_input_frame_id = G_id._method.get_id();
		this.project_name_input_value_id = G_id._method.get_id();
		project_name = "name" + G_id._method.get_id();
		theNodeTag.AddNodeTag("container","p", this.project_name_input_frame_id, this.project_name_input_frame_id);
		theNodeTag.SetTextInNode(this.project_name_input_frame_id,"<b>项目名称:</b>&nbsp;<input id=\""+this.project_name_input_value_id+"\" value=\"" + project_name + "\" onchange=\"project_name = document.getElementById('"+this.project_name_input_value_id+"').value;\"/>");
		
		this.project_db_num_input_frame_id = G_id._method.get_id();
		this.project_db_num_input_value_id = G_id._method.get_id();
		this.project_db_num_input_frame_button_id = G_id._method.get_id();
		theNodeTag.AddNodeTag("container","p",this.project_db_num_input_frame_id,this.project_db_num_input_frame_id);
		theNodeTag.SetTextInNode(this.project_db_num_input_frame_id,"<b>数据表数量:</b>&nbsp;<input id=\"" + this.project_db_num_input_value_id + "\" value=\"1\"/>&nbsp;"+
		"<button id=\"" + this.project_db_num_input_frame_button_id + "\" onclick=\"if(!isNaN(document.getElementById('"+this.project_db_num_input_value_id+"').value)){"+this.resource_list_handle_name+".put_db_list_input_frame(document.getElementById("+this.resource_list_handle_name+".project_db_num_input_value_id).value);}\">设置</button>");
		theNodeTag.addEvent(document.getElementById( this.project_db_num_input_frame_button_id ),"click",function(){
			if(!isNaN(document.getElementById(this.project_db_num_input_value_id).value)){
				this.put_db_list_input_frame(document.getElementById(this.project_db_num_input_value_id).value);
			}
		});
		
		this.project_module_num_input_frame_id = G_id._method.get_id();
		this.project_module_num_input_value_id = G_id._method.get_id();
		this.project_module_num_input_frame_button_id = G_id._method.get_id();
		theNodeTag.AddNodeTag("container","p",this.project_module_num_input_frame_id,this.project_module_num_input_frame_id);
		theNodeTag.SetTextInNode(this.project_module_num_input_frame_id,"<b>模块数量:</b>&nbsp;<input id=\"" + this.project_module_num_input_value_id + "\" value=\"1\"/>&nbsp;"+
		"<button id=\"" + this.project_module_num_input_frame_button_id + "\" onclick=\"if(!isNaN(document.getElementById('"+this.project_module_num_input_value_id+"').value)){"+this.resource_list_handle_name+".put_module_list_input_frame(document.getElementById( "+this.resource_list_handle_name+".project_module_num_input_value_id ).value);}\">设置</button>");
		
		this.project_page_num_input_frame_id = G_id._method.get_id();
		this.project_page_num_input_value_id = G_id._method.get_id();
		this.project_page_num_input_frame_button_id = G_id._method.get_id();
		theNodeTag.AddNodeTag("container","p",this.project_page_num_input_frame_id,this.project_page_num_input_frame_id);
		theNodeTag.SetTextInNode(this.project_page_num_input_frame_id,"<b>页面数量:</b>&nbsp;<input id=\"" + this.project_page_num_input_value_id + "\" value=\"1\"/>&nbsp;"+
		"<button id=\"" + this.project_page_num_input_frame_button_id + "\" onclick=\"if(!isNaN(document.getElementById('"+this.project_page_num_input_value_id+"').value)){"+this.resource_list_handle_name+".put_page_list_input_frame(document.getElementById( "+this.resource_list_handle_name+".project_page_num_input_value_id ).value);}\">设置</button>");
		theNodeTag.addEvent(document.getElementById( this.project_page_num_input_frame_button_id ),"click",function(){
			if(!isNaN(document.getElementById( this.project_page_num_input_value_id).value )){
				this.put_page_list_input_frame(document.getElementById( this.project_page_num_input_value_id ).value);
			}
		});
		
		this.put_db_area_id = G_id._method.get_id();
		theNodeTag.AddNodeTag("container","div",this.put_db_area_id,this.put_db_area_id);
		this.put_module_area_id = G_id._method.get_id();
		theNodeTag.AddNodeTag("container","div",this.put_module_area_id,this.put_module_area_id);
		this.put_page_area_id = G_id._method.get_id();
		theNodeTag.AddNodeTag("container","div",this.put_page_area_id,this.put_page_area_id);
		
	}
	this_oop.prototype.put_db_list_input_frame = function(number_of_db_list){
		theNodeTag.SetTextInNode(this.put_db_area_id,"");
		db_list = new Array();
		db_list.push("");
		++number_of_db_list;
		for(var number_of_db_list_count = 1;number_of_db_list_count<number_of_db_list;++number_of_db_list_count){
			db_list.push(new (append.use("make_db_list_ctrl")));
			db_list[number_of_db_list_count].put_db_table_init(this.put_db_area_id,"db_list",number_of_db_list_count);
			db_list[number_of_db_list_count].put_db_table_set(1);
		}
	}
	
	this_oop.prototype.put_module_list_input_frame = function(number_of_module_list){
		theNodeTag.SetTextInNode(this.put_module_area_id,"");
		module_list = new Array();
		module_list.push("");
		++number_of_module_list;
		for(var number_of_module_list_count = 1;number_of_module_list_count<number_of_module_list;++number_of_module_list_count){
			module_list.push(new (append.use("make_module_list_ctrl")));
			module_list[number_of_module_list_count].put_module_init(this.put_module_area_id,"module_list",number_of_module_list_count);
			module_list[number_of_module_list_count].put_module_attribute(1);
			module_list[number_of_module_list_count].put_module_methods(1);
		}
	}
	
	this_oop.prototype.put_page_list_input_frame = function(number_of_page_list){
		theNodeTag.SetTextInNode(this.put_page_area_id,"");
		page_list = new Array();
		page_list.push("");
		++number_of_page_list;
		for(var number_of_page_list_count = 1; number_of_page_list_count < number_of_page_list; ++number_of_page_list_count){
			page_list.push(new (append.use("make_page_list_ctrl")));
			page_list[number_of_page_list_count].put_page_init(this.put_page_area_id,"page_list",number_of_page_list_count);
			page_list[number_of_page_list_count].put_page_attribute();
		}
	}
	
	this_oop.prototype.create = function(){
		var temp_id = G_id._method.get_id();
		this.create_button_id = G_id._method.get_id();
		theNodeTag.AddNodeTag("container","div",temp_id,temp_id);
		document.getElementById(temp_id).style.cssText="text-align:center;";
		theNodeTag.SetTextInNode(temp_id,"<a href=\"javascript:void(0);\"><img src=\"img/create_button.png\" title=\"开始创建项目代码\" id=\"" +this.create_button_id+ "\"/></a>");
		theNodeTag.addEvent(document.getElementById( this.create_button_id ),"click",function(){
			console.log(project_name);
			for(var i=1;i<db_list.length;i++){
				console.log(db_list[i].data_details);
			}
		});
	}
	
	return this_oop;
});

var define_project = new (append.use("define_project"));
function run_code(){
	define_project.put_project_input_frame_init("define_project");
	define_project.put_db_list_input_frame(1);
	define_project.put_module_list_input_frame(1);
	define_project.put_page_list_input_frame(1);
	define_project.create();
}