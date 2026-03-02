import { colors } from '../../constants/theme';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props 
}) {
  const baseClasses = 'rounded-full font-bold transition-all duration-300 flex items-center gap-3 justify-center uppercase tracking-wider';
  
  const variants = {
    primary: `bg-[${colors.accent.blue}] hover:bg-[${colors.brand.purple}] hover:text-white text-black`,
    secondary: `bg-white hover:bg-[${colors.accent.blue}] text-[${colors.brand.purple}] border-2 border-[${colors.brand.purple}]`,
    accent: `bg-[${colors.brand.purple}] hover:bg-[${colors.accent.blue}] text-white`,
  };
  
  const sizes = {
    sm: 'px-6 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-12 py-4 text-base',
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? disabledClasses : 'hover:shadow-lg active:scale-95'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
