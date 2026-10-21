# DENT-PHP — Sistema Integral CAD/CAM y Control Odontológico

Plataforma integral para laboratorios dentales, centros de fresado CAD/CAM y gestión de clínicas odontológicas. Diseñada para operar sobre arquitectura PHP 8 con base de datos MySQL, ofreciendo tanto soporte para flujos legacy transaccionales como una interfaz moderna SPA interactiva.

---

## Estructura del Proyecto

El repositorio está organizado de forma modular para separar claramente la lógica de negocio, las vistas clínicas, los controladores y los servicios de integración:

```
DENT-PHP/
├── Backend/                 # Endpoints REST, sincronización en vivo y controladores PHP
│   ├── Conexiones/         # Conectores a base de datos MySQL / MariaDB
│   ├── Doctores/           # Lógica comercial, paquetes y expedientes
│   ├── Ordenes/            # Procesamiento de órdenes CAD/CAM
│   ├── api_live.php        # API transaccional en tiempo real
│   ├── db_snapshot.json    # Snapshot de órdenes para contingencia y velocidad
│   └── mutations.json      # Registro dual de mutaciones
├── Includes/                # Componentes comunes, encabezados y barras de estado
├── app/                     # Módulos centrales del sistema legacy
│   ├── Categorias/         # Catálogos de familias de materiales
│   ├── Cuestionarios/      # Encuestas de satisfacción y auditoría clínica
│   ├── Pacientes/          # Gestión de pacientes por doctor
│   ├── Paquetes/           # Catálogo y consumo de paquetes prepagados
│   ├── Productos/          # Lista de precios de tratamientos
│   └── Usuarios/           # Control de acceso y personal
├── appDiscos/               # Registro de salida y desbaste de bloques en fresadora
├── appEquipos/              # Control de escáneres intraorales y motores en comodato
├── Discos/                  # Módulo de inventario y trazabilidad CAD/CAM
├── FormaPago/               # Métodos de pago y cobranza
├── Membresias/              # Convenios corporativos y empresas afiliadas
├── scripts/                 # Controladores JavaScript para vistas PHP
├── assets/                  # Recursos gráficos, logotipos e iconos
├── index.html               # Tablero principal SPA de alto rendimiento (<300ms)
├── modules.js               # Enrutador dinámico y lógica de presentación
├── index.php                # Punto de entrada legacy PHP
├── TableOrdenes.php         # Listado maestro de órdenes con 12 columnas exactas
├── ListadosDoctores.php     # Cartera médica con filtros de periodo y acumulados
├── InventarioDiscos.php     # Inventario físico de bloques Zirconio/PMMA
├── README.md                # Documentación técnica del proyecto
└── .gitignore               # Exclusiones de volcados pesados y variables locales
```

---

## Módulos Principales del Sistema

### 1. Tablero de Producción (Pipeline Kanban de 4 Etapas)
- **Escaneo:** Citas intraorales y recolección de modelos.
- **Diseño:** Trazabilidad en Exocad / 3Shape.
- **Fabricación:** Asignación de bloques en fresadoras CNC.
- **Entrega:** Control logístico con semáforo de tiempo (retraso, entrega hoy, en tiempo).

### 2. Gestión de Órdenes y Trabajos Clínicos
- Consulta de órdenes con filtros combinados por rango de fechas, doctor y estatus.
- Generación e impresión de etiquetas con código de barras para cajas de transporte.
- Asignación de técnico escaneador con fecha y notas de visita.

### 3. Cartera de Doctores y Paquetes Prepagados
- Directorio de odontólogos afiliados con balance de piezas vigentes.
- Filtro analítico de periodo (1 mes, 3 meses, 6 meses) con **Acumulado de Ingresos**.
- Detección proactiva de clientes inactivos (>90 días sin compra) y doctores por agotar saldo (<5 piezas).

### 4. Inventario de Discos CAD/CAM
- Trazabilidad por código de lote, marca (`Aidite`, `Upcera`, `Ivoclar`), tono Vita y espesor (12mm a 25mm).
- Registro de desbaste por orden de trabajo y terminación manual de merma.
- Módulo auditado de **Discos de Zirconio Vendidos** con fecha, hora y usuario responsable.

### 5. Auditoría y Seguridad (Módulos Especiales DentLab)
- **Clientes Nuevos por Mes:** Registro mensual de odontólogos y clínicas incorporadas.
- **Ventas Mensuales por Cliente:** Facturación consolidada, volumen de piezas y ticket promedio.
- **APP DentControl para Doctores:** Portal para el Dr. José Antonio Alatorre Serna y la Dra. Alicia Irene Martínez Gómez.
- **Listado de Órdenes Canceladas:** Auditoría de anulaciones con fecha, hora y usuario cancelador.
- **Liberación de Órdenes:** Autorización de salida para órdenes con saldo pendiente.

---

## Requisitos de Entorno

- **PHP:** Versión 8.0, 8.1 o 8.2 (compatible con atributos nativos y tipado moderno).
- **Extensiones PHP requeridas:**
  - `pdo_mysql`
  - `curl`
  - `json`
  - `mbstring`
  - `gd`
- **Servidor Web:** Apache 2.4+ (con módulo `mod_rewrite` habilitado) o Nginx.
- **Base de Datos:** MySQL 5.7+ / 8.0+ o MariaDB 10.4+.

---

## Instalación y Despliegue Rápido

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/RESO-Sistemas/DENT-PHP.git
   cd DENT-PHP
   ```

2. **Configuración de Base de Datos:**
   - Crear el archivo de configuración local `Backend/Conexiones/Conexiones.local.php` a partir de las credenciales de su servidor MySQL.
   - Si no se cuenta con servidor local activo, el sistema cuenta con contingencia automática a través del endpoint REST configurado en `Backend/api_live.php`.

3. **Permisos de Directorio:**
   - Asegurar permisos de lectura y escritura para el usuario del servidor web (`www-data` o `apache`) en el directorio `Backend/` para el guardado de mutaciones y bitácoras.

4. **Acceso Web:**
   - Apuntar el DocumentRoot del VirtualHost a la raíz del proyecto para acceder a `index.php` (modo PHP legacy) o `index.html` (modo SPA interactivo).
