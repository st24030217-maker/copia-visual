<table class="table table-hover table-sm" id="tableEntrega">
  <thead>
    <th>OT</th>
    <th>PROD</th>
    <th>UNI</th>
    <th>DOCTOR</th>
    <th>ENT</th>
    <th>EST</th>
  </thead>
  <tbody>
  </tbody>
</table>

  <script type="text/javascript">

  var tableEntrega = $('#tableEntrega').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      "zeroRecords": "NO HAY ORDENES POR MOSTRAR",
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
  GetOrdenesEntrega();
  function GetOrdenesEntrega(){
    $.ajax({
      type:"POST",
      url:"Backend/DentLab/App.php",
      data:"op=GetOrdenesEntrega",
      success:function(response){
        response = JSON.parse(response.trim());
        tableEntrega.fnClearTable();
        let arrPrintColor = [];
        for (var i = 0; i < response.length; i++) {
          var OTbase64 = btoa(response[i]["Ordenes_trabajo_id"]);
          var LBbase64 = btoa("index.php");
          if (response[i]["TipoDoctorExterno"] == 0) {
              rowClass = 'row-green';
              arrPrintColor.push(OTbase64);
          }
          let addId = tableEntrega.fnAddData([
            `<a href="OrdenTrabajo.php?OT=${OTbase64}&LB=${LBbase64}" style="color:#40C1CA">${response[i]["Serie"]}</a>`,
            response[i]["Producto"].toUpperCase(),
            response[i]["Piezas"],
            response[i]["Doctor"] + " " +response[i]["paquetes"],
            response[i]["FechaEntregaSolicitada"],
            response[i]["SubEstado"].toUpperCase()
          ]);
          let Nodo = $('#tableEntrega').dataTable().fnSettings().aoData[addId[0]].nTr;
          Nodo.setAttribute('id','TREnt' + OTbase64);
        }
        let cantPrintColor = arrPrintColor.length;
        if (cantPrintColor > 0) {
          for (var i = 0; i < cantPrintColor; i++) {
            let element = document.getElementById("TREnt" + arrPrintColor[i]);
            if (element) {
                if (element.classList.contains('odd')) {
                    element.classList.remove('odd');
                }
                if (element.classList.contains('even')) {
                    element.classList.remove('even');
                }
                element.classList.add('row-green');
            }
          }
        }
      },error:function(e){
        toastr.error(e.responseText,"ERROR 500");
      }
    })
  }
  </script>
