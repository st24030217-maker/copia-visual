<?php

if(isset($_COOKIE["tipo_sesion"])){
  if (($_COOKIE["tipo_sesion"] ?? "") != "1") {
    echo '<meta http-equiv="refresh" content="0;url=logout.php">';
    die();
  }

};

if(!isset($_COOKIE["sesion"])){
  echo '<meta http-equiv="refresh" content="0;url=login.php">';
  die();
};


?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href='librerias/syncfusion/css/tailwind.css' rel='stylesheet'>
<link rel="icon" href="production/images/favicon.ico" type="image/ico">
<link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
<link href="vendors/nprogress/nprogress.css" rel="stylesheet">
<link href="vendors/iCheck/skins/flat/green.css" rel="stylesheet">
<link href="vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
<link href="vendors/jqvmap/dist/jqvmap.min.css" rel="stylesheet">
<link href="vendors/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">
<link href="vendors/toastr/toastr.min.css" rel="stylesheet">
<!-- <link href="build/css/custom.min.css" rel="stylesheet"> -->
<link href="build/css/custom.css" rel="stylesheet">
<link href="src/scss/styles.scss" rel="stylesheet">
<link rel="stylesheet" href="vendors/datetimepicker/bootstrap-datetimepicker.min.css">
<link rel="stylesheet" href="vendors/datetimepicker/bootstrap-datetimepicker.css">

<!-- <link rel="stylesheet" type="text/css" href="vendors/evocalendar/evo-calendar/css/evo-calendar.css"/>
<link rel="stylesheet" type="text/css" href="vendors/evocalendar/evo-calendar/css/evo-calendar.midnight-blue.css"/> -->

<link href="vendors/select_2/select2/css/select2.min.css" rel="stylesheet" type="text/css">
<link href="vendors/select_2/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css">
<!-- <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.1.0/css/all.css"> -->
<!-- <link rel="stylesheet" href="https://awsoftware.mx/web_combugas/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
<link rel="stylesheet" href="https://awsoftware.mx/web_combugas/plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
<link rel="stylesheet" href="https://awsoftware.mx/web_combugas/plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
<link rel="stylesheet" href="https://awsoftware.mx/web_combugas/plugins/select2/css/select2.min.css">
<link rel="stylesheet" href="https://awsoftware.mx/web_combugas/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css"> -->
<link rel="stylesheet" type="text/css" href="librerias/evocalendar/evo-calendar/css/evo-calendar.css"/>
<link rel="stylesheet" type="text/css" href="librerias/evocalendar/evo-calendar/css/evo-calendar.midnight-blue.css"/>

<!-- CSS -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
<!-- Default theme -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
<!-- Semantic UI theme -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css" />
<!-- Bootstrap theme -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"
    integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- <link href="dist/css/pages/data-table.css" rel="stylesheet"> -->

<style media="screen">
.titulo{
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
  padding: 8px;

}

