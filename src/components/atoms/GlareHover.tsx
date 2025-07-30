import clsx from 'clsx';
import { useState, type CSSProperties, type ReactNode } from 'react';

type GlareHoverProps = {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: CSSProperties;
};

function GlareHover({
  width = 'auto',
  height = 'auto',
  glareColor = '#fff',
  background = '#fff',
  glareOpacity = 0.3,
  glareAngle = -30,
  transitionDuration = 800,
  borderRadius,
  borderColor,
  children,
  glareSize = 250,
  playOnce = false,
  className = '',
  style = {},
}: GlareHoverProps) {
  const [hasPlayed, setHasPlayed] = useState(false);

  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const overlayStyle: CSSProperties = {
    width,
    height,
    background,
    borderRadius,
    borderColor,
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    ...style,

    '--glare-color': rgba,
    '--glare-angle': `${glareAngle}deg`,
    '--glare-size': `${glareSize}%`,
    '--transition-duration': `${transitionDuration}ms`,
  } as CSSProperties;

  const handleMouseEnter = () => {
    if (playOnce && !hasPlayed) {
      setHasPlayed(true);
    }
  };

  return (
    <div
      className={clsx(
        'relative overflow-hidden glare-effect',
        { 'glare-played': playOnce && hasPlayed },
        className,
      )}
      style={overlayStyle}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  );
}

export default GlareHover;
