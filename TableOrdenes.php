<?php
 $NoPagina = $_GET["Pagina"] ?? 1;
 $NoOrden = $_GET["Orden"] ?? "";
 ?>
<input type="hidden" id="inpNoPagina" value="<?= $NoPagina ?>">
<input type="hidden" id="inpNoOrden" value="<?= $NoOrden ?>">
<style media="screen">
  .header{
        position:sticky;
        top: 0 ;
        background-color: black;
        color: white;
    }
</style>
<br>
<table class="table table-hover text-center table-sm" id="tableOrdenes">
  <thead>
    <th class="header">ET</th>
    <th class="header">OT</th>
    <th class="header">DOC</th>
    <th class="header">FOLIO</th>
    <th class="header">ENTREGA</th>
    <th class="header">ESTADO</th>
    <th class="header">PRODUCTO</th>
    <th class="header">DOCTOR</th>
    <th class="header">PACIENTE</th>
    <th class="header">UNIDADES</th>
    <th class="header">LIB PROD</th>
    <th class="header">MONTO</th>
  </thead>
  <tbody>
  </tbody>
</table>
<div class="row" style="display:none;" id="divComp">
  <div class='col-md-12'>
    <svg id='codOT'>

    </svg>
  </div>
</div>
<script src="vendors/barcode/JsBarcode.all.min.js"></script>
<script type="text/javascript">

