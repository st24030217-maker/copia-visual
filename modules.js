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

  // 11. DOCTORES (ListadosDoctores.php, DoctoresTiposApp.php, PaquetesDoctores.php, etc.)
  doctores: [
    { id: 'DOC-101', nombre: 'Dr. Oscar Ramírez', celular: '81 1920 4412', mail: 'oscar.ramirez@clinicadent.mx', vendedor: 'Lic. Roberto Garza', nota: 'Cliente VIP Puntual', clinica: 'Clínica Dental Matriz', tipo: 'Especialista Prostodoncista', activo: true, externo: false, mesesSinPaquete: 0 },
    { id: 'DOC-102', nombre: 'Dra. Brenda Solís', celular: '81 2039 8811', mail: 'brenda.solis@ortoalinia.com', vendedor: 'Lic. Roberto Garza', nota: 'Solicita escaneo martes y jueves', clinica: 'OrtoAlinia San Pedro', tipo: 'Ortodoncista Certificada', activo: true, externo: true, mesesSinPaquete: 0 },
    { id: 'DOC-103', nombre: 'Dr. Arturo Morales', celular: '81 8344 9012', mail: 'arturo.morales@dentalcenter.mx', vendedor: 'Lic. Mariana Peña', nota: 'Preferencia tono Vita A3', clinica: 'Dental Center Valle', tipo: 'Odontólogo General', activo: true, externo: true, mesesSinPaquete: 4 },
    { id: 'DOC-104', nombre: 'Dra. Fátima Sánchez', celular: '81 1567 3390', mail: 'fatima.sanchez@sonrisas.mx', vendedor: 'Lic. Mariana Peña', nota: 'Especialista en estética E-Max', clinica: 'Estética Dental Cumbres', tipo: 'Rehabilitadora Oral', activo: true, externo: false, mesesSinPaquete: 0 },
    { id: 'DOC-105', nombre: 'Dr. Luis Cabrera', celular: '81 9011 2233', mail: 'luis.cabrera@cabreradental.mx', vendedor: 'Lic. Roberto Garza', nota: 'Pendiente renovar paquete de coronas', clinica: 'Consultorio Cabrera', tipo: 'Odontólogo General', activo: true, externo: true, mesesSinPaquete: 5 }
  ],
  doctoresTipos: [
    { id: 1, tipo: 'Especialista Prostodoncista', descuento: '15%', creditoDias: 30, estatus: true },
    { id: 2, tipo: 'Rehabilitadora Oral / Estética', descuento: '12%', creditoDias: 15, estatus: true },
    { id: 3, tipo: 'Ortodoncista Certificada', descuento: '10%', creditoDias: 15, estatus: true },
    { id: 4, tipo: 'Odontólogo General', descuento: '5%', creditoDias: 7, estatus: true }
  ],
  paquetesDoctores: [
    { folio: 'VTA-PAQ-88', doctor: 'Dr. Oscar Ramírez', paquete: 'Paquete 20 Coronas Zirconio Multicapa 3D', totalPiezas: 20, usadas: 12, disponibles: 8, saldo: '$0.00 (Liquidado)', fecha: '2026-08-15' },
    { folio: 'VTA-PAQ-84', doctor: 'Dra. Brenda Solís', paquete: 'Paquete 10 Coronas Zirconio Monolítico', totalPiezas: 10, usadas: 7, disponibles: 3, saldo: '$0.00 (Liquidado)', fecha: '2026-09-02' },
    { folio: 'VTA-PAQ-79', doctor: 'Dra. Fátima Sánchez', paquete: 'Paquete 10 Restauraciones E-Max Disilicato', totalPiezas: 10, usadas: 8, disponibles: 2, saldo: '$2,400.00 (Pendiente)', fecha: '2026-09-10' }
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

  // 14. VENDEDORES & USUARIOS
  vendedores: [
    { id: 'VEN-01', nombre: 'Lic. Roberto Garza', zona: 'Zona Valle / San Pedro', doctoresAsignados: 18, metaMensual: '$180,000', avance: '$164,500 (91%)', comision: '8%', estatus: true },
    { id: 'VEN-02', nombre: 'Lic. Mariana Peña', zona: 'Zona Cumbres / Poniente', doctoresAsignados: 14, metaMensual: '$150,000', avance: '$142,000 (95%)', comision: '8%', estatus: true },
    { id: 'VEN-03', nombre: 'Lic. Jorge Villarreal', zona: 'Zona Contry / Sur', doctoresAsignados: 11, metaMensual: '$120,000', avance: '$98,400 (82%)', comision: '7%', estatus: true }
  ],
  usuarios: [
    { id: 1, usuario: 'user', nombre: 'Sebastián Salinas (Admin General)', correo: 'admin@dentlab.mx', perfil: 'Administrador', appEquipos: true, estatus: true },
    { id: 2, usuario: 'd.rios', nombre: 'Lic. Daniel Ríos', correo: 'daniel.rios@dentlab.mx', perfil: 'Escaneador', appEquipos: true, estatus: true },
    { id: 3, usuario: 'i.soto', nombre: 'Tec. Iván Soto', correo: 'ivan.soto@dentlab.mx', perfil: 'Diseñador CAD/CAM', appEquipos: false, estatus: true },
    { id: 4, usuario: 'c.ruiz', nombre: 'Tec. Carla Ruiz', correo: 'carla.ruiz@dentlab.mx', perfil: 'Operador Fresado CNC', appEquipos: false, estatus: true },
    { id: 5, usuario: 'recepcion', nombre: 'Lic. Valeria Gómez', correo: 'recepcion@dentclinic.mx', perfil: 'Recepción / Ventas', appEquipos: true, estatus: true }
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

function openModule(moduleKey) {
  DENT_STATE.currentView = moduleKey;

  // Actualizar estado activo en el sidebar estilo DENT DEMO
  document.querySelectorAll('.nav-leaf-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-module') === moduleKey;
    btn.classList.toggle('bg-white/10', isActive);
    btn.classList.toggle('text-white', isActive);
    btn.classList.toggle('font-semibold', isActive);
    btn.classList.toggle('border-r-4', isActive);
    btn.classList.toggle('border-[#1ABB9C]', isActive);
    btn.classList.toggle('text-slate-300', !isActive);
  });

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
    runAnimeCounters();
    lucide.createIcons();
    return;
  }

  secInicio.classList.add('hidden');
  secDynamic.classList.remove('hidden');

  renderDynamicModule(moduleKey);
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
// DATOS Y RENDERIZADO DE LAS 5 TABLAS DE INICIO (IDÉNTICO A DENT DEMO/index.php)
// 1. TableEscaneo.php
// 2. TableDiseno.php
// 3. TableFabricacion.php
// 4. TableEntrega.php
// 5. TableOrdenes.php
// ============================================================================

