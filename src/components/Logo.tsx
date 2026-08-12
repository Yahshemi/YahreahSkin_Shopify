import React from 'react';

export interface LogoProps {
  variant?: 'full' | 'horizontal' | 'text' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  textColor?: string;
  accentColor?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  textColor = '#212925',
  accentColor = '#7C9F8A',
  showTagline = true,
}) => {
  const textSizeMap = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const taglineSizeMap = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.25em]',
    lg: 'text-[11px] tracking-[0.3em]',
    xl: 'text-[13px] tracking-[0.35em]',
  };

  if (variant === 'icon') {
    return (
      <span className={`inline-flex items-center justify-center font-serif font-bold italic ${textSizeMap[size]} ${className}`} style={{ color: accentColor }}>
        Y
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <div className={`font-serif font-bold tracking-tight leading-none ${textSizeMap[size]}`} style={{ color: textColor }}>
        YAHREAH{' '}
        <span className="font-serif font-normal italic" style={{ color: accentColor }}>
          Skin
        </span>
      </div>
      {showTagline && variant !== 'text' && (
        <span
          className={`font-sans font-medium uppercase mt-1 ${taglineSizeMap[size]}`}
          style={{ color: textColor === '#212925' || textColor === 'currentColor' ? '#5C6760' : accentColor }}
        >
          As Within, So Without
        </span>
      )}
    </div>
  );
};