.contenedores{
  background-color: #FFFFFF ;
  border-radius: 10px;
  padding: 8px;
  text-align:center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.contenedores  .text-st{
  font-size:12px;
  color:#393939;
  font-family: inherit;
}

.contenedoresMenuIndex{
  margin-top:40px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #202020  ;
  border-radius: 8px;
  box-shadow: 5px 8px 15px #DCDCDC;
  text-align:center;
}
.contenedoresMenuIndexOT{
  margin-top:40px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 5px 8px 15px #DCDCDC;
  text-align:center;
}

.contenedoresIndex{
  background-color: #ffffff  ;
  border-radius: 8px;
  padding: 0px 0px 8px 0px;
  text-align:center;
  box-shadow: 5px 8px 15px #DCDCDC;
  height: 50vh;

}

.contenedoresIndex .span{
  margin:0px;
  padding: 10px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: #202020;
  color:white;
  font-size: 18px;
}

.btnEtiqueta{
  background-color: #40C1CA;
  border-radius: 5px;

}

.btnEtiqueta i{
  color: #FFFFFF
}


.contenedoresTres{
  background-color: #EAEAEA  ;
  border-radius: 5px;
  padding: 8px;
  text-align:center;
}

.contenedoresTres  .text-st{
  font-size:12px;
  color:#393939;
  font-family: inherit;
}

.contenedoresCuatro{
  background-color: #FFFFFF  ;
  border-radius: 10px;
  padding: 8px;
  text-align:center;
  box-shadow: 5px 10px 18px #DCDCDC;
}

.contenedoresCuatro  .text-st{
  font-size:12px;
  color:#393939;
  font-family: inherit;
}

.contenedorDos{
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 8px;
  text-align:center;
}

.contenedorCinco{
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 8px;
  text-align:center;
  border: 2px solid #000000;
}


a:hover{
  cursor:pointer;
}

.btnIconoDelete{
  border-radius:10px;
  background-color: #D10202;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoDelete:hover{
  border-radius:30px;
  background-color: #D32525;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoDelete i{
  color:#FFFFFF;
  margin-top: 3px;

}

.btnIconoUpload{
  border-radius:10px;
  background-color: #02D162 ;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoUpload:hover{
  border-radius:30px;
  background-color: #3BEC8D ;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoUpload i{
  color:#FFFFFF;
  margin-top: 3px;
}
.btnIconoEdit{
  border-radius:10px;
  background-color: #EAD223 ;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoEdit:hover{
  border-radius:30px;
  background-color: #F3DA23 ;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoEdit i{
  color:#FFFFFF;
  margin-top: 3px;
}
.btnIconoDrop{
  border-radius:10px;
  background-color: #CB3B1C ;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoDrop:hover{
  border-radius:30px;
  background-color: #EB4724 ;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoDrop i{
  color:#FFFFFF;
  margin-top: 3px;
}
.btnIconoChange{
  border-radius:10px;
  background-color: #7EE341 ;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoChange:hover{
  border-radius:30px;
  background-color: #74CF3D ;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoChange i{
  color:#FFFFFF;
  margin-top: 3px;
}

.btnIconoReenviar{
  border-radius:10px;
  background-color: #31CDD5;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoReenviar:hover{
  border-radius:30px;
  background-color: #28A1A7;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoReenviar i{
  color:#FFFFFF;
  margin-top: 3px;
}

.btnIconoVer{
  border-radius:10px;
  background-color: #EA7C59;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoVer:hover{
  border-radius:30px;
  background-color: #CF5D38;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoVer i{
  color:#FFFFFF;
  margin-top: 3px;
}

.btnIconoAgregar{
  border-radius:10px;
  background-color: #7EC230;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoAgregar:hover{
  border-radius:30px;
  background-color: #69A427;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoAgregar i{
  color:#FFFFFF;
  margin-top: 3px;
}

.btnIconoSelect{
  border-radius:10px;
  background-color: #3486D4;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoSelect:hover{
  border-radius:30px;
  background-color: #28639C;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoSelect i{
  color:#FFFFFF;
  margin-top: 3px;
}

.btnIconoReturn{
  border-radius:10px;
  background-color: #3486D4;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoReturn:hover{
  border-radius:30px;
  background-color: #28639C;
  transform: scale(1.1);
  transition: all 0.5s;
}
.btnIconoReturn i{
  color:#FFFFFF;
  margin-top: 3px;
}
.btnIconoParciales{
  border-radius:10px;
  background-color: #508CB4;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoParciales:hover{
  border-radius:30px;
  background-color: #176AA0;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoParciales i{
  color:#FFFFFF;
  margin-top: 3px;

}
.btnIconoInsertParciales{
  border-radius:10px;
  background-color: #42A2B1;
  box-shadow: 0px 5px 15px #888888
}
.btnIconoInsertParciales:hover{
  border-radius:30px;
  background-color: #2696A7;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoInsertParciales i{
  color:#FFFFFF;
  margin-top: 3px;

}
.btnIconoDeleteParcialN{
  border-radius:30px;
  background-color: #D55050;
  box-shadow: 0px 5px 15px #888888;
  width: 50px;
  height:20px;
}
.btnIconoDeleteParcialN:hover{
  border-radius:30px;
  background-color: #D32525;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnIconoDeleteParcialN i{
  color:#FFFFFF;
  margin-top: 0px;

}
.inner-addon {
  position: relative;
}
.inner-addon .icono-inp {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}
.left-addon .icono-inp {
  left: 0px;
}
.right-addon .icono-inp {
  right: 0px;
}
.left-addon input {
  padding-left: 30px;
}
.right-addon input {
  padding-right: 30px;
}
.borderColorCheck {
 border-style: solid;
 border-color: green;
 border-width: 10px;
}
.h4{
  text-align: center;
}

.btn-flat{
  border-radius: 0;
}

.inputCURP{
  text-transform:uppercase;
}

#example_filter input {
  border-radius: 5px;
}

