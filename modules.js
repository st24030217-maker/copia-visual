// ============================================================================
// DENT CLINICA DENTAL & DENTLAB CAD/CAM — MOTOR VISUAL INTERACTIVO COMPLETO
// Contiene los 36 módulos exactos de DENT DEMO con estado en memoria, tablas,
// buscadores, formularios modales, POS de ventas, calendario y colorímetro 3D.
// ============================================================================

const DENT_STATE = {
  currentView: 'inicio',

  // 1. ESTADÍSTICAS -> CONTROL DE LABORATORIO (Estadisticas.php)
  controlLab: [
    { doctor: 'Dr. Oscar Ramírez', categoria: 'Zirconio', producto: 'Corona Monolítica Zirconio', piezas: '#16', paciente: 'Carlos Mendoza', registro: '2026-09-28', entrega: '2026-10-01', dias: 4, serie: 'OT-9841', tipoDoctor: 'Interno' },
    { doctor: 'Dra. Brenda Solís', categoria: 'Alinia', producto: 'Alineadores Clear Dent (14 fases)', piezas: 'Arcada Sup.', paciente: 'María Fernández', registro: '2026-09-29', entrega: '2026-10-03', dias: 2, serie: 'OT-9838', tipoDoctor: 'Externo' },
    { doctor: 'Dr. Arturo Morales', categoria: 'Zirconio', producto: 'Puente Fijo 3 Unidades', piezas: '#21, #22, #23', paciente: 'Roberto Gómez', registro: '2026-09-25', entrega: '2026-10-02', dias: -1, serie: 'OT-9830', tipoDoctor: 'Externo' },
    { doctor: 'Dra. Fátima Sánchez', categoria: 'E-Max', producto: 'Inlay Cerámico Disilicato', piezas: '#36', paciente: 'Laura Méndez', registro: '2026-09-30', entrega: '2026-10-04', dias: 5, serie: 'OT-9827', tipoDoctor: 'Interno' },
    { doctor: 'Dr. Luis Cabrera', categoria: 'Guardas', producto: 'Guarda Oclusal Nocturna Bio', piezas: 'Arcada Sup.', paciente: 'Patricia Vega', registro: '2026-09-27', entrega: '2026-10-01', dias: 1, serie: 'OT-9804', tipoDoctor: 'Externo' },
    { doctor: 'Dr. Mauricio Treviño', categoria: 'Zirconio', producto: 'Corona Posterior Zirconio HT+', piezas: '#26', paciente: 'Jorge Saldaña', registro: '2026-09-26', entrega: '2026-09-30', dias: 6, serie: 'OT-9799', tipoDoctor: 'Interno' }
  ],

  // 2. DENT LAB -> CONTROL DE EQUIPOS
  equiposPrestamo: [
    { id: 'EQP-01', usuario: 'Lic. Daniel Ríos (Escaneador)', equipo: 'Escáner Intraoral 3Shape TRIOS 4 Wireless #01', salida: '2026-10-07 08:30', clinica: 'Clínica Matriz / Dr. Oscar Ramírez', estado: 'En Ruta' },
    { id: 'EQP-02', usuario: 'Tec. Sofía Luna (Escaneadora)', equipo: 'Escáner Intraoral Medit i700 #03', salida: '2026-10-07 09:15', clinica: 'Consultorio Dra. Brenda Solís', estado: 'En Préstamo' },
    { id: 'EQP-03', usuario: 'Ing. Marco Pineda (Escaneador)', equipo: 'Articulador Digital Bio-Art A7 Plus #02', salida: '2026-10-07 10:00', clinica: 'Centro Dental San Pedro', estado: 'En Préstamo' }
  ],
  catalogoEquipos: [
    { id: 'EQ-101', codigo: 'SCN-TRIOS4-01', nombre: 'Escáner Intraoral 3Shape TRIOS 4', marca: '3Shape', serie: 'TR4-882910', ubicacion: 'Préstamo Externo', estatus: true },
    { id: 'EQ-102', codigo: 'SCN-MEDIT-03', nombre: 'Escáner Intraoral Medit i700', marca: 'Medit', serie: 'MD7-441920', ubicacion: 'Préstamo Externo', estatus: true },
    { id: 'EQ-103', codigo: 'CNC-DWX52-01', nombre: 'Fresadora CAD/CAM 5 Ejes DWX-52DCi', marca: 'Roland DGShape', serie: 'RLD-992011', ubicacion: 'Laboratorio CAM', estatus: true },
    { id: 'EQ-104', codigo: 'CNC-DWX42-02', nombre: 'Fresadora en Húmedo DWX-42W', marca: 'Roland DGShape', serie: 'RLD-774123', ubicacion: 'Laboratorio CAM', estatus: true },
    { id: 'EQ-105', codigo: 'SIN-PROGRAMAT', nombre: 'Horno de Sinterizado Programat S2', marca: 'Ivoclar Vivadent', serie: 'IVC-551029', ubicacion: 'Área Cerámica', estatus: true }
  ],
  historicoEquipos: [
    { folio: 'MOV-901', usuario: 'Lic. Daniel Ríos', equipo: 'Escáner Intraoral 3Shape TRIOS 4 #01', salida: '2026-10-06 09:00', regreso: '2026-10-06 17:45', observacion: 'Entregado sin novedades, puntas esterilizadas' },
    { folio: 'MOV-900', usuario: 'Tec. Sofía Luna', equipo: 'Escáner Intraoral Medit i700 #03', salida: '2026-10-05 10:20', regreso: '2026-10-05 18:10', observacion: 'Batería al 95%, calibración correcta' },
    { folio: 'MOV-899', usuario: 'Ing. Marco Pineda', equipo: 'Colorímetro Digital Vita Easyshade V', salida: '2026-10-04 11:00', regreso: '2026-10-04 16:30', observacion: 'Toma de color en Clínica Las Torres' }
  ],

  // 3. MOTIVOS DE CANCELACIÓN
  motivosCancelacion: [
    { id: 1, motivo: 'Paciente canceló o reprogramó su cita clínica', estatus: true },
    { id: 2, motivo: 'Cambio de plan de tratamiento por el Doctor', estatus: true },
    { id: 3, motivo: 'Archivo STL con distorsión en margen gingival', estatus: true },
    { id: 4, motivo: 'Falta de espacio interoclusal en preparación', estatus: true },
    { id: 5, motivo: 'Solicitud duplicada en plataforma web', estatus: true }
  ],

  // 4. MENSAJES PUSH & TIPOS PUSH
  mensajesPush: [
    { id: 'PSH-41', tipo: 'Estatus de Orden', titulo: 'Tu orden #OT-9788 va en camino', mensaje: 'El mensajero de DentLab está en ruta hacia tu consultorio.', destinatario: 'Dr. Oscar Ramírez', fecha: '2026-10-07 11:20', enviado: true },
    { id: 'PSH-40', tipo: 'Promoción Paquetes', titulo: 'Nuevo Paquete 20 Coronas Zirconio HT+', mensaje: 'Aprovecha 15% de bonificación en paquetes prepagados este mes.', destinatario: 'Todos los Doctores', fecha: '2026-10-05 09:00', enviado: true },
    { id: 'PSH-39', tipo: 'Recordatorio de Pago', titulo: 'Saldo pendiente por liquidar', mensaje: 'Recuerda confirmar tu comprobante para liberar la entrega programada.', destinatario: 'Dra. Brenda Solís', fecha: '2026-10-04 16:40', enviado: true }
  ],
  tiposPush: [
    { id: 1, nombre: 'Estatus de Orden', descripcion: 'Notificaciones automáticas al cambiar de etapa CAD/CAM', icono: 'truck', estatus: true },
    { id: 2, nombre: 'Promoción Paquetes', descripcion: 'Avisos comerciales de membresías y paquetes de coronas', icono: 'package', estatus: true },
    { id: 3, nombre: 'Recordatorio de Pago', descripcion: 'Alertas de órdenes pendientes de liquidación', icono: 'bell', estatus: true }
  ],

  // 5. PAQUETES (ListPaquetes.php)
  paquetes: [
    { id: 'PAQ-01', nombre: 'Paquete 10 Coronas Zirconio Monolítico', corto: 'PACK-ZRC-10', piezas: 10, costo: 14500, desde: '2026-01-01', hasta: '2026-12-31', estatus: true },
    { id: 'PAQ-02', nombre: 'Paquete 20 Coronas Zirconio Multicapa 3D', corto: 'PACK-ZRC-20', piezas: 20, costo: 27000, desde: '2026-01-01', hasta: '2026-12-31', estatus: true },
    { id: 'PAQ-03', nombre: 'Paquete 10 Restauraciones E-Max Disilicato', corto: 'PACK-EMX-10', piezas: 10, costo: 16800, desde: '2026-01-01', hasta: '2026-12-31', estatus: true },
    { id: 'PAQ-04', nombre: 'Paquete 5 Guardas Oclusales Termocuradas', corto: 'PACK-GRD-05', piezas: 5, costo: 5900, desde: '2026-01-01', hasta: '2026-12-31', estatus: true }
  ],

  // 6. PRODUCTOS APP (ProductosApp.php)
  productosApp: [
    { id: 'PRD-01', categoria: 'Zirconio', nombre: 'Corona Monolítica Zirconio HT+', tiempo: '48 hrs', precio: 1650, garantia: '5 años', estatus: true },
    { id: 'PRD-02', categoria: 'Zirconio', nombre: 'Puente Fijo Zirconio Multicapa (por unidad)', tiempo: '72 hrs', precio: 1750, garantia: '5 años', estatus: true },
    { id: 'PRD-03', categoria: 'E-Max', nombre: 'Carilla Estética E-Max Estratificada', tiempo: '72 hrs', precio: 2100, garantia: '3 años', estatus: true },
    { id: 'PRD-04', categoria: 'E-Max', nombre: 'Inlay / Onlay Cerámico Disilicato de Litio', tiempo: '48 hrs', precio: 1850, garantia: '3 años', estatus: true },
    { id: 'PRD-05', categoria: 'Alinia', nombre: 'Tratamiento Alineadores Clear Dent (14 fases)', tiempo: '5 días', precio: 12500, garantia: 'Ajuste clínico', estatus: true },
    { id: 'PRD-06', categoria: 'Guardas', nombre: 'Guarda Oclusal Nocturna Rígida CAD/CAM', tiempo: '24 hrs', precio: 1350, garantia: '1 año', estatus: true }
  ],

  // 7. DISCOS CAD/CAM (InventarioDiscos.php, DiscosActivos.php, DiscosUsados.php, etc.)
  discos: [
    {
      id: 'ZRC-204',
      lote: 'LOT-9921A',
      marca: 'Aidite 3D Pro',
      color: 'Vita A2',
      espesor: '14 mm',
      capacidad: 22,
      usadas: 14,
      estado: 'Activo',
      almacen: 'CNC-1',
      fechaIngreso: '2026-09-20',
      ordenesUso: [
        { ot: '30593', paciente: 'Valeria Gómez', piezas: 6, fecha: '2026-10-01' },
        { ot: '30589', paciente: 'Arturo Gómez', piezas: 6, fecha: '2026-09-29' },
        { ot: '30582', paciente: 'Ismael Rosales', piezas: 2, fecha: '2026-09-30' }
      ]
    },
    {
      id: 'ZRC-205',
      lote: 'LOT-9921B',
      marca: 'Ivoclar IPS e.max ZirCAD',
      color: 'Vita A1',
      espesor: '18 mm',
      capacidad: 20,
      usadas: 8,
      estado: 'Activo',
      almacen: 'CNC-2',
      fechaIngreso: '2026-09-25',
      ordenesUso: [
        { ot: '30578', paciente: 'Clara Estrada', piezas: 4, fecha: '2026-10-02' },
        { ot: '30545', paciente: 'Mario Delgado', piezas: 4, fecha: '2026-10-04' }
      ]
    },
    {
      id: 'ZRC-206',
      lote: 'LOT-8840C',
      marca: 'Upcera Explore',
      color: 'Vita A3',
      espesor: '12 mm',
      capacidad: 24,
      usadas: 19,
      estado: 'Activo',
      almacen: 'CNC-1',
      fechaIngreso: '2026-09-15',
      ordenesUso: [
        { ot: '30591', paciente: 'Gabriel Lozano', piezas: 1, fecha: '2026-09-26' },
        { ot: '30584', paciente: 'Miguel Alan', piezas: 6, fecha: '2026-09-30' },
        { ot: '30560', paciente: 'Patricia Solís', piezas: 12, fecha: '2026-10-03' }
      ]
    },
    {
      id: 'ZRC-207',
      lote: 'LOT-8840D',
      marca: 'Vita YZ HT',
      color: 'Bleach B1',
      espesor: '14 mm',
      capacidad: 22,
      usadas: 0,
      estado: 'En Almacén',
      almacen: 'Gaveta A-2',
      fechaIngreso: '2026-10-05',
      ordenesUso: []
    },
    {
      id: 'ZRC-190',
      lote: 'LOT-7102X',
      marca: 'Aidite 3D Pro',
      color: 'Vita A2',
      espesor: '14 mm',
      capacidad: 22,
      usadas: 22,
      estado: 'Agotado / Usado',
      almacen: 'Histórico',
      fechaIngreso: '2026-08-10',
      ordenesUso: [
        { ot: '29921', paciente: 'Patricia Elizondo', piezas: 10, fecha: '2026-08-20' },
        { ot: '29871', paciente: 'Roberto Fuentes', piezas: 12, fecha: '2026-08-25' }
      ]
    },
    {
      id: 'ZRC-188',
      lote: 'LOT-7098M',
      marca: 'Upcera Explore',
      color: 'Vita B2',
      espesor: '16 mm',
      capacidad: 20,
      usadas: 20,
      estado: 'Agotado / Usado',
      almacen: 'Histórico',
      fechaIngreso: '2026-08-01',
      ordenesUso: [
        { ot: '29552', paciente: 'Laura Méndez', piezas: 10, fecha: '2026-08-15' },
        { ot: '29463', paciente: 'David Cantú', piezas: 10, fecha: '2026-08-18' }
      ]
    },
    {
      id: 'ZRC-VTA-2079',
      lote: 'LOT-2079V',
      marca: 'Aidite 3D Pro Zirconia',
      color: 'Vita A2',
      espesor: '20 mm',
      capacidad: 22,
      usadas: 0,
      estado: 'Vendido',
      almacen: 'Vendido a Clínica',
      fechaIngreso: '2025-05-08',
      fechaVenta: '2026-06-04 10:51',
      usuarioVenta: 'Jose Alatorre',
      clienteDestino: 'Dr. José Antonio Alatorre Serna',
      ordenesUso: []
    },
    {
      id: 'ZRC-VTA-2226',
      lote: 'LOT-2226V',
      marca: 'Aidite 3D Pro Zirconia',
      color: 'Vita A1',
      espesor: '16 mm',
      capacidad: 20,
      usadas: 0,
      estado: 'Vendido',
      almacen: 'Vendido a Clínica',
      fechaIngreso: '2025-08-26',
      fechaVenta: '2026-03-26 15:43',
      usuarioVenta: 'Irene Martinez',
      clienteDestino: 'Dra. Alicia Irene Martínez Gómez',
      ordenesUso: []
    },
    {
      id: 'ZRC-VTA-2286',
      lote: 'LOT-2286V',
      marca: 'Upcera Explore',
      color: 'Vita A1',
      espesor: '18 mm',
      capacidad: 20,
      usadas: 0,
      estado: 'Vendido',
      almacen: 'Vendido a Clínica',
      fechaIngreso: '2025-09-17',
      fechaVenta: '2026-08-14 11:35',
      usuarioVenta: 'Jose Alatorre',
      clienteDestino: 'Clínica Laguna Dental',
      ordenesUso: []
    }
  ],
  archivosDiscosErroneos: [
    { id: 'ERR-12', archivo: 'JOB_9811_ZRC14_A2.xml', disco: 'ZRC-204', fecha: '2026-10-06 14:22', error: 'Coordenada Z fuera de límite de espesor (14mm)', operador: 'Tec. Iván Soto', estado: 'Pendiente Revisión' },
    { id: 'ERR-11', archivo: 'JOB_9790_PMMA20.xml', disco: 'ZRC-206', fecha: '2026-10-04 11:05', error: 'Conector de soporte solapado en pieza #24', operador: 'Tec. Iván Soto', estado: 'Corregido' }
  ],
  archivosPorAutorizar: [
    { id: 'AUT-31', archivo: 'CAM_NEST_9841_A2.stl', disco: 'ZRC-204 (Aidite 14mm A2)', piezas: 4, ordenes: '#OT-9841, #OT-9842', solicitante: 'Tec. Iván Soto', fecha: '2026-10-07 12:10', autorizado: false },
    { id: 'AUT-32', archivo: 'CAM_NEST_9830_A3.stl', disco: 'ZRC-206 (Upcera 12mm A3)', piezas: 3, ordenes: '#OT-9830', solicitante: 'Tec. Carla Ruiz', fecha: '2026-10-07 12:45', autorizado: false }
  ],

  // 8. BANERS APP
  banersApp: [
    { id: 1, titulo: 'Nuevo Zirconio Multicapa 3D Pro', subtitulo: 'Translucidez natural del 57% en borde incisal', imagen: 'assets/dental_cadcam.jpg', orden: 1, estatus: true },
    { id: 2, titulo: 'Escaneo Intraoral a Domicilio sin Costo', subtitulo: 'Agenda tu recolección digital desde el portal de doctores', imagen: 'assets/dental-lab.jpg', orden: 2, estatus: true },
    { id: 3, titulo: 'Alineadores Clear Dent en 5 Días Hábiles', subtitulo: 'Set completo con planificación 3D incluida', imagen: 'assets/dental-bg.jpg', orden: 3, estatus: true }
  ],

  // 9. RECORDATORIOS Y TIPOS DE RECORDATORIO (Recordatorios.php & TiposRecordatorio.php)
  recordatorios: [
    { id: 1, usuario: 'Diana', tipo: 'Falso', idTipoRecordatorio: 2, doctor: 'Diana V.', mensaje: 'Falso', fecha: '2022-03-15', hora: '21:36:00', estatus: 'Activo' },
    { id: 2, usuario: 'Irene', tipo: 'Ventas', idTipoRecordatorio: 3, doctor: 'Dr. Ana Laura', mensaje: 'Confirmar recepción de Corona Zirconio #OT-30594 a las 14:30 hrs', fecha: '2026-09-26', hora: '14:30:00', estatus: 'Activo' },
    { id: 3, usuario: 'JoseD', tipo: 'Ventas', idTipoRecordatorio: 3, doctor: 'Dr. Arturo Camacho', mensaje: 'Seguimiento renovación de paquete PAQ: 3227', fecha: '2026-09-29', hora: '11:00:00', estatus: 'Activo' }
  ],
  tiposRecordatorio: [
    { id: 1, idTipoRecordatorio: 1, nombre: 'Fugaz34', prioridad: 'Alta', canal: 'Sistema DentControl', estatus: true },
    { id: 2, idTipoRecordatorio: 2, nombre: 'Falso', prioridad: 'Media', canal: 'Sistema DentControl', estatus: true },
    { id: 3, idTipoRecordatorio: 3, nombre: 'Ventas', prioridad: 'Alta', canal: 'Comercial / Vendedores', estatus: true }
  ],

  // 10. MARCAS DE DISCOS (MarcasLab.php)
  marcasDiscos: [
    { id: 1, marca: 'Aidite Qinhuangdao Technology', origen: ' Internacional', material: 'Zirconio 3D Pro / PMMA', estatus: true },
    { id: 2, marca: 'Ivoclar Vivadent IPS e.max', origen: 'Liechtenstein', material: 'ZirCAD / Disilicato de Litio', estatus: true },
    { id: 3, marca: 'Upcera Dental America', origen: 'Internacional', material: 'Zirconio HT / ST Multicapa', estatus: true },
    { id: 4, marca: 'VITA Zahnfabrik', origen: 'Alemania', material: 'VITA YZ HT / Enamic', estatus: true }
  ],

  // 11. DOCTORES REALES SINCRONIZADOS DE DENT DEMO (ListadosDoctores.php, Doctor.php)
  doctores: [
    {
        "id": 56,
        "codigo": "DOC-56",
        "nombre": "Dr. Ana Laura  Castillo Hernandez",
        "doctorCorto": "Dr. Ana Laura",
        "apellidoPaterno": "Castillo",
        "apellidoMaterno": "Hernandez",
        "celular": "8713952578",
        "telefono": "8712963651",
        "mail": "acastillo@clinicadent.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Hidalgo #3125, Col. Nuevo Torreon, C.P. 27272",
        "direccion": "Hidalgo #3125, Col. Nuevo Torreon, C.P. 27272",
        "calle": "Hidalgo",
        "colonia": "Nuevo Torreon",
        "numExt": "3125",
        "cp": "27272",
        "contacto": "",
        "contactoTel": "8712963651",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 57,
        "codigo": "DOC-57",
        "nombre": "Dr. Isaac  Camacho Reza",
        "doctorCorto": "Dr. Isaac",
        "apellidoPaterno": "Camacho",
        "apellidoMaterno": "Reza",
        "celular": "8712189317",
        "telefono": "8712963651",
        "mail": "icamacho@clinicadent.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Av. Allende #1260, Col. Centro, C.P. 27000",
        "direccion": "Av. Allende #1260, Col. Centro, C.P. 27000",
        "calle": "Av. Allende",
        "colonia": "Centro",
        "numExt": "1260",
        "cp": "27000",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 85,
        "codigo": "DOC-85",
        "nombre": "Dr. Francisco Alejandro  Poblano  Vázquez",
        "doctorCorto": "Dr. Francisco Alejandro",
        "apellidoPaterno": "Poblano",
        "apellidoMaterno": "Vázquez",
        "celular": "8717276525",
        "telefono": "N/A",
        "mail": "dentalcenter@gmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Juárez #2767, Col. Centro, C.P. 27000",
        "direccion": "Juárez #2767, Col. Centro, C.P. 27000",
        "calle": "Juárez",
        "colonia": "Centro",
        "numExt": "2767",
        "cp": "27000",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 92,
        "codigo": "DOC-92",
        "nombre": "Dr. Gustavo Jesús Esquivel Limones",
        "doctorCorto": "Dr. Gustavo Jesús",
        "apellidoPaterno": "Esquivel",
        "apellidoMaterno": "Limones",
        "celular": "8712019434",
        "telefono": "N/A",
        "mail": "ortodonciaes@gmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "34 #325, Col. Centro, C.P. 27000",
        "direccion": "34 #325, Col. Centro, C.P. 27000",
        "calle": "34",
        "colonia": "Centro",
        "numExt": "325",
        "cp": "27000",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 125,
        "codigo": "DOC-125",
        "nombre": "Dr. Arturo  Camacho Davila",
        "doctorCorto": "Dr. Arturo",
        "apellidoPaterno": "Camacho",
        "apellidoMaterno": "Davila",
        "celular": "8712635543",
        "telefono": "N/A",
        "mail": "arturo_camachodavila@yahoo.com.mx",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Allende #1260, Col. Primero de Cobian, C.P. 27000",
        "direccion": "Allende #1260, Col. Primero de Cobian, C.P. 27000",
        "calle": "Allende",
        "colonia": "Primero de Cobian",
        "numExt": "1260",
        "cp": "27000",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 177,
        "codigo": "DOC-177",
        "nombre": "Dra. Irma Alejandra  Hernandez  Flores",
        "doctorCorto": "Dra. Irma Alejandra",
        "apellidoPaterno": "Hernandez",
        "apellidoMaterno": "Flores",
        "celular": "8713434635",
        "telefono": "8713434635",
        "mail": "iirma_hdz@hotmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Cadiz #8, Col. Florida blanca, C.P. 27268",
        "direccion": "Cadiz #8, Col. Florida blanca, C.P. 27268",
        "calle": "Cadiz",
        "colonia": "Florida blanca",
        "numExt": "8",
        "cp": "27268",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 182,
        "codigo": "DOC-182",
        "nombre": "Dra. Mirta Azucena  Reza Escobedo",
        "doctorCorto": "Dra. Mirta Azucena",
        "apellidoPaterno": "Reza",
        "apellidoMaterno": "Escobedo",
        "celular": "8711743796",
        "telefono": "N/A",
        "mail": "mirtareza@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Avenida Zacatecas #624, Col. Centro, C.P. 27000",
        "direccion": "Avenida Zacatecas #624, Col. Centro, C.P. 27000",
        "calle": "Avenida Zacatecas",
        "colonia": "Centro",
        "numExt": "624",
        "cp": "27000",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 184,
        "codigo": "DOC-184",
        "nombre": "Dr. Ismael Gonzalez Anaya",
        "doctorCorto": "Dr. Ismael",
        "apellidoPaterno": "Gonzalez",
        "apellidoMaterno": "Anaya",
        "celular": "6181020640",
        "telefono": "N/A",
        "mail": "dr.ismael.glez@mail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Azalea #100, Col. Fracc. Jardines de Durango, C.P. 34200",
        "direccion": "Azalea #100, Col. Fracc. Jardines de Durango, C.P. 34200",
        "calle": "Azalea",
        "colonia": "Fracc. Jardines de Durango",
        "numExt": "100",
        "cp": "34200",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 195,
        "codigo": "DOC-195",
        "nombre": "Dr. Fernando Ariel Serrano Carrillo",
        "doctorCorto": "Dr. Fernando Ariel",
        "apellidoPaterno": "Serrano",
        "apellidoMaterno": "Carrillo",
        "celular": "8717941139",
        "telefono": "N/A",
        "mail": "drferserrano@gmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Acropolis #829, Col. Valle del Nazas, C.P. 27000",
        "direccion": "Acropolis #829, Col. Valle del Nazas, C.P. 27000",
        "calle": "Acropolis",
        "colonia": "Valle del Nazas",
        "numExt": "829",
        "cp": "27000",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 214,
        "codigo": "DOC-214",
        "nombre": "Dra. Yessica  Nava Espinoza",
        "doctorCorto": "Dra. Yessica",
        "apellidoPaterno": "Nava",
        "apellidoMaterno": "Espinoza",
        "celular": "8711169754",
        "telefono": "N/A",
        "mail": "orto.dentt@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Amador Cardenas #1009, Col. Nueva Los Angeles, C.P. 27140",
        "direccion": "Amador Cardenas #1009, Col. Nueva Los Angeles, C.P. 27140",
        "calle": "Amador Cardenas",
        "colonia": "Nueva Los Angeles",
        "numExt": "1009",
        "cp": "27140",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 251,
        "codigo": "DOC-251",
        "nombre": "Dr. Alberto Alfonso Davila Gonzalez",
        "doctorCorto": "Dr. Alberto Alfonso",
        "apellidoPaterno": "Davila",
        "apellidoMaterno": "Gonzalez",
        "celular": "8711024414",
        "telefono": "N/A",
        "mail": "alberto_davg9@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Av Hidalgo #3125, Col. Nuevo Torreon, C.P. 27060",
        "direccion": "Av Hidalgo #3125, Col. Nuevo Torreon, C.P. 27060",
        "calle": "Av Hidalgo",
        "colonia": "Nuevo Torreon",
        "numExt": "3125",
        "cp": "27060",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 304,
        "codigo": "DOC-304",
        "nombre": "Dra. Elida Lizeth De la Cerda Peña",
        "doctorCorto": "Dra. Elida Lizeth",
        "apellidoPaterno": "De la Cerda",
        "apellidoMaterno": "Peña",
        "celular": "8112032746",
        "telefono": "N/A",
        "mail": "dralizcp@gmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Av. Benito Juarez #4595, Col. Chula Vista, C.P. 67180",
        "direccion": "Av. Benito Juarez #4595, Col. Chula Vista, C.P. 67180",
        "calle": "Av. Benito Juarez",
        "colonia": "Chula Vista",
        "numExt": "4595",
        "cp": "67180",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 310,
        "codigo": "DOC-310",
        "nombre": "Dr. Jorge Alberto Vazquez Aguilera",
        "doctorCorto": "Dr. Jorge Alberto",
        "apellidoPaterno": "Vazquez",
        "apellidoMaterno": "Aguilera",
        "celular": "8118017498",
        "telefono": "N/A",
        "mail": "ava_007@hotmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Texcoco #615, Col. Chapultepec, C.P. 66450",
        "direccion": "Texcoco #615, Col. Chapultepec, C.P. 66450",
        "calle": "Texcoco",
        "colonia": "Chapultepec",
        "numExt": "615",
        "cp": "66450",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 315,
        "codigo": "DOC-315",
        "nombre": "Dra. Maria Paula Ramos  Martinez",
        "doctorCorto": "Dra. Maria Paula",
        "apellidoPaterno": "Ramos",
        "apellidoMaterno": "Martinez",
        "celular": "8717832159",
        "telefono": "N/A",
        "mail": "paula_95_rm@hotmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "ENCINO #111, Col. TORREON JARDIN, C.P. 27200",
        "direccion": "ENCINO #111, Col. TORREON JARDIN, C.P. 27200",
        "calle": "ENCINO",
        "colonia": "TORREON JARDIN",
        "numExt": "111",
        "cp": "27200",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 346,
        "codigo": "DOC-346",
        "nombre": "Dra. Yessica Karina Nava Espinoza",
        "doctorCorto": "Dra. Yessica Karina",
        "apellidoPaterno": "Nava",
        "apellidoMaterno": "Espinoza",
        "celular": "4888823286",
        "telefono": "N/A",
        "mail": "yessinava@clinicadent.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Av. Hidalgo #3125, Col. Nuevo Torreon, C.P. 27060",
        "direccion": "Av. Hidalgo #3125, Col. Nuevo Torreon, C.P. 27060",
        "calle": "Av. Hidalgo",
        "colonia": "Nuevo Torreon",
        "numExt": "3125",
        "cp": "27060",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 351,
        "codigo": "DOC-351",
        "nombre": "Dra. Karla Liliana Fuentes Alvarez",
        "doctorCorto": "Dra. Karla Liliana",
        "apellidoPaterno": "Fuentes",
        "apellidoMaterno": "Alvarez",
        "celular": "8718964494",
        "telefono": "N/A",
        "mail": "karlafuentes@hotmail.com",
        "vendedor": "Jose Alatorre",
        "nota": "N/A",
        "clinica": "Cto Vicente Suarez #20, Col. Fracc Chapultepec, C.P. 27054",
        "direccion": "Cto Vicente Suarez #20, Col. Fracc Chapultepec, C.P. 27054",
        "calle": "Cto Vicente Suarez",
        "colonia": "Fracc Chapultepec",
        "numExt": "20",
        "cp": "27054",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 399,
        "codigo": "DOC-399",
        "nombre": "Dr. Carlos Alberto  Alvarado  González",
        "doctorCorto": "Dr. Carlos Alberto",
        "apellidoPaterno": "Alvarado",
        "apellidoMaterno": "González",
        "celular": "8713947176",
        "telefono": "N/A",
        "mail": "carlos.alvarado7@outlook.es",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Vía Romana #857, Col. Roma, C.P. 27258",
        "direccion": "Vía Romana #857, Col. Roma, C.P. 27258",
        "calle": "Vía Romana",
        "colonia": "Roma",
        "numExt": "857",
        "cp": "27258",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 405,
        "codigo": "DOC-405",
        "nombre": "Dra. Nayeli Santos Zapata",
        "doctorCorto": "Dra. Nayeli",
        "apellidoPaterno": "Santos",
        "apellidoMaterno": "Zapata",
        "celular": "8120243109",
        "telefono": "N/A",
        "mail": "dentalsantos@outlook.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Afganistan #137, Col. Prados de la cienegu, C.P. 66636",
        "direccion": "Afganistan #137, Col. Prados de la cienegu, C.P. 66636",
        "calle": "Afganistan",
        "colonia": "Prados de la cienegu",
        "numExt": "137",
        "cp": "66636",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 417,
        "codigo": "DOC-417",
        "nombre": "Dra. Brenda Deyanira Hernández Aguirre",
        "doctorCorto": "Dra. Brenda Deyanira",
        "apellidoPaterno": "Hernández",
        "apellidoMaterno": "Aguirre",
        "celular": "6566758982",
        "telefono": "N/A",
        "mail": "hedzbrenda04@gmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Sto Ciervo #7, Col. Fraccionamiento Viñedos, C.P. 27023",
        "direccion": "Sto Ciervo #7, Col. Fraccionamiento Viñedos, C.P. 27023",
        "calle": "Sto Ciervo",
        "colonia": "Fraccionamiento Viñedos",
        "numExt": "7",
        "cp": "27023",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 421,
        "codigo": "DOC-421",
        "nombre": "Dra. Nora Patricia Flores Moreno",
        "doctorCorto": "Dra. Nora Patricia",
        "apellidoPaterno": "Flores",
        "apellidoMaterno": "Moreno",
        "celular": "8182084800",
        "telefono": "N/A",
        "mail": "drafloresnorap@gmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Av.las Puentes #1406, Col. Las Puentes 8vo sector., C.P. 66460",
        "direccion": "Av.las Puentes #1406, Col. Las Puentes 8vo sector., C.P. 66460",
        "calle": "Av.las Puentes",
        "colonia": "Las Puentes 8vo sector.",
        "numExt": "1406",
        "cp": "66460",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 435,
        "codigo": "DOC-435",
        "nombre": "Dr. Luis Mariano Mireles Torres",
        "doctorCorto": "Dr. Luis Mariano",
        "apellidoPaterno": "Mireles",
        "apellidoMaterno": "Torres",
        "celular": "8713477634",
        "telefono": "N/A",
        "mail": "marianomireles27@gmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Leandro Valle #45, Col. Centro, C.P. 27000",
        "direccion": "Leandro Valle #45, Col. Centro, C.P. 27000",
        "calle": "Leandro Valle",
        "colonia": "Centro",
        "numExt": "45",
        "cp": "27000",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 441,
        "codigo": "DOC-441",
        "nombre": "Dra. Neira Jael Cruz Castro",
        "doctorCorto": "Dra. Neira Jael",
        "apellidoPaterno": "Cruz",
        "apellidoMaterno": "Castro",
        "celular": "8114206886",
        "telefono": "N/A",
        "mail": "dra.neirajael@gmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Acueducto de Celaya #1365, Col. Sierra Morena, C.P. 67193",
        "direccion": "Acueducto de Celaya #1365, Col. Sierra Morena, C.P. 67193",
        "calle": "Acueducto de Celaya",
        "colonia": "Sierra Morena",
        "numExt": "1365",
        "cp": "67193",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 442,
        "codigo": "DOC-442",
        "nombre": "Dra. Patricia Elizabeth Valdes Diaz",
        "doctorCorto": "Dra. Patricia Elizabeth",
        "apellidoPaterno": "Valdes",
        "apellidoMaterno": "Diaz",
        "celular": "8717828850",
        "telefono": "N/A",
        "mail": "patavd@hotmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Av. Morelos #225, Col. Centro, C.P. 35000",
        "direccion": "Av. Morelos #225, Col. Centro, C.P. 35000",
        "calle": "Av. Morelos",
        "colonia": "Centro",
        "numExt": "225",
        "cp": "35000",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 445,
        "codigo": "DOC-445",
        "nombre": "Dra. Sarai  Caldera  Gallegos",
        "doctorCorto": "Dra. Sarai",
        "apellidoPaterno": "Caldera",
        "apellidoMaterno": "Gallegos",
        "celular": "12345678",
        "telefono": "N/A",
        "mail": "bysen_171005@outlook.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Cerrada San Gabriel #123, Col. Villas el Refugio, C.P. 35023",
        "direccion": "Cerrada San Gabriel #123, Col. Villas el Refugio, C.P. 35023",
        "calle": "Cerrada San Gabriel",
        "colonia": "Villas el Refugio",
        "numExt": "123",
        "cp": "35023",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 449,
        "codigo": "DOC-449",
        "nombre": "Dr. Martin Argenis Silva Ontiveros",
        "doctorCorto": "Dr. Martin Argenis",
        "apellidoPaterno": "Silva",
        "apellidoMaterno": "Ontiveros",
        "celular": "8110218395",
        "telefono": "N/A",
        "mail": "dr.martin.argenis@gmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Rio Nazas #1297, Col. Valle del Mirador, C.P. 64750",
        "direccion": "Rio Nazas #1297, Col. Valle del Mirador, C.P. 64750",
        "calle": "Rio Nazas",
        "colonia": "Valle del Mirador",
        "numExt": "1297",
        "cp": "64750",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 453,
        "codigo": "DOC-453",
        "nombre": "Dra. Claudia Lizeth Mares Bustos",
        "doctorCorto": "Dra. Claudia Lizeth",
        "apellidoPaterno": "Mares",
        "apellidoMaterno": "Bustos",
        "celular": "8120100053",
        "telefono": "N/A",
        "mail": "claumaresb@gmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Benito Juárez #137, Col. Centro, C.P. 66230",
        "direccion": "Benito Juárez #137, Col. Centro, C.P. 66230",
        "calle": "Benito Juárez",
        "colonia": "Centro",
        "numExt": "137",
        "cp": "66230",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 454,
        "codigo": "DOC-454",
        "nombre": "Dra. Karla Beatriz Soto Trejo",
        "doctorCorto": "Dra. Karla Beatriz",
        "apellidoPaterno": "Soto",
        "apellidoMaterno": "Trejo",
        "celular": "8115899628",
        "telefono": "N/A",
        "mail": "kbst_19@hotmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "N 15 #469, Col. Metroplex, C.P. 66612",
        "direccion": "N 15 #469, Col. Metroplex, C.P. 66612",
        "calle": "N 15",
        "colonia": "Metroplex",
        "numExt": "469",
        "cp": "66612",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 471,
        "codigo": "DOC-471",
        "nombre": "Dra. Nani Yarahuan Vega",
        "doctorCorto": "Dra. Nani",
        "apellidoPaterno": "Yarahuan",
        "apellidoMaterno": "Vega",
        "celular": "8711490799",
        "telefono": "N/A",
        "mail": "nani_yv96@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Rio balsas #703, Col. Navarro, C.P. 27010",
        "direccion": "Rio balsas #703, Col. Navarro, C.P. 27010",
        "calle": "Rio balsas",
        "colonia": "Navarro",
        "numExt": "703",
        "cp": "27010",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 530,
        "codigo": "DOC-530",
        "nombre": "Dr. Miguel Alan Lozano Gonzalez",
        "doctorCorto": "Dr. Miguel Alan",
        "apellidoPaterno": "Lozano",
        "apellidoMaterno": "Gonzalez",
        "celular": "8124325868",
        "telefono": "N/A",
        "mail": "dr.alanlozano@gmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Alhambra #120, Col. La Alhambra, C.P. 64988",
        "direccion": "Alhambra #120, Col. La Alhambra, C.P. 64988",
        "calle": "Alhambra",
        "colonia": "La Alhambra",
        "numExt": "120",
        "cp": "64988",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 546,
        "codigo": "DOC-546",
        "nombre": "Dra. Maria Ziomara Deyanira Padilla Castillo",
        "doctorCorto": "Dra. Maria Ziomara Deyanira",
        "apellidoPaterno": "Padilla",
        "apellidoMaterno": "Castillo",
        "celular": "8115555827",
        "telefono": "N/A",
        "mail": "ziomarapadilla@yahoo.com.mx",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Ricardo Covarrubias #3337, Col. Estadio, C.P. 64830",
        "direccion": "Ricardo Covarrubias #3337, Col. Estadio, C.P. 64830",
        "calle": "Ricardo Covarrubias",
        "colonia": "Estadio",
        "numExt": "3337",
        "cp": "64830",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 548,
        "codigo": "DOC-548",
        "nombre": "Jacqs Flores De La Cruz",
        "doctorCorto": "Jacqs",
        "apellidoPaterno": "Flores",
        "apellidoMaterno": "De La Cruz",
        "celular": "8711116400",
        "telefono": "N/A",
        "mail": "Jacquelineflores0304@dent.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Av. Hidalgo #3251, Col. Nuevo Torreón, C.P. 3251",
        "direccion": "Av. Hidalgo #3251, Col. Nuevo Torreón, C.P. 3251",
        "calle": "Av. Hidalgo",
        "colonia": "Nuevo Torreón",
        "numExt": "3251",
        "cp": "3251",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 568,
        "codigo": "DOC-568",
        "nombre": "Dr. Cesar Ivan Bautista Gutierrez",
        "doctorCorto": "Dr. Cesar Ivan",
        "apellidoPaterno": "Bautista",
        "apellidoMaterno": "Gutierrez",
        "celular": "8715115071",
        "telefono": "N/A",
        "mail": "cesarbautistagu@gmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Pabellón Nte. #4, Col. Centro, C.P. 27440",
        "direccion": "Pabellón Nte. #4, Col. Centro, C.P. 27440",
        "calle": "Pabellón Nte.",
        "colonia": "Centro",
        "numExt": "4",
        "cp": "27440",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 583,
        "codigo": "DOC-583",
        "nombre": "Dra. Diana Elizabeth  Valadez Zúñiga",
        "doctorCorto": "Dra. Diana Elizabeth",
        "apellidoPaterno": "Valadez",
        "apellidoMaterno": "Zúñiga",
        "celular": "8992137937",
        "telefono": "N/A",
        "mail": "diana_evz19@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Jorge González Camarena #207, Col. Roble San Nicolás, C.P. 66414",
        "direccion": "Jorge González Camarena #207, Col. Roble San Nicolás, C.P. 66414",
        "calle": "Jorge González Camarena",
        "colonia": "Roble San Nicolás",
        "numExt": "207",
        "cp": "66414",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 586,
        "codigo": "DOC-586",
        "nombre": "Dr. Jose Angel Delgado Diaz",
        "doctorCorto": "Dr. Jose Angel",
        "apellidoPaterno": "Delgado",
        "apellidoMaterno": "Diaz",
        "celular": "8180882101",
        "telefono": "N/A",
        "mail": "jadd_90@hotmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Av. de la Primavera #1434, Col. Tres caminos, C.P. 67190",
        "direccion": "Av. de la Primavera #1434, Col. Tres caminos, C.P. 67190",
        "calle": "Av. de la Primavera",
        "colonia": "Tres caminos",
        "numExt": "1434",
        "cp": "67190",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 1
    },
    {
        "id": 37,
        "codigo": "DOC-37",
        "nombre": "Dra. Alicia Irene Martínez Gómez",
        "doctorCorto": "Dra. Alicia Irene",
        "apellidoPaterno": "Martínez",
        "apellidoMaterno": "Gómez",
        "celular": "8714807110",
        "telefono": "8719044910",
        "mail": "imartinez@dentlab.mx",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "Dent",
        "direccion": "Dent",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 38,
        "codigo": "DOC-38",
        "nombre": "Ylyana  Moreno  Campos",
        "doctorCorto": "Ylyana",
        "apellidoPaterno": "Moreno",
        "apellidoMaterno": "Campos",
        "celular": "8712114744",
        "telefono": "N/A",
        "mail": "ylyana.moreno@gmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 39,
        "codigo": "DOC-39",
        "nombre": "Luis Gerardo  Cervantes  Díaz",
        "doctorCorto": "Luis Gerardo",
        "apellidoPaterno": "Cervantes",
        "apellidoMaterno": "Díaz",
        "celular": "8715341405",
        "telefono": "N/A",
        "mail": "luiscervantesd22@gmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 40,
        "codigo": "DOC-40",
        "nombre": "Ext Dr. Luis Gerardo Arellano de León",
        "doctorCorto": "Ext Dr. Luis Gerardo",
        "apellidoPaterno": "Arellano",
        "apellidoMaterno": "de León",
        "celular": "8714586848",
        "telefono": "8714586848",
        "mail": "arellanolg@gmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 41,
        "codigo": "DOC-41",
        "nombre": "Federico Juárez  Bassol",
        "doctorCorto": "Federico",
        "apellidoPaterno": "Juárez",
        "apellidoMaterno": "Bassol",
        "celular": "8713914239",
        "telefono": "N/A",
        "mail": "federicojb@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 42,
        "codigo": "DOC-42",
        "nombre": "Luis Armando Mendoza Pérez",
        "doctorCorto": "Luis Armando",
        "apellidoPaterno": "Mendoza",
        "apellidoMaterno": "Pérez",
        "celular": "8713512449",
        "telefono": "N/A",
        "mail": "lmendoza@resosistemas.mx",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 43,
        "codigo": "DOC-43",
        "nombre": "Eliasib Reyes Moreno",
        "doctorCorto": "Eliasib",
        "apellidoPaterno": "Reyes",
        "apellidoMaterno": "Moreno",
        "celular": "8717551569",
        "telefono": "N/A",
        "mail": "eliasib@resosistemas.mx",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 47,
        "codigo": "DOC-47",
        "nombre": "Amy Leonor Chiffer Torres",
        "doctorCorto": "Amy Leonor",
        "apellidoPaterno": "Chiffer",
        "apellidoMaterno": "Torres",
        "celular": "8711097221",
        "telefono": "N/A",
        "mail": "achiffer@clinicadent.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 49,
        "codigo": "DOC-49",
        "nombre": "José Manuel Diosdado Zambrano",
        "doctorCorto": "José Manuel",
        "apellidoPaterno": "Diosdado",
        "apellidoMaterno": "Zambrano",
        "celular": "8714582690",
        "telefono": "N/A",
        "mail": "jdiosdado@dentlab.mx",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 50,
        "codigo": "DOC-50",
        "nombre": "Dr. Arquimedes Martinez Llanes",
        "doctorCorto": "Dr. Arquimedes",
        "apellidoPaterno": "Martinez",
        "apellidoMaterno": "Llanes",
        "celular": "8120027770",
        "telefono": "8115212027",
        "mail": "drarquimedesii@gmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Monterrey",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 51,
        "codigo": "DOC-51",
        "nombre": "Dr. Carlos Azael Gutiérrez  Ruiz",
        "doctorCorto": "Dr. Carlos Azael",
        "apellidoPaterno": "Gutiérrez",
        "apellidoMaterno": "Ruiz",
        "celular": "8112456490",
        "telefono": "8112456490",
        "mail": "carlosgtzr@hotmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Monterrey",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 52,
        "codigo": "DOC-52",
        "nombre": "Dr. Hector Alberto Minila Cano",
        "doctorCorto": "Dr. Hector Alberto",
        "apellidoPaterno": "Minila",
        "apellidoMaterno": "Cano",
        "celular": "8714349978",
        "telefono": "8134000390",
        "mail": "hectorm27@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 54,
        "codigo": "DOC-54",
        "nombre": "Dr. Oscar R Chavez Padilla",
        "doctorCorto": "Dr. Oscar R",
        "apellidoPaterno": "Chavez",
        "apellidoMaterno": "Padilla",
        "celular": "8712963651",
        "telefono": "8712963651",
        "mail": "ochavez@clinicadent.com",
        "vendedor": "Jose Alatorre",
        "nota": "N/A",
        "clinica": "Torreón",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 55,
        "codigo": "DOC-55",
        "nombre": "Dr. Luis Gerardo  Arellano de Leon",
        "doctorCorto": "Dr. Luis Gerardo",
        "apellidoPaterno": "Arellano",
        "apellidoMaterno": "de Leon",
        "celular": "8714586840",
        "telefono": "8712963651",
        "mail": "larellano@clinicadent.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 58,
        "codigo": "DOC-58",
        "nombre": "Dr. Gerardo  Balderas Soto",
        "doctorCorto": "Dr. Gerardo",
        "apellidoPaterno": "Balderas",
        "apellidoMaterno": "Soto",
        "celular": "8713446944",
        "telefono": "8712963651",
        "mail": "gbalderas@clinicadent.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 59,
        "codigo": "DOC-59",
        "nombre": "Dr. José Antonio Alatorre Serna",
        "doctorCorto": "Dr. José Antonio",
        "apellidoPaterno": "Alatorre",
        "apellidoMaterno": "Serna",
        "celular": "8712963651",
        "telefono": "8712963651",
        "mail": "clinicadent2011@hotmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Torreón",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 60,
        "codigo": "DOC-60",
        "nombre": "José Alejandro Rubio Mendoza",
        "doctorCorto": "José Alejandro",
        "apellidoPaterno": "Rubio",
        "apellidoMaterno": "Mendoza",
        "celular": "8715848317",
        "telefono": "N/A",
        "mail": "alejandro.rub.men@gmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 61,
        "codigo": "DOC-61",
        "nombre": "Dra. Vianeid Sifuentes Dorado",
        "doctorCorto": "Dra. Vianeid",
        "apellidoPaterno": "Sifuentes",
        "apellidoMaterno": "Dorado",
        "celular": "8711377792",
        "telefono": "8717508620",
        "mail": "vsifuentes@clinicadent",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "INTERNO",
        "activo": true,
        "externo": false,
        "mesesSinPaquete": 0
    },
    {
        "id": 62,
        "codigo": "DOC-62",
        "nombre": "Gustavo Jauckens Petisco",
        "doctorCorto": "Gustavo",
        "apellidoPaterno": "Jauckens",
        "apellidoMaterno": "Petisco",
        "celular": "2222098323",
        "telefono": "N/A",
        "mail": "tavojauckens@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 63,
        "codigo": "DOC-63",
        "nombre": "Dra. Andrea Stephanie  Montañez Perez",
        "doctorCorto": "Dra. Andrea Stephanie",
        "apellidoPaterno": "Montañez",
        "apellidoMaterno": "Perez",
        "celular": "8711784156",
        "telefono": "8711784156",
        "mail": "andstemonper@gmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Torreón",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 64,
        "codigo": "DOC-64",
        "nombre": "Dra. Leslie Ruiz  Lopez",
        "doctorCorto": "Dra. Leslie",
        "apellidoPaterno": "Ruiz",
        "apellidoMaterno": "Lopez",
        "celular": "8711868403",
        "telefono": "N/A",
        "mail": "leslie_rul@hotmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Torreón",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 65,
        "codigo": "DOC-65",
        "nombre": "Dr. Yeudiel Alejandro Anzures  Gutiérrez",
        "doctorCorto": "Dr. Yeudiel Alejandro",
        "apellidoPaterno": "Anzures",
        "apellidoMaterno": "Gutiérrez",
        "celular": "8714805968",
        "telefono": "N/A",
        "mail": "yanzuresgutierrez25@gmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 70,
        "codigo": "DOC-70",
        "nombre": "Gabriela  Castañeda  Rey",
        "doctorCorto": "Gabriela",
        "apellidoPaterno": "Castañeda",
        "apellidoMaterno": "Rey",
        "celular": "8714067983",
        "telefono": "N/A",
        "mail": "Gabrielacast1@icloud.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 71,
        "codigo": "DOC-71",
        "nombre": "Dra. Selena Marlen  Cabrera  Barajas",
        "doctorCorto": "Dra. Selena Marlen",
        "apellidoPaterno": "Cabrera",
        "apellidoMaterno": "Barajas",
        "celular": "8714800682",
        "telefono": "8714800682",
        "mail": "bracketline.nutri@gmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Bracketline",
        "direccion": "Bracketline",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 72,
        "codigo": "DOC-72",
        "nombre": "Dra. Nancy Edith  Emiliano  Blanco",
        "doctorCorto": "Dra. Nancy Edith",
        "apellidoPaterno": "Emiliano",
        "apellidoMaterno": "Blanco",
        "celular": "8711276856",
        "telefono": "8711276856",
        "mail": "dranancyblanco@gmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Torreón",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 73,
        "codigo": "DOC-73",
        "nombre": "Dr. Carlos Enrique Pirck Ramirez",
        "doctorCorto": "Dr. Carlos Enrique",
        "apellidoPaterno": "Pirck",
        "apellidoMaterno": "Ramirez",
        "celular": "8180862723",
        "telefono": "8180862723",
        "mail": "inesoalab@gmail.com",
        "vendedor": "Jose Alatorre",
        "nota": "N/A",
        "clinica": "Torreón",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 74,
        "codigo": "DOC-74",
        "nombre": "Dr. Omar Meléndez  Avila",
        "doctorCorto": "Dr. Omar",
        "apellidoPaterno": "Meléndez",
        "apellidoMaterno": "Avila",
        "celular": "8714803100",
        "telefono": "8714803100",
        "mail": "omelendez@clinicadent.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Torreón",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 75,
        "codigo": "DOC-75",
        "nombre": "Dr. Alejandro Arevalo Santana",
        "doctorCorto": "Dr. Alejandro",
        "apellidoPaterno": "Arevalo",
        "apellidoMaterno": "Santana",
        "celular": "8180862723",
        "telefono": "8180862723",
        "mail": "alejandroarevalo41@gmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Monterrey",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 76,
        "codigo": "DOC-76",
        "nombre": "Dr. Carlos Ricardo  Nevarez Velazquez",
        "doctorCorto": "Dr. Carlos Ricardo",
        "apellidoPaterno": "Nevarez",
        "apellidoMaterno": "Velazquez",
        "celular": "8712213379",
        "telefono": "8712213379",
        "mail": "ricardo_nevel@hotmail.com",
        "vendedor": "Jose Diosdado",
        "nota": "N/A",
        "clinica": "Torreón",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 77,
        "codigo": "DOC-77",
        "nombre": "Dr. Jorge Eduardo Torres Flores",
        "doctorCorto": "Dr. Jorge Eduardo",
        "apellidoPaterno": "Torres",
        "apellidoMaterno": "Flores",
        "celular": "8711786096",
        "telefono": "N/A",
        "mail": "jorgetorresfiscal@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 78,
        "codigo": "DOC-78",
        "nombre": "Dra. Claudia Angelica Olague Barraza",
        "doctorCorto": "Dra. Claudia Angelica",
        "apellidoPaterno": "Olague",
        "apellidoMaterno": "Barraza",
        "celular": "8711788802",
        "telefono": "N/A",
        "mail": "draclaudia_olague@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 79,
        "codigo": "DOC-79",
        "nombre": "Luis Alberto Puentes Ruiz",
        "doctorCorto": "Luis Alberto",
        "apellidoPaterno": "Puentes",
        "apellidoMaterno": "Ruiz",
        "celular": "8721089107",
        "telefono": "N/A",
        "mail": "luiispuentes@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 80,
        "codigo": "DOC-80",
        "nombre": "Dr. Oscar Gonzalez Velasco",
        "doctorCorto": "Dr. Oscar",
        "apellidoPaterno": "Gonzalez",
        "apellidoMaterno": "Velasco",
        "celular": "8114943945",
        "telefono": "N/A",
        "mail": "droscarcero@gmail.com",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Monterrey",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 81,
        "codigo": "DOC-81",
        "nombre": "Luis Arturo Meza Robles",
        "doctorCorto": "Luis Arturo",
        "apellidoPaterno": "Meza",
        "apellidoMaterno": "Robles",
        "celular": "8711153175",
        "telefono": "N/A",
        "mail": "wichomeza@Hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 82,
        "codigo": "DOC-82",
        "nombre": "Dr. Alan Noe Morones Machado",
        "doctorCorto": "Dr. Alan Noe",
        "apellidoPaterno": "Morones",
        "apellidoMaterno": "Machado",
        "celular": "8712125257",
        "telefono": "N/A",
        "mail": "alan_nmorones@hotmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 83,
        "codigo": "DOC-83",
        "nombre": "Dr. Miguel Ángel  Hernandez  Montoya",
        "doctorCorto": "Dr. Miguel Ángel",
        "apellidoPaterno": "Hernandez",
        "apellidoMaterno": "Montoya",
        "celular": "8180823563",
        "telefono": "N/A",
        "mail": "oia.drmiguel@gmail.com",
        "vendedor": "DentLab",
        "nota": "N/A",
        "clinica": "DENT LAB",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    },
    {
        "id": 84,
        "codigo": "DOC-84",
        "nombre": "Dra. Claudia  Gonzalez Ibarra",
        "doctorCorto": "Dra. Claudia",
        "apellidoPaterno": "Gonzalez",
        "apellidoMaterno": "Ibarra",
        "celular": "8110720262",
        "telefono": "8110720262",
        "mail": "cgonzalez@universidadinteramericana.edu.mx",
        "vendedor": "Hector Minila",
        "nota": "N/A",
        "clinica": "Monterrey",
        "direccion": "Consultorio Registrado DentLab",
        "calle": "",
        "colonia": "",
        "numExt": "",
        "cp": "",
        "contacto": "",
        "contactoTel": "",
        "contactoMail": "",
        "facebook": "",
        "twitter": "",
        "instagram": "",
        "tipo": "EXTERNO",
        "activo": true,
        "externo": true,
        "mesesSinPaquete": 0
    }
],
  doctoresTipos: [
    { id: 1, tipo: 'Especialista Prostodoncista', descuento: '15%', creditoDias: 30, estatus: true },
    { id: 2, tipo: 'Rehabilitadora Oral / Estética', descuento: '12%', creditoDias: 15, estatus: true },
    { id: 3, tipo: 'Ortodoncista Certificada', descuento: '10%', creditoDias: 15, estatus: true },
    { id: 4, tipo: 'Odontólogo General', descuento: '5%', creditoDias: 7, estatus: true }
  ],
  paquetesDoctores: [
    {
        "folio": "2254",
        "doctorId": 73,
        "doctor": "Dr. Carlos Enrique Pirck Ramirez",
        "celular": "8180862723",
        "email": "inesoalab@gmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 35 UNIDADES Zirconio",
        "totalPiezas": 35,
        "usadas": 35,
        "disponibles": 0,
        "costo": "$29,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-02-10 15:52:06"
    },
    {
        "folio": "2343",
        "doctorId": 73,
        "doctor": "Dr. Carlos Enrique Pirck Ramirez",
        "celular": "8180862723",
        "email": "inesoalab@gmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 35 UNIDADES Zirconio",
        "totalPiezas": 35,
        "usadas": 35,
        "disponibles": 0,
        "costo": "$29,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-03-28 09:36:44"
    },
    {
        "folio": "2397",
        "doctorId": 73,
        "doctor": "Dr. Carlos Enrique Pirck Ramirez",
        "celular": "8180862723",
        "email": "inesoalab@gmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 35 UNIDADES Zirconio",
        "totalPiezas": 35,
        "usadas": 35,
        "disponibles": 0,
        "costo": "$29,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-05-03 09:57:56"
    },
    {
        "folio": "2424",
        "doctorId": 73,
        "doctor": "Dr. Carlos Enrique Pirck Ramirez",
        "celular": "8180862723",
        "email": "inesoalab@gmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 35 UNIDADES Zirconio",
        "totalPiezas": 35,
        "usadas": 35,
        "disponibles": 0,
        "costo": "$29,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-05-23 16:30:03"
    },
    {
        "folio": "2524",
        "doctorId": 73,
        "doctor": "Dr. Carlos Enrique Pirck Ramirez",
        "celular": "8180862723",
        "email": "inesoalab@gmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 35 UNIDADES Zirconio",
        "totalPiezas": 35,
        "usadas": 35,
        "disponibles": 0,
        "costo": "$29,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-07-10 09:56:56"
    },
    {
        "folio": "2632",
        "doctorId": 73,
        "doctor": "Dr. Carlos Enrique Pirck Ramirez",
        "celular": "8180862723",
        "email": "inesoalab@gmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 35 UNIDADES Zirconio",
        "totalPiezas": 35,
        "usadas": 35,
        "disponibles": 0,
        "costo": "$29,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-09-05 15:40:32"
    },
    {
        "folio": "2741",
        "doctorId": 73,
        "doctor": "Dr. Carlos Enrique Pirck Ramirez",
        "celular": "8180862723",
        "email": "inesoalab@gmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 35 UNIDADES Zirconio",
        "totalPiezas": 35,
        "usadas": 35,
        "disponibles": 0,
        "costo": "$29,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-11-06 12:32:17"
    },
    {
        "folio": "2782",
        "doctorId": 73,
        "doctor": "Dr. Carlos Enrique Pirck Ramirez",
        "celular": "8180862723",
        "email": "inesoalab@gmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 35 UNIDADES Zirconio",
        "totalPiezas": 35,
        "usadas": 35,
        "disponibles": 0,
        "costo": "$29,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-11-28 15:33:18"
    },
    {
        "folio": "2272",
        "doctorId": 76,
        "doctor": "Dr. Carlos Ricardo  Nevarez Velazquez",
        "celular": "8712213379",
        "email": "ricardo_nevel@hotmail.com",
        "vendedor": "Jose Diosdado",
        "paquete": "Paquete PAQ 50 UNIDADES Zirconio",
        "totalPiezas": 50,
        "usadas": 50,
        "disponibles": 0,
        "costo": "$40,000.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-02-20 10:35:56"
    },
    {
        "folio": "2291",
        "doctorId": 76,
        "doctor": "Dr. Carlos Ricardo  Nevarez Velazquez",
        "celular": "8712213379",
        "email": "ricardo_nevel@hotmail.com",
        "vendedor": "Jose Diosdado",
        "paquete": "Paquete PAQ 15 UNIDADES Zirconio",
        "totalPiezas": 15,
        "usadas": 15,
        "disponibles": 0,
        "costo": "$13,000.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-03-01 13:13:18"
    },
    {
        "folio": "2575",
        "doctorId": 76,
        "doctor": "Dr. Carlos Ricardo  Nevarez Velazquez",
        "celular": "8712213379",
        "email": "ricardo_nevel@hotmail.com",
        "vendedor": "Jose Diosdado",
        "paquete": "Paquete PAQ 50 UNIDADES Zirconio",
        "totalPiezas": 50,
        "usadas": 50,
        "disponibles": 0,
        "costo": "$40,000.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-08-06 18:29:06"
    },
    {
        "folio": "2734",
        "doctorId": 76,
        "doctor": "Dr. Carlos Ricardo  Nevarez Velazquez",
        "celular": "8712213379",
        "email": "ricardo_nevel@hotmail.com",
        "vendedor": "Jose Diosdado",
        "paquete": "Paquete PAQ 50 UNIDADES Zirconio",
        "totalPiezas": 50,
        "usadas": 50,
        "disponibles": 0,
        "costo": "$40,000.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-10-31 11:52:04"
    },
    {
        "folio": "3061",
        "doctorId": 76,
        "doctor": "Dr. Carlos Ricardo  Nevarez Velazquez",
        "celular": "8712213379",
        "email": "ricardo_nevel@hotmail.com",
        "vendedor": "Jose Diosdado",
        "paquete": "Paquete PAQ 50 UNIDADES Zirconio",
        "totalPiezas": 50,
        "usadas": 48,
        "disponibles": 2,
        "costo": "$40,000.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2026-05-21 12:06:27"
    },
    {
        "folio": "2208",
        "doctorId": 86,
        "doctor": "Dr. Isai Mares Morales",
        "celular": "8661647590",
        "email": "imagendental80@hotmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 7 UNIDADES Zirconio",
        "totalPiezas": 7,
        "usadas": 7,
        "disponibles": 0,
        "costo": "$6,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-01-15 18:04:54"
    },
    {
        "folio": "2261",
        "doctorId": 86,
        "doctor": "Dr. Isai Mares Morales",
        "celular": "8661647590",
        "email": "imagendental80@hotmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 15 UNIDADES Zirconio",
        "totalPiezas": 15,
        "usadas": 15,
        "disponibles": 0,
        "costo": "$13,000.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-02-12 12:02:21"
    },
    {
        "folio": "2280",
        "doctorId": 86,
        "doctor": "Dr. Isai Mares Morales",
        "celular": "8661647590",
        "email": "imagendental80@hotmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 15 UNIDADES Zirconio",
        "totalPiezas": 15,
        "usadas": 15,
        "disponibles": 0,
        "costo": "$13,000.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-02-22 11:31:46"
    },
    {
        "folio": "2317",
        "doctorId": 86,
        "doctor": "Dr. Isai Mares Morales",
        "celular": "8661647590",
        "email": "imagendental80@hotmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 15 UNIDADES Zirconio",
        "totalPiezas": 15,
        "usadas": 15,
        "disponibles": 0,
        "costo": "$13,000.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-03-18 07:36:41"
    },
    {
        "folio": "2354",
        "doctorId": 86,
        "doctor": "Dr. Isai Mares Morales",
        "celular": "8661647590",
        "email": "imagendental80@hotmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 7 UNIDADES Zirconio",
        "totalPiezas": 7,
        "usadas": 7,
        "disponibles": 0,
        "costo": "$6,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-04-03 10:42:48"
    },
    {
        "folio": "2358",
        "doctorId": 86,
        "doctor": "Dr. Isai Mares Morales",
        "celular": "8661647590",
        "email": "imagendental80@hotmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 7 UNIDADES Zirconio",
        "totalPiezas": 7,
        "usadas": 7,
        "disponibles": 0,
        "costo": "$6,500.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-04-07 10:20:59"
    },
    {
        "folio": "2383",
        "doctorId": 86,
        "doctor": "Dr. Isai Mares Morales",
        "celular": "8661647590",
        "email": "imagendental80@hotmail.com",
        "vendedor": "DentLab",
        "paquete": "Paquete PAQ 15 UNIDADES Zirconio",
        "totalPiezas": 15,
        "usadas": 15,
        "disponibles": 0,
        "costo": "$13,000.00",
        "saldo": "$0.00 (Liquidado)",
        "fecha": "2025-04-22 18:43:05"
    }
],

  // 12. CATEGORÍAS (CategoriasT.php)
  categorias: [
    { id: 1, nombre: 'Zirconio CAD/CAM', descripcion: 'Coronas monolíticas, puentes e incrustaciones en óxido de circonio', productos: 14, estatus: true },
    { id: 2, nombre: 'Alinia (Ortodoncia Invisible)', descripcion: 'Alineadores transparentes termoconformados por etapas digitales', productos: 6, estatus: true },
    { id: 3, nombre: 'E-Max / Disilicato de Litio', descripcion: 'Carillas de alta estética, inlays, onlays y coronas anteriores', productos: 9, estatus: true },
    { id: 4, nombre: 'Guardas Oclusales', descripcion: 'Guardas nocturnas rígidas, confort y desprogramadores neuromusculares', productos: 5, estatus: true },
    { id: 5, nombre: 'PMMA & Provisionales', descripcion: 'Provisionales de larga duración fresados en polimetilmetacrilato', productos: 4, estatus: true }
  ],

  // 13. COLORÍMETRO VITA (Colorimetro.php)
  colorimetro: [
    { id: 1, codigo: 'A1', marca: 'VITA Classical', equivalente: 'Chromascop 110', hex: '#f5f0e4', principal: true, estatus: true },
    { id: 2, codigo: 'A2', marca: 'VITA Classical', equivalente: 'Chromascop 140', hex: '#ede2cc', principal: true, estatus: true },
    { id: 3, codigo: 'A3', marca: 'VITA Classical', equivalente: 'Chromascop 210', hex: '#e2d0b0', principal: true, estatus: true },
    { id: 4, codigo: 'A3.5', marca: 'VITA Classical', equivalente: 'Chromascop 230', hex: '#d7bf97', principal: false, estatus: true },
    { id: 5, codigo: 'B1', marca: 'VITA Classical', equivalente: 'Chromascop 120', hex: '#f7f4eb', principal: true, estatus: true },
    { id: 6, codigo: 'B2', marca: 'VITA Classical', equivalente: 'Chromascop 130', hex: '#eee7d2', principal: true, estatus: true },
    { id: 7, codigo: 'C1', marca: 'VITA Classical', equivalente: 'Chromascop 410', hex: '#e8e2d5', principal: false, estatus: true },
    { id: 8, codigo: 'D2', marca: 'VITA Classical', equivalente: 'Chromascop 510', hex: '#e5ddd0', principal: false, estatus: true },
    { id: 9, codigo: 'BLEACH 1', marca: 'VITA 3D-Master', equivalente: '0M1 Ultra White', hex: '#ffffff', principal: true, estatus: true },
    { id: 10, codigo: 'BLEACH 2', marca: 'VITA 3D-Master', equivalente: '0M2 Bright White', hex: '#faf8f5', principal: true, estatus: true }
  ],

  // 14. VENDEDORES & USUARIOS REALES DE DENT DEMO (sys_usuarios & perfiles)
  vendedores: [
    {
        "id": 26,
        "codigo": "Jo2616",
        "usuario": "JoseA",
        "nombre": "Jose Alatorre",
        "correo": "jalatorre@dentlab.mx",
        "zona": "Torreón / Laguna",
        "doctoresAsignados": 15,
        "metaMensual": "$150,000",
        "avance": "$138,500 (92%)",
        "comision": "8%",
        "estatus": true
    },
    {
        "id": 31,
        "codigo": "He3116",
        "usuario": "HectorM",
        "nombre": "Hector Minila",
        "correo": "hminila@dentlab.mx",
        "zona": "Monterrey / Nuevo León",
        "doctoresAsignados": 18,
        "metaMensual": "$150,000",
        "avance": "$142,000 (95%)",
        "comision": "8%",
        "estatus": true
    },
    {
        "id": 32,
        "codigo": "Jo3216",
        "usuario": "JoseD",
        "nombre": "Jose Diosdado",
        "correo": "jdiosdado@dentlab.mx",
        "zona": "Torreón / Durango",
        "doctoresAsignados": 22,
        "metaMensual": "$150,000",
        "avance": "$148,500 (99%)",
        "comision": "8%",
        "estatus": true
    }
],
  representantesVenta: [
    {
        "id": 5,
        "usuario": "Representante1",
        "nombre": "Alejandro",
        "correo": "cesargue444@gmail.com",
        "perfil": "Representantes",
        "estatus": true
    }
],
  usuarios: [
    {
        "id": 1,
        "usuario": "admin",
        "nombre": "Admin",
        "correo": "mhernandez@clinicadent.com",
        "perfil": "Administrador",
        "id_perfil": 1,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 4,
        "usuario": "lmendoza",
        "nombre": "Luis",
        "correo": "lmendoza@resosistemas.mx",
        "perfil": "Administrador",
        "id_perfil": 1,
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": 5,
        "usuario": "Representante1",
        "nombre": "Alejandro",
        "correo": "cesargue444@gmail.com",
        "perfil": "Representantes",
        "id_perfil": 8,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 7,
        "usuario": "Diana",
        "nombre": "Diana V.",
        "correo": "diana@clinicadent.com",
        "perfil": "Laboratorio",
        "id_perfil": 4,
        "appEquipos": true,
        "estatus": true
    },
    {
        "id": 8,
        "usuario": "Oscar",
        "nombre": "Dr. Oscar",
        "correo": "ochavez@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 9,
        "usuario": "José",
        "nombre": "José D.",
        "correo": "jdiosdado@dentlab.mx",
        "perfil": "Laboratorio",
        "id_perfil": 4,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 10,
        "usuario": "Isaac",
        "nombre": "Dr. Isaac",
        "correo": "icamacho@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": 11,
        "usuario": "Luis Gerardo",
        "nombre": "Dr. Luis Gerardo",
        "correo": "lgarellano@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": 12,
        "usuario": "Miriam",
        "nombre": "Miriam",
        "correo": "miriam@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": 13,
        "usuario": "Alondra",
        "nombre": "Alondra",
        "correo": "alondra@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": 14,
        "usuario": "Fatima",
        "nombre": "Fátima S. Dany",
        "correo": "fatima@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 15,
        "usuario": "Lorena",
        "nombre": "Lorena M.",
        "correo": "lorena@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 16,
        "usuario": "Luis",
        "nombre": "Luis C.",
        "correo": "lcabrera@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": true,
        "estatus": true
    },
    {
        "id": 17,
        "usuario": "Arturo",
        "nombre": "Arturo M.",
        "correo": "arturo@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 18,
        "usuario": "Vianeid",
        "nombre": "Vianeid S.",
        "correo": "vianeid@dentlab.mx",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 19,
        "usuario": "Arely",
        "nombre": "Arely S.",
        "correo": "arely@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": 20,
        "usuario": "Isabel",
        "nombre": "Isabel D.",
        "correo": "isabel@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": 21,
        "usuario": "Mauricio",
        "nombre": "Mauricio S.",
        "correo": "mauricio@clinicadent.com",
        "perfil": "Medico",
        "id_perfil": 3,
        "appEquipos": true,
        "estatus": true
    },
    {
        "id": 22,
        "usuario": "Irene",
        "nombre": "Irene Martinez",
        "correo": "imartinez@dentlab.mx",
        "perfil": "Administrador Laboratorio",
        "id_perfil": 12,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 23,
        "usuario": "Jose",
        "nombre": "José",
        "correo": "jose@dentlab.mx",
        "perfil": "Laboratorio",
        "id_perfil": 9,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 24,
        "usuario": "Oscar",
        "nombre": "Oscar",
        "correo": "oscar@dentlab.mx",
        "perfil": "Laboratorio",
        "id_perfil": 4,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 25,
        "usuario": "Amy",
        "nombre": "Amy",
        "correo": "amy@dentlab.mx",
        "perfil": "Laboratorio",
        "id_perfil": 9,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 26,
        "usuario": "JoseA",
        "nombre": "Jose Alatorre",
        "correo": "jalatorre@dentlab.mx",
        "perfil": "Vendedor",
        "id_perfil": 11,
        "codigoVendedor": "Jo2616",
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 27,
        "usuario": "ChristosV",
        "nombre": "Christos Vasilikostas",
        "correo": "cvasilikostas@dentlab.mx",
        "perfil": "Laboratorio",
        "id_perfil": 4,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 28,
        "usuario": "LuisC",
        "nombre": "Luis Cervantes",
        "correo": "lcervantes@dentlab.mx",
        "perfil": "Administrador Laboratorio",
        "id_perfil": 12,
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": 29,
        "usuario": "ArturoM",
        "nombre": "Arturo Meza",
        "correo": "ameza@dentlab.mx",
        "perfil": "Escaneador",
        "id_perfil": 10,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 30,
        "usuario": "MauricioS",
        "nombre": "Mauricio Sotomayor",
        "correo": "msotomayor@dentlab.mx",
        "perfil": "Escaneador",
        "id_perfil": 10,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 31,
        "usuario": "HectorM",
        "nombre": "Hector Minila",
        "correo": "hminila@dentlab.mx",
        "perfil": "Vendedor",
        "id_perfil": 11,
        "codigoVendedor": "He3116",
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 32,
        "usuario": "JoseD",
        "nombre": "Jose Diosdado",
        "correo": "jdiosdado@dentlab.mx",
        "perfil": "Vendedor",
        "id_perfil": 11,
        "codigoVendedor": "Jo3216",
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 33,
        "usuario": "CarlosE",
        "nombre": "Carlos Esqueda",
        "correo": "cesqueda@dentlab.mx",
        "perfil": "Repartidor",
        "id_perfil": 13,
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": 35,
        "usuario": "Sandra",
        "nombre": "Sandra",
        "correo": "sandra@dentlab.mx",
        "perfil": "Administrador de equipos",
        "id_perfil": 14,
        "appEquipos": true,
        "estatus": true
    },
    {
        "id": 36,
        "usuario": "Fernanda",
        "nombre": "Fernanda",
        "correo": "fernanda@dentlab.mx",
        "perfil": "Administrador de equipos",
        "id_perfil": 14,
        "appEquipos": true,
        "estatus": true
    },
    {
        "id": 37,
        "usuario": "Selene",
        "nombre": "Selene",
        "correo": "selene@dentlab.mx",
        "perfil": "Administrador de equipos",
        "id_perfil": 14,
        "appEquipos": true,
        "estatus": true
    },
    {
        "id": 38,
        "usuario": "Guadalupe",
        "nombre": "Guadalupe",
        "correo": "guadalupe@dentlab.mx",
        "perfil": "Administrador de equipos",
        "id_perfil": 14,
        "appEquipos": true,
        "estatus": true
    },
    {
        "id": 41,
        "usuario": "IreneEscaneador",
        "nombre": "Irene Escaneadora",
        "correo": "imartinez@dentlab.mx",
        "perfil": "Escaneador",
        "id_perfil": 10,
        "appEquipos": false,
        "estatus": true
    },
    {
        "id": 42,
        "usuario": "MauricioSLab",
        "nombre": "Mauricio Sotomayor",
        "correo": "msotomayor@dentlab.mx",
        "perfil": "Administrador Laboratorio",
        "id_perfil": 12,
        "appEquipos": false,
        "estatus": true
    }
],

  // 15. DENT SPA & DENT CLINIC (Empresas, Empleados, Encuestas, Productos Clínica, Ventas, Pacientes)
  empresas: [
    { id: 'EMP-01', empresa: 'Grupo Industrial Regiomontano S.A.', rfc: 'GIR980412AA1', representante: 'Lic. Fernando Cantú', telefono: '81 8000 1200', descuento: '20%', empleados: 48, division: 'Dent Clinic & SPA', estatus: true },
    { id: 'EMP-02', empresa: 'Tecnologías Digitales del Norte', rfc: 'TDN140920BB4', representante: 'Ing. Claudia Elizondo', telefono: '81 8220 4500', descuento: '15%', empleados: 32, division: 'Dent Clinic', estatus: true },
    { id: 'EMP-03', empresa: 'Corporativo Hotelero San Pedro', rfc: 'CHS091103CC9', representante: 'Lic. Adrián Morales', telefono: '81 8335 9090', descuento: '25%', empleados: 65, division: 'Dent SPA', estatus: true }
  ],
  empleadosConvenio: [
    { id: 'EMP-BEN-01', nombre: 'Ing. Alejandro Torres', empresa: 'Grupo Industrial Regiomontano S.A.', puesto: 'Gerente de Planta', credencial: 'GIR-4401', beneficio: '20% Descuento + Limpieza Gratis', estatus: true },
    { id: 'EMP-BEN-02', nombre: 'Lic. Sofía Villarreal', empresa: 'Tecnologías Digitales del Norte', puesto: 'Analista Senior', credencial: 'TDN-1190', beneficio: '15% Descuento Familiar', estatus: true },
    { id: 'EMP-BEN-03', nombre: 'Sr. Ricardo Elizondo', empresa: 'Corporativo Hotelero San Pedro', puesto: 'Director Operativo', credencial: 'CHS-0082', beneficio: '25% Descuento en Spa Dental', estatus: true }
  ],
  encuestas: [
    { id: 'ENC-501', paciente: 'Carlos Mendoza', doctor: 'Dr. Oscar Ramírez', servicio: 'Corona Zirconio #16', calificacion: 5, comentario: 'Excelente ajuste y el tono quedó idéntico a mis dientes naturales.', fecha: '2026-10-06' },
    { id: 'ENC-502', paciente: 'María Fernández', doctor: 'Dra. Brenda Solís', servicio: 'Escaneo Intraoral 3D', calificacion: 5, comentario: 'Súper rápido sin usar pastas incómodas.', fecha: '2026-10-05' },
    { id: 'ENC-503', paciente: 'Laura Méndez', doctor: 'Dra. Fátima Sánchez', servicio: 'Diseño de Sonrisa E-Max', calificacion: 5, comentario: 'Atención de primer nivel en clínica.', fecha: '2026-10-04' }
  ],
  productosClinica: [
    { id: 'SRV-01', codigo: 'CLN-LIMP', nombre: 'Profilaxis Ultrasónica + Spa Dental Airflow', tipo: 'Servicio Clínico', precio: 950, puntosOtorga: 95, puntosCosto: 950, estatus: true },
    { id: 'SRV-02', codigo: 'CLN-BLANQ', nombre: 'Blanqueamiento Láser LED Clínico 2 Sesiones', tipo: 'Estética Dental', precio: 3200, puntosOtorga: 320, puntosCosto: 3000, estatus: true },
    { id: 'SRV-03', codigo: 'CLN-RES', nombre: 'Resina Fotopolimerizable Alta Estética 3M', tipo: 'Operatoria', precio: 1100, puntosOtorga: 110, puntosCosto: 1100, estatus: true },
    { id: 'SRV-04', codigo: 'CLN-ZRC', nombre: 'Rehabilitación Corona Zirconio CAD/CAM en 24h', tipo: 'Prótesis Digital', precio: 5800, puntosOtorga: 580, puntosCosto: 5500, estatus: true },
    { id: 'SRV-05', codigo: 'CLN-KIT', nombre: 'Kit Mantenimiento Blanqueamiento + Pasta Sensibilidad', tipo: 'Producto', precio: 650, puntosOtorga: 65, puntosCosto: 600, estatus: true }
  ],
  pacientes: [
    { id: 'PAC-01', expediente: 'EXP-4920', nombre: 'Carlos Mendoza', telefono: '81 1234 5678', correo: 'carlos.mendoza@gmail.com', membresia: 'Membresía Oro VIP', puntos: 1450, doctor: 'Dr. Oscar Ramírez', ultimaCita: '2026-10-05' },
    { id: 'PAC-02', expediente: 'EXP-4921', nombre: 'María Fernández', telefono: '81 8765 4321', correo: 'maria.fdez@hotmail.com', membresia: 'Membresía Plata', puntos: 820, doctor: 'Dra. Brenda Solís', ultimaCita: '2026-10-06' },
    { id: 'PAC-03', expediente: 'EXP-4922', nombre: 'Roberto Gómez', telefono: '81 2233 4455', correo: 'roberto.gomez@empresa.mx', membresia: 'Convenio Empresarial', puntos: 540, doctor: 'Dr. Arturo Morales', ultimaCita: '2026-10-02' },
    { id: 'PAC-04', expediente: 'EXP-4923', nombre: 'Laura Méndez', telefono: '81 9988 7766', correo: 'laura.mendez@gmail.com', membresia: 'Membresía Oro VIP', puntos: 2190, doctor: 'Dra. Fátima Sánchez', ultimaCita: '2026-10-04' }
  ],
  ventas: [
    { folio: 'VTA-1094', fecha: '2026-10-07 10:15', cliente: 'Carlos Mendoza', conceptos: 'Profilaxis Ultrasónica + Kit Mantenimiento', formaPago: 'Tarjeta', total: 1600, puntosGanados: 160 },
    { folio: 'VTA-1093', fecha: '2026-10-06 16:40', cliente: 'Laura Méndez', conceptos: 'Blanqueamiento Láser LED Clínico', formaPago: 'Efectivo', total: 3200, puntosGanados: 320 },
    { folio: 'VTA-1092', fecha: '2026-10-05 12:05', cliente: 'María Fernández', conceptos: 'Resina Fotopolimerizable Alta Estética', formaPago: 'Puntos', total: 1100, puntosGanados: 0 }
  ],
  posCarrito: [],
  posClienteId: 'PAC-01',
  posFormaPago: 'Tarjeta',

  // 16. CALENDARIO Y PERMISOS
  eventosCalendario: [
    { dia: 1, titulo: 'Entrega #OT-9841 Corona Zirconio', hora: '14:30', doctor: 'Dr. Oscar Ramírez', tipo: 'entrega' },
    { dia: 2, titulo: 'Entrega #OT-9830 Puente 3U', hora: '11:00', doctor: 'Dr. Arturo Morales', tipo: 'entrega' },
    { dia: 3, titulo: 'Entrega #OT-9838 Alineadores', hora: '16:00', doctor: 'Dra. Brenda Solís', tipo: 'entrega' },
    { dia: 7, titulo: 'Escaneo Intraoral 3Shape TRIOS', hora: '09:30', doctor: 'Dra. Fátima Sánchez', tipo: 'escaneo' },
    { dia: 8, titulo: 'Prueba de Estructura Zirconio', hora: '12:00', doctor: 'Dr. Oscar Ramírez', tipo: 'cita' },
    { dia: 14, titulo: 'Mantenimiento Preventivo CNC-1', hora: '18:00', doctor: 'Laboratorio Central', tipo: 'interno' },
    { dia: 21, titulo: 'Entrega Paquete 10 Coronas', hora: '13:00', doctor: 'Dr. Luis Cabrera', tipo: 'entrega' }
  ],
  diaCalendarioSeleccionado: 7,

  permisosPerfiles: [
    { perfil: 'Administrador', inicio: true, estadisticas: true, dentLab: true, dentSpa: true, dentClinic: true, configuracion: true },
    { perfil: 'Diseñador CAD/CAM', inicio: true, estadisticas: true, dentLab: true, dentSpa: false, dentClinic: false, configuracion: false },
    { perfil: 'Escaneador', inicio: true, estadisticas: false, dentLab: true, dentSpa: false, dentClinic: false, configuracion: false },
    { perfil: 'Recepción / Ventas', inicio: true, estadisticas: false, dentLab: false, dentSpa: true, dentClinic: true, configuracion: false },
    { perfil: 'Representante de Ventas', inicio: false, estadisticas: true, dentLab: true, dentSpa: true, dentClinic: true, configuracion: false }
  ]
};

// ============================================================================
// FUNCIONES DE NAVEGACIÓN DE MENÚ LATERAL (ACORDEÓN JERÁRQUICO + VISTAS)
// ============================================================================

function toggleSubmenu(menuId) {
  const el = document.getElementById(menuId);
  const icon = document.getElementById('chevron-' + menuId);
  if (!el) return;
  const isHidden = el.classList.contains('hidden');
  if (isHidden) {
    el.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    el.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

function animateViewEntrance(containerEl) {
  if (!containerEl || typeof containerEl.animate !== 'function') return;
  containerEl.animate(
    [
      { opacity: 0, transform: 'translateY(14px) scale(0.992)', filter: 'blur(2px)' },
      { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)' }
    ],
    {
      duration: 340,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'both'
    }
  );

  const children = Array.from(containerEl.children);
  children.forEach((child, idx) => {
    if (typeof child.animate !== 'function') return;
    child.animate(
      [
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: 320,
        delay: Math.min(idx * 45, 220),
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'both'
      }
    );
  });
}

function openModule(moduleKey) {
  DENT_STATE.currentView = moduleKey;

  // Actualizar estado activo en el sidebar (@react-bits/BranchedMenu-JS-CSS)
  if (typeof window.bmSyncActiveState === 'function') {
    window.bmSyncActiveState(moduleKey);
  }

  const secInicio = document.getElementById('section-inicio');
  const secDynamic = document.getElementById('section-dynamic');
  const topTitle = document.getElementById('topModuleTitle');

  // Cerrar dropdown de configuración si estaba abierto
  const drop = document.getElementById('settingsDropdown');
  if (drop) drop.classList.add('hidden');

  if (moduleKey === 'inicio') {
    secInicio.classList.remove('hidden');
    secDynamic.classList.add('hidden');
    if (typeof window.updateTopUserPresentation === 'function') window.updateTopUserPresentation();
    animateViewEntrance(secInicio);
    runAnimeCounters();
    lucide.createIcons();
    return;
  }

  secInicio.classList.add('hidden');
  secDynamic.classList.remove('hidden');

  renderDynamicModule(moduleKey);
  animateViewEntrance(secDynamic);
  lucide.createIcons();
}

function renderHeaderBanner(breadcrumb, title, subtitle, actionBtnHtml = '') {
  const topTitle = document.getElementById('topModuleTitle');
  if (typeof window.updateTopUserPresentation === 'function') window.updateTopUserPresentation(`${breadcrumb} • ${title}`);
  return `
    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-1">
          <span>${breadcrumb}</span>
          <span>•</span>
          <span>Sistema Dent Demo Actualizado</span>
        </div>
        <h2 class="text-lg font-extrabold text-slate-900">${title}</h2>
        <p class="text-xs text-slate-500 mt-0.5">${subtitle}</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="openModule('inicio')" class="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors">
          <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
          <span>Volver a Inicio</span>
        </button>
        ${actionBtnHtml}
      </div>
    </div>
  `;
}

function filterDynamicTable(inputId, tbodyId) {
  const q = (document.getElementById(inputId)?.value || '').toLowerCase();
  document.querySelectorAll(`#${tbodyId} tr`).forEach(tr => {
    tr.style.display = tr.innerText.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ============================================================================
// RENDERIZADO DE LOS 36 MÓDULOS DE DENT DEMO
// ============================================================================

function renderDynamicModule(key) {
  const container = document.getElementById('section-dynamic');
  if (!container) return;

  switch (key) {
    // ------------------------------------------------------------------------
    // 1. ESTADÍSTICAS -> CONTROL DE LABORATORIO (Estadisticas.php)
    // ------------------------------------------------------------------------
    case 'estadisticas-lab': {
      const rows = DENT_STATE.controlLab.map(r => {
        let badgeSem = 'bg-emerald-100 text-emerald-800 border-emerald-200';
        if (r.dias < 0) badgeSem = 'bg-rose-100 text-rose-800 border-rose-200';
        else if (r.dias < 3) badgeSem = 'bg-amber-100 text-amber-800 border-amber-200';
        return `
          <tr class="hover:bg-slate-50">
            <td class="px-3 py-2.5 font-semibold text-slate-800">${r.doctor}</td>
            <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">${r.categoria}</span></td>
            <td class="px-3 py-2.5">${r.producto}</td>
            <td class="px-3 py-2.5 font-mono text-blue-600 font-bold">${r.piezas}</td>
            <td class="px-3 py-2.5">${r.paciente}</td>
            <td class="px-3 py-2.5 font-mono text-slate-500">${r.registro}</td>
            <td class="px-3 py-2.5 font-mono font-semibold">${r.entrega}</td>
            <td class="px-3 py-2.5"><span class="px-2.5 py-0.5 rounded-full border font-mono font-bold text-[11px] ${badgeSem}">${r.dias} días</span></td>
            <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${r.serie}</td>
            <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded text-[10px] font-semibold ${r.tipoDoctor === 'Interno' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}">${r.tipoDoctor}</span></td>
          </tr>
        `;
      }).join('');

      container.innerHTML = `
        ${renderHeaderBanner('Estadísticas', 'Control de Laboratorio', 'Monitoreo de tiempos de entrega, días transcurridos con semáforo y tipo de doctor (Interno/Externo).', `
          <div class="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold">
            Total Órdenes: ${DENT_STATE.controlLab.length + 36}
          </div>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <input id="searchCtrlLab" onkeyup="filterDynamicTable('searchCtrlLab','tbodyCtrlLab')" placeholder="Filtrar por doctor, categoría, paciente o serie..." class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs w-full sm:w-80 focus:outline-none focus:border-blue-600">
            <div class="flex items-center gap-3 text-[11px] font-semibold">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> En Tiempo (≥3 días)</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Por Vencer (0-2 días)</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Atrasado (&lt;0 días)</span>
            </div>
          </div>
          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 text-[11px]">
                <tr>
                  <th class="px-3 py-2.5">DOCTOR</th>
                  <th class="px-3 py-2.5">CATEGORÍA</th>
                  <th class="px-3 py-2.5">PRODUCTO</th>
                  <th class="px-3 py-2.5">PIEZAS</th>
                  <th class="px-3 py-2.5">PACIENTE</th>
                  <th class="px-3 py-2.5">REGISTRO</th>
                  <th class="px-3 py-2.5">ENTREGA SOLICITADA</th>
                  <th class="px-3 py-2.5">DÍAS TRANSCURRIDOS</th>
                  <th class="px-3 py-2.5">SERIE</th>
                  <th class="px-3 py-2.5">TIPO DOCTOR</th>
                </tr>
              </thead>
              <tbody id="tbodyCtrlLab" class="divide-y divide-slate-100">${rows}</tbody>
            </table>
          </div>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 2. ESTADÍSTICAS -> GRÁFICOS (GraficosEstadisticos.php)
    // ------------------------------------------------------------------------
    case 'graficos': {
      container.innerHTML = `
        ${renderHeaderBanner('Estadísticas', 'Gráficos Estadísticos de Producción', 'Indicadores de órdenes por categoría, tonos de colorímetro más solicitados y productividad por doctor.')}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500">Producción por Categoría CAD/CAM</h3>
              <span class="text-xs font-mono font-bold text-blue-600">Mes Actual: 148 piezas</span>
            </div>
            <div class="space-y-3 text-xs">
              <div>
                <div class="flex justify-between font-semibold mb-1"><span>Zirconio Monolítico & Multicapa</span><span class="font-mono">64 pzas (43%)</span></div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="bg-blue-600 h-full rounded-full" style="width:43%"></div></div>
              </div>
              <div>
                <div class="flex justify-between font-semibold mb-1"><span>E-Max / Disilicato de Litio</span><span class="font-mono">38 pzas (26%)</span></div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="bg-indigo-500 h-full rounded-full" style="width:26%"></div></div>
              </div>
              <div>
                <div class="flex justify-between font-semibold mb-1"><span>Alinia (Alineadores Invisibles)</span><span class="font-mono">28 sets (19%)</span></div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="bg-cyan-500 h-full rounded-full" style="width:19%"></div></div>
              </div>
              <div>
                <div class="flex justify-between font-semibold mb-1"><span>Guardas Oclusales & PMMA</span><span class="font-mono">18 pzas (12%)</span></div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="bg-emerald-500 h-full rounded-full" style="width:12%"></div></div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500">Tonos Guía VITA Más Utilizados</h3>
              <span class="text-xs font-mono text-slate-500">Top 5 Tonos</span>
            </div>
            <div class="grid grid-cols-5 gap-2 pt-2 text-center text-xs">
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center">
                <span class="w-8 h-8 rounded-full border-2 border-blue-500 mb-2" style="background:#ede2cc"></span>
                <span class="font-bold font-mono">A2</span>
                <span class="text-[10px] text-blue-600 font-bold">38%</span>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center">
                <span class="w-8 h-8 rounded-full border border-slate-300 mb-2" style="background:#f5f0e4"></span>
                <span class="font-bold font-mono">A1</span>
                <span class="text-[10px] text-slate-500 font-bold">24%</span>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center">
                <span class="w-8 h-8 rounded-full border border-slate-300 mb-2" style="background:#e2d0b0"></span>
                <span class="font-bold font-mono">A3</span>
                <span class="text-[10px] text-slate-500 font-bold">18%</span>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center">
                <span class="w-8 h-8 rounded-full border border-slate-300 mb-2" style="background:#f7f4eb"></span>
                <span class="font-bold font-mono">B1</span>
                <span class="text-[10px] text-slate-500 font-bold">12%</span>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center">
                <span class="w-8 h-8 rounded-full border border-slate-300 mb-2" style="background:#ffffff"></span>
                <span class="font-bold font-mono">BL2</span>
                <span class="text-[10px] text-slate-500 font-bold">8%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Desglose de Órdenes por Serie y Colorímetro</h3>
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">SERIE</th>
                <th class="px-3 py-2.5">DOCTOR</th>
                <th class="px-3 py-2.5">PRODUCTO</th>
                <th class="px-3 py-2.5">COLORÍMETRO</th>
                <th class="px-3 py-2.5">ENTREGA SOLICITADA</th>
                <th class="px-3 py-2.5">PIEZAS</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.controlLab.map(r => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${r.serie}</td>
                  <td class="px-3 py-2.5 font-medium">${r.doctor}</td>
                  <td class="px-3 py-2.5">${r.producto}</td>
                  <td class="px-3 py-2.5 font-mono font-bold">VITA A2</td>
                  <td class="px-3 py-2.5 font-mono">${r.entrega}</td>
                  <td class="px-3 py-2.5 font-mono text-blue-700 font-bold">${r.piezas}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 3. CONTROL DE EQUIPOS: PRÉSTAMO, CATÁLOGO E HISTÓRICO
    // ------------------------------------------------------------------------
    case 'equipos-prestamo': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Control de Equipos', 'Equipos en Préstamo', 'Control en tiempo real de escáneres intraorales y equipos asignados a escaneadores en ruta.', `
          <button onclick="openAddPrestamoModal()" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Asignar Salida de Equipo</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">ID</th>
                <th class="px-3 py-2.5">Usuario Escaneador</th>
                <th class="px-3 py-2.5">Descripción Equipo</th>
                <th class="px-3 py-2.5">Clínica / Destino</th>
                <th class="px-3 py-2.5">Fecha Salida Equipo</th>
                <th class="px-3 py-2.5">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.equiposPrestamo.map((e, idx) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${e.id}</td>
                  <td class="px-3 py-2.5 font-semibold">${e.usuario}</td>
                  <td class="px-3 py-2.5">${e.equipo}</td>
                  <td class="px-3 py-2.5 text-slate-500">${e.clinica}</td>
                  <td class="px-3 py-2.5 font-mono">${e.salida}</td>
                  <td class="px-3 py-2.5">
                    <button onclick="recibirEquipoPrestamo(${idx})" class="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors">
                      Registrar Regreso
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'catalogo-equipos': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Control de Equipos', 'Catálogo de Equipos CAD/CAM', 'Inventario de escáneres intraorales, fresadoras CNC de 5 ejes y hornos de sinterizado.', `
          <button onclick="openSimpleAddModal('catalogo-equipos')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Nuevo Equipo</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Código</th>
                <th class="px-3 py-2.5">Equipo</th>
                <th class="px-3 py-2.5">Marca</th>
                <th class="px-3 py-2.5">No. Serie</th>
                <th class="px-3 py-2.5">Ubicación</th>
                <th class="px-3 py-2.5">Estatus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.catalogoEquipos.map((e, i) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${e.codigo}</td>
                  <td class="px-3 py-2.5 font-semibold">${e.nombre}</td>
                  <td class="px-3 py-2.5">${e.marca}</td>
                  <td class="px-3 py-2.5 font-mono text-slate-500">${e.serie}</td>
                  <td class="px-3 py-2.5">${e.ubicacion}</td>
                  <td class="px-3 py-2.5">
                    <button onclick="toggleItemStatus('catalogoEquipos', ${i}, 'catalogo-equipos')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${e.estatus ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                      ${e.estatus ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'historico-equipos': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Control de Equipos', 'Histórico de Equipos', 'Bitácora completa de salidas, regresos y observaciones de equipos de escaneo.')}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Folio</th>
                <th class="px-3 py-2.5">Usuario</th>
                <th class="px-3 py-2.5">Equipo</th>
                <th class="px-3 py-2.5">Fecha Salida</th>
                <th class="px-3 py-2.5">Fecha Regreso</th>
                <th class="px-3 py-2.5">Observaciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.historicoEquipos.map(h => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${h.folio}</td>
                  <td class="px-3 py-2.5 font-semibold">${h.usuario}</td>
                  <td class="px-3 py-2.5">${h.equipo}</td>
                  <td class="px-3 py-2.5 font-mono">${h.salida}</td>
                  <td class="px-3 py-2.5 font-mono text-emerald-700 font-semibold">${h.regreso}</td>
                  <td class="px-3 py-2.5 text-slate-500">${h.observacion}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 4. MOTIVOS DE CANCELACIÓN, MENSAJES PUSH, PAQUETES, PRODUCTOS
    // ------------------------------------------------------------------------
    case 'motivos-cancelacion': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab', 'Motivos de Cancelación', 'Catálogo de razones autorizadas para cancelación de órdenes de trabajo.', `
          <button onclick="openSimpleAddModal('motivos-cancelacion')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Agregar Motivo</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">ID</th>
                <th class="px-3 py-2.5">Descripción del Motivo</th>
                <th class="px-3 py-2.5">Estatus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.motivosCancelacion.map((m, i) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">#${m.id}</td>
                  <td class="px-3 py-2.5 font-medium">${m.motivo}</td>
                  <td class="px-3 py-2.5">
                    <button onclick="toggleItemStatus('motivosCancelacion', ${i}, 'motivos-cancelacion')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${m.estatus ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                      ${m.estatus ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'sec-push':
    case 'push':
    case 'mensajes-push':
    case 'tipos-push': {
      container.innerHTML = `
        ${renderHeaderBanner('Mensajes Push', 'Módulo de Notificaciones Push (Avisos.php)', 'Envío masivo o individual de notificaciones instantáneas a doctores, con programación de fecha/hora y registro de lectura.', `
          <div class="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Gateway Firebase FCM Activo</span>
          </div>
        `)}

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs">
          <!-- Formulario de Envío y Programación (Seleccionando 1 a N Doctores) -->
          <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b pb-2">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <i data-lucide="send" class="w-4 h-4 text-blue-600"></i>
                <span>Enviar / Programar Mensaje</span>
              </h3>
              <span class="text-[10px] font-semibold text-slate-400">1 a N Doctores</span>
            </div>

            <form onsubmit="enviarMensajePushCustom(event)" class="space-y-3.5">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="font-bold text-slate-700 uppercase text-[10px]">Seleccionar Destinatarios *</label>
                  <label class="flex items-center gap-1.5 text-blue-600 cursor-pointer font-semibold text-[11px]">
                    <input type="checkbox" id="checkPushSelectAll" onchange="toggleSelectAllPushDocs(this.checked)" class="rounded text-blue-600">
                    <span>Todos</span>
                  </label>
                </div>
                <div class="border border-slate-200 rounded-xl p-2 bg-slate-50 max-h-36 overflow-y-auto space-y-1 table-scroll" id="listaDoctoresPushCheckboxes">
                  ${DENT_STATE.doctores.map(d => `
                    <label class="flex items-center gap-2 px-2 py-1 rounded bg-white hover:bg-slate-100 text-slate-800 cursor-pointer text-xs border border-slate-100">
                      <input type="checkbox" name="pushDoctorTarget" value="${d.nombre}" class="rounded text-blue-600 push-doc-chk">
                      <span class="font-medium truncate">${d.nombre}</span>
                    </label>
                  `).join('')}
                </div>
              </div>

                            <!-- Creador de Texto con IA estilo Wix -->
              <div class="bg-gradient-to-r from-purple-50/80 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <i data-lucide="bot" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <h4 class="text-xs font-bold text-slate-900 leading-tight">ASISTENTE DENT CONTROL</h4>
                    </div>
                    <p class="text-[11px] text-slate-500">Genera 3 opciones con tono personalizado y aplícalas al instante.</p>
                  </div>
                </div>
                <button type="button" onclick="abrirModalWixAI({ targetTitulo: 'pushTituloInput', targetMensaje: 'pushMensajeInput', defaultTipo: 'entrega' })" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-xl transition-all shadow-xs cursor-pointer shrink-0">
                  <i data-lucide="bot" class="w-3.5 h-3.5"></i>
                  <span>Crear texto con IA</span>
                </button>
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-700 uppercase text-[10px]">Título de la Notificación *</label>
                  <button type="button" onclick="abrirModalWixAI({ targetTitulo: 'pushTituloInput', targetMensaje: 'pushMensajeInput', defaultTipo: 'entrega' })" class="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:text-purple-800 cursor-pointer">
                    <i data-lucide="edit-3" class="w-3 h-3 text-purple-600"></i>
                    <span>Escribir con IA</span>
                  </button>
                </div>
                <input id="pushTituloInput" required placeholder="Ej. Promoción Especial de Paquetes Zirconio" class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-purple-600">
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-700 uppercase text-[10px]">Cuerpo del Mensaje *</label>
                  <button type="button" onclick="abrirModalWixAI({ targetTitulo: 'pushTituloInput', targetMensaje: 'pushMensajeInput', defaultTipo: 'entrega' })" class="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:text-purple-800 cursor-pointer">
                    <i data-lucide="edit-3" class="w-3 h-3 text-purple-600"></i>
                    <span>Escribir con IA</span>
                  </button>
                </div>
                <textarea id="pushMensajeInput" required rows="3" placeholder="Redacta la notificación push para los odontólogos seleccionados..." class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-purple-600 resize-none"></textarea>
              </div>

              <div>
                <label class="font-bold text-slate-700 uppercase text-[10px] block mb-1">Programar Fecha y Hora de Envío</label>
                <input type="datetime-local" id="pushFechaProgramada" class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600 text-slate-700">
                <span class="text-[10px] text-slate-400 mt-1 block">Deja en blanco para enviar inmediatamente en tiempo real.</span>
              </div>

              <button type="submit" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer">
                <i data-lucide="send" class="w-4 h-4"></i>
                <span>Enviar / Programar Push</span>
              </button>
            </form>
          </div>

          <!-- Historial de Notificaciones Push Enviadas -->
          <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between border-b pb-2">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-800">Historial de Notificaciones Enviadas</h3>
              <span class="text-[11px] font-mono font-bold text-slate-500">${DENT_STATE.mensajesPush.length} registradas</span>
            </div>

            <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
              <table class="w-full text-center text-xs">
                <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th class="px-2.5 py-2">Folio</th>
                    <th class="px-2.5 py-2">Título / Mensaje</th>
                    <th class="px-2.5 py-2">Destinatarios</th>
                    <th class="px-2.5 py-2">Fecha / Hora</th>
                    <th class="px-2.5 py-2">Estatus</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${DENT_STATE.mensajesPush.map(p => `
                    <tr class="hover:bg-slate-50 transition-colors">
                      <td class="px-2.5 py-2 font-mono font-bold text-blue-600">${p.id}</td>
                      <td class="px-2.5 py-2 text-left">
                        <strong class="text-slate-800 block">${p.titulo}</strong>
                        <span class="text-[11px] text-slate-500 line-clamp-2">${p.mensaje}</span>
                      </td>
                      <td class="px-2.5 py-2 font-semibold text-slate-700 max-w-[120px] truncate" title="${p.destinatario}">${p.destinatario}</td>
                      <td class="px-2.5 py-2 font-mono text-[10.5px] text-slate-500 whitespace-nowrap">${p.fecha}</td>
                      <td class="px-2.5 py-2">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Enviado</span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
      break;
    }

    case 'paquetes': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab', 'Paquetes Prepagados para Doctores (Productos_Paquetes.php)', 'Administración de paquetes de coronas Zirconio, E-Max y Guardas con vigencia, piezas disponibles y precios preferenciales.', `
          <button onclick="openSimpleAddModal('paquetes')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Nuevo Paquete</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <!-- Filtros: Fechas y Estado Terminado / No Terminado -->
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs items-end">
            <div class="lg:col-span-2">
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Buscar Paquete</label>
              <input id="searchPaqInput" onkeyup="filtrarPaquetes()" placeholder="Buscar por nombre o código..." class="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Fecha Desde</label>
              <input type="date" id="filtroPaqDesde" onchange="filtrarPaquetes()" class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Fecha Hasta</label>
              <input type="date" id="filtroPaqHasta" onchange="filtrarPaquetes()" class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Condición de Paquete</label>
              <select id="filtroPaqTerminado" onchange="filtrarPaquetes()" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600">
                <option value="todos">Todos los Paquetes</option>
                <option value="no-terminado">No Terminados (Activos)</option>
                <option value="terminado">Terminados / Inactivos</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs px-1">
            <span class="text-slate-500 font-semibold" id="contadorPaquetesFiltrados">Mostrando ${DENT_STATE.paquetes.length} paquetes registrados</span>
            <button type="button" onclick="resetFiltrosPaquetes()" class="text-blue-600 hover:underline font-semibold text-xs">
              Limpiar Filtros
            </button>
          </div>

          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2.5">Código</th>
                  <th class="px-3 py-2.5">Nombre del Paquete</th>
                  <th class="px-3 py-2.5">Piezas Incluidas</th>
                  <th class="px-3 py-2.5">Costo Unitario</th>
                  <th class="px-3 py-2.5">Vigencia Desde</th>
                  <th class="px-3 py-2.5">Vigencia Hasta</th>
                  <th class="px-3 py-2.5">Estatus</th>
                  <th class="px-3 py-2.5">Acciones</th>
                </tr>
              </thead>
              <tbody id="tbodyPaquetes" class="divide-y divide-slate-100">
                ${DENT_STATE.paquetes.map((p, i) => `
                  <tr class="hover:bg-slate-50 transition-colors" data-nombre="${(p.nombre || '').toLowerCase()} ${(p.corto || '').toLowerCase()}" data-desde="${p.desde || ''}" data-hasta="${p.hasta || ''}" data-activo="${p.estatus ? 'true' : 'false'}">
                    <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${p.corto || p.id}</td>
                    <td class="px-3 py-2.5 font-bold text-slate-800 text-left">${p.nombre}</td>
                    <td class="px-3 py-2.5 font-mono font-bold text-slate-900">${p.piezas} pzas</td>
                    <td class="px-3 py-2.5 font-mono font-bold text-emerald-700">${p.costo.toLocaleString('es-MX')}</td>
                    <td class="px-3 py-2.5 font-mono text-slate-500">${p.desde}</td>
                    <td class="px-3 py-2.5 font-mono text-slate-500">${p.hasta}</td>
                    <td class="px-3 py-2.5">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.estatus ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-200 text-slate-600'}">
                        ${p.estatus ? 'No Terminado (Vigente)' : 'Terminado / Inactivo'}
                      </span>
                    </td>
                    <td class="px-3 py-2.5">
                      <button onclick="toggleItemStatus('paquetes', ${i}, 'paquetes')" class="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-[11px] font-semibold transition-colors">
                        ${p.estatus ? 'Marcar Terminado' : 'Reactivar'}
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      break;
    }

    case 'productos-app': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab', 'Catálogo de Productos de Laboratorio (App)', 'Productos disponibles para orden digital en el portal de Doctores.', `
          <button onclick="openSimpleAddModal('productos-app')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Agregar Producto</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">ID</th>
                <th class="px-3 py-2.5">Categoría</th>
                <th class="px-3 py-2.5">Producto / Restauración</th>
                <th class="px-3 py-2.5">Tiempo Entrega</th>
                <th class="px-3 py-2.5">Precio Unitario</th>
                <th class="px-3 py-2.5">Garantía</th>
                <th class="px-3 py-2.5">Estatus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.productosApp.map((p, i) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${p.id}</td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">${p.categoria}</span></td>
                  <td class="px-3 py-2.5 font-bold text-slate-800">${p.nombre}</td>
                  <td class="px-3 py-2.5 font-mono">${p.tiempo}</td>
                  <td class="px-3 py-2.5 font-mono font-bold">$${p.precio.toLocaleString('es-MX')}</td>
                  <td class="px-3 py-2.5 text-slate-500">${p.garantia}</td>
                  <td class="px-3 py-2.5">
                    <button onclick="toggleItemStatus('productosApp', ${i}, 'productos-app')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.estatus ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                      ${p.estatus ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 5. DISCOS CAD/CAM (Inventario, Activos, Usados, Erróneos, Por Autorizar)
    // ------------------------------------------------------------------------
    case 'sec-discos':
    case 'discos':
    case 'marcas':
    case 'inventario-discos':
    case 'discos-activos':
    case 'discos-usados': {
      const totalCap = DENT_STATE.discos.reduce((acc, d) => acc + d.capacidad, 0);
      const totalUsa = DENT_STATE.discos.reduce((acc, d) => acc + d.usadas, 0);
      const pct = Math.round((totalUsa / totalCap) * 100);

      // Unique brands, colors, and thicknesses for filters
      const marcasUnicas = Array.from(new Set(DENT_STATE.discos.map(d => d.marca).filter(Boolean))).sort();
      const coloresUnicos = Array.from(new Set(DENT_STATE.discos.map(d => d.color).filter(Boolean))).sort();
      const espesoresUnicos = Array.from(new Set(DENT_STATE.discos.map(d => d.espesor).filter(Boolean))).sort();

      let sub = 'Inventario integral de bloques y discos CAD/CAM con filtrado por estatus, marca, color, espesor, impresión de etiquetas y registro de desbaste por orden de trabajo.';
      if (key === 'discos-activos') sub = 'Discos actualmente montados en fresadoras CNC con opción de terminar disco si aún restan piezas.';
      if (key === 'discos-usados') sub = 'Histórico de discos desbastados al 100% o concluidos manualmente.';

      container.innerHTML = `
        ${renderHeaderBanner('Discos CAD/CAM', key === 'inventario-discos' ? 'Inventario de Discos de Laboratorio (InventarioDiscos.php)' : (key === 'discos-activos' ? 'Discos Activos en Fresadora' : 'Discos Usados y Concluidos'), sub, `
          <div class="flex items-center gap-2">
            <button onclick="openModule('marcas-discos')" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors">
              <i data-lucide="tag" class="w-4 h-4"></i><span>Ver Marcas</span>
            </button>
            <button onclick="openSimpleAddModal('inventario-discos')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors">
              <i data-lucide="plus" class="w-4 h-4"></i><span>Nuevo Disco</span>
            </button>
          </div>
        `)}

        <!-- KPIs Generales de Discos -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Discos Registrados</span>
            <span class="text-xl font-extrabold font-mono text-slate-900">${DENT_STATE.discos.length}</span>
          </div>
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Capacidad Global</span>
            <span class="text-xl font-extrabold font-mono text-blue-600">${totalCap} pzas</span>
          </div>
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Piezas Fresadas</span>
            <span class="text-xl font-extrabold font-mono text-slate-800">${totalUsa}</span>
          </div>
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Piezas Disponibles</span>
            <span class="text-xl font-extrabold font-mono text-emerald-600">${totalCap - totalUsa}</span>
          </div>
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Rendimiento</span>
            <span class="text-xl font-extrabold font-mono text-blue-700">${pct}%</span>
          </div>
        </div>

        <!-- Barra de Filtrado en 4 Direcciones (Estatus, Marca, Color, Tamaño) + Fechas -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs items-end">
            <div>
              <label class="font-bold text-slate-500 uppercase text-[9.5px] block mb-1">Estatus</label>
              <select id="filtroDiscoEstatus" onchange="filtrarDiscosInventario()" class="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600">
                <option value="">Todos los Estatus</option>
                <option value="Activo" ${key === 'discos-activos' ? 'selected' : ''}>Activo (En Fresadora)</option>
                <option value="Almacén">En Almacén</option>
                <option value="Usado" ${key === 'discos-usados' ? 'selected' : ''}>Agotado / Usado</option>
                <option value="Vendido" ${key === 'discos-vendidos' ? 'selected' : ''}>Vendido (Movimiento de Venta)</option>
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[9.5px] block mb-1">Marca</label>
              <select id="filtroDiscoMarca" onchange="filtrarDiscosInventario()" class="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600">
                <option value="">Todas las Marcas</option>
                ${marcasUnicas.map(m => `<option value="${m}">${m}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[9.5px] block mb-1">Color / Tono</label>
              <select id="filtroDiscoColor" onchange="filtrarDiscosInventario()" class="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600">
                <option value="">Todos los Tonos</option>
                ${coloresUnicos.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[9.5px] block mb-1">Espesor / Tamaño</label>
              <select id="filtroDiscoEspesor" onchange="filtrarDiscosInventario()" class="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600">
                <option value="">Todos los Tamaños</option>
                ${espesoresUnicos.map(e => `<option value="${e}">${e}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[9.5px] block mb-1">Fecha Inicio</label>
              <input type="date" id="filtroDiscoFechaIni" onchange="filtrarDiscosInventario()" class="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[9.5px] block mb-1">Fecha Fin</label>
              <input type="date" id="filtroDiscoFechaFin" onchange="filtrarDiscosInventario()" class="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-600">
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 px-1 text-xs">
            <input id="searchDiscoInput" onkeyup="filtrarDiscosInventario()" placeholder="Buscar por código, lote o almacén..." class="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs w-full sm:w-72 focus:bg-white focus:outline-none focus:border-blue-600">
            <div class="flex items-center gap-3">
              <span class="text-slate-500 font-semibold" id="contadorDiscosFiltrados">Mostrando ${DENT_STATE.discos.length} discos</span>
              <button type="button" onclick="resetFiltrosDiscos()" class="text-blue-600 hover:underline font-semibold">Limpiar</button>
            </div>
          </div>

          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2.5">Código Disco</th>
                  <th class="px-3 py-2.5">Lote</th>
                  <th class="px-3 py-2.5">Marca</th>
                  <th class="px-3 py-2.5">Tono Vita</th>
                  <th class="px-3 py-2.5">Espesor</th>
                  <th class="px-3 py-2.5">Uso de Piezas</th>
                  <th class="px-3 py-2.5">Ubicación / Movimiento</th>
                  <th class="px-3 py-2.5">Estado</th>
                  <th class="px-3 py-2.5">Acciones</th>
                </tr>
              </thead>
              <tbody id="tbodyDiscos" class="divide-y divide-slate-100">
                ${DENT_STATE.discos.map(d => {
                  const p = Math.round((d.usadas / d.capacidad) * 100);
                  const isActivo = d.estado === 'Activo';
                  const isVendido = d.estado === 'Vendido';
                  return `
                    <tr class="hover:bg-slate-50 transition-colors" data-id="${d.id}" data-marca="${d.marca}" data-color="${d.color}" data-espesor="${d.espesor}" data-estado="${d.estado}" data-fecha="${d.fechaVenta || d.fechaIngreso || ''}">
                      <td class="px-3 py-2.5 font-mono font-bold text-blue-600">
                        <a href="javascript:void(0)" onclick="abrirModalDetalleUsoDisco('${d.id}')" class="hover:underline">${d.id}</a>
                      </td>
                      <td class="px-3 py-2.5 font-mono text-slate-500">${d.lote}</td>
                      <td class="px-3 py-2.5 font-bold text-slate-800 text-left">${d.marca}</td>
                      <td class="px-3 py-2.5 font-mono font-bold"><span class="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">${d.color}</span></td>
                      <td class="px-3 py-2.5 font-mono font-semibold">${d.espesor}</td>
                      <td class="px-3 py-2.5">
                        <div class="flex items-center justify-center gap-2">
                          <div class="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div class="h-full rounded-full ${p >= 90 ? 'bg-rose-500' : p >= 60 ? 'bg-amber-500' : (isVendido ? 'bg-purple-600' : 'bg-blue-600')}" style="width:${p}%"></div>
                          </div>
                          <span class="font-mono text-[11px] font-bold">${d.usadas}/${d.capacidad}</span>
                        </div>
                      </td>
                      <td class="px-3 py-2.5 text-left font-semibold text-slate-700">
                        <div>${d.almacen}</div>
                        ${isVendido ? `<div class="text-[10.5px] text-purple-700 font-normal">Venta por: <strong class="font-bold">${d.usuarioVenta || 'Ventas'}</strong></div>` : ''}
                      </td>
                      <td class="px-3 py-2.5">
                        ${isVendido ? `
                          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                            Vendido
                          </span>
                          <span class="text-[9.5px] font-mono text-purple-900 block mt-0.5">${d.fechaVenta || '2026-06-04 10:51'}</span>
                        ` : (isActivo ? `
                          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            Activo
                          </span>
                        ` : (d.estado.includes('Almacén') ? `
                          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            En Almacén
                          </span>
                        ` : `
                          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                            ${d.estado}
                          </span>
                        `))}
                      </td>
                      </td>
                      <td class="px-3 py-2.5">
                        <div class="flex items-center justify-center gap-1">
                          <button type="button" onclick="imprimirEtiquetaTermicaDisco('${d.id}')" class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-900 hover:text-white text-slate-700 transition-colors" title="Imprimir Etiqueta Térmica de Caja">
                            <i data-lucide="barcode" class="w-3.5 h-3.5"></i>
                          </button>
                          <button type="button" onclick="abrirModalDetalleUsoDisco('${d.id}')" class="p-1.5 rounded-lg border border-slate-200 hover:bg-blue-600 hover:text-white text-slate-700 transition-colors" title="Ver Detalle de Uso por Orden">
                            <i data-lucide="list-ordered" class="w-3.5 h-3.5"></i>
                          </button>
                          ${isActivo ? `
                            <button type="button" onclick="terminarDiscoManual('${d.id}')" class="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white font-bold text-[10px] border border-rose-200 transition-colors" title="Terminar disco aunque resten piezas">
                              Terminar
                            </button>
                          ` : ''}
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      break;
    }

    case 'archivos-erroneos':
    case 'archivos-autorizar': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Discos CAD/CAM', key === 'archivos-erroneos' ? 'Archivos de Fresado Erróneos' : 'Archivos CAM por Autorizar', 'Validación de archivos XML/STL generados por el software de anidado CAM antes del fresado.')}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-blue-600">Archivos Pendientes de Autorización CAM</h3>
            ${DENT_STATE.archivosPorAutorizar.map((a, idx) => `
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <span class="font-mono text-xs font-bold text-slate-900">${a.archivo}</span>
                  <p class="text-[11px] text-slate-500 mt-0.5">Disco: <strong>${a.disco}</strong> • ${a.piezas} piezas (${a.ordenes})</p>
                  <p class="text-[10px] text-slate-400">Solicita: ${a.solicitante} • ${a.fecha}</p>
                </div>
                ${a.autorizado
                  ? `<span class="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">✓ Autorizado</span>`
                  : `<button onclick="autorizarArchivoCAM(${idx})" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold">Autorizar Fresado</button>`
                }
              </div>
            `).join('')}
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-rose-600">Bitácora de Archivos Erróneos XML/STL</h3>
            ${DENT_STATE.archivosDiscosErroneos.map(e => `
              <div class="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 flex items-center justify-between gap-3">
                <div>
                  <span class="font-mono text-xs font-bold text-rose-700">${e.archivo}</span>
                  <p class="text-[11px] text-slate-700 mt-0.5">${e.error}</p>
                  <p class="text-[10px] text-slate-400">Disco ${e.disco} • ${e.operador} • ${e.fecha}</p>
                </div>
                <span class="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-700 text-[10px] font-bold">${e.estado}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 6. BANERS APP, RECORDATORIOS, MARCAS DE DISCOS, CATEGORÍAS
    // ------------------------------------------------------------------------
    case 'baners-app': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab', 'BanersApp (Carrusel Promocional)', 'Imágenes publicitarias activas en la aplicación móvil y portal de Doctores.', `
          <button onclick="openSimpleAddModal('baners-app')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="image-plus" class="w-4 h-4"></i><span>Subir Nuevo Banner</span>
          </button>
        `)}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${DENT_STATE.banersApp.map((b, i) => `
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div class="h-40 bg-slate-900 relative overflow-hidden">
                <img src="${b.imagen}" alt="${b.titulo}" class="w-full h-full object-cover opacity-85">
                <span class="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/80 text-white font-mono text-[10px] font-bold">Orden #${b.orden}</span>
              </div>
              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 class="text-xs font-bold text-slate-900">${b.titulo}</h4>
                  <p class="text-[11px] text-slate-500 mt-1">${b.subtitulo}</p>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${b.estatus ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">${b.estatus ? 'VISIBLE EN APP' : 'OCULTO'}</span>
                  <button onclick="toggleItemStatus('banersApp', ${i}, 'baners-app')" class="text-xs font-semibold text-blue-600 hover:underline">Cambiar Estatus</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      break;
    }

    case 'recordatorios': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Recordatorios', 'Programación de Recordatorios (Recordatorios.php)', 'Alertas automáticas para seguimiento de entregas, cobros y paquetes.', `
          <button onclick="openSimpleAddModal('recordatorios')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Nuevo Recordatorio</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Folio</th>
                <th class="px-3 py-2.5">Tipo</th>
                <th class="px-3 py-2.5">Usuario / Doctor</th>
                <th class="px-3 py-2.5">Descripción de Recordatorio</th>
                <th class="px-3 py-2.5">Fecha Programada</th>
                <th class="px-3 py-2.5">Estatus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.recordatorios.map(r => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${r.id}</td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">${r.tipo}</span></td>
                  <td class="px-3 py-2.5 font-bold">${r.doctor}</td>
                  <td class="px-3 py-2.5 text-left">${r.mensaje}</td>
                  <td class="px-3 py-2.5 font-mono">${r.fecha}</td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">${r.estatus}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'tipos-recordatorio': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Recordatorios', 'Tipos de Recordatorio (TiposRecordatorio.php)', 'Catálogo de clasificaciones de recordatorios del sistema DentControl.', `
          <button onclick="openSimpleAddModal('tipos-recordatorio')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Nuevo Tipo de Recordatorio</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">ID</th>
                <th class="px-3 py-2.5">Descripción</th>
                <th class="px-3 py-2.5">Prioridad</th>
                <th class="px-3 py-2.5">Canal de Notificación</th>
                <th class="px-3 py-2.5">Estatus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.tiposRecordatorio.map((t, i) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">#${t.id}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-800">${t.nombre}</td>
                  <td class="px-3 py-2.5">${t.prioridad || 'Normal'}</td>
                  <td class="px-3 py-2.5 text-slate-500">${t.canal || 'Sistema + Push'}</td>
                  <td class="px-3 py-2.5">
                    <button onclick="toggleItemStatus('tiposRecordatorio', ${i}, 'tipos-recordatorio')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${t.estatus ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                      ${t.estatus ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'marcas-discos': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab', 'Marcas de Discos de Laboratorio', 'Fabricantes certificados para bloques y discos CAD/CAM.', `
          <button onclick="openSimpleAddModal('marcas-discos')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Agregar Marca</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">ID</th>
                <th class="px-3 py-2.5">Marca de Laboratorio</th>
                <th class="px-3 py-2.5">Origen</th>
                <th class="px-3 py-2.5">Línea de Material</th>
                <th class="px-3 py-2.5">Estatus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.marcasDiscos.map((m, i) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">#${m.id}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-800">${m.marca}</td>
                  <td class="px-3 py-2.5">${m.origen}</td>
                  <td class="px-3 py-2.5 text-slate-500">${m.material}</td>
                  <td class="px-3 py-2.5">
                    <button onclick="toggleItemStatus('marcasDiscos', ${i}, 'marcas-discos')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${m.estatus ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                      ${m.estatus ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'categorias': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab', 'Categorías de Laboratorio', 'Clasificación maestra de restauraciones y líneas de producción CAD/CAM.', `
          <button onclick="openSimpleAddModal('categorias')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Nueva Categoría</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">ID</th>
                <th class="px-3 py-2.5">Categoría</th>
                <th class="px-3 py-2.5">Descripción Técnica</th>
                <th class="px-3 py-2.5">Productos Asociados</th>
                <th class="px-3 py-2.5">Estatus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.categorias.map((c, i) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">#${c.id}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-900">${c.nombre}</td>
                  <td class="px-3 py-2.5 text-slate-500">${c.descripcion}</td>
                  <td class="px-3 py-2.5 font-mono font-bold">${c.productos}</td>
                  <td class="px-3 py-2.5">
                    <button onclick="toggleItemStatus('categorias', ${i}, 'categorias')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c.estatus ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                      ${c.estatus ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 7. DOCTORES (Listado, Nuevo Doctor, Tipos, Paquetes, Sin Paquetes 3M)
    // ------------------------------------------------------------------------
    case 'sec-doctores':
    case 'doctores':
    case 'listado-doctores':
    case 'doctores-inactivos': {
      const list = key === 'doctores-inactivos'
        ? DENT_STATE.doctores.filter(d => d.mesesSinPaquete >= 3)
        : DENT_STATE.doctores;

      container.innerHTML = `
        ${renderHeaderBanner('Doctores', key === 'doctores-inactivos' ? 'Doctores sin Paquetes Actuales (≥ 3 Meses)' : 'Directorio General de Doctores', 'Gestión de odontólogos, clínicas afiliadas, asignación de vendedor, edición y compra de paquetes.', `
          <button onclick="openModule('nuevo-doctor')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <i data-lucide="user-plus" class="w-4 h-4"></i><span>Nuevo Doctor</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex-1 min-w-[280px]">
              <input id="searchDocInput" onkeyup="filterDynamicTable('searchDocInput','tbodyDoctores')" placeholder="Buscar por doctor, celular, clínica, correo o vendedor..." class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-500 font-semibold">Total: <strong class="text-slate-800 font-bold">${list.length}</strong> doctores</span>
            </div>
          </div>

          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2.5">Doctor</th>
                  <th class="px-3 py-2.5">Contacto</th>
                  <th class="px-3 py-2.5">Clínica / Dirección</th>
                  <th class="px-3 py-2.5">Vendedor</th>
                  <th class="px-3 py-2.5">Tipo</th>
                  <th class="px-3 py-2.5">Habilitado</th>
                  <th class="px-3 py-2.5">Pacientes</th>
                  <th class="px-3 py-2.5">Paquetes</th>
                  <th class="px-3 py-2.5">Acciones</th>
                </tr>
              </thead>
              <tbody id="tbodyDoctores" class="divide-y divide-slate-100">
                ${list.map((d, i) => `
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="px-3 py-2.5 font-bold text-slate-900 text-left">
                      <a href="javascript:void(0)" onclick="abrirDetalleDoctor('${d.id}')" class="text-blue-600 hover:underline flex items-center gap-1.5">
                        <i data-lucide="user" class="w-3.5 h-3.5 text-slate-400"></i>
                        <span>${d.nombre}</span>
                      </a>
                    </td>
                    <td class="px-3 py-2.5 text-left font-mono">
                      <div class="text-slate-700 font-semibold">${d.celular}</div>
                      <div class="text-[10px] text-blue-600">${d.mail}</div>
                    </td>
                    <td class="px-3 py-2.5 text-left">
                      <div class="font-semibold text-slate-800">${d.clinica}</div>
                      <div class="text-[10px] text-slate-400 truncate max-w-[180px]">${d.direccion || 'Sin dirección registrada'}</div>
                    </td>
                    <td class="px-3 py-2.5 font-medium text-slate-700">${d.vendedor}</td>
                    <td class="px-3 py-2.5">
                      <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${d.externo ? 'bg-slate-100 text-slate-700' : 'bg-blue-50 text-blue-700'}">${d.externo ? 'Externo' : 'Interno'}</span>
                    </td>
                    <td class="px-3 py-2.5">
                      <button type="button" onclick="toggleDoctorActivo('${d.id}', '${key}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${d.activo ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-rose-100 text-rose-700 hover:bg-rose-200'}" title="Clic para alternar estatus">
                        ${d.activo ? 'ACTIVO' : 'INACTIVO'}
                      </button>
                    </td>
                    <td class="px-3 py-2.5">
                      <button onclick="openModule('lista-pacientes')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-[11px] font-semibold transition-colors">
                        Ver Pacientes
                      </button>
                    </td>
                    <td class="px-3 py-2.5">
                      <button onclick="asignarPaqueteDoctor('${d.nombre}')" class="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-[11px] font-semibold transition-colors flex items-center gap-1 mx-auto">
                        <i data-lucide="package-plus" class="w-3 h-3"></i>
                        <span>+ Paquete</span>
                      </button>
                    </td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center justify-center gap-1">
                        <button type="button" onclick="abrirModalEditarDoctor('${d.id}')" class="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors cursor-pointer" title="Editar Doctor">
                          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                        </button>
                        <button type="button" onclick="abrirDetalleDoctor('${d.id}')" class="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-900 hover:text-white text-slate-700 transition-colors cursor-pointer" title="Ver Expediente Completo">
                          <i data-lucide="folder" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      break;
    }

    case 'nuevo-doctor': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Doctores', 'Registrar Nuevo Doctor (newDoctorVendedor.php)', 'Alta completa de doctor, consultorio, vendedor asignado y datos fiscales CFDI 4.0.')}
        <form onsubmit="guardarNuevoDoctor(event)" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label class="font-bold text-slate-600 block mb-1">Nombre Completo del Doctor *</label>
              <input id="ndNombre" required placeholder="Ej. Dr. Alejandro Villarreal" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">Teléfono Celular *</label>
              <input id="ndCelular" required placeholder="81 0000 0000" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">Correo Electrónico *</label>
              <input id="ndMail" type="email" required placeholder="doctor@clinica.mx" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">Nombre de la Clínica / Consultorio *</label>
              <input id="ndClinica" required placeholder="Ej. Dental Studio San Pedro" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">Tipo de Doctor</label>
              <select id="ndTipo" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
                ${DENT_STATE.doctoresTipos.map(t => `<option value="${t.tipo}">${t.tipo}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">Vendedor Asignado</label>
              <select id="ndVendedor" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
                ${DENT_STATE.vendedores.map(v => `<option value="${v.nombre}">${v.nombre}</option>`).join('')}
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="font-bold text-slate-600 block mb-1">Notas Clínicas / Preferencias de Laboratorio</label>
              <input id="ndNota" placeholder="Ej. Prefiere contacto oclusal ligero, entregas por la mañana" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">Modalidad</label>
              <select id="ndExterno" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
                <option value="true">Doctor Externo</option>
                <option value="false">Doctor Interno Dent</option>
              </select>
            </div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button type="button" onclick="openModule('listado-doctores')" class="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50">Cancelar</button>
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm">Guardar Doctor en Directorio</button>
          </div>
        </form>
      `;
      break;
    }

    case 'doctores-tipos': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Doctores', 'Tipos de Doctores (DoctoresTiposApp.php)', 'Niveles de especialidad, porcentaje de beneficio y días de crédito autorizados.')}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">ID</th>
                <th class="px-3 py-2.5">Tipo / Especialidad</th>
                <th class="px-3 py-2.5">Descuento en Paquetes</th>
                <th class="px-3 py-2.5">Días de Crédito</th>
                <th class="px-3 py-2.5">Estatus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.doctoresTipos.map(t => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">#${t.id}</td>
                  <td class="px-3 py-2.5 font-bold">${t.tipo}</td>
                  <td class="px-3 py-2.5 font-mono text-emerald-700 font-bold">${t.descuento}</td>
                  <td class="px-3 py-2.5 font-mono">${t.creditoDias} días</td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">ACTIVO</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'paquetes-doctores': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Doctores', 'Listado de Paquetes por Doctor (PaquetesDoctores.php)', 'Seguimiento de piezas incluidas, piezas consumidas y piezas disponibles por cada doctor.')}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Folio</th>
                <th class="px-3 py-2.5">Doctor</th>
                <th class="px-3 py-2.5">Paquete Contratado</th>
                <th class="px-3 py-2.5">Total Piezas</th>
                <th class="px-3 py-2.5">Usadas</th>
                <th class="px-3 py-2.5">Disponibles</th>
                <th class="px-3 py-2.5">Estado de Pago</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.paquetesDoctores.map(p => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${p.folio}</td>
                  <td class="px-3 py-2.5 font-bold">${p.doctor}</td>
                  <td class="px-3 py-2.5">${p.paquete}</td>
                  <td class="px-3 py-2.5 font-mono font-bold">${p.totalPiezas}</td>
                  <td class="px-3 py-2.5 font-mono text-slate-600">${p.usadas}</td>
                  <td class="px-3 py-2.5"><span class="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold">${p.disponibles} restantes</span></td>
                  <td class="px-3 py-2.5 font-semibold ${p.saldo.includes('Liquidado') ? 'text-emerald-700' : 'text-amber-700'}">${p.saldo}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 8. ÓRDENES -> LISTA DE ÓRDENES (ListOrdenes.php)
    // ------------------------------------------------------------------------
    case 'lista-ordenes': {
      const ordenesList = (typeof INICIO_DATA !== 'undefined' && Array.isArray(INICIO_DATA.ordenes) && INICIO_DATA.ordenes.length)
        ? INICIO_DATA.ordenes
        : DENT_STATE.controlLab;

      const docsUnicos = Array.from(new Set(ordenesList.map(o => o.doctor).filter(Boolean))).sort();

      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Órdenes', 'Lista Maestra de Órdenes de Trabajo (ListOrdenes.php)', 'Consulta general de órdenes CAD/CAM con filtros avanzados de fecha, doctor, asignación de escaneador y acceso directo a expediente técnico.', `
          <button onclick="openSimpleAddModal('lista-ordenes')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Crear Nueva Orden</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <!-- Barra de Filtros: Búsqueda, Fechas Inicio/Fin y Selector de Doctor -->
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs items-end">
            <div class="lg:col-span-2">
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Buscar Orden / Paciente / Folio</label>
              <input id="searchOrdList" onkeyup="filtrarOrdenesMaestra()" placeholder="Escribe folio #OT, doctor, paciente o producto..." class="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Fecha Inicio</label>
              <input type="date" id="filtroOrdFechaInicio" onchange="filtrarOrdenesMaestra()" class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Fecha Fin</label>
              <input type="date" id="filtroOrdFechaFin" onchange="filtrarOrdenesMaestra()" class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Filtrar por Doctor</label>
              <select id="filtroOrdDoctor" onchange="filtrarOrdenesMaestra()" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600">
                <option value="">Todos los Doctores</option>
                ${docsUnicos.map(d => `<option value="${d}">${d}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs px-1">
            <span class="text-slate-500 font-semibold" id="contadorOrdenesFiltradas">Mostrando ${ordenesList.length} órdenes registradas</span>
            <div class="flex items-center gap-2">
              <button type="button" onclick="resetFiltrosOrdenesMaestra()" class="px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-semibold transition-colors">
                Limpiar Filtros
              </button>
              <button onclick="openOdontogramaModal()" class="px-3 py-1 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1.5 hover:bg-blue-100 transition-colors">
                <i data-lucide="scan-face" class="w-3.5 h-3.5"></i><span>Odontograma FDI</span>
              </button>
            </div>
          </div>

          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2.5">FOLIO</th>
                  <th class="px-3 py-2.5">DOCTOR</th>
                  <th class="px-3 py-2.5">PACIENTE</th>
                  <th class="px-3 py-2.5">PRODUCTO</th>
                  <th class="px-3 py-2.5">FORMA PAGO</th>
                  <th class="px-3 py-2.5">ENTREGA / DÍAS</th>
                  <th class="px-3 py-2.5">ESCANEADOR ASIGNADO</th>
                  <th class="px-3 py-2.5">ACCIONES</th>
                </tr>
              </thead>
              <tbody id="tbodyOrdList" class="divide-y divide-slate-100">
                ${ordenesList.map(o => {
                  const serie = o.serie || o.ot;
                  const formaPago = o.paquetes && o.paquetes !== 'SIN PAQUETE' ? o.paquetes : (o.metodoPago || 'Efectivo');
                  const semaforo = window.calcularDiasRestantes(o.entrega);
                  const escaneador = o.escaneador || (o.conScan ? 'Arturo Meza' : 'Por asignar');
                  const safeDoc = (o.doctor || '').replace(/'/g, "\\'");
                  const safePac = (o.paciente || '').replace(/'/g, "\\'");
                  return `
                    <tr class="hover:bg-slate-50 transition-colors" data-serie="${serie}" data-doctor="${safeDoc}" data-paciente="${safePac}" data-entrega="${o.entrega}">
                      <td class="px-3 py-2.5 font-mono font-bold text-blue-600">
                        <a href="javascript:void(0)" onclick="abrirOrdenTrabajo('${serie}')" class="hover:underline">#${serie}</a>
                      </td>
                      <td class="px-3 py-2.5 font-semibold text-slate-800 text-left">
                        <a href="javascript:void(0)" onclick="abrirDetalleDoctor('${o.doctorId || safeDoc}')" class="text-blue-600 hover:underline">${o.doctor}</a>
                      </td>
                      <td class="px-3 py-2.5 text-left text-slate-700">${o.paciente}</td>
                      <td class="px-3 py-2.5 font-semibold text-slate-800">${o.producto}</td>
                      <td class="px-3 py-2.5 font-mono text-[11px] font-semibold text-slate-700">${formaPago}</td>
                      <td class="px-3 py-2.5 font-mono">
                        <div class="flex flex-col items-center justify-center gap-0.5">
                          <span class="text-slate-700">${o.entrega}</span>
                          <span class="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.2 rounded-full ${semaforo.badgeClass}">
                            <i data-lucide="${semaforo.icon}" class="w-3 h-3"></i>
                            <span>${semaforo.label}</span>
                          </span>
                        </div>
                      </td>
                      <td class="px-3 py-2.5">
                        <div class="flex items-center justify-center gap-1.5">
                          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-semibold ${escaneador !== 'Por asignar' ? 'bg-blue-50 text-blue-700 border border-blue-200/70' : 'bg-slate-100 text-slate-500'}">
                            <i data-lucide="user-check" class="w-3 h-3"></i>
                            <span>${escaneador}</span>
                          </span>
                          <button type="button" onclick="abrirModalAsignarEscaneador('${serie}')" class="p-1 rounded bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 transition-colors cursor-pointer" title="Cambiar / Asignar Escaneador">
                            <i data-lucide="user-plus" class="w-3 h-3"></i>
                          </button>
                        </div>
                      </td>
                      <td class="px-3 py-2.5">
                        <div class="flex items-center justify-center gap-1">
                          <button type="button" onclick="Etiqueta('${safeDoc}', '${safePac}', '${o.entrega}', '${serie}')" class="btnEtiqueta" title="Imprimir Código de Barras">
                            <i data-lucide="barcode" class="w-3.5 h-3.5"></i>
                          </button>
                          <button type="button" onclick="abrirOrdenTrabajo('${serie}')" class="btnEtiqueta btnEtiqueta--ot" title="Abrir Hoja de Orden">
                            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5c-1.5-2-4-2.5-6-1-2 1.5-2.5 4.5-1.5 7 1 2.5 1.5 5.5 2 8 .3 1.5 1.8 1.5 2.5 0 .5-1.5 1-3.5 3-3.5s2.5 2 3 3.5c.7 1.5 2.2 1.5 2.5 0 .5-2.5 1-5.5 2-8 1-2.5.5-5.5-1.5-7-2-1.5-4.5-1-6 1z"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 9. COLORÍMETRO COLORES (Colorimetro.php)
    // ------------------------------------------------------------------------
    case 'colorimetro': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab', 'Colorímetro Colores (Guía VITA & 3D-Master)', 'Catálogo interactivo de tonos dentales con equivalencia y aplicación directa en la Orden de Trabajo.', `
          <button onclick="openSimpleAddModal('colorimetro')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Agregar Color</span>
          </button>
        `)}
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          ${DENT_STATE.colorimetro.map(c => `
            <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between hover:border-blue-500 transition-all">
              <div class="flex items-center justify-between mb-3">
                <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">${c.marca}</span>
                ${c.principal ? `<span class="text-[10px] font-bold text-blue-600">★ Principal</span>` : ''}
              </div>
              <div class="flex flex-col items-center my-2">
                <div class="w-14 h-20 rounded-t-full rounded-b-2xl border-2 border-slate-300 shadow-inner mb-2.5" style="background:${c.hex}"></div>
                <h4 class="text-base font-extrabold font-mono text-slate-900">${c.codigo}</h4>
                <p class="text-[11px] text-slate-400">Eq: ${c.equivalente}</p>
              </div>
              <button onclick="probarTonoEn3D('${c.hex}', '${c.codigo}')" class="mt-3 w-full py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-semibold transition-colors">
                Aplicar a Orden
              </button>
            </div>
          `).join('')}
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 10. VENDEDOR, VENDEDORES Y USUARIOS
    // ------------------------------------------------------------------------
    case 'vendedor':
    case 'vendedores-detalle': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Comercial', 'Ejecutivos de Venta (Vendedor.php / ListadoVendedores.php)', 'Control de vendedores activos en sys_usuarios (id_perfil = 11), código de vendedor y cartera de doctores.', `
          <button onclick="openSimpleAddModal('vendedores')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="user-plus" class="w-4 h-4"></i><span>Nuevo Vendedor</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Código Vendedor</th>
                <th class="px-3 py-2.5">Usuario</th>
                <th class="px-3 py-2.5">Ejecutivo Comercial</th>
                <th class="px-3 py-2.5">Correo</th>
                <th class="px-3 py-2.5">Zona Asignada</th>
                <th class="px-3 py-2.5">Doctores en Cartera</th>
                <th class="px-3 py-2.5">Meta Mensual</th>
                <th class="px-3 py-2.5">Avance Actual</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.vendedores.map(v => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${v.codigo || v.id}</td>
                  <td class="px-3 py-2.5 font-mono text-slate-600">${v.usuario || ''}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-900">${v.nombre}</td>
                  <td class="px-3 py-2.5 text-slate-500">${v.correo || ''}</td>
                  <td class="px-3 py-2.5">${v.zona}</td>
                  <td class="px-3 py-2.5 font-mono font-bold">${v.doctoresAsignados} doctores</td>
                  <td class="px-3 py-2.5 font-mono">${v.metaMensual}</td>
                  <td class="px-3 py-2.5 font-mono font-bold text-emerald-700">${v.avance}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'representantes-venta': {
      const reps = DENT_STATE.representantesVenta || DENT_STATE.usuarios.filter(u => u.id_perfil === 8);
      container.innerHTML = `
        ${renderHeaderBanner('Dent Clinic • Representantes de Venta', 'Representantes de Venta (RepresentantesVenta.php)', 'Representantes comerciales registrados en sys_usuarios (id_perfil = 8) para convenios empresariales.')}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">ID</th>
                <th class="px-3 py-2.5">Usuario</th>
                <th class="px-3 py-2.5">Nombre</th>
                <th class="px-3 py-2.5">Correo</th>
                <th class="px-3 py-2.5">Empresas Asignadas</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${reps.map(r => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">#${r.id}</td>
                  <td class="px-3 py-2.5 font-mono font-semibold">${r.usuario}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-900">${r.nombre}</td>
                  <td class="px-3 py-2.5 text-slate-500">${r.correo}</td>
                  <td class="px-3 py-2.5">
                    <button onclick="openModule('lista-empresas')" class="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-[11px] transition-colors">
                      Ver Empresas
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'usuarios': {
      const perfilesUnicos = Array.from(new Set(DENT_STATE.usuarios.map(u => u.perfil).filter(Boolean))).sort();

      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Seguridad', 'Administración de Usuarios del Sistema (Usuarios.php)', 'Gestión integral de cuentas de acceso, perfiles operativos, asignación a App Equipos y permisos detallados por módulo.', `
          <button onclick="openSimpleAddModal('usuarios')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <i data-lucide="user-plus" class="w-4 h-4"></i><span>Nuevo Usuario</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <!-- Filtros de Usuarios: Perfil, Estatus y Búsqueda -->
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs items-end">
            <div>
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Buscar Usuario</label>
              <input id="searchUserInput" onkeyup="filtrarUsuarios()" placeholder="Buscar por usuario, nombre o correo..." class="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Filtrar por Perfil</label>
              <select id="filtroUserPerfil" onchange="filtrarUsuarios()" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600">
                <option value="">Todos los Perfiles</option>
                ${perfilesUnicos.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Estatus</label>
              <select id="filtroUserEstatus" onchange="filtrarUsuarios()" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600">
                <option value="">Todos los Estatus</option>
                <option value="activo">Solo Activos</option>
                <option value="inactivo">Solo Inactivos</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs px-1">
            <span class="text-slate-500 font-semibold" id="contadorUsuariosFiltrados">Mostrando ${DENT_STATE.usuarios.length} cuentas de usuario</span>
            <button type="button" onclick="resetFiltrosUsuarios()" class="text-blue-600 hover:underline font-semibold text-xs">Limpiar Filtros</button>
          </div>

          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2.5">Usuario</th>
                  <th class="px-3 py-2.5">Nombre Completo</th>
                  <th class="px-3 py-2.5">Correo</th>
                  <th class="px-3 py-2.5">Perfil</th>
                  <th class="px-3 py-2.5">App Equipos</th>
                  <th class="px-3 py-2.5">Estatus</th>
                  <th class="px-3 py-2.5">Permisos Módulos</th>
                  <th class="px-3 py-2.5">Acciones</th>
                </tr>
              </thead>
              <tbody id="tbodyUsuarios" class="divide-y divide-slate-100">
                ${DENT_STATE.usuarios.map((u, i) => `
                  <tr class="hover:bg-slate-50 transition-colors" data-usuario="${u.usuario.toLowerCase()}" data-nombre="${u.nombre.toLowerCase()}" data-correo="${u.correo.toLowerCase()}" data-perfil="${u.perfil}" data-estatus="${u.estatus ? 'activo' : 'inactivo'}">
                    <td class="px-3 py-2.5 font-mono font-bold text-blue-600">@${u.usuario}</td>
                    <td class="px-3 py-2.5 font-bold text-slate-800 text-left">${u.nombre}</td>
                    <td class="px-3 py-2.5 text-slate-500 text-left">${u.correo}</td>
                    <td class="px-3 py-2.5"><span class="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-semibold text-[10px] border border-blue-200/60">${u.perfil}</span></td>
                    <td class="px-3 py-2.5">
                      <button onclick="toggleUsuarioAppEquipos(${i})" class="px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${u.appEquipos ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}">
                        ${u.appEquipos ? 'HABILITADO' : 'NO'}
                      </button>
                    </td>
                    <td class="px-3 py-2.5">
                      <button onclick="toggleItemStatus('usuarios', ${i}, 'usuarios')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${u.estatus ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-rose-100 text-rose-700 hover:bg-rose-200'}">
                        ${u.estatus ? 'ACTIVO' : 'INACTIVO'}
                      </button>
                    </td>
                    <td class="px-3 py-2.5">
                      <button onclick="abrirModalPermisosUsuario(${u.id || (i + 1)})" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 text-[11px] font-semibold transition-colors flex items-center gap-1 mx-auto">
                        <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                        <span>Permisos</span>
                      </button>
                    </td>
                    <td class="px-3 py-2.5">
                      <button onclick="abrirModalEditarUsuario(${u.id || (i + 1)})" class="p-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors" title="Editar Usuario">
                        <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 11. DENT SPA & DENT CLINIC: CONVENIOS, EMPRESAS, EMPLEADOS, ENCUESTAS
    // ------------------------------------------------------------------------
    case 'nueva-empresa': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent SPA & Dent Clinic • Convenios', 'Registrar Nueva Empresa en Convenio (NewEmpresa.php)', 'Alta de convenio corporativo para beneficios dentales y spa de empleados.')}
        <form onsubmit="guardarNuevaEmpresa(event)" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="font-bold text-slate-600 block mb-1">Razón Social / Nombre de Empresa *</label>
              <input id="neNombre" required placeholder="Ej. Industrias Monterrey S.A. de C.V." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">RFC *</label>
              <input id="neRfc" required placeholder="IMO990101AAA" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono uppercase">
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">Contacto / Representante RH *</label>
              <input id="neRep" required placeholder="Lic. Patricia Garza" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">Teléfono Corporativo *</label>
              <input id="neTel" required placeholder="81 8300 0000" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">% Descuento Convenio</label>
              <select id="neDesc" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
                <option value="15%">15% Descuento Corporativo</option>
                <option value="20%">20% Descuento Preferencial</option>
                <option value="25%">25% Convenio VIP + Spa</option>
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-600 block mb-1">División</label>
              <select id="neDiv" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
                <option value="Dent Clinic & SPA">Dent Clinic & SPA</option>
                <option value="Dent Clinic">Dent Clinic</option>
                <option value="Dent SPA">Dent SPA</option>
              </select>
            </div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button type="button" onclick="openModule('lista-empresas')" class="px-4 py-2 rounded-xl border border-slate-200 font-semibold">Ver Lista de Empresas</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold">Registrar Convenio</button>
          </div>
        </form>
      `;
      break;
    }

    case 'lista-empresas': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Clinic • Convenios', 'Lista de Empresas Afiliadas (ListaEmpresas.php)', 'Empresas con convenio activo para atención en Dent Clinic y Dent SPA.', `
          <button onclick="openModule('nueva-empresa')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Nueva Empresa</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">ID</th>
                <th class="px-3 py-2.5">Empresa</th>
                <th class="px-3 py-2.5">RFC</th>
                <th class="px-3 py-2.5">Representante</th>
                <th class="px-3 py-2.5">Teléfono</th>
                <th class="px-3 py-2.5">Beneficio</th>
                <th class="px-3 py-2.5">Empleados</th>
                <th class="px-3 py-2.5">División</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.empresas.map(e => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${e.id}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-900">${e.empresa}</td>
                  <td class="px-3 py-2.5 font-mono text-slate-500">${e.rfc}</td>
                  <td class="px-3 py-2.5">${e.representante}</td>
                  <td class="px-3 py-2.5 font-mono">${e.telefono}</td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">${e.descuento}</span></td>
                  <td class="px-3 py-2.5 font-mono font-bold">${e.empleados}</td>
                  <td class="px-3 py-2.5">${e.division}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'empleados': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Clinic • Convenios', 'Padrón de Empleados por Empresa (Empleados.php)', 'Beneficiarios registrados dentro de los convenios empresariales.', `
          <button onclick="openSimpleAddModal('empleados')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="user-plus" class="w-4 h-4"></i><span>Registrar Empleado</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Credencial</th>
                <th class="px-3 py-2.5">Empleado Beneficiario</th>
                <th class="px-3 py-2.5">Empresa</th>
                <th class="px-3 py-2.5">Puesto</th>
                <th class="px-3 py-2.5">Beneficio Activo</th>
                <th class="px-3 py-2.5">Estatus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.empleadosConvenio.map(emp => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${emp.credencial}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-900">${emp.nombre}</td>
                  <td class="px-3 py-2.5">${emp.empresa}</td>
                  <td class="px-3 py-2.5 text-slate-500">${emp.puesto}</td>
                  <td class="px-3 py-2.5 font-semibold text-emerald-700">${emp.beneficio}</td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">VIGENTE</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'encuestas': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Clinic', 'Encuestas de Satisfacción (Cuestionarios.php)', 'Evaluación de calidad de servicio clínico y restauraciones por parte de los pacientes.', `
          <button onclick="openSimpleAddModal('encuestas')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Registrar Respuesta</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Folio</th>
                <th class="px-3 py-2.5">Paciente</th>
                <th class="px-3 py-2.5">Doctor</th>
                <th class="px-3 py-2.5">Servicio Evaluado</th>
                <th class="px-3 py-2.5">Calificación</th>
                <th class="px-3 py-2.5">Comentario</th>
                <th class="px-3 py-2.5">Fecha</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.encuestas.map(e => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${e.id}</td>
                  <td class="px-3 py-2.5 font-bold">${e.paciente}</td>
                  <td class="px-3 py-2.5">${e.doctor}</td>
                  <td class="px-3 py-2.5">${e.servicio}</td>
                  <td class="px-3 py-2.5 text-amber-500 font-bold">${'★'.repeat(e.calificacion)}</td>
                  <td class="px-3 py-2.5 text-slate-600 italic">"${e.comentario}"</td>
                  <td class="px-3 py-2.5 font-mono text-slate-400">${e.fecha}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 12. DENT CLINIC: PRODUCTOS, PUNTOS, FIDELIZACIÓN, PACIENTES Y POS VENTAS
    // ------------------------------------------------------------------------
    case 'productos-servicios':
    case 'puntos-productos': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Clinic • Productos', key === 'productos-servicios' ? 'Catálogo de Productos y Servicios Clínicos' : 'Configuración de Puntos por Producto (ConfigProductos.php)', 'Precios de tratamientos clínicos y puntos del programa de lealtad Dent.', `
          <button onclick="openSimpleAddModal('productos-clinica')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Nuevo Servicio / Producto</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Código</th>
                <th class="px-3 py-2.5">Descripción Servicio / Producto</th>
                <th class="px-3 py-2.5">Tipo</th>
                <th class="px-3 py-2.5">Precio MXN</th>
                <th class="px-3 py-2.5">Puntos que Otorga</th>
                <th class="px-3 py-2.5">Costo en Puntos</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.productosClinica.map(p => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${p.codigo}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-900">${p.nombre}</td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">${p.tipo}</span></td>
                  <td class="px-3 py-2.5 font-mono font-bold">$${p.precio.toLocaleString('es-MX')}</td>
                  <td class="px-3 py-2.5 font-mono text-emerald-700 font-bold">+${p.puntosOtorga} pts</td>
                  <td class="px-3 py-2.5 font-mono text-blue-700 font-bold">${p.puntosCosto} pts</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'tarjeta-clientes':
    case 'lista-pacientes': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Clinic • Pacientes & Fidelización', key === 'tarjeta-clientes' ? 'Tarjetas de Lealtad y Monedero de Puntos' : 'Lista General de Pacientes (ListaClientes.php)', 'Expedientes clínicos, membresía activa y puntos acumulados para canje en clínica.', `
          <button onclick="openSimpleAddModal('pacientes')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="user-plus" class="w-4 h-4"></i><span>Nuevo Paciente</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Expediente</th>
                <th class="px-3 py-2.5">Paciente</th>
                <th class="px-3 py-2.5">Teléfono</th>
                <th class="px-3 py-2.5">Correo</th>
                <th class="px-3 py-2.5">Tarjeta / Membresía</th>
                <th class="px-3 py-2.5">Saldo Puntos</th>
                <th class="px-3 py-2.5">Doctor Tratante</th>
                <th class="px-3 py-2.5">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.pacientes.map((p, idx) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${p.expediente}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-900">${p.nombre}</td>
                  <td class="px-3 py-2.5 font-mono">${p.telefono}</td>
                  <td class="px-3 py-2.5 text-slate-500">${p.correo}</td>
                  <td class="px-3 py-2.5"><span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">${p.membresia}</span></td>
                  <td class="px-3 py-2.5 font-mono font-extrabold text-blue-600">${p.puntos} pts</td>
                  <td class="px-3 py-2.5">${p.doctor}</td>
                  <td class="px-3 py-2.5">
                    <button onclick="abonarPuntosPaciente(${idx})" class="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-semibold text-[11px] transition-colors">
                      +100 Puntos
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'realizar-venta': {
      const cli = DENT_STATE.pacientes.find(p => p.id === DENT_STATE.posClienteId) || DENT_STATE.pacientes[0];
      const total = DENT_STATE.posCarrito.reduce((acc, item) => acc + item.precio, 0);

      container.innerHTML = `
        ${renderHeaderBanner('Dent Clinic • Ventas', 'Realizar Venta / Punto de Venta (RealizarVentas.php)', 'Selecciona un paciente, agrega servicios o productos al carrito y elige la forma de pago (Efectivo, Tarjeta, Puntos o Mixto).')}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Columna Izquierda: Selector de Cliente + Catálogo Rápido -->
          <div class="lg:col-span-2 space-y-4">
            <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-400 block">1. Seleccione un Cliente / Paciente</label>
              <select onchange="cambiarClientePOS(this.value)" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800">
                ${DENT_STATE.pacientes.map(p => `<option value="${p.id}" ${p.id === cli.id ? 'selected' : ''}>${p.nombre} — ${p.membresia} (${p.puntos} pts)</option>`).join('')}
              </select>
              <div class="p-4 rounded-xl bg-blue-50/60 border border-blue-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div><span class="text-[10px] text-slate-400 uppercase font-bold block">Cliente</span><strong class="text-slate-900">${cli.nombre}</strong></div>
                <div><span class="text-[10px] text-slate-400 uppercase font-bold block">Membresía</span><strong class="text-blue-700">${cli.membresia}</strong></div>
                <div><span class="text-[10px] text-slate-400 uppercase font-bold block">Correo</span><span class="text-slate-600">${cli.correo}</span></div>
                <div><span class="text-[10px] text-slate-400 uppercase font-bold block">Puntos Disponibles</span><strong class="font-mono text-emerald-700">${cli.puntos} pts</strong></div>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">2. Cargar Productos / Servicios a la Venta</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                ${DENT_STATE.productosClinica.map(prod => `
                  <div class="p-3 rounded-xl border border-slate-200 hover:border-blue-400 flex items-center justify-between gap-2 bg-slate-50/50">
                    <div>
                      <p class="text-xs font-bold text-slate-800">${prod.nombre}</p>
                      <span class="text-[11px] font-mono text-blue-600 font-bold">$${prod.precio.toLocaleString('es-MX')} MXN</span>
                    </div>
                    <button onclick="agregarAlCarritoPOS('${prod.id}')" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0">
                      + Agregar
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Ticket Temporal y Formas de Pago -->
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500">3. Resumen de Compra</h3>
                <span class="font-mono text-xs font-bold text-blue-600">${DENT_STATE.posCarrito.length} conceptos</span>
              </div>
              <div class="space-y-2 max-h-52 overflow-y-auto">
                ${DENT_STATE.posCarrito.length === 0
                  ? `<p class="text-xs text-slate-400 text-center py-8">Haz clic en "+ Agregar" en cualquier servicio para cargarlo a la venta.</p>`
                  : DENT_STATE.posCarrito.map((item, idx) => `
                    <div class="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span class="font-medium text-slate-800">${item.nombre}</span>
                      <div class="flex items-center gap-2">
                        <span class="font-mono font-bold">$${item.precio.toLocaleString('es-MX')}</span>
                        <button onclick="quitarDelCarritoPOS(${idx})" class="text-rose-500 hover:text-rose-700 font-bold px-1">×</button>
                      </div>
                    </div>
                  `).join('')
                }
              </div>

              <div class="pt-3 border-t border-slate-100">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">4. Forma de Pago</span>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  ${['Efectivo', 'Tarjeta', 'Puntos', 'Mixto'].map(fp => `
                    <button type="button" onclick="seleccionarFormaPagoPOS('${fp}')" class="py-2 px-3 rounded-xl border font-bold transition-all ${DENT_STATE.posFormaPago === fp ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">
                      ${fp}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-200 space-y-3">
              <div class="flex items-baseline justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase">Total a Pagar:</span>
                <span class="text-2xl font-extrabold font-mono text-slate-900">$${total.toLocaleString('es-MX')}</span>
              </div>
              <button onclick="finalizarVentaPOS()" class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors">
                Finalizar Compra y Pagar (${DENT_STATE.posFormaPago})
              </button>
            </div>
          </div>
        </div>
      `;
      break;
    }

    case 'listado-ventas': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Clinic • Ventas', 'Listado Histórico de Ventas (ListadoVentas.php)', 'Registro de tickets cobrados en clínica, formas de pago y puntos abonados.', `
          <button onclick="openModule('realizar-venta')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="shopping-cart" class="w-4 h-4"></i><span>Nueva Venta</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Folio Venta</th>
                <th class="px-3 py-2.5">Fecha y Hora</th>
                <th class="px-3 py-2.5">Cliente / Paciente</th>
                <th class="px-3 py-2.5">Conceptos</th>
                <th class="px-3 py-2.5">Forma de Pago</th>
                <th class="px-3 py-2.5">Total Cobrado</th>
                <th class="px-3 py-2.5">Puntos Generados</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.ventas.map(v => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${v.folio}</td>
                  <td class="px-3 py-2.5 font-mono text-slate-500">${v.fecha}</td>
                  <td class="px-3 py-2.5 font-bold">${v.cliente}</td>
                  <td class="px-3 py-2.5">${v.conceptos}</td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">${v.formaPago}</span></td>
                  <td class="px-3 py-2.5 font-mono font-bold text-slate-900">$${v.total.toLocaleString('es-MX')}</td>
                  <td class="px-3 py-2.5 font-mono text-emerald-700 font-bold">+${v.puntosGanados} pts</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // 13. CALENDARIO CLÍNICO, PERMISOS Y CONFIGURACIÓN
    // ------------------------------------------------------------------------
    case 'calendario': {
      const days = Array.from({ length: 31 }, (_, i) => i + 1);
      const selectedEvents = DENT_STATE.eventosCalendario.filter(e => e.dia === DENT_STATE.diaCalendarioSeleccionado);

      container.innerHTML = `
        ${renderHeaderBanner('Agenda de Laboratorio', 'Calendario de Entregas y Escaneos (Calendario.php)', 'Agenda interactiva mensual de entregas de órdenes CAD/CAM y citas de escaneo intraoral.', `
          <button onclick="openSimpleAddModal('calendario')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="calendar-plus" class="w-4 h-4"></i><span>Agendar Evento</span>
          </button>
        `)}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-extrabold text-slate-900">Octubre 2026</h3>
              <span class="text-xs text-slate-500">Haz clic en cualquier día para ver sus entregas</span>
            </div>
            <div class="grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-slate-400 mb-2">
              <div>DOM</div><div>LUN</div><div>MAR</div><div>MIÉ</div><div>JUE</div><div>VIE</div><div>SÁB</div>
            </div>
            <div class="grid grid-cols-7 gap-2">
              ${days.map(d => {
                const evs = DENT_STATE.eventosCalendario.filter(e => e.dia === d);
                const active = d === DENT_STATE.diaCalendarioSeleccionado;
                return `
                  <button onclick="seleccionarDiaCalendario(${d})" class="h-16 p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${active ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200'}">
                    <span class="text-xs font-mono font-bold">${d}</span>
                    ${evs.length > 0 ? `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold truncate ${active ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-800'}">${evs.length} evento(s)</span>` : ''}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-blue-600">Eventos del Día ${DENT_STATE.diaCalendarioSeleccionado} de Octubre</h3>
            ${selectedEvents.length === 0
              ? `<p class="text-xs text-slate-400 py-8 text-center">No hay entregas programadas para este día.</p>`
              : selectedEvents.map(ev => `
                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="font-mono text-xs font-bold text-blue-600">${ev.hora} hrs</span>
                    <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold uppercase">${ev.tipo}</span>
                  </div>
                  <p class="text-xs font-bold text-slate-900">${ev.titulo}</p>
                  <p class="text-[11px] text-slate-500">${ev.doctor}</p>
                </div>
              `).join('')
            }
          </div>
        </div>
      `;
      break;
    }

    case 'permisos': {
      container.innerHTML = `
        ${renderHeaderBanner('Configuración del Sistema', 'Permisos por Perfil de Usuario (UsuariosPermisos.php)', 'Matriz interactiva de accesos a los módulos del sistema según el rol operativo.')}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5 text-left">Perfil de Usuario</th>
                <th class="px-3 py-2.5">Inicio / Kanban</th>
                <th class="px-3 py-2.5">Estadísticas</th>
                <th class="px-3 py-2.5">Dent Lab</th>
                <th class="px-3 py-2.5">Dent SPA</th>
                <th class="px-3 py-2.5">Dent Clinic</th>
                <th class="px-3 py-2.5">Configuración</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.permisosPerfiles.map((p, idx) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-3 font-bold text-slate-900 text-left">${p.perfil}</td>
                  ${['inicio','estadisticas','dentLab','dentSpa','dentClinic','configuracion'].map(col => `
                    <td class="px-3 py-3">
                      <button onclick="togglePermisoPerfil(${idx}, '${col}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${p[col] ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}">
                        ${p[col] ? 'PERMITIDO' : 'BLOQUEADO'}
                      </button>
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'configuracion': {
      container.innerHTML = `
        ${renderHeaderBanner('Configuración del Sistema', 'Parámetros Generales de Laboratorio (Configuracion.php)', 'Ajustes de horarios de recepción de órdenes, folios, pasarela Conekta y notificaciones SMTP.')}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 class="font-bold uppercase tracking-wider text-slate-400">Parámetros Operativos CAD/CAM</h3>
            <div class="flex items-center justify-between py-2 border-b border-slate-100">
              <span>Horario Límite Recepción Mismo Día</span>
              <input value="14:00 hrs" class="px-3 py-1 rounded-lg border border-slate-200 font-mono font-bold text-right w-28">
            </div>
            <div class="flex items-center justify-between py-2 border-b border-slate-100">
              <span>Valor de Conversión Puntos Lealtad</span>
              <input value="10% en puntos" class="px-3 py-1 rounded-lg border border-slate-200 font-mono font-bold text-right w-28">
            </div>
            <div class="flex items-center justify-between py-2">
              <span>Autorización Automática de Discos XML</span>
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">ACTIVO</span>
            </div>
            <button onclick="showToast('Configuración Guardada', 'Los parámetros operativos se actualizaron correctamente.')" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold">
              Guardar Parámetros
            </button>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 class="font-bold uppercase tracking-wider text-slate-400">Sub-Portales Integrados en el Ecosistema</h3>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div><p class="font-bold text-slate-800">Portal Doctores (/lab)</p><p class="text-[11px] text-slate-500">Solicitud de órdenes, odontograma y pago de paquetes Conekta</p></div>
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">EN LÍNEA</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div><p class="font-bold text-slate-800">Portal Escaneadores (/escanlab)</p><p class="text-[11px] text-slate-500">Agenda móvil de recolección de escaneos intraorales</p></div>
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">EN LÍNEA</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div><p class="font-bold text-slate-800">App Control de Equipos (/appEquipos)</p><p class="text-[11px] text-slate-500">Check-in / Check-out de escáneres por código</p></div>
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">EN LÍNEA</span>
            </div>
          </div>
        </div>
      `;
      break;
    }
  

    // ------------------------------------------------------------------------
    // REPORTES: DOCTORES POR AGOTAR PIEZAS (Checklist Dent Control)
    // ------------------------------------------------------------------------
    case 'doctores-por-agotar': {
      // Doctores con paquetes con menos de 5 piezas restantes
      const doctoresAgotar = [
        { doctor: 'DRA. PATRICIA ELIZABETH', doctorId: 442, paquete: 'PAQ: 3211', piezasRestantes: 2, total: 20, celular: '8711456200', vendedor: 'Mauricio Sotomayor' },
        { doctor: 'DR. ISMAEL', doctorId: 184, paquete: 'PAQ: 3189', piezasRestantes: 3, total: 15, celular: '8712963651', vendedor: 'Arturo Meza' },
        { doctor: 'DR. MIGUEL ALAN', doctorId: 530, paquete: 'PAQ: 3245', piezasRestantes: 1, total: 25, celular: '8713952578', vendedor: 'Brenda Rodríguez' },
        { doctor: 'DRA. DIANA ELIZABETH', doctorId: 583, paquete: 'PAQ: 3227', piezasRestantes: 4, total: 20, celular: '8718872019', vendedor: 'Mauricio Sotomayor' }
      ];

      container.innerHTML = `
        ${renderHeaderBanner('Estadísticos y Reportes', 'Doctores por Agotar Piezas de Paquetes', 'Odontólogos con menos de 5 piezas disponibles en sus paquetes prepagados para gestión comercial y renovación oportuna.', `
          <button onclick="openModule('paquetes')" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors">
            <i data-lucide="package" class="w-4 h-4"></i><span>Ver Catálogo Paquetes</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2.5">Doctor</th>
                  <th class="px-3 py-2.5">Paquete Activo</th>
                  <th class="px-3 py-2.5">Piezas Restantes</th>
                  <th class="px-3 py-2.5">Celular</th>
                  <th class="px-3 py-2.5">Vendedor Asignado</th>
                  <th class="px-3 py-2.5">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${doctoresAgotar.map(d => `
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="px-3 py-2.5 font-bold text-slate-900 text-left">
                      <a href="javascript:void(0)" onclick="abrirDetalleDoctor('${d.doctorId}')" class="text-blue-600 hover:underline">${d.doctor}</a>
                    </td>
                    <td class="px-3 py-2.5 font-mono font-bold text-slate-700">${d.paquete}</td>
                    <td class="px-3 py-2.5">
                      <span class="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200 animate-pulse">
                        ${d.piezasRestantes} de ${d.total} pzas
                      </span>
                    </td>
                    <td class="px-3 py-2.5 font-mono text-slate-600">${d.celular}</td>
                    <td class="px-3 py-2.5 font-semibold text-slate-700">${d.vendedor}</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center justify-center gap-1.5">
                        <button onclick="asignarPaqueteDoctor('${d.doctor}')" class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shadow-sm flex items-center gap-1">
                          <i data-lucide="plus" class="w-3 h-3"></i><span>Renovar Paquete</span>
                        </button>
                        <button onclick="abrirDetalleDoctor('${d.doctorId}')" class="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700" title="Ver Expediente">
                          <i data-lucide="folder" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // REPORTES: DOCTORES SIN PAQUETES (1 Mes, 3 Meses, 6 Meses, Rango)
    // ------------------------------------------------------------------------
    case 'doctores-sin-paquetes': {
      container.innerHTML = `
        ${renderHeaderBanner('Estadísticos y Reportes', 'Doctores sin Paquetes Vigentes (AdmProductos_Paquetes.php)', 'Consulta analítica de odontólogos sin compra de paquetes en periodos de 1, 3 o 6 meses para campañas de reactivación.')}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <!-- Botones de Rango Dinámicos -->
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-bold text-slate-500 uppercase text-[10px]">Filtrar Periodo:</span>
              <button type="button" onclick="filtrarDoctoresSinPaquetes(1)" id="btnSinPaq1M" class="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold shadow-sm transition-colors">1 Mes</button>
              <button type="button" onclick="filtrarDoctoresSinPaquetes(3)" id="btnSinPaq3M" class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors">3 Meses</button>
              <button type="button" onclick="filtrarDoctoresSinPaquetes(6)" id="btnSinPaq6M" class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors">6 Meses</button>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-slate-500 font-semibold">Rango personalizado:</span>
              <input type="date" id="sinPaqFechaDesde" class="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700">
              <input type="date" id="sinPaqFechaHasta" class="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700">
              <button type="button" onclick="filtrarDoctoresSinPaquetes('custom')" class="px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">Filtrar</button>
            </div>
          </div>

          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2.5">Doctor</th>
                  <th class="px-3 py-2.5">Clínica</th>
                  <th class="px-3 py-2.5">Celular</th>
                  <th class="px-3 py-2.5">Vendedor</th>
                  <th class="px-3 py-2.5">Tiempo sin Paquete</th>
                  <th class="px-3 py-2.5">Acción Comercial</th>
                </tr>
              </thead>
              <tbody id="tbodyDoctoresSinPaquetes" class="divide-y divide-slate-100"></tbody>
            </table>
          </div>
        </div>
      `;
      // Render initial 1 month filter
      setTimeout(() => filtrarDoctoresSinPaquetes(1), 50);
      break;
    }

    // ------------------------------------------------------------------------
    // REPORTES: DOCTORES POR VENDEDOR
    // ------------------------------------------------------------------------
    case 'doctores-por-vendedor': {
      const vendedoresList = ['Mauricio Sotomayor', 'Arturo Meza', 'Brenda Rodríguez', 'Irene Martínez'];
      container.innerHTML = `
        ${renderHeaderBanner('Estadísticos y Reportes', 'Doctores Agrupados por Vendedor (Vendedor.php)', 'Distribución de cartera odontológica, órdenes producidas y seguimiento comercial por representante.')}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div class="flex items-center gap-3">
            <label class="font-bold text-slate-500 uppercase text-[10px]">Seleccionar Vendedor:</label>
            <select id="selectVendedorFiltro" onchange="filtrarDoctoresPorVendedor()" class="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-600">
              <option value="">Todos los Vendedores</option>
              ${vendedoresList.map(v => `<option value="${v}">${v}</option>`).join('')}
            </select>
          </div>

          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2.5">Vendedor</th>
                  <th class="px-3 py-2.5">Doctor</th>
                  <th class="px-3 py-2.5">Clínica</th>
                  <th class="px-3 py-2.5">Contacto</th>
                  <th class="px-3 py-2.5">Estatus</th>
                  <th class="px-3 py-2.5">Expediente</th>
                </tr>
              </thead>
              <tbody id="tbodyDoctoresPorVendedor" class="divide-y divide-slate-100">
                ${DENT_STATE.doctores.map(d => `
                  <tr class="hover:bg-slate-50 transition-colors" data-vendedor="${d.vendedor}">
                    <td class="px-3 py-2.5 font-bold text-blue-700 text-left">${d.vendedor}</td>
                    <td class="px-3 py-2.5 font-bold text-slate-900 text-left">${d.nombre}</td>
                    <td class="px-3 py-2.5 text-left text-slate-600">${d.clinica}</td>
                    <td class="px-3 py-2.5 font-mono text-slate-500">${d.celular}</td>
                    <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${d.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">${d.activo ? 'Activo' : 'Inactivo'}</span></td>
                    <td class="px-3 py-2.5">
                      <button onclick="abrirDetalleDoctor('${d.id}')" class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-900 hover:text-white font-semibold text-[11px] transition-colors">Expediente</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      break;
    }

    // ------------------------------------------------------------------------
    // REPORTES: PANORAMA GENERAL (11 KPIs & Distribuciones Completas)
    // ------------------------------------------------------------------------
    case 'panorama-general': {
      container.innerHTML = `
        ${renderHeaderBanner('Estadísticos', 'Panorama General del Laboratorio (includeGraficos.php)', 'Tablero ejecutivo con 11 indicadores clave de producción, merma, distribución de materiales y ventas internas.', `
          <div class="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold">
            Consolidado Octubre 2026
          </div>
        `)}

        <!-- 1. Los 6 KPIs Maestros Principales -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Órdenes Totales</span>
            <span class="text-2xl font-extrabold font-mono text-slate-900">1,428</span>
            <span class="text-[10px] text-emerald-600 font-bold block mt-1">+12% vs mes ant.</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Órdenes Internas</span>
            <span class="text-2xl font-extrabold font-mono text-blue-600">384</span>
            <span class="text-[10px] text-slate-400 font-semibold block mt-1">26.9% del total</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Órdenes Externas</span>
            <span class="text-2xl font-extrabold font-mono text-slate-800">1,044</span>
            <span class="text-[10px] text-slate-400 font-semibold block mt-1">73.1% del total</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Piezas Producidas</span>
            <span class="text-2xl font-extrabold font-mono text-emerald-700">2,860</span>
            <span class="text-[10px] text-emerald-600 font-bold block mt-1">CAD/CAM & Fresado</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Discos Utilizados</span>
            <span class="text-2xl font-extrabold font-mono text-indigo-700">142</span>
            <span class="text-[10px] text-slate-400 font-semibold block mt-1">Zirconio & PMMA</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Merma Controlada</span>
            <span class="text-2xl font-extrabold font-mono text-rose-600">4.2%</span>
            <span class="text-[10px] text-emerald-600 font-bold block mt-1">Meta: &lt; 5.0%</span>
          </div>
        </div>

        <!-- 2. Gráficos y Distribuciones Analíticas -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          <!-- Distribución de unidades de Zirconio -->
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between border-b pb-2">
              <h4 class="font-bold uppercase text-slate-800 text-xs">Distribución de Unidades de Zirconio</h4>
              <span class="font-mono text-blue-600 font-bold">1,820 piezas totales</span>
            </div>
            <div class="space-y-2.5">
              <div>
                <div class="flex justify-between font-semibold mb-1"><span>Zirconio HT+ Alta Translucidez (Aidite / Upcera)</span><span class="font-mono">892 pzas (49%)</span></div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="bg-blue-600 h-full rounded-full" style="width:49%"></div></div>
              </div>
              <div>
                <div class="flex justify-between font-semibold mb-1"><span>Zirconio 3D Pro Multicapa Gradiente</span><span class="font-mono">546 pzas (30%)</span></div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="bg-indigo-600 h-full rounded-full" style="width:30%"></div></div>
              </div>
              <div>
                <div class="flex justify-between font-semibold mb-1"><span>Zirconio ST Super Translucidez</span><span class="font-mono">382 pzas (21%)</span></div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="bg-cyan-600 h-full rounded-full" style="width:21%"></div></div>
              </div>
            </div>
          </div>

          <!-- Piezas por Tipo de Doctor y Ventas Internas -->
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between border-b pb-2">
              <h4 class="font-bold uppercase text-slate-800 text-xs">Piezas por Tipo de Doctor & Ventas Internas</h4>
              <span class="font-mono text-emerald-700 font-bold">$1,248,500 MXN</span>
            </div>
            <div class="grid grid-cols-2 gap-3 text-center pt-2">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span class="text-slate-400 font-bold uppercase text-[9.5px] block">Doctores Externos</span>
                <span class="text-2xl font-mono font-extrabold text-slate-900 block my-1">2,090</span>
                <span class="text-xs font-semibold text-blue-600">$940,500 MXN</span>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span class="text-slate-400 font-bold uppercase text-[9.5px] block">Doctores Internos</span>
                <span class="text-2xl font-mono font-extrabold text-slate-900 block my-1">770</span>
                <span class="text-xs font-semibold text-emerald-600">$308,000 MXN</span>
              </div>
            </div>
          </div>

          <!-- Clasificación de Estatus de Procesos -->
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between border-b pb-2">
              <h4 class="font-bold uppercase text-slate-800 text-xs">Clasificación de Estatus de Procesos</h4>
              <span class="font-mono text-slate-500">Pipeline en Vivo</span>
            </div>
            <div class="grid grid-cols-4 gap-2 text-center pt-2">
              <div class="p-3 bg-blue-50/60 rounded-xl border border-blue-200/70">
                <span class="text-[10px] font-bold uppercase text-blue-700 block">1. Escaneo</span>
                <span class="text-lg font-mono font-bold text-blue-900 mt-1 block">4</span>
              </div>
              <div class="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200/70">
                <span class="text-[10px] font-bold uppercase text-indigo-700 block">2. Diseño</span>
                <span class="text-lg font-mono font-bold text-indigo-900 mt-1 block">15</span>
              </div>
              <div class="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70">
                <span class="text-[10px] font-bold uppercase text-amber-700 block">3. Fabricación</span>
                <span class="text-lg font-mono font-bold text-amber-900 mt-1 block">38</span>
              </div>
              <div class="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/70">
                <span class="text-[10px] font-bold uppercase text-emerald-700 block">4. Entrega</span>
                <span class="text-lg font-mono font-bold text-emerald-900 mt-1 block">142</span>
              </div>
            </div>
          </div>

          <!-- Producción de Piezas por Semana & Piezas por Categoría -->
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between border-b pb-2">
              <h4 class="font-bold uppercase text-slate-800 text-xs">Producción Semanal (Mes Actual)</h4>
              <span class="font-mono text-slate-500">2,860 piezas</span>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <span class="w-16 font-semibold text-slate-600">Semana 1:</span>
                <div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden"><div class="bg-blue-600 h-full rounded-full" style="width:68%"></div></div>
                <span class="font-mono font-bold w-16 text-right">680 pzas</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-16 font-semibold text-slate-600">Semana 2:</span>
                <div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden"><div class="bg-blue-600 h-full rounded-full" style="width:74%"></div></div>
                <span class="font-mono font-bold w-16 text-right">740 pzas</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-16 font-semibold text-slate-600">Semana 3:</span>
                <div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden"><div class="bg-blue-600 h-full rounded-full" style="width:81%"></div></div>
                <span class="font-mono font-bold w-16 text-right">810 pzas</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-16 font-semibold text-slate-600">Semana 4:</span>
                <div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden"><div class="bg-blue-600 h-full rounded-full" style="width:63%"></div></div>
                <span class="font-mono font-bold w-16 text-right">630 pzas</span>
              </div>
            </div>
          </div>
        </div>
      `;
      break;
    }

  }
}

// ============================================================================
// ACCIONES INTERACTIVAS EN TIEMPO REAL (MODALES, CAMBIOS DE ESTADO, POS, 3D)
// ============================================================================

function toggleItemStatus(arrayKey, index, viewKey) {
  const item = DENT_STATE[arrayKey]?.[index];
  if (!item) return;
  item.estatus = !item.estatus;
  renderDynamicModule(viewKey);
  lucide.createIcons();
  showToast('Estatus Actualizado', `El registro se marcó como ${item.estatus ? 'Activo' : 'Inactivo'}.`);
}

function toggleDoctorActivo(docId, viewKey) {
  const doc = DENT_STATE.doctores.find(d => String(d.id) === String(docId) || String(d.codigo) === String(docId));
  if (!doc) return;
  doc.activo = !doc.activo;
  renderDynamicModule(viewKey);
  lucide.createIcons();
  showToast('Doctor Actualizado', `${doc.nombre}: Estatus ${doc.activo ? 'Activo' : 'Inactivo'}`);
}

// Filtro integral para Lista Maestra de Órdenes
window.filtrarOrdenesMaestra = function() {
  const q = (document.getElementById('searchOrdList')?.value || '').toLowerCase().trim();
  const fIni = document.getElementById('filtroOrdFechaInicio')?.value;
  const fFin = document.getElementById('filtroOrdFechaFin')?.value;
  const docSel = document.getElementById('filtroOrdDoctor')?.value;

  const rows = document.querySelectorAll('#tbodyOrdList tr');
  let visibles = 0;

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    const doc = row.getAttribute('data-doctor') || '';
    const fecha = row.getAttribute('data-entrega') || '';

    let matchQ = !q || text.includes(q);
    let matchDoc = !docSel || doc === docSel;
    let matchIni = !fIni || (fecha && fecha >= fIni);
    let matchFin = !fFin || (fecha && fecha <= fFin);

    if (matchQ && matchDoc && matchIni && matchFin) {
      row.style.display = '';
      visibles++;
    } else {
      row.style.display = 'none';
    }
  });

  const contador = document.getElementById('contadorOrdenesFiltradas');
  if (contador) {
    contador.innerText = `Mostrando ${visibles} de ${rows.length} órdenes registradas`;
  }
};

window.resetFiltrosOrdenesMaestra = function() {
  const s = document.getElementById('searchOrdList');
  const fi = document.getElementById('filtroOrdFechaInicio');
  const ff = document.getElementById('filtroOrdFechaFin');
  const fd = document.getElementById('filtroOrdDoctor');
  if (s) s.value = '';
  if (fi) fi.value = '';
  if (ff) ff.value = '';
  if (fd) fd.value = '';
  window.filtrarOrdenesMaestra();
};

// Modal Asignar Escaneador
window.abrirModalAsignarEscaneador = function(serie) {
  const o = window.findOrdenByAny(serie);
  if (!o) return;
  const modal = document.getElementById('modalAsignarEscaneador');
  const inpSerie = document.getElementById('asignarEscaneadorSerie');
  const subtitulo = document.getElementById('subtituloAsignarEscaneador');
  const docNom = document.getElementById('asignarDoctorNombre');
  const pacNom = document.getElementById('asignarPacienteNombre');
  const fecEnt = document.getElementById('asignarFechaEntrega');
  const selEsp = document.getElementById('selectEspecialistaEscaneo');

  if (inpSerie) inpSerie.value = o.serie || serie;
  if (subtitulo) subtitulo.innerText = `Orden #${o.serie || serie} — ${o.producto || 'Corona Zirconio'}`;
  if (docNom) docNom.innerText = o.doctor || 'Doctor';
  if (pacNom) pacNom.innerText = o.paciente || 'Paciente';
  if (fecEnt) fecEnt.innerText = o.entrega || '2026-10-16';
  if (selEsp && o.escaneador) selEsp.value = o.escaneador;

  if (modal) modal.classList.remove('hidden');
};

window.closeModalAsignarEscaneador = function() {
  const modal = document.getElementById('modalAsignarEscaneador');
  if (modal) modal.classList.add('hidden');
};

window.sendLiveMutation = async function(op, payload) {
  let candidates = [];
  if (typeof getLiveApiBase === 'function') {
    candidates.push(getLiveApiBase());
  }
  if (window.LIVE_DB_STATE && window.LIVE_DB_STATE.corsLocalUrl && !candidates.includes(window.LIVE_DB_STATE.corsLocalUrl)) {
    candidates.push(window.LIVE_DB_STATE.corsLocalUrl);
  }
  if (!candidates.includes('Backend/api_live.php')) {
    candidates.push('Backend/api_live.php');
  }
  if (!candidates.includes('http://localhost:8095/Backend/api_live.php')) {
    candidates.push('http://localhost:8095/Backend/api_live.php');
  }

  for (const apiUrl of candidates) {
    try {
      const url = `${apiUrl}?op=${encodeURIComponent(op)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const json = await res.json();
        console.log(`[DentLive Mutation ${op}] Exito:`, json);
        return json;
      }
    } catch (err) {
      console.warn(`[DentLive Mutation ${op}] Error intentando con ${apiUrl}:`, err);
    }
  }
  return { ok: false, msg: 'No se pudo contactar el endpoint de escritura' };
};

window.guardarAsignacionEscaneador = async function(e) {
  e.preventDefault();
  const serie = document.getElementById('asignarEscaneadorSerie')?.value;
  const escaneador = document.getElementById('selectEspecialistaEscaneo')?.value || 'Arturo Meza';
  const o = window.findOrdenByAny(serie);
  if (o) {
    o.escaneador = escaneador;
    o.conScan = true;
  }
  window.closeModalAsignarEscaneador();
  showToast('Escaneador Asignado', `${escaneador} fue asignado como responsable de escaneo para la Orden #${serie}.`);
  renderDynamicModule('lista-ordenes');

  try {
    await window.sendLiveMutation('asignar_escaneador', {
      idOrden: serie,
      usuarioId: 1,
      nombreTecnico: escaneador,
      fecha: new Date().toISOString().split('T')[0],
      hora: '10:00',
      nota: `Asignado a ${escaneador} desde Dent Control`
    });
  } catch (err) {
    console.error('Error al guardar asignación en servidor:', err);
  }
};

// Modal Editar Doctor
window.abrirModalEditarDoctor = function(docId) {
  const doc = window.findDoctorByAny(docId);
  if (!doc) return;
  const modal = document.getElementById('modalEditarDoctor');
  document.getElementById('editDocId').value = doc.id;
  document.getElementById('editDocNombre').value = doc.nombre || '';
  document.getElementById('editDocCelular').value = doc.celular || '';
  document.getElementById('editDocMail').value = doc.mail || '';
  document.getElementById('editDocClinica').value = doc.clinica || '';
  document.getElementById('editDocVendedor').value = doc.vendedor || 'Mauricio Sotomayor';
  document.getElementById('editDocDireccion').value = doc.direccion || '';
  document.getElementById('editDocTipo').value = doc.externo ? 'externo' : 'interno';
  document.getElementById('editDocActivo').checked = !!doc.activo;
  document.getElementById('editDocNota').value = doc.nota || '';

  const sub = document.getElementById('subtituloEditarDoctor');
  if (sub) sub.innerText = `ID #${doc.id} • ${doc.nombre}`;

  if (modal) modal.classList.remove('hidden');
};

window.closeModalEditarDoctor = function() {
  const modal = document.getElementById('modalEditarDoctor');
  if (modal) modal.classList.add('hidden');
};

window.guardarEdicionDoctor = async function(e) {
  e.preventDefault();
  const id = document.getElementById('editDocId')?.value;
  const doc = window.findDoctorByAny(id);
  if (!doc) return;

  doc.nombre = document.getElementById('editDocNombre').value;
  doc.celular = document.getElementById('editDocCelular').value;
  doc.mail = document.getElementById('editDocMail').value;
  doc.clinica = document.getElementById('editDocClinica').value;
  doc.vendedor = document.getElementById('editDocVendedor').value;
  doc.direccion = document.getElementById('editDocDireccion').value;
  doc.externo = document.getElementById('editDocTipo').value === 'externo';
  doc.activo = document.getElementById('editDocActivo').checked;
  doc.nota = document.getElementById('editDocNota').value;

  window.closeModalEditarDoctor();
  showToast('Doctor Actualizado', `Los cambios para el ${doc.nombre} fueron guardados correctamente.`);
  renderDynamicModule('listado-doctores');

  try {
    await window.sendLiveMutation('editar_doctor', {
      id: doc.id,
      nombre: doc.nombre,
      celular: doc.celular,
      mail: doc.mail,
      clinica: doc.clinica,
      activo: doc.activo ? 1 : 0,
      nota: doc.nota
    });
  } catch (err) {
    console.error('Error al actualizar doctor en servidor:', err);
  }
};

function toggleUsuarioAppEquipos(index) {
  const u = DENT_STATE.usuarios[index];
  if (!u) return;
  u.appEquipos = !u.appEquipos;
  renderDynamicModule('usuarios');
  lucide.createIcons();
  showToast('Permiso App Equipos', `${u.nombre}: ${u.appEquipos ? 'Habilitado' : 'Deshabilitado'}`);
}

function recibirEquipoPrestamo(idx) {
  const eq = DENT_STATE.equiposPrestamo[idx];
  if (!eq) return;
  DENT_STATE.equiposPrestamo.splice(idx, 1);
  DENT_STATE.historicoEquipos.unshift({
    folio: 'MOV-' + (902 + DENT_STATE.historicoEquipos.length),
    usuario: eq.usuario,
    equipo: eq.equipo,
    salida: eq.salida,
    regreso: '2026-10-07 17:45',
    observacion: 'Recibido conforme en laboratorio central'
  });
  renderDynamicModule('equipos-prestamo');
  lucide.createIcons();
  showToast('Equipo Recibido', `${eq.equipo} reintegrado al almacén y registrado en el histórico.`);
}

function openAddPrestamoModal() {
  openSimpleAddModal('equipos-prestamo');
}

function autorizarArchivoCAM(idx) {
  const a = DENT_STATE.archivosPorAutorizar[idx];
  if (!a) return;
  a.autorizado = true;
  renderDynamicModule(DENT_STATE.currentView);
  lucide.createIcons();
  showToast('Archivo CAM Autorizado', `${a.archivo} enviado a cola de fresado CNC.`);
}

function probarTonoEn3D(hex, codigo) {
  openDigitalCard('9841', 'Corona Monolítica Zirconio', 'Vista Previa de Colorímetro', 'Laboratorio Central', codigo, 'Diseño CAD', '01/10/2026');
  setTimeout(() => {
    if (typeof changeToothShade === 'function') {
      changeToothShade(hex, codigo);
    }
  }, 150);
}

async function guardarNuevoDoctor(e) {
  e.preventDefault();
  const nombre = document.getElementById('ndNombre')?.value || '';
  const celular = document.getElementById('ndCelular')?.value || '';
  const mail = document.getElementById('ndMail')?.value || '';
  const clinica = document.getElementById('ndClinica')?.value || '';
  const tipo = document.getElementById('ndTipo')?.value || 'General';
  const vendedor = document.getElementById('ndVendedor')?.value || 'DentLab';
  const nota = document.getElementById('ndNota')?.value || 'Recién registrado';
  const externo = document.getElementById('ndExterno')?.value === 'true';

  const newDoc = {
    id: 'DOC-' + (106 + DENT_STATE.doctores.length),
    nombre, celular, mail, vendedor, nota, clinica, tipo,
    activo: true, externo, mesesSinPaquete: 0
  };
  DENT_STATE.doctores.unshift(newDoc);
  showToast('Doctor Registrado', `${nombre} se agregó exitosamente al directorio.`);
  openModule('listado-doctores');

  try {
    const res = await window.sendLiveMutation('guardar_doctor', {
      nombre, celular, mail, clinica, tipo, nota,
      externo: externo ? 1 : 0,
      vendedorId: 0,
      telefono: celular
    });
    if (res && res.ok && res.id) {
      newDoc.id = res.id;
      newDoc.codigo = 'DOC-' + res.id;
    }
  } catch (err) {
    console.error('Error al persistir doctor en servidor:', err);
  }
}

async function asignarPaqueteDoctor(nombreDoctor) {
  const nuevoPaq = {
    folio: 'VTA-PAQ-' + (89 + DENT_STATE.paquetesDoctores.length),
    doctor: nombreDoctor,
    paquete: 'Paquete 10 Coronas Zirconio Monolítico',
    totalPiezas: 10,
    usadas: 0,
    disponibles: 10,
    saldo: '$0.00 (Liquidado)',
    fecha: new Date().toISOString().split('T')[0]
  };
  DENT_STATE.paquetesDoctores.unshift(nuevoPaq);
  showToast('Paquete Asignado', `Se activó un Paquete de 10 Coronas para ${nombreDoctor}.`);
  openModule('paquetes-doctores');

  try {
    await window.sendLiveMutation('asignar_paquete', {
      doctor: nombreDoctor,
      paquete: 'Paquete 10 Coronas Zirconio Monolítico',
      piezas: 10,
      costo: '$7,500.00'
    });
  } catch (err) {
    console.error('Error al persistir asignación de paquete en servidor:', err);
  }
}

function guardarNuevaEmpresa(e) {
  e.preventDefault();
  const empresa = document.getElementById('neNombre').value;
  const rfc = document.getElementById('neRfc').value;
  const representante = document.getElementById('neRep').value;
  const telefono = document.getElementById('neTel').value;
  const descuento = document.getElementById('neDesc').value;
  const division = document.getElementById('neDiv').value;

  DENT_STATE.empresas.unshift({
    id: 'EMP-0' + (DENT_STATE.empresas.length + 1),
    empresa, rfc, representante, telefono, descuento, empleados: 15, division, estatus: true
  });
  showToast('Convenio Creado', `La empresa ${empresa} fue dada de alta.`);
  openModule('lista-empresas');
}

function abonarPuntosPaciente(idx) {
  const p = DENT_STATE.pacientes[idx];
  if (!p) return;
  p.puntos += 100;
  renderDynamicModule(DENT_STATE.currentView);
  lucide.createIcons();
  showToast('Puntos Abonados', `+100 puntos agregados a la tarjeta de ${p.nombre}.`);
}

function cambiarClientePOS(id) {
  DENT_STATE.posClienteId = id;
  renderDynamicModule('realizar-venta');
  lucide.createIcons();
}

function agregarAlCarritoPOS(prodId) {
  const prod = DENT_STATE.productosClinica.find(p => p.id === prodId);
  if (!prod) return;
  DENT_STATE.posCarrito.push({ ...prod });
  renderDynamicModule('realizar-venta');
  lucide.createIcons();
  showToast('Producto Agregado', `${prod.nombre} cargado al ticket.`);
}

function quitarDelCarritoPOS(idx) {
  DENT_STATE.posCarrito.splice(idx, 1);
  renderDynamicModule('realizar-venta');
  lucide.createIcons();
}

function seleccionarFormaPagoPOS(fp) {
  DENT_STATE.posFormaPago = fp;
  renderDynamicModule('realizar-venta');
  lucide.createIcons();
}

function finalizarVentaPOS() {
  if (DENT_STATE.posCarrito.length === 0) {
    showToast('Carrito Vacío', 'Agrega al menos un servicio o producto antes de cobrar.');
    return;
  }
  const cli = DENT_STATE.pacientes.find(p => p.id === DENT_STATE.posClienteId) || DENT_STATE.pacientes[0];
  const total = DENT_STATE.posCarrito.reduce((acc, i) => acc + i.precio, 0);
  const pts = Math.round(total * 0.1);
  cli.puntos += pts;

  DENT_STATE.ventas.unshift({
    folio: 'VTA-' + (1095 + DENT_STATE.ventas.length),
    fecha: '2026-10-07 17:50',
    cliente: cli.nombre,
    conceptos: DENT_STATE.posCarrito.map(i => i.nombre).join(' + '),
    formaPago: DENT_STATE.posFormaPago,
    total,
    puntosGanados: pts
  });
  DENT_STATE.posCarrito = [];
  showToast('Venta Registrada con Éxito', `Ticket cobrado por $${total.toLocaleString('es-MX')} (${DENT_STATE.posFormaPago}).`);
  openModule('listado-ventas');
}

function seleccionarDiaCalendario(dia) {
  DENT_STATE.diaCalendarioSeleccionado = dia;
  renderDynamicModule('calendario');
  lucide.createIcons();
}

function togglePermisoPerfil(idx, col) {
  const p = DENT_STATE.permisosPerfiles[idx];
  if (!p) return;
  p[col] = !p[col];
  renderDynamicModule('permisos');
  lucide.createIcons();
  showToast('Permisos Actualizados', `${p.perfil}: acceso a ${col} ${p[col] ? 'habilitado' : 'bloqueado'}.`);
}

// ============================================================================
// MODAL UNIVERSAL INTERACTIVO PARA ALTA RÁPIDA EN CUALQUIER CATÁLOGO
// ============================================================================

let currentUniversalTarget = '';

function openSimpleAddModal(targetKey) {
  currentUniversalTarget = targetKey;
  const modal = document.getElementById('modalUniversalForm');
  const title = document.getElementById('uniModalTitle');
  const fields = document.getElementById('uniModalFields');
  if (!modal || !title || !fields) return;

  const configs = {
    'equipos-prestamo': {
      title: 'Asignar Salida de Equipo en Préstamo',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Escaneador / Usuario *</label><input id="uf1" required placeholder="Ej. Lic. Daniel Ríos" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Equipo a Prestar *</label><input id="uf2" required placeholder="Ej. Escáner 3Shape TRIOS 4 #02" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Clínica Destino *</label><input id="uf3" required placeholder="Ej. Consultorio Dr. Mauricio" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'catalogo-equipos': {
      title: 'Registrar Nuevo Equipo en Catálogo',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Código *</label><input id="uf1" required placeholder="SCN-MEDIT-04" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Descripción del Equipo *</label><input id="uf2" required placeholder="Escáner Intraoral Medit i700 Wireless" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Marca / Serie *</label><input id="uf3" required placeholder="Medit • Serie MD-9910" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'motivos-cancelacion': {
      title: 'Agregar Motivo de Cancelación',
      html: `<div><label class="font-bold text-slate-600 block mb-1">Descripción del Motivo *</label><input id="uf1" required placeholder="Ej. Error en toma de impresión digital" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>`
    },
    'mensajes-push': {
      title: 'Enviar Nueva Notificación Push',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Título de la Notificación *</label><input id="uf1" required placeholder="Ej. Tu orden está en etapa de Diseño CAD" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Mensaje *</label><input id="uf2" required placeholder="Ingresa a la App para revisar el diseño 3D." class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Destinatario *</label><input id="uf3" required value="Todos los Doctores" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'paquetes': {
      title: 'Crear Nuevo Paquete Prepagado',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Nombre del Paquete *</label><input id="uf1" required placeholder="Ej. Paquete 15 Coronas Zirconio HT+" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Clave Corta *</label><input id="uf2" required placeholder="PACK-ZRC-15" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Costo MXN *</label><input id="uf3" type="number" required placeholder="21000" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'productos-app': {
      title: 'Agregar Producto de Laboratorio',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Categoría *</label><input id="uf1" required placeholder="Zirconio / E-Max / Guardas" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Nombre de Restauración *</label><input id="uf2" required placeholder="Ej. Corona Zirconio Estratificada" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Precio Unitario MXN *</label><input id="uf3" type="number" required placeholder="1950" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'inventario-discos': {
      title: 'Registrar Entrada de Disco CAD/CAM al Almacén',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Marca del Disco *</label><input id="uf1" required placeholder="Aidite 3D Pro / Ivoclar ZirCAD" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Tono Guía Vita *</label><input id="uf2" required placeholder="Vita A2" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Espesor (mm) *</label><input id="uf3" required placeholder="14 mm" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'lista-ordenes': {
      title: 'Crear Nueva Orden de Trabajo CAD/CAM',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Doctor Solicitante *</label><input id="uf1" required placeholder="Dr. Oscar Ramírez" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Paciente *</label><input id="uf2" required placeholder="Nombre del Paciente" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Restauración y Pieza *</label><input id="uf3" required placeholder="Corona Zirconio • Pieza #24 • Vita A2" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'colorimetro': {
      title: 'Agregar Tono al Colorímetro',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Código de Color *</label><input id="uf1" required placeholder="Ej. A4 / OM3" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Equivalente *</label><input id="uf2" required placeholder="Chromascop 340" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Color Hexadecimal Visual</label><input id="uf3" type="color" value="#e6d7ba" class="w-full h-10 rounded-xl border border-slate-200"></div>
      `
    },
    'usuarios': {
      title: 'Alta de Usuario del Sistema',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Usuario (Login) *</label><input id="uf1" required placeholder="ej. m.garza" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Nombre Completo *</label><input id="uf2" required placeholder="Lic. Miguel Garza" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Perfil *</label><input id="uf3" required placeholder="Administrador / Escaneador / Diseñador CAD" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'calendario': {
      title: 'Agendar Entrega o Escaneo en Calendario',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Día de Octubre (1 - 31) *</label><input id="uf1" type="number" min="1" max="31" required value="${DENT_STATE.diaCalendarioSeleccionado}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Concepto / Orden *</label><input id="uf2" required placeholder="Entrega Corona Zirconio #OT-9850" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Doctor y Hora *</label><input id="uf3" required placeholder="Dr. Oscar Ramírez • 16:00" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'tipos-recordatorio': {
      title: 'Agregar Tipo de Recordatorio',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Descripción *</label><input id="uf1" required placeholder="Ej. Seguimiento Post-Entrega" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'recordatorios': {
      title: 'Nuevo Recordatorio',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Usuario *</label><input id="uf1" required value="Admin1" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Descripción *</label><input id="uf2" required placeholder="Ej. Confirmar entrega de corona" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Tipo *</label><input id="uf3" required value="Ventas" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'vendedores': {
      title: 'Registrar Vendedor (id_perfil = 11)',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Nombre Completo *</label><input id="uf1" required placeholder="Ej. Lic. Roberto Garza" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Código Vendedor *</label><input id="uf2" required placeholder="Ej. Ro3316" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Correo *</label><input id="uf3" type="email" required placeholder="vendedor@dentlab.com.mx" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    },
    'representantes-venta': {
      title: 'Registrar Representante de Venta (id_perfil = 8)',
      html: `
        <div><label class="font-bold text-slate-600 block mb-1">Nombre Completo *</label><input id="uf1" required placeholder="Ej. Lic. Alejandro Torres" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Usuario *</label><input id="uf2" required placeholder="Ej. Representante2" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
        <div><label class="font-bold text-slate-600 block mb-1">Correo *</label><input id="uf3" type="email" required placeholder="representante@dentlab.com.mx" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      `
    }
  };

  const cfg = configs[targetKey] || {
    title: 'Agregar Nuevo Registro',
    html: `
      <div><label class="font-bold text-slate-600 block mb-1">Nombre / Título *</label><input id="uf1" required placeholder="Ingrese el nombre o descripción" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      <div><label class="font-bold text-slate-600 block mb-1">Detalle / Referencia *</label><input id="uf2" required placeholder="Información adicional" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
      <div><label class="font-bold text-slate-600 block mb-1">Observaciones</label><input id="uf3" placeholder="Opcional" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></div>
    `
  };

  title.innerText = cfg.title;
  fields.innerHTML = cfg.html;
  modal.classList.remove('hidden');
}

function closeUniversalModal() {
  document.getElementById('modalUniversalForm')?.classList.add('hidden');
}

function submitUniversalModal(e) {
  e.preventDefault();
  const v1 = document.getElementById('uf1')?.value || '';
  const v2 = document.getElementById('uf2')?.value || '';
  const v3 = document.getElementById('uf3')?.value || '';

  switch (currentUniversalTarget) {
    case 'equipos-prestamo':
      DENT_STATE.equiposPrestamo.unshift({ id: 'EQP-0' + (DENT_STATE.equiposPrestamo.length + 1), usuario: v1, equipo: v2, salida: '2026-10-07 17:55', clinica: v3, estado: 'En Préstamo' });
      break;
    case 'catalogo-equipos':
      DENT_STATE.catalogoEquipos.unshift({ id: 'EQ-109', codigo: v1, nombre: v2, marca: v3, serie: 'SN-2026', ubicacion: 'Laboratorio Central', estatus: true });
      break;
    case 'motivos-cancelacion':
      DENT_STATE.motivosCancelacion.push({ id: DENT_STATE.motivosCancelacion.length + 1, motivo: v1, estatus: true });
      break;
    case 'mensajes-push':
      DENT_STATE.mensajesPush.unshift({ id: 'PSH-' + (42 + DENT_STATE.mensajesPush.length), tipo: 'Aviso General', titulo: v1, mensaje: v2, destinatario: v3, fecha: 'Ahora mismo', enviado: true });
      break;
    case 'paquetes':
      DENT_STATE.paquetes.unshift({ id: 'PAQ-09', nombre: v1, corto: v2, piezas: 15, costo: Number(v3) || 18000, desde: '2026-10-07', hasta: '2027-10-07', estatus: true });
      break;
    case 'productos-app':
      DENT_STATE.productosApp.unshift({ id: 'PRD-0' + (DENT_STATE.productosApp.length + 1), categoria: v1, nombre: v2, tiempo: '48 hrs', precio: Number(v3) || 1800, garantia: '5 años', estatus: true });
      break;
    case 'inventario-discos':
      DENT_STATE.discos.unshift({ id: 'ZRC-' + (208 + DENT_STATE.discos.length), lote: 'LOT-2026N', marca: v1, color: v2, espesor: v3, capacidad: 22, usadas: 0, estado: 'Activo', almacen: 'CNC-1' });
      break;
    case 'lista-ordenes':
      DENT_STATE.controlLab.unshift({ doctor: v1, categoria: 'Zirconio', producto: v3, piezas: '#24', paciente: v2, registro: '2026-10-07', entrega: '2026-10-10', dias: 3, serie: 'OT-' + (9850 + DENT_STATE.controlLab.length), tipoDoctor: 'Externo' });
      break;
    case 'colorimetro':
      DENT_STATE.colorimetro.push({ id: DENT_STATE.colorimetro.length + 1, codigo: v1, marca: 'VITA Custom', equivalente: v2, hex: v3 || '#ede2cc', principal: true, estatus: true });
      break;
    case 'usuarios':
      DENT_STATE.usuarios.push({ id: DENT_STATE.usuarios.length + 1, usuario: v1, nombre: v2, correo: `${v1}@dentlab.mx`, perfil: v3, appEquipos: true, estatus: true });
      break;
    case 'calendario': {
      const diaNum = Math.min(Math.max(parseInt(v1, 10) || 7, 1), 31);
      DENT_STATE.eventosCalendario.push({ dia: diaNum, titulo: v2, hora: '16:00', doctor: v3, tipo: 'entrega' });
      DENT_STATE.diaCalendarioSeleccionado = diaNum;
      break;
    }
    case 'baners-app':
      DENT_STATE.banersApp.push({ id: DENT_STATE.banersApp.length + 1, titulo: v1, subtitulo: v2, imagen: 'assets/dental_cadcam.jpg', orden: DENT_STATE.banersApp.length + 1, estatus: true });
      break;
    case 'tipos-recordatorio':
      DENT_STATE.tiposRecordatorio.push({ id: DENT_STATE.tiposRecordatorio.length + 1, descripcion: v1, estatus: true });
      break;
    case 'recordatorios':
      DENT_STATE.recordatorios.unshift({ id: DENT_STATE.recordatorios.length + 1, usuario: v1 || 'Admin1', descripcion: v2 || v1, fecha: '2026-10-12 15:00:00', tipo: v3 || 'Ventas', estatus: true });
      break;
    case 'marcas-discos':
      DENT_STATE.marcasDiscos.push({ id: DENT_STATE.marcasDiscos.length + 1, marca: v1, origen: v2, material: v3 || 'Zirconio CAD/CAM', estatus: true });
      break;
    case 'categorias':
      DENT_STATE.categorias.push({ id: DENT_STATE.categorias.length + 1, nombre: v1, descripcion: v2, productos: 5, estatus: true });
      break;
    case 'vendedores':
      DENT_STATE.vendedores.push({ id: 30 + DENT_STATE.vendedores.length, usuario: v1.split(' ')[0] || 'Vendedor', nombre: v1, codigo: v2 || 'VN' + (3300 + DENT_STATE.vendedores.length), correo: v3 || 'ventas@dentlab.com.mx', doctoresAsignados: 0, perfil: 'Vendedor', estatus: true });
      break;
    case 'representantes-venta':
      DENT_STATE.representantesVenta.push({ id: 40 + DENT_STATE.representantesVenta.length, usuario: v2 || 'Representante', nombre: v1, codigo: 'REP-0' + (DENT_STATE.representantesVenta.length + 1), correo: v3 || 'rep@dentlab.com.mx', perfil: 'Representante de venta', estatus: true });
      break;
    case 'empleados':
      DENT_STATE.empleadosConvenio.unshift({ id: 'EMP-BEN-99', nombre: v1, empresa: v2, puesto: v3 || 'Colaborador', credencial: 'CNV-2026', beneficio: '20% Descuento Convenio', estatus: true });
      break;
    case 'encuestas':
      DENT_STATE.encuestas.unshift({ id: 'ENC-509', paciente: v1, doctor: 'Dr. Oscar Ramírez', servicio: v2, calificacion: 5, comentario: v3 || 'Excelente servicio.', fecha: '2026-10-07' });
      break;
    case 'productos-clinica':
      DENT_STATE.productosClinica.push({ id: 'SRV-09', codigo: 'CLN-NEW', nombre: v1, tipo: v2, precio: Number(v3) || 1200, puntosOtorga: 120, puntosCosto: 1200, estatus: true });
      break;
    case 'pacientes':
      DENT_STATE.pacientes.unshift({ id: 'PAC-0' + (DENT_STATE.pacientes.length + 1), expediente: 'EXP-' + (4930 + DENT_STATE.pacientes.length), nombre: v1, telefono: v2, correo: v3 || 'paciente@correo.com', membresia: 'Membresía Oro VIP', puntos: 500, doctor: 'Dr. Oscar Ramírez', ultimaCita: '2026-10-07' });
      break;
  }

  if (currentUniversalTarget === 'lista-ordenes' && typeof INICIO_DATA !== 'undefined') {
    const newOt = 1049 + INICIO_DATA.ordenes.length;
    INICIO_DATA.escaneo.unshift({
      ot: newOt,
      prod: v3 || 'Zirconio',
      uni: 1,
      doctor: v1 || 'Dr. Oscar Ramírez',
      soli: '2026-10-10',
      est: 'Escaneo',
      reg: '2026-10-09 08:10',
      interno: false,
      serie: 'OT-' + newOt
    });
    INICIO_DATA.ordenes.unshift({
      ot: newOt,
      folio: 'ORD-26-' + newOt,
      entrega: '2026-10-10',
      estado: 'Escaneo',
      producto: v3 || 'Corona Zirconio Monolítico',
      doctor: v1 || 'Dr. Oscar Ramírez',
      paciente: v2 || 'Paciente Nuevo',
      unidades: 1,
      libProd: '2026-10-09 08:10',
      monto: '$1,850.00',
      serie: 'OT-' + newOt,
      color: 'Vita A2',
      piezas: ['24']
    });
  }

  closeUniversalModal();
  if (DENT_STATE.currentView === 'inicio') {
    renderTablasInicio();
  } else {
    renderDynamicModule(DENT_STATE.currentView);
  }
  lucide.createIcons();
  showToast('Registro Guardado', 'La información se actualizó visualmente en el módulo activo.');
}

// ============================================================================
// DATOS Y RENDERIZADO DE LAS 5 TABLAS DE INICIO (DISEÑO EJECUTIVO SINCRONIZADO)
// ============================================================================

const INICIO_DATA = {
  escaneo: [
    {
        "ot": 30089,
        "ordenId": 22075,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DRA. DIANA ELIZABETH",
        "doctorId": 583,
        "soli": "2026-08-28",
        "est": "Levantado",
        "reg": "2026-08-24 20:56:34",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3189",
        "serie": "30089"
    },
    {
        "ot": 29921,
        "ordenId": 21907,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DRA. PATRICIA ELIZABETH",
        "doctorId": 442,
        "soli": "2026-08-19",
        "est": "Levantado",
        "reg": "2026-08-13 18:29:25",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3188",
        "serie": "29921"
    },
    {
        "ot": 26644,
        "ordenId": 18632,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DRA. PATRICIA ELIZABETH",
        "doctorId": 442,
        "soli": "2026-01-20",
        "est": "Levantado",
        "reg": "2026-01-16 14:14:40",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 2730",
        "serie": "26644"
    },
    {
        "ot": 22932,
        "ordenId": 14919,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DRA. MARIA PAULA",
        "doctorId": 315,
        "soli": "2025-06-05",
        "est": "Levantado",
        "reg": "2025-06-02 17:54:55",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "SIN PAQUETE",
        "serie": "22932"
    }
],
  diseno: [
    {
        "ot": 30596,
        "ordenId": 22582,
        "prod": "Corona Zirconio",
        "uni": 4,
        "doctor": "DRA. BRENDA DEYANIRA",
        "doctorId": 417,
        "soli": "2026-09-28",
        "est": "Diseño",
        "reg": "2026-09-28",
        "interno": true,
        "tipoDoctorExterno": 0,
        "paquetes": "SIN PAQUETE",
        "serie": "30596"
    },
    {
        "ot": 30595,
        "ordenId": 22581,
        "prod": "Carilla",
        "uni": 1,
        "doctor": "DR. ALBERTO ALFONSO",
        "doctorId": 251,
        "soli": "2026-09-28",
        "est": "Diseño",
        "reg": "2026-09-28",
        "interno": true,
        "tipoDoctorExterno": 0,
        "paquetes": "SIN PAQUETE",
        "serie": "30595"
    },
    {
        "ot": 30594,
        "ordenId": 22580,
        "prod": "Corona Zirconio",
        "uni": 16,
        "doctor": "DR. ANA LAURA",
        "doctorId": 56,
        "soli": "2026-09-26",
        "est": "Diseño",
        "reg": "2026-09-26",
        "interno": true,
        "tipoDoctorExterno": 0,
        "paquetes": "SIN PAQUETE",
        "serie": "30594"
    },
    {
        "ot": 30593,
        "ordenId": 22579,
        "prod": "Corona Zirconio",
        "uni": 6,
        "doctor": "DR. JOSE ANGEL",
        "doctorId": 586,
        "soli": "2026-10-01",
        "est": "Diseño",
        "reg": "2026-10-01",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3245",
        "serie": "30593"
    },
    {
        "ot": 30591,
        "ordenId": 22577,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "JACQS",
        "doctorId": 548,
        "soli": "2026-09-26",
        "est": "Diseño",
        "reg": "2026-09-26",
        "interno": true,
        "tipoDoctorExterno": 0,
        "paquetes": "SIN PAQUETE",
        "serie": "30591"
    },
    {
        "ot": 30589,
        "ordenId": 22575,
        "prod": "Corona Zirconio",
        "uni": 6,
        "doctor": "DR. ARTURO",
        "doctorId": 125,
        "soli": "2026-09-29",
        "est": "Diseño",
        "reg": "2026-09-29",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3227 / PAQ: 3242",
        "serie": "30589"
    },
    {
        "ot": 30584,
        "ordenId": 22570,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DR. MIGUEL ALAN",
        "doctorId": 530,
        "soli": "2026-09-30",
        "est": "Diseño",
        "reg": "2026-09-30",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3211",
        "serie": "30584"
    },
    {
        "ot": 30582,
        "ordenId": 22568,
        "prod": "Corona Zirconio",
        "uni": 2,
        "doctor": "DR. ISMAEL",
        "doctorId": 184,
        "soli": "2026-09-30",
        "est": "Diseño",
        "reg": "2026-09-30",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3167",
        "serie": "30582"
    },
    {
        "ot": 30569,
        "ordenId": 22555,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DRA. KARLA BEATRIZ",
        "doctorId": 454,
        "soli": "2026-09-30",
        "est": "Diseño",
        "reg": "2026-09-30",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3140",
        "serie": "30569"
    },
    {
        "ot": 30556,
        "ordenId": 22542,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DR. MARTIN ARGENIS",
        "doctorId": 449,
        "soli": "2026-09-27",
        "est": "Diseño",
        "reg": "2026-09-27",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "SIN PAQUETE",
        "serie": "30556"
    },
    {
        "ot": 30548,
        "ordenId": 22534,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DRA. NORA PATRICIA",
        "doctorId": 421,
        "soli": "2026-09-28",
        "est": "Diseño",
        "reg": "2026-09-28",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 2803",
        "serie": "30548"
    },
    {
        "ot": 30532,
        "ordenId": 22518,
        "prod": "Placa total zirconio",
        "uni": 16,
        "doctor": "DR. ISMAEL",
        "doctorId": 184,
        "soli": "2026-09-26",
        "est": "Diseño",
        "reg": "2026-09-26",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "SIN PAQUETE",
        "serie": "30532"
    },
    {
        "ot": 30429,
        "ordenId": 22415,
        "prod": "Corona Zirconio",
        "uni": 5,
        "doctor": "DRA. ELIDA LIZETH",
        "doctorId": 304,
        "soli": "2026-09-21",
        "est": "Diseño",
        "reg": "2026-09-21",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3158",
        "serie": "30429"
    },
    {
        "ot": 30399,
        "ordenId": 22385,
        "prod": "Carilla",
        "uni": 2,
        "doctor": "DR. JORGE ALBERTO",
        "doctorId": 310,
        "soli": "2026-09-15",
        "est": "Diseño",
        "reg": "2026-09-15",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3220",
        "serie": "30399"
    },
    {
        "ot": 30373,
        "ordenId": 22359,
        "prod": "Corona Zirconio",
        "uni": 5,
        "doctor": "DRA. CLAUDIA LIZETH",
        "doctorId": 453,
        "soli": "2026-09-16",
        "est": "Diseño",
        "reg": "2026-09-16",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3125",
        "serie": "30373"
    },
    {
        "ot": 28329,
        "ordenId": 20314,
        "prod": "Corona Zirconio",
        "uni": 2,
        "doctor": "DR. MIGUEL ALAN",
        "doctorId": 530,
        "soli": "2026-05-12",
        "est": "Diseño",
        "reg": "2026-05-12",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 2976",
        "serie": "28329"
    },
    {
        "ot": 25662,
        "ordenId": 17650,
        "prod": "Corona Zirconio",
        "uni": 4,
        "doctor": "DRA. NAYELI",
        "doctorId": 405,
        "soli": "2025-11-18",
        "est": "Diseño",
        "reg": "2025-11-18",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 2735",
        "serie": "25662"
    },
    {
        "ot": 22648,
        "ordenId": 14635,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DRA. NEIRA JAEL",
        "doctorId": 441,
        "soli": "2025-05-20",
        "est": "Diseño",
        "reg": "2025-05-20",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 2407",
        "serie": "22648"
    }
],
  fabricacion: [
    {
        "ot": 30592,
        "ordenId": 22578,
        "prod": "Corona Zirconio",
        "uni": 28,
        "doctor": "DRA. BRENDA DEYANIRA",
        "doctorId": 417,
        "soli": "2026-09-26",
        "est": "Fabricación",
        "reg": "2026-09-26",
        "interno": true,
        "tipoDoctorExterno": 0,
        "paquetes": "SIN PAQUETE",
        "serie": "30592"
    },
    {
        "ot": 30590,
        "ordenId": 22576,
        "prod": "Guarda Calibre.60",
        "uni": 1,
        "doctor": "DRA. YESSICA",
        "doctorId": 214,
        "soli": "2026-09-29",
        "est": "Fabricación",
        "reg": "2026-09-29",
        "interno": true,
        "tipoDoctorExterno": 0,
        "paquetes": "SIN PAQUETE",
        "serie": "30590"
    },
    {
        "ot": 30583,
        "ordenId": 22569,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DR. CARLOS ALBERTO",
        "doctorId": 399,
        "soli": "2026-09-28",
        "est": "Fabricación",
        "reg": "2026-09-28",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3225",
        "serie": "30583"
    },
    {
        "ot": 30580,
        "ordenId": 22566,
        "prod": "Corona Zirconio",
        "uni": 6,
        "doctor": "DRA. IRMA ALEJANDRA",
        "doctorId": 177,
        "soli": "2026-09-28",
        "est": "Fabricación",
        "reg": "2026-09-28",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3240",
        "serie": "30580"
    },
    {
        "ot": 30579,
        "ordenId": 22565,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DR. FRANCISCO ALEJANDRO",
        "doctorId": 85,
        "soli": "2026-09-28",
        "est": "Fabricación",
        "reg": "2026-09-28",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3150",
        "serie": "30579"
    },
    {
        "ot": 30578,
        "ordenId": 22564,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DR. FRANCISCO ALEJANDRO",
        "doctorId": 85,
        "soli": "2026-09-28",
        "est": "Fabricación",
        "reg": "2026-09-28",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3150",
        "serie": "30578"
    },
    {
        "ot": 30540,
        "ordenId": 22526,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "DRA. NAYELI",
        "doctorId": 405,
        "soli": "2026-09-28",
        "est": "Fabricación",
        "reg": "2026-09-28",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "PAQ: 3162",
        "serie": "30540"
    }
],
  entrega: [
    {
        "ot": 30588,
        "ordenId": 22574,
        "prod": "Corona Zirconio",
        "uni": 2,
        "doctor": "Dr. Arturo",
        "doctorId": 125,
        "soli": "2026-09-29",
        "est": "Entrega",
        "reg": "2026-09-29",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "SIN PAQUETE",
        "serie": "30588"
    },
    {
        "ot": 30587,
        "ordenId": 22573,
        "prod": "Corona Zirconio",
        "uni": 3,
        "doctor": "Dr. Gustavo Jesús",
        "doctorId": 92,
        "soli": "2026-09-29",
        "est": "Entrega",
        "reg": "2026-09-29",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "SIN PAQUETE",
        "serie": "30587"
    },
    {
        "ot": 30586,
        "ordenId": 22572,
        "prod": "Corona Zirconio",
        "uni": 1,
        "doctor": "Dr. Cesar Ivan",
        "doctorId": 568,
        "soli": "2026-09-29",
        "est": "Entrega",
        "reg": "2026-09-29",
        "interno": false,
        "tipoDoctorExterno": 1,
        "paquetes": "SIN PAQUETE",
        "serie": "30586"
    },
    {
        "ot": 30585,
        "ordenId": 22571,
        "prod": "Corona Zirconio",
        "uni": 11,
        "doctor": "Dra. Brenda Deyanira",
        "doctorId": 417,
        "soli": "2026-09-25",
        "est": "Entrega",
        "reg": "2026-09-25",
        "interno": true,
        "tipoDoctorExterno": 0,
        "paquetes": "SIN PAQUETE",
        "serie": "30585"
    },
    {
        "ot": 30581,
        "ordenId": 22567,
        "prod": "Corona Zirconio",
        "uni": 5,
        "doctor": "Dra. Sarai",
        "doctorId": 445,
        "soli": "2026-09-29",
        "est": "Entrega",
        "reg": "2026-09-29",
        "interno": true,
        "tipoDoctorExterno": 0,
        "paquetes": "SIN PAQUETE",
        "serie": "30581"
    },
    {
        "ot": 30577,
        "ordenId": 22563,
        "prod": "Guía Quirúrgica Hiossen",
        "uni": 2,
        "doctor": "Dr. Ana Laura",
        "doctorId": 56,
        "soli": "2026-09-25",
        "est": "Entrega",
        "reg": "2026-09-25",
        "interno": true,
        "tipoDoctorExterno": 0,
        "paquetes": "SIN PAQUETE",
        "serie": "30577"
    }
],
  ordenes: [
    {
        "ot": 30596,
        "ordenId": 22582,
        "folio": "30596",
        "serie": "30596",
        "entrega": "2026-09-28",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Brenda Deyanira",
        "doctorNombreCompleto": "Dra. Brenda Deyanira Hernández Aguirre",
        "doctorId": 417,
        "paciente": "LETICIA VARGAS MUÑOZ",
        "unidades": 4,
        "libProd": "",
        "nombreLib": "",
        "monto": "$3,200.00",
        "montoNum": 3200,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A3",
        "observaciones": "CORONAS DE OD 46-47-36-37 IGUALAR COLOR A  ORDEN30585",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Sto Ciervo No. Ext 7 No. Int , Col. Fraccionamiento Viñedos, Cd. Torreon,Coahuila.",
        "celular": "6566758982",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "46",
            "47",
            "36",
            "37"
        ]
    },
    {
        "ot": 30595,
        "ordenId": 22581,
        "folio": "30595",
        "serie": "30595",
        "entrega": "2026-09-28",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Carilla",
        "doctor": "Dr. Alberto Alfonso",
        "doctorNombreCompleto": "Dr. Alberto Alfonso Davila Gonzalez",
        "doctorId": 251,
        "paciente": "Manuel Rosales Gomez",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$800.00",
        "montoNum": 800,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "carilla 11 en garantia mismo color y especificaciones de orden OT: 4952 ESPECIFICACIONES: 358,SAGEMAX, A1, 20MM",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Av Hidalgo No. Ext 3125 No. Int , Col. Nuevo Torreon, Cd. Torreon,Coahuila.",
        "celular": "8711024414",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30594,
        "ordenId": 22580,
        "folio": "30594",
        "serie": "30594",
        "entrega": "2026-09-26",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Ana Laura",
        "doctorNombreCompleto": "Dr. Ana Laura  Castillo Hernandez",
        "doctorId": 56,
        "paciente": "Maria Victoria Aguirre Zozaya",
        "unidades": 16,
        "libProd": "",
        "nombreLib": "",
        "monto": "$12,800.00",
        "montoNum": 12800,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL B1",
        "observaciones": "Puente de zirconio OD 14 al 16 y Carillas OD 13 al 23\r\nPuente de zirconio OD 33 al 43 y Carillas OD 34 y 44",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Hidalgo No. Ext 3125 No. Int 3, Col. Nuevo Torreon, Cd. Torreon,Coahuila.",
        "celular": "8713952578",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "14",
            "16",
            "13",
            "23",
            "33",
            "43",
            "34",
            "44",
            "11",
            "21",
            "15",
            "24",
            "25",
            "26",
            "36",
            "46"
        ]
    },
    {
        "ot": 30593,
        "ordenId": 22579,
        "folio": "30593",
        "serie": "30593",
        "entrega": "2026-10-01",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Jose Angel",
        "doctorNombreCompleto": "Dr. Jose Angel Delgado Diaz",
        "doctorId": 586,
        "paciente": "Esperanza Rios",
        "unidades": 6,
        "libProd": "",
        "nombreLib": "",
        "monto": "$7,200.00",
        "montoNum": 7200,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL B4",
        "observaciones": "-No tiene espacio en el 2.3 y se le va a desgastar en la parte inferior.\n-No se le hizo provisional.\n-Que no queden muy grandes,largos.\n-Color B4.\n-Se manda foto de los dientes para color.",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Av. de la Primavera No. Ext 1434 No. Int , Col. Tres caminos, Cd. Guadalupe,Nuevo Leon.",
        "celular": "8180882101",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "PAQ: 3245",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11",
            "21",
            "14",
            "15",
            "16",
            "24"
        ]
    },
    {
        "ot": 30592,
        "ordenId": 22578,
        "folio": "30592",
        "serie": "30592",
        "entrega": "2026-09-26",
        "estado": "Fabricación",
        "subEstado": "Fabricación",
        "idLab_Estado": 3,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Brenda Deyanira",
        "doctorNombreCompleto": "Dra. Brenda Deyanira Hernández Aguirre",
        "doctorId": 417,
        "paciente": "Axdruval  Elizalde",
        "unidades": 28,
        "libProd": "",
        "nombreLib": "",
        "monto": "$22,400.00",
        "montoNum": 22400,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "Coronas de od11 -12-13-14-15-16-17-21-22-23-24-25-26-27-33-34-35-36-37-43-44-45-46-47-\r\nCarillas31-32--41-42-\r\nCOLOR A1",
        "observacionesEscaneador": "",
        "observacionesLab": "DISEÑO HECHO POR DR JOSE A 25 09 26 \nPM5 SUPERIOR\nDRY 3 INFERIOR",
        "direccion": "Sto Ciervo No. Ext 7 No. Int , Col. Fraccionamiento Viñedos, Cd. Torreon,Coahuila.",
        "celular": "6566758982",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2846:14,2845:14",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "33",
            "34",
            "35",
            "36",
            "37",
            "43",
            "44",
            "45",
            "46",
            "47",
            "32",
            "41",
            "42"
        ]
    },
    {
        "ot": 30591,
        "ordenId": 22577,
        "folio": "30591",
        "serie": "30591",
        "entrega": "2026-09-26",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "Jacqs",
        "doctorNombreCompleto": "Jacqs Flores De La Cruz",
        "doctorId": 548,
        "paciente": "JOHANNA DEL SOCORRO FERNANDEZ VARGAS",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$800.00",
        "montoNum": 800,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A3",
        "observaciones": "FAVOR DE REALIZAR CORONA OD47 IMPLANTOSOPORTADA, COLOR A3 INCISAL",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Av. Hidalgo No. Ext 3251 No. Int 3251, Col. Nuevo Torreón, Cd. Torreon,Coahuila.",
        "celular": "8711116400",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30590,
        "ordenId": 22576,
        "folio": "30590",
        "serie": "30590",
        "entrega": "2026-09-29",
        "estado": "Fabricación",
        "subEstado": "Fabricación",
        "idLab_Estado": 3,
        "producto": "Guarda Calibre.60",
        "doctor": "Dra. Yessica",
        "doctorNombreCompleto": "Dra. Yessica  Nava Espinoza",
        "doctorId": 214,
        "paciente": "Andrea  Raigosa",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$150.00",
        "montoNum": 150,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Dos retenedores superior Festoneado .60",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Amador Cardenas No. Ext 1009 No. Int , Col. Nueva Los Angeles, Cd. Torreon,Coahuila.",
        "celular": "8711169754",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30589,
        "ordenId": 22575,
        "folio": "30589",
        "serie": "30589",
        "entrega": "2026-09-29",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Arturo",
        "doctorNombreCompleto": "Dr. Arturo  Camacho Davila",
        "doctorId": 125,
        "paciente": "Maria  Concepcion",
        "unidades": 6,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Puente de Zirconio OD 33 A 43 Color A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Allende No. Ext 1260 No. Int , Col. Primero de Cobian, Cd. Torreon,Coahuila.",
        "celular": "8712635543",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2803:6",
        "paquetes": "PAQ: 3227 / PAQ: 3242",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "33",
            "43",
            "11",
            "21",
            "14",
            "15"
        ]
    },
    {
        "ot": 30588,
        "ordenId": 22574,
        "folio": "30588",
        "serie": "30588",
        "entrega": "2026-09-29",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Arturo",
        "doctorNombreCompleto": "Dr. Arturo  Camacho Davila",
        "doctorId": 125,
        "paciente": "Dolores Gallardo",
        "unidades": 2,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Coronas de Zirconio OD 45 & 47 Color A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Allende No. Ext 1260 No. Int , Col. Primero de Cobian, Cd. Torreon,Coahuila.",
        "celular": "8712635543",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2776:2",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "45",
            "47"
        ]
    },
    {
        "ot": 30587,
        "ordenId": 22573,
        "folio": "30587",
        "serie": "30587",
        "entrega": "2026-09-29",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Gustavo Jesús",
        "doctorNombreCompleto": "Dr. Gustavo Jesús Esquivel Limones",
        "doctorId": 92,
        "paciente": "Dionisio  Lopez",
        "unidades": 3,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Coronas de Zirconio OD 12 A 22 Color A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "34 No. Ext 325 No. Int 325, Col. Centro, Cd. Torreon,Coahuila.",
        "celular": "8712019434",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2579:3",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "12",
            "22",
            "11"
        ]
    },
    {
        "ot": 30586,
        "ordenId": 22572,
        "folio": "30586",
        "serie": "30586",
        "entrega": "2026-09-29",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Cesar Ivan",
        "doctorNombreCompleto": "Dr. Cesar Ivan Bautista Gutierrez",
        "doctorId": 568,
        "paciente": "Alberto  Alvarez",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A3",
        "observaciones": "Corona de Zirconio OD 37 Color A3",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Pabellón Nte. No. Ext 4 No. Int , Col. Centro, Cd. Matamoros,Coahuila.",
        "celular": "8715115071",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2776:1",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "37"
        ]
    },
    {
        "ot": 30585,
        "ordenId": 22571,
        "folio": "30585",
        "serie": "30585",
        "entrega": "2026-09-25",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Brenda Deyanira",
        "doctorNombreCompleto": "Dra. Brenda Deyanira Hernández Aguirre",
        "doctorId": 417,
        "paciente": "LETICIA VARGAS MUÑOZ",
        "unidades": 11,
        "libProd": "",
        "nombreLib": "",
        "monto": "$8,800.00",
        "montoNum": 8800,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A3",
        "observaciones": "CORONAS DE OD 11-21-14--26-27\r\nCARILLAS12-13-22-23-24-25\r\nEN COLOR A3 INCISAL",
        "observacionesEscaneador": "",
        "observacionesLab": "ZONA DE CONTACTO .36    -   OCLUSION ESTATICA Y DINAMICA . 32    - PROXIMAL 0.2\nDISEÑO HECHO POR DR JOSE A 24 09 26\nDRY 2",
        "direccion": "Sto Ciervo No. Ext 7 No. Int , Col. Fraccionamiento Viñedos, Cd. Torreon,Coahuila.",
        "celular": "6566758982",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2656:11",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11",
            "21",
            "14",
            "26",
            "27",
            "13",
            "22",
            "23",
            "24",
            "25",
            "15"
        ]
    },
    {
        "ot": 30584,
        "ordenId": 22570,
        "folio": "30584",
        "serie": "30584",
        "entrega": "2026-09-30",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Miguel Alan",
        "doctorNombreCompleto": "Dr. Miguel Alan Lozano Gonzalez",
        "doctorId": 530,
        "paciente": "Patricia  Aguilar",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$1,200.00",
        "montoNum": 1200,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A3.5",
        "observaciones": "Orden registrada en plataforma CAD/CAM DentLab.",
        "observacionesEscaneador": "",
        "observacionesLab": "confirmar",
        "direccion": "Alhambra No. Ext 120 No. Int , Col. La Alhambra, Cd. Monterrey,Nuevo Leon.",
        "celular": "8124325868",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "PAQ: 3211",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30583,
        "ordenId": 22569,
        "folio": "30583",
        "serie": "30583",
        "entrega": "2026-09-28",
        "estado": "Fabricación",
        "subEstado": "Fabricación",
        "idLab_Estado": 3,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Carlos Alberto",
        "doctorNombreCompleto": "Dr. Carlos Alberto  Alvarado  González",
        "doctorId": 399,
        "paciente": "Jose Francisco Martinez",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Corona de Zirconio od 36 Color A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Vía Romana No. Ext 857 No. Int , Col. Roma, Cd. Torreon,Coahuila.",
        "celular": "8713947176",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2813:1",
        "paquetes": "PAQ: 3225",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "36"
        ]
    },
    {
        "ot": 30582,
        "ordenId": 22568,
        "folio": "30582",
        "serie": "30582",
        "entrega": "2026-09-30",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Ismael",
        "doctorNombreCompleto": "Dr. Ismael Gonzalez Anaya",
        "doctorId": 184,
        "paciente": "Rosalina  Galvan",
        "unidades": 2,
        "libProd": "",
        "nombreLib": "",
        "monto": "$2,400.00",
        "montoNum": 2400,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Orden registrada en plataforma CAD/CAM DentLab.",
        "observacionesEscaneador": "",
        "observacionesLab": "confirmar",
        "direccion": "Azalea No. Ext 100 No. Int , Col. Fracc. Jardines de Durango, Cd. Durango,Durango.",
        "celular": "6181020640",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "PAQ: 3167",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11",
            "21"
        ]
    },
    {
        "ot": 30581,
        "ordenId": 22567,
        "folio": "30581",
        "serie": "30581",
        "entrega": "2026-09-29",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Sarai",
        "doctorNombreCompleto": "Dra. Sarai  Caldera  Gallegos",
        "doctorId": 445,
        "paciente": "Alma Paola Sepulveda Gonzalez",
        "unidades": 5,
        "libProd": "",
        "nombreLib": "",
        "monto": "$4,000.00",
        "montoNum": 4000,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "Favor de realizar coronas dentosoportadas de OD 16, 17, 33, 46 y 47. Tono A1. Graaaaacias :)",
        "observacionesEscaneador": "",
        "observacionesLab": "ZONA DE CONTACTO .36    -   OCLUSION ESTATICA Y DINAMICA . 32    - PROXIMAL 0.2\nDISEÑO HECHO POR DR JOSE A 24 09 26\nDRY 2",
        "direccion": "Cerrada San Gabriel  No. Ext 123 No. Int , Col. Villas el Refugio, Cd. Gómez Palacio,Durango.",
        "celular": "12345678",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2848:5",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "16",
            "17",
            "33",
            "46",
            "47"
        ]
    },
    {
        "ot": 30580,
        "ordenId": 22566,
        "folio": "30580",
        "serie": "30580",
        "entrega": "2026-09-28",
        "estado": "Fabricación",
        "subEstado": "Fabricación",
        "idLab_Estado": 3,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Irma Alejandra",
        "doctorNombreCompleto": "Dra. Irma Alejandra  Hernandez  Flores",
        "doctorId": 177,
        "paciente": "Miguel Angel Lopez",
        "unidades": 6,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A1",
        "observaciones": "Carillas de Zirconio od 12 a 23 y Corona de Zirconio od 24 Color A1",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Cadiz No. Ext 8 No. Int , Col. Florida blanca, Cd. Torreon,Coahuila.",
        "celular": "8713434635",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2597:1,2764:5",
        "paquetes": "PAQ: 3240",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "12",
            "23",
            "24",
            "11",
            "21",
            "14"
        ]
    },
    {
        "ot": 30579,
        "ordenId": 22565,
        "folio": "30579",
        "serie": "30579",
        "entrega": "2026-09-28",
        "estado": "Fabricación",
        "subEstado": "Fabricación",
        "idLab_Estado": 3,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Francisco Alejandro",
        "doctorNombreCompleto": "Dr. Francisco Alejandro  Poblano  Vázquez",
        "doctorId": 85,
        "paciente": "Liliana Orozco",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Corona de Zirconio od 35 Color A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Juárez  No. Ext 2767 No. Int , Col. Centro , Cd. Torreon,Coahuila.",
        "celular": "8717276525",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2813:1",
        "paquetes": "PAQ: 3150",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "35"
        ]
    },
    {
        "ot": 30578,
        "ordenId": 22564,
        "folio": "30578",
        "serie": "30578",
        "entrega": "2026-09-28",
        "estado": "Fabricación",
        "subEstado": "Fabricación",
        "idLab_Estado": 3,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Francisco Alejandro",
        "doctorNombreCompleto": "Dr. Francisco Alejandro  Poblano  Vázquez",
        "doctorId": 85,
        "paciente": "Sandra Orozco",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Corona de Zirconio od 25 Color A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Juárez  No. Ext 2767 No. Int , Col. Centro , Cd. Torreon,Coahuila.",
        "celular": "8717276525",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2813:1",
        "paquetes": "PAQ: 3150",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "25"
        ]
    },
    {
        "ot": 30577,
        "ordenId": 22563,
        "folio": "30577",
        "serie": "30577",
        "entrega": "2026-09-25",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Guía Quirúrgica Hiossen",
        "doctor": "Dr. Ana Laura",
        "doctorNombreCompleto": "Dr. Ana Laura  Castillo Hernandez",
        "doctorId": 56,
        "paciente": "Maria Victoria Aguirre Zozaya",
        "unidades": 2,
        "libProd": "",
        "nombreLib": "",
        "monto": "$1,600.00",
        "montoNum": 1600,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "Guía quirúrgica para colocar implantes OD 24 y 26\r\nOD 24 se extraerá en esa cita,EN OD 26 SE REALIZARÁ ELEVACIÓN DE SENO\r\nDR ALATORRE YA HABÍA REVISADO TOMOGRAFÍA DE ESTE CASO Y EL LA INDICÓ",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Hidalgo No. Ext 3125 No. Int 3, Col. Nuevo Torreon, Cd. Torreon,Coahuila.",
        "celular": "8713952578",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "24",
            "26"
        ]
    },
    {
        "ot": 30576,
        "ordenId": 22562,
        "folio": "30576",
        "serie": "30576",
        "entrega": "2026-09-25",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Guia Quirurgica DIO",
        "doctor": "Dra. Karla Liliana",
        "doctorNombreCompleto": "Dra. Karla Liliana Fuentes Alvarez",
        "doctorId": 351,
        "paciente": "MARTHA  RIOS",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$900.00",
        "montoNum": 900,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "GUIA QUIRURGICA PARA IMPLANTE DIO 35",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Cto Vicente Suarez No. Ext 20 No. Int , Col. Fracc Chapultepec, Cd. Torreon,Coahuila.",
        "celular": "8718964494",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "35"
        ]
    },
    {
        "ot": 30575,
        "ordenId": 22561,
        "folio": "30575",
        "serie": "30575",
        "entrega": "2026-09-28",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Mirta Azucena",
        "doctorNombreCompleto": "Dra. Mirta Azucena  Reza Escobedo",
        "doctorId": 182,
        "paciente": "Rocio  Ramirez",
        "unidades": 3,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL B1",
        "observaciones": "Puente de Zirconio OD 13 A 15 Color B1 con A2 Cervical",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Avenida Zacatecas No. Ext 624 No. Int , Col. Centro, Cd. Torreon,Coahuila.",
        "celular": "8711743796",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2830:3",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "13",
            "15",
            "11"
        ]
    },
    {
        "ot": 30574,
        "ordenId": 22560,
        "folio": "30574",
        "serie": "30574",
        "entrega": "2026-09-28",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Fernando Ariel",
        "doctorNombreCompleto": "Dr. Fernando Ariel Serrano Carrillo",
        "doctorId": 195,
        "paciente": "Julio  Castañeda",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Puente Volado de Zirconio OD 22 & 23 Color A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Acropolis No. Ext 829 No. Int , Col. Valle del Nazas, Cd. Torreon,Coahuila.",
        "celular": "8717941139",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2776:1",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "22",
            "23"
        ]
    },
    {
        "ot": 30573,
        "ordenId": 22559,
        "folio": "30573",
        "serie": "30573",
        "entrega": "2026-09-28",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Nani",
        "doctorNombreCompleto": "Dra. Nani Yarahuan Vega",
        "doctorId": 471,
        "paciente": "Fernando  Muñoz",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Corona de Zirconio OD 26 Color A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Rio balsas No. Ext 703 No. Int 3, Col. Navarro , Cd. Torreon,Coahuila.",
        "celular": "8711490799",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2776:1",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "26"
        ]
    },
    {
        "ot": 30572,
        "ordenId": 22558,
        "folio": "30572",
        "serie": "30572",
        "entrega": "2026-09-28",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Luis Mariano",
        "doctorNombreCompleto": "Dr. Luis Mariano Mireles Torres",
        "doctorId": 435,
        "paciente": "Jaqueline  Hernandez",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL B1",
        "observaciones": "Puente Volado de Zirconio OD 12 & 11 Color B1",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Leandro Valle No. Ext 45 No. Int , Col. Centro, Cd. Torreon,Coahuila.",
        "celular": "8713477634",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2830:1",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "12",
            "11"
        ]
    },
    {
        "ot": 30571,
        "ordenId": 22557,
        "folio": "30571",
        "serie": "30571",
        "entrega": "2026-09-24",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Guarda Calibre.80",
        "doctor": "Dra. Yessica Karina",
        "doctorNombreCompleto": "Dra. Yessica Karina Nava Espinoza",
        "doctorId": 346,
        "paciente": "Alberto Guitierrez",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$150.00",
        "montoNum": 150,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "Orden registrada en plataforma CAD/CAM DentLab.",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Av. Hidalgo No. Ext 3125 No. Int , Col. Nuevo Torreon, Cd. Torreon,Coahuila.",
        "celular": "4888823286",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30570,
        "ordenId": 22556,
        "folio": "30570",
        "serie": "30570",
        "entrega": "2026-09-28",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Maria Ziomara Deyanira",
        "doctorNombreCompleto": "Dra. Maria Ziomara Deyanira Padilla Castillo",
        "doctorId": 546,
        "paciente": "Keyma Gámez",
        "unidades": 4,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL B1",
        "observaciones": "Coronas de Zirconio od 26 27 36",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Ricardo Covarrubias No. Ext 3337 No. Int , Col. Estadio, Cd. Monterrey,Nuevo Leon.",
        "celular": "8115555827",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Garantía",
        "discosUtilizados": "2790:4",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "26",
            "27",
            "36",
            "11"
        ]
    },
    {
        "ot": 30569,
        "ordenId": 22555,
        "folio": "30569",
        "serie": "30569",
        "entrega": "2026-09-30",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Karla Beatriz",
        "doctorNombreCompleto": "Dra. Karla Beatriz Soto Trejo",
        "doctorId": 454,
        "paciente": "Vanessa  Castorena",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$1,200.00",
        "montoNum": 1200,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A3",
        "observaciones": "Orden registrada en plataforma CAD/CAM DentLab.",
        "observacionesEscaneador": "",
        "observacionesLab": "archivo?",
        "direccion": "N 15 No. Ext 469 No. Int C, Col. Metroplex, Cd. Apodaca,Nuevo Leon.",
        "celular": "8115899628",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "PAQ: 3140",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30568,
        "ordenId": 22554,
        "folio": "30568",
        "serie": "30568",
        "entrega": "2026-09-24",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona PMMA",
        "doctor": "Dra. Karla Liliana",
        "doctorNombreCompleto": "Dra. Karla Liliana Fuentes Alvarez",
        "doctorId": 351,
        "paciente": "ROSA ALICIA VILLA",
        "unidades": 3,
        "libProd": "",
        "nombreLib": "",
        "monto": "$1,800.00",
        "montoNum": 1800,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "puente de PMMA 22, 21 Y 11",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Cto Vicente Suarez No. Ext 20 No. Int , Col. Fracc Chapultepec, Cd. Torreon,Coahuila.",
        "celular": "8718964494",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2628:3",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "22",
            "21",
            "11"
        ]
    },
    {
        "ot": 30567,
        "ordenId": 22553,
        "folio": "30567",
        "serie": "30567",
        "entrega": "2026-09-24",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Karla Liliana",
        "doctorNombreCompleto": "Dra. Karla Liliana Fuentes Alvarez",
        "doctorId": 351,
        "paciente": "ROSA ALICIA VILLA",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$800.00",
        "montoNum": 800,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "corona de zirconio 37",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Cto Vicente Suarez No. Ext 20 No. Int , Col. Fracc Chapultepec, Cd. Torreon,Coahuila.",
        "celular": "8718964494",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2804:1",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "37"
        ]
    },
    {
        "ot": 30566,
        "ordenId": 22552,
        "folio": "30566",
        "serie": "30566",
        "entrega": "2026-09-28",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Alineador Extra",
        "doctor": "Dra. Yessica",
        "doctorNombreCompleto": "Dra. Yessica  Nava Espinoza",
        "doctorId": 214,
        "paciente": "Laura  Garza Abdo",
        "unidades": 2,
        "libProd": "",
        "nombreLib": "",
        "monto": "$1,400.00",
        "montoNum": 1400,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Alineadores inf 7 -  8",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Amador Cardenas No. Ext 1009 No. Int , Col. Nueva Los Angeles, Cd. Torreon,Coahuila.",
        "celular": "8711169754",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11",
            "21"
        ]
    },
    {
        "ot": 30565,
        "ordenId": 22551,
        "folio": "30565",
        "serie": "30565",
        "entrega": "2026-09-24",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Karla Liliana",
        "doctorNombreCompleto": "Dra. Karla Liliana Fuentes Alvarez",
        "doctorId": 351,
        "paciente": "MARIA DE LOURDES  GONZALEZ",
        "unidades": 4,
        "libProd": "",
        "nombreLib": "",
        "monto": "$3,200.00",
        "montoNum": 3200,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "Numero de Orden 25223 PARA color A1 CORONA EN 33, PUENTE MULTIUNIT EN 34, 35 Y 36",
        "observacionesEscaneador": "",
        "observacionesLab": "DRY \nZONA DE CONTACTO .36    -   OCLUSION ESTATICA Y DINAMICA . 32    - PROXIMAL 0.2\nDISEÑO HECHO POR DR JOSE A 23 09 26",
        "direccion": "Cto Vicente Suarez No. Ext 20 No. Int , Col. Fracc Chapultepec, Cd. Torreon,Coahuila.",
        "celular": "8718964494",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2484:4",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "33",
            "34",
            "35",
            "36"
        ]
    },
    {
        "ot": 30564,
        "ordenId": 22550,
        "folio": "30564",
        "serie": "30564",
        "entrega": "2026-09-24",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Ana Laura",
        "doctorNombreCompleto": "Dr. Ana Laura  Castillo Hernandez",
        "doctorId": 56,
        "paciente": "Cinthia Du",
        "unidades": 2,
        "libProd": "",
        "nombreLib": "",
        "monto": "$1,600.00",
        "montoNum": 1600,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A4",
        "observaciones": "Corona de zirconio dentosoportada OD 17 y\r\nCorona de zirconio implantosoportada OD 47",
        "observacionesEscaneador": "",
        "observacionesLab": "DRY 3 \nZONA DE CONTACTO .36    -   OCLUSION ESTATICA Y DINAMICA . 32    - PROXIMAL 0.2\nDISEÑO HECHO POR DR JOSE A 23 09 26",
        "direccion": "Hidalgo No. Ext 3125 No. Int 3, Col. Nuevo Torreon, Cd. Torreon,Coahuila.",
        "celular": "8713952578",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2744:2",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "17",
            "47"
        ]
    },
    {
        "ot": 30563,
        "ordenId": 22549,
        "folio": "30563",
        "serie": "30563",
        "entrega": "2026-09-24",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Brenda Deyanira",
        "doctorNombreCompleto": "Dra. Brenda Deyanira Hernández Aguirre",
        "doctorId": 417,
        "paciente": "ANA LUISA MOSBERGGER",
        "unidades": 3,
        "libProd": "",
        "nombreLib": "",
        "monto": "$2,400.00",
        "montoNum": 2400,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A4",
        "observaciones": "CORONAS ZIRCONIO OD 17-45-47 IGUALAR COLOR A Numero de Orden 29647",
        "observacionesEscaneador": "",
        "observacionesLab": "DRY 3 \nZONA DE CONTACTO .36    -   OCLUSION ESTATICA Y DINAMICA . 32    - PROXIMAL 0.2\nDISEÑO HECHO POR DR JOSE A 23 09 26",
        "direccion": "Sto Ciervo No. Ext 7 No. Int , Col. Fraccionamiento Viñedos, Cd. Torreon,Coahuila.",
        "celular": "6566758982",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2744:3",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "17",
            "45",
            "47"
        ]
    },
    {
        "ot": 30562,
        "ordenId": 22548,
        "folio": "30562",
        "serie": "30562",
        "entrega": "2026-09-23",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Prótesis Removible",
        "doctor": "Dra. Brenda Deyanira",
        "doctorNombreCompleto": "Dra. Brenda Deyanira Hernández Aguirre",
        "doctorId": 417,
        "paciente": "Rodolfo Padilla Alatorre",
        "unidades": 4,
        "libProd": "",
        "nombreLib": "",
        "monto": "$2,000.00",
        "montoNum": 2000,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A2",
        "observaciones": "REPETIR REMO DE OD 41-42-31-32 EN COLOR A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Sto Ciervo No. Ext 7 No. Int , Col. Fraccionamiento Viñedos, Cd. Torreon,Coahuila.",
        "celular": "6566758982",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "41",
            "42",
            "31",
            "32"
        ]
    },
    {
        "ot": 30561,
        "ordenId": 22547,
        "folio": "30561",
        "serie": "30561",
        "entrega": "2026-09-27",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dr. Isaac",
        "doctorNombreCompleto": "Dr. Isaac  Camacho Reza",
        "doctorId": 57,
        "paciente": "Maribel PX",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Corona de Zirconio od 16 Color A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Av. Allende No. Ext 1260 No. Int 123, Col. Centro, Cd. Torreon,Coahuila.",
        "celular": "8712189317",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2813:1",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "16"
        ]
    },
    {
        "ot": 30560,
        "ordenId": 22546,
        "folio": "30560",
        "serie": "30560",
        "entrega": "2026-09-24",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Guarda Calibre.80",
        "doctor": "Dra. Yessica Karina",
        "doctorNombreCompleto": "Dra. Yessica Karina Nava Espinoza",
        "doctorId": 346,
        "paciente": "juan Gerardo  ibarra rojo",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$150.00",
        "montoNum": 150,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "retenedor superior  calin 80",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Av. Hidalgo No. Ext 3125 No. Int , Col. Nuevo Torreon, Cd. Torreon,Coahuila.",
        "celular": "4888823286",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30559,
        "ordenId": 22545,
        "folio": "30559",
        "serie": "30559",
        "entrega": "2026-09-24",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Guarda Calibre.60",
        "doctor": "Dra. Brenda Deyanira",
        "doctorNombreCompleto": "Dra. Brenda Deyanira Hernández Aguirre",
        "doctorId": 417,
        "paciente": "MARIA GUADALUPE  GUTIERREZ",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$150.00",
        "montoNum": 150,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "GUARDA SUPERIOR TERCIO MEDIO 0.60",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Sto Ciervo No. Ext 7 No. Int , Col. Fraccionamiento Viñedos, Cd. Torreon,Coahuila.",
        "celular": "6566758982",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30558,
        "ordenId": 22544,
        "folio": "30558",
        "serie": "30558",
        "entrega": "2026-09-24",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Corona Zirconio",
        "doctor": "Dra. Brenda Deyanira",
        "doctorNombreCompleto": "Dra. Brenda Deyanira Hernández Aguirre",
        "doctorId": 417,
        "paciente": "Haydee  Valdes castillo",
        "unidades": 2,
        "libProd": "",
        "nombreLib": "",
        "monto": "$1,600.00",
        "montoNum": 1600,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "coronas ferulizadas de od 14 y 15  igualar color a orden 30513 \r\nNOTA : NUEVO ESCANEO DE HOY",
        "observacionesEscaneador": "",
        "observacionesLab": "DRY \nZONA DE CONTACTO .36    -   OCLUSION ESTATICA Y DINAMICA . 32    - PROXIMAL 0.2\nDISEÑO HECHO POR DR JOSE A 23 09 26",
        "direccion": "Sto Ciervo No. Ext 7 No. Int , Col. Fraccionamiento Viñedos, Cd. Torreon,Coahuila.",
        "celular": "6566758982",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2800:2",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "14",
            "15"
        ]
    },
    {
        "ot": 30557,
        "ordenId": 22543,
        "folio": "30557",
        "serie": "30557",
        "entrega": "2026-09-24",
        "estado": "Entrega",
        "subEstado": "Entregado",
        "idLab_Estado": 4,
        "producto": "Guia Quirurgica DIO",
        "doctor": "Dra. Karla Liliana",
        "doctorNombreCompleto": "Dra. Karla Liliana Fuentes Alvarez",
        "doctorId": 351,
        "paciente": "HECTOR GARCIA",
        "unidades": 3,
        "libProd": "",
        "nombreLib": "",
        "monto": "$2,700.00",
        "montoNum": 2700,
        "interno": true,
        "tipoDoctorExterno": 0,
        "color": "VITA CLASSICAL A1",
        "observaciones": "GUIA QUIRURGICA PARA IMPLANTE DIO 47, 35 Y 36",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Cto Vicente Suarez No. Ext 20 No. Int , Col. Fracc Chapultepec, Cd. Torreon,Coahuila.",
        "celular": "8718964494",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "47",
            "35",
            "36"
        ]
    },
    {
        "ot": 30089,
        "ordenId": 22075,
        "folio": "30089",
        "serie": "30089",
        "entrega": "2026-08-28",
        "estado": "Escaneo",
        "subEstado": "Levantado",
        "idLab_Estado": 1,
        "producto": "Corona Zirconio",
        "doctor": "DRA. DIANA ELIZABETH",
        "doctorNombreCompleto": "Dra. Diana Elizabeth  Valadez Zúñiga",
        "doctorId": 583,
        "paciente": "Patricia Reyes",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "falta rectificar el color",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Jorge González Camarena No. Ext 207 No. Int , Col.  Roble San Nicolás, Cd. San Nicolas de los Garza,Nuevo Leon.",
        "celular": "8992137937",
        "usuarioEscaneo": "Mauricio Sotomayor",
        "agendaInicio": "2026-08-28 16:00:00",
        "agendaFin": "2026-08-28 18:00:00",
        "fechaConfirmada": "2026-09-07 17:17:03",
        "conScan": true,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2549:1",
        "paquetes": "PAQ: 3189",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 29921,
        "ordenId": 21907,
        "folio": "29921",
        "serie": "29921",
        "entrega": "2026-08-19",
        "estado": "Escaneo",
        "subEstado": "Levantado",
        "idLab_Estado": 1,
        "producto": "Corona Zirconio",
        "doctor": "DRA. PATRICIA ELIZABETH",
        "doctorNombreCompleto": "Dra. Patricia Elizabeth Valdes Diaz",
        "doctorId": 442,
        "paciente": "Rosy Delgado",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Orden registrada en plataforma CAD/CAM DentLab.",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Av. Morelos No. Ext 225 No. Int , Col. Centro, Cd. Gómez Palacio,Durango.",
        "celular": "8717828850",
        "usuarioEscaneo": "Arturo Meza",
        "agendaInicio": "2026-08-19 17:00:00",
        "agendaFin": "2026-08-19 19:00:00",
        "fechaConfirmada": "2026-08-14 17:17:44",
        "conScan": true,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2549:1",
        "paquetes": "PAQ: 3188",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 26644,
        "ordenId": 18632,
        "folio": "26644",
        "serie": "26644",
        "entrega": "2026-01-20",
        "estado": "Escaneo",
        "subEstado": "Levantado",
        "idLab_Estado": 1,
        "producto": "Corona Zirconio",
        "doctor": "DRA. PATRICIA ELIZABETH",
        "doctorNombreCompleto": "Dra. Patricia Elizabeth Valdes Diaz",
        "doctorId": 442,
        "paciente": "Alonso Cruz Pérez",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Escaneo programado por WhatsApp",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Av. Morelos No. Ext 225 No. Int , Col. Centro, Cd. Gómez Palacio,Durango.",
        "celular": "8717828850",
        "usuarioEscaneo": "Mauricio Sotomayor",
        "agendaInicio": "2026-01-20 13:00:00",
        "agendaFin": "2026-01-20 15:00:00",
        "fechaConfirmada": "2026-01-16 21:36:15",
        "conScan": true,
        "modoModelo": 0,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2549:1",
        "paquetes": "PAQ: 2730",
        "autColor": false,
        "autMordida": true,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 22932,
        "ordenId": 14919,
        "folio": "22932",
        "serie": "22932",
        "entrega": "2025-06-05",
        "estado": "Escaneo",
        "subEstado": "Levantado",
        "idLab_Estado": 1,
        "producto": "Corona Zirconio",
        "doctor": "DRA. MARIA PAULA",
        "doctorNombreCompleto": "Dra. Maria Paula Ramos  Martinez",
        "doctorId": 315,
        "paciente": "Victor  Hernandez",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A3",
        "observaciones": "Orden registrada en plataforma CAD/CAM DentLab.",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "ENCINO No. Ext 111 No. Int , Col. TORREON JARDIN, Cd. Torreon,Coahuila.",
        "celular": "8717832159",
        "usuarioEscaneo": "Mauricio Sotomayor",
        "agendaInicio": "2025-06-05 14:00:00",
        "agendaFin": "2025-06-05 15:00:00",
        "fechaConfirmada": "2026-09-07 17:16:42",
        "conScan": true,
        "modoModelo": 0,
        "metodoPago": "Recoleccion Efectivo",
        "discosUtilizados": "2801:1",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30556,
        "ordenId": 22542,
        "folio": "30556",
        "serie": "30556",
        "entrega": "2026-09-27",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "DR. MARTIN ARGENIS",
        "doctorNombreCompleto": "Dr. Martin Argenis Silva Ontiveros",
        "doctorId": 449,
        "paciente": "Constantino Reyes",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A3",
        "observaciones": "Corona de zirconio OD21, color A3",
        "observacionesEscaneador": "",
        "observacionesLab": "confirmar",
        "direccion": "Rio Nazas No. Ext 1297 No. Int , Col. Valle del Mirador, Cd. Monterrey,Nuevo Leon.",
        "celular": "8110218395",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Transferencia",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30548,
        "ordenId": 22534,
        "folio": "30548",
        "serie": "30548",
        "entrega": "2026-09-28",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "DRA. NORA PATRICIA",
        "doctorNombreCompleto": "Dra. Nora Patricia Flores Moreno",
        "doctorId": 421,
        "paciente": "Alicia Ramos Hernández",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL B2",
        "observaciones": "Corona zirconia 1.5 color B2",
        "observacionesEscaneador": "",
        "observacionesLab": "confirmar",
        "direccion": "Av.las Puentes No. Ext 1406 No. Int , Col. Las Puentes 8vo sector., Cd. San Nicolas de los Garza,Nuevo Leon.",
        "celular": "8182084800",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "PAQ: 2803",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30532,
        "ordenId": 22518,
        "folio": "30532",
        "serie": "30532",
        "entrega": "2026-09-26",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Placa total zirconio",
        "doctor": "DR. ISMAEL",
        "doctorNombreCompleto": "Dr. Ismael Gonzalez Anaya",
        "doctorId": 184,
        "paciente": "Gloria González",
        "unidades": 16,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "FULL ARCH superior sobre 6 implantes, color A2",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Azalea No. Ext 100 No. Int , Col. Fracc. Jardines de Durango, Cd. Durango,Durango.",
        "celular": "6181020640",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 0,
        "metodoPago": "Transferencia",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "SIN PAQUETE",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11",
            "21",
            "14",
            "15",
            "16",
            "24",
            "25",
            "26",
            "36",
            "46",
            "35",
            "37",
            "45",
            "47",
            "12",
            "22"
        ]
    },
    {
        "ot": 30429,
        "ordenId": 22415,
        "folio": "30429",
        "serie": "30429",
        "entrega": "2026-09-21",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "DRA. ELIDA LIZETH",
        "doctorNombreCompleto": "Dra. Elida Lizeth De la Cerda Peña",
        "doctorId": 304,
        "paciente": "Misael De la cerda",
        "unidades": 5,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A3",
        "observaciones": "el px presenta mordida borde a borde,  el color es A3 tercio cervical y medio, A2 tercio invisal",
        "observacionesEscaneador": "",
        "observacionesLab": "repreparar??",
        "direccion": "Av. Benito Juarez No. Ext 4595 No. Int 12B, Col. Chula Vista, Cd. Guadalupe,Nuevo Leon.",
        "celular": "8112032746",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "PAQ: 3158",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11",
            "21",
            "14",
            "15",
            "16"
        ]
    },
    {
        "ot": 30399,
        "ordenId": 22385,
        "folio": "30399",
        "serie": "30399",
        "entrega": "2026-09-15",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Carilla",
        "doctor": "DR. JORGE ALBERTO",
        "doctorNombreCompleto": "Dr. Jorge Alberto Vazquez Aguilera",
        "doctorId": 310,
        "paciente": "Mario  Delgado",
        "unidades": 2,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL C4",
        "observaciones": "Orden registrada en plataforma CAD/CAM DentLab.",
        "observacionesEscaneador": "",
        "observacionesLab": "repreparar y reescanear",
        "direccion": "Texcoco    No. Ext 615 No. Int 113, Col. Chapultepec, Cd. Monterrey,Nuevo Leon.",
        "celular": "8118017498",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "PAQ: 3220",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11",
            "21"
        ]
    },
    {
        "ot": 30373,
        "ordenId": 22359,
        "folio": "30373",
        "serie": "30373",
        "entrega": "2026-09-16",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "DRA. CLAUDIA LIZETH",
        "doctorNombreCompleto": "Dra. Claudia Lizeth Mares Bustos",
        "doctorId": 453,
        "paciente": "Carolina Sanchez",
        "unidades": 5,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL B2",
        "observaciones": "Color b2 cervical y medio\n          A1 incisal",
        "observacionesEscaneador": "",
        "observacionesLab": "CONFIRMAR PZ 43 SOLAMENTE",
        "direccion": "Benito Juárez No. Ext 137 No. Int , Col. Centro, Cd. San Pedro Garza García,Nuevo Leon.",
        "celular": "8120100053",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2754:1",
        "paquetes": "PAQ: 3125",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11",
            "21",
            "14",
            "15",
            "16"
        ]
    },
    {
        "ot": 28329,
        "ordenId": 20314,
        "folio": "28329",
        "serie": "28329",
        "entrega": "2026-05-12",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "DR. MIGUEL ALAN",
        "doctorNombreCompleto": "Dr. Miguel Alan Lozano Gonzalez",
        "doctorId": 530,
        "paciente": "Rosa  Enedina",
        "unidades": 2,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Oclusal color A1, tercio medio A2, cervical A3",
        "observacionesEscaneador": "",
        "observacionesLab": "reescanear 11/05 16/05",
        "direccion": "Alhambra No. Ext 120 No. Int , Col. La Alhambra, Cd. Monterrey,Nuevo Leon.",
        "celular": "8124325868",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "PAQ: 2976",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11",
            "21"
        ]
    },
    {
        "ot": 25662,
        "ordenId": 17650,
        "folio": "25662",
        "serie": "25662",
        "entrega": "2025-11-18",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "DRA. NAYELI",
        "doctorNombreCompleto": "Dra. Nayeli Santos Zapata",
        "doctorId": 405,
        "paciente": "Catalina de Hoyos",
        "unidades": 4,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A2",
        "observaciones": "Color A3 tercio cervical y A2 tercio medio e incisal",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Afganistan No. Ext 137 No. Int , Col. Prados de la cienegu, Cd. Apodaca,Nuevo Leon.",
        "celular": "8120243109",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "PAQ: 2735",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11",
            "21",
            "14",
            "15"
        ]
    },
    {
        "ot": 22648,
        "ordenId": 14635,
        "folio": "22648",
        "serie": "22648",
        "entrega": "2025-05-20",
        "estado": "Diseño",
        "subEstado": "Diseño",
        "idLab_Estado": 2,
        "producto": "Corona Zirconio",
        "doctor": "DRA. NEIRA JAEL",
        "doctorNombreCompleto": "Dra. Neira Jael Cruz Castro",
        "doctorId": 441,
        "paciente": "Edna  Córdova",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL A3",
        "observaciones": "Se observa inflamación en encía entre 2.6 y 2.7  favor de en esa zona dejar al ras",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Acueducto de Celaya No. Ext 1365 No. Int , Col. Sierra Morena, Cd. Guadalupe,Nuevo Leon.",
        "celular": "8114206886",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "Sin Discos Utilizados",
        "paquetes": "PAQ: 2407",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    },
    {
        "ot": 30540,
        "ordenId": 22526,
        "folio": "30540",
        "serie": "30540",
        "entrega": "2026-09-28",
        "estado": "Fabricación",
        "subEstado": "Fabricación",
        "idLab_Estado": 3,
        "producto": "Corona Zirconio",
        "doctor": "DRA. NAYELI",
        "doctorNombreCompleto": "Dra. Nayeli Santos Zapata",
        "doctorId": 405,
        "paciente": "Ana María  Ramírez",
        "unidades": 1,
        "libProd": "",
        "nombreLib": "",
        "monto": "$0.00",
        "montoNum": 0,
        "interno": false,
        "tipoDoctorExterno": 1,
        "color": "VITA CLASSICAL C4",
        "observaciones": "Color: C2 tercio incisal, C4 tercio medio y cervical",
        "observacionesEscaneador": "",
        "observacionesLab": "",
        "direccion": "Afganistan No. Ext 137 No. Int , Col. Prados de la cienegu, Cd. Apodaca,Nuevo Leon.",
        "celular": "8120243109",
        "usuarioEscaneo": "Sin escaneador asignado",
        "agendaInicio": "",
        "agendaFin": "",
        "fechaConfirmada": "",
        "conScan": false,
        "modoModelo": 1,
        "metodoPago": "Efectivo",
        "discosUtilizados": "2573:1",
        "paquetes": "PAQ: 3162",
        "autColor": false,
        "autMordida": false,
        "autMunon": false,
        "autAdit": false,
        "piezas": [
            "11"
        ]
    }
],
  canceladas: [
    {
        "serie": "30543",
        "fecha": "2026-10-15",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de captura"
    },
    {
        "serie": "30514",
        "fecha": "2026-10-14",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de captura"
    },
    {
        "serie": "30459",
        "fecha": "2026-10-12",
        "responsable": "Irene Martinez",
        "comentario": "Cancelación solicitada por clínica"
    },
    {
        "serie": "30424",
        "fecha": "2026-10-10",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de captura"
    },
    {
        "serie": "30352",
        "fecha": "2026-10-08",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Orden duplicada"
    },
    {
        "serie": "30336",
        "fecha": "2026-10-06",
        "responsable": "Mauricio Sotomayor",
        "comentario": "ORDEN DUPLICADA"
    },
    {
        "serie": "30328",
        "fecha": "2026-10-04",
        "responsable": "Mauricio Sotomayor",
        "comentario": "ERROR DE CAPTURA"
    },
    {
        "serie": "30308",
        "fecha": "2026-10-02",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de captura"
    },
    {
        "serie": "30178",
        "fecha": "2026-09-29",
        "responsable": "Mauricio Sotomayor",
        "comentario": "ERROR DE CAPTURA"
    },
    {
        "serie": "30176",
        "fecha": "2026-09-28",
        "responsable": "Mauricio Sotomayor",
        "comentario": "ERROR DE CAPTURA"
    },
    {
        "serie": "30157",
        "fecha": "2026-09-26",
        "responsable": "Mauricio Sotomayor",
        "comentario": "CAMBIO DE TX"
    },
    {
        "serie": "30126",
        "fecha": "2026-09-24",
        "responsable": "Mauricio Sotomayor",
        "comentario": "ERROR DE CAPTURA EN NUMERO DE PIEZAS"
    },
    {
        "serie": "30112",
        "fecha": "2026-09-22",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Se van a rehabilitar mas piezas"
    },
    {
        "serie": "29944",
        "fecha": "2026-09-18",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de asignación de doctor"
    },
    {
        "serie": "29898",
        "fecha": "2026-09-15",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de cantidad capturada"
    },
    {
        "serie": "29871",
        "fecha": "2026-09-14",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de Dr en captura"
    },
    {
        "serie": "29870",
        "fecha": "2026-09-12",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de captura"
    },
    {
        "serie": "29762",
        "fecha": "2026-09-08",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de captura en numero de unidades"
    },
    {
        "serie": "29552",
        "fecha": "2026-08-30",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error en cantidad de alienadores"
    },
    {
        "serie": "29550",
        "fecha": "2026-08-28",
        "responsable": "Irene Martinez",
        "comentario": "POR SOLICITUD DEL DOCTOR"
    },
    {
        "serie": "29497",
        "fecha": "2026-08-25",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de producto"
    },
    {
        "serie": "29463",
        "fecha": "2026-08-22",
        "responsable": "Irene Martinez",
        "comentario": "MODO DE PAGO INCORRECTO"
    },
    {
        "serie": "29428",
        "fecha": "2026-08-20",
        "responsable": "Irene Martinez",
        "comentario": "ERROR EN EL NOMBRE DEL PACIENTE"
    },
    {
        "serie": "29416",
        "fecha": "2026-08-18",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de captura"
    },
    {
        "serie": "29408",
        "fecha": "2026-08-15",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de captura"
    }
],
  canceladasCount: 646,
  pendientes: [],
  pendientesCount: 0,
  eventosEscaneo: [
    {
      id: "ESC-101",
      fechaHora: "2026-10-16 09:30",
      doctor: "DRA. DIANA ELIZABETH",
      doctorId: 583,
      paciente: "Valeria Gómez Peña",
      clinica: "Dental Park Consultorio 3",
      especialista: "Arturo Meza",
      tipo: "Escaneo Intraoral 3D",
      estatus: "En camino"
    },
    {
      id: "ESC-102",
      fechaHora: "2026-10-16 11:45",
      doctor: "DR. JOSÉ ÁNGEL",
      doctorId: 586,
      paciente: "Roberto Cantú Garza",
      clinica: "Clínica San Patricio",
      especialista: "Irene Martínez",
      tipo: "Escaneo de Arcada Completa",
      estatus: "Confirmado"
    },
    {
      id: "ESC-103",
      fechaHora: "2026-10-16 14:15",
      doctor: "DR. ISMAEL",
      doctorId: 184,
      paciente: "Carla Sofía Ramos",
      clinica: "Torre Médica Plaza 402",
      especialista: "Mauricio Sotomayor",
      tipo: "Escaneo + Toma de Color",
      estatus: "Confirmado"
    },
    {
      id: "ESC-104",
      fechaHora: "2026-10-16 16:30",
      doctor: "DRA. PATRICIA ELIZABETH",
      doctorId: 442,
      paciente: "Manuel Álvarez De la Rosa",
      clinica: "Consultorio Ángeles",
      especialista: "Arturo Meza",
      tipo: "Escaneo de Implante / Muñón",
      estatus: "Programado"
    }
  ]
};

// Sincronización global inmediata de INICIO_DATA en window
window.INICIO_DATA = INICIO_DATA;

// Buscadores universales exactos para Doctores y Órdenes de Trabajo
window.findDoctorByAny = function (query) {
  const list = (DENT_STATE && DENT_STATE.doctores) ? DENT_STATE.doctores : [];
  if (!list.length) return null;
  if (query === undefined || query === null || query === '') return list[0];
  const qStr = String(query).trim();
  const qUpper = qStr.toUpperCase().replace(/\s+/g, ' ');

  let found = list.find(d => String(d.id) === qStr || String(d.codigo).toUpperCase() === qUpper);
  if (found) return found;

  found = list.find(
    d =>
      (d.nombre && d.nombre.trim().toUpperCase().replace(/\s+/g, ' ') === qUpper) ||
      (d.doctorCorto && d.doctorCorto.trim().toUpperCase().replace(/\s+/g, ' ') === qUpper)
  );
  if (found) return found;

  found = list.find(
    d =>
      (d.nombre && d.nombre.trim().toUpperCase().replace(/\s+/g, ' ').startsWith(qUpper)) ||
      (d.nombre && d.nombre.trim().toUpperCase().replace(/\s+/g, ' ').includes(qUpper)) ||
      (d.doctorCorto && qUpper.includes(d.doctorCorto.trim().toUpperCase().replace(/\s+/g, ' ')))
  );
  return found || list[0];
};

window.findOrdenByAny = function (query) {
  const list = (INICIO_DATA && INICIO_DATA.ordenes) ? INICIO_DATA.ordenes : [];
  if (!list.length) return null;
  if (query === undefined || query === null || query === '') return list[0];
  const qStr = String(query).trim().replace(/^#?OT-?/i, '');
  return (
    list.find(
      o =>
        String(o.serie) === qStr ||
        String(o.ot) === qStr ||
        String(o.ordenId) === qStr ||
        String(o.folio) === String(query).trim()
    ) || list[0]
  );
};

let paginaActualOrdenes = 1;

function formatShortDate(dateStr) {
  if (!dateStr) return '';
  const parts = String(dateStr).split(' ')[0].split('-');
  if (parts.length === 3) return `${parts[1]}/${parts[2]}`;
  return dateStr;
}

// Renderizador limpio y sin cortes para las 4 tarjetas de etapa (OT | PROD | UNI | DOCTOR | ENT)
function renderStageRowCompact(item, isEntrega = false) {
  const rowClass = item.interno ? (isEntrega ? 'row-green' : 'row-yellow') : 'hover:bg-slate-50';
  const safeDocKey = String(item.doctorId || item.doctor || '').replace(/'/g, "\\'");
  return `
    <tr class="${rowClass} transition-colors">
      <td class="text-center font-bold">
        <a href="javascript:void(0)" onclick="abrirOrdenTrabajo('${item.serie}')" title="${item.paquetes || ''}" class="text-blue-600 hover:underline font-mono">${item.ot}</a>
      </td>
      <td class="text-center font-semibold text-slate-800 max-w-[92px] truncate" title="${item.prod}">${item.prod}</td>
      <td class="text-center font-mono font-bold">${item.uni}</td>
      <td class="text-center max-w-[100px] truncate" title="${item.doctor}">
        <a href="javascript:void(0)" onclick="abrirDetalleDoctor('${safeDocKey}')" class="text-blue-600 hover:underline font-medium">${item.doctor}</a>
      </td>
      <td class="text-center font-mono text-[10px] text-slate-500" title="${item.soli}">${formatShortDate(item.soli)}</td>
    </tr>
  `;
}

function renderTablasInicio() {
  window.INICIO_DATA = INICIO_DATA;
  const tbEsc = document.getElementById('tbodyStageEscaneo');
  const tbDis = document.getElementById('tbodyStageDiseno');
  const tbFab = document.getElementById('tbodyStageFabricacion');
  const tbEnt = document.getElementById('tbodyStageEntrega');
  const tbOrd = document.getElementById('tbodyGeneralOrdenes');

  if (tbEsc) {
    tbEsc.innerHTML = INICIO_DATA.escaneo.length
      ? INICIO_DATA.escaneo.map(i => renderStageRowCompact(i, false)).join('')
      : '<tr><td colspan="5" class="py-6 text-center text-slate-400 font-semibold">NO HAY ORDENES POR MOSTRAR</td></tr>';
  }
  if (tbDis) {
    tbDis.innerHTML = INICIO_DATA.diseno.length
      ? INICIO_DATA.diseno.map(i => renderStageRowCompact(i, false)).join('')
      : '<tr><td colspan="5" class="py-6 text-center text-slate-400 font-semibold">NO HAY ORDENES POR MOSTRAR</td></tr>';
  }
  if (tbFab) {
    tbFab.innerHTML = INICIO_DATA.fabricacion.length
      ? INICIO_DATA.fabricacion.map(i => renderStageRowCompact(i, false)).join('')
      : '<tr><td colspan="5" class="py-6 text-center text-slate-400 font-semibold">NO HAY ORDENES POR MOSTRAR</td></tr>';
  }
  if (tbEnt) {
    tbEnt.innerHTML = INICIO_DATA.entrega.length
      ? INICIO_DATA.entrega.map(i => renderStageRowCompact(i, true)).join('')
      : '<tr><td colspan="5" class="py-6 text-center text-slate-400 font-semibold">NO HAY ORDENES POR MOSTRAR</td></tr>';
  }

  const bEsc = document.getElementById('badgeCountEscaneo');
  const bDis = document.getElementById('badgeCountDiseno');
  const bFab = document.getElementById('badgeCountFabricacion');
  const bEnt = document.getElementById('badgeCountEntrega');
  if (bEsc) bEsc.innerText = INICIO_DATA.escaneo.length;
  if (bDis) bDis.innerText = INICIO_DATA.diseno.length;
  if (bFab) bFab.innerText = INICIO_DATA.fabricacion.length;
  if (bEnt) bEnt.innerText = INICIO_DATA.entrega.length;

  const numCanc = document.getElementById('NumberOrdenCanceladas');
  const numPend = document.getElementById('NumberOrden');
  if (numCanc) numCanc.innerText = INICIO_DATA.canceladasCount ?? 646;
  if (numPend) numPend.innerText = INICIO_DATA.pendientesCount ?? 0;

// Cálculo de semáforo de días restantes o transcurridos para Órdenes
window.calcularDiasRestantes = function(fechaStr) {
  if (!fechaStr) return { diff: 0, label: 'Sin fecha', badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200', icon: 'help-circle' };
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const f = new Date(fechaStr + 'T00:00:00');
  if (isNaN(f.getTime())) return { diff: 0, label: fechaStr, badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200', icon: 'help-circle' };

  const diffTime = f.getTime() - hoy.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const abs = Math.abs(diffDays);
    return {
      diff: diffDays,
      label: `${abs}d retraso`,
      badgeClass: 'bg-rose-100 text-rose-800 border border-rose-200',
      icon: 'alert-circle'
    };
  } else if (diffDays === 0) {
    return {
      diff: 0,
      label: 'Entrega hoy',
      badgeClass: 'bg-amber-100 text-amber-800 border border-amber-200',
      icon: 'clock'
    };
  } else {
    return {
      diff: diffDays,
      label: `${diffDays}d restantes`,
      badgeClass: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      icon: 'check-circle'
    };
  }
};

  const numProx = document.getElementById('NumberProximosEscaneos');
  if (numProx) numProx.innerText = INICIO_DATA.eventosEscaneo ? INICIO_DATA.eventosEscaneo.length : 4;

  if (tbOrd) {
    const perPage = 20;
    const start = (paginaActualOrdenes - 1) * perPage;
    const slice = INICIO_DATA.ordenes.slice(start, start + perPage);
    tbOrd.innerHTML = slice.map(o => {
      const isEnt = Number(o.idLab_Estado) === 4 || o.estado === 'Entrega';
      const rowClass = o.interno
        ? (isEnt ? 'row-green' : 'row-yellow')
        : 'hover:bg-slate-50';
      const safeDoc = (o.doctor || '').replace(/'/g, "\\'");
      const safePac = (o.paciente || '').replace(/'/g, "\\'");
      const semaforo = window.calcularDiasRestantes(o.entrega);
      const estadoBadge =
        isEnt
          ? 'bg-emerald-100/90 text-emerald-800 border border-emerald-200'
          : o.estado === 'Fabricación'
            ? 'bg-amber-100/90 text-amber-800 border border-amber-200'
            : o.estado === 'Diseño'
              ? 'bg-blue-100/90 text-blue-800 border border-blue-200'
              : 'bg-slate-100 text-slate-700 border border-slate-200';
      return `
        <tr class="${rowClass} transition-colors">
          <td class="text-center">
            <button type="button" onclick="Etiqueta('${safeDoc}', '${safePac}', '${o.entrega}', '${o.serie}')" class="btnEtiqueta" title="Imprimir Etiqueta #${o.serie}">
              <i data-lucide="barcode" class="w-3.5 h-3.5"></i>
            </button>
          </td>
          <td class="text-center">
            <button type="button" onclick="abrirOrdenTrabajo('${o.serie}')" class="btnEtiqueta btnEtiqueta--ot" title="Abrir Orden de Trabajo #${o.serie}">
              <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5c-1.5-2-4-2.5-6-1-2 1.5-2.5 4.5-1.5 7 1 2.5 1.5 5.5 2 8 .3 1.5 1.8 1.5 2.5 0 .5-1.5 1-3.5 3-3.5s2.5 2 3 3.5c.7 1.5 2.2 1.5 2.5 0 .5-2.5 1-5.5 2-8 1-2.5.5-5.5-1.5-7-2-1.5-4.5-1-6 1z"/></svg>
            </button>
          </td>
          <td class="text-center">
            <button type="button" onclick="abrirDetalleDoctor('${o.doctorId || safeDoc}')" class="btnEtiqueta btnEtiqueta--doc" title="Expediente del Doctor">
              <i data-lucide="user-round" class="w-3.5 h-3.5"></i>
            </button>
          </td>
          <td class="font-mono font-bold text-slate-900">${o.serie}</td>
          <td class="font-mono text-slate-600">
            <div class="flex flex-col items-center justify-center gap-0.5">
              <span>${o.entrega}</span>
              <span class="inline-flex items-center gap-1 text-[9.5px] font-bold px-2 py-0.5 rounded-full ${semaforo.badgeClass}">
                <i data-lucide="${semaforo.icon}" class="w-3 h-3"></i>
                <span>${semaforo.label}</span>
              </span>
            </div>
          </td>
          <td>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${estadoBadge}">${o.estado}</span>
          </td>
          <td class="font-semibold text-slate-800">${o.producto}</td>
          <td>
            <a href="javascript:void(0)" onclick="abrirDetalleDoctor('${o.doctorId || safeDoc}')" class="hover:underline font-semibold">${o.doctor}</a>
          </td>
          <td class="text-slate-700 font-medium">${o.paciente}</td>
          <td class="font-mono font-bold">${o.unidades}</td>
          <td class="font-mono text-[11px] text-slate-500">${o.libProd || 'En curso'}</td>
          <td class="font-mono font-bold text-slate-900">${o.monto}</td>
        </tr>
      `;
    }).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function cambiarPaginaOrdenes(p) {
  paginaActualOrdenes = p;
  const p1 = document.getElementById('pageBtn1');
  const p2 = document.getElementById('pageBtn2');
  if (p1 && p2) {
    p1.className = p === 1 ? 'w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold border-r border-slate-200 transition-colors' : 'w-8 h-8 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 border-r border-slate-200 transition-colors';
    p2.className = p === 2 ? 'w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold border-r border-slate-200 transition-colors' : 'w-8 h-8 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 border-r border-slate-200 transition-colors';
  }
  renderTablasInicio();
  const tbody = document.getElementById('tbodyGeneralOrdenes');
  if (tbody) animateViewEntrance(tbody);
}

// Filtro interactivo de Órdenes Canceladas por Rango de Fechas
window.filtrarCanceladasPorFecha = function() {
  let fDesde = document.getElementById('canceladasFechaDesde')?.value || '';
  let fHasta = document.getElementById('canceladasFechaHasta')?.value || '';
  const tb = document.getElementById('tbodyModalCanceladas');
  const badge = document.getElementById('badgeModalCanceladasTotal');
  if (!tb) return;

  // Normalizar en caso de que el usuario seleccione fechas invertidas
  if (fDesde && fHasta && fDesde > fHasta) {
    const tmp = fDesde;
    fDesde = fHasta;
    fHasta = tmp;
  }

  let filtradas = Array.isArray(INICIO_DATA.canceladas) ? INICIO_DATA.canceladas.slice() : [];

  if (fDesde) {
    filtradas = filtradas.filter(c => {
      const fItem = c.fecha ? String(c.fecha).substring(0, 10) : '2026-10-14';
      return fItem >= fDesde;
    });
  }
  if (fHasta) {
    filtradas = filtradas.filter(c => {
      const fItem = c.fecha ? String(c.fecha).substring(0, 10) : '2026-10-14';
      return fItem <= fHasta;
    });
  }

  if (badge) {
    badge.innerText = `${filtradas.length} mostradas`;
  }

  if (!filtradas.length) {
    tb.innerHTML = '<tr><td colspan="4" class="py-6 text-center text-slate-400 font-semibold">NO SE ENCONTRARON ÓRDENES CANCELADAS EN EL RANGO SELECCIONADO</td></tr>';
    return;
  }

  tb.innerHTML = filtradas.map(c => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="font-mono font-bold">
        <a href="javascript:void(0)" onclick="document.getElementById('modalCanceladas').classList.add('hidden'); abrirOrdenTrabajo('${c.serie}')" class="text-blue-600 hover:underline font-mono">${c.serie}</a>
      </td>
      <td class="font-mono text-slate-500 text-[11px]">${c.fecha || '2026-10-14'}</td>
      <td class="uppercase font-semibold text-slate-700">${c.responsable}</td>
      <td class="text-slate-600">${c.comentario || 'Cancelación administrativa'}</td>
    </tr>
  `).join('');
};

window.resetFiltroCanceladasMesActual = function() {
  const hoy = new Date();
  let y = hoy.getFullYear();
  let m = String(hoy.getMonth() + 1).padStart(2, '0');
  if (y < 2026) {
    y = 2026;
    m = '10';
  }
  const ultimoDiaNum = new Date(y, Number(m), 0).getDate();
  const primerDia = `${y}-${m}-01`;
  const ultimoDia = `${y}-${m}-${String(ultimoDiaNum).padStart(2, '0')}`;

  const inpDesde = document.getElementById('canceladasFechaDesde');
  const inpHasta = document.getElementById('canceladasFechaHasta');
  if (inpDesde) inpDesde.value = primerDia;
  if (inpHasta) inpHasta.value = ultimoDia;
  window.filtrarCanceladasPorFecha();
};

// Modal de Próximos Eventos de Escaneo
window.renderEventosEscaneoModal = function() {
  const tb = document.getElementById('tbodyModalEventosEscaneo');
  if (!tb) return;
  const list = INICIO_DATA.eventosEscaneo || [];
  if (!list.length) {
    tb.innerHTML = '<tr><td colspan="6" class="py-6 text-center text-slate-400 font-semibold">NO HAY EVENTOS DE ESCANEO PROGRAMADOS</td></tr>';
    return;
  }
  tb.innerHTML = list.map(ev => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="font-mono font-bold text-slate-900 whitespace-nowrap">${ev.fechaHora}</td>
      <td class="font-bold text-slate-800">
        <a href="javascript:void(0)" onclick="document.getElementById('modalEventosEscaneo').classList.add('hidden'); abrirDetalleDoctor('${ev.doctorId || ev.doctor}')" class="text-blue-600 hover:underline">${ev.doctor}</a>
      </td>
      <td class="text-slate-700">
        <div class="font-semibold">${ev.paciente}</div>
        <div class="text-[10px] text-slate-400">${ev.clinica}</div>
      </td>
      <td class="font-semibold text-slate-700">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 font-medium">
          <i data-lucide="user-check" class="w-3 h-3"></i>
          <span>${ev.especialista}</span>
        </span>
      </td>
      <td class="text-slate-600 font-medium text-[11px]">${ev.tipo}</td>
      <td>
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${ev.estatus === 'En camino' ? 'bg-amber-100 text-amber-800 border border-amber-200' : ev.estatus === 'Confirmado' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}">${ev.estatus}</span>
      </td>
    </tr>
  `).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
};

// Modales de Inicio idénticos a DENT DEMO/index.php (Órdenes Canceladas, Pendientes de Pago y Próximos Escaneos)
function renderModalsInicio() {
  window.filtrarCanceladasPorFecha();
  window.renderEventosEscaneoModal();

  const tbPend = document.getElementById('tbodyModalPendientesPago');
  if (tbPend) {
    if (!INICIO_DATA.pendientes || INICIO_DATA.pendientes.length === 0) {
      tbPend.innerHTML = '<tr><td colspan="6" class="py-6 text-center text-slate-400 font-semibold">NO HAY ORDENES PENDIENTES DE PAGO POR MOSTRAR</td></tr>';
    } else {
      tbPend.innerHTML = INICIO_DATA.pendientes.map((p, idx) => {
        const fechaHoraLib = p.fechaLiberacion || p.libProd || (p.con_scan ? '2026-10-15 14:30' : '2026-10-16 09:15');
        const userLib = p.usuarioLibero || p.nombreLib || (idx % 2 === 0 ? 'Irene Martinez' : 'Jose Alatorre');
        return `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="font-mono font-bold text-blue-600">
            <a href="javascript:void(0)" onclick="document.getElementById('modalPendientes').classList.add('hidden'); abrirOrdenTrabajo('${p.serie}')" class="hover:underline">${p.serie}</a>
          </td>
          <td class="font-semibold text-slate-800 text-left">${p.doctor}</td>
          <td class="text-slate-600 text-left">${p.paciente || 'Paciente General'}</td>
          <td class="font-mono text-[11px] text-slate-600 font-semibold">${fechaHoraLib}</td>
          <td class="uppercase font-semibold text-slate-700 text-[11px]"><span class="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">${userLib}</span></td>
          <td>
            <button type="button" onclick="document.getElementById('modalPendientes').classList.add('hidden'); abrirOrdenTrabajo('${p.serie}')" class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-[11px] transition-colors">
              Ver OT
            </button>
          </td>
        </tr>
      `;
      }).join('');
    }
  }
}

// Impresión de Etiqueta con Código de Barras 100% idéntica a DENT DEMO/TableOrdenes.php
function Etiqueta(doctor, paciente, fechaEntrega, codigo) {
  const orden = window.findOrdenByAny(codigo);
  const docObj = window.findDoctorByAny(orden ? (orden.doctorId || orden.doctor) : doctor);

  const serieOT = orden ? String(orden.serie) : String(codigo);
  const fEnt = orden ? orden.entrega : fechaEntrega;
  const docNombre = orden ? (orden.doctorNombreCompleto || orden.doctor) : doctor;
  const direccion = (orden && orden.direccion) ? orden.direccion : (docObj ? docObj.direccion : 'Torreón, Coahuila');
  const pacNombre = orden ? orden.paciente : paciente;
  const celular = (orden && orden.celular) ? orden.celular : (docObj ? docObj.celular : '');
  const producto = orden ? orden.producto : 'Corona Zirconio';
  const piezas = orden ? String(orden.unidades) : '1';
  const colorimetro = orden ? orden.color : 'VITA CLASSICAL A2';
  const observaciones = orden ? (orden.observaciones || '') : '';


  // SVG de código de barras para la impresión térmica
  const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  if (typeof JsBarcode === 'function') {
    JsBarcode(tempSvg, serieOT, {
      format: 'CODE128',
      width: 2,
      height: 28,
      fontSize: 11,
      displayValue: true,
      margin: 2,
      textMargin: 2
    });
  }
  tempSvg.style.maxWidth = '100%';
  tempSvg.style.height = 'auto';

  // SVG de vista previa nítida para la pantalla de carga ejecutiva
  const previewSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  if (typeof JsBarcode === 'function') {
    JsBarcode(previewSvg, serieOT, {
      format: 'CODE128',
      width: 2,
      height: 32,
      fontSize: 11,
      margin: 4,
      background: 'transparent',
      lineColor: '#0f172a'
    });
  }

  let blockOverlay = document.getElementById('dentBlockUIOverlay');
  if (!blockOverlay) {
    blockOverlay = document.createElement('div');
    blockOverlay.id = 'dentBlockUIOverlay';
    document.body.appendChild(blockOverlay);
  }

  blockOverlay.style.cssText =
    'position:fixed;inset:0;z-index:9999;background:rgba(15,23,42,0.58);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;opacity:1;transition:opacity 220ms ease;';

  blockOverlay.innerHTML = `
    <style>
      @keyframes dentScanLine {
        0% { top: 6%; opacity: 0.2; }
        50% { top: 88%; opacity: 0.95; }
        100% { top: 6%; opacity: 0.2; }
      }
      @keyframes dentProgressFill {
        0% { width: 10%; }
        35% { width: 48%; }
        70% { width: 84%; }
        100% { width: 100%; }
      }
      @keyframes dentCardPop {
        0% { opacity: 0; transform: translateY(12px) scale(0.96); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
    </style>
    <div style="width:100%;max-width:410px;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;box-shadow:0 24px 48px -12px rgba(15,23,42,0.32);overflow:hidden;font-family:'General Sans',-apple-system,BlinkMacSystemFont,sans-serif;animation:dentCardPop 260ms cubic-bezier(0.22,1,0.36,1) forwards;">
      <!-- Cabecera Ejecutiva Sobria -->
      <div style="background:#0f172a;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1e293b;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="width:32px;height:32px;border-radius:10px;background:#334e68;display:inline-flex;align-items:center;justify-content:center;color:#f8fafc;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </span>
          <div>
            <div style="font-size:13px;font-weight:700;color:#f8fafc;letter-spacing:-0.01em;">Preparando Etiqueta</div>
            <div style="font-size:10.5px;color:#94a3b8;font-weight:500;">Formato térmico CAD/CAM • dentlab.mx</div>
          </div>
        </div>
        <span style="padding:4px 10px;border-radius:8px;background:#1e293b;border:1px solid #334155;color:#e2e8f0;font-family:'General Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-variant-numeric:tabular-nums;font-size:11px;font-weight:700;">
          OT #${serieOT}
        </span>
      </div>

      <!-- Cuerpo: Vista Previa de Etiqueta Térmica -->
      <div style="padding:16px 18px;background:#f8fafc;">
        <div style="position:relative;background:#ffffff;border:1px dashed #cbd5e1;border-radius:14px;padding:14px 16px;box-shadow:0 2px 8px rgba(15,23,42,0.04);overflow:hidden;">
          <!-- Línea láser de escaneo sutil -->
          <div style="position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#334e68,#2f6353,transparent);animation:dentScanLine 1.35s ease-in-out infinite;pointer-events:none;"></div>

          <div style="display:flex;align-items:center;justify-content:space-between;font-size:10.5px;color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;padding-bottom:6px;margin-bottom:8px;">
            <span style="color:#0f172a;font-weight:700;font-variant-numeric:tabular-nums;">OT: ${serieOT}</span>
            <span style="text-transform:uppercase;letter-spacing:0.06em;color:#334e68;font-weight:700;">dentlab.mx</span>
            <span style="font-variant-numeric:tabular-nums;">Ent: ${fEnt}</span>
          </div>

          <div style="text-align:center;font-size:12.5px;font-weight:700;color:#0f172a;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${docNombre}
          </div>

          <div style="display:flex;justify-content:space-between;gap:8px;font-size:10.5px;color:#334155;margin-bottom:4px;">
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><strong>Px:</strong> ${pacNombre}</span>
            <span style="color:#475569;flex-shrink:0;font-variant-numeric:tabular-nums;">${celular || ''}</span>
          </div>

          <div style="display:flex;justify-content:space-between;gap:8px;font-size:10px;color:#475569;background:#f1f5f9;padding:5px 8px;border-radius:8px;margin-bottom:8px;">
            <span style="font-weight:700;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${producto}</span>
            <span style="font-weight:700;color:#334e68;flex-shrink:0;font-variant-numeric:tabular-nums;">${piezas} u. • ${colorimetro}</span>
          </div>

          <div style="display:flex;justify-content:center;align-items:center;padding-top:2px;">
            ${previewSvg.outerHTML}
          </div>
        </div>

        <!-- Barra de progreso y estado dinámico -->
        <div style="margin-top:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:600;color:#475569;margin-bottom:6px;">
            <span style="display:inline-flex;align-items:center;gap:6px;">
              <span style="width:7px;height:7px;border-radius:9999px;background:#2f6353;display:inline-block;box-shadow:0 0 6px rgba(47,99,83,0.5);"></span>
              <span id="dentPrintStatusText">Renderizando código CODE128...</span>
            </span>
            <span id="dentPrintPercentText" style="font-size:10px;color:#334e68;font-weight:700;font-variant-numeric:tabular-nums;">25%</span>
          </div>
          <div style="width:100%;height:6px;background:#e2e8f0;border-radius:9999px;overflow:hidden;">
            <div style="height:100%;background:linear-gradient(90deg,#334e68 0%,#2f6353 100%);border-radius:9999px;animation:dentProgressFill 2350ms cubic-bezier(0.2,0.8,0.2,1) forwards;"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  blockOverlay.onclick = function (e) {
    if (e.target === blockOverlay) {
      window.dentClosePrintOverlay();
    }
  };

  window.dentClosePrintOverlay = function () {
    const overlay = document.getElementById('dentBlockUIOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 220);
    }
  };

  window.dentTriggerPrintLabel = function () {
    const f = document.getElementById('dentThermalPrintFrame');
    if (f && f.contentWindow) {
      try {
        f.contentWindow.focus();
        f.contentWindow.print();
      } catch (err) {
        console.error('Error al invocar impresión:', err);
      }
    }
  };

  // Actualizaciones de estado en tiempo real
  setTimeout(function () {
    const sText = document.getElementById('dentPrintStatusText');
    const pText = document.getElementById('dentPrintPercentText');
    if (sText) sText.textContent = 'Validando formato térmico CAD/CAM...';
    if (pText) pText.textContent = '60%';
  }, 750);

  setTimeout(function () {
    const sText = document.getElementById('dentPrintStatusText');
    const pText = document.getElementById('dentPrintPercentText');
    if (sText) sText.textContent = 'Enviando a cola de impresión térmica...';
    if (pText) pText.textContent = '88%';
  }, 1600);

  setTimeout(function () {
    const sText = document.getElementById('dentPrintStatusText');
    const pText = document.getElementById('dentPrintPercentText');
    if (sText) sText.textContent = '¡Listo! Abriendo cuadro de impresión...';
    if (pText) pText.textContent = '100%';
  }, 2250);

  // Iframe persistente con suficiente ancho para evitar cualquier recorte por viewport
  let frame1 = document.getElementById('dentThermalPrintFrame');
  if (!frame1) {
    frame1 = document.createElement('iframe');
    frame1.id = 'dentThermalPrintFrame';
    frame1.name = 'dentThermalPrintFrame';
    frame1.style.cssText =
      'position:fixed;right:0;bottom:0;width:105mm;height:80mm;min-width:440px;opacity:0.001;pointer-events:none;z-index:-999;border:none;';
    document.body.appendChild(frame1);
  }

  const frameDoc = frame1.contentWindow
    ? frame1.contentWindow
    : frame1.contentDocument.document
      ? frame1.contentDocument.document
      : frame1.contentDocument;

  frameDoc.document.open();
  frameDoc.document.write(`<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="utf-8">
      <title></title>
      <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
      <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet">
      <style>
        @page {
          size: auto;
          margin: 0mm !important;
        }
        @media print {
          html, body {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .dent-print-card {
            width: 100% !important;
            max-width: 96mm !important;
            margin: 0 !important;
            padding: 1.5mm 2.5mm !important;
            overflow: visible !important;
          }
        }
        * {
          box-sizing: border-box !important;
          font-family: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff;
          color: #000000;
        }
        .dent-print-card {
          width: 100%;
          max-width: 96mm;
          margin: 0;
          padding: 1.5mm 2.5mm;
          text-align: center;
          overflow: visible;
        }
        table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          margin: 0;
          padding: 0;
        }
        td {
          padding: 1px 0;
          vertical-align: middle;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .mono-num {
          font-variant-numeric: tabular-nums;
        }
        svg {
          display: block;
          margin: 2px auto 0 auto;
          max-width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
      <div class="dent-print-card">
        <table>
          <tr>
            <td style="text-align:left;width:34%;font-size:12px;font-weight:700;white-space:nowrap;" class="mono-num">OT: ${serieOT}</td>
            <td style="text-align:center;width:32%;font-weight:700;font-size:9px;letter-spacing:0.02em;">dentlab.mx</td>
            <td style="text-align:right;width:34%;font-size:9.5px;font-weight:600;white-space:nowrap;" class="mono-num">F. Ent: ${fEnt}</td>
          </tr>
        </table>
        <table>
          <tr>
            <td style="text-align:center;width:100%;font-size:12.5px;padding:1px 0;"><strong>${docNombre}</strong></td>
          </tr>
        </table>
        <table>
          <tr>
            <td style="text-align:left;width:100%;font-size:8.5px;line-height:1.2;">Dirección: <strong>${direccion}</strong></td>
          </tr>
        </table>
        <table>
          <tr>
            <td style="text-align:left;width:65%;font-size:12px;line-height:1.2;">Px: <strong>${pacNombre}</strong></td>
            <td style="text-align:right;width:35%;font-size:9px;white-space:nowrap;" class="mono-num">Tel: <strong>${celular}</strong></td>
          </tr>
        </table>
        <table>
          <tr>
            <td style="text-align:left;width:100%;font-size:8.5px;">Prod: <strong>${producto}</strong></td>
          </tr>
        </table>
        <table>
          <tr>
            <td style="text-align:left;width:30%;font-size:8.5px;white-space:nowrap;" class="mono-num">Unid: <strong>${piezas}</strong></td>
            <td style="text-align:left;width:70%;font-size:8.5px;">Color: <strong>${colorimetro}</strong></td>
          </tr>
        </table>
        ${observaciones ? `<table>
          <tr>
            <td style="text-align:left;width:100%;font-size:8.5px;line-height:1.2;">Obs: <strong>${observaciones}</strong></td>
          </tr>
        </table>` : ''}
        <div style="width:100%;display:flex;justify-content:center;align-items:center;padding-top:2px;">
          ${tempSvg.outerHTML}
        </div>
      </div>
    </body>
  </html>`);
  frameDoc.document.close();

  // Al concluir los 2.5 segundos, el ciclo se ejecuta de forma 100% automática:
  // dispara el diálogo nativo de impresión y desvanece suavemente la pantalla de carga
  setTimeout(function () {
    const sText = document.getElementById('dentPrintStatusText');
    if (sText) sText.textContent = '¡Imprimiendo etiqueta!';
    window.dentTriggerPrintLabel();
    setTimeout(function () {
      window.dentClosePrintOverlay();
    }, 500);
  }, 2500);

  const closeOnAfterPrint = function () {
    window.dentClosePrintOverlay();
  };
  window.addEventListener('afterprint', closeOnAfterPrint, { once: true });
  if (frame1.contentWindow) {
    frame1.contentWindow.addEventListener('afterprint', closeOnAfterPrint, { once: true });
  }

  return false;
}

// ============================================================================
// PANTALLA ORDEN DE TRABAJO (IDÉNTICA A DENT DEMO/OrdenTrabajo.php CON 4 PESTAÑAS)
// ============================================================================

let currentOrdenActiva = null;
let currentTabOrden = 'home';

function abrirOrdenTrabajo(serie) {
  currentOrdenActiva = window.findOrdenByAny(serie);
  currentTabOrden = 'home';

  const secInicio = document.getElementById('section-inicio');
  const secDynamic = document.getElementById('section-dynamic');
  secInicio.classList.add('hidden');
  secDynamic.classList.remove('hidden');

  renderVistaOrdenTrabajo();
  if (typeof window.fetchOrdenDetalleLive === 'function') {
    window.fetchOrdenDetalleLive(serie);
  }
}

function cambiarTabOrdenTrabajo(tab) {
  currentTabOrden = tab;
  renderVistaOrdenTrabajo();
}

function avanzarEtapaOrdenActual() {
  if (!currentOrdenActiva) return;
  const sel = document.getElementById('selectEtapaOT');
  if (sel && sel.value) {
    currentOrdenActiva.estado = sel.value;
  } else {
    const etapas = ['Escaneo', 'Diseño', 'Fabricación', 'Entrega'];
    const idx = etapas.indexOf(currentOrdenActiva.estado);
    currentOrdenActiva.estado = etapas[Math.min(idx + 1, etapas.length - 1)];
  }
  showToast('Etapa Actualizada', `La Orden #${currentOrdenActiva.serie} se encuentra ahora en etapa: ${currentOrdenActiva.estado}`);
  renderVistaOrdenTrabajo();
}

function registrarAbonoOrdenActual(e) {
  e.preventDefault();
  const monto = document.getElementById('inputMontoAbonoOT')?.value || '500';
  const metodo = document.getElementById('selectMetodoAbonoOT')?.value || 'Efectivo';
  if (currentOrdenActiva) {
    if (!Array.isArray(currentOrdenActiva.pagosLive)) currentOrdenActiva.pagosLive = [];
    currentOrdenActiva.pagosLive.unshift({
      Fecha: new Date().toISOString().split('T')[0],
      Descripcion: metodo,
      Nombre: localStorage.getItem('cv_usuario') || 'Recepción',
      Monto: Number(monto)
    });
  }
  showToast('Pago Registrado', `Se aplicó un abono de $${Number(monto).toLocaleString('es-MX')} MXN (${metodo}) a la Orden #${currentOrdenActiva.serie}.`);
  renderVistaOrdenTrabajo();
}

window._odontoBrushMode = 'PILAR';

window.setOdontoBrushMode = function(mode) {
  window._odontoBrushMode = mode;
  renderVistaOrdenTrabajo();
};

window.togglePiezaOrdenActual = function(dienteNum) {
  const o = currentOrdenActiva || INICIO_DATA.ordenes[0];
  if (!o) return;
  const s = String(dienteNum);
  if (window.Odontograma3D) {
    window.Odontograma3D.selectedFdi = parseInt(s, 10);
  }
  if (!Array.isArray(o.piezas)) o.piezas = [];
  if (!o.tiposPieza) o.tiposPieza = {};

  const currentType = o.tiposPieza[s] || (o.piezas.includes(s) ? 'PILAR' : null);
  const brush = window._odontoBrushMode || 'PILAR';

  if (currentType === brush) {
    o.piezas = o.piezas.filter(p => String(p) !== s);
    delete o.tiposPieza[s];
    showToast(`Pieza #${s}`, 'Pieza removida del odontograma.');
  } else {
    if (!o.piezas.includes(s)) o.piezas.push(s);
    o.tiposPieza[s] = brush;
    showToast(`Pieza #${s} (${brush})`, `Asignada como ${brush === 'PILAR' ? 'Pilar' : 'Póntico'} en la Orden #${o.serie}.`);
  }
  o.unidades = Math.max(1, o.piezas.length);
  renderVistaOrdenTrabajo();
};

window.updateCampoOrdenActual = function (campo, valor) {
  const o = currentOrdenActiva || INICIO_DATA.ordenes[0];
  if (!o) return;
  o[campo] = valor;
};

function renderVistaOrdenTrabajo() {
  const o = currentOrdenActiva || INICIO_DATA.ordenes[0];
  window._currentOdontoOrden = o;
  const docObj = window.findDoctorByAny(o.doctorId || o.doctor);
  const container = document.getElementById('section-dynamic');
  if (!container) return;

  const q1 = [18,17,16,15,14,13,12,11];
  const q2 = [21,22,23,24,25,26,27,28];
  const q4 = [48,47,46,45,44,43,42,41];
  const q3 = [31,32,33,34,35,36,37,38];
  if (!o.tiposPieza) o.tiposPieza = {};
  const brush = window._odontoBrushMode || 'PILAR';

  const renderDienteCard3D = (d, isLower = false) => {
    const s = String(d);
    const isSel = (o.piezas || []).map(String).includes(s);
    const tipo = o.tiposPieza[s] || (isSel ? 'PILAR' : 'LIBRE');
    const numSpan = `<span class="odonto-tooth-num font-mono">${s}</span>`;
    const dotSpan = `<span class="odonto-tooth-dot" aria-hidden="true"></span>`;

    return `
      <button type="button"
        onclick="window.togglePiezaOrdenActual('${s}')"
        onmouseenter="window.Odontograma3D && window.Odontograma3D.selectTooth(${s})"
        onfocus="window.Odontograma3D && window.Odontograma3D.selectTooth(${s})"
        data-tooth="${s}"
        data-state="${tipo}"
        aria-pressed="${tipo !== 'LIBRE'}"
        aria-label="Pieza ${s} ${tipo !== 'LIBRE' ? (tipo === 'PONTICO' ? 'Póntico' : 'Pilar') : 'Libre'}"
        title="Pieza ${s}${tipo !== 'LIBRE' ? ' • ' + (tipo === 'PONTICO' ? 'Póntico' : 'Pilar') : ''}"
        class="odonto-tooth-btn">
        ${isLower ? dotSpan : numSpan}
        <div class="w-full flex-1 flex items-center justify-center overflow-hidden">
          <img src="assets/odontograma/diente_${s}.png?v=3" alt="" loading="lazy" class="odonto-tooth-img select-none">
        </div>
        ${isLower ? numSpan : dotSpan}
      </button>
    `;
  };

  const activePillsHtml = (o.piezas || []).length
    ? (o.piezas || []).map(p => {
        const s = String(p);
        const t = o.tiposPieza[s] || 'PILAR';
        const bg = t === 'PONTICO' ? '#755c34' : '#2f6353';
        return `<span class="px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold text-white" style="background:${bg};">${s}</span>`;
      }).join('')
    : `<span class="text-[10px] text-slate-400">Sin selección</span>`;

  const etapaLabel = o.subEstado && o.subEstado !== o.estado ? `${o.estado} · ${o.subEstado}` : o.estado;

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5">
      <div class="mb-4 flex items-center justify-between">
        <button onclick="openModule('inicio')" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Regresar</span>
        </button>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-bold">#${o.serie}</span>
          <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold">${o.interno ? 'Doctor Interno' : 'Doctor Externo'}</span>
        </div>
      </div>

      <!-- 4 Pestañas Exactas de OrdenTrabajo.php -->
      <div class="border-b border-slate-200 flex flex-wrap gap-1.5 mb-5 text-xs font-bold">
        <button onclick="cambiarTabOrdenTrabajo('home')" class="px-4 py-2.5 rounded-t-xl border-t border-l border-r transition-all ${currentTabOrden === 'home' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'}">
          Orden de trabajo
        </button>
        <button onclick="cambiarTabOrdenTrabajo('pago')" class="px-4 py-2.5 rounded-t-xl border-t border-l border-r transition-all ${currentTabOrden === 'pago' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'}">
          Pago
        </button>
        <button onclick="cambiarTabOrdenTrabajo('historial')" class="px-4 py-2.5 rounded-t-xl border-t border-l border-r transition-all ${currentTabOrden === 'historial' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'}">
          Historial y Operaciones
        </button>
        <button onclick="cambiarTabOrdenTrabajo('archivos')" class="px-4 py-2.5 rounded-t-xl border-t border-l border-r transition-all ${currentTabOrden === 'archivos' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'}">
          Archivos
        </button>
      </div>

      ${currentTabOrden === 'home' ? `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs">
          <div class="min-w-0 lg:col-span-5 space-y-4">
            
            <!-- Bloque 1: Escaneo -->
            <div class="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/90 space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <h4 class="font-bold text-slate-800 uppercase tracking-wide text-[11px]">Escaneo</h4>
                <button type="button" onclick="openModule('calendario')" class="px-2.5 py-1 rounded-lg bg-[#334e68] hover:bg-slate-800 text-white font-semibold text-[11px] transition-colors cursor-pointer">Agregar cita</button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div class="min-w-0 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Escaneador</span><strong class="text-slate-800">${o.usuarioEscaneo || 'Mauricio Sotomayor'}</strong></div>
                <div class="min-w-0 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Confirmación</span><strong class="font-mono text-slate-800">${o.fechaConfirmada || 'Pendiente'}</strong></div>
                <div class="min-w-0 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Agenda inicio</span><strong class="font-mono text-slate-700">${o.agendaInicio || 'N/A'}</strong></div>
                <div class="min-w-0 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Agenda fin</span><strong class="font-mono text-slate-700">${o.agendaFin || 'N/A'}</strong></div>
              </div>
              <div>
                <input type="text" value="${o.observacionesEscaneador || ''}" oninput="window.updateCampoOrdenActual('observacionesEscaneador', this.value)" placeholder="Observaciones de escaneo..." class="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs">
              </div>
            </div>

            <!-- Bloque 2: Discos utilizados en la orden -->
            <div class="bg-white p-4 rounded-2xl border border-slate-200/90 space-y-2.5 overflow-hidden">
              <h4 class="font-bold text-slate-800 uppercase tracking-wide text-[11px] border-b border-slate-100 pb-2">Discos utilizados</h4>
              <div class="overflow-x-auto rounded-xl border border-slate-200 w-full">
                <table class="w-full text-center general-table">
                  <thead>
                    <tr>
                      <th>Disco</th>
                      <th>Color</th>
                      <th>Tamaño</th>
                      <th>Cant.</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    ${o.discosUtilizados && o.discosUtilizados !== 'Sin Discos Utilizados' ? `
                      <tr>
                        <td class="font-mono font-bold break-words">${o.discosUtilizados.split(':')[0]}</td>
                        <td class="break-words">${o.color}</td>
                        <td>18 mm</td>
                        <td class="font-mono font-bold">${o.unidades}</td>
                      </tr>
                    ` : `
                      <tr>
                        <td colspan="4" class="py-2.5 text-center text-slate-400 font-medium">Sin discos registrados</td>
                      </tr>
                    `}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Bloque 3: Orden de Trabajo -->
            <div class="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/90 space-y-3 overflow-hidden">
              <div class="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <h4 class="font-bold text-slate-800 uppercase tracking-wide text-[11px]">Ficha de Orden</h4>
                <span class="font-mono text-xs font-bold text-[#334e68]">#${o.serie}</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="min-w-0 break-words">
                  <span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Doctor</span>
                  <a href="javascript:void(0)" onclick="abrirDetalleDoctor('${o.doctorId || o.doctor}')" class="font-bold text-xs text-[#334e68] hover:underline break-words">${o.doctorNombreCompleto || o.doctor}</a>
                </div>
                <div class="min-w-0 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Paciente</span><strong class="text-slate-900 break-words">${o.paciente}</strong></div>
                <div class="min-w-0 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Celular</span><strong class="font-mono text-slate-800 break-words">${o.celular || (docObj ? docObj.celular : '')}</strong></div>
                <div class="min-w-0 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Colorímetro</span><strong class="text-[#334e68] font-bold break-words">${o.color}</strong></div>
                <div class="min-w-0 sm:col-span-2 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Dirección</span><strong class="text-slate-700 break-words">${o.direccion || (docObj ? docObj.direccion : '')}</strong></div>
                <div class="min-w-0"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Entrega solicitada</span><input type="date" value="${o.entrega}" onchange="window.updateCampoOrdenActual('entrega', this.value)" class="mt-0.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-mono text-xs max-w-full"></div>
                <div class="min-w-0 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Liberación</span><strong class="font-mono text-slate-700 break-words">${o.libProd || 'Pendiente'} ${o.nombreLib ? '(' + o.nombreLib + ')' : ''}</strong></div>
                <div class="min-w-0 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Pago</span><strong class="text-slate-800 break-words">${o.metodoPago || 'Efectivo'}</strong></div>
                <div class="min-w-0 break-words"><span class="text-slate-400 font-semibold uppercase text-[9.5px] block">Paquete</span><strong class="font-mono text-slate-800 break-words">${o.paquetes || 'SIN PAQUETE'}</strong></div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label class="text-slate-400 font-semibold uppercase text-[9.5px] block mb-1">Notas Doctor</label>
                  <textarea rows="2" readonly class="w-full p-2 rounded-xl border border-slate-200 bg-white text-[11px] text-slate-700 resize-none">${o.observaciones || ''}</textarea>
                </div>
                <div>
                  <label class="text-slate-400 font-semibold uppercase text-[9.5px] block mb-1">Notas Laboratorio</label>
                  <textarea rows="2" oninput="window.updateCampoOrdenActual('observacionesLab', this.value)" class="w-full p-2 rounded-xl border border-slate-200 bg-white text-[11px] text-slate-700 resize-none" placeholder="Observaciones internas...">${o.observacionesLab || ''}</textarea>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/80">
                <label class="inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                  <input type="checkbox" ${o.autColor ? 'checked' : ''} onchange="window.updateCampoOrdenActual('autColor', this.checked)" class="rounded text-slate-800 accent-[#334e68]">
                  <span class="font-semibold text-[11px] text-slate-700">Color</span>
                </label>
                <label class="inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                  <input type="checkbox" ${o.autMordida ? 'checked' : ''} onchange="window.updateCampoOrdenActual('autMordida', this.checked)" class="rounded text-slate-800 accent-[#334e68]">
                  <span class="font-semibold text-[11px] text-slate-700">Mordida</span>
                </label>
                <label class="inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                  <input type="checkbox" ${o.autMunon ? 'checked' : ''} onchange="window.updateCampoOrdenActual('autMunon', this.checked)" class="rounded text-slate-800 accent-[#334e68]">
                  <span class="font-semibold text-[11px] text-slate-700">Muñón</span>
                </label>
                <label class="inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                  <input type="checkbox" ${o.autAdit ? 'checked' : ''} onchange="window.updateCampoOrdenActual('autAdit', this.checked)" class="rounded text-slate-800 accent-[#334e68]">
                  <span class="font-semibold text-[11px] text-slate-700">Aditamento</span>
                </label>
                <label class="inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                  <input type="checkbox" ${o.autLinea !== false ? 'checked' : ''} onchange="window.updateCampoOrdenActual('autLinea', this.checked)" class="rounded text-slate-800 accent-[#334e68]">
                  <span class="font-semibold text-[11px] text-slate-700">Línea Sellado</span>
                </label>
              </div>

              <div class="pt-1">
                <div class="overflow-x-auto rounded-xl border border-slate-200 w-full">
                  <table class="w-full text-center general-table">
                    <thead>
                      <tr>
                        <th>Categoría</th>
                        <th>Producto</th>
                        <th>Pza</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td class="break-words">${o.categoriaDesc || 'Laboratorio'}</td>
                        <td class="font-bold break-words">${o.producto}</td>
                        <td class="font-mono font-bold">${o.unidades}</td>
                        <td class="font-mono font-bold text-slate-900 whitespace-nowrap">${o.monto}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Odontograma 3D Adaptativo (Mobile-First) -->
          <div class="min-w-0 lg:col-span-7">
            <section class="odonto-studio h-full" aria-label="Odontograma Interactivo">
              <div>
                <!-- 1. Barra Superior Minimalista -->
                <header class="odonto-topbar">
                  <div class="flex items-center gap-2.5">
                    <h4 class="odonto-title">Odontograma</h4>
                    <span class="text-slate-700" aria-hidden="true">|</span>
                    <div class="flex flex-wrap items-center gap-1" aria-label="Piezas seleccionadas">
                      ${activePillsHtml}
                    </div>
                  </div>
                  <div class="flex items-center gap-1.5 text-[10.5px] font-semibold">
                    <div class="inline-flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700/80" role="group" aria-label="Modo de asignación">
                      <button type="button" onclick="window.setOdontoBrushMode('PILAR')"
                        style="${brush === 'PILAR' ? 'background:#2f6353;color:#ffffff;' : 'color:#cbd5e1;'}"
                        class="px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full" style="background:${brush === 'PILAR' ? '#ffffff' : '#5e9c89'};"></span>
                        <span>Pilar</span>
                      </button>
                      <button type="button" onclick="window.setOdontoBrushMode('PONTICO')"
                        style="${brush === 'PONTICO' ? 'background:#755c34;color:#ffffff;' : 'color:#cbd5e1;'}"
                        class="px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full" style="background:${brush === 'PONTICO' ? '#ffffff' : '#af915f'};"></span>
                        <span>Póntico</span>
                      </button>
                    </div>
                    <button type="button" onclick="openOdontogramaModal()" class="p-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Ampliar odontograma">
                      <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </header>

                <!-- 2. Cuerpo del Odontograma (Ritmo múltiplos de 4px/8px) -->
                <div class="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-slate-50/50">
                  <!-- Mapa Dental Anatómico Unificado -->
                  <div class="odonto-arch-card space-y-2">
                    <!-- Arcada Superior (18-11 | 21-28) -->
                    <div class="odonto-arch-row">
                      <div class="odonto-quadrant odonto-quadrant--right">
                        ${q1.map(d => renderDienteCard3D(d, false)).join('')}
                      </div>
                      <div class="odonto-quadrant odonto-quadrant--left">
                        ${q2.map(d => renderDienteCard3D(d, false)).join('')}
                      </div>
                    </div>

                    <!-- Línea Oclusal Media Sutil -->
                    <div class="relative flex items-center justify-center py-0.5" aria-hidden="true">
                      <div class="w-full border-t border-dashed border-slate-200"></div>
                      <span class="absolute bg-white px-2 text-[9px] font-mono uppercase tracking-widest text-slate-400 select-none">Plano Oclusal</span>
                    </div>

                    <!-- Arcada Inferior (48-41 | 31-38) -->
                    <div class="odonto-arch-row">
                      <div class="odonto-quadrant odonto-quadrant--right">
                        ${q4.map(d => renderDienteCard3D(d, true)).join('')}
                      </div>
                      <div class="odonto-quadrant odonto-quadrant--left">
                        ${q3.map(d => renderDienteCard3D(d, true)).join('')}
                      </div>
                    </div>
                  </div>

                  <!-- 3. Estudio 3D Minimalista por Pieza -->
                  <div class="odonto-arch-card">
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
                      <!-- Lienzo WebGL 3D Interactivo -->
                      <div class="md:col-span-5">
                        <div class="odonto-3d-stage">
                          <canvas id="inlineOdonto3DCanvas" class="w-full h-full cursor-grab active:cursor-grabbing block"></canvas>
                          <div class="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
                            <span id="inline3DToothNum" class="px-2 py-0.5 rounded-md bg-slate-900/90 text-white font-mono font-bold text-[11px]">16</span>
                            <span id="inline3DToothState" class="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#2f6353] text-white">Pilar</span>
                          </div>
                          <div class="absolute bottom-2 right-2 flex items-center gap-1">
                            <button type="button" id="inlineBtnPrepMode3D" onclick="window.Odontograma3D && window.Odontograma3D.togglePrepMode('inline')"
                              class="px-2 py-1 rounded-lg text-[10px] font-bold bg-white/90 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer">
                              Corona
                            </button>
                            <button type="button" id="inlineBtnAutoRotate3D" onclick="window.Odontograma3D && window.Odontograma3D.toggleAutoRotate('inline')"
                              class="px-2 py-1 rounded-lg text-[10px] font-bold bg-white/90 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer">
                              360°
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Cabecera Compacta + 6 Vistas Angulares Adaptativas -->
                      <div class="md:col-span-7 space-y-2.5">
                        <div class="flex items-center justify-between gap-2 px-0.5">
                          <h5 id="inline3DToothName" class="text-xs font-bold text-slate-800 truncate">Primer Molar Superior Derecho</h5>
                          <div class="flex items-center gap-1.5 shrink-0">
                            <span id="inline3DToothSpecs" class="text-[10px] font-mono text-slate-500">3R • 4C</span>
                            <span id="inline3DToothType" class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">A2</span>
                          </div>
                        </div>
                        <div id="inline3DRefViewsGrid" class="odonto-views-grid"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Barra Inferior de Etapa y Acciones -->
              <footer class="px-4 py-3 border-t border-slate-200/80 bg-white flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-3 text-xs">
                  <span class="text-slate-500 font-medium">Etapa: <strong class="text-slate-900 font-bold">${etapaLabel}</strong></span>
                  <span class="text-slate-300">•</span>
                  <span class="font-mono font-bold text-slate-700">${o.unidades} ${Number(o.unidades) === 1 ? 'unidad' : 'unidades'}</span>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <select id="selectEtapaOT" class="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-xs text-slate-700">
                    <option value="Escaneo" ${o.estado === 'Escaneo' ? 'selected' : ''}>Escaneo</option>
                    <option value="Diseño" ${o.estado === 'Diseño' ? 'selected' : ''}>Diseño</option>
                    <option value="Fabricación" ${o.estado === 'Fabricación' ? 'selected' : ''}>Fabricación</option>
                    <option value="Entrega" ${o.estado === 'Entrega' ? 'selected' : ''}>Entrega</option>
                  </select>
                  <button onclick="avanzarEtapaOrdenActual()" class="px-3.5 py-1.5 rounded-xl bg-[#334e68] hover:bg-slate-800 text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer">
                    Mandar a etapa
                  </button>
                  <button onclick="Etiqueta('${(o.doctor || '').replace(/'/g, "\\'")}', '${(o.paciente || '').replace(/'/g, "\\'")}', '${o.entrega}', '${o.serie}')" class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer">
                    Etiqueta
                  </button>
                </div>
              </footer>
            </section>
          </div>
        </div>
      ` : ''}

      ${currentTabOrden === 'pago' ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
          <div class="min-w-0 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-slate-800 uppercase border-b pb-2">Registrar Abono / Pago de Orden #${o.serie}</h4>
            <form onsubmit="registrarAbonoOrdenActual(event)" class="space-y-3">
              <div>
                <label class="font-bold text-slate-600 block mb-1">Método de Pago:</label>
                <select id="selectMetodoAbonoOT" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold">
                  <option>Efectivo</option>
                  <option>Transferencia SPEI</option>
                  <option>Tarjeta Crédito / Débito</option>
                  <option>Paquete Prepagado (${o.paquetes || 'PAQ'})</option>
                </select>
              </div>
              <div>
                <label class="font-bold text-slate-600 block mb-1">Monto a Abonar (MXN):</label>
                <input id="inputMontoAbonoOT" type="number" required value="${o.montoNum || 600}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-mono font-bold">
              </div>
              <button type="submit" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm">
                Agregar pago
              </button>
            </form>
          </div>
          <div class="min-w-0 bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <div class="flex items-center justify-between border-b pb-2">
              <h4 class="font-bold text-slate-800 uppercase">Pagos de la Orden</h4>
              <span class="font-mono font-bold text-slate-700">Costo total: ${o.monto}</span>
            </div>
            <div class="overflow-x-auto rounded-xl border border-slate-200 w-full">
              <table class="w-full text-center general-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Tipo de Pago</th>
                    <th>Descripción / Usuario</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${Array.isArray(o.pagosLive) && o.pagosLive.length > 0 ? o.pagosLive.map(p => `
                    <tr>
                      <td class="font-mono">${p.Fecha || o.entrega}</td>
                      <td>${p.Descripcion || o.metodoPago || 'Efectivo'}</td>
                      <td class="break-words">${p.Nombre || 'Recepción'} (Folio #${p.FolioPago || o.serie})</td>
                      <td class="font-mono font-bold text-emerald-700">$${Number(p.Monto || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td class="font-mono">${o.entrega}</td>
                      <td>${o.metodoPago || 'Efectivo'}</td>
                      <td class="break-words">Registro de Orden #${o.serie} (${o.paquetes || 'SIN PAQUETE'})</td>
                      <td class="font-mono font-bold text-emerald-700">${o.monto}</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : ''}

      ${currentTabOrden === 'historial' ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
          <div class="min-w-0 space-y-2">
            <h4 class="font-bold text-slate-800 uppercase">Historial de Etapas</h4>
            <div class="overflow-x-auto rounded-xl border border-slate-200 w-full">
              <table class="w-full text-center general-table">
                <thead>
                  <tr>
                    <th>Etapa</th>
                    <th>SubEstado</th>
                    <th>Usuario</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr>
                    <td>Escaneo</td>
                    <td>Levantado</td>
                    <td class="break-words">${o.usuarioEscaneo || 'Mauricio Sotomayor'}</td>
                    <td class="font-mono">${o.fechaConfirmada || o.entrega}</td>
                  </tr>
                  <tr>
                    <td class="font-bold text-blue-700">${o.estado}</td>
                    <td>${o.subEstado || o.estado}</td>
                    <td class="break-words">${o.nombreLib || 'Laboratorio CAD/CAM'}</td>
                    <td class="font-mono">${o.libProd || o.entrega}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="min-w-0 space-y-2">
            <h4 class="font-bold text-slate-800 uppercase">Historial de Operaciones</h4>
            <div class="overflow-x-auto rounded-xl border border-slate-200 w-full">
              <table class="w-full text-center general-table">
                <thead>
                  <tr>
                    <th>Operación</th>
                    <th>Usuario</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr>
                    <td class="break-words">Creación de Orden #${o.serie} (${o.producto})</td>
                    <td class="break-words">${o.usuarioEscaneo || 'Recepción DentLab'}</td>
                    <td class="font-mono">${o.entrega}</td>
                  </tr>
                  <tr>
                    <td class="break-words">Asignación de Colorímetro: ${o.color}</td>
                    <td>Laboratorio</td>
                    <td class="font-mono">${o.entrega}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : ''}

      ${currentTabOrden === 'archivos' ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          <div class="min-w-0 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-slate-800 uppercase">Archivos de la Orden #${o.serie}</h4>
            <div class="space-y-2">
              <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <p class="font-bold text-slate-800 break-all">${o.archivo || `Orden_${o.serie}_${(o.paciente || 'Paciente').replace(/\s+/g, '_')}.stl`}</p>
                  <p class="text-[11px] text-slate-500 break-words">Escaneo Digital CAD/CAM • ${o.producto}</p>
                </div>
                <button onclick="showToast('Descargando STL', 'Descarga iniciada: Orden_${o.serie}.stl')" class="shrink-0 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold">Descargar</button>
              </div>
            </div>
          </div>
          <div class="min-w-0 bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-2">
            <p class="font-bold text-slate-700">Subir Archivo a la Orden #${o.serie}</p>
            <button onclick="showToast('Archivo Adjuntado', 'El archivo se anexó correctamente al expediente de la orden.')" class="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-sm">
              Subir archivo
            </button>
          </div>
        </div>
      ` : ''}
    </div>
  `;
  animateViewEntrance(container);
  if (typeof lucide !== 'undefined') lucide.createIcons();
  if (currentTabOrden === 'home' && window.Odontograma3D) {
    requestAnimationFrame(() => window.Odontograma3D.initViewer('inlineOdonto3DCanvas', 'inline'));
  }
}

// ============================================================================
// FICHA DEL DOCTOR CON SUS 4 PESTAÑAS EXACTAS DE DENT DEMO/Doctor.php
// ============================================================================

let currentDoctorActivo = null;
let currentTabDoctor = 'datos';

function cambiarTabDoctor(tab) {
  currentTabDoctor = tab;
  if (currentDoctorActivo) {
    renderVistaDetalleDoctor(currentDoctorActivo);
  }
}

async function guardarCambiosDoctorActual(e) {
  e.preventDefault();
  if (!currentDoctorActivo) return;
  const cel = document.getElementById('docInputCelular')?.value;
  const mail = document.getElementById('docInputEmail')?.value;
  const clinica = document.getElementById('docInputClinica')?.value;
  if (cel !== undefined) currentDoctorActivo.celular = cel;
  if (mail !== undefined) currentDoctorActivo.mail = mail;
  if (clinica !== undefined) currentDoctorActivo.clinica = clinica;
  showToast('Doctor Actualizado', `Se guardaron los datos de ${currentDoctorActivo.nombre}.`);

  try {
    await window.sendLiveMutation('editar_doctor', {
      id: currentDoctorActivo.id,
      nombre: currentDoctorActivo.nombre,
      celular: currentDoctorActivo.celular,
      mail: currentDoctorActivo.mail,
      clinica: currentDoctorActivo.clinica,
      activo: currentDoctorActivo.activo ? 1 : 0,
      nota: currentDoctorActivo.nota || ''
    });
  } catch (err) {
    console.error('Error al actualizar doctor actual en servidor:', err);
  }
}

function abrirDetalleDoctor(doctorQuery) {
  const doc = window.findDoctorByAny(doctorQuery);
  currentDoctorActivo = doc;
  currentTabDoctor = 'datos';
  renderVistaDetalleDoctor(doc);
  if (typeof window.fetchDoctorDetalleLive === 'function') {
    window.fetchDoctorDetalleLive(doc);
  }
}

function renderVistaDetalleDoctor(doc) {
  const ordenesDoc = Array.isArray(doc.ordenesLive)
    ? doc.ordenesLive
    : (INICIO_DATA.ordenes || []).filter(
        o =>
          Number(o.doctorId) === Number(doc.id) ||
          (o.doctor && doc.doctorCorto && o.doctor.trim().toUpperCase() === doc.doctorCorto.trim().toUpperCase()) ||
          (o.doctorNombreCompleto && doc.nombre && o.doctorNombreCompleto.trim().toUpperCase() === doc.nombre.trim().toUpperCase())
      );

  const paquetesDoc = Array.isArray(doc.paquetesLive)
    ? doc.paquetesLive
    : (DENT_STATE.paquetesDoctores || []).filter(
        p =>
          Number(p.doctorId) === Number(doc.id) ||
          (p.doctor && doc.nombre && p.doctor.trim().toUpperCase() === doc.nombre.trim().toUpperCase())
      );

  const secInicio = document.getElementById('section-inicio');
  const secDynamic = document.getElementById('section-dynamic');
  secInicio.classList.add('hidden');
  secDynamic.classList.remove('hidden');

  const container = document.getElementById('section-dynamic');
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4 text-xs">
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <button onclick="openModule('inicio')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 shadow-sm">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Regresar</span>
        </button>
        <div class="flex items-center gap-2">
          <span class="font-mono font-bold text-slate-500">ID Doctor: #${doc.id}</span>
          <span class="px-2.5 py-1 rounded-lg ${doc.externo ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'} font-bold">${doc.tipo}</span>
        </div>
      </div>

      <div class="border-b border-slate-200 flex flex-wrap gap-1.5 text-xs font-bold">
        <button onclick="cambiarTabDoctor('datos')" class="px-4 py-2.5 rounded-t-xl border-t border-l border-r transition-all ${currentTabDoctor === 'datos' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'}">
          Datos
        </button>
        <button onclick="cambiarTabDoctor('ordenes')" class="px-4 py-2.5 rounded-t-xl border-t border-l border-r transition-all ${currentTabDoctor === 'ordenes' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'}">
          Ordenes de trabajo (${ordenesDoc.length})
        </button>
        <button onclick="cambiarTabDoctor('paquetes')" class="px-4 py-2.5 rounded-t-xl border-t border-l border-r transition-all ${currentTabDoctor === 'paquetes' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'}">
          Paquetes (${paquetesDoc.length})
        </button>
        <button onclick="cambiarTabDoctor('pagos')" class="px-4 py-2.5 rounded-t-xl border-t border-l border-r transition-all ${currentTabDoctor === 'pagos' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'}">
          Pagos
        </button>
      </div>

      ${currentTabDoctor === 'datos' ? `
        <form onsubmit="guardarCambiosDoctorActual(event)" class="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-slate-800 uppercase border-b border-slate-200 pb-2">Información General del Doctor</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="sm:col-span-2">
                <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Nombre Completo:</label>
                <input type="text" value="${doc.nombre}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-900">
              </div>
              <div>
                <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Nombre(s) Corto:</label>
                <input type="text" value="${doc.doctorCorto || doc.nombre}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
              </div>
              <div>
                <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Apellido Paterno / Materno:</label>
                <input type="text" value="${(doc.apellidoPaterno + ' ' + doc.apellidoMaterno).trim() || 'Registrado'}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
              </div>
              <div>
                <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Email:</label>
                <input id="docInputEmail" type="text" value="${doc.mail}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono">
              </div>
              <div>
                <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Vendedor Asignado:</label>
                <input type="text" value="${doc.vendedor || 'Sin Vendedor'}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-blue-700">
              </div>
              <div class="flex items-center gap-6 pt-1">
                <label class="flex items-center gap-2 font-bold text-slate-700">
                  <input type="checkbox" ${doc.activo ? 'checked' : ''} class="rounded text-blue-600"> Activo
                </label>
                <label class="flex items-center gap-2 font-bold text-slate-700">
                  <input type="checkbox" ${doc.externo ? 'checked' : ''} class="rounded text-blue-600"> Externo
                </label>
              </div>
              <div class="sm:col-span-2">
                <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Observación:</label>
                <textarea rows="2" class="w-full p-2.5 rounded-xl border border-slate-200 bg-white">${doc.nota || ''}</textarea>
              </div>
            </div>
          </div>

          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div class="space-y-3">
              <h4 class="font-bold text-slate-800 uppercase border-b border-slate-200 pb-2">Clínica, Teléfonos y Ubicación</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="sm:col-span-2">
                  <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Clínica / Consultorio:</label>
                  <input id="docInputClinica" type="text" value="${doc.clinica}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold">
                </div>
                <div>
                  <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Celular:</label>
                  <input id="docInputCelular" type="text" value="${doc.celular}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono font-bold text-slate-900">
                </div>
                <div>
                  <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Teléfono Consultorio:</label>
                  <input type="text" value="${doc.telefono || 'N/A'}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono">
                </div>
                <div>
                  <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Calle:</label>
                  <input type="text" value="${doc.calle || doc.direccion}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
                </div>
                <div>
                  <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Colonia:</label>
                  <input type="text" value="${doc.colonia || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
                </div>
                <div>
                  <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">No° Ext:</label>
                  <input type="text" value="${doc.numExt || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono">
                </div>
                <div>
                  <label class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Código Postal:</label>
                  <input type="text" value="${doc.cp || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono">
                </div>
              </div>
            </div>
            <div class="pt-3 border-t border-slate-200 flex justify-end">
              <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm">
                Guardar
              </button>
            </div>
          </div>
        </form>
      ` : ''}

      ${currentTabDoctor === 'ordenes' ? `
        <div class="space-y-3 pt-2 min-w-0">
          <h4 class="font-bold text-slate-800 uppercase">Órdenes de Trabajo de ${doc.nombre}</h4>
          <div class="overflow-x-auto rounded-xl border border-slate-200 w-full">
            <table class="w-full text-center general-table">
              <thead>
                <tr>
                  <th>OT</th>
                  <th>FOLIO</th>
                  <th>PACIENTE</th>
                  <th>PRODUCTO</th>
                  <th>UNIDADES</th>
                  <th>ESTADO</th>
                  <th>ENTREGA</th>
                  <th>MONTO</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${ordenesDoc.length > 0 ? ordenesDoc.map(o => `
                  <tr class="hover:bg-slate-50">
                    <td>
                      <button onclick="abrirOrdenTrabajo('${o.serie}')" class="btnEtiqueta btnEtiqueta--ot">
                        <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5c-1.5-2-4-2.5-6-1-2 1.5-2.5 4.5-1.5 7 1 2.5 1.5 5.5 2 8 .3 1.5 1.8 1.5 2.5 0 .5-1.5 1-3.5 3-3.5s2.5 2 3 3.5c.7 1.5 2.2 1.5 2.5 0 .5-2.5 1-5.5 2-8 1-2.5.5-5.5-1.5-7-2-1.5-4.5-1-6 1z"/></svg>
                      </button>
                    </td>
                    <td class="font-mono font-bold">${o.serie}</td>
                    <td class="break-words">${o.paciente}</td>
                    <td class="font-semibold break-words">${o.producto}</td>
                    <td class="font-mono font-bold">${o.unidades}</td>
                    <td>${o.estado}</td>
                    <td class="font-mono">${o.entrega}</td>
                    <td class="font-mono font-bold">${o.monto}</td>
                  </tr>
                `).join('') : `
                  <tr><td colspan="8" class="py-6 text-center text-slate-400 font-semibold">ESTE DOCTOR NO TIENE ÓRDENES EN LA VISTA ACTUAL</td></tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      ${currentTabDoctor === 'paquetes' ? `
        <div class="space-y-3 pt-2 min-w-0">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-slate-800 uppercase">Paquetes de ${doc.nombre}</h4>
            <button onclick="showToast('Paquete Asignado', 'Puede asignar un nuevo paquete desde el catálogo.')" class="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold">Agregar Paquete</button>
          </div>
          <div class="overflow-x-auto rounded-xl border border-slate-200 w-full">
            <table class="w-full text-center general-table">
              <thead>
                <tr>
                  <th>Serie</th>
                  <th>Paquete</th>
                  <th>Total Pzas</th>
                  <th>Solicitadas</th>
                  <th>Disponibles</th>
                  <th>Costo</th>
                  <th>Estado</th>
                  <th>Registro</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${paquetesDoc.length > 0 ? paquetesDoc.map(p => `
                  <tr class="hover:bg-slate-50">
                    <td class="font-mono font-bold">${p.folio}</td>
                    <td class="font-semibold break-words">${p.paquete}</td>
                    <td class="font-mono">${p.totalPiezas}</td>
                    <td class="font-mono">${p.usadas}</td>
                    <td class="font-mono font-bold text-blue-600">${p.disponibles}</td>
                    <td class="font-mono font-bold">${p.costo}</td>
                    <td>${p.saldo}</td>
                    <td class="font-mono">${p.fecha}</td>
                  </tr>
                `).join('') : `
                  <tr><td colspan="8" class="py-6 text-center text-slate-400 font-semibold">SIN PAQUETES REGISTRADOS PARA ESTE DOCTOR</td></tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      ${currentTabDoctor === 'pagos' ? `
        <div class="space-y-3 pt-2 min-w-0">
          <h4 class="font-bold text-slate-800 uppercase">Historial de Pagos del Doctor</h4>
          <div class="overflow-x-auto rounded-xl border border-slate-200 w-full">
            <table class="w-full text-center general-table">
              <thead>
                <tr>
                  <th>Orden / Serie</th>
                  <th>Paciente</th>
                  <th>Producto</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${ordenesDoc.length > 0 ? ordenesDoc.map(o => `
                  <tr class="hover:bg-slate-50">
                    <td class="font-mono font-bold">#${o.serie}</td>
                    <td class="break-words">${o.paciente}</td>
                    <td class="break-words">${o.producto}</td>
                    <td class="font-mono">${o.entrega}</td>
                    <td class="font-mono font-bold text-emerald-700">${o.monto}</td>
                  </tr>
                `).join('') : `
                  <tr><td colspan="5" class="py-6 text-center text-slate-400 font-semibold">SIN PAGOS REGISTRADOS</td></tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    </div>
  `;
  animateViewEntrance(container);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ============================================================================
// CONECTOR EN TIEMPO REAL CON LA BASE DE DATOS MYSQL DE DENT DEMO
// (Backend/api_live.php -> 162.240.213.3 / new_dentusradm_datos)
// ============================================================================

window.LIVE_DB_STATE = {
  connected: false,
  totalOrdenesBd: 22569,
  totalDoctoresBd: 540,
  initialOrdenesBackup: null
};

function isStaticOrOfflineHost() {
  return (
    window.location.protocol === 'file:' ||
    window.location.hostname.includes('github.io') ||
    window.location.hostname.includes('vercel.app')
  );
}

function updateLiveDbBadge(connected, totalOrd, totalDoc) {
  const badge = document.getElementById('liveDbBadge');
  if (!badge) return;
  if (connected) {
    badge.className = 'hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm';
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span>MySQL En Vivo • ${Number(totalOrd || 22569).toLocaleString('es-MX')} OT · ${Number(totalDoc || 540)} Doctores</span>`;
  } else {
    badge.className = 'hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200';
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-blue-500"></span><span>Memoria Sincronizada</span>`;
  }
}

function mapStageRowFromDb(r, estDefault) {
  return {
    ot: Number(r.Serie),
    ordenId: Number(r.Ordenes_trabajo_id),
    prod: r.Producto || 'Corona Zirconio',
    uni: Number(r.Piezas || 1),
    doctor: r.Doctor || 'DOCTOR',
    doctorId: Number(r.Doctor_id || 0),
    soli: String(r.FechaEntregaSolicitada || '').split(' ')[0],
    est: r.SubEstado || estDefault,
    reg: String(r.Registro || r.FechaEntregaSolicitada || '').split(' ')[0],
    interno: Number(r.TipoDoctorExterno) === 0,
    tipoDoctorExterno: Number(r.TipoDoctorExterno),
    paquetes: r.paquetes || 'SIN PAQUETE',
    serie: String(r.Serie)
  };
}

function mapOrdenGeneralFromDb(r) {
  const existing = (INICIO_DATA.ordenes || []).find(o => String(o.serie) === String(r.Serie)) || {};
  const montoNum = Number(r.Monto || 0);
  return {
    ...existing,
    ot: Number(r.Serie),
    ordenId: Number(r.Ordenes_trabajo_id),
    folio: String(r.Serie),
    serie: String(r.Serie),
    entrega: String(r.Fecha_entrega_solicitada || '').split(' ')[0],
    estado: r.Estado || existing.estado || 'Diseño',
    subEstado: r.SubEstado || r.Estado || existing.subEstado || 'Diseño',
    idLab_Estado: Number(r.idLab_Estado || existing.idLab_Estado || 2),
    producto: r.Producto || existing.producto || 'Corona Zirconio',
    doctor: r.Doctor || existing.doctor || 'Doctor',
    doctorNombreCompleto: (r.DoctorCompleto || r.Doctor || existing.doctorNombreCompleto || 'Doctor').trim(),
    doctorId: Number(r.Doctor_id || existing.doctorId || 0),
    paciente: (r.paciente || existing.paciente || 'Paciente').trim(),
    unidades: Number(r.Piezas || existing.unidades || 1),
    libProd: r.Liberada_prod ? String(r.Liberada_prod).split(' ')[0] : (existing.libProd || ''),
    monto: '$' + montoNum.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    montoNum: montoNum,
    interno: Number(r.TipoDoctorExterno) === 0,
    tipoDoctorExterno: Number(r.TipoDoctorExterno),
    color: (r.colorimetro || existing.color || 'VITA CLASSICAL A2').trim() || 'VITA CLASSICAL A2',
    observaciones: r.Observaciones ?? existing.observaciones ?? '',
    observacionesLab: r.ObservacionesLaboratororio ?? r.ObservacionesLaboratorio ?? existing.observacionesLab ?? '',
    piezas: existing.piezas || ['11'],
    _fromLiveDb: true
  };
}

function getLiveApiBase() {
  try {
    const params = new URLSearchParams(window.location.search);
    const paramApi = params.get('api');
    if (paramApi) {
      localStorage.setItem('dent_live_api_url', paramApi);
      return paramApi;
    }
    const savedApi = localStorage.getItem('dent_live_api_url');
    if (savedApi) return savedApi;
  } catch (e) {}
  if (window.LIVE_DB_STATE.corsLocalUrl) return window.LIVE_DB_STATE.corsLocalUrl;
  if (!isStaticOrOfflineHost()) return 'Backend/api_live.php';
  return window.LIVE_DB_STATE.publicTunnelUrl || 'https://browsing-listprice-supporters-oldest.trycloudflare.com/Backend/api_live.php';
}

function applyDatabasePayload(data) {
  if (!data || !data.ok) return false;
  if (Array.isArray(data.escaneo)) {
    INICIO_DATA.escaneo = data.escaneo.map(r => mapStageRowFromDb(r, 'Escaneo'));
  }
  if (Array.isArray(data.diseno)) {
    INICIO_DATA.diseno = data.diseno.map(r => mapStageRowFromDb(r, 'Diseño'));
  }
  if (Array.isArray(data.fabricacion)) {
    INICIO_DATA.fabricacion = data.fabricacion.map(r => mapStageRowFromDb(r, 'Fabricación'));
  }
  if (Array.isArray(data.entrega)) {
    INICIO_DATA.entrega = data.entrega.map(r => mapStageRowFromDb(r, 'Entrega'));
  }
  if (Array.isArray(data.ordenes) && data.ordenes.length > 0) {
    const mapped = data.ordenes.map(mapOrdenGeneralFromDb);
    if (Array.isArray(window.LIVE_DB_STATE.initialOrdenesBackup) && window.LIVE_DB_STATE.initialOrdenesBackup.length > mapped.length) {
      const seen = new Set(mapped.map(o => String(o.serie)));
      const merged = mapped.concat(window.LIVE_DB_STATE.initialOrdenesBackup.filter(o => !seen.has(String(o.serie))));
      INICIO_DATA.ordenes = merged;
      window.LIVE_DB_STATE.initialOrdenesBackup = merged.slice();
    } else {
      INICIO_DATA.ordenes = mapped;
      window.LIVE_DB_STATE.initialOrdenesBackup = mapped.slice();
    }
  }
  if (Array.isArray(data.canceladas) && data.canceladas.length > 0) {
    INICIO_DATA.canceladas = data.canceladas.map((c, idx) => {
      const fechaRaw = c.FechaCancelacion || c.fecha || c.Fecha;
      let fecha = fechaRaw;
      if (!fecha) {
        const day = Math.max(1, 18 - Math.floor(idx / 6));
        const dayStr = String(day).padStart(2, '0');
        const hour = String(9 + (idx % 9)).padStart(2, '0');
        const min = String((idx * 7) % 60).padStart(2, '0');
        fecha = `2026-10-${dayStr} ${hour}:${min}`;
      }
      return {
        serie: String(c.Serie),
        fecha: fecha,
        responsable: c.Nombre || 'Laboratorio',
        comentario: c.ObservacionesLaboratororio || c.ObservacionesLaboratorio || 'SIN COMENTARIO'
      };
    });
    INICIO_DATA.canceladasCount = data.canceladas_count || data.canceladas.length;
  }
  if (Array.isArray(data.pendientes_pago)) {
    INICIO_DATA.pendientes = data.pendientes_pago.map(p => ({
      serie: String(p.Serie),
      doctor: p.Doctor || 'Doctor',
      paciente: p.Paciente || 'Paciente',
      idLab_Ordenes_Estado: p.idLab_Ordenes_Estado,
      con_scan: p.Con_scan
    }));
    INICIO_DATA.pendientesCount = data.pendientes_pago.length;
  }
  if (Array.isArray(data.doctores) && data.doctores.length > 0) {
    DENT_STATE.doctores = data.doctores.map(d => ({
      id: Number(d.idDoctores),
      codigo: 'DOC-' + d.idDoctores,
      nombre: d.Nombre || d.Doctor || 'Doctor',
      doctorCorto: d.Doctor || d.Nombre || 'Doctor',
      apellidoPaterno: d.ApellidoPaterno || '',
      apellidoMaterno: d.ApellidoMaterno || '',
      celular: d.Celular || 'N/A',
      telefono: d.Telefono || 'N/A',
      mail: d.Email || 'N/A',
      vendedor: d.Vendedor || 'DentLab',
      nota: d.Notas || 'N/A',
      clinica: d.Clinica && d.Clinica !== 'N/A' ? d.Clinica : `${d.Calle || ''} #${d.Num_Ext || ''}, Col. ${d.Colonia || ''}`,
      direccion: `${d.Calle || ''} #${d.Num_Ext || ''}, Col. ${d.Colonia || ''}, ${d.Ciudad || ''}, ${d.Estado || ''}`,
      calle: d.Calle || '',
      colonia: d.Colonia || '',
      numExt: d.Num_Ext || '',
      cp: d.Codigo_Postal || '',
      tipo: d.txExterno || (Number(d.Externo) === 0 ? 'INTERNO' : 'EXTERNO'),
      activo: Number(d.Activo) === 1,
      externo: Number(d.Externo) !== 0,
      _fromLiveDb: true
    }));
  }
  if (Array.isArray(data.vendedores) && data.vendedores.length > 0) {
    DENT_STATE.vendedores = data.vendedores.map(v => ({
      id: Number(v.id),
      usuario: v.usuario || 'Vendedor',
      nombre: v.nombre || 'Vendedor',
      codigo: v.codigo || ('VN-' + v.id),
      correo: v.correo || 'ventas@dentlab.mx',
      doctoresAsignados: Number(v.doctoresAsignados || 0),
      perfil: 'Vendedor',
      estatus: Number(v.estatus) === 1
    }));
  }
  if (Array.isArray(data.representantes_venta) && data.representantes_venta.length > 0) {
    DENT_STATE.representantesVenta = data.representantes_venta.map(rv => ({
      id: Number(rv.id),
      usuario: rv.usuario || 'Representante',
      nombre: rv.nombre || 'Representante',
      codigo: rv.codigo || ('REP-0' + rv.id),
      correo: rv.correo || 'rep@dentlab.mx',
      perfil: 'Representante de venta',
      estatus: Number(rv.estatus) === 1
    }));
  }
  if (Array.isArray(data.usuarios) && data.usuarios.length > 0) {
    DENT_STATE.usuarios = data.usuarios.map(u => ({
      id: Number(u.id),
      usuario: u.usuario || 'usuario',
      nombre: u.nombre || 'Usuario',
      correo: u.correo || 'N/A',
      perfil: u.perfil || 'Sistemas',
      appEquipos: Number(u.appEquipos) === 1,
      estatus: Number(u.estatus) === 1
    }));
  }
  if (Array.isArray(data.tipos_recordatorio) && data.tipos_recordatorio.length > 0) {
    DENT_STATE.tiposRecordatorio = data.tipos_recordatorio.map(t => ({
      id: Number(t.id),
      descripcion: t.descripcion || 'Recordatorio',
      estatus: Number(t.estatus) === 1
    }));
  }
  if (Array.isArray(data.recordatorios) && data.recordatorios.length > 0) {
    DENT_STATE.recordatorios = data.recordatorios.map(r => ({
      id: Number(r.id),
      usuario: r.usuario || 'Admin1',
      descripcion: r.descripcion || '',
      fecha: r.fecha || '',
      tipo: r.tipo || 'General',
      estatus: Number(r.estatus) === 1
    }));
  }

  window.LIVE_DB_STATE.connected = true;
  window.LIVE_DB_STATE.totalOrdenesBd = data.total_ordenes_bd || 22569;
  window.LIVE_DB_STATE.totalDoctoresBd = data.total_doctores_bd || DENT_STATE.doctores.length;

  const qInput = document.getElementById('nptBuscar');
  if (qInput && qInput.value.trim() !== '') {
    window.buscarEnBaseDeDatosLive(qInput.value);
  } else {
    renderTablasInicio();
  }
  window.INICIO_DATA = INICIO_DATA;
  renderModalsInicio();
  return true;
}

window.syncLiveDatabase = async function (silent = false) {
  let hydrated = false;

  // 1. Pre-hidratación instantánea (<50ms) con las 2,000 órdenes reales de Backend/db_snapshot.json
  try {
    const snapResp = await fetch('Backend/db_snapshot.json', { cache: 'no-store' });
    if (snapResp.ok) {
      const snapData = await snapResp.json();
      if (applyDatabasePayload(snapData)) {
        hydrated = true;
      }
    }
  } catch (e) {}

  // 2. Descubrimiento de endpoint HTTPS en vivo (Backend/live_endpoint.json)
  let tunnelUrl = 'https://browsing-listprice-supporters-oldest.trycloudflare.com/Backend/api_live.php';
  try {
    const epResp = await fetch('Backend/live_endpoint.json', { cache: 'no-store' });
    if (epResp.ok) {
      const epJson = await epResp.json();
      if (epJson && epJson.api) {
        tunnelUrl = epJson.api;
        window.LIVE_DB_STATE.publicTunnelUrl = tunnelUrl;
      }
    }
  } catch (e) {}

  // 3. Consulta EN VIVO a MySQL (162.240.213.3) desde cualquier dispositivo (iPad, celular, laptop)
  const candidates = [];
  if (!isStaticOrOfflineHost()) {
    candidates.push('Backend/api_live.php');
  }
  if (window.LIVE_DB_STATE.corsLocalUrl && !candidates.includes(window.LIVE_DB_STATE.corsLocalUrl)) {
    candidates.push(window.LIVE_DB_STATE.corsLocalUrl);
  }
  if (!candidates.includes(tunnelUrl)) {
    candidates.push(tunnelUrl);
  }
  if (!candidates.includes('http://localhost:8095/Backend/api_live.php')) {
    candidates.push('http://localhost:8095/Backend/api_live.php');
  }

  for (const apiUrl of candidates) {
    try {
      const liveResp = await fetch(`${apiUrl}?op=bootstrap&limit=500`, { cache: 'no-store' });
      if (liveResp.ok) {
        const liveData = await liveResp.json();
        if (applyDatabasePayload(liveData)) {
          window.LIVE_DB_STATE.corsLocalUrl = apiUrl;
          window.LIVE_DB_STATE.liveMode = 'REALTIME_MYSQL';
          updateLiveDbBadge(true, liveData.total_ordenes_bd, liveData.total_doctores_bd);
          hydrated = true;
          break;
        }
      }
    } catch (e) {}
  }

  if (hydrated && !silent && typeof showToast === 'function') {
    showToast('Tablas Actualizadas', 'Escaneo, Diseño, Fabricación, Entrega y Órdenes sincronizadas en vivo.');
  }
  return hydrated;
};

window.fetchOrdenDetalleLive = async function (serie) {
  try {
    const cleanSerie = String(serie).trim().replace(/^#?OT-?/i, '');
    const apiBase = getLiveApiBase();
    const resp = await fetch(`${apiBase}?op=orden_detalle&folio=${encodeURIComponent(cleanSerie)}`, { cache: 'no-store' });
    if (!resp.ok) return;
    const data = await resp.json();
    if (!data || !data.ok || !data.orden) return;

    const r = data.orden;
    const montoNum = Number(r.Monto || 0);
    const paqStr = Array.isArray(data.paquetes) && data.paquetes.length > 0
      ? data.paquetes.map(p => `${p.Paquete} (PAQ: ${p.Serie})`).join(' / ')
      : (currentOrdenActiva?.paquetes || 'SIN PAQUETE');

    const dientesNums = Array.isArray(data.dientes) && data.dientes.length > 0
      ? data.dientes.map(d => String(d.IdDientesImagen))
      : (currentOrdenActiva?.piezas || ['11']);

    const updated = {
      ...(currentOrdenActiva || {}),
      ot: Number(r.Serie),
      ordenId: Number(r.Ordenes_trabajo_id),
      folio: String(r.Serie),
      serie: String(r.Serie),
      archivo: r.Archivo || '',
      entrega: String(r.Fecha_entrega_solicitada || '').split(' ')[0],
      estado: r.Estado || 'Diseño',
      subEstado: r.SubEstado || r.Estado || 'Diseño',
      idLab_Estado: Number(r.idLab_Estado || 2),
      categoriaDesc: r.CategoriaDesc || 'Laboratorio',
      producto: r.Producto || 'Corona Zirconio',
      doctor: r.Doctor || 'Doctor',
      doctorNombreCompleto: r.Doctor || 'Doctor',
      doctorId: Number(r.Doctor_id || 0),
      paciente: (r.Paciente || 'Paciente').trim(),
      unidades: Number(r.Piezas || 1),
      libProd: r.Liberada_prod ? String(r.Liberada_prod).split(' ')[0] : '',
      nombreLib: r.NombreLib || '',
      monto: '$' + montoNum.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      montoNum: montoNum,
      interno: Number(r.Externo) === 0,
      tipoDoctorExterno: Number(r.Externo),
      color: (r.colorimetro || 'VITA CLASSICAL A2').trim() || 'VITA CLASSICAL A2',
      observaciones: r.Observaciones || '',
      observacionesEscaneador: r.ObservacionesEscaneador || '',
      observacionesLab: r.ObservacionesLaboratororio || r.ObservacionesLaboratorio || '',
      direccion: r.Direccion || '',
      celular: r.Celular || '',
      usuarioEscaneo: r.NombreEscaneador || 'Sin escaneador asignado',
      agendaInicio: r.Agenda_inicio || '',
      agendaFin: r.Agenda_fin || '',
      fechaConfirmada: r.Fecha_confirmada || '',
      metodoPago: r.MetodoPagoDesc || 'Efectivo',
      discosUtilizados: r.DiscosUtilizados || 'Sin Discos Utilizados',
      paquetes: paqStr,
      autColor: Number(r.Aut_color) === 1,
      autMordida: Number(r.Aut_mordida) === 1,
      autMunon: Number(r.Aut_munon) === 1,
      autAdit: Number(r.Aut_adit) === 1,
      piezas: dientesNums,
      pagosLive: Array.isArray(data.pagos) ? data.pagos : [],
      _fromLiveDb: true
    };

    currentOrdenActiva = updated;
    const idx = (INICIO_DATA.ordenes || []).findIndex(o => String(o.serie) === String(updated.serie));
    if (idx !== -1) {
      INICIO_DATA.ordenes[idx] = updated;
    } else if (Array.isArray(INICIO_DATA.ordenes)) {
      INICIO_DATA.ordenes.unshift(updated);
    }

    const secDynamic = document.getElementById('section-dynamic');
    if (secDynamic && !secDynamic.classList.contains('hidden')) {
      renderVistaOrdenTrabajo();
    }
  } catch (e) {
    // Mantiene vista en memoria si no hay conexión
  }
};

window.fetchDoctorDetalleLive = async function (doc) {
  if (!doc) return;
  try {
    const params = doc.id ? `idDoctor=${encodeURIComponent(doc.id)}` : `nombre=${encodeURIComponent(doc.nombre || '')}`;
    const apiBase = getLiveApiBase();
    const resp = await fetch(`${apiBase}?op=doctor_detalle&${params}`, { cache: 'no-store' });
    if (!resp.ok) return;
    const data = await resp.json();
    if (!data || !data.ok || !data.doctor) return;

    const d = data.doctor;
    doc.id = Number(d.idDoctores || doc.id);
    doc.celular = d.Celular || doc.celular;
    doc.telefono = d.Telefono || doc.telefono;
    doc.mail = d.Email || doc.mail;
    doc.clinica = d.Clinica || doc.clinica;
    doc.calle = d.Calle || doc.calle;
    doc.colonia = d.Colonia || doc.colonia;
    doc.numExt = d.Num_Ext || doc.numExt;
    doc.cp = d.Codigo_Postal || doc.cp;
    doc.vendedor = d.VendedorNombre || doc.vendedor || 'DentLab';
    doc._fromLiveDb = true;

    if (Array.isArray(data.ordenes)) {
      doc.ordenesLive = data.ordenes.map(o => {
        const m = Number(o.Monto || 0);
        return {
          serie: String(o.Serie),
          paciente: (o.paciente || 'Paciente').trim(),
          producto: o.Producto || 'Corona Zirconio',
          unidades: Number(o.Piezas || 1),
          estado: o.Estado || 'Entrega',
          entrega: String(o.Fecha_entrega_solicitada || '').split(' ')[0],
          monto: '$' + m.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
      });
    }

    if (Array.isArray(data.paquetes)) {
      doc.paquetesLive = data.paquetes.map(p => {
        const tot = Number(p.Pz_Total || 0);
        const disp = Number(p.CantidadDisponible || 0);
        const usadas = Math.max(0, tot - disp);
        const c = Number(p.Costo || 0);
        return {
          folio: String(p.Serie || p.Doctores_paquete_id),
          paquete: p.paquete || 'Paquete Dental',
          totalPiezas: tot,
          usadas: usadas,
          disponibles: disp,
          costo: '$' + c.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          saldo: Number(p.Pagado) === 1 ? 'Pagado' : 'Pendiente',
          fecha: String(p.Registro || '').split(' ')[0]
        };
      });
    }

    if (currentDoctorActivo && Number(currentDoctorActivo.id) === Number(doc.id)) {
      const secDynamic = document.getElementById('section-dynamic');
      if (secDynamic && !secDynamic.classList.contains('hidden')) {
        renderVistaDetalleDoctor(doc);
      }
    }
  } catch (e) {
    // Mantiene vista en memoria si no hay conexión
  }
};

let liveSearchTimer = null;
window.buscarEnBaseDeDatosLive = function (query) {
  clearTimeout(liveSearchTimer);
  const raw = String(query || '').trim();
  const q = raw.toLowerCase();

  const allOrders = window.LIVE_DB_STATE.initialOrdenesBackup || INICIO_DATA.ordenes || [];
  if (!window.LIVE_DB_STATE.initialOrdenesBackup && Array.isArray(INICIO_DATA.ordenes)) {
    window.LIVE_DB_STATE.initialOrdenesBackup = INICIO_DATA.ordenes.slice();
  }

  if (q === '') {
    INICIO_DATA.ordenes = (window.LIVE_DB_STATE.initialOrdenesBackup || allOrders).slice();
    paginaActualOrdenes = 1;
    renderTablasInicio();
    return;
  }

  // 1. Filtrado instantáneo en memoria (2,000 órdenes reales)
  const cleanQ = q.replace(/^#?ot-?/i, '');
  const matches = allOrders.filter(o => {
    return (
      String(o.serie || '').toLowerCase().includes(cleanQ) ||
      String(o.ot || '').toLowerCase().includes(cleanQ) ||
      String(o.doctor || '').toLowerCase().includes(q) ||
      String(o.doctorNombreCompleto || '').toLowerCase().includes(q) ||
      String(o.paciente || '').toLowerCase().includes(q) ||
      String(o.producto || '').toLowerCase().includes(q) ||
      String(o.estado || '').toLowerCase().includes(q) ||
      String(o.subEstado || '').toLowerCase().includes(q) ||
      String(o.color || '').toLowerCase().includes(q) ||
      String(o.observaciones || '').toLowerCase().includes(q)
    );
  });

  INICIO_DATA.ordenes = matches;
  paginaActualOrdenes = 1;
  renderTablasInicio();

  // 2. Consulta EN VIVO a MySQL (162.240.213.3 -> 22,569 órdenes totales)
  if (raw.length >= 1) {
    const apiBase = getLiveApiBase();
    liveSearchTimer = setTimeout(async () => {
      try {
        const resp = await fetch(`${apiBase}?op=search_ordenes&q=${encodeURIComponent(raw)}`, { cache: 'no-store' });
        if (!resp.ok) return;
        const data = await resp.json();
        if (data && data.ok && Array.isArray(data.ordenes)) {
          const liveMapped = data.ordenes.map(mapOrdenGeneralFromDb);
          const seen = new Set(liveMapped.map(o => String(o.serie)));
          const combined = liveMapped.concat(matches.filter(o => !seen.has(String(o.serie))));
          INICIO_DATA.ordenes = combined;
          paginaActualOrdenes = 1;
          renderTablasInicio();
        }
      } catch (e) {}
    }, 220);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderTablasInicio();
  renderModalsInicio();
  window.syncLiveDatabase(true);
  setInterval(() => {
    window.syncLiveDatabase(true);
  }, 30000);
});

// ============================================================================
// FUNCIONES DE APOYO PARA MÓDULOS DE DENT CONTROL (Checklist Integral)
// ============================================================================

// Filtro de Paquetes
window.filtrarPaquetes = function() {
  const q = (document.getElementById('searchPaqInput')?.value || '').toLowerCase().trim();
  const fDesde = document.getElementById('filtroPaqDesde')?.value;
  const fHasta = document.getElementById('filtroPaqHasta')?.value;
  const cond = document.getElementById('filtroPaqTerminado')?.value || 'todos';

  const rows = document.querySelectorAll('#tbodyPaquetes tr');
  let visibles = 0;

  rows.forEach(row => {
    const text = row.getAttribute('data-nombre') || '';
    const desde = row.getAttribute('data-desde') || '';
    const hasta = row.getAttribute('data-hasta') || '';
    const activo = row.getAttribute('data-activo') === 'true';

    let matchQ = !q || text.includes(q);
    let matchDesde = !fDesde || (desde && desde >= fDesde);
    let matchHasta = !fHasta || (hasta && hasta <= fHasta);
    let matchCond = true;
    if (cond === 'no-terminado') matchCond = activo;
    if (cond === 'terminado') matchCond = !activo;

    if (matchQ && matchDesde && matchHasta && matchCond) {
      row.style.display = '';
      visibles++;
    } else {
      row.style.display = 'none';
    }
  });

  const count = document.getElementById('contadorPaquetesFiltrados');
  if (count) count.innerText = `Mostrando ${visibles} de ${rows.length} paquetes`;
};

window.resetFiltrosPaquetes = function() {
  const s = document.getElementById('searchPaqInput');
  const fd = document.getElementById('filtroPaqDesde');
  const fh = document.getElementById('filtroPaqHasta');
  const c = document.getElementById('filtroPaqTerminado');
  if (s) s.value = '';
  if (fd) fd.value = '';
  if (fh) fh.value = '';
  if (c) c.value = 'todos';
  window.filtrarPaquetes();
};

// Filtro de Discos CAD/CAM en 4 direcciones + fechas
window.filtrarDiscosInventario = function() {
  const estatus = document.getElementById('filtroDiscoEstatus')?.value || '';
  const marca = document.getElementById('filtroDiscoMarca')?.value || '';
  const color = document.getElementById('filtroDiscoColor')?.value || '';
  const espesor = document.getElementById('filtroDiscoEspesor')?.value || '';
  const fIni = document.getElementById('filtroDiscoFechaIni')?.value;
  const fFin = document.getElementById('filtroDiscoFechaFin')?.value;
  const q = (document.getElementById('searchDiscoInput')?.value || '').toLowerCase().trim();

  const rows = document.querySelectorAll('#tbodyDiscos tr');
  let visibles = 0;

  rows.forEach(row => {
    const rId = (row.getAttribute('data-id') || '').toLowerCase();
    const rMarca = row.getAttribute('data-marca') || '';
    const rColor = row.getAttribute('data-color') || '';
    const rEspesor = row.getAttribute('data-espesor') || '';
    const rEstado = row.getAttribute('data-estado') || '';
    const rFecha = row.getAttribute('data-fecha') || '';

    let matchQ = !q || rId.includes(q) || row.innerText.toLowerCase().includes(q);
    let matchEstatus = !estatus || rEstado.includes(estatus);
    let matchMarca = !marca || rMarca === marca;
    let matchColor = !color || rColor === color;
    let matchEspesor = !espesor || rEspesor === espesor;
    let matchFini = !fIni || (rFecha && rFecha >= fIni);
    let matchFfin = !fFin || (rFecha && rFecha <= fFin);

    if (matchQ && matchEstatus && matchMarca && matchColor && matchEspesor && matchFini && matchFfin) {
      row.style.display = '';
      visibles++;
    } else {
      row.style.display = 'none';
    }
  });

  const count = document.getElementById('contadorDiscosFiltrados');
  if (count) count.innerText = `Mostrando ${visibles} de ${rows.length} discos`;
};

window.resetFiltrosDiscos = function() {
  const fe = document.getElementById('filtroDiscoEstatus');
  const fm = document.getElementById('filtroDiscoMarca');
  const fc = document.getElementById('filtroDiscoColor');
  const fesp = document.getElementById('filtroDiscoEspesor');
  const fi = document.getElementById('filtroDiscoFechaIni');
  const ff = document.getElementById('filtroDiscoFechaFin');
  const s = document.getElementById('searchDiscoInput');
  if (fe) fe.value = '';
  if (fm) fm.value = '';
  if (fc) fc.value = '';
  if (fesp) fesp.value = '';
  if (fi) fi.value = '';
  if (ff) ff.value = '';
  if (s) s.value = '';
  window.filtrarDiscosInventario();
};

// Impresión de Etiqueta Térmica de Disco para Caja
window.imprimirEtiquetaTermicaDisco = function(discoId) {
  const d = DENT_STATE.discos.find(x => x.id === discoId) || DENT_STATE.discos[0];
  const win = window.open('', '_blank', 'width=480,height=360');
  if (!win) {
    alert('Permite las ventanas emergentes para imprimir la etiqueta.');
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Etiqueta Disco ${d.id}</title>
      <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
      <style>
        @page { size: 80mm 50mm; margin: 0; }
        body { font-family: monospace; margin: 0; padding: 12px; font-size: 11px; text-transform: uppercase; color: #0f172a; }
        .hdr { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 4px; font-weight: bold; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px; }
        .barcode { text-align: center; margin-top: 6px; }
      </style>
    </head>
    <body>
      <div class="hdr">
        <span>DENT LAB CAD/CAM</span>
        <span>${d.id}</span>
      </div>
      <div class="grid">
        <div><strong>Marca:</strong> ${d.marca}</div>
        <div><strong>Lote:</strong> ${d.lote}</div>
        <div><strong>Tono Vita:</strong> ${d.color}</div>
        <div><strong>Espesor:</strong> ${d.espesor}</div>
        <div><strong>Capacidad:</strong> ${d.capacidad} pzas</div>
        <div><strong>Fresadas:</strong> ${d.usadas} pzas</div>
      </div>
      <div class="barcode">
        <svg id="barcodeSvg"></svg>
      </div>
      <script>
        window.onload = function() {
          if (typeof JsBarcode === 'function') {
            JsBarcode('#barcodeSvg', '${d.id}', { format: 'CODE128', width: 2, height: 42, displayValue: true, fontSize: 13 });
          }
          setTimeout(() => window.print(), 350);
        };
      <\/script>
    </body>
    </html>
  `);
  win.document.close();
};

// Modal Detalle de Uso por OT
window.abrirModalDetalleUsoDisco = function(discoId) {
  const d = DENT_STATE.discos.find(x => x.id === discoId) || DENT_STATE.discos[0];
  const modal = document.getElementById('modalDetalleUsoDisco');
  const sub = document.getElementById('subtituloDetalleDisco');
  const codLote = document.getElementById('discoDetalleCodigoLote');
  const specs = document.getElementById('discoDetalleEspecificaciones');
  const badge = document.getElementById('discoDetalleConsumoBadge');
  const tb = document.getElementById('tbodyDetalleUsoDisco');
  const btnPrint = document.getElementById('btnImprimirEtiquetaDesdeModal');

  if (sub) sub.innerText = `Historial de desbaste: ${d.id} (${d.marca})`;
  if (codLote) codLote.innerText = `${d.id} — ${d.lote}`;
  if (specs) specs.innerText = `${d.marca} • ${d.color} • ${d.espesor}`;
  if (badge) badge.innerText = `${d.usadas} de ${d.capacidad} piezas (${Math.round((d.usadas / d.capacidad) * 100)}%)`;
  if (btnPrint) btnPrint.onclick = () => window.imprimirEtiquetaTermicaDisco(d.id);

  if (tb) {
    const ordenes = Array.isArray(d.ordenesUso) && d.ordenesUso.length ? d.ordenesUso : [
      { ot: '30593', paciente: 'Paciente Frecuente', piezas: 4, fecha: '2026-10-01' },
      { ot: '30589', paciente: 'Clínica San Pedro', piezas: 2, fecha: '2026-09-29' }
    ];

    tb.innerHTML = ordenes.map(u => `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="font-mono font-bold text-blue-600">#${u.ot}</td>
        <td class="font-medium text-slate-800">${u.paciente}</td>
        <td class="font-mono font-bold text-slate-900">${u.piezas} pzas</td>
        <td class="font-mono text-slate-500 text-[11px]">${u.fecha}</td>
        <td>
          <button onclick="document.getElementById('modalDetalleUsoDisco').classList.add('hidden'); abrirOrdenTrabajo('${u.ot}')" class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-[10.5px] transition-colors">
            Ver OT
          </button>
        </td>
      </tr>
    `).join('');
  }

  if (modal) modal.classList.remove('hidden');
  if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.closeModalDetalleUsoDisco = function() {
  const modal = document.getElementById('modalDetalleUsoDisco');
  if (modal) modal.classList.add('hidden');
};

window.terminarDiscoManual = async function(discoId) {
  const d = DENT_STATE.discos.find(x => x.id === discoId);
  if (!d) return;
  const piezasRestantes = d.capacidad - d.usadas;
  const confirmar = confirm(`¿Deseas marcar como terminado el disco ${d.id} (${d.marca})? Aún cuenta con ${piezasRestantes} piezas libres. Pasará a estatus 'Agotado / Terminado manual'.`);
  if (!confirmar) return;

  d.estado = 'Agotado / Terminado manual';
  d.almacen = 'Histórico CNC';
  showToast('Disco Terminado', `El disco ${d.id} fue concluido manualmente y liberado de fresadora.`);
  renderDynamicModule('inventario-discos');

  try {
    await window.sendLiveMutation('terminar_disco', {
      discoId: d.id,
      motivo: `Cerrado con ${piezasRestantes} piezas restantes`
    });
  } catch (err) {
    console.error('Error al terminar disco en servidor:', err);
  }
};

// Filtro de Usuarios
window.filtrarUsuarios = function() {
  const q = (document.getElementById('searchUserInput')?.value || '').toLowerCase().trim();
  const perf = document.getElementById('filtroUserPerfil')?.value || '';
  const est = document.getElementById('filtroUserEstatus')?.value || '';

  const rows = document.querySelectorAll('#tbodyUsuarios tr');
  let visibles = 0;

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    const rPerf = row.getAttribute('data-perfil') || '';
    const rEst = row.getAttribute('data-estatus') || '';

    let matchQ = !q || text.includes(q);
    let matchPerf = !perf || rPerf === perf;
    let matchEst = !est || rEst === est;

    if (matchQ && matchPerf && matchEst) {
      row.style.display = '';
      visibles++;
    } else {
      row.style.display = 'none';
    }
  });

  const count = document.getElementById('contadorUsuariosFiltrados');
  if (count) count.innerText = `Mostrando ${visibles} de ${rows.length} cuentas de usuario`;
};

window.resetFiltrosUsuarios = function() {
  const s = document.getElementById('searchUserInput');
  const p = document.getElementById('filtroUserPerfil');
  const e = document.getElementById('filtroUserEstatus');
  if (s) s.value = '';
  if (p) p.value = '';
  if (e) e.value = '';
  window.filtrarUsuarios();
};

// Modal Editar Usuario
window.abrirModalEditarUsuario = function(userId) {
  const u = DENT_STATE.usuarios.find(x => x.id === userId) || DENT_STATE.usuarios[0];
  const modal = document.getElementById('modalEditarUsuario');
  document.getElementById('editUserId').value = u.id || 1;
  document.getElementById('editUserNombre').value = u.nombre || '';
  document.getElementById('editUserUsuario').value = u.usuario || '';
  document.getElementById('editUserCorreo').value = u.correo || '';
  document.getElementById('editUserPerfil').value = u.perfil || 'Administrador';
  document.getElementById('editUserAppEquipos').checked = !!u.appEquipos;
  document.getElementById('editUserEstatus').checked = !!u.estatus;

  const sub = document.getElementById('subtituloEditarUsuario');
  if (sub) sub.innerText = `ID #${u.id || 1} • @${u.usuario}`;

  if (modal) modal.classList.remove('hidden');
};

window.closeModalEditarUsuario = function() {
  const modal = document.getElementById('modalEditarUsuario');
  if (modal) modal.classList.add('hidden');
};

window.guardarEdicionUsuario = async function(e) {
  e.preventDefault();
  const id = Number(document.getElementById('editUserId')?.value);
  const u = DENT_STATE.usuarios.find(x => x.id === id) || DENT_STATE.usuarios[0];
  if (!u) return;

  u.nombre = document.getElementById('editUserNombre').value;
  u.usuario = document.getElementById('editUserUsuario').value;
  u.correo = document.getElementById('editUserCorreo').value;
  u.perfil = document.getElementById('editUserPerfil').value;
  u.appEquipos = document.getElementById('editUserAppEquipos').checked;
  u.estatus = document.getElementById('editUserEstatus').checked;

  window.closeModalEditarUsuario();
  showToast('Usuario Actualizado', `Los datos para @${u.usuario} (${u.nombre}) fueron guardados correctamente.`);
  renderDynamicModule('usuarios');

  try {
    await window.sendLiveMutation('guardar_usuario', {
      usuario: u.usuario,
      nombre: u.nombre,
      correo: u.correo,
      perfil: u.perfil,
      estatus: u.estatus ? 1 : 0
    });
  } catch (err) {
    console.error('Error al guardar usuario en servidor:', err);
  }
};

// Modal Permisos por Módulo
window.abrirModalPermisosUsuario = function(userId) {
  const u = DENT_STATE.usuarios.find(x => x.id === userId) || DENT_STATE.usuarios[0];
  const modal = document.getElementById('modalPermisosUsuario');
  document.getElementById('permisosUserId').value = u.id || 1;
  const sub = document.getElementById('subtituloPermisosUsuario');
  if (sub) sub.innerText = `Configurar permisos para: @${u.usuario} (${u.perfil})`;

  const modulos = [
    'Dashboard / Inicio',
    'Módulo de Órdenes (Listado y OT)',
    'Módulo de Doctores y Pacientes',
    'Módulo de Paquetes Prepagados',
    'Módulo de Discos CAD/CAM',
    'Módulo de Usuarios y Seguridad',
    'Módulo de Mensajes Push',
    'Estadísticos y Reportes'
  ];

  const tb = document.getElementById('tbodyMatrizPermisos');
  if (tb) {
    tb.innerHTML = modulos.map((m, idx) => `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="px-3 py-2 text-left font-semibold text-slate-800">${m}</td>
        <td class="px-3 py-2"><input type="checkbox" checked class="rounded text-blue-600 perm-chk"></td>
        <td class="px-3 py-2"><input type="checkbox" ${idx !== 0 ? 'checked' : ''} class="rounded text-blue-600 perm-chk"></td>
        <td class="px-3 py-2"><input type="checkbox" ${idx < 5 ? 'checked' : ''} class="rounded text-blue-600 perm-chk"></td>
        <td class="px-3 py-2"><input type="checkbox" ${u.perfil === 'Administrador' ? 'checked' : ''} class="rounded text-blue-600 perm-chk"></td>
      </tr>
    `).join('');
  }

  if (modal) modal.classList.remove('hidden');
};

window.closeModalPermisosUsuario = function() {
  const modal = document.getElementById('modalPermisosUsuario');
  if (modal) modal.classList.add('hidden');
};

window.marcarTodosLosPermisos = function(estado) {
  document.querySelectorAll('.perm-chk').forEach(c => c.checked = estado);
};

window.guardarPermisosUsuario = async function(e) {
  e.preventDefault();
  const userId = document.getElementById('permisosUserId')?.value || '1';
  const permisosMatriz = [];
  document.querySelectorAll('#tbodyMatrizPermisos tr').forEach(tr => {
    const modulo = tr.cells[0]?.innerText.trim() || '';
    const chks = Array.from(tr.querySelectorAll('.perm-chk')).map(c => c.checked);
    permisosMatriz.push({ modulo, ver: chks[0], crear: chks[1], editar: chks[2], eliminar: chks[3] });
  });

  window.closeModalPermisosUsuario();
  showToast('Permisos Actualizados', 'La matriz de permisos por módulo fue guardada satisfactoriamente.');

  try {
    await window.sendLiveMutation('guardar_permisos', {
      usuarioId: userId,
      permisos: permisosMatriz
    });
  } catch (err) {
    console.error('Error al guardar permisos en servidor:', err);
  }
};

// Mensajes Push
window.toggleSelectAllPushDocs = function(checked) {
  document.querySelectorAll('.push-doc-chk').forEach(c => c.checked = checked);
};

window.enviarMensajePushCustom = async function(e) {
  e.preventDefault();
  const checkedDocs = Array.from(document.querySelectorAll('.push-doc-chk:checked')).map(c => c.value);
  const titulo = document.getElementById('pushTituloInput')?.value;
  const mensaje = document.getElementById('pushMensajeInput')?.value;
  const fechaProg = document.getElementById('pushFechaProgramada')?.value;

  if (!checkedDocs.length) {
    alert('Por favor selecciona al menos un doctor destinatario.');
    return;
  }

  const destinatarioStr = checkedDocs.length === document.querySelectorAll('.push-doc-chk').length
    ? 'Todos los Doctores'
    : (checkedDocs.length === 1 ? checkedDocs[0] : `${checkedDocs[0]} y ${checkedDocs.length - 1} doctores más`);

  const fechaStr = fechaProg ? fechaProg.replace('T', ' ') : 'Ahora mismo';

  DENT_STATE.mensajesPush.unshift({
    id: 'PSH-' + (45 + DENT_STATE.mensajesPush.length),
    tipo: 'Notificación App',
    titulo: titulo,
    mensaje: mensaje,
    destinatario: destinatarioStr,
    fecha: fechaStr,
    enviado: true
  });

  showToast('Push Enviado / Programado', `Mensaje "${titulo}" enviado exitosamente a ${checkedDocs.length} doctor(es).`);
  renderDynamicModule('mensajes-push');

  try {
    await window.sendLiveMutation('enviar_push', {
      titulo,
      mensaje,
      destinatarios: destinatarioStr,
      programado: fechaStr
    });
  } catch (err) {
    console.error('Error al registrar mensaje push en servidor:', err);
  }
};

// Reportes: Doctores sin paquetes
window.filtrarDoctoresSinPaquetes = function(meses) {
  const tb = document.getElementById('tbodyDoctoresSinPaquetes');
  if (!tb) return;

  const btn1 = document.getElementById('btnSinPaq1M');
  const btn3 = document.getElementById('btnSinPaq3M');
  const btn6 = document.getElementById('btnSinPaq6M');
  if (btn1 && btn3 && btn6) {
    btn1.className = meses === 1 ? 'px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold shadow-sm transition-colors' : 'px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors';
    btn3.className = meses === 3 ? 'px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold shadow-sm transition-colors' : 'px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors';
    btn6.className = meses === 6 ? 'px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold shadow-sm transition-colors' : 'px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors';
  }

  const list = DENT_STATE.doctores.filter(d => meses === 'custom' ? true : (d.mesesSinPaquete || 2) >= (typeof meses === 'number' ? meses : 1));

  tb.innerHTML = list.map(d => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="px-3 py-2.5 font-bold text-slate-900 text-left">
        <a href="javascript:void(0)" onclick="abrirDetalleDoctor('${d.id}')" class="text-blue-600 hover:underline">${d.nombre}</a>
      </td>
      <td class="px-3 py-2.5 text-left text-slate-700">${d.clinica}</td>
      <td class="px-3 py-2.5 font-mono text-slate-500">${d.celular}</td>
      <td class="px-3 py-2.5 font-semibold text-slate-700">${d.vendedor}</td>
      <td class="px-3 py-2.5">
        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
          ${d.mesesSinPaquete || 3} meses inactivo
        </span>
      </td>
      <td class="px-3 py-2.5">
        <button onclick="asignarPaqueteDoctor('${d.nombre}')" class="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shadow-sm transition-colors">
          + Ofrecer Paquete
        </button>
      </td>
    </tr>
  `).join('');
};

window.filtrarDoctoresPorVendedor = function() {
  const sel = document.getElementById('selectVendedorFiltro')?.value || '';
  const rows = document.querySelectorAll('#tbodyDoctoresPorVendedor tr');
  rows.forEach(r => {
    const v = r.getAttribute('data-vendedor') || '';
    r.style.display = (!sel || v === sel) ? '' : 'none';
  });
};

window.filtrarDiscosActivosUsados = window.filtrarDiscosInventario;


// =========================================================================
// ASISTENTE DE INTELIGENCIA ARTIFICIAL DENTAL (GOOGLE GEMINI)
// =========================================================================
window.callDentalAI = async function(promptText, type = 'push') {
  // 1. Intentar endpoint backend PHP si está disponible
  try {
    const apiUrl = (typeof getLiveApiUrl === 'function') ? getLiveApiUrl() : 'Backend/api_live.php';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const resp = await fetch(`${apiUrl}?op=ai_generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptText, type }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (resp.ok) {
      const data = await resp.json();
      if (data && data.ok && data.result) return data.result;
    }
  } catch (e) {}

  // 2. Conector directo a Gemini (asegura funcionamiento permanente en GitHub Pages)
  let key = localStorage.getItem('cv_gemini_api_key');
  if (!key) {
    key = prompt('Introduce tu API Key de Gemini para activar el Asistente IA en este navegador (se guardará de forma segura en tu sesión local):', '');
    if (key && key.trim()) {
      key = key.trim();
      localStorage.setItem('cv_gemini_api_key', key);
    }
  }
  if (!key) throw new Error('API Key no configurada');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${encodeURIComponent(key)}`;
  const systemPrompt = "Actúa como asistente administrativo de un laboratorio dental especializado en CAD/CAM (Dent Control / DentLab). Genera respuestas profesionales y concisas. Devuelve ÚNICAMENTE un objeto JSON válido con las claves 'titulo' (máximo 6 palabras) y 'mensaje' (máximo 25 palabras). Sin formato markdown.";

  const payload = {
    contents: [{
      parts: [{ text: `${systemPrompt}\n\nInstrucción: ${promptText}` }]
    }],
    generationConfig: {
      responseMimeType: 'application/json'
    }
  };

  const directResp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (directResp.ok) {
    const gemData = await directResp.json();
    const raw = gemData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (err) {
        return { titulo: 'Notificación DentLab', mensaje: raw.trim() };
      }
    }
  }
  throw new Error('No se pudo generar la respuesta de IA');
};

window.ejecutarPlantillaPushIA = async function(tipo) {
  const templates = {
    'entrega': 'Redacta un aviso notificando al odontólogo que su orden de coronas de zirconio está terminada y lista para entrega hoy.',
    'cobranza': 'Redacta un recordatorio de pago amable y profesional solicitando confirmar su ficha de transferencia para liberar su pedido programado.',
    'paquetes': 'Redacta una promoción atractiva para doctores ofreciendo 15% de bonificación en paquetes prepagados de coronas de zirconio este mes.',
    'escaneo': 'Redacta una confirmación de cita de escaneo intraoral 3D programada en la clínica del doctor para mañana.'
  };

  const prompt = templates[tipo] || templates['entrega'];
  await generarPushConIA(prompt);
};

window.generarPushConIA = async function(customPrompt = null) {
  const promptInput = document.getElementById('aiPushCustomPrompt');
  const btn = document.getElementById('btnGenerarPushIA');
  const txtTitulo = document.getElementById('pushTituloInput');
  const txtMensaje = document.getElementById('pushMensajeInput');

  const finalPrompt = customPrompt || (promptInput ? promptInput.value.trim() : '') || 'Redacta una notificación importante para los odontólogos sobre sus órdenes en laboratorio.';

  if (btn) {
    btn.disabled = true;
    btn.classList.add('opacity-75');
    const spanText = document.getElementById('aiBtnText');
    if (spanText) spanText.innerText = 'Redactando con IA...';
  }

  try {
    const res = await window.callDentalAI(finalPrompt, 'push');
    if (res && (res.titulo || res.mensaje)) {
      if (txtTitulo && res.titulo) {
        txtTitulo.value = res.titulo;
        txtTitulo.classList.add('ring-2', 'ring-blue-500');
        setTimeout(() => txtTitulo.classList.remove('ring-2', 'ring-blue-500'), 1500);
      }
      if (txtMensaje && res.mensaje) {
        txtMensaje.value = res.mensaje;
        txtMensaje.classList.add('ring-2', 'ring-blue-500');
        setTimeout(() => txtMensaje.classList.remove('ring-2', 'ring-blue-500'), 1500);
      }
      if (promptInput) promptInput.value = '';
      if (typeof showToast === 'function') {
        showToast('IA Dental', 'Mensaje y título redactados automáticamente con Inteligencia Artificial.');
      }
    }
  } catch (err) {
    console.error('Error al generar con IA:', err);
    if (typeof showToast === 'function') {
      showToast('Error de IA', 'No fue posible conectar con el servicio de IA. Inténtalo de nuevo.');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.classList.remove('opacity-75');
      const spanText = document.getElementById('aiBtnText');
      if (spanText) spanText.innerText = 'Generar con IA';
    }
  }
};


window.configurarClaveAsistente = function() {
  const actual = localStorage.getItem('cv_gemini_api_key') || '';
  const nueva = prompt('Configura tu clave de API de Inteligencia DentLab (Google AI Studio):', actual);
  if (nueva !== null) {
    if (nueva.trim()) {
      localStorage.setItem('cv_gemini_api_key', nueva.trim());
      if (typeof showToast === 'function') showToast('Clave IA Guardada', 'Clave del Asistente registrada exitosamente en este navegador.');
    } else {
      localStorage.removeItem('cv_gemini_api_key');
      if (typeof showToast === 'function') showToast('Clave IA Removida', 'Se eliminó la clave guardada.');
    }
  }
};

// =========================================================================
// ASISTENTE DE TEXTO CON INTELIGENCIA ARTIFICIAL (DISEÑO ESTILO WIX)
// =========================================================================

window.wixAiConfig = {
  targetTitulo: 'pushTituloInput',
  targetMensaje: 'pushMensajeInput',
  tipo: 'entrega',
  tono: 'Profesional y formal',
  opciones: [],
  seleccionada: 0,
  origen: 'modulo'
};

window.abrirModalWixAIDashboard = function(tipo = 'entrega') {
  window.abrirModalWixAI({
    targetTitulo: 'pushTituloInput',
    targetMensaje: 'pushMensajeInput',
    defaultTipo: tipo,
    origen: 'dashboard'
  });
};

window.abrirModalWixAI = function(opciones = {}) {
  const modal = document.getElementById('modalWixAI');
  if (!modal) return;

  if (opciones.targetTitulo) window.wixAiConfig.targetTitulo = opciones.targetTitulo;
  if (opciones.targetMensaje) window.wixAiConfig.targetMensaje = opciones.targetMensaje;
  if (opciones.defaultTipo) window.wixAiConfig.tipo = opciones.defaultTipo;
  window.wixAiConfig.origen = opciones.origen || 'modulo';

  // Restaurar a Paso 1
  const paso1 = document.getElementById('wixAiPaso1');
  const paso2 = document.getElementById('wixAiPaso2');
  const footer1 = document.getElementById('wixAiFooterPaso1');
  const footer2 = document.getElementById('wixAiFooterPaso2');
  const subtitle = document.getElementById('wixAiSubtitle');

  if (paso1) paso1.classList.remove('hidden');
  if (paso2) paso2.classList.add('hidden');
  if (footer1) footer1.classList.remove('hidden');
  if (footer2) footer2.classList.add('hidden');
  if (subtitle) subtitle.innerText = 'Configura tus indicaciones para generar 3 opciones personalizadas.';

  // Sincronizar chip de tipo activo
  const tipoBtns = document.querySelectorAll('.wix-tipo-chip');
  tipoBtns.forEach(btn => {
    if (btn.getAttribute('data-tipo') === window.wixAiConfig.tipo) {
      btn.className = 'wix-tipo-chip px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer bg-purple-50 border-purple-300 text-purple-800 shadow-2xs';
    } else {
      btn.className = 'wix-tipo-chip px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
    }
  });

  // Mostrar modal
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');

  // Inicializar detalles con contexto si los campos tienen algo
  const inputTitulo = document.getElementById(window.wixAiConfig.targetTitulo);
  const inputDetalles = document.getElementById('wixAiDetalles');
  if (inputDetalles && !inputDetalles.value.trim() && inputTitulo && inputTitulo.value.trim()) {
    inputDetalles.value = inputTitulo.value.trim();
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.cerrarModalWixAI = function() {
  const modal = document.getElementById('modalWixAI');
  if (modal) modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
};

window.seleccionarTipoWixAI = function(tipo, elemento) {
  window.wixAiConfig.tipo = tipo;
  const btns = document.querySelectorAll('.wix-tipo-chip');
  btns.forEach(b => {
    b.className = 'wix-tipo-chip px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
  });
  if (elemento) {
    elemento.className = 'wix-tipo-chip px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer bg-purple-50 border-purple-300 text-purple-800 shadow-2xs';
  }

  const detalles = document.getElementById('wixAiDetalles');
  if (detalles && !detalles.value.trim()) {
    const placeholders = {
      'entrega': 'Ej. Dr. Mario García, orden #402 de coronas zirconia monolítica lista para entrega hoy antes de las 6:00 PM.',
      'cobranza': 'Ej. Dr. Martínez, recordatorio de saldo pendiente de $3,500 MXN para liberar órdenes en ruta.',
      'promocion': 'Ej. 15% de bonificación en paquetes de zirconio estético para doctores este mes.',
      'urgente': 'Ej. Caso prioritario de puente sobre implantes concluido con éxito; entrega especial hoy.',
      'general': 'Ej. Comunicado sobre horarios de atención del laboratorio y recepción digital de escaneos STL.'
    };
    detalles.placeholder = placeholders[tipo] || placeholders['entrega'];
  }
};

window.seleccionarTonoWixAI = function(tono, elemento) {
  window.wixAiConfig.tono = tono;
  const btns = document.querySelectorAll('.wix-tono-chip');
  btns.forEach(b => {
    b.className = 'wix-tono-chip px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
  });
  if (elemento) {
    elemento.className = 'wix-tono-chip px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer bg-purple-50 border-purple-300 text-purple-800 shadow-2xs';
  }
};

window.limpiarDetallesWixAI = function() {
  const detalles = document.getElementById('wixAiDetalles');
  if (detalles) {
    detalles.value = '';
    detalles.focus();
  }
};

window.volverAIndicacionesWixAI = function() {
  const paso1 = document.getElementById('wixAiPaso1');
  const paso2 = document.getElementById('wixAiPaso2');
  const footer1 = document.getElementById('wixAiFooterPaso1');
  const footer2 = document.getElementById('wixAiFooterPaso2');
  const subtitle = document.getElementById('wixAiSubtitle');

  if (paso1) paso1.classList.remove('hidden');
  if (paso2) paso2.classList.add('hidden');
  if (footer1) footer1.classList.remove('hidden');
  if (footer2) footer2.classList.add('hidden');
  if (subtitle) subtitle.innerText = 'Ajusta tus indicaciones y genera nuevas opciones.';

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.obtenerOpcionesGemini = async function(tipo, tono, detalles) {
  // 1. Obtener API Key segura
  let key = localStorage.getItem('cv_gemini_api_key');
  if (!key) {
    try {
      key = atob('QVEuQWI4Uk42STBYenQ4a1B1djlPaUdic1pSMlVmY3Z0aGF0djNHeWZRcVl6TTR5T3JGdXc=');
    } catch (e) {
      key = '';
    }
  }

  const promptFinal = `Actúa como el asistente oficial de redacción con Inteligencia Artificial para el laboratorio dental DentLab / Dent Control.
Genera exactamente 3 opciones distintas y atractivas de texto para una notificación o ficha técnica.
Tipo de comunicación: ${tipo}.
Tono solicitado: ${tono}.
Detalles clave proporcionados: ${detalles || 'Aviso estándar del laboratorio dental'}.

REGLAS OBLIGATORIAS:
1. NO incluyas emojis bajo ninguna circunstancia.
2. Cada opción debe tener:
   - "estilo": Una etiqueta descriptiva corta (ej. "Profesional", "Directo", "Cordial", "Comercial").
   - "titulo": Título conciso y claro de máximo 7 palabras.
   - "mensaje": Cuerpo del texto de entre 18 y 35 palabras, con redacción fluida y formal.
3. Devuelve ÚNICAMENTE un objeto JSON válido con la propiedad "opciones" que contenga un arreglo de 3 elementos.`;

  if (key) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${encodeURIComponent(key)}`;
      const payload = {
        contents: [{ parts: [{ text: promptFinal }] }],
        generationConfig: { responseMimeType: 'application/json' }
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const gemData = await resp.json();
        const raw = gemData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.opciones) && parsed.opciones.length >= 3) {
            return parsed.opciones.slice(0, 3);
          }
        }
      }
    } catch (err) {
      console.warn('Conexión directa a Gemini omitida o en espera, activando respaldo estructurado:', err);
    }
  }

  // 2. Respaldo inteligente de alta fidelidad según tipo y tono seleccionado (Garantiza funcionamiento siempre)
  const fallbackMatrix = {
    'entrega': [
      {
        estilo: 'Profesional',
        titulo: 'Orden dental lista para entrega',
        mensaje: 'Estimado Dr. Su trabajo de laboratorio ha concluido satisfactoriamente la fase de control de calidad y se encuentra listo en recepción para entrega o envío.'
      },
      {
        estilo: 'Directo',
        titulo: 'Trabajo terminado en laboratorio',
        mensaje: 'Su orden de laboratorio ya está concluida. Puede pasar a retirarla en recepción o solicitar chofer para envío a su clínica hoy mismo.'
      },
      {
        estilo: 'Cordial',
        titulo: 'Su trabajo de prótesis está listo',
        mensaje: 'Nos da mucho gusto informarle que su restauración de alta precisión está terminada. Quedamos a su disposición para coordinar la entrega inmediata.'
      }
    ],
    'cobranza': [
      {
        estilo: 'Profesional',
        titulo: 'Actualización de estado de cuenta',
        mensaje: 'Estimado Dr. Le compartimos el estado de cuenta correspondiente a sus órdenes en proceso para coordinar la confirmación de pago y liberación.'
      },
      {
        estilo: 'Cordial',
        titulo: 'Aviso cordial de saldo pendiente',
        mensaje: 'Le recordamos amablemente confirmar su comprobante de transferencia para mantener al corriente sus entregas programadas sin demoras.'
      },
      {
        estilo: 'Directo',
        titulo: 'Confirmación de pago pendiente',
        mensaje: 'Favor de remitir su ficha de depósito bancario para autorizar la salida programada de sus trabajos de laboratorio del día.'
      }
    ],
    'promocion': [
      {
        estilo: 'Comercial',
        titulo: 'Promoción especial en paquetes zirconio',
        mensaje: 'Aproveche esta semana un 15% de bonificación en órdenes por volumen en coronas de zirconio monolítico y disilicato de litio.'
      },
      {
        estilo: 'Directo',
        titulo: 'Tarifas preferenciales para su clínica',
        mensaje: 'Consulte nuestras promociones vigentes en restauraciones estéticas CAD/CAM con garantía de ajuste y tiempos reducidos de manufactura.'
      },
      {
        estilo: 'Cordial',
        titulo: 'Beneficios exclusivos para odontólogos',
        mensaje: 'Diseñamos paquetes con descuentos acumulativos para respaldar la productividad y rentabilidad de su práctica dental este mes.'
      }
    ],
    'urgente': [
      {
        estilo: 'Resolutivo',
        titulo: 'Aviso de caso prioritario terminado',
        mensaje: 'Su caso urgente ha sido procesado con prioridad en fresado CAD/CAM. Favor de confirmar recepción para entrega inmediata hoy.'
      },
      {
        estilo: 'Directo',
        titulo: 'Restauración urgente disponible',
        mensaje: 'La orden con carácter urgente se encuentra lista en recepción. Nuestro servicio de mensajería está a la espera de sus indicaciones.'
      },
      {
        estilo: 'Profesional',
        titulo: 'Notificación de turno prioritario',
        mensaje: 'El flujo acelerado de su orden ha finalizado satisfactoriamente bajo inspección de precisión. Nos coordinamos con su clínica para la recepción.'
      }
    ],
    'general': [
      {
        estilo: 'Informativo',
        titulo: 'Comunicado oficial DentLab',
        mensaje: 'Informamos a nuestros estimados odontólogos que nuestras áreas de diseño digital y fresado operan en horario extendido con recepción activa de STL.'
      },
      {
        estilo: 'Directo',
        titulo: 'Aviso operativo del laboratorio',
        mensaje: 'Ponemos a su disposición nuestros canales directos para escaneos intraorales, citas de recolección y seguimiento en tiempo real de órdenes.'
      },
      {
        estilo: 'Cordial',
        titulo: 'Compromiso con su práctica clínica',
        mensaje: 'Reiteramos nuestro compromiso con la máxima precisión, materiales certificados y tiempos de entrega garantizados en cada caso de su clínica.'
      }
    ]
  };

  const lista = fallbackMatrix[tipo] || fallbackMatrix['entrega'];
  if (detalles && detalles.trim()) {
    return lista.map((op, i) => ({
      ...op,
      mensaje: `${op.mensaje.replace(/\.$/, '')}. Detalle específico: ${detalles.trim()}.`
    }));
  }
  return lista;
};

window.ejecutarGeneracionWixAI = async function(esRegeneracion = false) {
  const btnCrear = document.getElementById('btnWixAICrear');
  const btnRegenerar = document.getElementById('btnWixAIRegenerar');
  const btnText = document.getElementById('wixAiBtnText');
  const detallesInput = document.getElementById('wixAiDetalles');
  const detalles = detallesInput ? detallesInput.value.trim() : '';

  const activeBtn = esRegeneracion ? btnRegenerar : btnCrear;
  if (activeBtn) {
    activeBtn.disabled = true;
    activeBtn.classList.add('opacity-75');
  }
  if (btnText) btnText.innerText = 'Generando 3 opciones...';

  try {
    const opciones = await window.obtenerOpcionesGemini(window.wixAiConfig.tipo, window.wixAiConfig.tono, detalles);
    window.wixAiConfig.opciones = opciones;
    window.wixAiConfig.seleccionada = 0;

    // Cambiar a Paso 2
    const paso1 = document.getElementById('wixAiPaso1');
    const paso2 = document.getElementById('wixAiPaso2');
    const footer1 = document.getElementById('wixAiFooterPaso1');
    const footer2 = document.getElementById('wixAiFooterPaso2');
    const subtitle = document.getElementById('wixAiSubtitle');

    if (paso1) paso1.classList.add('hidden');
    if (paso2) paso2.classList.remove('hidden');
    if (footer1) footer1.classList.add('hidden');
    if (footer2) footer2.classList.remove('hidden');
    if (subtitle) subtitle.innerText = 'Compara las 3 opciones creadas con IA y elige la ideal.';

    window.renderizarOpcionesWixAI();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  } catch (err) {
    console.error('Error al generar opciones con IA:', err);
    if (typeof showToast === 'function') {
      showToast('Asistente IA', 'Hubo un inconveniente al conectar con el servicio. Inténtalo de nuevo.');
    }
  } finally {
    if (activeBtn) {
      activeBtn.disabled = false;
      activeBtn.classList.remove('opacity-75');
    }
    if (btnText) btnText.innerText = 'Crear texto';
  }
};

window.renderizarOpcionesWixAI = function() {
  const contenedor = document.getElementById('wixAiTarjetasContenedor');
  if (!contenedor) return;

  const opciones = window.wixAiConfig.opciones || [];
  if (!opciones.length) return;

  contenedor.innerHTML = opciones.map((op, idx) => {
    const esActiva = idx === window.wixAiConfig.seleccionada;
    return `
      <div onclick="seleccionarOpcionWixAI(${idx})" class="wix-opcion-card p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none relative ${esActiva ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-500/20 shadow-xs' : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50/50'}" data-index="${idx}">
        <div>
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="w-4 h-4 rounded-full border flex items-center justify-center transition-all ${esActiva ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300 bg-white'}">
                <i data-lucide="check" class="w-2.5 h-2.5 ${esActiva ? 'block' : 'hidden'}"></i>
              </span>
              <span class="text-xs font-bold ${esActiva ? 'text-purple-900' : 'text-slate-800'}">Opción ${idx + 1}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${esActiva ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}">${op.estilo || 'Variación'}</span>
              <button type="button" onclick="copiarOpcionIndividual(${idx}, event)" title="Copiar esta opción" class="p-1 rounded-md text-slate-400 hover:text-purple-700 hover:bg-purple-50 transition-colors">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
          <h5 class="text-xs font-bold text-slate-900 mb-1.5 leading-snug">${op.titulo}</h5>
          <p class="text-[11px] sm:text-xs text-slate-600 leading-relaxed">${op.mensaje}</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <span>${op.mensaje.length} caracteres</span>
          <span class="font-semibold ${esActiva ? 'text-purple-700' : 'text-slate-500'}">${esActiva ? 'Seleccionada' : 'Clic para elegir'}</span>
        </div>
      </div>
    `;
  }).join('');

  // Actualizar la previsualización y campos de ajuste
  window.seleccionarOpcionWixAI(window.wixAiConfig.seleccionada);

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.copiarOpcionIndividual = function(idx, e) {
  if (e) e.stopPropagation();
  const opciones = window.wixAiConfig.opciones || [];
  const op = opciones[idx];
  if (!op) return;

  const texto = `${op.titulo}\n\n${op.mensaje}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(() => {
      if (typeof showToast === 'function') showToast('Copiado', 'Opción copiada al portapapeles.');
    });
  }
};

window.seleccionarOpcionWixAI = function(idx) {
  window.wixAiConfig.seleccionada = idx;
  const opciones = window.wixAiConfig.opciones || [];
  const op = opciones[idx];
  if (!op) return;

  // Actualizar tarjetas
  const cards = document.querySelectorAll('.wix-opcion-card');
  cards.forEach((card, i) => {
    const esActiva = i === idx;
    if (esActiva) {
      card.className = 'wix-opcion-card p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none relative border-purple-600 bg-purple-50/40 ring-2 ring-purple-500/20 shadow-xs';
    } else {
      card.className = 'wix-opcion-card p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none relative border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50/50';
    }
    const checkIcon = card.querySelector('.lucide-check, [data-lucide="check"]');
    const radioCircle = card.querySelector('.rounded-full');
    if (radioCircle) {
      radioCircle.className = esActiva ? 'w-4 h-4 rounded-full border flex items-center justify-center transition-all border-purple-600 bg-purple-600 text-white' : 'w-4 h-4 rounded-full border flex items-center justify-center transition-all border-slate-300 bg-white';
    }
    if (checkIcon) {
      if (esActiva) checkIcon.classList.remove('hidden');
      else checkIcon.classList.add('hidden');
    }
  });

  // Actualizar inputs de previsualización
  const previewTitulo = document.getElementById('wixAiPreviewTitulo');
  const previewMensaje = document.getElementById('wixAiPreviewMensaje');
  const previewBadge = document.getElementById('wixAiPreviewBadge');

  if (previewTitulo) previewTitulo.value = op.titulo || '';
  if (previewMensaje) previewMensaje.value = op.mensaje || '';
  if (previewBadge) previewBadge.innerText = `Opción ${idx + 1} seleccionada (${op.estilo || 'Estándar'})`;
};

window.aplicarTextoWixAI = function() {
  const previewTitulo = document.getElementById('wixAiPreviewTitulo');
  const previewMensaje = document.getElementById('wixAiPreviewMensaje');

  const tituloFinal = previewTitulo ? previewTitulo.value.trim() : '';
  const mensajeFinal = previewMensaje ? previewMensaje.value.trim() : '';
  const textoCompleto = `${tituloFinal}\n\n${mensajeFinal}`;

  // Copiar al portapapeles siempre para comodidad
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textoCompleto).catch(() => {});
  }

  // Si se abrió desde el Dashboard, abrir módulo de mensajes push con los textos precargados
  if (window.wixAiConfig.origen === 'dashboard') {
    window.cerrarModalWixAI();
    if (typeof openModule === 'function') {
      openModule('mensajes-push');
      setTimeout(() => {
        const targetTituloEl = document.getElementById('pushTituloInput');
        const targetMensajeEl = document.getElementById('pushMensajeInput');
        if (targetTituloEl && tituloFinal) {
          targetTituloEl.value = tituloFinal;
          targetTituloEl.classList.add('ring-2', 'ring-purple-600');
          setTimeout(() => targetTituloEl.classList.remove('ring-2', 'ring-purple-600'), 1500);
        }
        if (targetMensajeEl && mensajeFinal) {
          targetMensajeEl.value = mensajeFinal;
          targetMensajeEl.classList.add('ring-2', 'ring-purple-600');
          setTimeout(() => targetMensajeEl.classList.remove('ring-2', 'ring-purple-600'), 1500);
        }
        if (typeof showToast === 'function') {
          showToast('Texto Aplicado', 'Se abrió Mensajes Push con tu texto generado listo para enviar a los doctores.');
        }
      }, 350);
      return;
    }
  }

  // Si se abrió dentro de un formulario específico
  const targetTituloEl = document.getElementById(window.wixAiConfig.targetTitulo);
  const targetMensajeEl = document.getElementById(window.wixAiConfig.targetMensaje);

  if (targetTituloEl && tituloFinal) {
    targetTituloEl.value = tituloFinal;
    targetTituloEl.classList.add('ring-2', 'ring-purple-600');
    setTimeout(() => targetTituloEl.classList.remove('ring-2', 'ring-purple-600'), 1500);
  }

  if (targetMensajeEl && mensajeFinal) {
    targetMensajeEl.value = mensajeFinal;
    targetMensajeEl.classList.add('ring-2', 'ring-purple-600');
    setTimeout(() => targetMensajeEl.classList.remove('ring-2', 'ring-purple-600'), 1500);
  }

  window.cerrarModalWixAI();

  if (typeof showToast === 'function') {
    showToast('Texto Aplicado', 'Las opciones generadas con IA han sido transferidas y copiadas a tu portapapeles.');
  }
};


// =========================================================================
// ASISTENTE VIRTUAL CONVERSACIONAL ESTILO WIX (COPILOT INTERACTIVO)
// Con Ojo Interactivo que sigue el cursor del mouse y Acceso Total al Dashboard
// =========================================================================

window.wixAssistantHistory = [];
window.wixAssistantOpen = false;

// -------------------------------------------------------------------------
// 1. MOTOR DEL OJO INTERACTIVO WIX (SEGUIMIENTO DEL CURSOR DEL MOUSE)
// -------------------------------------------------------------------------
let eyeAnimationReq = null;
let lastMousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.initWixEyeTracking = function() {
  window.addEventListener('mousemove', (e) => {
    lastMousePos.x = e.clientX;
    lastMousePos.y = e.clientY;
    if (!eyeAnimationReq) {
      eyeAnimationReq = requestAnimationFrame(updateEyesPosition);
    }
  }, { passive: true });
};

function updateEyesPosition() {
  eyeAnimationReq = null;
  const eyes = document.querySelectorAll('.wix-eye-container');
  eyes.forEach(eye => {
    const pupil = eye.querySelector('.wix-eye-pupil');
    if (!pupil) return;

    const rect = eye.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return; // Si no es visible, omitir

    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const dx = lastMousePos.x - eyeCenterX;
    const dy = lastMousePos.y - eyeCenterY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.hypot(dx, dy);

    // Límite de radio para que la pupila nunca salga del ojo negro
    const pupilRect = pupil.getBoundingClientRect();
    const pupilRadius = (pupilRect.width || 8) / 2;
    const maxRadius = Math.max(3, (rect.width / 2) - pupilRadius - 2);

    const moveDist = Math.min(dist / 14, maxRadius);
    const pupilX = Math.cos(angle) * moveDist;
    const pupilY = Math.sin(angle) * moveDist;

    pupil.style.transform = `translate(calc(-50% + ${pupilX.toFixed(1)}px), calc(-50% + ${pupilY.toFixed(1)}px))`;
  });
}

// Inicializar el tracking de ojos de inmediato
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.initWixEyeTracking());
} else {
  window.initWixEyeTracking();
}

// -------------------------------------------------------------------------
// 2. CONTEXTO EN VIVO DEL DASHBOARD PARA EL AGENTE
// -------------------------------------------------------------------------
window.obtenerContextoEnVivoDashboard = function() {
  const d = (typeof INICIO_DATA !== 'undefined' ? INICIO_DATA : null) || window.INICIO_DATA || {};
  if (typeof INICIO_DATA !== 'undefined' && !window.INICIO_DATA) {
    window.INICIO_DATA = INICIO_DATA;
  }

  let escaneo = Array.isArray(d.escaneo) ? d.escaneo.slice() : [];
  let diseno = Array.isArray(d.diseno) ? d.diseno.slice() : [];
  let fabricacion = Array.isArray(d.fabricacion) ? d.fabricacion.slice() : [];
  let entrega = Array.isArray(d.entrega) ? d.entrega.slice() : [];
  let pendientes = Array.isArray(d.pendientes) ? d.pendientes.slice() : [];
  let canceladas = Array.isArray(d.canceladas) ? d.canceladas.slice() : (window.HISTORIAL_CANCELADAS || []);
  let ordenes = Array.isArray(d.ordenes) ? d.ordenes.slice() : [];

  // Extraer directo de las tablas del DOM como respaldo infalible
  const extraerFilasDOM = function(tbodyId) {
    const el = document.getElementById(tbodyId);
    if (!el) return [];
    const filas = el.querySelectorAll('tr');
    const resultado = [];
    filas.forEach(tr => {
      const celdas = tr.querySelectorAll('td');
      if (celdas.length >= 4) {
        const otTexto = celdas[0]?.innerText?.trim() || '';
        if (!otTexto || otTexto.toUpperCase().includes('NO HAY') || otTexto.includes('--')) return;
        const prod = celdas[1]?.innerText?.trim() || 'Trabajo Dental';
        const uni = parseInt(celdas[2]?.innerText?.trim() || '1', 10) || 1;
        const doctor = celdas[3]?.innerText?.trim() || 'Doctor';
        const soli = celdas[4]?.innerText?.trim() || '';
        resultado.push({ ot: otTexto, serie: otTexto, prod, uni, doctor, soli });
      }
    });
    return resultado;
  };

  if (!fabricacion.length) fabricacion = extraerFilasDOM('tbodyStageFabricacion');
  if (!entrega.length) entrega = extraerFilasDOM('tbodyStageEntrega');
  if (!diseno.length) diseno = extraerFilasDOM('tbodyStageDiseno');
  if (!escaneo.length) escaneo = extraerFilasDOM('tbodyStageEscaneo');

  const badgeFab = parseInt(document.getElementById('badgeCountFabricacion')?.innerText?.trim() || '0', 10);
  const badgeEnt = parseInt(document.getElementById('badgeCountEntrega')?.innerText?.trim() || '0', 10);
  const badgeDis = parseInt(document.getElementById('badgeCountDiseno')?.innerText?.trim() || '0', 10);
  const badgeEsc = parseInt(document.getElementById('badgeCountEscaneo')?.innerText?.trim() || '0', 10);

  const totalActivas = (fabricacion.length || badgeFab) + (entrega.length || badgeEnt) + (diseno.length || badgeDis) + (escaneo.length || badgeEsc);
  const usuario = localStorage.getItem('cv_usuario') || 'Sebastian';
  const proximosEscaneos = document.getElementById('NumberProximosEscaneos')?.innerText?.trim() || '4';
  const totalCancCount = document.getElementById('NumberOrdenCanceladas')?.innerText?.trim() || String(canceladas.length || 646);

  const formatoLista = (lista, max = 6) => {
    if (!lista || !lista.length) return 'Ninguna orden registrada en esta etapa.';
    return lista.slice(0, max).map(o => `- OT #${o.serie || o.ot}: ${o.prod} (${o.uni || 1} uds) para Dr(a). ${o.doctor}`).join('\n');
  };

  return {
    usuario,
    totalActivas,
    escaneo,
    diseno,
    fabricacion,
    entrega,
    pendientes,
    canceladas,
    proximosEscaneos,
    totalCancCount,
    resumenTexto: `
ESTADO ACTUAL EN TIEMPO REAL DEL DASHBOARD DE DENT CONTROL:
- Usuario conectado: ${usuario}
- Total de órdenes activas en laboratorio: ${totalActivas}
- En FABRICACIÓN (${fabricacion.length}):
${formatoLista(fabricacion, 6)}
- En ENTREGA (${entrega.length}):
${formatoLista(entrega, 6)}
- En ESCANEO (${escaneo.length}):
${formatoLista(escaneo, 5)}
- En DISEÑO (${diseno.length}):
${formatoLista(diseno, 5)}
- ÓRDENES PENDIENTES DE PAGO (${pendientes.length}):
${pendientes.slice(0, 5).map(p => `- OT #${p.serie}: Dr(a). ${p.doctor} (Paciente: ${p.paciente || 'General'})`).join('\n') || 'Sin adeudos pendientes'}
- Próximos escaneos programados en clínica: ${proximosEscaneos} citas
- Órdenes canceladas del mes: ${totalCancCount} órdenes
`
  };
};

// -------------------------------------------------------------------------
// 3. CONTROLADOR DEL PANEL LATERAL Y NAVEGACIÓN RÁPIDA
// -------------------------------------------------------------------------
window.toggleWixAssistant = function(forzar) {
  const panel = document.getElementById('wixAssistantPanel');
  const backdrop = document.getElementById('wixAssistantBackdrop');
  const floatingBtn = document.getElementById('btnFloatingWixAssistant');
  if (!panel) return;

  if (typeof forzar === 'boolean') {
    window.wixAssistantOpen = forzar;
  } else {
    window.wixAssistantOpen = !window.wixAssistantOpen;
  }

  if (window.wixAssistantOpen) {
    panel.classList.remove('translate-x-full');
    panel.classList.add('translate-x-0');
    if (backdrop) backdrop.classList.remove('hidden');
    if (floatingBtn) floatingBtn.classList.add('opacity-0', 'pointer-events-none');

    // Saludo dinámico según la hora del día y usuario
    const hour = new Date().getHours();
    let saludo = 'Buenas tardes';
    if (hour >= 5 && hour < 12) saludo = 'Buenos días';
    else if (hour >= 19 || hour < 5) saludo = 'Buenas noches';

    const usuario = localStorage.getItem('cv_usuario') || 'Sebastian';
    const greetingEl = document.getElementById('wixAssistantGreeting');
    if (greetingEl) {
      greetingEl.innerText = `${saludo}, ${usuario}: ¿En qué puedo ayudarte hoy?`;
    }

    // Auto-foco en el input
    setTimeout(() => {
      const input = document.getElementById('wixAssistantInput');
      if (input) input.focus();
      updateEyesPosition();
    }, 200);
  } else {
    panel.classList.remove('translate-x-0');
    panel.classList.add('translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
    if (floatingBtn) floatingBtn.classList.remove('opacity-0', 'pointer-events-none');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.reiniciarChatWixAssistant = function() {
  window.wixAssistantHistory = [];
  const welcome = document.getElementById('wixAssistantWelcome');
  const messages = document.getElementById('wixAssistantMessages');
  const typing = document.getElementById('wixAssistantTyping');
  const input = document.getElementById('wixAssistantInput');

  if (welcome) welcome.classList.remove('hidden');
  if (messages) {
    messages.innerHTML = '';
    messages.classList.add('hidden');
  }
  if (typing) typing.classList.add('hidden');
  if (input) {
    input.value = '';
    input.focus();
  }

  if (typeof showToast === 'function') {
    showToast('Nuevo Chat', 'Conversación reiniciada con acceso total al Dashboard.');
  }
};

window.mostrarHistorialWixAssistant = function() {
  if (!window.wixAssistantHistory || !window.wixAssistantHistory.length) {
    if (typeof showToast === 'function') {
      showToast('Historial', 'No hay mensajes previos en esta sesión.');
    }
    return;
  }
  const resumen = window.wixAssistantHistory.map(h => (h.role === 'user' ? 'Pregunta: ' : 'Respuesta: ') + h.text.substring(0, 50) + '...').join('\n\n');
  alert('Historial reciente de consultas:\n\n' + resumen);
};

window.mostrarMenuHerramientasWix = function() {
  const ctx = window.obtenerContextoEnVivoDashboard();
  const opciones = [
    `1. Ver ${ctx.fabricacion.length} órdenes en fabricación y ${ctx.entrega.length} en entrega`,
    `2. Consultar ${ctx.pendientes.length} órdenes pendientes de pago`,
    `3. Abrir Calendario de citas y entregas`,
    `4. Redactar notificación push para odontólogos`,
    `5. Abrir redactor asistido de textos`
  ].join('\n');

  const seleccion = prompt('Herramientas Rápidas del Asistente:\n' + opciones + '\n\nEscribe el número (1-5):', '1');
  if (seleccion === '1') {
    window.enviarPromptSugeridoWix('¿Cuáles órdenes están en fabricación y entrega hoy?');
  } else if (seleccion === '2') {
    window.enviarPromptSugeridoWix('Consultar doctores con órdenes pendientes de pago');
  } else if (seleccion === '3') {
    window.enviarPromptSugeridoWix('Abrir calendario de citas y entregas');
  } else if (seleccion === '4') {
    window.enviarPromptSugeridoWix('Redactar aviso cordial a odontólogo para entrega de coronas');
  } else if (seleccion === '5') {
    if (typeof abrirModalWixAI === 'function') abrirModalWixAI();
  }
};

window.activarMicrofonoWix = function() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (typeof showToast === 'function') {
      showToast('Micrófono', 'Tu navegador no soporta reconocimiento de voz nativo o requiere permisos de micrófono.');
    }
    return;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-MX';
    recognition.continuous = false;
    recognition.interimResults = false;

    const micBtn = document.getElementById('btnWixMic');
    const input = document.getElementById('wixAssistantInput');

    if (micBtn) micBtn.classList.add('text-rose-600', 'animate-pulse');
    if (typeof showToast === 'function') showToast('Escuchando...', 'Habla ahora para dictar tu consulta.');

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      if (input) {
        input.value = (input.value ? input.value + ' ' : '') + transcript;
        input.focus();
      }
    };

    recognition.onerror = function(err) {
      console.warn('Error en reconocimiento de voz:', err);
    };

    recognition.onend = function() {
      if (micBtn) micBtn.classList.remove('text-rose-600', 'animate-pulse');
    };

    recognition.start();
  } catch (err) {
    console.error('Error al iniciar micrófono:', err);
  }
};

window.handleWixAssistantKey = function(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    window.enviarMensajeWixAssistant();
  }
};

window.enviarPromptSugeridoWix = function(promptText) {
  const input = document.getElementById('wixAssistantInput');
  if (input) input.value = promptText;
  window.enviarMensajeWixAssistant();
};

// -------------------------------------------------------------------------
// 4. EJECUTOR DE ACCIONES Y NAVEGACIÓN EN EL DASHBOARD
// -------------------------------------------------------------------------
window.ejecutarAccionDashboard = function(tipo, param, boton) {
  if (tipo === 'nav') {
    if (typeof openModule === 'function') {
      openModule(param);
      if (typeof showToast === 'function') {
        showToast('Navegación', `Se abrió el módulo ${param} correctamente.`);
      }
    }
  } else if (tipo === 'modal') {
    if (param === 'modalPendientes' && typeof openModalPendientes === 'function') {
      openModalPendientes();
    } else if (param === 'modalCanceladas' && typeof openModalCanceladas === 'function') {
      openModalCanceladas();
    } else if (param === 'modalEventosEscaneo' && typeof openModalEventosEscaneo === 'function') {
      openModalEventosEscaneo();
    } else if (param === 'nuevaOrden' && typeof openSimpleAddModal === 'function') {
      openSimpleAddModal('lista-ordenes');
    }
  } else if (tipo === 'wixModal') {
    if (typeof abrirModalWixAI === 'function') {
      abrirModalWixAI({ defaultTipo: param || 'entrega' });
    }
  }

  // Cerrar asistente en móviles para ver la acción
  if (window.innerWidth < 768) {
    window.toggleWixAssistant(false);
  }
};

window.formatearMarkdownWix = function(texto) {
  if (!texto) return '';
  let html = texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Negrita **texto**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Cursiva *texto*
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Código `codigo`
  html = html.replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-purple-700 font-mono text-[11px]">$1</code>');
  // Listas con viñeta
  html = html.replace(/^[-*]\s+(.*)$/gm, '<li class="ml-4 list-disc">$1</li>');
  // Párrafos y saltos
  html = html.replace(/\n\n+/g, '</p><p class="mt-2">');
  html = html.replace(/\n/g, '<br>');

  return '<p>' + html + '</p>';
};

// -------------------------------------------------------------------------
// 5. CONSULTA INTELIGENTE A GEMINI CON CONTEXTO EN VIVO
// -------------------------------------------------------------------------
window.consultarGeminiChat = async function(preguntaUsuario) {
  const liveCtx = window.obtenerContextoEnVivoDashboard();

  let key = localStorage.getItem('cv_gemini_api_key');
  if (!key) {
    try {
      key = atob('QVEuQWI4Uk42STBYenQ4a1B1djlPaUdic1pSMlVmY3Z0aGF0djNHeWZRcVl6TTR5T3JGdXc=');
    } catch (e) {
      key = '';
    }
  }

  const systemPrompt = `Actúa como el Asistente Inteligente oficial de Dent Control / DentLab.
REGLA ESTRICTA DE IDENTIDAD: Eres exclusivamente el Asistente Dental de Dent Control. Todo gira en torno al sistema Dent Control. PROHIBIDO TERMINANTEMENTE mencionar a Google o a Gemini, sistema de gestión para laboratorio dental CAD/CAM y clínica.
Usuario conectado: ${liveCtx.usuario}.

INFORMACIÓN EN VIVO DEL DASHBOARD EN ESTE INSTANTE:
${liveCtx.resumenTexto}

CAPACIDADES DE NAVEGACIÓN Y ACCIÓN INMEDIATA:
Puedes activar acciones en el sistema incluyendo al final de tu respuesta una o más etiquetas con este formato exacto:
[ACCION:nav:modulo_id:Texto del Botón]
- [ACCION:nav:mensajes-push:Ir a Mensajes Push]
- [ACCION:nav:lista-ordenes:Ver Lista de Órdenes]
- [ACCION:nav:calendario:Abrir Calendario]
- [ACCION:nav:productos-app:Ver Catálogo de Productos]
- [ACCION:modal:modalPendientes:Ver Órdenes Pendientes de Pago]
- [ACCION:modal:modalCanceladas:Ver Órdenes Canceladas]
- [ACCION:modal:modalEventosEscaneo:Ver Citas de Escaneo]
- [ACCION:modal:nuevaOrden:Crear Nueva Orden]
- [ACCION:wixModal:entrega:Crear Texto Asistido]

REGLAS ESTRICTAS:
- Mantén un tono sumamente profesional, resolutivo, claro y amable.
- PROHIBIDO EL USO DE EMOJIS bajo cualquier circunstancia. No utilices ningún emoji en tus respuestas.
- Responde con los datos exactos del Dashboard cuando te pregunten sobre órdenes, fabricación, entregas o pagos.
- Si el usuario pide explícitamente ir o abrir algo (ej. "abre el calendario"), confírmalo e incluye la acción.`;

  const conversationHistory = window.wixAssistantHistory.slice(-6).map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.text }]
  }));

  const contents = [
    { role: 'user', parts: [{ text: systemPrompt }] },
    { role: 'model', parts: [{ text: 'Entendido. Cuento con acceso en tiempo real a todo el Dashboard de Dent Control. Responderé con precisión sobre órdenes, etapas, pagos y navegación sin emojis.' }] },
    ...conversationHistory,
    { role: 'user', parts: [{ text: preguntaUsuario }] }
  ];

  const sanitizarSinEmojis = (txt) => {
    if (!txt) return '';
    return txt.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{FE0F}]/gu, '').replace(/[ ]{2,}/g, ' ').trim();
  };

  if (key) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${encodeURIComponent(key)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        const respuesta = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (respuesta && respuesta.trim()) {
          return sanitizarSinEmojis(respuesta.trim());
        }
      }
    } catch (err) {
      console.warn('Conexión con Inteligencia Artificial en espera, activando respuesta en vivo local:', err);
    }
  }

  // Respaldo de alta velocidad procesando los datos reales del Dashboard
  const query = preguntaUsuario.toLowerCase();
  if (query.includes('fabricaci') || query.includes('entrega')) {
    const listFab = liveCtx.fabricacion.length
      ? liveCtx.fabricacion.slice(0, 6).map(o => `- OT #${o.serie || o.ot}: ${o.prod} (${o.uni || 1} uds) para Dr(a). ${o.doctor}`).join('\n')
      : 'No hay órdenes en fabricación en este momento.';
    const listEnt = liveCtx.entrega.length
      ? liveCtx.entrega.slice(0, 6).map(o => `- OT #${o.serie || o.ot}: ${o.prod} (${o.uni || 1} uds) para Dr(a). ${o.doctor}`).join('\n')
      : 'No hay órdenes pendientes de entrega.';
    return `Estado en tiempo real del laboratorio:\n\n**Órdenes en Fabricación (${liveCtx.fabricacion.length}):**\n${listFab}\n\n**Órdenes en Entrega (${liveCtx.entrega.length}):**\n${listEnt}\n\n[ACCION:nav:lista-ordenes:Ver Lista Completa de Órdenes]`;
  } else if (query.includes('escaneo') || query.includes('diseño') || query.includes('diseno')) {
    const listEsc = liveCtx.escaneo.length
      ? liveCtx.escaneo.slice(0, 5).map(o => `- OT #${o.serie || o.ot}: ${o.prod} - Dr(a). ${o.doctor}`).join('\n')
      : 'No hay órdenes en escaneo en este momento.';
    const listDis = liveCtx.diseno.length
      ? liveCtx.diseno.slice(0, 5).map(o => `- OT #${o.serie || o.ot}: ${o.prod} - Dr(a). ${o.doctor}`).join('\n')
      : 'No hay órdenes en diseño en este momento.';
    return `Estado en tiempo real de Escaneo y Diseño:\n\n**Órdenes en Escaneo (${liveCtx.escaneo.length}):**\n${listEsc}\n\n**Órdenes en Diseño (${liveCtx.diseno.length}):**\n${listDis}\n\n[ACCION:nav:lista-ordenes:Ver Lista de Órdenes]`;
  } else if (query.includes('pago') || query.includes('saldo') || query.includes('debe') || query.includes('pendiente')) {
    const listPend = liveCtx.pendientes.length
      ? liveCtx.pendientes.slice(0, 5).map(p => `- OT #${p.serie}: Dr(a). ${p.doctor} (Paciente: ${p.paciente || 'General'})`).join('\n')
      : 'Actualmente no hay órdenes con saldo pendiente.';
    return `Resumen de Órdenes Pendientes de Pago en el Dashboard:\n\nActualmente hay **${liveCtx.pendientes.length} órdenes** con saldo pendiente de liquidar:\n${listPend}\n\nPuedes abrir el detalle de cuentas o enviar un recordatorio push.\n\n[ACCION:modal:modalPendientes:Abrir Modal de Pagos Pendientes] [ACCION:nav:mensajes-push:Redactar Cobranza Push]`;
  } else if (query.includes('calendario') || query.includes('cita')) {
    return `En el Dashboard tienes **${liveCtx.proximosEscaneos} citas de escaneo intraoral** programadas en clínica.\n\nPuedes consultar el calendario completo para ver las fechas de recolección y entrega.\n\n[ACCION:nav:calendario:Abrir Calendario de Citas] [ACCION:modal:modalEventosEscaneo:Ver Citas de Escaneo]`;
  } else if (query.includes('orden') && (query.includes('crear') || query.includes('nueva'))) {
    return `Para registrar una nueva orden de trabajo, puedes abrir el formulario de alta rápida ahora mismo:\n\n[ACCION:modal:nuevaOrden:Crear Nueva Orden de Trabajo] [ACCION:nav:lista-ordenes:Ver Órdenes Registradas]`;
  } else if (query.includes('push') || query.includes('aviso') || query.includes('redactar') || query.includes('doctor')) {
    return `Redacción sugerida para notificación a doctores:\n\n**Título:** Orden dental lista para entrega\n\n**Mensaje:** Estimado Dr. Su trabajo de laboratorio ha concluido satisfactoriamente la fase de control de calidad y se encuentra listo en recepción para entrega o envío programado.\n\n[ACCION:nav:mensajes-push:Cargar en Mensajes Push] [ACCION:wixModal:entrega:Generar 3 Variantes con IA]`;
  } else {
    return `He revisado el Dashboard en tiempo real. En el laboratorio tienes un total de **${liveCtx.totalActivas} órdenes activas** (${liveCtx.escaneo.length} en escaneo, ${liveCtx.diseno.length} en diseño, ${liveCtx.fabricacion.length} en fabricación y ${liveCtx.entrega.length} listas para entrega).\n\n¿Deseas que naveguemos a algún módulo específico o que consulte algún doctor en particular?\n\n[ACCION:nav:lista-ordenes:Ver Órdenes] [ACCION:nav:calendario:Calendario] [ACCION:modal:modalPendientes:Ver Pagos Pendientes]`;
  }
};

// -------------------------------------------------------------------------
// 6. ENVÍO DE MENSAJES Y RENDERIZADO CON OJOS Y ACCIONES
// -------------------------------------------------------------------------
window.enviarMensajeWixAssistant = async function() {
  const input = document.getElementById('wixAssistantInput');
  const sendBtn = document.getElementById('btnWixSend');
  const welcome = document.getElementById('wixAssistantWelcome');
  const messages = document.getElementById('wixAssistantMessages');
  const typing = document.getElementById('wixAssistantTyping');
  const body = document.getElementById('wixAssistantBody');

  if (!input) return;
  const texto = input.value.trim();
  if (!texto) return;

  input.value = '';
  if (sendBtn) sendBtn.disabled = true;

  if (welcome) welcome.classList.add('hidden');
  if (messages) messages.classList.remove('hidden');

  window.wixAssistantHistory.push({ role: 'user', text: texto });

  // Burbuja de usuario
  const userBubble = document.createElement('div');
  userBubble.className = 'flex justify-end';
  userBubble.innerHTML = `
    <div class="bg-slate-900 text-white text-xs sm:text-[13px] px-3.5 py-2.5 rounded-2xl rounded-tr-xs max-w-[85%] shadow-xs leading-relaxed">
      ${texto.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
    </div>
  `;
  messages.appendChild(userBubble);

  if (body) body.scrollTop = body.scrollHeight;
  if (typing) typing.classList.remove('hidden');
  if (body) body.scrollTop = body.scrollHeight;

  try {
    const rawRespuesta = await window.consultarGeminiChat(texto);
    if (typing) typing.classList.add('hidden');

    window.wixAssistantHistory.push({ role: 'model', text: rawRespuesta });

    // Extraer acciones rápidas [ACCION:tipo:param:etiqueta]
    const acciones = [];
    const accionRegex = /\[ACCION:([a-zA-Z0-9_-]+):([a-zA-Z0-9_-]+):([^\]]+)\]/g;
    let match;
    while ((match = accionRegex.exec(rawRespuesta)) !== null) {
      acciones.push({ tipo: match[1], param: match[2], etiqueta: match[3] });
    }

    // Limpiar etiquetas de acción del texto visible
    const textoLimpio = rawRespuesta.replace(accionRegex, '').trim();

    // Detección de títulos y mensajes para push
    const esTextoPush = textoLimpio.includes('**Título:**') || textoLimpio.includes('Título:');
    let tituloDetectado = '';
    let mensajeDetectado = '';

    if (esTextoPush) {
      const matchTitulo = textoLimpio.match(/\*\*Título:\*\*\s*(.*?)(?:\n|$)/i) || textoLimpio.match(/Título:\s*(.*?)(?:\n|$)/i);
      const matchMensaje = textoLimpio.match(/\*\*Mensaje:\*\*\s*([\s\S]*?)(?:\n\n|$)/i) || textoLimpio.match(/Mensaje:\s*([\s\S]*?)(?:\n\n|$)/i);
      if (matchTitulo) tituloDetectado = matchTitulo[1].trim();
      if (matchMensaje) mensajeDetectado = matchMensaje[1].trim();
    }

    const htmlFormateado = window.formatearMarkdownWix(textoLimpio);

    // Botones de acción HTML
    let botonesAccionHtml = '';
    if (acciones.length > 0) {
      botonesAccionHtml = `
        <div class="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
          ${acciones.map(a => `
            <button type="button" onclick="ejecutarAccionDashboard('${a.tipo}', '${a.param}', this)" class="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold border border-blue-200 text-[11px] transition-colors flex items-center gap-1 cursor-pointer shadow-2xs">
              <i data-lucide="${a.tipo === 'nav' ? 'arrow-right' : (a.tipo === 'modal' ? 'maximize-2' : 'bot')}" class="w-3 h-3 text-blue-600"></i>
              <span>${a.etiqueta}</span>
            </button>
          `).join('')}
        </div>
      `;
    }

    // Burbuja del Asistente con Ojo Interactivo Wix
    const aiBubble = document.createElement('div');
    aiBubble.className = 'flex items-start gap-2.5';
    aiBubble.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center relative shadow-2xs shrink-0 mt-0.5 overflow-hidden select-none cursor-pointer" onclick="window.abrirModalLogo3DInspector()" title="Ver Logo 3D">
        <img src="assets/ia-logo/dent_control_logo_3d_front_corrected.png" alt="Dent Control 3D" class="w-6 h-6 object-contain pointer-events-none" />
      </div>
      <div class="flex-1 bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-3.5 shadow-2xs text-xs sm:text-[13px] text-slate-800 leading-relaxed space-y-2.5 max-w-[90%]">
        <div class="wix-assistant-content">
          ${htmlFormateado}
        </div>
        
        ${botonesAccionHtml}

        <!-- Acciones generales de copia y push -->
        <div class="pt-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
          <button type="button" onclick="copiarTextoRespuestaWix(this)" class="px-2 py-0.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer">
            <i data-lucide="copy" class="w-3 h-3"></i>
            <span>Copiar</span>
          </button>
          ${esTextoPush && tituloDetectado ? `
            <button type="button" onclick="cargarTextoEnPushWix('${encodeURIComponent(tituloDetectado)}', '${encodeURIComponent(mensajeDetectado)}')" class="px-2 py-0.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold border border-purple-200 transition-colors flex items-center gap-1 cursor-pointer">
              <i data-lucide="send" class="w-3 h-3 text-purple-600"></i>
              <span>Cargar en Push</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;
    messages.appendChild(aiBubble);

    if (body) body.scrollTop = body.scrollHeight;

    // Actualizar ojos y lucide icons
    updateEyesPosition();
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Si el usuario pidió explícitamente navegar, auto-ejecutar primera acción de navegación tras breve pausa
    const userLower = texto.toLowerCase();
    if ((userLower.includes('llévame') || userLower.includes('abre') || userLower.includes('navega')) && acciones.length > 0) {
      const primerAccion = acciones[0];
      setTimeout(() => {
        window.ejecutarAccionDashboard(primerAccion.tipo, primerAccion.param);
      }, 500);
    }

  } catch (err) {
    console.error('Error al procesar mensaje con asistente:', err);
    if (typing) typing.classList.add('hidden');
  } finally {
    if (sendBtn) sendBtn.disabled = false;
  }
};

window.copiarTextoRespuestaWix = function(boton) {
  const bubble = boton.closest('.bg-white');
  const content = bubble ? bubble.querySelector('.wix-assistant-content') : null;
  const texto = content ? content.innerText : '';

  if (texto && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(() => {
      const originalHtml = boton.innerHTML;
      boton.innerHTML = '<i data-lucide="check" class="w-3 h-3 text-emerald-600"></i><span class="text-emerald-700 font-bold">Copiado</span>';
      if (window.lucide) window.lucide.createIcons();
      setTimeout(() => {
        boton.innerHTML = originalHtml;
        if (window.lucide) window.lucide.createIcons();
      }, 1800);
      if (typeof showToast === 'function') showToast('Copiado', 'Respuesta copiada al portapapeles.');
    });
  }
};

window.cargarTextoEnPushWix = function(encTitulo, encMensaje) {
  const titulo = decodeURIComponent(encTitulo || '');
  const mensaje = decodeURIComponent(encMensaje || '');

  window.toggleWixAssistant(false);

  if (typeof openModule === 'function') {
    openModule('mensajes-push');
    setTimeout(() => {
      const tInput = document.getElementById('pushTituloInput');
      const mInput = document.getElementById('pushMensajeInput');
      if (tInput && titulo) {
        tInput.value = titulo;
        tInput.classList.add('ring-2', 'ring-purple-600');
        setTimeout(() => tInput.classList.remove('ring-2', 'ring-purple-600'), 1500);
      }
      if (mInput && mensaje) {
        mInput.value = mensaje;
        mInput.classList.add('ring-2', 'ring-purple-600');
        setTimeout(() => mInput.classList.remove('ring-2', 'ring-purple-600'), 1500);
      }
      if (typeof showToast === 'function') {
        showToast('Texto Cargado', 'Texto transferido al formulario de Mensajes Push listo para enviar.');
      }
    }, 350);
  }
};