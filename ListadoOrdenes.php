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
	<style media="screen">
	div::-webkit-scrollbar {
	width: 5px;
	height: 8px;           /* width of the entire scrollbar */
	}

	div::-webkit-scrollbar-track {
	background: transparent;
	/* border: 0.5px solid #40C1CA; */
	border-radius:7px;     /* color of the tracking area */
	}

	div::-webkit-scrollbar-thumb {
	background-color: #B6B6B6;    /* color of the scroll thumb */
	border-radius: 20px;        /* creates padding around scroll thumb */
	}
  .header{
    position:sticky;
    top: 0 ;
    background-color: black;
    color: white;
  }
	</style>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <section>
          <ol class="breadcrumb">
            <li> <a class="titulo"> Listado de doctores </a> </li>
          </ol>
        </section>
				<div class="contenedoresMenuIndexOT" style="padding:10px;">
					<div class="row">
						<div class="col-12 col-lg-3 offset-lg-3">
              Desde <input type="date" class="form-control" name="" value="">
            </div>
						<div class="col-12 col-lg-3">
              hasta <input type="date" class="form-control" name="" value="">
            </div>
					</div>
				</div>
				<br>
				 <div class="contenedores" style="padding:10px;">
           <div class="row">
             <div class="col-12 col-lg-12">
 							<div class='inner-addon right-addon'>
 	              <div id='Icono' class='icono-inp'>
 	                <i class="fa fa-search" style="color:#000000;"></i>
 	              </div>
 					 			<input type="text" class="form-control text-center" onkeyup="Busqueda();"  style="border-radius:5px" placeholder="Introduzca algún dato de la orden a buscar" name="nptBuscar" id="nptBuscar" value="">
 							</div>
 						</div>
           </div>
           <br><br>
					 <div class="table-responsive">
             <table class="table table-hover" id="tableOrdenesHistorico">
               <thead>
                 <th class="">OT</th>
                 <th class="">Entrega Sol.</th>
                 <th class="">Registro</th>
                 <th class="">Estatus</th>
                 <th class="">Producto</th>
                 <th class="">Doctor</th>
                 <th class="">Paciente</th>
                 <th class="">Unidades</th>
                 <th class="">Pagado</th>
                 <th class="">Lib a Prod.</th>
               </thead>
             </table>
					 </div>
				 </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
		<?php include("scripts.php"); ?>
		<script type="text/javascript">
    var tableOrdenesHistorico = $('#tableOrdenesHistorico').dataTable({
      "language": {
        "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
        "zeroRecords": "NO HAY DOCTORES POR MOSTRAR",
        "info": "PÁGINA _PAGE_ DE _PAGES_",
        "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
        "infoFiltered": "",
        "search": "BUSCAR"
      },
      "columnDefs": [{
        "className": "dt-center", "targets": "_all"
      }],
      "order": [],
      "bSort": false,
      "bPaginate":false,
      "bFilter": false,
      "bInfo":false,
    });

		GetOrdenes();

    function Busqueda(){
      const TablaRenglon = document.getElementById('tableOrdenesHistorico');
      const TextoBusqueda = document.getElementById('nptBuscar').value.toLowerCase();
      let total = 0;
      for (let i = 1; i < TablaRenglon.rows.length; i++) {
          let found = false;
          const cellsOfRow = TablaRenglon.rows[i].getElementsByTagName('td');
          for (let j = 0; j < cellsOfRow.length && !found; j++) {
              const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
               if (TextoBusqueda.length == 0 || compareWith.indexOf(TextoBusqueda) > -1) {
                   found = true;
                   total++;
               }
           }
           if (found) {
               TablaRenglon.rows[i].style.display = '';
           } else {
               TablaRenglon.rows[i].style.display = 'none';
           }
       }
    }

     function GetOrdenes(){
       $.ajax({
         type:"POST",
         url:"Backend/DentLab/App.php",
         data:"op=getDoctores",
         success:function(response){
           response = JSON.parse(response.trim());
           tableOrdenesHistorico.fnClearTable();
           for (var i = 0; i < response.length; i++) {
             tableOrdenesHistorico.fnAddData([
							 `<a href="Doctor.php?d=${idDoctor}" style="color:#40C1CA">${response[i]["Nombre"]}</a>`,
               response[i]["Celular"],
               response[i]["Email"],
               response[i]["Vendedor"],
               response[i]["Notas"],
               response[i]["Clinica"],
               `<button type="button" class="btn btnEtiqueta" onclick="ModalEditar('${response[i]["idDoctores"]}','${response[i]["Nombre"]}','${response[i]["Vendedor_Id"]}',
							 '${response[i]["Doctor"]}','${response[i]["ApellidoPaterno"]}','${response[i]["ApellidoMaterno"]}','${response[i]["Clinica"]}',
							 '${response[i]["Email"]}','${response[i]["Celular"]}','${response[i]["Telefono"]}','${response[i]["Notas"]}')"><i class="fad fa-user-edit"></i></button>`,
               `<label class='switch' onclick="">
                   <input type='checkbox' id='chkMord${i}' ${propAct}>
                   <span class='slider round'></span>
                 </label>`,
               `<label class='switch' onclick="">
                   <input type='checkbox' id='chkMord${i}' ${propExt}>
                   <span class='slider round'></span>
                 </label>`
             ]);
           }
         },error:function(e){
           toastr.error(e.responseText,"ERROR 500");
         }
       })
     }

		 function getVendedores(id_vendedor){
			 $("#slcVendedores").html("");
			 $.ajax({
				 type:"POST",
				 url:"Backend/DentLab/App.php",
				 data:"op=getVendedores",
				 success:function(response){
					 response = JSON.parse(response.trim());
					 $("#slcVendedores").append(`<option value = "" selected disabled>Selecciona un vendedor</option>`)
					 var prop = "";
					 for (var i = 0; i < response.length; i++) {
						 if (response[i]["id_sys_usuario"] == id_vendedor) {
						 	 prop = "selected";
						 }
					 	$("#slcVendedores").append(`<option value = "${response[i]["id_sys_usuario"]}" ${prop}>${response[i]["Nombre"]}</option>`);
					 }
				 },error:function(e){
           toastr.error(e.responseText,"ERROR 500");
         }
			 })
		 }

		 function ModalEditar(idDoctor,dr,id_vend,nombre,ApellidoP,ApellidoM,Clinica,Email,Celular,Telefono,Notas){
			 $("#titleModal").text(dr);
			 $("#op").val("UpdateDoctor");
			 $("#idDoctor").val(idDoctor);

			 $("#nptNombre").val(nombre);
			 $("#nptAp").val(ApellidoP);
			 $("#nptAm").val(ApellidoM);
			 $("#nptClin").val(Clinica);
			 getVendedores(id_vend)
			 $("#nptMail").val(Email);
			 $("#nptCel").val(Celular);
			 $("#nptTel").val(Telefono);
			 $("#txtNota").text(Notas);


			 $("#ModalEditar").modal('toggle');
		 }

		 function UpdateDoctor(){
			 var opcion  = $("#op").val();
			 var idDoctor  = $("#idDoctor").val();
			 var Doctor  = $("#nptNombre").val();
			 var ApellidoPaterno  = $("#nptAp").val();
			 var ApellidoMaterno  = $("#nptAm").val();
			 var Email  = $("#nptMail").val();
			 var Clinica  = $("#nptClin").val();
			 var Notas  = $("#txtNota").val();
			 var Telefono  = $("#nptTel").val();
			 var Celular = $("#nptCel").val();
			 var Vendedor_Id = $("#slcVendedores").val();
			 var datasend = {
				 op:opcion,
				 idDoctor:idDoctor,
				 Doctor:Doctor,
				 ApellidoPaterno:ApellidoPaterno,
				 ApellidoMaterno:ApellidoMaterno,
				 Email:Email,
				 Clinica:Clinica,
				 Notas:Notas,
				 Telefono:Telefono,
				 Celular:Celular,
				 Vendedor_Id:Vendedor_Id
			 }
			 $.ajax({
				 type:"POST",
				 url:"Backend/DentLab/App.php",
				 data:datasend,
				 success:function(data){
					 if (data == "1") {
					 		toastr.success("Petición exitosa","ÉXITO");
							setTimeout(function () {
								location.reload();
							}, 1500);
					 }else {
					 		toastr.warning("Algo salio mal... intentalo de nuevo","WARNING");
					 }
					  $("#ModalEditar").modal('hide');
				 },error:function(e){
					 toastr.error(e.responseText,"ERROR 500");
				 }
			 })
		 }
		</script>
  </body>
</html>
