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
      /*TRAER TODOS LOS EQUIPOS DISPONIBLES*/
      $q= "SELECT  distinct(Eq.idEquipos), Eq.Descripcion FROM Equipos as Eq
      left join EquiposUsuario_tmp as EqUsT on EqUsT.idEquipos = Eq.idEquipos
      left join EquiposUsuario as EqUS ON EqUS.idEquipos = Eq.idEquipos
      where Eq.idEquipos not in(select idEquipos FROM EquiposUsuario_tmp) and
      Eq.idEquipos not in(select idEquipos FROM EquiposUsuario where fechaRegresado is  null )
      and Eq.Status = '1'
      order by Eq.Descripcion asc;";
      $cons = $this->Select($q,array());
      return '{ "ListadoEquipos": '.json_encode($cons)."}";
    }
    function getEquiposPrestamo(){
      /*Elimina Temporal*/
      $AdmEquipos = new AdmEquipos();
      $AdmEquipos->deleteEquiposLista();

      /*TRAER TODOS LOS EQUIPOS EN PRESTAMO*/
      $q= "SELECT SysUs.usuario,Eq.Descripcion,date_format(fechaTomado, '%d' '/' '%m' '/' '%y' '   ' '%H' ':' '%i') as fechaTomado FROM EquiposUsuario as EqUs INNER JOIN sys_usuarios  AS SysUs on EqUs.id_sys_usuario = SysUs.id_sys_usuario
      INNER JOIN Equipos as Eq on Eq.idEquipos = EqUs.idEquipos
      where EqUs.fechaRegresado is null or EqUs.fechaRegresado = ''
      order by EqUs.fechaRegresado desc;";
      $equiposP = $this->Select($q,array());
      return '{ "ListadoEquipos": '.json_encode($equiposP)."}";
    }

    function getEquiposTemp($idUsuario){
      /*TRAER LO QUE TIENE AGREGADO EL USUARIO EN LA LISTA TEMPORAL ANTES DE CONFIRMARLO*/
      $q= "SELECT EqT.idEquiposUsuario,EqT.idUsuario, Eq.Descripcion FROM EquiposUsuario_tmp  as EqT INNER JOIN Equipos as Eq ON Eq.idEquipos = EqT.idEquipos
      where idUsuario = '$idUsuario'";
      $temporal = $this->Select($q,array());
      return '{ "ListadoEquipos": '.json_encode($temporal)."}";
    }
    function addListaEquiposUsu($idUsuario,$idEquipos){
      /*AGREGA A LA LISTA TEMPORAL DEL USUARIO ANTES DE CONFIRMAR LA LISTA QUE SE LLEVARA DE EQUIPOS*/

      $query = "SELECT * FROM EquiposUsuario_tmp Where idUsuario='$idUsuario' and idEquipos='$idEquipos';";
      $AdmEquipos2 = new AdmEquipos();
      $count = $AdmEquipos2->Select($query,array());
      if (sizeof($count) <= 0) {
        $q= "insert into EquiposUsuario_tmp (idUsuario,idEquipos) values ('$idUsuario','$idEquipos');";
        $this->ExecuteQuery($q,array());
      }
        return "1";
    }

    function deleteListaEquipoUsu($idUsuario,$idEquiposUsuario){
      /*ELIMINA DE LA LISTA TEMPORAL DEL USUARIO ANTES DE QUE LA LISTA SEA CONFIRMADA POR EL USUARIO*/

      $q= " delete from EquiposUsuario_tmp where idUsuario = '$idUsuario' and idEquipos ='$idEquiposUsuario';";
      $this->ExecuteQuery($q,array());
      return "1";
    }

    function addEquiposUsuario($idUsuario){
      /*PROCEDIMIENTO PARA ACEPTAR LA LISTA TEMPORAL Y QUE PASE A LA LISTA QUE TENDRA EL USUARIO DE EQUIPOS*/
      $q = "call spAnadirLista('$idUsuario');";
      $this->Procedure($q);
      return "1";
    }

    function getEquiposUsuario($idUsuario){
      /*TRAE LOS EQUIPOS OBTENIDOS POR EL USUARIO*/
      $q = "SELECT EqU.idEquiposUsuario as idEquipos,EqU.id_sys_usuario,Eq.Descripcion,date_format(fechaTomado, '%d' '/' '%c' '/' '%Y' '      ' '%H' ':' '%i') as fechaTomado ,EqU.fechaRegresado
      FROM EquiposUsuario as EqU INNER JOIN Equipos as Eq on
      Eq.idEquipos = EqU.idEquipos where id_sys_usuario = '$idUsuario' and (fechaRegresado IS NULL OR fechaRegresado = '');";
      $equiposUsuario = $this->Select($q,array());
      return '{ "ListadoEquipos": '.json_encode($equiposUsuario)."}";
    }

    function regresarEquipo($idUsuario,$idEquiposUsuario,$funciono){
      /*REGRESA EL EQUIPO SELECCIONADO POR EL USUARIO*/
      $q = "call spRegresarEquipo('$idUsuario','$idEquiposUsuario','$funciono');";
      $this->Procedure($q);
      return "1";
    }

    function deleteEquiposLista(){
      /*ELIMINA LOS EQUIPOS DE LA TABLA TEMPORAL DE TODOS LOS USUARIOS*/
      $q= "delete from EquiposUsuario_tmp;";
      $this->ExecuteQuery($q,array());

    }


  }
 ?>
