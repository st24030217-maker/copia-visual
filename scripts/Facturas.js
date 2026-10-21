$(document).ready(function(){
  GetCFDI();
});

$("#btnFacturar").click(function(event){
  Swal.fire({
    title: '¿Estas seguro de realizar la factura?',
    text: "Una vez realizada la factura no podra corregirse",
    icon: 'question',
    allowOutsideClick: false,
    allowEscapeKey : false,
    showCancelButton: true,
    confirmButtonColor: '#43B0B3',
    cancelButtonColor: '#AAB7B7',
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      
    }
  });
});

function GetCFDI(){
  var datasend={
    op:"GetCFDI"
  };
  $.ajax({
    type:"POST",
    url:"Backend/Facturacion/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slcCFDI").append(`<option value="${response[i]["idCFDI"]}">${response[i]["idCFDI"]} - ${response[i]["Descripcion"]}</option>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}
