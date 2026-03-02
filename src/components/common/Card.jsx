export default function Card({ 
  children, 
  className = '',
  hover = true,
  rounded = '2xl',
  padding = 'lg',
  ...props 
}) {
  const roundedClasses = {
    'lg': 'rounded-[24px]',
    'xl': 'rounded-[28px]',
    '2xl': 'rounded-[32px]',
    '3xl': 'rounded-[40px]',
  };
  
  const paddingClasses = {
    'sm': 'p-4',
    'md': 'p-6',
    'lg': 'p-8',
    'xl': 'p-10',
  };
  
  const baseClasses = 'bg-white shadow-sm flex flex-col';
  const hoverClasses = hover ? 'transition-transform hover:-translate-y-1 hover:shadow-md' : '';
  
  return (
    <div
      className={`
        ${baseClasses}
        ${roundedClasses[rounded]}
        ${paddingClasses[padding]}
        ${hoverClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
