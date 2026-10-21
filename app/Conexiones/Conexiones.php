<?php
#[\AllowDynamicProperties]
class Conexiones{
	private $dbh;

	function __construct()
	{
		$this->connect();
	}

	private function connect()
	{
		if ($this->dbh !== null) {
			return;
		}
		$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1'])
			|| strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0
			|| strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;

		$dbHost = getenv('DB_HOST') ?: ($isLocalhost && file_exists(__DIR__ . '/config.local.php') ? 'localhost' : '162.240.213.3');
		$dbName = getenv('DB_NAME') ?: 'new_dentusradm_datos';
		$dbUser = getenv('DB_USER') ?: ($dbHost === 'localhost' ? 'root' : 'user_dentusr');
		$dbPass = getenv('DB_PASS') ?: ($dbHost === 'localhost' ? '' : '9NSAv1b3jvq');

		$dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
		$options = [
			PDO::ATTR_EMULATE_PREPARES   => true,
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		];
		$this->dbh = new PDO($dsn, $dbUser, $dbPass, $options);
	}

	private function getDb()
	{
		if ($this->dbh === null) {
			$this->connect();
		}
		return $this->dbh;
	}

	function ProcedureWithParam($q, $parametros = array()){
		try {
			$res = $this->getDb()->prepare($q);
			$res->execute(is_array($parametros) ? $parametros : array());
			$array = array();
			while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
				$array[] = $row;
			}
			return $array;
		} catch (\Exception $e) {
			error_log($e);
			return array();
		}
	}

	function ExecuteQueryWithParam($q, $parametros = array()){
		try {
			$res = $this->getDb()->prepare($q);
			$res->execute(is_array($parametros) ? $parametros : array());
			$array = array();
			while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
				$array[] = $row;
			}
			return $array;
		} catch (\Exception $e) {
			error_log($e);
			return array();
		}
	}

	function Select($q, $parametros = array()){
		try{
		    $sth = $this->getDb()->prepare($q);
		    if (is_array($parametros) && !empty($parametros) && (strpos($q, '?') !== false || strpos($q, ':') !== false)) {
		        if (isset($parametros[0]) && is_array($parametros[0]) && count($parametros[0]) === 2) {
		            for ($i = 0; $i < count($parametros); $i++) {
		                $sth->bindValue(':' . ltrim((string)$parametros[$i][0], ':'), $parametros[$i][1]);
		            }
		            $sth->execute();
		        } elseif (!(isset($parametros[0]) && $parametros[0] === $q)) {
		            $sth->execute($parametros);
		        } else {
		            $sth->execute();
		        }
		    } else {
		        $sth->execute();
		    }
		    $sth->setFetchMode(PDO::FETCH_ASSOC);
		    $result = $sth->fetchAll();
		    return is_array($result) ? $result : array();
		}
		catch(PDOException $e){
		    error_log('PDOException - ' . $e->getMessage(), 0);
		    if (!headers_sent()) {
		        http_response_code(500);
		    }
		    return array();
	    }
	}

	function ExecuteQuery($q, $parametros = array()){
		try	{
		    $sth = $this->getDb()->prepare($q);
		    if (is_array($parametros) && !empty($parametros) && (strpos($q, '?') !== false || strpos($q, ':') !== false)) {
		        $sth->execute($parametros);
		    } else {
		        $sth->execute();
		    }
		    return true;
		}
		catch(PDOException $e){
		    error_log('PDOException - ' . $e->getMessage(), 0);
		    if (!headers_sent()) {
		        http_response_code(500);
		    }
		    return false;
	    }
	}

	function Procedure($q, $parametros = array()){
		try {
			$res = $this->getDb()->prepare($q);
			if (is_array($parametros) && !empty($parametros) && (strpos($q, '?') !== false || strpos($q, ':') !== false)) {
				$res->execute($parametros);
			} else {
				$res->execute();
			}
			$array = array();
			while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
				$array[] = $row;
			}
			return $array;
		} catch (\Exception $e) {
			error_log($e);
			return array();
		}
	}

	function Transact($queryArray){
		try {
			$db = $this->getDb();
			$db->beginTransaction();
			for ($i=0; $i <sizeof($queryArray) ; $i++) {
				$sth = $db->prepare($queryArray[$i]);
				$sth->execute();
			}
			$db->commit();
			return true;
		} catch (\Exception $e) {
			if ($this->dbh !== null) {
				$this->dbh->rollBack();
			}
			error_log('PDOException - ' . $e->getMessage(), 0);
			if (!headers_sent()) {
				http_response_code(500);
			}
			return false;
		}
	}

	function ConnClose(){
		$this->dbh = null;
	}

	function __destruct(){
		$this->dbh = null;
	}
}
?>