const INICIO_DATA = {
  escaneo: [
    { ot: 1048, prod: 'Zirconio', uni: 2, doctor: 'Dr. Oscar Ramírez', soli: '2026-10-09', est: 'Escaneo', reg: '2026-10-07 09:15', interno: true, serie: 'OT-9841' },
    { ot: 1047, prod: 'E-Max', uni: 1, doctor: 'Dra. Elena Torres', soli: '2026-10-09', est: 'Escaneo', reg: '2026-10-07 10:20', interno: false, serie: 'OT-9845' },
    { ot: 1046, prod: 'Alinia', uni: 1, doctor: 'Dr. Mauricio Cárdenas', soli: '2026-10-10', est: 'Escaneo', reg: '2026-10-07 11:05', interno: false, serie: 'OT-9849' },
    { ot: 1045, prod: 'Guarda', uni: 1, doctor: 'Dra. Sofía Méndez', soli: '2026-10-08', est: 'Escaneo', reg: '2026-10-07 12:30', interno: true, serie: 'OT-9850' },
    { ot: 1044, prod: 'PMMA', uni: 3, doctor: 'Dr. Roberto Garza', soli: '2026-10-11', est: 'Escaneo', reg: '2026-10-07 13:10', interno: false, serie: 'OT-9851' }
  ],
  diseno: [
    { ot: 1043, prod: 'Zirconio', uni: 1, doctor: 'Dr. Oscar Ramírez', soli: '2026-10-08', est: 'Diseño', reg: '2026-10-06 14:20', interno: true, serie: 'OT-9841' },
    { ot: 1042, prod: 'E-Max', uni: 4, doctor: 'Dra. Elena Torres', soli: '2026-10-09', est: 'Diseño', reg: '2026-10-06 15:40', interno: false, serie: 'OT-9842' },
    { ot: 1041, prod: 'Zirconio', uni: 3, doctor: 'Dr. Alejandro Silva', soli: '2026-10-08', est: 'Diseño', reg: '2026-10-06 16:10', interno: true, serie: 'OT-9846' },
    { ot: 1040, prod: 'Híbrido', uni: 1, doctor: 'Dr. Mauricio Cárdenas', soli: '2026-10-09', est: 'Diseño', reg: '2026-10-06 17:00', interno: false, serie: 'OT-9852' },
    { ot: 1039, prod: 'Metal', uni: 2, doctor: 'Dr. Roberto Garza', soli: '2026-10-10', est: 'Diseño', reg: '2026-10-06 18:15', interno: false, serie: 'OT-9853' }
  ],
  fabricacion: [
    { ot: 1038, prod: 'Zirconio', uni: 3, doctor: 'Dr. Mauricio Cárdenas', soli: '2026-10-07', est: 'Fresado', reg: '2026-10-05 09:30', interno: false, serie: 'OT-9843' },
    { ot: 1037, prod: 'Guarda', uni: 1, doctor: 'Dra. Sofía Méndez', soli: '2026-10-07', est: 'Impresión 3D', reg: '2026-10-05 11:20', interno: true, serie: 'OT-9844' },
    { ot: 1036, prod: 'Zirconio', uni: 2, doctor: 'Dr. Oscar Ramírez', soli: '2026-10-08', est: 'Sinterizado', reg: '2026-10-05 12:45', interno: true, serie: 'OT-9854' },
    { ot: 1035, prod: 'E-Max', uni: 1, doctor: 'Dra. Elena Torres', soli: '2026-10-08', est: 'Glaseado', reg: '2026-10-05 16:00', interno: false, serie: 'OT-9855' }
  ],
  entrega: [
    { ot: 1034, prod: 'PMMA', uni: 6, doctor: 'Dr. Roberto Garza', soli: '2026-10-07', est: 'Terminado', reg: '2026-10-04 10:00', interno: false, serie: 'OT-9847' },
    { ot: 1033, prod: 'Zirconio', uni: 1, doctor: 'Dr. Oscar Ramírez', soli: '2026-10-07', est: 'Listo Entrega', reg: '2026-10-04 11:30', interno: true, serie: 'OT-9848' },
    { ot: 1032, prod: 'Alinia', uni: 2, doctor: 'Dra. Sofía Méndez', soli: '2026-10-07', est: 'En Ruta', reg: '2026-10-04 14:15', interno: true, serie: 'OT-9856' },
    { ot: 1031, prod: 'E-Max', uni: 2, doctor: 'Dra. Elena Torres', soli: '2026-10-07', est: 'Listo Entrega', reg: '2026-10-04 16:50', interno: false, serie: 'OT-9857' }
  ],
  ordenes: [
    { ot: 1048, folio: 'ORD-26-1048', entrega: '2026-10-09', estado: 'Diseño', producto: 'Corona Monolítica Zirconio', doctor: 'Dr. Oscar Ramírez', paciente: 'María Fernanda Soto', unidades: 1, libProd: '2026-10-07 09:15', monto: '$1,850.00', serie: 'OT-9841', color: 'Vita A2', piezas: ['14'] },
    { ot: 1047, folio: 'ORD-26-1047', entrega: '2026-10-09', estado: 'Diseño', producto: 'Carillas Disilicato E-Max', doctor: 'Dra. Elena Torres', paciente: 'Carlos Alberto Ruiz', unidades: 4, libProd: '2026-10-07 10:20', monto: '$9,600.00', serie: 'OT-9842', color: 'Bleach BL2', piezas: ['11','12','21','22'] },
    { ot: 1046, folio: 'ORD-26-1046', entrega: '2026-10-07', estado: 'Fabricación', producto: 'Puente 3 Unidades Zirconio', doctor: 'Dr. Mauricio Cárdenas', paciente: 'Roberto Hernández Gil', unidades: 3, libProd: '2026-10-06 11:05', monto: '$5,550.00', serie: 'OT-9843', color: 'Vita A3', piezas: ['35','36','37'] },
    { ot: 1045, folio: 'ORD-26-1045', entrega: '2026-10-08', estado: 'Fabricación', producto: 'Guarda Oclusal Termoformada', doctor: 'Dra. Sofía Méndez', paciente: 'Ana Paulina Vega', unidades: 1, libProd: '2026-10-06 12:30', monto: '$1,250.00', serie: 'OT-9844', color: 'Transparente', piezas: ['11','21'] },
    { ot: 1044, folio: 'ORD-26-1044', entrega: '2026-10-09', estado: 'Escaneo', producto: 'Incrustación Inlay/Onlay E-Max', doctor: 'Dra. Elena Torres', paciente: 'Jorge Luis Pineda', unidades: 1, libProd: '2026-10-07 13:10', monto: '$2,100.00', serie: 'OT-9845', color: 'Vita B1', piezas: ['46'] },
    { ot: 1043, folio: 'ORD-26-1043', entrega: '2026-10-08', estado: 'Diseño', producto: 'Corona sobre Implante Ti-Base', doctor: 'Dr. Alejandro Silva', paciente: 'Lucía Morales Castro', unidades: 3, libProd: '2026-10-06 16:10', monto: '$7,200.00', serie: 'OT-9846', color: 'Vita A2', piezas: ['16','26','36'] },
    { ot: 1042, folio: 'ORD-26-1042', entrega: '2026-10-07', estado: 'Terminado', producto: 'Provisional PMMA Larga Duración', doctor: 'Dr. Roberto Garza', paciente: 'Fernando Domínguez', unidades: 6, libProd: '2026-10-04 10:00', monto: '$3,900.00', serie: 'OT-9847', color: 'Vita A1', piezas: ['13','12','11','21','22','23'] },
    { ot: 1041, folio: 'ORD-26-1041', entrega: '2026-10-07', estado: 'Terminado', producto: 'Corona Zirconio Multicapa', doctor: 'Dr. Oscar Ramírez', paciente: 'Patricia Guzmán Ríos', unidades: 1, libProd: '2026-10-04 11:30', monto: '$1,850.00', serie: 'OT-9848', color: 'Vita A1', piezas: ['21'] },
    { ot: 1040, folio: 'ORD-26-1040', entrega: '2026-10-10', estado: 'Escaneo', producto: 'Alineador Invisible Alinia', doctor: 'Dr. Mauricio Cárdenas', paciente: 'Gabriela Espinoza', unidades: 1, libProd: '2026-10-07 11:05', monto: '$4,200.00', serie: 'OT-9849', color: 'Clear', piezas: ['11','21'] },
    { ot: 1039, folio: 'ORD-26-1039', entrega: '2026-10-10', estado: 'Diseño', producto: 'Metal Porcelana Estratificada', doctor: 'Dr. Roberto Garza', paciente: 'Héctor Valdés', unidades: 2, libProd: '2026-10-06 18:15', monto: '$2,900.00', serie: 'OT-9853', color: 'Vita A3.5', piezas: ['44','45'] }
  ]
};

