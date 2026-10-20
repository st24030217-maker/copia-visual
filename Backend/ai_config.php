<?php
/**
 * Configuración de Inteligencia Artificial para Dent Control
 * Motor: Google Gemini (generativelanguage.googleapis.com)
 */
$key = getenv('GEMINI_API_KEY');
if (!$key && file_exists(__DIR__ . '/ai_key.local.php')) {
    $key = include(__DIR__ . '/ai_key.local.php');
}
define('GEMINI_API_KEY', $key ?: '');
define('GEMINI_MODEL', 'gemini-flash-latest');
