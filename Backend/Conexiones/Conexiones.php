<?php
#[\AllowDynamicProperties]
class Conexiones {
    private $dbh;

    function __construct() {
        $dsn = "mysql:host=162.240.213.3;dbname=new_dentusradm_datos;charset=utf8mb4";
        $options = [
            PDO::ATTR_EMULATE_PREPARES   => true,
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT            => 8,
        ];
        $this->dbh = new PDO($dsn, 'user_dentusr', '9NSAv1b3jvq', $options);
    }

    function ProcedureWithParam($q, $parametros = array()) {
        try {
            $res = $this->dbh->prepare($q);
            $res->execute(is_array($parametros) ? $parametros : array());
            $array = array();
            while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
                $array[] = $row;
            }
            return $array;
        } catch (\Exception $e) {
            error_log($e->getMessage());
            return array();
        }
    }

    function ExecuteQueryWithParam($q, $parametros = array()) {
        try {
            $res = $this->dbh->prepare($q);
            $res->execute(is_array($parametros) ? $parametros : array());
            $array = array();
            while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
                $array[] = $row;
            }
            return $array;
        } catch (\Exception $e) {
            error_log($e->getMessage());
            return array();
        }
    }

    function Select($q, $parametros = array()) {
        try {
            $sth = $this->dbh->prepare($q);
            if (is_array($parametros) && !empty($parametros) && (strpos($q, '?') !== false || strpos($q, ':') !== false)) {
                $sth->execute($parametros);
            } else {
                $sth->execute();
            }
            $sth->setFetchMode(PDO::FETCH_ASSOC);
            $result = $sth->fetchAll();
            return is_array($result) ? $result : array();
        } catch (PDOException $e) {
            error_log('PDOException - ' . $e->getMessage(), 0);
            return array();
        }
    }

    function ExecuteQuery($q, $parametros = array()) {
        try {
            $sth = $this->dbh->prepare($q);
            if (is_array($parametros) && !empty($parametros) && (strpos($q, '?') !== false || strpos($q, ':') !== false)) {
                $sth->execute($parametros);
            } else {
                $sth->execute();
            }
            return true;
        } catch (PDOException $e) {
            error_log('PDOException - ' . $e->getMessage(), 0);
            return false;
        }
    }

    function Procedure($q, $parametros = array()) {
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
            error_log($e->getMessage());
            return array();
        }
    }

    function ConnClose() {
        $this->dbh = null;
    }
}
?>
