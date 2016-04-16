<?php
class _oop_copy_file{
	public $root_path = "project/";
	public $from;
	public $to;
	public $folder_list_array_count = 0;
	public $folder_list_array = array();
	public $file_list_array = array();

	public function __construct($from,$to){
		$this->from = $from;
		$this->to = $to;
		$this->files_copy();
	}

	public function __destruct() {

	}

	public function files_in_folder($folder){
		if(is_dir($folder)&&$dh = opendir($folder)){
			while($name = readdir($dh)){
				if(!(($name == '.')||($name == '..')))
				{
					clearstatcache();
					if(is_dir($folder.'/'.$name)){
						array_push($this->folder_list_array,$folder.$name.'/');
					}
					else if(is_file($folder.'/'.$name)){
						array_push($this->file_list_array,$folder.$name);
					}
					clearstatcache();
				}
			}
			closedir($dh);
		}
	}

	public function all_in_folder($from){
		echo "<br/>";
		echo 'copy from:'.$from;
		echo "<br/>";
		if(is_file($from)){
			array_push($this->file_list_array,$from);
		}
		else if(is_dir($from)){
			$this->files_in_folder($from);
			while(isset($this->folder_list_array[$this->folder_list_array_count])){
				$this->files_in_folder($this->folder_list_array[$this->folder_list_array_count]);
				++$this->folder_list_array_count;
			}
		}
	}

	public function files_copy(){
		$this->all_in_folder($this->from);
		foreach($this->folder_list_array as &$value){
			echo '<br/>from folder is:'.$value;
			echo '<br/>to folder is:'.str_replace($this->from,$this->to,$value);
		}
		foreach($this->file_list_array as &$value){
			echo '<br/>from file is:'.$value;
			echo '<br/>to file is:'.str_replace($this->from,$this->to,$value);
		}
	}

}
?>
