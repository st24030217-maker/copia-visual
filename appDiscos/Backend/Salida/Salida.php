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

class Salida extends Conexiones{
  function getUsuariosLabAlmacen(){
    /*TRAE LOS USUARIOS PARA EL INICIO DE SESION*/
    $q = "SELECT idLab_Discos_UsuariosAlmacen,Nombre FROM Lab_Discos_UsuariosAlmacen Where status = '1'";
    $usuarios = $this->Select($q,array());
    return '{ "ListadoUsuarios": '.json_encode($usuarios)."}";
  }
  function GetInventario(){
    /*TRAE LOS USUARIOS PARA EL INICIO DE SESION*/
    $q = "SELECT di.Codigo,coalesce(c.Colorimetro,'SIN COLOR') as Color,coalesce(di.Tamaño,'SIN REGISTRO') as Medida, m.Marca
      from Lab_Discos_Inventario as di
      left join Marcas as m on m.idMarcas = di.idMarca
      left join Lab_Tipos_Colorimetros_Colores as c on c.Tipos_Colorimetros_Color_Id = di.idColorimetroColor";
    $inventario = $this->Select($q,array());
    return '{ "EntidadInventario": '.json_encode($inventario)."}";
  }

  // function SalidaDisco($codigo,$idusuario){
  //   try {
  //     $Conexiones = new Conexiones();
  //     $q1 = "SELECT idLab_Discos_Inventario, Status from Lab_Discos_Inventario Where Codigo = '$codigo'";
  //     $resp = $Conexiones->Select($q1);
  //     if (sizeof($resp)>0) {
  //       $status = $resp[0]["Status"];
  //       if ($status == "0") {
  //         $q = "UPDATE Lab_Discos_Inventario set Status = '1', idLab_Discos_UsuariosAlmacen = '$idusuario', FechaSlida = NOW() WHERE Codigo = '$codigo'";
  //         $this->ExecuteQuery($q,array());
  //         return "1";
  //       }else{
  //         return "El disco ya fue sacado anteriormente";
  //       }
  //     }else{
  //       return "El disco que intentas sacar no existe";
  //     }
  //   } catch (\Exception $e) {
  //     return "Intenta más tarde";
  //   }
  // }

  //   function SalidaDisco($codigo,$idusuario,$tipo_salida){
  //   try {
  //     $Conexiones = new Conexiones();
  //     $q1 = "SELECT idLab_Discos_Inventario, Status from Lab_Discos_Inventario Where Codigo = '$codigo'";
  //     $resp = $Conexiones->Select($q1);
  //     if (sizeof($resp)>0) {
  //       $status = $resp[0]["Status"];
  //       if ($status == "0") {
  //         $q = "UPDATE Lab_Discos_Inventario set Status = '1', idLab_Discos_UsuariosAlmacen = '$idusuario', tipo_salida = '$tipo_salida', FechaSlida = NOW() WHERE Codigo = '$codigo'";
  //         $this->ExecuteQuery($q,array());
  //         return "1";
  //       }else{
  //         return "El disco ya fue sacado anteriormente";
  //       }
  //     }else{
  //       return "El disco que intentas sacar no existe";
  //     }
  //   } catch (\Exception $e) {
  //     return "Intenta más tarde";
  //   }
  // }

    function SalidaDisco($codigo,$idusuario,$tipo_salida){
    try {
      $Conexiones = new Conexiones();
      $q1 = "SELECT idLab_Discos_Inventario, Status from Lab_Discos_Inventario Where Codigo = '$codigo'";
      $resp = $Conexiones->Select($q1);
      if (sizeof($resp)>0) {
        $status = $resp[0]["Status"];
        if ($status == "0") {
          $nuevoStatus = (trim((string)$tipo_salida) === '2') ? '3' : '1';
          $q = "UPDATE Lab_Discos_Inventario set Status = '$nuevoStatus', idLab_Discos_UsuariosAlmacen = '$idusuario', tipo_salida = '$tipo_salida', FechaSlida = NOW() WHERE Codigo = '$codigo'";
          $this->ExecuteQuery($q,array());
          return "1";
        }else{
          return "El disco ya fue sacado anteriormente";
        }
      }else{
        return "El disco que intentas sacar no existe";
      }
    } catch (\Exception $e) {
      return "Intenta más tarde";
    }
  }

  function getMotivosSalida(){
    try {
      $q = "SELECT id, descripcion, status FROM Lab_Discos_Motivo WHERE status = 1";
      $resp = $this->Select($q);
      return '{ "ListadoMotivos": '.json_encode($resp)."}";
    } catch (\Exception $e) {
      return "Intenta más tarde";
    }
  }