let paginaActualOrdenes = 1;

function renderStageRow(item, isEntrega = false) {
  const rowClass = item.interno ? (isEntrega ? 'row-green' : 'row-yellow') : 'hover:bg-slate-50';
  return `
    <tr class="${rowClass} transition-colors">
      <td class="text-center font-bold">
        <a href="javascript:void(0)" onclick="abrirOrdenTrabajo('${item.serie}')" class="text-blue-600 hover:underline font-mono">${item.ot}</a>
      </td>
      <td class="text-center font-semibold text-slate-800">${item.prod}</td>
      <td class="text-center font-mono">${item.uni}</td>
      <td class="text-center">
        <a href="javascript:void(0)" onclick="abrirDetalleDoctor('${item.doctor}')" class="text-blue-600 hover:underline">${item.doctor}</a>
      </td>
      <td class="text-center font-mono text-slate-600">${item.soli}</td>
      <td class="text-center"><span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">${item.est}</span></td>
      <td class="text-center font-mono text-[10px] text-slate-500">${item.reg}</td>
    </tr>
  `;
}

function renderTablasInicio() {
  const tbEsc = document.getElementById('tbodyStageEscaneo');
  const tbDis = document.getElementById('tbodyStageDiseno');
  const tbFab = document.getElementById('tbodyStageFabricacion');
  const tbEnt = document.getElementById('tbodyStageEntrega');
  const tbOrd = document.getElementById('tbodyGeneralOrdenes');

  if (tbEsc) tbEsc.innerHTML = INICIO_DATA.escaneo.map(i => renderStageRow(i, false)).join('');
  if (tbDis) tbDis.innerHTML = INICIO_DATA.diseno.map(i => renderStageRow(i, false)).join('');
  if (tbFab) tbFab.innerHTML = INICIO_DATA.fabricacion.map(i => renderStageRow(i, false)).join('');
  if (tbEnt) tbEnt.innerHTML = INICIO_DATA.entrega.map(i => renderStageRow(i, true)).join('');

  const bEsc = document.getElementById('badgeCountEscaneo');
  const bDis = document.getElementById('badgeCountDiseno');
  const bFab = document.getElementById('badgeCountFabricacion');
  const bEnt = document.getElementById('badgeCountEntrega');
  if (bEsc) bEsc.innerText = INICIO_DATA.escaneo.length;
  if (bDis) bDis.innerText = INICIO_DATA.diseno.length;
  if (bFab) bFab.innerText = INICIO_DATA.fabricacion.length;
  if (bEnt) bEnt.innerText = INICIO_DATA.entrega.length;

  if (tbOrd) {
    const start = (paginaActualOrdenes - 1) * 8;
    const slice = INICIO_DATA.ordenes.slice(start, start + 8);
    tbOrd.innerHTML = slice.map(o => `
      <tr class="hover:bg-slate-50 transition-colors">
        <td>
          <button type="button" onclick="Etiqueta('${o.doctor}', '${o.paciente}', '${o.entrega}', '${o.serie}')" class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs shadow-sm transition-colors" title="Imprimir Etiqueta">
            <i data-lucide="barcode" class="w-3.5 h-3.5 mx-auto"></i>
          </button>
        </td>
        <td>
          <button type="button" onclick="abrirOrdenTrabajo('${o.serie}')" class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold shadow-sm inline-flex items-center gap-1 transition-colors" title="Abrir Orden de Trabajo">
            <img src="assets/muela.png" class="w-3.5 h-3.5 object-contain" alt="">
            <span>${o.ot}</span>
          </button>
        </td>
        <td>
          <button type="button" onclick="abrirDetalleDoctor('${o.doctor}')" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600 text-white text-xs shadow-sm transition-colors" title="Ficha del Doctor">
            <i data-lucide="stethoscope" class="w-3.5 h-3.5 mx-auto"></i>
          </button>
        </td>
        <td class="font-mono font-bold text-slate-700">${o.folio}</td>
        <td class="font-mono">${o.entrega}</td>
        <td>
          <span class="px-2 py-0.5 rounded-full font-bold text-[10px] ${
            o.estado === 'Terminado' ? 'bg-emerald-100 text-emerald-800' :
            o.estado === 'Fabricación' ? 'bg-amber-100 text-amber-800' :
            o.estado === 'Diseño' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
          }">${o.estado}</span>
        </td>
        <td class="font-semibold text-slate-800">${o.producto}</td>
        <td>${o.doctor}</td>
        <td>${o.paciente}</td>
        <td class="font-mono font-bold">${o.unidades}</td>
        <td class="font-mono text-[11px] text-slate-500">${o.libProd}</td>
        <td class="font-mono font-bold text-slate-900">${o.monto}</td>
      </tr>
    `).join('');
    lucide.createIcons();
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
}

function renderModalsInicio() {
  const tbCanc = document.getElementById('tbodyModalCanceladas');
  if (tbCanc) {
    tbCanc.innerHTML = [
      { ot: 1019, folio: 'ORD-26-1019', fecha: '2026-10-03', prod: 'Corona Monolítica Zirconio', doc: 'Dr. Roberto Garza', pac: 'Luis Fernando Ochoa', uni: 1, lib: '2026-10-02', monto: '$1,850.00', motivo: 'Línea marginal poco visible en escaneo' },
      { ot: 1011, folio: 'ORD-26-1011', fecha: '2026-10-01', prod: 'Carilla E-Max', doc: 'Dra. Elena Torres', pac: 'Mónica Villarreal', uni: 2, lib: '2026-09-30', monto: '$4,800.00', motivo: 'Cambio de plan de tratamiento por el Doctor' }
    ].map(c => `
      <tr class="hover:bg-slate-50">
        <td><button onclick="document.getElementById('modalCanceladas').classList.add('hidden'); abrirOrdenTrabajo('OT-9841')" class="px-2 py-0.5 rounded bg-blue-600 text-white font-mono font-bold">${c.ot}</button></td>
        <td><button onclick="document.getElementById('modalCanceladas').classList.add('hidden'); abrirDetalleDoctor('${c.doc}')" class="px-2 py-0.5 rounded bg-slate-800 text-white">DOC</button></td>
        <td class="font-mono font-bold">${c.folio}</td>
        <td class="font-mono">${c.fecha}</td>
        <td><span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">Cancelada</span></td>
        <td>${c.prod}</td>
        <td>${c.doc}</td>
        <td>${c.pac}</td>
        <td class="font-mono">${c.uni}</td>
        <td class="font-mono text-slate-500">${c.lib}</td>
        <td class="font-mono font-bold">${c.monto}</td>
        <td class="text-rose-700 font-semibold">${c.motivo}</td>
      </tr>
    `).join('');
  }

  const tbPend = document.getElementById('tbodyModalPendientesPago');
  if (tbPend) {
    tbPend.innerHTML = [
      { ot: 1047, folio: 'ORD-26-1047', entrega: '2026-10-09', est: 'Diseño', prod: 'Carillas Disilicato E-Max', doc: 'Dra. Elena Torres', pac: 'Carlos Alberto Ruiz', uni: 4, lib: '2026-10-07', monto: '$9,600.00', pagado: '$4,800.00', saldo: '$4,800.00' },
      { ot: 1046, folio: 'ORD-26-1046', entrega: '2026-10-07', est: 'Fabricación', prod: 'Puente 3 Unidades Zirconio', doc: 'Dr. Mauricio Cárdenas', pac: 'Roberto Hernández Gil', uni: 3, lib: '2026-10-06', monto: '$5,550.00', pagado: '$2,000.00', saldo: '$3,550.00' },
      { ot: 1042, folio: 'ORD-26-1042', entrega: '2026-10-07', est: 'Terminado', prod: 'Provisional PMMA Larga Duración', doc: 'Dr. Roberto Garza', pac: 'Fernando Domínguez', uni: 6, lib: '2026-10-04', monto: '$3,900.00', pagado: '$0.00', saldo: '$3,900.00' }
    ].map(p => `
      <tr class="hover:bg-slate-50">
        <td><button onclick="document.getElementById('modalPendientes').classList.add('hidden'); abrirOrdenTrabajo('OT-9842')" class="px-2 py-0.5 rounded bg-blue-600 text-white font-mono font-bold">${p.ot}</button></td>
        <td><button onclick="document.getElementById('modalPendientes').classList.add('hidden'); abrirDetalleDoctor('${p.doc}')" class="px-2 py-0.5 rounded bg-slate-800 text-white">DOC</button></td>
        <td class="font-mono font-bold">${p.folio}</td>
        <td class="font-mono">${p.entrega}</td>
        <td><span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">${p.est}</span></td>
        <td>${p.prod}</td>
        <td>${p.doc}</td>
        <td>${p.pac}</td>
        <td class="font-mono">${p.uni}</td>
        <td class="font-mono text-slate-500">${p.lib}</td>
        <td class="font-mono font-bold">${p.monto}</td>
        <td class="font-mono text-emerald-700 font-bold">${p.pagado}</td>
        <td class="font-mono text-rose-700 font-extrabold">${p.saldo}</td>
      </tr>
    `).join('');
  }
}

function Etiqueta(doctor, paciente, fechaEntrega, codigo) {
  const orden = (INICIO_DATA.ordenes || []).find(o => o.serie === codigo || String(o.ot) === String(codigo)) || INICIO_DATA.ordenes[0];
  const docObj = (DENT_STATE.doctores || []).find(d => d.nombre === (orden ? orden.doctor : doctor)) || DENT_STATE.doctores[0];

  const serieOT = orden ? String(orden.ot) : String(codigo);
  const fEnt = orden ? orden.entrega : fechaEntrega;
  const docNombre = orden ? orden.doctor : doctor;
  const direccion = docObj ? `${docObj.clinica}, Monterrey, N.L.` : 'Av. Lázaro Cárdenas 2400, San Pedro Garza García';
  const pacNombre = orden ? orden.paciente : paciente;
  const celular = docObj ? docObj.celular : '81 1920 4412';
  const producto = orden ? orden.producto : 'Corona Monolítica Zirconio';
  const piezas = orden ? `${orden.unidades} (${(orden.piezas || []).join(', ')})` : '1';
  const colorimetro = orden ? orden.color : 'Vita A2';
  const observaciones = 'Sellado marginal verificado en escaneo CAD/CAM';

  // 1. Mostrar overlay idéntico a $.blockUI de DENT DEMO ("GENERANDO ETIQUETA, POR FAVOR ESPERE...")
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

  // 2. Generar SVG del código de barras igual a Codbar(serie) en TableOrdenes.php
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

  // 3. Crear iframe oculto con el mismo HTML y estilos exactos de DENT DEMO/TableOrdenes.php
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
  const found = INICIO_DATA.ordenes.find(o => o.serie === serie) || INICIO_DATA.ordenes[0];
  currentOrdenActiva = found;
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
  const etapas = ['Escaneo', 'Diseño', 'Fabricación', 'Terminado'];
  const idx = etapas.indexOf(currentOrdenActiva.estado);
  const next = etapas[Math.min(idx + 1, etapas.length - 1)];
  currentOrdenActiva.estado = next;
  showToast('Etapa Liberada', `La Orden #${currentOrdenActiva.ot} avanzó a la etapa: ${next}`);
  renderVistaOrdenTrabajo();
}

function registrarAbonoOrdenActual(e) {
  e.preventDefault();
  const monto = document.getElementById('inputMontoAbonoOT')?.value || '500';
  const metodo = document.getElementById('selectMetodoAbonoOT')?.value || 'Efectivo';
  showToast('Pago Registrado', `Se aplicó un abono de $${Number(monto).toLocaleString('es-MX')} MXN (${metodo}) a la Orden #${currentOrdenActiva.ot}.`);
  renderVistaOrdenTrabajo();
}

function renderVistaOrdenTrabajo() {
  const o = currentOrdenActiva || INICIO_DATA.ordenes[0];
  const container = document.getElementById('section-dynamic');
  if (!container) return;

  const dientesSup = [18,17,16,15,14,13,12,11, 21,22,23,24,25,26,27,28];
  const dientesInf = [48,47,46,45,44,43,42,41, 31,32,33,34,35,36,37,38];

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
      <div class="mb-4 flex items-center justify-between">
        <button onclick="openModule('inicio')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Regresar a Inicio</span>
        </button>
        <span class="font-mono text-xs font-bold text-slate-500">Folio: ${o.folio} • Serie: ${o.serie}</span>
      </div>

      <!-- 4 Pestañas Exactas de OrdenTrabajo.php -->
      <div class="border-b border-slate-200 flex flex-wrap gap-1.5 mb-5 text-xs font-bold">
        <button onclick="cambiarTabOrdenTrabajo('home')" class="px-4 py-2.5 rounded-t-xl border-t border-l border-r transition-all ${currentTabOrden === 'home' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'}">
          Orden de trabajo #${o.ot}
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
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Doctor</span><strong class="text-slate-900 text-sm">${o.doctor}</strong></div>
              <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Clínica / Consultorio</span><strong class="text-slate-800">Clínica Dental San Pedro • Consultorio 402</strong></div>
              <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Paciente</span><strong class="text-slate-900">${o.paciente}</strong></div>
              <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Folio / Serie</span><strong class="font-mono text-blue-600">${o.folio} (${o.serie})</strong></div>
              <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Producto</span><strong class="text-slate-900">${o.producto}</strong></div>
              <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Colorímetro Guía VITA</span><strong class="text-slate-900">${o.color}</strong></div>
              <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Unidades</span><strong class="font-mono">${o.unidades} pieza(s) — [${o.piezas.join(', ')}]</strong></div>
              <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Entrega Solicitada</span><strong class="font-mono text-emerald-700">${o.entrega}</strong></div>
              <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Estado Actual</span><span class="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">${o.estado}</span></div>
              <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Costo Total Orden</span><strong class="font-mono text-sm text-slate-900">${o.monto}</strong></div>
            </div>

            <div class="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
              <h4 class="font-bold text-slate-800 uppercase border-b border-slate-100 pb-2">Control de Etapa y Liberación</h4>
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <span class="text-slate-500 font-semibold">Etapa actual:</span>
                  <span class="px-3 py-1 rounded-lg bg-slate-900 text-white font-bold">${o.estado}</span>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="avanzarEtapaOrdenActual()" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-colors">
                    Liberar Siguiente Etapa
                  </button>
                  <button onclick="Etiqueta('${o.doctor}', '${o.paciente}', '${o.entrega}', '${o.serie}')" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold shadow-sm transition-colors">
                    Imprimir Etiqueta
                  </button>
                </div>
              </div>
              <div>
                <label class="font-bold text-slate-600 block mb-1">Observaciones Clínicas / Diseño CAD:</label>
                <textarea rows="2" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">Sellado marginal revisado en 3Shape. Contacto oclusal ligero en céntrica, anatomía natural solicitada por el doctor.</textarea>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3">
                <h4 class="font-bold text-slate-800 uppercase">Odontograma de la Orden</h4>
                <div class="flex items-center gap-3 text-[11px] font-bold">
                  <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-blue-600 inline-block"></span> PILAR</span>
                  <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-emerald-600 inline-block"></span> PÓNTICO</span>
                </div>
              </div>

              <p class="text-[10px] text-center font-bold text-slate-400 uppercase mb-1.5">Arcada Superior (FDI)</p>
              <div class="grid grid-cols-8 gap-1.5 mb-4">
                ${dientesSup.map(d => {
                  const sel = o.piezas.includes(String(d));
                  return `
                    <button type="button" onclick="this.classList.toggle('bg-blue-600'); this.classList.toggle('text-white'); showToast('Pieza #${d}', 'Selección actualizada en el odontograma.')" class="py-2 rounded-xl border border-slate-200 font-mono font-bold text-[11px] flex flex-col items-center gap-0.5 transition-all ${sel ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-700 hover:bg-blue-50'}">
                      <img src="assets/muela.png" class="w-3.5 h-3.5 object-contain" alt="">
                      <span>${d}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <p class="text-[10px] text-center font-bold text-slate-400 uppercase mb-1.5">Arcada Inferior (FDI)</p>
              <div class="grid grid-cols-8 gap-1.5">
                ${dientesInf.map(d => {
                  const sel = o.piezas.includes(String(d));
                  return `
                    <button type="button" onclick="this.classList.toggle('bg-emerald-600'); this.classList.toggle('text-white'); showToast('Pieza #${d}', 'Selección actualizada en el odontograma.')" class="py-2 rounded-xl border border-slate-200 font-mono font-bold text-[11px] flex flex-col items-center gap-0.5 transition-all ${sel ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white text-slate-700 hover:bg-emerald-50'}">
                      <img src="assets/muela.png" class="w-3.5 h-3.5 object-contain" alt="">
                      <span>${d}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Haz clic en cualquier pieza dental para conmutar Pilar / Póntico</span>
              <span class="font-mono font-bold text-slate-900">Unidades: ${o.unidades}</span>
            </div>
          </div>
        </div>
      ` : ''}

      ${currentTabOrden === 'pago' ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-slate-800 uppercase border-b pb-2">Registrar Abono / Pago de Orden #${o.ot}</h4>
            <form onsubmit="registrarAbonoOrdenActual(event)" class="space-y-3">
              <div>
                <label class="font-bold text-slate-600 block mb-1">Método de Pago:</label>
                <select id="selectMetodoAbonoOT" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold">
                  <option>Efectivo</option>
                  <option>Transferencia SPEI</option>
                  <option>Tarjeta Crédito / Débito (Conekta)</option>
                  <option>Descuento de Paquete Prepagado Zirconio</option>
                </select>
              </div>
              <div>
                <label class="font-bold text-slate-600 block mb-1">Monto a Abonar (MXN):</label>
                <input id="inputMontoAbonoOT" type="number" required value="950" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-mono font-bold">
              </div>
              <button type="submit" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm">
                Registrar Pago
              </button>
            </form>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-slate-800 uppercase border-b pb-2">Historial de Pagos de la Orden</h4>
            <table class="w-full text-center border border-slate-200 general-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Método</th>
                  <th>Usuario</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr>
                  <td class="font-mono">${o.libProd}</td>
                  <td>Anticipo Recepción</td>
                  <td>admin</td>
                  <td class="font-mono font-bold text-emerald-700">$900.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      ${currentTabOrden === 'historial' ? `
        <div class="space-y-3 text-xs">
          <h4 class="font-bold text-slate-800 uppercase">Bitácora de Operaciones y Trazabilidad CAD/CAM</h4>
          <table class="w-full text-center border border-slate-200 general-table">
            <thead>
              <tr>
                <th>Fecha / Hora</th>
                <th>Etapa</th>
                <th>Operación Realizada</th>
                <th>Operador Responsable</th>
                <th>Equipo / Disco</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr>
                <td class="font-mono">${o.libProd}</td>
                <td><span class="px-2 py-0.5 rounded bg-slate-100 font-bold">Recepción</span></td>
                <td>Alta de orden y generación de código de barras ${o.serie}</td>
                <td>Recepción Laboratorio</td>
                <td>Portal Dent Lab</td>
              </tr>
              <tr>
                <td class="font-mono">2026-10-07 11:40</td>
                <td><span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">Escaneo</span></td>
                <td>Recepción de archivo STL intraoral y verificación de oclusión</td>
                <td>Lic. Daniel Ríos</td>
                <td>3Shape TRIOS 4</td>
              </tr>
              <tr>
                <td class="font-mono">2026-10-07 14:20</td>
                <td><span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">${o.estado}</span></td>
                <td>Modelado anatómico CAD y asignación de lote de disco</td>
                <td>T.P.D. Marco Antonio Ruiz</td>
                <td>Disco Aidite ${o.color}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : ''}

      ${currentTabOrden === 'archivos' ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-slate-800 uppercase">Archivos Digitales STL / DICOM / Fotos Clínicas</h4>
            <div class="space-y-2">
              <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p class="font-bold text-slate-800">${o.serie}_Arcada_Superior.stl</p>
                  <p class="text-[11px] text-slate-500">Malla Escaneo Intraoral • 14.2 MB</p>
                </div>
                <button onclick="showToast('Descargando STL', 'Descarga iniciada: ${o.serie}_Arcada_Superior.stl')" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold">Descargar</button>
              </div>
              <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p class="font-bold text-slate-800">${o.serie}_ConstructionInfo.constructionInfo</p>
                  <p class="text-[11px] text-slate-500">Parámetros CAM Exocad • Autorizado</p>
                </div>
                <button onclick="showToast('Descargando XML', 'Descarga iniciada: ${o.serie}_ConstructionInfo')" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold">Descargar</button>
              </div>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-2">
            <p class="font-bold text-slate-700">Subir Nuevo Archivo STL, Foto de Colorímetro o Radiografía</p>
            <button onclick="showToast('Archivo Adjuntado', 'El archivo se anexó correctamente al expediente de la orden.')" class="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-sm">
              Seleccionar Archivo...
            </button>
          </div>
        </div>
      ` : ''}
    </div>
  `;
  lucide.createIcons();
}

// ============================================================================
// FICHA DEL DOCTOR (IDÉNTICO A DENT DEMO/Doctor.php)
// ============================================================================

function abrirDetalleDoctor(doctorNombre) {
  const doc = DENT_STATE.doctores.find(d => d.nombre === doctorNombre) || DENT_STATE.doctores[0];
  const ordenesDoc = INICIO_DATA.ordenes.filter(o => o.doctor === doc.nombre);

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
          <span>Regresar a Inicio</span>
        </button>
        <span class="font-mono font-bold text-slate-500">Expediente de Doctor • ${doc.id}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Doctor</span><strong class="text-sm text-slate-900">${doc.nombre}</strong></div>
        <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Clínica</span><strong class="text-slate-800">${doc.clinica}</strong></div>
        <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Celular / Correo</span><strong class="font-mono">${doc.celular} • ${doc.mail}</strong></div>
        <div><span class="text-slate-400 font-bold uppercase text-[10px] block">Ejecutivo Asignado</span><strong class="text-blue-600">${doc.vendedor} (${doc.tipo})</strong></div>
      </div>

      <h4 class="font-bold text-slate-800 uppercase">Historial de Órdenes de Trabajo del Doctor</h4>
      <table class="w-full text-center border border-slate-200 general-table">
        <thead>
          <tr>
            <th>OT</th>
            <th>FOLIO</th>
            <th>PACIENTE</th>
            <th>PRODUCTO</th>
            <th>ESTADO</th>
            <th>ENTREGA</th>
            <th>MONTO</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${(ordenesDoc.length > 0 ? ordenesDoc : INICIO_DATA.ordenes.slice(0, 3)).map(o => `
            <tr class="hover:bg-slate-50">
              <td><button onclick="abrirOrdenTrabajo('${o.serie}')" class="px-2.5 py-0.5 rounded bg-blue-600 text-white font-mono font-bold">${o.ot}</button></td>
              <td class="font-mono font-bold">${o.folio}</td>
              <td>${o.paciente}</td>
              <td class="font-semibold">${o.producto}</td>
              <td>${o.estado}</td>
              <td class="font-mono">${o.entrega}</td>
              <td class="font-mono font-bold">${o.monto}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  renderTablasInicio();
  renderModalsInicio();
});

