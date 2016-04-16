append.define("test", [], function() {
	function this_oop(){
		if (typeof this_oop._initialized == "undefined") {
			this_oop._initialized = true;
		}
		this.test_value = "test_value";
	}
	this_oop.prototype.test_run = function(){
		alert(this.test_value);
	}
	
	return this_oop;
});