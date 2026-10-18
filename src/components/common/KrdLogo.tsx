import React from 'react';

interface KrdLogoProps {
  variant?: 'full' | 'emblem';
  className?: string;
  size?: number | string;
}

export const KrdLogo: React.FC<KrdLogoProps> = ({
  variant = 'emblem',
  className = '',
  size
}) => {
  if (variant === 'full') {
    return (
      <img
        src="/logo.svg"
        alt="KRD ALGORITHM"
        className={`object-contain select-none ${className}`}
        style={size ? { width: size, height: 'auto' } : undefined}
      />
    );
  }

  return (
    <img
      src="/logo-emblem.svg"
      alt="KRD Logo"
      className={`object-contain select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
    />
  );
};