  function getInfoDisco($codigo){
    try {
      $Conexiones = new Conexiones();
      $q1 = "SELECT c.Colorimetro,m.Marca,l.Tamaño,l.Codigo from Lab_Discos_Inventario as l
      inner join Marcas as m on m.idMarcas = l.idMarca
      inner join Lab_Tipos_Colorimetros_Colores as c on c.Tipos_Colorimetros_Color_Id = l.idColorimetroColor
      WHERE l.Codigo = '$codigo';
      ";
      $resp = $Conexiones->Select($q1);
      if (sizeof($resp)>0) {
        return json_encode($resp);
      }else{
        return "El disco que intenta leer no existe";
      }

    } catch (\Exception $e) {
      return "Intenta más tarde";
    }
  }
  function DevolucionDisco($codigo){
    try {
      $Conexiones = new Conexiones();
      $q1 = "SELECT c.Colorimetro,m.Marca,l.Tamaño,l.Codigo from Lab_Discos_Inventario as l
      inner join Marcas as m on m.idMarcas = l.idMarca
      inner join Lab_Tipos_Colorimetros_Colores as c on c.Tipos_Colorimetros_Color_Id = l.idColorimetroColor
      WHERE l.Codigo = '$codigo';
      ";
      $resp = $Conexiones->Select($q1);
      if (sizeof($resp)>0) {
        try {
          $Conexiones2 = new Conexiones();
          $q2 = "UPDATE Lab_Discos_Inventario SET Status = '0', idLab_Discos_UsuariosAlmacen = null, FechaSlida = null Where Codigo = '$codigo'";
          $Conexiones2->ExecuteQuery($q2,array());
          return "Devolución correcta";
        } catch (\Exception $e) {
          return "Intenta más tarde";
        }
      }else{
        return "El disco que intenta leer no existe";
      }

    } catch (\Exception $e) {
      return "Intenta más tarde";
    }
  }