.Listado{
  background-color: #F1C15B;
  color:white;
}
.Listado:hover{
  border-radius:10px;
  background-color: #E3AF41 ;
  color:#EFF7EB;
  transform: scale(1.0);
  transition: all 0.5s;
}

.btnAgregarTemporal{
  border-radius:30px;
  background-color: #68D84A;
  box-shadow: 0px 5px 15px #888888
}
.btnAgregarTemporal:hover{
  border-radius:30px;
  background-color: #5ABB40;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnAgregarTemporal i{
  color:#FFFFFF;
  margin-top: 3px;

}
.btnQuitarTemporal{
  border-radius:30px;
  background-color: #E32B2B;
  box-shadow: 0px 5px 15px #888888
}
.btnQuitarTemporal:hover{
  border-radius:30px;
  background-color: #BA2626;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnQuitarTemporal i{
  color:#FFFFFF;
  margin-top: 3px;
}


.btnIconFile{
  border-color: #000000;
  color: #0e00a8;
   /* border-width: 1px;
   border-style: solid; */
  border-radius:10px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 2px #12127b;
}
.btnIconFile:hover{
  border-radius:30px;
  background-color: #FFFFFF ;
  transform: scale(1.1);
  transition: all 0.8s;
}
.btnIconFile i{
  color:#FFFFFF;
  margin-top: 3px;

}

.btnIconNoFile{
  border-radius:10px;
  background-color: #E74C3C  ;
  box-shadow: 0px 5px 15px #888888
}
.btnIconNoFile:hover{
  border-radius:30px;
  background-color: #E74C3C  ;
  transform: scale(1.2);
  transition: all 0.5s;
}
.btnIconNoFile i{
  color:#FFFFFF;
  margin-top: 3px;
}

.btnIconSlide{
  border-radius:10px;
  color:#000000;
  background-color: #FFFFFF  ;
  box-shadow: 0px 5px 15px #888888
}
.btnIconSlide:hover{
  border-radius:30px;
  background-color: #E74C3C  ;
  transition: all 0.5s;
}
.btnIconSlide i{
  color:#000000;
  margin-top: 3px;
}


.btnIconDelete{
  border-radius:10px;
  color:#000000;
  background-color: #DE0000  ;
  box-shadow: 0px 5px 15px #888888
}
.btnIconDelete:hover{
  border-radius:30px;
  background-color: #DE0000  ;
  transition: all 0.5s;
}
.btnIconDelete i{
  color:#ffffff;
  margin-top: 3px;
}

.btnIconViolet{
border-radius:10px;
color:#000000;
background-color:#D17CE0 ;
box-shadow: -2px 5px 22px  rgba(0, 0, 0, 0.14), 0px 5px 10px  #888888;
}
.btnIconViolet:hover{
border-radius:30px;
background-color: #D458FF ;
transform: scale(1.3);
transition: all 0.5s;
}
.btnIconViolet i{
Color: #ffffff;
margin-top: 3px;
}


