ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

let tableD;
var filter = {
 ui: {
   create: function (args) {
     var flValInput = ej.base.createElement('input', {
       className: 'flm-input',
     });
     args.target.appendChild(flValInput);
     var fieldName = args.column.field;
     var dropdownData = [...new Set(tableD.dataSource.map(item => item[fieldName]))];
     dropInstance = new ej.dropdowns.MultiSelect({
       dataSource: ordenarMixto(dropdownData),
       placeholder: 'Select a value',
       popupHeight: '200px',
       allowFiltering: true,
       mode: 'Delimiter',
     });
     dropInstance.appendTo(flValInput);
   },
   write: function (args) {
     var fieldName = args.column.field;
     var filteredValue = [];
     tableD.filterSettings.columns.forEach((item) => {
       if (item.field === fieldName && item.value) {
         filteredValue.push(item.value);
       }
     });
     if (filteredValue.length > 0) {
       dropInstance.value = filteredValue;
     }
   },
   read: function (args) {
     tableD.removeFilteredColsByField(args.column.field);
     args.fltrObj.filterByColumn(
       args.column.field,
       args.operator,
       dropInstance.value
     );
   },
 },
};
tableD = new ej.grids.Grid({
  allowFiltering: true,
  allowTextWrap: true,
  allowSorting: true,
  enableInfiniteScrolling : true,
  filterSettings: { type: 'Menu' },
  height: '60vh',
  showColumnChooser: true,
  toolbar: ['Print', 'PdfExport', 'ExcelExport', 'ColumnChooser', 'Search'],
  allowPdfExport: true,
  allowExcelExport: true,
  dataSource: [],
  columns: [
    {field: "", headerText: "", template: "#btnGoOrderTemplate"},
    {field: "Serie", headerText: "Serie OT", filter: filter},
    {field: "FormaPago", headerText: "FORMA PAGO", filter: filter},
    {field: "Fecha_entrega_solicitada", headerText: "Entrega", filter: filter},
    {field: "Estado", headerText: "Estado", filter: filter},
    {field: "Producto", headerText: "Producto", filter: filter},
    {field: "paciente", headerText: "Paciente", filter: filter},
    {field: "Piezas", headerText: "Piezas", filter: filter},
    // {field: "Liberada_prod", headerText: "Lib Prod", filter: filter},
    {field: "Monto", headerText: "Pagado", filter: filter, valueAccessor: currencyFormatter},
  ],
  aggregates: [
    {
      columns: [
        {
          type: "Sum",
          field: "Monto",
          format: "C2",
          footerTemplate: "${Sum}",
        },
      ],
    },
  ],
});
tableD.appendTo('#tableD');
intitializeSelGblDoctors();
function intitializeSelGblDoctors() {
  $("#s_searchDoctor").select2({
    minimumInputLength: 3,
    width: "100%",
    placeholder: ' - Elegir una opcion - ',
    ajax: {
      delay: 700,
      transport: async function(params, success, failure) {
        let actV = params.data.term;
        let searchTerm = "";
        if (!actV) {
          $("#s_searchDoctor").empty().trigger('change');
          success({ results: [] });
          return;
        } else {
          searchTerm = actV;
        }
        if (searchTerm.length > 3) {
          let ajaxR = await pAjaxAsync(url_m_Doctores, {
            op: "searchDoctor",
            data: searchTerm
          });
          if (ajaxR.Resultado) {
            const data = ajaxR.Data.map(item => ({
              id: item.idDoctores,
              text: (item.Doctor).trim()
            }));
            success({ results: data });
          } else {
            $("#s_searchDoctor").empty().trigger('change');
            success({ results: [] });
          }
        } else {
          $("#s_searchDoctor").empty().trigger('change');
          success({ results: [] });
        }
      }
    }
  });
}

$(document).on('change', '#s_searchDoctor', function(event){
  if (!!event.target.value) {
    getOrdersBySearchedDoctor();
  }
});

const getOrdersBySearchedDoctor = async () => {
  let ajaxR = await pAjaxAsync(url_m_Ordenes, {
    op: 'getOrdersBySearchedDoctor',
    doctor: $('#s_searchDoctor').val()
  });
  if (!!ajaxR) {
    console.log(ajaxR);
    printOrdersBySearchedDoctor(ajaxR.Data);
  }
}

const printOrdersBySearchedDoctor = (data) => {
  if (tableD) {
    tableD.dataSource = data;
    tableD.refresh();
  }
}

window.btnGoOrderSF = (e) => {
  var idDoctor = $("#idDoc").val();
  var OTbase64 = btoa(e.Ordenes_trabajo_id);
  var Dbase64 = btoa(idDoctor);
  var LBbase64 = btoa("Doctor.php?d="+Dbase64);
  let div = document.createElement('div');
  let btn = `<button class="btn btnEtiqueta" type="button" onclick="window.location.href='OrdenTrabajo.php?OT=${OTbase64}&LB=${LBbase64}'"><i class="fa fa-tooth fa-2x"></i></button>`;
  $(div).append(btn);
  return div.outerHTML;
}

function ordenarMixto(arreglo) {
  arreglo = arreglo.map(item => {
    return !isNaN(item) && typeof item === 'string' ? Number(item) : item;
  });
  arreglo.sort((a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    return (typeof a === 'number') ? -1 : 1;
  });
  return arreglo;
}

function currencyFormatter(field, data, column) {
  // valueAccessor: currencyFormatter
  let num = Number(data[field]);
  const esFlotante = num % 1 !== 0;
  let numeroFormateado;
  if (esFlotante) {
    // Primero, formateamos el número a dos decimales
    numeroFormateado = num.toFixed(2);
    // Luego, agregamos las comas como separadores de miles
    numeroFormateado = numeroFormateado.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    // En el caso de que sea un número entero, también formateamos a dos decimales
    numeroFormateado = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return "$" + numeroFormateado;
}
