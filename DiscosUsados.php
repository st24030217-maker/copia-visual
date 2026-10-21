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
	.search-container {
		display: flex;
		align-items: center;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		background-color: #fff;
	}

	.search-input {
		border: 1px solid #ccc;
		border-radius: 5px 0 0 5px;
		padding: 10px;
		font-size: 16px;
		flex: 1;
		outline: none;
		transition: border-color 0.3s;
	}

	.search-input:focus {
		border-color: #007bff;
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
            <li><a class="titulo"> Discos Usados</a></li>
            </ol>
          </section>
					<hr>
					<div class="row">
						<div class="col-12">
							<div class="e-card">
								<div class="e-card-header">
									<div class="e-card-header-caption">
										<div class="e-card-header-title">
											CANTIDAD DE DISCOS USADOS
										</div>
									</div>
								</div>
								<div class="e-card-content">
									<h5 id="tx_diskUsed"></h5>
								</div>
							</div>
						</div>
						<div class="col-12">
							<hr>
							<div class="e-card">
								<div class="e-card-header">
									<div class="e-card-header-caption">
										<div class="e-card-header-title">
											FILTROS
										</div>
									</div>
								</div>
								<div class="e-card-content">
									<div class="row">
										<div class="col-12 col-lg-9">
											<div class="row">
												<div class="col-12 col-lg-4">
													<select id="sel_brands" class="form-control"></select>
												</div>
												<div class="col-12 col-lg-4">
													<select id="sel_colors" class="form-control"></select>
												</div>
												<div class="col-12 col-lg-4">
													<select id="sel_size" class="form-control"></select>
												</div>
											</div>
										</div>
										<div class="col-12 col-lg-3" style="text-align: center">
											<div class="row">
												<div class="col-6">
													<div class="row">
														<div class="col-12">
															<span>Filtrar</span><br>
														</div>
														<div class="col-12">
															<button type="button" class="btn-btn btn btn-primary" id="btn_filter"><i class="fas fa-sort-amount-down"></i></button>
														</div>
													</div>
												</div>
												<div class="col-6">
													<div class="row">
														<div class="col-12">
															<span>Eliminar Filtro</span><br>
														</div>
														<div class="col-12">
															<button type="button" class="btn btn-danger" name="button" id="btn_deletefilter"><i class="fa fa-ban"></i></button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12">
							<hr>
							<div class="e-card">
								<div class="e-card-header">
									<div class="e-card-header-caption">
										<div class="e-card-header-title">
											BUSCADOR
										</div>
									</div>
								</div>
								<div class="e-card-content">
									<div class="search-container">
										<input id="searchTerm" type="text" class="search-input" placeholder="Ingrese el número de discos o de orden a buscar..." style="width:100%;text-align:center"> </input>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12">
							<hr>
							<div class="e-card">
								<div class="e-card-content">
									<div id="tableDisk"></div>
									<div id="pagination"></div>
								</div>
							</div>
						</div>
					</div>
        </div>
			</div>
		</div>
      <?php include("footer.php"); ?>
  </div>

		<?php include("scripts.php"); ?>
		<script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
		<script src="scripts/Discos/DiscosUsados.js" charset="utf-8"></script>
  </body>
</html>