.btnIconEliminar{
  border-radius:10px;
  color:#000000;
  background-color: #FF6D6D  ;
  box-shadow: 0px 5px 15px #888888
}
.btnIconEliminar:hover{
  border-radius:30px;
  background-color: #FF6D6D  ;
  transition: all 0.5s;
}
.btnIconEliminar i{
  color:#ffffff;
  margin-top: 3px;
}

.btnIconAgregarP{
  border-radius:10px;
  color:#000000;
  background-color: #62FF5A  ;
  box-shadow: 0px 5px 15px #888888
}
.btnIconAgregarP:hover{
  border-radius:30px;
  background-color: #62FF5A  ;
  transition: all 0.5s;
}
.btnIconAgregarP i{
  color:#ffffff;
  margin-top: 3px;
}


.btnUpdate{
  border-radius:10px;
  background-color: #5FCD02 ;
  box-shadow: 0px 5px 15px #888888
}
.btnUpdate:hover{
  border-radius:30px;
  background-color: #6AE403 ;
  transform: scale(1.5);
  transition: all 0.5s;
}
.btnUpdate i{
  color:#FFFFFF;
  margin-top: 3px;
}

.navUnActive{
  color: #212121;
  border-bottom: none;
  background-color: #FFFFFF;
  padding: 7px 15px 5px 15px;
  font-size: 15px;
  text-transform:uppercase;
}
.navUnActive a{
  color: #212121;
}
.navUnActive:hover{
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #212121;
  color: #FFFFFF;
  transition: all 0.5s;
}
.navUnActive:hover a{
  color: #FFFFFF;
}

.navActive{
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #212121;
  color: #FFFFFF;
  padding: 7px 15px 5px 15px;
  font-size: 15px;
  text-transform:uppercase;
}
.navActive a{
  color: #FFFFFF;
}

.contenedoresNav{
  background-color: #ffffff  ;
  border-radius: 10px;
  padding: 0px 0px 8px 0px;
  /* text-align:center; */
  box-shadow: 5px 8px 15px #DCDCDC;

}

.contenedoresNav .span{
  margin:0px;
  padding: 10px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: #202020;
  color:white;
  font-size: 18px;
}

.switch {
position: relative;
display: inline-block;
width: 40px;
height: 24px;
}

.switch input {
opacity: 0;
width: 0;
height: 0;
}

.slider {
position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: #ccc;
-webkit-transition: .3s;
transition: .3s;
}

.slider:before {
position: absolute;
content: "";
height: 16px;
width: 16px;
left: 4px;
bottom: 4px;
background-color: white;
-webkit-transition: .2s;
transition: .3s;
}

input:checked + .slider {
background-color: #40C1CA;
}

input:checked + .slider:before {
-webkit-transform: translateX(16px);
-ms-transform: translateX(16px);
transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
border-radius: 34px;
}

