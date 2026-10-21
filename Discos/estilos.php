<?php
if(!isset($_COOKIE["sesion"])){
  echo '<meta http-equiv="refresh" content="0;url=login.php">';
  die();
};
?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="../production/images/favicon.ico" type="image/ico">
<link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
<link href="../vendors/nprogress/nprogress.css" rel="stylesheet">
<link href="../vendors/iCheck/skins/flat/green.css" rel="stylesheet">
<link href="../vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
<link href="../vendors/jqvmap/dist/jqvmap.min.css" rel="stylesheet">
<link href="../vendors/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">
<link href="../vendors/toastr/toastr.min.css" rel="stylesheet">
<link href="../uild/css/custom.min.css" rel="stylesheet">
<link href="../src/scss/styles.scss" rel="stylesheet">

<link href="../vendors/select_2/select2/css/select2.min.css" rel="stylesheet" type="text/css">
<link href="../vendors/select_2/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="https://awsoftware.mx/web_combugas/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
<link rel="stylesheet" href="https://awsoftware.mx/web_combugas/plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
<link rel="stylesheet" href="https://awsoftware.mx/web_combugas/plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
<link rel="stylesheet" href="https://awsoftware.mx/web_combugas/plugins/select2/css/select2.min.css">
<link rel="stylesheet" href="https://awsoftware.mx/web_combugas/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
<style media="screen">
.titulo{
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
  padding: 8px;

}

.contenedores{
  background-color: #ffffff ;
  border-radius: 10px;
  padding: 8px;
  text-align:center;
  box-shadow: 0px 0px 5px 1px #000;
}

.contenedores  .text-st{
  font-size:12px;
  color:#393939;
  font-family: inherit;
}

</style>
