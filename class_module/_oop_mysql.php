<?php
class _oop_mysql{
	public $host = "localhost";
	public $port = 3306;
	public $db_user = "";
	public $db_password = "";
	public $db_name = "information_schema";
	public $dbh;
	
	public function __construct($input_db_user,$input_db_password,$input_db_name) {
		$this->db_user = $input_db_user;
		$this->db_password = $input_db_password;
		$this->db_name = $input_db_name;
		$this->dbh = new PDO('mysql:host=localhost;dbname='.$this->db_name, $this->db_user, $this->db_password);
	}
	
	public function __destruct() {
		$this->dbh = null;
	}
	
}
?>