.slider.round:before {
border-radius: 50%;
}


 /* CSS */
 .btnConfiguracion {
        align-items: center;
        appearance: none;
        background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
        border: 0;
        border-radius: 6px;
        box-shadow: rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        font-family: "JetBrains Mono", monospace;
        height: 48px;
        justify-content: center;
        line-height: 1;
        list-style: none;
        overflow: hidden;
        padding-left: 16px;
        padding-right: 16px;
        position: relative;
        text-align: left;
        text-decoration: none;
        transition: box-shadow .15s, transform .15s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        white-space: nowrap;
        will-change: box-shadow, transform;
        font-size: 18px;
    }

    .btnConfiguracion:focus {
        box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
    }

    .btnConfiguracion:hover {
        box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
        transform: translateY(-2px);
    }

    .btnConfiguracion:active {
        box-shadow: #3c4fe0 0 3px 7px inset;
        transform: translateY(2px);
    }

    .btnAsignar {
  background: #002BCB;
  border: 1px solid #002BCB;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.btnAsignar:hover,
.btnAsignar:active {
  background-color: initial;
  background-position: 0 0;
  color: #002BCB;
}

.btnAsignar:active {
  opacity: .5;
}

.btnEliminarDisco {
  background: #FF4742;
  border: 1px solid #FF4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.btnEliminarDisco:hover,
.btnEliminarDisco:active {
  background-color: initial;
  background-position: 0 0;
  color: #FF4742;
}

.btnEliminarDisco:active {
  opacity: .5;
}
.btnAsignarGris {
appearance: none;
background-color: #FFFFFF;
border-width: 0;
box-sizing: border-box;
color: #000000;
cursor: pointer;
display: inline-block;
font-family: Clarkson,Helvetica,sans-serif;
font-size: 14px;
font-weight: 500;
letter-spacing: 0;
line-height: 1em;
margin: 0;
opacity: 1;
outline: 0;
padding: .8em 2.2em;
position: relative;
text-align: center;
text-decoration: none;
text-rendering: geometricprecision;
text-transform: uppercase;
transition: opacity 300ms cubic-bezier(.694, 0, 0.335, 1),background-color 100ms cubic-bezier(.694, 0, 0.335, 1),color 100ms cubic-bezier(.694, 0, 0.335, 1);
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
vertical-align: baseline;
white-space: nowrap;
}

.btnAsignarGris:before {
animation: opacityFallbackOut .5s step-end forwards;
backface-visibility: hidden;
background-color: #EBEBEB;
clip-path: polygon(-1% 0, 0 0, -25% 100%, -1% 100%);
content: "";
height: 100%;
left: 0;
position: absolute;
top: 0;
transform: translateZ(0);
transition: clip-path .5s cubic-bezier(.165, 0.84, 0.44, 1), -webkit-clip-path .5s cubic-bezier(.165, 0.84, 0.44, 1);
width: 100%;
}

.btnAsignarGris:hover:before {
animation: opacityFallbackIn 0s step-start forwards;
clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
}

.btnAsignarGris:after {
background-color: #FFFFFF;
}

.btnAsignarGris span {
z-index: 1;
position: relative;
}

.btn-actionBlue {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #3498DB;
  color: #3498DB;
  margin: 0 auto;
  display: block;
}
.btn-actionBlue:hover {
  color: #fff;
}
.btn-actionBlue:hover:after {
  width: 100%;
}
.btn-actionBlue:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #3498DB;
}

.btn-actionBlue1 {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #4a5989;
  color: #4a5989;
  margin: 0 auto;
  display: block;
}
.btn-actionBlue1:hover {
  color: #fff;
}
.btn-actionBlue1:hover:after {
  width: 100%;
}
.btn-actionBlue1:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #4a5989;
}

.btn-actionRed {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #af0505;
  color: #af0505;
  margin: 0 auto;
  display: block;
}
.btn-actionRed:hover {
  color: #fff;
}
.btn-actionRed:hover:after {
  width: 100%;
}
.btn-actionRed:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #af0505;
}

.statustemp.e-propuesto {
    background-color: #a7ecfa;
    width: 100%;
    border-radius: 10px;
}
.statustxt.e-propuesto {
    color: #175773;
}
.statustemp.e-aceptado {
    background-color: #ff9add;
    width: 100%;
    border-radius: 10px;
}
.statustxt.e-aceptado {
    color: #b80059;
}
.statustemp.e-cancelado {
    background-color: #ff9292;
    width: 100%;
    border-radius: 10px;
}
.statustxt.e-cancelado {
    color: #940808;
}
.statustemp.e-terminado {
    background-color: #b9ff95;
    width: 100%;
    border-radius: 10px;
}
.statustxt.e-terminado {
    color: #22690b;
}
.statustemp.e-progreso {
    background-color: #ffcfa5;
    width: 100%;
    border-radius: 10px;
}
.statustxt.e-progreso {
    color: #cc2b02;
}

.btn-actionGreen {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #11563a;
  color: #11563a;
  margin: 0 auto;
  display: block;
}
.btn-actionGreen:hover {
  color: #fff;
}
.btn-actionGreen:hover:after {
  width: 100%;
}
.btn-actionGreen:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #11563a;
}

#content_notifications {
  max-height: 40vh;
  overflow-y: scroll;
}
</style>
