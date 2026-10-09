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
    { id: 'ZRC-204', lote: 'LOT-9921A', marca: 'Aidite 3D Pro', color: 'Vita A2', espesor: '14 mm', capacidad: 22, usadas: 14, estado: 'Activo', almacen: 'CNC-1' },
    { id: 'ZRC-205', lote: 'LOT-9921B', marca: 'Ivoclar IPS e.max ZirCAD', color: 'Vita A1', espesor: '18 mm', capacidad: 20, usadas: 8, estado: 'Activo', almacen: 'CNC-2' },
    { id: 'ZRC-206', lote: 'LOT-8840C', marca: 'Upcera Explore', color: 'Vita A3', espesor: '12 mm', capacidad: 24, usadas: 19, estado: 'Activo', almacen: 'CNC-1' },
    { id: 'ZRC-207', lote: 'LOT-8840D', marca: 'Vita YZ HT', color: 'Bleach B1', espesor: '14 mm', capacidad: 22, usadas: 0, estado: 'En Almacén', almacen: 'Gaveta A-2' },
    { id: 'ZRC-190', lote: 'LOT-7102X', marca: 'Aidite 3D Pro', color: 'Vita A2', espesor: '14 mm', capacidad: 22, usadas: 22, estado: 'Agotado / Usado', almacen: 'Histórico' },
    { id: 'ZRC-188', lote: 'LOT-7098M', marca: 'Upcera Explore', color: 'Vita B2', espesor: '16 mm', capacidad: 20, usadas: 20, estado: 'Agotado / Usado', almacen: 'Histórico' }
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

  // 9. RECORDATORIOS
  recordatorios: [
    { id: 'REC-01', tipo: 'Entrega de Trabajo', doctor: 'Dr. Oscar Ramírez', mensaje: 'Confirmar recepción de Corona Zirconio #OT-9799 a las 14:30 hrs', fecha: '2026-10-07', estatus: 'Activo' },
    { id: 'REC-02', tipo: 'Renovación de Paquete', doctor: 'Dra. Fátima Sánchez', mensaje: 'Restan solo 2 coronas disponibles en su paquete PACK-ZRC-10', fecha: '2026-10-08', estatus: 'Activo' },
    { id: 'REC-03', tipo: 'Seguimiento Clínico', doctor: 'Dr. Arturo Morales', mensaje: 'Verificar prueba de bizcocho en puente de 3 unidades #OT-9830', fecha: '2026-10-09', estatus: 'Pendiente' }
  ],
  tiposRecordatorio: [
    { id: 1, nombre: 'Entrega de Trabajo', prioridad: 'Alta', canal: 'Push + WhatsApp', estatus: true },
    { id: 2, nombre: 'Renovación de Paquete', prioridad: 'Media', canal: 'Correo + Push', estatus: true },
    { id: 3, nombre: 'Seguimiento Clínico', prioridad: 'Normal', canal: 'Llamada / Sistema', estatus: true }
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

  // 14. VENDEDORES & USUARIOS REALES DE DENT DEMO
  vendedores: [
    {
        "id": "VEN-01",
        "nombre": "",
        "zona": "Comercial DentLab",
        "doctoresAsignados": 15,
        "metaMensual": "$150,000",
        "avance": "$138,500 (92%)",
        "comision": "8%",
        "estatus": true
    },
    {
        "id": "VEN-02",
        "nombre": "",
        "zona": "Comercial DentLab",
        "doctoresAsignados": 12,
        "metaMensual": "$150,000",
        "avance": "$138,500 (92%)",
        "comision": "8%",
        "estatus": true
    },
    {
        "id": "VEN-03",
        "nombre": "",
        "zona": "Comercial DentLab",
        "doctoresAsignados": 9,
        "metaMensual": "$150,000",
        "avance": "$138,500 (92%)",
        "comision": "8%",
        "estatus": true
    }
],
  usuarios: [
    {
        "id": null,
        "usuario": "",
        "nombre": "Admin",
        "correo": "mhernandez@clinicadent.com",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Luis",
        "correo": "lmendoza@resosistemas.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Alejandro",
        "correo": "cesargue444@gmail.com",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Diana V.",
        "correo": "diana@clinicadent.com",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Dr. Oscar",
        "correo": "ochavez@clinicadent.com",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "José D.",
        "correo": "jdiosdado@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Dr. Isaac",
        "correo": "icamacho@clinicadent.com",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Dr. Luis Gerardo",
        "correo": "lgarellano@clinicadent.com",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Miriam",
        "correo": "miriam@c",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Alondra",
        "correo": "alondra@c",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Fátima S. Dany",
        "correo": "fatima@c",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Lorena M.",
        "correo": "Lorena@c",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Luis C.",
        "correo": "l@c",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Arturo M.",
        "correo": "arturo@c",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Vianeid S.",
        "correo": "Vianeid@d",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Arely S.",
        "correo": "Arely@c",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Isabel D.",
        "correo": "Isabel@c",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Mauricio S.",
        "correo": "Mauricio@c",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Irene Martinez",
        "correo": "imartinez@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "José",
        "correo": "@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Oscar",
        "correo": "@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Amy",
        "correo": "@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Jose Alatorre",
        "correo": "jalatorre@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Christos Vasilikostas",
        "correo": "cvasilikostas@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Luis Cervantes",
        "correo": "lcervantes@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Arturo Meza",
        "correo": "ameza@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Mauricio Sotomayor",
        "correo": "msotomayor@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Hector Minila",
        "correo": "hminila@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Jose Diosdado",
        "correo": "jdiosdado@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
    },
    {
        "id": null,
        "usuario": "",
        "nombre": "Carlos Esqueda",
        "correo": "cesqueda@dentlab.mx",
        "perfil": "",
        "appEquipos": false,
        "estatus": false
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
    if (topTitle) topTitle.innerText = 'Centro de Operaciones Dentales • Producción CAD/CAM';
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
  if (topTitle) topTitle.innerText = `${breadcrumb} / ${title}`;
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

    case 'mensajes-push':
    case 'tipos-push': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Mensajes Push', key === 'mensajes-push' ? 'Lista de Mensajes Push' : 'Tipos de Notificaciones Push', 'Envío de notificaciones instantáneas a la App móvil de Doctores y Escaneadores.', `
          <button onclick="openSimpleAddModal('mensajes-push')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="send" class="w-4 h-4"></i><span>Enviar Nuevo Push</span>
          </button>
        `)}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Historial de Mensajes Push Enviados</h3>
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2">Folio</th>
                  <th class="px-3 py-2">Tipo</th>
                  <th class="px-3 py-2">Título / Mensaje</th>
                  <th class="px-3 py-2">Destinatario</th>
                  <th class="px-3 py-2">Fecha</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${DENT_STATE.mensajesPush.map(p => `
                  <tr class="hover:bg-slate-50">
                    <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${p.id}</td>
                    <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">${p.tipo}</span></td>
                    <td class="px-3 py-2.5 text-left"><p class="font-bold text-slate-800">${p.titulo}</p><p class="text-[11px] text-slate-500">${p.mensaje}</p></td>
                    <td class="px-3 py-2.5 font-medium">${p.destinatario}</td>
                    <td class="px-3 py-2.5 font-mono text-slate-500">${p.fecha}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Tipos Push Configurados</h3>
            ${DENT_STATE.tiposPush.map(t => `
              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                <div>
                  <p class="text-xs font-bold text-slate-800">${t.nombre}</p>
                  <p class="text-[11px] text-slate-500 mt-0.5">${t.descripcion}</p>
                </div>
                <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Activo</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;
    }

    case 'paquetes': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab', 'Paquetes Prepagados para Doctores', 'Administración de paquetes de coronas Zirconio, E-Max y Guardas con vigencia y precios preferenciales.', `
          <button onclick="openSimpleAddModal('paquetes')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Nuevo Paquete</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Nombre</th>
                <th class="px-3 py-2.5">Nombre Corto</th>
                <th class="px-3 py-2.5">Piezas Incluidas</th>
                <th class="px-3 py-2.5">Costo</th>
                <th class="px-3 py-2.5">Desde</th>
                <th class="px-3 py-2.5">Hasta</th>
                <th class="px-3 py-2.5">Status</th>
                <th class="px-3 py-2.5">Actualizar Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.paquetes.map((p, i) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-bold text-slate-800">${p.nombre}</td>
                  <td class="px-3 py-2.5 font-mono text-blue-600 font-semibold">${p.corto}</td>
                  <td class="px-3 py-2.5 font-mono font-bold">${p.piezas} pzas</td>
                  <td class="px-3 py-2.5 font-mono font-bold text-slate-900">$${p.costo.toLocaleString('es-MX')}</td>
                  <td class="px-3 py-2.5 font-mono text-slate-500">${p.desde}</td>
                  <td class="px-3 py-2.5 font-mono text-slate-500">${p.hasta}</td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p.estatus ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">${p.estatus ? 'Activo' : 'Inactivo'}</span></td>
                  <td class="px-3 py-2.5">
                    <button onclick="toggleItemStatus('paquetes', ${i}, 'paquetes')" class="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-[11px] font-semibold">Cambiar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
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
    case 'inventario-discos':
    case 'discos-activos':
    case 'discos-usados': {
      const totalCap = DENT_STATE.discos.reduce((acc, d) => acc + d.capacidad, 0);
      const totalUsa = DENT_STATE.discos.reduce((acc, d) => acc + d.usadas, 0);
      const pct = Math.round((totalUsa / totalCap) * 100);
      let filtered = DENT_STATE.discos;
      let subtitle = 'Control global de bloques y discos de Zirconio HT+, PMMA y Cera por espesor y lote.';
      if (key === 'discos-activos') {
        filtered = DENT_STATE.discos.filter(d => d.estado === 'Activo');
        subtitle = 'Discos actualmente montados o en uso dentro de las fresadoras Roland DWX.';
      } else if (key === 'discos-usados') {
        filtered = DENT_STATE.discos.filter(d => d.estado.includes('Usado'));
        subtitle = 'Histórico de discos agotados al 100% de su capacidad de fresado.';
      }

      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Discos CAD/CAM', key === 'inventario-discos' ? 'Inventario Global de Discos' : (key === 'discos-activos' ? 'Discos Activos en Fresadora' : 'Discos Usados / Agotados'), subtitle, `
          <button onclick="openSimpleAddModal('inventario-discos')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Registrar Entrada de Disco</span>
          </button>
        `)}
        <!-- Tabla Datos Globales exacta de InventarioDiscos.php -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Discos Registrados</span>
            <span class="text-xl font-extrabold font-mono text-slate-900">${DENT_STATE.discos.length}</span>
          </div>
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Capacidad Piezas Global</span>
            <span class="text-xl font-extrabold font-mono text-blue-600">${totalCap}</span>
          </div>
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Piezas Utilizadas</span>
            <span class="text-xl font-extrabold font-mono text-slate-800">${totalUsa}</span>
          </div>
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Piezas Restantes</span>
            <span class="text-xl font-extrabold font-mono text-emerald-600">${totalCap - totalUsa}</span>
          </div>
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">% Utilizado Global</span>
            <span class="text-xl font-extrabold font-mono text-blue-700">${pct}%</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Código Disco</th>
                <th class="px-3 py-2.5">Lote</th>
                <th class="px-3 py-2.5">Marca</th>
                <th class="px-3 py-2.5">Tono Vita</th>
                <th class="px-3 py-2.5">Espesor</th>
                <th class="px-3 py-2.5">Uso de Piezas</th>
                <th class="px-3 py-2.5">Ubicación</th>
                <th class="px-3 py-2.5">Estado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${filtered.map(d => {
                const p = Math.round((d.usadas / d.capacidad) * 100);
                return `
                  <tr class="hover:bg-slate-50">
                    <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${d.id}</td>
                    <td class="px-3 py-2.5 font-mono text-slate-500">${d.lote}</td>
                    <td class="px-3 py-2.5 font-semibold">${d.marca}</td>
                    <td class="px-3 py-2.5 font-mono font-bold">${d.color}</td>
                    <td class="px-3 py-2.5 font-mono">${d.espesor}</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center justify-center gap-2">
                        <div class="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div class="bg-blue-600 h-full rounded-full" style="width:${p}%"></div>
                        </div>
                        <span class="font-mono text-[11px] font-bold">${d.usadas}/${d.capacidad}</span>
                      </div>
                    </td>
                    <td class="px-3 py-2.5">${d.almacen}</td>
                    <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${d.estado === 'Activo' ? 'bg-blue-100 text-blue-800' : (d.estado.includes('Almacén') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700')}">${d.estado}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
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

    case 'recordatorios':
    case 'tipos-recordatorio': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Recordatorios', key === 'recordatorios' ? 'Programación de Recordatorios' : 'Tipos de Recordatorio', 'Alertas automáticas para seguimiento de entregas, cobros y paquetes.', `
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
                <th class="px-3 py-2.5">Doctor</th>
                <th class="px-3 py-2.5">Mensaje de Recordatorio</th>
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
    case 'listado-doctores':
    case 'doctores-inactivos': {
      const list = key === 'doctores-inactivos'
        ? DENT_STATE.doctores.filter(d => d.mesesSinPaquete >= 3)
        : DENT_STATE.doctores;

      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Doctores', key === 'doctores-inactivos' ? 'Doctores sin Paquetes Actuales (≥ 3 Meses)' : 'Directorio General de Doctores', 'Gestión de odontólogos, clínicas afiliadas, asignación de vendedor y compra de paquetes.', `
          <button onclick="openModule('nuevo-doctor')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="user-plus" class="w-4 h-4"></i><span>Nuevo Doctor</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <input id="searchDocInput" onkeyup="filterDynamicTable('searchDocInput','tbodyDoctores')" placeholder="Introduzca algún dato del doctor, clínica o correo a buscar..." class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center focus:outline-none focus:border-blue-600">
          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2.5">Doctor</th>
                  <th class="px-3 py-2.5">Celular</th>
                  <th class="px-3 py-2.5">Mail</th>
                  <th class="px-3 py-2.5">Vendedor</th>
                  <th class="px-3 py-2.5">Nota</th>
                  <th class="px-3 py-2.5">Clínica</th>
                  <th class="px-3 py-2.5">Activo</th>
                  <th class="px-3 py-2.5">Tipo</th>
                  <th class="px-3 py-2.5">Pacientes</th>
                  <th class="px-3 py-2.5">Comprar Paquete</th>
                </tr>
              </thead>
              <tbody id="tbodyDoctores" class="divide-y divide-slate-100">
                ${list.map((d, i) => `
                  <tr class="hover:bg-slate-50">
                    <td class="px-3 py-2.5 font-bold text-slate-900">${d.nombre}</td>
                    <td class="px-3 py-2.5 font-mono">${d.celular}</td>
                    <td class="px-3 py-2.5 text-blue-600">${d.mail}</td>
                    <td class="px-3 py-2.5">${d.vendedor}</td>
                    <td class="px-3 py-2.5 text-slate-500">${d.nota}</td>
                    <td class="px-3 py-2.5 font-medium">${d.clinica}</td>
                    <td class="px-3 py-2.5">
                      <button onclick="toggleDoctorActivo('${d.id}', '${key}')" class="px-2 py-0.5 rounded-full text-[10px] font-bold ${d.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                        ${d.activo ? 'SÍ' : 'NO'}
                      </button>
                    </td>
                    <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded text-[10px] font-semibold ${d.externo ? 'bg-slate-100 text-slate-700' : 'bg-blue-50 text-blue-700'}">${d.externo ? 'Externo' : 'Interno'}</span></td>
                    <td class="px-3 py-2.5">
                      <button onclick="openModule('lista-pacientes')" class="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-[11px] font-semibold transition-colors">Ver Pacientes</button>
                    </td>
                    <td class="px-3 py-2.5">
                      <button onclick="asignarPaqueteDoctor('${d.nombre}')" class="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-colors">+ Paquete</button>
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
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Órdenes', 'Lista Maestra de Órdenes de Trabajo (ListOrdenes.php)', 'Consulta general de órdenes CAD/CAM, acceso a Hoja de Orden de Trabajo, Odontograma y alta de nueva orden.', `
          <button onclick="openSimpleAddModal('lista-ordenes')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <i data-lucide="plus" class="w-4 h-4"></i><span>Crear Nueva Orden</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <input id="searchOrdList" onkeyup="filterDynamicTable('searchOrdList','tbodyOrdList')" placeholder="Buscar por #OT, doctor, paciente o restauración..." class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs w-full sm:w-96 focus:outline-none focus:border-blue-600">
            <button onclick="openOdontogramaModal()" class="px-3.5 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1.5">
              <i data-lucide="scan-face" class="w-4 h-4"></i><span>Abrir Odontograma FDI</span>
            </button>
          </div>
          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-center text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="px-3 py-2.5">Serie OT</th>
                  <th class="px-3 py-2.5">Categoría</th>
                  <th class="px-3 py-2.5">Producto</th>
                  <th class="px-3 py-2.5">Piezas</th>
                  <th class="px-3 py-2.5">Doctor</th>
                  <th class="px-3 py-2.5">Paciente</th>
                  <th class="px-3 py-2.5">Entrega</th>
                  <th class="px-3 py-2.5">Orden de Trabajo</th>
                </tr>
              </thead>
              <tbody id="tbodyOrdList" class="divide-y divide-slate-100">
                ${DENT_STATE.controlLab.map(o => `
                  <tr class="hover:bg-slate-50">
                    <td class="px-3 py-2.5 font-mono font-bold text-blue-600">#${o.serie}</td>
                    <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">${o.categoria}</span></td>
                    <td class="px-3 py-2.5 font-semibold">${o.producto}</td>
                    <td class="px-3 py-2.5 font-mono font-bold">${o.piezas}</td>
                    <td class="px-3 py-2.5">${o.doctor}</td>
                    <td class="px-3 py-2.5">${o.paciente}</td>
                    <td class="px-3 py-2.5 font-mono">${o.entrega}</td>
                    <td class="px-3 py-2.5">
                      <button onclick="openDigitalCard('${o.serie.replace('OT-','')}', '${o.producto}', '${o.paciente}', '${o.doctor}', 'Vita A2', 'Producción', '${o.entrega}')" class="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-semibold transition-colors">
                        Ver Orden
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
    case 'vendedores-detalle':
    case 'representantes-venta': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Comercial', 'Ejecutivos y Representantes de Venta', 'Control de cartera de doctores, metas comerciales y comisiones por vendedor.', `
          <button onclick="openSimpleAddModal('vendedores')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="user-plus" class="w-4 h-4"></i><span>Nuevo Vendedor</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">ID</th>
                <th class="px-3 py-2.5">Ejecutivo Comercial</th>
                <th class="px-3 py-2.5">Zona Asignada</th>
                <th class="px-3 py-2.5">Doctores en Cartera</th>
                <th class="px-3 py-2.5">Meta Mensual</th>
                <th class="px-3 py-2.5">Avance Actual</th>
                <th class="px-3 py-2.5">Comisión</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.vendedores.map(v => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${v.id}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-900">${v.nombre}</td>
                  <td class="px-3 py-2.5">${v.zona}</td>
                  <td class="px-3 py-2.5 font-mono font-bold">${v.doctoresAsignados} doctores</td>
                  <td class="px-3 py-2.5 font-mono">${v.metaMensual}</td>
                  <td class="px-3 py-2.5 font-mono font-bold text-emerald-700">${v.avance}</td>
                  <td class="px-3 py-2.5 font-mono">${v.comision}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
    }

    case 'usuarios': {
      container.innerHTML = `
        ${renderHeaderBanner('Dent Lab • Seguridad', 'Administración de Usuarios del Sistema (Usuarios.php)', 'Gestión de cuentas de acceso, perfiles operativos y permisos para App Equipos.', `
          <button onclick="openSimpleAddModal('usuarios')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="user-plus" class="w-4 h-4"></i><span>Nuevo Usuario</span>
          </button>
        `)}
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <table class="w-full text-center text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="px-3 py-2.5">Usuario</th>
                <th class="px-3 py-2.5">Nombre Completo</th>
                <th class="px-3 py-2.5">Correo</th>
                <th class="px-3 py-2.5">Perfil</th>
                <th class="px-3 py-2.5">App Equipos</th>
                <th class="px-3 py-2.5">Status</th>
                <th class="px-3 py-2.5">Actualizar Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${DENT_STATE.usuarios.map((u, i) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-2.5 font-mono font-bold text-blue-600">${u.usuario}</td>
                  <td class="px-3 py-2.5 font-bold text-slate-800">${u.nombre}</td>
                  <td class="px-3 py-2.5 text-slate-500">${u.correo}</td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">${u.perfil}</span></td>
                  <td class="px-3 py-2.5">
                    <button onclick="toggleUsuarioAppEquipos(${i})" class="px-2 py-0.5 rounded text-[10px] font-bold ${u.appEquipos ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}">
                      ${u.appEquipos ? 'HABILITADO' : 'NO'}
                    </button>
                  </td>
                  <td class="px-3 py-2.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${u.estatus ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}">${u.estatus ? 'Activo' : 'Inactivo'}</span></td>
                  <td class="px-3 py-2.5">
                    <button onclick="toggleItemStatus('usuarios', ${i}, 'usuarios')" class="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-[11px] font-semibold">Cambiar</button>
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
  const doc = DENT_STATE.doctores.find(d => d.id === docId);
  if (!doc) return;
  doc.activo = !doc.activo;
  renderDynamicModule(viewKey);
  lucide.createIcons();
  showToast('Doctor Actualizado', `${doc.nombre}: Estatus ${doc.activo ? 'Activo' : 'Inactivo'}`);
}

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

function guardarNuevoDoctor(e) {
  e.preventDefault();
  const nombre = document.getElementById('ndNombre').value;
  const celular = document.getElementById('ndCelular').value;
  const mail = document.getElementById('ndMail').value;
  const clinica = document.getElementById('ndClinica').value;
  const tipo = document.getElementById('ndTipo').value;
  const vendedor = document.getElementById('ndVendedor').value;
  const nota = document.getElementById('ndNota').value || 'Recién registrado';
  const externo = document.getElementById('ndExterno').value === 'true';

  DENT_STATE.doctores.unshift({
    id: 'DOC-' + (106 + DENT_STATE.doctores.length),
    nombre, celular, mail, vendedor, nota, clinica, tipo,
    activo: true, externo, mesesSinPaquete: 0
  });
  showToast('Doctor Registrado', `${nombre} se agregó exitosamente al directorio.`);
  openModule('listado-doctores');
}

function asignarPaqueteDoctor(nombreDoctor) {
  DENT_STATE.paquetesDoctores.unshift({
    folio: 'VTA-PAQ-' + (89 + DENT_STATE.paquetesDoctores.length),
    doctor: nombreDoctor,
    paquete: 'Paquete 10 Coronas Zirconio Monolítico',
    totalPiezas: 10,
    usadas: 0,
    disponibles: 10,
    saldo: '$0.00 (Liquidado)',
    fecha: '2026-10-07'
  });
  showToast('Paquete Asignado', `Se activó un Paquete de 10 Coronas para ${nombreDoctor}.`);
  openModule('paquetes-doctores');
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
    case 'recordatorios':
      DENT_STATE.recordatorios.unshift({ id: 'REC-0' + (DENT_STATE.recordatorios.length + 1), tipo: 'Seguimiento', doctor: v1, mensaje: v2, fecha: '2026-10-08', estatus: 'Activo' });
      break;
    case 'marcas-discos':
      DENT_STATE.marcasDiscos.push({ id: DENT_STATE.marcasDiscos.length + 1, marca: v1, origen: v2, material: v3 || 'Zirconio CAD/CAM', estatus: true });
      break;
    case 'categorias':
      DENT_STATE.categorias.push({ id: DENT_STATE.categorias.length + 1, nombre: v1, descripcion: v2, productos: 5, estatus: true });
      break;
    case 'vendedores':
      DENT_STATE.vendedores.push({ id: 'VEN-0' + (DENT_STATE.vendedores.length + 1), nombre: v1, zona: v2, doctoresAsignados: 8, metaMensual: '$120,000', avance: '$45,000 (37%)', comision: '8%', estatus: true });
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
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de captura"
    },
    {
        "serie": "30514",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de captura"
    },
    {
        "serie": "30459",
        "responsable": "Irene Martinez",
        "comentario": ""
    },
    {
        "serie": "30424",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de captura"
    },
    {
        "serie": "30352",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Orden duplicada"
    },
    {
        "serie": "30336",
        "responsable": "Mauricio Sotomayor",
        "comentario": "ORDEN DUPLICADA"
    },
    {
        "serie": "30328",
        "responsable": "Mauricio Sotomayor",
        "comentario": "ERROR DE CAPTURA"
    },
    {
        "serie": "30308",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de captura"
    },
    {
        "serie": "30178",
        "responsable": "Mauricio Sotomayor",
        "comentario": "ERROR DE CAPTURA"
    },
    {
        "serie": "30176",
        "responsable": "Mauricio Sotomayor",
        "comentario": "ERROR DE CAPTURA"
    },
    {
        "serie": "30157",
        "responsable": "Mauricio Sotomayor",
        "comentario": "CAMBIO DE TX"
    },
    {
        "serie": "30126",
        "responsable": "Mauricio Sotomayor",
        "comentario": "ERROR DE CAPTURA EN NUMERO DE PIEZAS"
    },
    {
        "serie": "30112",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Se van a rehabilitar mas piezas"
    },
    {
        "serie": "29944",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error"
    },
    {
        "serie": "29898",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de cantidad capturada"
    },
    {
        "serie": "29871",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de Dr en captura"
    },
    {
        "serie": "29870",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de captura"
    },
    {
        "serie": "29762",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de captura en numero de unidades"
    },
    {
        "serie": "29552",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error en cantidad de alienadores"
    },
    {
        "serie": "29550",
        "responsable": "Irene Martinez",
        "comentario": "POR SOLICITUD DEL DOCTOR"
    },
    {
        "serie": "29497",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de producto"
    },
    {
        "serie": "29463",
        "responsable": "Irene Martinez",
        "comentario": "MODO DE PAGO INOCRRECTO"
    },
    {
        "serie": "29428",
        "responsable": "Irene Martinez",
        "comentario": "ERROR EN EL NOMBRE DEL PACIENTE"
    },
    {
        "serie": "29416",
        "responsable": "Mauricio Sotomayor",
        "comentario": "Error de captura"
    },
    {
        "serie": "29408",
        "responsable": "Mauricio Sotomayor",
        "comentario": "error de captura"
    }
],
  canceladasCount: 646,
  pendientes: [],
  pendientesCount: 0
};

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
          <td class="font-mono text-slate-600">${o.entrega}</td>
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
    p1.className = p === 1 ? 'px-3 py-1.5 bg-blue-600 text-white font-bold border-r border-slate-200' : 'px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border-r border-slate-200';
    p2.className = p === 2 ? 'px-3 py-1.5 bg-blue-600 text-white font-bold border-r border-slate-200' : 'px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border-r border-slate-200';
  }
  renderTablasInicio();
  const tbody = document.getElementById('tbodyGeneralOrdenes');
  if (tbody) animateViewEntrance(tbody);
}

// Modales de Inicio idénticos a DENT DEMO/index.php (Órdenes Canceladas y Órdenes Pendientes de Pago)
function renderModalsInicio() {
  const tbCanc = document.getElementById('tbodyModalCanceladas');
  if (tbCanc) {
    tbCanc.innerHTML = (INICIO_DATA.canceladas || []).map(c => `
      <tr class="hover:bg-slate-50">
        <td class="font-mono font-bold">
          <a href="javascript:void(0)" onclick="document.getElementById('modalCanceladas').classList.add('hidden'); abrirOrdenTrabajo('${c.serie}')" class="text-blue-600 hover:underline">${c.serie}</a>
        </td>
        <td class="uppercase font-semibold text-slate-700">${c.responsable}</td>
        <td class="uppercase text-slate-600">${c.comentario}</td>
      </tr>
    `).join('');
  }

  const tbPend = document.getElementById('tbodyModalPendientesPago');
  if (tbPend) {
    if (!INICIO_DATA.pendientes || INICIO_DATA.pendientes.length === 0) {
      tbPend.innerHTML = '<tr><td colspan="4" class="py-6 text-center text-slate-400 font-semibold">NO HAY ORDENES POR MOSTRAR</td></tr>';
    } else {
      tbPend.innerHTML = INICIO_DATA.pendientes.map(p => `
        <tr class="hover:bg-slate-50">
          <td class="font-mono font-bold">${p.serie}</td>
          <td>${p.doctor}</td>
          <td>${p.paciente}</td>
          <td>
            <button type="button" onclick="document.getElementById('modalPendientes').classList.add('hidden'); abrirOrdenTrabajo('${p.serie}')" class="btnEtiqueta btnEtiqueta--ot">
              <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5c-1.5-2-4-2.5-6-1-2 1.5-2.5 4.5-1.5 7 1 2.5 1.5 5.5 2 8 .3 1.5 1.8 1.5 2.5 0 .5-1.5 1-3.5 3-3.5s2.5 2 3 3.5c.7 1.5 2.2 1.5 2.5 0 .5-2.5 1-5.5 2-8 1-2.5.5-5.5-1.5-7-2-1.5-4.5-1-6 1z"/></svg>
            </button>
          </td>
        </tr>
      `).join('');
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

  let blockOverlay = document.getElementById('dentBlockUIOverlay');
  if (!blockOverlay) {
    blockOverlay = document.createElement('div');
    blockOverlay.id = 'dentBlockUIOverlay';
    blockOverlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.65);display:flex;align-items:center;justify-content:center;color:#fff;font-family:Arial,sans-serif;';
    blockOverlay.innerHTML = '<h4 style="text-align:center;font-size:18px;font-weight:700;letter-spacing:0.04em;">GENERANDO ETIQUETA, POR FAVOR ESPERE...</h4>';
    document.body.appendChild(blockOverlay);
  } else {
    blockOverlay.style.display = 'flex';
  }

  const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  if (typeof JsBarcode === 'function') {
    JsBarcode(tempSvg, serieOT, {
      format: 'CODE128',
      width: 2.5,
      height: 10,
      fontSize: 10
    });
  }
  const codeBar = `<div class="col-md-12">${tempSvg.outerHTML}</div>`;

  const frame1 = document.createElement('iframe');
  const styleContainer = 'style="overflow: hidden;width: 100%;height: auto; text-align:center;font-size:8px"';
  const row = "style='overflow: hidden;'";
  frame1.name = 'frame1';
  frame1.style.position = 'absolute';
  frame1.style.top = '-1000000px';
  document.body.appendChild(frame1);

  const frameDoc = frame1.contentWindow
    ? frame1.contentWindow
    : frame1.contentDocument.document
      ? frame1.contentDocument.document
      : frame1.contentDocument;

  frameDoc.document.open();
  frameDoc.document.write(`<html>
    <body style="font-family:Arial; text-align:center;">
      <div ${styleContainer}>
        <div ${row}>
          <table style='width:100%;'>
            <tr>
              <td style='text-align:left;width:30%;font-size:12px;'>OT: ${serieOT}</td>
              <td style='text-align:center;font-weight:bold;font-size:9px'>dentlab.mx</td>
              <td style='text-align:right;width:30%;font-size:10px;'>F. Ent: ${fEnt}</td>
            </tr>
          </table>
          <table style='width:100%;'>
            <tr>
              <td style='text-align:center;width:100%;font-size:13px'><strong>${docNombre}</strong></td>
            </tr>
          </table>
          <table style='width:100%;'>
            <tr>
              <td style='text-align:left;width:100%;font-size:9px'>Dirección: <strong>${direccion}</strong></td>
            </tr>
          </table>
          <table style='width:100%;'>
            <tr>
              <td style='text-align:left;width:60%;font-size:13px'>Px: <strong>${pacNombre}</strong></td>
              <td style='text-align:right;width:40%;font-size:9px'>Tel: <strong>${celular}</strong></td>
            </tr>
          </table>
          <table style='width:100%;'>
            <tr>
              <td style='text-align:left;width:100%;font-size:9px'>Prod: <strong>${producto}</strong></td>
            </tr>
          </table>
          <table style='width:100%;'>
            <tr>
              <td style='text-align:left;width:30%;font-size:9px'>Unid: <strong>${piezas}</strong></td>
              <td style='text-align:left;width:70%;font-size:9px'>Color: <strong>${colorimetro}</strong></td>
            </tr>
          </table>
          <table style='width:100%;'>
            <tr>
              <td style='text-align:left;width:70%;font-size:9px'>Obs: <strong>${observaciones}</strong></td>
            </tr>
          </table>
          ${codeBar}
        </div>
      </div>
    </body>
  </html>`);
  frameDoc.document.close();

  setTimeout(function () {
    blockOverlay.style.display = 'none';
    frame1.contentWindow.focus();
    frame1.contentWindow.print();
    setTimeout(function () {
      if (frame1.parentNode) document.body.removeChild(frame1);
    }, 1000);
  }, 900);

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
  showToast('Pago Registrado', `Se aplicó un abono de $${Number(monto).toLocaleString('es-MX')} MXN (${metodo}) a la Orden #${currentOrdenActiva.serie}.`);
  renderVistaOrdenTrabajo();
}

function renderVistaOrdenTrabajo() {
  const o = currentOrdenActiva || INICIO_DATA.ordenes[0];
  const docObj = window.findDoctorByAny(o.doctorId || o.doctor);
  const container = document.getElementById('section-dynamic');
  if (!container) return;

  const dientesSup = [18,17,16,15,14,13,12,11, 21,22,23,24,25,26,27,28];
  const dientesInf = [48,47,46,45,44,43,42,41, 31,32,33,34,35,36,37,38];

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
      <div class="mb-4 flex items-center justify-between">
        <button onclick="openModule('inicio')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Regresar</span>
        </button>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-bold">Serie: #${o.serie}</span>
          <span class="px-2.5 py-1 rounded-lg ${o.interno ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'} text-xs font-bold">${o.interno ? 'DOCTOR INTERNO' : 'DOCTOR EXTERNO'}</span>
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
          <div class="lg:col-span-7 space-y-4">
            
            <!-- Bloque 1: Escaneo -->
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                <h4 class="font-bold text-slate-800 uppercase tracking-wide">Escaneo</h4>
                <button type="button" onclick="openModule('calendario')" class="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px]">Agregar cita</button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Nombre de usuario:</span><strong class="text-slate-800">${o.usuarioEscaneo || 'Mauricio Sotomayor'}</strong></div>
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Fecha confirmada:</span><strong class="font-mono text-slate-800">${o.fechaConfirmada || 'Pendiente'}</strong></div>
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Agenda inicio:</span><strong class="font-mono text-slate-700">${o.agendaInicio || 'N/A'}</strong></div>
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Agenda fin:</span><strong class="font-mono text-slate-700">${o.agendaFin || 'N/A'}</strong></div>
              </div>
              <div>
                <span class="text-slate-400 font-bold uppercase text-[10px] block mb-1">Observaciones Escaneador:</span>
                <input type="text" value="${o.observacionesEscaneador || ''}" placeholder="Sin observaciones de escaneo" class="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs">
              </div>
            </div>

            <!-- Bloque 2: Discos utilizados en la orden -->
            <div class="bg-white p-4 rounded-2xl border border-slate-200 space-y-2.5">
              <h4 class="font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">Discos utilizados en la orden</h4>
              <table class="w-full text-center border border-slate-200 general-table">
                <thead>
                  <tr>
                    <th>Disco</th>
                    <th>Colorimetro</th>
                    <th>Tamaño</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${o.discosUtilizados && o.discosUtilizados !== 'Sin Discos Utilizados' ? `
                    <tr>
                      <td class="font-mono font-bold">${o.discosUtilizados.split(':')[0]}</td>
                      <td>${o.color}</td>
                      <td>18 mm</td>
                      <td class="font-mono font-bold">${o.unidades}</td>
                    </tr>
                  ` : `
                    <tr>
                      <td colspan="4" class="py-3 text-center text-slate-400 font-semibold">Sin Discos Utilizados</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>

            <!-- Bloque 3: Orden de Trabajo -->
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <h4 class="font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">Orden de Trabajo</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Serie:</span><strong class="font-mono text-sm text-blue-600">${o.serie}</strong></div>
                <div>
                  <span class="text-slate-400 font-bold uppercase text-[10px] block">Doctor:</span>
                  <a href="javascript:void(0)" onclick="abrirDetalleDoctor('${o.doctorId || o.doctor}')" class="font-bold text-sm text-blue-600 hover:underline">${o.doctorNombreCompleto || o.doctor}</a>
                </div>
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Paciente:</span><strong class="text-slate-900">${o.paciente}</strong></div>
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Celular Doctor:</span><strong class="font-mono text-slate-800">${o.celular || (docObj ? docObj.celular : '')}</strong></div>
                <div class="sm:col-span-2"><span class="text-slate-400 font-bold uppercase text-[10px] block">Dirección:</span><strong class="text-slate-700">${o.direccion || (docObj ? docObj.direccion : '')}</strong></div>
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Entrega solicitada:</span><input type="date" value="${o.entrega}" class="mt-0.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-mono text-xs"></div>
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Liberación a prod:</span><strong class="font-mono text-slate-700">${o.libProd || 'Pendiente'} ${o.nombreLib ? '(' + o.nombreLib + ')' : ''}</strong></div>
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Modo de pago:</span><strong class="text-slate-800">${o.metodoPago || 'Efectivo'}</strong></div>
                <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Colorimetro:</span><strong class="text-blue-700 font-bold">${o.color}</strong></div>
                <div class="sm:col-span-2"><span class="text-slate-400 font-bold uppercase text-[10px] block">Paquetes usados:</span><strong class="font-mono text-slate-800">${o.paquetes || 'SIN PAQUETE'}</strong></div>
              </div>

              <div>
                <label class="text-slate-500 font-bold uppercase text-[10px] block mb-1">Observaciones doctor:</label>
                <textarea rows="2" readonly class="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-700">${o.observaciones || ''}</textarea>
              </div>

              <div>
                <label class="text-slate-500 font-bold uppercase text-[10px] block mb-1">Observaciones laboratorio:</label>
                <textarea rows="2" class="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-700" placeholder="Ingrese observaciones internas de laboratorio...">${o.observacionesLab || ''}</textarea>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-200">
                <label class="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" ${o.autColor ? 'checked' : ''} class="rounded text-blue-600">
                  <span class="font-bold text-[11px]">Color</span>
                </label>
                <label class="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" ${o.autMordida ? 'checked' : ''} class="rounded text-blue-600">
                  <span class="font-bold text-[11px]">Mordida</span>
                </label>
                <label class="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" ${o.autMunon ? 'checked' : ''} class="rounded text-blue-600">
                  <span class="font-bold text-[11px]">Muñon</span>
                </label>
                <label class="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" ${o.autAdit ? 'checked' : ''} class="rounded text-blue-600">
                  <span class="font-bold text-[11px]">Aditamento</span>
                </label>
                <label class="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" checked class="rounded text-blue-600">
                  <span class="font-bold text-[11px]">Linea Sellado</span>
                </label>
              </div>

              <div class="pt-2">
                <h5 class="font-bold text-slate-700 uppercase text-[11px] mb-2">Detalle del pedido</h5>
                <table class="w-full text-center border border-slate-200 general-table">
                  <thead>
                    <tr>
                      <th>Cat</th>
                      <th>Prod</th>
                      <th>Pza</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td>Laboratorio</td>
                      <td class="font-bold">${o.producto}</td>
                      <td class="font-mono font-bold">${o.unidades}</td>
                      <td class="font-mono font-bold text-slate-900">${o.monto}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Odontograma con SVG dental nítido -->
          <div class="lg:col-span-5 space-y-4">
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3">
                  <h4 class="font-bold text-slate-800 uppercase">Odontograma</h4>
                  <div class="flex items-center gap-3 text-[11px] font-bold">
                    <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style="background-color:#69CEBE;color:#0f172a;">PILAR</span>
                    <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style="background-color:#F4D77A;color:#0f172a;">PÓNTICO</span>
                  </div>
                </div>

                <p class="text-[10px] text-center font-bold text-slate-400 uppercase mb-1.5">Arcada Superior (18 - 11 | 21 - 28)</p>
                <div class="grid grid-cols-8 gap-1.5 mb-4">
                  ${dientesSup.map(d => {
                    const sel = (o.piezas || []).includes(String(d));
                    return `
                      <button type="button" onclick="this.classList.toggle('ring-2'); this.classList.toggle('ring-teal-500'); showToast('Pieza #${d}', 'Selección actualizada en el odontograma.')"
                        style="${sel ? 'background-color:#69CEBE;color:#0f172a;border-color:#14b8a6;' : ''}"
                        class="py-2 rounded-xl border border-slate-200 font-mono font-bold text-[11px] flex flex-col items-center gap-0.5 transition-all ${sel ? 'shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'}">
                        <svg class="w-3.5 h-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5c-1.5-2-4-2.5-6-1-2 1.5-2.5 4.5-1.5 7 1 2.5 1.5 5.5 2 8 .3 1.5 1.8 1.5 2.5 0 .5-1.5 1-3.5 3-3.5s2.5 2 3 3.5c.7 1.5 2.2 1.5 2.5 0 .5-2.5 1-5.5 2-8 1-2.5.5-5.5-1.5-7-2-1.5-4.5-1-6 1z"/></svg>
                        <span>${d}</span>
                      </button>
                    `;
                  }).join('')}
                </div>

                <p class="text-[10px] text-center font-bold text-slate-400 uppercase mb-1.5">Arcada Inferior (48 - 41 | 31 - 38)</p>
                <div class="grid grid-cols-8 gap-1.5">
                  ${dientesInf.map(d => {
                    const sel = (o.piezas || []).includes(String(d));
                    return `
                      <button type="button" onclick="this.classList.toggle('ring-2'); this.classList.toggle('ring-teal-500'); showToast('Pieza #${d}', 'Selección actualizada en el odontograma.')"
                        style="${sel ? 'background-color:#69CEBE;color:#0f172a;border-color:#14b8a6;' : ''}"
                        class="py-2 rounded-xl border border-slate-200 font-mono font-bold text-[11px] flex flex-col items-center gap-0.5 transition-all ${sel ? 'shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'}">
                        <svg class="w-3.5 h-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5c-1.5-2-4-2.5-6-1-2 1.5-2.5 4.5-1.5 7 1 2.5 1.5 5.5 2 8 .3 1.5 1.8 1.5 2.5 0 .5-1.5 1-3.5 3-3.5s2.5 2 3 3.5c.7 1.5 2.2 1.5 2.5 0 .5-2.5 1-5.5 2-8 1-2.5.5-5.5-1.5-7-2-1.5-4.5-1-6 1z"/></svg>
                        <span>${d}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-200 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-600">Etapa Actual: <strong class="text-blue-600">${o.estado} (${o.subEstado || o.estado})</strong></span>
                  <span class="font-mono font-bold text-slate-900">Unidades: ${o.unidades}</span>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <select id="selectEtapaOT" class="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-xs">
                    <option value="Escaneo" ${o.estado === 'Escaneo' ? 'selected' : ''}>Escaneo</option>
                    <option value="Diseño" ${o.estado === 'Diseño' ? 'selected' : ''}>Diseño</option>
                    <option value="Fabricación" ${o.estado === 'Fabricación' ? 'selected' : ''}>Fabricación</option>
                    <option value="Entrega" ${o.estado === 'Entrega' ? 'selected' : ''}>Entrega</option>
                  </select>
                  <button onclick="avanzarEtapaOrdenActual()" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-colors">
                    Mandar a etapa
                  </button>
                  <button onclick="Etiqueta('${(o.doctor || '').replace(/'/g, "\\'")}', '${(o.paciente || '').replace(/'/g, "\\'")}', '${o.entrega}', '${o.serie}')" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold shadow-sm transition-colors">
                    Etiqueta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      ${currentTabOrden === 'pago' ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
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
          <div class="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <div class="flex items-center justify-between border-b pb-2">
              <h4 class="font-bold text-slate-800 uppercase">Pagos de la Orden</h4>
              <span class="font-mono font-bold text-slate-700">Costo total: ${o.monto}</span>
            </div>
            <table class="w-full text-center border border-slate-200 general-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo de Pago</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr>
                  <td class="font-mono">${o.entrega}</td>
                  <td>${o.metodoPago || 'Efectivo'}</td>
                  <td>Registro de Orden #${o.serie} (${o.paquetes})</td>
                  <td class="font-mono font-bold text-emerald-700">${o.monto}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      ${currentTabOrden === 'historial' ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
          <div class="space-y-2">
            <h4 class="font-bold text-slate-800 uppercase">Historial de Etapas</h4>
            <table class="w-full text-center border border-slate-200 general-table">
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
                  <td>${o.usuarioEscaneo || 'Mauricio Sotomayor'}</td>
                  <td class="font-mono">${o.fechaConfirmada || o.entrega}</td>
                </tr>
                <tr>
                  <td class="font-bold text-blue-700">${o.estado}</td>
                  <td>${o.subEstado || o.estado}</td>
                  <td>${o.nombreLib || 'Laboratorio CAD/CAM'}</td>
                  <td class="font-mono">${o.libProd || o.entrega}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="space-y-2">
            <h4 class="font-bold text-slate-800 uppercase">Historial de Operaciones</h4>
            <table class="w-full text-center border border-slate-200 general-table">
              <thead>
                <tr>
                  <th>Operación</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr>
                  <td>Creación de Orden #${o.serie} (${o.producto})</td>
                  <td>${o.usuarioEscaneo || 'Recepción DentLab'}</td>
                  <td class="font-mono">${o.entrega}</td>
                </tr>
                <tr>
                  <td>Asignación de Colorímetro: ${o.color}</td>
                  <td>Laboratorio</td>
                  <td class="font-mono">${o.entrega}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      ${currentTabOrden === 'archivos' ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-slate-800 uppercase">Archivos de la Orden #${o.serie}</h4>
            <div class="space-y-2">
              <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p class="font-bold text-slate-800">Orden_${o.serie}_${o.paciente.replace(/\s+/g, '_')}.stl</p>
                  <p class="text-[11px] text-slate-500">Escaneo Digital CAD/CAM • ${o.producto}</p>
                </div>
                <button onclick="showToast('Descargando STL', 'Descarga iniciada: Orden_${o.serie}.stl')" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold">Descargar</button>
              </div>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-2">
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

function guardarCambiosDoctorActual(e) {
  e.preventDefault();
  if (!currentDoctorActivo) return;
  const cel = document.getElementById('docInputCelular')?.value;
  const mail = document.getElementById('docInputEmail')?.value;
  const clinica = document.getElementById('docInputClinica')?.value;
  if (cel !== undefined) currentDoctorActivo.celular = cel;
  if (mail !== undefined) currentDoctorActivo.mail = mail;
  if (clinica !== undefined) currentDoctorActivo.clinica = clinica;
  showToast('Doctor Actualizado', `Se guardaron los datos de ${currentDoctorActivo.nombre}.`);
}

function abrirDetalleDoctor(doctorQuery) {
  const doc = window.findDoctorByAny(doctorQuery);
  currentDoctorActivo = doc;
  currentTabDoctor = 'datos';
  renderVistaDetalleDoctor(doc);
}

function renderVistaDetalleDoctor(doc) {
  const ordenesDoc = (INICIO_DATA.ordenes || []).filter(
    o =>
      Number(o.doctorId) === Number(doc.id) ||
      (o.doctor && doc.doctorCorto && o.doctor.trim().toUpperCase() === doc.doctorCorto.trim().toUpperCase()) ||
      (o.doctorNombreCompleto && doc.nombre && o.doctorNombreCompleto.trim().toUpperCase() === doc.nombre.trim().toUpperCase())
  );

  const paquetesDoc = (DENT_STATE.paquetesDoctores || []).filter(
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
        <div class="space-y-3 pt-2">
          <h4 class="font-bold text-slate-800 uppercase">Órdenes de Trabajo de ${doc.nombre}</h4>
          <table class="w-full text-center border border-slate-200 general-table">
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
                  <td>${o.paciente}</td>
                  <td class="font-semibold">${o.producto}</td>
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
      ` : ''}

      ${currentTabDoctor === 'paquetes' ? `
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-slate-800 uppercase">Paquetes de ${doc.nombre}</h4>
            <button onclick="showToast('Paquete Asignado', 'Puede asignar un nuevo paquete desde el catálogo.')" class="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold">Agregar Paquete</button>
          </div>
          <table class="w-full text-center border border-slate-200 general-table">
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
                  <td class="font-semibold">${p.paquete}</td>
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
      ` : ''}

      ${currentTabDoctor === 'pagos' ? `
        <div class="space-y-3 pt-2">
          <h4 class="font-bold text-slate-800 uppercase">Historial de Pagos del Doctor</h4>
          <table class="w-full text-center border border-slate-200 general-table">
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
                  <td>${o.paciente}</td>
                  <td>${o.producto}</td>
                  <td class="font-mono">${o.entrega}</td>
                  <td class="font-mono font-bold text-emerald-700">${o.monto}</td>
                </tr>
              `).join('') : `
                <tr><td colspan="5" class="py-6 text-center text-slate-400 font-semibold">SIN PAGOS REGISTRADOS</td></tr>
              `}
            </tbody>
          </table>
        </div>
      ` : ''}
    </div>
  `;
  animateViewEntrance(container);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  renderTablasInicio();
  renderModalsInicio();
});
