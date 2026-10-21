<?php
if(file_exists("../Conexiones/Conexiones.php")){
  require_once("../Conexiones/Conexiones.php");
}
else{
  if(file_exists("./Conexiones/Conexiones.php")){
    require_once("./Conexiones/Conexiones.php");
  }
  else if(file_exists("../Conexiones/Conexiones.php")){
    require_once("../Conexiones/Conexiones.php");
  }
  else if(file_exists("../../Conexiones/Conexiones.php")){
    require_once("../../Conexiones/Conexiones.php");
  }
  else if(file_exists("././Backend/Conexiones/Conexiones.php")){
    require_once("././Backend/Conexiones/Conexiones.php");
  }
}
  class AdmEquipos extends Conexiones{
    function getEquipos(){
      $q= "SELECT  distinct(Eq.idEquipos), Eq.Descripcion FROM Equipos as Eq
      left join EquiposUsuario_tmp as EqUsT on EqUsT.idEquipos = Eq.idEquipos
      left join EquiposUsuario as EqUS ON EqUS.idEquipos = Eq.idEquipos
      where Eq.idEquipos not in(select idEquipos FROM EquiposUsuario_tmp) and
      Eq.idEquipos not in(select idEquipos FROM EquiposUsuario where fechaRegresado is  null )
      order by Eq.Descripcion asc;";
      $cons = $this->Select($q,array());
      return $cons;
    }
    function getEquiposTemp(){
      $idUsuario = $_COOKIE["id_usuario"] ?? "";
      $q= "SELECT EqT.idEquiposUsuario,EqT.idUsuario, Eq.Descripcion FROM EquiposUsuario_tmp  as EqT INNER JOIN Equipos as Eq ON Eq.idEquipos = EqT.idEquipos
      where idUsuario = '$idUsuario'";
      $cons = $this->Select($q,array());
      return $cons;
    }
    function addListaEquiposUsu($idEquipos){
      $id_usuario = $_COOKIE["id_usuario"] ?? "";
      $q= " insert into EquiposUsuario_tmp (idUsuario,idEquipos) values ('$id_usuario','$idEquipos');";
      $this->ExecuteQuery($q,array());
      return "1";
    }

    function deleteListaEquipoUsu($idEquiposUsuario){
      $id_usuario = $_COOKIE["id_usuario"] ?? "";
      $q= " delete from EquiposUsuario_tmp where idUsuario = '$id_usuario' and idEquiposUsuario ='$idEquiposUsuario';";
      $this->ExecuteQuery($q,array());
      return "1";
    }

    function addEquiposUsuario($IDUsarioCOOKIE){
      $q = "call spAnadirLista('$IDUsarioCOOKIE');";
      $this->Procedure($q);
      return "1";
    }

    function getEquiposUsuario(){
      $id_usuario = $_COOKIE["id_usuario"] ?? "";
      $q = "SELECT EqU.idEquiposUsuario,EqU.id_sys_usuario,Eq.Descripcion,date_format(fechaTomado, '%d' '/' '%c' '/' '%Y' '      ' '%H' ':' '%i') as fechaTomado ,EqU.fechaRegresado
      FROM EquiposUsuario as EqU INNER JOIN Equipos as Eq on
      Eq.idEquipos = EqU.idEquipos where id_sys_usuario = '$id_usuario' and (fechaRegresado IS NULL OR fechaRegresado = '');";
      $cons = $this->Select($q,array());
      return $cons;
    }

    function regresarEquipo($IDUsuarioCOOKIE,$idEquiposUsuario){
      $q = "call spRegresarEquipo('$IDUsuarioCOOKIE','$idEquiposUsuario');";
      $this->Procedure($q);
      return "1";
    }

    function deleteEquiposLista(){
      $q= " delete from EquiposUsuario_tmp;";
      $this->ExecuteQuery($q,array());

    }
  }
 ?>
