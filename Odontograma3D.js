/**
 * Odontograma3D.js
 * Motor de Modelado 3D Anatómico Interactivo por Pieza Dental (FDI 11–48)
 * Renderizado WebGL GLSL Raymarching en tiempo real + Vistas Anatómicas de Referencia
 */
(function () {
  'use strict';

  const VITA_RGB = {
    'A1':  [0.98, 0.96, 0.91],
    'A2':  [0.96, 0.92, 0.84],
    'A3':  [0.94, 0.88, 0.77],
    'A3.5':[0.91, 0.84, 0.71],
    'A4':  [0.88, 0.79, 0.65],
    'B1':  [0.98, 0.97, 0.93],
    'B2':  [0.96, 0.94, 0.85],
    'B3':  [0.93, 0.88, 0.75],
    'C1':  [0.93, 0.91, 0.86],
    'C2':  [0.90, 0.86, 0.78],
    'D2':  [0.93, 0.89, 0.84],
    'BL1': [0.99, 0.99, 0.98],
    'BL2': [0.98, 0.98, 0.96]
  };

  const TOOTH_METADATA = {
    18: { name: 'Tercer Molar Superior Derecho',      type: 'Molar Superior (3 Raíces)',      cusps: 4, roots: 3, arch: 'Superior', ref: 16 },
    17: { name: 'Segundo Molar Superior Derecho',     type: 'Molar Superior (3 Raíces)',      cusps: 4, roots: 3, arch: 'Superior', ref: 16 },
    16: { name: 'Primer Molar Superior Derecho',      type: 'Molar Superior (Trifurcado)',    cusps: 4, roots: 3, arch: 'Superior', ref: 16 },
    15: { name: 'Segundo Premolar Superior Derecho',  type: 'Bicúspide Superior (1 Raíz)',    cusps: 2, roots: 1, arch: 'Superior', ref: 13 },
    14: { name: 'Primer Premolar Superior Derecho',   type: 'Bicúspide Superior (Bifurcado)', cusps: 2, roots: 2, arch: 'Superior', ref: 13 },
    13: { name: 'Canino Superior Derecho',            type: 'Cúspide Canina Unirradicular',   cusps: 1, roots: 1, arch: 'Superior', ref: 13 },
    12: { name: 'Incisivo Lateral Superior Derecho',  type: 'Incisivo Pala Unirradicular',    cusps: 1, roots: 1, arch: 'Superior', ref: 11 },
    11: { name: 'Incisivo Central Superior Derecho',  type: 'Incisivo Central Unirradicular', cusps: 1, roots: 1, arch: 'Superior', ref: 11 },

    21: { name: 'Incisivo Central Superior Izquierdo',type: 'Incisivo Central Unirradicular', cusps: 1, roots: 1, arch: 'Superior', ref: 11 },
    22: { name: 'Incisivo Lateral Superior Izquierdo',type: 'Incisivo Pala Unirradicular',    cusps: 1, roots: 1, arch: 'Superior', ref: 11 },
    23: { name: 'Canino Superior Izquierdo',          type: 'Cúspide Canina Unirradicular',   cusps: 1, roots: 1, arch: 'Superior', ref: 13 },
    24: { name: 'Primer Premolar Superior Izquierdo', type: 'Bicúspide Superior (Bifurcado)', cusps: 2, roots: 2, arch: 'Superior', ref: 13 },
    25: { name: 'Segundo Premolar Superior Izquierdo',type: 'Bicúspide Superior (1 Raíz)',    cusps: 2, roots: 1, arch: 'Superior', ref: 13 },
    26: { name: 'Primer Molar Superior Izquierdo',    type: 'Molar Superior (Trifurcado)',    cusps: 4, roots: 3, arch: 'Superior', ref: 16 },
    27: { name: 'Segundo Molar Superior Izquierdo',   type: 'Molar Superior (3 Raíces)',      cusps: 4, roots: 3, arch: 'Superior', ref: 16 },
    28: { name: 'Tercer Molar Superior Izquierdo',    type: 'Molar Superior (3 Raíces)',      cusps: 4, roots: 3, arch: 'Superior', ref: 16 },

    48: { name: 'Tercer Molar Inferior Derecho',      type: 'Molar Inferior (2 Raíces)',      cusps: 4, roots: 2, arch: 'Inferior', ref: 36 },
    47: { name: 'Segundo Molar Inferior Derecho',     type: 'Molar Inferior (Bifurcado)',     cusps: 4, roots: 2, arch: 'Inferior', ref: 36 },
    46: { name: 'Primer Molar Inferior Derecho',      type: 'Molar Inferior Pentacúspide',    cusps: 5, roots: 2, arch: 'Inferior', ref: 36 },
    45: { name: 'Segundo Premolar Inferior Derecho',  type: 'Bicúspide Inferior (1 Raíz)',    cusps: 2, roots: 1, arch: 'Inferior', ref: 13 },
    44: { name: 'Primer Premolar Inferior Derecho',   type: 'Bicúspide Inferior (1 Raíz)',    cusps: 2, roots: 1, arch: 'Inferior', ref: 13 },
    43: { name: 'Canino Inferior Derecho',            type: 'Cúspide Canina Unirradicular',   cusps: 1, roots: 1, arch: 'Inferior', ref: 13 },
    42: { name: 'Incisivo Lateral Inferior Derecho',  type: 'Incisivo Cincel Unirradicular',  cusps: 1, roots: 1, arch: 'Inferior', ref: 11 },
    41: { name: 'Incisivo Central Inferior Derecho',  type: 'Incisivo Cincel Unirradicular',  cusps: 1, roots: 1, arch: 'Inferior', ref: 11 },

    31: { name: 'Incisivo Central Inferior Izquierdo',type: 'Incisivo Cincel Unirradicular',  cusps: 1, roots: 1, arch: 'Inferior', ref: 11 },
    32: { name: 'Incisivo Lateral Inferior Izquierdo',type: 'Incisivo Cincel Unirradicular',  cusps: 1, roots: 1, arch: 'Inferior', ref: 11 },
    33: { name: 'Canino Inferior Izquierdo',          type: 'Cúspide Canina Unirradicular',   cusps: 1, roots: 1, arch: 'Inferior', ref: 13 },
    34: { name: 'Primer Premolar Inferior Izquierdo', type: 'Bicúspide Inferior (1 Raíz)',    cusps: 2, roots: 1, arch: 'Inferior', ref: 13 },
    35: { name: 'Segundo Premolar Inferior Izquierdo',type: 'Bicúspide Inferior (1 Raíz)',    cusps: 2, roots: 1, arch: 'Inferior', ref: 13 },
    36: { name: 'Primer Molar Inferior Izquierdo',    type: 'Molar Inferior Pentacúspide',    cusps: 5, roots: 2, arch: 'Inferior', ref: 36 },
    37: { name: 'Segundo Molar Inferior Izquierdo',   type: 'Molar Inferior (Bifurcado)',     cusps: 4, roots: 2, arch: 'Inferior', ref: 36 },
    38: { name: 'Tercer Molar Inferior Izquierdo',    type: 'Molar Inferior (2 Raíces)',      cusps: 4, roots: 2, arch: 'Inferior', ref: 36 }
  };

  const VIEW_PRESETS = {
    frontal:        { yaw: 0.0,   pitch: 0.12,  label: 'Frontal (Vestibular)' },
    posterior:      { yaw: 3.1416,pitch: 0.12,  label: 'Posterior (Palatino/Lingual)' },
    lateral_mesial: { yaw: -1.57, pitch: 0.08,  label: 'Lateral Mesial' },
    lateral_distal: { yaw: 1.57,  pitch: 0.08,  label: 'Lateral Distal' },
    oclusal:        { yaw: 0.0,   pitch: 1.42,  label: 'Oclusal / Incisal' },
    apical:         { yaw: 0.0,   pitch: -1.42, label: 'Apical (Raíces)' }
  };

  const VERTEX_SHADER = `
    attribute vec2 aPos;
    varying vec2 vUv;
    void main() {
      vUv = aPos;
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `;

  const FRAGMENT_SHADER = `
    precision highp float;
    varying vec2 vUv;
    uniform vec2 uRes;
    uniform float uYaw;
    uniform float uPitch;
    uniform float uZoom;
    uniform int uFdi;
    uniform int uState;     // 0 = Libre, 1 = Pilar, 2 = Pontico
    uniform int uPrepMode;  // 0 = Corona Completa, 1 = Munon Tallado
    uniform vec3 uVitaCol;

    float smin(float a, float b, float k) {
      float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
      return mix(b, a, h) - k * h * (1.0 - h);
    }
    float smax(float a, float b, float k) {
      return -smin(-a, -b, k);
    }
    float sdCurvedRoot(vec3 p, vec3 a, vec3 b, float r1, float r2, float curveX) {
      vec3 pa = p - a, ba = b - a;
      float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
      float bend = curveX * 4.0 * h * (1.0 - h);
      vec3 center = a + ba * h + vec3(bend, 0.0, 0.0);
      float r = mix(r1, r2, pow(h, 0.85));
      return length(p - center) - r;
    }
    float sdEllipsoid(vec3 p, vec3 c, vec3 r) {
      vec3 q = (p - c) / r;
      float k0 = length(q);
      vec3 q2 = (p - c) / (r * r);
      float k1 = length(q2);
      return k0 > 0.0001 ? k0 * (k0 - 1.0) / k1 : -min(r.x, min(r.y, r.z));
    }

    vec3 evalTooth(vec3 p) {
      int quad = uFdi / 10;
      int num = uFdi - quad * 10;
      bool isUpper = (quad == 1 || quad == 2);
      bool isLeft = (quad == 2 || quad == 3);

      float py = isUpper ? -p.y : p.y;
      float mx = isLeft ? -p.x : p.x;
      float pz = p.z;
      vec3 q = vec3(mx, py, pz);

      float dCrown = 10.0;
      float dRoot = 10.0;
      float cejY = 0.08 + 0.04 * (mx * mx * 2.5);

      if (num == 1 || num == 2) {
        float wScale = isUpper ? (num == 1 ? 0.96 : 0.78) : (num == 1 ? 0.68 : 0.74);
        float rLen   = isUpper ? (num == 1 ? 0.88 : 0.84) : 0.84;
        cejY = 0.08 + 0.06 * (mx * mx * 3.0);

        float tY = clamp((py - 0.06) / 0.68, 0.0, 1.0);
        float spreadX = (0.14 + 0.09 * smoothstep(0.0, 0.8, tY)) * wScale;
        float thickZ  = mix(0.28, 0.14, smoothstep(0.05, 0.75, py));

        float lobeM = sdEllipsoid(q, vec3(-spreadX, 0.44, 0.02), vec3(0.23 * wScale, 0.36, thickZ));
        float lobeC = sdEllipsoid(q, vec3( 0.0,     0.45, 0.04), vec3(0.24 * wScale, 0.37, thickZ));
        float lobeD = sdEllipsoid(q, vec3( spreadX, 0.42 - (num == 2 ? 0.03 : 0.01), 0.02), vec3(0.22 * wScale, 0.35, thickZ));
        float neck  = sdEllipsoid(q, vec3( 0.0,     0.16, 0.0),  vec3(0.30 * wScale, 0.22, 0.27));

        dCrown = smin(lobeM, lobeC, 0.12);
        dCrown = smin(dCrown, lobeD, 0.12);
        dCrown = smin(dCrown, neck, 0.14);

        float palScoop = sdEllipsoid(q, vec3(0.0, 0.50, -0.26), vec3(0.28 * wScale, 0.30, 0.16));
        dCrown = smax(dCrown, -palScoop, 0.08);

        dRoot = sdCurvedRoot(q, vec3(0.0, 0.14, 0.0), vec3(0.03, -rLen, -0.02), 0.27 * wScale, 0.045, -0.02);
      }
      else if (num == 3) {
        float wScale = isUpper ? 0.92 : 0.84;
        float rLen   = isUpper ? 0.94 : 0.90;
        cejY = 0.07 + 0.05 * (mx * mx * 2.5);

        float neck  = sdEllipsoid(q, vec3(0.0, 0.22, 0.0), vec3(0.34 * wScale, 0.24, 0.31));
        float lobeC = sdEllipsoid(q, vec3(-0.01, 0.46, 0.04), vec3(0.24 * wScale, 0.38, 0.26));
        float lobeM = sdEllipsoid(q, vec3(-0.18 * wScale, 0.38, 0.0), vec3(0.22 * wScale, 0.29, 0.24));
        float lobeD = sdEllipsoid(q, vec3( 0.18 * wScale, 0.35, 0.0), vec3(0.22 * wScale, 0.27, 0.24));

        dCrown = smin(neck, lobeC, 0.12);
        dCrown = smin(dCrown, lobeM, 0.11);
        dCrown = smin(dCrown, lobeD, 0.11);

        dRoot = sdCurvedRoot(q, vec3(0.0, 0.15, 0.0), vec3(0.04, -rLen, -0.02), 0.30 * wScale, 0.045, -0.025);
      }
      else if (num == 4 || num == 5) {
        float wScale = (num == 4) ? 0.92 : 0.88;
        cejY = 0.06 + 0.03 * (mx * mx * 2.0);

        float neck  = sdEllipsoid(q, vec3(0.0, 0.20, 0.0), vec3(0.36 * wScale, 0.22, 0.34));
        float cuspB = sdEllipsoid(q, vec3(-0.14 * wScale, 0.46,  0.08), vec3(0.26 * wScale, 0.33, 0.26));
        float cuspD = sdEllipsoid(q, vec3( 0.14 * wScale, 0.44,  0.08), vec3(0.25 * wScale, 0.31, 0.26));
        float cuspL = sdEllipsoid(q, vec3( 0.0,           0.48, -0.14), vec3(0.30 * wScale, 0.32, 0.24));

        dCrown = smin(neck, cuspB, 0.12);
        dCrown = smin(dCrown, cuspD, 0.10);
        dCrown = smin(dCrown, cuspL, 0.12);

        if (isUpper && num == 4) {
          float r1 = sdCurvedRoot(q, vec3(-0.10, 0.12, 0.0), vec3(-0.14, -0.86, 0.0), 0.20, 0.042, -0.03);
          float r2 = sdCurvedRoot(q, vec3( 0.10, 0.12, 0.0), vec3( 0.14, -0.84, 0.0), 0.19, 0.042,  0.03);
          dRoot = smin(r1, r2, 0.07);
        } else {
          dRoot = sdCurvedRoot(q, vec3(0.0, 0.14, 0.0), vec3(0.03, -0.88, 0.0), 0.30 * wScale, 0.048, -0.02);
        }
      }
      else {
        float mScale = (num == 6) ? 1.0 : ((num == 7) ? 0.93 : 0.85);
        cejY = 0.05 + 0.025 * (mx * mx * 1.5);

        float neck   = sdEllipsoid(q, vec3(0.0, 0.18, 0.0), vec3(0.42 * mScale, 0.22, 0.38 * mScale));
        float cuspMB = sdEllipsoid(q, vec3(-0.21 * mScale, 0.45,  0.10), vec3(0.30 * mScale, 0.33, 0.28 * mScale));
        float cuspDB = sdEllipsoid(q, vec3( 0.21 * mScale, 0.44,  0.10), vec3(0.29 * mScale, 0.32, 0.28 * mScale));
        float cuspML = sdEllipsoid(q, vec3(-0.17 * mScale, 0.51, -0.14), vec3(0.27 * mScale, 0.32, 0.24 * mScale));
        float cuspDL = sdEllipsoid(q, vec3( 0.18 * mScale, 0.50, -0.14), vec3(0.26 * mScale, 0.31, 0.24 * mScale));

        dCrown = smin(neck, cuspMB, 0.13);
        dCrown = smin(dCrown, cuspDB, 0.085);
        dCrown = smin(dCrown, cuspML, 0.10);
        dCrown = smin(dCrown, cuspDL, 0.10);

        float trunk = sdEllipsoid(q, vec3(0.0, 0.02, 0.0), vec3(0.38 * mScale, 0.18, 0.32 * mScale));

        if (isUpper) {
          float spread = (num == 6) ? 1.0 : ((num == 7) ? 0.85 : 0.70);
          float rMB  = sdCurvedRoot(q, vec3(-0.19 * mScale, 0.04,  0.06), vec3(-0.18 * spread, -0.86 * mScale,  0.06), 0.18 * mScale, 0.040, -0.05 * spread);
          float rDB  = sdCurvedRoot(q, vec3( 0.19 * mScale, 0.04,  0.06), vec3( 0.20 * spread, -0.85 * mScale,  0.06), 0.17 * mScale, 0.040,  0.03 * spread);
          float rPal = sdCurvedRoot(q, vec3( 0.01 * mScale, 0.02, -0.14), vec3( 0.02,          -0.74 * mScale, -0.18), 0.16 * mScale, 0.038,  0.01);

          dRoot = smin(trunk, rMB, 0.09);
          dRoot = smin(dRoot, rDB, 0.09);
          dRoot = smin(dRoot, rPal, 0.08);
        } else {
          float spread = (num == 6) ? 1.0 : ((num == 7) ? 0.86 : 0.72);
          float rM = sdCurvedRoot(q, vec3(-0.18 * mScale, 0.04, 0.0), vec3(-0.18 * spread, -0.86 * mScale, 0.0), 0.195 * mScale, 0.044, -0.04 * spread);
          float rD = sdCurvedRoot(q, vec3( 0.18 * mScale, 0.04, 0.0), vec3( 0.19 * spread, -0.85 * mScale, 0.0), 0.185 * mScale, 0.044,  0.03 * spread);

          dRoot = smin(trunk, smin(rM, rD, 0.06), 0.09);
        }
      }

      if (uPrepMode == 1) {
        float stump = sdCurvedRoot(q, vec3(0.0, 0.14, 0.0), vec3(0.0, 0.50, 0.0), 0.30, 0.21, 0.0);
        float shoulder = sdEllipsoid(q, vec3(0.0, 0.18, 0.0), vec3(0.40, 0.10, 0.34));
        dCrown = smin(stump, shoulder, 0.06);
      }

      float dTotal = (uState == 2) ? dCrown : smin(dCrown, dRoot, 0.10);
      return vec3(dTotal, py, cejY);
    }

    float mapDist(vec3 p) {
      return evalTooth(p).x;
    }

    vec3 calcNormal(vec3 p) {
      vec2 e = vec2(0.0025, 0.0);
      return normalize(vec3(
        mapDist(p + e.xyy) - mapDist(p - e.xyy),
        mapDist(p + e.yxy) - mapDist(p - e.yxy),
        mapDist(p + e.yyx) - mapDist(p - e.yyx)
      ));
    }

    float calcAO(vec3 pos, vec3 nor) {
      float occ = 0.0;
      float sca = 1.0;
      for (int i = 1; i <= 4; i++) {
        float h = 0.04 * float(i);
        float d = mapDist(pos + nor * h);
        occ += (h - d) * sca;
        sca *= 0.7;
      }
      return clamp(1.0 - 1.8 * occ, 0.45, 1.0);
    }

    mat3 rotY(float a) {
      float c = cos(a), s = sin(a);
      return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
    }
    mat3 rotX(float a) {
      float c = cos(a), s = sin(a);
      return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
    }

    void main() {
      vec2 uv = vUv;
      uv.x *= uRes.x / max(uRes.y, 1.0);

      mat3 camRot = rotY(uYaw) * rotX(uPitch);
      vec3 ro = camRot * vec3(0.0, -0.05, 2.35 / uZoom);
      vec3 rd = camRot * normalize(vec3(uv * 0.62, -1.0));

      float t = 0.0;
      bool hit = false;
      for (int i = 0; i < 68; i++) {
        vec3 p = ro + rd * t;
        float d = mapDist(p);
        if (d < 0.0018) {
          hit = true;
          break;
        }
        t += d * 0.85;
        if (t > 4.2) break;
      }

      float rad = length(vUv);
      vec3 bgCol = mix(vec3(0.980, 0.982, 0.984), vec3(0.935, 0.945, 0.958), smoothstep(0.15, 1.35, rad));

      if (hit) {
        vec3 pos = ro + rd * t;
        vec3 eval = evalTooth(pos);
        float py = eval.y;
        float cejY = eval.z;
        vec3 nor = calcNormal(pos);
        vec3 viewDir = normalize(ro - pos);
        float ao = calcAO(pos, nor);

        float crownBlend = (uState == 2) ? 1.0 : smoothstep(cejY - 0.025, cejY + 0.025, py);

        float rootApexT = smoothstep(-0.10, -0.82, py);
        vec3 rootNeckCol = vec3(0.80, 0.73, 0.50);
        vec3 rootApexCol = vec3(0.91, 0.87, 0.73);
        vec3 rootCol = mix(rootNeckCol, rootApexCol, rootApexT);
        rootCol = mix(vec3(0.68, 0.60, 0.39), rootCol, ao);

        vec3 enamelBase = uVitaCol;
        vec3 enamelShadow = uVitaCol * 0.88;
        if (uPrepMode == 1) {
          enamelBase = vec3(0.84, 0.77, 0.56);
          enamelShadow = vec3(0.72, 0.64, 0.44);
        }

        vec3 keyLight  = camRot * normalize(vec3(-0.42, 0.52, 0.74));
        vec3 fillLight = camRot * normalize(vec3( 0.52, 0.28, 0.80));
        vec3 topLight  = camRot * normalize(vec3( 0.0,  0.85, 0.52));

        float diffKey  = clamp(dot(nor, keyLight) * 0.55 + 0.45, 0.0, 1.0);
        float diffFill = clamp(dot(nor, fillLight) * 0.50 + 0.50, 0.0, 1.0);
        float diffTop  = clamp(dot(nor, topLight) * 0.50 + 0.50, 0.0, 1.0);

        float lightVal = clamp((diffKey * 0.52 + diffFill * 0.34 + diffTop * 0.22) * mix(0.78, 1.0, ao), 0.0, 1.0);

        vec3 shadedCrown = mix(enamelShadow, enamelBase, lightVal);
        float collarBand = exp(-pow((py - (cejY + 0.03)) / 0.028, 2.0));
        if (uState == 1) {
          shadedCrown = mix(shadedCrown, vec3(0.20, 0.31, 0.41), collarBand * 0.65);
        } else if (uState == 2) {
          shadedCrown = mix(shadedCrown, vec3(0.46, 0.36, 0.20), smoothstep(0.24, 0.08, py) * 0.55);
        }

        vec3 shadedRoot = rootCol * mix(0.76, 1.04, lightVal);
        vec3 shaded = mix(shadedRoot, shadedCrown, crownBlend);

        float ndotv = clamp(dot(nor, viewDir), 0.0, 1.0);
        float fresnel = pow(1.0 - ndotv, 2.4);
        vec3 rimCol = mix(vec3(0.66, 0.59, 0.40), vec3(0.82, 0.84, 0.86), crownBlend);
        shaded = mix(shaded, rimCol, fresnel * 0.42);

        vec3 halfKey  = normalize(keyLight + viewDir);
        vec3 halfFill = normalize(fillLight + viewDir);
        float spec1 = smoothstep(0.88, 0.97, dot(nor, halfKey)) * mix(0.18, 0.32, crownBlend);
        float spec2 = smoothstep(0.90, 0.98, dot(nor, halfFill)) * mix(0.12, 0.22, crownBlend);
        shaded += vec3(spec1 + spec2);

        gl_FragColor = vec4(clamp(shaded, 0.0, 1.0), 1.0);
      } else {
        gl_FragColor = vec4(bgCol, 1.0);
      }
    }
  `;

  class ToothViewerInstance {
    constructor(canvasId, prefix) {
      this.canvasId = canvasId;
      this.prefix = prefix; // ' inline' o 'modal'
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.fdi = 16;
      this.yaw = 0.0;
      this.pitch = 0.14;
      this.targetYaw = 0.0;
      this.targetPitch = 0.14;
      this.zoom = 1.0;
      this.autoRotate = false;
      this.prepMode = 0; // 0 = Corona Completa, 1 = Muñón Tallado
      this.activeView = 'frontal';
      this.isDragging = false;
      this.lastX = 0;
      this.lastY = 0;

      this.initWebGL();
      this.bindEvents();
      this.renderFrame();
    }

    initWebGL() {
      const gl = this.canvas.getContext('webgl', { antialias: true, preserveDrawingBuffer: true }) ||
                 this.canvas.getContext('experimental-webgl');
      if (!gl) return;
      this.gl = gl;

      const compile = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };

      const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.useProgram(prog);
      this.prog = prog;

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

      const aPos = gl.getAttribLocation(prog, 'aPos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      this.uRes      = gl.getUniformLocation(prog, 'uRes');
      this.uYaw      = gl.getUniformLocation(prog, 'uYaw');
      this.uPitch    = gl.getUniformLocation(prog, 'uPitch');
      this.uZoom     = gl.getUniformLocation(prog, 'uZoom');
      this.uFdi      = gl.getUniformLocation(prog, 'uFdi');
      this.uState    = gl.getUniformLocation(prog, 'uState');
      this.uPrepMode = gl.getUniformLocation(prog, 'uPrepMode');
      this.uVitaCol  = gl.getUniformLocation(prog, 'uVitaCol');
    }

    bindEvents() {
      const c = this.canvas;
      c.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.autoRotate = false;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.updateAutoRotateBtn();
      });
      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        const dx = e.clientX - this.lastX;
        const dy = e.clientY - this.lastY;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.targetYaw += dx * 0.014;
        this.targetPitch = Math.max(-1.48, Math.min(1.48, this.targetPitch + dy * 0.014));
        this.yaw = this.targetYaw;
        this.pitch = this.targetPitch;
        this.requestDraw();
      });
      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });

      // Touch support
      c.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.autoRotate = false;
          this.lastX = e.touches[0].clientX;
          this.lastY = e.touches[0].clientY;
          this.updateAutoRotateBtn();
        }
      }, { passive: true });
      c.addEventListener('touchmove', (e) => {
        if (!this.isDragging || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - this.lastX;
        const dy = e.touches[0].clientY - this.lastY;
        this.lastX = e.touches[0].clientX;
        this.lastY = e.touches[0].clientY;
        this.targetYaw += dx * 0.014;
        this.targetPitch = Math.max(-1.48, Math.min(1.48, this.targetPitch + dy * 0.014));
        this.yaw = this.targetYaw;
        this.pitch = this.targetPitch;
        this.requestDraw();
      }, { passive: true });
      c.addEventListener('touchend', () => { this.isDragging = false; });

      c.addEventListener('wheel', (e) => {
        e.preventDefault();
        this.zoom = Math.max(0.75, Math.min(1.65, this.zoom - e.deltaY * 0.001));
        this.requestDraw();
      }, { passive: false });
    }

    updateAutoRotateBtn() {
      const btn = document.getElementById(this.prefix + 'BtnAutoRotate3D');
      if (btn) {
        if (this.autoRotate) {
          btn.className = 'px-2 py-1 rounded-lg text-[10px] font-bold bg-[#334e68] text-white border border-[#334e68] transition-all cursor-pointer';
        } else {
          btn.className = 'px-2 py-1 rounded-lg text-[10px] font-bold bg-white/90 text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer';
        }
      }
    }

    requestDraw() {
      if (this.rafId) return;
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null;
        this.renderFrame();
      });
    }

    renderFrame() {
      if (!this.gl || !this.canvas) return;
      const gl = this.gl;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = this.canvas.getBoundingClientRect();
      const w = Math.max(220, Math.floor((rect.width || 280) * dpr));
      const h = Math.max(200, Math.floor((rect.height || 220) * dpr));
      if (this.canvas.width !== w || this.canvas.height !== h) {
        this.canvas.width = w;
        this.canvas.height = h;
      }

      gl.viewport(0, 0, w, h);
      gl.useProgram(this.prog);

      const dYaw = this.targetYaw - this.yaw;
      const dPitch = this.targetPitch - this.pitch;
      let needsMoreFrames = false;

      if (this.autoRotate && !this.isDragging) {
        this.yaw += 0.018;
        this.targetYaw = this.yaw;
        needsMoreFrames = true;
      } else if (Math.abs(dYaw) > 0.002 || Math.abs(dPitch) > 0.002) {
        this.yaw += dYaw * 0.22;
        this.pitch += dPitch * 0.22;
        needsMoreFrames = true;
      } else {
        this.yaw = this.targetYaw;
        this.pitch = this.targetPitch;
      }

      const info = Odontograma3D.getClinicalInfo(this.prefix, this.fdi);
      const stInt = info.state === 'PILAR' ? 1 : (info.state === 'PONTICO' ? 2 : 0);
      const vitaRgb = VITA_RGB[info.shade] || VITA_RGB['A2'];

      gl.uniform2f(this.uRes, w, h);
      gl.uniform1f(this.uYaw, this.yaw);
      gl.uniform1f(this.uPitch, this.pitch);
      gl.uniform1f(this.uZoom, this.zoom);
      gl.uniform1i(this.uFdi, this.fdi);
      gl.uniform1i(this.uState, stInt);
      gl.uniform1i(this.uPrepMode, this.prepMode);
      gl.uniform3f(this.uVitaCol, vitaRgb[0], vitaRgb[1], vitaRgb[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (needsMoreFrames) {
        this.requestDraw();
      }
    }
  }

  const Odontograma3D = {
    instances: {},
    selectedFdi: 16,

    getMeta(fdi) {
      return TOOTH_METADATA[fdi] || TOOTH_METADATA[16];
    },

    getClinicalInfo(prefix, fdi) {
      const s = String(fdi);
      let state = 'LIBRE';
      let shade = 'A2';

      if (prefix === 'modal' && typeof window.getModalToothState === 'function') {
        const mSt = window.getModalToothState(s);
        if (mSt) state = mSt;
      } else if (window._currentOdontoOrden) {
        const o = window._currentOdontoOrden;
        const isSel = (o.piezas || []).map(String).includes(s);
        const tipo = (o.tiposPieza && o.tiposPieza[s]) || (isSel ? 'PILAR' : null);
        if (tipo) state = tipo;
        if (o.color) {
          const m = String(o.color).toUpperCase().match(/\b(A1|A2|A3\.5|A3|A4|B1|B2|B3|C1|C2|D2|BL1|BL2)\b/);
          if (m) shade = m[1];
        }
      }
      return { state, shade };
    },

    initViewer(canvasId, prefix) {
      const inst = new ToothViewerInstance(canvasId, prefix);
      if (inst && inst.gl) {
        inst.fdi = this.selectedFdi;
        this.instances[prefix] = inst;
        this.syncUI(prefix, this.selectedFdi);
        inst.requestDraw();
      }
      return inst;
    },

    selectTooth(fdi) {
      const num = parseInt(fdi, 10);
      if (!TOOTH_METADATA[num]) return;
      this.selectedFdi = num;

      Object.keys(this.instances).forEach((prefix) => {
        const inst = this.instances[prefix];
        if (inst && inst.canvas && document.body.contains(inst.canvas)) {
          inst.fdi = num;
          inst.requestDraw();
          this.syncUI(prefix, num);
        }
      });
    },

    setView(prefix, viewKey) {
      const inst = this.instances[prefix];
      const preset = VIEW_PRESETS[viewKey];
      if (!inst || !preset) return;
      inst.autoRotate = false;
      inst.activeView = viewKey;
      inst.targetYaw = preset.yaw;
      inst.targetPitch = preset.pitch;
      inst.updateAutoRotateBtn();
      inst.requestDraw();
      this.syncUI(prefix, inst.fdi);
    },

    toggleAutoRotate(prefix) {
      const inst = this.instances[prefix];
      if (!inst) return;
      inst.autoRotate = !inst.autoRotate;
      inst.updateAutoRotateBtn();
      inst.requestDraw();
    },

    togglePrepMode(prefix) {
      const inst = this.instances[prefix];
      if (!inst) return;
      inst.prepMode = inst.prepMode === 1 ? 0 : 1;
      const btn = document.getElementById(prefix + 'BtnPrepMode3D');
      if (btn) {
        if (inst.prepMode === 1) {
          btn.textContent = 'Muñón';
          btn.className = 'px-2 py-1 rounded-lg text-[10px] font-bold bg-[#755c34] text-white border border-[#755c34] transition-all cursor-pointer';
        } else {
          btn.textContent = 'Corona';
          btn.className = 'px-2 py-1 rounded-lg text-[10px] font-bold bg-white/90 text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer';
        }
      }
      inst.requestDraw();
    },

    refreshAll() {
      Object.keys(this.instances).forEach((prefix) => {
        const inst = this.instances[prefix];
        if (inst && inst.canvas && document.body.contains(inst.canvas)) {
          inst.requestDraw();
          this.syncUI(prefix, inst.fdi);
        }
      });
    },

    syncUI(prefix, fdi) {
      const meta = this.getMeta(fdi);
      const inst = this.instances[prefix];
      const info = this.getClinicalInfo(prefix, fdi);
      const st = info.state;
      const shade = info.shade;

      const elNum = document.getElementById(prefix + '3DToothNum');
      const elName = document.getElementById(prefix + '3DToothName');
      const elType = document.getElementById(prefix + '3DToothType');
      const elState = document.getElementById(prefix + '3DToothState');
      const elSpecs = document.getElementById(prefix + '3DToothSpecs');

      if (elNum) elNum.textContent = fdi;
      if (elName) elName.textContent = meta.name;
      if (elType) elType.textContent = shade;
      if (elSpecs) elSpecs.textContent = `${meta.roots}R • ${meta.cusps}C`;

      if (elState) {
        if (st === 'PILAR') {
          elState.textContent = 'Pilar';
          elState.className = 'px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#2f6353] text-white';
        } else if (st === 'PONTICO') {
          elState.textContent = 'Póntico';
          elState.className = 'px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#755c34] text-white';
        } else {
          elState.textContent = 'Natural';
          elState.className = 'px-2 py-0.5 rounded-full text-[9.5px] font-semibold bg-slate-200/80 text-slate-600';
        }
      }

      // Actualizar tira de 6 vistas de referencia de la muestra 3D (minimalista)
      const refGrid = document.getElementById(prefix + '3DRefViewsGrid');
      if (refGrid) {
        const views = [
          { key: 'frontal',        short: 'Frontal' },
          { key: 'posterior',      short: 'Lingual' },
          { key: 'lateral_mesial', short: 'Mesial' },
          { key: 'lateral_distal', short: 'Distal' },
          { key: 'oclusal',        short: 'Oclusal' },
          { key: 'apical',         short: 'Apical' }
        ];
        const activeKey = inst ? inst.activeView : 'frontal';
        refGrid.innerHTML = views.map((v) => {
          const isAct = activeKey === v.key;
          const imgSrc = `assets/odontograma/ref_${meta.ref}_${v.key}.png`;
          return `
            <button type="button" onclick="window.Odontograma3D.setView('${prefix}', '${v.key}')"
              title="Vista ${v.short}"
              class="group flex flex-col items-center p-1.5 rounded-xl border transition-all cursor-pointer ${isAct ? 'border-[#334e68] bg-[#f1f5f9] shadow-2xs' : 'border-slate-200/70 bg-white hover:border-slate-300'}">
              <div class="w-full h-12 rounded-lg bg-[#fafaf9] overflow-hidden flex items-center justify-center">
                <img src="${imgSrc}" alt="${v.short}" class="h-11 w-auto object-contain transition-transform duration-150 group-hover:scale-110">
              </div>
              <span class="mt-1 text-[8.5px] font-semibold tracking-wide ${isAct ? 'text-[#334e68]' : 'text-slate-400'}">${v.short}</span>
            </button>
          `;
        }).join('');
      }
    }
  };

  window.Odontograma3D = Odontograma3D;
})();
