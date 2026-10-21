<?php
$_REQUEST['op'] = 'bootstrap';
$_REQUEST['limit'] = 2000;

ob_start();
register_shutdown_function(function () {
    $json = ob_get_clean();
    $data = json_decode($json, true);
    if (!is_array($data) || empty($data['ok'])) {
        fwrite(STDERR, "Error al obtener datos de MySQL (162.240.213.3).\n");
        return;
    }
    $target = __DIR__ . '/db_snapshot.json';
    file_put_contents($target, $json);
    echo "Snapshot actualizado: " . count($data['ordenes'] ?? []) . " ordenes, " . count($data['doctores'] ?? []) . " doctores, " . count($data['usuarios'] ?? []) . " usuarios (" . ($data['timestamp'] ?? '') . ")\n";
});

include __DIR__ . '/api_live.php';
