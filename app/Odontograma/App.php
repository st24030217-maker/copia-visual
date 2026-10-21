<?php
include("Odontograma.php");

$op = $_POST["op"] ?? "";
$Odontograma = new Odontograma();

if ($op == "updateOdontogramaTemporal") {
  $D11 = $_POST["txtD11"] ?? "";
  $D12= $_POST["txtD12"] ?? "";
  $D13= $_POST["txtD13"] ?? "";
  $D14= $_POST["txtD14"] ?? "";
  $D15= $_POST["txtD15"] ?? "";
  $D16= $_POST["txtD16"] ?? "";
  $D17= $_POST["txtD17"] ?? "";
  $D18= $_POST["txtD18"] ?? "";
  $D21= $_POST["txtD21"] ?? "";
  $D22= $_POST["txtD22"] ?? "";
  $D23= $_POST["txtD23"] ?? "";
  $D24= $_POST["txtD14"] ?? "";
  $D25= $_POST["txtD25"] ?? "";
  $D26= $_POST["txtD26"] ?? "";
  $D27= $_POST["txtD27"] ?? "";
  $D28= $_POST["txtD28"] ?? "";
  $D31= $_POST["txtD31"] ?? "";
  $D32= $_POST["txtD32"] ?? "";
  $D33= $_POST["txtD33"] ?? "";
  $D34= $_POST["txtD34"] ?? "";
  $D35= $_POST["txtD35"] ?? "";
  $D36= $_POST["txtD36"] ?? "";
  $D37= $_POST["txtD37"] ?? "";
  $D38= $_POST["txtD38"] ?? "";
  $D41= $_POST["txtD41"] ?? "";
  $D42= $_POST["txtD42"] ?? "";
  $D43= $_POST["txtD43"] ?? "";
  $D44= $_POST["txtD44"] ?? "";
  $D45= $_POST["txtD45"] ?? "";
  $D46= $_POST["txtD46"] ?? "";
  $D47= $_POST["txtD47"] ?? "";
  $D48= $_POST["txtD48"] ?? "";
  $D51= $_POST["txtD51"] ?? "";
  $D52= $_POST["txtD52"] ?? "";
  $D53= $_POST["txtD53"] ?? "";
  $D54= $_POST["txtD54"] ?? "";
  $D55= $_POST["txtD55"] ?? "";
  $D61= $_POST["txtD61"] ?? "";
  $D62= $_POST["txtD62"] ?? "";
  $D63= $_POST["txtD63"] ?? "";
  $D64= $_POST["txtD64"] ?? "";
  $D65= $_POST["txtD65"] ?? "";
  $D71= $_POST["txtD71"] ?? "";
  $D72= $_POST["txtD72"] ?? "";
  $D73= $_POST["txtD73"] ?? "";
  $D74= $_POST["txtD74"] ?? "";
  $D75= $_POST["txtD75"] ?? "";
  $D81= $_POST["txtD81"] ?? "";
  $D82= $_POST["txtD82"] ?? "";
  $D83= $_POST["txtD83"] ?? "";
  $D84= $_POST["txtD84"] ?? "";
  $D85= $_POST["txtD85"] ?? "";
  $Doctor_Id = $_POST["idDoctor"] ?? "";
  $Ordenes_Trabajo_Id = $_POST["idOrdenTemp"] ?? "";
  echo trim($Odontograma->updateOdontogramaTemporal($D11,$D12,$D13,$D14,$D15,$D16,$D17,$D18,$D21,$D22,$D23,$D24,$D25,$D26,$D27,$D28,
    $D31,$D32,$D33,$D34,$D35,$D36,$D37,$D38,$D41,$D42,$D43,$D44,$D45,$D46,$D47,$D48,$D51,$D52,$D53,$D54,$D55,$D61,$D62,
    $D63,$D64,$D65,$D71,$D72,$D73,$D74,$D75,$D81,$D82,$D83,$D84,$D85,$Doctor_Id,$Ordenes_Trabajo_Id));
}
 ?>
