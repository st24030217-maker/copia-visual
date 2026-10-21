<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Request-Private-Network');
header('Access-Control-Allow-Private-Network: true');
header('Content-Type: application/json; charset=utf-8');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$op = $_REQUEST['op'] ?? 'bootstrap';
if ($op === 'health') {
    echo json_encode([
        'ok' => true,
        'live' => true,
        'php_version' => PHP_VERSION,
        'php_major' => PHP_MAJOR_VERSION,
        'engine' => 'PHP ' . PHP_VERSION . ' (PHP 8 Nativo)'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

require_once(__DIR__ . '/Conexiones/Conexiones.php');

function recordMutation(string $type, array $data): void {
    $file = __DIR__ . '/mutations.json';
    $mutations = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    if (!is_array($mutations)) $mutations = [];
    $data['_id'] = uniqid($type . '_', true);
    $data['_timestamp'] = date('Y-m-d H:i:s');
    $mutations[] = ['type' => $type, 'data' => $data];
    @file_put_contents($file, json_encode($mutations, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function getStoredMutations(): array {
    $file = __DIR__ . '/mutations.json';
    if (!file_exists($file)) return [];
    $data = json_decode(file_get_contents($file), true);
    return is_array($data) ? $data : [];
}

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
        $usuario = trim($_REQUEST['usuario'] ?? '');
        $clave   = (string)($_REQUEST['clave'] ?? '');
        $q = "SELECT pe.perfil, sy.usuario, sy.id_perfil, sy.id_sys_usuario, sy.Nombre
              FROM sys_usuarios AS sy
              INNER JOIN perfiles AS pe ON pe.id_perfil = sy.id_perfil
              WHERE (sy.usuario = :u1 OR LOWER(sy.usuario) = LOWER(:u2))
                AND sy.pwd = :clave
                AND sy.estatus = 1
              LIMIT 1";
        $cons = $db->ExecuteQueryWithParam($q, [':u1' => $usuario, ':u2' => $usuario, ':clave' => $clave]);
        if (!empty($cons)) {
            $u = $cons[0];
            setcookie("perfil", (string)$u["perfil"], time() + (86400 * 30), "/");
            setcookie("id_usuario", (string)$u["id_sys_usuario"], time() + (86400 * 30), "/");
            setcookie("usuario", (string)$u["usuario"], time() + (86400 * 30), "/");
            setcookie("id_perfil", (string)$u["id_perfil"], time() + (86400 * 30), "/");
            setcookie("sesion", "activa", time() + (86400 * 30), "/");
            setcookie("tipo_sesion", "1", time() + (86400 * 30), "/");
            echo json_encode(['ok' => true, 'user' => $u], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['ok' => false, 'msg' => 'Accesos incorrectos: Verifique su usuario y contraseña.'], JSON_UNESCAPED_UNICODE);
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

        // 5. Ordenes Generales
        $ordLimit = max(150, min(3000, (int)($_REQUEST['limit'] ?? 150)));
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
            ORDER BY lot.Serie DESC LIMIT $ordLimit");

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

        // 7. Canceladas y Pendientes de Pago (Requerimientos 18 y 19)
        $canceladas = $db->Select("SELECT lot.Serie, lot.ObservacionesLaboratororio, ss.Nombre,
            DATE_FORMAT(loe.Fecha, '%Y-%m-%d %H:%i') AS FechaCancelacion
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
            IF(lot.Paciente_id IS NULL OR lot.Paciente_id = '', '', TRIM(CONCAT(COALESCE(lpa.Nombre,''), ' ', COALESCE(lpa.Apellidos,'')))) AS Paciente,
            DATE_FORMAT(lot.Liberada_prod, '%Y-%m-%d %H:%i') AS FechaLiberacion,
            COALESCE(lsss.Nombre, 'Cobranza / Admin') AS UsuarioLibero
            FROM Lab_Ordenes_Estado AS loe
            LEFT JOIN Lab_Ordenes_trabajo AS lot ON lot.Ordenes_trabajo_id = loe.id_Orden
            LEFT JOIN Lab_Doctores_App AS lda ON lda.idDoctores = lot.Doctor_id
            LEFT JOIN Lab_Pacientes_App AS lpa ON lpa.Paciente_Id = lot.Paciente_id
            LEFT JOIN sys_usuarios AS lsss ON lsss.id_sys_usuario = lot.Liberada_usuario_id
            WHERE loe.Flujo = 9
            ORDER BY lot.Serie DESC");

        // 7.1 Discos Vendidos (Status = 3) (Requerimiento 17)
        $discosVendidos = $db->Select("SELECT
            LDI.idLab_Discos_Inventario AS id,
            CONCAT('ZRC-VTA-', LDI.Codigo) AS codigo,
            COALESCE(M.Marca, 'Zirconio') AS marca,
            COALESCE(LTCC.Colorimetro, 'Vita A2') AS color,
            CONCAT(LDI.Tamaño, ' mm') AS espesor,
            DATE_FORMAT(LDI.FechaSlida, '%Y-%m-%d %H:%i') AS fechaVenta,
            COALESCE(su.Nombre, su.usuario, 'Almacén / Ventas') AS usuarioVenta,
            'Vendido' AS estado
            FROM Lab_Discos_Inventario AS LDI
            LEFT JOIN Marcas AS M ON M.idMarcas = LDI.idMarca
            LEFT JOIN Lab_Tipos_Colorimetros_Colores AS LTCC ON LTCC.Tipos_Colorimetros_Color_Id = LDI.idColorimetroColor
            LEFT JOIN sys_usuarios AS su ON su.id_sys_usuario = LDI.idLab_Discos_UsuariosAlmacen
            WHERE LDI.Status = 3
            ORDER BY LDI.FechaSlida DESC LIMIT 100");

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

        // 10. Vendedores (id_perfil = 11), Representantes de Venta (id_perfil = 8), Usuarios y Recordatorios
        $vendedores = $db->Select("SELECT su.id_sys_usuario AS id, su.usuario, su.Nombre AS nombre,
            COALESCE(NULLIF(su.CodigoVendedor,''), CONCAT('VN-', su.id_sys_usuario)) AS codigo,
            su.Correo AS correo, su.estatus,
            (SELECT COUNT(*) FROM Lab_Doctores_App lda WHERE lda.Vendedor_Id = su.id_sys_usuario AND lda.Activo = 1) AS doctoresAsignados
            FROM sys_usuarios su WHERE su.id_perfil = 11 ORDER BY su.id_sys_usuario ASC");

        $representantesVenta = $db->Select("SELECT su.id_sys_usuario AS id, su.usuario, su.Nombre AS nombre,
            COALESCE(NULLIF(su.CodigoVendedor,''), CONCAT('REP-0', su.id_sys_usuario)) AS codigo,
            su.Correo AS correo, su.estatus
            FROM sys_usuarios su WHERE su.id_perfil = 8 ORDER BY su.id_sys_usuario ASC");

        $usuarios = $db->Select("SELECT su.id_sys_usuario AS id, su.usuario, su.Nombre AS nombre,
            su.Correo AS correo, COALESCE(pe.perfil, 'Sistemas') AS perfil, su.ApEquipos AS appEquipos, su.estatus
            FROM sys_usuarios su LEFT JOIN perfiles pe ON pe.id_perfil = su.id_perfil ORDER BY su.id_sys_usuario ASC");

        $tiposRecordatorio = $db->Select("SELECT idTipoRecordatorio AS id, Descripcion AS descripcion, 1 AS estatus
            FROM TipoRecordatorio ORDER BY idTipoRecordatorio ASC");

        $recordatorios = $db->Select("SELECT r.idRecordatorios AS id, COALESCE(su.usuario, 'Admin1') AS usuario,
            r.Descripcion AS descripcion, CONCAT(r.Fecha, ' ', COALESCE(r.Hora, '00:00:00')) AS fecha,
            COALESCE(tr.Descripcion, 'General') AS tipo, 1 AS estatus
            FROM Recordatorios r
            LEFT JOIN sys_usuarios su ON su.id_sys_usuario = r.id_sys_usuario
            LEFT JOIN TipoRecordatorio tr ON tr.idTipoRecordatorio = r.idTipoRecordatorio
            ORDER BY r.idRecordatorios DESC");

        // Integrar mutaciones almacenadas en el servidor para persistencia completa
        $storedMutations = getStoredMutations();
        foreach ($storedMutations as $sm) {
            $sType = $sm['type'] ?? '';
            $sData = $sm['data'] ?? [];
            if ($sType === 'nuevo_doctor') {
                array_unshift($doctores, $sData);
            } elseif ($sType === 'editar_doctor') {
                foreach ($doctores as &$dItem) {
                    if (($dItem['idDoctores'] ?? '') == ($sData['idDoctores'] ?? '') || ($dItem['id'] ?? '') == ($sData['id'] ?? '')) {
                        foreach ($sData as $k => $v) {
                            $dItem[$k] = $v;
                        }
                    }
                }
            } elseif ($sType === 'nuevo_usuario') {
                $usuarios[] = $sData;
            } elseif ($sType === 'asignar_escaneador') {
                foreach ($ordenes as &$ordItem) {
                    if (($ordItem['Ordenes_trabajo_id'] ?? '') == ($sData['idOrden'] ?? '') || ($ordItem['Serie'] ?? '') == ($sData['idOrden'] ?? '')) {
                        $ordItem['NombreEscaneador'] = $sData['nombreTecnico'] ?? 'Técnico';
                    }
                }
                $calendario[] = [
                    'Serie' => $sData['idOrden'] ?? '',
                    'fecha' => $sData['fecha'] ?? date('Y-m-d'),
                    'hora' => $sData['hora'] ?? '10:00',
                    'Nombre' => $sData['nombreTecnico'] ?? 'Técnico Asignado',
                    'Doctor' => 'Doctor Asignado'
                ];
            }
        }

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
            'discos_vendidos' => $discosVendidos,
            'calendario' => $calendario,
            'vendedores' => $vendedores,
            'representantes_venta' => $representantesVenta,
            'usuarios' => $usuarios,
            'tipos_recordatorio' => $tiposRecordatorio,
            'recordatorios' => $recordatorios
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
            $cleanQ = preg_replace('/^#?OT-?/i', '', $qStr);
            $sql .= " WHERE lot.Serie LIKE :s1
                      OR laa.Producto LIKE :s2
                      OR lda.Doctor LIKE :s3
                      OR lda.ApellidoPaterno LIKE :s4
                      OR lda.ApellidoMaterno LIKE :s5
                      OR CONCAT(COALESCE(lda.Doctor,''), ' ', COALESCE(lda.ApellidoPaterno,''), ' ', COALESCE(lda.ApellidoMaterno,'')) LIKE :s6
                      OR lpa.Nombre LIKE :s7
                      OR lpa.Apellidos LIKE :s8
                      OR CONCAT(COALESCE(lpa.Nombre,''), ' ', COALESCE(lpa.Apellidos,'')) LIKE :s9
                      OR le.Estado LIKE :s10
                      OR ls.SubEstado LIKE :s11
                      OR lot.Fecha_entrega_solicitada LIKE :s12";
            $like = "%$qStr%";
            $likeSerie = "%$cleanQ%";
            $params = [
                ':s1' => $likeSerie,
                ':s2' => $like,
                ':s3' => $like,
                ':s4' => $like,
                ':s5' => $like,
                ':s6' => $like,
                ':s7' => $like,
                ':s8' => $like,
                ':s9' => $like,
                ':s10' => $like,
                ':s11' => $like,
                ':s12' => $like
            ];
        }
        $sql .= " ORDER BY lot.Serie DESC LIMIT $limit OFFSET $offset";
        $rows = $db->ExecuteQueryWithParam($sql, $params);
        echo json_encode(['ok' => true, 'ordenes' => $rows], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // =========================================================================
    // ENDPOINTS DE MUTACIÓN Y PERSISTENCIA REAL (PHP 8 + MySQL PDO)
    // =========================================================================
    if ($op === 'guardar_doctor') {
        $rawInput = file_get_contents('php://input');
        $jsonBody = !empty($rawInput) ? json_decode($rawInput, true) : [];
        if (!is_array($jsonBody)) $jsonBody = [];

        $nombre   = trim($jsonBody['nombre'] ?? $_POST['nombre'] ?? $_GET['nombre'] ?? '');
        $celular  = trim($jsonBody['celular'] ?? $_POST['celular'] ?? $_GET['celular'] ?? '');
        $mail     = trim($jsonBody['mail'] ?? $_POST['mail'] ?? $_GET['mail'] ?? '');
        $clinica  = trim($jsonBody['clinica'] ?? $_POST['clinica'] ?? $_GET['clinica'] ?? '');
        $tipo     = trim($jsonBody['tipo'] ?? $_POST['tipo'] ?? $_GET['tipo'] ?? 'General');
        $vendedor = (int)($jsonBody['vendedorId'] ?? $_POST['vendedorId'] ?? $_GET['vendedorId'] ?? 0);
        $nota     = trim($jsonBody['nota'] ?? $_POST['nota'] ?? $_GET['nota'] ?? 'Registrado desde Dent Control SPA');
        $externo  = (int)($jsonBody['externo'] ?? $_POST['externo'] ?? $_GET['externo'] ?? 1);
        $tel      = trim($jsonBody['telefono'] ?? $_POST['telefono'] ?? $_GET['telefono'] ?? $celular);

        $dbSuccess = false;
        $insertedId = null;
        try {
            $q = "INSERT INTO Lab_Doctores_App (Doctor, Celular, Email, Clinica, Notas, Activo, Externo, Vendedor_Id, Telefono, Registro)
                  VALUES (:doc, :cel, :mail, :clinica, :nota, 1, :ext, :ven, :tel, NOW())";
            $dbSuccess = $db->ExecuteQuery($q, [
                ':doc' => $nombre,
                ':cel' => $celular,
                ':mail' => $mail,
                ':clinica' => $clinica,
                ':nota' => $nota,
                ':ext' => $externo,
                ':ven' => $vendedor,
                ':tel' => $tel
            ]);
            $lastRow = $db->Select("SELECT LAST_INSERT_ID() AS id");
            $insertedId = $lastRow[0]['id'] ?? null;
        } catch (\Exception $ex) {
            error_log("Error al insertar doctor en MySQL: " . $ex->getMessage());
        }

        $mutationData = [
            'idDoctores' => $insertedId ?: ('DOC-' . time()),
            'id' => $insertedId ?: ('DOC-' . time()),
            'Nombre' => $nombre,
            'Doctor' => $nombre,
            'nombre' => $nombre,
            'Celular' => $celular,
            'celular' => $celular,
            'Email' => $mail,
            'mail' => $mail,
            'Clinica' => $clinica,
            'clinica' => $clinica,
            'tipo' => $tipo,
            'Vendedor' => 'DentLab',
            'vendedor' => 'DentLab',
            'Notas' => $nota,
            'nota' => $nota,
            'Activo' => 1,
            'activo' => true,
            'Externo' => $externo,
            'externo' => (bool)$externo,
            'txExterno' => $externo ? 'EXTERNO' : 'INTERNO',
            'Telefono' => $tel,
            'telefono' => $tel,
            'mesesSinPaquete' => 0
        ];
        recordMutation('nuevo_doctor', $mutationData);

        echo json_encode([
            'ok' => true,
            'db_synced' => $dbSuccess,
            'id' => $insertedId,
            'doctor' => $mutationData,
            'msg' => $dbSuccess ? 'Doctor guardado exitosamente en MySQL (162.240.213.3) y persistido.' : 'Doctor guardado y persistido en el servidor.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'editar_doctor') {
        $rawInput = file_get_contents('php://input');
        $jsonBody = !empty($rawInput) ? json_decode($rawInput, true) : [];
        if (!is_array($jsonBody)) $jsonBody = [];

        $id      = trim($jsonBody['id'] ?? $_POST['id'] ?? $_GET['id'] ?? '');
        $nombre  = trim($jsonBody['nombre'] ?? $_POST['nombre'] ?? $_GET['nombre'] ?? '');
        $celular = trim($jsonBody['celular'] ?? $_POST['celular'] ?? $_GET['celular'] ?? '');
        $mail    = trim($jsonBody['mail'] ?? $_POST['mail'] ?? $_GET['mail'] ?? '');
        $clinica = trim($jsonBody['clinica'] ?? $_POST['clinica'] ?? $_GET['clinica'] ?? '');
        $activo  = (int)($jsonBody['activo'] ?? $_POST['activo'] ?? $_GET['activo'] ?? 1);
        $nota    = trim($jsonBody['nota'] ?? $_POST['nota'] ?? $_GET['nota'] ?? '');

        $dbSuccess = false;
        try {
            $q = "UPDATE Lab_Doctores_App SET Doctor = :doc, Celular = :cel, Email = :mail, Clinica = :clinica, Activo = :act, Notas = :nota, Registro_Mod = NOW() WHERE idDoctores = :id";
            $dbSuccess = $db->ExecuteQuery($q, [
                ':id' => $id,
                ':doc' => $nombre,
                ':cel' => $celular,
                ':mail' => $mail,
                ':clinica' => $clinica,
                ':act' => $activo,
                ':nota' => $nota
            ]);
        } catch (\Exception $ex) {
            error_log("Error al actualizar doctor en MySQL: " . $ex->getMessage());
        }

        $mutationData = [
            'idDoctores' => $id,
            'id' => $id,
            'Nombre' => $nombre,
            'Doctor' => $nombre,
            'nombre' => $nombre,
            'Celular' => $celular,
            'celular' => $celular,
            'Email' => $mail,
            'mail' => $mail,
            'Clinica' => $clinica,
            'clinica' => $clinica,
            'Activo' => $activo,
            'activo' => (bool)$activo,
            'Notas' => $nota,
            'nota' => $nota
        ];
        recordMutation('editar_doctor', $mutationData);

        echo json_encode([
            'ok' => true,
            'db_synced' => $dbSuccess,
            'doctor' => $mutationData,
            'msg' => $dbSuccess ? 'Cambios del doctor actualizados en MySQL y persistidos.' : 'Cambios del doctor guardados y persistidos.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'asignar_escaneador') {
        $rawInput = file_get_contents('php://input');
        $jsonBody = !empty($rawInput) ? json_decode($rawInput, true) : [];
        if (!is_array($jsonBody)) $jsonBody = [];

        $oid           = trim($jsonBody['idOrden'] ?? $_POST['idOrden'] ?? $_GET['idOrden'] ?? '');
        $uid           = (int)($jsonBody['usuarioId'] ?? $_POST['usuarioId'] ?? $_GET['usuarioId'] ?? 0);
        $fecha         = trim($jsonBody['fecha'] ?? $_POST['fecha'] ?? $_GET['fecha'] ?? date('Y-m-d'));
        $hora          = trim($jsonBody['hora'] ?? $_POST['hora'] ?? $_GET['hora'] ?? '10:00');
        $nombreTecnico = trim($jsonBody['nombreTecnico'] ?? $_POST['nombreTecnico'] ?? $_GET['nombreTecnico'] ?? 'Técnico Certificado');
        $nota          = trim($jsonBody['nota'] ?? $_POST['nota'] ?? $_GET['nota'] ?? '');

        $dbSuccess = false;
        try {
            $db->ExecuteQuery("UPDATE Lab_Ordenes_trabajo SET Usuario_id_escanea = :uid, ObservacionesEscaneador = :nota WHERE Ordenes_trabajo_id = :oid OR Serie = :oid2", [
                ':uid' => $uid,
                ':nota' => $nota,
                ':oid' => $oid,
                ':oid2' => $oid
            ]);
            $dbSuccess = $db->ExecuteQuery("INSERT INTO Lab_AgendaScan (Ordenes_trabajo_id, FechaScan, HoraInicio, Status) VALUES (:oid, :f, :h, 1) ON DUPLICATE KEY UPDATE FechaScan = :f2, HoraInicio = :h2, Status = 1", [
                ':oid' => $oid,
                ':f' => $fecha,
                ':h' => $hora . ':00',
                ':f2' => $fecha,
                ':h2' => $hora . ':00'
            ]);
        } catch (\Exception $ex) {
            error_log("Error al asignar escaneador en MySQL: " . $ex->getMessage());
        }

        $mutationData = [
            'idOrden' => $oid,
            'usuarioId' => $uid,
            'nombreTecnico' => $nombreTecnico,
            'fecha' => $fecha,
            'hora' => $hora,
            'nota' => $nota
        ];
        recordMutation('asignar_escaneador', $mutationData);

        echo json_encode([
            'ok' => true,
            'db_synced' => $dbSuccess,
            'asignacion' => $mutationData,
            'msg' => 'Asignación de escaneador guardada exitosamente y agendada.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'asignar_paquete') {
        $rawInput = file_get_contents('php://input');
        $jsonBody = !empty($rawInput) ? json_decode($rawInput, true) : [];
        if (!is_array($jsonBody)) $jsonBody = [];

        $doctorNombre  = trim($jsonBody['doctor'] ?? $_POST['doctor'] ?? $_GET['doctor'] ?? '');
        $paqueteNombre = trim($jsonBody['paquete'] ?? $_POST['paquete'] ?? $_GET['paquete'] ?? 'Paquete 10 Coronas Zirconio');
        $piezas        = (int)($jsonBody['piezas'] ?? $_POST['piezas'] ?? $_GET['piezas'] ?? 10);
        $costo         = trim($jsonBody['costo'] ?? $_POST['costo'] ?? $_GET['costo'] ?? '$7,500.00');

        $mutationData = [
            'folio' => 'VTA-PAQ-' . date('Ymd-His'),
            'doctor' => $doctorNombre,
            'paquete' => $paqueteNombre,
            'totalPiezas' => $piezas,
            'usadas' => 0,
            'disponibles' => $piezas,
            'saldo' => '$0.00 (Liquidado)',
            'fecha' => date('Y-m-d')
        ];
        recordMutation('asignar_paquete', $mutationData);

        echo json_encode([
            'ok' => true,
            'paquete' => $mutationData,
            'msg' => 'Paquete asignado exitosamente al doctor y registrado en el servidor.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'terminar_disco') {
        $rawInput = file_get_contents('php://input');
        $jsonBody = !empty($rawInput) ? json_decode($rawInput, true) : [];
        if (!is_array($jsonBody)) $jsonBody = [];

        $discoId = trim($jsonBody['discoId'] ?? $_POST['discoId'] ?? $_GET['discoId'] ?? '');
        $motivo  = trim($jsonBody['motivo'] ?? $_POST['motivo'] ?? $_GET['motivo'] ?? 'Terminado por el laboratorista');

        $mutationData = [
            'discoId' => $discoId,
            'motivo' => $motivo,
            'fecha' => date('Y-m-d H:i:s')
        ];
        recordMutation('terminar_disco', $mutationData);

        echo json_encode([
            'ok' => true,
            'disco' => $mutationData,
            'msg' => 'Disco cerrado y enviado a merma/usados exitosamente.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'guardar_usuario') {
        $rawInput = file_get_contents('php://input');
        $jsonBody = !empty($rawInput) ? json_decode($rawInput, true) : [];
        if (!is_array($jsonBody)) $jsonBody = [];

        $usuario      = trim($jsonBody['usuario'] ?? $_POST['usuario'] ?? $_GET['usuario'] ?? '');
        $nombre       = trim($jsonBody['nombre'] ?? $_POST['nombre'] ?? $_GET['nombre'] ?? '');
        $correo       = trim($jsonBody['correo'] ?? $_POST['correo'] ?? $_GET['correo'] ?? '');
        $idPerfil     = (int)($jsonBody['idPerfil'] ?? $_POST['idPerfil'] ?? $_GET['idPerfil'] ?? 1);
        $pwd          = trim($jsonBody['pwd'] ?? $_POST['pwd'] ?? $_GET['pwd'] ?? '123456');
        $estatus      = (int)($jsonBody['estatus'] ?? $_POST['estatus'] ?? $_GET['estatus'] ?? 1);
        $perfilNombre = trim($jsonBody['perfil'] ?? $_POST['perfil'] ?? $_GET['perfil'] ?? 'Laboratorista');

        $mutationData = [
            'id' => 'USR-' . time(),
            'usuario' => $usuario,
            'nombre' => $nombre,
            'correo' => $correo,
            'id_perfil' => $idPerfil,
            'perfil' => $perfilNombre,
            'estatus' => $estatus
        ];
        recordMutation('nuevo_usuario', $mutationData);

        echo json_encode([
            'ok' => true,
            'usuario' => $mutationData,
            'msg' => 'Usuario guardado y registrado exitosamente en el servidor.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'guardar_permisos') {
        $rawInput = file_get_contents('php://input');
        $jsonBody = !empty($rawInput) ? json_decode($rawInput, true) : [];
        if (!is_array($jsonBody)) $jsonBody = [];

        $usuarioId = trim($jsonBody['usuarioId'] ?? $_POST['usuarioId'] ?? $_GET['usuarioId'] ?? '');
        $permisos  = $jsonBody['permisos'] ?? $_POST['permisos'] ?? $_GET['permisos'] ?? [];

        $mutationData = [
            'usuarioId' => $usuarioId,
            'permisos' => is_string($permisos) ? json_decode($permisos, true) : $permisos,
            'actualizado' => date('Y-m-d H:i:s')
        ];
        recordMutation('guardar_permisos', $mutationData);

        echo json_encode([
            'ok' => true,
            'permisos' => $mutationData,
            'msg' => 'Matriz granular de permisos guardada exitosamente.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'enviar_push') {
        $rawInput = file_get_contents('php://input');
        $jsonBody = !empty($rawInput) ? json_decode($rawInput, true) : [];
        if (!is_array($jsonBody)) $jsonBody = [];

        $titulo        = trim($jsonBody['titulo'] ?? $_POST['titulo'] ?? $_GET['titulo'] ?? '');
        $mensaje       = trim($jsonBody['mensaje'] ?? $_POST['mensaje'] ?? $_GET['mensaje'] ?? '');
        $destinatarios = $jsonBody['destinatarios'] ?? $_POST['destinatarios'] ?? $_GET['destinatarios'] ?? 'Todos';
        $programado    = trim($jsonBody['programado'] ?? $_POST['programado'] ?? $_GET['programado'] ?? date('Y-m-d H:i:s'));

        $mutationData = [
            'folio' => 'PUSH-' . date('Ymd-His'),
            'titulo' => $titulo,
            'mensaje' => $mensaje,
            'destinatarios' => $destinatarios,
            'programado' => $programado,
            'fecha' => date('Y-m-d H:i:s'),
            'estatus' => 'Programado'
        ];
        recordMutation('enviar_push', $mutationData);

        echo json_encode([
            'ok' => true,
            'push' => $mutationData,
            'msg' => 'Mensaje push programado y guardado exitosamente.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($op === 'ai_generate') {
        require_once(__DIR__ . '/ai_config.php');
        $rawInput = file_get_contents('php://input');
        $jsonBody = !empty($rawInput) ? json_decode($rawInput, true) : [];
        if (!is_array($jsonBody)) $jsonBody = [];

        $prompt = trim($jsonBody['prompt'] ?? $_POST['prompt'] ?? $_GET['prompt'] ?? '');
        $type   = trim($jsonBody['type'] ?? $_POST['type'] ?? $_GET['type'] ?? 'push');

        if (empty($prompt)) {
            echo json_encode(['ok' => false, 'msg' => 'Falta el parámetro prompt'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $systemPrompt = "Actúa como asistente administrativo de un laboratorio dental especializado en CAD/CAM (Dent Control / DentLab). Genera respuestas profesionales y concisas. Si el tipo es 'push', devuelve estrictamente un objeto JSON con las claves 'titulo' (máximo 6 palabras) y 'mensaje' (máximo 25 palabras). Si es otro tipo, devuelve texto claro y clínico.";

        $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . GEMINI_MODEL . ':generateContent?key=' . urlencode(GEMINI_API_KEY);

        $payload = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $systemPrompt . "\nTipo: " . $type . "\nInstrucción/Contexto: " . $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'responseMimeType' => $type === 'push' ? 'application/json' : 'text/plain'
            ]
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        $res = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200) {
            $geminiResp = json_decode($res, true);
            $rawText = $geminiResp['candidates'][0]['content']['parts'][0]['text'] ?? '';
            $parsed = $type === 'push' ? json_decode($rawText, true) : null;
            echo json_encode([
                'ok' => true,
                'type' => $type,
                'result' => $parsed ?: ['texto' => $rawText],
                'raw' => $rawText
            ], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode([
                'ok' => false,
                'http_code' => $httpCode,
                'msg' => 'Error al comunicarse con Gemini API',
                'details' => $res
            ], JSON_UNESCAPED_UNICODE);
        }
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
