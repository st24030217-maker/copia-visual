<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}

require_once("Backend/Usuarios/Usuarios.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<link href="librerias/select2/dist/css/select2.min.css" rel="stylesheet" />
	<link href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css" rel="stylesheet"/>
	<link href="https://cdn.datatables.net/buttons/2.3.6/css/buttons.dataTables.min.css" rel="stylesheet"/>
  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Vendedor </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus2.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->

         <section>
          <ol class="breadcrumb">
            <li> <a class="titulo"> Nueva Orden </a> </li>
          </ol>
         </section>
         <div class="contenedores">
          <div class="row">
            <div class="col-12 col-lg-12 text-right">
              <a href="#" onclick="openNewOrdenModal('')"> <button type="button" class="btn btn-outline-info"><i class="fa fa-plus"></i> Nueva orden </button></a>
            </div>
          </div>
        </div>
				<div class="contenedores">
            <div class="row">
                <div class="col-12 col-lg-12 text-right">
                  <button type="button" id="ConsultaDoctor" class="btn btn-outline-success"><i class="fa fa-plus"></i>Consultar disponibilidad de paquetes de los doctores.</button>
                </div>
            </div>
        </div>
				<div class="row" style="margin: 1vh .3vh 1vh .3vh ;border-radius:15px;padding:2vh;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
	        background: rgb(255,255,255);
	        background: linear-gradient(90deg, rgba(255,255,255,0.908000700280112) 0%, rgba(233,233,233,0.9108018207282913) 73%);">
          <h5 style="text-align:center">Listado de doctores por agotar la cantidad total de piezas de sus paquetes</h5>
          <div class="table-responsive">
            <table class="table table-hover text-center table-sm" id="tableListDPaquetes">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>TipoDoctor</th>
                  <th>Cantidad Disponible</th>
                  <th>Comprar Paquetes</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div class="modal fade" id="ModalVendedor"  aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog ">
           <div class="modal-content ">
             <div class="modal-header ">
               <h5 class="modal-title" id='TituloModal'> Nueva orden </h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body ">
               <form id="formInserta" method="post" action="Backend/Usuarios/App.php">
                 <div class="form-group">
                   <input type="text" class="form-control" id="op" name="op" value="" style="display:none;">
                   <!-- <input type="text" class="form-control" id="IdUs" name="IdUs" style="display:none;"> -->
                   <div class="row">
                     <div class="col-12 col-lg-12 text-center">
											 <span> Seleccione un vendedor </span>
											 <br>
                       <select class="form-control" name="slectVendedor" id="slectVendedor" >
                         <option value="" selected disabled> Lista de Vendedores </option>
                         <?php
                         $Usuarios1 = new Usuarios();
                         $ListVendedores = $Usuarios1->getusuariosVendedor();
                         for ($i=0; $i < sizeof($ListVendedores) ; $i++) {
                           $id_sys_usuario = $ListVendedores[$i]["id_sys_usuario"];
                           $Nombre = $ListVendedores[$i]["Nombre"];
                           echo "
                            <option value='$id_sys_usuario '> $Nombre </option>
                           ";
                         }
                          ?>
                       </select>
                       <br><br>
                     </div>
                     <div class="col-12 col-lg-12 text-center">
											 <span> Seleccione un servicio </span>
											 <br>
											 <select class="form-control" name="slectProducto" id="slectProducto" required>
												 <option value="" selected disabled> Lista de servicios </option>
												 <?php
												 require_once("Backend/Productos/Productos.php");
													$Productos1 = new Productos();
													$ListProductos = $Productos1->getServicios();
													for ($i=0; $i <sizeof($ListProductos) ; $i++) {
														$Producto_ID = $ListProductos[$i]["Producto_ID"];
														$Producto = $ListProductos[$i]["Producto"];
														echo "
														<option value='$Producto_ID'> $Producto </option>
														";
													}
													?>
											 </select>
                     </div>
                     <div class="col-12 col-lg-12  text-center">
											 <br>
											 <span> Seleccione un doctor </span>
											 <br>
                       <select class="js-example-basic-single" style="width: 100%;" name="slectDoctor" id="slectDoctor" required style="background-color:#212121 !important;">
                          <option value=""> Listado de Doctores </option>
                          <?php
                          $Usuarios2 = new Usuarios();
                          $ListDoctores = $Usuarios2->getUsuariosDoctor();
                          for ($i=0; $i < sizeof($ListDoctores) ; $i++) {
                            $Usuario_Id = $ListDoctores[$i]["idDoctores"];
                            $Doctor = $ListDoctores[$i]["Doctor"];
														$ApellidoMaterno = $ListDoctores[$i]["ApellidoMaterno"];
														$ApellidoPaterno = $ListDoctores[$i]["ApellidoPaterno"];

                            echo "
                             <option value='$Usuario_Id'> $Doctor $ApellidoPaterno $ApellidoMaterno </option>
                            ";
                          }
                           ?>
                       </select>
                     </div>
										 <div class="col-12 col-lg-12 text-center">
											 <br>
											 <a href="#" onclick="nuevoDoctor('')"> <button type="button" class="btn btn-outline-info"><i class="fa fa-plus"></i> ¿Nuevo Doctor? </button></a>
										 </div>
                   </div>
                 </div>
        <!-- Aqui va el Segundo Label  -->

             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
               <button type="button" class="btn btn-primary" id="btnguardar" onclick="addListaTemporal('')">Guardar</button>
             </div>
             </form>
           </div>
         </div>
        </div>
				<div class="modal fade" id="ModalContenidoConsultaDoct"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
	          <div class="modal-content">
	            <div class="modal-header">
	              <h5 class="modal-title" id="exampleModalLongTitle">Paquetes Disponibles</h5>
	              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                <span aria-hidden="true">&times;</span>
	              </button>
	            </div>
	            <div class="modal-body">
	              <div class="row">
	                <div class="col-12 col-lg-12">
	                  <select id="scltDoctoresAlertify" class="js-example-basic-single" style="width: 100%;"></select>
	                </div>
	                <div class="table-responsive" style="margin-top:3vh;padding:2vh;">
	                  <table class="table table-hover text-center table-sm" id="tableContPaquetes">
	                    <thead>
	                      <tr>
	                        <th>Serie</th>
	                        <th>Paquete</th>
	                        <th>Piezas total</th>
	                        <th>Piezas solicitadas	</th>
	                        <th>Disponibles</th>
													<th>Disponibles Pagadas</th>
	                        <th>Precio</th>
	                        <th>Total Pagado</th>
	                        <th>Adeudo</th>
	                      </tr>
	                    </thead>
	                  </table>
	                </div>
	              </div>
	            </div>
	            <div class="modal-footer">
	              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
	            </div>
	          </div>
	        </div>
	      </div>

        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js" defer></script>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
    $(document).ready(function(){
      // selectServicioCategoria();
			$('.js-example-basic-single').select2();
    });
		getListadoDoctoresActivos();
		getListPaquetesVistaVendedor();
			async function getListadoDoctoresActivos(){
				let datos = await {
					op: "getDoctoresActivosJSON"
				};
				let respuesta = "";
				try {
					respuesta = await $.ajax({
						type: "post",
						url: "Backend/Doctores/App.php",
						data: datos,
						dataType: "json",
					});
				} catch (e) {
					console.log(e);
				} finally {
					$("#scltDoctoresAlertify").append(`
						<option value=""> Listado de Doctores </option>
					`);
					if (respuesta.length > 0) {
						respuesta.forEach( datos => {
							$("#scltDoctoresAlertify").append(`
								<option value="${datos.idDoctores}">${datos.Doctor}</option>
							`);
						});
					}
					$('#scltDoctoresAlertify').select2();
				}
			}

			$(document).on("click","#ConsultaDoctor",async function(){
				$("#ModalContenidoConsultaDoct").modal("toggle");
			});
      function openNewOrdenModal(){
        $("#ModalVendedor").modal("toggle");
      }

			function nuevoDoctor(){
				window.location.href=`newDoctorVendedor.php`;
			}

      // function selectServicioCategoria(IdCat){
			// 	$("#includeServ").load(`IncludeServicios.php?IdCategoria=${IdCat}`);
      // }

      function addListaTemporal(){
          var idDoctor = $("#slectDoctor").val();
          var idCategoria = $("#slectCategoria").val();
					var idProd = $("#slectProducto").val();
					var idVendedor = $("#slectVendedor").val();

          // if (idCategoria == "5") {
          //   var direccion = "OrdenZirconio.php";
          // }else if (idCategoria == "3") {
          //   var direccion = "OrdenesAlinea.php";
          // }

					if (idVendedor === null) {
						var varIdVendedor = "0";
					}else {
						var varIdVendedor = idVendedor;

					}




					if (idProd === null) {
						Alerta("info","Seleccione un servicio");
						return false;
					}

					if (idDoctor === null) {
						Alerta("info", "Seleccione un Doctor");
						return false;
					}

          $.ajax({
            type:"POST",
            url:"Backend/Ordenes/App.php",
            data:"op=addTemporal"+
            "&DoctorId="+idDoctor+"&Producto_id="+idProd,
            success: function(data){
							data = JSON.parse(data.trim());
							 let IdOrdenTemp = data[0];
							 let IdCategoria  = data[1];

							 if (IdCategoria != "3" && IdCategoria != "6") {
									  direccion = "OrdenZirconio.php";
								 }else if (IdCategoria == "3") {
									  direccion = "OrdenesAlinea.php";
								 }else if (IdCategoria == "6") {
									  direccion = "OrdenGuardas.php";
								 }
							 if(data!="0"){
                   window.location.href=`${direccion}?IdProd=${idProd}&IdDoctor=${idDoctor}&IdOrdenTemp=${IdOrdenTemp}&idVendedor=${varIdVendedor}`;
               }else if (data == "0") {
								 Alerta("error","Ingrese todos los datos de dirección del Doctor");
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

				let tableContPaquetes = $("#tableContPaquetes").dataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'
        ],
        language: {
          lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
          zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
          info: "PÁGINA _PAGE_ DE _PAGES_",
          infoEmpty: "NO HAY DATOS PARA MOSTRAR",
          infoFiltered: "",
          search: "BUSCAR",
        },
        columnDefs: [
          {
            className: "dt-center",
            targets: "_all",
          },
        ],
        order: [],
        bSort: true,
        bPaginate: true,
        bFilter: true,
        bInfo: false,
      });

      $(document).on("change","#scltDoctoresAlertify", async function(){
        let val = $(this).val();
        let datos = await {
          op: "getPaquetesDoctorSelected",
          Doctor_id: val
        };
        let respuesta;
        try {
          respuesta = await $.ajax({
            type: "post",
            url: "Backend/Productos_Paquetes/App.php",
            data: datos,
            dataType: "json",
          });
        } catch (e) {
          console.log(e);
        } finally {
          console.log(respuesta);
          tableContPaquetes.fnClearTable();
          respuesta.forEach(datos => {
            tableContPaquetes.fnAddData([
              datos.Serie,
              datos.Paquete,
              datos.Pz_total,
              datos.Solicitadas,
              datos.Disponible,
							datos.PiezasDispPagadas,
              datos.Costo,
              datos.TPagado,
              datos.Saldo
            ])
          });
        }
      });

			let tableListDPaquetes = $("#tableListDPaquetes").dataTable({
				dom: 'Bfrtip',
				buttons: ['copy', 'csv', 'excel', 'pdf', 'print'
				],
				language: {
					lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
					zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
					info: "PÁGINA _PAGE_ DE _PAGES_",
					infoEmpty: "NO HAY DATOS PARA MOSTRAR",
					infoFiltered: "",
					search: "BUSCAR",
				},
				columnDefs: [
					{
						className: "dt-center",
						targets: "_all",
					},
				],
				order: [],
				bSort: true,
				bPaginate: true,
				bFilter: true,
				bInfo: false,
			});
			async function getListPaquetesVistaVendedor(){
				let datos = {
					op: "getListPaquetesVistaVendedor"
				}
				let respuesta = [];
				try {
					respuesta = await $.ajax({
						type: "post",
						url: "Backend/Productos_Paquetes/App.php",
						data: datos,
						dataType: "json",
					});
				} catch (e) {
					console.log(e);
				} finally {
					tableListDPaquetes.fnClearTable();
					respuesta.forEach(datos => {
						tableListDPaquetes.fnAddData([
							datos.Doctor,
							datos.TipoDoctor,
							datos.CantDisponible,
							`<a href="ShopPaquetes.php?IdDoctor${datos.idDoctores}" class="btnConfiguracion"><i class="fab fa-shopify" style="color:white"></i></a>`
						])
					});
				}
			}
    </script>
  </body>
</html>
