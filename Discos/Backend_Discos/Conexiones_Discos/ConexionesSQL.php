<?php
class Conexiones{
	private $dbh;
	function __construct()
	{
		$dsn = "sqlsrv:Server=$host;Database=$db'";
		$options = [
			PDO::ATTR_EMULATE_PREPARES   => false,
			PDO::ATTR_EMULATE_PREPARES => true,
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		];
		$this->dbh = new PDO($dsn, "$User", "$Pwd", $options);
	}


	function Select($q){
		try{
		    $sth = $this->dbh->prepare($q);
		    $sth->execute();
		    $sth->setFetchMode(PDO::FETCH_ASSOC);
		    $result = $sth->fetchAll();
				$this->dbh = null;
		    return $result;
		}
		catch(PDOException $e){
		    error_log('PDOException - ' . $e->getMessage(), 0);
		    http_response_code(500);
		    die($e->getMessage());
	    }
	}

	function ExecuteQuery($q, $parametros){
		try	{
		    $sth = $this->dbh->prepare($q);
		    $sth->execute($parametros);
		    $this->dbh = null;
		}
		catch(PDOException $e){
		    error_log('PDOException - ' . $e->getMessage(), 0);
		    http_response_code(500);
		    die($e->getMessage());
		    return $e->getMessage();
	    }
	}

	function Procedure($q){
		try {
			$res = $this->dbh->prepare($q);
			$res->execute();
			$array = array();
			while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
				$array[] = $row;
			}
			return $array;
		} catch (\Exception $e) {
			error_log($e);
		}
	}

	function Transact($queryArray){
		try {
			$this->dbh->beginTransaction();
			for ($i=0; $i <sizeof($queryArray) ; $i++) {
				$sth = $this->dbh->prepare($queryArray[$i]);
				$sth->execute();
			}
			$this->dbh->commit();
			$this->dbh = null;

		} catch (\Exception $e) {
			$this->dbh->rollBack();
			error_log('PDOException - ' . $e->getMessage(), 0);
			http_response_code(500);
			die($e->getMessage());
			return $e->getMessage();
		}
	}
}
?>
