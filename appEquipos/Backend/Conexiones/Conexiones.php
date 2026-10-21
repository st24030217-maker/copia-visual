<?php
#[\AllowDynamicProperties]
class Conexiones{
	private $dbh;
	function __construct()
	{
		//$dsn = "mysql:host=192.185.131.189;dbname=resosist_dentdb;charset=utf8mb4"; //Sandbox
		$dsn = "mysql:host=162.240.213.3;dbname=new_dentusradm_datos;charset=utf8mb4"; //Produccion
		$options = [
			PDO::ATTR_EMULATE_PREPARES   => true,
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		];
		//$this->dbh = new PDO($dsn, 'resosist_usrdentdb', 'Dent@CD2022', $options); //Sandbox
		$this->dbh = new PDO($dsn, 'user_dentusr', '9NSAv1b3jvq', $options); //Produccion
	}

	function ProcedureWithParam($q, $parametros = array()){
		try {
			$res = $this->dbh->prepare($q);
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
			$res = $this->dbh->prepare($q);
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
		    $sth = $this->dbh->prepare($q);
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
		    $this->dbh = null;
		    return is_array($result) ? $result : array();
		}
		catch(PDOException $e){
		    error_log('PDOException - ' . $e->getMessage(), 0);
		    http_response_code(500);
		    die($e->getMessage());
	    }
	}

	function ExecuteQuery($q, $parametros = array()){
		try	{
		    $sth = $this->dbh->prepare($q);
		    if (is_array($parametros) && !empty($parametros) && (strpos($q, '?') !== false || strpos($q, ':') !== false)) {
		        $sth->execute($parametros);
		    } else {
		        $sth->execute();
		    }
		    $this->dbh = null;
		}
		catch(PDOException $e){
		    error_log('PDOException - ' . $e->getMessage(), 0);
		    http_response_code(500);
		    die($e->getMessage());
		    return $e->getMessage();
	    }
	}

	function Procedure($q, $parametros = array()){
		try {
			$res = $this->dbh->prepare($q);
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

	function ConnClose(){
		$this->dbh = null;
	}
}
?>
