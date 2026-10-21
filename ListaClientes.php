<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
  $redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  header("Location: $redirect_url");
  exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("estilos.php"); ?>
  <title>Dent Clinica Dental | Inicio </title>
</head>
<body class="nav-md">
  <div class="container body" >
    <?php include("menus.php");?>
    <div class="right_col" role="main">
     <!-- CONTENIDO PAGINA -->
     <section>
      <ol class="breadcrumb">
        <li> <a class="titulo"> Listado de Clientes </a> </li>
      </ol>
    </section>
    <div class="contenedores">
     <div class="row">
       <div class="col-12 col-lg-12 text-right">
         <a href="NewClientesApp.php"><button type="button" class="btn btn-outline-success" onclick="('')"> <i class='fa fa-plus'></i> Nuevo Cliente</button></a>
       </div>
     </div>
   </div>
   <br>
   <div class="contenedores">
    <div class="Table-responsive">
      <table id="nombre" class="table text-center table-hover" style="color:black;">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Celular</th>
            <th>Email</th>
            <th>Actualizar</th>
          </tr>
        </thead>
        <tbody>
          <?php
          require_once ("Backend/ClientesApp/AdmClientesApp.php");
          $AdmClientesApp = new AdmClientesApp();
          $ListCliApp= $AdmClientesApp->getClientesApp();
          for($i = 0; $i < sizeof($ListCliApp); $i++){

           $Paciente_Id = $ListCliApp[$i]["Paciente_Id"];
           $Nombre = $ListCliApp[$i]["Nombre"];
           $Apellidos = $ListCliApp[$i]["Apellidos"];
           $Cell = $ListCliApp[$i]["Cell"];
           $Email = $ListCliApp[$i]["Email"];
           echo "
           <tr>
           <td>$Nombre</td>
           <td>$Apellidos</td>
           <td>$Cell</td>
           <td>$Email</td>
           <td class='text-center'>
           <button class='btn btnIconoEdit'  onclick='updateClientesAppfunction(\"$Paciente_Id\");' data-toggle='tooltip' title='Editar Paciente'>
           <i class='fa fa-pencil-square'></i>
           </button></td>
           </tr>
           ";
         }
         ?>
       </tbody>
     </table>
   </div>
 </div>
</div>
<?php include("footer.php"); ?>
</div>
</div>
<?php include("scripts.php"); ?>
<script type="text/javascript">
  $(document).ready(function(){
    $('#nombre').DataTable({
      lengthMenu: [[50, 100, 500, -1], [50, 100, 500, "Todos los registros"]],
      ordering: false,
      "bPaginate": false,
      responsive: false,
      "bInfo" : false,
      "oLanguage": {
        "sSearch": "Buscar"
      }
    });
  });

  function updateClientesAppfunction(Paciente_Id){
    window.location.href=`UpdateClientesApp.php?Paciente_Id=${Paciente_Id}`;
  }
</script>
</body>
</html>
