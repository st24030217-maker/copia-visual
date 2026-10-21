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
             <li><a class="titulo"> Listado de Discos </a></li>
           </ol>
         </section>

         <div class="contenedores">
          <div class="row">
            <div class="col-lg-12 ">
               <button type="button" class="btn btn-outline-success float-right" onclick="Discosfunction('')">
               <a class="fa fa-plus circle ps-3 " aria-hidden="true"></a>Agregar Disco
               </button>
             </div>
          </div>
         </div>
         <br>
         <div class="contenedores">
           <div class="Table-responsive">
             <table id="TableDiscos" class="table text-center table-hover" style="color:black;">
               <thead>
                 <tr>
                   <th>Nombre Producto</th>
                   <th>Precio Costo</th>
                   <th>Marca</th>
                   <th>SKU</th>
                   <th>Status</th>
                   <th>Actualizar</th>
                   <th>Actualizar Status</th>

                 </tr>
               </thead>
               <tbody>
                 <?php
                 require_once("Backend/Discos/Discos.php");
                 $Discos1 = new Discos();
                 $ListDiscos = $Discos1->getDiscos();
                 for ($i=0; $i < sizeof($ListDiscos) ; $i++) {
                   $idLab_Discos = $ListDiscos[$i]["idLab_Discos"];
                   $SKU = $ListDiscos[$i]["SKU"];
                   $Nombre_Producto = $ListDiscos[$i]["Nombre_Producto"];
                   $Precio_Costo = $ListDiscos[$i]["Precio_Costo"];
                   $Fecha_Creacion = $ListDiscos[$i]["Fecha_Creacion"];
                   $Status = $ListDiscos[$i]["Status"];
                   $Marca = $ListDiscos[$i]["Marca"];
                   $Id_Marca = $ListDiscos[$i]["Id_Marca"];
                   if ($Status == "1") {
                     $varStatus = "Activo";
                   }else {
                     $varStatus = "Inactivo";
                   }
                   echo "
                   <tr>
                    <td>$Nombre_Producto</td>
                    <td>$ $Precio_Costo</td>
                    <td>$Marca</td>
                    <td>$SKU</td>
                    <td>$varStatus</td>

                    <td>
                      <a class='btn btnIconoEdit' onclick='Discosfunction(\"$idLab_Discos\");' data-toggle='tooltip' title='Actualizar'>
                      <i class='fa fa-edit fa-2x'></i>
                      </a>
                    </td>
                    <td>
                      <a class= 'btn btnIconoChange' onclick='updateStatusDisco(\"$idLab_Discos\",\"$Status\");' data-toggle='tooltip' title='Actualizar Status'>
                      <i class= 'fa fa-refresh fa-2x'></i>
                      </a>
                    </td>

                   </tr>
                   ";
                 }
                  ?>
               </tbody>
             </table>
           </div>
         </div>
         
         <div class="modal fade" id="ModalUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog ">
           <div class="modal-content ">
             <div class="modal-header ">
               <h5 class="modal-title" id='TituloModal'></h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body">
               <form id="formInserta" method="post" action="Backend/Discos/App.php">
                 <div class="form-group">
                   <input type="text" class="form-control" id="op" name="op" value="" style="display:none;">
                   <input type="text" class="form-control" id="txtIdDiscos" name="txtIdDiscos" style="display:none;">
                   <!-- Aqui -->
                   <div class="row">
                    <div class="col-6 col-lg-6">
                      <span>Nombre del Disco</span>
                      <br>
                      <input type="text" name="txtNombre" id="txtNombre" value="" required class="form-control">
                    </div>
                    <div class="col-6 col-lg-6">
                      <span>Marca</span>
                      <br>
                      <select class="form-control" name="slectMarca" id="slectMarca" required>
                        <option value=""selected disabled>Lista de Marcas</option>
                        <?php
                        require_once("Backend/MarcasLaboratorios/MarcasLaboratorios.php");
                        $Marcas = new MarcasLaboratorios();
                        $ListMarcas = $Marcas->getMarcasDisp();
                        for ($i=0; $i <sizeof($ListMarcas) ; $i++) {
                          $idMarcas = $ListMarcas[$i]["idMarcas"];
                          $Marca = $ListMarcas[$i]["Marca"];
                          echo "
                          <option value='$idMarcas'>$Marca</option>
                          ";
                        }
                         ?>
                      </select>
                    </div>
                    <div class="col-6 col-lg-6">
                      <span>Costo</span>
                      <br>
                      <input type="number" name="txtCosto"id="txtCosto" value="0" min="0" required class="form-control">
                    </div>
                    <div class="col-6 col-lg-6">
                      <span>SKU</span>
                      <br>
                      <input type="text" name="txtSKU" id="txtSKU" value="" required class="form-control">
                    </div>
                   </div>
                 </div>
               </div>
               <br><br>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
               <button type="button" class="btn btn-primary" id="btnguardar">Guardar Cambios</button>
             </div>
           </form>
         </div>
         </div>
         </div>

        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
      function Discosfunction(idDiscos){
        if (idDiscos != ""){
				  // alert("Actualizar");
					$('#TituloModal').text("Actualizar Disco");
					$('#txtIdDiscos').val(idDiscos);
					$("#btnguardar").text("Actualizar");
					$("#op").val("updateDisco");
					$.ajax({
						type:"POST",
						url:"Backend/Discos/App.php",
						data: "op=getDiscoDetalle"+
						"&idDiscos="+idDiscos,
						success:function(response){
							response=JSON.parse(response.trim());
              var Nombre_Producto = response[0]["Nombre_Producto"];
              var Id_Marca = response[0]["Id_Marca"];
              var Precio_Costo = response[0]["Precio_Costo"];
              var vSKU = response[0]["SKU"];

							$("#txtNombre").val(Nombre_Producto);
              $("#slectMarca").val(Id_Marca);
              $("#txtCosto").val(Precio_Costo);
              $("#txtSKU").val(vSKU);

						},
						error:function(e){
							alert(e.responseText);
						}
					});
				}else {
					$("#TituloModal").text("Agregar Discos");
          $("#txtNombre").val("");
          $("#slectMarca").val("");
          $("#txtCosto").val("");
          $("#txtSKU").val("");
          $("#txtIdDiscos").val("");
					$("#btnguardar").text("Agregar");
					$("#op").val("insertDisco");
				}
				$("#ModalUpdate").modal("toggle");
			}
			$("#btnguardar").click(function(event){
        if (document.getElementById("formInserta").checkValidity()) {
          event.preventDefault();
          var form = $("#formInserta")[0];
          var data = new FormData(form);
          $.ajax({
            type:"POST",
            url:"Backend/Discos/App.php",
            data:data,
            processData:false,
            contentType:false,
            cache: false,
            timeout:600000,
            success:function(data){
              if (data=="1") {
                Alerta("success","Actualizado Correctamente");
                setTimeout(function () {
                  location.reload();
                }, 1500);
              }else {
                Alerta("error","No se Actualizado Correctamente");
                setTimeout(function () {
                  location.reload();
                }, 1500);
              }
              $("#ModalUpdate").modal("hide");
            },
            error:function(e){
              alert(e.responseText);
            }

          });
				}else {
					Alerta("info","Llene los campos Por Favor");
				}
      });

      function updateStatusDisco(idDisco,Status){
        if (Status == 0) {
          var stutus = "1";
        }else {
          stutus = "0";
        }
        $.ajax({
          type:"POST",
          url:"Backend/Discos/App.php",
          data:"op=updateStatusDisco"+
          "&Status="+stutus+"&idLab_Discos="+idDisco,
          success: function(data){
            if(data=="1"){
              Alerta("success","Operacion exitosa");
              setTimeout(function () {
                location.reload();
              }, 1500);
            }else{
              Alerta("error","No se Realizo Correctamente");
              setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
                location.reload();
              }, 1500);
            }
          },
          error:function(e){
            alert(e.responseText);
          }
        });
      }
    </script>
  </body>
</html>
