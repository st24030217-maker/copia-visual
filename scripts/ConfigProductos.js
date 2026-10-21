$(document).ready(function(){
  getMembresias();
});

function getMembresias(){
  var datasend={
    op:"GetMembresias"
  };
  $.ajax({
    type:"POST",
    url:"Backend/Productos/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#divMembresia").append(`
          <div class="col-12 col-lg-3">
            <div class="contenedorDos" style="margin:10px;box-shadow:8px 8px 8px #DFECF5">
              <img src="../Membresias/debit-cards.png" height="160vh" width="180vh" style="margin:5px;"></img>
              <h6><strong>${response[i]["Tipo"]}</strong></h6>
              <form method="POST" id="frmListado${i}" name="frmListado${i}" action="ListadoMemProductos.php">
                <input type="text" class="form-control" value="${response[i]["idMembresias"]}" name="nptMem" style="display:none;">
                <input type="text" class="form-control" value="${response[i]["Tipo"]}" name="nptTipo" style="display:none;">
                <button class="btn Listado" onclick="document.getElementById('frmListado${i}').submit();">Ver Listado</button>
              </form>
            </div>
          </div>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}
