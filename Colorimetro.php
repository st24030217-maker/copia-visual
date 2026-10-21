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
            <li><a class="titulo"> Colorimetro </a></li>
            </ol>
          </section>
          <div class="contenedores">
            <div class="row">
              	<div class="col-lg-12 ">
                	<button type="button" class="btn btn-outline-success float-right" onclick="ColorimetroColorfunction('')">
                  <a class="fa fa-plus circle ps-3 " aria-hidden="true"></a> Agregar
									</button>
                </div>
              </div>
            </div>
            <br>

            <div class="row">
              <div class="col-lg-12">
                <div class="e-card">
                  <div class="e-card-content">
                    <div id="tableColorimetro"></div>
                  </div>
                </div>
              </div>
            </div>
        <!--MODAL-->
        <div class="modal fade" id="ModalColorimetro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
          <div class="modal-content ">
            <div class="modal-header ">
              <h5 class="modal-title" id='TituloModal'></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="formInserta" method="post" action="Backend/Colorimetro/App.php">
                <div class="form-group">
                  <input type="text" class="form-control" id="op" name="op" value="UpdateCategorias" style="display:none;">
                  <input type="text" class="form-control" id="txtIdColorimetro" name="txtIdColorimetro" style="display:none;">
                  <!-- Aqui -->
                  <div class="row">
                    <div class="col-12 col-lg-12">
                      <select class="form-control" name="slctMarca" id="slctMarca" required>
                        <option value="" selected disabled> Lista de marcas </option>
                        <?php
                        require_once("Backend/Colorimetro/Colorimetro.php");
                        $Colorimetro2 = new Colorimetro();
                        $ListMarcas = $Colorimetro2->getMarcasColorimetro();
                        for ($i=0; $i < sizeof($ListMarcas) ; $i++) {
                          $Tipos_Colorimetros_Marcas_Id = $ListMarcas[$i]["Tipos_Colorimetros_Marcas_Id"];
                          $Marca = $ListMarcas[$i]["Marca"];
                          echo "
                          <option value='$Tipos_Colorimetros_Marcas_Id'> $Marca </option>
                          ";
                        }
                        ?>
                      </select>
                    </div>
                    <div class="col-6 col-lg-6 text-center">
                      <span> Colorimetro </span>
                      <br>
                      <input type="text" name="txtColorimetro" id="txtColorimetro" value="" class="form-control" required placeholder="Nombre">
                    </div>
                    <div class="col-6 col-lg-6 text-center">
                      <span> Equivalente </span>
                      <br>
                      <input type="text" name="txtEquivalente" id="txtEquivalente" value="" class="form-control" required placeholder="Equivalente">
                    </div>
                    <div class="col-12 col-lg-12">
                      <input type="file" name="inpImagen" id="inpImagen" value="" class="form-control" required>
                    </div>
                    <div class="col-12" style="text-align: center;">
                      <hr>
                      <h4>Color principal</h4>
                      <input type="checkbox" id="chTypeColor" name="chTypeColor" class="form-control">
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
    <script type="text/x-jsrender" id="statusCOTemplate">
      ${statusCOSF(data)}
    </script>
    <script type="text/x-jsrender" id="detalleTemplate">
      ${detalleSF(data)}
    </script>
    <script type="text/x-jsrender" id="grupoPrincipalTemplate">
      ${grupoPrincipalSF(data)}
    </script>
		<?php include("scripts.php"); ?>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script type="text/javascript">
      ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');
      let tableC;
      getListadoColorimetrosAX();
      async function getListadoColorimetrosAX(){
        let dataS = {
          op: "getListadoColorimetrosAX"
        };
        let ajaxR = await pAjaxAsync(url_m_Colorimetro, dataS, 1);
        if (!!ajaxR) {
          console.log(ajaxR.Data);
          printListadoColorimetroAX(ajaxR.Data);
        }
      }
      const printListadoColorimetroAX = (data) => {
        if (tableC) {
          tableC.destroy();
        }
        tableC = new ej.grids.Grid({
          dataSource: data,
          height: '60vh',
          columns: [
            { field: "Colorimetro", headerText: "COLORIMETRO", width: 100},
            { field: "Marca", headerText: "MARCA", width: 100},
            { field: "", headerText: "GRUPO PRINCIPAL", width: 30, template: "#grupoPrincipalTemplate", textAlign: "Center"},
            { field: "Activo", headerText: "STATUS", width: 30, template: "#statusCOTemplate"},
            { field: "", headerText: "ACTUALIZAR", width: 30, template: "#detalleTemplate"},
          ]
        });
        tableC.appendTo("#tableColorimetro");
      }
      window.statusCOSF = (e) => {
        let div = document.createElement('div');
        let checkB = `<input type="checkbox" id="checkCO-${e.Tipos_Colorimetros_Color_Id}" ${e.Activo == 1 ? 'checked' : ''} class="form-control" 
        onclick="ActualizarStatus('${e.Activo}','${e.Tipos_Colorimetros_Color_Id}')"></input>`;
        $(div).append(checkB);
        return div.outerHTML;
      }

      window.detalleSF = (e) => {
        let div = document.createElement('div');
        let btn = `
        <button class="btn btn-warning" onclick="ColorimetroColorfunction('${e.Tipos_Colorimetros_Color_Id}')">
          <i class= 'fa fa-refresh'></i>
        </button>`;
        $(div).append(btn);
        return div.outerHTML;
      }
      
      window.grupoPrincipalSF = (e) => {
        let div = document.createElement('div');
        let icon = "";
        if (e.GrupoPrincipal == 1) {
          icon = `<i class="fas fa-check" style="color: green;"></i>`;
        } else {
          icon = `<i class="fas fa-slash" style="color: red;"></i>`;
        }
        $(div).append(icon);
        return div.outerHTML;
      }
      function ColorimetroColorfunction(idColorimetro)
        {
  				if (idColorimetro !="") {
  					$("#TituloModal").text("Actualizar Color");
  					$("#txtIdColorimetro").val(idColorimetro);
  					$("#btnguardar").text("Actualizar");
  					$("#op").val("updateColorimetroColor");
  					$.ajax({
  						type:"POST",
  						url:"Backend/Colorimetro/App.php",
  						data:"op=getDetalleColorimetroColor"+
  						"&idColorimetro="+idColorimetro,
  						success:function(response){
  							response=JSON.parse(response.trim());
  							$("#slctMarca").val(response.Tipos_Colorimetros_Marca_Id);
  							$("#txtColorimetro").val(response.Colorimetro);
  							$("#txtEquivalente").val(response.Equivalente);
                $("#chTypeColor").prop("checked", response.GrupoPrincipal == 1 ? true : false);
                $("#inpImagen").removeAttr("required");
  						},
  						error:function(e){
  							alert(e.responseText);
  						}
  					});
  				} else {
  					$("#TituloModal").text("Agregar Color");
  					$("#slctMarca").val("");
  					$("#txtColorimetro").val("");
  					$("#txtEquivalente").val("");
  					$("#btnguardar").text("Guardar");
  					$("#txtIdColorimetro").val("");
            $("#chTypeColor").prop("checked", true);
  					$("#op").val("addColorimetroColor");
            $("#inpImagen").attr("required", true);
  				}
  				$("#ModalColorimetro").modal("toggle");
  			}
  		$("#btnguardar").click(function(event){
  			if (document.getElementById("formInserta").checkValidity()) {
  				event.preventDefault();
  				var form= $("#formInserta")[0];
  				var data = new FormData(form);
  				$.ajax({
  					type: "POST",
  					url: "Backend/Colorimetro/App.php",
  					data: data,
  					enctype: "multipart/form-data",
  					processData:false,
  					contentType:false,
  					cache: false,
  					timeout:600000,
  					success:function(data){
  						if (data=="1") {
  						 Alerta("success","Actualizado Correctamente");
  						 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
  							 location.reload();
  						 }, 1500);
  						}
  						else{
  							Alerta("error","No se Actualizo Correctamente");
  							// setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
  							// 	location.reload();
  							// }, 1500);
  						}
  						$("#ModalColorimetro").modal("hide");
  					},
  					error:function(e){
  						alert(e.responseText);
  					}
  				});
  			} else {
          Alerta("info", 'Ingrese todos los datos');
        }
  		});


      function ActualizarStatus(Status,IdColorimetro){
        let status1;
          if (Number(Status) == 0) {
            status1 ="1";
          }else {
            status1 = "0";
          }
          $.ajax({
          type:"POST",
          url:"Backend/Colorimetro/App.php",
          data:"op=updateStatus"+
          "&Status="+status1+"&IdColorimetro="+IdColorimetro,
          success:function(data){
            if(data=="1"){
              Alerta("success","Operacion Exitosa");
              let dataCO = tableC.dataSource.find( x => x.Tipos_Colorimetros_Color_Id == IdColorimetro);
              if (dataCO) {
                console.log(status1);
                dataCO.Activo = status1;
                tableC.refresh();
              }
              // setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
              //   location.reload();
              // }, 1500);
            }else{
              Alerta("error","No se Realizo Correctamente");
              setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
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
