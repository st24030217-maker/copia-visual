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

class Odontograma extends Conexiones{

  function getOdontogramaTemporal($Ordenes_Trabajo_Id,$Doctor_Id){
    $q = "SELECT * FROM Temporal_Odontograma WHERE Ordenes_Trabajo_Id = '$Ordenes_Trabajo_Id' AND Doctor_Id = '$Doctor_Id'";
    $cons = $this->Select($q,array());
    return $cons;
  }

  function updateOdontogramaTemporal($D11,$D12,$D13,$D14,$D15,$D16,$D17,$D18,$D21,$D22,$D23,$D24,$D25,$D26,$D27,$D28,
    $D31,$D32,$D33,$D34,$D35,$D36,$D37,$D38,$D41,$D42,$D43,$D44,$D45,$D46,$D47,$D48,$D51,$D52,$D53,$D54,$D55,$D61,$D62,
    $D63,$D64,$D65,$D71,$D72,$D73,$D74,$D75,$D81,$D82,$D83,$D84,$D85,$Doctor_Id,$Ordenes_Trabajo_Id){
    $q="UPDATE Temporal_Odontograma SET
    D11 = '$D11',
    D12 = '$D12',
    D13 = '$D13',
    D14 = '$D14',
    D15 = '$D15',
    D16 = '$D16',
    D17 = '$D17',
    D18 = '$D18',
    D21 = '$D21',
    D22 = '$D22',
    D23 = '$D23',
    D24 = '$D24',
    D25 = '$D25',
    D26 = '$D26',
    D27 = '$D27',
    D28 = '$D28',
    D31 = '$D31',
    D32 = '$D32',
    D33 = '$D33',
    D34 = '$D34',
    D35 = '$D35',
    D36 = '$D36',
    D37 = '$D37',
    D38 = '$D38',
    D41 = '$D41',
    D42 = '$D42',
    D43 = '$D43',
    D44 = '$D44',
    D45 = '$D45',
    D46 = '$D46',
    D47 = '$D47',
    D48 = '$D48',
    D51 = '$D51',
    D52 = '$D52',
    D53 = '$D53',
    D54 = '$D54',
    D55 = '$D55',
    D61 = '$D61',
    D62 = '$D62',
    D63 = '$D63',
    D64 = '$D64',
    D65 = '$D65',
    D71 = '$D71',
    D72 = '$D72',
    D73 = '$D73',
    D74 = '$D74',
    D75 = '$D75',
    D81 = '$D81',
    D82 = '$D82',
    D83 = '$D83',
    D84 = '$D84',
    D85 = '$D85' where Doctor_Id = '$Doctor_Id' and Ordenes_Trabajo_Id = $Ordenes_Trabajo_Id";

    $this->ExecuteQuery($q,array());
    return "1";
  }

}
 ?>