var tableOrdenes = $('#tableOrdenes').dataTable({
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

function Codbar(serie){
  JsBarcode(`#codOT`, serie, {
    format: "CODE128",
    width: 2.5,
    height: 10,
    fontSize: 10
  });
}

GetOrdenes();
function GetOrdenes(){
  let NoPagina = Number($("#inpNoPagina").val());
  let NoOrden = $("#inpNoOrden").val();
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=GetOrdenes"+"&NoPagina="+NoPagina+"&NoOrden="+NoOrden,
    success:function(response){
      response = JSON.parse(response.trim());
        tableOrdenes.fnClearTable();
        let arrPrintColor = [];
        for (var i = 0; i < response.length; i++) {
          var OTbase64 = btoa(response[i]["Ordenes_trabajo_id"]);
          var IDbase64 = btoa(response[i]["Doctor_id"]);
          var LBbase64 = btoa("index.php");


          if (response[i]["TipoDoctorExterno"] == 0) {
            let classElem = "";
            console.log(response[i]["idLab_Estado"]);
            switch (Number(response[i]["idLab_Estado"])) {
              case 4:
                classElem = "row-green";
                break;
              default:
                classElem = "row-yellow";
                break;
            }
              arrPrintColor.push({
                elem: OTbase64,
                class: classElem
              });
          }
          let addId = tableOrdenes.fnAddData([
            `<button class="btn btnEtiqueta" type="button" onclick="Etiqueta('${response[i]["Ordenes_trabajo_id"]}',${response[i]["Serie"]})"><i class="fa-solid fa-barcode"></i></button>`,
            `<button class="btn btnEtiqueta" type="button" onclick="window.location.href='OrdenTrabajo.php?OT=${OTbase64}&LB=${LBbase64}'"><i class="fa fa-tooth"></i></button>`,
            `<button class="btn btnEtiqueta" type="button" onclick="window.location.href='Doctor.php?d=${IDbase64}'"><i class="fas fa-user-md"></i></button>`,
            response[i]["Serie"],
            response[i]["Fecha_entrega_solicitada"],
            response[i]["Estado"],
            response[i]["Producto"],
            response[i]["Doctor"],
            response[i]["paciente"],
            response[i]["Piezas"],
            response[i]["Liberada_prod"],
            "$"+response[i]["Monto"]
          ]);
          let Nodo = $('#tableOrdenes').dataTable().fnSettings().aoData[addId[0]].nTr;
          Nodo.setAttribute('id','TROrd' + OTbase64);
        }
        let cantPrintColor = arrPrintColor.length;
        console.log(arrPrintColor);
        if (cantPrintColor > 0) {
          for (var i = 0; i < cantPrintColor; i++) {
            let element = document.getElementById("TROrd" + arrPrintColor[i]["elem"]);
            if (element) {
                if (element.classList.contains('odd')) {
                    element.classList.remove('odd');
                }
                if (element.classList.contains('even')) {
                    element.classList.remove('even');
                }
                element.classList.add(arrPrintColor[i]["class"]);
            }
          }
        }
        // $("#TotalOrdenes").text(TotalOrdenes);
        // $("#TotalUnidades").text(TotalUnidades);
        // $("#TotalSaldo").text("$"+TotalSaldo.toFixed(2));
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function Etiqueta(orden_id,serie){
  if (window.dentShowExecutiveLabelLoading) {
    window.dentShowExecutiveLabelLoading({ serie: serie });
  } else {
    $.blockUI({ message: `<h4 style="text-align:center">GENERANDO ETIQUETA, POR FAVOR ESPERE...</h4>`, css: { backgroundColor: null, color: '#fff', border: null } });
  }
  Codbar(serie);
  var id_alumno=$("#slcAlumnos").val();
  var datasend={
    op:"getOrdenTrabajo",
    idOrdenTrabajo:orden_id
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response=JSON.parse(response.trim());
      var d = response[0] || {};
      if (window.dentShowExecutiveLabelLoading) {
        window.dentShowExecutiveLabelLoading({
          serie: d["Serie"] || serie,
          doctor: d["Doctor"],
          paciente: d["Paciente"],
          fechaEntrega: d["Fecha_entrega_solicitada"],
          celular: d["Celular"],
          producto: d["Producto"],
          piezas: d["Piezas"],
          color: d["colorimetro"],
          observaciones: d["Observaciones"]
        });
      }
      Codbar(response[0]["Serie"]);
      var frame1 = document.getElementById('dentThermalPrintFrame');
      if (!frame1) {
        frame1 = document.createElement('iframe');
        frame1.id = 'dentThermalPrintFrame';
        frame1.name = 'dentThermalPrintFrame';
        frame1.style.cssText = 'position:fixed;right:0;bottom:0;width:105mm;height:80mm;min-width:440px;opacity:0.001;pointer-events:none;z-index:-999;border:none;';
        document.body.appendChild(frame1);
      }

      var codeBar = $("#divComp").html();
      var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
      frameDoc.document.open();
      frameDoc.document.write(`<!DOCTYPE html>
                              <html lang="es">
                                <head>
                                  <meta charset="utf-8">
                                  <title></title>
                                  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
                                  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet">
                                  <style>
                                    @page { size: auto; margin: 0mm !important; }
                                    @media print {
                                      html, body { width: 100% !important; margin: 0 !important; padding: 0 !important; background: #fff !important; color: #000 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                                      .dent-print-card { width: 100% !important; max-width: 96mm !important; margin: 0 !important; padding: 1.5mm 2.5mm !important; overflow: visible !important; }
                                    }
                                    * { box-sizing: border-box !important; font-family: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif !important; }
                                    html, body { margin: 0 !important; padding: 0 !important; background: #fff; color: #000; }
                                    .dent-print-card { width: 100%; max-width: 96mm; margin: 0; padding: 1.5mm 2.5mm; text-align: center; overflow: visible; }
                                    table { width: 100%; table-layout: fixed; border-collapse: collapse; margin: 0; padding: 0; }
                                    td { padding: 1px 0; vertical-align: middle; word-wrap: break-word; overflow-wrap: break-word; }
                                    .mono-num { font-variant-numeric: tabular-nums; }
                                    svg { display: block; margin: 2px auto 0 auto; max-width: 100%; height: auto; }
                                  </style>
                                </head>
                                <body>
                                <div class="dent-print-card">
                                  <table>
                                    <tr>
                                      <td style="text-align:left;width:34%;font-size:12px;font-weight:700;white-space:nowrap;" class="mono-num">OT: ${response[0]["Serie"]}</td>
                                      <td style="text-align:center;width:32%;font-weight:700;font-size:9px;letter-spacing:0.02em;">dentlab.mx</td>
                                      <td style="text-align:right;width:34%;font-size:9.5px;font-weight:600;white-space:nowrap;" class="mono-num">F. Ent: ${response[0]["Fecha_entrega_solicitada"]}</td>
                                    </tr>
                                  </table>
                                  <table>
                                    <tr>
                                      <td style="text-align:center;width:100%;font-size:12.5px;padding:1px 0;"><strong>${response[0]["Doctor"]}</strong></td>
                                    </tr>
                                  </table>
                                  <table>
                                    <tr>
                                      <td style="text-align:left;width:100%;font-size:8.5px;line-height:1.2;">Dirección: <strong>${response[0]["Direccion"]}</strong></td>
                                    </tr>
                                  </table>
                                  <table>
                                    <tr>
                                      <td style="text-align:left;width:65%;font-size:12px;line-height:1.2;">Px: <strong>${response[0]["Paciente"]}</strong></td>
                                      <td style="text-align:right;width:35%;font-size:9px;white-space:nowrap;" class="mono-num">Tel: <strong>${response[0]["Celular"]}</strong></td>
                                    </tr>
                                  </table>
                                  <table>
                                    <tr>
                                      <td style="text-align:left;width:100%;font-size:8.5px;">Prod: <strong>${response[0]["Producto"]}</strong></td>
                                    </tr>
                                  </table>
                                  <table>
                                    <tr>
                                      <td style="text-align:left;width:30%;font-size:8.5px;white-space:nowrap;" class="mono-num">Unid: <strong>${response[0]["Piezas"]}</strong></td>
                                      <td style="text-align:left;width:70%;font-size:8.5px;">Color: <strong>${response[0]["colorimetro"]}</strong></td>
                                    </tr>
                                  </table>
                                  ${response[0]["Observaciones"] ? `<table>
                                    <tr>
                                      <td style="text-align:left;width:100%;font-size:8.5px;line-height:1.2;">Obs: <strong>${response[0]["Observaciones"]}</strong></td>
                                    </tr>
                                  </table>` : ''}
                                  <div style="width:100%;display:flex;justify-content:center;align-items:center;padding-top:2px;">
                                    ${codeBar}
                                  </div>
                                </div>
                               </body>
                             </html>`);
      frameDoc.document.close();
      setTimeout(function () {
        if (frame1.contentWindow) {
          frame1.contentWindow.focus();
          frame1.contentWindow.print();
        }
      }, 2500);

      setTimeout(function () {
        if (window.dentHideExecutiveLabelLoading) {
          window.dentHideExecutiveLabelLoading();
        }
        $.unblockUI();
      }, 2750);

      return false;
    },error:function(e){
      if (window.dentHideExecutiveLabelLoading) {
        window.dentHideExecutiveLabelLoading();
      }
      $.unblockUI();
      toastr.error(e.responseText, "ERROR 500");
    }
  });
}
</script>
