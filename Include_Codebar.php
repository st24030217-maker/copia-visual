
<?php
  $cantidad = $_GET["cantidad"] ?? "";
  $marca = $_GET["marcaD"] ?? "";
  // $color = $_GET["color"] ?? "";
  // $tamano = $_GET["tamano"] ?? "";
  for ($i=0; $i <$cantidad ; $i++) {
    echo "
    <div id='container$i' style='page-break-before: always'>
    <div name='txtCont'>
    </div>
    <div class='col-md-12'>
      <svg id='codProducto$i'>

      </svg>
    </div>
    </div>
    ";
  }
 ?>
