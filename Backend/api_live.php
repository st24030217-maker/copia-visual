<?php
header('Content-Type: application/json; charset=utf-8');
require_once(__DIR__ . '/Conexiones/Conexiones.php');

$op = $_REQUEST['op'] ?? 'bootstrap';

try {
    $db = new Conexiones();

    if ($op === 'ping') {
        $res = $db->Select("SELECT DATABASE() AS db, NOW() AS server_time, (SELECT COUNT(*) FROM Lab_Ordenes_trabajo) AS total_ordenes, (SELECT COUNT(*) FROM Lab_Doctores_App WHERE Activo = 1) AS total_doctores");
        echo json_encode([
            'ok' => true,
            'connected' => !empty($res),
            'info' => $res[0] ?? []
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'login') {
        $usuario = trim($_POST['usuario'] ?? '');
        $clave   = trim($_POST['clave'] ?? '');
        $q = "SELECT pe.perfil, sy.usuario, sy.id_perfil, sy.id_sys_usuario, sy.Nombre
              FROM sys_usuarios AS sy
              INNER JOIN perfiles AS pe ON pe.id_perfil = sy.id_perfil
              WHERE sy.usuario = :usuario AND sy.pwd = :clave AND sy.estatus = 1
              LIMIT 1";
        $cons = $db->ExecuteQueryWithParam($q, [':usuario' => $usuario, ':clave' => $clave]);
        if (!empty($cons)) {
            $u = $cons[0];
            setcookie("perfil", $u["perfil"], time() + (86400 * 30), "/");
            setcookie("id_usuario", $u["id_sys_usuario"], time() + (86400 * 30), "/");
            setcookie("usuario", $u["usuario"], time() + (86400 * 30), "/");
            setcookie("id_perfil", $u["id_perfil"], time() + (86400 * 30), "/");
            setcookie("sesion", "activa", time() + (86400 * 30), "/");
            setcookie("tipo_sesion", "1", time() + (86400 * 30), "/");
            echo json_encode(['ok' => true, 'user' => $u], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['ok' => false, 'msg' => 'Credenciales incorrectas en la base de datos'], JSON_UNESCAPED_UNICODE);
        }
        exit;
    }

    if ($op === 'bootstrap') {
        // 1. Escaneo
        $escaneo = $db->Select("SELECT lse.SubEstado, le.Estado, lot.Ordenes_trabajo_id, lot.Serie, lot.Registro, laa.Producto, lot.Piezas,
            CONCAT('', UPPER(lda.Doctor)) AS Doctor, lot.Doctor_id, lda.Externo AS TipoDoctorExterno,
            DATEDIFF(lot.Fecha_entrega_solicitada, NOW()) AS diferencia_dias,
            (SELECT COALESCE(GROUP_CONCAT('PAQ: ', dpp.Serie SEPARATOR ' / '), 'SIN PAQUETE')
             FROM Lab_PaquetesUtilizados_Orden AS lpu
             INNER JOIN Lab_Ordenes_trabajo AS ot ON ot.Ordenes_trabajo_id = lpu.IdOrden
             INNER JOIN Lab_Paquetes_Doctor_Cantidad AS dp ON dp.idLab_Paquetes_Doctor_Cantidad = lpu.IdPaquete
             INNER JOIN Lab_Doctores_paquetes AS dpp ON dpp.Doctores_paquete_id = dp.IdPaquetesDoctor
             INNER JOIN Lab_AgendaScan AS LAS2 ON LAS2.Ordenes_trabajo_id = ot.Ordenes_trabajo_id
             WHERE lpu.IdOrden = lot.Ordenes_trabajo_id) AS paquetes,
            LAS.FechaScan AS FechaEntregaSolicitada
            FROM Lab_Ordenes_trabajo AS lot
            INNER JOIN Lab_ProductosApp AS laa ON laa.Producto_ID = lot.Producto_id
            INNER JOIN Lab_Doctores_App AS lda ON lda.idDoctores = lot.Doctor_id
            INNER JOIN Lab_Ordenes_Estado AS loe ON loe.id_Orden = lot.Ordenes_trabajo_id
            INNER JOIN Lab_SubEstados AS lse ON lse.idLab_SubEstado = loe.Flujo
            INNER JOIN Lab_Estados AS le ON le.idLab_Estado = lse.idLab_Estado
            INNER JOIN Lab_AgendaScan AS LAS ON LAS.Ordenes_trabajo_id = lot.Ordenes_trabajo_id
            WHERE le.idLab_Estado = 1
            ORDER BY lot.Serie DESC");

        // 2. Diseño
        $diseno = $db->Select("SELECT lse.SubEstado, lot.Ordenes_trabajo_id, lot.Serie, laa.Producto, lot.Piezas,
            CONCAT('', UPPER(lda.Doctor)) AS Doctor, lot.Doctor_id, lda.Externo AS TipoDoctorExterno,
            DATEDIFF(lot.Fecha_entrega_solicitada, NOW()) AS diferencia_dias,
            (SELECT COALESCE(GROUP_CONCAT('PAQ: ', dpp.Serie SEPARATOR ' / '), 'SIN PAQUETE')
             FROM Lab_PaquetesUtilizados_Orden AS lpu
             INNER JOIN Lab_Ordenes_trabajo AS ot ON ot.Ordenes_trabajo_id = lpu.IdOrden
             INNER JOIN Lab_Paquetes_Doctor_Cantidad AS dp ON dp.idLab_Paquetes_Doctor_Cantidad = lpu.IdPaquete
             INNER JOIN Lab_Doctores_paquetes AS dpp ON dpp.Doctores_paquete_id = dp.IdPaquetesDoctor
             WHERE lpu.IdOrden = lot.Ordenes_trabajo_id) AS paquetes,
            lot.Fecha_entrega_solicitada AS FechaEntregaSolicitada
            FROM Lab_Ordenes_trabajo AS lot
            INNER JOIN Lab_ProductosApp AS laa ON laa.Producto_ID = lot.Producto_id
            INNER JOIN Lab_Doctores_App AS lda ON lda.idDoctores = lot.Doctor_id
            INNER JOIN Lab_Ordenes_Estado AS loe ON loe.id_Orden = lot.Ordenes_trabajo_id
            INNER JOIN Lab_SubEstados AS lse ON lse.idLab_SubEstado = loe.Flujo
            INNER JOIN Lab_Estados AS le ON le.idLab_Estado = lse.idLab_Estado
            WHERE le.idLab_Estado = 2
            ORDER BY lot.Serie DESC");

        // 3. Fabricación
        $fabricacion = $db->Select("SELECT lse.SubEstado, lot.Ordenes_trabajo_id, lot.Serie, laa.Producto, lot.Piezas,
            CONCAT('', UPPER(lda.Doctor)) AS Doctor, lot.Doctor_id, lda.Externo AS TipoDoctorExterno,
            DATEDIFF(lot.Fecha_entrega_solicitada, NOW()) AS diferencia_dias,
            (SELECT COALESCE(GROUP_CONCAT('PAQ: ', dpp.Serie SEPARATOR ' / '), 'SIN PAQUETE')
             FROM Lab_PaquetesUtilizados_Orden AS lpu
             INNER JOIN Lab_Ordenes_trabajo AS ot ON ot.Ordenes_trabajo_id = lpu.IdOrden
             INNER JOIN Lab_Paquetes_Doctor_Cantidad AS dp ON dp.idLab_Paquetes_Doctor_Cantidad = lpu.IdPaquete
             INNER JOIN Lab_Doctores_paquetes AS dpp ON dpp.Doctores_paquete_id = dp.IdPaquetesDoctor
             WHERE lpu.IdOrden = lot.Ordenes_trabajo_id) AS paquetes,
            lot.Fecha_entrega_solicitada AS FechaEntregaSolicitada
            FROM Lab_Ordenes_trabajo AS lot
            INNER JOIN Lab_ProductosApp AS laa ON laa.Producto_ID = lot.Producto_id
            INNER JOIN Lab_Doctores_App AS lda ON lda.idDoctores = lot.Doctor_id
            INNER JOIN Lab_Ordenes_Estado AS loe ON loe.id_Orden = lot.Ordenes_trabajo_id
            INNER JOIN Lab_SubEstados AS lse ON lse.idLab_SubEstado = loe.Flujo
            INNER JOIN Lab_Estados AS le ON le.idLab_Estado = lse.idLab_Estado
            WHERE le.idLab_Estado = 3
            ORDER BY lot.Serie DESC");

        // 4. Entrega (Exacto a DentLab::GetOrdenesEntrega: idLab_Estado = 4 AND idLab_SubEstado = 6)
        $entrega = $db->Select("SELECT lse.SubEstado, lot.Ordenes_trabajo_id, lot.Serie, laa.Producto, lot.Piezas,
            CONCAT('', UPPER(lda.Doctor)) AS Doctor, lot.Doctor_id, lda.Externo AS TipoDoctorExterno,
            DATEDIFF(lot.Fecha_entrega_solicitada, NOW()) AS diferencia_dias,
            (SELECT COALESCE(GROUP_CONCAT('PAQ: ', dpp.Serie SEPARATOR ' / '), 'SIN PAQUETE')
             FROM Lab_PaquetesUtilizados_Orden AS lpu
             INNER JOIN Lab_Ordenes_trabajo AS ot ON ot.Ordenes_trabajo_id = lpu.IdOrden
             INNER JOIN Lab_Paquetes_Doctor_Cantidad AS dp ON dp.idLab_Paquetes_Doctor_Cantidad = lpu.IdPaquete
             INNER JOIN Lab_Doctores_paquetes AS dpp ON dpp.Doctores_paquete_id = dp.IdPaquetesDoctor
             WHERE lpu.IdOrden = lot.Ordenes_trabajo_id) AS paquetes,
            lot.Fecha_entrega_solicitada AS FechaEntregaSolicitada
            FROM Lab_Ordenes_trabajo AS lot
            INNER JOIN Lab_ProductosApp AS laa ON laa.Producto_ID = lot.Producto_id
            INNER JOIN Lab_Doctores_App AS lda ON lda.idDoctores = lot.Doctor_id
            INNER JOIN Lab_Ordenes_Estado AS loe ON loe.id_Orden = lot.Ordenes_trabajo_id
            INNER JOIN Lab_SubEstados AS lse ON lse.idLab_SubEstado = loe.Flujo
            INNER JOIN Lab_Estados AS le ON le.idLab_Estado = lse.idLab_Estado
            WHERE le.idLab_Estado = 4 AND lse.idLab_SubEstado = 6
            ORDER BY lot.Serie DESC");

        // 5. Ordenes Generales (150 más recientes)
        $ordenes = $db->Select("SELECT
                lot.Doctor_id,
                lot.Ordenes_trabajo_id,
                lot.Serie,
                lot.Monto,
                lot.Fecha_entrega_solicitada,
                le.Estado,
                ls.SubEstado,
                laa.Producto,
                TRIM(CONCAT(COALESCE(lda.Doctor,''), ' ', COALESCE(lda.ApellidoPaterno,''), ' ', COALESCE(lda.ApellidoMaterno,''))) AS DoctorCompleto,
                lda.Doctor,
                lda.Externo AS TipoDoctorExterno,
                DATEDIFF(lot.Fecha_entrega_solicitada, NOW()) AS diferencia_dias,
                TRIM(CONCAT(COALESCE(lpa.Nombre,''), ' ', COALESCE(lpa.Apellidos,''))) AS paciente,
                lot.Piezas,
                lot.Liberada_prod,
                le.idLab_Estado,
                lot.Observaciones,
                lot.ObservacionesLaboratororio,
                TRIM(CONCAT(COALESCE(ltcm.Marca,''), ' ', COALESCE(ltcc.Colorimetro,''))) AS colorimetro
            FROM Lab_Ordenes_trabajo AS lot
            INNER JOIN Lab_Ordenes_Estado AS loe ON loe.id_Orden = lot.Ordenes_trabajo_id
            LEFT JOIN Lab_SubEstados AS ls ON ls.idLab_SubEstado = loe.Flujo
            LEFT JOIN Lab_Estados AS le ON le.idLab_Estado = ls.idLab_Estado
            LEFT JOIN Lab_ProductosApp AS laa ON laa.Producto_ID = lot.Producto_id
            LEFT JOIN Lab_Doctores_App AS lda ON lda.idDoctores = lot.Doctor_id
            LEFT JOIN Lab_Pacientes_App AS lpa ON lpa.Paciente_Id = lot.Paciente_id
            LEFT JOIN Lab_Tipos_Colorimetros_Colores AS ltcc ON ltcc.Tipos_Colorimetros_Color_Id = lot.Tipos_colorimetros_color_id
            LEFT JOIN Lab_Tipos_Colorimetros_Marcas AS ltcm ON ltcm.Tipos_Colorimetros_Marcas_Id = ltcc.Tipos_Colorimetros_Marca_Id
            ORDER BY lot.Serie DESC LIMIT 150");

        if (empty($entrega)) {
            foreach ($ordenes as $oRow) {
                if ((int)($oRow['idLab_Estado'] ?? 0) === 4) {
                    $entrega[] = [
                        'SubEstado' => $oRow['SubEstado'] ?? 'Entrega',
                        'Ordenes_trabajo_id' => $oRow['Ordenes_trabajo_id'],
                        'Serie' => $oRow['Serie'],
                        'Producto' => $oRow['Producto'],
                        'Piezas' => $oRow['Piezas'],
                        'Doctor' => $oRow['Doctor'],
                        'Doctor_id' => $oRow['Doctor_id'],
                        'TipoDoctorExterno' => $oRow['TipoDoctorExterno'],
                        'diferencia_dias' => $oRow['diferencia_dias'],
                        'paquetes' => 'SIN PAQUETE',
                        'FechaEntregaSolicitada' => $oRow['Fecha_entrega_solicitada']
                    ];
                    if (count($entrega) >= 6) break;
                }
            }
        }

        // 6. Doctores activos
        $doctores = $db->Select("SELECT
            IF(lda.Vendedor_Id = 0, 'DentLab', COALESCE(su.Nombre, 'DentLab')) AS Vendedor,
            lda.idDoctores,
            TRIM(CONCAT(COALESCE(lda.Doctor, ''), ' ', COALESCE(lda.ApellidoPaterno, ''), ' ', COALESCE(lda.ApellidoMaterno, ''))) AS Nombre,
            COALESCE(NULLIF(lda.Celular, ''), 'N/A') AS Celular,
            COALESCE(NULLIF(lda.Email, ''), 'N/A') AS Email,
            COALESCE(NULLIF(lda.Clinica, ''), 'N/A') AS Clinica,
            COALESCE(NULLIF(lda.Notas, ''), 'N/A') AS Notas,
            lda.Doctor,
            lda.ApellidoPaterno,
            lda.ApellidoMaterno,
            COALESCE(NULLIF(lda.Telefono, ''), 'N/A') AS Telefono,
            lda.Activo,
            lda.Externo,
            CASE WHEN lda.Externo = 0 THEN 'INTERNO' ELSE 'EXTERNO' END AS txExterno,
            COALESCE(LGV.Descripcion, 'DENT LAB') AS GrupoVendedor,
            lda.Calle, lda.Num_Ext, lda.Colonia, lda.Codigo_Postal,
            oc.Ciudad, oep.Estado
            FROM Lab_Doctores_App AS lda
            LEFT JOIN sys_usuarios AS su ON su.id_sys_usuario = lda.Vendedor_Id AND su.id_perfil = 11
            LEFT JOIN Lab_GrupoVendedor AS LGV ON LGV.idGrupoVendedor = su.GrupoVendedor
            LEFT JOIN Organizacion_Ciudades AS oc ON oc.Organizacion_Ciudades_Id = lda.Organizacion_Ciudad_Id
            LEFT JOIN Organizacion_Estados_Pais AS oep ON oep.Organizacion_Estados_Pais_Id = oc.Organizacion_Estados_Pais_Id
            WHERE lda.Activo = 1
            ORDER BY lda.idDoctores DESC");

        // 7. Canceladas y Pendientes de Pago
        $canceladas = $db->Select("SELECT lot.Serie, lot.ObservacionesLaboratororio, ss.Nombre
            FROM Lab_Ordenes_Estado AS loe
            INNER JOIN Lab_Ordenes_trabajo AS lot ON lot.Ordenes_trabajo_id = loe.id_Orden
            INNER JOIN Lab_SubEstados AS ls ON ls.idLab_SubEstado = loe.Flujo
            INNER JOIN Lab_Estados AS le ON le.idLab_Estado = ls.idLab_Estado
            LEFT JOIN sys_usuarios AS ss ON ss.id_sys_usuario = loe.id_UsuarioCancelada
            WHERE le.idLab_Estado = 5
            ORDER BY lot.Serie DESC LIMIT 100");

        $cancCountRow = $db->Select("SELECT COUNT(*) AS cnt FROM Lab_Ordenes_Estado AS loe INNER JOIN Lab_SubEstados AS ls ON ls.idLab_SubEstado = loe.Flujo WHERE ls.idLab_Estado = 5");

        $pendientesPago = $db->Select("SELECT loe.idLab_Ordenes_Estado, lot.Ordenes_trabajo_id, lot.Con_scan, lot.Serie,
            TRIM(CONCAT(COALESCE(lda.Doctor,''), ' ', COALESCE(lda.ApellidoPaterno,''), ' ', COALESCE(lda.ApellidoMaterno,''))) AS Doctor,
            IF(lot.Paciente_id IS NULL OR lot.Paciente_id = '', '', TRIM(CONCAT(COALESCE(lpa.Nombre,''), ' ', COALESCE(lpa.Apellidos,'')))) AS Paciente
            FROM Lab_Ordenes_Estado AS loe
            LEFT JOIN Lab_Ordenes_trabajo AS lot ON lot.Ordenes_trabajo_id = loe.id_Orden
            LEFT JOIN Lab_Doctores_App AS lda ON lda.idDoctores = lot.Doctor_id
            LEFT JOIN Lab_Pacientes_App AS lpa ON lpa.Paciente_Id = lot.Paciente_id
            WHERE loe.Flujo = 9
            ORDER BY lot.Serie DESC");

        // 8. Calendario
        $calendario = $db->Select("SELECT lot.Serie, la.FechaScan AS fecha, DATE_FORMAT(la.HoraInicio, '%H:%i') AS hora,
            ss.Nombre, TRIM(CONCAT(COALESCE(lda.Doctor,''), ' ', COALESCE(lda.ApellidoPaterno,''), ' ', COALESCE(lda.ApellidoMaterno,''))) AS Doctor
            FROM Lab_AgendaScan AS la
            INNER JOIN Lab_Ordenes_trabajo AS lot ON lot.Ordenes_trabajo_id = la.Ordenes_trabajo_id
            LEFT JOIN sys_usuarios AS ss ON ss.id_sys_usuario = lot.Usuario_id_escanea
            LEFT JOIN Lab_Doctores_App AS lda ON lda.idDoctores = lot.Doctor_id
            WHERE la.Status = 1
            ORDER BY la.FechaScan DESC LIMIT 100");

        // 9. Conteo total de órdenes en BD
        $totalOrd = $db->Select("SELECT COUNT(*) AS total FROM Lab_Ordenes_trabajo");

        echo json_encode([
            'ok' => true,
            'source' => 'MySQL Live (162.240.213.3 / new_dentusradm_datos)',
            'timestamp' => date('Y-m-d H:i:s'),
            'total_ordenes_bd' => (int)($totalOrd[0]['total'] ?? count($ordenes)),
            'total_doctores_bd' => count($doctores),
            'canceladas_count' => (int)($cancCountRow[0]['cnt'] ?? count($canceladas)),
            'escaneo' => $escaneo,
            'diseno' => $diseno,
            'fabricacion' => $fabricacion,
            'entrega' => $entrega,
            'ordenes' => $ordenes,
            'doctores' => $doctores,
            'canceladas' => $canceladas,
            'pendientes_pago' => $pendientesPago,
            'calendario' => $calendario
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'orden_detalle') {
        $folio = trim($_REQUEST['folio'] ?? '');
        $idOrden = trim($_REQUEST['idOrden'] ?? '');
        $where = $idOrden !== '' ? "lot.Ordenes_trabajo_id = :val" : "lot.Serie = :val";
        $val = $idOrden !== '' ? $idOrden : $folio;

        $q = "SELECT lot.Ordenes_trabajo_id, lot.Archivo, loe.idLab_Ordenes_Estado, le.idLab_Estado, lse.idLab_SubEstado, lse.SubEstado,
              le.Estado, lot.Serie,
              TRIM(CONCAT(COALESCE(lda.Doctor,''), ' ', COALESCE(lda.ApellidoPaterno,''), ' ', COALESCE(lda.ApellidoMaterno,''))) AS Doctor,
              TRIM(CONCAT(COALESCE(lpa.Nombre,''), ' ', COALESCE(lpa.Apellidos,''))) AS Paciente,
              lot.Real_inicio, lot.Real_fin, lot.Fecha_autoriza AS escaneoConfirmado,
              lot.Usuario_id_escanea, lss.Nombre AS NombreEscaneador, lc.Descripcion AS CategoriaDesc, lc.idCategorias, lot.Con_scan,
              lot.Liberada_prod, lsss.Nombre AS NombreLib, lot.ModoModelo, lmp.Descripcion AS MetodoPagoDesc, lda.Externo,
              lot.Fecha_entrega_solicitada, TRIM(CONCAT(COALESCE(ltcm.Marca,''), ' ', COALESCE(ltcc.Colorimetro,''))) AS colorimetro,
              lot.Piezas, lot.Monto, lot.Aut_color, lot.Aut_mordida, lot.Aut_munon, lot.Aut_adit, lot.Uid, laa.Producto,
              lot.Observaciones, lot.Doctor_id,
              CONCAT(COALESCE(lda.Calle,''), ' No. Ext ', COALESCE(lda.Num_Ext,''), ', Col. ', COALESCE(lda.Colonia,''), ', Cd. ', COALESCE(oc.Ciudad,''), ', ', COALESCE(oep.Estado,'')) AS Direccion,
              lda.Celular, lda.Email AS DoctorEmail, lda.Clinica,
              lot.Agenda_inicio, lot.Agenda_fin, lot.Fecha_confirmada, lot.ObservacionesEscaneador, lot.ObservacionesLaboratororio, loe.Flujo,
              (SELECT IF(COUNT(*) > 0, GROUP_CONCAT(Disco, ':', Piezas), 'Sin Discos Utilizados') FROM Lab_Discos_Ordenes_Archivos WHERE Orden = lot.Serie) AS DiscosUtilizados,
              (SELECT COALESCE(SUM(Piezas), 0) FROM Lab_Discos_Ordenes_Archivos WHERE Orden = lot.Serie) AS DiscosEnOrden
              FROM Lab_Ordenes_trabajo AS lot
              LEFT JOIN Lab_Ordenes_Estado AS loe ON loe.id_Orden = lot.Ordenes_trabajo_id
              LEFT JOIN Lab_SubEstados AS lse ON lse.idLab_SubEstado = loe.Flujo
              LEFT JOIN Lab_Estados AS le ON le.idLab_Estado = lse.idLab_Estado
              LEFT JOIN Lab_ProductosApp AS laa ON laa.Producto_ID = lot.Producto_id
              LEFT JOIN Lab_Categorias AS lc ON lc.idCategorias = laa.Productos_Categoria_Id
              LEFT JOIN Lab_Doctores_App AS lda ON lda.idDoctores = lot.Doctor_id
              LEFT JOIN Lab_Pacientes_App AS lpa ON lpa.Paciente_Id = lot.Paciente_id
              LEFT JOIN Lab_Tipos_Colorimetros_Colores AS ltcc ON ltcc.Tipos_Colorimetros_Color_Id = lot.Tipos_colorimetros_color_id
              LEFT JOIN Lab_Tipos_Colorimetros_Marcas AS ltcm ON ltcm.Tipos_Colorimetros_Marcas_Id = ltcc.Tipos_Colorimetros_Marca_Id
              LEFT JOIN sys_usuarios AS lss ON lss.id_sys_usuario = lot.Usuario_id_escanea
              LEFT JOIN sys_usuarios AS lsss ON lsss.id_sys_usuario = lot.Liberada_usuario_id
              LEFT JOIN Organizacion_Ciudades AS oc ON oc.Organizacion_Ciudades_Id = lda.Organizacion_Ciudad_Id
              LEFT JOIN Organizacion_Estados_Pais AS oep ON oep.Organizacion_Estados_Pais_Id = oc.Organizacion_Estados_Pais_Id
              LEFT JOIN Lab_Metodos_Pago AS lmp ON lmp.id_Metodos_Pago = lot.Tipos_formas_pago_id
              WHERE $where
              LIMIT 1";
        $orden = $db->ExecuteQueryWithParam($q, [':val' => $val]);
        $ordRow = $orden[0] ?? null;

        $pagos = [];
        $paquetes = [];
        $dientes = [];
        if ($ordRow) {
            $oid = $ordRow['Ordenes_trabajo_id'];
            $pagos = $db->ExecuteQueryWithParam("SELECT lop.FolioPago, lmp.Descripcion, lot.Serie, ss.Nombre, lop.Monto, lop.Fecha
                FROM Lab_Ordenes_Pago AS lop
                INNER JOIN Lab_Ordenes_trabajo AS lot ON lot.Ordenes_trabajo_id = lop.id_Orden
                LEFT JOIN Lab_Metodos_Pago AS lmp ON lmp.id_Metodos_Pago = lop.id_MetodoPago
                LEFT JOIN sys_usuarios AS ss ON ss.id_sys_usuario = lop.id_usuario
                WHERE lop.id_Orden = :oid", [':oid' => $oid]);

            $paquetes = $db->ExecuteQueryWithParam("SELECT lpp.Paquete, dpp.Serie
                FROM Lab_PaquetesUtilizados_Orden AS lpu
                INNER JOIN Lab_Paquetes_Doctor_Cantidad AS dp ON dp.idLab_Paquetes_Doctor_Cantidad = lpu.IdPaquete
                INNER JOIN Lab_Doctores_paquetes AS dpp ON dpp.Doctores_paquete_id = dp.IdPaquetesDoctor
                INNER JOIN Lab_Productos_Paquetes AS lpp ON lpp.Productos_Paquetes_Id = dpp.Productos_paquete_id
                WHERE lpu.IdOrden = :oid", [':oid' => $oid]);

            $dientes = $db->ExecuteQueryWithParam("SELECT lod.IdDientesImagen, lod.TipoDiente, ldi.Tipo
                FROM Lab_OrdenesDetalle AS lod
                LEFT JOIN Lab_DientesImagen AS ldi ON ldi.idDientesImagen = lod.IdDientesImagen
                WHERE lod.id_Orden = :oid", [':oid' => $oid]);
        }

        echo json_encode([
            'ok' => (bool)$ordRow,
            'orden' => $ordRow,
            'pagos' => $pagos,
            'paquetes' => $paquetes,
            'dientes' => $dientes
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'doctor_detalle') {
        $idDoctor = trim($_REQUEST['idDoctor'] ?? '');
        $nombre   = trim($_REQUEST['nombre'] ?? '');

        if ($idDoctor !== '') {
            $qDoc = "SELECT lda.*, su.Nombre AS VendedorNombre, oc.Ciudad, oep.Estado
                     FROM Lab_Doctores_App AS lda
                     LEFT JOIN sys_usuarios AS su ON su.id_sys_usuario = lda.Vendedor_Id
                     LEFT JOIN Organizacion_Ciudades AS oc ON oc.Organizacion_Ciudades_Id = lda.Organizacion_Ciudad_Id
                     LEFT JOIN Organizacion_Estados_Pais AS oep ON oep.Organizacion_Estados_Pais_Id = oc.Organizacion_Estados_Pais_Id
                     WHERE lda.idDoctores = :id LIMIT 1";
            $docRes = $db->ExecuteQueryWithParam($qDoc, [':id' => $idDoctor]);
        } else {
            $qDoc = "SELECT lda.*, su.Nombre AS VendedorNombre, oc.Ciudad, oep.Estado
                     FROM Lab_Doctores_App AS lda
                     LEFT JOIN sys_usuarios AS su ON su.id_sys_usuario = lda.Vendedor_Id
                     LEFT JOIN Organizacion_Ciudades AS oc ON oc.Organizacion_Ciudades_Id = lda.Organizacion_Ciudad_Id
                     LEFT JOIN Organizacion_Estados_Pais AS oep ON oep.Organizacion_Estados_Pais_Id = oc.Organizacion_Estados_Pais_Id
                     WHERE CONCAT(COALESCE(lda.Doctor,''), ' ', COALESCE(lda.ApellidoPaterno,''), ' ', COALESCE(lda.ApellidoMaterno,'')) LIKE :nom
                        OR lda.Doctor LIKE :nom2
                     LIMIT 1";
            $docRes = $db->ExecuteQueryWithParam($qDoc, [':nom' => "%$nombre%", ':nom2' => "%$nombre%"]);
        }

        $doc = $docRes[0] ?? null;
        $ordenesDoc = [];
        $paquetesDoc = [];
        if ($doc) {
            $did = $doc['idDoctores'];
            $ordenesDoc = $db->ExecuteQueryWithParam("SELECT lot.Ordenes_trabajo_id, lot.Serie, lot.Fecha_entrega_solicitada,
                le.Estado, lpaa.Producto, TRIM(CONCAT(COALESCE(lpa.Nombre,''), ' ', COALESCE(lpa.Apellidos,''))) AS paciente,
                lot.Piezas, lot.Liberada_prod, lot.Monto,
                COALESCE(lmp.Descripcion, 'Pagado con paquetes') AS FormaPago
                FROM Lab_Ordenes_trabajo AS lot
                LEFT JOIN Lab_Pacientes_App AS lpa ON lpa.Paciente_Id = lot.Paciente_id
                LEFT JOIN Lab_ProductosApp AS lpaa ON lpaa.Producto_ID = lot.Producto_id
                LEFT JOIN Lab_Ordenes_Estado AS loe ON loe.id_Orden = lot.Ordenes_trabajo_id
                LEFT JOIN Lab_SubEstados AS ls ON ls.idLab_SubEstado = loe.Flujo
                LEFT JOIN Lab_Estados AS le ON le.idLab_Estado = ls.idLab_Estado
                LEFT JOIN Lab_Metodos_Pago AS lmp ON lmp.id_Metodos_Pago = lot.Tipos_formas_pago_id
                WHERE lot.Doctor_id = :did
                ORDER BY lot.Serie DESC LIMIT 50", [':did' => $did]);

            $paquetesDoc = $db->ExecuteQueryWithParam("SELECT ldp.Doctores_paquete_id, ldp.Serie,
                CONCAT('Paquete ', lpp.Paquete) AS paquete, ldp.Pz_total AS Pz_Total,
                COALESCE(lpdc.CantidadDisponible, 0) AS CantidadDisponible,
                lpp.Costo, ldp.Pagado, ldp.Registro
                FROM Lab_Doctores_paquetes AS ldp
                LEFT JOIN Lab_Productos_Paquetes AS lpp ON lpp.Productos_Paquetes_Id = ldp.Productos_paquete_id
                LEFT JOIN Lab_Paquetes_Doctor_Cantidad AS lpdc ON lpdc.IdPaquetesDoctor = ldp.Doctores_paquete_id
                WHERE ldp.Doctor_id = :did
                ORDER BY ldp.Registro DESC", [':did' => $did]);
        }

        echo json_encode([
            'ok' => (bool)$doc,
            'doctor' => $doc,
            'ordenes' => $ordenesDoc,
            'paquetes' => $paquetesDoc
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'search_ordenes') {
        $qStr = trim($_REQUEST['q'] ?? '');
        $page = max(1, (int)($_REQUEST['page'] ?? 1));
        $limit = 150;
        $offset = ($page - 1) * $limit;

        $sql = "SELECT
                lot.Doctor_id,
                lot.Ordenes_trabajo_id,
                lot.Serie,
                lot.Monto,
                lot.Fecha_entrega_solicitada,
                le.Estado,
                ls.SubEstado,
                laa.Producto,
                TRIM(CONCAT(COALESCE(lda.Doctor,''), ' ', COALESCE(lda.ApellidoPaterno,''), ' ', COALESCE(lda.ApellidoMaterno,''))) AS DoctorCompleto,
                lda.Doctor,
                lda.Externo AS TipoDoctorExterno,
                DATEDIFF(lot.Fecha_entrega_solicitada, NOW()) AS diferencia_dias,
                TRIM(CONCAT(COALESCE(lpa.Nombre,''), ' ', COALESCE(lpa.Apellidos,''))) AS paciente,
                lot.Piezas,
                lot.Liberada_prod,
                le.idLab_Estado,
                lot.Observaciones,
                lot.ObservacionesLaboratororio,
                TRIM(CONCAT(COALESCE(ltcm.Marca,''), ' ', COALESCE(ltcc.Colorimetro,''))) AS colorimetro
            FROM Lab_Ordenes_trabajo AS lot
            INNER JOIN Lab_Ordenes_Estado AS loe ON loe.id_Orden = lot.Ordenes_trabajo_id
            LEFT JOIN Lab_SubEstados AS ls ON ls.idLab_SubEstado = loe.Flujo
            LEFT JOIN Lab_Estados AS le ON le.idLab_Estado = ls.idLab_Estado
            LEFT JOIN Lab_ProductosApp AS laa ON laa.Producto_ID = lot.Producto_id
            LEFT JOIN Lab_Doctores_App AS lda ON lda.idDoctores = lot.Doctor_id
            LEFT JOIN Lab_Pacientes_App AS lpa ON lpa.Paciente_Id = lot.Paciente_id
            LEFT JOIN Lab_Tipos_Colorimetros_Colores AS ltcc ON ltcc.Tipos_Colorimetros_Color_Id = lot.Tipos_colorimetros_color_id
            LEFT JOIN Lab_Tipos_Colorimetros_Marcas AS ltcm ON ltcm.Tipos_Colorimetros_Marcas_Id = ltcc.Tipos_Colorimetros_Marca_Id";
        $params = [];
        if ($qStr !== '') {
            $sql .= " WHERE lot.Serie LIKE :s1 OR laa.Producto LIKE :s2 OR lda.Doctor LIKE :s3 OR lpa.Nombre LIKE :s4 OR lpa.Apellidos LIKE :s5 OR lot.Fecha_entrega_solicitada LIKE :s6";
            $like = "%$qStr%";
            $params = [':s1' => $like, ':s2' => $like, ':s3' => $like, ':s4' => $like, ':s5' => $like, ':s6' => $like];
        }
        $sql .= " ORDER BY lot.Serie DESC LIMIT $limit OFFSET $offset";
        $rows = $db->ExecuteQueryWithParam($sql, $params);
        echo json_encode(['ok' => true, 'ordenes' => $rows], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode(['ok' => false, 'msg' => 'Operación no reconocida'], JSON_UNESCAPED_UNICODE);
} catch (\Exception $e) {
    echo json_encode([
        'ok' => false,
        'connected' => false,
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
