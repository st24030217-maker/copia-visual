import React from 'react';
import './Slide.css';

/**
 * Slide component from loading-dev
 * @param {number} size - Tamano en pixeles (default: 48)
 * @param {number} speed - Duracion en ms (default: 2400)
 * @param {string} className - Clases CSS adicionales
 * @param {object} style - Estilos en linea
 */
export function Slide({ size = 48, speed = 2400, className = '', style = {}, ...props }) {
  const inlineStyles = {
    '--ld-size': typeof size === 'number' ? `${size}px` : size,
    '--ld-duration': `${speed}ms`,
    ...style
  };

  return (
    <div className={`ld-slide ${className}`.trim()} style={inlineStyles} role="status" aria-label="Cargando" {...props}>
      <div className="ld-slide-dot" data-step="0" />
      <div className="ld-slide-dot" data-step="1" />
      <div className="ld-slide-dot" data-step="2" />
    </div>
  );
}

export function SlideDemo() {
  return <Slide size={48} />;
}

export default Slide;