  function RevisaInventario($codigo){
    try {
      $Conexiones = new Conexiones();
      $q1 = "SELECT di.Codigo,coalesce(c.Colorimetro,'SIN COLOR') as color,coalesce(di.Tamaño,'SIN REGISTRO') as medida
      from Lab_Discos_Inventario as di
      left join Marcas as m on m.idMarcas = di.idMarca
      left join Lab_Tipos_Colorimetros_Colores as c on c.Tipos_Colorimetros_Color_Id = di.idColorimetroColor
      WHERE di.Codigo = '$codigo';
      ";
      $resp = $Conexiones->Select($q1);

      $Codigo = $resp[0]["Codigo"];
      $color = $resp[0]["color"];
      $medida = $resp[0]["medida"];


      $Conexiones2 = new Conexiones();
      $q2 = "SELECT count(di.Codigo) as cantidad
      from Lab_Discos_Inventario as di
      left join Marcas as m on m.idMarcas = di.idMarca
      left join Lab_Tipos_Colorimetros_Colores as c on c.Tipos_Colorimetros_Color_Id = di.idColorimetroColor
      Where c.Colorimetro = '$color' and di.Tamaño = '$medida' and di.FechaSlida is null;
      ";
      $resp2 = $Conexiones2->Select($q2);

      $cantidad = $resp2[0]["cantidad"];
      if ($color == "A2" && $medida == "20" && $cantidad <= "5") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "A1" && $medida == "16" && $cantidad <= "5" ) {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "A2" && $medida == "18" && $cantidad <= "5") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "A3" && $medida == "16" && $cantidad <= "5") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "D2" && $medida == "18" && $cantidad <= "0") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "A1" && $medida == "18" && $cantidad <= "5") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "A1" && $medida == "20" && $cantidad <= "3") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "A3" && $medida == "20" && $cantidad <= "3") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "A3" && $medida == "18" && $cantidad <= "5") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "A2" && $medida == "16" && $cantidad <= "5") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "B2" && $medida == "20" && $cantidad <= "1") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "B1" && $medida == "16" && $cantidad <= "2") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }
      elseif ($color == "B1" && $medida == "18" && $cantidad <= "2") {
        return "STOCK de este tipo de disco al MÍNIMO";
      }else{
        return "0";
      }


    } catch (\Exception $e) {
      return "Conexión lenta, intenta más tarde";
    }
  }

  function getCantidadDiscosPorEstatus($idColorimetroColor, $idMarca, $Tamano)
  {
      $WhereText = "";
      $WhereDiscosUsados = "";
      if ($idColorimetroColor == "" && $idMarca == "" && $Tamano == "") {
          $WhereText = "";
          $WhereDiscosUsados = "";
      } elseif ($idColorimetroColor != "" && $idMarca == "" && $Tamano == "") {
          $WhereText = "AND idColorimetroColor = '$idColorimetroColor'";
          $WhereDiscosUsados = "WHERE idColorimetroColor = '$idColorimetroColor'";
      } elseif ($idColorimetroColor == "" && $idMarca != "" && $Tamano == "") {
          $WhereText = "AND idMarca = '$idMarca'";
          $WhereDiscosUsados = "WHERE idMarca = '$idMarca'";
      } elseif ($idColorimetroColor == "" && $idMarca == "" && $Tamano != "") {
          $WhereText = "AND Tamaño = '$Tamano'";
          $WhereDiscosUsados = "WHERE Tamaño = '$Tamano'";
      } elseif ($idColorimetroColor != "" && $idMarca != "" && $Tamano == "") {
          $WhereText = "AND idColorimetroColor = '$idColorimetroColor' AND idMarca = '$idMarca'";
          $WhereDiscosUsados = "WHERE idColorimetroColor = '$idColorimetroColor' AND idMarca = '$idMarca'";
      } elseif ($idColorimetroColor != "" && $idMarca == "" && $Tamano != "") {
          $WhereText = "AND idColorimetroColor = '$idColorimetroColor' AND Tamaño = '$Tamano'";
          $WhereDiscosUsados = "WHERE idColorimetroColor = '$idColorimetroColor' AND Tamaño = '$Tamano'";
      } elseif ($idColorimetroColor == "" && $idMarca != "" && $Tamano != "") {
          $WhereText = "AND Tamaño = '$Tamano' AND idMarca = '$idMarca'";
          $WhereDiscosUsados = "WHERE Tamaño = '$Tamano' AND idMarca = '$idMarca'";
      } elseif ($idColorimetroColor != "" && $idMarca != "" && $Tamano != "") {
          $WhereText = "AND Tamaño = '$Tamano' AND idMarca = '$idMarca' AND idColorimetroColor = '$idColorimetroColor'";
          $WhereDiscosUsados = "WHERE Tamaño = '$Tamano' AND idMarca = '$idMarca' AND idColorimetroColor = '$idColorimetroColor'";
      }
      $q = "SELECT (SELECT coalesce(COUNT(*),0) FROM Lab_Discos_Inventario WHERE Status = 0 $WhereText) as Almacen,
        (SELECT coalesce(COUNT(*),0) FROM Lab_Discos_Inventario WHERE Status = 1 $WhereText) as Activos ,
        (SELECT count(distinct Disco) FROM Lab_Discos_Ordenes_Archivos where Disco in (SELECT Codigo FROM Lab_Discos_Inventario $WhereDiscosUsados))  as Usados,
        (SELECT count(*) FROM Lab_Discos_Inventario WHERE Status = 2 $WhereText) as Termimnados,
        (SELECT count(*) from Lab_Discos_Inventario WHERE Codigo NOT IN (SELECT DISTINCT Disco FROM Lab_Discos_Ordenes_Archivos) $WhereText)  AS SinUtilizar,
        (SELECT (((SELECT count(*) FROM Lab_Discos_Inventario) * (SELECT PromedioCantidadPorDisco FROM ConfiguracionDent)) -
          (SELECT COALESCE(sum(Piezas),0) FROM Lab_Discos_Ordenes_Archivos))) AS PiezasGlobalRestante,
        (SELECT count(*) FROM Lab_Discos_Inventario) as CantidadDiscos,
        (((SELECT count(*) FROM Lab_Discos_Inventario) * (SELECT PromedioCantidadPorDisco FROM ConfiguracionDent))) as PiezasTotalGlobal,
        (SELECT COALESCE(sum(Piezas),0) FROM Lab_Discos_Ordenes_Archivos) as PiezasGlobalUtilizadas,
        (SELECT ((100 / ((SELECT count(*) FROM Lab_Discos_Inventario) * (SELECT PromedioCantidadPorDisco FROM ConfiguracionDent))) *
          (SELECT COALESCE(sum(Piezas),0) FROM Lab_Discos_Ordenes_Archivos))) AS PorcentUtilizado
        FROM Lab_Discos_Inventario
        GROUP BY Almacen;";
      return '{ "CantDiscosPorFiltro": '.json_encode($this->Select($q))."}";
  }

  function getInventarioColorimetros()
    {
        $q = "SELECT * FROM Lab_Tipos_Colorimetros_Colores WHERE Activo = 1";
        return '{ "ListColorimetro": '.json_encode($this->Select($q))."}";
    }

    function getMarcasDiscos(){
      $q = "SELECT * from Marcas WHERE Status = 1";
      return '{ "ListMarcas": '.json_encode($this->Select($q))."}";
    }
}
?>
